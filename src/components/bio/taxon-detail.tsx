"use client";

import { useEffect, useMemo, useState } from "react";
import { useBioStore, MAX_COMPARE } from "@/lib/bio-store";
import { useTaxon } from "@/hooks/use-bio";
import { buildDbLinks, IUCN_INFO, KINGDOM_THEME, rankLabel } from "@/lib/bio-domain";
import { TaxaPlaceholder, KingdomIcon } from "./taxa-icon";
import { TaxonCard } from "./taxon-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  ChevronRight, ArrowLeft, ArrowRight, ExternalLink, Database, Dna, Shield,
  MapPin, Leaf, FlaskConical, BookOpen, Star, Sparkles, Microscope, GitCompareArrows, Check, X, ZoomIn,
} from "lucide-react";
import { cn } from "@/lib/utils";

const GROUP_META: Record<string, { label: string; icon: any }> = {
  "分类学": { label: "分类学数据库", icon: Database },
  "基因组": { label: "基因组与序列", icon: Dna },
  "生态观察": { label: "生态与观察", icon: MapPin },
  "百科文献": { label: "百科与文献", icon: BookOpen },
  "类群专属": { label: "类群专属数据库", icon: FlaskConical },
};

function SectionCard({
  title,
  icon: Icon,
  children,
  className,
}: {
  title: string;
  icon?: any;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-xl border border-foreground/10 bg-card p-5 shadow-sm", className)}>
      <h2 className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
        {Icon && <Icon className="h-4.5 w-4.5 text-primary" />}
        {title}
      </h2>
      <Separator className="my-3.5" />
      <div className="text-sm leading-7 text-foreground/85">{children}</div>
    </section>
  );
}

export function TaxonDetail({ id }: { id: string }) {
  const { openTaxon, explore, goBack, compareIds, toggleCompare, openCompare } = useBioStore();
  const { data, isLoading } = useTaxon(id);
  const [lightbox, setLightbox] = useState(false);

  const links = useMemo(
    () =>
      data
        ? buildDbLinks({
            latinName: data.taxon.latinName,
            chineseName: data.taxon.chineseName,
            ncbiTaxId: data.taxon.ncbiTaxId,
            rank: data.taxon.rank,
            kingdomPath: data.taxon.kingdomPath,
          })
        : [],
    [data]
  );

  const grouped = useMemo(() => {
    const g = new Map<string, typeof links>();
    for (const l of links) {
      if (!g.has(l.group)) g.set(l.group, []);
      g.get(l.group)!.push(l);
    }
    return g;
  }, [links]);

  // 上一/下一物种(hooks 必须在 early return 之前计算)
  const siblings = data?.siblings || [];
  const idx = siblings.findIndex((s) => s.id === id);
  const prev = idx > 0 ? siblings[idx - 1] : null;
  const next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : null;

  // 键盘导航:←/→ 切换同属上/下一物种(输入框聚焦时忽略);Esc 关灯箱
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement)?.isContentEditable) return;
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowLeft" && prev) openTaxon(prev.id);
      if (e.key === "ArrowRight" && next) openTaxon(next.id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, openTaxon]);

  if (isLoading || !data?.success) {
    return (
      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4">
          <Skeleton className="h-5 w-64" />
          <Skeleton className="h-72 w-full rounded-xl" />
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              <Skeleton className="h-40 w-full rounded-xl" />
            </div>
            <Skeleton className="h-40 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  const { taxon, lineage, children, counts } = data;
  const theme = KINGDOM_THEME[taxon.kingdom] || KINGDOM_THEME.Animalia;
  const isSpecies = taxon.rank === "species";
  const iucn = taxon.conservation ? IUCN_INFO[taxon.conservation] : null;
  const tags = taxon.tags || [];
  // 同属近亲(排除自身)
  const relatedSpecies = siblings.filter(
    (s) => s.rank === "species" && s.id !== taxon.id
  );
  const genusName = lineage[lineage.length - 1]?.chineseName;

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 pb-8 pt-4 sm:px-6">
      {/* 面包屑 */}
      <nav className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground" aria-label="分类路径">
        <button className="hover:text-primary" onClick={() => explore(null)}>
          生命之树
        </button>
        {lineage.map((l) => (
          <span key={l.id} className="flex items-center gap-1">
            <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
            <button className="max-w-32 truncate hover:text-primary" onClick={() => explore(l.id)}>
              {l.chineseName}
            </button>
          </span>
        ))}
        <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
        <span className="font-medium text-foreground">{taxon.chineseName}</span>
      </nav>

      {/* ====== 主图区 ====== */}
      <div className="reveal-up relative mt-3 overflow-hidden rounded-2xl border border-foreground/10 shadow-md">
        {taxon.image ? (
          <button
            onClick={() => setLightbox(true)}
            aria-label="放大查看物种插图"
            className="group/img absolute inset-0 h-full w-full cursor-zoom-in"
          >
            <img
              src={taxon.image}
              alt={`${taxon.chineseName}(${taxon.latinName})博物学插图`}
              className="img-fade-in h-[320px] w-full object-cover transition-transform duration-500 group-hover/img:scale-[1.02] sm:h-[420px]"
            />
          </button>
        ) : (
          <TaxaPlaceholder latinName={taxon.latinName} kingdom={taxon.kingdom} big className="h-[320px] w-full sm:h-[420px]" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
        {/* 放大提示角标(有图时) */}
        {taxon.image && (
          <span className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-medium text-white/90 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover/img:opacity-100 sm:bottom-5 sm:right-5">
            <ZoomIn className="h-3 w-3" />
            点击放大
          </span>
        )}
        {/* 右上角操作:加入对比(仅物种) */}
        {isSpecies && (
          <div className="absolute right-3 top-3 flex items-center gap-2">
            {(() => {
              const inCompare = compareIds.includes(taxon.id);
              const full = !inCompare && compareIds.length >= MAX_COMPARE;
              return (
                <>
                  <button
                    onClick={() => {
                      const res = toggleCompare(taxon.id);
                      if (res === "added")
                        toast.success(`已加入对比:${taxon.chineseName}`, {
                          description: `托盘 ${compareIds.length + 1}/${MAX_COMPARE},选满 2 个即可开始`,
                        });
                      else if (res === "removed") toast.info(`已移出对比:${taxon.chineseName}`);
                      else toast.warning("对比托盘已满(最多 3 个)", { description: "可先开始对比或移除一个物种" });
                    }}
                    disabled={full}
                    aria-label={inCompare ? `移出对比:${taxon.chineseName}` : `加入对比:${taxon.chineseName}`}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold shadow transition-all",
                      inCompare
                        ? "bg-primary text-primary-foreground"
                        : "bg-black/50 text-white backdrop-blur-sm hover:bg-black/70",
                      full && "cursor-not-allowed opacity-50"
                    )}
                  >
                    {inCompare ? <Check className="h-3.5 w-3.5" /> : <GitCompareArrows className="h-3.5 w-3.5" />}
                    {inCompare ? "已加入对比" : "加入对比"}
                  </button>
                  {compareIds.length >= 2 && (
                    <button
                      onClick={openCompare}
                      className="hidden items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-xs font-bold text-white shadow backdrop-blur-sm transition-colors hover:bg-white/35 sm:flex"
                    >
                      对比 {compareIds.length} 个物种
                    </button>
                  )}
                </>
              );
            })()}
          </div>
        )}
        {/* 标题叠层 */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-white shadow"
              style={{ background: theme.color }}
            >
              <KingdomIcon kingdom={taxon.kingdom} className="h-3.5 w-3.5" />
              {theme.name}
            </span>
            <span className="rounded-sm bg-white/20 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
              {rankLabel(taxon.rank)}
            </span>
            {iucn && (
              <span className={cn("rounded-sm px-2 py-0.5 text-xs font-bold text-white shadow", iucn.bg)}>
                IUCN {iucn.label}
              </span>
            )}
            {tags.includes("flagship") && (
              <span className="flex items-center gap-1 rounded-sm bg-amber-500/85 px-2 py-0.5 text-xs font-bold text-white shadow">
                <Star className="h-3 w-3" />
                旗舰物种
              </span>
            )}
            {tags.includes("模式生物") && (
              <span className="flex items-center gap-1 rounded-sm bg-teal-600/85 px-2 py-0.5 text-xs font-bold text-white shadow">
                <Microscope className="h-3 w-3" />
                模式生物
              </span>
            )}
            {tags.includes("入侵物种") && (
              <span className="rounded-sm bg-zinc-700/85 px-2 py-0.5 text-xs font-bold text-white shadow">
                入侵物种
              </span>
            )}
          </div>
          <h1 className="mt-3 font-display text-3xl font-bold text-white drop-shadow-md sm:text-5xl">
            {taxon.chineseName}
          </h1>
          <div className="mt-1.5 flex flex-wrap items-baseline gap-3">
            <span className="latin text-lg text-white/95 drop-shadow sm:text-2xl">{taxon.latinName}</span>
            {taxon.authority && (
              <span className="text-sm text-white/75 drop-shadow">{taxon.authority}</span>
            )}
            {taxon.ncbiTaxId && (
              <span className="latin rounded-sm bg-white/15 px-2 py-0.5 text-xs text-white/90 backdrop-blur-sm">
                NCBI txid{taxon.ncbiTaxId}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ====== 内容 + 侧栏 ====== */}
      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_360px]">
        {/* 左列:正文 */}
        <div className="min-w-0 space-y-5">
          {taxon.description && (
            <SectionCard title={isSpecies ? "物种描述" : "类群概述"} icon={BookOpen}>
              {taxon.description}
            </SectionCard>
          )}

          {(taxon.morphology || taxon.habitat || taxon.distribution) && (
            <SectionCard title="形态、生境与分布" icon={Leaf}>
              <dl className="space-y-4">
                {taxon.morphology && (
                  <div>
                    <dt className="mb-1 text-xs font-bold tracking-widest text-muted-foreground">形态识别</dt>
                    <dd>{taxon.morphology}</dd>
                  </div>
                )}
                {taxon.habitat && (
                  <div>
                    <dt className="mb-1 text-xs font-bold tracking-widest text-muted-foreground">生境</dt>
                    <dd>{taxon.habitat}</dd>
                  </div>
                )}
                {taxon.distribution && (
                  <div>
                    <dt className="mb-1 text-xs font-bold tracking-widest text-muted-foreground">分布</dt>
                    <dd className="flex items-start gap-2">
                      <MapPin className="mt-1.5 h-4 w-4 shrink-0 text-primary/70" />
                      {taxon.distribution}
                    </dd>
                  </div>
                )}
              </dl>
            </SectionCard>
          )}

          {iucn && taxon.conservation && (
            <SectionCard title="保护状况" icon={Shield}>
              <div className="flex flex-wrap items-center gap-3">
                <span className={cn("rounded-md px-3 py-1.5 font-display text-lg font-bold text-white", iucn.bg)}>
                  {taxon.conservation}
                </span>
                <div>
                  <p className="font-semibold text-foreground">{iucn.full}</p>
                  <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
                    依据 IUCN 红色名录等级:极危(CR)与濒危(EN)物种面临野外灭绝的高风险;
                    图鉴中 {data.counts.speciesCount >= 0 && "收录的该等级物种均附红色名录直链,可查最新评估。"}
                  </p>
                </div>
              </div>
            </SectionCard>
          )}

          {/* 同属近亲 */}
          {isSpecies && relatedSpecies.length > 0 && (
            <SectionCard
              title={`${genusName || "同属"}的其它成员(${relatedSpecies.length})`}
              icon={Sparkles}
            >
              <div className="nh-scroll -mx-1 flex gap-3 overflow-x-auto px-1 pb-2">
                {relatedSpecies.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => openTaxon(r.id)}
                    className="group relative w-40 shrink-0 overflow-hidden rounded-lg border border-foreground/10 bg-muted/30 text-left transition-all hover:border-primary/40 hover:shadow-md"
                  >
                    <div className="relative h-24 w-full overflow-hidden">
                      {r.image ? (
                        <img
                          src={r.image}
                          alt={r.chineseName}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                      ) : (
                        <TaxaPlaceholder latinName={r.latinName} kingdom={taxon.kingdom} className="h-full w-full" />
                      )}
                      {r.conservation && (
                        <span
                          className={cn(
                            "absolute right-1.5 top-1.5 rounded-sm px-1 py-0.5 text-[9px] font-bold text-white",
                            IUCN_INFO[r.conservation]?.bg
                          )}
                        >
                          {r.conservation}
                        </span>
                      )}
                    </div>
                    <div className="p-2">
                      <p className="truncate text-[13px] font-semibold text-foreground group-hover:text-primary">
                        {r.chineseName}
                      </p>
                      <p className="latin truncate text-[10px] text-muted-foreground">{r.latinName}</p>
                    </div>
                  </button>
                ))}
              </div>
            </SectionCard>
          )}

          {/* 子单元 */}
          {children.length > 0 && (
            <SectionCard
              title={
                taxon.rank === "genus"
                  ? `本属物种(${children.length})`
                  : `下属阶元(${children.length})`
              }
              icon={Sparkles}
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {children.map((c, i) => (
                  <TaxonCard key={c.id} taxon={c} kingdom={taxon.kingdom} index={i} />
                ))}
              </div>
            </SectionCard>
          )}

          {/* 上一/下一物种 */}
          {(prev || next) && (
            <div>
              <p className="mb-2 flex items-center justify-between text-[11px] text-muted-foreground/70">
                <span>同属相邻条目</span>
                <span className="hidden items-center gap-1 sm:flex">
                  <kbd className="rounded border border-foreground/15 bg-muted px-1.5 py-0.5 font-mono text-[10px]">←</kbd>
                  <kbd className="rounded border border-foreground/15 bg-muted px-1.5 py-0.5 font-mono text-[10px]">→</kbd>
                  键盘切换
                </span>
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {prev ? (
                <button
                  onClick={() => openTaxon(prev.id)}
                  className="group flex items-center gap-3 rounded-xl border border-foreground/10 bg-card p-3.5 text-left shadow-sm transition-colors hover:border-primary/40"
                >
                  <ArrowLeft className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="min-w-0">
                    <span className="block text-[11px] text-muted-foreground">上一条</span>
                    <span className="block truncate text-sm font-semibold text-foreground group-hover:text-primary">
                      {prev.chineseName}
                    </span>
                    <span className="latin block truncate text-xs text-muted-foreground">{prev.latinName}</span>
                  </span>
                </button>
              ) : (
                <span />
              )}
              {next && (
                <button
                  onClick={() => openTaxon(next.id)}
                  className="group flex items-center justify-end gap-3 rounded-xl border border-foreground/10 bg-card p-3.5 text-right shadow-sm transition-colors hover:border-primary/40"
                >
                  <span className="min-w-0">
                    <span className="block text-[11px] text-muted-foreground">下一条</span>
                    <span className="block truncate text-sm font-semibold text-foreground group-hover:text-primary">
                      {next.chineseName}
                    </span>
                    <span className="latin block truncate text-xs text-muted-foreground">{next.latinName}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                </button>
              )}
              </div>
            </div>
          )}
        </div>

        {/* 右列:侧栏 */}
        <aside className="space-y-5">
          {/* 分类地位卡 */}
          <section className="rounded-xl border border-foreground/10 bg-card p-5 shadow-sm">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold">
              <Database className="h-4.5 w-4.5 text-primary" />
              分类地位
            </h2>
            <Separator className="my-3.5" />
            <ol className="space-y-0.5">
              {lineage.map((l, i) => (
                <li key={l.id} className="flex items-center gap-2">
                  <span className="w-10 shrink-0 text-right text-[10px] tabular-nums text-muted-foreground/60">
                    {rankLabel(l.rank)}
                  </span>
                  <button
                    onClick={() => explore(l.id)}
                    className="flex-1 truncate rounded px-1.5 py-1 text-left text-sm text-foreground/85 transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    {l.chineseName}
                  </button>
                  <span className="latin hidden max-w-24 truncate text-[10px] text-muted-foreground/50 xl:inline">
                    {l.latinName}
                  </span>
                </li>
              ))}
              <li className="flex items-center gap-2">
                <span className="w-10 shrink-0 text-right text-[10px] tabular-nums font-bold text-primary">
                  {rankLabel(taxon.rank)}
                </span>
                <span className="flex-1 truncate rounded bg-accent px-1.5 py-1 text-sm font-bold text-accent-foreground">
                  {taxon.chineseName}
                </span>
              </li>
            </ol>
            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-foreground/10 pt-3.5 text-center">
              <div>
                <p className="font-display text-xl font-bold tabular-nums text-foreground">
                  {counts.speciesCount}
                </p>
                <p className="text-[10px] text-muted-foreground">库内物种</p>
              </div>
              <div>
                <p className="font-display text-xl font-bold tabular-nums text-foreground">
                  {counts.children}
                </p>
                <p className="text-[10px] text-muted-foreground">直接子阶元</p>
              </div>
              <div>
                <p className="font-display text-xl font-bold tabular-nums text-foreground">
                  {counts.totalCount}
                </p>
                <p className="text-[10px] text-muted-foreground">全部条目</p>
              </div>
            </div>
          </section>

          {/* 数据库链接 */}
          <section className="rounded-xl border border-foreground/10 bg-card p-5 shadow-sm">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold">
              <ExternalLink className="h-4.5 w-4.5 text-primary" />
              科学数据库
              <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                {links.length} 个链接
              </span>
            </h2>
            <Separator className="my-3.5" />
            <div className="space-y-4">
              {[...grouped.entries()].map(([group, ls]) => {
                const meta = GROUP_META[group] || GROUP_META["百科文献"];
                return (
                  <div key={group}>
                    <p className="mb-1.5 flex items-center gap-1.5 text-xs font-bold tracking-wider text-muted-foreground">
                      <meta.icon className="h-3.5 w-3.5 text-primary/70" />
                      {meta.label}
                    </p>
                    <div className="grid grid-cols-1 gap-1.5">
                      {ls.map((l) => (
                        <a
                          key={l.name}
                          href={l.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between gap-2 rounded-lg border border-foreground/10 bg-muted/30 px-3 py-2 text-[13px] text-foreground/85 transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                        >
                          <span className="truncate">{l.name}</span>
                          <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground/40 group-hover:text-primary" />
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-4 border-t border-foreground/10 pt-3 text-[11px] leading-4 text-muted-foreground">
              点击直达权威数据库页面:物种分类、基因组序列、观察记录与文献一站式溯源。
              {taxon.ncbiTaxId
                ? " 本条目已锚定 NCBI Taxonomy ID。"
                : " 本条目以学名检索方式跳转。"}
            </p>
          </section>

          {/* 提示卡 */}
          <section className="rounded-xl border border-primary/25 bg-primary/5 p-5">
            <p className="flex items-start gap-2.5 text-sm leading-6 text-foreground/85">
              <Sparkles className="mt-1 h-4 w-4 shrink-0 text-primary" />
              想了解它的近亲、演化故事或保护现状?问右侧悬浮的
              <strong> AI 博物学家阿博</strong>,它能直接为你翻到相关图鉴页面。
            </p>
          </section>

          <Button variant="outline" className="w-full gap-2 rounded-full" onClick={goBack}>
            <ArrowLeft className="h-4 w-4" />
            返回上一页
          </Button>
        </aside>
      </div>

      {/* ====== 插图灯箱(点击主图放大) ====== */}
      {lightbox && taxon.image && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${taxon.chineseName}插图放大视图`}
          onClick={() => setLightbox(false)}
          className="fixed inset-0 z-[70] flex cursor-zoom-out flex-col items-center justify-center gap-4 bg-black/92 p-4 backdrop-blur-sm sm:p-8"
        >
          <button
            onClick={() => setLightbox(false)}
            aria-label="关闭放大视图"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/25"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={taxon.image}
            alt={`${taxon.chineseName}(${taxon.latinName})插图放大`}
            onClick={(e) => e.stopPropagation()}
            className="nh-scroll max-h-[78vh] max-w-full rounded-lg object-contain shadow-2xl"
          />
          <figcaption className="pointer-events-none max-w-2xl text-center">
            <p className="font-display text-xl font-bold text-white">{taxon.chineseName}</p>
            <p className="latin mt-1 text-sm italic text-white/70">{taxon.latinName}</p>
            {taxon.imageCaption && (
              <p className="mt-2 text-xs text-white/50">{taxon.imageCaption} · Esc 或点击空白处关闭</p>
            )}
          </figcaption>
        </div>
      )}
    </div>
  );
}
