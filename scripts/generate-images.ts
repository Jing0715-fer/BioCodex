/// <reference types="bun-types" />
/**
 * BioCodex 物种插画批量生成脚本 V2(生成→VLM 复审闸门→合格才入库)
 *
 * E6 审计教训:AI 图像模型对微观世界/物种鉴别特征掌控薄弱(原始 Fail 33%),
 * "生成即上架"不可行 → 本脚本每张生成图必须通过 VLM 科学性复核才写入 DB,
 * 复审不过的文件隔离到 rejected/,物种保持雕版占位图(科学性零风险)。
 *
 * 环境变量:
 *   BATCH=N        本轮最多处理 N 个(默认全部)
 *   SCOPE=all|flagship  处理范围(默认 flagship)
 *   CONCURRENCY=N  并发 worker 数(默认 2,限流友好)
 *   RETRY=2        每物种最大生成尝试轮数
 *   AUDIT_ONLY=1   仅审计已存在但未入库的文件,不生成新图
 * 断点续跑:/tmp/gen-progress.jsonl 记录已处理物种(id → accepted|rejected),
 *   rejected 的下轮不再重试(宁缺毋滥),accepted 的已入 DB 自然过滤。
 * 用法: BATCH=20 SCOPE=all CONCURRENCY=2 bun scripts/generate-images.ts
 */
import { db } from "../src/lib/db";
import ZAI from "z-ai-web-dev-sdk";
import { existsSync, mkdirSync, renameSync, appendFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = "public/generated";
const REJECTED_DIR = "public/generated/rejected";
const PROGRESS = "/tmp/gen-progress.jsonl";
const BATCH = parseInt(process.env.BATCH || "999", 10);
const SCOPE = process.env.SCOPE || "flagship";
const CONCURRENCY = parseInt(process.env.CONCURRENCY || "2", 10);
const MAX_RETRY = parseInt(process.env.RETRY || "2", 10);
const AUDIT_ONLY = process.env.AUDIT_ONLY === "1";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** 界别构图框架(E6 三轮 prompt 实验收敛版:微观类用显微镜视野构图——实测通过率最高) */
const KINGDOM_STYLE: Record<string, (cn: string, la: string) => string> = {
  Bacteria: (cn, la) =>
    `antique microscope field-of-view plate of ${la} (${cn}): dozens of tiny bacterial cells scattered across the field, drawn as a vintage copperplate engraving with ink stippling and soft watercolor wash on aged parchment, clean composition, no text no letters no labels`,
  Archaea: (cn, la) =>
    `antique microscope field-of-view plate of ${la} (${cn}): dozens of tiny archaeal cells scattered across the field with a faint hint of hot-spring water, vintage copperplate engraving with ink stippling and watercolor on aged parchment, clean composition, no text no letters no labels`,
  Protista: (cn, la) =>
    `antique microscope field-of-view plate of ${la} (${cn}): several small single-celled protists across the round field of view showing their true cell shape and organelles, delicate ink stippling and watercolor tinting, aged parchment, vintage copperplate engraving, no text no letters no labels`,
  Fungi: (cn, la) =>
    `vintage natural history plate of ${la} (${cn}) in its scientifically correct life form as the description states (macro-mushroom cap-gills-stem, OR microscopic hyphae with spores under microscope, OR underground truffle body, OR insect-fungus complex), mycelium threads at base never plant roots, copperplate engraving with watercolor on aged parchment, no text no letters no labels`,
  Plantae: (cn, la) =>
    `vintage botanical illustration of ${la} (${cn}) with botanically accurate leaves, flowers/fruit/cones strictly matching the species description, copperplate engraving with hand-tinted watercolor on aged parchment, no text no letters no labels`,
  Animalia: (cn, la) =>
    `vintage natural history illustration of ${la} (${cn}) in natural posture with the diagnostic anatomy of this exact species per description (proportions, fins/limbs/beak/head), copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels`,
};

/**
 * E10 旗舰疑难物种专属 prompt(两轮通用模板未过审的 15 种,逐种定制鉴别特征构图):
 * 教训锚点——海带曾被画成维管植物(需强调固着器/柄/带片的海底漂姿)、酵母曾单特写失败(需"许多小细胞"构图)、
 * 文昌鱼曾被画成硬骨鱼(需"无头无眼+V形肌节")、鲍曾被画成峨螺(需"耳形扁平+壳孔列")、刺参曾被画成海胆(需"刺参状+背疣足行列")。
 */
const SPECIFIC_PROMPT: Record<string, string> = {
  "Saccharina japonica":
    "vintage phycology seaweed study plate, a pressed marine specimen laid flat on aged parchment: Saccharina japonica (海带 Japanese kelp), one single very long smooth olive-brown ribbon with gently ruffled translucent edges and a subtle darker midline, tapering at the base into a short round stalk that ends in a small forked brown holdfast claw gripping a tiny pebble, herbarium specimen style, delicately watercolored copperplate engraving, no flowers no seeds no soil, no text no letters no labels",
  "Saccharomyces cerevisiae":
    "antique microscope field-of-view plate of Saccharomyces cerevisiae (baker's yeast 酿酒酵母): dozens of tiny oval single-celled fungi like smooth translucent pale grapes or pebbles scattered across the round field, several cells with small round buds pinching off, a few four-spore ascii burst open, ink stippling and watercolor tinting, vintage copperplate engraving on aged parchment, no text no letters no labels",
  "Batrachochytrium dendrobatidis":
    "antique microscope slide viewed through a vintage brass microscope, circular field of view with a thin double-line border: Batrachochytrium dendrobatidis (蛙壶菌 chytrid fungus) inside pale amphibian skin — the field filled with a mosaic of large soft polygonal frog epidermal cells, several smooth glassy round sporangia nest inside them, each sporangium opens through one slender discharge tube, and swarms of tiny comma-shaped zoospores each trailing a single long hair-thin flagellum swim in the water between the cells, ink stippling and watercolor tinting, vintage copperplate engraving on aged parchment, no text no letters no labels",
  "Welwitschia mirabilis":
    "vintage botanical plate of Welwitschia mirabilis (百岁兰), NOT a palm NOT a grass: a low stout woody upside-down-cone stem, from which exactly TWO very long flat strap-shaped dark-green leaves sprawl outward on desert gravel, the leaf tips frayed and split into twisted ribbon strips while the bases stay whole, sparse Namib desert ground with distant fog bank, copperplate engraving with hand-tinted watercolor on aged parchment, no text no letters no labels",
  "Metasequoia glyptostroboides":
    "vintage botanical illustration of Metasequoia glyptostroboides (dawn redwood 水杉): a tall deciduous conifer with reddish-brown shredding trunk, one main branch detail showing opposite branching with flat feathery sprays of many small linear soft green leaves arranged in two neat rows along each branchlet, small round pendant cones on short stalks, a separate bare winter twig with opposite buds, copperplate engraving with hand-tinted watercolor on aged parchment, no text no letters no labels",
  "Salix babylonica":
    "vintage botanical illustration of Salix babylonica (weeping willow 垂柳) beside a lake: a broad-crowned tree with rough grey trunk, countless very long slender yellow-green branchlets cascading down to the water surface like a curtain, narrow lanceolate leaves with finely serrated edges, one detail sprig with drooping catkins, copperplate engraving with hand-tinted watercolor on aged parchment, no text no letters no labels",
  "Schistosoma japonicum":
    "antique parasitology plate of Schistosoma japonicum (blood fluke 日本血吸虫), a pair of thin parasitic flatworms enlarged against plain parchment: one plump milky-white cylindrical male worm whose body edges fold inward to form a ventral gynecophoric canal, and one much thinner darker slender female worm lying inside the male's canal, both tapered at both ends, vintage copperplate engraving with ink stippling on aged parchment, no text no letters no labels",
  "Caenorhabditis elegans":
    "antique microscope field-of-view plate of Caenorhabditis elegans (nematode roundworm 秀丽隐杆线虫): several tiny translucent colorless thread-like worms gliding on agar seen through the microscope, each about one millimeter long with smooth tapered both ends, faint internal gut and gonad visible through the transparent skin, one thinner male with fan-shaped tail, vintage copperplate engraving with ink stippling on aged parchment, no text no letters no labels",
  "Haliotis discus hannai":
    "vintage conchology plate of Haliotis discus hannai (abalone 皱纹盘鲍), NOT a spiral whelk: an ear-shaped very flat low oval marine gastropod shell, greenish-brown exterior with fine wrinkled spiral ribs, a single row of small raised pore holes along the left edge, paired with a second specimen shown from inside with iridescent mother-of-pearl and a big creamy-white muscular foot, copperplate engraving with watercolor on aged parchment, no text no letters no labels",
  "Apostichopus japonicus":
    "vintage marine natural history illustration of Apostichopus japonicus (sea cucumber 仿刺参), NOT a sea urchin NOT a slug: an elongated cucumber-shaped echinoderm lying on rocky seabed, thick fleshy dark green-brown mottled body wall, four to six longitudinal rows of small conical fleshy papillae along its back, tube feet rows underneath, a crown of short oral tentacles at one end, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Sphenodon punctatus":
    "vintage natural history illustration of Sphenodon punctatus (tuatara 楔齿蜥), NOT a common lizard: a robust ancient reptile with olive-grey heavily wrinkled saggy skin, a conspicuous crest of triangular spiny scales from nape down the back, strong limbs with clawed digits splayed on New Zealand coastal rocks, bright alert eye, ridged tail, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Nipponia nippon":
    "vintage ornithological illustration of Nipponia nippon (crested ibis 朱鹮): an elegant medium-large wading bird standing in a wetland paddy, white plumage washed with delicate pale pink especially on the wing undersides, bare brick-red facial skin around the eye, long slightly decurved black bill, wispy lanceolate crest plumes drooping on the nape, black legs, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Branchiostoma belcheri":
    "antique zoological plate of Branchiostoma belcheri (lancelet 白氏文昌鱼), NOT a fish — no eyes, no distinct head, no paired fins: a small semi-transparent blade-shaped chordate enlarged against plain parchment, both ends finely pointed, a long low dorsal fin strip running to a small tail fin, V-shaped muscle blocks (myomeres) visible through the see-through flank like a neat row of chevrons, faint gill slits in the pharynx, vintage copperplate engraving with ink stippling on aged parchment, no text no letters no labels",
  "Spirobranchus giganteus":
    "vintage marine natural history illustration of Spirobranchus giganteus (Christmas tree worm 大旋鳃虫): two identical small spiral conical feathery gill crowns like miniature fir trees, one vivid violet-blue and one golden-orange, each formed of two perfectly spiraling rows of delicate radiole feathers, rising side by side from a tiny round hole in a living massive coral head, underwater coral reef scene, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Eunice aphroditois":
    "vintage marine natural history illustration of Eunice aphroditois (bobbit worm 博比特虫): a very long segmented marine polychaete worm bursting from its burrow in reef sand, hundreds of flat segments with an iridescent purple-green-bronze sheen, five straight sensory antennae like fingers on the head, fierce open eversible pharynx revealing black sickle-shaped snapping jaws, short paddle parapodia along the sides, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
};

/** 从中文形态/描述档案提炼关键鉴别特征注入 prompt(防止张冠李戴) */
function featureHints(morphology?: string | null, description?: string | null): string {
  const src = [morphology, description].filter(Boolean).join(" ");
  if (!src) return "";
  return ` The true diagnostic morphology (MUST depict accurately, from species profile): ${src.replace(/\s+/g, " ").slice(0, 110)}`;
}

async function getKingdoms(): Promise<Map<string, string>> {
  const all = await db.taxon.findMany({ select: { id: true, rank: true, latinName: true, parentId: true } });
  const byId = new Map(all.map((t) => [t.id, t]));
  const memo = new Map<string, string>();
  const walk = (id: string): string => {
    if (memo.has(id)) return memo.get(id)!;
    const n = byId.get(id);
    let res = "";
    if (n) {
      const isK = n.rank === "kingdom" || (n.rank === "domain" && (n.latinName === "Bacteria" || n.latinName === "Archaea"));
      if (isK) res = n.latinName;
      else if (n.parentId) res = walk(n.parentId);
    }
    memo.set(id, res);
    return res;
  };
  for (const t of all) walk(t.id);
  return memo;
}

function parseVerdict(raw: string): { ok: boolean; reason: string } | null {
  const m = raw.match(/\{[\s\S]*\}/);
  if (!m) return null;
  try {
    const j = JSON.parse(m[0]);
    if (typeof j.match !== "boolean") return null;
    const anatomy = !!(j.anatomy_errors || j.anatomy);
    const ok = j.match && !anatomy; // match 且无解剖硬伤才入库(拼写类小瑕疵可容忍)
    return { ok, reason: String(j.reason || "").slice(0, 160) };
  } catch {
    return null;
  }
}

type Task = {
  id: string; latinName: string; chineseName: string;
  morphology?: string | null; description?: string | null;
  file: string; exists: boolean;
};

let gen429 = 0;      // 生成侧 429 连击(跨 worker 共享)
let audit429 = 0;    // 审计侧 429 连击
let stopAll = false; // 三连退避全局熔断

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  mkdirSync(REJECTED_DIR, { recursive: true });
  const kingdoms = await getKingdoms();
  const zai = await ZAI.create();

  const where: any = SCOPE === "all"
    ? { rank: "species", image: null }
    : { rank: "species", image: null, tags: { contains: "flagship" } };
  const species = await db.taxon.findMany({
    where,
    orderBy: { sortOrder: "asc" },
    select: { id: true, latinName: true, chineseName: true, morphology: true, description: true },
  });

  // 断点续跑:已处理(accepted|rejected)物种跳过
  const done = new Map<string, string>();
  if (existsSync(PROGRESS)) {
    for (const l of readFileSync(PROGRESS, "utf8").split("\n")) {
      if (!l.trim()) continue;
      try { const j = JSON.parse(l); done.set(j.id, j.result); } catch {}
    }
  }

  const tasks: Task[] = [];
  for (const s of species) {
    if (done.has(s.id)) continue;
    const slug = s.latinName.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase().replace(/^-|-$/g, "");
    tasks.push({ ...s, file: `${OUT_DIR}/${slug}.png`, exists: existsSync(`${OUT_DIR}/${slug}.png`) });
    if (tasks.length >= BATCH) break;
  }
  console.log(`[start] 范围:${SCOPE} 断点已处理 ${done.size} / 池剩 ${species.length - done.size},本轮任务 ${tasks.length}(磁盘已有待审 ${tasks.filter((t) => t.exists).length},待生成 ${tasks.filter((t) => !t.exists).length})`);

  let accepted = 0, rejected = 0, skipped = 0;

  /** VLM 审计一张图;返回 verdict 或 null(异常) */
  async function audit(t: Task): Promise<{ ok: boolean; reason: string } | null> {
    for (let i = 0; i < 2; i++) {
      try {
        const b64 = Buffer.from(readFileSync(t.file)).toString("base64");
        const vres = await zai.chat.completions.createVision({
          model: "glm-4.5v",
          messages: [{
            role: "user",
            content: [
              { type: "text", text: `你是一位严格的博物学审图员。这张图是为物种 ${t.latinName}(${t.chineseName}) 生成的复古博物学插图。真实档案:${[t.description, t.morphology].filter(Boolean).join(" ").slice(0, 180)}。只输出 JSON:{"match":true/false,"anatomy_errors":true/false,"reason":"一句话"}` },
              { type: "image_url", image_url: { url: `data:image/png;base64,${b64}` } },
            ],
          }],
          thinking: { type: "disabled" },
        });
        audit429 = 0;
        return parseVerdict(vres.choices[0]?.message?.content || "");
      } catch (e: any) {
        const msg = String(e?.message || e);
        if (msg.includes("429") || msg.toLowerCase().includes("too many")) {
          audit429++;
          console.log(`[429] 审计限流第 ${audit429} 次,退避 ${45 * audit429}s (${t.latinName})`);
          if (audit429 >= 3) { stopAll = true; return null; }
          await sleep(45000 * audit429);
          continue;
        }
        console.log(`[audit-err] ${t.latinName}: ${msg.slice(0, 90)}`);
        return null;
      }
    }
    return null;
  }

  /** 生成一张图;返回状态:E10 语义修复——区分瞬时失败(限流/网络)与终态失败(内容过滤),
   *  只有终态失败或真实 VLM 否决才允许标记 rejected,防止限流窗口误伤物种 */
  async function generate(prompt: string, out: string): Promise<"ok" | "filtered" | "ratelimited" | "error"> {
    for (let attempt = 1; attempt <= 3; attempt++) {
      if (stopAll) return "ratelimited";
      try {
        const imgRes = await zai.images.generations.create({ prompt, size: "1152x864" });
        const b64 = imgRes?.data?.[0]?.base64;
        if (!b64) { console.log("[gen-err] 响应无 base64"); return "error"; }
        await Bun.write(out, Buffer.from(b64, "base64"));
        gen429 = 0;
        return "ok";
      } catch (e: any) {
        const msg = String(e?.message || e);
        if (msg.includes("429") || msg.toLowerCase().includes("too many")) {
          gen429++;
          console.log(`[429] 生成限流第 ${gen429} 次,退避 ${60 * gen429}s`);
          if (gen429 >= 3) { stopAll = true; return "ratelimited"; }
          await sleep(60000 * gen429);
          continue;
        }
        if (msg.includes("400") || msg.toLowerCase().includes("content")) {
          console.log(`[filter] 内容过滤跳过: ${msg.slice(0, 80)}`);
          return "filtered";
        }
        console.log(`[gen-err] ${msg.slice(0, 90)}`);
        return "error";
      }
    }
    return "error";
  }

  async function worker() {
    while (queue.length > 0 && !stopAll) {
      const t = queue.shift() as Task | undefined;
      if (!t) return;
      const slug = t.latinName.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase().replace(/^-|-$/g, "");
      const kingdom = kingdoms.get(t.id) || "Animalia";
      const style = KINGDOM_STYLE[kingdom] || KINGDOM_STYLE.Animalia;
      // E10:疑难旗舰物种优先使用逐种定制 prompt(两轮通用模板未过审的硬骨头)
      const basePrompt = SPECIFIC_PROMPT[t.latinName] || style(t.chineseName, t.latinName);

      // 0) 磁盘已有未入库文件:先审计旧文件(未经闸门的历史遗留)
      let acceptedThis = false, lastReason = "";
      if (t.exists) {
        const v = await audit(t);
        if (v?.ok) {
          acceptedThis = true;
          lastReason = v.reason;
        } else if (v) {
          // 旧文件不合格 → 隔离,走重新生成
          renameSync(t.file, join(REJECTED_DIR, `${slug}-pre.png`));
          console.log(`[pre-reject] ${t.latinName} 存量图不合格已隔离: ${v.reason}`);
        } else {
          // 审计异常(429 熔断等):本轮放弃该物种,不消耗重试名额
          if (stopAll) return;
        }
      }

      // 1) 生成 → 审计闭环(每物种最多 RETRY 轮)
      let attempts = 0;
      let vlmFailed = false;    // E10:是否收到过明确的 VLM 否决(区别于限流/异常)
      let filteredOut = false;  // E10:内容过滤终态失败
      while (!acceptedThis && !AUDIT_ONLY && !stopAll && attempts < MAX_RETRY) {
        attempts++;
        const gres = await generate(basePrompt + featureHints(t.morphology, t.description), t.file);
        if (gres !== "ok") {
          if (stopAll || gres === "ratelimited") return; // 熔断:不记录,物种留待下轮窗口
          if (gres === "filtered") { filteredOut = true; lastReason = "内容过滤拒绘"; }
          else lastReason = "生成失败(瞬时)";
          break;
        }
        const v = await audit(t);
        if (v) {
          if (v.ok) { acceptedThis = true; lastReason = v.reason; }
          else { vlmFailed = true; lastReason = v.reason; console.log(`[reject] ${t.latinName} 尝试${attempts}: ${v.reason}`); }
        } else if (stopAll) return;
        else lastReason = "VLM 输出无法解析";
        if (!acceptedThis && attempts < MAX_RETRY) await sleep(2000);
      }

      // 2) 结果落库 / 隔离(E10:仅终态失败才记 rejected;瞬时失败不记,留待下轮)
      if (acceptedThis) {
        await db.taxon.update({
          where: { id: t.id },
          data: { image: `/generated/${slug}.png`, imageCaption: "复古博物学风格 AI 插图(经 VLM 科学性复核)" },
        });
        appendFileSync(PROGRESS, JSON.stringify({ id: t.id, latin: t.latinName, result: "accepted", attempts, reason: lastReason }) + "\n");
        accepted++;
        console.log(`[入库✓] ${t.latinName} (尝试${attempts}): ${lastReason.slice(0, 70)}`);
      } else if (vlmFailed || filteredOut) {
        if (existsSync(t.file)) renameSync(t.file, join(REJECTED_DIR, `${slug}.png`));
        appendFileSync(PROGRESS, JSON.stringify({ id: t.id, latin: t.latinName, result: "rejected", attempts, reason: lastReason }) + "\n");
        rejected++;
        console.log(`[放弃] ${t.latinName} 保持占位图: ${lastReason.slice(0, 80)}`);
      } else {
        skipped++;
        console.log(`[跳过] ${t.latinName} 瞬时失败不记录,留待下轮: ${lastReason.slice(0, 60)}`);
      }
      if (!AUDIT_ONLY) await sleep(1500 + Math.random() * 2500);
    }
  }

  const queue = [...tasks];
  await Promise.all(Array.from({ length: Math.max(1, CONCURRENCY) }, () => worker()));

  const total = await db.taxon.count({ where: { image: { not: null } } });
  console.log(`\n[done${stopAll ? "(限流熔断)" : ""}] 本轮:入库 ${accepted} / 放弃 ${rejected} / 瞬时跳过 ${skipped} / 任务 ${tasks.length};断点 ${PROGRESS};库内当前有效配图 ${total} 张`);
}

main()
  .catch((e) => { console.error("FATAL", e); process.exit(1); })
  .finally(async () => { await db.$disconnect(); });
