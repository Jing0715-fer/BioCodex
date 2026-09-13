import { NextRequest, NextResponse } from "next/server";
import { getTree } from "@/lib/bio-server";

export const dynamic = "force-dynamic";

// 返回精简的全量分类树(前端树形浏览用)
export async function GET(_req: NextRequest) {
  try {
    const tree = await getTree();
    const trim = (n: any): any => ({
      id: n.id,
      rank: n.rank,
      la: n.latinName,
      cn: n.chineseName,
      co: n.conservation,
      im: n.image ? true : false,
      sc: n.speciesCount,
      ch: (n.children as any[]).map(trim),
    });
    return NextResponse.json({ success: true, tree: tree.map(trim) });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
