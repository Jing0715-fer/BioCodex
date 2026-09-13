"use client";

import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

export interface TreeNodeDTO {
  id: string;
  rank: string;
  la: string;
  cn: string;
  co: string | null;
  im: boolean;
  sc: number;
  ch: TreeNodeDTO[];
}

export interface TaxonDetail {
  id: string;
  rank: string;
  latinName: string;
  chineseName: string;
  authority: string | null;
  description: string | null;
  morphology: string | null;
  habitat: string | null;
  distribution: string | null;
  conservation: string | null;
  ncbiTaxId: number | null;
  etymology: string | null;
  discovery: string | null;
  genomeInfo: string | null;
  ecologyRole: string | null;
  researchValue: string | null;
  image: string | null;
  imageCaption: string | null;
  tags: string[] | null;
  kingdomPath: string[];
  kingdom: string;
  parentId: string | null;
}

export interface ChildDTO {
  id: string;
  rank: string;
  latinName: string;
  chineseName: string;
  conservation: string | null;
  image: string | null;
  description: string | null;
  speciesCount: number;
  ncbiTaxId: number | null;
}

export interface TaxonDetailResponse {
  success: boolean;
  taxon: TaxonDetail;
  lineage: { id: string; rank: string; latinName: string; chineseName: string }[];
  siblings: {
    id: string;
    latinName: string;
    chineseName: string;
    rank: string;
    image: string | null;
    conservation: string | null;
    description: string | null;
  }[];
  children: ChildDTO[];
  counts: { children: number; speciesCount: number; totalCount: number };
}

export interface StatsResponse {
  success: boolean;
  stats: {
    total: number;
    species: number;
    phyla: number;
    families: number;
    genera: number;
    images: number;
    flagship: number;
    ncbiLinked: number;
    profiled: number;
    iucn: { code: string; count: number }[];
    kingdoms: { kingdom: string; chinese: string; species: number; taxa: number; image: string | null }[];
  };
}

export interface FeaturedDTO {
  id: string;
  latinName: string;
  chineseName: string;
  description: string | null;
  image: string | null;
  conservation: string | null;
  kingdom: string;
}

async function json<T>(url: string): Promise<T> {
  const r = await fetch(url);
  return r.json();
}

export function useTree() {
  return useQuery<TreeNodeDTO[]>({
    queryKey: ["bio", "tree"],
    queryFn: async () => (await json<{ success: boolean; tree: TreeNodeDTO[] }>("/api/tree")).tree,
    staleTime: 60_000,
  });
}

export function useTaxon(id: string | null) {
  return useQuery<TaxonDetailResponse | null>({
    queryKey: ["bio", "taxon", id],
    queryFn: id ? () => json<TaxonDetailResponse>(`/api/taxa/${id}`) : async () => null,
    enabled: !!id,
    staleTime: 60_000,
  });
}

export function useStats() {
  return useQuery<StatsResponse["stats"]>({
    queryKey: ["bio", "stats"],
    queryFn: async () => (await json<StatsResponse>("/api/stats")).stats,
    staleTime: 120_000,
  });
}

export function useFeatured() {
  return useQuery<FeaturedDTO[]>({
    queryKey: ["bio", "featured"],
    queryFn: async () => (await json<{ success: boolean; featured: FeaturedDTO[] }>("/api/featured")).featured,
    staleTime: 120_000,
  });
}

export interface RecentDTO {
  id: string;
  latinName: string;
  chineseName: string;
  image: string | null;
  conservation: string | null;
  kingdom: string;
  hasImage: boolean;
  isFlagship: boolean;
  updatedAt: string;
}

export function useRecent(limit = 12) {
  return useQuery<RecentDTO[]>({
    queryKey: ["bio", "recent", limit],
    queryFn: async () => (await json<{ success: boolean; recent: RecentDTO[] }>(`/api/recent?limit=${limit}`)).recent,
    staleTime: 60_000,
  });
}

export interface SearchRow {
  id: string;
  rank: string;
  latinName: string;
  chineseName: string;
  description: string | null;
  image: string | null;
  conservation: string | null;
  kingdom: string;
  score: number;
}

export function useSearch(q: string, enabled = true) {
  return useQuery<SearchRow[]>({
    queryKey: ["bio", "search", q],
    queryFn: async () =>
      (await json<{ success: boolean; results: SearchRow[] }>(`/api/search?q=${encodeURIComponent(q)}`)).results,
    enabled: enabled && q.trim().length > 0,
    staleTime: 30_000,
  });
}

// ===== 物种聚合浏览 =====
export interface SpeciesItem {
  id: string;
  rank: string;
  latinName: string;
  chineseName: string;
  description: string | null;
  image: string | null;
  conservation: string | null;
  ncbiTaxId: number | null;
  tags: string[] | null;
  kingdom: string;
  phylum?: string | null;
}

export interface SpeciesBrowseParams {
  kingdom?: string | null;
  phylum?: string | null;
  iucn?: string | null;
  tag?: string | null;
  hasImage?: boolean;
  q?: string;
  sort?: string;
}

export interface SpeciesPage {
  items: SpeciesItem[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
  facets: {
    kingdoms: Record<string, number>;
    iucn: Record<string, number>;
    phyla: { latin: string; chinese: string; count: number }[];
  };
}

export function useSpeciesBrowse(params: SpeciesBrowseParams) {
  const qs = new URLSearchParams();
  if (params.kingdom) qs.set("kingdom", params.kingdom);
  if (params.phylum) qs.set("phylum", params.phylum);
  if (params.iucn) qs.set("iucn", params.iucn);
  if (params.tag) qs.set("tag", params.tag);
  if (params.hasImage) qs.set("hasImage", "1");
  if (params.q?.trim()) qs.set("q", params.q.trim());
  if (params.sort && params.sort !== "default") qs.set("sort", params.sort);
  const url = `/api/species?${qs.toString()}`;

  return useInfiniteQuery<SpeciesPage>({
    queryKey: ["bio", "species", qs.toString()],
    queryFn: async () => json<SpeciesPage>(url),
    initialPageParam: 1,
    getNextPageParam: (last) => (last.hasMore ? last.page + 1 : undefined),
    staleTime: 60_000,
  });
}

// ===== 物种对比:批量取详情 =====
export function useTaxaBatch(ids: string[]) {
  return useQuery<TaxonDetailResponse[]>({
    queryKey: ["bio", "taxaBatch", [...ids].sort().join(",")],
    queryFn: async () => {
      const results = await Promise.all(
        ids.map((id) => json<{ success: boolean; taxon?: TaxonDetail }>(`/api/taxa/${id}`))
      );
      // 保持与 ids 相同顺序
      const byId = new Map<string, TaxonDetailResponse>();
      ids.forEach((id, i) => {
        if (results[i]?.success) byId.set(id, results[i] as TaxonDetailResponse);
      });
      return ids.map((id) => byId.get(id)).filter((x): x is TaxonDetailResponse => !!x);
    },
    enabled: ids.length > 0,
    staleTime: 60_000,
  });
}
