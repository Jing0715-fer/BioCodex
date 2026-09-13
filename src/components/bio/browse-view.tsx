"use client";

import { useEffect, useMemo, useState } from "react";
import { useBioStore } from "@/lib/bio-store";
import { useSpeciesBrowse, useStats } from "@/hooks/use-bio";
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

export function BrowseView({
  initialIucn,
  initialKingdom,
  initialTag,
}: {
  initialIucn?: string | null;
  initialKingdom?: string | null;
  initialTag?: string | null;
}) {
  const { goHome, openCompare, compareIds } = useBioStore();
  const { data: stats } = useStats();

  // 从 #browse?... 恢复完整筛选(仅在客户端首挂载时读取;hash 不会发送到服务端,无 hydration 风险)
  const readHashParams = () => {
    if (typeof window === "undefined" || !/^#browse(\?|$)/.test(window.location.hash)) {
      return { q: "", sort: "default", hasImage: false };
    }
    const sp = new URLSearchParams(window.location.hash.split("?")[1] || "");
    const hs = sp.get("sort");
    return {
      q: sp.get("q") || "",
      sort: hs && SORTS.some((s) => s.key === hs) ? hs : "default",
      hasImage: sp.get("hasImage") === "1",
    };
  };
  const hashInit = readHashParams();

  const [kingdom, setKingdom] = useState<string | null>(initialKingdom ?? null);
  const [iucn, setIucn] = useState<string | null>(initialIucn ?? null);
  const [tag, setTag] = useState<string | null>(initialTag ?? null);
  const [hasImage, setHasImage] = useState<boolean>(hashInit.hasImage);
  const [q, setQ] = useState<string>(hashInit.q);
  const [sort, setSort] = useState<string>(hashInit.sort);
  const [shareFallback, setShareFallback] = useState<string | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);

  // 筛选变化 → 同步 URL hash(可分享/收藏;q 防抖 300ms)
  useEffect(() => {
    const t = setTimeout(() => {
      const sp = browseFilterToParams({ kingdom, iucn, tag, hasImage, q, sort });
      const target = `#browse${sp.toString() ? `?${sp.toString()}` : ""}`;
      if (window.location.hash !== target) {
        window.history.replaceState(null, "", window.location.pathname + window.location.search + target);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [kingdom, iucn, tag, hasImage, q, sort]);

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
  const clearAll = () => {
    setKingdom(null);
    setIucn(null);
    setTag(null);
    setHasImage(false);
    setQ("");
    setSort("default");
  };

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

      {/* 卡片网格 */}
      {isLoading ? (
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[5/4] rounded-xl" />
          ))}
        </div>
      ) : items.length > 0 ? (
        <>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {items.map((s, i) => (
              <SpeciesCard key={s.id} species={s} index={i % 12} />
            ))}
          </div>
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
