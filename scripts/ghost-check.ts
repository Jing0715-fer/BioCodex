/// <reference types="bun-types" />
/**
 * BioCodex 幽灵引用检查(E42)
 *
 * 扫描全库 DB image 引用,验证 public/ 下文件存在;
 * 缺失者(幽灵引用)清除 DB 引用回退雕版占位图,物种自动重回缺图生成池。
 *
 * 用法:bun scripts/ghost-check.ts          # 检查+修复
 *      DRY=1 bun scripts/ghost-check.ts   # 只报告不修复
 */
import { db } from "../src/lib/db";
import { existsSync } from "node:fs";

async function main() {
  const DRY = process.env.DRY === "1";
  const taxa = await db.taxon.findMany({
    where: { image: { not: null } },
    select: { id: true, latinName: true, chineseName: true, image: true },
  });
  const ghosts = taxa.filter((t) => !existsSync("public" + t.image!));
  console.log(`[ghost-check] 库内引用 ${taxa.length},幽灵 ${ghosts.length}`);
  if (ghosts.length === 0) return;
  for (const g of ghosts) {
    console.log(`  [幽灵] ${g.latinName}(${g.chineseName}) => ${g.image}`);
    if (!DRY) {
      await db.taxon.update({
        where: { id: g.id },
        data: { image: null, imageCaption: null },
      });
    }
  }
  if (!DRY) console.log(`[ghost-check] 已清除 ${ghosts.length} 条幽灵引用(物种重回生成池)`);
  else console.log(`[ghost-check] DRY 模式未修复`);
  await db.$disconnect();
}

main();
