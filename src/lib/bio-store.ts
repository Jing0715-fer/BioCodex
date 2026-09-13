"use client";

import { create } from "zustand";

export type BioView =
  | { type: "home" }
  | { type: "explore"; taxonId: string | null }
  | { type: "taxon"; id: string; focus?: string }
  | { type: "search"; q: string }
  | { type: "compare"; ids: string[] }
  | { type: "browse"; iucn?: string | null; kingdom?: string | null; tag?: string | null };

export interface BrowseFilter {
  iucn?: string | null;
  kingdom?: string | null;
  tag?: string | null;
}

export const MAX_COMPARE = 3;

interface BioState {
  view: BioView;
  historyStack: BioView[];
  agentOpen: boolean;
  agentUnread: number;
  /** 对比托盘中的物种 id(最多 3) */
  compareIds: string[];
  goHome: () => void;
  explore: (taxonId?: string | null) => void;
  openTaxon: (id: string) => void;
  openSearch: (q: string) => void;
  openCompare: () => void;
  openBrowse: (filter?: BrowseFilter) => void;
  goBack: () => void;
  setAgentOpen: (open: boolean) => void;
  bumpUnread: () => void;
  clearUnread: () => void;
  toggleCompare: (id: string) => "added" | "removed" | "full";
  removeCompare: (id: string) => void;
  clearCompare: () => void;
  /** 从 URL hash(#compare=id1,id2)恢复对比会话,用于分享链接 */
  hydrateFromHash: () => boolean;
}

export const useBioStore = create<BioState>((set, get) => ({
  view: { type: "home" },
  historyStack: [],
  agentOpen: false,
  agentUnread: 0,
  compareIds: [],
  goHome: () =>
    set((s) => ({ view: { type: "home" }, historyStack: [...s.historyStack, s.view].slice(-30) })),
  explore: (taxonId = null) =>
    set((s) => ({ view: { type: "explore", taxonId }, historyStack: [...s.historyStack, s.view].slice(-30) })),
  openTaxon: (id) =>
    set((s) => ({ view: { type: "taxon", id }, historyStack: [...s.historyStack, s.view].slice(-30) })),
  openSearch: (q) =>
    set((s) => ({ view: { type: "search", q }, historyStack: [...s.historyStack, s.view].slice(-30) })),
  openCompare: () =>
    set((s) => ({
      view: { type: "compare", ids: [...s.compareIds] },
      historyStack: [...s.historyStack, s.view].slice(-30),
    })),
  openBrowse: (filter = {}) =>
    set((s) => ({
      view: { type: "browse", iucn: filter.iucn ?? null, kingdom: filter.kingdom ?? null, tag: filter.tag ?? null },
      historyStack: [...s.historyStack, s.view].slice(-30),
    })),
  goBack: () => {
    const s = get();
    const prev = s.historyStack[s.historyStack.length - 1];
    if (prev) {
      set({ view: prev, historyStack: s.historyStack.slice(0, -1) });
    } else {
      set({ view: { type: "home" }, historyStack: [] });
    }
  },
  setAgentOpen: (open) => set({ agentOpen: open }),
  bumpUnread: () => set((s) => ({ agentUnread: s.agentUnread + 1 })),
  clearUnread: () => set({ agentUnread: 0 }),
  toggleCompare: (id) => {
    const { compareIds } = get();
    if (compareIds.includes(id)) {
      set({ compareIds: compareIds.filter((x) => x !== id) });
      return "removed";
    }
    if (compareIds.length >= MAX_COMPARE) return "full";
    set({ compareIds: [...compareIds, id] });
    return "added";
  },
  removeCompare: (id) =>
    set((s) => ({
      compareIds: s.compareIds.filter((x) => x !== id),
      // 若当前正在对比视图,同步移除列,避免残留
      view: s.view.type === "compare" ? { type: "compare", ids: s.view.ids.filter((x) => x !== id) } : s.view,
    })),
  clearCompare: () =>
    set((s) => ({
      compareIds: [],
      view: s.view.type === "compare" ? { type: "compare", ids: [] } : s.view,
    })),
  hydrateFromHash: () => {
    if (typeof window === "undefined") return false;
    const h = window.location.hash;
    // 对比分享链接: #compare=id1,id2
    const mc = h.match(/^#compare=([a-zA-Z0-9]+(?:,[a-zA-Z0-9]+)+)/);
    if (mc) {
      const ids = mc[1].split(",").filter(Boolean).slice(0, MAX_COMPARE);
      if (ids.length >= 2) {
        set({ view: { type: "compare", ids }, compareIds: ids, historyStack: [] });
        // 规范化 hash(截断到上限后回写,避免地址栏与实际状态不一致)
        window.history.replaceState(null, "", window.location.pathname + window.location.search + `#compare=${ids.join(",")}`);
        return true;
      }
      return false;
    }
    // 目录筛选分享链接: #browse?kingdom=Fungi&iucn=CR
    if (/^#browse(\?.*)?$/.test(h)) {
      const qs = h.split("?")[1] || "";
      const sp = new URLSearchParams(qs);
      set({
        view: {
          type: "browse",
          kingdom: sp.get("kingdom") || null,
          iucn: sp.get("iucn") || null,
          tag: sp.get("tag") || null,
        },
        historyStack: [],
      });
      return true;
    }
    return false;
  },
}));
