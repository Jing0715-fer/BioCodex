"use client";

import { useEffect, useRef, useState } from "react";
import { useSearch, type SearchRow } from "@/hooks/use-bio";
import { KINGDOM_THEME, IUCN_INFO } from "@/lib/bio-domain";
import { KingdomIcon, TaxaPlaceholder } from "./taxa-icon";
import { MAX_COMPARE } from "@/lib/bio-store";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, GitCompareArrows, Check, SearchX } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

/**
 * 物种快速选择器:在对比视图内直接搜索并加入托盘,无需离开当前页面。
 * - 防抖搜索 /api/search,仅展示物种阶元
 * - 已在托盘中的条目显示勾选态(可点击移除)
 * - 加满 MAX_COMPARE 后自动关闭
 */
export function SpeciesPickerDialog({
  open,
  onOpenChange,
  trayIds,
  onToggle,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  trayIds: string[];
  onToggle: (id: string, name: string) => "added" | "removed" | "full";
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* DialogContent 在关闭时卸载,内部状态(搜索词等)每次打开自动重置 */}
      <DialogContent className="max-h-[82vh] overflow-hidden rounded-xl p-0 sm:max-w-lg">
        <DialogHeader className="border-b border-foreground/10 px-5 pb-3 pt-5">
          <DialogTitle className="flex items-center gap-2 font-display text-lg font-bold">
            <GitCompareArrows className="h-4.5 w-4.5 text-primary" />
            挑选物种加入对比
          </DialogTitle>
          <DialogDescription className="text-xs leading-4">
            托盘 {trayIds.length}/{MAX_COMPARE} · 搜索中文名或拉丁学名,点击结果即可加入,无需离开对比视图
          </DialogDescription>
        </DialogHeader>
        <PickerBody trayIds={trayIds} onToggle={onToggle} onOpenChange={onOpenChange} />
      </DialogContent>
    </Dialog>
  );
}

/** 关闭即卸载的搜索主体:状态每次打开都从零开始 */
function PickerBody({
  trayIds,
  onToggle,
  onOpenChange,
}: {
  trayIds: string[];
  onToggle: (id: string, name: string) => "added" | "removed" | "full";
  onOpenChange: (v: boolean) => void;
}) {
  const [q, setQ] = useState("");
  const [debounced, setDebounced] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: results, isLoading } = useSearch(debounced, debounced.trim().length > 0);

  // 防抖
  useEffect(() => {
    const t = window.setTimeout(() => setDebounced(q), 260);
    return () => window.clearTimeout(t);
  }, [q]);

  // 挂载后聚焦输入框(纯 DOM 操作)
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const species = (results ?? []).filter((r) => r.rank === "species").slice(0, 10);

  const onPick = (r: SearchRow) => {
    const res = onToggle(r.id, r.chineseName);
    if (res === "added") {
      const total = trayIds.length + 1;
      toast.success(`已加入对比:${r.chineseName}`, { description: `托盘 ${total}/${MAX_COMPARE}` });
      if (total >= MAX_COMPARE) onOpenChange(false);
    } else if (res === "removed") {
      toast.info(`已移出对比:${r.chineseName}`);
    } else {
      toast.warning("对比托盘已满(最多 3 个)", { description: "请先移除一个物种" });
    }
  };

  return (
    <>
      {/* 搜索框 */}
      <div className="px-5 pt-3.5">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="如:虎 / Panthera tigris / 银杏……"
            aria-label="搜索物种加入对比"
            className="h-11 w-full rounded-lg border border-foreground/15 bg-muted/30 pl-9 pr-8 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary/50 focus:bg-card"
          />
          {q && (
            <button
              onClick={() => setQ("")}
              aria-label="清空搜索词"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground/60 transition-colors hover:bg-muted hover:text-foreground"
            >
              <SearchX className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 结果列表 */}
      <div className="nh-scroll max-h-[46vh] overflow-y-auto px-3 pb-4 pt-3">
        {debounced.trim().length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-center">
            <Search className="h-7 w-7 text-muted-foreground/30" />
            <p className="text-xs text-muted-foreground">输入关键词,即刻把心动物种拉进对比</p>
            <p className="text-[11px] text-muted-foreground/50">支持中文名、拉丁学名,或「虎」「蘑菇」这类俗称关键词</p>
          </div>
        ) : isLoading ? (
          <div className="space-y-2 px-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full rounded-lg" />
            ))}
          </div>
        ) : species.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-center">
            <SearchX className="h-7 w-7 text-muted-foreground/30" />
            <p className="text-xs text-muted-foreground">没有匹配的物种</p>
            <p className="text-[11px] text-muted-foreground/50">换个说法试试,或去图鉴目录按界浏览</p>
          </div>
        ) : (
          <ul className="space-y-1">
            {species.map((r) => {
              const theme = KINGDOM_THEME[r.kingdom] || KINGDOM_THEME.Animalia;
              const inTray = trayIds.includes(r.id);
              return (
                <li key={r.id}>
                  <button
                    onClick={() => onPick(r)}
                    aria-pressed={inTray}
                    className={cn(
                      "group flex w-full items-center gap-3 rounded-lg border px-2.5 py-2 text-left transition-all",
                      inTray
                        ? "border-primary/40 bg-primary/[0.07]"
                        : "border-transparent hover:border-foreground/15 hover:bg-muted/40"
                    )}
                  >
                    <span className="relative h-11 w-14 shrink-0 overflow-hidden rounded-md border border-foreground/10">
                      {r.image ? (
                        <img src={r.image} alt={r.chineseName} className="h-full w-full object-cover" loading="lazy" />
                      ) : (
                        <TaxaPlaceholder latinName={r.latinName} kingdom={r.kingdom} className="h-full w-full text-[8px]" />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-1.5">
                        <span className="truncate text-[13px] font-semibold text-foreground">{r.chineseName}</span>
                        <span
                          className="flex h-4 w-4 shrink-0 items-center justify-center rounded-sm text-white"
                          style={{ background: theme.color }}
                          aria-hidden
                        >
                          <KingdomIcon kingdom={r.kingdom} className="h-2.5 w-2.5" />
                        </span>
                        {r.conservation && (
                          <span
                            className={cn(
                              "shrink-0 rounded-sm px-1 py-px text-[9px] font-bold text-white",
                              IUCN_INFO[r.conservation]?.bg
                            )}
                          >
                            {r.conservation}
                          </span>
                        )}
                      </span>
                      <span className="latin block truncate text-[11px] italic text-muted-foreground">{r.latinName}</span>
                      {r.description && (
                        <span className="block truncate text-[10px] leading-4 text-muted-foreground/60">{r.description}</span>
                      )}
                    </span>
                    <span
                      className={cn(
                        "flex h-6 shrink-0 items-center gap-1 rounded-full px-2 text-[10px] font-bold transition-all",
                        inTray
                          ? "bg-primary text-primary-foreground"
                          : "border border-foreground/15 text-muted-foreground group-hover:border-primary/40 group-hover:text-primary"
                      )}
                    >
                      {inTray ? <Check className="h-3 w-3" /> : null}
                      {inTray ? "已在托盘" : "加入"}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
