import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import { db } from "@/lib/db";
import { getKingdomPaths, getTree, getPhylumPaths } from "@/lib/bio-server";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

interface ChatMsg {
  role: "user" | "assistant";
  content: string;
}
interface ContextTaxon {
  id: string;
  name: string;
  latin: string;
}
/** 前端可执行的跳转/交互动作 */
interface AgentAction {
  label: string;
  kind: "navigate" | "random" | "compareIds";
  /** navigate: home|explore|browse|compare|favorites|redlist|redlist:CR|taxon:<id>; compareIds: <id>,<id> */
  target: string;
}

const IUCN_CN: Record<string, string> = {
  EX: "灭绝", EW: "野外灭绝", CR: "极危", EN: "濒危", VU: "易危",
  NT: "近危", LC: "无危", DD: "数据缺乏",
};

// ============================== 中文检索优化 ==============================
/** 常见口语别名 → 图鉴规范名 */
const ALIAS: Record<string, string> = {
  老虎: "虎", 狮子: "狮", 大象: "象", 鲨鱼: "鲨", 鲸鱼: "鲸",
  老鼠: "鼠", 乌龟: "龟", 青蛙: "蛙", 蚂蚁: "蚁", 蜜蜂: "蜂",
  蝴蝶: "蝶", 蝎子: "蝎", 苍蝇: "蝇", 蚊子: "蚊", 蟑螂: "蜚蠊",
  熊猫: "大熊猫", 考拉: "树袋熊", 驴子: "驴", 猎豹: "豹",
  海豚: "海豚", 水母: "水母", 章鱼: "章鱼", 河马: "河马",
};

const STOPWORDS = [
  "帮我", "帮忙", "请问", "一下", "看看", "看一看", "想看", "想找", "找找", "找一下",
  "查找", "搜索", "查询", "检索", "推荐", "介绍", "介绍一下", "告诉我", "说说", "讲讲", "聊聊",
  "有哪些", "有些什么", "一些", "哪些", "有没有", "关于", "什么", "怎么", "如何", "哪里",
  "所有", "全部", "各种", "我想", "我要", "随便", "了解", "详情", "信息", "资料", "知识",
  "是什么", "什么样的", "特点", "问题", "谢谢", "感谢",
  "图鉴里", "图鉴", "条目", "页面", "网站", "物种们", "物种",
];
/** 词首/词尾可剥离的虚词与动词单字 */
const FUNC_CHARS = "是的了吗呢吧啊呀嘛哟个和与或及把被在从对向给用也都就还又很最更太找看问要想查搜数列举带去到打开请让跟";

function stripFuncChars(token: string): string {
  let s = token;
  while (s.length > 2 && FUNC_CHARS.includes(s[0])) s = s.slice(1);
  while (s.length > 2 && FUNC_CHARS.includes(s[s.length - 1])) s = s.slice(0, -1);
  return s;
}

/** 从用户消息提取检索词(去停用词 + 别名扩展 + 单字降级) */
function extractTerms(text: string): string[] {
  let cleaned = text.replace(/[,.?!;:、,。?!;:""''()\[\]{}\s]/g, " ");
  for (const w of STOPWORDS) cleaned = cleaned.split(w).join(" ");
  const tokens = cleaned.split(/\s+/).filter(Boolean).map(stripFuncChars).filter(Boolean);
  const terms: string[] = [];
  for (const t of tokens) {
    const cn = t.match(/[\u4e00-\u9fa5]+/)?.[0];
    if (cn) {
      if (cn.length >= 2) terms.push(cn);
      // 中文串切 2 字滑窗(≥3 字),提高命中率
      if (cn.length >= 3) {
        for (let i = 0; i + 2 <= cn.length; i++) terms.push(cn.slice(i, i + 2));
      }
      if (cn.length >= 6) for (let i = 0; i + 3 <= cn.length; i++) terms.push(cn.slice(i, i + 3));
    } else if (t.length >= 2) {
      terms.push(t); // 拉丁名/英文
    }
  }
  // 别名扩展:「老虎」→「虎」
  const expanded = [...terms];
  for (const t of terms) {
    if (ALIAS[t]) expanded.push(ALIAS[t]);
  }
  // 单字降级:两字词形如「鲨鱼」「狮子」→ 尝试去掉修饰字(鱼/子/老/大…)
  const DROP_PREFIX = "老大小公母";
  const DROP_SUFFIX = "子鱼虫鸟兽们";
  for (const t of terms) {
    if (/^[\u4e00-\u9fa5]{2}$/.test(t)) {
      if (DROP_PREFIX.includes(t[0])) expanded.push(t[1]);
      if (DROP_SUFFIX.includes(t[1])) expanded.push(t[0]);
    }
  }
  return [...new Set(expanded)].slice(0, 14);
}

// ============================== 库内检索 ==============================
interface Candidate {
  id: string;
  latinName: string;
  chineseName: string;
  rank: string;
  description: string | null;
  image: string | null;
  conservation: string | null;
  parentId: string | null;
  etymology?: string | null;
  discovery?: string | null;
  genomeInfo?: string | null;
  ecologyRole?: string | null;
  researchValue?: string | null;
  morphology?: string | null;
  habitat?: string | null;
  distribution?: string | null;
}

async function searchCandidates(terms: string[]): Promise<Candidate[]> {
  if (!terms.length) return [];
  const seen = new Map<string, number>();
  const nameOnly = terms.filter((t) => /^[\u4e00-\u9fa5]$/.test(t));
  const normal = terms.filter((t) => t.length >= 2);

  const scan = async (term: string, nameFieldsOnly: boolean) => {
    const where = nameFieldsOnly
      ? { OR: [{ latinName: { contains: term } }, { chineseName: { contains: term } }] }
      : {
          OR: [
            { latinName: { contains: term } },
            { chineseName: { contains: term } },
            { description: { contains: term } },
            { habitat: { contains: term } },
            { morphology: { contains: term } },
            { etymology: { contains: term } },
            { discovery: { contains: term } },
            { ecologyRole: { contains: term } },
            { researchValue: { contains: term } },
          ],
        };
    const rows = await db.taxon.findMany({
      where,
      select: {
        id: true, latinName: true, chineseName: true, rank: true,
        description: true, image: true, conservation: true, tags: true,
      },
      take: 30,
    });
    for (const r of rows) {
      let w = 1;
      if (r.latinName.toLowerCase() === term.toLowerCase()) w += 8;
      if (r.chineseName === term) w += 8;
      if (r.latinName.toLowerCase().includes(term.toLowerCase())) w += 3;
      if (r.chineseName.includes(term)) w += 3;
      if (r.rank === "species") w += 2;
      if ((r.tags || "").includes("flagship")) w += 1;
      seen.set(r.id, (seen.get(r.id) || 0) + w);
    }
  };

  for (const term of normal) await scan(term, false);
  for (const term of nameOnly) await scan(term, true);

  const top = [...seen.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([id]) => id);
  if (!top.length) return [];
  const result = await db.taxon.findMany({
    where: { id: { in: top } },
    select: {
      id: true, latinName: true, chineseName: true, rank: true,
      description: true, image: true, conservation: true, parentId: true,
    },
  });
  const order = new Map(top.map((id, i) => [id, i]));
  return result.sort((a, b) => order.get(a.id)! - order.get(b.id)!);
}

// ============================== 意图引擎 ==============================
interface Intents {
  random: boolean;
  redlist: boolean;
  iucnLevel: string | null;
  catalog: boolean;
  home: boolean;
  comparePage: boolean;
  favPage: boolean;
  explorePage: boolean;
  stats: boolean;
  kingdom: string | null; // 界/域拉丁名
  kingdomZh: string | null;
  kingdomCount: number | null;
  /** 门级浏览意图:门拉丁名(如 Annelida) */
  phylum: string | null;
  phylumZh: string | null;
  phylumCount: number | null;
  faq: boolean;
  compareHow: boolean;
  favHow: boolean;
  aboutContext: boolean;
  /** 「对比 A 和 B」型指令(非 how-to 问句) */
  compareCmd: boolean;
}

/** 解析「对比 A 和 B」型指令,提取两个待比较名称(未命中两个则返回 null) */
function splitCompareTerms(msg: string): [string, string] | null {
  let m = msg.trim();
  // how-to 问句交给 compareHow,不解析
  if (/(怎么|如何|怎样)/.test(m)) return null;
  if (!/(对比|比较|比一比|比一下)/.test(m)) return null;
  // 剔除动词短语与请求前缀,保留主体名词片段
  m = m
    .replace(/(帮我|请|给我|麻烦|一下)/g, "")
    .replace(/(把|将|加入|放到|放进|放入|托盘|视图|里面|拿去)/g, " ")
    .replace(/(对比|比较|比一比|比一下)/g, " ")
    .trim();
  const parts = m
    .split(/和|与|跟|还有|以及|、|,|，|vs|VS|Vs|\.vs\./i)
    .map((s) => {
      let x = s.trim();
      // 去掉后续疑问尾巴:「谁更厉害」「的区别」等(不动名称本体,大熊猫/小熊猫不受影响)
      x = x
        .replace(/(谁更|谁)(厉害|猛|强|快|高|重|大|小)?$/, "")
        .replace(/的区别$/, "")
        .replace(/(一样吗|吗|呢|吧|啊)$/, "")
        .replace(/(的|了)$/u, "");
      return x.trim();
    })
    .filter(Boolean);
  if (parts.length < 2) return null;
  const [a, b] = parts;
  if (!a || !b || a === b || a.length > 12 || b.length > 12) return null;
  return [a, b];
}

/** 从检索候选中选最佳匹配:精确名 > 前缀/包含 > 拉丁名,物种优先,短中文名优先 */
function pickBestCandidate(term: string, cs: Candidate[]): Candidate | null {
  if (!cs.length) return null;
  const t = term.trim();
  const score = (c: Candidate) => {
    let s = 0;
    if (c.chineseName === t) s += 100;
    else if (c.chineseName.startsWith(t) || t.startsWith(c.chineseName)) s += 50;
    else if (c.chineseName.includes(t) || t.includes(c.chineseName)) s += 20;
    if (c.rank === "species") s += 30;
    s += Math.max(0, 10 - c.chineseName.length); // 短名更可能是本体(狮 vs 狮鬃水母)
    if (c.latinName.toLowerCase().includes(t.toLowerCase())) s += 15;
    return s;
  };
  return [...cs].sort((a, b) => score(b) - score(a))[0] || null;
}

const KINGDOM_PATTERNS: { re: RegExp; la: string; zh: string }[] = [
  { re: /动物界|动物们|动物王国|Animalia/i, la: "Animalia", zh: "动物界" },
  { re: /植物界|植物们|花花草草|Plantae/i, la: "Plantae", zh: "植物界" },
  { re: /真菌界|蘑菇们|真菌们|Fungi/i, la: "Fungi", zh: "真菌界" },
  { re: /原生生物|原生动物|Protista/i, la: "Protista", zh: "原生生物界" },
  { re: /细菌域|细菌界|细菌们|Bacteria/i, la: "Bacteria", zh: "细菌域" },
  { re: /古菌域|古菌界|古菌们|Archaea/i, la: "Archaea", zh: "古菌域" },
];

function detectIntents(msg: string, ctx: ContextTaxon | null): Intents {
  const m = msg.trim();
  const nav = /带我去|打开|跳转到|前往|去看看|去看|切换到|进入/;
  return {
    random: /随机|随便|抽一|摇一|来个惊喜|盲盒|轮盘|手气/.test(m),
    redlist: /红色名录|红色名单|濒危专题|受威胁/.test(m) || (nav.test(m) && /名录|名单/.test(m)),
    iucnLevel: /极危|\/?CR\b/.test(m)
      ? "CR"
      : /濒危|\/?EN\b/.test(m)
      ? "EN"
      : /易危|\/?VU\b/.test(m)
      ? "VU"
      : /野外灭绝|\/?EW\b/.test(m)
      ? "EW"
      : /灭绝|\/?EX\b/.test(m)
      ? "EX"
      : null,
    catalog: /图鉴目录|物种目录|全部物种|所有物种|物种列表|浏览全部|目录页/.test(m) || (nav.test(m) && /目录|列表/.test(m)),
    home: /回(到)?首页|回到主页|去首页|打开首页/.test(m),
    comparePage: (nav.test(m) && /(对比|比较)/.test(m)) || /(对比|比较)(页|页面|视图|托盘)/.test(m),
    favPage: (nav.test(m) && /(收藏|标本夹|书签)/.test(m)) || /(收藏夹|标本夹)(页|页面|视图)/.test(m),
    explorePage: (nav.test(m) && /(分类树|探索|演化树|生命之树)/.test(m)) || /(分类树|探索|演化树)(页|页面)/.test(m),
    stats: /(收录|一共|总共|有多少|多少个|多少物种|几[个位条种]|统计|规模|数据量)/.test(m),
    kingdom: null,
    kingdomZh: null,
    kingdomCount: null,
    phylum: null,
    phylumZh: null,
    phylumCount: null,
    faq: /怎么用|如何使用|有什么功能|功能介绍|使用指南|使用帮助|操作指南|怎么操作|有哪些功能|快捷键|帮助/.test(m),
    compareHow: /(怎么|如何|怎样).*(对比|比较)/.test(m),
    favHow: /(怎么|如何|怎样).*(收藏|书签|标本夹|保存)/.test(m),
    aboutContext: !!ctx && /(这个物种|当前物种|这个条目|它|这个家伙|正在看)/.test(m),
    compareCmd: !!splitCompareTerms(m),
  };
}

// ============================== 意图型回答(离线也可用) ==============================
const OFFLINE_HEAD = "**[离线检索模式]** 阿博的「大脑」(大语言模型)暂时限流,以下回答由本地图鉴数据库直接检索生成:";

/** 物种详档(离线模式的深度回答) */
function speciesDossier(c: Candidate, path: string): string {
  const lines: string[] = [];
  const rankTag = c.rank === "species" ? "" : `〔${c.rank === "phylum" ? "门" : c.rank === "class" ? "纲" : c.rank === "order" ? "目" : c.rank === "family" ? "科" : c.rank === "genus" ? "属" : c.rank}〕`;
  const cons = c.conservation ? ` · IUCN ${c.conservation}${IUCN_CN[c.conservation] ? `(${IUCN_CN[c.conservation]})` : ""}` : "";
  lines.push(`### [[${c.id}]] **${c.chineseName}**${rankTag} *${c.latinName}*${cons}`);
  if (path) lines.push(`> 分类路径:${path}`);
  if (c.description) lines.push(`**概览** — ${c.description}`);
  if (c.morphology) lines.push(`**形态** — ${c.morphology.slice(0, 120)}`);
  if (c.habitat) lines.push(`**生境** — ${c.habitat.slice(0, 100)}`);
  if (c.distribution) lines.push(`**分布** — ${c.distribution.slice(0, 100)}`);
  const facts: string[] = [];
  if (c.etymology) facts.push(`词源:${c.etymology.slice(0, 60)}`);
  if (c.discovery) facts.push(`发现史:${c.discovery.slice(0, 60)}`);
  if (c.genomeInfo) facts.push(`基因组:${c.genomeInfo.slice(0, 60)}`);
  if (c.ecologyRole) facts.push(`生态位:${c.ecologyRole.slice(0, 60)}`);
  if (c.researchValue) facts.push(`科研价值:${c.researchValue.slice(0, 60)}`);
  if (facts.length) lines.push(facts.map((f) => `- ${f}`).join("\n"));
  return lines.join("\n\n");
}

/** 离线降级:LLM 不可用时,基于意图 + 库内检索合成回答 */
async function buildFallbackReply(
  userText: string,
  cands: Candidate[],
  speciesTotal: number,
  intents: Intents,
  ctx: ContextTaxon | null,
  actions: AgentAction[],
  followUps: string[]
): Promise<string> {
  const m = userText.trim();
  const lines: string[] = [OFFLINE_HEAD, ""];

  // ---- 纯导航意图:简短确认 + 动作按钮 ----
  if (intents.redlist) {
    const iucnRows = await db.taxon.groupBy({
      by: ["conservation"], _count: true,
      where: { rank: "species", conservation: { not: null } },
    });
    const cnt = (code: string) => iucnRows.find((r) => r.conservation === code)?._count ?? 0;
    lines.push(`**红色名录专题 Rubrum Index** 汇集了图鉴全部受威胁物种:`);
    lines.push(`- 极危 CR:${cnt("CR")} 种 · 濒危 EN:${cnt("EN")} 种 · 易危 VU:${cnt("VU")} 种 · 野外灭绝 EW:${cnt("EW")} 种`);
    actions.push({ label: intents.iucnLevel ? `前往红色名录 · ${intents.iucnLevel} 分组` : "前往红色名录专题", kind: "navigate", target: intents.iucnLevel ? `redlist:${intents.iucnLevel}` : "redlist" });
    followUps.push("极危 CR 的物种都有哪些?");
    return lines.join("\n");
  }
  if (intents.catalog) {
    lines.push(`**图鉴目录**收录全部 ${speciesTotal} 个物种,支持按界、IUCN 等级、标签、配图状态过滤,还有卡片/列表两种密度与「分享筛选」功能。`);
    actions.push({ label: "打开图鉴目录", kind: "navigate", target: "browse" });
    followUps.push("植物界有哪些代表物种?");
    return lines.join("\n");
  }
  if (intents.home) {
    lines.push("好的,这就带你回到首页总览。");
    actions.push({ label: "回到首页", kind: "navigate", target: "home" });
    return lines.join("\n");
  }
  if (intents.comparePage) {
    lines.push("打开物种对比视图——把 2-3 个物种放进托盘,即可并排比较分类、形态、生境与保护等级,支持导出 Markdown/CSV/JSON。");
    actions.push({ label: "打开对比视图", kind: "navigate", target: "compare" });
    return lines.join("\n");
  }
  // ---- 对比指令已解析出两个物种 ----
  if (intents.compareCmd) {
    const act = actions.find((a) => a.kind === "compareIds");
    if (act) {
      const ids = act.target.split(",");
      const rows = await db.taxon.findMany({
        where: { id: { in: ids } },
        select: { id: true, chineseName: true, latinName: true, conservation: true, distribution: true, ecologyRole: true },
      });
      const ra = rows.find((r) => r.id === ids[0]);
      const rb = rows.find((r) => r.id === ids[1]);
      if (ra && rb) {
        lines.push(`已为你在库内定位到两个物种,点下方按钮即可装载对比托盘:`);
        lines.push(`- [[${ra.id}]] **${ra.chineseName}**(*${ra.latinName}*)${ra.conservation ? ` · IUCN ${ra.conservation}` : ""}`);
        lines.push(`- [[${rb.id}]] **${rb.chineseName}**(*${rb.latinName}*)${rb.conservation ? ` · IUCN ${rb.conservation}` : ""}`);
        lines.push("对比页支持并排比较分类/形态/科学档案,并可导出 Markdown、CSV 与 JSON。");
        cands.length = 0;
        cands.push(ra as any, rb as any);
        followUps.length = 0;
        followUps.push(`详细介绍${ra.chineseName}`, `详细介绍${rb.chineseName}`);
        return lines.join("\n");
      }
    }
  }
  if (intents.favPage) {
    lines.push("打开标本收藏夹——你在本机收藏的物种都保存在这里(上限 60 件,跨会话保留)。");
    actions.push({ label: "打开标本夹", kind: "navigate", target: "favorites" });
    return lines.join("\n");
  }
  if (intents.explorePage) {
    lines.push("打开分类探索——沿「域-界-门-纲-目-科-属-种」逐级下潜,每个节点都标有物种计数。");
    actions.push({ label: "进入分类探索", kind: "navigate", target: "explore" });
    return lines.join("\n");
  }

  // ---- 随机物种 ----
  if (intents.random) {
    const ids = (await db.$queryRaw<{ id: string }[]>`SELECT id FROM Taxon WHERE rank = 'species' ORDER BY RANDOM() LIMIT 3`) || [];
    if (ids.length) {
      const rows = await db.taxon.findMany({
        where: { id: { in: ids.map((r) => r.id) } },
        select: {
          id: true, latinName: true, chineseName: true, rank: true, description: true,
          image: true, conservation: true, parentId: true,
        },
      });
      lines.push("🎲 命运的骰子已经掷出,为你抽到:");
      for (const r of rows) {
        cands.push({ ...r });
        const cons = r.conservation ? ` · IUCN ${r.conservation}` : "";
        lines.push(`- [[${r.id}]] **${r.chineseName}**(*${r.latinName}*)${cons}——${(r.description || "").slice(0, 50)}…`);
      }
      actions.push({ label: "🎲 再抽一个", kind: "random", target: "random" });
      followUps.push("多讲讲其中第一个物种");
      return lines.join("\n");
    }
  }

  // ---- 统计概览(用户未点名具体物种时) ----
  const mentionsSpecies = cands
    .slice(0, 3)
    .some((c) => m.includes(c.chineseName) || m.toLowerCase().includes(c.latinName.toLowerCase()));
  if (intents.stats && !mentionsSpecies && !intents.kingdom && !intents.phylum) {
    const phyla = await db.taxon.count({ where: { rank: "phylum" } });
    const families = await db.taxon.count({ where: { rank: "family" } });
    const genera = await db.taxon.count({ where: { rank: "genus" } });
    const images = await db.taxon.count({ where: { rank: "species", image: { not: null } } });
    const total = await db.taxon.count();
    lines.push(`**BioCodex 收录规模一览:**`);
    lines.push(`- 物种:${speciesTotal} 种(分类单元共 ${total} 条)`);
    lines.push(`- 阶元覆盖:${phyla} 门 · ${families} 科 · ${genera} 属`);
    lines.push(`- 配图:${images} 种(复古博物学插画)`);
    lines.push(`- 科学档案:词源/发现史/基因组/生态位/科研价值已全覆盖`);
    followUps.push("各界的物种数量分别是多少?", "随机来一个物种");
    return lines.join("\n");
  }

  // ---- 门级概览 ----
  if (intents.phylum && intents.phylumZh) {
    lines.push(`**${intents.phylumZh}速览** — 图鉴共收录该门 **${intents.phylumCount ?? "?"}** 个物种,代表条目:`);
    for (const c of cands.slice(0, 6)) {
      const cons = c.conservation ? ` · IUCN ${c.conservation}` : "";
      lines.push(`- [[${c.id}]] **${c.chineseName}**(*${c.latinName}*)${cons}`);
    }
    lines.push("目录现已支持**按门筛选**(48 门可搜索下拉),点下方按钮直达:");
    if (!actions.some((a) => a.target === `browse:phylum=${intents.phylum}`)) {
      actions.push({ label: `📖 目录筛选:${intents.phylumZh}(${intents.phylumCount ?? ""} 种)`, kind: "navigate", target: `browse:phylum=${intents.phylum}` });
    }
    followUps.push(`详细介绍${cands[0]?.chineseName || "大熊猫"}`);
    return lines.join("\n");
  }

  // ---- 界/域概览 ----
  if (intents.kingdom && intents.kingdomZh) {
    lines.push(`**${intents.kingdomZh}概览** — 图鉴共收录该界 **${intents.kingdomCount ?? "?"}** 个物种,代表条目:`);
    for (const c of cands.slice(0, 6)) {
      const cons = c.conservation ? ` · IUCN ${c.conservation}` : "";
      lines.push(`- [[${c.id}]] **${c.chineseName}**(*${c.latinName}*)${cons}`);
    }
    followUps.push(`详细介绍${cands[0]?.chineseName || "大熊猫"}`, "带我去图鉴目录");
    actions.push({ label: "打开图鉴目录", kind: "navigate", target: "browse" });
    return lines.join("\n");
  }

  // ---- 使用指南 / 功能 FAQ ----
  if (intents.faq) {
    lines.push("**BioCodex 功能速览:**");
    lines.push("- 🔍 **全局搜索**(⌘K / Ctrl+K):拉丁学名、中文名、关键词全库检索");
    lines.push("- 🌳 **分类探索**:沿域-界-门-纲-目-科-属-种逐级下潜,附物种计数与演化谱系时间轴");
    lines.push("- 📖 **图鉴目录**:按界/IUCN/标签/配图过滤,卡片/列表双密度,筛选可分享、可记忆");
    lines.push("- ⚖️ **物种对比**:2-3 物种并排比较,可导出 Markdown/CSV/JSON");
    lines.push("- 🔴 **红色名录专题**:按 EW/CR/EN/VU 分组浏览受威胁物种");
    lines.push("- 🔖 **标本收藏夹**:书签收藏,支持备份导出/导入");
    lines.push("- 🧭 **浏览足迹**:回到刚才看过的物种;❓ 按键盘 **?** 随时查看快捷键");
    followUps.push("带我去红色名录专题", "怎么把物种加入对比?");
    return lines.join("\n");
  }
  if (intents.compareHow) {
    lines.push("**加入对比的两种方式:**");
    lines.push("1. 物种卡片/详情页点 **⚖️ 对比按钮**(或本面板条目卡旁的天平图标),最多放入 3 个物种");
    lines.push("2. 底部托盘出现后点 **「开始对比」**,即可并排比较;对比页内还能「搜索添加物种」");
    lines.push("对比结果可一键 **导出 Markdown / CSV / JSON**,或复制分享链接。");
    followUps.push("打开对比视图");
    return lines.join("\n");
  }
  if (intents.favHow) {
    lines.push("**收藏物种:**卡片悬停点书签图标、详情页右上「收藏」按钮,或直接按 **F** 键。收藏上限 60 件,存于本机浏览器;头栏书签图标打开标本夹,支持导出/导入 JSON 备份。");
    followUps.push("打开标本收藏夹");
    return lines.join("\n");
  }

  // ---- 上下文指代:正在查看的物种 ----
  if (ctx && intents.aboutContext) {
    const row = await db.taxon.findUnique({
      where: { id: ctx.id },
      select: {
        id: true, latinName: true, chineseName: true, rank: true, description: true,
        morphology: true, habitat: true, distribution: true, conservation: true,
        etymology: true, discovery: true, genomeInfo: true, ecologyRole: true, researchValue: true,
        parentId: true, image: true,
      },
    });
    if (row) {
      cands.length = 0;
      cands.push(row);
      lines.push(`你正在查看的条目,档案如下:`);
      lines.push(speciesDossier(row, ""));
      followUps.push("它同属的亲戚有哪些?", "带我去红色名录看看它的保护状况");
      return lines.join("\n");
    }
  }

  // ---- 普通检索结果 ----
  if (!cands.length) {
    lines.push(`本次未直接命中「${m.slice(0, 24)}」相关条目。建议:`);
    lines.push("- 换成更具体的名称,如「大熊猫」「大肠杆菌」「中华鲟」「老虎」");
    lines.push("- 使用顶栏全局搜索(⌘K / Ctrl+K),支持拉丁学名、中文名与关键词");
    lines.push("- 试试「随机来一个物种」或「图鉴里收录了多少物种?」");
    followUps.push("随机来一个物种", "图鉴有什么功能?");
    return lines.join("\n");
  }

  // 深度档案:问句像"介绍/是什么"时给详档,否则给列表
  const wantsDetail = /介绍|是什么|讲讲|详(细|情)|档案|全貌|它是/.test(m);
  if (wantsDetail && cands[0]) {
    const top = await db.taxon.findUnique({
      where: { id: cands[0].id },
      select: {
        id: true, latinName: true, chineseName: true, rank: true, description: true,
        morphology: true, habitat: true, distribution: true, conservation: true,
        etymology: true, discovery: true, genomeInfo: true, ecologyRole: true, researchValue: true,
        parentId: true, image: true,
      },
    });
    if (top) {
      lines.push(speciesDossier(top, ""));
      if (cands.length > 1) {
        lines.push(`\n**相关条目:**${cands.slice(1, 4).map((c) => `[[${c.id}]] ${c.chineseName}`).join(" · ")}`);
      }
      followUps.push(`讲讲${cands[0].chineseName}的基因组`, "带我去红色名录专题");
      return lines.join("\n");
    }
  }

  for (const c of cands.slice(0, 5)) {
    const cons = c.conservation ? `,IUCN ${c.conservation}${IUCN_CN[c.conservation] ? `(${IUCN_CN[c.conservation]})` : ""}` : "";
    const desc = (c.description || "图鉴收录条目").replace(/\s+/g, "").slice(0, 60);
    const rankTag = c.rank === "species" ? "" : `〔${c.rank === "phylum" ? "门" : c.rank === "class" ? "纲" : c.rank === "order" ? "目" : c.rank === "family" ? "科" : c.rank === "genus" ? "属" : c.rank}〕`;
    lines.push(`- [[${c.id}]] **${c.chineseName}**${rankTag}(*${c.latinName}*)${cons}——${desc}…`);
    const facts: string[] = [];
    if (c.etymology) facts.push(`词源:${c.etymology.slice(0, 50)}`);
    if (c.genomeInfo) facts.push(`基因组:${c.genomeInfo.slice(0, 50)}`);
    if (c.researchValue) facts.push(`科研价值:${c.researchValue.slice(0, 50)}`);
    if (facts.length) lines.push(`  - ${facts.join(";")}`);
  }
  lines.push("");
  const hit = cands.length > 5 ? `仅展示前 5 条(共命中 ${cands.length} 条,` : "(";
  lines.push(`${hit}全库 ${speciesTotal} 物种)。点击条目名可直达图鉴页,下方卡片可加入对比或收进标本夹。`);
  followUps.push(`详细介绍${cands[0].chineseName}`, "随机来一个物种");
  return lines.join("\n");
}

// ============================== 主流程 ==============================
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages: ChatMsg[] = Array.isArray(body?.messages) ? body.messages : [];
    const ctx: ContextTaxon | null = body?.context?.id ? body.context : null;
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUser) {
      return NextResponse.json({ success: false, error: "缺少用户消息" }, { status: 400 });
    }

    const intents = detectIntents(lastUser.content, ctx);
    const actions: AgentAction[] = [];
    const followUps: string[] = [];

    // ===== 检索库内相关分类单元 =====
    let candidates: Candidate[] = await searchCandidates(extractTerms(lastUser.content));
    const lowerMsg = lastUser.content;

    // ===== 「对比 A 和 B」指令:解析两个物种并直接装载托盘(在线/离线均生效) =====
    if (intents.compareCmd) {
      const terms = splitCompareTerms(lastUser.content);
      if (terms) {
        const [hitA, hitB] = await Promise.all(
          terms.map(async (t) => {
            // 原始词 + 抽取词双路检索,评分选最佳(精确名优先)
            const cs = await searchCandidates([t, ...extractTerms(t)]);
            return pickBestCandidate(t, cs);
          })
        );
        if (hitA && hitB && hitA.id !== hitB.id) {
          actions.push({
            label: `⚖️ 装载对比:${hitA.chineseName} vs ${hitB.chineseName}`,
            kind: "compareIds",
            target: `${hitA.id},${hitB.id}`,
          });
          followUps.push(`${hitA.chineseName}和${hitB.chineseName}哪个更濒危?`);
        }
      }
    }

    // 保护状况关键词命中时,补充相应等级的物种
    const conservationHit: Record<string, string[]> = {
      极危: ["CR"], 濒危: ["EN", "CR"], 易危: ["VU"], 灭绝: ["EX", "EW"],
      保护: ["CR", "EN", "VU", "EW"], 红色名录: ["CR", "EN", "VU"],
    };
    const wantedCodes = new Set<string>();
    for (const [kw, codes] of Object.entries(conservationHit)) {
      if (lowerMsg.includes(kw)) codes.forEach((c) => wantedCodes.add(c));
    }
    if (wantedCodes.size && !intents.redlist) {
      const cons = await db.taxon.findMany({
        where: {
          rank: "species",
          conservation: { in: [...wantedCodes] },
          OR: [{ tags: { contains: "flagship" } }, { description: { contains: "保护" } }],
        },
        select: { id: true },
        take: 30,
      });
      const have = new Set(candidates.map((c) => c.id));
      const extraIds = cons.map((c) => c.id).filter((id) => !have.has(id)).slice(0, 6);
      if (extraIds.length) {
        const extra = await db.taxon.findMany({
          where: { id: { in: extraIds } },
          select: {
            id: true, latinName: true, chineseName: true, rank: true,
            description: true, image: true, conservation: true, parentId: true,
          },
        });
        candidates = [...candidates, ...extra];
      }
    }

    // 界/域概览意图:该界物种数量 + 代表物种
    const kingdomHit = KINGDOM_PATTERNS.find((k) => k.re.test(lowerMsg));
    const listingCue = /有哪些|有什么|都有什么|代表|明星|概览|一览|种类|清单|给我列|都包括|包含哪些/;
    if (kingdomHit && (candidates.filter((c) => c.rank === "species").length < 5 || listingCue.test(lowerMsg))) {
      intents.kingdom = kingdomHit.la;
      intents.kingdomZh = kingdomHit.zh;
      const kpaths = await getKingdomPaths();
      // 全库物种按首段界名归组计数
      const speciesRows = await db.taxon.findMany({ where: { rank: "species" }, select: { id: true } });
      intents.kingdomCount = speciesRows.filter((s) => (kpaths.get(s.id) || [])[0] === kingdomHit.la).length;
      // 代表物种:该界 flagship
      const reps = await db.taxon.findMany({
        where: { rank: "species", tags: { contains: "flagship" }, parentId: { not: null } },
        select: {
          id: true, latinName: true, chineseName: true, rank: true,
          description: true, image: true, conservation: true, parentId: true,
        },
        take: 200,
      });
      const inKingdom = reps.filter((r) => (kpaths.get(r.id) || [])[0] === kingdomHit.la);
      candidates = inKingdom.slice(0, 8);
    }

    // ===== 门级浏览意图:命中某门中文名(带或不带「门」字)+ 浏览/列举语气 =====
    const phylumCue = /有哪些|有什么|都有什么|种类|多少|清单|一览|代表|看看|浏览|列出|过一遍|目录|带我去|打开/;
    if (phylumCue.test(lowerMsg) && !intents.kingdom) {
      const phylaRows = await db.taxon.findMany({
        where: { rank: "phylum" },
        select: { latinName: true, chineseName: true },
        orderBy: { latinName: "asc" },
      });
      // 优先全名匹配(环节动物门),再短名(环节动物,至少 4 字防误伤)
      let phylumHit: { latinName: string; chineseName: string } | null = null;
      for (const p of phylaRows) {
        if (lowerMsg.includes(p.chineseName)) { phylumHit = p; break; }
      }
      if (!phylumHit) {
        for (const p of phylaRows) {
          const short = p.chineseName.replace(/门$/, "");
          if (short.length >= 4 && lowerMsg.includes(short)) { phylumHit = p; break; }
        }
      }
      if (phylumHit) {
        const ppaths = await getPhylumPaths();
        const speciesIds = await db.taxon.findMany({ where: { rank: "species" }, select: { id: true } });
        intents.phylum = phylumHit.latinName;
        intents.phylumZh = phylumHit.chineseName;
        intents.phylumCount = speciesIds.filter((s) => (ppaths.get(s.id) || [])[0] === phylumHit!.latinName).length;
        // 门内代表物种:flagship 优先,不足补前排
        const allSp = await db.taxon.findMany({
          where: { rank: "species" },
          orderBy: { sortOrder: "asc" },
          select: {
            id: true, latinName: true, chineseName: true, rank: true,
            description: true, image: true, conservation: true, parentId: true, tags: true,
          },
        });
        const inPhylum = allSp.filter((s) => (ppaths.get(s.id) || [])[0] === phylumHit!.latinName);
        const flagged = inPhylum.filter((s) => (s.tags || "").includes("flagship"));
        const repsPhylum = (flagged.length >= 4 ? flagged : inPhylum).slice(0, 8);
        if (repsPhylum.length) candidates = repsPhylum.map(({ tags: _tags, ...rest }) => rest);
        followUps.push(`${phylumHit.chineseName}里最出名的物种是?`);
      }
    }

    const paths = await getKingdomPaths();

    // ===== 检索候选补全科学档案字段(LLM 与降级回答均可用) =====
    if (candidates.length) {
      const profileRows = await db.taxon.findMany({
        where: { id: { in: candidates.map((c) => c.id) } },
        select: {
          id: true, etymology: true, discovery: true, genomeInfo: true,
          ecologyRole: true, researchValue: true, morphology: true, habitat: true, distribution: true,
        },
      });
      const profMap = new Map(profileRows.map((p) => [p.id, p]));
      candidates = candidates.map((c) => {
        const p = profMap.get(c.id);
        return p ? { ...c, ...p } : c;
      });
    }

    // 上下文物种置顶
    if (ctx && !candidates.some((c) => c.id === ctx.id)) {
      const row = await db.taxon.findUnique({
        where: { id: ctx.id },
        select: {
          id: true, latinName: true, chineseName: true, rank: true,
          description: true, image: true, conservation: true, parentId: true,
        },
      });
      if (row) candidates.unshift(row);
    }

    const brief = candidates.slice(0, 12).map((c) => {
      const path = (paths.get(c.id) || []).join("/");
      const parts: string[] = [
        `- [[${c.id}]] ${c.chineseName}(${c.latinName}),分类:${path},阶元:${c.rank}${c.conservation ? `,IUCN:${c.conservation}` : ""}。简介:${(c.description || "暂无").slice(0, 80)}…`,
      ];
      if (c.etymology) parts.push(`  词源:${c.etymology.slice(0, 70)}`);
      if (c.discovery) parts.push(`  发现史:${c.discovery.slice(0, 70)}`);
      if (c.genomeInfo) parts.push(`  基因组:${c.genomeInfo.slice(0, 70)}`);
      if (c.ecologyRole) parts.push(`  生态位:${c.ecologyRole.slice(0, 70)}`);
      if (c.researchValue) parts.push(`  科研价值:${c.researchValue.slice(0, 70)}`);
      return parts.join("\n");
    });

    // ===== 旗舰物种速查表(供推荐时引用) =====
    const flagshipRows = await db.taxon.findMany({
      where: { rank: "species", tags: { contains: "flagship" } },
      orderBy: { sortOrder: "asc" },
      select: { id: true, chineseName: true, latinName: true, conservation: true },
      take: 90,
    });
    const flagshipList = flagshipRows
      .map((f) => `- [[${f.id}]] ${f.chineseName}(${f.latinName})${f.conservation ? `[${f.conservation}]` : ""}`)
      .join("\n");

    // ===== 图鉴全局概览 =====
    const tree = await getTree();
    const speciesTotal = await db.taxon.count({ where: { rank: "species" } });
    const phylaList: string[] = [];
    const walkPhyla = (nodes: any[]) => {
      for (const n of nodes) {
        if (n.rank === "phylum") phylaList.push(`${n.cn}(${n.la},${n.sc}种)`);
        else if (n.rank !== "species" && n.rank !== "genus" && n.rank !== "family" && n.rank !== "order" && n.rank !== "class") walkPhyla(n.children);
      }
    };
    walkPhyla(tree);

    const ctxLine = ctx ? `用户当前正在查看图鉴页面:${ctx.name}(*${ctx.latin}*) [[${ctx.id}]];若用户提到「这个/它」,指的就是该条目。` : "";
    const system = `你是"BioCodex 生物图鉴"内置的 AI 博物学家助手,名叫"阿博"。你熟稔生物分类学、生态学与保护生物学,语气专业而亲切,像一位博学的自然博物馆讲解员。

《图鉴概览》本图鉴收录 ${speciesTotal} 个物种、覆盖从细菌古菌、原生生物、真菌、植物到无脊椎动物与脊椎动物的所有主要门类,分类阶元为域-界-门-纲-目-科-属-种。主要门类包括:${phylaList.slice(0, 20).join("、")} 等。
${ctxLine}
《本轮检索到的库内条目》:
${brief.length ? brief.join("\n") : "(未检索到直接匹配的条目,可依据知识回答,或建议用户换个说法)"}

《库内旗舰物种速查表》(推荐/举例时优先从这里选):
${flagshipList}

回答规范:
0. 《本轮检索到的库内条目》中附有「词源/发现史/基因组/生态位/科研价值」科学档案摘要——用户问及学名由来、发现历史、基因组数据、生态作用或科研价值时,优先引用这些档案信息,并注明可在物种详情页「科学档案」区块查看全文。
1. 用中文回答;物种名首次出现时给出中文+斜体拉丁学名(拉丁名用 *斜体*)。
2. [[id]] 引用标记只能使用上述两个清单中真实出现的 id,绝对不要编造、也不要写"[[需确认id]]"之类的占位符——清单里没有的物种,直接用普通文字提及并说明"图鉴暂未收录"。
3. 引用标记应紧跟物种名,如:大熊猫 [[id]] 是熊科的旗舰物种。
4. 适当使用要点列表让回答更清晰;长度控制在 300 字以内,除非用户要求详细展开。
5. 若用户想找某类生物,推荐 2-5 个库内条目并附 [[id]] 引用标记,邀请用户点击查看图鉴页面。
6. 涉及保护等级时使用 IUCN 代码并解释。诚实为本:不确定的就说不确定,不编造数据。
7. 介绍网站功能时:除分类树探索外,还有「图鉴目录」(顶栏,可按界、门(48 门可搜索下拉)、IUCN 等级、标签过滤全部物种,物种卡片附门级徽标)与「物种对比」(在物种卡片或详情页点「对比」,把 2-3 个物种加入底部托盘后即可并排比较分类、形态、生境与保护等级)。用户问某门物种(如「环节动物门有哪些」「看看棘皮动物」)时,系统会自动附上直达目录门级筛选的按钮。用户想比较物种时,引导其使用对比功能;若用户说「帮我对比 A 和 B」,系统会自动解析两个物种并附上一键装载对比托盘的按钮,你可以顺带预览两者的关键差异。
8. 对比视图还支持「导出 Markdown」(一键复制对比表)与「复制分享链接」;聊天回答下方与我消息里的引用条目卡片旁有对比小按钮,可直接把物种加入托盘。首页「新页速递」展示最近配图的物种。
9. 更多功能提示:图鉴目录有「卡片/列表」两种密度切换与「分享筛选」;目录筛选在离开再返回后会自动保留;按键盘 ? 键可随时查看快捷键速查表(⌘K 聚焦搜索、Esc 关闭弹窗、详情页 ←/→ 切换同属物种);物种详情页与探索页的面包屑上标有各级类群的物种计数。
10. 最新功能:物种详情页右栏有「演化谱系」竖向时间轴(域→…→种的完整下潜路径,每个节点可点击上溯,末端标"你在此处");首页六大家族卡片内有各门物种数迷你条形图;首页「图鉴轮盘」是摇号动效抽取物种;对比视图支持「导出 CSV」;头栏有「浏览足迹」按钮(时钟图标,记录你最近翻过的页面,可一键回到刚才看过的物种)。介绍功能时优先提及这些。
11. 「标本收藏夹」:在物种卡片悬停点书签图标、或详情页右上角「收藏」按钮(快捷键 F)可把心动物种收进标本夹(存本机浏览器,上限60件,跨会话保留);头栏书签图标可随时打开收藏夹视图,可一键把全部收藏放进对比托盘。用户说"收藏/ bookmark/ 心动/ 想留着"时,引导其使用该功能。
12. 「红色名录专题」:首页 IUCN 保护状况卡下方有「红色名录专题 Rubrum Index」入口,进入后按受威胁等级(EW野外灭绝/CR极危/EN濒危/VU易危)分组展示全部受威胁物种,附危机统计带与低危折叠区;专题页顶部可按界筛选,每个等级分组有「全部加入对比」按钮。用户问"濒危/极危/受威胁/保护动物"等话题时,优先推荐此专题。
13. 「引用格式」:物种详情页右栏有「引用格式 CITATIO」区块,可一键复制分类学引用(斜体学名+命名人)或图鉴条目完整引用;对比视图内点「搜索添加一个物种」可弹出快速选择器;收藏夹支持「导出备份/导入备份」JSON 文件。`;

    // ===== 调用 LLM(失败自动重试一次,仍失败则降级为意图+本地检索回答) =====
    let content = "";
    let degraded = false;
    const zai = await ZAI.create();
    const callLlm = async () => {
      const completion = await zai.chat.completions.create({
        messages: [
          { role: "assistant", content: system },
          ...messages.slice(-12).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        ],
        thinking: { type: "disabled" },
      });
      return completion.choices[0]?.message?.content || "";
    };
    try {
      content = await callLlm();
    } catch (e1) {
      console.error("agent LLM first attempt failed:", e1 instanceof Error ? e1.message : e1);
      try {
        await new Promise((r) => setTimeout(r, 1500));
        content = await callLlm();
      } catch (e2) {
        console.error("agent LLM retry failed, fallback to local retrieval mode");
        degraded = true;
        content = await buildFallbackReply(lastUser.content, candidates, speciesTotal, intents, ctx, actions, followUps);
      }
    }
    if (!content.trim() && !degraded) {
      degraded = true;
      content = await buildFallbackReply(lastUser.content, candidates, speciesTotal, intents, ctx, actions, followUps);
    }

    // 意图动作在 LLM 模式下同样生效(如「带我去红色名录」仍给出按钮)
    if (!degraded && intents.redlist) actions.push({ label: intents.iucnLevel ? `前往红色名录 · ${intents.iucnLevel}` : "前往红色名录专题", kind: "navigate", target: intents.iucnLevel ? `redlist:${intents.iucnLevel}` : "redlist" });
    if (!degraded && intents.catalog) actions.push({ label: "打开图鉴目录", kind: "navigate", target: "browse" });
    if (!degraded && intents.phylum) actions.push({ label: `📖 目录筛选:${intents.phylumZh}(${intents.phylumCount ?? ""} 种)`, kind: "navigate", target: `browse:phylum=${intents.phylum}` });
    if (!degraded && intents.random) actions.push({ label: "🎲 再抽一个", kind: "random", target: "random" });

    // ===== 附带可跳转的匹配条目(供前端渲染卡片) =====
    const citedIds = [...content.matchAll(/\[\[([a-zA-Z0-9]+)\]\]/g)].map((m) => m[1]);
    const allIds = [...new Set([...citedIds, ...candidates.map((c) => c.id)])].slice(0, 10);
    const matchRows = allIds.length
      ? await db.taxon.findMany({
          where: { id: { in: allIds } },
          select: {
            id: true, latinName: true, chineseName: true, rank: true,
            description: true, image: true, conservation: true, parentId: true,
          },
        })
      : [];
    const matchOrder = new Map(allIds.map((id, i) => [id, i]));
    const matches = matchRows
      .sort((a, b) => matchOrder.get(a.id)! - matchOrder.get(b.id)!)
      .map((r) => ({
        id: r.id,
        latinName: r.latinName,
        chineseName: r.chineseName,
        rank: r.rank,
        image: r.image,
        conservation: r.conservation,
        kingdom: (paths.get(r.id) || []).slice(-1)[0] || "",
      }));

    return NextResponse.json({
      success: true,
      content,
      matches,
      degraded,
      actions: actions.slice(0, 4),
      followUps: [...new Set(followUps)].slice(0, 3),
    });
  } catch (e: any) {
    console.error("agent error", e);
    return NextResponse.json(
      { success: false, error: "助手暂时失联,请稍后再试" },
      { status: 500 }
    );
  }
}
