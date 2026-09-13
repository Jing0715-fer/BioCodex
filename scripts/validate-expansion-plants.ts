// 校验脚本:检查 expansion-plants.ts 种子数据的一致性
// (与全库所有种子文件合并去重 / parent 闭合 / 物种链条 / 描述长度 / 禁用标签)
import { coreTaxa } from "../src/data/seed/core";
import { prokaryotes } from "../src/data/seed/prokaryotes";
import { protistsFungi } from "../src/data/seed/protists-fungi";
import { plants } from "../src/data/seed/plants";
import { invertebrates } from "../src/data/seed/invertebrates";
import { vertebrates } from "../src/data/seed/vertebrates";
import { expansionPlants } from "../src/data/seed/expansion-plants";

const existing = [...coreTaxa, ...prokaryotes, ...protistsFungi, ...plants, ...invertebrates, ...vertebrates];
const all = [...existing, ...expansionPlants];
const errors: string[] = [];

// 1. 文件内部唯一性 + 与全库合并唯一性
const seen = new Map<string, string>(); // latin -> rank
for (const t of all) {
  if (seen.has(t.latin)) {
    errors.push(`latin 重复: ${t.latin} (${seen.get(t.latin)} 与 ${t.rank})`);
  }
  seen.set(t.latin, t.rank);
}
console.log(`✔ 唯一性检查: 全库 ${all.length} 条(新增 ${expansionPlants.length} 条)`);

// 2. parent 引用存在性(新文件)
const latinSet = new Set(all.map((t) => t.latin));
for (const t of expansionPlants) {
  if (!t.parent) errors.push(`${t.latin}: parent 为空`);
  else if (!latinSet.has(t.parent)) errors.push(`${t.latin}: parent "${t.parent}" 不存在`);
}

// 3. 链条完整性:species→genus→family→order→class→phylum→kingdom
const byLatin = new Map(all.map((t) => [t.latin, t]));
const rankOrder = ["species", "genus", "family", "order", "class", "phylum", "kingdom"];
for (const t of expansionPlants.filter((x) => x.rank === "species")) {
  let cur = t;
  let idx = 0;
  while (idx < rankOrder.length - 1) {
    const expectedNext = rankOrder[idx + 1];
    const parent = byLatin.get(cur.parent);
    if (!parent) {
      errors.push(`${t.latin}: 链条断于 ${cur.parent}`);
      break;
    }
    if (parent.rank !== expectedNext) {
      errors.push(`${t.latin}: 链条错位 ${cur.rank}(${cur.latin}) 的 parent 为 ${parent.rank}(${parent.latin}),期望 ${expectedNext}`);
      break;
    }
    cur = parent;
    idx++;
  }
  if (idx === rankOrder.length - 1 && cur.rank !== "kingdom") {
    errors.push(`${t.latin}: 链条未到达 kingdom`);
  }
}

// 4. 物种必填字段与字段长度
for (const t of expansionPlants) {
  const len = (s?: string) => (s ? [...s].length : 0);
  if (t.rank === "species") {
    if (!t.description || !t.morphology || !t.habitat || !t.distribution) {
      errors.push(`${t.latin}: 物种缺少必填描述字段`);
    }
    const d = len(t.description);
    if (d < 60 || d > 160) errors.push(`${t.latin}: description ${d} 字(要求 60-140)`);
    for (const f of ["morphology", "habitat", "distribution"] as const) {
      const v = len(t[f]);
      if (v < 20 || v > 70) errors.push(`${t.latin}: ${f} ${v} 字(要求 20-60)`);
    }
  } else {
    const d = len(t.description);
    if (d < 30 || d > 90) errors.push(`${t.latin}(${t.rank}): description ${d} 字(要求 30-80)`);
  }
}

// 5. 禁用标签检查(严禁 flagship)
for (const t of expansionPlants) {
  if (t.tags?.includes("flagship")) errors.push(`${t.latin}: 含禁用标签 flagship`);
}

// 6. 统计
const counts: Record<string, number> = {};
for (const t of expansionPlants) counts[t.rank] = (counts[t.rank] || 0) + 1;
const species = expansionPlants.filter((t) => t.rank === "species");
console.log(`阶元分布: ${Object.entries(counts).map(([k, v]) => `${k}:${v}`).join(" ")}`);
console.log(`新增物种 ${species.length} 种,中间阶元 ${expansionPlants.length - species.length} 个`);
console.log(`conservation: ${species.filter((s) => s.conservation).map((s) => `${s.latin}=${s.conservation}`).join(", ")}`);
console.log(`ncbiTaxId: ${species.filter((s) => s.ncbiTaxId).map((s) => `${s.latin}=${s.ncbiTaxId}`).join(", ")}`);

if (errors.length) {
  console.error(`\n❌ 共 ${errors.length} 个问题:`);
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}
console.log("\n✔ expansion-plants.ts 全部校验通过");
