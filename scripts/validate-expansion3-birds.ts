// 校验 expansion3-birds.ts:
// 唯一性 / parent 闭合 / 阶元阶梯单调 / 字段长度 / 5 科学档案齐全 / 禁用英文 flagship 标签
import { expansion3Birds } from "../src/data/seed/expansion3-birds";
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

// 单调阶元索引(允许 order 挂 subclass/class,如 Aves 下的各目)
const RANK_INDEX: Record<string, number> = {
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

const byLatin = new Map(expansion3Birds.map((t) => [t.latin, t]));
const seenLatins = new Set<string>();
const seenChineses = new Set<string>();

expansion3Birds.forEach((t, i) => {
  const id = `[${i}] ${t.latin}`;
  // 文件内唯一性
  if (seenLatins.has(t.latin)) errors.push(`${id}: 拉丁名文件内重复`);
  seenLatins.add(t.latin);
  if (seenChineses.has(t.chinese)) errors.push(`${id}: 中文名文件内重复`);
  seenChineses.add(t.chinese);
  // 与清单零重复
  if (inventory.has(t.latin)) errors.push(`${id}: 拉丁名与清单重复`);
  for (const [latin, v] of inventory) {
    if (v.chinese === t.chinese) {
      warns.push(`${id}: 中文名与清单单元『${latin} ${t.chinese}』重名(建议人工复核)`);
      break;
    }
  }

  // parent 闭合
  if (t.parent === "") errors.push(`${id}: parent 为空(非顶层不允许)`);
  else {
    const inInv = inventory.has(t.parent);
    const inFile = byLatin.has(t.parent);
    if (!inFile && !inInv) errors.push(`${id}: parent『${t.parent}』在清单与文件中均不存在`);
    // 阶元阶梯单调:父级 rank 必须严格高于本级
    if (RANK_INDEX[t.rank] === undefined) errors.push(`${id}: 未知 rank "${t.rank}"`);
    const parentRank = inInv ? inventory.get(t.parent)!.rank : byLatin.get(t.parent)?.rank;
    if (RANK_INDEX[t.rank] !== undefined && parentRank) {
      if (RANK_INDEX[parentRank] === undefined) {
        errors.push(`${id}: 父级 ${t.parent} rank "${parentRank}" 不在阶梯表`);
      } else if (RANK_INDEX[parentRank] <= RANK_INDEX[t.rank]) {
        errors.push(`${id}: 阶元阶梯错位 ${t.rank} 的 parent 为 ${parentRank}(${t.parent})`);
      }
    }
  }

  // 禁用英文 flagship 标签(项目约定:expansion 系列不新增 flagship,中文「旗舰物种」不受限)
  if ((t.tags ?? []).includes("flagship")) errors.push(`${id}: 禁用英文 flagship 标签`);

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
    if (t.conservation && !/^(EX|EW|CR|EN|VU|NT|LC|DD|NE)$/.test(t.conservation)) {
      errors.push(`${id}: conservation 非法 ${t.conservation}`);
    }
    if (t.ncbiTaxId !== undefined && (!Number.isInteger(t.ncbiTaxId) || t.ncbiTaxId <= 0)) {
      errors.push(`${id}: ncbiTaxId 非法 ${t.ncbiTaxId}`);
    }
  } else {
    if (!t.description) errors.push(`${id}: 缺少 description`);
    else if (dLen < 30 || dLen > 80) errors.push(`${id}: 中间阶元 description ${dLen} 字,超出 30-80`);
    if (!t.parent) errors.push(`${id}: 中间阶元缺 parent`);
    // 中间阶元不应携带科学档案字段(本文件约定仅物种级提供)
    for (const f of ["etymology", "discovery", "genomeInfo", "ecologyRole", "researchValue"] as const) {
      if (t[f]) warns.push(`${id}: 中间阶元含 ${f}(本文件约定物种级才提供)`);
    }
  }
});

// 祖链完整性:每条物种链应逐级可达 DB 顶层
for (const t of expansion3Birds) {
  let cur = t;
  let guard = 0;
  while (cur && guard++ < 20) {
    if (!cur.parent) break;
    const next: (typeof cur) | undefined = byLatin.get(cur.parent) as typeof cur | undefined;
    if (!next) break; // 交给 DB 祖先,链闭合由清单保证
    cur = next;
  }
  if (guard >= 20) errors.push(`${t.latin}: 祖链过长/可能成环`);
}

const speciesCount = expansion3Birds.filter((t) => t.rank === "species").length;
const genusCount = expansion3Birds.filter((t) => t.rank === "genus").length;
const familyCount = expansion3Birds.filter((t) => t.rank === "family").length;
const orderCount = expansion3Birds.filter((t) => t.rank === "order").length;
const ncbiCount = expansion3Birds.filter((t) => t.rank === "species" && t.ncbiTaxId).length;
const consCount = expansion3Birds.filter((t) => t.rank === "species" && t.conservation).length;

console.log(`条目总数 ${expansion3Birds.length}(物种 ${speciesCount} / 属 ${genusCount} / 科 ${familyCount} / 目 ${orderCount})`);
console.log(`物种档案: ncbiTaxId ${ncbiCount}/${speciesCount} | conservation ${consCount}/${speciesCount}`);
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
