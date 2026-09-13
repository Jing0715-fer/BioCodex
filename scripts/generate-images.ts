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

  let accepted = 0, rejected = 0;

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

  /** 生成一张图;成功 true;429 熔断 false 且可能置 stopAll */
  async function generate(prompt: string, out: string): Promise<boolean> {
    for (let attempt = 1; attempt <= 3; attempt++) {
      if (stopAll) return false;
      try {
        const imgRes = await zai.images.generations.create({ prompt, size: "1152x864" });
        const b64 = imgRes?.data?.[0]?.base64;
        if (!b64) { console.log("[gen-err] 响应无 base64"); return false; }
        await Bun.write(out, Buffer.from(b64, "base64"));
        gen429 = 0;
        return true;
      } catch (e: any) {
        const msg = String(e?.message || e);
        if (msg.includes("429") || msg.toLowerCase().includes("too many")) {
          gen429++;
          console.log(`[429] 生成限流第 ${gen429} 次,退避 ${60 * gen429}s`);
          if (gen429 >= 3) { stopAll = true; return false; }
          await sleep(60000 * gen429);
          continue;
        }
        if (msg.includes("400") || msg.toLowerCase().includes("content")) {
          console.log(`[filter] 内容过滤跳过: ${msg.slice(0, 80)}`);
          return false;
        }
        console.log(`[gen-err] ${msg.slice(0, 90)}`);
        return false;
      }
    }
    return false;
  }

  async function worker() {
    while (queue.length > 0 && !stopAll) {
      const t = queue.shift() as Task | undefined;
      if (!t) return;
      const slug = t.latinName.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase().replace(/^-|-$/g, "");
      const kingdom = kingdoms.get(t.id) || "Animalia";
      const style = KINGDOM_STYLE[kingdom] || KINGDOM_STYLE.Animalia;

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
      while (!acceptedThis && !AUDIT_ONLY && !stopAll && attempts < MAX_RETRY) {
        attempts++;
        const ok = await generate(style(t.chineseName, t.latinName) + featureHints(t.morphology, t.description), t.file);
        if (!ok) { if (stopAll) return; lastReason = "生成失败/限流"; break; }
        const v = await audit(t);
        if (v) {
          if (v.ok) { acceptedThis = true; lastReason = v.reason; }
          else { lastReason = v.reason; console.log(`[reject] ${t.latinName} 尝试${attempts}: ${v.reason}`); }
        } else if (stopAll) return;
        else lastReason = "VLM 输出无法解析";
        if (!acceptedThis && attempts < MAX_RETRY) await sleep(2000);
      }

      // 2) 结果落库 / 隔离
      if (acceptedThis) {
        await db.taxon.update({
          where: { id: t.id },
          data: { image: `/generated/${slug}.png`, imageCaption: "复古博物学风格 AI 插图(经 VLM 科学性复核)" },
        });
        appendFileSync(PROGRESS, JSON.stringify({ id: t.id, latin: t.latinName, result: "accepted", attempts, reason: lastReason }) + "\n");
        accepted++;
        console.log(`[入库✓] ${t.latinName} (尝试${attempts}): ${lastReason.slice(0, 70)}`);
      } else {
        if (existsSync(t.file)) renameSync(t.file, join(REJECTED_DIR, `${slug}.png`));
        appendFileSync(PROGRESS, JSON.stringify({ id: t.id, latin: t.latinName, result: "rejected", attempts, reason: lastReason }) + "\n");
        rejected++;
        console.log(`[放弃] ${t.latinName} 保持占位图: ${lastReason.slice(0, 80)}`);
      }
      if (!AUDIT_ONLY) await sleep(1500 + Math.random() * 2500);
    }
  }

  const queue = [...tasks];
  await Promise.all(Array.from({ length: Math.max(1, CONCURRENCY) }, () => worker()));

  const total = await db.taxon.count({ where: { image: { not: null } } });
  console.log(`\n[done${stopAll ? "(限流熔断)" : ""}] 本轮:入库 ${accepted} / 放弃 ${rejected} / 任务 ${tasks.length};断点 ${PROGRESS};库内当前有效配图 ${total} 张`);
}

main()
  .catch((e) => { console.error("FATAL", e); process.exit(1); })
  .finally(async () => { await db.$disconnect(); });
