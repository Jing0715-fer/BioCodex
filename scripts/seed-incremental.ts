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
import { expansion2Microbes } from "../src/data/seed/expansion2-microbes";
import { expansion2ProtistsFungi } from "../src/data/seed/expansion2-protists-fungi";
import { expansion2Plants } from "../src/data/seed/expansion2-plants";
import { expansion2Invertebrates } from "../src/data/seed/expansion2-invertebrates";
import { expansion2Vertebrates } from "../src/data/seed/expansion2-vertebrates";
import { expansion3Insects } from "../src/data/seed/expansion3-insects";
import { expansion3Fishes } from "../src/data/seed/expansion3-fishes";
import { expansion3Birds } from "../src/data/seed/expansion3-birds";
import { expansion3MammalsHerps } from "../src/data/seed/expansion3-mammals-herps";
import { expansion3Plants } from "../src/data/seed/expansion3-plants";
import { expansion4Echinoderms } from "../src/data/seed/expansion4-echinoderms";
import { expansion4WormsSponges } from "../src/data/seed/expansion4-worms-sponges";
import { expansion4Arthropods2 } from "../src/data/seed/expansion4-arthropods2";
import { expansion4Molluscs } from "../src/data/seed/expansion4-molluscs";
import { expansion4Cryptogams } from "../src/data/seed/expansion4-cryptogams";
import { expansion4Vertebrates } from "../src/data/seed/expansion4-vertebrates";
import { expansion4Icons } from "../src/data/seed/expansion4-icons";

const newTaxa: TaxonSeed[] = [
  ...expansionProkaryotes,
  ...expansionProtistsFungi,
  ...expansionPlants,
  ...expansionInvertebrates,
  ...expansionVertebrates,
  ...expansion2Microbes,
  ...expansion2ProtistsFungi,
  ...expansion2Plants,
  ...expansion2Invertebrates,
  ...expansion2Vertebrates,
  ...expansion3Insects,
  ...expansion3Fishes,
  ...expansion3Birds,
  ...expansion3MammalsHerps,
  ...expansion3Plants,
  ...expansion4Echinoderms,
  ...expansion4WormsSponges,
  ...expansion4Arthropods2,
  ...expansion4Molluscs,
  ...expansion4Cryptogams,
  ...expansion4Vertebrates,
  ...expansion4Icons,
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

  // 2. 文件内唯一性 + 幂等跳过(已存在于 DB 的记录跳过,支持脚本重复运行)
  const byLatin = new Map<string, TaxonSeed>();
  for (const t of newTaxa) {
    if (byLatin.has(t.latin)) fail(`新数据内部拉丁名重复: ${t.latin}`);
    byLatin.set(t.latin, t);
  }
  const skipped = newTaxa.filter((t) => existingLatin.has(t.latin)).map((t) => t.latin);
  const toInsert = newTaxa.filter((t) => !existingLatin.has(t.latin));
  if (skipped.length > 0) {
    console.log(`⏭ 跳过 DB 已有记录 ${skipped.length} 条(幂等模式): ${skipped.slice(0, 3).join("、")}${skipped.length > 3 ? " 等" : ""}`);
  }
  console.log(`✔ 唯一性校验通过(待插 ${toInsert.length} 条,与现有 ${existingLatin.size} 条无冲突)`);

  // 3. 父级引用校验(必须存在于 DB 或新数据)
  for (const t of toInsert) {
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
  const pending = [...toInsert];
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
            etymology: t.etymology ?? null,
            discovery: t.discovery ?? null,
            genomeInfo: t.genomeInfo ?? null,
            ecologyRole: t.ecologyRole ?? null,
            researchValue: t.researchValue ?? null,
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
