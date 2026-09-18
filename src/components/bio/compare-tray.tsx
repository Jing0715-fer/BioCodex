"use client";

import { useBioStore, MAX_COMPARE } from "@/lib/bio-store";
import { useTaxaBatch } from "@/hooks/use-bio";
import { KINGDOM_THEME, IUCN_INFO } from "@/lib/bio-domain";
import { TaxaPlaceholder } from "./taxa-icon";
import { SafeImg } from "./safe-img";
import { Button } from "@/components/ui/button";
import { X, GitCompareArrows, Trash2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

/** 底部浮动对比托盘:展示已选物种,一键进入对比视图 */
export function CompareTray() {
  const { view, compareIds, removeCompare, clearCompare, openCompare, openTaxon } = useBioStore();
  const { data } = useTaxaBatch(compareIds);
  const hidden = view.type === "compare" || compareIds.length === 0;

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          initial={{ y: 96, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 96, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:px-6 sm:pb-5"
          role="region"
          aria-label="物种对比托盘"
        >
          <div className="nh-scroll mx-auto flex max-w-[1000px] items-center gap-2 overflow-x-auto rounded-2xl border border-forest/25 bg-card/95 p-2.5 shadow-xl backdrop-blur-md sm:gap-3 sm:p-3">
            <div className="flex shrink-0 items-center gap-2 border-r border-foreground/10 pr-3 pl-1">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <GitCompareArrows className="h-4 w-4" />
              </span>
              <span className="hidden flex-col leading-tight sm:flex">
                <span className="text-xs font-bold text-foreground">物种对比</span>
                <span className="text-[10px] tabular-nums text-muted-foreground">
                  {compareIds.length}/{MAX_COMPARE}
                </span>
              </span>
            </div>

            {/* 已选物种 */}
            {compareIds.map((id) => {
              const t = data?.find((d) => d.taxon.id === id)?.taxon;
              const theme = KINGDOM_THEME[t?.kingdom || "Animalia"] || KINGDOM_THEME.Animalia;
              return (
                <div
                  key={id}
                  className="group/tray relative flex shrink-0 items-center gap-2 rounded-xl border border-foreground/10 bg-muted/40 py-1.5 pl-1.5 pr-7 transition-colors hover:border-primary/40"
                >
                  <button
                    onClick={() => t && openTaxon(id)}
                    className="flex items-center gap-2 text-left"
                    aria-label={`查看${t?.chineseName || "物种"}`}
                  >
                    <span className="h-9 w-9 shrink-0 overflow-hidden rounded-lg">
                      <SafeImg
                        src={t?.image}
                        alt={t?.chineseName || "物种"}
                        className="h-full w-full object-cover"
                        fallback={
                          <TaxaPlaceholder
                            latinName={t?.latinName || "?"}
                            kingdom={t?.kingdom || "Animalia"}
                            className="h-full w-full"
                          />
                        }
                      />
                    </span>
                    <span className="hidden min-w-0 flex-col leading-tight sm:flex">
                      <span className="truncate text-xs font-semibold text-foreground">
                        {t?.chineseName ?? "加载中…"}
                      </span>
                      <span className="latin truncate text-[10px] italic text-muted-foreground">
                        {t?.latinName ?? ""}
                      </span>
                    </span>
                    {t?.conservation && (
                      <span
                        className={cn(
                          "hidden shrink-0 rounded-sm px-1 py-0.5 text-[9px] font-bold text-white sm:inline",
                          IUCN_INFO[t.conservation]?.bg
                        )}
                      >
                        {t.conservation}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => removeCompare(id)}
                    aria-label={`移除${t?.chineseName || "物种"}`}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground/60 transition-colors hover:bg-red-500/10 hover:text-red-600"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              );
            })}

            {/* 空位提示 */}
            {compareIds.length < MAX_COMPARE && (
              <div className="hidden shrink-0 items-center gap-2 rounded-xl border border-dashed border-foreground/20 px-3 py-2.5 text-[11px] text-muted-foreground/60 sm:flex">
                在物种卡片上点击「对比」继续添加
              </div>
            )}

            <div className="ml-auto flex shrink-0 items-center gap-2 pl-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-9 gap-1 rounded-full px-2.5 text-xs text-muted-foreground"
                onClick={clearCompare}
                aria-label="清空对比托盘"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">清空</span>
              </Button>
              <Button
                size="sm"
                className="h-9 gap-1.5 rounded-full px-4"
                disabled={compareIds.length < 2}
                onClick={openCompare}
              >
                开始对比
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
