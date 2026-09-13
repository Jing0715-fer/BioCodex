import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getFlatTaxa, getKingdomPaths } from "@/lib/bio-server";
import { kingdomOf } from "@/lib/bio-domain";

export const dynamic = "force-dynamic";

// GET /api/search?q= — 中英/拉丁文搜索(排序:精确 > 前缀 > 包含)
export async function GET(req: NextRequest) {
  try {
    const q = (req.nextUrl.searchParams.get("q") || "").trim();
    if (!q) return NextResponse.json({ success: true, results: [] });
    const ql = q.toLowerCase();

    const rows = await db.taxon.findMany({
      where: {
        OR: [
          { latinName: { contains: q } },
          { chineseName: { contains: q } },
          { description: { contains: q } },
          { morphology: { contains: q } },
          { habitat: { contains: q } },
        ],
      },
      orderBy: { sortOrder: "asc" },
    });

    const flat = await getFlatTaxa();
    const byId = new Map(flat.map((t) => [t.id, t]));
    const kingdomPaths = await getKingdomPaths();

    const scored = rows.map((r) => {
      const la = r.latinName.toLowerCase();
      const cn = r.chineseName;
      let score = 0;
      if (la === ql) score += 100;
      else if (la.startsWith(ql)) score += 80;
      else if (la.includes(ql)) score += 50;
      if (cn === q) score += 100;
      else if (cn.startsWith(q)) score += 70;
      else if (cn.includes(q)) score += 40;
      if (r.description?.includes(q)) score += 10;
      if (r.rank === "species") score += 15; // 物种优先
      if (r.tags?.includes("flagship")) score += 5;
      // 谱系末端中文前缀(如"猫科"命中"猫")已在 chineseName 逻辑覆盖
      return { r, score };
    });

    const top = scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 60)
      .map(({ r, score }) => {
        const path = kingdomPaths.get(r.id) || [];
        return {
          id: r.id,
          rank: r.rank,
          latinName: r.latinName,
          chineseName: r.chineseName,
          description: r.description,
          image: r.image,
          conservation: r.conservation,
          kingdom: kingdomOf(path),
          score,
        };
      });

    return NextResponse.json({ success: true, results: top });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
