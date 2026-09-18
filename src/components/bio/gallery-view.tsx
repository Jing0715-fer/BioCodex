"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useBioStore } from "@/lib/bio-store";
import { useGallery, type GalleryItem } from "@/hooks/use-bio";
import { KINGDOM_THEME, IUCN_INFO } from "@/lib/bio-domain";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Images, Search, Shuffle, X, ChevronLeft, ChevronRight, ZoomIn, ArrowRight,
  Sparkles, ExternalLink, MapPin, Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SafeImg } from "./safe-img";
import { TaxaPlaceholder } from "./taxa-icon";

/** 六界固定顺序(筛选胶囊) */
const KINGDOM_ORDER = ["Animalia", "Plantae", "Fungi", "Protista", "Bacteria", "Archaea"];
/** 瀑布流卡片高度节奏(4:3 原图裁切出画廊节奏感,按 id 哈希分配保证稳定) */
const RHYTHM = ["aspect-[4/3]", "aspect-square", "aspect-[3/4]", "aspect-[4/5]"] as const;
/** data 未到达时的稳定空数组(避免 ?? [] 每渲染产生新引用,导致 useEffect [items] 无限 setOrder 循环) */
const EMPTY_ITEMS: GalleryItem[] = [];

function hashIdx(id: string, mod: number): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return h % mod;
}

export function GalleryView() {
  const { openTaxon } = useBioStore();
  const { data, isLoading, isError } = useGallery();
  const [kingdom, setKingdom] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [flagshipOnly, setFlagshipOnly] = useState(false);
  const [shuffled, setShuffled] = useState(false);
  const [order, setOrder] = useState<GalleryItem[]>([]);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const items = data?.items ?? EMPTY_ITEMS;

  // 服务端数据到达(或变化)时重置排列
  useEffect(() => {
    setOrder(items);
  }, [items]);

  // 随机洗牌(按图找物种的漫游模式)
  const shuffle = useCallback(() => {
    setShuffled((s) => {
      const next = !s;
      setOrder((cur) => {
        const arr = [...cur];
        if (next) {
          for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
          }
        } else {
          arr.sort((a, b) => (a.id > b.id ? 1 : -1));
        }
        return arr;
      });
      return next;
    });
  }, []);

  // 客户端过滤:界胶囊 + 仅旗舰 + 名称/拉丁名搜索
  const filtered = useMemo(() => {
    const kw = q.trim().toLowerCase();
    return order.filter((it) => {
      if (kingdom && it.kingdom !== kingdom) return false;
      if (flagshipOnly && !it.isFlagship) return false;
      if (kw && !it.chineseName.toLowerCase().includes(kw) && !it.latinName.toLowerCase().includes(kw)) return false;
      return true;
    });
  }, [order, kingdom, q, flagshipOnly]);
  const flagshipCount = useMemo(() => items.filter((it) => it.isFlagship).length, [items]);

  // 灯箱前后翻页(键盘 ←/→,跨过滤后列表)
  const step = useCallback((dir: 1 | -1) => {
    setLightbox((cur) => {
      if (cur === null || !filtered.length) return cur;
      return (cur + dir + filtered.length) % filtered.length;
    });
  }, [filtered.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, step]);

  const current = lightbox !== null ? filtered[lightbox] : null;
  const total = data?.total ?? 0;
  const speciesTotal = data?.speciesTotal ?? 0;
  const progress = speciesTotal > 0 ? Math.round((total / speciesTotal) * 100) : 0;

  return (
    <div ref={rootRef} className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6">
      {/* ====== 页眉 ====== */}
      <header className="reveal-up mb-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-primary/70">
              <Images className="h-3.5 w-3.5" />
              Pinacotheca
            </p>
            <h1 className="font-display mt-1 text-2xl font-bold text-foreground sm:text-3xl">
              插图画廊
              <span className="ml-3 align-middle text-sm font-normal text-muted-foreground">
                {total} 幅博物学插图 · 按图找物种
              </span>
            </h1>
            {/* 配图完成度指示(插图计划持续推进中) */}
            {speciesTotal > 0 && (
              <div className="mt-3 max-w-md">
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3 text-primary/60" aria-hidden />
                    插图计划:{total} / {speciesTotal} 物种已配图
                  </span>
                  <span className="font-semibold tabular-nums text-primary/80">{progress}%</span>
                </div>
                <div
                  className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-primary/10"
                  role="progressbar"
                  aria-label="物种插图完成度"
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary transition-all duration-700"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
              汇集图鉴全部已配图物种的复古博物学插图。点击卡片进入物种档案,
              或用放大模式逐幅浏览大图——凭借一瞥的形态印象,重新遇见你的物种。
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={shuffled ? "default" : "outline"}
              size="sm"
              onClick={shuffle}
              className="h-9 gap-1.5"
              aria-label={shuffled ? "恢复原顺序" : "随机打乱顺序"}
            >
              <Shuffle className={cn("h-4 w-4", shuffled && "animate-none")} />
              {shuffled ? "恢复顺序" : "随机漫游"}
            </Button>
          </div>
        </div>
      </header>

      {/* ====== 筛选行:界胶囊 + 搜索 ====== */}
      <div className="reveal-up mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="nh-scroll -mx-1 flex items-center gap-1.5 overflow-x-auto px-1 py-1">
          <button
            onClick={() => setKingdom(null)}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
              !kingdom
                ? "border-primary/40 bg-primary text-primary-foreground shadow-sm"
                : "border-foreground/15 bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
            )}
          >
            <Images className="h-3.5 w-3.5" />
            全部
            <span className="rounded-full bg-foreground/10 px-1.5 text-[10px] font-bold tabular-nums">{total}</span>
          </button>
          {KINGDOM_ORDER.filter((k) => (data?.counts?.[k] ?? 0) > 0).map((k) => {
            const th = KINGDOM_THEME[k];
            const on = kingdom === k;
            return (
              <button
                key={k}
                onClick={() => setKingdom(on ? null : k)}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                  on
                    ? "border-primary/40 bg-primary text-primary-foreground shadow-sm"
                    : "border-foreground/15 bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
                )}
                title={th?.desc}
              >
                {th?.name ?? k}
                <span className="rounded-full bg-foreground/10 px-1.5 text-[10px] font-bold tabular-nums">
                  {data?.counts?.[k] ?? 0}
                </span>
              </button>
            );
          })}
          {/* 仅旗舰筛选(皇冠开关) */}
          <button
            onClick={() => setFlagshipOnly((v) => !v)}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
              flagshipOnly
                ? "border-amber-500/50 bg-amber-500/15 text-amber-700 shadow-sm dark:text-amber-300"
                : "border-foreground/15 bg-card text-muted-foreground hover:border-amber-500/40 hover:text-amber-700 dark:hover:text-amber-300"
            )}
            title="只看旗舰物种(大熊猫/蓝鲸等明星物种)"
          >
            <Crown className="h-3.5 w-3.5" />
            仅旗舰
            <span className="rounded-full bg-foreground/10 px-1.5 text-[10px] font-bold tabular-nums">{flagshipCount}</span>
          </button>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="在画廊中搜索物种……"
            className="h-9 rounded-full pl-9 text-sm shadow-none"
            aria-label="画廊内搜索"
          />
          {q && (
            <button
              onClick={() => setQ("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="清空搜索"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ====== 画廊主体(瀑布流) ====== */}
      {isLoading ? (
        <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 xl:columns-5">
          {Array.from({ length: 15 }).map((_, i) => (
            <Skeleton
              key={i}
              className={cn("mb-4 w-full break-inside-avoid rounded-xl", RHYTHM[i % 4])}
            />
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-10 text-center">
          <p className="font-medium text-destructive">画廊暂不可用</p>
          <p className="mt-1 text-sm text-muted-foreground">请稍后刷新重试</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-foreground/10 bg-card p-10 text-center">
          <Images className="mx-auto h-10 w-10 text-muted-foreground/40" />
          <p className="mt-3 font-medium text-foreground">没有匹配的插图</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {q ? `未找到与「${q}」相关的已配图物种` : "该界暂无配图物种"}
            ,可切换其他界或清空筛选
          </p>
        </div>
      ) : (
        <div className="columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4 xl:columns-5">
          {filtered.map((it, i) => {
            const th = KINGDOM_THEME[it.kingdom];
            const iucn = it.conservation ? IUCN_INFO[it.conservation] : null;
            return (
              <figure
                key={it.id}
                className="reveal-up group relative mb-3 w-full break-inside-avoid overflow-hidden rounded-xl border border-foreground/10 bg-card shadow-sm transition-all duration-300 hover:z-10 hover:-translate-y-0.5 hover:shadow-lg sm:mb-4"
                style={{ animationDelay: `${Math.min(i, 24) * 30}ms` }}
              >
                <button
                  onClick={() => openTaxon(it.id)}
                  className="block w-full cursor-pointer text-left"
                  aria-label={`查看物种档案:${it.chineseName}(${it.latinName})`}
                >
                  <div className={cn("relative w-full overflow-hidden", RHYTHM[hashIdx(it.id, 4)])}>
                    <SafeImg
                      src={it.image}
                      alt={`${it.chineseName}(${it.latinName})博物学插图`}
                      className="img-fade-in h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                      fallback={<TaxaPlaceholder latinName={it.latinName} kingdom={it.kingdom} className="h-full w-full" />}
                    />
                    {/* 悬浮渐变与物种名(按图找物种的核心交互) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                    <figcaption className="absolute inset-x-0 bottom-0 p-3">
                      <p className="truncate text-sm font-bold text-white drop-shadow">{it.chineseName}</p>
                      <p className="latin truncate text-[11px] italic text-white/75">{it.latinName}</p>
                      <p className="mt-1 flex items-center gap-1.5">
                        <span className={cn("rounded-full px-1.5 py-0.5 text-[9px] font-semibold", th?.bg, th?.text)}>
                          {th?.name ?? it.kingdom}
                        </span>
                        {it.phylumZh && (
                          <span className="hidden truncate rounded-full bg-white/20 px-1.5 py-0.5 text-[9px] text-white/85 sm:inline">
                            {it.phylumZh}
                          </span>
                        )}
                        {iucn && (
                          <span className={cn("rounded-full px-1.5 py-0.5 text-[9px] font-bold", iucn.color, iucn.bg)}>
                            {iucn.label}
                          </span>
                        )}
                      </p>
                      <p className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-white/0 transition-all duration-300 group-hover:text-white/95">
                        查看物种档案
                        <ArrowRight className="h-3 w-3" />
                      </p>
                    </figcaption>
                  </div>
                </button>
                {/* 悬浮放大按钮(独立于跳转,打开大图灯箱) */}
                <button
                  onClick={() => setLightbox(i)}
                  aria-label={`放大查看:${it.chineseName}插图`}
                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/55 text-white opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-black/85 group-hover:opacity-100"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
                {it.isFlagship && (
                  <span
                    className="absolute left-2 top-2 flex items-center gap-0.5 rounded-full bg-amber-500/85 px-1.5 py-0.5 text-[9px] font-bold text-white shadow"
                    title="旗舰物种"
                  >
                    <Sparkles className="h-2.5 w-2.5" />
                    旗舰
                  </span>
                )}
              </figure>
            );
          })}
        </div>
      )}

      {/* ====== 底部统计条 ====== */}
      {!isLoading && filtered.length > 0 && (
        <footer className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          当前展示 {filtered.length} / {total} 幅插图
          {kingdom && ` · ${KINGDOM_THEME[kingdom]?.name ?? kingdom}`}
          {q && ` · 检索「${q}」`}
          <span className="mx-1 text-foreground/20">|</span>
          <Sparkles className="h-3 w-3 text-amber-500/80" />
          全部插图为 AI 生成的复古博物学风格作品
        </footer>
      )}

      {/* ====== 大图灯箱(逐幅浏览:← → 翻页) ====== */}
      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${current.chineseName}插图放大视图`}
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[70] flex cursor-zoom-out flex-col items-center justify-center gap-4 bg-black/92 p-4 backdrop-blur-sm sm:p-8"
        >
          <button
            onClick={() => setLightbox(null)}
            aria-label="关闭放大视图"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/25"
          >
            <X className="h-5 w-5" />
          </button>

          {/* 计数徽标 */}
          <span className="absolute left-4 top-4 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold tabular-nums text-white/90">
            {lightbox! + 1} / {filtered.length}
          </span>

          {/* 前后翻页 */}
          {filtered.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); step(-1); }}
                aria-label="上一幅"
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-all hover:bg-white/25 sm:left-6"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); step(1); }}
                aria-label="下一幅"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-all hover:bg-white/25 sm:right-6"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <SafeImg
            src={current.image}
            alt={`${current.chineseName}(${current.latinName})插图放大`}
            className="nh-scroll max-h-[74vh] max-w-full rounded-lg object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            fallback={
              <div className="flex max-h-[74vh] w-full max-w-2xl items-center justify-center overflow-hidden rounded-lg border border-white/15">
                <TaxaPlaceholder latinName={current.latinName} kingdom={current.kingdom} big className="h-[52vh] w-full" />
              </div>
            }
          />
          <figcaption className="max-w-2xl text-center" onClick={(e) => e.stopPropagation()}>
            <p className="font-display text-xl font-bold text-white">{current.chineseName}</p>
            <p className="latin mt-1 text-sm italic text-white/70">{current.latinName}</p>
            <p className="mt-1.5 flex items-center justify-center gap-2 text-[11px] text-white/60">
              <span className={cn("rounded-full px-2 py-0.5 font-semibold", KINGDOM_THEME[current.kingdom]?.bg, KINGDOM_THEME[current.kingdom]?.text)}>
                {KINGDOM_THEME[current.kingdom]?.name ?? current.kingdom}
              </span>
              {current.phylumZh && <span>{current.phylumZh}</span>}
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              <Button
                size="sm"
                onClick={() => { openTaxon(current.id); setLightbox(null); }}
                className="h-8 gap-1.5 rounded-full"
              >
                查看物种档案
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
              <a
                href={`https://www.inaturalist.org/taxa/search?q=${encodeURIComponent(current.latinName)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/25 px-3 text-xs font-medium text-emerald-300 transition-colors hover:bg-white/10 hover:text-emerald-200"
              >
                真实影像
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <p className="mt-2.5 flex items-center justify-center gap-1 text-xs text-white/45">
              <Sparkles className="h-3 w-3 text-amber-300/70" />
              复古博物学风格 AI 生成插图 · 形态特征 以文字档案与外部数据库为准
            </p>
            <p className="mt-1 text-[10px] text-white/35">← → 翻页 · Esc 或点击空白处关闭</p>
          </figcaption>
        </div>
      )}
    </div>
  );
}
