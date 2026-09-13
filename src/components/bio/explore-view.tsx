"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useBioStore } from "@/lib/bio-store";
import { useTree, useTaxon, type TreeNodeDTO } from "@/hooks/use-bio";
import { TaxonomyTree } from "./taxonomy-tree";
import { TaxonCard } from "./taxon-card";
import { KINGDOM_THEME, rankLabel } from "@/lib/bio-domain";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  ChevronRight, ListTree, Loader2, Filter, ArrowLeft, Info, LayoutGrid,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function ExploreView({ taxonId }: { taxonId: string | null }) {
  const { openTaxon, goBack, view, openBrowse } = useBioStore();
  const { data: tree, isLoading: treeLoading } = useTree();
  const { data: detail, isLoading: detailLoading } = useTaxon(taxonId);

  // 展开集合:切换节点时自动展开其谱系
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [mobileTreeOpen, setMobileTreeOpen] = useState(false);
  const [onlySpecies, setOnlySpecies] = useState(false);
  const [sort, setSort] = useState<"default" | "species" | "name">("default");

  const rootExpanded = useMemo(() => {
    const s = new Set<string>();
    // 默认展开第一层(域)
    tree?.forEach((n) => s.add(n.id));
    return s;
  }, [tree]);

  // 面包屑物种计数:从树 DTO 递归建 id → 物种数映射
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

  useEffect(() => {
    if (!tree) return;
    if (!taxonId) {
      setExpanded(rootExpanded);
      return;
    }
    // 找到节点并展开其路径
    const path: string[] = [];
    const find = (nodes: TreeNodeDTO[], target: string, ancestors: string[]): boolean => {
      for (const n of nodes) {
        if (n.id === target) {
          path.push(...ancestors, n.id);
          return true;
        }
        if (find(n.ch, target, [...ancestors, n.id])) return true;
      }
      return false;
    };
    find(tree, taxonId, []);
    setExpanded(new Set([...rootExpanded, ...path.slice(0, -1)]));
  }, [tree, taxonId, rootExpanded]);

  const onToggle = useCallback((id: string) => {
    setExpanded((prev) => {
      const s = new Set(prev);
      if (s.has(id)) s.delete(id);
      else s.add(id);
      return s;
    });
  }, []);

  const onSelect = useCallback(
    (id: string) => {
      // 在探索视图内切换选中节点
      useBioStore.getState().explore(id);
      setMobileTreeOpen(false);
    },
    []
  );

  const kingdom = detail?.taxon.kingdom || "Bacteria";
  const theme = KINGDOM_THEME[kingdom] || KINGDOM_THEME.Animalia;

  // 当前节点标题与谱系
  const currentName = detail ? detail.taxon.chineseName : "全部分类";
  const currentLatin = detail ? detail.taxon.latinName : "Taxonomy";
  const lineage = detail?.lineage || [];

  // 子单元列表(过滤排序)
  let children = detail?.children || [];
  if (onlySpecies) children = children.filter((c) => c.rank === "species");
  if (sort === "species") children = [...children].sort((a, b) => b.speciesCount - a.speciesCount);
  else if (sort === "name")
    children = [...children].sort((a, b) => a.chineseName.localeCompare(b.chineseName, "zh"));

  const speciesTotal = detail?.counts.speciesCount;

  return (
    <div className="mx-auto flex w-full max-w-[1400px] gap-0 px-0 sm:px-6 lg:gap-6">
      {/* ====== 左侧分类树(桌面) ====== */}
      <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-72 shrink-0 flex-col py-4 lg:flex">
        <div className="flex items-center gap-2 px-1 pb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          <ListTree className="h-3.5 w-3.5" />
          分类树 · Classification
        </div>
        <div className="nh-scroll flex-1 overflow-y-auto pr-1">
          {treeLoading && (
            <div className="space-y-2 px-1">
              {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-full" />
              ))}
            </div>
          )}
          {tree && (
            <TaxonomyTree
              tree={tree}
              selectedId={taxonId}
              expanded={expanded}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          )}
        </div>
      </aside>

      {/* ====== 右侧内容 ====== */}
      <main className="min-w-0 flex-1 px-4 py-4 sm:px-0 sm:py-6">
        {/* 顶部面包屑 */}
        <div className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
          <button className="hover:text-primary" onClick={() => useBioStore.getState().explore(null)}>
            生命之树
          </button>
          {lineage.map((l) => {
            const sc = speciesCountById.get(l.id);
            return (
              <span key={l.id} className="flex items-center gap-1">
                <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
                <button
                  className="flex max-w-32 items-center gap-1 truncate hover:text-primary"
                  onClick={() => onSelect(l.id)}
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
        </div>

        {/* 节点标题卡 */}
        <div className="relative mt-3 overflow-hidden rounded-xl border border-foreground/10 bg-card p-5 shadow-sm sm:p-6">
          <div
            className="absolute inset-y-0 left-0 w-1"
            style={{ background: `linear-gradient(180deg, ${theme.color}, ${theme.color}55)` }}
          />
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-white"
                  style={{ background: theme.color }}
                >
                  {detail ? null : <ListTree className="h-4 w-4" />}
                </span>
                <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                  {currentName}
                </h1>
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                  {detail ? rankLabel(detail.taxon.rank) : "根"}
                </span>
                {speciesTotal != null && speciesTotal > 0 && (
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                    {speciesTotal} 物种
                  </span>
                )}
              </div>
              <p className="latin mt-1.5 text-sm text-muted-foreground">{currentLatin}</p>
              {detail?.taxon.authority && (
                <p className="mt-0.5 text-xs text-muted-foreground/70">{detail.taxon.authority}</p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* 移动端树开关 */}
              <Sheet open={mobileTreeOpen} onOpenChange={setMobileTreeOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1.5 rounded-full lg:hidden">
                    <ListTree className="h-4 w-4" />
                    分类树
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] p-0">
                  <SheetTitle className="flex items-center gap-2 border-b border-foreground/10 px-4 py-3 text-sm">
                    <ListTree className="h-4 w-4 text-primary" />
                    生物分类树
                  </SheetTitle>
                  <div className="nh-scroll h-[calc(100vh-3.5rem)] overflow-y-auto p-2">
                    {tree && (
                      <TaxonomyTree
                        tree={tree}
                        selectedId={taxonId}
                        expanded={expanded}
                        onToggle={onToggle}
                        onSelect={onSelect}
                        className="max-h-none"
                      />
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              {view.type === "explore" && useBioStore.getState().historyStack.length > 0 && (
                <Button variant="ghost" size="sm" className="gap-1 rounded-full" onClick={goBack}>
                  <ArrowLeft className="h-4 w-4" />
                  返回
                </Button>
              )}
              {detail && ["domain", "kingdom", "phylum", "class"].includes(detail.taxon.rank) && detail.taxon.kingdom && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1.5 rounded-full text-xs"
                  onClick={() => openBrowse({ kingdom: detail.taxon.kingdom })}
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                  目录浏览该界物种
                </Button>
              )}
            </div>
          </div>

          {detail?.taxon.description && (
            <p className="mt-4 max-w-3xl border-t border-foreground/10 pt-4 text-sm leading-7 text-foreground/85">
              {detail.taxon.description}
            </p>
          )}
          {!taxonId && (
            <p className="mt-4 border-t border-foreground/10 pt-4 text-sm leading-7 text-foreground/85">
              生命之树自三域展开:左侧选择任意阶元,右侧呈现其子分类。从门、纲、目、科,一路下探到属与种——每个物种都配有拉丁学名、形态描述与科学数据库链接。
            </p>
          )}
        </div>

        {/* 工具条 */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-medium text-muted-foreground">
            {detailLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                {children.length} 个子阶元
                {onlySpecies && "(仅物种)"}
              </>
            )}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant={onlySpecies ? "default" : "outline"}
              size="sm"
              className="h-8 gap-1.5 rounded-full text-xs"
              onClick={() => setOnlySpecies(!onlySpecies)}
            >
              <Filter className="h-3.5 w-3.5" />
              仅物种
            </Button>
            {(["default", "species", "name"] as const).map((s) => (
              <Button
                key={s}
                variant={sort === s ? "secondary" : "ghost"}
                size="sm"
                className="h-8 rounded-full px-3 text-xs"
                onClick={() => setSort(s)}
              >
                {s === "default" ? "默认" : s === "species" ? "按物种数" : "按名称"}
              </Button>
            ))}
          </div>
        </div>

        {/* 子单元网格 */}
        {!taxonId && treeLoading && (
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[5/4] rounded-xl" />
            ))}
          </div>
        )}
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {children.map((c, i) => (
            <TaxonCard key={c.id} taxon={c} kingdom={kingdom} index={i} />
          ))}
        </div>

        {children.length === 0 && !detailLoading && detail && (
          <div className="mt-8 flex flex-col items-center gap-2 rounded-xl border border-dashed border-foreground/15 py-12 text-center">
            <Info className="h-5 w-5 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">
              该阶元在库中没有更细的子单元了。试试左上角「返回」或点击上方面包屑回溯。
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
