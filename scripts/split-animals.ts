// 把无档案动物按"脊索动物门内/外"拆成两份清单
import { db } from "../src/lib/db";
import { readFileSync } from "fs";

async function main() {
  const all = await db.taxon.findMany({ select: { id: true, parentId: true, rank: true, latinName: true } });
  const byId = new Map(all.map((t) => [t.id, t]));
  const hasChordata = (id: string): boolean => {
    let cur = byId.get(id);
    while (cur) {
      if (cur.rank === "phylum" && cur.latinName === "Chordata") return true;
      if (!cur.parentId) return false;
      cur = byId.get(cur.parentId);
    }
    return false;
  };
  const lines = readFileSync("/tmp/unprofiled.tsv", "utf-8").split("\n").filter((l) => l.includes("\t"));
  const inverts: string[] = [];
  const verts: string[] = [];
  for (const l of lines) {
    const [id, latin, cn, kingdom] = l.split("\t");
    if (kingdom !== "动物界") continue;
    (hasChordata(id) ? verts : inverts).push(`${id}\t${latin}\t${cn}`);
  }
  console.log(`INVERTS\t${inverts.length}\n${inverts.join("\n")}`);
  console.log(`VERTS\t${verts.length}\n${verts.join("\n")}`);
}
main();
