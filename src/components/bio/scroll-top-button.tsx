"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

/**
 * 回到顶部浮动按钮(E25 打磨)
 *
 * 长页(画廊 269 图瀑布流 / 图鉴目录)滚动超过一屏后出现;
 * 垂直叠放在 AI 助手 FAB(bottom-6 right-6 h-14)正上方,避让对比托盘。
 */
export function ScrollTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.18 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="回到顶部"
          title="回到顶部"
          className="fixed bottom-[92px] right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-foreground/10 bg-card text-foreground/70 shadow-md backdrop-blur transition-colors hover:text-primary hover:shadow-lg active:scale-95 sm:bottom-[96px]"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
