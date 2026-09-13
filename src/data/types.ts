// 生物分类种子数据接口 —— 与 prisma/schema.prisma 中的 Taxon 模型字段一一对应。
// 供 src/data/seed/ 下各数据文件(core / microbes / plants / invertebrates / vertebrates 等)共用。
export interface TaxonSeed {
  rank: string; // domain | kingdom | phylum | subphylum | class | order | family | genus | species
  latin: string; // 拉丁学名(全局唯一键)
  chinese: string; // 中文标准译名
  authority?: string; // 命名者与年代, 如 "(Linnaeus, 1758)", 不确定可省略
  parent: string; // 父级分类单元的 latin(顶层为空字符串 "")
  description?: string; // 中文描述: 门/纲/目/科 1 句(30-80字), 物种 2-3 句(60-140字)
  morphology?: string; // 形态特征(物种级, 20-60字)
  habitat?: string; // 生境(物种级, 20-60字)
  distribution?: string; // 地理分布(物种级, 20-60字)
  conservation?: string; // IUCN 等级代码: EX | EW | CR | EN | VU | NT | LC | DD | NE(有把握时填写)
  ncbiTaxId?: number; // NCBI Taxonomy ID(仅非常确定时填写)
  image?: string; // 物种配图 OSS URL(由后台批量抓取填充)
  imageCaption?: string; // 图注
  tags?: string[]; // 标签数组, 如 ["flagship", "模式生物", "入侵物种"]
}
