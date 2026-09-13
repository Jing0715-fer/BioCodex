import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getKingdomPaths } from "@/lib/bio-server";
import { kingdomOf } from "@/lib/bio-domain";

export const dynamic = "force-dynamic";

// IUCN 受威胁程度排序权重(越小越危)
const IUCN_WEIGHT: Record<string, number> = {
  EX: 0, EW: 1, CR: 2, EN: 3, VU: 4, NT: 5, LC: 6, DD: 7, NE: 8,
};

const VALID_KINGDOMS = new Set(["Bacteria", "Archaea", "Protista", "Fungi", "Plantae", "Animalia"]);
const VALID_IUCN = new Set(["EX", "EW", "CR", "EN", "VU", "NT", "LC", "DD", "NE"]);

// GET /api/species — 物种聚合浏览(按界/保护等级/标签过滤,支持分页与排序)
// 参数: kingdom | iucn | tag | hasImage | q | sort(default|name|iucn|image) | page | pageSize
export async function GET(req: NextRequest) {
  try {
    const sp = req.nextUrl.searchParams;
    const kingdom = sp.get("kingdom") || null;
    const iucn = sp.get("iucn") || null;
    const tag = sp.get("tag") || null;
    const hasImage = sp.get("hasImage") === "1";
    const q = (sp.get("q") || "").trim();
    const sort = sp.get("sort") || "default";
    const page = Math.max(1, parseInt(sp.get("page") || "1", 10) || 1);
    const pageSize = Math.min(60, Math.max(6, parseInt(sp.get("pageSize") || "24", 10) || 24));

    if (kingdom && !VALID_KINGDOMS.has(kingdom))
      return NextResponse.json({ success: false, error: "invalid kingdom" }, { status: 400 });
    if (iucn && !VALID_IUCN.has(iucn))
      return NextResponse.json({ success: false, error: "invalid iucn" }, { status: 400 });

    // 内存过滤(共 311 物种,量小可靠)
    const where: any = { rank: "species" };
    if (iucn && iucn !== "NE") where.conservation = iucn;
    if (q) {
      where.OR = [
        { latinName: { contains: q } },
        { chineseName: { contains: q } },
      ];
    }
    const species = await db.taxon.findMany({
      where,
      orderBy: { sortOrder: "asc" },
      select: {
        id: true, rank: true, latinName: true, chineseName: true, description: true,
        image: true, conservation: true, tags: true, ncbiTaxId: true, sortOrder: true,
      },
    });

    const kingdomPaths = await getKingdomPaths();

    const parseTags = (raw: string | null): string[] => {
      if (!raw) return [];
      try {
        const arr = JSON.parse(raw);
        return Array.isArray(arr) ? arr.map(String) : [];
      } catch {
        return raw.split(",").map((x) => x.trim()).filter(Boolean);
      }
    };

    let items = species.map((s) => ({
      ...s,
      kingdom: kingdomOf(kingdomPaths.get(s.id) || []),
      tags: parseTags(s.tags as unknown as string | null),
      sortOrder: s.sortOrder,
    }));

    if (kingdom) items = items.filter((s) => s.kingdom === kingdom);
    if (iucn === "NE") items = items.filter((s) => !s.conservation);
    if (tag) items = items.filter((s) => s.tags.includes(tag));
    if (hasImage) items = items.filter((s) => !!s.image);

    if (sort === "name") items.sort((a, b) => a.chineseName.localeCompare(b.chineseName, "zh"));
    else if (sort === "iucn") {
      items.sort((a, b) => {
        const w = (IUCN_WEIGHT[a.conservation || "NE"] ?? 9) - (IUCN_WEIGHT[b.conservation || "NE"] ?? 9);
        if (w !== 0) return w;
        return a.sortOrder - b.sortOrder;
      });
    } else if (sort === "image") {
      items.sort((a, b) => (b.image ? 1 : 0) - (a.image ? 1 : 0) || a.sortOrder - b.sortOrder);
    }

    const total = items.length;
    const paged = items.slice((page - 1) * pageSize, page * pageSize).map((s) => ({
      id: s.id,
      rank: s.rank,
      latinName: s.latinName,
      chineseName: s.chineseName,
      description: s.description,
      image: s.image,
      conservation: s.conservation,
      ncbiTaxId: s.ncbiTaxId,
      tags: s.tags,
      kingdom: s.kingdom,
    }));

    return NextResponse.json({
      success: true,
      items: paged,
      total,
      page,
      pageSize,
      hasMore: page * pageSize < total,
      // 当前筛选下的界/等级计数(便于前端展示热度)
      facets: {
        kingdoms: tally(items.map((s) => s.kingdom)),
        iucn: tally(items.map((s) => s.conservation || "NE")),
      },
    });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

function tally<T extends string>(arr: T[]): Record<string, number> {
  const m: Record<string, number> = {};
  for (const x of arr) m[x] = (m[x] || 0) + 1;
  return m;
}
