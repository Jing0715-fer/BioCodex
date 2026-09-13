import { TaxonSeed } from "../types";

// 核心分类骨架:三域系统。细菌域与古菌域的子节点直接为门
// (现代分类不再在其中设界级);真核域下设四界。
export const coreTaxa: TaxonSeed[] = [
  {
    rank: "domain",
    latin: "Bacteria",
    chinese: "细菌域",
    authority: "Woese, Kandler & Wheelis, 1990",
    parent: "",
    description:
      "细菌域是生命三域系统之一,为原核生物,细胞无细胞核与细胞器,核糖体为 70S 型。细菌是地球上最古老、数量最庞大的生命类群之一,广泛分布于土壤、水体、大气乃至极端环境与生物体内,在元素循环、生态系统的运转中不可或缺。",
    tags: ["domain"],
  },
  {
    rank: "domain",
    latin: "Archaea",
    chinese: "古菌域",
    authority: "Woese, Kandler & Wheelis, 1990",
    parent: "",
    description:
      "古菌域是生命三域系统之一,同为原核生物,但细胞膜脂质由醚键连接的异丙基支链构成,与细菌和真核生物均有根本差异。古菌多为极端环境居民——高温热泉、高盐湖泊、深海热液与缺氧沉积物,也包括海洋中数量庞大的中温类群。",
    tags: ["domain"],
  },
  {
    rank: "domain",
    latin: "Eukarya",
    chinese: "真核域",
    parent: "",
    description:
      "真核域涵盖所有具有细胞核与膜包细胞器的生物,细胞核内染色体以组蛋白包装,核糖体为 80S 型。真核生物包括原生生物、真菌、植物与动物,经由内共生事件获得了线粒体与(植物中的)叶绿体,是复杂多细胞生命的演化基础。",
    tags: ["domain"],
  },
  {
    rank: "kingdom",
    latin: "Protista",
    chinese: "原生生物界",
    authority: "Haeckel, 1866",
    parent: "Eukarya",
    description:
      "原生生物界是真核生物中除真菌、植物、动物外类群的统称,属并系类群。包含单细胞与多细胞的藻类、原生动物与黏菌等,营养方式涵盖光合自养、吞噬异养与吸收异养,展现了真核细胞模式的巨大多样性。",
    tags: ["kingdom"],
  },
  {
    rank: "kingdom",
    latin: "Fungi",
    chinese: "真菌界",
    authority: "(R.T. Moore, 1971)",
    parent: "Eukarya",
    description:
      "真菌界为真核生物,营养体多为菌丝体,细胞壁含几丁质,通过吸收获得营养,以孢子繁殖。真菌是自然界最重要的分解者,与植物形成菌根共生,也包括酵母等单细胞类群;已知物种约 15 万,估计总数超过 200 万种。",
    tags: ["kingdom"],
  },
  {
    rank: "kingdom",
    latin: "Plantae",
    chinese: "植物界",
    parent: "Eukarya",
    description:
      "植物界为光合自养的真核生物,具叶绿体与纤维素细胞壁,生活史具世代交替。从苔藓到被子植物,已知物种约 40 万种,是地球初级生产力的主要承担者,为几乎所有生态系统提供能量与物质基础。",
    tags: ["kingdom"],
  },
  {
    rank: "kingdom",
    latin: "Animalia",
    chinese: "动物界",
    parent: "Eukarya",
    description:
      "动物界为异养真核生物,细胞无细胞壁,多数具运动能力,胚胎发育经历囊胚与原肠胚阶段。从最简单的多孔动物到哺乳动物,已知现存物种超过 150 万种,涵盖 30 余个门,是物种多样性最丰富的高等生物类群。",
    tags: ["kingdom"],
  },
];
