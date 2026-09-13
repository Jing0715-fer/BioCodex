/// <reference types="bun-types" />
/** Task 5-c 自查:56 条 latin 与 /tmp/list-inverts.tsv 逐字一致 + 唯一性 + 字段数/长度校验 */
import { enrich2Invertebrates } from "../src/data/seed/enrich2-invertebrates";

const FIELDS = ["etymology", "discovery", "genomeInfo", "ecologyRole", "researchValue"] as const;

// 清单格式:id \t latin \t 中文名(56 行)
const lines = (await Bun.file("/tmp/list-inverts.tsv").text())
  .split("\n")
  .filter((l) => l.trim().length > 0);
const listLatin: string[] = [];
const chineseOf = new Map<string, string>();
for (const l of lines) {
  const cols = l.split("\t").map((c) => c.trim());
  if (cols.length >= 3) {
    listLatin.push(cols[1]);
    chineseOf.set(cols[1], cols[2]);
  }
}

let fail = 0;
const seen = new Set<string>();
const fieldStats: Record<string, number> = {};

// 1) 条数与清单一致性
if (enrich2Invertebrates.length !== listLatin.length) {
  console.error(`❌ 条目数 ${enrich2Invertebrates.length} ≠ 清单 ${listLatin.length}`);
  fail++;
}
const listSet = new Set(listLatin);
if (listSet.size !== listLatin.length) {
  console.error("❌ 清单自身存在重复 latin");
  fail++;
}

// 2) 逐条:重复、清单命中、字段数与长度
for (const e of enrich2Invertebrates) {
  const tag = e.latin + (chineseOf.get(e.latin) ? `(${chineseOf.get(e.latin)})` : "");
  if (seen.has(e.latin)) {
    console.error(`❌ 文件内重复: ${e.latin}`);
    fail++;
  }
  seen.add(e.latin);
  if (!listSet.has(e.latin)) {
    console.error(`❌ 清单未命中: ${e.latin}`);
    fail++;
  }
  let n = 0;
  for (const f of FIELDS) {
    const v = e[f];
    if (!v) continue;
    n++;
    fieldStats[f] = (fieldStats[f] || 0) + 1;
    const len = [...v].length;
    if (len < 20 || len > 100) {
      console.error(`❌ ${tag} ${f} 长度 ${len} 超出 20-100`);
      fail++;
    }
  }
  if (n < 3) {
    console.error(`❌ ${tag} 仅 ${n} 个字段(<3)`);
    fail++;
  }
}

// 3) 反向:清单中的每个 latin 是否都被覆盖
for (const lat of listSet) {
  if (!seen.has(lat)) {
    console.error(`❌ 清单条目未被覆盖: ${lat}(${chineseOf.get(lat)})`);
    fail++;
  }
}

console.log(`清单物种数: ${listLatin.length};文件条目数: ${enrich2Invertebrates.length}`);
console.log(
  "字段覆盖: " +
    FIELDS.map((f) => `${f}:${fieldStats[f] || 0}/${enrich2Invertebrates.length}`).join("  ")
);
console.log(fail === 0 ? "✔ 全部校验通过" : `✘ ${fail} 处问题`);
process.exit(fail === 0 ? 0 : 1);
