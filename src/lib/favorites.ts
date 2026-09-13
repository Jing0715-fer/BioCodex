"use client";

import { useEffect, useState } from "react";

/**
 * 标本收藏夹:localStorage 持久化的收藏物种(最多 60 条,去重)。
 * 与 view-history 同款轻量事件订阅模型,字段足以离线渲染卡片与对比。
 */

export interface FavoriteEntry {
  id: string;
  chineseName: string;
  latinName: string;
  kingdom: string;
  image: string | null;
  conservation: string | null;
  ncbiTaxId: number | null;
  description: string | null;
  /** 收藏时间戳 */
  ts: number;
}

const KEY = "biocodex:favorites";
const MAX = 60;
const EVT = "biocodex:favorites-change";

function read(): FavoriteEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr)
      ? arr.filter((x) => x && typeof x.id === "string" && typeof x.ts === "number").slice(0, MAX)
      : [];
  } catch {
    return [];
  }
}

function write(entries: FavoriteEntry[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(entries.slice(0, MAX)));
    window.dispatchEvent(new CustomEvent(EVT));
  } catch {
    /* 隐私模式等场景静默降级 */
  }
}

/** 切换收藏状态;返回结果供 toast 提示 */
export function toggleFavorite(e: Omit<FavoriteEntry, "ts">): "added" | "removed" | "full" {
  const prev = read();
  if (prev.some((x) => x.id === e.id)) {
    write(prev.filter((x) => x.id !== e.id));
    return "removed";
  }
  if (prev.length >= MAX) return "full";
  write([{ ...e, ts: Date.now() }, ...prev]);
  return "added";
}

export function isFavorite(id: string): boolean {
  return read().some((x) => x.id === id);
}

/** 全部移除(需二次确认的场景由 UI 层负责) */
export function clearFavorites() {
  write([]);
}

export const FAVORITES_MAX = MAX;

/** 订阅式读取 hook(同页多实例同步 + 跨标签页同步) */
export function useFavorites() {
  const [entries, setEntries] = useState<FavoriteEntry[]>([]);

  useEffect(() => {
    const sync = () => setEntries(read());
    sync();
    window.addEventListener(EVT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return entries;
}

// ===== 备份导出 / 导入 =====

export interface FavoritesBackup {
  format: "biocodex.favorites.backup";
  version: 1;
  exportedAt: string;
  count: number;
  entries: FavoriteEntry[];
}

/** 导出备份 JSON 字符串(含格式头与导出时间) */
export function exportFavoritesData(): string {
  const entries = read();
  const backup: FavoritesBackup = {
    format: "biocodex.favorites.backup",
    version: 1,
    exportedAt: new Date().toISOString(),
    count: entries.length,
    entries,
  };
  return JSON.stringify(backup, null, 2);
}

export interface ImportResult {
  added: number;
  skipped: number;
  total: number;
}

/**
 * 导入备份:与现有收藏按 id 合并去重(不覆盖,新条目按备份内时间排序插入),
 * 超出上限的条目截断。解析失败抛错由调用方 toast 提示。
 */
export function importFavoritesData(raw: string): ImportResult {
  const data = JSON.parse(raw) as Partial<FavoritesBackup>;
  if (!data || !Array.isArray(data.entries)) {
    throw new Error("格式不正确:缺少 entries 数组");
  }
  const incoming = data.entries
    .filter((x) => x && typeof x.id === "string" && typeof x.chineseName === "string")
    .map((x) => ({
      id: x.id,
      chineseName: x.chineseName,
      latinName: typeof x.latinName === "string" ? x.latinName : "",
      kingdom: typeof x.kingdom === "string" ? x.kingdom : "Animalia",
      image: x.image ?? null,
      conservation: x.conservation ?? null,
      ncbiTaxId: typeof x.ncbiTaxId === "number" ? x.ncbiTaxId : null,
      description: x.description ?? null,
      ts: typeof x.ts === "number" ? x.ts : Date.now(),
    })) as FavoriteEntry[];

  const prev = read();
  const existingIds = new Set(prev.map((x) => x.id));
  const fresh = incoming.filter((x) => !existingIds.has(x.id));
  // 合并:新导入的按时间正序追加在旧收藏之后(保留旧条目的置顶次序)
  const merged = [...prev, ...fresh].slice(0, MAX);
  write(merged);
  return { added: fresh.length, skipped: incoming.length - fresh.length, total: merged.length };
}
