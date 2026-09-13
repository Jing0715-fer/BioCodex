/// <reference types="bun-types" />
/**
 * BioCodex 物种插画批量生成脚本(支持分批/断点续跑)
 * 环境变量:
 *   BATCH=N  本轮最多处理 N 个(默认全部)
 *   SCOPE=flagship|all  处理范围(默认 flagship)
 * 已存在于 public/generated/<slug>.png 的直接入库不重复生成。
 * 用法: BATCH=40 bun scripts/generate-images.ts
 */
import { db } from "../src/lib/db";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";

const exec = promisify(execFile);
const OUT_DIR = "public/generated";
const BATCH = parseInt(process.env.BATCH || "999", 10);
const SCOPE = process.env.SCOPE || "flagship";
const CONCURRENCY = parseInt(process.env.CONCURRENCY || "2", 10);
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const KINGDOM_STYLE: Record<string, (cn: string, la: string) => string> = {
  Bacteria: (cn, la) =>
    `vintage microbiology lithograph of ${la} (${cn}), strictly a microscopic single-celled prokaryote bacterium under high magnification, NOT a mushroom, NOT a plant, NO fruiting body, NO flowers or roots, vintage copperplate engraving with watercolor tinting on aged parchment, natural history plate, absolutely no text or lettering in the image`,
  Archaea: (cn, la) =>
    `vintage microbiology lithograph of ${la} (${cn}), strictly a microscopic single-celled archaeon under high magnification with hint of hot spring or salt lake environment, NOT a mushroom, NOT a plant, NO fruiting body, copperplate engraving with watercolor tinting on aged parchment, absolutely no text or lettering in the image`,
  Protista: (cn, la) =>
    `vintage scientific lithograph of ${la} (${cn}), strictly a microscopic single-celled protist under microscope (cell outline, cilia/flagella/pseudopodia as appropriate), NOT an insect, NOT a worm, NOT a mushroom, NO legs or wings, delicate ink stippling with watercolor tinting on aged parchment, absolutely no text or lettering in the image`,
  Fungi: (cn, la) =>
    `vintage botanical plate of ${la} (${cn}) showing its scientifically correct form: cap/gills/stem only if it is a macro-mushroom, OR microscopic hyphae and spores if it is a micro-fungus, OR a subterranean truffle-like body if it is a truffle — follow the species description strictly, with mycelium threads (NOT plant roots) at the base, copperplate engraving with watercolor tinting on aged parchment, absolutely no text or lettering in the image`,
  Plantae: (cn, la) =>
    `vintage botanical illustration of ${la} (${cn}) with botanically accurate leaves, flowers/fruit/cones exactly as described for this species, NOT a generic flower, copperplate engraving with hand-tinted watercolor on aged parchment, natural history plate, absolutely no text or lettering in the image`,
  Animalia: (cn, la) =>
    `vintage natural history illustration of ${la} (${cn}) in natural posture with the diagnostic anatomical features of this exact species (body proportions, fins/limbs/head shape per species description), NOT a related species, copperplate engraving with watercolor tinting on aged parchment, classic zoological plate, absolutely no text or lettering in the image`,
};

/** 从中文形态/描述档案提炼关键特征注入 prompt(强化物种鉴别特征,防止张冠李戴) */
function featureHints(morphology?: string | null, description?: string | null): string {
  const src = [morphology, description].filter(Boolean).join(" ");
  if (!src) return "";
  // 截取前 90 字核心特征描述(体长/体型/结构/颜色等鉴别信息集中在前段)
  const hint = src.replace(/\s+/g, " ").slice(0, 90);
  return ` Critical diagnostic features of this exact species (must follow): ${hint}`;
}

async function getKingdoms(): Promise<Map<string, string>> {
  const all = await db.taxon.findMany({
    select: { id: true, rank: true, latinName: true, parentId: true },
  });
  const byId = new Map(all.map((t) => [t.id, t]));
  const memo = new Map<string, string>();
  const walk = (id: string): string => {
    if (memo.has(id)) return memo.get(id)!;
    const n = byId.get(id);
    let res = "";
    if (n) {
      const isK =
        n.rank === "kingdom" ||
        (n.rank === "domain" && (n.latinName === "Bacteria" || n.latinName === "Archaea"));
      if (isK) res = n.latinName;
      else if (n.parentId) res = walk(n.parentId);
    }
    memo.set(id, res);
    return res;
  };
  for (const t of all) walk(t.id);
  return memo;
}

async function generate(prompt: string, out: string): Promise<boolean> {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      await exec("z-ai", ["image", "-p", prompt, "-o", out, "-s", "1152x864"], { timeout: 200000 });
      return true;
    } catch (e: any) {
      const msg = String(e?.message || "");
      if (msg.includes("429") || msg.toLowerCase().includes("too many")) {
        console.log(`[429] 限流,等待 ${45 * attempt}s`);
        await sleep(45000 * attempt);
        continue;
      }
      return false;
    }
  }
  return false;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const kingdoms = await getKingdoms();

  const where: any =
    SCOPE === "all" ? { rank: "species", image: null } : { rank: "species", image: null, tags: { contains: "flagship" } };
  const species = await db.taxon.findMany({
    where,
    orderBy: { sortOrder: "asc" },
    select: { id: true, latinName: true, chineseName: true, morphology: true, description: true },
  });

  // 跳过已有文件但未入库的(直接补录),统计待生成
  const tasks: { id: string; latinName: string; chineseName: string; file: string; exists: boolean }[] = [];
  for (const s of species.slice(0, BATCH)) {
    const slug = s.latinName.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase().replace(/^-|-$/g, "");
    const file = `${OUT_DIR}/${slug}.png`;
    tasks.push({ ...s, file, exists: existsSync(file) });
  }
  const needGen = tasks.filter((t) => !t.exists).length;
  console.log(`[start] 范围:${SCOPE} 本轮任务:${tasks.length}(已存在补录 ${tasks.length - needGen},待生成 ${needGen})`);

  let ok = 0;
  const queue = [...tasks];

  async function worker() {
    while (queue.length > 0) {
      const t = queue.shift();
      if (!t) return;
      const kingdom = kingdoms.get(t.id) || "Animalia";
      const style = KINGDOM_STYLE[kingdom] || KINGDOM_STYLE.Animalia;
      let done = t.exists;
      if (!done) {
        done = await generate(
          style(t.chineseName, t.latinName) + featureHints((t as any).morphology, (t as any).description),
          t.file,
        );
      }
      if (done) {
        await db.taxon.update({
          where: { id: t.id },
          data: { image: t.file.replace(/^public/, ""), imageCaption: "复古博物学风格 AI 插图" },
        });
        ok++;
        console.log(`[ok] ${t.latinName} -> ${t.file}`);
      } else {
        console.log(`[fail] ${t.latinName}`);
      }
      if (!t.exists) await sleep(2500 + Math.random() * 3500);
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
  console.log(`[done] 成功 ${ok}/${tasks.length},剩余未处理 ${Math.max(0, species.length - tasks.length)}`);
}

main()
  .catch((e) => {
    console.error("FATAL", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
