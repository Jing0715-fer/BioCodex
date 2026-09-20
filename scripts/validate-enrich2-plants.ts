/// <reference types="bun-types" />
/**
 * 校验 src/data/seed/enrich2-plants.ts:
 *   1) 56 条与 /tmp/list-plants.tsv 的 latin 逐字一致(含大小写)
 *   2) 文件内无重复 latin
 *   3) 每条 ≥3 字段(etymology/discovery/ecologyRole/researchValue 四必备)
 *   4) 每字段 20-100 字(discovery 额外要求 ≥30)
 * 用法: bun scripts/validate-enrich2-plants.ts
 */
import { enrich2Plants } from "../src/data/seed/enrich2-plants";
import { readFileSync } from "fs";

const FIELDS = ["etymology", "discovery", "genomeInfo", "ecologyRole", "researchValue"] as const;
const REQUIRED = ["etymology", "discovery", "ecologyRole", "researchValue"] as const;

let errors = 0;
function fail(msg: string): void {
  console.error("❌ " + msg);
  errors++;
}

// 1. 解析清单(TSV: id/latin/中文名/界)
const tsvLines = readFileSync("/tmp/list-plants.tsv", "utf8").trim().split("\n").filter((l) => l.trim());
const listLatin = tsvLines.map((l) => (l.split("\t")[1] || "").trim()).filter(Boolean);
console.log(`清单条数: ${listLatin.length}(去重后 ${new Set(listLatin).size})`);

// 2. 条数与逐字一致(双向)
if (enrich2Plants.length !== listLatin.length) {
  fail(`条数不符: 数据 ${enrich2Plants.length} vs 清单 ${listLatin.length}`);
}
const listSet = new Set(listLatin);
const dataList = enrich2Plants.map((e) => e.latin);
for (const l of dataList) if (!listSet.has(l)) fail(`清单中无此 latin: ${l}`);
const dataListSet = new Set(dataList);
for (const l of listLatin) if (!dataListSet.has(l)) fail(`数据缺失 latin: ${l}`);

// 3. 文件内无重复
const seen = new Set<string>();
for (const e of enrich2Plants) {
  if (seen.has(e.latin)) fail(`文件内重复 latin: ${e.latin}`);
  seen.add(e.latin);
}

// 4. 字段数量与长度
for (const e of enrich2Plants) {
  const present = FIELDS.filter((f) => typeof e[f] === "string" && (e[f] as string).length > 0);
  if (present.length < 3) fail(`${e.latin}: 字段数 ${present.length} < 3`);
  for (const f of REQUIRED) if (!e[f]) fail(`${e.latin}: 缺必备字段 ${f}`);
  for (const f of FIELDS) {
    const v = e[f];
    if (typeof v === "string") {
      if (v.length < 20 || v.length > 100) fail(`${e.latin}.${f}: 长度 ${v.length} 越界(要求 20-100)`);
      if (f === "discovery" && v.length < 30) fail(`${e.latin}.discovery: 长度 ${v.length} < 30`);
    }
  }
}

// 5. 统计
const stats: Record<string, number> = {};
for (const e of enrich2Plants) for (const f of FIELDS) if (e[f]) stats[f] = (stats[f] || 0) + 1;
console.log(`数据条目: ${enrich2Plants.length}`);
console.log("字段覆盖: " + FIELDS.map((f) => `${f}:${stats[f] || 0}`).join(" "));

if (errors === 0) {
  console.log("✅ ALL CHECKS PASSED");
} else {
  console.error(`共 ${errors} 处错误`);
  process.exit(1);
}
