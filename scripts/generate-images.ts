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
const ONLY = (process.env.ONLY || "").split(",").map((s) => s.trim()).filter(Boolean); // E13:定向重生成(用户报告问题物种)
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
  "Saccharomyces cerevisiae":
    "antique microscope field-of-view plate of Saccharomyces cerevisiae (baker's yeast 酿酒酵母): dozens of tiny oval single-celled fungi like smooth translucent pale grapes or pebbles scattered across the round field, several cells with small round buds pinching off, a few four-spore ascii burst open, ink stippling and watercolor tinting, vintage copperplate engraving on aged parchment, no text no letters no labels",
  "Batrachochytrium dendrobatidis":
    "antique microscope slide viewed through a vintage brass microscope, circular field of view with a thin double-line border: Batrachochytrium dendrobatidis (蛙壶菌 chytrid fungus) inside pale amphibian skin — the field filled with a mosaic of large soft polygonal frog epidermal cells, several smooth glassy round sporangia nest inside them, each sporangium opens through one slender discharge tube, and swarms of tiny comma-shaped zoospores each trailing a single long hair-thin flagellum swim in the water between the cells, ink stippling and watercolor tinting, vintage copperplate engraving on aged parchment, no text no letters no labels",
  "Welwitschia mirabilis":
    "vintage botanical plate of Welwitschia mirabilis (百岁兰), desert curiosity in strict side profile: one stout dark woody cone-shaped trunk like an upside-down carrot crown on Namib gravel, and from its flat top exactly TWO long tattered cloth ribbons of dark leathery green sprawling left and right along the ground, each ribbon torn lengthwise into twisted streamers towards the far tips but whole and broad where it meets the trunk, reading like two worn banners flanking the cone, sparse gravel with distant fog bank, copperplate engraving with hand-tinted watercolor on aged parchment, no text no letters no labels",
  "Metasequoia glyptostroboides":
    "vintage botanical illustration of Metasequoia glyptostroboides (dawn redwood 水杉): a tall deciduous conifer with reddish-brown shredding trunk, one main branch detail showing opposite branching with flat feathery sprays of many small linear soft green leaves arranged in two neat rows along each branchlet, small round pendant cones on short stalks, a separate bare winter twig with opposite buds, copperplate engraving with hand-tinted watercolor on aged parchment, no text no letters no labels",
  "Salix babylonica":
    "vintage botanical illustration of Salix babylonica (weeping willow 垂柳) beside a lake: a broad-crowned tree with rough grey trunk, countless very long slender yellow-green branchlets cascading down to the water surface like a curtain, narrow lanceolate leaves with finely serrated edges, one detail sprig with drooping catkins, copperplate engraving with hand-tinted watercolor on aged parchment, no text no letters no labels",
  "Schistosoma japonicum":
    "antique parasitology microscope slide plate of Schistosoma japonicum (日本血吸虫), stained specimen view on plain glass: two long smooth pale flesh-pink worms lying close together, the male one thick soft round cord of wax with a long open groove running along one side, the much thinner darker female cord resting inside that groove like a thread in a channel, both ends bluntly tapered, bodies smooth and featureless like two pieces of soft pink wax cord, thin wash of stain at the edges of the slide, vintage copperplate engraving with ink stippling on aged parchment, no text no letters no labels",
  "Caenorhabditis elegans":
    "antique microscope field-of-view plate of Caenorhabditis elegans (秀丽隐杆线虫): several tiny translucent glass-clear thread animals gliding over a pale smooth agar dish seen through the round lens, each about one millimeter long with smooth bodies tapered at both ends like fine clear sewing threads, faint straight inner tubes showing through the clear skin, one slimmer individual with a narrow tapered tail, soft circular vignette of the lens edge, vintage copperplate engraving with ink stippling on aged parchment, no text no letters no labels",
  "Haliotis discus hannai":
    "vintage conchology plate of Haliotis discus hannai (abalone 皱纹盘鲍), NOT a spiral whelk: an ear-shaped very flat low oval marine gastropod shell, greenish-brown exterior with fine wrinkled spiral ribs, a single row of small raised pore holes along the left edge, paired with a second specimen shown from inside with iridescent mother-of-pearl and a big creamy-white muscular foot, copperplate engraving with watercolor on aged parchment, no text no letters no labels",
  "Apostichopus japonicus":
    "vintage natural history plate of Apostichopus japonicus (仿刺参), a plump sea cucumber drawn like a polished dark leather pickle lying on sandy seabed: one smooth plump elongated body of deep umber-brown leathery skin, soft conical warts in scattered rows along its back, tiny tube feet in bands underneath, one blunt end ringed by a short fringe of plump soft tentacle pegs, absolutely NO legs NO joints NO shell NO antennae NO eyes, gentle watercolor tinting, copperplate engraving on aged parchment, no text no letters no labels",
  "Sphenodon punctatus":
    "vintage natural history illustration of Sphenodon punctatus (tuatara 楔齿蜥), NOT a common lizard: a robust ancient reptile with olive-grey heavily wrinkled saggy skin, a conspicuous crest of triangular spiny scales from nape down the back, strong limbs with clawed digits splayed on New Zealand coastal rocks, bright alert eye, ridged tail, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Nipponia nippon":
    "vintage ornithological illustration of Nipponia nippon (crested ibis 朱鹮): an elegant medium-large wading bird standing in a wetland paddy, white plumage washed with delicate pale pink especially on the wing undersides, bare brick-red facial skin around the eye, long slightly decurved black bill, wispy lanceolate crest plumes drooping on the nape, black legs, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Branchiostoma belcheri":
    "antique zoological plate of Branchiostoma belcheri (白氏文昌鱼), a clear glassy lancet enlarged on plain parchment: one slender fully see-through body like a polished clear glass splinter, tapered to fine points at both ends, inside it a neat row of pale V-shaped chevrons running down the flank like delicate etched marks, a faint straight fringe of short mouth bristles at the tip, a low continuous soft fin border running around the tail like the melted rounded rim of a glass rod, NO eyes NO head NO jaws NO scales NO legs NO paired fins, copperplate engraving with ink stippling on aged parchment, no text no letters no labels",
  "Spirobranchus giganteus":
    "vintage marine natural history illustration of Spirobranchus giganteus (Christmas tree worm 大旋鳃虫): two identical small spiral conical feathery gill crowns like miniature fir trees, one vivid violet-blue and one golden-orange, each formed of two perfectly spiraling rows of delicate radiole feathers, rising side by side from a tiny round hole in a living massive coral head, underwater coral reef scene, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Eunice aphroditois":
    "vintage marine natural history illustration of Eunice aphroditois (bobbit worm 博比特虫): a very long segmented marine polychaete worm bursting from its burrow in reef sand, hundreds of flat segments with an iridescent purple-green-bronze sheen, five straight sensory antennae like fingers on the head, fierce open eversible pharynx revealing black sickle-shaped snapping jaws, short paddle parapodia along the sides, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  // —— E13 第二批:海藻类统一走「压制标本/显微镜视野」构图,规避陆生植物词汇 ——
  "Ulva lactuca":
    "vintage natural history plate on aged parchment: one bright grass-green sheet of very thin see-through silk paper, shaped as a soft irregular oval with its whole rim gently ruffled like a lasagna noodle edge, the fragile film shows lighter patches where light passes through it, one tiny pale round button at one corner, lying flat and weightless, absolutely plain smooth surface with no ribs no veins no stalks no roots no flowers of any kind, delicate watercolor tinting, no text no letters no labels",
  "Pyropia yezoensis":
    "vintage food-illustration plate on aged parchment: a small stack of dried sushi nori sheets — several thin flat matte sheets of deep purplish-black with a rosy-purple sheen, exactly like square-cut pressed nori paper for sushi, smooth matte surfaces like fine handmade paper with faint darker mottling, corners softly curling up off the stack, one sheet leaning apart showing its plain even face, absolutely no ribs no veins no stalks no green color anywhere, copperplate border with watercolor tinting, no text no letters no labels",
  "Sargassum fusiforme":
    "vintage natural history plate on aged parchment: a small loose tangle of fine wiry jet-black strands like a handful of soft black wire, each strand gently forking into thinner twigs densely studded all over with tiny smooth spindle-shaped beads like grains of rice strung on wire, a few thin straight dark sticks mixed in, at the base one small knobby disc gripping a pebble, drawn crisp and dry like a pressed curiosity, copperplate engraving with watercolor, no text no letters no labels",
  "Macrocystis pyrifera":
    "vintage phycology plate of a pressed giant kelp specimen arranged in vertical folds on aged parchment: Macrocystis pyrifera (giant kelp 巨藻), one extremely long smooth rope-like golden-brown stipe coiled in gentle S-folds up the sheet, bearing at close regular intervals many short flat strap-shaped blades like long fronds, every single blade swollen at its base into a small pear-shaped gas bladder (pneumatocyst) clearly drawn as a little pod, blades slightly crinkled with wrinkled surface, a small branching holdfast at the very bottom, NO plant stem NO tree trunk NO flowers NO seeds NO roots, copperplate engraving with watercolor tinting, no text no letters no labels",
  // —— 真菌类:纠正香菇=毒蝇伞、牛肝菌=菌褶两类高频张冠李戴 ——
  "Lentinula edodes":
    "antique mycology plate of Lentinula edodes (shiitake 香菇), NOT the red fly agaric: a cluster of three edible mushrooms growing from a short hardwood log, each cap dome-shaped and entirely dull chestnut to dark brown, the surface covered with fine scattered white cracks and pale veil remnants, rim curled under and faintly scalloped, creamy-white crowded gills beneath, a tough fibrous pale stem with a shredding snakeskin texture, absolutely NO red cap NO white dots NO ring NO cup at stem base, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Boletus edulis":
    "antique mycology plate of Boletus edulis (美味牛肝菌) porcini bolete, drawn half from below so the cap underside fills much of the view: that underside is a smooth spongy cushion of densely packed tiny round dimples in pale cream-yellow, exactly like fine honeycomb or the closed pores of a pale wasp nest, absolutely NO thin blades NO radiating gill plates of any kind, above it a thick bread-loaf chestnut-brown sticky cap and a fat club stem with delicate raised net pattern, one cut half beside it showing pure white dense flesh, moss and pine needles below, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Hericium erinaceus":
    "antique mycology plate of Hericium erinaceus (lion's mane fungus 猴头菌), NOT a normal capped mushroom: one large round white fruiting body like a frozen cascading fountain hanging from a cut hardwood trunk, its whole surface breaking into hundreds of long soft downward-pointing icicle spines of pure white, finer young spines near the top and longer dangling ones below, no cap no stalk no gills, pale cream shading in the crevices, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  // —— 微型模式生物:显微镜视野构图 ——
  "Trypanosoma brucei":
    "antique microscope field-of-view plate of Trypanosoma brucei (sleeping sickness trypanosome 布氏锥虫) in a blood smear: several long slender pale single-celled organisms like thin flattened serpents among round pinkish blood cells, each with a single extremely long wavy undulating membrane running the length of the body and one trailing flagellum at the front end, a compact darkly-stained dot kinetoplast near the rear end, a small pale oval nucleus in the middle of the body, Giemsa-stained slide look, vintage copperplate engraving with ink stippling, no text no letters no labels",
  "Nitrosopumilus maritimus":
    "vintage scanning-electron-microscope plate on aged parchment: Nitrosopumilus maritimus (氨氧化古菌) magnified — a loose scatter of very small plain smooth cells shaped like tiny blunt matchsticks and short pencils, some slightly curved like little bananas, all the same small size, each drawn as a simple smooth rod outline with a faint fibrous interior, a few lying flat against the crinkled surface of one much larger rounded particle of sea silt, deep neutral background like old EM film, no organelles no nuclei no spikes no spheres with spines, ink stippling and light sepia wash, no text no letters no labels",
  // —— 海带 prompt 第五代:连 kelp 一词也删(该词本身触发植物先验),纯材料几何描述,VLM 独立判定 ——
  "Saccharina japonica":
    "vintage natural history plate on aged parchment: a loose pile of several broad flat dried ribbons of deep olive-brown, like thick bands of dried fruit leather stacked and folded together, each ribbon a smooth wide strap of uniform width with calm even margins, one longer ribbon draped over the pile showing its great length and softly wavy edges, their matte surfaces dusted with a faint bloom of natural white powder like a dusting of fine flour, one short round cord and a tangle of coarse brown fibres at the base of the pile, no branches no leaves no stems of any kind, delicate watercolor tinting, no text no letters no labels",
  // —— Claviceps purpurea:E13 三次内容过滤拒绘(致幻关联),移出重试 ——
  "Penicillium chrysogenum":
    "antique microscope field-of-view plate of Penicillium chrysogenum (青霉) grown on a bread crumb: pale bluish-green mould, its name-giving paintbrush structures magnified large — several tall slender glassy stalks rise from tangled surface hyphae, each stalk ending in a neat symmetric broom of short branch fingers, and every finger tip trails a long straight chain of tiny round green spores like strings of small beads, one stalk drawn enlarged beside the field showing the brush clearly, ink stippling and watercolor tinting, vintage copperplate engraving on aged parchment, no text no letters no labels",
  "Ustilago maydis":
    "antique botanical plate of a maize ear with corn smut (Ustilago maydis 玉米黑粉菌): a plump corn cob with husk leaves peeled back, several kernels swollen into large smooth glossy grey-white pods like river pebbles, one pod split open oozing a wet mass of dense sooty black spore powder, a few loose black spores drawn magnified beside the ear as tiny round spiked balls, autumn corn field behind, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  // —— 肢口纲剑尾目:用户 E13 报告中华鲎被画成奇幻哺乳生物,VLM 确认 FAIL,重定制 ——
  "Tachypleus tridentatus":
    "vintage natural history plate of a Chinese horseshoe crab Tachypleus tridentatus (中华鲎) seen from directly above on wet estuary sand, NOT a crab NOT a scorpion NOT a mammal — no pincers no fur no face: the body in three clean hard-shelled parts, first a big smooth glossy dome-shaped horseshoe arch of olive green-brown cephalothoracic shield like a rounded steel helmet filling half the plate, its surface with faint ridges and two small round dark lateral eyes near the sides, second behind it a lower flatter roughly triangular abdomen plate with a neat row of small sharp backward-pointing movable spines along each side edge, third from the abdomen tip one single long slender straight rigid sword-like telson tail extending flat across the sand like a thin triangular spike, shallow water ripple at the edge, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Limulus polyphemus":
    "vintage natural history plate of an Atlantic horseshoe crab Limulus polyphemus (美洲鲎) drawn from directly above on a sandy seabed, NOT a crab NOT a trilobite NOT a scorpion: one large smooth arched helmet-shaped cephalothoracic shield of dark reddish brown like a polished round dome with two small round lateral eyes at the sides, followed by a flatter triangular abdomen shield whose side edges bear a neat row of small backward-pointing spines, and one long slender rigid sword-like telson tail lying straight on the sand, a second smaller male shown behind clinging onto the larger female's shield edge, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
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
  if (ONLY.length) where.latinName = { in: ONLY };
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
