"use client";

import { useEffect } from "react";
import { useBioStore } from "@/lib/bio-store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BioHeader } from "@/components/bio/header";
import { HomeView } from "@/components/bio/home-view";
import { ExploreView } from "@/components/bio/explore-view";
import { TaxonDetail } from "@/components/bio/taxon-detail";
import { SearchView } from "@/components/bio/search-view";
import { AgentPanel } from "@/components/bio/agent-panel";
import { BioFooter } from "@/components/bio/footer";

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

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BioHeader />
      <div className="flex-1">
        {view.type === "home" && <HomeView />}
        {view.type === "explore" && <ExploreView taxonId={view.taxonId} />}
        {view.type === "taxon" && <TaxonDetail id={view.id} />}
        {view.type === "search" && <SearchView q={view.q} />}
      </div>
      <BioFooter />
      <AgentPanel />
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
