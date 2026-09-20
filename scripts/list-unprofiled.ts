// 列出无科学档案的物种(latin/chinese/所属界),供子代理补强分工
import { db } from "../src/lib/db";

async function main() {
  const all = await db.taxon.findMany({
    select: { id: true, parentId: true, rank: true, latinName: true, chineseName: true },
  });
  const byId = new Map(all.map((t) => [t.id, t]));
  const walkKingdom = (id: string): string => {
    let cur = byId.get(id);
    while (cur) {
      if (cur.rank === "kingdom") return cur.chineseName;
      if (!cur.parentId) return "?";
      cur = byId.get(cur.parentId);
    }
    return "?";
  };
  const species = await db.taxon.findMany({
    where: {
      rank: "species",
      OR: [
        { etymology: null }, { discovery: null },
        { ecologyRole: null }, { researchValue: null },
      ],
    },
    select: { id: true, latinName: true, chineseName: true, parentId: true },
    orderBy: { sortOrder: "asc" },
  });
  console.log(`TOTAL_UNPROFILED\t${species.length}`);
  for (const s of species) {
    console.log(`${s.id}\t${s.latinName}\t${s.chineseName}\t${walkKingdom(s.id)}`);
  }
}
main();
