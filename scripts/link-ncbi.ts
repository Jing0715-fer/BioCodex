/// <reference types="bun-types" />
/**
 * BioCodex NCBI Taxonomy 锚定脚本
 *
 * 为库内缺 ncbiTaxId 的物种批量在线核验并回填 NCBI Taxonomy ID。
 * 严格核验策略(宁缺毋滥):
 *   1. esearch(binomial)必须恰好命中 1 条;
 *   2. esummary 复核:ScientificName 与库内拉丁名逐字一致(忽略大小写/连接符),Rank=species;
 *   3. 任一条件不满足则跳过该物种(记录原因)。
 * 断点续跑:/tmp/ncbi-link.jsonl(逐条追加,已处理物种跳过)。
 * 限速:NCBI 3 req/s 上限,每请求间 sleep 400ms。
 *
 * 用法: bun scripts/link-ncbi.ts            # 干跑(仅输出统计)
 *       APPLY=1 bun scripts/link-ncbi.ts    # 核验并回填 DB
 */
import { db } from "../src/lib/db";
import { appendFileSync, existsSync, readFileSync } from "node:fs";

const OUT = "/tmp/ncbi-link.jsonl";
const APPLY = process.env.APPLY === "1";
const LIMIT = parseInt(process.env.LIMIT || "999", 10);
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const ESEARCH = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi";
const ESUMMARY = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi";

interface Esearch {
  esearchresult?: { count: string; idlist?: string[] };
}
interface Esummary {
  result?: Record<string, { scientificname?: string; rank?: string }>;
}

async function main() {
  const species = await db.taxon.findMany({
    where: { rank: "species", ncbiTaxId: null },
    select: { id: true, latinName: true, chineseName: true },
    orderBy: { latinName: "asc" },
  });

  const done = new Set<string>();
  if (existsSync(OUT)) {
    for (const line of readFileSync(OUT, "utf8").split("\n")) {
      if (!line.trim()) continue;
      try { done.add(JSON.parse(line).id); } catch {}
    }
  }
  const pending = species.filter((s) => !done.has(s.id)).slice(0, LIMIT);
  console.log(`[ncbi-link] 缺锚物种 ${species.length},已处理 ${done.size},本轮 ${pending.length}(APPLY=${APPLY ? "on" : "off"})`);
  if (pending.length === 0) { console.log("全部已处理。"); return; }

  let linked = 0, skipped = 0;
  const t0 = Date.now();

  for (const s of pending) {
    // 1. esearch 精确检索
    let id: string | null = null;
    try {
      const url = `${ESEARCH}?db=taxonomy&retmode=json&term=${encodeURIComponent(s.latinName)}`;
      const r: Esearch = await (await fetch(url)).json();
      if (r.esearchresult?.count === "1" && r.esearchresult.idlist?.length === 1) {
        id = r.esearchresult.idlist[0];
      } else if (r.esearchresult?.count === "0") {
        // 未命中
      } else {
        // 0 或 多条 → 歧义,跳过
        appendFileSync(OUT, JSON.stringify({ id: s.id, latin: s.latinName, result: "ambiguous", count: r.esearchresult?.count }) + "\n");
        skipped++;
        await sleep(400);
        continue;
      }
    } catch (e: any) {
      appendFileSync(OUT, JSON.stringify({ id: s.id, latin: s.latinName, result: "error", reason: String(e?.message || e).slice(0, 80) }) + "\n");
      skipped++;
      continue;
    }
    await sleep(400);

    if (!id) {
      appendFileSync(OUT, JSON.stringify({ id: s.id, latin: s.latinName, result: "nomatch" }) + "\n");
      skipped++;
      continue;
    }

    // 2. esummary 复核(学名逐字一致 + rank=species)
    try {
      const url = `${ESUMMARY}?db=taxonomy&retmode=json&id=${id}`;
      const r: Esummary = await (await fetch(url)).json();
      const rec = r.result?.[id];
      const name = (rec?.scientificname || "").toLowerCase().replace(/[\s\-]+/g, " ").trim();
      const want = s.latinName.toLowerCase().replace(/[\s\-]+/g, " ").trim();
      if (name === want && rec?.rank === "species") {
        if (APPLY) {
          await db.taxon.update({ where: { id: s.id }, data: { ncbiTaxId: parseInt(id) } });
        }
        appendFileSync(OUT, JSON.stringify({ id: s.id, latin: s.latinName, result: "linked", taxId: parseInt(id) }) + "\n");
        linked++;
        console.log(`[锚定${APPLY ? "✓" : "?"}] ${s.latinName} → ${id}`);
      } else {
        appendFileSync(OUT, JSON.stringify({ id: s.id, latin: s.latinName, result: "mismatch", ncbiName: name, ncbiRank: rec?.rank }) + "\n");
        skipped++;
      }
    } catch (e: any) {
      appendFileSync(OUT, JSON.stringify({ id: s.id, latin: s.latinName, result: "error", reason: String(e?.message || e).slice(0, 80) }) + "\n");
      skipped++;
    }
    await sleep(400);
  }

  const total = linked + skipped;
  console.log(`[done] 本轮 ${total} 条:锚定 ${linked} / 跳过 ${skipped};耗时 ${Math.round((Date.now() - t0) / 1000)}s`);
  const final = await db.taxon.count({ where: { rank: "species", ncbiTaxId: { not: null } } });
  console.log(`库内 NCBI 锚定现状: ${final}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
