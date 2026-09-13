import type { Metadata, Viewport } from "next";
import { Playfair_Display, Noto_Serif_SC, Noto_Sans_SC, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const notoSerifSC = Noto_Serif_SC({
  variable: "--font-noto-serif-sc",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  display: "swap",
});

const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        className={`${playfair.variable} ${notoSerifSC.variable} ${notoSansSC.variable} ${geistMono.variable} antialiased bg-background text-foreground font-sans`}
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
