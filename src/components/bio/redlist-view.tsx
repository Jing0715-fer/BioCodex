"use client";

import { useBioStore } from "@/lib/bio-store";
import { useSpeciesBrowse, useStats, type SpeciesItem } from "@/hooks/use-bio";
import { KINGDOM_THEME, IUCN_INFO } from "@/lib/bio-domain";
import { SpeciesCard } from "./species-card";
import { KingdomOrnament } from "./kingdom-ornament";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Shield, ChevronDown, ArrowRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

/** 受威胁等级(红色名录主线,按危机程度排序) */
const THREAT_LEVELS = ["EW", "CR", "EN", "VU"] as const;
/** 低危等级(折叠区,默认收起) */
const LOWER_LEVELS = ["NT", "LC"] as const;

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
}: {
  code: string;
  species: SpeciesItem[];
  loading: boolean;
  index: number;
}) {
  const info = IUCN_INFO[code];
  if (!loading && species.length === 0) return null;
  return (
    <section className="mt-8 first:mt-0" aria-label={`${info?.label ?? code}分组`}>
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
  const { openBrowse } = useBioStore();
  const { data: stats } = useStats();
  const [lowerOpen, setLowerOpen] = useState(false);

  // 并行拉取各等级物种(固定顺序的 hook 调用,避免 map 内 hook)
  const ew = useSpeciesBrowse({ iucn: "EW", sort: "iucn" });
  const cr = useSpeciesBrowse({ iucn: "CR", sort: "iucn" });
  const en = useSpeciesBrowse({ iucn: "EN", sort: "iucn" });
  const vu = useSpeciesBrowse({ iucn: "VU", sort: "iucn" });
  const nt = useSpeciesBrowse({ iucn: "NT", sort: "iucn" });
  const lc = useSpeciesBrowse({ iucn: "LC", sort: "iucn" });

  const byCode = (code: string): { items: SpeciesItem[]; loading: boolean } => {
    const q =
      code === "EW" ? ew : code === "CR" ? cr : code === "EN" ? en : code === "VU" ? vu : code === "NT" ? nt : lc;
    return { items: q.data?.pages?.[0]?.items ?? [], loading: q.isLoading };
  };

  const threatenedTotal = THREAT_LEVELS.reduce((n, c) => n + byCode(c).items.length, 0);
  const assessed = stats?.iucn?.reduce((n, x) => n + x.count, 0) ?? 62;
  const speciesTotal = stats?.species ?? 311;

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

      {/* 受威胁分组 */}
      <div className="mt-8">
        <h2 className="font-display text-xl font-bold text-foreground">受威胁等级</h2>
        <p className="mt-1 text-xs text-muted-foreground">按危机程度从高到低排列,卡片可加入对比或收藏</p>
        {THREAT_LEVELS.map((code, i) => {
          const { items, loading } = byCode(code);
          return (
            <LevelSection
              key={code}
              code={code}
              species={items}
              loading={loading}
              index={i * 12}
            />
          );
        })}
      </div>

      {/* 低危折叠区 */}
      <div className="mt-10 border-t border-foreground/10 pt-6">
        <button
          className="group flex w-full items-center justify-between gap-3 rounded-xl border border-foreground/10 bg-card px-4 py-3 text-left shadow-sm transition-colors hover:bg-muted/40"
          onClick={() => setLowerOpen((v) => !v)}
          aria-expanded={lowerOpen}
          aria-label={lowerOpen ? "收起低危等级分组" : "展开低危等级分组"}
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
              lowerOpen && "rotate-180"
            )}
          />
        </button>
        <AnimatePresence initial={false}>
          {lowerOpen && (
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
