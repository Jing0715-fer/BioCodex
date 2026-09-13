/// <reference types="bun-types" />
/**
 * BioCodex 下架图闭环重生成脚本(生成→VLM 即时审计→合格才入库)
 *
 * 流程:读 /tmp/vlm-audit.jsonl 的 fail 记录(已下架物种) →
 *   1. 用增强 prompt(界别构图框架 + 中文鉴别特征)生成新图
 *   2. 立即 VLM 审计(match/anatomy/garbled)
 *   3. ok|warn → 入库(DB image 更新,详情页恢复显示)
 *      fail  → 不入库(保持雕版占位图),文件移 rejected/
 *   每物种最多 RETRY 轮生成尝试
 *
 * 环境变量:
 *   LIMIT=N       本轮处理 N 个物种(默认 999)
 *   RETRY=2       每物种最大生成尝试次数
 *   APPLY=1       默认即 apply(与审计脚本一致语义);不设 APPLY 仅演练不写库
 * 断点续跑:/tmp/regen-progress.jsonl 记录已处理物种(id → 结果)
 * 用法:LIMIT=10 bun scripts/regenerate-rejected.ts
 */
import { db } from "../src/lib/db";
import ZAI from "z-ai-web-dev-sdk";
import { existsSync, mkdirSync, renameSync, appendFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = "public/generated";
const REJECTED_DIR = "public/generated/rejected";
const PROGRESS = "/tmp/regen-progress.jsonl";
const AUDIT = "/tmp/vlm-audit.jsonl";
const LIMIT = parseInt(process.env.LIMIT || "999", 10);
const MAX_RETRY = parseInt(process.env.RETRY || "2", 10);
const APPLY = process.env.APPLY !== "0";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** 界别构图框架(经实测通过审计的模式:微观类用显微镜视野构图,宏观类强调鉴别特征) */
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
    const garbled = !!j.garbled_text || !!j.text;
    const ok = j.match && !anatomy; // match 且无解剖硬伤才入库(warn 的拼写类小瑕疵可容忍)
    return { ok, reason: String(j.reason || "").slice(0, 160) };
  } catch {
    return null;
  }
}

async function main() {
  mkdirSync(REJECTED_DIR, { recursive: true });
  const kingdoms = await getKingdoms();
  const zai = await ZAI.create();

  // 读审计 fail 清单
  const failRows = readFileSync(AUDIT, "utf8").split("\n").filter(Boolean)
    .map((l) => { try { return JSON.parse(l); } catch { return null; } })
    .filter((r) => r && r.verdict === "fail" && r.id);

  // 断点续跑
  const done = new Set<string>();
  if (existsSync(PROGRESS)) {
    for (const l of readFileSync(PROGRESS, "utf8").split("\n")) {
      if (!l.trim()) continue;
      try { done.add(JSON.parse(l).id); } catch {}
    }
  }
  const pending = failRows.filter((r) => !done.has(r.id)).slice(0, LIMIT);
  console.log(`[regen] fail 清单 ${failRows.length} 个,已处理 ${done.size},本轮 ${pending.length}(APPLY=${APPLY ? "on" : "off"})`);

  let gen429 = 0;
  for (const r of pending) {
    // 从 DB 拉最新档案(物种 + 形态描述)
    const t = await db.taxon.findUnique({
      where: { id: r.id },
      select: { id: true, latinName: true, chineseName: true, morphology: true, description: true, image: true },
    });
    if (!t) { appendFileSync(PROGRESS, JSON.stringify({ id: r.id, result: "skip", reason: "DB 无记录" }) + "\n"); continue; }

    const slug = t.latinName.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase().replace(/^-|-$/g, "");
    const file = `${OUT_DIR}/${slug}.png`;
    const kingdom = kingdoms.get(t.id) || "Animalia";
    const style = KINGDOM_STYLE[kingdom] || KINGDOM_STYLE.Animalia;
    const prompt = style(t.chineseName!, t.latinName) + featureHints(t.morphology, t.description);

    let accepted = false, attempts = 0, lastReason = "";
    while (!accepted && attempts < MAX_RETRY) {
      attempts++;
      try {
        // 1) 生成
        const imgRes = await zai.images.generations.create({ prompt, size: "1152x864" });
        const b64 = imgRes?.data?.[0]?.base64;
        if (!b64) { lastReason = "生成响应无 base64"; break; }
        await Bun.write(file, Buffer.from(b64, "base64"));
        gen429 = 0;
      } catch (e: any) {
        const msg = String(e?.message || e);
        if (msg.includes("429") || msg.toLowerCase().includes("too many")) {
          gen429++;
          console.log(`[429] 生成限流第 ${gen429} 次,退避 ${60 * gen429}s (${t.latinName})`);
          if (gen429 >= 3) { console.log("[stop] 生成限流持续,中止本轮(断点已存)"); return; }
          await sleep(60000 * gen429);
          attempts--; // 不计入尝试次数
          continue;
        }
        lastReason = msg.slice(0, 120);
        break;
      }

      // 2) VLM 即时审计
      try {
        const b64 = Buffer.from(readFileSync(file)).toString("base64");
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
        const v = parseVerdict(vres.choices[0]?.message?.content || "");
        if (v) {
          accepted = v.ok;
          lastReason = v.reason;
          console.log(`[${accepted ? "accept" : "reject"}] ${t.latinName} 尝试${attempts}: ${v.reason}`);
        } else { lastReason = "VLM 输出无法解析"; console.log(`[parse-fail] ${t.latinName}`); }
      } catch (e: any) {
        const msg = String(e?.message || e);
        if (msg.includes("429")) { console.log(`[429] 审计限流,退避 60s (${t.latinName})`); await sleep(60000); }
        else lastReason = msg.slice(0, 100);
      }
      if (!accepted && attempts < MAX_RETRY) await sleep(2000);
    }

    // 3) 结果落库/隔离
    if (accepted && APPLY) {
      await db.taxon.update({ where: { id: t.id }, data: { image: `/generated/${slug}.png`, imageCaption: "复古博物学风格 AI 插图(经 VLM 科学性复核)" } });
      appendFileSync(PROGRESS, JSON.stringify({ id: t.id, latin: t.latinName, result: "accepted", attempts, reason: lastReason }) + "\n");
      console.log(`[入库] ${t.latinName} ✓`);
    } else {
      if (existsSync(file)) renameSync(file, join(REJECTED_DIR, `${slug}.png`));
      appendFileSync(PROGRESS, JSON.stringify({ id: t.id, latin: t.latinName, result: "rejected", attempts, reason: lastReason }) + "\n");
      console.log(`[放弃] ${t.latinName} 保持占位图(${attempts} 轮尝试): ${lastReason.slice(0, 80)}`);
    }
    await sleep(1500 + Math.random() * 2500);
  }

  const acceptedCount = readFileSync(PROGRESS, "utf8").split("\n").filter((l) => l.includes("\"accepted\"")).length;
  const total = await db.taxon.count({ where: { image: { not: null } } });
  console.log(`\n[done] 累计入库 ${acceptedCount} 张;库内当前有效配图 ${total} 张;进度 ${PROGRESS}`);
}

main()
  .catch((e) => { console.error("FATAL", e); process.exit(1); })
  .finally(async () => { await db.$disconnect(); });
