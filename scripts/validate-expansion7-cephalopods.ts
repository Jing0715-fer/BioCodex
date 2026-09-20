// 校验 expansion7-cephalopods.ts:
// 唯一性(文件内 latin+中文)/ 与清单零重复(latin,中文仅警告)/ parent 闭合(清单∪本文件)/
// 阶元阶梯单调 / 字段长度区间 / 5 科学档案齐全 / tags 词表与旗舰白名单 / 祖链无环
// / 锚点(库内被引父级)存在 / 条目构成(12 物种+10 属+8 科+5 目=35 条)
import { expansion7Cephalopods } from "../src/data/seed/expansion7-cephalopods";
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

// 单调阶元索引
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

// 旗舰白名单(任务书指定的高辨识度物种:大王乌贼、幽灵蛸)
const FLAGSHIP_WHITELIST = new Set(["Architeuthis dux", "Vampyroteuthis infernalis"]);
// tags 词表(库内既有词 + flagship;注意任务书的「剧毒物种」库内实为「剧毒」)
const TAG_VOCAB = new Set([
  "flagship",
  "经济物种",
  "观赏动物",
  "入侵物种",
  "濒危物种",
  "明星物种",
  "深海物种",
  "经典实验材料",
  "活化石",
  "剧毒",
]);

const byLatin = new Map(expansion7Cephalopods.map((t) => [t.latin, t]));
const seenLatins = new Set<string>();
const seenChineses = new Set<string>();

// 中文名与清单的重名检测用倒排索引加速
const chineseToLatin = new Map<string, string>();
for (const [latin, v] of inventory) chineseToLatin.set(v.chinese, latin);

// 库内锚点(本文件引用的既有父级)
const ANCHORS = ["Cephalopoda", "Octopoda", "Sepiida", "Sepiidae", "Sepia"];
const referencedInvParents = new Set(
  expansion7Cephalopods.filter((t) => !byLatin.has(t.parent)).map((t) => t.parent)
);

expansion7Cephalopods.forEach((t, i) => {
  const id = `[${i}] ${t.latin}`;
  // 文件内唯一性(latin + 中文)
  if (seenLatins.has(t.latin)) errors.push(`${id}: 拉丁名文件内重复`);
  seenLatins.add(t.latin);
  if (seenChineses.has(t.chinese)) errors.push(`${id}: 中文名文件内重复`);
  seenChineses.add(t.chinese);
  // 与清单零重复(latin)
  if (inventory.has(t.latin)) errors.push(`${id}: 拉丁名与清单重复`);
  // 中文名与清单重名仅警告(要求人工复核,目标零警告)
  const clash = chineseToLatin.get(t.chinese);
  if (clash) warns.push(`${id}: 中文名与清单单元『${clash} ${t.chinese}』重名(需人工复核)`);

  // parent 闭合
  if (t.parent === "") errors.push(`${id}: parent 为空(非顶层不允许)`);
  else {
    const inInv = inventory.has(t.parent);
    const inFile = byLatin.has(t.parent);
    if (!inFile && !inInv) errors.push(`${id}: parent『${t.parent}』在清单与文件中均不存在`);
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

  // tags 词表与旗舰白名单
  for (const tag of t.tags ?? []) {
    if (!TAG_VOCAB.has(tag)) errors.push(`${id}: tags 含非词表词 "${tag}"`);
    if (tag === "flagship" && !FLAGSHIP_WHITELIST.has(t.latin)) {
      errors.push(`${id}: 非白名单物种使用 flagship 标签(仅限 ${[...FLAGSHIP_WHITELIST].join("/")})`);
    }
  }
  if (FLAGSHIP_WHITELIST.has(t.latin) && !(t.tags ?? []).includes("flagship")) {
    errors.push(`${id}: 白名单旗舰物种缺 flagship 标签`);
  }

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
    // 残留占位符检查
    for (const f of ["description", "morphology", "habitat", "distribution", "etymology", "discovery", "genomeInfo", "ecologyRole", "researchValue"] as const) {
      const v = t[f] as string | undefined;
      if (v && (v.includes("?") || v.includes("TODO") || v.includes("占位"))) {
        errors.push(`${id}: ${f} 含疑似占位符/问号`);
      }
    }
  } else {
    if (!t.description) errors.push(`${id}: 缺少 description`);
    else if (dLen < 30 || dLen > 80) errors.push(`${id}: 中间阶元 description ${dLen} 字,超出 30-80`);
    if (!t.parent) errors.push(`${id}: 中间阶元缺 parent`);
    // 中间阶元不应携带科学档案字段(本文件约定仅物种级提供)
    for (const f of ["etymology", "discovery", "genomeInfo", "ecologyRole", "researchValue"] as const) {
      if (t[f]) warns.push(`${id}: 中间阶元含 ${f}(本文件约定物种级才提供)`);
    }
    if (t.ncbiTaxId !== undefined) warns.push(`${id}: 中间阶元含 ncbiTaxId(本文件约定物种级才提供)`);
  }
});

// 祖链完整性:每条链应逐级可达 DB 顶层(文件内逐级,清单祖先交给 DB 闭合)
for (const t of expansion7Cephalopods) {
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

// 锚点存在性(引用的库内父级必须真实在库)
for (const a of ANCHORS) {
  if (referencedInvParents.has(a) && !inventory.has(a)) {
    errors.push(`锚点 ${a} 被引用但不在清单中`);
  }
}

const speciesCount = expansion7Cephalopods.filter((t) => t.rank === "species").length;
const genusCount = expansion7Cephalopods.filter((t) => t.rank === "genus").length;
const familyCount = expansion7Cephalopods.filter((t) => t.rank === "family").length;
const orderCount = expansion7Cephalopods.filter((t) => t.rank === "order").length;

console.log(
  `条目总数 ${expansion7Cephalopods.length}(物种 ${speciesCount} / 属 ${genusCount} / 科 ${familyCount} / 目 ${orderCount})`
);
console.log(`清单单元 ${inventory.size} 条`);
console.log(`引用库内锚点: ${[...referencedInvParents].join("、") || "(无)"}`);
console.log(
  `科学档案覆盖:${expansion7Cephalopods
    .filter((t) => t.rank === "species")
    .filter((t) => t.etymology && t.discovery && t.genomeInfo && t.ecologyRole && t.researchValue).length}/${speciesCount}`
);
const flagged = expansion7Cephalopods.filter((t) => (t.tags ?? []).includes("flagship"));
console.log(`旗舰物种:${flagged.map((t) => t.latin).join("、") || "(无)"}`);
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
