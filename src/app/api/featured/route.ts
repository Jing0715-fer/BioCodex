import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getFlatTaxa, getKingdomPaths } from "@/lib/bio-server";
import { kingdomOf } from "@/lib/bio-domain";

export const dynamic = "force-dynamic";

// GET /api/featured — 旗舰物种精选(优先已配图)
export async function GET(_req: NextRequest) {
  try {
    const rows = await db.taxon.findMany({
      where: { rank: "species", tags: { contains: "flagship" } },
      orderBy: [{ image: { sort: "desc" } }, { sortOrder: "asc" }],
      take: 12,
    });
    const paths = await getKingdomPaths();
    return NextResponse.json({
      success: true,
      featured: rows.map((r) => ({
        id: r.id,
        latinName: r.latinName,
        chineseName: r.chineseName,
        description: r.description,
        image: r.image,
        conservation: r.conservation,
        kingdom: kingdomOf(paths.get(r.id) || []),
      })),
    });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
