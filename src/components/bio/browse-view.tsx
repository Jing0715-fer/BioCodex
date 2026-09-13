"use client";

import { useMemo, useState } from "react";
import { useBioStore } from "@/lib/bio-store";
import { useSpeciesBrowse, useStats, type SpeciesItem } from "@/hooks/use-bio";
import { KINGDOM_THEME, IUCN_INFO } from "@/lib/bio-domain";
import { SpeciesCard } from "./species-card";
import { ShareDialog } from "./share-dialog";
import { copyText, browseFilterToParams } from "@/lib/clipboard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  ChevronRight, LayoutGrid, Search, Loader2, Info, SlidersHorizontal,
  Star, Microscope, TriangleAlert, Image as ImageIcon, ArrowDown, Link2, Check,
  Rows3, GitCompareArrows, ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const KINGDOMS = ["Bacteria", "Archaea", "Protista", "Fungi", "Plantae", "Animalia"] as const;
const IUCN_CODES = ["CR", "EN", "EW", "VU", "NT", "LC", "NE"] as const;
const TAGS = [
  { key: "flagship", label: "旗舰物种", icon: Star },
  { key: "模式生物", label: "模式生物", icon: Microscope },
  { key: "入侵物种", label: "入侵物种", icon: TriangleAlert },
] as const;
const SORTS = [
  { key: "default", label: "默认" },
  { key: "iucn", label: "受威胁优先" },
  { key: "name", label: "按名称" },
  { key: "image", label: "有图优先" },
] as const;

export function BrowseView() {
  const { goHome, openCompare, compareIds, browseFilter, patchBrowseFilter, browseDensity, setBrowseDensity } =
    useBioStore();
  const { data: stats } = useStats();

  // 筛选状态全部由 store 承载:导航离开再返回不丢失(含关键词/排序/配图开关)
  const { kingdom, iucn, tag, hasImage, q, sort } = browseFilter;
  const setKingdom = (v: string | null) => patchBrowseFilter({ kingdom: v });
  const setIucn = (v: string | null) => patchBrowseFilter({ iucn: v });
  const setTag = (v: string | null) => patchBrowseFilter({ tag: v });
  const setHasImage = (v: boolean) => patchBrowseFilter({ hasImage: v });
  const setQ = (v: string) => patchBrowseFilter({ q: v });
  const setSort = (v: string) => patchBrowseFilter({ sort: v });

  const [shareFallback, setShareFallback] = useState<string | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);

  const shareFilterLink = async () => {
    const sp = browseFilterToParams({ kingdom, iucn, tag, hasImage, q, sort });
    const url = `${window.location.origin}${window.location.pathname}#browse${sp.toString() ? `?${sp.toString()}` : ""}`;
    const ok = await copyText(url);
    if (ok) {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
      toast.success("筛选链接已复制", { description: "对方打开后将看到同样的筛选结果" });
    } else {
      setShareFallback(url);
    }
  };

  const params = { kingdom, iucn, tag, hasImage, q, sort };
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useSpeciesBrowse(params);

  const items = useMemo(() => data?.pages.flatMap((p) => p.items) ?? [], [data]);
  const total = data?.pages[0]?.total ?? 0;
  const facets = data?.pages[0]?.facets;

  const activeFilters =
    (kingdom ? 1 : 0) + (iucn ? 1 : 0) + (tag ? 1 : 0) + (hasImage ? 1 : 0) + (q.trim() ? 1 : 0);
  const clearAll = () =>
    patchBrowseFilter({ kingdom: null, iucn: null, tag: null, hasImage: false, q: "", sort: "default" });

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 pb-16 pt-4 sm:px-6">
      {/* 面包屑 + 标题 */}
      <nav className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground" aria-label="路径">
        <button className="hover:text-primary" onClick={goHome}>
          首页
        </button>
        <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
        <span className="font-medium text-foreground">图鉴目录</span>
      </nav>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2.5 font-display text-2xl font-bold text-foreground sm:text-3xl">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <LayoutGrid className="h-5 w-5" />
            </span>
            图鉴目录
            <span className="latin text-base font-normal text-muted-foreground">Catalogue of Species</span>
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            按界、保护等级与标签过滤全部 {stats?.species ?? "…"} 个物种;点击卡片上的「对比」加入并排比较
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {/* 密度切换:卡片 / 紧凑列表 */}
          <div
            className="flex items-center rounded-full border border-foreground/15 bg-muted/30 p-0.5"
            role="group"
            aria-label="目录展示密度"
          >
            <Button
              variant={browseDensity === "grid" ? "secondary" : "ghost"}
              size="sm"
              className="h-7 gap-1 rounded-full px-2.5 text-xs"
              onClick={() => setBrowseDensity("grid")}
              aria-pressed={browseDensity === "grid"}
              title="卡片网格视图"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              卡片
            </Button>
            <Button
              variant={browseDensity === "list" ? "secondary" : "ghost"}
              size="sm"
              className="h-7 gap-1 rounded-full px-2.5 text-xs"
              onClick={() => setBrowseDensity("list")}
              aria-pressed={browseDensity === "list"}
              title="紧凑列表视图(同屏更多物种)"
            >
              <Rows3 className="h-3.5 w-3.5" />
              列表
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 rounded-full"
            onClick={shareFilterLink}
            title="复制当前筛选的分享链接"
          >
            {linkCopied ? <Check className="h-4 w-4 text-emerald-600" /> : <Link2 className="h-4 w-4" />}
            {linkCopied ? "已复制" : "分享筛选"}
          </Button>
          {compareIds.length >= 2 && (
            <Button size="sm" className="gap-1.5 rounded-full" onClick={openCompare}>
              对比中 {compareIds.length} 个 →
            </Button>
          )}
        </div>
      </div>

      {/* ====== 过滤器面板 ====== */}
      <div className="mt-5 rounded-xl border border-foreground/10 bg-card p-4 shadow-sm sm:p-5">
        {/* 搜索行 */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-52 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="在目录内筛选:中文名或拉丁学名……"
              className="h-9 rounded-full pl-9 text-sm"
              aria-label="目录内筛选"
            />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            {SORTS.map((s) => (
              <Button
                key={s.key}
                variant={sort === s.key ? "secondary" : "ghost"}
                size="sm"
                className="h-7 rounded-full px-2.5 text-xs"
                onClick={() => setSort(s.key)}
              >
                {s.label}
              </Button>
            ))}
          </div>
        </div>

        {/* 界过滤 */}
        <div className="mt-4">
          <p className="mb-1.5 text-[11px] font-bold tracking-widest text-muted-foreground">界 KINGDOM</p>
          <div className="flex flex-wrap gap-1.5">
            <Chip active={!kingdom} onClick={() => setKingdom(null)}>
              全部
            </Chip>
            {KINGDOMS.map((k) => {
              const t = KINGDOM_THEME[k];
              const count = facets?.kingdoms?.[k];
              return (
                <Chip
                  key={k}
                  active={kingdom === k}
                  color={t.color}
                  onClick={() => setKingdom(kingdom === k ? null : k)}
                >
                  {t.name}
                  {count != null && kingdom !== k && <span className="tabular-nums opacity-60">{count}</span>}
                </Chip>
              );
            })}
          </div>
        </div>

        {/* IUCN 过滤 */}
        <div className="mt-3.5">
          <p className="mb-1.5 text-[11px] font-bold tracking-widest text-muted-foreground">
            IUCN 红色名录等级
          </p>
          <div className="flex flex-wrap gap-1.5">
            <Chip active={!iucn} onClick={() => setIucn(null)}>
              全部
            </Chip>
            {IUCN_CODES.map((c) => {
              const info = IUCN_INFO[c];
              const count = facets?.iucn?.[c];
              return (
                <Chip
                  key={c}
                  active={iucn === c}
                  onClick={() => setIucn(iucn === c ? null : c)}
                  dotClass={info?.bg}
                >
                  {c} {info?.label}
                  {count != null && iucn !== c && <span className="tabular-nums opacity-60">{count}</span>}
                </Chip>
              );
            })}
          </div>
        </div>

        {/* 标签 + 配图过滤 */}
        <div className="mt-3.5 flex flex-wrap items-center gap-x-6 gap-y-3">
          <div>
            <p className="mb-1.5 text-[11px] font-bold tracking-widest text-muted-foreground">标签 TAGS</p>
            <div className="flex flex-wrap gap-1.5">
              {TAGS.map((t) => (
                <Chip key={t.key} active={tag === t.key} onClick={() => setTag(tag === t.key ? null : t.key)}>
                  <t.icon className="h-3 w-3" />
                  {t.label}
                </Chip>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-1.5 text-[11px] font-bold tracking-widest text-muted-foreground">其它</p>
            <div className="flex flex-wrap gap-1.5">
              <Chip active={hasImage} onClick={() => setHasImage(!hasImage)}>
                <ImageIcon className="h-3 w-3" />
                有配图
              </Chip>
            </div>
          </div>
          {activeFilters > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-4 h-7 gap-1 rounded-full text-xs text-muted-foreground hover:text-red-600"
              onClick={clearAll}
            >
              清除全部 {activeFilters} 项筛选
            </Button>
          )}
        </div>
      </div>

      {/* 结果统计条 */}
      <div className="mt-4 flex items-center justify-between text-sm">
        <p className="font-medium text-muted-foreground">
          {isLoading ? "正在翻阅标本柜……" : `共 ${total} 个物种`}
          {activeFilters > 0 && !isLoading && (
            <span className="text-muted-foreground/60">(已筛选{activeFilters} 项)</span>
          )}
        </p>
        <p className="hidden text-xs text-muted-foreground/60 sm:block">
          已展示 {items.length} / {total}
        </p>
      </div>

      {/* 物种网格 / 紧凑列表 */}
      {isLoading ? (
        browseDensity === "grid" ? (
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[5/4] rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="mt-3 space-y-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-16 rounded-xl" />
            ))}
          </div>
        )
      ) : items.length > 0 ? (
        <>
          {browseDensity === "grid" ? (
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {items.map((s, i) => (
                <SpeciesCard key={s.id} species={s} index={i % 12} />
              ))}
            </div>
          ) : (
            <div className="reveal-up mt-3 overflow-hidden rounded-xl border border-foreground/10 bg-card shadow-sm">
              {items.map((s, i) => (
                <SpeciesRow key={s.id} species={s} index={i} />
              ))}
            </div>
          )}
          {hasNextPage && (
            <div className="mt-6 flex justify-center">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 rounded-full"
                disabled={isFetchingNextPage}
                onClick={() => fetchNextPage()}
              >
                {isFetchingNextPage ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
                继续加载({items.length}/{total})
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="mt-8 flex flex-col items-center gap-2 rounded-xl border border-dashed border-foreground/15 py-12 text-center">
          <Info className="h-5 w-5 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">当前筛选条件下没有物种。</p>
          <Button variant="outline" size="sm" className="mt-1 rounded-full" onClick={clearAll}>
            重置筛选
          </Button>
        </div>
      )}

      {/* 剪贴板不可用时的分享链接兑底 */}
      <ShareDialog
        open={!!shareFallback}
        onOpenChange={(o) => !o && setShareFallback(null)}
        title="分享筛选链接"
        text={shareFallback || ""}
      />
    </div>
  );
}

/** 紧凑列表行:同屏容纳更多物种,信息密度优先 */
function SpeciesRow({ species, index = 0 }: { species: SpeciesItem; index?: number }) {
  const { openTaxon, compareIds, toggleCompare } = useBioStore();
  const theme = KINGDOM_THEME[species.kingdom] || KINGDOM_THEME.Animalia;
  const inCompare = compareIds.includes(species.id);
  const full = !inCompare && compareIds.length >= 3;
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
          <span className="latin truncate text-xs text-muted-foreground italic">{species.latinName}</span>
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

function Chip({
  active,
  color,
  dotClass,
  onClick,
  children,
}: {
  active?: boolean;
  color?: string;
  dotClass?: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all focus-visible:outline-2 focus-visible:outline-forest",
        active
          ? "border-primary bg-primary text-primary-foreground shadow-sm"
          : "border-foreground/15 bg-muted/30 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
      )}
      style={!active && color ? { borderColor: `${color}55`, color } : undefined}
    >
      {dotClass && (
        <span className={cn("h-2 w-2 rounded-full", dotClass)} aria-hidden />
      )}
      {children}
    </button>
  );
}
