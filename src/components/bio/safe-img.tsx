"use client";

import { useState, type ReactNode } from "react";

/**
 * 带兜底的插图组件(E25 打磨)
 *
 * 背景:全站 269 张 AI 插图会被复审守护持续质检;复审下架存在「DB 已清引用、
 * 客户端 React Query 缓存仍持旧数据」的窗口期,此时 img 会 404 变破图。
 * 行为:src 为空或加载失败(onError)时,优雅降级为调用方提供的 fallback
 * (通常是雕版占位图 TaxaPlaceholder),而非浏览器默认破图图标。
 */
export function SafeImg({
  src,
  fallback,
  alt,
  className,
  eager,
  onClick,
}: {
  src: string | null | undefined;
  /** 降级视图(一般为 <TaxaPlaceholder …/>) */
  fallback: ReactNode;
  alt: string;
  className?: string;
  /** 首屏关键图可禁用懒加载 */
  eager?: boolean;
  onClick?: React.MouseEventHandler<HTMLImageElement>;
}) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <>{fallback}</>;
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={eager ? "eager" : "lazy"}
      onError={() => setFailed(true)}
      onClick={onClick}
    />
  );
}
