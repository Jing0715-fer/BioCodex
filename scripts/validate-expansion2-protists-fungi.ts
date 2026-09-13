/// <reference types="bun-types" />
// Task 3-b 自查脚本:校验 expansion2-protists-fungi.ts
// 1) 与全库(11 个既有种子文件)合并后 latin 唯一,并与 /tmp/taxa-inventory.tsv 对账
// 2) parent 全闭合(全库 ∪ 本文件),本文件内定义先于引用
// 3) 本文件 12 物种的阶元链完整(species→genus→family→order→class→phylum→kingdom,蓝细菌链止于 domain Bacteria)
// 4) 每个物种 5 个科学档案字段(etymology/discovery/genomeInfo/ecologyRole/researchValue)齐备且长度合规
// 5) 字段长度: 物种 desc 60-140, morph/hab/dist 20-60, 中间阶元 desc 30-80
// 6) 无 flagship 标签; 数量核对(12 物种 + 14 中间阶元)
// 用法: bun scripts/validate-expansion2-protists-fungi.ts
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
import { expansion2ProtistsFungi } from "../src/data/seed/expansion2-protists-fungi";
import { TaxonSeed } from "../src/data/types";
import { readFileSync } from "node:fs";

const existing: TaxonSeed[] = [
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
const mine = expansion2ProtistsFungi;
const all = [...existing, ...mine];
const errors: string[] = [];

// 与 /tmp/taxa-inventory.tsv 数量对账
const tsv = readFileSync("/tmp/taxa-inventory.tsv", "utf-8").trim().split("\n");
const tsvLatin = new Set(tsv.map((l) => l.split("\t")[1]));

// 0) 库存对账
console.log(`既有种子文件合计: ${existing.length} 条(清单 TSV: ${tsvLatin.size} 条)`);
if (existing.length !== tsvLatin.size) {
  const inSeeds = new Set(existing.map((t) => t.latin));
  const onlyTsv = [...tsvLatin].filter((x) => !inSeeds.has(x));
  const onlySeeds = existing.map((t) => t.latin).filter((x) => !tsvLatin.has(x));
  errors.push(`种子与 TSV 不一致! 仅TSV: ${onlyTsv.join(",") || "无"}; 仅种子: ${onlySeeds.join(",") || "无"}`);
}

// 1) 唯一性
const seen = new Map<string, string>();
for (const t of all) {
  if (seen.has(t.latin)) errors.push(`latin 重复: ${t.latin}(${seen.get(t.latin)} 与 ${t.rank})`);
  seen.set(t.latin, t.rank);
}
for (const t of mine) {
  if (tsvLatin.has(t.latin)) errors.push(`与清单重复: ${t.latin}`);
}

// 2) parent 闭合
const byLatin = new Map(all.map((t) => [t.latin, t]));
for (const t of all) {
  if (t.parent && !byLatin.has(t.parent)) errors.push(`parent 不存在: ${t.latin} -> ${t.parent}`);
}

// 2.5) 本文件内定义先于引用(可读性)
const definedInFile = new Set<string>();
for (const t of mine) {
  if (t.parent && !tsvLatin.has(t.parent) && !definedInFile.has(t.parent)) {
    errors.push(`本文件引用但未先定义: ${t.latin} -> ${t.parent}`);
  }
  definedInFile.add(t.latin);
}

// 3) 阶元链
const species = mine.filter((t) => t.rank === "species");
const nonSpecies = mine.filter((t) => t.rank !== "species");
for (const s of species) {
  let cur: TaxonSeed | undefined = s;
  const chain: string[] = [];
  let guard = 0;
  while (cur && cur.parent && guard++ < 12) {
    chain.push(`${cur.rank}:${cur.latin}`);
    cur = byLatin.get(cur.parent);
  }
  if (cur) chain.push(`${cur.rank}:${cur.latin}`);
  const LADDER = ["species", "genus", "family", "order", "class", "phylum", "kingdom", "domain"];
  const ranks = chain.map((c) => c.split(":")[0]);
  // 链条须沿 ladder 向上(+1);细菌/古菌域无界级,允许 phylum→(+2)→domain 跳过 kingdom
  for (let i = 1; i < ranks.length; i++) {
    const step = LADDER.indexOf(ranks[i]) - LADDER.indexOf(ranks[i - 1]);
    const skipKingdom = ranks[i - 1] === "phylum" && ranks[i] === "domain";
    if (step !== 1 && !(skipKingdom && step === 2)) {
      errors.push(`阶元链异常: ${s.latin} = ${ranks.join(">")} (${chain.join(" > ")})`);
      break;
    }
  }
  const terminal = cur?.latin ?? "(空)";
  if (!["Protista", "Fungi", "Bacteria", "Archaea", "Eukarya"].includes(terminal)) {
    errors.push(`链终点异常: ${s.latin} -> ${terminal}`);
  }
  const terminalRank = cur?.rank ?? "(空)";
  if (terminalRank !== "kingdom" && terminalRank !== "domain") {
    errors.push(`链终点阶元异常: ${s.latin} -> ${terminalRank}`);
  }
}

// 4/5) 字段长度
const len = (s: string | undefined) => (s ?? "").length;
for (const s of species) {
  for (const f of ["description", "morphology", "habitat", "distribution"] as const) {
    if (!s[f]) errors.push(`${s.latin}: 缺 ${f}`);
  }
  const d = len(s.description);
  if (d < 60 || d > 140) errors.push(`${s.latin}: description ${d} 字(应 60-140)`);
  for (const f of ["morphology", "habitat", "distribution"] as const) {
    const v = len(s[f]);
    if (v < 20 || v > 60) errors.push(`${s.latin}: ${f} ${v} 字(应 20-60)`);
  }
  const sci: [keyof TaxonSeed, number, number][] = [
    ["etymology", 20, 80],
    ["discovery", 30, 100],
    ["genomeInfo", 20, 80],
    ["ecologyRole", 20, 80],
    ["researchValue", 20, 80],
  ];
  for (const [f, lo, hi] of sci) {
    const v = s[f];
    if (typeof v !== "string" || v.length === 0) {
      errors.push(`${s.latin}: 缺科学档案字段 ${String(f)}`);
    } else if (v.length < lo || v.length > hi) {
      errors.push(`${s.latin}: ${String(f)} ${v.length} 字(应 ${lo}-${hi})`);
    }
  }
}
for (const t of nonSpecies) {
  const d = len(t.description);
  if (d < 30 || d > 80) errors.push(`${t.latin}: 中间阶元描述 ${d} 字(应 30-80)`);
}

// 6) 标签与数量
for (const t of mine) {
  if ((t.tags || []).includes("flagship")) errors.push(`${t.latin}: 含 flagship 标签`);
}
console.log(`本文件: ${mine.length} 条(物种 ${species.length} + 中间阶元 ${nonSpecies.length})`);
console.log("物种拉丁名: " + species.map((s) => s.latin).join(", "));
console.log("中间阶元: " + nonSpecies.map((t) => `${t.rank} ${t.latin}`).join(", "));
const kingdomOf = (s: TaxonSeed): string => {
  let cur: TaxonSeed | undefined = s;
  let guard = 0;
  while (cur && cur.parent && guard++ < 12) cur = byLatin.get(cur.parent);
  return cur?.latin ?? "?";
};
const groups: Record<string, string[]> = {};
for (const s of species) {
  const k = kingdomOf(s);
  (groups[k] ||= []).push(s.latin);
}
console.log(
  "物种按终点(域/界)分组: " +
    Object.entries(groups).map(([k, v]) => `${k}:${v.length}(${v.join(",")})`).join(" | ")
);
console.log(`合并后总数: ${all.length}(应为 ${tsvLatin.size + mine.length})`);
const tagCount = new Map<string, number>();
for (const t of mine) for (const tag of t.tags || []) tagCount.set(tag, (tagCount.get(tag) || 0) + 1);
console.log("标签统计: " + [...tagCount.entries()].map(([k, v]) => `${k}=${v}`).join(", "));
const taxIds = species.filter((s) => s.ncbiTaxId).map((s) => `${s.latin}=${s.ncbiTaxId}`);
console.log("ncbiTaxId: " + (taxIds.join(", ") || "无"));

if (errors.length) {
  console.log(`\n发现问题 ${errors.length} 条:`);
  for (const e of errors) console.log(" - " + e);
  process.exit(1);
} else {
  console.log("\n全部检查通过 ✔");
}
