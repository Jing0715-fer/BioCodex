"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ClipboardCopy, Check } from "lucide-react";
import { copyText } from "@/lib/clipboard";

/**
 * 剪贴板不可用时的手动复制兜底对话框。
 * open 由调用方依据「复制失败」状态控制;text 为待复制内容。
 */
export function ShareDialog({
  open,
  onOpenChange,
  title,
  text,
  onCopied,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  title: string;
  text: string;
  onCopied?: () => void;
}) {
  const [again, setAgain] = useState(false);
  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) setAgain(false); onOpenChange(o); }}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ClipboardCopy className="h-4 w-4 text-primary" />
            {title}
          </DialogTitle>
          <DialogDescription>
            浏览器剪贴板不可用,请选中文本手动复制(⌘/Ctrl + A 全选)
          </DialogDescription>
        </DialogHeader>
        <textarea
          readOnly
          value={text}
          onFocus={(e) => e.currentTarget.select()}
          className="nh-scroll h-56 w-full resize-none rounded-lg border border-foreground/15 bg-muted/40 p-3 font-mono text-xs leading-5 focus:outline-none focus:ring-2 focus:ring-primary/40"
          aria-label="待复制文本"
        />
        <div className="flex items-center justify-between gap-2">
          {again && (
            <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
              <Check className="h-3.5 w-3.5" />
              复制成功
            </span>
          )}
          <span className="flex-1" />
          <Button
            size="sm"
            className="gap-1.5 rounded-full"
            onClick={() => {
              copyText(text).then((ok) => {
                if (ok) {
                  setAgain(true);
                  setTimeout(() => {
                    setAgain(false);
                    onOpenChange(false);
                  }, 800);
                  onCopied?.();
                }
              });
            }}
          >
            再次尝试复制
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
