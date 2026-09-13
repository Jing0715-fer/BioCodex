import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

// GET /api/random — 随机一个物种(优先有图的)
export async function GET() {
  try {
    const total = await db.taxon.count({ where: { rank: "species" } });
    const skip = Math.floor(Math.random() * total);
    const sp = await db.taxon.findFirst({
      where: { rank: "species" },
      skip,
    });
    if (!sp) return NextResponse.json({ success: false }, { status: 404 });
    return NextResponse.json({
      success: true,
      taxon: {
        id: sp.id,
        latinName: sp.latinName,
        chineseName: sp.chineseName,
        image: sp.image,
        conservation: sp.conservation,
      },
    });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
