"use client";

import { create } from "zustand";

export type BioView =
  | { type: "home" }
  | { type: "explore"; taxonId: string | null }
  | { type: "taxon"; id: string; focus?: string }
  | { type: "search"; q: string }
  | { type: "compare"; ids: string[] }
  | { type: "browse" }
  | { type: "favorites" }
  | { type: "redlist" };

export interface BrowseFilter {
  iucn?: string | null;
  kingdom?: string | null;
  tag?: string | null;
  q?: string;
  sort?: string;
  hasImage?: boolean;
}

/** 目录视图的完整筛选状态(跨导航持久化) */
export interface BrowseState {
  kingdom: string | null;
  phylum: string | null;
  iucn: string | null;
  tag: string | null;
  hasImage: boolean;
  q: string;
  sort: string;
}

const DEFAULT_BROWSE: BrowseState = {
  kingdom: null,
  phylum: null,
  iucn: null,
  tag: null,
  hasImage: false,
  q: "",
  sort: "default",
};

const VALID_SORTS = ["default", "iucn", "name", "image"];

export const MAX_COMPARE = 3;

interface BioState {
  view: BioView;
  historyStack: BioView[];
  agentOpen: boolean;
  agentUnread: number;
  /** 对比托盘中的物种 id(最多 3) */
  compareIds: string[];
  /** 图鉴目录筛选(跨导航保留,含关键词/排序/配图开关) */
  browseFilter: BrowseState;
  /** 目录展示密度:卡片网格 / 紧凑列表 */
  browseDensity: "grid" | "list";
  /** 快捷键帮助面板 */
  shortcutsOpen: boolean;
  /** 红色名录:聚焦等级(滚动高亮锚点,如详情页跳入) */
  redlistFocus: string | null;
  /** 红色名录:按界过滤 */
  redlistKingdom: string | null;
  goHome: () => void;
  explore: (taxonId?: string | null) => void;
  openTaxon: (id: string) => void;
  openSearch: (q: string) => void;
  openCompare: () => void;
  openBrowse: (filter?: BrowseFilter) => void;
  openFavorites: () => void;
  openRedlist: (opts?: { iucn?: string | null; kingdom?: string | null }) => void;
  /** 红色名录内修改筛选(不压历史栈) */
  patchRedlist: (patch: { iucn?: string | null; kingdom?: string | null }) => void;
  /** 目录内筛选变更(不压入历史栈) */
  patchBrowseFilter: (patch: Partial<BrowseState>) => void;
  setBrowseDensity: (d: "grid" | "list") => void;
  setShortcutsOpen: (open: boolean) => void;
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
  browseFilter: { ...DEFAULT_BROWSE },
  browseDensity: "grid",
  shortcutsOpen: false,
  redlistFocus: null,
  redlistKingdom: null,
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
      view: { type: "browse" },
      // 传入具体筛选则整组应用(其余重置);空参数仅进入目录,保留上次筛选
      browseFilter: Object.keys(filter).length > 0 ? { ...DEFAULT_BROWSE, ...filter } : s.browseFilter,
      historyStack: [...s.historyStack, s.view].slice(-30),
    })),
  openFavorites: () =>
    set((s) => ({
      view: { type: "favorites" },
      historyStack: [...s.historyStack, s.view].slice(-30),
    })),
  openRedlist: (opts = {}) =>
    set((s) => ({
      view: { type: "redlist" },
      // 传 opts 则应用(未出现的键重置);不传则保留上次筛选
      redlistFocus: "iucn" in opts ? opts.iucn ?? null : s.redlistFocus,
      redlistKingdom: "kingdom" in opts ? opts.kingdom ?? null : s.redlistKingdom,
      historyStack: [...s.historyStack, s.view].slice(-30),
    })),
  patchRedlist: (patch) =>
    set((s) => ({
      redlistFocus: patch.iucn !== undefined ? patch.iucn : s.redlistFocus,
      redlistKingdom: patch.kingdom !== undefined ? patch.kingdom : s.redlistKingdom,
    })),
  patchBrowseFilter: (patch) =>
    set((s) => ({
      browseFilter: { ...s.browseFilter, ...patch },
      // 若当前即目录视图,保持 view 引用不变(仅筛选变化不重新挂载组件)
    })),
  setBrowseDensity: (d) => set({ browseDensity: d }),
  setShortcutsOpen: (open) => set({ shortcutsOpen: open }),
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
    const { compareIds, view } = get();
    if (compareIds.includes(id)) {
      const next = compareIds.filter((x) => x !== id);
      set({
        compareIds: next,
        // 若当前正在对比视图,同步移除列,避免残留
        view: view.type === "compare" ? { type: "compare", ids: view.ids.filter((x) => x !== id) } : view,
      });
      return "removed";
    }
    if (compareIds.length >= MAX_COMPARE) return "full";
    const next = [...compareIds, id];
    set({
      compareIds: next,
      // 若当前正在对比视图(如选择器直接添加),同步刷新对比列
      view: view.type === "compare" ? { type: "compare", ids: next } : view,
    });
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
    // 物种详情直链: #taxon=<id>(刷新/分享链接均可恢复详情视图)
    const mt = h.match(/^#taxon=([a-zA-Z0-9]+)/);
    if (mt) {
      set({ view: { type: "taxon", id: mt[1] }, historyStack: [] });
      return true;
    }
    // 标本收藏夹: #favorites
    if (h === "#favorites" || h.startsWith("#favorites?")) {
      set({ view: { type: "favorites" }, historyStack: [] });
      window.history.replaceState(null, "", window.location.pathname + window.location.search + "#favorites");
      return true;
    }
    // 红色名录专题: #redlist 或 #redlist?iucn=CR&kingdom=Animalia
    if (/^#redlist(\?.*)?$/.test(h)) {
      const qs = h.split("?")[1] || "";
      const sp = new URLSearchParams(qs);
      set({
        view: { type: "redlist" },
        redlistFocus: sp.get("iucn") || null,
        redlistKingdom: sp.get("kingdom") || null,
        historyStack: [],
      });
      const out = new URLSearchParams();
      if (sp.get("iucn")) out.set("iucn", sp.get("iucn")!);
      if (sp.get("kingdom")) out.set("kingdom", sp.get("kingdom")!);
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search + (out.toString() ? `#redlist?${out}` : "#redlist")
      );
      return true;
    }
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
    // 目录筛选分享链接: #browse?kingdom=Fungi&iucn=CR&q=..&sort=..&hasImage=1
    if (/^#browse(\?.*)?$/.test(h)) {
      const qs = h.split("?")[1] || "";
      const sp = new URLSearchParams(qs);
      const hs = sp.get("sort");
      set({
        view: { type: "browse" },
        browseFilter: {
          kingdom: sp.get("kingdom") || null,
          phylum: sp.get("phylum") || null,
          iucn: sp.get("iucn") || null,
          tag: sp.get("tag") || null,
          q: sp.get("q") || "",
          sort: hs && VALID_SORTS.includes(hs) ? hs : "default",
          hasImage: sp.get("hasImage") === "1",
        },
        historyStack: [],
      });
      return true;
    }
    return false;
  },
}));
