"use client";

import { create } from "zustand";

export type BioView =
  | { type: "home" }
  | { type: "explore"; taxonId: string | null }
  | { type: "taxon"; id: string; focus?: string }
  | { type: "search"; q: string };

interface BioState {
  view: BioView;
  historyStack: BioView[];
  agentOpen: boolean;
  agentUnread: number;
  goHome: () => void;
  explore: (taxonId?: string | null) => void;
  openTaxon: (id: string) => void;
  openSearch: (q: string) => void;
  goBack: () => void;
  setAgentOpen: (open: boolean) => void;
  bumpUnread: () => void;
  clearUnread: () => void;
}

export const useBioStore = create<BioState>((set, get) => ({
  view: { type: "home" },
  historyStack: [],
  agentOpen: false,
  agentUnread: 0,
  goHome: () =>
    set((s) => ({ view: { type: "home" }, historyStack: [...s.historyStack, s.view].slice(-30) })),
  explore: (taxonId = null) =>
    set((s) => ({ view: { type: "explore", taxonId }, historyStack: [...s.historyStack, s.view].slice(-30) })),
  openTaxon: (id) =>
    set((s) => ({ view: { type: "taxon", id }, historyStack: [...s.historyStack, s.view].slice(-30) })),
  openSearch: (q) =>
    set((s) => ({ view: { type: "search", q }, historyStack: [...s.historyStack, s.view].slice(-30) })),
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
}));
