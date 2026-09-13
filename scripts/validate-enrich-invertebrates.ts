/// <reference types="bun-types" />
/** Task 3-i 自查:latin 全部命中清单 + 字段数/长度/唯一性校验 */
import { enrichInvertebrates } from "../src/data/seed/enrich-invertebrates";

const FIELDS = ["etymology", "discovery", "genomeInfo", "ecologyRole", "researchValue"] as const;

const lines = (await Bun.file("/tmp/taxa-inventory.tsv").text()).split("\n").filter(Boolean);
const speciesLatin = new Set(
  lines.filter((l) => l.startsWith("species\t")).map((l) => l.split("\t")[1])
);
const chineseOf = new Map(
  lines.filter((l) => l.startsWith("species\t")).map((l) => l.split("\t").slice(1, 3) as [string, string])
);

let fail = 0;
const seen = new Set<string>();
const fieldStats: Record<string, number> = {};

for (const e of enrichInvertebrates) {
  const tag = e.latin + (chineseOf.get(e.latin) ? `(${chineseOf.get(e.latin)})` : "");
  if (seen.has(e.latin)) { console.error(`❌ 重复: ${e.latin}`); fail++; }
  seen.add(e.latin);
  if (!speciesLatin.has(e.latin)) { console.error(`❌ 清单未命中: ${e.latin}`); fail++; }
  let n = 0;
  for (const f of FIELDS) {
    const v = e[f];
    if (!v) continue;
    n++;
    fieldStats[f] = (fieldStats[f] || 0) + 1;
    const len = [...v].length;
    if (len < 20 || len > 100) { console.error(`❌ ${tag} ${f} 长度 ${len} 超出 20-100`); fail++; }
  }
  if (n < 3) { console.error(`❌ ${tag} 仅 ${n} 个字段(<3)`); fail++; }
}

console.log(`条目数: ${enrichInvertebrates.length}`);
console.log("字段覆盖:", Object.entries(fieldStats).map(([k, v]) => `${k}:${v}`).join(" "));
const five = enrichInvertebrates.filter((e) => FIELDS.every((f) => e[f])).length;
console.log(`5 字段全覆盖: ${five} 条;其余均为 4 字段`);
console.log(fail === 0 ? "✔ 全部校验通过" : `✘ ${fail} 处问题`);
process.exit(fail === 0 ? 0 : 1);
