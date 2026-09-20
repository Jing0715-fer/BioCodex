"use client";

/**
 * 全局错误边界(E25 打磨)
 *
 * 兜住任何客户端渲染异常(如坏 hash 直链、意外的数据形态),
 * 以「雕版标本卡」风格给出恢复入口,替代 Next.js 默认白屏。
 * 注:重置按钮会重渲染出错的路由段,不清空 React Query 缓存。
 */
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dna, RefreshCw, Compass } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 开发态把异常抛到控制台,便于排查;生产静默
    console.error("[BioCodex] 客户端异常:", error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="flex max-w-lg flex-col items-center gap-5 rounded-2xl border border-foreground/10 bg-card p-10 text-center paper-texture shadow-sm sm:p-14">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-foreground/5">
          <Dna className="h-8 w-8 text-muted-foreground" />
        </span>
        <div className="space-y-2">
          <h2 className="font-display text-xl font-bold text-foreground">这一页的标本卡打不开了</h2>
          <p className="text-sm leading-6 text-muted-foreground">
            渲染时遇到意外错误。可以重试一次,或回图鉴总览继续浏览;
            若持续出现,欢迎通过仓库反馈问题。
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button onClick={reset} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            重试
          </Button>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => {
              window.location.hash = "";
              window.location.reload();
            }}
          >
            <Compass className="h-4 w-4" />
            回到总览
          </Button>
        </div>
      </div>
    </div>
  );
}
