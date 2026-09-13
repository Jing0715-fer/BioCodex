import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getFlatTaxa, getKingdomPaths, getTree } from "@/lib/bio-server";
import { kingdomOf } from "@/lib/bio-domain";

export const dynamic = "force-dynamic";

// GET /api/taxa/[id] — 分类单元详情(含谱系、子单元、兄弟)
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const taxon = await db.taxon.findUnique({ where: { id } });
    if (!taxon) {
      return NextResponse.json({ success: false, error: "未找到该分类单元" }, { status: 404 });
    }

    // 谱系(自顶向下)
    const flat = await getFlatTaxa();
    const byId = new Map(flat.map((t) => [t.id, t]));
    const lineage: any[] = [];
    let cur = taxon.parentId ? byId.get(taxon.parentId) : undefined;
    while (cur) {
      lineage.unshift({ id: cur.id, rank: cur.rank, latinName: cur.latinName, chineseName: cur.chineseName });
      cur = cur.parentId ? byId.get(cur.parentId) : undefined;
    }

    // 子单元(带统计)
    const tree = await getTree();
    const findNode = (nodes: any[]): any => {
      for (const n of nodes) {
        if (n.id === id) return n;
        const r = findNode(n.children);
        if (r) return r;
      }
      return null;
    };
    const node = findNode(tree) as any;
    const childIds = new Set<string>((node?.children || []).map((c: any) => c.id as string));
    const children = childIds.size
      ? await db.taxon.findMany({
          where: { id: { in: [...childIds] } },
          orderBy: { sortOrder: "asc" },
        })
      : [];
    const childStats = new Map<string, number>();
    for (const c of node?.children || []) childStats.set(c.id, c.speciesCount);

    // 兄弟(含自身,用于上/下导航)
    const siblings = taxon.parentId
      ? await db.taxon.findMany({
          where: { parentId: taxon.parentId },
          orderBy: { sortOrder: "asc" },
          select: { id: true, latinName: true, chineseName: true, rank: true },
        })
      : [];

    const paths = await getKingdomPaths();
    const kingdomPath = paths.get(taxon.id) || [];
    const tags = taxon.tags ? JSON.parse(taxon.tags) : [];

    return NextResponse.json({
      success: true,
      taxon: {
        ...taxon,
        tags,
        kingdomPath,
        kingdom: kingdomOf(kingdomPath),
      },
      lineage,
      siblings,
      children: children.map((c) => ({
        id: c.id,
        rank: c.rank,
        latinName: c.latinName,
        chineseName: c.chineseName,
        conservation: c.conservation,
        image: c.image,
        description: c.description,
        speciesCount: childStats.get(c.id) ?? 0,
        ncbiTaxId: c.ncbiTaxId,
      })),
      counts: {
        children: children.length,
        speciesCount: node?.speciesCount ?? (taxon.rank === "species" ? 1 : 0),
        totalCount: node?.totalCount ?? 1,
      },
    });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
