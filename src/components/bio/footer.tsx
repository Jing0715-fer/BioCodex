"use client";

import { Dna, BookOpen, Database, Shield, Sparkles } from "lucide-react";

export function BioFooter() {
  return (
    <footer className="mt-auto border-t border-foreground/10 bg-foreground/[0.03] paper-texture">
      <div className="dna-divider" />
      <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Dna className="h-4 w-4" />
            </span>
            <div className="leading-tight">
              <p className="font-display text-base font-bold">BioCodex</p>
              <p className="text-[10px] tracking-[0.25em] text-muted-foreground">生物图鉴</p>
            </div>
          </div>
          <p className="mt-3 text-xs leading-5 text-muted-foreground">
            从三域系统到物种条目的专业生物学百科。
            内容仅供教育与科普参考,科学数据以权威数据库为准。
          </p>
        </div>
        <div>
          <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground/85">
            <Database className="h-4 w-4 text-primary" />
            数据来源
          </p>
          <ul className="mt-3 space-y-1.5 text-xs leading-5 text-muted-foreground">
            <li>NCBI Taxonomy / GenBank / Genome</li>
            <li>GBIF · Catalogue of Life · ITIS</li>
            <li>Ensembl Genomes · UniProt · KEGG</li>
            <li>EOL · iNaturalist · BOLD · BHL</li>
          </ul>
        </div>
        <div>
          <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground/85">
            <BookOpen className="h-4 w-4 text-primary" />
            分类体系
          </p>
          <ul className="mt-3 space-y-1.5 text-xs leading-5 text-muted-foreground">
            <li>三域:细菌域 · 古菌域 · 真核域</li>
            <li>阶元:域-界-门-纲-目-科-属-种</li>
            <li>命名:双名法 + 命名者年代</li>
            <li>保护:IUCN 红色名录等级</li>
          </ul>
        </div>
        <div>
          <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground/85">
            <Sparkles className="h-4 w-4 text-primary" />
            图鉴功能
          </p>
          <ul className="mt-3 space-y-1.5 text-xs leading-5 text-muted-foreground">
            <li>分类树探索 · 全局搜索(⌘K)</li>
            <li>图鉴目录:按界/等级/标签筛选</li>
            <li>物种对比:并排比较 · 导出 MD/CSV/JSON · 分享链接</li>
            <li>红色名录专题 · 标本收藏夹 · 浏览足迹</li>
            <li>AI 博物学家助手 · 新页速递 · 灯箱浏览</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-foreground/10">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground/70 sm:px-6">
          <p>
            BioCodex ·
            <span className="latin"> Vita ex microbio ad vertebrata</span>
            (从微生物到脊椎动物的生命)
          </p>
          <p className="flex items-center gap-1">
            <Shield className="h-3.5 w-3.5" />
            部分配图来自网络检索,仅作展示用途
          </p>
        </div>
      </div>
    </footer>
  );
}
