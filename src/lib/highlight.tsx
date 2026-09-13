import type { ReactNode } from "react";

/** 转义正则特殊字符 */
function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * 在文本中高亮所有匹配的关键词(拉丁名大小写不敏感;中文直接匹配)。
 * 返回带 <mark> 的片段数组;无匹配时返回原文。
 */
export function highlightText(text: string, query: string): ReactNode {
  const q = query.trim();
  if (!q || !text) return text;
  const re = new RegExp(escapeRegExp(q), "gi");
  const parts = text.split(re);
  if (parts.length === 1) return text;
  // split 捕获组已被移除,需要手动重组:遍历原文找到所有匹配位置
  const out: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  const re2 = new RegExp(escapeRegExp(q), "gi");
  let key = 0;
  while ((m = re2.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(
      <mark
        key={`hl-${key++}`}
        className="rounded-sm bg-amber-200/70 px-0.5 font-semibold text-foreground dark:bg-amber-400/25"
      >
        {m[0]}
      </mark>
    );
    last = m.index + m[0].length;
    if (m[0].length === 0) re2.lastIndex++; // 防零长死循环
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
