// 校验脚本 —— Task 5-a:enrich2-prokaryotes-protists.ts 与 /tmp/list-proto.tsv 的一致性
// 用法:cd /home/z/my-project && bun scripts/validate-enrich2-proto.ts
// 校验项:① 35 条与清单 latin 逐字一致(双向集合相等) ② 文件内无重复 latin
//         ③ 每条 ≥3 个档案字段,且 etymology/discovery/ecologyRole/researchValue 四必备字段非空
//         ④ 每个非空字段长度 20-100 字(按 Unicode 码点计数)
import * as fs from "fs";
import type { EnrichEntry } from "../src/data/types";
import { enrich2ProkaryotesProtists } from "../src/data/seed/enrich2-prokaryotes-protists";

const LIST_PATH = "/tmp/list-proto.tsv";
const FIELDS = ["etymology", "discovery", "genomeInfo", "ecologyRole", "researchValue"] as const;
const REQUIRED = ["etymology", "discovery", "ecologyRole", "researchValue"] as const;
const MIN = 20;
const MAX = 100;

type Row = { id: string; latin: string; chinese: string; kingdom: string };

const errors: string[] = [];
const warnings: string[] = [];

// ---- 解析清单 ----
const lines = fs.readFileSync(LIST_PATH, "utf8").split(/\r?\n/).filter((l) => l.trim());
const list: Row[] = lines.map((l) => {
  const c = l.split("\t").map((s) => s.trim());
  return { id: c[0] ?? "", latin: c[1] ?? "", chinese: c[2] ?? "", kingdom: c[3] ?? "" };
});

// ---- ① 集合相等 ----
const fileLatins = enrich2ProkaryotesProtists.map((e) => e.latin);
const listLatins = list.map((r) => r.latin);
const fileSet = new Set(fileLatins);
const listSet = new Set(listLatins);

if (enrich2ProkaryotesProtists.length !== list.length) {
  errors.push(`条目数不等:文件 ${enrich2ProkaryotesProtists.length} vs 清单 ${list.length}`);
}
for (const l of listLatins) {
  if (!fileSet.has(l)) errors.push(`清单物种未覆盖:${l}(${list.find((r) => r.latin === l)?.chinese})`);
}
for (const l of fileLatins) {
  if (!listSet.has(l)) errors.push(`文件物种不在清单:${l}`);
}

// ---- ② 文件内重复 ----
const seen = new Map<string, number>();
for (const l of fileLatins) seen.set(l, (seen.get(l) ?? 0) + 1);
for (const [l, n] of seen) if (n > 1) errors.push(`文件内重复 latin:${l}(${n} 次)`);

// ---- ③④ 字段完整性 + 长度 ----
const len = (s: string) => [...s].length;
const counts: Record<string, number> = { etymology: 0, discovery: 0, genomeInfo: 0, ecologyRole: 0, researchValue: 0 };

const get = (e: EnrichEntry, f: (typeof FIELDS)[number]): string | undefined => e[f];

enrich2ProkaryotesProtists.forEach((e, i) => {
  const label = `#${i + 1} ${e.latin}`;
  let fieldCount = 0;
  for (const f of FIELDS) {
    const v = get(e, f);
    if (v !== undefined && v.trim() !== "") {
      fieldCount++;
      counts[f]++;
      const n = len(v.trim());
      if (n < MIN || n > MAX) errors.push(`${label} ${f} 长度 ${n} 越界(${MIN}-${MAX}):${v.trim().slice(0, 30)}…`);
    }
  }
  if (fieldCount < 3) errors.push(`${label} 仅 ${fieldCount} 个字段(<3)`);
  for (const f of REQUIRED) {
    const v = get(e, f);
    if (v === undefined || v.trim() === "") errors.push(`${label} 缺必备字段 ${f}`);
  }
  // 中文内容抽查:字段必须以中文标点或汉字收尾(防止残句)
  for (const f of FIELDS) {
    const v = get(e, f);
    if (v && !/[。;.!?;.)]$/u.test(v.trim())) warnings.push(`${label} ${f} 结尾异常:${v.trim().slice(-8)}`);
  }
});

// ---- 输出 ----
console.log(`清单物种数:${listLatins.length};文件条目数:${enrich2ProkaryotesProtists.length}`);
console.log(
  `字段覆盖:etymology ${counts.etymology}/${enrich2ProkaryotesProtists.length}, discovery ${counts.discovery}/${enrich2ProkaryotesProtists.length}, genomeInfo ${counts.genomeInfo}/${enrich2ProkaryotesProtists.length}, ecologyRole ${counts.ecologyRole}/${enrich2ProkaryotesProtists.length}, researchValue ${counts.researchValue}/${enrich2ProkaryotesProtists.length}`
);
if (warnings.length) {
  console.log(`\n警告 ${warnings.length} 条:`);
  warnings.forEach((w) => console.log("  [W] " + w));
}
if (errors.length) {
  console.error(`\n错误 ${errors.length} 条:`);
  errors.forEach((e) => console.error("  [E] " + e));
  process.exit(1);
}
console.log("\nALL CHECKS PASSED");
