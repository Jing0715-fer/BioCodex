"use client";

import { useEffect, useRef, useState } from "react";
import { useBioStore } from "@/lib/bio-store";
import { useStats, useFeatured, useTree, type TreeNodeDTO } from "@/hooks/use-bio";
import { KINGDOM_THEME, IUCN_INFO } from "@/lib/bio-domain";
import { KingdomIcon } from "./taxa-icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowRight, ChevronRight, Sparkles, Dna, BookOpen, Shield, Database, Shuffle, RefreshCw, LayoutGrid,
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

export function HomeView() {
  const { explore, openTaxon, setAgentOpen, openBrowse } = useBioStore();
  const { data: stats } = useStats();
  const { data: featured, refetch: refetchFeatured } = useFeatured();
  const { data: tree } = useTree();

  // 随机漫游
  const [rand, setRand] = useState<{ id: string; chineseName: string; latinName: string; image: string | null } | null>(null);
  const [rolling, setRolling] = useState(false);
  const roll = async () => {
    setRolling(true);
    for (let i = 0; i < 10; i++) {
      const r = await fetch("/api/random").then((x) => x.json());
      if (r?.success) setRand(r.taxon);
      await new Promise((res) => setTimeout(res, 90));
    }
    setRolling(false);
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
  const kingdomCards = kingdomOrder
    .map((k) => {
      const t = KINGDOM_THEME[k];
      const node = findTreeNode(tree, k);
      const stat = stats?.kingdoms.find((s) => s.kingdom === k);
      // 条目数优先取树数据递归统计(stats.kingdoms 仅含三域,真核四界缺失)
      const taxa = node ? countTaxa(node) : stat?.taxa ?? 0;
      return { k, t, node, species: node?.sc ?? stat?.species ?? 0, taxa };
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
        </div>
        <div className="dna-divider" />
      </section>

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
          {kingdomCards.map(({ k, t, node, species, taxa }) => {
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

          {/* 随机漫游 */}
          <Card className="relative overflow-hidden border-foreground/10 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-2">
                <Shuffle className="h-4 w-4 text-primary" />
                <h3 className="font-display text-lg font-bold">图鉴轮盘</h3>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                命运之手为你翻开一页——311 个物种,抽到哪个算哪个
              </p>
              <div className="mt-4 flex min-h-28 items-center justify-center rounded-lg border border-dashed border-foreground/15 bg-muted/30 p-3">
                {rand ? (
                  <button onClick={() => openTaxon(rand.id)} className="group text-center">
                    <p className={cn("font-display text-lg font-bold text-primary", rolling && "blur-[1.5px]")}>
                      {rand.chineseName}
                    </p>
                    <p className={cn("latin mt-1 text-xs text-muted-foreground", rolling && "blur-[1.5px]")}>
                      {rand.latinName}
                    </p>
                  </button>
                ) : (
                  <p className="text-sm text-muted-foreground">点击下方按钮开始漫游</p>
                )}
              </div>
              <Button className="mt-3 w-full gap-2 rounded-full" onClick={roll} disabled={rolling}>
                <Shuffle className={cn("h-4 w-4", rolling && "animate-spin")} />
                {rolling ? "旋转中……" : "抽取一个物种"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
