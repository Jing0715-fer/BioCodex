"use client";

import { useQuery } from "@tanstack/react-query";

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
