"use client";

import { useEffect } from "react";
import { useBioStore } from "@/lib/bio-store";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Search, ArrowLeftRight, XCircle, Keyboard, CornerDownLeft, HelpCircle, MousePointerClick, Bookmark } from "lucide-react";

interface Shortcut {
  keys: string[];
  desc: string;
  icon: any;
}

const GROUPS: { title: string; hint: string; items: Shortcut[] }[] = [
  {
    title: "全局",
    hint: "任意页面可用",
    items: [
      { keys: ["⌘", "K"], desc: "聚焦全局搜索框(Windows 用 Ctrl+K)", icon: Search },
      { keys: ["?"], desc: "打开 / 关闭本快捷键面板", icon: HelpCircle },
      { keys: ["Esc"], desc: "关闭弹窗、灯箱、助手面板与下拉建议", icon: XCircle },
    ],
  },
  {
    title: "物种详情页",
    hint: "查看物种时可用",
    items: [
      { keys: ["←", "→"], desc: "灯箱放大图中切换同属上一个 / 下一个物种", icon: ArrowLeftRight },
      { keys: ["F"], desc: "收藏 / 取消收藏当前物种(存入标本夹)", icon: Bookmark },
    ],
  },
  {
    title: "AI 助手",
    hint: "阿博对话框内",
    items: [
      { keys: ["Enter"], desc: "发送消息(Shift + Enter 换行)", icon: CornerDownLeft },
    ],
  },
  {
    title: "指针操作",
    hint: "同样高效",
    items: [
      { keys: ["点击"], desc: "卡片「对比」按钮加入托盘;卡片书签按钮收进标本夹;详情页主图点击放大", icon: MousePointerClick },
    ],
  },
];

export function ShortcutsDialog() {
  const { shortcutsOpen, setShortcutsOpen } = useBioStore();

  // 按 ? 键(Shift+/)全局开关;输入框聚焦时忽略
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "?") return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      e.preventDefault();
      setShortcutsOpen(!useBioStore.getState().shortcutsOpen);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setShortcutsOpen]);

  return (
    <Dialog open={shortcutsOpen} onOpenChange={setShortcutsOpen}>
      <DialogContent className="max-w-lg rounded-2xl border-foreground/15 bg-card p-0 gap-0 overflow-hidden">
        {/* 标题区 */}
        <div className="relative border-b border-foreground/10 bg-gradient-to-b from-primary/10 to-transparent px-6 pb-5 pt-6">
          <div className="pointer-events-none absolute -right-6 -top-8 select-none latin text-[120px] font-bold leading-none text-foreground/[0.05]">
            Kb
          </div>
          <DialogHeader className="space-y-1.5">
            <DialogTitle className="flex items-center gap-2.5 font-display text-xl font-bold">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Keyboard className="h-4 w-4" />
              </span>
              键盘快捷键
              <span className="latin text-sm font-normal text-muted-foreground">Claves Breves</span>
            </DialogTitle>
            <DialogDescription className="text-left text-sm text-muted-foreground">
              像博物学家翻阅标本柜一样,用键盘在图鉴间快速移动
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* 分组列表 */}
        <div className="nh-scroll max-h-[60vh] overflow-y-auto px-6 py-5">
          {GROUPS.map((g, gi) => (
            <div key={g.title} className={gi > 0 ? "mt-5" : ""}>
              <div className="mb-2.5 flex items-baseline gap-2">
                <h3 className="text-xs font-bold tracking-widest text-foreground">{g.title}</h3>
                <span className="text-[10px] text-muted-foreground/60">{g.hint}</span>
              </div>
              <ul className="space-y-1">
                {g.items.map((s) => (
                  <li
                    key={s.desc}
                    className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-muted/50"
                  >
                    <span className="flex shrink-0 items-center gap-1">
                      {s.keys.map((k) => (
                        <kbd
                          key={k}
                          className="inline-flex h-7 min-w-7 items-center justify-center rounded-md border border-foreground/15 border-b-2 bg-muted px-1.5 font-sans text-[11px] font-semibold text-foreground shadow-sm"
                        >
                          {k}
                        </kbd>
                      ))}
                    </span>
                    <span className="flex min-w-0 items-center gap-2 text-sm text-foreground/80">
                      <s.icon className="h-3.5 w-3.5 shrink-0 text-primary/60" />
                      {s.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 底部提示 */}
        <div className="border-t border-foreground/10 bg-muted/30 px-6 py-3 text-center text-[11px] text-muted-foreground">
          随时按 <kbd className="rounded border border-foreground/15 bg-muted px-1 py-0.5 text-[10px] font-semibold">?</kbd> 唤回这份速查表
        </div>
      </DialogContent>
    </Dialog>
  );
}
