"use client";

import { useMemo } from "react";
import type { TreeNodeDTO } from "@/hooks/use-bio";
import { useBioStore } from "@/lib/bio-store";
import { KINGDOM_THEME, rankLabel, IUCN_INFO } from "@/lib/bio-domain";
import { KingdomIcon } from "./taxa-icon";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

function NodeIcon({ node, kingdom }: { node: TreeNodeDTO; kingdom: string }) {
  const color = KINGDOM_THEME[kingdom]?.color;
  if (node.rank === "species") {
    return (
      <span
        className="ml-0.5 mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
        style={{ background: color }}
      />
    );
  }
  return (
    <span className="mt-0.5 shrink-0" style={{ color }}>
      <KingdomIcon kingdom={kingdom} className="h-3.5 w-3.5" />
    </span>
  );
}

interface TreeNodeProps {
  node: TreeNodeDTO;
  depth: number;
  kingdom: string;
  selectedId: string | null;
  expanded: Set<string>;
  onToggle: (id: string) => void;
  onSelect: (id: string) => void;
}

function TreeNode({ node, depth, kingdom, selectedId, expanded, onToggle, onSelect }: TreeNodeProps) {
  const hasChildren = node.ch.length > 0;
  const isOpen = expanded.has(node.id);
  const isSelected = selectedId === node.id;
  const isSpecies = node.rank === "species";

  return (
    <li className="select-none">
      <div
        className={cn(
          "group flex cursor-pointer items-start gap-1 rounded-md px-1.5 py-1 transition-colors",
          isSelected ? "bg-accent" : "hover:bg-muted/80"
        )}
        style={{ paddingLeft: depth * 14 + 6 }}
        role="treeitem"
        aria-expanded={hasChildren ? isOpen : undefined}
        aria-selected={isSelected}
      >
        {hasChildren ? (
          <button
            className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded hover:bg-foreground/10"
            onClick={(e) => {
              e.stopPropagation();
              onToggle(node.id);
            }}
            aria-label={isOpen ? "折叠" : "展开"}
          >
            <ChevronRight
              className={cn(
                "h-3.5 w-3.5 text-muted-foreground transition-transform",
                isOpen && "rotate-90"
              )}
            />
          </button>
        ) : (
          <span className="mt-0.5 h-4 w-4 shrink-0" />
        )}
        <NodeIcon node={node} kingdom={kingdom} />
        <button
          className="flex min-w-0 flex-1 flex-col items-start text-left"
          onClick={() => (isSpecies ? onSelect(node.id) : onSelect(node.id))}
          title={`${node.cn} · ${node.la}`}
        >
          <span
            className={cn(
              "flex w-full items-baseline gap-1.5 text-[13px] leading-5",
              isSpecies ? "font-medium" : "font-semibold",
              isSelected ? "text-accent-foreground" : "text-foreground/90"
            )}
          >
            <span className="truncate">{node.cn}</span>
            {!isSpecies && (
              <span className="shrink-0 rounded-full bg-foreground/8 px-1.5 text-[10px] tabular-nums text-muted-foreground dark:bg-foreground/15">
                {node.sc}
              </span>
            )}
            {node.co && (
              <span
                className={cn(
                  "shrink-0 rounded-sm px-1 text-[9px] font-bold leading-4 text-white",
                  IUCN_INFO[node.co]?.bg
                )}
              >
                {node.co}
              </span>
            )}
          </span>
          <span className="latin w-full truncate text-[10.5px] leading-3.5 text-muted-foreground/80">
            {node.la}
          </span>
        </button>
        <span className="mt-0.5 hidden shrink-0 text-[10px] text-muted-foreground/50 group-hover:inline">
          {rankLabel(node.rank)}
        </span>
      </div>
      {hasChildren && isOpen && (
        <ul role="group">
          {node.ch.map((c) => (
            <TreeNode
              key={c.id}
              node={c}
              depth={depth + 1}
              kingdom={kingdom}
              selectedId={selectedId}
              expanded={expanded}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export function TaxonomyTree({
  tree,
  selectedId,
  expanded,
  onToggle,
  onSelect,
  className,
}: {
  tree: TreeNodeDTO[];
  selectedId: string | null;
  expanded: Set<string>;
  onToggle: (id: string) => void;
  onSelect: (id: string) => void;
  className?: string;
}) {
  const nodes = useMemo(() => tree, [tree]);
  return (
    <div className={cn("nh-scroll overflow-y-auto", className)} role="tree" aria-label="生物分类树">
      <ul>
        {nodes.map((n) => (
          <TreeNode
            key={n.id}
            node={n}
            depth={0}
            kingdom={n.la}
            selectedId={selectedId}
            expanded={expanded}
            onToggle={onToggle}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </div>
  );
}
