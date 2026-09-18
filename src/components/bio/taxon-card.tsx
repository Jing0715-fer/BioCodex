"use client";

import type { ChildDTO } from "@/hooks/use-bio";
import { KINGDOM_THEME, IUCN_INFO, rankLabel } from "@/lib/bio-domain";
import { KingdomIcon, TaxaPlaceholder } from "./taxa-icon";
import { SafeImg } from "./safe-img";
import { useBioStore, MAX_COMPARE } from "@/lib/bio-store";
import { ArrowRight, GitCompareArrows, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function TaxonCard({
  taxon,
  kingdom,
  index,
}: {
  taxon: ChildDTO;
  kingdom: string;
  index: number;
}) {
  const { openTaxon, compareIds, toggleCompare } = useBioStore();
  const theme = KINGDOM_THEME[kingdom] || KINGDOM_THEME.Animalia;
  const isSpecies = taxon.rank === "species";
  const inCompare = isSpecies && compareIds.includes(taxon.id);
  const full = isSpecies && !inCompare && compareIds.length >= MAX_COMPARE;

  const activate = () => openTaxon(taxon.id);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={activate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activate();
        }
      }}
      className="specimen-card reveal-up group relative flex flex-col overflow-hidden rounded-xl border border-foreground/10 bg-card text-left shadow-sm focus-visible:outline-2 focus-visible:outline-forest"
      style={{ animationDelay: `${Math.min(index, 12) * 45}ms` }}
      aria-label={`查看${taxon.chineseName}(${taxon.latinName})`}
    >
      {/* 图片/占位 */}
      <div className="relative aspect-[5/3] overflow-hidden">
        {taxon.image ? (
          <SafeImg
            src={taxon.image}
            alt={taxon.chineseName}
            className="img-fade-in h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            fallback={
              isSpecies ? (
                <TaxaPlaceholder latinName={taxon.latinName} kingdom={kingdom} className="h-full w-full" />
              ) : (
                <div
                  className="flex h-full w-full flex-col items-center justify-center gap-2.5"
                  style={{
                    background: `linear-gradient(145deg, ${theme.color}1f 0%, var(--parchment) 55%, ${theme.color}14 100%)`,
                  }}
                >
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-md"
                    style={{ background: theme.color }}
                  >
                    <KingdomIcon kingdom={kingdom} className="h-6 w-6" />
                  </span>
                  <span className="latin text-sm text-muted-foreground/70">
                    {taxon.rank !== "species" ? taxon.latinName.split(" ")[0] : ""}
                  </span>
                </div>
              )
            }
          />
        ) : isSpecies ? (
          <TaxaPlaceholder latinName={taxon.latinName} kingdom={kingdom} className="h-full w-full" />
        ) : (
          <div
            className="flex h-full w-full flex-col items-center justify-center gap-2.5"
            style={{
              background: `linear-gradient(145deg, ${theme.color}1f 0%, var(--parchment) 55%, ${theme.color}14 100%)`,
            }}
          >
            <span
              className="flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-md"
              style={{ background: theme.color }}
            >
              <KingdomIcon kingdom={kingdom} className="h-6 w-6" />
            </span>
            <span className="latin text-sm text-muted-foreground/70">
              {taxon.rank !== "species" ? taxon.latinName.split(" ")[0] : ""}
            </span>
          </div>
        )}
        {isSpecies && taxon.conservation && (
          <span
            className={cn(
              "absolute right-2 top-2 rounded-sm px-1.5 py-0.5 text-[10px] font-bold text-white shadow",
              IUCN_INFO[taxon.conservation]?.bg
            )}
          >
            {IUCN_INFO[taxon.conservation]?.label}
          </span>
        )}
        {/* 加入对比(物种专属) */}
        {isSpecies && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              const res = toggleCompare(taxon.id);
              if (res === "added")
                toast.success(`已加入对比:${taxon.chineseName}`, {
                  description: `托盘 ${compareIds.length + 1}/${MAX_COMPARE}`,
                });
              else if (res === "removed") toast.info(`已移出对比:${taxon.chineseName}`);
              else toast.warning("对比托盘已满(最多 3 个)", { description: "请先移除一个物种,或直接开始对比" });
            }}
            disabled={full}
            aria-label={inCompare ? `移出对比:${taxon.chineseName}` : `加入对比:${taxon.chineseName}`}
            className={cn(
              "absolute left-2 top-2 flex h-7 items-center gap-1 rounded-full px-2 text-[11px] font-semibold shadow backdrop-blur-sm transition-all",
              inCompare
                ? "bg-primary text-primary-foreground opacity-100"
                : "bg-black/45 text-white opacity-0 group-hover:opacity-100 focus-visible:opacity-100 hover:bg-black/65",
              full && "cursor-not-allowed opacity-40 group-hover:opacity-40"
            )}
          >
            {inCompare ? <Check className="h-3.5 w-3.5" /> : <GitCompareArrows className="h-3.5 w-3.5" />}
            {inCompare ? "已加入" : "对比"}
          </button>
        )}
        {/* 阶元角标 */}
        <span className="absolute bottom-2 left-2 rounded-sm bg-black/45 px-1.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
          {rankLabel(taxon.rank)}
        </span>
      </div>

      {/* 内容 */}
      <div className="flex flex-1 flex-col p-3">
        <p className="truncate font-display text-[15px] font-bold text-foreground">
          {taxon.chineseName}
        </p>
        <p className="latin mt-0.5 truncate text-xs text-muted-foreground">{taxon.latinName}</p>
        {taxon.description && (
          <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-muted-foreground/85">
            {taxon.description}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between pt-2.5">
          {taxon.speciesCount > 0 ? (
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium tabular-nums text-muted-foreground">
              {taxon.speciesCount} 物种
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground/60">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: theme.color }}
              />
              {theme.desc}
            </span>
          )}
          {taxon.ncbiTaxId && (
            <span className="rounded-sm border border-primary/30 bg-primary/5 px-1.5 py-0.5 text-[9px] font-semibold text-primary">
              NCBI
            </span>
          )}
          <ArrowRight className="ml-auto h-3.5 w-3.5 text-muted-foreground/30 transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
        </div>
      </div>
    </div>
  );
}
