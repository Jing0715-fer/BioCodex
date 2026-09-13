import { db } from "@/lib/db";
import { RANK_ORDER } from "@/lib/bio-domain";

// ===== 服务端树/谱系缓存 =====
export interface FlatTaxon {
  id: string;
  parentId: string | null;
  rank: string;
  latinName: string;
  chineseName: string;
  conservation: string | null;
  image: string | null;
  tags: string | null;
  sortOrder: number;
}

export interface TreeNode extends FlatTaxon {
  children: TreeNode[];
  speciesCount: number; // 后代物种数
  totalCount: number; // 后代总数
}

let flatCache: { data: FlatTaxon[]; at: number } | null = null;
let treeCache: { data: TreeNode[]; at: number } | null = null;
let rankCache: { data: Map<string, string[]>; at: number } | null = null; // id -> kingdom path

export const CACHE_TTL = 5 * 60 * 1000;

export async function getFlatTaxa(force = false): Promise<FlatTaxon[]> {
  if (!force && flatCache && Date.now() - flatCache.at < CACHE_TTL) return flatCache.data;
  const rows = await db.taxon.findMany({
    orderBy: { sortOrder: "asc" },
    select: {
      id: true, parentId: true, rank: true, latinName: true, chineseName: true,
      conservation: true, image: true, tags: true, sortOrder: true,
    },
  });
  flatCache = { data: rows as FlatTaxon[], at: Date.now() };
  return rows as FlatTaxon[];
}

export async function getTree(force = false): Promise<TreeNode[]> {
  if (!force && treeCache && Date.now() - treeCache.at < CACHE_TTL) return treeCache.data;
  const flat = await getFlatTaxa(force);
  const byId = new Map<string, TreeNode>();
  for (const t of flat) byId.set(t.id, { ...t, children: [], speciesCount: 0, totalCount: 0 });
  const roots: TreeNode[] = [];
  for (const t of byId.values()) {
    if (t.parentId && byId.has(t.parentId)) byId.get(t.parentId)!.children.push(t);
    else roots.push(t);
  }
  // 自底向上统计
  const postOrder: TreeNode[] = [];
  const walk = (n: TreeNode) => {
    for (const c of n.children) walk(c);
    postOrder.push(n);
  };
  roots.forEach(walk);
  for (const n of postOrder) {
    n.speciesCount = n.rank === "species" ? 1 : 0;
    n.totalCount = 1;
    for (const c of n.children) {
      n.speciesCount += c.speciesCount;
      n.totalCount += c.totalCount;
    }
  }
  treeCache = { data: roots, at: Date.now() };
  return roots;
}

/** id -> 自顶向下界/域路径(用于主题与专属数据库链接) */
export async function getKingdomPaths(force = false): Promise<Map<string, string[]>> {
  if (!force && rankCache && Date.now() - rankCache.at < CACHE_TTL) return rankCache.data;
  const flat = await getFlatTaxa(force);
  const byId = new Map(flat.map((t) => [t.id, t]));
  const memo = new Map<string, string[]>();
  const walk = (id: string): string[] => {
    if (memo.has(id)) return memo.get(id)!;
    const node = byId.get(id);
    let res: string[] = [];
    if (node) {
      const isKingdomOrDomain =
        node.rank === "kingdom" || (node.rank === "domain" && (node.latinName === "Bacteria" || node.latinName === "Archaea"));
      if (isKingdomOrDomain) res = [node.latinName];
      else if (node.parentId) res = walk(node.parentId);
    }
    memo.set(id, res);
    return res;
  };
  for (const t of flat) walk(t.id);
  rankCache = { data: memo, at: Date.now() };
  return memo;
}

export function rankWeight(rank: string): number {
  const i = RANK_ORDER.indexOf(rank);
  return i === -1 ? 99 : i;
}
