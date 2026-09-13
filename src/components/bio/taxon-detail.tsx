"use client";

import { useEffect, useMemo, useState } from "react";
import { useBioStore, MAX_COMPARE } from "@/lib/bio-store";
import { useTaxon, useTree, type TreeNodeDTO } from "@/hooks/use-bio";
import { buildDbLinks, IUCN_INFO, KINGDOM_THEME, rankLabel } from "@/lib/bio-domain";
import { TaxaPlaceholder, KingdomIcon } from "./taxa-icon";
import { KingdomOrnament } from "./kingdom-ornament";
import { TaxonCard } from "./taxon-card";
import { LineageTimeline } from "./lineage-timeline";
import { ShareDialog } from "./share-dialog";
import { pushHistory } from "@/lib/view-history";
import { useFavorites, toggleFavorite, FAVORITES_MAX } from "@/lib/favorites";
import { copyText } from "@/lib/clipboard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  ChevronRight, ArrowLeft, ArrowRight, ExternalLink, Database, Dna, Shield,
  MapPin, Leaf, FlaskConical, BookOpen, Star, Sparkles, Microscope, GitCompareArrows, GitBranch, Check, X, ZoomIn, Bookmark, Quote, Copy,
  BookMarked, Compass, Network, ScrollText, Link2,
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
  sectionId,
}: {
  title: string;
  icon?: any;
  children: React.ReactNode;
  className?: string;
  sectionId?: string;
}) {
  return (
    <section id={sectionId} className={cn("scroll-mt-24 rounded-xl border border-foreground/10 bg-card p-5 shadow-sm", className)}>
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
  const { openTaxon, explore, goBack, compareIds, toggleCompare, openCompare, openRedlist } = useBioStore();
  const favorites = useFavorites();
  const { data, isLoading } = useTaxon(id);
  const { data: tree } = useTree();
  const [lightbox, setLightbox] = useState(false);
  /** 引用复制失败时手动复制兑底文本 */
  const [citeFallback, setCiteFallback] = useState<string | null>(null);

  // 面包屑物种计数:从树 DTO 递归建 id → 物种数映射(与探索视图一致)
  const speciesCountById = useMemo(() => {
    const m = new Map<string, number>();
    const walk = (nodes: TreeNodeDTO[]) => {
      for (const n of nodes) {
        if (!m.has(n.id)) m.set(n.id, n.sc);
        if (n.ch?.length) walk(n.ch);
      }
    };
    if (tree) walk(tree);
    return m;
  }, [tree]);

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
      // F 键快捷收藏当前物种(仅物种阶元)
      if (e.key.toLowerCase() === "f" && data?.success && data.taxon.rank === "species") {
        const t = data.taxon;
        const res = toggleFavorite({
          id: t.id,
          chineseName: t.chineseName,
          latinName: t.latinName,
          kingdom: t.kingdom,
          image: t.image,
          conservation: t.conservation,
          ncbiTaxId: t.ncbiTaxId,
          description: t.description,
        });
        if (res === "added") toast.success(`已收进标本夹:${t.chineseName}`, { description: "头栏书签图标可查看全部收藏" });
        else if (res === "removed") toast.info(`已从标本夹取出:${t.chineseName}`);
        else toast.warning(`标本夹已满(上限 ${FAVORITES_MAX} 件)`);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, openTaxon, data]);

  // 浏览足迹:查看任意条目时记录(localStorage 持久化,头栏「足迹」下拉可回溯)
  useEffect(() => {
    if (data?.success && data.taxon) {
      pushHistory({
        id: data.taxon.id,
        chineseName: data.taxon.chineseName,
        latinName: data.taxon.latinName,
        kingdom: data.taxon.kingdom,
        image: data.taxon.image,
      });
    }
  }, [data]);

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
        {lineage.map((l) => {
          const sc = speciesCountById.get(l.id);
          return (
            <span key={l.id} className="flex items-center gap-1">
              <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
              <button
                className="flex max-w-32 items-center gap-1 truncate hover:text-primary"
                onClick={() => explore(l.id)}
                title={`${l.chineseName}${sc ? ` · ${sc} 物种` : ""}`}
              >
                <span className="truncate">{l.chineseName}</span>
                {sc != null && sc > 0 && (
                  <span className="shrink-0 rounded-full bg-foreground/8 px-1.5 text-[9px] font-semibold tabular-nums text-muted-foreground/80 dark:bg-foreground/15">
                    {sc}
                  </span>
                )}
              </button>
            </span>
          );
        })}
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
        {/* 界主题装饰纹样(博物馆钢印式,叠加于顶部左侧) */}
        <KingdomOrnament
          kingdom={taxon.kingdom}
          className="absolute left-4 top-3 hidden h-8 w-36 text-white/40 drop-shadow-sm sm:block"
        />
        {/* 放大提示角标(有图时) */}
        {taxon.image && (
          <span className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-medium text-white/90 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover/img:opacity-100 sm:bottom-5 sm:right-5">
            <ZoomIn className="h-3 w-3" />
            点击放大
          </span>
        )}
        {/* 右上角操作:加入对比 + 收藏(仅物种) */}
        {isSpecies && (
          <div className="absolute right-3 top-3 flex items-center gap-2">
            {(() => {
              const inCompare = compareIds.includes(taxon.id);
              const full = !inCompare && compareIds.length >= MAX_COMPARE;
              const isFav = favorites.some((x) => x.id === taxon.id);
              return (
                <>
                  <button
                    onClick={() => {
                      const res = toggleFavorite({
                        id: taxon.id,
                        chineseName: taxon.chineseName,
                        latinName: taxon.latinName,
                        kingdom: taxon.kingdom,
                        image: taxon.image,
                        conservation: taxon.conservation,
                        ncbiTaxId: taxon.ncbiTaxId,
                        description: taxon.description,
                      });
                      if (res === "added")
                        toast.success(`已收进标本夹:${taxon.chineseName}`, {
                          description: `快捷键 F 也可随时收藏 · 头栏书签图标查看全部`,
                        });
                      else if (res === "removed") toast.info(`已从标本夹取出:${taxon.chineseName}`);
                      else toast.warning(`标本夹已满(上限 ${FAVORITES_MAX} 件)`, { description: "可先清理一些不再需要的标本" });
                    }}
                    aria-label={isFav ? `从标本夹移除:${taxon.chineseName}` : `收藏到标本夹:${taxon.chineseName}`}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold shadow transition-all",
                      isFav
                        ? "bg-amber-500 text-white"
                        : "bg-black/50 text-white backdrop-blur-sm hover:bg-black/70"
                    )}
                  >
                    <Bookmark className={cn("h-3.5 w-3.5", isFav && "fill-current")} />
                    {isFav ? "已收藏" : "收藏"}
                  </button>
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
              <button
                onClick={() => openRedlist({ iucn: taxon.conservation })}
                title={`查看红色名录 ${taxon.conservation} 等级全部物种`}
                className={cn(
                  "rounded-sm px-2 py-0.5 text-xs font-bold text-white shadow transition-transform hover:scale-105 active:scale-95",
                  iucn.bg
                )}
              >
                IUCN {iucn.label} ·
                <span className="font-medium">看同类</span>
              </button>
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

      {/* ====== 分节导航(锚点快速跳转) ====== */}
      {(() => {
        const anchors = [
          { id: "section-description", label: isSpecies ? "物种描述" : "类群概述", show: !!taxon.description },
          { id: "section-morphology", label: "形态·生境", show: !!(taxon.morphology || taxon.habitat || taxon.distribution) },
          { id: "section-profile", label: "科学档案", show: !!(taxon.etymology || taxon.discovery || taxon.genomeInfo || taxon.ecologyRole || taxon.researchValue) },
          { id: "section-conservation", label: "保护状况", show: !!taxon.conservation },
          { id: "section-databases", label: "科学数据库", show: true },
          { id: "section-cite", label: "引用格式", show: isSpecies },
        ].filter((a) => a.show);
        if (anchors.length < 3) return null;
        const jump = (id: string) => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        };
        return (
          <nav aria-label="条目分节导航" className="sticky top-16 z-20 -mx-1 mt-4 rounded-xl border border-foreground/10 bg-card/95 px-2.5 py-2 shadow-sm backdrop-blur">
            <ul className="flex items-center gap-1.5 overflow-x-auto nh-scroll">
              {anchors.map((a) => (
                <li key={a.id}>
                  <button
                    onClick={() => jump(a.id)}
                    className="rounded-full border border-foreground/10 bg-muted/40 px-3 py-1 text-xs font-semibold whitespace-nowrap text-muted-foreground transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary active:scale-95"
                  >
                    {a.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        );
      })()}

      {/* ====== 内容 + 侧栏 ====== */}
      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_360px]">
        {/* 左列:正文 */}
        <div className="min-w-0 space-y-5">
          {taxon.description && (
            <SectionCard title={isSpecies ? "物种描述" : "类群概述"} icon={BookOpen} sectionId="section-description">
              {taxon.description}
            </SectionCard>
          )}

          {(taxon.morphology || taxon.habitat || taxon.distribution) && (
            <SectionCard title="形态、生境与分布" icon={Leaf} sectionId="section-morphology">
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

          {/* ====== 科学档案 SCIENTIFIC PROFILE ====== */}
          {(taxon.etymology || taxon.discovery || taxon.genomeInfo || taxon.ecologyRole || taxon.researchValue) && (
            <section id="section-profile" className="overflow-hidden scroll-mt-24 rounded-xl border border-primary/20 bg-card shadow-sm">
              <div className="flex items-center gap-2.5 border-b border-foreground/10 bg-primary/5 px-5 py-3.5">
                <ScrollText className="h-5 w-5 text-primary" />
                <h3 className="font-display text-base font-bold text-foreground">科学档案</h3>
                <span className="latin text-sm font-normal text-muted-foreground">Profilum Scientificum</span>
              </div>
              <dl className="grid gap-0 px-5 py-4 sm:grid-cols-2">
                {[
                  { key: "etymology", label: "学名词源", la: "Etymologia", icon: BookMarked, text: taxon.etymology },
                  { key: "discovery", label: "发现与定名史", la: "Detectio", icon: Compass, text: taxon.discovery },
                  { key: "genomeInfo", label: "基因组概况", la: "Genoma", icon: Dna, text: taxon.genomeInfo },
                  { key: "ecologyRole", label: "生态位与作用", la: "Oecologia", icon: Network, text: taxon.ecologyRole },
                  { key: "researchValue", label: "科研与经济价值", la: "Utilitas", icon: FlaskConical, text: taxon.researchValue },
                ].map(
                  (row) =>
                    row.text && (
                      <div
                        key={row.key}
                        className="profile-row relative border-b border-foreground/5 py-3 pl-9 pr-3 last:border-b-0 sm:border-b-0 sm:odd:border-r sm:odd:border-foreground/5 [&:nth-last-child(-n+1)]:border-b-0"
                      >
                        <row.icon className="absolute left-0 top-3.5 h-4.5 w-4.5 text-primary/60" />
                        <dt className="flex items-baseline gap-2">
                          <span className="text-xs font-bold tracking-widest text-muted-foreground">{row.label}</span>
                          <span className="latin text-[11px] font-normal italic text-primary/50">{row.la}</span>
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-foreground/90">{row.text}</dd>
                      </div>
                    )
                )}
              </dl>
            </section>
          )}

          {iucn && taxon.conservation && (
            <SectionCard title="保护状况" icon={Shield} sectionId="section-conservation">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => openRedlist({ iucn: taxon.conservation })}
                  title="跳转到红色名录专题,查看该等级全部物种"
                  className={cn(
                    "rounded-md px-3 py-1.5 font-display text-lg font-bold text-white shadow-sm transition-transform hover:scale-[1.03] active:scale-95",
                    iucn.bg
                  )}
                >
                  {taxon.conservation}
                </button>
                <div>
                  <p className="font-semibold text-foreground">{iucn.full}</p>
                  <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
                    依据 IUCN 红色名录等级:极危(CR)与濒危(EN)物种面临野外灭绝的高风险;
                    图鉴中 {data.counts.speciesCount >= 0 && "收录的该等级物种均附红色名录直链,可查最新评估。"}
                  </p>
                  <button
                    onClick={() => openRedlist({ iucn: taxon.conservation })}
                    className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-red-700 transition-colors hover:text-red-600 hover:underline dark:text-red-400 dark:hover:text-red-300"
                  >
                    查看红色名录中该等级的全部物种 →
                  </button>
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
          {/* 分类地位卡:演化谱系时间轴 */}
          <section className="rounded-xl border border-foreground/10 bg-card p-5 shadow-sm">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold">
              <GitBranch className="h-4.5 w-4.5 text-primary" />
              演化谱系
              <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                {lineage.length + 1} 级
              </span>
            </h2>
            <p className="mt-1 mb-3.5 text-[11px] leading-4 text-muted-foreground">
              从域到种的分类下潜路径——每一步都是一次演化分岔
            </p>
            <Separator className="mb-4" />
            <LineageTimeline
              lineage={lineage}
              current={{ id: taxon.id, rank: taxon.rank, latinName: taxon.latinName, chineseName: taxon.chineseName }}
              kingdom={taxon.kingdom}
              speciesCountById={speciesCountById}
              onNavigate={explore}
            />
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
          <section id="section-databases" className="scroll-mt-24 rounded-xl border border-foreground/10 bg-card p-5 shadow-sm">
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

          {/* 引用格式(物种) */}
          {isSpecies && (
            <section id="section-cite" className="scroll-mt-24 rounded-xl border border-foreground/10 bg-card p-5 shadow-sm">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold">
                <Quote className="h-4.5 w-4.5 text-primary" />
                引用格式
                <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                  CITATIO
                </span>
              </h2>
              <Separator className="my-3.5" />
              <div className="space-y-3">
                {(() => {
                  const retrieveDate = new Date().toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" });
                  const taxoCite = `${taxon.latinName}${taxon.authority ? ` ${taxon.authority}` : ""}`;
                  const fullCite = `${taxon.chineseName} ${taxoCite}. 载于: BioCodex 生物图鉴[在线图鉴]. 检索于 ${retrieveDate}.`;
                  const pageUrl = `${window.location.origin}${window.location.pathname}#taxon=${taxon.id}`;
                  const onCopy = async (text: string, label: string) => {
                    const ok = await copyText(text);
                    if (ok) toast.success(`已复制${label}`, { description: text.length > 60 ? text.slice(0, 60) + "…" : text });
                    else setCiteFallback(text);
                  };
                  return (
                    <>
                      <div>
                        <p className="mb-1 flex items-center gap-1 text-[10px] font-bold tracking-widest text-muted-foreground">
                          分类学引用 · 学名+命名人
                        </p>
                        <div className="flex items-center justify-between gap-2 rounded-lg border border-foreground/10 bg-muted/30 px-3 py-2">
                          <p className="latin min-w-0 truncate text-sm italic text-foreground/90">{taxoCite}</p>
                          <button
                            onClick={() => onCopy(taxoCite, "学名引用")}
                            aria-label="复制学名引用"
                            className="flex h-7 shrink-0 items-center gap-1 rounded-full border border-foreground/15 bg-card px-2 text-[11px] font-semibold text-muted-foreground transition-all hover:border-primary/40 hover:text-primary"
                          >
                            <Copy className="h-3 w-3" />
                            复制
                          </button>
                        </div>
                      </div>
                      <div>
                        <p className="mb-1 flex items-center gap-1 text-[10px] font-bold tracking-widest text-muted-foreground">
                          图鉴条目引用 · 引用本页
                        </p>
                        <div className="rounded-lg border border-foreground/10 bg-muted/30 px-3 py-2">
                          <p className="text-[13px] leading-6 text-foreground/85">
                            {taxon.chineseName} <span className="latin italic">{taxon.latinName}</span>
                            {taxon.authority ? ` ${taxon.authority}. ` : ". "}
                            载于: BioCodex 生物图鉴[在线图鉴]. 检索于 {retrieveDate}.
                          </p>
                          <button
                            onClick={() => onCopy(fullCite, "完整引用")}
                            className="mt-2 flex h-7 items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-3 text-[11px] font-semibold text-primary transition-all hover:bg-primary/20"
                          >
                            <Copy className="h-3 w-3" />
                            复制完整引用
                          </button>
                          <button
                            onClick={() => onCopy(pageUrl, "本页链接")}
                            className="mt-2 ml-2 flex h-7 items-center gap-1 rounded-full border border-foreground/15 bg-card px-3 text-[11px] font-semibold text-muted-foreground transition-all hover:border-primary/40 hover:text-primary"
                          >
                            <Link2 className="h-3 w-3" />
                            复制本页链接
                          </button>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            </section>
          )}

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

      {/* 引用复制失败的手动复制兜底 */}
      <ShareDialog
        open={citeFallback !== null}
        onOpenChange={(o) => {
          if (!o) setCiteFallback(null);
        }}
        title="手动复制引用"
        text={citeFallback ?? ""}
      />

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
