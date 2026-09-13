// 校验脚本:检查 expansion2-invertebrates.ts 种子数据的一致性
// (与全库所有种子文件合并去重 / parent 闭合 / 阶元阶梯单调 / 描述长度 / 科学档案五字段 / 禁用标签)
import { coreTaxa } from "../src/data/seed/core";
import { prokaryotes } from "../src/data/seed/prokaryotes";
import { protistsFungi } from "../src/data/seed/protists-fungi";
import { plants } from "../src/data/seed/plants";
import { invertebrates } from "../src/data/seed/invertebrates";
import { vertebrates } from "../src/data/seed/vertebrates";
import { expansionProkaryotes } from "../src/data/seed/expansion-prokaryotes";
import { expansionProtistsFungi } from "../src/data/seed/expansion-protists-fungi";
import { expansionPlants } from "../src/data/seed/expansion-plants";
import { expansionInvertebrates } from "../src/data/seed/expansion-invertebrates";
import { expansionVertebrates } from "../src/data/seed/expansion-vertebrates";
import { expansion2Invertebrates } from "../src/data/seed/expansion2-invertebrates";

const existing = [
  ...coreTaxa,
  ...prokaryotes,
  ...protistsFungi,
  ...plants,
  ...invertebrates,
  ...vertebrates,
  ...expansionProkaryotes,
  ...expansionProtistsFungi,
  ...expansionPlants,
  ...expansionInvertebrates,
  ...expansionVertebrates,
];
const all = [...existing, ...expansion2Invertebrates];
const errors: string[] = [];

// 1. 文件内部唯一性 + 与全库合并唯一性
const seen = new Map<string, string>(); // latin -> rank
for (const t of all) {
  if (seen.has(t.latin)) {
    errors.push(`latin 重复: ${t.latin} (${seen.get(t.latin)} 与 ${t.rank})`);
  }
  seen.set(t.latin, t.rank);
}
console.log(`✔ 唯一性检查: 全库 ${all.length} 条(本文件新增 ${expansion2Invertebrates.length} 条)`);

// 2. parent 引用存在性(新文件)
const latinSet = new Set(all.map((t) => t.latin));
for (const t of expansion2Invertebrates) {
  if (!t.parent) errors.push(`${t.latin}: parent 为空`);
  else if (!latinSet.has(t.parent)) errors.push(`${t.latin}: parent "${t.parent}" 不存在`);
}

// 3. 阶元阶梯单调性(允许 subclass/subphylum 等插入层级,仅要求逐级上升)
const rankIndex: Record<string, number> = {
  species: 0,
  genus: 1,
  family: 2,
  order: 3,
  subclass: 4,
  class: 5,
  subphylum: 6,
  phylum: 7,
  kingdom: 8,
  domain: 9,
};
const byLatin = new Map(all.map((t) => [t.latin, t]));
for (const t of expansion2Invertebrates) {
  if (rankIndex[t.rank] === undefined) errors.push(`${t.latin}: 未知 rank "${t.rank}"`);
  let cur = t;
  let guard = 0;
  while (cur.parent && guard++ < 20) {
    const parent = byLatin.get(cur.parent);
    if (!parent) break; // 已由第 2 步报告
    if (rankIndex[parent.rank] === undefined) {
      errors.push(`${t.latin}: 父级 ${parent.latin} 未知 rank "${parent.rank}"`);
      break;
    }
    if (rankIndex[parent.rank] <= rankIndex[cur.rank]) {
      errors.push(
        `${t.latin}: 阶元阶梯错位 ${cur.rank}(${cur.latin}) 的 parent 为 ${parent.rank}(${parent.latin})`,
      );
      break;
    }
    cur = parent;
  }
  if (guard >= 20) errors.push(`${t.latin}: 疑似循环引用`);
}

// 4. 物种必填字段与字段长度(基础 + 5 个科学档案字段)
const len = (s?: string) => (s ? [...s].length : 0);
for (const t of expansion2Invertebrates) {
  if (t.rank === "species") {
    if (!t.description || !t.morphology || !t.habitat || !t.distribution) {
      errors.push(`${t.latin}: 物种缺少必填描述字段`);
    }
    const d = len(t.description);
    if (d < 60 || d > 140) errors.push(`${t.latin}: description ${d} 字(要求 60-140)`);
    for (const f of ["morphology", "habitat", "distribution"] as const) {
      const v = len(t[f]);
      if (v < 20 || v > 60) errors.push(`${t.latin}: ${f} ${v} 字(要求 20-60)`);
    }
    // 5 个科学档案字段:全部必填 + 长度
    const ranges: Record<string, [number, number]> = {
      etymology: [20, 80],
      discovery: [30, 100],
      genomeInfo: [20, 80],
      ecologyRole: [20, 80],
      researchValue: [20, 80],
    };
    for (const [f, [lo, hi]] of Object.entries(ranges)) {
      const v = len((t as unknown as Record<string, unknown>)[f] as string | undefined);
      if (v === 0) errors.push(`${t.latin}: 科学档案字段 ${f} 缺失`);
      else if (v < lo || v > hi) errors.push(`${t.latin}: ${f} ${v} 字(要求 ${lo}-${hi})`);
    }
  } else {
    const d = len(t.description);
    if (d < 30 || d > 80) errors.push(`${t.latin}(${t.rank}): description ${d} 字(要求 30-80)`);
  }
}

// 5. 禁用标签检查(严禁 flagship)
for (const t of expansion2Invertebrates) {
  if (t.tags?.includes("flagship")) errors.push(`${t.latin}: 含禁用标签 flagship`);
}

// 6. 统计
const counts: Record<string, number> = {};
for (const t of expansion2Invertebrates) counts[t.rank] = (counts[t.rank] || 0) + 1;
const species = expansion2Invertebrates.filter((t) => t.rank === "species");
console.log(`阶元分布: ${Object.entries(counts).map(([k, v]) => `${k}:${v}`).join(" ")}`);
console.log(`新增物种 ${species.length} 种,中间阶元 ${expansion2Invertebrates.length - species.length} 个`);
console.log(
  `conservation: ${species.filter((s) => s.conservation).map((s) => `${s.latin}=${s.conservation}`).join(", ")}`,
);
console.log(
  `ncbiTaxId: ${species.filter((s) => s.ncbiTaxId).map((s) => `${s.latin}=${s.ncbiTaxId}`).join(", ")}`,
);
const tagStat = new Map<string, number>();
for (const s of species) for (const tag of s.tags ?? []) tagStat.set(tag, (tagStat.get(tag) ?? 0) + 1);
console.log(`tags: ${[...tagStat.entries()].map(([k, v]) => `${k}:${v}`).join(" ")}`);

if (errors.length) {
  console.error(`\n❌ 共 ${errors.length} 个问题:`);
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}
console.log("\n✔ expansion2-invertebrates.ts 全部校验通过");
