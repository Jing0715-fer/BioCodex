/// <reference types="bun-types" />
/**
 * BioCodex 科学档案字段批量补强脚本 —— 按拉丁名定位已有物种,仅更新新字段,不触碰 image/tags 等。
 * 用法: bun scripts/enrich-taxa.ts
 */
import { db } from "../src/lib/db";

export interface EnrichEntry {
  latin: string; // 物种拉丁名(定位键,必须已存在于 DB)
  etymology?: string;
  discovery?: string;
  genomeInfo?: string;
  ecologyRole?: string;
  researchValue?: string;
}

// ===== 汇总补强数据(按需追加) =====
import { enrichProkaryotesProtists } from "../src/data/seed/enrich-prokaryotes-protists";
import { enrichFungi } from "../src/data/seed/enrich-fungi";
import { enrichPlants } from "../src/data/seed/enrich-plants";
import { enrichInvertebrates } from "../src/data/seed/enrich-invertebrates";
import { enrichVertebrates } from "../src/data/seed/enrich-vertebrates";

const entries: EnrichEntry[] = [
  ...enrichProkaryotesProtists,
  ...enrichFungi,
  ...enrichPlants,
  ...enrichInvertebrates,
  ...enrichVertebrates,
];

function fail(msg: string): never {
  console.error("❌ " + msg);
  process.exit(1);
}

const FIELDS = ["etymology", "discovery", "genomeInfo", "ecologyRole", "researchValue"] as const;

async function main() {
  // 0. 现状
  const beforeProfile = await db.taxon.count({ where: { rank: "species", OR: FIELDS.map((f) => ({ [f]: { not: null } })) } });
  console.log(`DB 现状: 已有科学档案字段的物种 ${beforeProfile} 个`);
  console.log(`本次补强数据: ${entries.length} 条`);

  // 1. 文件内唯一
  const seen = new Set<string>();
  for (const e of entries) {
    if (seen.has(e.latin)) fail(`补强数据内部重复: ${e.latin}`);
    seen.add(e.latin);
    const hasField = FIELDS.some((f) => e[f]);
    if (!hasField) fail(`条目无任何补强字段: ${e.latin}`);
  }

  // 2. 定位校验(必须是 DB 已有物种)
  const allSpecies = await db.taxon.findMany({ where: { rank: "species" }, select: { latinName: true } });
  const dbLatin = new Set(allSpecies.map((s) => s.latinName));
  for (const e of entries) {
    if (!dbLatin.has(e.latin)) fail(`DB 中不存在该物种: ${e.latin}`);
  }
  console.log(`✔ 唯一性与定位校验通过(${entries.length} 条全部命中)`);

  // 3. 逐条更新(仅写入提供的字段)
  let updated = 0;
  const fieldStats: Record<string, number> = {};
  for (const e of entries) {
    const data: Record<string, string> = {};
    for (const f of FIELDS) {
      if (e[f]) {
        data[f] = e[f]!;
        fieldStats[f] = (fieldStats[f] || 0) + 1;
      }
    }
    if (Object.keys(data).length === 0) continue;
    await db.taxon.update({ where: { latinName: e.latin }, data });
    updated++;
  }
  console.log(`✔ 补强完成: 更新 ${updated} 个物种`);
  console.log("字段覆盖:", Object.entries(fieldStats).map(([k, v]) => `${k}:${v}`).join(" "));

  // 4. 统计
  const afterProfile = await db.taxon.count({ where: { rank: "species", OR: FIELDS.map((f) => ({ [f]: { not: null } })) } });
  const total = await db.taxon.count({ where: { rank: "species" } });
  const images = await db.taxon.count({ where: { rank: "species", image: { not: null } } });
  console.log(`入库后: ${afterProfile}/${total} 物种拥有科学档案(配图 ${images} 应保持不变)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
