"use client";

import { useState, useRef, useEffect } from "react";
import { useBioStore } from "@/lib/bio-store";
import { useSearch, type SearchRow } from "@/hooks/use-bio";
import { useTheme } from "next-themes";
import { useViewHistory, clearHistory, relativeTime } from "@/lib/view-history";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search, Sun, Moon, Dna, MapPin, ChevronRight, Sparkles, Command, LayoutGrid, Keyboard, History, Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { KingdomIcon, kingdomTheme, RankBadge } from "./taxa-icon";

export function BioHeader() {
  const { view, goHome, explore, openTaxon, openSearch, openBrowse, setAgentOpen, setShortcutsOpen } = useBioStore();
  const { theme, setTheme } = useTheme();
  const [q, setQ] = useState("");
  const [focus, setFocus] = useState(false);
  const [histOpen, setHistOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const histRef = useRef<HTMLDivElement>(null);
  const history = useViewHistory();
  const { data: results, isFetching } = useSearch(q, q.trim().length >= 1 && focus);

  // ⌘K / Ctrl+K 聚焦搜索
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") inputRef.current?.blur();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // 点击外部关闭建议与足迹
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setFocus(false);
      if (histRef.current && !histRef.current.contains(e.target as Node)) setHistOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (q.trim()) {
      openSearch(q.trim());
      setFocus(false);
      inputRef.current?.blur();
    }
  };

  const active = (t: string) => view.type === t;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-foreground/10 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-3 px-4 sm:px-6">
        {/* Logo */}
        <button
          onClick={goHome}
          className="group flex shrink-0 items-center gap-2.5"
          aria-label="返回 BioCodex 首页"
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
            <Dna className="h-5 w-5" />
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-lg font-bold tracking-tight text-foreground">
              BioCodex
            </span>
            <span className="text-[11px] tracking-[0.2em] text-muted-foreground">生物图鉴</span>
          </span>
        </button>

        {/* 导航 */}
        <nav className="ml-1 hidden items-center gap-1 md:flex" aria-label="主导航">
          <Button
            variant="ghost"
            size="sm"
            className={cn("h-9 gap-1.5", active("home") && "bg-accent text-accent-foreground")}
            onClick={goHome}
          >
            <MapPin className="h-4 w-4" />
            总览
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-9 gap-1.5",
              (active("explore") || active("taxon")) && "bg-accent text-accent-foreground"
            )}
            onClick={() => explore(null)}
          >
            <Sparkles className="h-4 w-4" />
            分类探索
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn("h-9 gap-1.5", active("browse") && "bg-accent text-accent-foreground")}
            onClick={() => openBrowse({})}
          >
            <LayoutGrid className="h-4 w-4" />
            图鉴目录
          </Button>
        </nav>

        {/* 搜索 */}
        <div ref={boxRef} className="relative ml-auto w-full max-w-xl">
          <form onSubmit={submit} className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              ref={inputRef}
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setFocus(true);
              }}
              onFocus={() => setFocus(true)}
              placeholder="搜索物种 / 拉丁学名 / 门类……"
              className="h-10 rounded-full border-foreground/15 bg-card pl-9 pr-12 text-sm shadow-none focus-visible:ring-forest/40"
              aria-label="全局搜索"
            />
            <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-0.5 rounded border border-foreground/15 bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground sm:flex">
              <Command className="h-2.5 w-2.5" />K
            </kbd>
          </form>

          {/* 搜索建议下拉 */}
          {focus && q.trim() && (
            <div className="nh-scroll absolute left-0 right-0 top-12 z-50 max-h-[70vh] overflow-y-auto rounded-xl border border-foreground/10 bg-popover shadow-xl">
              {isFetching && !results?.length && (
                <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                  正在检索图鉴……
                </div>
              )}
              {results && results.length > 0 && (
                <ul className="py-1.5">
                  {results.slice(0, 8).map((r: SearchRow) => (
                    <li key={r.id}>
                      <button
                        className="flex w-full items-center gap-3 px-3 py-2 text-left transition-colors hover:bg-accent"
                        onClick={() => {
                          openTaxon(r.id);
                          setFocus(false);
                          inputRef.current?.blur();
                        }}
                      >
                        {r.image ? (
                          <img
                            src={r.image}
                            alt={r.chineseName}
                            className="h-9 w-9 shrink-0 rounded-md object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <span
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md"
                            style={{ background: `${kingdomTheme(r.kingdom).color}18` }}
                          >
                            <KingdomIcon kingdom={r.kingdom} className="h-4 w-4" />
                          </span>
                        )}
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-2">
                            <span className="truncate font-medium text-foreground">{r.chineseName}</span>
                            <RankBadge rank={r.rank} />
                          </span>
                          <span className="latin block truncate text-xs text-muted-foreground">
                            {r.latinName}
                          </span>
                        </span>
                        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                      </button>
                    </li>
                  ))}
                  <li className="border-t border-foreground/10 px-3 py-2">
                    <button
                      className="w-full rounded-md py-1.5 text-center text-sm font-medium text-primary hover:bg-accent"
                      onClick={() => submit()}
                    >
                      查看全部 {results.length} 条结果 →
                    </button>
                  </li>
                </ul>
              )}
              {results && results.length === 0 && !isFetching && (
                <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                  没有找到「{q}」相关的分类单元,试试别的关键词?
                </div>
              )}
            </div>
          )}
        </div>

        {/* Agent 按钮 */}
        <Button
          variant="outline"
          size="sm"
          className="ml-1 hidden h-10 shrink-0 gap-1.5 rounded-full border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground sm:flex"
          onClick={() => setAgentOpen(true)}
        >
          <Sparkles className="h-4 w-4" />
          助手
        </Button>

        {/* 浏览足迹 */}
        <div ref={histRef} className="relative shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-9 w-9", history.length > 0 && "text-forest")}
            onClick={() => setHistOpen((v) => !v)}
            aria-label={`浏览足迹(${history.length} 条,最近看过:${history[0]?.chineseName ?? "暂无"})`}
            title="浏览足迹"
          >
            <History className="h-4 w-4" />
            {history.length > 0 && (
              <span className="absolute right-1 top-1 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-amber-600 px-0.5 text-[8px] font-bold tabular-nums text-white">
                {history.length > 9 ? "9+" : history.length}
              </span>
            )}
          </Button>
          <AnimatePresence>
            {histOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute right-0 top-11 z-50 w-72 overflow-hidden rounded-xl border border-foreground/10 bg-popover shadow-xl"
                role="dialog"
                aria-label="最近浏览足迹"
              >
                <div className="flex items-center justify-between border-b border-foreground/10 bg-muted/40 px-3 py-2">
                  <p className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-muted-foreground">
                    <History className="h-3.5 w-3.5 text-primary" />
                    浏览足迹 · VESTIGIA
                  </p>
                  {history.length > 0 && (
                    <button
                      className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => clearHistory()}
                    >
                      <Trash2 className="h-3 w-3" />
                      清空
                    </button>
                  )}
                </div>
                {history.length === 0 ? (
                  <p className="px-4 py-6 text-center text-xs leading-5 text-muted-foreground">
                    还没有足迹——翻开任意图鉴页面,
                    <br />
                    你的巡览路径会出现在这里
                  </p>
                ) : (
                  <ul className="nh-scroll max-h-80 overflow-y-auto py-1.5">
                    {history.map((h) => (
                      <li key={h.id}>
                        <button
                          className="flex w-full items-center gap-2.5 px-3 py-2 text-left transition-colors hover:bg-accent"
                          onClick={() => {
                            openTaxon(h.id);
                            setHistOpen(false);
                          }}
                        >
                          {h.image ? (
                            <img
                              src={h.image}
                              alt={h.chineseName}
                              className="h-8 w-8 shrink-0 rounded-md object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <span
                              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md"
                              style={{ background: `${kingdomTheme(h.kingdom).color}18` }}
                            >
                              <KingdomIcon kingdom={h.kingdom} className="h-3.5 w-3.5" />
                            </span>
                          )}
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[13px] font-medium text-foreground">{h.chineseName}</span>
                            <span className="latin block truncate text-[10px] text-muted-foreground">{h.latinName}</span>
                          </span>
                          <span className="shrink-0 text-[9px] tabular-nums text-muted-foreground/70">
                            {relativeTime(h.ts)}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 快捷键帮助 */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden h-9 w-9 shrink-0 sm:flex"
          onClick={() => setShortcutsOpen(true)}
          aria-label="查看键盘快捷键(按 ? 键也可打开)"
          title="键盘快捷键 (?)"
        >
          <Keyboard className="h-4 w-4" />
        </Button>

        {/* 主题切换 */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 shrink-0"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="切换明暗主题"
        >
          {/* CSS 控制图标切换,避免 SSR/客户端水合不一致 */}
          <Sun className="hidden h-4 w-4 dark:block" />
          <Moon className="h-4 w-4 dark:hidden" />
        </Button>
      </div>
    </header>
  );
}
