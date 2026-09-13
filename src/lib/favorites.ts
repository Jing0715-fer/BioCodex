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
