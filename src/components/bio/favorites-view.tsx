"use client";

import { useFavorites, clearFavorites, FAVORITES_MAX, type FavoriteEntry } from "@/lib/favorites";
import { useBioStore, MAX_COMPARE } from "@/lib/bio-store";
import type { SpeciesItem } from "@/hooks/use-bio";
import { KINGDOM_THEME } from "@/lib/bio-domain";
import { KingdomIcon } from "./taxa-icon";
import { KingdomOrnament } from "./kingdom-ornament";
import { SpeciesCard } from "./species-card";
import { SpeciesRow } from "./species-row";
import { Bookmark, BookmarkCheck, GitCompareArrows, Trash2, ArrowRight, Sparkles, LayoutGrid, Rows3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

/** 收藏条目 → 物种卡数据(离线渲染,无需请求) */
function toSpeciesItem(f: FavoriteEntry): SpeciesItem {
  return {
    id: f.id,
    rank: "species",
    latinName: f.latinName,
    chineseName: f.chineseName,
    description: f.description,
    image: f.image,
    conservation: f.conservation,
    ncbiTaxId: f.ncbiTaxId,
    tags: null,
    kingdom: f.kingdom,
  };
}

export function FavoritesView() {
  const favorites = useFavorites();
  const { openBrowse, openCompare, compareIds, toggleCompare, browseDensity, setBrowseDensity } = useBioStore();

  // 收藏中已在对比托盘里的数量
  const inTray = favorites.filter((f) => compareIds.includes(f.id)).length;

  const onCompareAll = () => {
    if (favorites.length < 2) return;
    // 依次切换托盘(逐个处理,保持顺序;超限即停)
    let added = 0;
    for (const f of favorites) {
      if (compareIds.length + added >= MAX_COMPARE) break;
      if (!compareIds.includes(f.id)) {
        const res = toggleCompare(f.id);
        if (res === "added") added++;
      }
    }
    const total = compareIds.length + added;
    if (added > 0) {
      toast.success(`已把 ${added} 个收藏加入对比托盘`, { description: `托盘 ${total}/${MAX_COMPARE}` });
    }
    if (total >= 2) openCompare();
    else toast.info("托盘至少需要 2 个物种才能开始对比");
  };

  const onClear = () => {
    if (favorites.length === 0) return;
    const n = favorites.length;
    clearFavorites();
    toast.info(`已清空标本收藏夹(移除 ${n} 件标本)`);
  };

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 pb-10 pt-6 sm:px-6">
      {/* 标题区 */}
      <div className="reveal-up flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-[11px] font-bold tracking-[0.25em] text-primary/80">
            <Bookmark className="h-3.5 w-3.5" />
            SPECIMEN CABINET
          </p>
          <h1 className="mt-1.5 font-display text-3xl font-bold text-foreground sm:text-4xl">
            标本收藏夹
          </h1>
          {/* 界纹样装饰带 */}
          <div className="pointer-events-none mt-2 flex items-center gap-2 opacity-25">
            {favorites.length > 0
              ? [...new Set(favorites.map((f) => f.kingdom))].slice(0, 3).map((k) => (
                  <KingdomOrnament key={k} kingdom={k} className="h-5 w-20" style={{ color: (KINGDOM_THEME[k] || KINGDOM_THEME.Animalia).color }} />
                ))
              : ["Bacteria", "Fungi", "Animalia"].map((k) => (
                  <KingdomOrnament key={k} kingdom={k} className="h-5 w-20" style={{ color: (KINGDOM_THEME[k] || KINGDOM_THEME.Animalia).color }} />
                ))}
          </div>
          <p className="mt-1.5 max-w-xl text-sm leading-6 text-muted-foreground">
            像博物学家一样把心动的物种钉进标本抽屉——收藏保存在本机浏览器中,
            跨页面、跨会话可用,随时取出对比或重温。
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full border border-amber-600/30 bg-amber-500/10 px-3 py-1.5 text-xs font-bold text-amber-700 dark:text-amber-400">
            <BookmarkCheck className="h-3.5 w-3.5" />
            {favorites.length} / {FAVORITES_MAX} 件标本
          </span>
          {/* 密度切换(与图鉴目录共用偏好) */}
          <div className="flex items-center rounded-full border border-foreground/15 bg-card p-0.5" role="group" aria-label="切换展示密度">
            <button
              onClick={() => setBrowseDensity("grid")}
              aria-pressed={browseDensity === "grid"}
              aria-label="卡片网格视图"
              title="卡片网格视图"
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-full transition-all",
                browseDensity === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setBrowseDensity("list")}
              aria-pressed={browseDensity === "list"}
              aria-label="紧凑列表视图"
              title="紧凑列表视图"
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-full transition-all",
                browseDensity === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Rows3 className="h-3.5 w-3.5" />
            </button>
          </div>
          {favorites.length >= 2 && (
            <Button
              size="sm"
              className="h-9 gap-1.5 rounded-full"
              onClick={onCompareAll}
              title={`把前 ${Math.min(favorites.length, MAX_COMPARE)} 件收藏放进对比托盘`}
            >
              <GitCompareArrows className="h-4 w-4" />
              全部加入对比{inTray > 0 && `(已含 ${inTray})`}
            </Button>
          )}
          {favorites.length > 0 && (
            <Button
              size="sm"
              variant="outline"
              className="h-9 gap-1.5 rounded-full border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={onClear}
            >
              <Trash2 className="h-3.5 w-3.5" />
              清空
            </Button>
          )}
        </div>
      </div>

      {/* 界色分隔纹章线 */}
      <div className="relative mt-6 h-px w-full overflow-hidden bg-foreground/10">
        {["Bacteria", "Archaea", "Protista", "Fungi", "Plantae", "Animalia"].map((k) => (
          <span
            key={k}
            className="absolute top-0 h-px"
            style={{
              left: `${["Bacteria", "Archaea", "Protista", "Fungi", "Plantae", "Animalia"].indexOf(k) * (100 / 6)}%`,
              width: `${100 / 6}%`,
              background: (KINGDOM_THEME[k] || KINGDOM_THEME.Animalia).color,
              opacity: 0.5,
            }}
          />
        ))}
      </div>

      {/* 主体 */}
      <AnimatePresence mode="wait">
        {favorites.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-foreground/20 bg-card/50 px-6 py-16 text-center"
          >
            {/* 空抽屉插画:六个界主题色卡槽 */}
            <div className="flex -space-x-1.5">
              {["Bacteria", "Archaea", "Protista", "Fungi", "Plantae", "Animalia"].map((k, i) => {
                const t = KINGDOM_THEME[k] || KINGDOM_THEME.Animalia;
                return (
                  <span
                    key={k}
                    className="flex h-12 w-9 items-center justify-center rounded-md border-2 border-card shadow-sm"
                    style={{ background: `${t.color}26`, transform: `rotate(${(i - 2.5) * 4}deg)` }}
                    aria-hidden
                  >
                    <KingdomIcon kingdom={k} className="h-4 w-4" style={{ color: t.color }} />
                  </span>
                );
              })}
            </div>
            <div>
              <p className="font-display text-lg font-bold text-foreground">标本抽屉还空着</p>
              <p className="mx-auto mt-1.5 max-w-md text-sm leading-6 text-muted-foreground">
                在物种卡片悬停时点 <Bookmark className="inline h-3.5 w-3.5 -translate-y-px text-primary" /> 星标,
                或在详情页点「收藏标本」,你翻过的每个心动物种都会收进这格抽屉。
              </p>
            </div>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
              <Button variant="outline" size="sm" className="h-9 gap-1.5 rounded-full" onClick={() => openBrowse({})}>
                去图鉴目录逛逛
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={browseDensity === "grid" ? "grid" : "list"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6"
          >
            {browseDensity === "grid" ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {favorites.map((f, i) => (
                  <div key={f.id} className="flex flex-col gap-1">
                    <SpeciesCard species={toSpeciesItem(f)} index={i} />
                    <p className="px-1 text-right text-[10px] tabular-nums text-muted-foreground/60">
                      收藏于 {formatFavoriteDate(f.ts)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl border border-foreground/10 bg-card shadow-sm">
                {favorites.map((f, i) => (
                  <SpeciesRow key={f.id} species={toSpeciesItem(f)} index={i} />
                ))}
                <p className="border-t border-foreground/8 px-3 py-2 text-right text-[10px] tabular-nums text-muted-foreground/60">
                  最新收藏于 {formatFavoriteDate(favorites[0].ts)}
                </p>
              </div>
            )}
            <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-muted-foreground/70">
              <Sparkles className="h-3 w-3" />
              收藏按时间倒序排列 · 上限 {FAVORITES_MAX} 件 · 存储于本机浏览器
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function formatFavoriteDate(ts: number): string {
  const d = new Date(ts);
  const now = new Date();
  const hm = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  const sameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  if (sameDay(d, now)) return `今天 ${hm}`;
  return `${d.getMonth() + 1}月${d.getDate()}日`;
}
