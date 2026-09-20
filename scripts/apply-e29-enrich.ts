/// <reference types="bun-types" />
/**
 * E29-b 档案扩写统一应用脚本:应用子代理产出的 JSON 扩写数据到 DB。
 * 校验:字数阈值(morphology 缺图种≥55/其余≥20、habitat≥20、distribution≥20、高阶元 description≥35)
 *      新值必须长于旧值(只扩不缩);latin 必须存在于 DB。
 * 输入格式: { "species": { "<latin>": { "morphology"?: str, "habitat"?: str, "distribution"?: str } },
 *              "higher": { "<latin>": "<新 description>" } }
 * 用法: bun scripts/apply-e29-enrich.ts <json路径> [--dry]
 */
import { db } from "../src/lib/db";
import * as fs from "node:fs";

const file = process.argv[2];
const DRY = process.argv.includes("--dry");
if (!file || !fs.existsSync(file)) { console.error("用法: bun scripts/apply-e29-enrich.ts <json> [--dry]"); process.exit(1); }
const data = JSON.parse(fs.readFileSync(file, "utf-8")) as {
  species?: Record<string, { morphology?: string; habitat?: string; distribution?: string }>;
  higher?: Record<string, string>;
};

const clen = (s?: string | null) => (s ? s.length : 0);

async function main() {
  let appliedSp = 0, appliedHi = 0, skipped: string[] = [];
  const spIds = new Map((await db.taxon.findMany({ where: { rank: "species" }, select: { id: true, latinName: true, image: true, morphology: true, habitat: true, distribution: true } })).map((s) => [s.latinName, s]));

  for (const [latin, patch] of Object.entries(data.species ?? {})) {
    const s = spIds.get(latin);
    if (!s) { skipped.push(`未知物种: ${latin}`); continue; }
    const upd: Record<string, string> = {};
    const minMorph = s.image ? 20 : 55; // 缺图物种 morphology 是生成 prompt 弹药,门槛更高
    if (patch.morphology !== undefined) {
      if (patch.morphology.length < Math.max(minMorph, clen(s.morphology))) { skipped.push(`${latin}.morphology ${patch.morphology.length}字 不达 ${Math.max(minMorph, clen(s.morphology))}门槛`); continue; }
      upd.morphology = patch.morphology;
    }
    if (patch.habitat !== undefined) {
      if (patch.habitat.length < Math.max(20, clen(s.habitat))) { skipped.push(`${latin}.habitat 不达门槛`); continue; }
      upd.habitat = patch.habitat;
    }
    if (patch.distribution !== undefined) {
      if (patch.distribution.length < Math.max(20, clen(s.distribution))) { skipped.push(`${latin}.distribution 不达门槛`); continue; }
      upd.distribution = patch.distribution;
    }
    if (!Object.keys(upd).length) { skipped.push(`${latin} 空补丁`); continue; }
    if (!DRY) await db.taxon.update({ where: { id: s.id }, data: upd });
    appliedSp++;
  }

  const hiRows = await db.taxon.findMany({ where: { rank: { in: ["domain", "kingdom", "phylum", "subphylum", "class", "subclass", "order", "family", "genus"] } }, select: { id: true, latinName: true, description: true } });
  const hiIds = new Map(hiRows.map((h) => [h.latinName, h]));
  for (const [latin, desc] of Object.entries(data.higher ?? {})) {
    const h = hiIds.get(latin);
    if (!h) { skipped.push(`未知高阶元: ${latin}`); continue; }
    if (desc.length < Math.max(35, clen(h.description))) { skipped.push(`${latin}.description ${desc.length}字 不达门槛`); continue; }
    if (!DRY) await db.taxon.update({ where: { id: h.id }, data: { description: desc } });
    appliedHi++;
  }

  console.log(`✔ 应用完成: species ${appliedSp} 条 / 高阶元 ${appliedHi} 条${DRY ? "(dry 未写库)" : ""}`);
  if (skipped.length) { console.log(`跳过 ${skipped.length} 条:`); for (const s of skipped.slice(0, 30)) console.log("  -", s); }
  process.exit(0);
}
main().catch((e) => { console.error(e); process.exit(1); });
