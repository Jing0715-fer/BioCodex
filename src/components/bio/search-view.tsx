"use client";

import { useSearch } from "@/hooks/use-bio";
import { useBioStore, MAX_COMPARE } from "@/lib/bio-store";
import { rankLabel, IUCN_INFO, KINGDOM_THEME } from "@/lib/bio-domain";
import { TaxaPlaceholder, RankBadge, KingdomIcon } from "./taxa-icon";
import { Loader2, SearchX, ChevronRight, GitCompareArrows, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function SearchView({ q }: { q: string }) {
  const { data: results, isFetching } = useSearch(q, true);
  const { openTaxon, compareIds, toggleCompare } = useBioStore();

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-6 sm:px-6">
      <header className="flex flex-wrap items-baseline gap-3">
        <h1 className="font-display text-2xl font-bold sm:text-3xl">
          搜索:<span className="latin text-primary">{q}</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          {isFetching ? (
            <span className="flex items-center gap-1.5">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              检索中……
            </span>
          ) : (
            `共 ${results?.length ?? 0} 个匹配的分类单元`
          )}
        </p>
      </header>

      {results && results.length === 0 && !isFetching && (
        <div className="mt-10 flex flex-col items-center gap-3 rounded-xl border border-dashed border-foreground/15 py-16">
          <SearchX className="h-8 w-8 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">
            没有找到与「{q}」相关的条目。试试拉丁学名、中文俗名或门类名称?
          </p>
        </div>
      )}

      <div className="mt-6 space-y-2.5">
        {results?.map((r, i) => {
          const theme = KINGDOM_THEME[r.kingdom] || KINGDOM_THEME.Animalia;
          const isSpecies = r.rank === "species";
          const inCompare = isSpecies && compareIds.includes(r.id);
          const full = isSpecies && !inCompare && compareIds.length >= MAX_COMPARE;
          return (
            <div
              key={r.id}
              role="button"
              tabIndex={0}
              onClick={() => openTaxon(r.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openTaxon(r.id);
                }
              }}
              className="reveal-up group flex w-full items-center gap-4 rounded-xl border border-foreground/10 bg-card p-3 text-left shadow-sm transition-all hover:border-primary/40 hover:shadow focus-visible:outline-2 focus-visible:outline-forest"
              style={{ animationDelay: `${Math.min(i, 10) * 40}ms` }}
              aria-label={`查看${r.chineseName}(${r.latinName})`}
            >
              {/* 缩略图 */}
              {r.image ? (
                <img
                  src={r.image}
                  alt={r.chineseName}
                  className="h-16 w-20 shrink-0 rounded-lg object-cover"
                  loading="lazy"
                />
              ) : (
                <TaxaPlaceholder latinName={r.latinName} kingdom={r.kingdom} className="h-16 w-20 shrink-0 rounded-lg" />
              )}

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-display text-base font-bold text-foreground group-hover:text-primary">
                    {r.chineseName}
                  </span>
                  <RankBadge rank={r.rank} />
                  {r.conservation && (
                    <span
                      className={cn(
                        "rounded-sm px-1.5 py-0.5 text-[10px] font-bold text-white",
                        IUCN_INFO[r.conservation]?.bg
                      )}
                    >
                      {IUCN_INFO[r.conservation]?.label}
                    </span>
                  )}
                </div>
                <p className="latin truncate text-sm text-muted-foreground">{r.latinName}</p>
                {r.description && (
                  <p className="mt-0.5 line-clamp-1 text-xs leading-5 text-muted-foreground/80">
                    {r.description}
                  </p>
                )}
              </div>

              {isSpecies && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const res = toggleCompare(r.id);
                    if (res === "added")
                      toast.success(`已加入对比:${r.chineseName}`, {
                        description: `托盘 ${compareIds.length + 1}/${MAX_COMPARE}`,
                      });
                    else if (res === "removed") toast.info(`已移出对比:${r.chineseName}`);
                    else toast.warning("对比托盘已满(最多 3 个)", { description: "请先移除一个物种,或直接开始对比" });
                  }}
                  disabled={full}
                  aria-label={inCompare ? `移出对比:${r.chineseName}` : `加入对比:${r.chineseName}`}
                  className={cn(
                    "hidden h-8 shrink-0 items-center gap-1.5 rounded-full border px-2.5 text-xs font-semibold transition-all sm:flex",
                    inCompare
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-foreground/15 text-muted-foreground hover:border-primary/50 hover:text-primary",
                    full && "cursor-not-allowed opacity-40"
                  )}
                >
                  {inCompare ? <Check className="h-3.5 w-3.5" /> : <GitCompareArrows className="h-3.5 w-3.5" />}
                  {inCompare ? "已加入" : "对比"}
                </button>
              )}

              <span
                className="hidden shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium sm:flex"
                style={{ background: `${theme.color}15`, color: theme.color }}
              >
                <KingdomIcon kingdom={r.kingdom} className="h-3.5 w-3.5" />
                {theme.name}
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/30 group-hover:text-primary" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
