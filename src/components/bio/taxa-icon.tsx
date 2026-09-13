"use client";

import { KINGDOM_THEME, rankLabel } from "@/lib/bio-domain";
import { Dna, Microscope, Sparkles, Bug, TreePine, PawPrint, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

export function KingdomIcon({
  kingdom,
  className,
  style,
}: {
  kingdom: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const props = { className: cn("h-4 w-4", className), style };
  switch (kingdom) {
    case "Bacteria":
      return <Microscope {...props} />;
    case "Archaea":
      return <Dna {...props} />;
    case "Protista":
      return <Sparkles {...props} />;
    case "Fungi":
      return <Leaf {...props} />;
    case "Plantae":
      return <TreePine {...props} />;
    case "Animalia":
      return <PawPrint {...props} />;
    default:
      return <Bug {...props} />;
  }
}

export function kingdomTheme(kingdom: string) {
  return KINGDOM_THEME[kingdom] || KINGDOM_THEME.Animalia;
}

/** 物种无图时的雕版风格占位图:界色渐变 + 属名首字母 */
export function TaxaPlaceholder({
  latinName,
  kingdom,
  className,
  big,
}: {
  latinName: string;
  kingdom: string;
  className?: string;
  big?: boolean;
}) {
  const theme = kingdomTheme(kingdom);
  const initial = latinName.replace(/^./, (c) => c.toUpperCase()).charAt(0);
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden paper-texture",
        className
      )}
      style={{
        background: `linear-gradient(135deg, ${theme.color}22 0%, var(--parchment) 60%, ${theme.color}18 100%)`,
      }}
      aria-label={`${latinName} 占位图`}
    >
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 20%, ${theme.color} 0%, transparent 50%), radial-gradient(circle at 80% 90%, ${theme.color} 0%, transparent 40%)`,
        }}
      />
      <span
        className={cn(
          "latin relative select-none font-semibold text-foreground/25 dark:text-foreground/20",
          big ? "text-7xl" : "text-4xl"
        )}
      >
        {initial}
      </span>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-foreground/10" />
      <div
        className={cn("absolute right-2 bottom-1.5 opacity-30", big ? "h-6 w-6" : "h-3.5 w-3.5")}
        style={{ color: theme.color }}
      >
        <KingdomIcon kingdom={kingdom} className="h-full w-full" />
      </div>
    </div>
  );
}

export function RankBadge({ rank, className }: { rank: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border border-foreground/15 bg-muted/60 px-1.5 py-0.5 text-[10px] font-medium tracking-wider text-muted-foreground",
        className
      )}
    >
      {rankLabel(rank)}
    </span>
  );
}
