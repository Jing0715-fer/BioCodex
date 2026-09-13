"use client";

import { useEffect, useRef, useState } from "react";
import { useBioStore } from "@/lib/bio-store";
import { KINGDOM_THEME, IUCN_INFO } from "@/lib/bio-domain";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { KingdomIcon } from "./taxa-icon";
import ReactMarkdown from "react-markdown";
import { Sparkles, Send, X, RotateCcw, Bot, User, ChevronRight, GitCompareArrows, Bookmark, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useFavorites, toggleFavorite } from "@/lib/favorites";

interface MatchDTO {
  id: string;
  latinName: string;
  chineseName: string;
  rank: string;
  image: string | null;
  conservation: string | null;
  kingdom: string;
}

interface Msg {
  role: "user" | "assistant";
  content: string;
  matches?: MatchDTO[];
  degraded?: boolean;
}

const SUGGESTIONS = [
  "介绍一下大熊猫,它为什么吃竹子?",
  "帮我找一些极危(CR)的物种",
  "真菌界有哪些明星物种?",
  "大肠杆菌和古菌有什么区别?",
  "怎么把两个物种加入对比并导出表格?",
];

/** 把 [[id]] 替换为 markdown 链接,便于 react-markdown 渲染成跳转芯片;清除一切无效标记 */
function preRender(content: string, matches?: MatchDTO[]): string {
  const map = new Map((matches || []).map((m) => [m.id, m]));
  let out = content.replace(/\[\[([a-zA-Z0-9]+)\]\]/g, (full, id) => {
    const m = map.get(id);
    return m ? `[${m.chineseName}](#taxon:${id})` : "";
  });
  // 清除残留的任何 [[...]] 标记(含模型输出的占位符,如 [[需确认id]])
  out = out.replace(/\[\[[^\]]*\]\]/g, "");
  return out;
}

function AssistantMarkdown({ content, matches }: { content: string; matches?: MatchDTO[] }) {
  const { openTaxon, setAgentOpen } = useBioStore();
  return (
    <ReactMarkdown
      components={{
        a: ({ href, children }) => {
          if (href?.startsWith("#taxon:")) {
            const id = href.slice(7);
            return (
              <button
                onClick={() => {
                  openTaxon(id);
                  setAgentOpen(false);
                }}
                className="mx-0.5 inline-flex max-w-48 items-center gap-1 rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 align-baseline text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <span className="truncate">{children}</span>
                <ChevronRight className="h-3 w-3 shrink-0" />
              </button>
            );
          }
          return (
            <a href={href} target="_blank" rel="noopener noreferrer" className="underline">
              {children}
            </a>
          );
        },
        p: ({ children }) => <p className="leading-6 [&:not(:first-child)]:mt-2">{children}</p>,
        ul: ({ children }) => <ul className="mt-2 list-disc space-y-1 pl-4">{children}</ul>,
        ol: ({ children }) => <ol className="mt-2 list-decimal space-y-1 pl-4">{children}</ol>,
        strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
        em: ({ children }) => <em className="latin">{children}</em>,
        h3: ({ children }) => <h3 className="mt-2 font-semibold">{children}</h3>,
      }}
    >
      {preRender(content, matches)}
    </ReactMarkdown>
  );
}

export function AgentPanel() {
  const { agentOpen, setAgentOpen, openTaxon, agentUnread, clearUnread, toggleCompare, compareIds } = useBioStore();
  const favorites = useFavorites();
  const isFav = (id: string) => favorites.some((f) => f.id === id);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "你好,我是**阿博**,BioCodex 的 AI 博物学家助手 🧬\n\n我可以:\n- 为你讲解图鉴里的任意物种与类群\n- 帮你按特征、保护等级、门类**寻找条目**(下方卡片可直接跳转图鉴页)\n- 告诉你如何使用**图鉴目录**筛选与**物种对比**功能\n- 聊聊分类学、生态学与保护生物学\n\n试试下面的提问,或直接输入你好奇的问题。",
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (agentOpen) clearUnread();
  }, [agentOpen, clearUnread]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  const send = async (text?: string) => {
    const q = (text ?? input).trim();
    if (!q || busy) return;
    setInput("");
    const next: Msg[] = [...messages, { role: "user", content: q }];
    setMessages(next);
    setBusy(true);
    try {
      const r = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.filter((m, i) => !(i === 0 && m.role === "assistant")).slice(-12),
        }),
      });
      const j = await r.json();
      if (j?.success) {
        setMessages([...next, { role: "assistant", content: j.content, matches: j.matches, degraded: !!j.degraded }]);
      } else {
        setMessages([
          ...next,
          { role: "assistant", content: "抱歉,我暂时失联了,请稍候再试一次 🙇" },
        ]);
      }
    } catch {
      setMessages([
        ...next,
        { role: "assistant", content: "网络似乎打了个盹,再试一次吧 🙇" },
      ]);
      toast({ title: "请求失败", description: "请检查网络后重试", variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  const reset = () => {
    setMessages(messages.slice(0, 1));
  };

  return (
    <>
      {/* 悬浮按钮 */}
      <button
        onClick={() => setAgentOpen(!agentOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/40",
          agentOpen && "scale-90 opacity-0 pointer-events-none"
        )}
        aria-label="打开 AI 博物学家助手"
      >
        <Sparkles className="h-6 w-6" />
        {agentUnread > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
            {agentUnread}
          </span>
        )}
      </button>

      {/* 聊天面板 */}
      <Sheet open={agentOpen} onOpenChange={setAgentOpen}>
        <SheetContent
          side="right"
          className="flex h-full w-full flex-col gap-0 p-0 sm:max-w-md md:max-w-lg"
        >
          <SheetHeader className="flex-row items-center gap-3 border-b border-foreground/10 bg-primary/5 px-4 py-3">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow">
              <Bot className="h-5 w-5" />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
            </span>
            <div className="flex-1 text-left">
              <SheetTitle className="text-base font-bold">阿博 · AI 博物学家</SheetTitle>
              <SheetDescription className="text-xs">
                {busy
                  ? "正在翻阅图鉴与文献……"
                  : messages.some((m) => m.degraded)
                  ? "离线检索模式 · 回答由本地数据库生成"
                  : "在线 · 可查询图鉴收录的全部条目"}
              </SheetDescription>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={reset} title="清空对话">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </SheetHeader>

          {/* 消息区 */}
          <div ref={scrollRef} className="nh-scroll flex-1 overflow-y-auto px-4 py-4">
            <div className="space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={cn("flex gap-2.5", m.role === "user" && "flex-row-reverse")}>
                  <span
                    className={cn(
                      "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white shadow-sm",
                      m.role === "assistant" ? "bg-primary" : "bg-muted-foreground"
                    )}
                  >
                    {m.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </span>
                  <div
                    className={cn(
                      "min-w-0 max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm shadow-sm",
                      m.role === "assistant"
                        ? "rounded-tl-sm border border-foreground/10 bg-card text-foreground/90"
                        : "rounded-tr-sm bg-primary text-primary-foreground"
                    )}
                  >
                    {m.role === "assistant" ? (
                      <>
                        {m.degraded && (
                          <span className="mb-2 inline-flex items-center gap-1 rounded-full border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400">
                            <WifiOff className="h-3 w-3" /> 离线检索模式 · 点击条目名仍可跳转
                          </span>
                        )}
                        <AssistantMarkdown content={m.content} matches={m.matches} />
                        {/* 匹配条目卡片 */}
                        {m.matches && m.matches.length > 0 && (
                          <div className="mt-3 border-t border-foreground/10 pt-3">
                            <p className="mb-2 text-[11px] font-bold tracking-wider text-muted-foreground">
                              📖 相关图鉴条目(点击直达)
                            </p>
                            <div className="space-y-1.5">
                              {m.matches.slice(0, 6).map((mt) => {
                                const theme = KINGDOM_THEME[mt.kingdom] || KINGDOM_THEME.Animalia;
                                const inCompare = compareIds.includes(mt.id);
                                return (
                                  <div key={mt.id} className="flex items-center gap-1.5">
                                    <button
                                      onClick={() => {
                                        openTaxon(mt.id);
                                        setAgentOpen(false);
                                      }}
                                      className="flex min-w-0 flex-1 items-center gap-2.5 rounded-lg border border-foreground/10 bg-muted/40 p-2 text-left transition-all hover:border-primary/40 hover:bg-primary/5"
                                    >
                                    {mt.image ? (
                                      <img
                                        src={mt.image}
                                        alt={mt.chineseName}
                                        className="h-9 w-9 shrink-0 rounded-md object-cover"
                                        loading="lazy"
                                      />
                                    ) : (
                                      <span
                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md"
                                        style={{ background: `${theme.color}18` }}
                                      >
                                        <KingdomIcon kingdom={mt.kingdom} className="h-4 w-4" />
                                      </span>
                                    )}
                                    <span className="min-w-0 flex-1">
                                      <span className="flex items-center gap-1.5">
                                        <span className="truncate text-[13px] font-semibold">
                                          {mt.chineseName}
                                        </span>
                                        {mt.conservation && (
                                          <span
                                            className={cn(
                                              "rounded-sm px-1 py-0.5 text-[9px] font-bold text-white",
                                              IUCN_INFO[mt.conservation]?.bg
                                            )}
                                          >
                                            {mt.conservation}
                                          </span>
                                        )}
                                      </span>
                                      <span className="latin block truncate text-[11px] text-muted-foreground">
                                        {mt.latinName}
                                      </span>
                                    </span>
                                    <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/40" />
                                    </button>
                                    <button
                                      onClick={() => {
                                        const r = toggleCompare(mt.id);
                                        if (r === "added")
                                          toast({
                                            title: `已将「${mt.chineseName}」加入对比托盘`,
                                            description: `当前 ${compareIds.length + 1}/3 个物种,可继续挑选后开始并排比较`,
                                          });
                                        else if (r === "removed")
                                          toast({ title: `已将「${mt.chineseName}」移出对比托盘` });
                                        else
                                          toast({
                                            title: "对比托盘已满(3/3)",
                                            description: "请先移除一个物种,或直接开始对比",
                                            variant: "destructive",
                                          });
                                      }}
                                      aria-label={inCompare ? `将${mt.chineseName}移出对比` : `将${mt.chineseName}加入对比`}
                                      title={inCompare ? "移出对比" : "加入对比"}
                                      className={cn(
                                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-all",
                                        inCompare
                                          ? "border-primary/50 bg-primary/15 text-primary"
                                          : "border-foreground/10 bg-muted/40 text-muted-foreground/60 hover:border-primary/40 hover:text-primary"
                                      )}
                                    >
                                      <GitCompareArrows className="h-4 w-4" />
                                    </button>
                                    <button
                                      onClick={() => {
                                        const r = toggleFavorite({
                                          id: mt.id,
                                          chineseName: mt.chineseName,
                                          latinName: mt.latinName,
                                          kingdom: mt.kingdom,
                                          image: mt.image,
                                          conservation: mt.conservation,
                                          ncbiTaxId: null,
                                          description: null,
                                        });
                                        if (r === "added")
                                          toast({
                                            title: `已将「${mt.chineseName}」收进标本夹`,
                                            description: "头栏书签图标可查看全部收藏",
                                          });
                                        else if (r === "removed") toast({ title: `已将「${mt.chineseName}」从标本夹取出` });
                                      }}
                                      aria-label={`收藏${mt.chineseName}到标本夹`}
                                      title="收进标本夹"
                                      className={cn(
                                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-all",
                                        isFav(mt.id)
                                          ? "border-amber-500/50 bg-amber-500/15 text-amber-600"
                                          : "border-foreground/10 bg-muted/40 text-muted-foreground/60 hover:border-amber-500/40 hover:text-amber-600"
                                      )}
                                    >
                                      <Bookmark className={cn("h-4 w-4", isFav(mt.id) && "fill-current")} />
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <p className="leading-6">{m.content}</p>
                    )}
                  </div>
                </div>
              ))}

              {busy && (
                <div className="flex gap-2.5">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-sm">
                    <Bot className="h-4 w-4" />
                  </span>
                  <div className="rounded-2xl rounded-tl-sm border border-foreground/10 bg-card px-4 py-3 shadow-sm">
                    <span className="agent-blink text-sm text-muted-foreground">正在查阅图鉴</span>
                  </div>
                </div>
              )}
            </div>

            {/* 建议提问 */}
            {messages.length <= 1 && !busy && (
              <div className="mt-4 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 输入区 */}
          <div className="border-t border-foreground/10 bg-card p-3">
            <div className="relative">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder="向阿博提问,例如:帮我找会发光的物种……"
                className="min-h-11 resize-none rounded-xl border-foreground/15 pr-12 text-sm focus-visible:ring-forest/40"
                rows={2}
                aria-label="向AI助手提问"
              />
              <Button
                size="icon"
                className="absolute bottom-2 right-2 h-8 w-8 rounded-lg"
                onClick={() => send()}
                disabled={!input.trim() || busy}
                aria-label="发送"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="mt-2 text-center text-[10px] text-muted-foreground/60">
              回答由大语言模型生成,可能与数据库内容存在出入,科学数据以链接的权威库为准
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
