/// <reference types="bun-types" />
/**
 * BioCodex 物种配图批量抓取脚本
 * 通过 z-ai image-search CLI 为每个物种抓取真实照片,写入 DB。
 * 用法: nohup bun scripts/fetch-images.ts > image-fetch.log 2>&1 &
 */
import { db } from "../src/lib/db";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const exec = promisify(execFile);
const TMP = "/tmp/bio-img";

interface SpeciesRow {
  id: string;
  latinName: string;
  chineseName: string;
  kingdom: string; // 所属界(沿父链追溯)
  flagship: boolean;
}

async function getKingdom(id: string): Promise<string> {
  let cur: { id: string; rank: string; latinName: string; parentId: string | null } | null =
    await db.taxon.findUnique({
      where: { id },
      select: { id: true, rank: true, latinName: true, parentId: true },
    });
  while (cur && cur.rank !== "kingdom" && cur.parentId) {
    cur = await db.taxon.findUnique({
      where: { id: cur.parentId },
      select: { id: true, rank: true, latinName: true, parentId: true },
    });
  }
  return cur?.latinName ?? "";
}

function buildQuery(t: SpeciesRow): string {
  const cn = t.chineseName;
  const la = t.latinName;
  switch (t.kingdom) {
    case "Bacteria":
    case "Archaea":
      return `${la} 细菌显微镜显微照片`;
    case "Protista":
      return `${la} ${cn} 显微摄影照片`;
    case "Fungi":
      return `${cn} ${la} 真菌照片`;
    case "Plantae":
      return `${cn} ${la} 植物自然摄影照片`;
    case "Animalia":
      return `${cn} ${la} 野生动物摄影照片`;
    default:
      return `${cn} ${la} 照片`;
  }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function searchImage(query: string, outFile: string, timeout = 180000): Promise<{ url: string } | null> {
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      await exec("z-ai", ["image-search", "-q", query, "-c", "2", "--no-rank", "-o", outFile], { timeout });
      const txt = await Bun.file(outFile).text();
      const j = JSON.parse(txt);
      if (j.success && Array.isArray(j.results) && j.results.length > 0) {
        const sorted = [...j.results].sort((a: any, b: any) =>
          parseInt(String(b.original_width || "0")) - parseInt(String(a.original_width || "0"))
        );
        const best = sorted[0];
        if (best && best.original_url) return { url: best.original_url };
      }
      return null; // 请求成功但无结果,不再重试
    } catch (e: any) {
      const msg = String(e?.message || "");
      if (msg.includes("429") || msg.includes("Too many requests")) {
        const wait = 45000 * attempt;
        console.log(`[429] 限流,等待 ${wait / 1000}s 后重试: ${query.slice(0, 30)}`);
        await sleep(wait);
        continue; // 429 不计入失败,重试
      }
      return null;
    }
  }
  return null;
}

async function main() {
  const species = await db.taxon.findMany({
    where: { rank: "species", image: null },
    select: { id: true, latinName: true, chineseName: true, tags: true },
    orderBy: [{ sortOrder: "asc" }],
  });
  console.log(`[start] 待抓取物种: ${species.length}`);

  // 解析所属界
  const rows: SpeciesRow[] = [];
  const kingdomCache = new Map<string, string>();
  for (const s of species) {
    // 沿 parentId 追溯(先取全表 map 更快)
    if (kingdomCache.size === 0) {
      const all = await db.taxon.findMany({
        select: { id: true, rank: true, latinName: true, parentId: true },
      });
      const byId = new Map(all.map((t) => [t.id, t]));
      // 预计算每个节点的 kingdom
      const memo = new Map<string, string>();
      const walk = (id: string): string => {
        if (memo.has(id)) return memo.get(id)!;
        const node = byId.get(id);
        let res = "";
        if (node) {
          if (node.rank === "kingdom") res = node.latinName;
          else if (node.rank === "domain" && (node.latinName === "Bacteria" || node.latinName === "Archaea"))
            res = node.latinName; // 原核生物域直接当界处理
          else if (node.parentId) res = walk(node.parentId);
        }
        memo.set(id, res);
        return res;
      };
      for (const t of all) walk(t.id);
      for (const [k, v] of memo) kingdomCache.set(k, v);
    }
    rows.push({
      id: s.id,
      latinName: s.latinName,
      chineseName: s.chineseName,
      kingdom: kingdomCache.get(s.id) || "",
      flagship: (s.tags || "").includes("flagship"),
    });
  }

  // 旗舰物种优先
  rows.sort((a, b) => Number(b.flagship) - Number(a.flagship));

  const CONCURRENCY = 2;
  let done = 0;
  let ok = 0;
  let failed: string[] = [];
  const total = rows.length;

  async function worker(name: string) {
    while (rows.length > 0) {
      const t = rows.shift()!;
      if (!t) return;
      await sleep(1500 + Math.random() * 2000); // 请求间随机延时
      const q1 = buildQuery(t);
      const out = `${TMP}/${t.id}.json`;
      let r = await searchImage(q1, out);
      if (!r) {
        // 备用查询:纯拉丁名
        const q2 = `${t.latinName} photo`;
        r = await searchImage(q2, out);
      }
      if (r) {
        await db.taxon.update({ where: { id: t.id }, data: { image: r.url } });
        ok++;
        console.log(`[ok ${++done}/${total}] ${t.latinName} -> ${r.url.slice(0, 60)}`);
      } else {
        failed.push(`${t.latinName} (${t.chineseName})`);
        console.log(`[fail ${++done}/${total}] ${t.latinName}`);
      }
    }
  }

  await Promise.all(
    Array.from({ length: CONCURRENCY }, (_, i) => worker(`w${i}`))
  );

  console.log(`\n[done] 成功 ${ok} / ${total},失败 ${failed.length}`);
  if (failed.length) {
    await Bun.write(`${TMP}/failures.json`, JSON.stringify(failed, null, 2));
    console.log(`失败清单已写入 ${TMP}/failures.json`);
  }
}

main()
  .catch((e) => {
    console.error("FATAL", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
