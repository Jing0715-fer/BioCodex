"use client";

import { motion } from "framer-motion";
import type { TreeNodeDTO } from "@/hooks/use-bio";
import { KINGDOM_THEME, rankLabel } from "@/lib/bio-domain";
import { KingdomIcon } from "./taxa-icon";
import {
  Globe, Crown, Network, Layers, ListTree, FolderTree, Binary, Leaf,
  MapPin, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

/** 各阶元的图标(博物学徽章式) */
const RANK_ICON: Record<string, any> = {
  domain: Globe,
  kingdom: Crown,
  phylum: Network,
  class: Layers,
  order: ListTree,
  family: FolderTree,
  genus: Binary,
  species: Leaf,
  subphylum: Network,
  subclass: Layers,
};

export interface LineageNode {
  id: string;
  rank: string;
  latinName: string;
  chineseName: string;
}

/**
 * 演化谱系时间轴:以竖向时间轴呈现「域 → 界 → 门 → … → 种」的完整分类下潜路径。
 * 每个节点可点击进入对应阶元的探索视图;末端节点(当前条目)高亮为「你在此处」。
 */
export function LineageTimeline({
  lineage,
  current,
  kingdom,
  speciesCountById,
  onNavigate,
}: {
  lineage: LineageNode[];
  current: { id: string; rank: string; latinName: string; chineseName: string };
  kingdom: string;
  speciesCountById?: Map<string, number>;
  onNavigate: (id: string) => void;
}) {
  const theme = KINGDOM_THEME[kingdom] || KINGDOM_THEME.Animalia;
  const nodes: LineageNode[] = [...lineage];
  const depth = nodes.length + 1;

  return (
    <div className="relative" aria-label="演化谱系时间轴">
      {/* 竖向谱系导轨:界色渐变 */}
      <div
        className="absolute bottom-5 left-[19px] top-3 w-[2px] rounded-full opacity-70"
        style={{
          background: `linear-gradient(180deg, ${theme.color}55, ${theme.color}cc 60%, ${theme.color}22)`,
        }}
        aria-hidden
      />
      <ol className="space-y-1">
        {nodes.map((n, i) => {
          const Icon = RANK_ICON[n.rank] || Layers;
          const sc = speciesCountById?.get(n.id);
          const node = (
            <motion.li
              key={n.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.055, duration: 0.32, ease: "easeOut" }}
              className="relative flex items-center gap-3"
            >
              {/* 节点圆徽 */}
              <button
                onClick={() => onNavigate(n.id)}
                aria-label={`进入${n.chineseName}(${rankLabel(n.rank)})`}
                className="group/node flex h-10 w-10 shrink-0 items-center justify-center rounded-full border shadow-sm transition-all hover:scale-110 hover:shadow-md focus-visible:outline-2 focus-visible:outline-primary"
                style={{
                  background: "var(--card, #fff)",
                  borderColor: `${theme.color}66`,
                }}
              >
                <Icon
                  className="h-4.5 w-4.5 transition-colors group-hover/node:text-primary"
                  style={{ color: theme.color }}
                />
                {/* 悬浮涟漪 */}
                <span
                  className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover/node:opacity-100"
                  style={{ boxShadow: `0 0 0 4px ${theme.color}22` }}
                />
              </button>
              {/* 节点内容 */}
              <button
                onClick={() => onNavigate(n.id)}
                className="group/name min-w-0 flex-1 rounded-lg px-2 py-1 text-left transition-colors hover:bg-accent/60"
              >
                <span className="flex items-baseline gap-1.5">
                  <span className="text-[9px] font-bold tracking-widest text-muted-foreground/70">
                    {rankLabel(n.rank)}
                  </span>
                  {sc != null && sc > 0 && (
                    <span className="rounded-full bg-foreground/8 px-1.5 text-[9px] font-semibold tabular-nums text-muted-foreground/80 dark:bg-foreground/15">
                      {sc}
                    </span>
                  )}
                </span>
                <span className="block truncate text-[13px] font-semibold text-foreground/90 group-hover/name:text-primary">
                  {n.chineseName}
                </span>
                <span className="latin block truncate text-[10px] text-muted-foreground/70">
                  {n.latinName}
                </span>
              </button>
            </motion.li>
          );
          return node;
        })}

        {/* 末端:当前条目(你在此处) */}
        <motion.li
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: nodes.length * 0.055 + 0.06, duration: 0.35, ease: "easeOut" }}
          className="relative flex items-center gap-3"
        >
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white shadow-md" style={{ background: theme.color }}>
            <KingdomIcon kingdom={kingdom} className="h-4.5 w-4.5" />
            {/* 呼吸光环 */}
            <motion.span
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{ boxShadow: `0 0 0 3px ${theme.color}55` }}
              animate={{ opacity: [0.9, 0.25, 0.9] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
          <div className="min-w-0 flex-1 rounded-lg border border-dashed px-2.5 py-1.5" style={{ borderColor: `${theme.color}66`, background: `${theme.color}0d` }}>
            <span className="flex items-baseline gap-1.5">
              <span className="text-[9px] font-bold tracking-widest" style={{ color: theme.color }}>
                {rankLabel(current.rank)}
              </span>
              <span className="flex items-center gap-0.5 rounded-full bg-primary/10 px-1.5 py-px text-[9px] font-semibold text-primary">
                <MapPin className="h-2.5 w-2.5" />
                你在此处
              </span>
            </span>
            <span className="block truncate text-sm font-bold text-foreground">
              {current.chineseName}
            </span>
            <span className="latin block truncate text-[10px] text-muted-foreground/80 italic">
              {current.latinName}
            </span>
          </div>
        </motion.li>
      </ol>

      {/* 谱系深度脚注 */}
      <p className="mt-3 flex items-center justify-end gap-1 text-[10px] text-muted-foreground/60">
        <ChevronRight className="h-3 w-3" />
        共 {depth} 级阶元 · 点击节点可上溯任一层级
      </p>
    </div>
  );
}

/** 兼容树 DTO 的构建辅助:从 lineage 数组直接使用即可,保留接口以备扩展 */
export function buildLineageFromTree(tree: TreeNodeDTO[], id: string): LineageNode[] {
  const path: LineageNode[] = [];
  const walk = (nodes: TreeNodeDTO[], ancestors: LineageNode[]): boolean => {
    for (const n of nodes) {
      const node: LineageNode = { id: n.id, rank: n.rank, latinName: n.la, chineseName: n.cn };
      if (n.id === id) {
        path.push(...ancestors, node);
        return true;
      }
      if (n.ch?.length && walk(n.ch, [...ancestors, node])) return true;
    }
    return false;
  };
  walk(tree, []);
  return path;
}
