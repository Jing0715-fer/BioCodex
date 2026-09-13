"use client";

/** 前端友好的剪贴板写入(带 execCommand 降级);仅在客户端调用 */
export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* 降级到 execCommand */
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

/** 图鉴目录筛选 → URLSearchParams */
export function browseFilterToParams(p: {
  kingdom?: string | null;
  iucn?: string | null;
  tag?: string | null;
  hasImage?: boolean;
  q?: string;
  sort?: string;
}): URLSearchParams {
  const sp = new URLSearchParams();
  if (p.kingdom) sp.set("kingdom", p.kingdom);
  if (p.iucn) sp.set("iucn", p.iucn);
  if (p.tag) sp.set("tag", p.tag);
  if (p.hasImage) sp.set("hasImage", "1");
  if (p.q?.trim()) sp.set("q", p.q.trim());
  if (p.sort && p.sort !== "default") sp.set("sort", p.sort);
  return sp;
}
