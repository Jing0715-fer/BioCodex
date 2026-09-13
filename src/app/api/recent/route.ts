import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getKingdomPaths } from "@/lib/bio-server";
import { kingdomOf } from "@/lib/bio-domain";

export const dynamic = "force-dynamic";

let cache: { at: number; data: { items: any[]; scope: string; limit: number } } | null = null;
const CACHE_MS = 3 * 60_000;

// GET /api/recent — 最近更新/配图的物种(供首页「新页速递」时间线)
// 参数: limit(默认 12,上限 24) | scope(all|illustrated)
export async function GET(req: NextRequest) {
  try {
    const sp = req.nextUrl.searchParams;
    const limit = Math.min(24, Math.max(4, parseInt(sp.get("limit") || "12", 10) || 12));
    const scope = sp.get("scope") === "illustrated" ? "illustrated" : "all";

    if (cache && Date.now() - cache.at < CACHE_MS && cache.data.scope === scope && cache.data.limit === limit) {
      return NextResponse.json({ success: true, recent: cache.data.items });
    }

    // 优先取「最近配图」:updatedAt 变化即视为新插图/新条目
    const where: any = { rank: "species" };
    if (scope === "illustrated") where.image = { not: null };

    const species = await db.taxon.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      take: limit,
      select: {
        id: true, latinName: true, chineseName: true, image: true,
        conservation: true, tags: true, updatedAt: true,
      },
    });

    const kingdomPaths = await getKingdomPaths();

    const parseTags = (raw: string | null): string[] => {
      if (!raw) return [];
      try {
        const arr = JSON.parse(raw);
        return Array.isArray(arr) ? arr.map(String) : [];
      } catch {
        return [];
      }
    };

    const items = species.map((s) => ({
      id: s.id,
      latinName: s.latinName,
      chineseName: s.chineseName,
      image: s.image,
      conservation: s.conservation,
      kingdom: kingdomOf(kingdomPaths.get(s.id) || []),
      hasImage: !!s.image,
      isFlagship: parseTags(s.tags).includes("flagship"),
      updatedAt: s.updatedAt.toISOString(),
    }));

    cache = { at: Date.now(), data: { items, scope, limit } };
    return NextResponse.json({ success: true, recent: items });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
