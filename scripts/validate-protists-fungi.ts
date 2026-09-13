// 校验脚本:检查 protists-fungi.ts 种子数据的一致性
import { protistsFungi } from "../src/data/seed/protists-fungi";
import { coreTaxa } from "../src/data/seed/core";

const all = [...coreTaxa, ...protistsFungi];
const errors: string[] = [];

// 1. latin 唯一性(含与 core.ts 合并检查)
const seen = new Map<string, string>(); // latin -> rank
for (const t of all) {
  if (seen.has(t.latin)) {
    errors.push(`latin 重复: ${t.latin} (${seen.get(t.latin)} 与 ${t.rank})`);
  }
  seen.set(t.latin, t.rank);
}

// 2. parent 引用存在性
const latinSet = new Set(all.map((t) => t.latin));
for (const t of protistsFungi) {
  if (!t.parent) errors.push(`${t.latin}: parent 为空`);
  else if (!latinSet.has(t.parent)) errors.push(`${t.latin}: parent "${t.parent}" 不存在`);
}

// 3. 链条完整性:species→genus→family→order→class→phylum→kingdom
const byLatin = new Map(all.map((t) => [t.latin, t]));
const rankOrder = ["species", "genus", "family", "order", "class", "phylum", "kingdom"];
for (const t of protistsFungi.filter((x) => x.rank === "species")) {
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

// 4. 门级 parent 必须是 Protista/Fungi
for (const t of protistsFungi.filter((x) => x.rank === "phylum")) {
  if (t.parent !== "Protista" && t.parent !== "Fungi") {
    errors.push(`phylum ${t.latin} parent 为 ${t.parent}(应为 Protista/Fungi)`);
  }
}

// 5. 统计
const counts: Record<string, number> = {};
for (const t of protistsFungi) counts[t.rank] = (counts[t.rank] || 0) + 1;
const species = protistsFungi.filter((t) => t.rank === "species");
const protistSp = species.filter((s) => {
  let cur: (typeof all)[number] | undefined = s;
  while (cur && cur.rank !== "kingdom") cur = byLatin.get(cur.parent);
  return cur?.latin === "Protista";
});

// 6. 物种字段与长度检查(仅报告)
const lenRange = (arr: number[]) => `${Math.min(...arr)}-${Math.max(...arr)}`;
const descLens: number[] = [];
const morphLens: number[] = [];
const habLens: number[] = [];
const distLens: number[] = [];
for (const s of species) {
  if (!s.description || !s.morphology || !s.habitat || !s.distribution) {
    errors.push(`${s.latin}: 物种缺少 description/morphology/habitat/distribution`);
    continue;
  }
  descLens.push(s.description.length);
  morphLens.push((s.morphology || "").length);
  habLens.push((s.habitat || "").length);
  distLens.push((s.distribution || "").length);
}
const nonSpecies = protistsFungi.filter((t) => t.rank !== "species");
for (const t of nonSpecies) {
  if (!t.description || t.description.length < 20) {
    errors.push(`${t.latin}: 非物种描述缺失或过短`);
  }
}
const nonSpDescLens = nonSpecies.map((t) => (t.description || "").length);
const badLongSpecies = species.filter((t) => (t.description || "").length > 150);
if (badLongSpecies.length) errors.push(`物种描述过长(>150): ${badLongSpecies.map((t) => `${t.latin}(${(t.description || "").length})`).join(", ")}`);

// 7. 标签统计
const tagCount = new Map<string, number>();
for (const t of protistsFungi) {
  for (const tag of t.tags || []) tagCount.set(tag, (tagCount.get(tag) || 0) + 1);
}

console.log("=== BioCodex 种子数据校验(protists-fungi) ===");
console.log(`总记录数: ${protistsFungi.length}`);
console.log(`各阶元: ${Object.entries(counts).map(([k, v]) => `${k}=${v}`).join(", ")}`);
console.log(`物种数: ${species.length}(原生生物 ${protistSp.length},真菌 ${species.length - protistSp.length})`);
console.log(`物种描述长度: ${lenRange(descLens)} 字;morphology ${lenRange(morphLens)};habitat ${lenRange(habLens)};distribution ${lenRange(distLens)}`);
console.log(`非物种(门/纲/目/科/属)描述长度: ${lenRange(nonSpDescLens)} 字`);
console.log(`标签统计: ${[...tagCount.entries()].map(([k, v]) => `${k}=${v}`).join(", ")}`);
console.log(`ncbiTaxId 数量: ${protistsFungi.filter((t) => t.ncbiTaxId).length}`);
if (errors.length) {
  console.log(`\n发现问题 ${errors.length} 条:`);
  for (const e of errors) console.log(" - " + e);
  process.exit(1);
} else {
  console.log("\n全部检查通过 ✔");
}
