// BioCodex 领域逻辑:界色系 / 阶元标签 / IUCN 映射 / 科学数据库链接生成

export interface TaxonDTO {
  id: string;
  parentId: string | null;
  rank: string;
  latinName: string;
  chineseName: string;
  authority?: string | null;
  description?: string | null;
  morphology?: string | null;
  habitat?: string | null;
  distribution?: string | null;
  conservation?: string | null;
  ncbiTaxId?: number | null;
  image?: string | null;
  imageCaption?: string | null;
  tags?: string[] | null;
  childCount?: number;
  speciesCount?: number;
  lineage?: { id: string; latinName: string; chineseName: string; rank: string }[];
}

export const RANK_LABEL: Record<string, string> = {
  domain: "域",
  kingdom: "界",
  subkingdom: "亚界",
  phylum: "门",
  subphylum: "亚门",
  superclass: "总纲",
  class: "纲",
  subclass: "亚纲",
  infraclass: "下纲",
  superorder: "总目",
  order: "目",
  suborder: "亚目",
  superfamily: "总科",
  family: "科",
  subfamily: "亚科",
  tribe: "族",
  genus: "属",
  subgenus: "亚属",
  species: "种",
};

export const RANK_ORDER: string[] = [
  "domain", "kingdom", "subkingdom", "phylum", "subphylum", "superclass", "class",
  "subclass", "infraclass", "superorder", "order", "suborder", "superfamily",
  "family", "subfamily", "tribe", "genus", "subgenus", "species",
];

export function rankLabel(rank: string): string {
  return RANK_LABEL[rank] ?? rank;
}

/** 五大界+原核域色系(用于徽标、占位图渐变、卡片描边) */
export const KINGDOM_THEME: Record<
  string,
  { name: string; latin: string; color: string; bg: string; border: string; text: string; desc: string }
> = {
  Bacteria: {
    name: "细菌域", latin: "Bacteria", color: "#0d9488", bg: "bg-teal-50 dark:bg-teal-950/40",
    border: "border-teal-200 dark:border-teal-800", text: "text-teal-700 dark:text-teal-300",
    desc: "原核 · 微生物",
  },
  Archaea: {
    name: "古菌域", latin: "Archaea", color: "#be185d", bg: "bg-rose-50 dark:bg-rose-950/40",
    border: "border-rose-200 dark:border-rose-800", text: "text-rose-700 dark:text-rose-300",
    desc: "极端环境居民",
  },
  Protista: {
    name: "原生生物界", latin: "Protista", color: "#65a30d", bg: "bg-lime-50 dark:bg-lime-950/40",
    border: "border-lime-200 dark:border-lime-800", text: "text-lime-700 dark:text-lime-300",
    desc: "微观世界先驱",
  },
  Fungi: {
    name: "真菌界", latin: "Fungi", color: "#b45309", bg: "bg-amber-50 dark:bg-amber-950/40",
    border: "border-amber-200 dark:border-amber-800", text: "text-amber-700 dark:text-amber-300",
    desc: "分解者王国",
  },
  Plantae: {
    name: "植物界", latin: "Plantae", color: "#15803d", bg: "bg-green-50 dark:bg-green-950/40",
    border: "border-green-200 dark:border-green-800", text: "text-green-700 dark:text-green-300",
    desc: "绿色生产者",
  },
  Animalia: {
    name: "动物界", latin: "Animalia", color: "#c2410c", bg: "bg-orange-50 dark:bg-orange-950/40",
    border: "border-orange-200 dark:border-orange-800", text: "text-orange-700 dark:text-orange-300",
    desc: "万千生灵",
  },
};

export const IUCN_INFO: Record<string, { label: string; full: string; color: string; bg: string }> = {
  EX: { label: "灭绝", full: "Extinct(灭绝)", color: "text-zinc-100", bg: "bg-zinc-800" },
  EW: { label: "野外灭绝", full: "Extinct in the Wild(野外灭绝)", color: "text-zinc-100", bg: "bg-zinc-700" },
  CR: { label: "极危", full: "Critically Endangered(极危)", color: "text-red-50", bg: "bg-red-700" },
  EN: { label: "濒危", full: "Endangered(濒危)", color: "text-red-50", bg: "bg-red-600" },
  VU: { label: "易危", full: "Vulnerable(易危)", color: "text-amber-50", bg: "bg-amber-600" },
  NT: { label: "近危", full: "Near Threatened(近危)", color: "text-yellow-900", bg: "bg-yellow-300" },
  LC: { label: "无危", full: "Least Concern(无危)", color: "text-green-50", bg: "bg-green-700" },
  DD: { label: "数据缺乏", full: "Data Deficient(数据缺乏)", color: "text-zinc-700", bg: "bg-zinc-300" },
  NE: { label: "未评估", full: "Not Evaluated(未评估)", color: "text-zinc-600", bg: "bg-zinc-200" },
};

export interface DbLink { name: string; url: string; group: string; icon: string; }

/** 为分类单元生成全部科学数据库链接 */
export function buildDbLinks(t: {
  latinName: string; chineseName: string; ncbiTaxId?: number | null; rank: string;
  kingdomPath?: string[]; // 自上而下的界/域路径
}): DbLink[] {
  const la = t.latinName;
  const laUnderscore = la.replace(/ /g, "_");
  const cn = t.chineseName;
  const path = t.kingdomPath || [];
  const isSpecies = t.rank === "species";
  const links: DbLink[] = [];

  // ===== 分类学权威数据库 =====
  if (t.ncbiTaxId) {
    links.push({
      name: "NCBI Taxonomy", icon: "database",
      url: `https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=${t.ncbiTaxId}`,
      group: "分类学",
    });
  } else {
    links.push({
      name: "NCBI Taxonomy", icon: "database",
      url: `https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?name=${encodeURIComponent(la)}`,
      group: "分类学",
    });
  }
  links.push(
    { name: "GBIF 全球生物多样性", icon: "globe", url: `https://www.gbif.org/species/search?q=${encodeURIComponent(la)}`, group: "分类学" },
    { name: "Catalogue of Life", icon: "list", url: `https://www.catalogueoflife.org/data/search?q=${encodeURIComponent(la)}&redirect=true`, group: "分类学" },
    { name: "EOL 生物百科", icon: "book", url: `https://eol.org/search?q=${encodeURIComponent(la)}`, group: "分类学" },
    { name: "ITIS", icon: "clipboard", url: `https://www.itis.gov/servlet/SingleRpt/SingleRpt?search_topic=TSN&search_value=&q=${encodeURIComponent(la)}`, group: "分类学" },
  );

  // ===== 基因组与序列 =====
  if (t.ncbiTaxId) {
    links.push({
      name: "NCBI GenBank 序列", icon: "dna",
      url: `https://www.ncbi.nlm.nih.gov/nuccore/?term=txid${t.ncbiTaxId}%5BOrganism%5D`,
      group: "基因组",
    });
    links.push({
      name: "NCBI Genome 测序计划", icon: "dna",
      url: `https://www.ncbi.nlm.nih.gov/genome/?term=txid${t.ncbiTaxId}%5BOrganism%5D`,
      group: "基因组",
    });
  } else {
    links.push({
      name: "NCBI GenBank 序列", icon: "dna",
      url: `https://www.ncbi.nlm.nih.gov/nuccore/?term=${encodeURIComponent(la)}`,
      group: "基因组",
    });
  }
  links.push(
    { name: "Ensembl Genomes", icon: "dna", url: `https://ensemblgenomes.org/search?site=ensembl&q=${encodeURIComponent(la)}`, group: "基因组" },
    { name: "UniProt 蛋白质库", icon: "molecule", url: `https://www.uniprot.org/taxonomy?query=${encodeURIComponent(la)}`, group: "基因组" },
    { name: "KEGG 通路数据库", icon: "git-branch", url: `https://www.genome.jp/searchdb?keywords=${encodeURIComponent(la)}`, group: "基因组" },
  );

  // ===== 观察记录 =====
  links.push(
    { name: "iNaturalist 观察记录", icon: "eye", url: `https://www.inaturalist.org/taxa/search?q=${encodeURIComponent(la)}`, group: "生态观察" },
    { name: "GBIF 物种分布图", icon: "map", url: `https://www.gbif.org/species/search?q=${encodeURIComponent(la)}&view=MAP`, group: "生态观察" },
  );

  // ===== 百科与文献 =====
  links.push(
    { name: "维基百科(中文)", icon: "book", url: `https://zh.wikipedia.org/wiki/${encodeURIComponent(cn)}`, group: "百科文献" },
    { name: "Wikipedia", icon: "book", url: `https://en.wikipedia.org/wiki/${laUnderscore}`, group: "百科文献" },
    { name: "Google Scholar 文献", icon: "graduation", url: `https://scholar.google.com/scholar?q=${encodeURIComponent(la)}`, group: "百科文献" },
    { name: "PubMed 研究", icon: "flask", url: `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(la)}`, group: "百科文献" },
  );

  // ===== 类群专属数据库 =====
  const inFungi = path.includes("Fungi");
  const inBacteria = path.includes("Bacteria");
  const inArchaea = path.includes("Archaea");
  const inPlants = path.includes("Plantae");
  const inAnimals = path.includes("Animalia");
  if (inFungi) {
    links.push({ name: "MycoBank 真菌名录", icon: "list", url: `https://www.mycobank.org/page/Name%20search%20page?table=Name search&field_1=Name&value_1=${encodeURIComponent(la)}`, group: "类群专属" });
    links.push({ name: "Index Fungorum", icon: "clipboard", url: `http://www.indexfungorum.org/Names/Names.asp?strGenus=${encodeURIComponent(la.split(" ")[0])}`, group: "类群专属" });
  }
  if (inBacteria || inArchaea) {
    links.push({ name: "LPSN 原核生物名录", icon: "list", url: `https://lpsn.dsmz.de/search?query=${encodeURIComponent(la)}`, group: "类群专属" });
    links.push({ name: "BacDive 菌株库", icon: "flask", url: `https://bacdive.dsmz.de/search?search_term=${encodeURIComponent(la)}`, group: "类群专属" });
    links.push({ name: "PATRIC/BV-BRC", icon: "dna", url: `https://www.bv-brc.org/view/Taxonomy/${t.ncbiTaxId || ""}`, group: "类群专属" });
  }
  if (inPlants) {
    links.push({ name: "Kew POWO 植物名录", icon: "sprout", url: `https://powo.science.kew.org/?q=${encodeURIComponent(la)}`, group: "类群专属" });
    links.push({ name: "IPNI 植物名称索引", icon: "clipboard", url: `https://www.ipni.org/?q=${encodeURIComponent(la)}`, group: "类群专属" });
    links.push({ name: "Plants of the World", icon: "sprout", url: `https://plantsoftheworldonline.org/?q=${encodeURIComponent(la)}`, group: "类群专属" });
  }
  if (inAnimals) {
    links.push({ name: "Animal Diversity Web", icon: "paw", url: `https://animaldiversity.org/search/?q=${encodeURIComponent(la)}&limit=25`, group: "类群专属" });
    links.push({ name: "IUCN 红色名录", icon: "shield", url: `https://www.iucnredlist.org/search?query=${encodeURIComponent(la)}&searchType=species`, group: "类群专属" });
    links.push({ name: "WoRMS 海洋物种", icon: "waves", url: `https://www.marinespecies.org/aphia.php?p=search&t=${encodeURIComponent(la)}`, group: "类群专属" });
  }

  // 物种级: 加 BOLD 条形码与 BHL 文献
  if (isSpecies) {
    links.push({ name: "BOLD DNA 条形码", icon: "fingerprint", url: `http://www.boldsystems.org/index.php/Taxbrowser_Taxonpage?taxon=${encodeURIComponent(la)}`, group: "生态观察" });
    links.push({ name: "BHL 生物遗产图书馆", icon: "library", url: `https://www.biodiversitylibrary.org/search?searchTerm=${encodeURIComponent(la)}`, group: "百科文献" });
  }

  return links;
}

/** 从界/域路径取主题 */
export function kingdomOf(path: string[] | undefined): string {
  if (!path) return "Animalia";
  for (const k of ["Protista", "Fungi", "Plantae", "Animalia"]) {
    if (path.includes(k)) return k;
  }
  if (path.includes("Bacteria")) return "Bacteria";
  if (path.includes("Archaea")) return "Archaea";
  return "Animalia";
}
