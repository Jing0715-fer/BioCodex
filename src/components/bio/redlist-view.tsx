"use client";

import { useBioStore, MAX_COMPARE } from "@/lib/bio-store";
import { useSpeciesBrowse, useStats, type SpeciesItem } from "@/hooks/use-bio";
import { KINGDOM_THEME, IUCN_INFO } from "@/lib/bio-domain";
import { SpeciesCard } from "./species-card";
import { KingdomOrnament } from "./kingdom-ornament";
import { KingdomIcon } from "./taxa-icon";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Shield, ChevronDown, ArrowRight, GitCompareArrows, Filter } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

/** 受威胁等级(红色名录主线,按危机程度排序) */
const THREAT_LEVELS = ["EW", "CR", "EN", "VU"] as const;
/** 低危等级(折叠区,默认收起) */
const LOWER_LEVELS = ["NT", "LC"] as const;
const ALL_LEVELS = [...THREAT_LEVELS, ...LOWER_LEVELS];
/** 六大家族固定顺序(用于界筛选胶囊排序) */
const KINGDOM_ORDER = ["Animalia", "Plantae", "Fungi", "Protista", "Bacteria", "Archaea"];

const LEVEL_DESC: Record<string, string> = {
  EW: "野外灭绝 · 仅存于人工圈养或栽培",
  CR: "极危 · 面临灭绝风险的最高级别",
  EN: "濒危 · 野生种群快速衰退",
  VU: "易危 · 种群趋势持续下滑",
  NT: "近危 · 接近受威胁阈值",
  LC: "无危 · 种群总体平稳",
};

function LevelSection({
  code,
  species,
  loading,
  index,
  focused,
  onCompareAll,
}: {
  code: string;
  species: SpeciesItem[];
  loading: boolean;
  index: number;
  focused: boolean;
  onCompareAll: (items: SpeciesItem[]) => void;
}) {
  const info = IUCN_INFO[code];
  const sectionRef = useRef<HTMLElement>(null);

  // 被聚焦(从详情页跳入)时滚动到视口并短暂呼吸高亮
  useEffect(() => {
    if (!focused) return;
    const t = window.setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 350);
    return () => window.clearTimeout(t);
  }, [focused]);

  if (!loading && species.length === 0) return null;
  return (
    <section
      ref={sectionRef}
      aria-label={`${info?.label ?? code}分组`}
      className={cn(
        "mt-8 first:mt-0 scroll-mt-24 rounded-xl transition-shadow duration-700",
        focused && "animate-[pulse-ring_2.4s_ease-in-out_2] ring-2 ring-red-400/60 ring-offset-4 ring-offset-background"
      )}
    >
      <div className="mb-3.5 flex flex-wrap items-center gap-3">
        <span
          className={cn(
            "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-bold text-white shadow-sm",
            info?.bg
          )}
        >
          <Shield className="h-4 w-4" />
          {code} · {info?.label}
        </span>
        <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-semibold tabular-nums text-muted-foreground">
          {species.length} 种
        </span>
        <span className="hidden text-xs text-muted-foreground/70 sm:block">{LEVEL_DESC[code]}</span>
        <span className="hidden h-px flex-1 bg-foreground/10 sm:block" />
        {species.length >= 2 && (
          <button
            onClick={() => onCompareAll(species)}
            className="flex items-center gap-1 rounded-full border border-foreground/15 bg-card px-2.5 py-1 text-[11px] font-semibold text-muted-foreground shadow-sm transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
            title={`把该等级前 ${Math.min(species.length, MAX_COMPARE)} 个物种加入对比托盘`}
          >
            <GitCompareArrows className="h-3 w-3" />
            全部加入对比
          </button>
        )}
      </div>
      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: Math.min(6, 8) }).map((_, i) => (
            <Skeleton key={i} className="aspect-[5/4] rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {species.map((s, i) => (
            <SpeciesCard key={s.id} species={s} index={index + i} />
          ))}
        </div>
      )}
    </section>
  );
}

export function RedlistView() {
  const { openBrowse, redlistFocus, redlistKingdom, patchRedlist, compareIds, toggleCompare } = useBioStore();
  const { data: stats } = useStats();
  const [lowerOpen, setLowerOpen] = useState(false);

  // 聚焦等级属于低危组时派生展开(避免 effect 内 setState);手动收起会顺带清除聚焦
  const focusInLower = !!(redlistFocus && (LOWER_LEVELS as readonly string[]).includes(redlistFocus));
  const showLower = lowerOpen || focusInLower;

  // 并行拉取各等级物种(固定顺序的 hook 调用,避免 map 内 hook)
  const ew = useSpeciesBrowse({ iucn: "EW", sort: "iucn" });
  const cr = useSpeciesBrowse({ iucn: "CR", sort: "iucn" });
  const en = useSpeciesBrowse({ iucn: "EN", sort: "iucn" });
  const vu = useSpeciesBrowse({ iucn: "VU", sort: "iucn" });
  const nt = useSpeciesBrowse({ iucn: "NT", sort: "iucn" });
  const lc = useSpeciesBrowse({ iucn: "LC", sort: "iucn" });

  const queryOf = (code: string) =>
    code === "EW" ? ew : code === "CR" ? cr : code === "EN" ? en : code === "VU" ? vu : code === "NT" ? nt : lc;

  const byCode = (code: string): { items: SpeciesItem[]; loading: boolean } => {
    const q = queryOf(code);
    const all = q.data?.pages?.[0]?.items ?? [];
    return { items: redlistKingdom ? all.filter((s) => s.kingdom === redlistKingdom) : all, loading: q.isLoading };
  };

  // 汇总六组的全部物种,统计各界受评估数(界筛选胶囊用);数据量小,直接计算
  const kingdomChips = (() => {
    const counts = new Map<string, number>();
    for (const code of ALL_LEVELS) {
      for (const s of queryOf(code).data?.pages?.[0]?.items ?? []) {
        counts.set(s.kingdom, (counts.get(s.kingdom) ?? 0) + 1);
      }
    }
    return KINGDOM_ORDER.filter((k) => counts.get(k)).map((k) => ({
      key: k,
      count: counts.get(k) ?? 0,
      theme: KINGDOM_THEME[k] || KINGDOM_THEME.Animalia,
    }));
  })();

  const threatenedTotal = THREAT_LEVELS.reduce((n, c) => n + byCode(c).items.length, 0);
  const assessed = stats?.iucn?.reduce((n, x) => n + x.count, 0) ?? 62;
  const speciesTotal = stats?.species ?? 311;

  const onCompareAll = (items: SpeciesItem[]) => {
    let added = 0;
    for (const s of items) {
      if (compareIds.length + added >= MAX_COMPARE) break;
      if (!compareIds.includes(s.id) && toggleCompare(s.id) === "added") added++;
    }
    if (added > 0) {
      toast.success(`已把 ${added} 个物种加入对比托盘`, { description: `托盘 ${compareIds.length + added}/${MAX_COMPARE}` });
    } else {
      toast.info("该分组物种都已在对比托盘里");
    }
  };

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 pb-12 pt-6 sm:px-6">
      {/* 标题区 */}
      <div className="reveal-up">
        <p className="flex items-center gap-2 text-[11px] font-bold tracking-[0.25em] text-red-700/80 dark:text-red-400/80">
          <Shield className="h-3.5 w-3.5" />
          RUBRUM INDEX
        </p>
        <h1 className="mt-1.5 font-display text-3xl font-bold text-foreground sm:text-4xl">
          红色名录专题
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          按 IUCN 受威胁等级归集图鉴中的物种——从野外灭绝到易危,
          每一份标本都对应一份正在消逝的野外居群。
        </p>
      </div>

      {/* 危机统计带 */}
      <div className="reveal-up mt-6 overflow-hidden rounded-xl border border-red-200/60 bg-gradient-to-r from-red-50 to-amber-50/40 shadow-sm dark:border-red-900/40 dark:from-red-950/30 dark:to-amber-950/20">
        <div className="grid grid-cols-2 gap-px sm:grid-cols-4">
          <div className="flex flex-col items-center gap-0.5 bg-card/60 px-4 py-4 backdrop-blur-sm">
            <span className="font-display text-2xl font-bold tabular-nums text-red-700 dark:text-red-400">
              {threatenedTotal}
            </span>
            <span className="text-[11px] font-medium text-muted-foreground">受威胁物种(EW+CR+EN+VU)</span>
          </div>
          <div className="flex flex-col items-center gap-0.5 bg-card/60 px-4 py-4 backdrop-blur-sm">
            <span className="font-display text-2xl font-bold tabular-nums text-foreground">
              {assessed}
            </span>
            <span className="text-[11px] font-medium text-muted-foreground">已评估 · 占收录 {speciesTotal} 种</span>
          </div>
          <div className="flex flex-col items-center gap-0.5 bg-card/60 px-4 py-4 backdrop-blur-sm">
            <span className="font-display text-2xl font-bold tabular-nums text-red-700 dark:text-red-400">
              {byCode("CR").items.length}
            </span>
            <span className="text-[11px] font-medium text-muted-foreground">极危 CR · 命悬一线</span>
          </div>
          <div className="flex flex-col items-center gap-0.5 bg-card/60 px-4 py-4 backdrop-blur-sm">
            <span className="font-display text-2xl font-bold tabular-nums text-red-600 dark:text-red-400">
              {byCode("EW").items.length}
            </span>
            <span className="text-[11px] font-medium text-muted-foreground">野外灭绝 EW · 仅存照护</span>
          </div>
        </div>
        {/* 等级占比纹章条 */}
        <div className="flex h-2 w-full overflow-hidden" aria-hidden>
          {stats?.iucn
            ?.filter((x) => THREAT_LEVELS.includes(x.code as (typeof THREAT_LEVELS)[number]))
            .map((x) => (
              <span
                key={x.code}
                className="h-full"
                style={{
                  width: `${(x.count / Math.max(1, threatenedTotal)) * 100}%`,
                  background: IUCN_INFO[x.code]?.bg,
                }}
              />
            ))}
        </div>
      </div>

      {/* 界筛选 + 聚焦等级提示 */}
      <div className="reveal-up mt-6 flex flex-col gap-3 rounded-xl border border-foreground/10 bg-card px-4 py-3.5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 flex items-center gap-1 text-[11px] font-bold tracking-widest text-muted-foreground">
            <Filter className="h-3 w-3" />
            按界筛选
          </span>
          <button
            onClick={() => patchRedlist({ kingdom: null })}
            aria-pressed={redlistKingdom === null}
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-semibold transition-all",
              redlistKingdom === null
                ? "bg-red-700 text-white shadow-sm dark:bg-red-600"
                : "border border-foreground/15 bg-muted/40 text-muted-foreground hover:border-red-400/40 hover:text-foreground"
            )}
          >
            全部界 · {ALL_LEVELS.reduce((n, c) => n + (queryOf(c).data?.pages?.[0]?.items.length ?? 0), 0)}
          </button>
          {kingdomChips.map(({ key, count, theme }) => {
            const active = redlistKingdom === key;
            return (
              <button
                key={key}
                onClick={() => patchRedlist({ kingdom: active ? null : key })}
                aria-pressed={active}
                title={`${theme.name}受评估物种 ${count} 种`}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition-all",
                  active
                    ? "text-white shadow-sm"
                    : "border border-foreground/15 bg-muted/40 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                )}
                style={active ? { background: theme.color } : undefined}
              >
                <KingdomIcon kingdom={key} className="h-3 w-3" style={active ? undefined : { color: theme.color }} />
                {theme.name}
                <span className={cn("tabular-nums", active ? "text-white/85" : "text-muted-foreground/70")}>{count}</span>
              </button>
            );
          })}
        </div>
        {redlistFocus && (
          <button
            onClick={() => patchRedlist({ iucn: null })}
            className="flex shrink-0 items-center gap-1.5 self-start rounded-full bg-red-500/10 px-3 py-1 text-[11px] font-bold text-red-700 transition-colors hover:bg-red-500/20 dark:text-red-400 sm:self-auto"
            title="清除聚焦,回到等级总览"
          >
            <Shield className="h-3 w-3" />
            正在聚焦 {redlistFocus} · {IUCN_INFO[redlistFocus]?.label} 分组(点击清除)
          </button>
        )}
      </div>

      {/* 受威胁分组 */}
      <div className="mt-8">
        <h2 className="font-display text-xl font-bold text-foreground">受威胁等级</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          按危机程度从高到低排列,卡片可加入对比或收藏{redlistKingdom ? ";已按界过滤" : ""}
        </p>
        {THREAT_LEVELS.map((code, i) => {
          const { items, loading } = byCode(code);
          return (
            <LevelSection
              key={code}
              code={code}
              species={items}
              loading={loading}
              index={i * 12}
              focused={redlistFocus === code}
              onCompareAll={onCompareAll}
            />
          );
        })}
      </div>

      {/* 低危折叠区 */}
      <div className="mt-10 border-t border-foreground/10 pt-6">
        <button
          className="group flex w-full items-center justify-between gap-3 rounded-xl border border-foreground/10 bg-card px-4 py-3 text-left shadow-sm transition-colors hover:bg-muted/40"
          onClick={() => {
            const target = !showLower;
            if (focusInLower) patchRedlist({ iucn: null }); // 手动接管,释放聚焦
            setLowerOpen(target);
          }}
          aria-expanded={showLower}
          aria-label={showLower ? "收起低危等级分组" : "展开低危等级分组"}
        >
          <span className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">
              <Shield className="h-4 w-4" />
            </span>
            <span>
              <span className="block font-display text-base font-bold text-foreground">
                低危与近危等级(NT / LC)
              </span>
              <span className="block text-xs text-muted-foreground">
                {LOWER_LEVELS.map((c) => `${byCode(c).items.length}`).join(" + ")} 种 · 种群相对平稳,默认收起
              </span>
            </span>
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300",
              showLower && "rotate-180"
            )}
          />
        </button>
        <AnimatePresence initial={false}>
          {showLower && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="pt-2">
                {LOWER_LEVELS.map((code, i) => {
                  const { items, loading } = byCode(code);
                  return (
                    <LevelSection
                      key={code}
                      code={code}
                      species={items}
                      loading={loading}
                      index={i * 12}
                      focused={redlistFocus === code}
                      onCompareAll={onCompareAll}
                    />
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 底部提示 */}
      <div className="mt-10 flex flex-col items-center gap-3 rounded-xl border border-dashed border-foreground/15 bg-muted/20 px-6 py-8 text-center">
        <KingdomOrnament kingdom="Animalia" className="h-6 w-28 opacity-20" style={{ color: "#b91c1c" }} />
        <p className="max-w-lg text-xs leading-5 text-muted-foreground">
          保护等级与种群数据参照 IUCN 红色名录等级体系(EW/CR/EN/VU/NT/LC),以收录时点评估为准;
          每张物种卡片可直达详情页查看科学数据库链接与保护现状原文。
        </p>
        <Button variant="outline" size="sm" className="h-9 gap-1.5 rounded-full" onClick={() => openBrowse({})}>
          在图鉴目录按等级自由筛选
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
