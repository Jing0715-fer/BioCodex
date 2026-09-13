import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getTree } from "@/lib/bio-server";

export const dynamic = "force-dynamic";

// GET /api/stats — 图鉴全局统计
export async function GET() {
  try {
    const total = await db.taxon.count();
    const species = await db.taxon.count({ where: { rank: "species" } });
    const phyla = await db.taxon.count({ where: { rank: "phylum" } });
    const families = await db.taxon.count({ where: { rank: "family" } });
    const genera = await db.taxon.count({ where: { rank: "genus" } });
    const images = await db.taxon.count({ where: { rank: "species", image: { not: null } } });
    const flagship = await db.taxon.count({ where: { tags: { contains: "flagship" } } });
    const iucn = await db.taxon.groupBy({
      by: ["conservation"],
      _count: true,
      where: { rank: "species", conservation: { not: null } },
    });
    const ncbi = await db.taxon.count({ where: { ncbiTaxId: { not: null } } });
    // 科学档案覆盖(词源/发现史/基因组/生态位/科研价值任一非空即计入)
    const profiled = await db.taxon.count({
      where: {
        rank: "species",
        OR: [
          { etymology: { not: null } },
          { discovery: { not: null } },
          { genomeInfo: { not: null } },
          { ecologyRole: { not: null } },
          { researchValue: { not: null } },
        ],
      },
    });

    // 各界物种数
    const tree = await getTree();
    const kingdomStats: { kingdom: string; chinese: string; species: number; taxa: number; image: string | null }[] = [];
    const domainKingdom = (nodes: any[], collect: any[] = []) => {
      for (const n of nodes) {
        if (n.rank === "kingdom" || n.rank === "domain") {
          collect.push(n);
        } else {
          domainKingdom(n.children, collect);
        }
      }
      return collect;
    };
    const topNodes = domainKingdom(tree);
    for (const n of topNodes) {
      let spWithImage = 0;
      const walk = (x: any) => {
        if (x.rank === "species" && x.image) spWithImage++;
        x.children.forEach(walk);
      };
      walk(n);
      kingdomStats.push({
        kingdom: n.latinName,
        chinese: n.chineseName,
        species: n.speciesCount,
        taxa: n.totalCount,
        image: null,
      });
    }

    return NextResponse.json({
      success: true,
      stats: {
        total,
        species,
        phyla,
        families,
        genera,
        images,
        flagship,
        ncbiLinked: ncbi,
        profiled,
        iucn: iucn.map((i) => ({ code: i.conservation, count: i._count })),
        kingdoms: kingdomStats,
      },
    });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
