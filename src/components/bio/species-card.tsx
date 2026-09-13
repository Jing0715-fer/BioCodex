"use client";

import { useBioStore, MAX_COMPARE } from "@/lib/bio-store";
import type { SpeciesItem } from "@/hooks/use-bio";
import { KINGDOM_THEME, IUCN_INFO } from "@/lib/bio-domain";
import { KingdomIcon, TaxaPlaceholder } from "./taxa-icon";
import { GitCompareArrows, Check, ArrowRight, Microscope, Star, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useFavorites, toggleFavorite, FAVORITES_MAX } from "@/lib/favorites";

/** 聚合浏览/对比场景的物种卡片:支持一键加入对比托盘与收藏标本夹 */
export function SpeciesCard({ species, index = 0 }: { species: SpeciesItem; index?: number }) {
  const { openTaxon, compareIds, toggleCompare } = useBioStore();
  const favorites = useFavorites();
  const theme = KINGDOM_THEME[species.kingdom] || KINGDOM_THEME.Animalia;
  const inCompare = compareIds.includes(species.id);
  const full = !inCompare && compareIds.length >= MAX_COMPARE;
  const fav = favorites.find((x) => x.id === species.id);
  const isFav = !!fav;
  const tags = species.tags || [];

  const onCardActivate = () => openTaxon(species.id);

  const onCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const res = toggleCompare(species.id);
    if (res === "added") toast.success(`已加入对比:${species.chineseName}`, { description: `托盘 ${compareIds.length + 1}/${MAX_COMPARE}` });
    else if (res === "removed") toast.info(`已移出对比:${species.chineseName}`);
    else toast.warning("对比托盘已满(最多 3 个)", { description: "请先移除一个物种,或直接开始对比" });
  };

  const onFavClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const res = toggleFavorite({
      id: species.id,
      chineseName: species.chineseName,
      latinName: species.latinName,
      kingdom: species.kingdom,
      image: species.image,
      conservation: species.conservation,
      ncbiTaxId: species.ncbiTaxId,
      description: species.description,
    });
    if (res === "added")
      toast.success(`已收进标本夹:${species.chineseName}`, { description: `头栏书签图标可查看全部收藏` });
    else if (res === "removed") toast.info(`已从标本夹取出:${species.chineseName}`);
    else toast.warning(`标本夹已满(上限 ${FAVORITES_MAX} 件)`, { description: "可先清理一些不再需要的标本" });
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onCardActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onCardActivate();
        }
      }}
      className="specimen-card reveal-up group relative flex flex-col overflow-hidden rounded-xl border border-foreground/10 bg-card text-left shadow-sm focus-visible:outline-2 focus-visible:outline-forest"
      style={{ animationDelay: `${Math.min(index, 12) * 45}ms` }}
      aria-label={`查看${species.chineseName}(${species.latinName})`}
    >
      {/* 图片/占位 */}
      <div className="relative aspect-[5/3] overflow-hidden">
        {species.image ? (
          <img
            src={species.image}
            alt={`${species.chineseName}(${species.latinName})复古博物学插图`}
            className="img-fade-in h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <TaxaPlaceholder latinName={species.latinName} kingdom={species.kingdom} className="h-full w-full" />
        )}
        {species.conservation && (
          <span
            className={cn(
              "absolute right-2 top-2 rounded-sm px-1.5 py-0.5 text-[10px] font-bold text-white shadow",
              IUCN_INFO[species.conservation]?.bg
            )}
          >
            {IUCN_INFO[species.conservation]?.label}
          </span>
        )}
        {/* 左上角操作:加入对比 + 收藏 */}
        <div className="absolute left-2 top-2 flex items-center gap-1.5">
          <button
            onClick={onCompareClick}
            disabled={full}
            aria-label={inCompare ? `移出对比:${species.chineseName}` : `加入对比:${species.chineseName}`}
            className={cn(
              "flex h-7 items-center gap-1 rounded-full px-2 text-[11px] font-semibold shadow backdrop-blur-sm transition-all",
              inCompare
                ? "bg-primary text-primary-foreground opacity-100"
                : "bg-black/45 text-white opacity-0 group-hover:opacity-100 focus-visible:opacity-100 hover:bg-black/65",
              full && "cursor-not-allowed opacity-40"
            )}
          >
            {inCompare ? <Check className="h-3.5 w-3.5" /> : <GitCompareArrows className="h-3.5 w-3.5" />}
            {inCompare ? "已加入" : "对比"}
          </button>
          <button
            onClick={onFavClick}
            aria-label={isFav ? `从标本夹移除:${species.chineseName}` : `收藏到标本夹:${species.chineseName}`}
            title={isFav ? "从标本夹移除" : "收藏到标本夹"}
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full shadow backdrop-blur-sm transition-all",
              isFav
                ? "bg-amber-500 text-white opacity-100"
                : "bg-black/45 text-white opacity-0 group-hover:opacity-100 focus-visible:opacity-100 hover:bg-black/65"
            )}
          >
            <Bookmark className={cn("h-3.5 w-3.5", isFav && "fill-current")} />
          </button>
        </div>
        {/* 阶元角标 */}
        <span className="absolute bottom-2 left-2 rounded-sm bg-black/45 px-1.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
          {theme.name}
        </span>
        {isFav && (
          <span className="absolute right-2 top-11 flex items-center gap-0.5 rounded-sm bg-amber-500/85 px-1.5 py-0.5 text-[9px] font-bold text-white shadow" aria-hidden>
            <Bookmark className="h-2.5 w-2.5 fill-current" />
            标本
          </span>
        )}
        {species.ncbiTaxId && (
          <span className="absolute bottom-2 right-2 rounded-sm border border-white/40 bg-white/15 px-1.5 py-0.5 text-[9px] font-semibold text-white backdrop-blur-sm">
            NCBI
          </span>
        )}
      </div>

      {/* 内容 */}
      <div className="flex flex-1 flex-col p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate font-display text-[15px] font-bold text-foreground">
              {species.chineseName}
            </p>
            <p className="latin mt-0.5 truncate text-xs text-muted-foreground italic">
              {species.latinName}
            </p>
          </div>
          <span
            className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-white"
            style={{ background: theme.color }}
            aria-hidden
          >
            <KingdomIcon kingdom={species.kingdom} className="h-3.5 w-3.5" />
          </span>
        </div>
        {species.description && (
          <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-muted-foreground/85">
            {species.description}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between gap-2 pt-2.5">
          <div className="flex min-w-0 items-center gap-1">
            {tags.includes("flagship") && (
              <span className="flex items-center gap-0.5 rounded-sm bg-amber-500/15 px-1.5 py-0.5 text-[9px] font-semibold text-amber-700 dark:text-amber-400">
                <Star className="h-2.5 w-2.5" />
                旗舰
              </span>
            )}
            {tags.includes("模式生物") && (
              <span className="flex items-center gap-0.5 rounded-sm bg-teal-500/15 px-1.5 py-0.5 text-[9px] font-semibold text-teal-700 dark:text-teal-400">
                <Microscope className="h-2.5 w-2.5" />
                模式
              </span>
            )}
          </div>
          <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/30 transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
        </div>
      </div>
    </div>
  );
}
