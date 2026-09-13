"use client";

import { useMemo, useState } from "react";
import { Diff } from "lucide-react";
import { useBioStore, MAX_COMPARE } from "@/lib/bio-store";
import { useTaxaBatch, type TaxonDetailResponse } from "@/hooks/use-bio";
import { buildDbLinks, IUCN_INFO, KINGDOM_THEME, rankLabel } from "@/lib/bio-domain";
import { TaxaPlaceholder, KingdomIcon } from "./taxa-icon";
import { ShareDialog } from "./share-dialog";
import { copyText } from "@/lib/clipboard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  ChevronRight, ArrowLeft, X, Microscope, Leaf, MapPin, Shield, GitCompareArrows,
  Dna, Database, Plus, Star, Sparkles, Columns2, ClipboardCopy, Link2, Check, FileSpreadsheet, Braces,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface CompareRow {
  key: string;
  label: string;
  icon: any;
  values: string[];
  /** 值完全一致时显示「一致」徽标 */
  uniform?: boolean;
  render?: (t: TaxonDetailResponse) => React.ReactNode;
}

const LINEAGE_KEYS = ["kingdom", "phylum", "class", "order", "family", "genus"];

export function CompareView({ ids }: { ids: string[] }) {
  const { goBack, explore, removeCompare, openBrowse, openTaxon, compareIds } = useBioStore();
  const { data, isLoading } = useTaxaBatch(ids);
  const { toast } = useToast();
  const [copied, setCopied] = useState<"md" | "link" | null>(null);
  /** 剪贴板不可用时的手动复制兑底 */
  const [fallback, setFallback] = useState<{ kind: "md" | "link"; text: string } | null>(null);
  /** hover 高亮的物种列 id(列头卡与表格列联动) */
  const [hoverCol, setHoverCol] = useState<string | null>(null);
  /** 「只看差异」聚焦模式:隐藏所有物种完全一致的行 */
  const [diffOnly, setDiffOnly] = useState(false);

  const taxa = data || [];

  // 提取谱系指定阶元中文名(原核生物无界级,回退到域)
  const lineageOf = (t: TaxonDetailResponse, key: string) =>
    t.lineage.find((l) => l.rank === key)?.chineseName || "—";
  const kingdomOrDomain = (t: TaxonDetailResponse) => {
    const k = lineageOf(t, "kingdom");
    return k !== "—" ? k : lineageOf(t, "domain");
  };

  /** 导出:对比表格转 Markdown 文本(便于笔记/论文引用) */
  const buildMarkdown = () => {
    const header = ["| 属性 |", ...taxa.map((t) => ` **${t.taxon.chineseName}** *${t.taxon.latinName}* |`)];
    const divider = ["| --- |", ...taxa.map(() => " --- |")];
    const line = (label: string, fn: (t: TaxonDetailResponse) => string) =>
      [`| ${label} |`, ...taxa.map((t) => ` ${fn(t).replace(/\|/g, "\\|").replace(/\n/g, " ")} |`)].join("");
    const rows = [
      header.join(""),
      divider.join(""),
      line("界/域", (t) => kingdomOrDomain(t)),
      line("门", (t) => lineageOf(t, "phylum")),
      line("纲", (t) => lineageOf(t, "class")),
      line("目", (t) => lineageOf(t, "order")),
      line("科", (t) => lineageOf(t, "family")),
      line("属", (t) => lineageOf(t, "genus")),
      line("形态特征", (t) => t.taxon.morphology || "暂无记录"),
      line("生境", (t) => t.taxon.habitat || "暂无记录"),
      line("分布", (t) => t.taxon.distribution || "暂无记录"),
      line("保护等级", (t) => (t.taxon.conservation ? `${t.taxon.conservation} ${IUCN_INFO[t.taxon.conservation]?.label ?? ""}`.trim() : "未评估")),
      line("NCBI 分类", (t) => (t.taxon.ncbiTaxId ? `txid${t.taxon.ncbiTaxId}` : "未锚定")),
      line("物种速览", (t) => t.taxon.description || ""),
    ];
    return [`# 物种对比 · BioCodex 生物图鉴`, ``, `> ${taxa.map((t) => `**${t.taxon.chineseName}** *${t.taxon.latinName}*`).join(" vs ")}`, ``, ...rows, ``, `*数据来源:BioCodex 生物图鉴 · ${new Date().toLocaleDateString("zh-CN")} 导出*`].join("\n");
  };

  const exportMarkdown = async () => {
    const md = buildMarkdown();
    const ok = await copyText(md);
    if (ok) {
      setCopied("md");
      setTimeout(() => setCopied(null), 2000);
      toast({ title: "已复制 Markdown 对比表", description: "可直接粘贴到笔记、文档或论坛" });
    } else {
      setFallback({ kind: "md", text: md });
    }
  };

  const shareLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}#compare=${taxa.map((t) => t.taxon.id).join(",")}`;
    const ok = await copyText(url);
    if (ok) {
      setCopied("link");
      setTimeout(() => setCopied(null), 2000);
      toast({ title: "分享链接已复制", description: "对方打开后将自动还原这份对比" });
    } else {
      setFallback({ kind: "link", text: url });
    }
  };

  /** 导出:对比表格转 CSV(Excel/Numbers 可直接打开,含 BOM 防乱码) */
  const buildCsv = () => {
    const esc = (v: string) => `"${v.replace(/"/g, '""').replace(/\r?\n/g, " ").trim()}"`;
    const head = ["属性", ...taxa.map((t) => `${t.taxon.chineseName}(${t.taxon.latinName})`)];
    const row = (label: string, fn: (t: TaxonDetailResponse) => string) =>
      [label, ...taxa.map((t) => fn(t))].map(esc).join(",");
    const lines = [
      ["BioCodex 物种对比导出"].map(esc).join(","),
      [`导出时间: ${new Date().toLocaleString("zh-CN")}`].map(esc).join(","),
      "",
      head.map(esc).join(","),
      row("界/域", (t) => kingdomOrDomain(t)),
      row("门", (t) => lineageOf(t, "phylum")),
      row("纲", (t) => lineageOf(t, "class")),
      row("目", (t) => lineageOf(t, "order")),
      row("科", (t) => lineageOf(t, "family")),
      row("属", (t) => lineageOf(t, "genus")),
      row("拉丁学名", (t) => t.taxon.latinName),
      row("形态特征", (t) => t.taxon.morphology || "暂无记录"),
      row("生境", (t) => t.taxon.habitat || "暂无记录"),
      row("分布", (t) => t.taxon.distribution || "暂无记录"),
      row("保护等级", (t) => (t.taxon.conservation ? `${t.taxon.conservation} ${IUCN_INFO[t.taxon.conservation]?.label ?? ""}`.trim() : "未评估")),
      row("NCBI 分类", (t) => (t.taxon.ncbiTaxId ? `txid${t.taxon.ncbiTaxId}` : "未锚定")),
      row("物种速览", (t) => t.taxon.description || ""),
    ];
    return "\uFEFF" + lines.join("\r\n");
  };

  const exportCsv = async () => {
    const csv = buildCsv();
    // 优先触发文件下载(比剪贴板更适合 CSV)
    try {
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `biocodex-对比-${taxa.map((t) => t.taxon.chineseName).join("-")}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setCopied("md");
      setTimeout(() => setCopied(null), 2000);
      toast({ title: "已导出 CSV 文件", description: "Excel / Numbers / WPS 可直接打开,中文无乱码" });
    } catch {
      const ok = await copyText(csv);
      if (ok) {
        toast({ title: "已复制 CSV 文本", description: "下载不可用时已改为复制到剪贴板" });
      } else {
        setFallback({ kind: "md", text: csv });
      }
    }
  };

  const rows = useMemo<CompareRow[]>(() => {
    if (taxa.length < 1) return [];
    const plain = (fn: (t: TaxonDetailResponse) => string) => taxa.map(fn);
    const build = (key: string, label: string, icon: any, fn: (t: TaxonDetailResponse) => string): CompareRow => {
      const values = plain(fn);
      const norm = values.map((v) => v.trim());
      return { key, label, icon, values, uniform: new Set(norm).size === 1 && norm[0] !== "—" };
    };
    const base: CompareRow[] = [
      build("kingdom", "界/域", Database, (t) => kingdomOrDomain(t)),
      build("phylum", "门", Database, (t) => lineageOf(t, "phylum")),
      build("class", "纲", Database, (t) => lineageOf(t, "class")),
      build("order", "目", Database, (t) => lineageOf(t, "order")),
      build("family", "科", Database, (t) => lineageOf(t, "family")),
      build("genus", "属", Database, (t) => lineageOf(t, "genus")),
      {
        key: "morphology",
        label: "形态特征",
        icon: Microscope,
        values: plain((t) => t.taxon.morphology || "—"),
        render: (t) => (
          <p className="text-[13px] leading-6 text-foreground/85">
            {t.taxon.morphology || <span className="text-muted-foreground/50">暂无记录</span>}
          </p>
        ),
      },
      {
        key: "habitat",
        label: "生境",
        icon: Leaf,
        values: plain((t) => t.taxon.habitat || "—"),
        render: (t) => (
          <p className="text-[13px] leading-6 text-foreground/85">
            {t.taxon.habitat || <span className="text-muted-foreground/50">暂无记录</span>}
          </p>
        ),
      },
      {
        key: "distribution",
        label: "分布",
        icon: MapPin,
        values: plain((t) => t.taxon.distribution || "—"),
        render: (t) => (
          <p className="text-[13px] leading-6 text-foreground/85">
            {t.taxon.distribution || <span className="text-muted-foreground/50">暂无记录</span>}
          </p>
        ),
      },
      {
        key: "conservation",
        label: "保护等级",
        icon: Shield,
        values: plain((t) => t.taxon.conservation || "未评估"),
        render: (t) => {
          const c = t.taxon.conservation;
          const info = c ? IUCN_INFO[c] : null;
          return info ? (
            <span className={cn("inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-bold text-white", info.bg)}>
              {c} · {info.label}
            </span>
          ) : (
            <span className="rounded-md bg-muted px-2.5 py-1 text-xs text-muted-foreground">未评估</span>
          );
        },
      },
      {
        key: "ncbi",
        label: "NCBI 分类",
        icon: Dna,
        values: plain((t) => (t.taxon.ncbiTaxId ? `txid${t.taxon.ncbiTaxId}` : "未锚定")),
        render: (t) =>
          t.taxon.ncbiTaxId ? (
            <a
              href={`https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=${t.taxon.ncbiTaxId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="latin text-[13px] font-semibold text-primary underline-offset-4 hover:underline"
            >
              txid{t.taxon.ncbiTaxId} ↗
            </a>
          ) : (
            <span className="text-[13px] text-muted-foreground/50">未锚定</span>
          ),
      },
    ];
    return base.map((r) => ({
      ...r,
      // 统一为每一行计算 uniform(含文本字段),供「只看差异」过滤与徽标显示
      uniform: r.uniform ?? new Set(r.values.map((v) => v.trim())).size === 1,
    }));
  }, [taxa]);

  /** 导出:结构化 JSON(供程序分析/数据管道使用,含谱系与元数据) */
  const buildJson = () =>
    JSON.stringify(
      {
        format: "biocodex.compare.export",
        version: 1,
        exportedAt: new Date().toISOString(),
        shareUrl: `${window.location.origin}${window.location.pathname}#compare=${taxa.map((t) => t.taxon.id).join(",")}`,
        species: taxa.map((t) => ({
          id: t.taxon.id,
          chineseName: t.taxon.chineseName,
          latinName: t.taxon.latinName,
          kingdom: kingdomOrDomain(t),
          lineage: Object.fromEntries(
            LINEAGE_KEYS.map((k) => [k, t.lineage.find((l) => l.rank === k)?.chineseName ?? null])
          ),
          morphology: t.taxon.morphology,
          habitat: t.taxon.habitat,
          distribution: t.taxon.distribution,
          conservation: t.taxon.conservation,
          ncbiTaxId: t.taxon.ncbiTaxId,
          summary: t.taxon.description,
        })),
        fields: rows.map((r) => ({ key: r.key, label: r.label, uniform: r.uniform })),
        diffCount: rows.filter((r) => !r.uniform).length,
      },
      null,
      2
    );

  const exportJson = async () => {
    const js = buildJson();
    try {
      const blob = new Blob([js], { type: "application/json;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `biocodex-对比-${taxa.map((t) => t.taxon.chineseName).join("-")}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast({ title: "已导出 JSON 文件", description: "结构化数据可直接喂给脚本或数据分析管道" });
    } catch {
      const ok = await copyText(js);
      if (ok) {
        toast({ title: "已复制 JSON 文本", description: "下载不可用时已改为复制到剪贴板" });
      } else {
        setFallback({ kind: "md", text: js });
      }
    }
  };

  const diffCount = rows.filter((r) => !r.uniform).length;
  const shownRows = diffOnly ? rows.filter((r) => !r.uniform) : rows;

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6">
        <Skeleton className="h-6 w-52" />
        <div className="mt-4 grid gap-4" style={{ gridTemplateColumns: `repeat(${Math.max(ids.length, 2)}, minmax(0, 1fr))` }}>
          {ids.map((id) => (
            <Skeleton key={id} className="h-64 rounded-xl" />
          ))}
        </div>
        <Skeleton className="mt-4 h-96 rounded-xl" />
      </div>
    );
  }

  if (taxa.length < 2) {
    return (
      <div className="mx-auto max-w-[1000px] px-4 py-16 sm:px-6">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-foreground/15 bg-card/50 py-16 text-center">
          <GitCompareArrows className="h-8 w-8 text-muted-foreground/40" />
          <h1 className="font-display text-xl font-bold text-foreground">对比需要至少 2 个物种</h1>
          <p className="max-w-md text-sm text-muted-foreground">
            在图鉴任意物种卡片或详情页点击「对比」,把感兴趣的物种加入下方托盘,再来并排比较它们的分类、形态、生境与保护状况。
          </p>
          <Button className="mt-2 gap-2 rounded-full" onClick={() => openBrowse({})}>
            <Columns2 className="h-4 w-4" />
            去图鉴目录挑选物种
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 pb-16 pt-4 sm:px-6">
      {/* 面包屑 + 标题 */}
      <nav className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground" aria-label="路径">
        <button className="hover:text-primary" onClick={() => explore(null)}>
          生命之树
        </button>
        <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
        <span className="font-medium text-foreground">物种对比</span>
      </nav>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2.5 font-display text-2xl font-bold text-foreground sm:text-3xl">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GitCompareArrows className="h-5 w-5" />
            </span>
            物种对比
            <span className="latin text-base font-normal text-muted-foreground">Specimen Comparison</span>
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            并排比较 {taxa.length} 个物种的分类地位、形态特征、生境分布与保护等级——像博物学家摊开标本台纸一样研究差异
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant={diffOnly ? "default" : "outline"}
            size="sm"
            className={"gap-1.5 rounded-full"}
            onClick={() => setDiffOnly((v) => !v)}
            aria-pressed={diffOnly}
            title={diffOnly ? "切回显示全部字段" : "隐藏完全一致的行,聚焦差异"}
          >
            <Diff className="h-4 w-4" />
            {diffOnly ? "显示全部字段" : `只看差异${diffCount > 0 ? `(${diffCount})` : ""}`}
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5 rounded-full" onClick={exportMarkdown}>
            {copied === "md" ? <Check className="h-4 w-4 text-emerald-600" /> : <ClipboardCopy className="h-4 w-4" />}
            {copied === "md" ? "已复制" : "导出 Markdown"}
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5 rounded-full" onClick={exportCsv}>
            <FileSpreadsheet className="h-4 w-4" />
            导出 CSV
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5 rounded-full" onClick={exportJson} title="结构化数据,可供程序分析">
            <Braces className="h-4 w-4" />
            导出 JSON
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5 rounded-full" onClick={shareLink}>
            {copied === "link" ? <Check className="h-4 w-4 text-emerald-600" /> : <Link2 className="h-4 w-4" />}
            {copied === "link" ? "已复制" : "复制分享链接"}
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5 rounded-full" onClick={goBack}>
            <ArrowLeft className="h-4 w-4" />
            返回
          </Button>
        </div>
      </div>

      {/* ====== 物种列头(横向滚动) ====== */}
      <div className="nh-scroll mt-5 overflow-x-auto pb-1">
        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: `repeat(${taxa.length}, minmax(250px, 1fr)) minmax(170px, 0.8fr)` }}
        >
          {taxa.map((d) => {
            const t = d.taxon;
            const theme = KINGDOM_THEME[t.kingdom] || KINGDOM_THEME.Animalia;
            const inTray = compareIds.includes(t.id);
            const hovered = hoverCol === t.id;
            return (
              <div
                key={t.id}
                onMouseEnter={() => setHoverCol(t.id)}
                onMouseLeave={() => setHoverCol((c) => (c === t.id ? null : c))}
                className={cn(
                  "reveal-up group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-300",
                  hovered ? "border-primary/60 shadow-md ring-1 ring-primary/30" : "border-foreground/10"
                )}
              >
                <div className="relative h-40 overflow-hidden sm:h-44">
                  <button
                    onClick={() => openTaxon(t.id)}
                    aria-label={`查看${t.chineseName}图鉴详情`}
                    className="absolute inset-0 h-full w-full cursor-pointer"
                  >
                    {t.image ? (
                      <img
                        src={t.image}
                        alt={`${t.chineseName}(${t.latinName})`}
                        className="img-fade-in h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <TaxaPlaceholder latinName={t.latinName} kingdom={t.kingdom} className="h-full w-full" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    {/* hover 查看详情提示 */}
                    <span className="absolute inset-x-0 bottom-11 flex translate-y-1 items-center justify-center gap-1 bg-black/45 py-1.5 text-[11px] font-semibold text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      查看图鉴详情
                      <ChevronRight className="h-3 w-3" />
                    </span>
                  </button>
                  <span
                    className="absolute left-2 top-2 flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold text-white shadow"
                    style={{ background: theme.color }}
                  >
                    <KingdomIcon kingdom={t.kingdom} className="h-3 w-3" />
                    {theme.name}
                  </span>
                  {t.tags?.includes("flagship") && (
                    <span className="absolute right-14 top-2 flex items-center gap-0.5 rounded-sm bg-amber-500/85 px-1.5 py-0.5 text-[10px] font-bold text-white">
                      <Star className="h-2.5 w-2.5" />
                      旗舰
                    </span>
                  )}
                  {inTray && (
                    <button
                      onClick={() => removeCompare(t.id)}
                      aria-label={`从对比移除${t.chineseName}`}
                      className="absolute right-2 top-2 rounded-full bg-black/50 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-red-600"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                  <div className="absolute bottom-2 left-3 right-3">
                    <button
                      onClick={() => openTaxon(t.id)}
                      className="block w-full truncate text-left font-display text-lg font-bold text-white drop-shadow-sm transition-colors hover:text-primary-foreground hover:underline"
                      aria-label={`查看${t.chineseName}图鉴详情`}
                    >
                      {t.chineseName}
                    </button>
                    <p className="latin truncate text-xs italic text-white/85">{t.latinName}</p>
                  </div>
                </div>
                {/* 快捷数据库链接 */}
                <div className="flex items-center justify-between gap-1 px-3 py-2.5">
                  {(() => {
                    const links = buildDbLinks({
                      latinName: t.latinName,
                      chineseName: t.chineseName,
                      ncbiTaxId: t.ncbiTaxId,
                      rank: t.rank,
                      kingdomPath: t.kingdomPath,
                    });
                    const picked = [
                      links.find((l) => l.name === "NCBI Taxonomy"),
                      links.find((l) => l.name.startsWith("GBIF 全球")),
                      links.find((l) => l.name === "IUCN 红色名录") ||
                        links.find((l) => l.name === "BOLD DNA 条形码") ||
                        links.find((l) => l.name.startsWith("NCBI GenBank")),
                    ].filter(Boolean);
                    return picked.map((l) => (
                      <a
                        key={l!.name}
                        href={l!.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 truncate rounded-md border border-foreground/10 bg-muted/40 px-1.5 py-1 text-center text-[10px] font-medium text-muted-foreground transition-all hover:border-primary/40 hover:text-primary"
                      >
                        {l!.name.split(" ")[0]}
                      </a>
                    ));
                  })()}
                </div>
              </div>
            );
          })}
          {/* 添加更多 */}
          {taxa.length < MAX_COMPARE ? (
            <button
              onClick={() => openBrowse({})}
              className="reveal-up group flex min-h-[220px] flex-col items-center justify-center gap-2.5 rounded-xl border-2 border-dashed border-foreground/15 bg-muted/20 text-muted-foreground transition-colors hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
              aria-label="继续添加物种到对比"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-current/30">
                <Plus className="h-5 w-5" />
              </span>
              <span className="text-xs font-medium">再挑一个物种</span>
              <span className="max-w-36 text-center text-[10px] leading-4 text-muted-foreground/60">
                去图鉴目录,把物种卡加入托盘({compareIds.length}/{MAX_COMPARE})
              </span>
            </button>
          ) : (
            <div className="flex min-h-[220px] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-foreground/10 bg-muted/10 text-[11px] text-muted-foreground/50">
              <Sparkles className="h-4 w-4" />
              最多同时对比 {MAX_COMPARE} 个
            </div>
          )}
        </div>
      </div>

      {/* ====== 对比表 ====== */}
      <div className="nh-scroll mt-4 overflow-x-auto rounded-xl border border-foreground/10 bg-card shadow-sm">
        <table className="w-full border-collapse" style={{ minWidth: 560 }}>
          <tbody>
            {diffOnly && shownRows.length === 0 && (
              <tr>
                <td colSpan={taxa.length + 1} className="px-4 py-10 text-center">
                  <p className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
                    <Diff className="h-6 w-6 text-emerald-500/60" />
                    所选物种在各阶元与字段上高度一致——试试换一个差异更大的组合?
                  </p>
                </td>
              </tr>
            )}
            {shownRows.map((row, i) => (
              <tr
                key={row.key}
                className={cn(
                  "border-b border-foreground/8 last:border-0",
                  i % 2 === 1 && "bg-muted/25",
                  diffOnly && !row.uniform && "bg-amber-500/[0.06]"
                )}
              >
                <th
                  scope="row"
                  className="sticky left-0 z-10 w-28 shrink-0 border-r border-foreground/10 bg-card px-3 py-3 text-left align-top"
                >
                  <span className="flex items-center gap-1.5 text-xs font-bold tracking-wide text-muted-foreground">
                    <row.icon className="h-3.5 w-3.5 text-primary/70" />
                    {row.label}
                  </span>
                  <Badge
                    variant="outline"
                    className={cn(
                      "mt-1.5 px-1.5 py-0 text-[9px] font-semibold",
                      row.uniform
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                        : "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400"
                    )}
                  >
                    {row.uniform ? "一致" : "相异"}
                  </Badge>
                </th>
                {taxa.map((t, ti) => (
                  <td
                    key={t.taxon.id}
                    onMouseEnter={() => setHoverCol(t.taxon.id)}
                    className={cn(
                      "min-w-[180px] border-l border-transparent px-3.5 py-3 align-top text-[13px] transition-colors duration-200",
                      hoverCol === t.taxon.id && "border-l-primary/40 bg-primary/[0.07]"
                    )}
                  >
                    {row.render ? (
                      row.render(t)
                    ) : (
                      <span className="text-foreground/85">{row.values[ti] || "—"}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
            {/* 物种描述整行 */}
            <tr className="border-b border-foreground/8 last:border-0">
              <th
                scope="row"
                className="sticky left-0 z-10 w-28 shrink-0 border-r border-foreground/10 bg-card px-3 py-3 text-left align-top"
              >
                <span className="flex items-center gap-1.5 text-xs font-bold tracking-wide text-muted-foreground">
                  <Sparkles className="h-3.5 w-3.5 text-primary/70" />
                  物种速览
                </span>
              </th>
              {taxa.map((t) => (
                <td
                  key={t.taxon.id}
                  onMouseEnter={() => setHoverCol(t.taxon.id)}
                  className={cn(
                    "min-w-[200px] border-l border-transparent px-3.5 py-3 align-top transition-colors duration-200",
                    hoverCol === t.taxon.id && "border-l-primary/40 bg-primary/[0.07]"
                  )}
                >
                  <p className="text-[13px] leading-6 text-foreground/85">
                    {(t.taxon.description || "").slice(0, 160)}
                    {(t.taxon.description || "").length > 160 ? "…" : ""}
                  </p>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-center text-[11px] text-muted-foreground/60">
        对比数据与图鉴条目同源;「一致/相异」徽标提示该阶元或字段在所选物种间是否相同;用「只看差异」可隐藏完全一致的行。详细数据库入口见各列头部快捷链接。
      </p>

      {/* 剪贴板不可用时的手动复制兑底 */}
      <ShareDialog
        open={!!fallback}
        onOpenChange={(o) => !o && setFallback(null)}
        title={fallback?.kind === "md" ? "Markdown 对比表" : "分享链接"}
        text={fallback?.text || ""}
        onCopied={() => {
          if (fallback) {
            setCopied(fallback.kind);
            setTimeout(() => setCopied(null), 2000);
          }
        }}
      />
    </div>
  );
}
