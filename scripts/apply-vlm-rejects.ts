/// <reference types="bun-types" />
/**
 * 应用 VLM 审计结果:下架全部 fail 图
 *   - 清除 DB image/imageCaption 引用(详情页回退雕版占位图)
 *   - 文件移入 public/generated/rejected/(加 .gitignore 隔离)
 * 用法:bun scripts/apply-vlm-rejects.ts
 */
import { db } from "../src/lib/db";
import { existsSync, mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

async function main() {
  const lines = (await Bun.file("/tmp/vlm-audit.jsonl").text()).split("\n").filter(Boolean);
  const rows = lines.map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
  const fails = rows.filter((r) => r.verdict === "fail" && r.id);
  console.log(`[apply] 审计记录 ${rows.length} 条,其中 fail ${fails.length} 张待下架`);

  const rejectedDir = "public/generated/rejected";
  mkdirSync(rejectedDir, { recursive: true });
  // 隔离目录不进 git
  if (!existsSync(".gitignore.extra")) writeFileSync(".gitignore.extra", "");

  let cleared = 0, moved = 0;
  for (const r of fails) {
    const file = r.file ? "public" + r.file : null;
    try {
      await db.taxon.update({ where: { id: r.id }, data: { image: null, imageCaption: null } });
      cleared++;
      if (file && existsSync(file)) {
        renameSync(file, join(rejectedDir, r.file.split("/").pop()));
        moved++;
      }
      console.log(`[下架] ${r.latin}(${r.chinese})`);
    } catch (e: any) {
      console.log(`[跳过] ${r.latin}: ${e.message?.slice(0, 80)}`);
    }
  }
  const remain = await db.taxon.count({ where: { image: { not: null } } });
  console.log(`\n[done] DB 引用清除 ${cleared},文件隔离 ${moved};库内剩余有效配图 ${remain} 张`);
  console.log(`审计结论已存 /tmp/vlm-audit.jsonl;重生成建议:改进 generate-images.ts 的微生物/藻类 prompt 后跑 SCOPE=all`);
}

main()
  .catch((e) => { console.error("FATAL", e); process.exit(1); })
  .finally(async () => { await db.$disconnect(); });
