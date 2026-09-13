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

/** 确定性散列:同一物种稳定微差(网点密度/雕章倾角),不同物种各不相同 */
function hashCode(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/** 物种无图时的复古雕版印章占位图:
 *  双线古籍边框 + 版画网点底纹 + 圆形雕章(属名前两字母) + 拉丁学名微缩 + 界色角标 */
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
  const seed = hashCode(latinName);
  const initials = latinName
    .split(/\s+/)[0]
    .replace(/^./, (c) => c.toUpperCase())
    .slice(0, 2);
  // 确定性微差:网点尺寸 6-10px,雕章倾角 -6°~6°
  const dotSize = 6 + (seed % 5);
  const tilt = ((seed >> 3) % 13) - 6;
  return (
    <div
      className={cn(
        "group/placeholder relative flex select-none items-center justify-center overflow-hidden paper-texture",
        className
      )}
      style={{
        background: `linear-gradient(150deg, ${theme.color}1f 0%, var(--parchment) 55%, ${theme.color}16 100%)`,
      }}
      aria-label={`${latinName} 占位图`}
      role="img"
    >
      {/* 版画网点底纹(密度随物种确定性变化) */}
      <div
        className="absolute inset-0 opacity-[0.10] dark:opacity-[0.14]"
        style={{
          backgroundImage: `radial-gradient(${theme.color} 0.8px, transparent 0.8px)`,
          backgroundSize: `${dotSize}px ${dotSize}px`,
          transform: `rotate(${tilt}deg) scale(1.6)`,
        }}
      />
      {/* 双线古籍边框 */}
      <div className="pointer-events-none absolute inset-[6%] border border-foreground/20 dark:border-foreground/25" />
      <div className="pointer-events-none absolute inset-[calc(6%+3px)] border border-foreground/10 dark:border-foreground/15" />
      {/* 中央圆形雕章:双圈环 + 属名前两字母 */}
      <div
        className={cn(
          "relative flex flex-col items-center justify-center rounded-full",
          big ? "h-40 w-40" : "h-[54%] aspect-square"
        )}
        style={{
          border: `1.5px solid ${theme.color}55`,
          boxShadow: `inset 0 0 0 ${big ? 6 : 4}px transparent, inset 0 0 0 1.5px ${theme.color}30, 0 1px 6px ${theme.color}18`,
          background: "radial-gradient(circle, var(--parchment) 0%, var(--parchment) 60%, transparent 100%)",
        }}
      >
        <span
          className={cn(
            "latin font-semibold tracking-[0.08em] text-foreground/45 dark:text-foreground/35",
            big ? "text-5xl" : "text-lg sm:text-xl"
          )}
          style={{ textShadow: `0 1px 0 ${theme.color}22` }}
        >
          {initials}
        </span>
        <span
          className={cn(
            "latin mt-0.5 uppercase tracking-[0.3em] opacity-60",
            big ? "text-[10px]" : "text-[6px] sm:text-[7px]"
          )}
          style={{ color: theme.color }}
        >
          Gen.
        </span>
      </div>
      {/* 底部拉丁学名微缩(仅 big 模式) */}
      {big && (
        <span className="latin absolute bottom-[13%] left-1/2 w-[70%] -translate-x-1/2 truncate text-center text-xs italic text-foreground/35 dark:text-foreground/30">
          {latinName}
        </span>
      )}
      {/* 右下界色角标 */}
      <div
        className={cn("absolute right-2.5 bottom-2 opacity-35", big ? "h-7 w-7" : "h-3.5 w-3.5")}
        style={{ color: theme.color }}
      >
        <KingdomIcon kingdom={kingdom} className="h-full w-full" />
      </div>
      {/* 四角雕版定位十字(仅 big) */}
      {big &&
        [
          "left-3 top-3",
          "right-3 top-3",
          "left-3 bottom-3",
          "right-3 bottom-3",
        ].map((pos) => (
          <div key={pos} className={cn("absolute h-3 w-3 opacity-25", pos)}>
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-foreground" />
            <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-foreground" />
          </div>
        ))}
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
