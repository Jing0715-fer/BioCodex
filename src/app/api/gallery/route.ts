import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getKingdomPaths, getFlatTaxa } from "@/lib/bio-server";

export const dynamic = "force-dynamic";

// GET /api/gallery — 插图画廊(全部已配图物种,按图找物种)
// 返回轻量字段: id/latinName/chineseName/image/kingdom/phylumZh/conservation/isFlagship
export async function GET() {
  try {
    const species = await db.taxon.findMany({
      where: { rank: "species", image: { not: null } },
      orderBy: { sortOrder: "asc" },
      select: {
        id: true,
        latinName: true,
        chineseName: true,
        image: true,
        imageCaption: true,
        conservation: true,
        tags: true,
        sortOrder: true,
      },
    });

    const kingdomPaths = await getKingdomPaths();
    const flat = await getFlatTaxa();
    // 门中文名(卡片角标用)
    const phylumZh = new Map(flat.filter((t) => t.rank === "phylum").map((t) => [t.latinName, t.chineseName]));
    // 种 → 门拉丁名(经祖先链)
    const phylumOf = new Map<string, string | null>();
    const byId = new Map(flat.map((t) => [t.id, t]));

    const items = species.map((s) => {
      const chain = kingdomPaths.get(s.id) || [];
      const kingdom = chain[chain.length - 1] || "incertae";
      if (!phylumOf.has(s.id)) {
        let ph: string | null = null;
        let cur = byId.get(s.id);
        while (cur?.parentId) {
          const p = byId.get(cur.parentId);
          if (!p) break;
          if (p.rank === "phylum") { ph = p.latinName; break; }
          cur = p;
        }
        phylumOf.set(s.id, ph);
      }
      const ph = phylumOf.get(s.id);
      let isFlagship = false;
      try {
        const t = typeof s.tags === "string" ? JSON.parse(s.tags) : s.tags;
        if (Array.isArray(t)) isFlagship = t.includes("flagship");
      } catch { /* tags 解析失败按非旗舰 */ }
      return {
        id: s.id,
        latinName: s.latinName,
        chineseName: s.chineseName,
        image: s.image as string,
        kingdom,
        phylumZh: ph ? phylumZh.get(ph) || ph : null,
        conservation: s.conservation,
        isFlagship,
      };
    });

    // 界计数(画廊筛选胶囊徽标)
    const counts: Record<string, number> = {};
    for (const it of items) counts[it.kingdom] = (counts[it.kingdom] || 0) + 1;

    // 物种总数(配图完成度指示)
    const speciesTotal = await db.taxon.count({ where: { rank: "species" } });

    return NextResponse.json({ success: true, total: items.length, speciesTotal, counts, items });
  } catch (e) {
    console.error("[gallery] failed:", e);
    return NextResponse.json({ success: false, error: "gallery unavailable" }, { status: 500 });
  }
}
