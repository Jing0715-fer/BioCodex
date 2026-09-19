/// <reference types="bun-types" />
/**
 * E29-a 大类配图回填:门/纲/目/科/属等高阶分类单元的 image 用子树代表物种的插图填充。
 * 选择优先级:flagship 物种 > IUCN CR/EN/VU > sortOrder 最小(最早的种子)。
 * 幂等:仅填充 image IS NULL 的高阶元;caption 标注"代表物种"避免误导。
 * 用法: bun scripts/backfill-ancestor-images.ts [--dry]
 */
import { db } from "../src/lib/db";
import * as fs from "node:fs";

const DRY = process.argv.includes("--dry");
/** IUCN 优先级权重(CR 最高) */
const IUCN_WEIGHT: Record<string, number> = { CR: 5, EN: 4, VU: 3, NT: 2, LC: 1, DD: 1, EW: 5, EX: 5 };

async function main() {
  const all = await db.taxon.findMany({
    select: { id: true, rank: true, latinName: true, chineseName: true, parentId: true, image: true, tags: true, conservation: true, sortOrder: true },
    orderBy: { sortOrder: "asc" },
  });
  const byId = new Map(all.map((t) => [t.id, t]));
  const childrenOf = new Map<string, typeof all>();
  for (const t of all) {
    if (!t.parentId) continue;
    const arr = childrenOf.get(t.parentId) ?? [];
    arr.push(t);
    childrenOf.set(t.parentId, arr);
  }

  // 物种代表打分:flagship(100) + IUCN 权重(0-5*10) + 序位补偿(越小越好)
  const speciesRep = new Map<string, { image: string; score: number; latin: string; chinese: string }>();
  for (const t of all) {
    if (t.rank !== "species" || !t.image) continue;
    const tags = t.tags ? JSON.parse(t.tags as string) as string[] : [];
    const score = (tags.includes("flagship") ? 100 : 0) + (IUCN_WEIGHT[t.conservation ?? ""] ?? 0) * 10 + Math.max(0, 50 - Math.floor(t.sortOrder / 60));
    speciesRep.set(t.id, { image: t.image, score, latin: t.latinName, chinese: t.chineseName });
  }

  // 自底向上:每个非 species 节点聚合子树最佳物种代表
  type Best = { image: string; score: number; latin: string; chinese: string } | null;
  const bestCache = new Map<string, Best>();
  const bestOf = (id: string): Best => {
    if (bestCache.has(id)) return bestCache.get(id)!;
    const self = speciesRep.get(id);
    let best: Best = self ? { ...self } : null;
    for (const ch of childrenOf.get(id) ?? []) {
      const b = bestOf(ch.id);
      if (b && (!best || b.score > best.score)) best = b;
    }
    bestCache.set(id, best);
    return best;
  };

  const HIGH_RANKS = new Set(["domain", "kingdom", "phylum", "subphylum", "class", "subclass", "order", "family", "genus"]);
  let filled = 0;
  const updates: { id: string; latin: string; rank: string; image: string; rep: string }[] = [];
  for (const t of all) {
    if (!HIGH_RANKS.has(t.rank) || t.image) continue;
    const best = bestOf(t.id);
    if (!best) continue;
    updates.push({ id: t.id, latin: t.latinName, rank: t.rank, image: best.image, rep: `${best.chinese}(${best.latin})` });
  }

  console.log(`高阶元待回填 ${updates.length} 条(其中无任何子树配图的跳过)`);
  const byRank = new Map<string, number>();
  for (const u of updates) byRank.set(u.rank, (byRank.get(u.rank) ?? 0) + 1);
  console.log("按阶元:", [...byRank.entries()].map(([k, v]) => `${k}:${v}`).join(" "));

  if (DRY) {
    for (const u of updates.slice(0, 12)) console.log(`  [dry] ${u.rank} ${u.latin} <- ${u.rep}`);
    console.log("(dry 模式未写库)");
    process.exit(0);
  }

  for (const u of updates) {
    await db.taxon.update({
      where: { id: u.id },
      data: { image: u.image, imageCaption: `代表物种:${u.rep} 的复古博物学风格 AI 插图` },
    });
    filled++;
  }
  console.log(`✔ 回填完成: ${filled} 条高阶元获得代表物种插图`);

  const totalImg = await db.taxon.count({ where: { image: { not: null } } });
  const spImg = await db.taxon.count({ where: { rank: "species", image: { not: null } } });
  console.log(`配图字段非空总计: ${totalImg}(species ${spImg} + 高阶元 ${totalImg - spImg})`);
  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
