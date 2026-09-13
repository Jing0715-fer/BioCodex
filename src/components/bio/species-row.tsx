"use client";

import { useBioStore } from "@/lib/bio-store";
import type { SpeciesItem } from "@/hooks/use-bio";
import { KINGDOM_THEME, IUCN_INFO, phylumZh } from "@/lib/bio-domain";
import { GitCompareArrows, Check, ArrowRight, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useFavorites, toggleFavorite, FAVORITES_MAX } from "@/lib/favorites";

/**
 * 紧凑列表行:目录/收藏夹的"列表密度"渲染模式。
 * 与 SpeciesCard 功能对齐:一键对比 + 收藏标本夹。
 */
export function SpeciesRow({ species, index = 0 }: { species: SpeciesItem; index?: number }) {
  const { openTaxon, compareIds, toggleCompare } = useBioStore();
  const favorites = useFavorites();
  const theme = KINGDOM_THEME[species.kingdom] || KINGDOM_THEME.Animalia;
  const inCompare = compareIds.includes(species.id);
  const full = !inCompare && compareIds.length >= 3;
  const isFav = favorites.some((x) => x.id === species.id);
  const tags = species.tags || [];

  const onCardActivate = () => openTaxon(species.id);

  const onCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const res = toggleCompare(species.id);
    if (res === "added")
      toast.success(`已加入对比:${species.chineseName}`, { description: `托盘 ${compareIds.length + 1}/3` });
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
    if (res === "added") toast.success(`已收进标本夹:${species.chineseName}`, { description: "头栏书签图标可查看全部收藏" });
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
      className={cn(
        "group flex cursor-pointer items-center gap-3 border-foreground/8 px-3 py-2.5 text-left transition-colors hover:bg-primary/5 focus-visible:bg-primary/5 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-forest",
        index % 2 === 1 && "bg-muted/25"
      )}
      style={{ animationDelay: `${Math.min(index, 20) * 25}ms` }}
      aria-label={`查看${species.chineseName}(${species.latinName})`}
    >
      {/* 缩略图 */}
      {species.image ? (
        <img
          src={species.image}
          alt={`${species.chineseName}复古博物学插图`}
          className="h-11 w-11 shrink-0 rounded-lg border border-foreground/10 object-cover"
          loading="lazy"
        />
      ) : (
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-foreground/10 font-display text-sm font-bold text-white"
          style={{ background: `linear-gradient(135deg, ${theme.color}, ${theme.color}aa)` }}
          aria-hidden
        >
          {species.latinName.charAt(0)}
        </span>
      )}

      {/* 名称与描述 */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="font-display text-sm font-bold text-foreground group-hover:text-primary">
            {species.chineseName}
          </span>
          <span className="latin truncate text-xs text-muted-foreground italic">
            {species.latinName}
            {phylumZh(species.phylum) && (
              <span className="not-italic text-muted-foreground/55"> · {phylumZh(species.phylum)}</span>
            )}
          </span>
          {isFav && (
            <span className="flex items-center gap-0.5 rounded-sm bg-amber-500/15 px-1 py-px text-[9px] font-semibold text-amber-700 dark:text-amber-400">
              <Bookmark className="h-2 w-2 fill-current" />
              标本
            </span>
          )}
          {tags.includes("flagship") && (
            <span className="rounded-sm bg-amber-500/15 px-1 py-px text-[9px] font-semibold text-amber-700 dark:text-amber-400">
              旗舰
            </span>
          )}
          {tags.includes("模式生物") && (
            <span className="rounded-sm bg-teal-500/15 px-1 py-px text-[9px] font-semibold text-teal-700 dark:text-teal-400">
              模式
            </span>
          )}
        </div>
        {species.description && (
          <p className="mt-0.5 hidden truncate text-xs text-muted-foreground/75 sm:block">
            {species.description}
          </p>
        )}
      </div>

      {/* 界徽章 */}
      <span
        className="hidden shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold md:flex"
        style={{ background: `${theme.color}15`, color: theme.color }}
      >
        {theme.name}
      </span>

      {/* IUCN */}
      {species.conservation && IUCN_INFO[species.conservation] && (
        <span
          className={cn(
            "shrink-0 rounded-sm px-1.5 py-0.5 text-[10px] font-bold text-white",
            IUCN_INFO[species.conservation]?.bg
          )}
        >
          {species.conservation}
        </span>
      )}

      {/* 收藏按钮 */}
      <button
        onClick={onFavClick}
        aria-label={isFav ? `从标本夹移除:${species.chineseName}` : `收藏到标本夹:${species.chineseName}`}
        title={isFav ? "从标本夹移除" : "收藏到标本夹"}
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all",
          isFav
            ? "border-amber-500/60 bg-amber-500/15 text-amber-600"
            : "border-foreground/15 text-muted-foreground opacity-0 hover:border-amber-500/50 hover:text-amber-600 focus-visible:opacity-100 group-hover:opacity-100"
        )}
      >
        <Bookmark className={cn("h-3 w-3", isFav && "fill-current")} />
      </button>

      {/* 对比按钮 */}
      <button
        onClick={onCompareClick}
        disabled={full}
        aria-label={inCompare ? `移出对比:${species.chineseName}` : `加入对比:${species.chineseName}`}
        className={cn(
          "flex h-7 shrink-0 items-center gap-1 rounded-full border px-2 text-[11px] font-semibold transition-all",
          inCompare
            ? "border-primary bg-primary text-primary-foreground"
            : "border-foreground/15 text-muted-foreground opacity-0 hover:border-primary/50 hover:text-primary focus-visible:opacity-100 group-hover:opacity-100",
          full && "cursor-not-allowed opacity-40"
        )}
      >
        {inCompare ? <Check className="h-3 w-3" /> : <GitCompareArrows className="h-3 w-3" />}
      </button>

      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/30 transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
    </div>
  );
}
