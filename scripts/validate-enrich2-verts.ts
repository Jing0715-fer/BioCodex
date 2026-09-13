/// <reference types="bun-types" />
/**
 * enrich2-vertebrates 数据校验:
 * 1) 条目数 = /tmp/list-verts.tsv 清单数,latin 逐字一致(双向全覆盖);
 * 2) 文件内无重复 latin;
 * 3) 每条含 etymology/discovery/ecologyRole/researchValue 四必填字段,genomeInfo 可选;
 * 4) 每字段长度 20-100 字;
 * 5) 与 enrich-vertebrates.ts(E1)交叉重复仅提示(集成时主代理处理,不判失败)。
 * 用法: bun scripts/validate-enrich2-verts.ts
 */
import { enrich2Vertebrates } from "../src/data/seed/enrich2-vertebrates";
import { enrichVertebrates } from "../src/data/seed/enrich-vertebrates";

const FIELDS = ["etymology", "discovery", "genomeInfo", "ecologyRole", "researchValue"] as const;
const REQUIRED = ["etymology", "discovery", "ecologyRole", "researchValue"] as const;

function fail(msg: string): never {
  console.error("❌ " + msg);
  process.exit(1);
}

// 1. 解析清单(兼容 tab 与多空格分隔:id latin 中文名)
const raw = await Bun.file("/tmp/list-verts.tsv").text();
const listLatin: string[] = [];
for (const line of raw.split("\n")) {
  const t = line.trim();
  if (!t) continue;
  const parts = t.split(/\s+/);
  if (parts.length < 3) fail(`清单行无法解析: ${t}`);
  listLatin.push(parts.slice(1, -1).join(" "));
}
console.log(`清单物种数: ${listLatin.length}`);

if (enrich2Vertebrates.length !== listLatin.length)
  fail(`条目数 ${enrich2Vertebrates.length} ≠ 清单数 ${listLatin.length}`);
if (new Set(listLatin).size !== listLatin.length) fail("清单自身存在重复 latin");

// 2. latin 逐字比对 + 文件内去重
const listSet = new Set(listLatin);
const seen = new Set<string>();
const stats: Record<string, number> = {};
let minLen = 999;
let maxLen = 0;
for (const e of enrich2Vertebrates) {
  if (!e.latin) fail("存在空 latin 条目");
  if (seen.has(e.latin)) fail(`文件内重复: ${e.latin}`);
  seen.add(e.latin);
  if (!listSet.has(e.latin)) fail(`latin 未命中清单: ${e.latin}`);
}
const missing = listLatin.filter((l) => !seen.has(l));
if (missing.length) fail(`清单未被覆盖(${missing.length}): ${missing.join(", ")}`);

// 3. 必填字段与长度
for (const e of enrich2Vertebrates) {
  for (const f of REQUIRED) {
    if (!e[f]) fail(`${e.latin} 缺必填字段 ${f}`);
  }
  for (const f of FIELDS) {
    const v = e[f];
    if (v === undefined) continue;
    if (typeof v !== "string" || v.length === 0) fail(`${e.latin}.${f} 为空`);
    const len = v.length;
    if (len < 20 || len > 100) fail(`${e.latin}.${f} 长度 ${len} 超出 20-100`);
    minLen = Math.min(minLen, len);
    maxLen = Math.max(maxLen, len);
    stats[f] = (stats[f] || 0) + 1;
  }
}

// 4. 与 E1 文件交叉重复(仅提示)
const e1Latin = new Set(enrichVertebrates.map((e) => e.latin));
const overlap = [...seen].filter((l) => e1Latin.has(l));
if (overlap.length)
  console.log(`⚠ 与 enrich-vertebrates.ts 交叉重复(集成时需去重): ${overlap.join(", ")}`);
else console.log("与 enrich-vertebrates.ts 无 latin 交叉");

console.log(`✔ 全部通过: ${enrich2Vertebrates.length} 条,清单双向命中 ${listLatin.length}/${listLatin.length}`);
console.log(`字段长度区间: ${minLen}-${maxLen}`);
console.log("字段覆盖:", FIELDS.map((f) => `${f}:${stats[f] || 0}`).join(" "));
