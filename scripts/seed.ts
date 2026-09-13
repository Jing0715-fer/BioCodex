import { TaxonSeed } from "../src/data/types";
import { coreTaxa } from "../src/data/seed/core";
import { prokaryotes } from "../src/data/seed/prokaryotes";
import { protistsFungi } from "../src/data/seed/protists-fungi";
import { plants } from "../src/data/seed/plants";
import { invertebrates } from "../src/data/seed/invertebrates";
import { vertebrates } from "../src/data/seed/vertebrates";
import { db } from "../src/lib/db";

// ===== 汇总所有种子数据 =====
const allTaxa: TaxonSeed[] = [
  ...coreTaxa,
  ...prokaryotes,
  ...protistsFungi,
  ...plants,
  ...invertebrates,
  ...vertebrates,
];

function fail(msg: string): never {
  console.error("❌ " + msg);
  process.exit(1);
}

// ===== 1. 唯一性校验 =====
const byLatin = new Map<string, TaxonSeed>();
for (const t of allTaxa) {
  if (byLatin.has(t.latin)) {
    fail(`拉丁名重复: ${t.latin}`);
  }
  byLatin.set(t.latin, t);
}
console.log(`✔ 唯一性校验通过,共 ${allTaxa.length} 条记录`);

// ===== 2. 父级引用校验 =====
for (const t of allTaxa) {
  if (t.parent && !byLatin.has(t.parent)) {
    fail(`parent 引用不存在: ${t.latin} -> ${t.parent}`);
  }
}

// ===== 3. 检测父级环 =====
for (const t of allTaxa) {
  const seen = new Set<string>();
  let cur: TaxonSeed | undefined = t;
  while (cur && cur.parent) {
    if (seen.has(cur.latin)) fail(`检测到循环引用: ${t.latin}`);
    seen.add(cur.latin);
    cur = byLatin.get(cur.parent);
  }
}
console.log("✔ 父级引用与循环校验通过");

// ===== 4. 拓扑排序(依赖父级先插入) =====
const inserted = new Map<string, string>(); // latin -> prisma id
const pending = [...allTaxa];
let pass = 0;
let created = 0;

async function seed() {
  // 清空旧数据
  await db.taxon.deleteMany({});

  while (pending.length > 0) {
    pass++;
    const rest: TaxonSeed[] = [];
    let progressThisPass = 0;
    for (const t of pending) {
      if (!t.parent || inserted.has(t.parent)) {
        const order = inserted.size;
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
            sortOrder: order,
            parentId: t.parent ? inserted.get(t.parent)! : null,
          },
        });
        inserted.set(t.latin, rec.id);
        created++;
        progressThisPass++;
      } else {
        rest.push(t);
      }
    }
    if (progressThisPass === 0) {
      fail(`存在无法解析父级的记录 ${rest.length} 条,例如: ${rest[0].latin} -> ${rest[0].parent}`);
    }
    pending.length = 0;
    pending.push(...rest);
  }
  console.log(`✔ 入库完成: ${created} 条,拓扑 ${pass} 轮`);

  // ===== 5. 统计 =====
  const byRank = await db.taxon.groupBy({ by: ["rank"], _count: true });
  console.log("阶元分布:", byRank.map(r => `${r.rank}:${r._count}`).join(" "));

  const speciesCount = await db.taxon.count({ where: { rank: "species" } });
  const imageReady = await db.taxon.count({ where: { rank: "species", image: { not: null } } });
  const flagship = await db.taxon.count({ where: { tags: { contains: "flagship" } } });
  const iucn = await db.taxon.groupBy({ by: ["conservation"], _count: true, where: { conservation: { not: null } } });
  console.log(`物种: ${speciesCount} | 已配图: ${imageReady} | 旗舰物种: ${flagship}`);
  console.log("IUCN:", iucn.map(r => `${r.conservation}:${r._count}`).join(" "));
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
