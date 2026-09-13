"use client";

import { useEffect, useState } from "react";

/**
 * 浏览足迹:localStorage 持久化的最近查看分类单元(最多 12 条,去重)。
 * 轻量级事件订阅模型,避免为局部状态引入全局 store 复杂度。
 */

export interface HistoryEntry {
  id: string;
  chineseName: string;
  latinName: string;
  kingdom: string;
  image: string | null;
  ts: number;
}

const KEY = "biocodex:view-history";
const MAX = 12;
const EVT = "biocodex:history-change";

function read(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.filter((x) => x && typeof x.id === "string").slice(0, MAX) : [];
  } catch {
    return [];
  }
}

function write(entries: HistoryEntry[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(entries.slice(0, MAX)));
    window.dispatchEvent(new CustomEvent(EVT));
  } catch {
    /* 隐私模式等场景静默降级 */
  }
}

/** 记录一次查看(去重后置顶;非物种也可记录,便于回溯任意阶元) */
export function pushHistory(e: Omit<HistoryEntry, "ts">) {
  const prev = read().filter((x) => x.id !== e.id);
  write([{ ...e, ts: Date.now() }, ...prev]);
}

/** 清空足迹 */
export function clearHistory() {
  write([]);
}

/** 订阅式读取 hook(同页多实例同步) */
export function useViewHistory() {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);

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

/** 相对时间:刚刚 / N分钟前 / 今天HH:mm / 昨天HH:mm / M月D日 */
export function relativeTime(ts: number): string {
  const diff = Date.now() - ts;
  if (diff < 60_000) return "刚刚";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)} 分钟前`;
  const d = new Date(ts);
  const now = new Date();
  const hm = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  const sameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  if (sameDay(d, now)) return `今天 ${hm}`;
  const yesterday = new Date(now.getTime() - 86_400_000);
  if (sameDay(d, yesterday)) return `昨天 ${hm}`;
  return `${d.getMonth() + 1}月${d.getDate()}日`;
}
