"use client";

import { cn } from "@/lib/utils";

/**
 * 界主题装饰纹样:横向装饰带 SVG(200×44),各界差异化图形呼应类群特征。
 * 用于卡片/主图角落的"博物馆钢印"式细节装饰,currentColor 继承调用方颜色。
 */
export function KingdomOrnament({
  kingdom,
  className,
  style,
}: {
  kingdom: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const art: Record<string, React.ReactNode> = {
    // 细菌:链球菌 + 杆菌 + 鞭毛波
    Bacteria: (
      <>
        <circle cx="18" cy="16" r="9" />
        <circle cx="38" cy="16" r="9" />
        <circle cx="58" cy="16" r="9" />
        <rect x="88" y="9" width="30" height="14" rx="7" />
        <path d="M124 16c4-8 8 8 12 0s8 8 12 0" />
        <path d="M8 34c14 4 30 4 44 0" opacity="0.55" />
        <circle cx="168" cy="14" r="3" opacity="0.7" />
        <circle cx="178" cy="20" r="2" opacity="0.55" />
        <circle cx="186" cy="12" r="2.4" opacity="0.7" />
        <circle cx="194" cy="18" r="1.8" opacity="0.5" />
      </>
    ),
    // 古菌:六边形细胞 + 三角 + 晶格点
    Archaea: (
      <>
        <path d="M24 8l12 7v14l-12 7-12-7V15z" />
        <path d="M24 8v28M12 15l24 14M36 15L12 29" opacity="0.5" />
        <path d="M62 30l9-16 9 16z" />
        <path d="M96 12h28v20H96z" transform="rotate(45 110 22)" opacity="0.7" />
        <path d="M152 12l8 10-8 10-8-10z" />
        <path d="M176 12v20M184 17v10M192 15v14" opacity="0.6" />
        <circle cx="71" cy="12" r="1.6" />
        <circle cx="102" cy="22" r="2" opacity="0.7" />
        <circle cx="139" cy="22" r="2" opacity="0.7" />
      </>
    ),
    // 原生生物:纤毛波浪 + 椭圆细胞 + 眼点
    Protista: (
      <>
        <ellipse cx="46" cy="20" rx="26" ry="13" />
        <circle cx="34" cy="18" r="4" />
        <circle cx="52" cy="24" r="3" opacity="0.6" />
        <path d="M18 30c-6-6-6-16 0-22" opacity="0.7" />
        <path d="M76 8c4 8 4 16 0 24" opacity="0.7" />
        <path d="M92 12c5 5 5 15 0 20 12-2 18-8 18-10s-6-8-18-10z" />
        <circle cx="104" cy="22" r="2.2" />
        <path d="M130 22c6-10 14-10 20 0s14 10 20 0" />
        <path d="M134 30c4-6 10-6 14 0M162 14c4 6 10 6 14 0" opacity="0.5" />
      </>
    ),
    // 真菌:孢子点阵 + 菌丝分支 + 子囊
    Fungi: (
      <>
        <path d="M14 34c10-22 26-26 38-14M52 20c8-8 18-6 22 4" />
        <path d="M30 26c6-10 14-12 20-6M44 30c8-10 16-8 20 0" opacity="0.55" />
        <ellipse cx="96" cy="14" rx="7" ry="12" />
        <path d="M96 26v10M96 30c5 2 10 2 14 0" opacity="0.7" />
        <ellipse cx="132" cy="12" rx="5" ry="9" opacity="0.7" />
        <ellipse cx="132" cy="30" rx="5" ry="9" opacity="0.7" />
        <path d="M132 21v2" />
        <circle cx="158" cy="14" r="2.4" />
        <circle cx="166" cy="22" r="1.8" opacity="0.7" />
        <circle cx="176" cy="10" r="3" />
        <circle cx="186" cy="24" r="2" opacity="0.7" />
        <circle cx="194" cy="14" r="1.6" opacity="0.55" />
      </>
    ),
    // 植物:叶脉 + 果实 + 茎
    Plantae: (
      <>
        <path d="M10 34C30 34 44 24 46 10c-14 0-30 10-36 24z" />
        <path d="M12 32C24 22 36 16 44 12" opacity="0.6" />
        <path d="M18 30c1-4 2-7 5-10M28 25c0-3 2-6 4-8M36 20c0-2 1-4 3-6" opacity="0.5" />
        <path d="M52 34c8-14 18-22 34-24-2 14-12 22-26 24" />
        <path d="M54 34c10-12 20-18 30-20" opacity="0.55" />
        <path d="M60 33c8-8 16-13 24-15" opacity="0.4" />
        <circle cx="104" cy="14" r="8" />
        <path d="M104 22v12" />
        <path d="M96 14c-4-6-2-10 0-12M112 14c4-6 2-10 0-12" opacity="0.6" />
        <circle cx="128" cy="18" r="6" opacity="0.7" />
        <circle cx="142" cy="10" r="4.5" opacity="0.55" />
        <circle cx="150" cy="24" r="4" opacity="0.7" />
        <path d="M158 32c12-2 22-10 30-20" />
        <path d="M166 30c6-6 12-10 18-12M176 28c4-4 8-6 12-7" opacity="0.5" />
      </>
    ),
    // 动物:足迹序列 + 羽毛
    Animalia: (
      <>
        <ellipse cx="22" cy="12" rx="6" ry="5" />
        <circle cx="14" cy="6" r="2" />
        <circle cx="22" cy="4.5" r="2" />
        <circle cx="30" cy="6" r="2" />
        <ellipse cx="46" cy="28" rx="6" ry="5" />
        <circle cx="38" cy="22" r="2" />
        <circle cx="46" cy="20.5" r="2" />
        <circle cx="54" cy="22" r="2" />
        <path d="M84 32C88 20 94 10 104 8c-2 10-8 18-16 22" />
        <path d="M87 29c2-6 6-12 11-16M92 26c1-4 4-8 7-10" opacity="0.55" />
        <path d="M104 8c2 6 1 12-2 18" opacity="0.4" />
        <ellipse cx="130" cy="14" rx="6" ry="5" opacity="0.85" />
        <ellipse cx="146" cy="26" rx="6" ry="5" opacity="0.85" />
        <circle cx="122" cy="8" r="1.8" opacity="0.8" />
        <circle cx="130" cy="6.5" r="1.8" opacity="0.8" />
        <circle cx="138" cy="8" r="1.8" opacity="0.8" />
        <circle cx="138" cy="20" r="1.8" opacity="0.8" />
        <circle cx="146" cy="18.5" r="1.8" opacity="0.8" />
        <circle cx="154" cy="20" r="1.8" opacity="0.8" />
        <path d="M168 32c8-16 14-22 24-24-4 12-10 20-18 24" opacity="0.75" />
        <path d="M176 26c2-5 5-9 9-12" opacity="0.45" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 200 44"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-28 select-none", className)}
      style={style}
      aria-hidden
    >
      {art[kingdom] || art.Animalia}
    </svg>
  );
}
