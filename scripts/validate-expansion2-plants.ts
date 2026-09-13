// 校验 expansion2-plants.ts:
// 唯一性 / parent 闭合 / 阶元阶梯 / 字段长度 / 5 科学档案齐全 / 禁用 flagship
import { expansion2Plants } from "../src/data/seed/expansion2-plants";
import { readFileSync } from "fs";

const inventory: Map<string, { rank: string; chinese: string }> = new Map();
for (const line of readFileSync("/tmp/taxa-inventory.tsv", "utf8").split("\n")) {
  if (!line.trim()) continue;
  const [rank, latin, chinese] = line.split("\t");
  inventory.set(latin, { rank, chinese });
}

const errors: string[] = [];
const warns: string[] = [];
const len = (s: string) => [...s].length;

const RANK_LADDER: Record<string, string> = {
  species: "genus",
  genus: "family",
  family: "order",
  order: "class",
};

const fileLatins = new Set(expansion2Plants.map((t) => t.latin));
const fileChineses = new Set(expansion2Plants.map((t) => t.chinese));
const seenLatins = new Set<string>();
const seenChineses = new Set<string>();

expansion2Plants.forEach((t, i) => {
  const id = `[${i}] ${t.latin}`;
  // 文件内唯一性
  if (seenLatins.has(t.latin)) errors.push(`${id}: 拉丁名文件内重复`);
  seenLatins.add(t.latin);
  if (seenChineses.has(t.chinese)) errors.push(`${id}: 中文名文件内重复`);
  seenChineses.add(t.chinese);
  // 与清单零重复
  if (inventory.has(t.latin)) errors.push(`${id}: 拉丁名与清单重复`);
  const inv = [...inventory.values()].find((v) => v.chinese === t.chinese);
  if (inv) warns.push(`${id}: 中文名与清单单元『${inv.chinese}』重名(建议人工复核)`);

  // parent 闭合与阶元阶梯
  if (t.parent === "") errors.push(`${id}: parent 为空(非顶层不允许)`);
  else {
    const inFile = fileLatins.has(t.parent);
    const inInv = inventory.has(t.parent);
    if (!inFile && !inInv) errors.push(`${id}: parent『${t.parent}』在清单与文件中均不存在`);
    const expectedParentRank = RANK_LADDER[t.rank];
    if (expectedParentRank) {
      let parentRank: string | undefined;
      if (inInv) parentRank = inventory.get(t.parent)!.rank;
      else parentRank = expansion2Plants.find((x) => x.latin === t.parent)?.rank;
      if (parentRank && parentRank !== expectedParentRank) {
        errors.push(`${id}: 阶元阶梯错误,${t.rank} 的 parent 应为 ${expectedParentRank},实际 ${parentRank}`);
      }
    }
    if (inFile && !seenLatins.has(t.parent)) warns.push(`${id}: parent『${t.parent}』定义于其后(建议前移)`);
  }

  // 禁用 flagship
  if ((t.tags ?? []).includes("flagship")) errors.push(`${id}: 禁用 flagship 标签`);

  // 长度校验
  const isSpecies = t.rank === "species";
  const dLen = t.description ? len(t.description) : 0;
  if (isSpecies) {
    if (!t.description) errors.push(`${id}: 缺少 description`);
    else if (dLen < 60 || dLen > 140) errors.push(`${id}: description ${dLen} 字,超出 60-140`);
    const sentences = (t.description!.match(/。/g) ?? []).length;
    if (sentences < 2 || sentences > 3) warns.push(`${id}: description ${sentences} 句(要求 2-3 句)`);
    for (const f of ["morphology", "habitat", "distribution"] as const) {
      if (!t[f]) errors.push(`${id}: 缺少 ${f}`);
      else {
        const l = len(t[f] as string);
        if (l < 20 || l > 60) errors.push(`${id}: ${f} ${l} 字,超出 20-60`);
      }
    }
    for (const f of ["etymology", "discovery", "genomeInfo", "ecologyRole", "researchValue"] as const) {
      if (!t[f]) errors.push(`${id}: 缺少科学档案字段 ${f}`);
      else {
        const l = len(t[f] as string);
        const [lo, hi] = f === "discovery" ? [30, 100] : [20, 80];
        if (l < lo || l > hi) errors.push(`${id}: ${f} ${l} 字,超出 ${lo}-${hi}`);
      }
    }
    if (t.ncbiTaxId !== undefined && (!Number.isInteger(t.ncbiTaxId) || t.ncbiTaxId <= 0)) {
      errors.push(`${id}: ncbiTaxId 非法 ${t.ncbiTaxId}`);
    }
  } else {
    if (!t.description) errors.push(`${id}: 缺少 description`);
    else if (dLen < 30 || dLen > 80) errors.push(`${id}: 中间阶元 description ${dLen} 字,超出 30-80`);
    if (!t.parent) errors.push(`${id}: 中间阶元缺 parent`);
  }
});

const speciesCount = expansion2Plants.filter((t) => t.rank === "species").length;
const genusCount = expansion2Plants.filter((t) => t.rank === "genus").length;
const familyCount = expansion2Plants.filter((t) => t.rank === "family").length;

console.log(`条目总数 ${expansion2Plants.length}(物种 ${speciesCount} / 属 ${genusCount} / 科 ${familyCount})`);
console.log(`清单单元 ${inventory.size} 条`);
if (warns.length) {
  console.log(`\n⚠ 警告 ${warns.length} 条:`);
  warns.forEach((w) => console.log("  " + w));
}
if (errors.length) {
  console.log(`\n✗ 错误 ${errors.length} 条:`);
  errors.forEach((e) => console.log("  " + e));
  process.exit(1);
}
console.log("\n✓ 全部校验通过");
