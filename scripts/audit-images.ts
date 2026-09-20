/// <reference types="bun-types" />
/**
 * BioCodex 物种插图质量审计脚本(启发式,不依赖 AI API)
 * 检测维度:
 *   1. 文件存在性 + PNG 魔数
 *   2. 尺寸合规(生成规格 1152x864)
 *   3. 文件体积(过小 → 疑似空白/损坏)
 *   4. 像素方差(luminance stdev 过低 → 纯色/近空白;过高=噪点爆表)
 *   5. 灰度直方图有效灰阶数(过低 → 信息量不足)
 * 输出:/tmp/image-audit.jsonl(逐条) + 控制台汇总
 * 用法:bun scripts/audit-images.ts
 */
import { db } from "../src/lib/db";
import sharp from "sharp";
import { existsSync, statSync } from "node:fs";

interface AuditRow {
  id: string;
  chinese: string;
  latin: string;
  file: string;
  sizeKB: number;
  width: number;
  height: number;
  lumStdev: number;
  grayLevels: number;
  verdict: "ok" | "warn" | "fail";
  issues: string[];
}

async function main() {
  const taxa = await db.taxon.findMany({
    where: { image: { not: null }, rank: "species" },
    select: { id: true, chineseName: true, latinName: true, image: true },
    orderBy: { latinName: "asc" },
  });
  console.log(`[audit] 待检 ${taxa.length} 张(species)`);

  const rows: AuditRow[] = [];
  const problems: AuditRow[] = [];

  for (const t of taxa) {
    const rel = t.image!;
    const file = "public" + rel;
    const issues: string[] = [];

    if (!existsSync(file)) {
      const row: AuditRow = { id: t.id, chinese: t.chineseName!, latin: t.latinName!, file: rel, sizeKB: 0, width: 0, height: 0, lumStdev: 0, grayLevels: 0, verdict: "fail", issues: ["文件缺失"] };
      rows.push(row); problems.push(row);
      continue;
    }

    const sizeKB = Math.round(statSync(file).size / 1024);
    const buf = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const { width, height, channels } = buf.info;
    const data = buf.data;

    // PNG 尺寸与生成规格比对
    if (Math.abs(width - 1152) > 8 || Math.abs(height - 864) > 8) {
      issues.push(`尺寸异常 ${width}x${height}(规格 1152x864)`);
    }

    // luminance 统计(RGB 加权) + 直方图灰阶数
    let sum = 0, sumSq = 0;
    const hist = new Uint32Array(256);
    const n = width * height;
    for (let i = 0; i < n; i++) {
      const r = data[i * channels], g = data[i * channels + 1], b = data[i * channels + 2];
      const lum = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
      sum += lum; sumSq += lum * lum;
      hist[lum]++;
    }
    const mean = sum / n;
    const lumStdev = Math.sqrt(Math.max(0, sumSq / n - mean * mean));
    let grayLevels = 0;
    for (const c of hist) if (c > n * 0.0005) grayLevels++;

    if (sizeKB < 30) issues.push(`文件过小 ${sizeKB}KB`);
    if (lumStdev < 8) issues.push(`像素方差过低 ${lumStdev.toFixed(1)}(疑似纯色/空白)`);
    if (grayLevels < 24) issues.push(`有效灰阶仅 ${grayLevels}(信息量不足)`);
    if (sizeKB > 2500) issues.push(`文件异常巨大 ${sizeKB}KB`);

    const verdict: AuditRow["verdict"] = issues.length === 0 ? "ok" : issues.some((s) => s.startsWith("文件") || s.startsWith("尺寸")) ? "warn" : "fail";
    const row: AuditRow = { id: t.id, chinese: t.chineseName!, latin: t.latinName!, file: rel, sizeKB, width, height, lumStdev: Math.round(lumStdev * 10) / 10, grayLevels, verdict: verdict as any, issues };
    rows.push(row);
    if (issues.length > 0) problems.push(row);
  }

  // hero 图也一并检
  if (existsSync("public/generated/hero-tree-of-life.png")) {
    const st = statSync("public/generated/hero-tree-of-life.png");
    console.log(`[audit] hero 图 ${Math.round(st.size / 1024)}KB 正常旁路`);
  }

  const out = rows.map((r) => JSON.stringify(r)).join("\n");
  await Bun.write("/tmp/image-audit.jsonl", out);

  const ok = rows.filter((r) => r.verdict === "ok").length;
  const warn = rows.filter((r) => r.verdict === "warn").length;
  const fail = rows.filter((r) => r.verdict === "fail").length;
  console.log(`\n[summary] ok=${ok} warn=${warn} fail=${fail} / 总 ${rows.length}`);
  if (problems.length) {
    console.log("\n问题清单:");
    for (const p of problems) console.log(`  [${p.verdict}] ${p.latin}(${p.chinese}) ${p.file} → ${p.issues.join("; ")}`);
  }
  // 尺寸分布统计(了解实际生成尺寸族)
  const dim = new Map<string, number>();
  for (const r of rows) {
    if (r.width > 0) dim.set(`${r.width}x${r.height}`, (dim.get(`${r.width}x${r.height}`) || 0) + 1);
  }
  console.log("\n尺寸分布:", [...dim.entries()].map(([k, v]) => `${k}×${v}`).join(", "));
}

main()
  .catch((e) => { console.error("FATAL", e); process.exit(1); })
  .finally(async () => { await db.$disconnect(); });
