/// <reference types="bun-types" />
/**
 * BioCodex 增量入库脚本 —— 不清空数据库,仅插入新记录(保护已有配图/收藏引用)。
 * 校验:1) 与 DB 现有 latinName 不重复 2) 文件内不重复 3) parent 必须存在于(DB ∪ 新数据)
 * 用法: bun scripts/seed-incremental.ts
 */
import { TaxonSeed } from "../src/data/types";
import { db } from "../src/lib/db";

// ===== 汇总扩充种子数据(按需追加) =====
import { expansionProkaryotes } from "../src/data/seed/expansion-prokaryotes";
import { expansionProtistsFungi } from "../src/data/seed/expansion-protists-fungi";
import { expansionPlants } from "../src/data/seed/expansion-plants";
import { expansionInvertebrates } from "../src/data/seed/expansion-invertebrates";
import { expansionVertebrates } from "../src/data/seed/expansion-vertebrates";

const newTaxa: TaxonSeed[] = [
  ...expansionProkaryotes,
  ...expansionProtistsFungi,
  ...expansionPlants,
  ...expansionInvertebrates,
  ...expansionVertebrates,
];

function fail(msg: string): never {
  console.error("❌ " + msg);
  process.exit(1);
}

async function main() {
  // 0. 快照 DB 现有规模
  const before = await db.taxon.count();
  const beforeSpecies = await db.taxon.count({ where: { rank: "species" } });
  const beforeImages = await db.taxon.count({ where: { rank: "species", image: { not: null } } });
  console.log(`DB 现状: ${before} 条 / 物种 ${beforeSpecies} / 配图 ${beforeImages}`);
  console.log(`本次新增数据: ${newTaxa.length} 条`);

  // 1. DB 现有 latinName 集合
  const existing = await db.taxon.findMany({ select: { latinName: true } });
  const existingLatin = new Set(existing.map((e) => e.latinName));

  // 2. 文件内唯一性 + 与 DB 不重复
  const byLatin = new Map<string, TaxonSeed>();
  for (const t of newTaxa) {
    if (byLatin.has(t.latin)) fail(`新数据内部拉丁名重复: ${t.latin}`);
    if (existingLatin.has(t.latin)) fail(`与 DB 已有记录重复: ${t.latin}`);
    byLatin.set(t.latin, t);
  }
  console.log(`✔ 唯一性校验通过(新 ${newTaxa.length} 条,与现有 ${existingLatin.size} 条无冲突)`);

  // 3. 父级引用校验(必须存在于 DB 或新数据)
  for (const t of newTaxa) {
    if (t.parent && !byLatin.has(t.parent) && !existingLatin.has(t.parent)) {
      fail(`parent 引用不存在: ${t.latin} -> ${t.parent}`);
    }
  }

  // 4. 父级环检测
  for (const t of newTaxa) {
    const seen = new Set<string>();
    let cur: TaxonSeed | undefined = t;
    while (cur && cur.parent) {
      if (seen.has(cur.latin)) fail(`循环引用: ${t.latin}`);
      seen.add(cur.latin);
      cur = byLatin.get(cur.parent);
    }
  }
  console.log("✔ 父级引用与循环校验通过");

  // 5. 排序种子: 新增 sortOrder 接在现有 max 之后
  const maxRow = await db.taxon.findFirst({ orderBy: { sortOrder: "desc" }, select: { sortOrder: true } });
  let nextOrder = (maxRow?.sortOrder ?? 0) + 1;

  // 6. 拓扑插入(父级在 DB 已存在 → 可直接插;否则等待本文件前面的先插)
  const latinToId = new Map<string, string>(); // 新插入记录 latin -> id
  const pending = [...newTaxa];
  let pass = 0;
  let created = 0;
  while (pending.length > 0) {
    pass++;
    const rest: TaxonSeed[] = [];
    let progress = 0;
    for (const t of pending) {
      const parentId = t.parent ? latinToId.get(t.parent) ?? null : null;
      const parentInDb = t.parent && !latinToId.has(t.parent) && existingLatin.has(t.parent);
      if (!t.parent || latinToId.has(t.parent) || parentInDb) {
        let prismaParentId: string | null = null;
        if (t.parent) {
          if (latinToId.has(t.parent)) {
            prismaParentId = latinToId.get(t.parent)!;
          } else {
            const p = await db.taxon.findUnique({ where: { latinName: t.parent }, select: { id: true } });
            prismaParentId = p?.id ?? null;
            if (!prismaParentId) fail(`父级查询失败: ${t.latin} -> ${t.parent}`);
            latinToId.set(t.parent, prismaParentId);
          }
        }
        const rec = await db.taxon.create({
          data: {
            rank: t.rank,
            latinName: t.latin,
            chineseName: t.chinese,
            authority: t.authority ?? null,
            description: t.description ?? null,
            morphology: t.morphology ?? null,
            habitat: t.habitat ?? null,
            distribution: t.distribution ?? null,
            conservation: t.conservation ?? null,
            ncbiTaxId: t.ncbiTaxId ?? null,
            tags: t.tags && t.tags.length ? JSON.stringify(t.tags) : null,
            sortOrder: nextOrder++,
            parentId: prismaParentId,
          },
        });
        latinToId.set(t.latin, rec.id);
        created++;
        progress++;
      } else {
        rest.push(t);
      }
    }
    if (progress === 0 && rest.length > 0) {
      fail(`存在无法解析父级的记录 ${rest.length} 条,例如: ${rest[0].latin} -> ${rest[0].parent}`);
    }
    pending.length = 0;
    pending.push(...rest);
  }
  console.log(`✔ 增量入库完成: 新建 ${created} 条,拓扑 ${pass} 轮`);

  // 7. 统计
  const after = await db.taxon.count();
  const afterSpecies = await db.taxon.count({ where: { rank: "species" } });
  const afterImages = await db.taxon.count({ where: { rank: "species", image: { not: null } } });
  const byRank = await db.taxon.groupBy({ by: ["rank"], _count: true });
  console.log(`入库后: ${after} 条 / 物种 ${afterSpecies} / 配图 ${afterImages}(应仍为 ${beforeImages})`);
  console.log("阶元分布:", byRank.map((r) => `${r.rank}:${r._count}`).join(" "));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
