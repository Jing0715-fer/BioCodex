"use client";

import { useEffect } from "react";
import { useBioStore } from "@/lib/bio-store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BioHeader } from "@/components/bio/header";
import { HomeView } from "@/components/bio/home-view";
import { ExploreView } from "@/components/bio/explore-view";
import { TaxonDetail } from "@/components/bio/taxon-detail";
import { SearchView } from "@/components/bio/search-view";
import { BrowseView } from "@/components/bio/browse-view";
import { FavoritesView } from "@/components/bio/favorites-view";
import { RedlistView } from "@/components/bio/redlist-view";
import { CompareView } from "@/components/bio/compare-view";
import { CompareTray } from "@/components/bio/compare-tray";
import { AgentPanel } from "@/components/bio/agent-panel";
import { ShortcutsDialog } from "@/components/bio/shortcuts-dialog";
import { BioFooter } from "@/components/bio/footer";
import { browseFilterToParams } from "@/lib/clipboard";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function AppShell() {
  const { view } = useBioStore();

  // 视图切换回顶
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [view]);

  // 分享链接:进入时从 #compare=id1,id2 / #browse?kingdom=Fungi 恢复会话;视图变化时同步 hash
  useEffect(() => {
    useBioStore.getState().hydrateFromHash();
    // 用户在地址栏粘贴分享链接(同页 hash 变化,不触发重载)时也恢复会话;
    // 内部同步用 replaceState,不会触发 hashchange,故无循环风险
    const onHashChange = () => {
      if (/^#(compare|browse|favorites|redlist|taxon)/.test(window.location.hash)) {
        useBioStore.getState().hydrateFromHash();
      }
    };
    window.addEventListener("hashchange", onHashChange);
    const unsub = useBioStore.subscribe((s) => {
      let h = "";
      if (s.view.type === "taxon") {
        h = `#taxon=${s.view.id}`;
      } else if (s.view.type === "compare" && s.view.ids.length >= 2) {
        h = `#compare=${s.view.ids.join(",")}`;
      } else if (s.view.type === "browse") {
        const sp = browseFilterToParams({
          kingdom: s.browseFilter.kingdom,
          iucn: s.browseFilter.iucn,
          tag: s.browseFilter.tag,
          hasImage: s.browseFilter.hasImage,
          q: s.browseFilter.q,
          sort: s.browseFilter.sort,
        });
        h = `#browse${sp.toString() ? `?${sp.toString()}` : ""}`;
      } else if (s.view.type === "favorites") {
        h = "#favorites";
      } else if (s.view.type === "redlist") {
        const sp = new URLSearchParams();
        if (s.redlistKingdom) sp.set("kingdom", s.redlistKingdom);
        if (s.redlistFocus) sp.set("iucn", s.redlistFocus);
        h = `#redlist${sp.toString() ? `?${sp.toString()}` : ""}`;
      }
      if (window.location.hash !== h) {
        window.history.replaceState(null, "", window.location.pathname + window.location.search + h);
      }
    });
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      unsub();
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BioHeader />
      <div className="flex-1">
        {view.type === "home" && <HomeView />}
        {view.type === "explore" && <ExploreView taxonId={view.taxonId} />}
        {view.type === "taxon" && <TaxonDetail id={view.id} />}
        {view.type === "search" && <SearchView q={view.q} />}
        {view.type === "browse" && <BrowseView />}
        {view.type === "favorites" && <FavoritesView />}
        {view.type === "redlist" && <RedlistView />}
        {view.type === "compare" && <CompareView ids={view.ids} />}
      </div>
      <BioFooter />
      <AgentPanel />
      <CompareTray />
      <ShortcutsDialog />
    </div>
  );
}

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppShell />
    </QueryClientProvider>
  );
}
