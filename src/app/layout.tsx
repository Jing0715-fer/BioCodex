import type { Metadata, Viewport } from "next";
// 离线安全:沙箱无法访问 fonts.gstatic.com,改用 globals.css 中的系统字体栈变量
// (--font-playfair/--font-noto-serif-sc/--font-noto-sans/--font-geist-mono)
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "BioCodex 生物图鉴 — 从原核生物到高等脊椎动物的专业百科",
  description:
    "BioCodex 生物图鉴:按域-界-门-纲-目-科-属-种专业分类的生物百科,收录从细菌、古菌、原生生物、真菌、植物到无脊椎动物与脊椎动物的数百物种,附拉丁学名、形态描述、IUCN 保护状况,并链接 NCBI、GBIF、GenBank、EOL 等科学数据库。内置 AI 博物学家助手。",
  keywords: [
    "生物图鉴", "生物分类", "拉丁学名", "taxonomy", "biodiversity",
    "NCBI", "GBIF", "物种", "生物学百科", "species",
  ],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "BioCodex 生物图鉴",
    description: "从原核生物到高等脊椎动物的专业生物学百科",
    siteName: "BioCodex",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f1e4" },
    { media: "(prefers-color-scheme: dark)", color: "#101b14" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className="antialiased bg-background text-foreground font-sans"
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
          <SonnerToaster position="bottom-center" offset={96} richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
