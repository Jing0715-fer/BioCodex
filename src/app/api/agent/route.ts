import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import { db } from "@/lib/db";
import { getFlatTaxa, getKingdomPaths, getTree } from "@/lib/bio-server";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

interface ChatMsg {
  role: "user" | "assistant";
  content: string;
}

const IUCN_CN: Record<string, string> = {
  EX: "灭绝", EW: "野外灭绝", CR: "极危", EN: "濒危", VU: "易危",
  NT: "近危", LC: "无危", DD: "数据缺乏",
};

/** 离线降级:LLM 不可用时,基于库内检索结果合成回答(保留 [[id]] 引用芯片,含科学档案) */
function buildFallbackReply(
  userText: string,
  cands: {
    id: string; latinName: string; chineseName: string; rank: string;
    description: string | null; conservation: string | null;
    etymology?: string | null; discovery?: string | null; genomeInfo?: string | null;
    ecologyRole?: string | null; researchValue?: string | null;
  }[],
  speciesTotal: number
): string {
  const head = "**[离线检索模式]** 阿博的「大脑」(大语言模型)暂时限流,以下回答由本地图鉴数据库直接检索生成:";
  if (!cands.length) {
    return [
      head,
      "",
      `本次未直接命中「${userText.slice(0, 24)}」相关条目。建议:`,
      "- 换成更具体的名称,如「大熊猫」「大肠杆菌」「中华鲟」",
      "- 使用顶栏全局搜索(按 ⌘K/Ctrl+K),支持拉丁学名、中文名与关键词",
      "- 稍后再来,阿博恢复后可回答开放性问题",
    ].join("\n");
  }
  const lines: string[] = [head, ""];
  for (const c of cands.slice(0, 5)) {
    const cons = c.conservation ? `,IUCN ${c.conservation}${IUCN_CN[c.conservation] ? `(${IUCN_CN[c.conservation]})` : ""}` : "";
    const desc = (c.description || "图鉴收录条目").replace(/\s+/g, "").slice(0, 60);
    const rankTag = c.rank === "species" ? "" : `〔${c.rank === "phylum" ? "门" : c.rank === "class" ? "纲" : c.rank === "order" ? "目" : c.rank === "family" ? "科" : c.rank === "genus" ? "属" : c.rank}〕`;
    lines.push(`- [[${c.id}]] **${c.chineseName}**${rankTag}(*${c.latinName}*)${cons}——${desc}…`);
    const facts: string[] = [];
    if (c.etymology) facts.push(`词源:${c.etymology.slice(0, 50)}`);
    if (c.discovery) facts.push(`发现史:${c.discovery.slice(0, 50)}`);
    if (c.genomeInfo) facts.push(`基因组:${c.genomeInfo.slice(0, 50)}`);
    if (facts.length) lines.push(`  - ${facts.join(";")}`);
  }
  lines.push("");
  const hit = cands.length > 5 ? `仅展示前 5 条(共命中 ${cands.length} 条,` : "(";
  lines.push(`${hit}全库 ${speciesTotal} 物种)。点击条目名可直达图鉴页,下方卡片可加入对比或收进标本夹。`);
  return lines.join("\n");
}

// 从用户消息中提取检索词(中英混合)
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
}

function extractTerms(text: string): string[] {
  const cleaned = text.replace(/[,.?!;:、,。?!;:""''()\[\]{}]/g, " ");
  const raw = cleaned.split(/\s+/).filter(Boolean);
  const terms: string[] = [];
  for (const t of raw) {
    if (t.length >= 2) terms.push(t);
    // 长中文串切出 2-3 字子串,提高命中率
    if (/[\u4e00-\u9fa5]{4,}/.test(t)) {
      const s = t.match(/[\u4e00-\u9fa5]+/)?.[0] || "";
      for (let i = 0; i + 2 <= s.length; i++) terms.push(s.slice(i, i + 2));
    }
  }
  return [...new Set(terms)].slice(0, 12);
}

async function searchCandidates(terms: string[]): Promise<Candidate[]> {
  if (!terms.length) return [];
  const seen = new Map<string, number>();
  for (const term of terms) {
    const rows = await db.taxon.findMany({
      where: {
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
      },
      select: {
        id: true, latinName: true, chineseName: true, rank: true,
        description: true, image: true, conservation: true, tags: true, parentId: true,
      },
      take: 30,
    });
    for (const r of rows) {
      let w = 1;
      if (r.latinName.toLowerCase().includes(term.toLowerCase())) w += 3;
      if (r.chineseName.includes(term)) w += 3;
      if (r.rank === "species") w += 2;
      if ((r.tags || "").includes("flagship")) w += 1;
      seen.set(r.id, (seen.get(r.id) || 0) + w);
    }
  }
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages: ChatMsg[] = Array.isArray(body?.messages) ? body.messages : [];
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUser) {
      return NextResponse.json({ success: false, error: "缺少用户消息" }, { status: 400 });
    }

    // ===== 检索库内相关分类单元 =====
    const terms = extractTerms(lastUser.content);
    let candidates: Candidate[] = await searchCandidates(terms);
    const lowerMsg = lastUser.content;

    // 保护状况关键词命中时,补充相应等级的物种
    const conservationHit: Record<string, string[]> = {
      极危: ["CR"], 濒危: ["EN", "CR"], 易危: ["VU"], 灭绝: ["EX", "EW"],
      保护: ["CR", "EN", "VU", "EW"], 红色名录: ["CR", "EN", "VU"],
    };
    const wantedCodes = new Set<string>();
    for (const [kw, codes] of Object.entries(conservationHit)) {
      if (lowerMsg.includes(kw)) codes.forEach((c) => wantedCodes.add(c));
    }
    if (wantedCodes.size) {
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
    const paths = await getKingdomPaths();

    // ===== 检索候选补全科学档案字段(LLM 与降级回答均可用) =====
    if (candidates.length) {
      const profileRows = await db.taxon.findMany({
        where: { id: { in: candidates.map((c) => c.id) } },
        select: {
          id: true, etymology: true, discovery: true, genomeInfo: true,
          ecologyRole: true, researchValue: true,
        },
      });
      const profMap = new Map(profileRows.map((p) => [p.id, p]));
      candidates = candidates.map((c) => {
        const p = profMap.get(c.id);
        return p ? { ...c, ...p } : c;
      });
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

    const system = `你是"BioCodex 生物图鉴"内置的 AI 博物学家助手,名叫"阿博"。你熟稔生物分类学、生态学与保护生物学,语气专业而亲切,像一位博学的自然博物馆讲解员。

《图鉴概览》本图鉴收录 ${speciesTotal} 个物种、覆盖从细菌古菌、原生生物、真菌、植物到无脊椎动物与脊椎动物的所有主要门类,分类阶元为域-界-门-纲-目-科-属-种。主要门类包括:${phylaList.slice(0, 20).join("、")} 等。

《本轮检索到的库内条目》:
${brief.length ? brief.join("\n") : "(未检索到直接匹配的条目,可依据知识回答,或建议用户换个说法)"}

《库内旗舰物种速查表》(推荐/举例时优先从这里选):
${flagshipList}

回答规范:
0. 《本轮检索到的库内条目》中附有「词源/发现史/基因组/生态位/科研价值」科学档案摘要——用户问及学名由来、发现历史、基因组数据、生态作用或科研价值时,优先引用这些档案信息(全站 488 物种档案已全覆盖),并注明可在物种详情页「科学档案」区块查看全文。
1. 用中文回答;物种名首次出现时给出中文+斜体拉丁学名(拉丁名用 *斜体*)。
2. [[id]] 引用标记只能使用上述两个清单中真实出现的 id,绝对不要编造、也不要写"[[需确认id]]"之类的占位符——清单里没有的物种,直接用普通文字提及并说明"图鉴暂未收录"。
3. 引用标记应紧跟物种名,如:大熊猫 [[id]] 是熊科的旗舰物种。
4. 适当使用要点列表让回答更清晰;长度控制在 300 字以内,除非用户要求详细展开。
5. 若用户想找某类生物,推荐 2-5 个库内条目并附 [[id]] 引用标记,邀请用户点击查看图鉴页面。
6. 涉及保护等级时使用 IUCN 代码并解释。诚实为本:不确定的就说不确定,不编造数据。
7. 介绍网站功能时:除分类树探索外,还有「图鉴目录」(顶栏,可按界/IUCN 等级/标签过滤全部物种)与「物种对比」(在物种卡片或详情页点「对比」,把 2-3 个物种加入底部托盘后即可并排比较分类、形态、生境与保护等级)。用户想比较物种时,引导其使用对比功能。
8. 对比视图还支持「导出 Markdown」(一键复制对比表,可贴进笔记/文档)与「复制分享链接」(对方打开链接自动还原这份对比);聊天回答下方与我消息里的引用条目卡片旁有对比小按钮,可直接把物种加入托盘。首页「新页速递」展示最近配图的物种。
9. 更多功能提示:图鉴目录有「卡片/列表」两种密度切换与「分享筛选」(复制当前筛选的链接);目录筛选(含关键词/排序)在离开再返回后会自动保留;按键盘 ? 键可随时查看快捷键速查表(⌘K 聚焦搜索、Esc 关闭弹窗、详情页 ←/→ 切换同属物种);物种详情页与探索页的面包屑上标有各级类群的物种计数。
10. 最新功能:物种详情页右栏有「演化谱系」竖向时间轴(域→…→种的完整下潜路径,每个节点可点击上溯,末端标"你在此处");首页六大家族卡片内有各门物种数迷你条形图;首页「图鉴轮盘」是摇号动效抽取物种;对比视图支持「导出 CSV」(直接下载文件,Excel 可开);头栏有「浏览足迹」按钮(时钟图标,记录你最近翻过的页面,可一键回到刚才看过的物种)。介绍功能时优先提及这些。
11. 「标本收藏夹」:在物种卡片悬停点书签图标、或详情页右上角「收藏」按钮(快捷键 F)可把心动物种收进标本夹(存本机浏览器,上限60件,跨会话保留);头栏书签图标可随时打开收藏夹视图,可一键把全部收藏放进对比托盘。用户说"收藏/ bookmark/ 心动/ 想留着"时,引导其使用该功能。
12. 「红色名录专题」:首页 IUCN 保护状况卡下方有「红色名录专题 Rubrum Index」入口,进入后按受威胁等级(EW野外灭绝/CR极危/EN濒危/VU易危)分组展示全部受威胁物种,附危机统计带与低危折叠区;专题页顶部可按界筛选,每个等级分组有「全部加入对比」按钮。物种详情页的 IUCN 徽章、保护状况区的等级牌、以及目录卡片右上角的等级角标均可点击,直达红色名录对应等级分组(自动滚动高亮)。用户问"濒危/极危/受威胁/保护动物"等话题时,优先推荐此专题。另外:收藏夹与图鉴目录都有「卡片/列表」密度切换(共用偏好);对比视图支持导出 Markdown/CSV/JSON 三种格式(JSON 为结构化数据,适合程序分析)。
13. 「引用格式」:物种详情页右栏有「引用格式 CITATIO」区块,可一键复制分类学引用(斜体学名+命名人,如 *Panthera tigris* (Linnaeus, 1758))或图鉴条目完整引用(含检索日期);用户写论文、做笔记、查学名时提示该功能。对比视图内点「搜索添加一个物种」可弹出快速选择器,搜索后直接加入托盘,无需离开对比页;收藏夹支持「导出备份/导入备份」JSON 文件,可跨设备迁移标本。`;

    // ===== 调用 LLM(失败自动重试一次,仍失败则降级为本地检索回答) =====
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
        content = buildFallbackReply(lastUser.content, candidates, speciesTotal);
      }
    }
    if (!content.trim() && !degraded) {
      // LLM 返回空内容时也降级,避免空白回答
      degraded = true;
      content = buildFallbackReply(lastUser.content, candidates, speciesTotal);
    }

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

    return NextResponse.json({ success: true, content, matches, degraded });
  } catch (e: any) {
    console.error("agent error", e);
    return NextResponse.json(
      { success: false, error: "助手暂时失联,请稍后再试" },
      { status: 500 }
    );
  }
}
