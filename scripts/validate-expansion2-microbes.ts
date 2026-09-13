import { expansion2Microbes } from "../src/data/seed/expansion2-microbes";
import * as fs from "node:fs";

// expansion2-microbes.ts 数据质量自查脚本(与全库清单比对)
// 用法: bun scripts/validate-expansion2-microbes.ts
const lines = fs.readFileSync("/tmp/taxa-inventory.tsv", "utf-8").split("\n").filter(Boolean);
const invLatin = new Set<string>();
const invRank = new Map<string, string>();
for (const line of lines) {
  const [rank, latin] = line.split("\t");
  if (rank && latin) {
    invLatin.add(latin);
    invRank.set(latin, rank);
  }
}

const len = (s: string) => Array.from(s).length;
const errors: string[] = [];
const warns: string[] = [];

const fileLatin = new Map<string, { rank: string; index: number }>();
expansion2Microbes.forEach((t, i) => {
  if (fileLatin.has(t.latin)) errors.push(`文件内重复 latin: ${t.latin}`);
  fileLatin.set(t.latin, { rank: t.rank, index: i });
  if (invLatin.has(t.latin)) errors.push(`与清单重复 latin: ${t.latin}`);
});

let speciesCount = 0;
let intermediateCount = 0;

const rankOf = (latin: string): string | undefined =>
  invRank.get(latin) ?? fileLatin.get(latin)?.rank;

expansion2Microbes.forEach((t, i) => {
  // parent 闭合:必须为清单已有单元,或本文件中更早定义的单元
  const inInv = invLatin.has(t.parent);
  const inFileEarlier = fileLatin.has(t.parent) && (fileLatin.get(t.parent) as { index: number }).index < i;
  if (t.parent === "" || (!inInv && !inFileEarlier)) {
    errors.push(`#${i} ${t.latin} 的 parent "${t.parent}" 无法解析`);
  }
  if (t.rank === "species") {
    speciesCount++;
    const pr = rankOf(t.parent);
    if (pr !== "genus") errors.push(`物种 ${t.latin} 的 parent ${t.parent} 不是 genus(=${pr})`);
    // 5 个科学档案字段必填
    const five = ["etymology", "discovery", "genomeInfo", "ecologyRole", "researchValue"] as const;
    for (const f of five) {
      const v = (t as unknown as Record<string, string | undefined>)[f];
      if (!v || v.length === 0) errors.push(`${t.latin} 缺少科学档案字段 ${f}`);
    }
    if (!t.description || len(t.description) < 60 || len(t.description) > 140)
      warns.push(`${t.latin} description 长度 ${t.description ? len(t.description) : 0} 不在 60-140`);
    for (const f of ["morphology", "habitat", "distribution", "genomeInfo", "ecologyRole", "researchValue", "etymology"] as const) {
      const v = (t as unknown as Record<string, string | undefined>)[f];
      if (v && (len(v) < 20 || len(v) > 80)) warns.push(`${t.latin} ${f} 长度 ${len(v)} 不在 20-80`);
    }
    const d = t.discovery ?? "";
    if (d && (len(d) < 30 || len(d) > 100)) warns.push(`${t.latin} discovery 长度 ${len(d)} 不在 30-100`);
  } else {
    intermediateCount++;
    if (t.description && (len(t.description) < 30 || len(t.description) > 80))
      warns.push(`${t.latin}(rank=${t.rank}) description 长度 ${len(t.description)} 不在 30-80`);
  }
  if (t.tags?.includes("flagship")) errors.push(`${t.latin} 含禁用标签 flagship`);
});

// rank 阶梯:family->order,genus->family
for (const t of expansion2Microbes) {
  if (t.rank === "family" && rankOf(t.parent) !== "order") errors.push(`family ${t.latin} 的 parent 不是 order`);
  if (t.rank === "genus" && rankOf(t.parent) !== "family") errors.push(`genus ${t.latin} 的 parent 不是 family`);
}

console.log(`物种数: ${speciesCount}, 中间阶元数: ${intermediateCount}, 总条目: ${expansion2Microbes.length}`);
console.log(`清单分类单元数: ${invLatin.size}`);
if (errors.length) {
  console.log("ERRORS:");
  errors.forEach((e) => console.log("  - " + e));
  process.exit(1);
}
if (warns.length) {
  console.log("WARNINGS:");
  warns.forEach((w) => console.log("  - " + w));
}
console.log("全部校验通过 ✓");
