"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useBioStore } from "@/lib/bio-store";
import { useStats, useFeatured, useTree, useRecent, type TreeNodeDTO } from "@/hooks/use-bio";
import { KINGDOM_THEME, IUCN_INFO } from "@/lib/bio-domain";
import { useViewHistory, relativeTime, clearHistory } from "@/lib/view-history";
import { useFavorites } from "@/lib/favorites";
import { KingdomIcon } from "./taxa-icon";
import { KingdomOrnament } from "./kingdom-ornament";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowRight, ChevronRight, Sparkles, Dna, BookOpen, Shield, Database, Shuffle, RefreshCw, LayoutGrid, History, Footprints, Trash2, Bookmark,
} from "lucide-react";
import { cn } from "@/lib/utils";

function useCountUp(target: number, duration = 900) {
  const [v, setV] = useState(0);
  const ref = useRef<number>(0);
  useEffect(() => {
    const start = performance.now();
    const from = ref.current;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(from + (target - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
      else ref.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return v;
}

function StatCounter({ value, label, suffix }: { value: number; label: string; suffix?: string }) {
  const v = useCountUp(value);
  return (
    <div className="flex flex-col items-center px-4 py-3 sm:items-start">
      <span className="font-display text-3xl font-bold tabular-nums text-foreground sm:text-4xl">
        {v.toLocaleString()}
        {suffix}
      </span>
      <span className="mt-1 text-xs tracking-widest text-muted-foreground">{label}</span>
    </div>
  );
}

/** 环形进度指示(数据完备度徽章墙用) */
function DataRing({
  value, total, label, hint, color,
}: { value: number; total: number; label: string; hint: string; color: string }) {
  const pct = total > 0 ? value / total : 0;
  const v = useCountUp(Math.round(pct * 100));
  const R = 30;
  const C = 2 * Math.PI * R;
  return (
    <div className="flex flex-col items-center gap-2.5 px-2 py-4 text-center">
      <div className="relative h-[76px] w-[76px]">
        <svg viewBox="0 0 76 76" className="h-full w-full -rotate-90">
          <circle cx="38" cy="38" r={R} fill="none" strokeWidth="7" className="stroke-foreground/10" />
          <circle
            cx="38" cy="38" r={R} fill="none" strokeWidth="7" strokeLinecap="round"
            stroke={color}
            strokeDasharray={C}
            strokeDashoffset={C * (1 - pct)}
            style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(.25,.1,.25,1)" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-lg font-bold tabular-nums leading-none text-foreground">{v}%</span>
        </div>
      </div>
      <div>
        <p className="text-xs font-bold tracking-wide text-foreground">{label}</p>
        <p className="mt-0.5 text-[10px] tabular-nums text-muted-foreground">
          {value} / {total} · {hint}
        </p>
      </div>
    </div>
  );
}

export function HomeView() {
  const { explore, openTaxon, setAgentOpen, openBrowse, openFavorites, openRedlist } = useBioStore();
  const { data: stats } = useStats();
  const { data: featured, refetch: refetchFeatured } = useFeatured();
  const { data: tree } = useTree();
  const { data: recent } = useRecent(12);
  const history = useViewHistory();
  const favorites = useFavorites();

  // 随机漫游(摇号动效):中奖结果一次拉取,滚动画面从本地候选池循环采样,避免连发 API
  const [rand, setRand] = useState<{ id: string; chineseName: string; latinName: string; image: string | null; kingdom?: string | null } | null>(null);
  const [rolling, setRolling] = useState(false);
  const [spinShow, setSpinShow] = useState<typeof rand>(null);
  const rollTimers = useRef<number[]>([]);
  useEffect(() => () => rollTimers.current.forEach((t) => clearTimeout(t)), []);
  const roll = async () => {
    if (rolling) return;
    setRolling(true);
    // 候选池:旗舰精选(本地已有,无额外请求)
    const pool = (featured || []).map((f) => ({
      id: f.id, chineseName: f.chineseName, latinName: f.latinName, image: f.image, kingdom: f.kingdom,
    }));
    // 先取中奍号(一次请求)
    let winner: typeof rand = null;
    try {
      const r = await fetch("/api/random").then((x) => x.json());
      if (r?.success) winner = r.taxon;
    } catch { /* 网络异常时仅滚动不揭幕 */ }
    if (!pool.length && !winner) { setRolling(false); return; }
    // 老虎机式减速序列:间隔从 55ms 递增到 260ms,共 ~1.6s
    const steps = [55, 60, 65, 70, 78, 88, 100, 115, 135, 160, 195, 240, 260];
    let t = 0;
    let cursor = Math.floor(Math.random() * Math.max(pool.length, 1));
    for (const gap of steps) {
      t += gap;
      const idx = cursor;
      rollTimers.current.push(
        window.setTimeout(() => {
          const item = pool.length ? pool[idx % pool.length] : winner;
          setSpinShow(item);
        }, t)
      );
      cursor += 1 + Math.floor(Math.random() * 2);
    }
    // 揭幕:落在中奖物种上
    rollTimers.current.push(
      window.setTimeout(() => {
        setSpinShow(null);
        setRand(winner);
        setRolling(false);
      }, t + 300)
    );
  };

  const kingdomOrder = ["Bacteria", "Archaea", "Protista", "Fungi", "Plantae", "Animalia"];
  // 递归查找界/域节点(真核四界嵌套在 Eukarya 域下,顶层找不到)
  const findTreeNode = (nodes: TreeNodeDTO[] | undefined, la: string): TreeNodeDTO | null => {
    if (!nodes) return null;
    for (const n of nodes) {
      if (n.la === la) return n;
      const r = findTreeNode(n.ch, la);
      if (r) return r;
    }
    return null;
  };
  // 递归统计子树条目数(不含自身)
  const countTaxa = (n: TreeNodeDTO): number => (n.ch ?? []).reduce((acc, c) => acc + 1 + countTaxa(c), 0);
  // 六界卡迷你条形图:取该界/域下物种数 Top3 的子门(原核域为直接子门,真核界为其子门)
  const topChildren = (n: TreeNodeDTO | null, count = 3) =>
    (n?.ch ?? [])
      .slice()
      .sort((a, b) => b.sc - a.sc)
      .slice(0, count)
      .filter((c) => c.sc > 0)
      .map((c) => ({ cn: c.cn, la: c.la, sc: c.sc, id: c.id }));
  const kingdomCards = kingdomOrder
    .map((k) => {
      const t = KINGDOM_THEME[k];
      const node = findTreeNode(tree, k);
      const stat = stats?.kingdoms.find((s) => s.kingdom === k);
      // 条目数优先取树数据递归统计(stats.kingdoms 仅含三域,真核四界缺失)
      const taxa = node ? countTaxa(node) : stat?.taxa ?? 0;
      const bars = topChildren(node);
      const barMax = Math.max(...bars.map((b) => b.sc), 1);
      return { k, t, node, species: node?.sc ?? stat?.species ?? 0, taxa, bars, barMax };
    });

  return (
    <div className="flex flex-col">
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden border-b border-foreground/10 paper-texture">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/8 via-transparent to-transparent" />
        {/* 装饰:巨幅拉丁字母背景 */}
        <div className="pointer-events-none absolute -right-8 -top-10 select-none latin text-[22vw] font-bold leading-none text-foreground/[0.045] dark:text-foreground/[0.06]">
          Bio
        </div>
        <div className="relative mx-auto max-w-[1400px] px-4 pb-12 pt-14 sm:px-6 sm:pt-20">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-xs font-medium text-primary dark:bg-primary/10">
              <BookOpen className="h-3.5 w-3.5" />
              专业生物学百科 · 域界门纲目科属种
            </div>
            <h1 className="font-display text-4xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-6xl">
              从一粒细菌,
              <br />
              到万千生灵<span className="text-primary">。</span>
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
              BioCodex 收录 <strong className="font-semibold text-foreground">{stats?.species ?? "…"}</strong>{" "}
              个物种,覆盖生命之树从原核生物到高等脊椎动物的主要门类。
              每个条目配有拉丁学名、形态描述、IUCN 保护等级,并直连{" "}
              <span className="latin">NCBI</span>、GBIF、GenBank 等科学数据库。
              遇到问题?右下角的 AI 博物学家阿博随时待命。
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button size="lg" className="h-11 gap-2 rounded-full" onClick={() => explore(null)}>
                <Sparkles className="h-4 w-4" />
                开始分类探索
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-11 gap-2 rounded-full border-forest/40 text-forest hover:bg-forest hover:text-primary-foreground"
                onClick={() => openBrowse({})}
              >
                <LayoutGrid className="h-4 w-4" />
                图鉴目录
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-11 gap-2 rounded-full border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={() => setAgentOpen(true)}
              >
                <Dna className="h-4 w-4" />
                问问 AI 助手
              </Button>
              {favorites.length > 0 && (
                <Button
                  size="lg"
                  variant="outline"
                  className="h-11 gap-2 rounded-full border-amber-500/40 text-amber-700 hover:bg-amber-500 hover:text-white dark:text-amber-400"
                  onClick={openFavorites}
                >
                  <Bookmark className="h-4 w-4" />
                  我的标本夹({favorites.length})
                </Button>
              )}
            </div>
          </div>

          {/* 生命之树版画横幅 */}
          <figure className="reveal-up relative mt-10 overflow-hidden rounded-xl border border-foreground/15 shadow-md">
            <img
              src="/generated/hero-tree-of-life.png"
              alt="生命之树复古铜版画:从微生物到哺乳动物的演化全景"
              className="img-fade-in h-44 w-full object-cover object-center sm:h-64 lg:h-72"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/55 via-transparent to-background/55" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/80 to-transparent" />
            <figcaption className="absolute bottom-3 left-5 flex items-center gap-2 text-xs text-foreground/70 dark:text-foreground/60">
              <span className="h-px w-6 bg-foreground/40" />
              <span className="latin text-sm">Arbor Vitae</span>
              <span>生命之树 · 从原核到哺乳的演化长卷</span>
            </figcaption>
          </figure>

          {/* 统计带 */}
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-foreground/10 bg-foreground/10 shadow-sm sm:grid-cols-3 lg:grid-cols-6">
            {[
              { v: stats?.species ?? 0, l: "收录物种" },
              { v: stats?.phyla ?? 0, l: "覆盖门类" },
              { v: stats?.families ?? 0, l: "科" },
              { v: stats?.genera ?? 0, l: "属" },
              { v: stats?.images ?? 0, l: "实景配图" },
              { v: stats?.flagship ?? 0, l: "旗舰物种" },
            ].map((s, i) => (
              <div key={i} className="bg-card">
                <StatCounter value={s.v} label={s.l} />
              </div>
            ))}
          </div>

          {/* 数据完备度徽章墙 */}
          {stats && (
            <div className="mt-4 overflow-hidden rounded-xl border border-foreground/10 bg-card shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-foreground/10 bg-muted/30 px-4 py-2.5">
                <p className="flex items-center gap-1.5 text-[11px] font-bold tracking-widest text-muted-foreground">
                  <Database className="h-3.5 w-3.5 text-primary/70" />
                  数据完备度 · DATA COMPLETENESS
                </p>
                <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 font-semibold text-amber-700 dark:text-amber-400">
                    <Shield className="h-3 w-3" />旗舰 {stats.flagship}
                  </span>
                  <span className="flex items-center gap-1 rounded-full border border-primary/25 bg-primary/5 px-2 py-0.5 font-semibold text-primary">
                    <Dna className="h-3 w-3" />NCBI 锚定 {stats.ncbiLinked}
                  </span>
                  <span className="flex items-center gap-1 rounded-full border border-foreground/15 bg-muted/40 px-2 py-0.5 font-semibold">
                    <Database className="h-3 w-3" />21+ 科学库直连
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 divide-y divide-foreground/8 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                <DataRing
                  value={stats.images}
                  total={stats.species}
                  label="物种配图"
                  hint="复古博物学插画"
                  color="var(--ring, #2f6b4f)"
                />
                <DataRing
                  value={stats.iucn.reduce((a, x) => a + x.count, 0)}
                  total={stats.species}
                  label="IUCN 评估"
                  hint="红色名录等级覆盖"
                  color="#b45309"
                />
                <DataRing
                  value={stats.ncbiLinked}
                  total={stats.species}
                  label="NCBI 锚定"
                  hint="直连分类学数据库"
                  color="#0d7a6b"
                />
              </div>
            </div>
          )}
        </div>
        <div className="dna-divider" />
      </section>

      {/* ============ 足迹接续(个性化回访) ============ */}
      {history.length > 0 && (
        <section className="border-b border-foreground/10 bg-amber-50/50 paper-texture dark:bg-amber-950/10" aria-label="足迹接续">
          <div className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-baseline gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-400">
                  <Footprints className="h-4 w-4" />
                </span>
                <h2 className="font-display text-lg font-bold text-foreground">
                  足迹接续
                  <span className="latin ml-1.5 text-sm font-normal text-muted-foreground">Ubi Relinquisti</span>
                </h2>
                <p className="hidden text-xs text-muted-foreground/80 sm:block">从上次停下的地方继续翻阅</p>
              </div>
              <button
                className="flex items-center gap-1 rounded-full px-2 py-1 text-[10px] text-muted-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground"
                onClick={() => clearHistory()}
              >
                <Trash2 className="h-3 w-3" />
                清除足迹
              </button>
            </div>
            <div className="nh-scroll -mx-1 flex gap-2.5 overflow-x-auto px-1 pb-1.5">
              {history.slice(0, 10).map((h, i) => {
                const theme = KINGDOM_THEME[h.kingdom] || KINGDOM_THEME.Animalia;
                return (
                  <button
                    key={h.id}
                    onClick={() => openTaxon(h.id)}
                    className="reveal-up group flex shrink-0 items-center gap-2.5 rounded-full border border-foreground/10 bg-card py-1.5 pl-1.5 pr-3.5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                    style={{ animationDelay: `${Math.min(i, 10) * 40}ms` }}
                    aria-label={`继续阅读:${h.chineseName}(${relativeTime(h.ts)})`}
                  >
                    {h.image ? (
                      <img
                        src={h.image}
                        alt={h.chineseName}
                        className="h-8 w-8 rounded-full object-cover ring-2"
                        style={{ "--tw-ring-color": `${theme.color}55` } as React.CSSProperties}
                        loading="lazy"
                      />
                    ) : (
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white"
                        style={{ background: theme.color }}
                        aria-hidden
                      >
                        <KingdomIcon kingdom={h.kingdom} className="h-3.5 w-3.5" />
                      </span>
                    )}
                    <span className="min-w-0 flex-col text-left leading-tight">
                      <span className="block max-w-28 truncate text-[13px] font-semibold text-foreground">
                        {h.chineseName}
                      </span>
                      <span className="block max-w-28 truncate text-[9px] tabular-nums text-muted-foreground/70">
                        {relativeTime(h.ts)}
                      </span>
                    </span>
                    <ChevronRight className="h-3 w-3 shrink-0 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5" />
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ============ 六大界 ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-4 py-12 sm:px-6">
        <div className="mb-6 flex items-baseline justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">生命三域,六大家族</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              沿现代三域系统漫游:细菌与古菌为原核之域,真核域下分原生生物、真菌、植物与动物
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {kingdomCards.map(({ k, t, node, species, taxa, bars, barMax }) => {
            const id = node?.id;
            return (
              <button
                key={k}
                onClick={() => id && explore(id)}
                className="specimen-card group relative overflow-hidden rounded-xl border border-foreground/10 bg-card p-5 text-left shadow-sm focus-visible:outline-2 focus-visible:outline-forest"
                aria-label={`进入${t.name}分类浏览`}
              >
                <div
                  className="absolute inset-x-0 top-0 h-1 opacity-80"
                  style={{ background: `linear-gradient(90deg, ${t.color}, ${t.color}88)` }}
                />
                {/* 界主题装饰纹样(右下角钢印) */}
                <KingdomOrnament
                  kingdom={k}
                  className="pointer-events-none absolute bottom-2.5 right-2.5 h-6 w-24 opacity-[0.16] transition-opacity duration-500 group-hover:opacity-30"
                  style={{ color: t.color }}
                />
                <div className="flex items-start justify-between">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-lg text-white shadow-sm"
                    style={{ background: t.color }}
                  >
                    <KingdomIcon kingdom={k} className="h-5.5 w-5.5" />
                  </span>
                  <span className="latin text-sm text-muted-foreground/70">{t.latin}</span>
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-foreground">{t.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{t.desc}</p>
                {/* 迷你条形图:下属门物种数 Top3 */}
                {bars.length > 0 && (
                  <div className="mt-3.5 space-y-1.5" aria-label="下属主要门类物种数">
                    {bars.map((b, bi) => (
                      <div key={b.id} className="flex items-center gap-2">
                        <span className="w-20 shrink-0 truncate text-[10px] text-muted-foreground" title={`${b.cn} · ${b.sc} 物种`}>
                          {b.cn}
                        </span>
                        <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-foreground/8">
                          <motion.span
                            className="block h-full rounded-full"
                            style={{ background: `linear-gradient(90deg, ${t.color}dd, ${t.color}99)` }}
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.max((b.sc / barMax) * 100, 12)}%` }}
                            transition={{ delay: 0.3 + bi * 0.12, duration: 0.5, ease: "easeOut" }}
                          />
                        </span>
                        <span className="w-4 text-right text-[10px] font-semibold tabular-nums text-muted-foreground/80">{b.sc}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-4 flex items-center gap-4 border-t border-foreground/10 pt-3 text-xs text-muted-foreground">
                  <span>
                    <strong className="font-display text-base font-bold tabular-nums text-foreground">{species}</strong>{" "}
                    物种
                  </span>
                  <span>
                    <strong className="font-display text-base font-bold tabular-nums text-foreground">{taxa}</strong>{" "}
                    条目
                  </span>
                  <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground/40 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ============ 旗舰物种 ============ */}
      <section className="border-y border-foreground/10 bg-muted/40 paper-texture">
        <div className="mx-auto w-full max-w-[1400px] px-4 py-12 sm:px-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                明星物种 <span className="latin text-lg text-muted-foreground">Flagship Species</span>
              </h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                从图鉴 84 个旗舰物种中精选——它们是演化奇迹、文化符号,也是保护行动的旗舰
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 rounded-full"
              onClick={() => refetchFeatured()}
            >
              <RefreshCw className="h-3.5 w-3.5" />
              换一批
            </Button>
          </div>

          {!featured && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="aspect-[4/3] rounded-xl" />
              ))}
            </div>
          )}

          {featured && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {featured.slice(0, 8).map((f, i) => (
                <button
                  key={f.id}
                  onClick={() => openTaxon(f.id)}
                  className={cn(
                    "specimen-card reveal-up group relative overflow-hidden rounded-xl border border-foreground/10 bg-card text-left shadow-sm"
                  )}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {f.image ? (
                      <img
                        src={f.image}
                        alt={f.chineseName}
                        className="img-fade-in h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className="flex h-full w-full items-center justify-center"
                        style={{
                          background: `linear-gradient(140deg, ${KINGDOM_THEME[f.kingdom]?.color}30, var(--parchment))`,
                        }}
                      >
                        <span className="latin text-5xl text-foreground/20">
                          {f.latinName.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0" />
                    <div className="absolute bottom-0 left-0 right-0 p-3.5">
                      <p className="font-display text-base font-bold text-white drop-shadow-sm">
                        {f.chineseName}
                      </p>
                      <p className="latin truncate text-xs text-white/85">{f.latinName}</p>
                    </div>
                    {f.conservation && (
                      <span
                        className={cn(
                          "absolute right-2.5 top-2.5 rounded-sm px-1.5 py-0.5 text-[10px] font-bold text-white shadow",
                          IUCN_INFO[f.conservation]?.bg
                        )}
                      >
                        {IUCN_INFO[f.conservation]?.label}
                      </span>
                    )}
                  </div>
                  {f.description && (
                    <p className="line-clamp-2 px-3.5 py-2.5 text-xs leading-5 text-muted-foreground">
                      {f.description}
                    </p>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============ 新页速递(最近配图时间线) ============ */}
      <section className="border-t border-foreground/10 bg-muted/30">
        <div className="mx-auto w-full max-w-[1400px] px-4 py-12 sm:px-6">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-foreground sm:text-3xl">
                <History className="h-6 w-6 text-primary" />
                新页速递
                <span className="latin text-lg font-normal text-muted-foreground">Novissima</span>
              </h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                图鉴最新收录与描绘的物种——画室的雕版与标本柜每天都在增添新页
              </p>
            </div>
            {/* 插画进度 */}
            <div className="min-w-52 rounded-xl border border-foreground/10 bg-card px-4 py-2.5 shadow-sm">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-xs text-muted-foreground">插画完成度</span>
                <span className="font-display text-sm font-bold tabular-nums text-foreground">
                  {stats?.images ?? 0}
                  <span className="text-muted-foreground/60">/{stats?.species ?? 0}</span>
                </span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-amber-600 transition-all duration-700"
                  style={{ width: `${stats ? Math.min(100, Math.round((stats.images / Math.max(1, stats.species)) * 100)) : 0}%` }}
                />
              </div>
            </div>
          </div>

          {!recent && (
            <div className="flex gap-3 overflow-hidden">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-40 w-36 shrink-0 rounded-xl sm:w-44" />
              ))}
            </div>
          )}

          {recent && recent.length > 0 && (
            <div className="nh-scroll -mx-1 flex gap-3 overflow-x-auto px-1 pb-2">
              {recent.map((r, i) => {
                const theme = KINGDOM_THEME[r.kingdom] || KINGDOM_THEME.Animalia;
                const d = new Date(r.updatedAt);
                const today = new Date();
                const isToday = d.toDateString() === today.toDateString();
                const yesterday = new Date(today.getTime() - 86400000);
                const timeStr = isToday
                  ? `今天 ${d.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}`
                  : d.toDateString() === yesterday.toDateString()
                    ? "昨天"
                    : d.toLocaleDateString("zh-CN", { month: "numeric", day: "numeric" });
                return (
                  <button
                    key={r.id}
                    onClick={() => openTaxon(r.id)}
                    className="reveal-up group relative w-36 shrink-0 overflow-hidden rounded-xl border border-foreground/10 bg-card text-left shadow-sm transition-shadow hover:shadow-md sm:w-44"
                    style={{ animationDelay: `${Math.min(i, 8) * 50}ms` }}
                    aria-label={`查看${r.chineseName}详情,${timeStr}更新`}
                  >
                    <div
                      className="h-1 opacity-80"
                      style={{ background: `linear-gradient(90deg, ${theme.color}, ${theme.color}66)` }}
                    />
                    <div className="relative h-24 overflow-hidden sm:h-28">
                      {r.image ? (
                        <img
                          src={r.image}
                          alt={r.chineseName}
                          className="img-fade-in h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div
                          className="flex h-full w-full items-center justify-center"
                          style={{ background: `linear-gradient(140deg, ${theme.color}26, var(--parchment))` }}
                        >
                          <span className="latin text-3xl text-foreground/20">{r.latinName.charAt(0)}</span>
                        </div>
                      )}
                      <span
                        className="absolute left-1.5 top-1.5 flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-bold text-white shadow"
                        style={{ background: theme.color }}
                      >
                        <KingdomIcon kingdom={r.kingdom} className="h-2.5 w-2.5" />
                        {theme.name}
                      </span>
                      {r.conservation && (
                        <span
                          className={cn(
                            "absolute right-1.5 top-1.5 rounded-sm px-1 py-0.5 text-[9px] font-bold text-white shadow",
                            IUCN_INFO[r.conservation]?.bg
                          )}
                        >
                          {r.conservation}
                        </span>
                      )}
                    </div>
                    <div className="p-2.5">
                      <p className="truncate text-[13px] font-semibold text-foreground group-hover:text-primary">
                        {r.chineseName}
                      </p>
                      <p className="latin truncate text-[11px] text-muted-foreground">{r.latinName}</p>
                      <p className="mt-1.5 flex items-center gap-1 text-[10px] tabular-nums text-muted-foreground/70">
                        <span className="h-1 w-1 rounded-full bg-primary/60" />
                        {timeStr} 描绘
                      </p>
                    </div>
                  </button>
                );
              })}
              <button
                onClick={() => openBrowse({})}
                className="flex w-36 shrink-0 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-foreground/15 bg-muted/20 text-muted-foreground transition-colors hover:border-primary/50 hover:bg-primary/5 hover:text-primary sm:w-44"
                aria-label="浏览图鉴目录"
              >
                <LayoutGrid className="h-5 w-5" />
                <span className="text-xs font-medium">浏览全部物种</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ============ 保护状况 + 数据库 + 玩法 ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-4 py-12 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-3">
          {/* IUCN 分布 */}
          <Card className="border-foreground/10 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <h3 className="font-display text-lg font-bold">IUCN 保护状况</h3>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                图鉴收录物种的红色名录分布,点击任意等级查看对应物种
              </p>
              <div className="mt-4 space-y-2">
                {stats?.iucn
                  .slice()
                  .sort((a, b) => {
                    const order = ["EX", "EW", "CR", "EN", "VU", "NT", "LC", "DD", "NE"];
                    return order.indexOf(a.code) - order.indexOf(b.code);
                  })
                  .map((i) => {
                    const total = stats.iucn.reduce((s, x) => s + x.count, 0) || 1;
                    const info = IUCN_INFO[i.code];
                    return (
                      <button
                        key={i.code}
                        onClick={() => openBrowse({ iucn: i.code })}
                        className="group flex w-full items-center gap-3 rounded-md px-1 py-0.5 text-left transition-colors hover:bg-accent/60"
                        aria-label={`浏览${info?.label ?? i.code}等级的 ${i.count} 个物种`}
                      >
                        <span className={cn("w-16 shrink-0 rounded-sm px-1.5 py-0.5 text-center text-[10px] font-bold text-white", info?.bg)}>
                          {i.code}
                        </span>
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                          <div
                            className={cn("h-full rounded-full transition-all group-hover:brightness-110", info?.bg)}
                            style={{ width: `${(i.count / total) * 100}%` }}
                          />
                        </div>
                        <span className="w-8 text-right text-xs tabular-nums text-muted-foreground group-hover:text-foreground">
                          {i.count}
                        </span>
                        <ChevronRight className="h-3 w-3 text-muted-foreground/0 transition-colors group-hover:text-primary" />
                      </button>
                    );
                  })}
              </div>
              {/* 红色名录专题入口 */}
              <button
                onClick={() => openRedlist()}
                className="group mt-4 flex w-full items-center justify-between gap-2 rounded-lg border border-red-200/60 bg-gradient-to-r from-red-50 to-transparent px-3 py-2.5 text-left transition-all hover:border-red-300 hover:shadow-sm dark:border-red-900/40 dark:from-red-950/30"
                aria-label="进入红色名录专题页"
              >
                <span className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-red-600/90 text-white shadow-sm">
                    <Shield className="h-3.5 w-3.5" />
                  </span>
                  <span>
                    <span className="block text-xs font-bold text-foreground">红色名录专题 Rubrum Index</span>
                    <span className="block text-[10px] text-muted-foreground">
                      {stats?.iucn?.filter((x) => ["EW", "CR", "EN", "VU"].includes(x.code)).reduce((s, x) => s + x.count, 0) ?? 39} 个受威胁物种按等级归集
                    </span>
                  </span>
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5 group-hover:text-red-600" />
              </button>
            </CardContent>
          </Card>

          {/* 数据库直连 */}
          <Card className="border-foreground/10 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-primary" />
                <h3 className="font-display text-lg font-bold">科学数据库直连</h3>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                每个条目一键跳转权威数据库,溯源基因组、序列与分布
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {["NCBI Taxonomy", "GenBank", "NCBI Genome", "Ensembl", "UniProt", "KEGG", "GBIF", "EOL", "iNaturalist", "MycoBank", "LPSN", "Kew POWO", "IUCN 红色名录", "WoRMS", "BOLD", "BHL"].map(
                  (d) => (
                    <span
                      key={d}
                      className="rounded-full border border-foreground/15 bg-muted/50 px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                    >
                      {d}
                    </span>
                  )
                )}
              </div>
            </CardContent>
          </Card>

          {/* 随机漫游(摇号动效) */}
          <Card className="relative overflow-hidden border-forest/25 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-2">
                <Shuffle className="h-4 w-4 text-primary" />
                <h3 className="font-display text-lg font-bold">图鉴轮盘</h3>
                <span className="latin ml-auto text-[10px] text-muted-foreground/60">Tibia Fortunae</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                命运之手为你翻开一页——311 个物种,抽到哪个算哪个
              </p>
              <div className="relative mt-4 flex min-h-32 items-center justify-center overflow-hidden rounded-lg border border-dashed border-forest/30 bg-muted/30 p-3">
                {/* 滚动态:快速掠过的候选名 */}
                <AnimatePresence mode="popLayout">
                  {rolling && spinShow && (
                    <motion.div
                      key={`spin-${spinShow.id}-${Date.now()}`}
                      initial={{ y: 22, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -22, opacity: 0 }}
                      transition={{ duration: 0.13, ease: "easeOut" }}
                      className="absolute inset-x-4 select-none text-center"
                    >
                      <p className="font-display text-lg font-bold text-foreground/45 blur-[1.2px]">
                        {spinShow.chineseName}
                      </p>
                      <p className="latin mt-0.5 text-xs text-muted-foreground/60 blur-[1.2px]">
                        {spinShow.latinName}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
                {/* 揭幕态:中奖物种卡片 */}
                <AnimatePresence>
                  {!rolling && rand && (
                    <motion.button
                      key="winner"
                      initial={{ scale: 0.6, opacity: 0, rotate: -3 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 15 }}
                      onClick={() => openTaxon(rand.id)}
                      className="group relative w-full overflow-hidden rounded-lg border border-amber-500/40 bg-gradient-to-br from-amber-500/10 to-primary/10 p-3 text-center shadow-md"
                    >
                      {/* 荣光描边 */}
                      <motion.span
                        className="pointer-events-none absolute inset-0 rounded-lg"
                        initial={{ boxShadow: "0 0 0 0 rgba(180,83,9,0.45)" }}
                        animate={{ boxShadow: ["0 0 0 3px rgba(180,83,9,0.35)", "0 0 0 0px rgba(180,83,9,0)"] }}
                        transition={{ duration: 0.9 }}
                      />
                      {rand.image && (
                        <img
                          src={rand.image}
                          alt={rand.chineseName}
                          className="mx-auto h-20 w-20 rounded-md object-cover shadow-sm transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      )}
                      <p className="mt-2 font-display text-lg font-bold text-foreground group-hover:text-primary">
                        {rand.chineseName}
                      </p>
                      <p className="latin mt-0.5 text-xs italic text-muted-foreground">{rand.latinName}</p>
                      <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-[11px] font-bold text-primary-foreground opacity-90 transition-opacity group-hover:opacity-100">
                        翻开这页
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </motion.button>
                  )}
                </AnimatePresence>
                {/* 空态 */}
                {!rolling && !rand && (
                  <p className="text-sm text-muted-foreground">点击下方按钮开始漫游</p>
                )}
              </div>
              <Button className="mt-3 w-full gap-2 rounded-full" onClick={roll} disabled={rolling}>
                <Shuffle className={cn("h-4 w-4", rolling && "animate-spin")} />
                {rolling ? "命运转轮旋转中……" : "抽取一个物种"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
