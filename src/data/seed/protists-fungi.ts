import { TaxonSeed } from "../types";

// 原生生物界(Protista)与真菌界(Fungi)分类学种子数据。
// 覆盖原生生物 11 门、真菌 5 门;所有 parent 均指向本文件或 core.ts 中的 latin。
// 物种级记录含 morphology / habitat / distribution;不确定性较高的 authority 与
// ncbiTaxId 按规范省略,不作虚构。
export const protistsFungi: TaxonSeed[] = [
  // ===================== 原生生物界 Protista:门 =====================
  {
    rank: "phylum",
    latin: "Amoebozoa",
    chinese: "变形虫门",
    authority: "Lühe, 1913",
    parent: "Protista",
    description:
      "以叶状伪足运动和吞噬摄食为特征的原生生物,营养体多为单细胞,无鞭毛与细胞壁。涵盖裸变形虫、黏菌与网柄菌等类群,广泛生活于淡水、土壤及潮湿腐殖环境,部分种类营寄生生活。",
    tags: ["phylum"],
  },
  {
    rank: "phylum",
    latin: "Ciliophora",
    chinese: "纤毛门",
    authority: "Doflein, 1901",
    parent: "Protista",
    description:
      "原生生物中细胞结构最复杂的类群之一,体表覆以成排纤毛,具大核与小核的核二型分化,行横二分裂与接合生殖。绝大多数自由生活于淡水与海洋,少数寄生。",
    tags: ["phylum"],
  },
  {
    rank: "phylum",
    latin: "Euglenozoa",
    chinese: "眼虫门",
    authority: "Cavalier-Smith, 1981",
    parent: "Protista",
    description:
      "具鞭毛且鞭毛轴旁具副轴杆的真核生物,线粒体嵴呈盘状。包含光合自养的眼虫类与寄生的锥虫类,多生活于淡水与土壤,部分为重要病原体。",
    tags: ["phylum"],
  },
  {
    rank: "phylum",
    latin: "Dinoflagellata",
    chinese: "甲藻门",
    parent: "Protista",
    description:
      "具两条不等长鞭毛、细胞壁多由纤维素甲板构成的藻类,染色体在间期仍保持浓缩状态。多为海洋浮游植物,是赤潮的主要肇事类群,部分种类具生物发光能力。",
    tags: ["phylum"],
  },
  {
    rank: "phylum",
    latin: "Bacillariophyta",
    chinese: "硅藻门",
    parent: "Protista",
    description:
      "细胞壁由上下两瓣硅质壳套合而成的单细胞藻类,壳面纹饰精美,是海洋与淡水的主要初级生产者之一,估计贡献全球约五分之一的初级生产力,硅藻土即其化石沉积。",
    tags: ["phylum"],
  },
  {
    rank: "phylum",
    latin: "Chlorophyta",
    chinese: "绿藻门",
    parent: "Protista",
    description:
      "色素体以叶绿素 a、b 为主而呈草绿色的藻类,贮藏淀粉,细胞壁含纤维素。从单细胞到多细胞群体与片状体,与陆生植物近缘,是绿色植物演化的关键一支。",
    tags: ["phylum"],
  },
  {
    rank: "phylum",
    latin: "Ochrophyta",
    chinese: "褐藻门",
    parent: "Protista",
    description:
      "色素体含岩藻黄素而呈黄褐色的不等鞭毛类藻类,绝大多数为多细胞体型,从丝状体到数十米长的巨藻。生活史多具世代交替,冷温带海洋中的大型海藻多属此类。",
    tags: ["phylum"],
  },
  {
    rank: "phylum",
    latin: "Rhodophyta",
    chinese: "红藻门",
    parent: "Protista",
    description:
      "含藻红素与藻蓝素而多呈红色的藻类,细胞无鞭毛,多为多细胞丝状或叶状体,细胞壁富含琼脂与卡拉胶。绝大多数生活于海洋,紫菜、江蓠等具重要经济价值。",
    tags: ["phylum"],
  },
  {
    rank: "phylum",
    latin: "Apicomplexa",
    chinese: "顶复门",
    authority: "Levine, 1970",
    parent: "Protista",
    description:
      "顶端具复合细胞器(类锥体、棒状体与微线体)的专性细胞内寄生原生生物,生活史复杂,行裂体生殖与孢子生殖。几乎全部寄生于动物,疟原虫、弓形虫等是人类重要病原体。",
    tags: ["phylum"],
  },
  {
    rank: "phylum",
    latin: "Foraminifera",
    chinese: "有孔虫门",
    authority: "d'Orbigny, 1826",
    parent: "Protista",
    description:
      "具网状伪足、多数分泌钙质多房室壳的原生生物,伪足自壳口外伸交织成捕食网络。绝大多数为海洋底栖或浮游生活,化石记录逾五亿年,是地层划分与古环境重建的重要标志。",
    tags: ["phylum"],
  },
  {
    rank: "phylum",
    latin: "Oomycota",
    chinese: "卵菌门",
    parent: "Protista",
    description:
      "具卵式生殖的类真菌原生生物,菌丝无隔、细胞壁以纤维素为主、线粒体嵴管状,与真菌亲缘疏远而近于不等鞭毛类。包含水霉与霜霉类群,多为水生腐生或植物病原体。",
    tags: ["phylum"],
  },

  // ===================== 原生生物界:纲 =====================
  {
    rank: "class",
    latin: "Tubulinea",
    chinese: "管足纲",
    parent: "Amoebozoa",
    description:
      "以圆柱状伪足缓慢运动、运动时细胞体常形成单一大伪足的变形虫类,无壳或有壳类型均见,是淡水与土壤中习见的裸变形虫的主要类群。",
    tags: ["class"],
  },
  {
    rank: "class",
    latin: "Dictyosteliomycetes",
    chinese: "网柄菌纲",
    parent: "Amoebozoa",
    description:
      "社会性变形虫类,营养期为单细胞吞噬型变形虫,饥饿时通过 cAMP 脉冲信号聚集形成多细胞蛞蝓体并分化出具柄子实体,是研究细胞通讯与多细胞性演化的经典材料。",
    tags: ["class"],
  },
  {
    rank: "class",
    latin: "Myxomycetes",
    chinese: "黏菌纲",
    parent: "Amoebozoa",
    description:
      "变形虫黏菌类,营养期为多核无细胞壁的原生质团,可如黏液般在基质上爬行取食;繁殖期原质体收缩形成孢囊,产生具纤维素壁的孢子。",
    tags: ["class"],
  },
  {
    rank: "class",
    latin: "Oligohymenophorea",
    chinese: "寡膜纲",
    parent: "Ciliophora",
    description:
      "口器位于体前部、由口腔内数片纤毛小膜构成的纤毛虫大类,体纤毛常均匀分布。草履虫、四膜虫、钟虫等教学与科研常见纤毛虫均属此纲。",
    tags: ["class"],
  },
  {
    rank: "class",
    latin: "Heterotrichea",
    chinese: "异毛纲",
    parent: "Ciliophora",
    description:
      "体形常大、体纤毛均匀分布而口区具发达口旁小膜带的纤毛虫类,可借体纤毛协调游动或固着生活,部分种类具鲜艳体色,喇叭虫为代表。",
    tags: ["class"],
  },
  {
    rank: "class",
    latin: "Euglenophyceae",
    chinese: "眼虫纲",
    parent: "Euglenozoa",
    description:
      "具绿色色素体与红色眼点的光合眼虫类,同化产物为裸藻淀粉,借单条鞭毛运动,细胞表膜具螺旋条纹,常见于富营养淡水水体。",
    tags: ["class"],
  },
  {
    rank: "class",
    latin: "Kinetoplastea",
    chinese: "动基体纲",
    parent: "Euglenozoa",
    description:
      "鞭毛基部线粒体内含由大量 DNA 组成的动基体的鞭毛虫类,具单条鞭毛或无鞭毛,全部寄生或共生于动物体内,锥虫等人类重要病原属此纲。",
    tags: ["class"],
  },
  {
    rank: "class",
    latin: "Dinophyceae",
    chinese: "甲藻纲",
    parent: "Dinoflagellata",
    description:
      "甲藻门的主要类群,具纤维素甲板,横沟与纵沟中着生两条鞭毛,含光合型与异养吞噬型两类。许多种类形成赤潮并产生藻毒素。",
    tags: ["class"],
  },
  {
    rank: "class",
    latin: "Coscinodiscophyceae",
    chinese: "圆筛藻纲",
    parent: "Bacillariophyta",
    description:
      "中心硅藻类,壳面呈圆盘形,孔纹作同心圆与辐射排列,多营海洋浮游生活。海链藻等浮游种类是海洋初级生产力与碳输出的重要贡献者。",
    tags: ["class"],
  },
  {
    rank: "class",
    latin: "Bacillariophyceae",
    chinese: "羽纹硅藻纲",
    parent: "Bacillariophyta",
    description:
      "羽纹硅藻类,壳面多呈两侧对称的长形,常具壳缝结构并能借其滑动。多为底栖种类,淡海水均有分布,三角褐指藻等模式藻属此纲。",
    tags: ["class"],
  },
  {
    rank: "class",
    latin: "Chlorophyceae",
    chinese: "绿藻纲",
    parent: "Chlorophyta",
    description:
      "绿藻门的传统核心类群,多为单细胞或群体,营养细胞具两条等长鞭毛,有性生殖行同配或异配。衣藻、团藻等经典实验生物均属此纲。",
    tags: ["class"],
  },
  {
    rank: "class",
    latin: "Ulvophyceae",
    chinese: "石莼纲",
    parent: "Chlorophyta",
    description:
      "多为海生多细胞绿藻,体呈管状或片状薄膜,细胞常单核,生活史多具世代交替。石莼等潮间带习见绿藻属此纲,是绿潮的主要肇事类群。",
    tags: ["class"],
  },
  {
    rank: "class",
    latin: "Trebouxiophyceae",
    chinese: "共球藻纲",
    parent: "Chlorophyta",
    description:
      "单细胞或简单群体的绿藻类,营养细胞多无鞭毛,以似亲孢子繁殖,常为地衣的共生藻,也生活于淡水与土壤,小球藻等经济微藻属此纲。",
    tags: ["class"],
  },
  {
    rank: "class",
    latin: "Phaeophyceae",
    chinese: "褐藻纲",
    parent: "Ochrophyta",
    description:
      "褐藻门的核心纲,色素体含岩藻黄素,多细胞体由丝状体直至分化出固着器、柄与带片的大型藻体。海带、巨藻、马尾藻等大型经济海藻均属此纲。",
    tags: ["class"],
  },
  {
    rank: "class",
    latin: "Florideophyceae",
    chinese: "真红藻纲",
    parent: "Rhodophyta",
    description:
      "红藻门的主要类群,生活史具三个世代的复杂循环,藻体多由多轴丝状体构成,果胞与果孢子体等结构特殊。琼脂与卡拉胶原料藻多属此纲,钙化的珊瑚藻类是珊瑚礁建造者。",
    tags: ["class"],
  },
  {
    rank: "class",
    latin: "Bangiophyceae",
    chinese: "红毛菜纲",
    parent: "Rhodophyta",
    description:
      "红藻门中较原始的类群,藻体为一至数层细胞构成的简单叶状体或丝状体,紫菜属是其经济价值最大的代表,养殖历史悠久。",
    tags: ["class"],
  },
  {
    rank: "class",
    latin: "Aconoidasida",
    chinese: "无类锥体纲",
    parent: "Apicomplexa",
    description:
      "顶复门中缺乏顶端类锥体结构的类群,入侵宿主细胞依赖分泌器官而非类锥体运动。疟原虫等血孢子类寄生于血液与相关组织,属此纲。",
    tags: ["class"],
  },
  {
    rank: "class",
    latin: "Conoidasida",
    chinese: "类锥体纲",
    parent: "Apicomplexa",
    description:
      "顶复门中具类锥体的类群,顶端复合器完整,包括球虫类等细胞内寄生原虫,经口或食物链传播,弓形虫属与艾美耳虫属均属此纲。",
    tags: ["class"],
  },
  {
    rank: "class",
    latin: "Globothalamea",
    chinese: "球房虫纲",
    parent: "Foraminifera",
    description:
      "现代分类中以多房室钙质壳为特征的有孔虫大类,房室球形或近球形依次螺旋排列,涵盖底栖与浮游两大生态类群,是新生代地层划分的主力化石类群。",
    tags: ["class"],
  },
  {
    rank: "class",
    latin: "Peronosporea",
    chinese: "霜霉纲",
    parent: "Oomycota",
    description:
      "卵菌门中高等植物专性寄生的类群,无性繁殖产生孢囊孢子或分生孢子,有性生殖形成厚壁卵孢子。疫霉与霜霉菌是世界性重要植物病原。",
    tags: ["class"],
  },

  // ===================== 原生生物界:目 =====================
  {
    rank: "order",
    latin: "Tubulinida",
    chinese: "变形虫目",
    parent: "Tubulinea",
    description:
      "管足纲的模式目,即传统所称变形虫目,含真正的裸变形虫类。细胞质流动形成圆柱状伪足,以吞噬方式捕食细菌与藻类,多生活于淡水池沼底部。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Dictyosteliales",
    chinese: "网柄菌目",
    parent: "Dictyosteliomycetes",
    description:
      "网柄菌纲的目,营养期独立生活的变形虫在饥饿时以 cAMP 脉冲信号相互吸引,聚合成能整体迁移的蛞蝓体,最终分化形成具柄与孢子团的子实体。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Physarales",
    chinese: "绒泡菌目",
    parent: "Myxomycetes",
    description:
      "黏菌纲中形体较大的一目,原质体中沉积大量白色石灰质颗粒,子实体为孢囊,囊壁或囊内具钙质结节,绒泡菌属为代表。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Hymenostomatida",
    chinese: "膜口目",
    parent: "Oligohymenophorea",
    description:
      "口器位于体表前部、由数片小膜与前庭纤毛构成的纤毛虫类,体形较小。草履虫与四膜虫两大模式生物均属此目,是纤毛虫遗传学的奠基材料。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Heterotrichida",
    chinese: "异毛目",
    parent: "Heterotrichea",
    description:
      "异毛纲的模式目,体形大而体纤毛均匀,口缘具宽大的口旁小膜带,喇叭虫为代表,多固着于淡水水草或缓慢游动。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Peritrichida",
    chinese: "缘毛目",
    parent: "Oligohymenophorea",
    description:
      "成体多固着生活的纤毛虫类,口缘纤毛带围成漏斗状,身体常以能收缩的长柄附着基质,钟虫为代表,部分种类形成树枝状群体。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Euglenales",
    chinese: "眼虫目",
    parent: "Euglenophyceae",
    description:
      "眼虫纲的模式目,单细胞具单条游泳鞭毛,多具绿色色素体与红色眼点,趋光性明显,在富营养淡水中常大量出现,是水质污染的指示类群。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Trypanosomatida",
    chinese: "锥虫目",
    parent: "Kinetoplastea",
    description:
      "动基体纲的单鞭毛寄生类群,生活史常在吸血昆虫与脊椎动物宿主间循环,动基体 DNA 量大且高度重排,锥虫属与利什曼原虫属等重要病原属此目。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Gonyaulacales",
    chinese: "膝沟藻目",
    parent: "Dinophyceae",
    description:
      "具复杂甲板排列的甲藻类,壳板纹饰发达,不少种类产生麻痹性贝毒并形成赤潮,亚历山大藻属是其著名的产毒代表。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Noctilucales",
    chinese: "夜光藻目",
    parent: "Dinophyceae",
    description:
      "高度特化的大型异养甲藻,细胞球形、具一根捕食触手,甲板退化或缺失,生物发光能力极强,夜光藻是海水蓝眼泪现象的主要来源。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Thalassiosirales",
    chinese: "海链藻目",
    parent: "Coscinodiscophyceae",
    description:
      "圆盘状中心硅藻类,壳面具规则孔纹,并常分泌几丁质丝将细胞连成带状群体,多为海洋浮游种类,是硅藻模式基因组研究的来源类群。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Bacillariales",
    chinese: "杆形藻目",
    parent: "Bacillariophyceae",
    description:
      "羽纹硅藻中壳面纹饰两侧对称的一支,涵盖多种底栖与浮游种类,褐指藻属作为形态可塑的基因组学模式材料隶属于此。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Chlamydomonadales",
    chinese: "团藻目",
    parent: "Chlorophyceae",
    description:
      "绿藻纲最大的目之一,营养细胞具两条等长鞭毛,体型从单细胞到具细胞分化的多细胞群体连续演变,是研究多细胞性起源的关键类群。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Ulvales",
    chinese: "石莼目",
    parent: "Ulvophyceae",
    description:
      "石莼纲的模式目,藻体为片状或管状薄膜,多为两层细胞厚,生活于潮间带,包含常见食用绿藻与富营养化指示种类。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Chlorellales",
    chinese: "小球藻目",
    parent: "Trebouxiophyceae",
    description:
      "单细胞球形至卵形的绿藻类,无鞭毛,以似亲孢子行无性繁殖,常作为高密度培养的蛋白源、水产饵料与地衣共生藻。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Laminariales",
    chinese: "海带目",
    parent: "Phaeophyceae",
    description:
      "褐藻中体型最大的目,孢子体分化出固着器、柄与带片,行异形世代交替,冷温带海洋占优势,海带属、巨藻属等经济藻类均属此。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Fucales",
    chinese: "墨角藻目",
    parent: "Phaeophyceae",
    description:
      "藻体即配子体的褐藻类,不具世代交替,生殖器官集中于枝端生殖窝内,行卵式生殖,枝上常生气囊,马尾藻属为代表,是褐藻胶的重要来源。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Ectocarpales",
    chinese: "水云目",
    parent: "Phaeophyceae",
    description:
      "褐藻中形态较简单的丝状或假薄壁组织类群,由匍匐丝与直立丝构成异丝体,世代交替同形,水云属为褐藻基因组学的模式生物。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Bangiales",
    chinese: "红毛菜目",
    parent: "Bangiophyceae",
    description:
      "红毛菜纲的模式目,叶状体一至二层细胞,生活史包含生活于贝壳等钙质基质内的丝状体世代,紫菜属是东亚最重要的养殖海藻。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Gracilariales",
    chinese: "江蓠目",
    parent: "Florideophyceae",
    description:
      "真红藻纲的一目,藻体圆柱状多分枝,琼脂含量高且质量优良,江蓠属是全球琼脂工业与海藻养殖的重要原料类群。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Corallinales",
    chinese: "珊瑚藻目",
    parent: "Florideophyceae",
    description:
      "钙化红藻类,细胞壁沉积方解石,节间钙化而关节柔韧,广泛参与珊瑚礁、藻脊与钙质沉积的建造,珊瑚藻属为代表。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Haemosporida",
    chinese: "血孢子目",
    parent: "Aconoidasida",
    description:
      "寄生于脊椎动物红细胞及相关组织并经吸血昆虫传播的顶复类,裂体生殖在红细胞内进行,配子体随血液进入媒介完成有性生殖,疟原虫属为代表。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Eucoccidiorida",
    chinese: "真球虫目",
    parent: "Conoidasida",
    description:
      "类锥体纲球虫类的核心目,生活史包含裂体生殖与孢子生殖,常在中间宿主组织内形成包囊,弓形虫属与肉孢子虫属为代表。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Rotaliida",
    chinese: "轮孔虫目",
    parent: "Globothalamea",
    description:
      "低螺旋式壳、透明钙质壁的底栖有孔虫大类,房室逐圈增大,壳内具复杂的隔壁管道系统,卷转虫属为代表,浅海泥沙底质中分布广泛。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Peronosporales",
    chinese: "霜霉目",
    parent: "Peronosporea",
    description:
      "霜霉纲最大的目,营养体为无隔菌丝体,无性生殖产生孢子囊或分生孢子,卵孢子厚壁越冬,包含疫霉、霜霉等重大植物病原属。",
    tags: ["order"],
  },

  // ===================== 原生生物界:科 =====================
  {
    rank: "family",
    latin: "Amoebidae",
    chinese: "变形虫科",
    parent: "Tubulinida",
    description:
      "管足纲模式科,典型裸变形虫,外质透明内质颗粒状,以单一圆柱状伪足缓慢爬行,吞噬细菌与藻类,多生活于淡水池沼底部。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Dictyosteliaceae",
    chinese: "网柄菌科",
    parent: "Dictyosteliales",
    description:
      "网柄菌目模式科,子实体由柄与孢堆组成,柄细胞为程序性死亡形成的刚性结构,孢子团外覆黏液,其细胞分化的可重复性是发育生物学经典模型。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Physaraceae",
    chinese: "绒泡菌科",
    parent: "Physarales",
    description:
      "黏菌中最大的科之一,原质体粗大鲜黄,孢囊内石灰质以结晶或结节形式沉积,多头绒泡菌为行为与生理研究的著名材料。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Parameciidae",
    chinese: "草履虫科",
    parent: "Hymenostomatida",
    description:
      "体呈倒置鞋形、体纤毛均匀纵列的淡水纤毛虫科,具口沟与两套伸缩泡,草履虫属为生物学教学与遗传学研究的经典对象。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Tetrahymenidae",
    chinese: "四膜虫科",
    parent: "Hymenostomatida",
    description:
      "小型梨形纤毛虫科,口区具四层口腔小膜,繁殖迅速且可无菌纯培养,四膜虫属为细胞生物学与表观遗传学的重要模式。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Stentoridae",
    chinese: "喇叭虫科",
    parent: "Heterotrichida",
    description:
      "已知体型最大的纤毛虫科之一,身体伸展呈喇叭状,常具蓝绿或红色素,大核呈念珠状,喇叭虫属是其唯一常见代表属。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Vorticellidae",
    chinese: "钟虫科",
    parent: "Peritrichida",
    description:
      "固着型钟形纤毛虫科,口缘纤毛带围成漏斗,柄内具可螺旋收缩的肌丝,钟虫属是活性污泥与淡水水质评价的常见指示生物。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Euglenaceae",
    chinese: "眼虫科",
    parent: "Euglenales",
    description:
      "眼虫目模式科,绿色色素体盘状或星状,眼点位于贮胞附近,表膜螺旋条纹清晰,眼虫属为光合作用与混合营养研究的经典材料。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Trypanosomatidae",
    chinese: "锥虫科",
    parent: "Trypanosomatida",
    description:
      "单细胞动基体寄生鞭毛虫科,生活史在昆虫媒介与脊椎动物宿主间交替,锥虫属与利什曼原虫属包含多种人类与家畜病原。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Gonyaulacaceae",
    chinese: "膝沟藻科",
    parent: "Gonyaulacales",
    description:
      "具复杂壳板纹饰的甲藻科,横沟与纵沟明显,多种产生麻痹性贝毒,亚历山大藻属为全球有害赤潮的常见肇事属。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Noctilucaceae",
    chinese: "夜光藻科",
    parent: "Noctilucales",
    description:
      "夜光藻目模式科,细胞球形巨大,具一条捕食触手,受扰动发出蓝色冷光,夜光藻赤潮暴发时可将海面染成暗红并耗氧危害养殖。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Thalassiosiraceae",
    chinese: "海链藻科",
    parent: "Thalassiosirales",
    description:
      "圆盘状中心硅藻科,壳面孔纹环列,常借几丁质丝连成带状群体,海链藻属包含海洋碳循环与基因组学研究的重要模式种。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Phaeodactylaceae",
    chinese: "褐指藻科",
    parent: "Bacillariales",
    description:
      "仅含褐指藻属的小科,细胞可在纺锤形、三辐射形与卵形间转变,硅质壳高度退化,是硅藻脂质代谢与遗传转化的模式类群。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Chlamydomonadaceae",
    chinese: "衣藻科",
    parent: "Chlamydomonadales",
    description:
      "单细胞卵形双鞭毛绿藻科,具杯状叶绿体与眼点,易培养且遗传操作工具完善,衣藻属为光合作用与鞭毛研究的首选模式。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Volvocaceae",
    chinese: "团藻科",
    parent: "Chlamydomonadales",
    description:
      "由数个至上万个双鞭毛细胞组成空心球形群体的绿藻科,细胞间出现分工与胞间连丝,团藻属是研究多细胞性起源的经典体系。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Ulvaceae",
    chinese: "石莼科",
    parent: "Ulvales",
    description:
      "片状或管状绿藻科,藻体两层细胞厚,基部小固着器附着基质,石莼属为习见食用绿藻,亦是近岸富营养化与绿潮的指示种。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Chlorellaceae",
    chinese: "小球藻科",
    parent: "Chlorellales",
    description:
      "球形或卵形单细胞绿藻科,无鞭毛,以似亲孢子繁殖,小球藻属被广泛用于蛋白饵料、保健食品与光合作用研究。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Laminariaceae",
    chinese: "海带科",
    parent: "Laminariales",
    description:
      "冷温带大型褐藻科,孢子体分化出固着器、柄与带片,配子体退化为显微结构,海带属与巨藻属是褐藻胶、碘与食用产品的重要来源。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Sargassaceae",
    chinese: "马尾藻科",
    parent: "Fucales",
    description:
      "墨角藻目最大的科,藻体分枝常具气囊以助漂浮,生殖器官生于枝端生殖窝内,马尾藻属包含羊栖菜等重要经济与药用海藻。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Ectocarpaceae",
    chinese: "水云科",
    parent: "Ectocarpales",
    description:
      "异丝体型褐藻科,由匍匐丝与直立丝组成,个体小而世代交替同形,水云属为首个完成全基因组测序的褐藻类群。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Bangiaceae",
    chinese: "红毛菜科",
    parent: "Bangiales",
    description:
      "红毛菜目模式科,叶状体薄膜状、一至二层细胞,紫红色,生活史含贝壳内丝状体阶段,紫菜属的养殖产值居海水藻类前列。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Gracilariaceae",
    chinese: "江蓠科",
    parent: "Gracilariales",
    description:
      "江蓠目模式科,藻体圆柱状丛生,琼胶含量与凝胶质量优良,江蓠属为琼脂工业与鲍鱼饲料的主要原料来源。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Corallinaceae",
    chinese: "珊瑚藻科",
    parent: "Corallinales",
    description:
      "钙化红藻模式科,粉红至紫色,钙化的节间与柔韧关节相间排列,是珊瑚礁与钙质沉积的重要贡献者,珊瑚藻属为代表。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Plasmodiidae",
    chinese: "疟原虫科",
    parent: "Haemosporida",
    description:
      "寄生于红细胞并经按蚊传播的血孢子科,裂体生殖在红细胞内进行,配子体为唯一具传播功能的阶段,疟原虫属包含人类疟疾的全部病原。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Sarcocystidae",
    chinese: "肉孢子虫科",
    parent: "Eucoccidiorida",
    description:
      "在中间宿主组织内形成包囊的球虫科,生活史常需肉食终末宿主与草食或杂食中间宿主交替完成,弓形虫属与肉孢子虫属为代表。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Rotaliidae",
    chinese: "轮孔虫科",
    parent: "Rotaliida",
    description:
      "低螺旋透明壳的底栖有孔虫科,壳背腹平凸,腹面脐部具裂隙与小柱等次生构造,卷转虫属为沿岸浅海的优势指示种。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Peronosporaceae",
    chinese: "霜霉菌科",
    parent: "Peronosporales",
    description:
      "专性寄生于维管植物的卵菌科,孢子囊经气流与雨水传播,卵孢子厚壁越冬,疫霉属曾引发爱尔兰大饥荒,霜霉属危害多种作物。",
    tags: ["family"],
  },

  // ===================== 原生生物界:属 =====================
  {
    rank: "genus",
    latin: "Amoeba",
    chinese: "变形虫属",
    authority: "Bory de Saint-Vincent, 1822",
    parent: "Amoebidae",
    description:
      "淡水裸变形虫的代表属,以粗大的圆柱状伪足运动,吞噬细菌与微小藻类,细胞常大于一般变形虫,是原生动物教学的首选观察对象。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Dictyostelium",
    chinese: "网柄菌属",
    parent: "Dictyosteliaceae",
    description:
      "社会性变形虫属,饥饿时数万细胞聚集成蛞蝓体并形成具柄子实体,细胞分化程序高度可重复,是发育生物学经典模式属。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Physarum",
    chinese: "绒泡菌属",
    parent: "Physaraceae",
    description:
      "无细胞黏菌属,原质体多核黄色,能在迷宫中找到最短路径,以缺乏神经系统却展现学习能力而著称于行为学研究。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Paramecium",
    chinese: "草履虫属",
    authority: "O.F. Müll., 1773",
    parent: "Parameciidae",
    description:
      "鞋形淡水纤毛虫属,体覆数千根纤毛,沿口沟摆动形成水流滤食,双小核草履虫等为经典遗传学与物种形成研究材料。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Tetrahymena",
    chinese: "四膜虫属",
    parent: "Tetrahymenidae",
    description:
      "梨形小纤毛虫属,口腔具四层小膜,可无菌纯培养,核二型显著,是首个完成大核基因组测序的纤毛虫属。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Stentor",
    chinese: "喇叭虫属",
    authority: "Ehrenberg, 1830",
    parent: "Stentoridae",
    description:
      "喇叭形大型纤毛虫属,体长可达毫米级,常具蓝绿或红色素,固着生活,受刺激时整体强烈收缩,是形态发生研究的经典属。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Vorticella",
    chinese: "钟虫属",
    authority: "Linnaeus, 1767",
    parent: "Vorticellidae",
    description:
      "固着型钟形纤毛虫属,以长柄附着基质,柄内肌丝使身体瞬间螺旋回缩,口缘纤毛带旋转产生摄食水流,水质监测常见属。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Euglena",
    chinese: "眼虫属",
    authority: "Ehrenberg, 1830",
    parent: "Euglenaceae",
    description:
      "单鞭毛眼虫类模式属,具红色眼点与绿色色素体,兼行光合与吸收营养,常见于富营养淡水,纤细眼虫为细胞生物学重要材料。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Trypanosoma",
    chinese: "锥虫属",
    authority: "Gruby, 1843",
    parent: "Trypanosomatidae",
    description:
      "脊椎动物血液寄生鞭毛虫属,经吸血昆虫传播,以表面抗原转换逃避免疫,布氏锥虫与克氏锥虫分别为昏睡病与恰加斯病的病原。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Noctiluca",
    chinese: "夜光藻属",
    parent: "Noctilucaceae",
    description:
      "球形异养发光甲藻属,以触手粘捕浮游藻类,夜间受扰动发出蓝光,是蓝眼泪现象的主角,暴发时形成赤潮。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Alexandrium",
    chinese: "亚历山大藻属",
    parent: "Gonyaulacaceae",
    description:
      "具甲板的有毒甲藻属,多种产生麻痹性贝毒,可被贝类富集危害人体,是全球有害赤潮的主要肇事属之一。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Thalassiosira",
    chinese: "海链藻属",
    parent: "Thalassiosiraceae",
    description:
      "圆盘状中心硅藻属,借几丁质丝连成链状群体,是海洋浮游群落的重要成分,假微型海链藻为首个完成基因组测序的硅藻。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Phaeodactylum",
    chinese: "褐指藻属",
    parent: "Phaeodactylaceae",
    description:
      "形态可在三型间切换的单型硅藻属,硅质壳高度退化,极易高密度培养,是脂质代谢与遗传转化的模式藻属。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Chlamydomonas",
    chinese: "衣藻属",
    authority: "Ehrenberg, 1833",
    parent: "Chlamydomonadaceae",
    description:
      "双鞭毛单细胞绿藻属,具杯状叶绿体与眼点,遗传工具完善,莱茵衣藻是光合作用与纤毛生物学的旗舰模式生物。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Volvox",
    chinese: "团藻属",
    authority: "Linnaeus, 1758",
    parent: "Volvocaceae",
    description:
      "空心球形群体绿藻属,细胞嵌于胶质鞘并出现生殖细胞与体细胞分工,是多细胞性起源与细胞分化演化的活模型。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Ulva",
    chinese: "石莼属",
    parent: "Ulvaceae",
    description:
      "片状两层细胞绿藻属,俗称海白菜,潮间带习见,可食用,近岸富营养化时常暴发形成大规模绿潮。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Chlorella",
    chinese: "小球藻属",
    authority: "Beij., 1890",
    parent: "Chlorellaceae",
    description:
      "球形或卵形微型绿藻属,无鞭毛,蛋白质含量高,可大规模培养,普通小球藻是光合作用与单细胞蛋白研究的经典材料。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Saccharina",
    chinese: "海带属",
    parent: "Laminariaceae",
    description:
      "冷温带大型褐藻属,孢子体分固着器、柄与带片,是褐藻胶、甘露醇与碘的重要来源,海带为主要养殖种与模式褐藻。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Macrocystis",
    chinese: "巨藻属",
    parent: "Laminariaceae",
    description:
      "世界体型最大的藻类属,藻体具气囊托举直达海面,日生长量极高,形成的巨藻林支撑着高生物多样性群落。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Sargassum",
    chinese: "马尾藻属",
    parent: "Sargassaceae",
    description:
      "具气囊分枝的大型褐藻属,种类繁多,是褐藻胶原料与药用海藻,羊栖菜在中国、日韩被作为食材与药源。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Ectocarpus",
    chinese: "水云属",
    authority: "Lyngbye, 1819",
    parent: "Ectocarpaceae",
    description:
      "丝状褐藻模式属,世代交替同形,个体发育简单,是褐藻遗传学与基因组研究的首选体系。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Pyropia",
    chinese: "紫菜属",
    parent: "Bangiaceae",
    description:
      "紫菜类红藻属,叶状体作食用海苔,生活史含贝壳内丝状体阶段,条斑紫菜与坛紫菜是东亚最重要的养殖种。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Gracilaria",
    chinese: "江蓠属",
    parent: "Gracilariaceae",
    description:
      "江蓠科琼脂藻属,圆柱状分枝藻体,琼胶产率高,龙须菜在中国大规模养殖,兼作琼脂原料与鲍鱼饵料。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Corallina",
    chinese: "珊瑚藻属",
    parent: "Corallinaceae",
    description:
      "钙化分节红藻属,粉红色枝丛布于潮间带岩石,沉积碳酸钙参与海岸生物建造,对海洋酸化敏感。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Plasmodium",
    chinese: "疟原虫属",
    authority: "Marchiafava & Celli, 1885",
    parent: "Plasmodiidae",
    description:
      "疟疾病原属,经按蚊叮咬传播,在肝细胞与红细胞内裂体增殖,已知感染人的有五种,恶性疟原虫致死率最高。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Toxoplasma",
    chinese: "弓形虫属",
    authority: "Nicolle & Manceaux, 1909",
    parent: "Sarcocystidae",
    description:
      "以猫科动物为终末宿主的球虫属,速殖子与缓殖子交替形成组织包囊,刚地弓形虫感染全球约三分之一人口。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Ammonia",
    chinese: "卷转虫属",
    parent: "Rotaliidae",
    description:
      "沿岸浅海底栖有孔虫属,壳低螺旋、背凸腹平,对盐度与污染敏感,是古环境重建与现代环境监测的标准指示属。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Phytophthora",
    chinese: "疫霉属",
    authority: "de Bary, 1875",
    parent: "Peronosporaceae",
    description:
      "毁灭性植物病原卵菌属,孢子囊释放游动孢子随水侵染根系与叶片,致病疫霉引发马铃薯晚疫病并酿成爱尔兰大饥荒。",
    tags: ["genus"],
  },

  // ===================== 原生生物界:种 =====================
  {
    rank: "species",
    latin: "Amoeba proteus",
    chinese: "大变形虫",
    authority: "(Pallas, 1766)",
    parent: "Amoeba",
    description:
      "最经典的淡水变形虫,是观察原生质流动与伪足运动的首选实验材料。以单一粗大的圆柱状伪足缓慢爬行,伪足包裹细菌与藻类形成食物泡消化。体型在原生动物中位居前列,内质颗粒流动清晰可辨,伸缩泡缓慢搏动排水。",
    morphology:
      "单细胞,直径常 300-600 微米,外质透明、内质颗粒状,伸缩泡一个,伪足呈指状圆柱,无壳无鞭毛。",
    habitat:
      "淡水池塘与缓流沟渠底部的腐殖泥表面及水草下表面,捕食细菌与小型藻类。",
    distribution: "世界性分布,温带池塘与缓流淡水水体尤为常见。",
    tags: ["species", "经典实验材料"],
  },
  {
    rank: "species",
    latin: "Dictyostelium discoideum",
    chinese: "盘基网柄菌",
    authority: "Raper, 1935",
    parent: "Dictyostelium",
    description:
      "社会性变形虫的旗舰模式生物。食物充足时以单细胞变形虫捕食细菌,饥饿时数万细胞释放 cAMP 脉冲相互召唤,聚集成可迁移的蛞蝓体并建造带柄子实体。其趋化、细胞通讯与程序性细胞分化机制与多细胞动物高度可比,基因组已完整测序。",
    morphology:
      "营养细胞为约 10 微米的变形虫,子实体高约 1-2 毫米,由死细胞构成的柄与顶端孢子团组成。",
    habitat: "林地落叶层与土壤中的细菌团块上,喜温暖潮湿环境。",
    distribution: "全球温带森林土壤,模式菌株分离自北美洲。",
    ncbiTaxId: 446891,
    tags: ["species", "模式生物"],
  },
  {
    rank: "species",
    latin: "Physarum polycephalum",
    chinese: "多头绒泡菌",
    authority: "Schwein., 1822",
    parent: "Physarum",
    description:
      "无细胞黏菌的著名代表,营养体是可铺展数十厘米的鲜黄色多核原生质团,靠内部舒张波驱动原生质在网状管道中往复流动。研究发现它能高效解决迷宫最短路径、优化运输网络并展现学习与记忆样行为,被视为最简单的智能模型之一。",
    morphology:
      "原质体为多核无隔的浓稠黄色原生质团,网状脉管明显;不良环境下收缩形成球状孢囊并产生褐色孢子。",
    habitat:
      "阴湿森林中腐烂倒木、树皮与落叶层表面,以细菌、酵母与真菌孢子为食。",
    distribution: "温带林区世界性分布,模式标本采自北美洲。",
    tags: ["species", "经典实验材料"],
  },
  {
    rank: "species",
    latin: "Paramecium aurelia",
    chinese: "双小核草履虫",
    parent: "Paramecium",
    description:
      "草履虫属的经典研究种,具两枚小核与一枚大核而得名。二十世纪四十年代起,Sonneborn 等以其为材料建立了纤毛虫遗传学与隐存种理论,现知其为含十余个亲缘种的复合群。以体纤毛协调游动,沿口沟激起水流滤食细菌。",
    morphology:
      "鞋形,长 100-200 微米,体覆纵列纤毛,口沟自前端斜向胞口,前后端各具一套伸缩泡。",
    habitat: "富含细菌与腐殖质的淡水池塘、水沟与稻田表层。",
    distribution: "世界性分布的隐存种复合群,温带尤为常见。",
    tags: ["species", "经典实验材料"],
  },
  {
    rank: "species",
    latin: "Stentor coeruleus",
    chinese: "天蓝喇叭虫",
    authority: "(Pallas, 1766)",
    parent: "Stentor",
    description:
      "伸展后呈天蓝色喇叭状的巨型纤毛虫,以柄部固着于水草,靠口缘小膜带激起涡流滤食单胞藻与细菌。受机械刺激时能瞬间整体收缩成球,遇强光产生避光运动;大核呈念珠状,是细胞再生与形态发生研究的经典材料。",
    morphology:
      "伸展时长可逾 1 毫米,喇叭口缘小膜带螺旋排列,体内密布蓝色素颗粒,大核如串珠,体表可见纵纹。",
    habitat: "洁净淡水湖泊与池塘的水草、枯枝表面,亦可游泳生活。",
    distribution: "世界性淡水分布,温带与亚热带夏秋季尤为常见。",
    tags: ["species", "经典实验材料"],
  },
  {
    rank: "species",
    latin: "Vorticella campanula",
    chinese: "伞形钟虫",
    parent: "Vorticella",
    description:
      "钟虫属的常见代表,钟形身体以长柄倒悬固着,柄内肌丝可在瞬间将虫体拉近基质并盘成螺旋。口缘纤毛带旋转形成水流把细菌扫入口中,是活性污泥与淡水水体清洁度的重要指示生物;无性分裂产生的游泳型幼虫可另择基质固着。",
    morphology:
      "钟形本体宽约 50-100 微米,口缘纤毛带围成漏斗,柄细长可数百微米,内有螺旋排列的收缩肌丝。",
    habitat: "淡水水草、丝状藻与悬浮颗粒表面,亦大量出现于污水处理系统。",
    distribution: "世界性分布,各类淡水水体与污水处理系统中均常见。",
    tags: ["species", "环境指示种"],
  },
  {
    rank: "species",
    latin: "Tetrahymena thermophila",
    chinese: "嗜热四膜虫",
    authority: "Nanney & McCoy, 1976",
    parent: "Tetrahymena",
    description:
      "四膜虫属的模式种,可无菌纯培养,端粒与端粒酶、核酶的发现均以其为关键体系,相关研究两获诺贝尔奖。其大核基因组是首个测序的纤毛虫基因组。天然分离自温暖水体,故得名嗜热;核重编程与组蛋白研究仍在广泛使用该物种。",
    morphology:
      "梨形,长约 50 微米,体纤毛纵列均匀,口腔内四层小膜,后端略尖,大核椭圆形。",
    habitat: "温暖的淡水池塘、溪流与腐殖水中,捕食细菌。",
    distribution: "主要报道于北美洲温带淡水,各地实验室广泛培养。",
    ncbiTaxId: 5911,
    tags: ["species", "模式生物"],
  },
  {
    rank: "species",
    latin: "Euglena gracilis",
    chinese: "纤细眼虫",
    authority: "Klebs, 1883",
    parent: "Euglena",
    description:
      "眼虫属的模式藻,兼行光合与异养代谢,黑暗中吸收有机物生长,是研究叶绿体次级内共生起源与代谢切换的经典材料,也用于角鲨烯、多不饱和脂肪酸等活性物质的工业化探索。红色眼点配合光敏结构实现精确趋光。",
    morphology:
      "纺锤形,长 30-60 微米,单条鞭毛自顶端伸出,红色眼点位于前端,多个盘状叶绿体,裸藻淀粉颗粒可见。",
    habitat: "富有机质的淡水池塘、沟渠与小型水体表层,喜光照充足处。",
    distribution: "世界性分布,温带与热带的淡水水体均常见。",
    tags: ["species", "模式生物"],
  },
  {
    rank: "species",
    latin: "Trypanosoma brucei",
    chinese: "布氏锥虫",
    authority: "Plimmer & Bradford, 1899",
    parent: "Trypanosoma",
    description:
      "非洲锥虫病(昏睡病)的病原体,由采采蝇在人畜间传播,在血液与淋巴中增殖,晚期侵入中枢神经引发嗜睡与昏迷。以表面糖蛋白的周期性转换逃避宿主免疫,其动基体基因重排机制是分子生物学经典课题。",
    morphology:
      "鞭毛体长 15-30 微米,鞭毛自后部发出,沿波动膜延伸至前端,近基体的动基体含大量环状 DNA。",
    habitat: "哺乳动物血液、淋巴与脑脊液,采采蝇中肠与唾液腺内发育。",
    distribution: "撒哈拉以南非洲的采采蝇分布区,乡村与牧区风险最高。",
    tags: ["species", "致病原"],
  },
  {
    rank: "species",
    latin: "Noctiluca scintillans",
    chinese: "夜光藻",
    authority: "(Macartney) Kofoid & Swezy, 1921",
    parent: "Noctiluca",
    description:
      "近海著名的发光甲藻,受船只、波浪与游鱼扰动时爆发蓝色冷光,形成蓝眼泪奇观。细胞巨大且不营光合,以一根触手粘捕硅藻等浮游藻类为食;富营养化海水中常暴发赤潮,导致局部水体缺氧并危害养殖生物。",
    morphology:
      "球形细胞直径 0.2-2 毫米,肉眼可见,具一条捕食触手,原生质集中于细胞中部,缺叶绿体与甲板。",
    habitat: "温带与亚热带近海表层水,春夏水温升高时大量增殖。",
    distribution: "世界各大陆沿岸海域,中国渤海与东海常见。",
    tags: ["species", "flagship", "赤潮"],
  },
  {
    rank: "species",
    latin: "Alexandrium catenella",
    chinese: "链状亚历山大藻",
    authority: "(Whedon & Kofoid) Balech, 1985",
    parent: "Alexandrium",
    description:
      "具甲板的有毒甲藻,常连成短链漂浮,产生麻痹性贝毒(石房蛤毒素)。贝类滤食后毒素富集而不显症状,人食用后出现神经麻痹中毒,严重者呼吸衰竭。其休眠孢子沉入海底越冬,是赤潮逐年复发的重要原因。",
    morphology:
      "细胞近圆形,直径 20-45 微米,壳板薄而纹饰细腻,顶孔复合器明显,常 4-16 个细胞连成链。",
    habitat: "温带沿岸水域与上升流区,水体分层稳定时易增殖。",
    distribution: "北美、东亚与欧洲温带海岸,中国长江口与东海常见。",
    tags: ["species", "致病原", "赤潮"],
  },
  {
    rank: "species",
    latin: "Thalassiosira pseudonana",
    chinese: "假微型海链藻",
    authority: "(Hustedt) Hasle & Heimdal, 1970",
    parent: "Thalassiosira",
    description:
      "首个完成全基因组测序的硅藻(2004 年),为理解硅质壳形成、氮磷代谢与光适应提供了模板。壳面分泌几丁质细丝将细胞连成带状群体,是连接海洋碳循环与模式生物学的重要物种。",
    morphology:
      "圆盘状中心硅藻,直径约 3-6 微米,壳面具六角形孔纹,借放射状几丁质丝连成短链。",
    habitat: "海洋与河口浮游群落,沿岸至外洋均有分布。",
    distribution: "各大洋广布的隐存种复合群,沿岸与外洋均常见。",
    ncbiTaxId: 351168,
    tags: ["species", "模式生物"],
  },
  {
    rank: "species",
    latin: "Phaeodactylum tricornutum",
    chinese: "三角褐指藻",
    authority: "Bohlin, 1897",
    parent: "Phaeodactylum",
    description:
      "第二个完成基因组测序的硅藻模式种(2008 年)。细胞可在纺锤形、三辐射形与卵形三种形态间随环境切换,硅质壳一侧高度退化,是研究硅藻形态建成、油脂合成与遗传转化的首选平台,也常用于脂肪酸营养研究。",
    morphology:
      "长 10-30 微米,常见纺锤形与三辐射形,壳面光滑少纹饰,可贴壁快速生长。",
    habitat: "温带沿岸与河口的水体及底质,耐高密度培养。",
    distribution: "世界各沿岸海域均有分布,温带海区尤为常见。",
    ncbiTaxId: 2864,
    tags: ["species", "模式生物"],
  },
  {
    rank: "species",
    latin: "Chlamydomonas reinhardtii",
    chinese: "莱茵衣藻",
    authority: "P.A. Dangeard, 1888",
    parent: "Chlamydomonas",
    description:
      "绿色单细胞鞭毛藻的旗舰模式生物,具杯状叶绿体、眼点与两条等长鞭毛,单倍体世代使突变表型直接可见。光合作用、鞭毛(纤毛)组装与细胞周期研究的多项突破出自该藻,已实现核、叶绿体与线粒体三套基因组的遗传操作。",
    morphology:
      "卵形,约 10 微米,顶端两根等长鞭毛,基部具伸缩泡,杯状叶绿体底部含淀粉核与眼点。",
    habitat: "通气良好的淡水与土壤,氮源充足时增殖旺盛。",
    distribution: "世界性分布,土壤与淡水生境均可分离获得。",
    ncbiTaxId: 3055,
    tags: ["species", "模式生物"],
  },
  {
    rank: "species",
    latin: "Volvox aureus",
    chinese: "金黄团藻",
    authority: "Ehrenberg, 1835",
    parent: "Volvox",
    description:
      "由数千个双鞭毛细胞组成的空心球形群体绿藻,细胞嵌于透明胶质鞘中,以鞭毛协调拍打滚动前进,并出现生殖细胞与体细胞的分工,是多细胞性起源研究的代表体系。无性繁殖时母群体内长出子群体并经历独特的翻转过程。",
    morphology:
      "球体直径 0.2-1 毫米,含数百至数千细胞,细胞间有胞间连丝,子群体在母球内发育后释放。",
    habitat: "富营养淡水池塘与稻田等静水水体,光照充足时常成优势种。",
    distribution: "世界性淡水分布,温带池塘与湖湾中颇常见。",
    tags: ["species", "经典实验材料"],
  },
  {
    rank: "species",
    latin: "Ulva lactuca",
    chinese: "石莼",
    authority: "Linnaeus, 1753",
    parent: "Ulva",
    description:
      "俗称海白菜的习见绿藻,藻体为仅两层细胞厚的鲜绿薄膜,基部小盘固着于岩礁。可食用,亦作饲料与肥料;对氮磷吸收能力强,近岸富营养化时常暴发性增殖,石莼类大规模聚集即形成影响浴场与航运的绿潮。",
    morphology:
      "叶片椭圆形至圆形,薄膜质,边缘波皱,两层细胞厚,鲜绿色,高数至数十厘米,基部具小固着器。",
    habitat: "潮间带岩石、牡蛎壳与河口石堤,耐一定污染与盐度波动。",
    distribution: "世界温带沿岸广布,中国南北沿海礁区习见。",
    tags: ["species", "经济物种"],
  },
  {
    rank: "species",
    latin: "Chlorella vulgaris",
    chinese: "普通小球藻",
    authority: "Beij., 1890",
    parent: "Chlorella",
    description:
      "最早被纯培养并系统研究的微藻之一,由贝耶林克于 1890 年分离命名。微小绿色单细胞,无鞭毛,以似亲孢子繁殖,蛋白质含量可达干重一半以上,曾被寄望于单细胞蛋白,如今广泛用于水产饵料、保健食品与固碳研究。",
    morphology:
      "球形至卵形,直径 2-10 微米,单个周位盘状叶绿体,细胞壁较薄,母细胞内常形成数枚似亲孢子。",
    habitat: "淡水与土壤中,富有机质水体及潮湿岩面均有分布。",
    distribution: "世界性分布,陆地与淡水生境中均易分离到。",
    ncbiTaxId: 3077,
    tags: ["species", "经济物种"],
  },
  {
    rank: "species",
    latin: "Saccharina japonica",
    chinese: "海带",
    authority: "(Miyabe) C.E. Lane, Mayes, Druehl & G.W. Saunders, 2006",
    parent: "Saccharina",
    description:
      "最重要的养殖褐藻,即日常食用的海带,中国养殖量居世界首位。孢子体分化出固着器、短柄与宽大带片,是褐藻胶、甘露醇与碘的主要原料;生活史为孢子体占优的异形世代交替,二十世纪二十年代自日本海区引入中国后实现大规模浮筏养殖。",
    morphology:
      "带片宽 10-30 厘米,长一般 2-3 米,中部厚两侧薄,深橄榄褐色,表面黏滑,基部短柄与分枝固着器。",
    habitat: "冷温带低潮带至潮下带岩礁,浮筏养殖于清洁开阔海域。",
    distribution: "西北太平洋原产,中国、韩国与日本大规模养殖。",
    tags: ["species", "flagship", "经济物种"],
  },
  {
    rank: "species",
    latin: "Macrocystis pyrifera",
    chinese: "巨藻",
    authority: "(L.) C. Agardh, 1820",
    parent: "Macrocystis",
    description:
      "世界上体型最大的藻类,自固着器伸出长柄,叶片基部气囊托举带片直抵海面,日伸长可达数十厘米,成体全长常逾 30 米。巨藻构成的海藻林是海獭、岩鱼等数百种生物的栖息地,也是褐藻胶的重要工业原料。",
    morphology:
      "柄多次二叉分枝,各叶片具短柄与基部气囊,整体呈巨大羽状冠层,漂浮于海面。",
    habitat: "寒温带至冷温带清澈潮下带岩礁,要求养分充足、光线透射良好。",
    distribution: "太平洋东北岸及南半球冷水海域,为巨藻林主要分布区。",
    tags: ["species", "经济物种"],
  },
  {
    rank: "species",
    latin: "Sargassum fusiforme",
    chinese: "羊栖菜",
    authority: "(Turner) C. Agardh, 1820",
    parent: "Sargassum",
    description:
      "具重要经济价值的暖温带褐藻,主枝直立多分叉,叶片棒状,常膨大成纺锤形气囊。全藻可食,干品富含褐藻胶与岩藻多糖,是中国传统药食两用海藻,浙江洞头等地已实现规模化养殖,产品远销日韩。",
    morphology:
      "藻体黄褐色,高一般 15-60 厘米,主枝圆柱形,叶形多变,气囊纺锤形具柄,固着器盘状。",
    habitat: "温带低潮带石沼与潮下带上部岩礁,喜风浪与养分适中环境。",
    distribution: "西北太平洋暖温带沿岸,中国、韩国与日本。",
    tags: ["species", "经济物种"],
  },
  {
    rank: "species",
    latin: "Ectocarpus siliculosus",
    chinese: "水云",
    authority: "(Dillwyn) Lyngbye, 1819",
    parent: "Ectocarpus",
    description:
      "首个完成全基因组测序的褐藻(2010 年),由此成为褐藻发育与生理研究的分子平台。藻体为单列细胞组成的绒毛状丝体,匍匐丝与直立丝分化明显,世代交替同形,生活史受温度与盐度调控,是岩礁早期污损群落的常见成员。",
    morphology:
      "丝体淡褐色,高数厘米,细胞单列,直立枝具对生侧枝,基部匍匐固着,生殖枝末端细长。",
    habitat: "温带潮间带至浅海的岩壁、贝壳及其他海藻体表。",
    distribution: "世界温带沿岸广布,北大西洋与太平洋均常见。",
    tags: ["species", "模式生物"],
  },
  {
    rank: "species",
    latin: "Pyropia yezoensis",
    chinese: "条斑紫菜",
    authority: "(Ueda) M.S. Hwang & H.G. Choi, 2011",
    parent: "Pyropia",
    description:
      "中国、日本与韩国最重要的紫菜养殖种,商品海苔多以本品制成。叶状体为紫红色薄膜,生活史包含贝壳内丝状体与叶状体两个世代,人工采苗与育种技术成熟;条斑指其表面呈条带状排列的孢子囊斑块。",
    morphology:
      "叶片披针形,长 10-30 厘米,紫红至暗绿色,一至二层细胞厚,边缘波状,基部小固着器。",
    habitat: "潮间带岩礁与贝壳,耐干露,春秋季生长旺盛。",
    distribution: "西北太平洋温带沿岸,江苏沿海为最大养殖区。",
    tags: ["species", "经济物种"],
  },
  {
    rank: "species",
    latin: "Gracilaria lemaneiformis",
    chinese: "龙须菜",
    parent: "Gracilaria",
    description:
      "江蓠属的重要养殖红藻,因藻体纤细如须而得名龙须菜,是琼脂工业的优质原料。蛋白质含量高,兼作鲍鱼饲料与健康食品,中国沿海已实现规模化栽培与品系选育,是我国重要的大型经济海藻之一。",
    morphology:
      "藻体直立丛生,圆柱形主枝多分叉,紫红或黄褐色,质地脆软,高 10-50 厘米,固着器盘状。",
    habitat: "温带及亚热带沙泥底质内湾,固着于石砾与贝壳上。",
    distribution: "太平洋温带至亚热带沿岸,中国闽浙沿海为重要养殖区。",
    tags: ["species", "经济物种"],
  },
  {
    rank: "species",
    latin: "Corallina officinalis",
    chinese: "珊瑚藻",
    authority: "Linnaeus, 1758",
    parent: "Corallina",
    description:
      "模式钙化红藻,粉紫色分节枝体附着于岩石,节间完全钙化而关节保持柔韧,触感粗糙如珊瑚而得名。钙化沉积使其成为海岸带碳酸钙收支的重要贡献者与海洋酸化研究的指示生物;林奈时代即被正式描述,是珊瑚藻属的模式种。",
    morphology:
      "枝体丛生成壳垫状,粉红至紫色,分节明显,节间钙化坚硬,高数厘米,固着于岩石。",
    habitat: "潮间带岩石水潭至潮下带,常成明显带状群落。",
    distribution: "北大西洋两岸温带海岸为主,全球温带亦有记载。",
    tags: ["species", "环境指示种"],
  },
  {
    rank: "species",
    latin: "Plasmodium falciparum",
    chinese: "恶性疟原虫",
    authority: "Welch, 1897",
    parent: "Plasmodium",
    description:
      "五种人类疟原虫中致死性最强的一种,引起的恶性疟占全球疟疾死亡的绝大多数,可致重症贫血与脑型疟。经按蚊叮咬传播,先后在肝细胞与红细胞内裂体增殖,青蒿素联合疗法为当前标准方案,耐药与疫苗攻关仍在持续。",
    morphology:
      "环状滋养体纤细、贴于红细胞边缘,单细胞内常多虫寄生,配子体呈新月形,疟色素深褐。",
    habitat: "人体肝细胞与红细胞,雌按蚊胃壁与唾液腺。",
    distribution: "非洲撒哈拉以南高发,热带与亚热带广泛分布。",
    ncbiTaxId: 5833,
    tags: ["species", "flagship", "致病原"],
  },
  {
    rank: "species",
    latin: "Toxoplasma gondii",
    chinese: "刚地弓形虫",
    authority: "Nicolle & Manceaux, 1909",
    parent: "Toxoplasma",
    description:
      "弓形虫病的病原体,猫科动物为唯一终末宿主,随猫粪排出的卵囊被中间宿主吞入后,速殖子在有核细胞内增殖并形成组织包囊长期潜伏。全球约三分之一人口血清阳性,孕妇初染可致胎儿畸形,免疫缺陷者可发重症。",
    morphology:
      "速殖子香蕉形,长约 5-7 微米,前端具类锥体,组织包囊内满含缓殖子,卵囊圆形壁薄。",
    habitat: "猫科动物肠上皮与温血动物有核细胞,卵囊随粪便进入土壤与水。",
    distribution: "世界性分布,湿热温暖地区人群血清阳性率更高。",
    ncbiTaxId: 5835,
    tags: ["species", "致病原"],
  },
  {
    rank: "species",
    latin: "Ammonia beccarii",
    chinese: "毕克卷转虫",
    authority: "(Linnaeus, 1758)",
    parent: "Ammonia",
    description:
      "沿岸浅海最习见的底栖有孔虫之一,壳低螺旋、背凸腹平,林奈时代即被正式描述。对盐度、温度与重金属污染敏感,群落变化常用于重建古海岸线与评估现代环境压力,是海洋环境监测与微体化石研究的标准种。",
    morphology:
      "壳径约 0.5 毫米,房室多圈螺旋排列,壳壁透明穿孔,腹面脐部见裂隙与小柱,伪足自壳口外伸成网。",
    habitat: "潮间带至数十米深的泥沙与粉砂底质,喜盐度波动区。",
    distribution: "世界沿岸浅海广布,泥沙底质群落的优势种。",
    tags: ["species", "环境指示种"],
  },
  {
    rank: "species",
    latin: "Phytophthora infestans",
    chinese: "致病疫霉",
    authority: "(Mont.) de Bary, 1875",
    parent: "Phytophthora",
    description:
      "马铃薯晚疫病的病原卵菌,十九世纪四十年代在爱尔兰引发马铃薯绝收,造成大饥荒并深刻改变历史进程。菌丝无隔,叶背形成白色霉层并产生柠檬形孢子囊,释放带双鞭毛的游动孢子随雨水侵染,至今仍是全球马铃薯产业的首要威胁。",
    morphology:
      "无隔菌丝发达,孢囊梗丛生,孢子囊柠檬形具乳突,卵孢子厚壁,可在人工培养基上大量产孢。",
    habitat: "马铃薯与番茄的叶片、块茎与果实组织,残体与土壤中越冬。",
    distribution: "世界马铃薯与番茄种植区,冷凉多雨年份易流行。",
    ncbiTaxId: 4784,
    tags: ["species", "致病原"],
  },

  // ===================== 真菌界 Fungi:门 =====================
  {
    rank: "phylum",
    latin: "Ascomycota",
    chinese: "子囊菌门",
    parent: "Fungi",
    description:
      "真菌中种类最多的门,有性生殖在囊状子囊内产生子囊孢子,一子囊通常含八枚孢子。从单细胞酵母到大型盘菌与块菌,青霉、曲霉、羊肚菌等经济与药用真菌均属此门,亦含绝大多数地衣真菌。",
    tags: ["phylum"],
  },
  {
    rank: "phylum",
    latin: "Basidiomycota",
    chinese: "担子菌门",
    parent: "Fungi",
    description:
      "有性孢子着生于担子外侧的真菌,菌丝常具锁状联合,包括蘑菇、多孔菌、锈菌与黑粉菌等。腐生、菌根共生与寄生策略多样,是森林生态系统的主力分解者与菌根伙伴。",
    tags: ["phylum"],
  },
  {
    rank: "phylum",
    latin: "Mucoromycota",
    chinese: "毛霉门",
    authority: "Hibbett et al., 2007",
    parent: "Fungi",
    description:
      "菌丝多无隔多核的早期分化真菌,无性繁殖产生孢囊孢子,有性生殖形成接合孢子。包含毛霉类以及与植物共生的多个分支,常见于土壤与腐败有机物,生长极为迅速。",
    tags: ["phylum"],
  },
  {
    rank: "phylum",
    latin: "Chytridiomycota",
    chinese: "壶菌门",
    parent: "Fungi",
    description:
      "产生后生单鞭毛游动孢子的水生真菌,是最早分化的真菌门之一。营养体自单细胞至原始菌丝体,腐生或寄生于藻类、植物与动物,对水生生境与两栖类健康影响重大。",
    tags: ["phylum"],
  },
  {
    rank: "phylum",
    latin: "Glomeromycota",
    chinese: "球囊菌门",
    authority: "Schüßler et al., 2001",
    parent: "Fungi",
    description:
      "全部与植物根系形成丛枝菌根的共生真菌,泥盆纪化石中即与早期陆生植物伴生,帮助约八成陆生植物获取磷等养分,在农田与自然生态系统中功能关键。",
    tags: ["phylum"],
  },

  // ===================== 真菌界:纲 =====================
  {
    rank: "class",
    latin: "Saccharomycetes",
    chinese: "酵母纲",
    parent: "Ascomycota",
    description:
      "营养体主要为出芽单细胞的酵母类,子囊裸露不形成子实体,子囊孢子数目因种而异。发酵糖类能力强,酿酒与面包酵母及许多人类致病酵母均属此纲。",
    tags: ["class"],
  },
  {
    rank: "class",
    latin: "Sordariomycetes",
    chinese: "粪壳菌纲",
    parent: "Ascomycota",
    description:
      "子囊果多为具孔口的子囊壳,菌丝体发达,常见于粪便、腐木与植物残体。脉孢菌、麦角菌与线虫草等遗传模式、药源与药用真菌均属此纲。",
    tags: ["class"],
  },
  {
    rank: "class",
    latin: "Pezizomycetes",
    chinese: "盘菌纲",
    parent: "Ascomycota",
    description:
      "子囊果为张开呈盘状或杯状的子囊盘,子囊顶端开裂强力弹射孢子。多数腐生于土壤、腐木与粪肥,羊肚菌与块菌等名贵食用真菌属此纲。",
    tags: ["class"],
  },
  {
    rank: "class",
    latin: "Eurotiomycetes",
    chinese: "散囊菌纲",
    parent: "Ascomycota",
    description:
      "子囊果多为闭囊壳状,无性阶段极为发达,青霉与曲霉的分生孢子形态是分类与工业应用的核心。产青霉素、柠檬酸等大量工业产品的类群集中于此纲。",
    tags: ["class"],
  },
  {
    rank: "class",
    latin: "Agaricomycetes",
    chinese: "伞菌纲",
    parent: "Basidiomycota",
    description:
      "担子果发达的大型真菌纲,子实层体呈菌褶、管孔或刺状,包括绝大多数常见蘑菇与多孔菌,腐生、菌根与弱寄生种类繁多,是人们最熟悉的真菌类群。",
    tags: ["class"],
  },
  {
    rank: "class",
    latin: "Pucciniomycetes",
    chinese: "柄锈菌纲",
    parent: "Basidiomycota",
    description:
      "不形成担子果的植物寄生锈菌类,生活史最多含五种孢子类型,常需两种不相关寄主转主完成,冬孢子有柄,萌发产生有隔担子,是作物重大病害的来源。",
    tags: ["class"],
  },
  {
    rank: "class",
    latin: "Ustilaginomycetes",
    chinese: "黑粉菌纲",
    parent: "Basidiomycota",
    description:
      "系统侵染维管植物并形成黑粉状冬孢子堆的寄生真菌,冬孢子萌发经减数分裂产生担孢子,侵染禾草等寄主形成菌瘿,部分种类可被人类食用。",
    tags: ["class"],
  },
  {
    rank: "class",
    latin: "Tremellomycetes",
    chinese: "银耳纲",
    parent: "Basidiomycota",
    description:
      "生活史具酵母阶段的胶质真菌纲,担子被纵隔成四室,子实体富含胶质。包含银耳等食用菌与隐球酵母等重要人类条件致病菌,生态与医学意义兼备。",
    tags: ["class"],
  },
  {
    rank: "class",
    latin: "Mucoromycetes",
    chinese: "毛霉纲",
    parent: "Mucoromycota",
    description:
      "菌丝粗大无隔多核的毛霉类,无性繁殖于孢子囊内产生大量孢囊孢子,有性形成接合孢子。生长迅速,多为腐生,少数种类可致人类接合菌病。",
    tags: ["class"],
  },
  {
    rank: "class",
    latin: "Chytridiomycetes",
    chinese: "壶菌纲",
    parent: "Chytridiomycota",
    description:
      "游动孢子具一根后生鞭毛的壶菌类,菌体常生于宿主细胞内并经出管释放孢子。多为水生腐生或寄生菌,包括危害全球两栖动物的蛙壶菌。",
    tags: ["class"],
  },
  {
    rank: "class",
    latin: "Glomeromycetes",
    chinese: "球囊菌纲",
    parent: "Glomeromycota",
    description:
      "菌丝粗而无隔,侵入根皮层形成丛枝与泡囊,以大而厚壁的土壤孢子越冬扩散的专性菌根真菌纲,无法脱离宿主完成生活史。",
    tags: ["class"],
  },

  // ===================== 真菌界:目 =====================
  {
    rank: "order",
    latin: "Saccharomycetales",
    chinese: "酵母目",
    parent: "Saccharomycetes",
    description:
      "以出芽或裂殖繁殖的酵母类真菌目,子囊由营养细胞直接转化而成。发酵葡萄糖产生乙醇与二氧化碳的能力使其成为酿酒与烘焙工业的基石。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Sordariales",
    chinese: "粪壳菌目",
    parent: "Sordariomycetes",
    description:
      "典型粪生与腐生的子囊壳真菌目,子囊果暗色、具孔口,常以强力弹射的孢子定殖新鲜粪便与腐木,是遗传学与发育研究的丰富素材。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Hypocreales",
    chinese: "肉座菌目",
    parent: "Sordariomycetes",
    description:
      "子座色泽常鲜艳的子囊壳真菌目,寄生于昆虫、真菌与植物或营腐生,产多种生物碱与活性物质,线虫草科与麦角菌科等重要药源类群均属此。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Pezizales",
    chinese: "盘菌目",
    parent: "Pezizomycetes",
    description:
      "盘菌纲的模式目,子囊盘大型张开或在地下聚生,子囊顶端开裂弹射孢子。羊肚菌、块菌等世界名贵食用菌集中于本目。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Eurotiales",
    chinese: "散囊菌目",
    parent: "Eurotiomycetes",
    description:
      "形成闭囊壳状子囊果的真菌目,无性型为青霉与曲霉等丝状产孢真菌。工业酶、抗生素与有机酸生产的主力类群集中于此。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Agaricales",
    chinese: "伞菌目",
    parent: "Agaricomycetes",
    description:
      "典型的伞状蘑菇目,子实层体为放射排列的菌褶,担孢子自担子强力弹射。包含最多可食用与剧毒种类,也是栽培食用菌的主体。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Boletales",
    chinese: "牛肝菌目",
    parent: "Agaricomycetes",
    description:
      "子实层体为可剥离管孔而非菌褶的蘑菇目,菌肉常厚实,多为外生菌根菌。美味牛肝菌等名贵食用菌属此,亦含少数毒性种。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Polyporales",
    chinese: "多孔菌目",
    parent: "Agaricomycetes",
    description:
      "担子果平伏反卷至帽状、子实层体为管孔的多孔菌类,是木材白腐的主要分解者。灵芝等传统药用真菌均属此目。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Pucciniales",
    chinese: "柄锈菌目",
    parent: "Pucciniomycetes",
    description:
      "专性寄生于维管植物的锈菌目,不形成担子果,以夏孢子在生长季多次再侵染,冬孢子越冬后萌发完成有性循环,禾柄锈菌为代表。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Ustilaginales",
    chinese: "黑粉菌目",
    parent: "Ustilaginomycetes",
    description:
      "寄生于禾草等植物的黑粉菌类,菌丝在寄主体内扩展后集中形成黑粉状冬孢子堆,玉米黑粉菌为代表,同时也是重要的遗传研究模式。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Tremellales",
    chinese: "银耳目",
    parent: "Tremellomycetes",
    description:
      "胶质子实体与酵母型生活史并存的真菌目,担子被纵隔成四室,子实体富含胶质。银耳等食用菌与隐球酵母属等致病酵母均隶属此目。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Mucorales",
    chinese: "毛霉目",
    parent: "Mucoromycetes",
    description:
      "生长极速的无隔菌丝真菌目,孢子囊内大量产生无性孢子,根霉与毛霉常见于面包与果蔬霉变,并用于发酵食品与酶制剂生产。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Chytridiales",
    chinese: "壶菌目",
    parent: "Chytridiomycetes",
    description:
      "壶菌纲的传统核心目,游动孢子具后生单鞭毛,孢子囊经出管释放游动孢子,多为淡水腐生或藻类寄生,蛙壶菌科亦置于本目。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Glomerales",
    chinese: "球囊菌目",
    parent: "Glomeromycetes",
    description:
      "丛枝菌根真菌的核心目,在植物根内形成丛枝,在土壤中产生大而厚壁的球形孢子,与约八成陆生植物根系共生,农业与生态意义巨大。",
    tags: ["order"],
  },

  // ===================== 真菌界:科 =====================
  {
    rank: "family",
    latin: "Saccharomycetaceae",
    chinese: "酵母科",
    parent: "Saccharomycetales",
    description:
      "出芽繁殖、具强发酵力的酵母科,子囊由双核细胞直接发育而来,含酿酒酵母等人类驯化历史最悠久的模式与工业菌种。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Sordariaceae",
    chinese: "粪壳菌科",
    parent: "Sordariales",
    description:
      "暗色子囊壳的粪生真菌科,子囊孢子具发芽孔或附属丝,粗糙脉孢菌为经典的遗传学与昼夜节律研究模式。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Ophiocordycipitaceae",
    chinese: "线虫草科",
    parent: "Hypocreales",
    description:
      "寄生于昆虫等节肢动物的肉座菌科群,子座直立细长、色泽鲜亮,子囊壳埋生于子座内,包含冬虫夏草及多种重要药用虫草。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Clavicipitaceae",
    chinese: "麦角菌科",
    parent: "Hypocreales",
    description:
      "寄生禾本科植物及昆虫的真菌科,菌核或子座内产生吲哚类生物碱等多种活性物质,麦角菌属为其代表。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Morchellaceae",
    chinese: "羊肚菌科",
    parent: "Pezizales",
    description:
      "子囊果具蜂窝状菌盖的盘菌科,与树木关系密切,多在春季出土,羊肚菌属为世界闻名的珍馐,近年人工栽培取得突破。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Tuberaceae",
    chinese: "块菌科",
    parent: "Pezizales",
    description:
      "子囊果闭合发育于地下的盘菌科,依靠浓郁气味吸引动物挖掘取食以传播孢子,块菌属即黑松露与白松露类。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Aspergillaceae",
    chinese: "曲霉科",
    parent: "Eurotiales",
    description:
      "无性型分生孢子极其发达的真菌科,菌落呈绿黄黑色粉状,青霉属与曲霉属为抗生素、酶制剂与食品发酵的工业核心。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Agaricaceae",
    chinese: "蘑菇科",
    parent: "Agaricales",
    description:
      "菌柄中生、菌褶离生、孢子印深色的伞菌科,包含双孢蘑菇等全球栽培最广泛的食用菌,亦有马勃等闭合型成员。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Amanitaceae",
    chinese: "鹅膏菌科",
    parent: "Agaricales",
    description:
      "具菌托与菌环、孢子印白色的伞菌科,几乎全部为外生菌根菌。包含毒蝇鹅膏等标志性物种,全球多数致命蘑菇中毒事件由此科引起。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Tricholomataceae",
    chinese: "口蘑科",
    parent: "Agaricales",
    description:
      "传统上的大型多型科,历史上容纳香菇等大量木生与土生食用菌,现代依分子证据被大幅细分,仍为伞菌目重要的经济类群。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Pleurotaceae",
    chinese: "侧耳科",
    parent: "Agaricales",
    description:
      "菌柄偏生或近无柄、菌褶延生的木腐菌科,栽培容易且能利用秸秆等农业废料,糙皮侧耳(平菇)为世界性栽培种。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Boletaceae",
    chinese: "牛肝菌科",
    parent: "Boletales",
    description:
      "子实层体为管孔的外生菌根菌科,菌肉白色致密,美味牛肝菌等顶级食用菌属此,亦有少数致幻或毒性种类。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Ganodermataceae",
    chinese: "灵芝科",
    parent: "Polyporales",
    description:
      "担子果木栓质至木质、表面具漆样光泽的药用多孔菌科,孢子双层壁,灵芝属的种类药用与观赏价值兼备。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Pucciniaceae",
    chinese: "柄锈菌科",
    parent: "Pucciniales",
    description:
      "锈菌最大的科,冬孢子具柄散生,多为禾谷类作物与草坪的锈病病原,柄锈菌属含数千种,是植物病理学的经典类群。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Ustilaginaceae",
    chinese: "黑粉菌科",
    parent: "Ustilaginales",
    description:
      "冬孢子散生粉状的黑粉菌科,萌发产生有隔担子与担孢子,玉米黑粉菌为遗传学研究的模式种。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Tremellaceae",
    chinese: "银耳科",
    parent: "Tremellales",
    description:
      "子实体瓣状胶质、干后强烈收缩的真菌科,担子十字纵隔,银耳属为中国传统滋补食材的代表。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Cryptococcaceae",
    chinese: "隐球酵母科",
    parent: "Tremellales",
    description:
      "以酵母形态为主的银耳目科,部分种产生多糖荚膜并能感染人与动物,隐球酵母属为重要的条件致病酵母。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Mucoraceae",
    chinese: "毛霉科",
    parent: "Mucorales",
    description:
      "孢子囊球形、囊轴发达的毛霉科,匍匐菌丝与假根分化明显,根霉属与毛霉属常见于霉变食物并偶致接合菌病。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Batrachochytriaceae",
    chinese: "蛙壶菌科",
    parent: "Chytridiales",
    description:
      "壶菌目中以两栖动物为宿主的小科,现仅含蛙壶菌属,其成员在宿主表皮角质层细胞内发育并释放游动孢子。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Glomeraceae",
    chinese: "球囊菌科",
    parent: "Glomerales",
    description:
      "球囊菌目最大的科,土壤孢子大而厚壁,根内形成丛枝并常伴泡囊,不规则根孢囊霉为全球广泛使用的菌根模式菌。",
    tags: ["family"],
  },

  // ===================== 真菌界:属 =====================
  {
    rank: "genus",
    latin: "Saccharomyces",
    chinese: "酵母属",
    authority: "Meyen, 1833",
    parent: "Saccharomycetaceae",
    description:
      "出芽繁殖、发酵力强的单细胞真菌属,含酿酒酵母等人类驯化历史最悠久的菌种,是发酵工业与真核生物学的奠基模式属。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Neurospora",
    chinese: "脉孢菌属",
    authority: "Shear & B.O. Dodge, 1927",
    parent: "Sordariaceae",
    description:
      "橙色分生孢子的粪壳类真菌属,俗称红色面包霉,因易培养且减数分裂产物可直接计数而成为遗传学经典模式属。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Ophiocordyceps",
    chinese: "线虫草属",
    parent: "Ophiocordycipitaceae",
    description:
      "寄生于昆虫与蛛类的肉座菌类真菌属,子座自宿主遗骸伸出,冬虫夏草为本属最著名的药用代表。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Claviceps",
    chinese: "麦角菌属",
    authority: "Tul., 1853",
    parent: "Clavicipitaceae",
    description:
      "禾本科植物穗部寄生真菌属,菌核富含麦角生物碱,兼具毒性与重要药用价值,麦角菌为代表种。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Morchella",
    chinese: "羊肚菌属",
    parent: "Morchellaceae",
    description:
      "菌盖蜂窝状的名贵盘菌属,春季林地名贵食用菌,生活史复杂,近十余年人工栽培技术取得突破并推广。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Tuber",
    chinese: "块菌属",
    parent: "Tuberaceae",
    description:
      "地下形成闭合子实体的盘菌属,即松露类,气味浓烈,依赖动物挖掘取食传播孢子,黑孢块菌与白松露价值极高。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Aspergillus",
    chinese: "曲霉属",
    authority: "Micheli, 1729",
    parent: "Aspergillaceae",
    description:
      "分生孢子头放射状膨大的丝状真菌属,工业酶与有机酸生产的主力,少数种致曲霉病,黑曲霉与黄曲霉最著名。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Penicillium",
    chinese: "青霉属",
    authority: "Link, 1809",
    parent: "Aspergillaceae",
    description:
      "帚状分生孢子梗的丝状真菌属,青霉素发现于本属,广泛用于抗生素、酶制剂与奶酪发酵工业。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Agaricus",
    chinese: "蘑菇属",
    authority: "L., 1753",
    parent: "Agaricaceae",
    description:
      "菌褶离生、孢子印紫褐的伞菌属,含双孢蘑菇等全球栽培量最大的食用菌,亦称伞菌属。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Amanita",
    chinese: "鹅膏菌属",
    authority: "Pers., 1797",
    parent: "Amanitaceae",
    description:
      "具菌托与菌环的外生菌根伞菌属,含鹅膏毒肽类剧毒种与标志性的毒蝇鹅膏,全球致命蘑菇中毒的主要来源。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Lentinula",
    chinese: "香菇属",
    parent: "Tricholomataceae",
    description:
      "木腐食用菌小属,香菇为东亚最重要的栽培食用菌与药用菌,香气独特并富含香菇多糖。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Pleurotus",
    chinese: "侧耳属",
    authority: "(Fr.) P. Kumm., 1871",
    parent: "Pleurotaceae",
    description:
      "菌柄侧生、菌褶延生的木生食用菌属,平菇类极易栽培且能利用农业废料,部分种可捕食线虫补充氮源。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Boletus",
    chinese: "牛肝菌属",
    authority: "L., 1753",
    parent: "Boletaceae",
    description:
      "管孔子实层的外生菌根食用菌属,美味牛肝菌等被视为顶级山珍,难以人工栽培,依赖野生采集。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Ganoderma",
    chinese: "灵芝属",
    authority: "P. Karst., 1881",
    parent: "Ganodermataceae",
    description:
      "漆样光泽担子果的药用多孔菌属,灵芝在东亚药用已逾两千年,是传统药物与现代药理研究的双重明星。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Puccinia",
    chinese: "柄锈菌属",
    authority: "Pers., 1801",
    parent: "Pucciniaceae",
    description:
      "锈菌最大属,冬孢子双细胞有柄,含数千种禾谷与草坪锈病病原,禾柄锈菌为植物病理学经典模式。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Ustilago",
    chinese: "黑粉菌属",
    authority: "(Pers.) Roussel, 1806",
    parent: "Ustilaginaceae",
    description:
      "黑粉菌模式属,在寄主组织内产生黑粉状冬孢子堆,玉米黑粉菌为担子菌遗传学的经典模型。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Tremella",
    chinese: "银耳属",
    authority: "Pers., 1797",
    parent: "Tremellaceae",
    description:
      "胶质瓣状子实体的食用菌属,担子纵隔,银耳为中国传统滋补食材与多糖药源的代表种。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Cryptococcus",
    chinese: "隐球酵母属",
    authority: "Kütz., 1833",
    parent: "Cryptococcaceae",
    description:
      "具多糖荚膜的酵母型真菌属,环境栖息于鸟粪与腐木,新型隐球酵母是重要的人类条件致病菌。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Rhizopus",
    chinese: "根霉属",
    authority: "Ehrenb., 1820",
    parent: "Mucoraceae",
    description:
      "具匍匐菌丝与假根的毛霉目真菌属,常见霉腐菌与发酵菌,黑根霉是食品霉变的标志性物种。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Batrachochytrium",
    chinese: "蛙壶菌属",
    parent: "Batrachochytriaceae",
    description:
      "寄生于两栖动物皮肤的壶菌属,现知含蛙壶菌与蝾螈壶菌两个种,均为全球两栖类种群衰退的重大病原。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Rhizophagus",
    chinese: "根孢囊霉属",
    parent: "Glomeraceae",
    description:
      "丛枝菌根真菌属,自球囊霉属分出,不规则根孢囊霉为菌根共生机理与农业接种剂研究的世界模式菌。",
    tags: ["genus"],
  },

  // ===================== 真菌界:种 =====================
  {
    rank: "species",
    latin: "Saccharomyces cerevisiae",
    chinese: "酿酒酵母",
    authority: "Meyen ex E.C. Hansen, 1883",
    parent: "Saccharomyces",
    description:
      "人类利用最早、研究最深的真核模式生物,是酿酒、面包与生物燃料产业的核心菌种。1996 年成为首个完成全基因组测序的真核生物,细胞周期、膜泡运输等基础研究多次获诺贝尔奖,如今也是合成生物学的首选底盘。",
    morphology:
      "卵形单细胞,直径 5-10 微米,出芽繁殖可见芽痕,偶成假菌丝,子囊内通常四枚光滑孢子。",
    habitat: "富含糖分的果实表皮、树液与花蜜,以及人类酿造与烘焙环境。",
    distribution: "世界性分布,并被全球实验室广泛驯化培养。",
    ncbiTaxId: 4932,
    tags: ["species", "模式生物", "flagship", "经济物种"],
  },
  {
    rank: "species",
    latin: "Neurospora crassa",
    chinese: "粗糙脉孢菌",
    authority: "Shear & B.O. Dodge, 1927",
    parent: "Neurospora",
    description:
      "俗称红色面包霉的经典遗传模式生物,橙色分生孢子极易在霉变面包上识别。Beadle 与 Tatum 借其提出一基因一酶假说并获 1958 年诺贝尔奖;其昼夜节律、DNA 修复与表观遗传研究持续领先,八枚子囊孢子直接展示减数分裂产物。",
    morphology:
      "菌丝多核具隔,分生孢子橙红色成链,子囊壳暗色梨形,八枚纺锤形子囊孢子具纵纹。",
    habitat: "腐熟植物残体、火烧林地与土壤,耐较高温度。",
    distribution: "世界性分布,热带与亚热带的腐殖基质上尤为常见。",
    ncbiTaxId: 5141,
    tags: ["species", "模式生物"],
  },
  {
    rank: "species",
    latin: "Morchella esculenta",
    chinese: "羊肚菌",
    authority: "(L.) Pers., 1822",
    parent: "Morchella",
    description:
      "菌盖呈蜂窝状的名贵春季食用菌,菌盖与柄相连中空,风味浓郁独特。长期以来依赖野外采集,近十余年在中国突破人工栽培并实现量产;其复杂的菌根关系与生活史仍有许多未解之谜。",
    morphology:
      "菌盖圆锥形,浅黄褐色,表面凹坑蜂窝状,与白色中空柄相连,整体高 5-20 厘米。",
    habitat: "春初阔叶林地、林缘、果园与火烧迹地,常群生。",
    distribution: "北半球温带广泛分布,中国西南与北方山区常见。",
    tags: ["species", "经济物种"],
  },
  {
    rank: "species",
    latin: "Penicillium chrysogenum",
    chinese: "产黄青霉",
    authority: "Thom, 1930",
    parent: "Penicillium",
    description:
      "青霉素的工业生产菌。弗莱明 1928 年发现青霉素时使用的是近缘青霉,而二战期间自美国甜瓜分离的高产菌株经持续诱变选育支撑了大规模量产,拯救了无数生命;如今该菌也用于葡萄糖氧化酶等酶制剂生产。",
    morphology:
      "分生孢子梗帚状多轮分枝,分生孢子串生呈蓝绿色,菌落绒状,背面常现黄色素。",
    habitat: "土壤、腐烂果蔬与柑橘表面等含糖有机基质上。",
    distribution: "世界性分布,并被驯化为遍布全球的工业菌株。",
    tags: ["species", "经济物种"],
  },
  {
    rank: "species",
    latin: "Aspergillus niger",
    chinese: "黑曲霉",
    authority: "van Tiegh., 1867",
    parent: "Aspergillus",
    description:
      "黑色孢子头的常见丝状真菌,是全球柠檬酸工业的主力生产菌,亦大量产淀粉酶、蛋白酶与果胶酶用于食品加工。通常对人类弱致病或无害,但可引起粮食霉变与罕见的机会性感染。",
    morphology:
      "分生孢子头黑色放射状,顶囊球形,产孢结构双层排列,菌落初期黄色后转黑粉状。",
    habitat: "土壤、腐败植物、粮食与果实表面等有机质丰富处。",
    distribution: "世界性分布,温暖潮湿的储粮环境极易滋生。",
    tags: ["species", "经济物种"],
  },
  {
    rank: "species",
    latin: "Tuber melanosporum",
    chinese: "黑孢块菌",
    authority: "Vittad., 1831",
    parent: "Tuber",
    description:
      "即黑松露,与橡树、榛树形成外生菌根,子实体在地下发育,成熟时散发浓郁气味引诱动物挖掘取食传播孢子。法国佩里戈尔为核心产区,每公斤售价可达数千欧元,是美食界与菌物学共同的明星物种。",
    morphology:
      "子实体块状,直径 2-10 厘米,表面黑色疣状,内部成熟后紫黑色,白色脉络交织。",
    habitat: "钙质土壤的橡树、榛树林地,发育于地下数至数十厘米。",
    distribution: "欧洲西南部为主,法国、西班牙与意大利为核心产区。",
    tags: ["species", "flagship", "经济物种"],
  },
  {
    rank: "species",
    latin: "Ophiocordyceps sinensis",
    chinese: "冬虫夏草",
    authority: "(Berk.) G.H. Sung, J.M. Sung, Hywel-Jones & Spatafora, 2007",
    parent: "Ophiocordyceps",
    description:
      "冬虫夏草菌侵入蝙蝠蛾幼虫体内,幼虫冬季僵死,夏季自头部长出棒状子座,故名冬虫夏草。仅产于青藏高原海拔三至五千米的高寒草甸,是极贵重的传统中药材;资源稀缺致价格高企,过度采挖引发生态担忧。",
    morphology:
      "寄主幼虫长约 3-5 厘米,金黄至深褐色,子座单根棒状,顶端膨大部分布满子囊壳。",
    habitat: "高寒草甸土壤中的蝙蝠蛾幼虫,海拔 3000-5000 米。",
    distribution: "青藏高原及喜马拉雅山区,中国西藏与青海为主产地。",
    tags: ["species", "flagship", "药用"],
  },
  {
    rank: "species",
    latin: "Claviceps purpurea",
    chinese: "麦角菌",
    authority: "(Fr.) Tul., 1853",
    parent: "Claviceps",
    description:
      "寄生黑麦等禾谷类花器的病原真菌,在穗上形成紫黑色角状菌核,混杂于收获物即可致人畜麦角中毒,中世纪曾引发成片坏疽与幻觉流行,被称为圣安东尼之火。麦角生物碱经提纯后成为产科止血等药物的重要来源。",
    morphology:
      "菌核弯曲角状、暗紫色,长 1-5 厘米,萌发产生带柄头状子座,子囊壳埋生于子座表层。",
    habitat: "黑麦、小麦、大麦等禾本科作物的花器与颖果。",
    distribution: "北半球温带麦区广布,冷凉多雨年份易高发。",
    tags: ["species", "致病原", "药用"],
  },
  {
    rank: "species",
    latin: "Agaricus bisporus",
    chinese: "双孢蘑菇",
    authority: "(J.E. Lange) Imbach, 1946",
    parent: "Agaricus",
    description:
      "全球栽培量最大的食用菌,市售白蘑菇与口蘑多属此种,因担子上通常仅生两枚担孢子而得名。原产欧亚与北美草原的腐殖质草地,二十世纪初法国率先实现商品化栽培,如今栽培产业遍布世界。",
    morphology:
      "菌盖半球至平展,直径 5-15 厘米,白色或棕褐,菌褶幼时粉红后转深褐,具膜质菌环。",
    habitat: "腐殖质丰富的草地与堆肥,人工覆土栽培出菇。",
    distribution: "北半球温带草原原产,现已全球化商业栽培。",
    ncbiTaxId: 5341,
    tags: ["species", "经济物种"],
  },
  {
    rank: "species",
    latin: "Amanita muscaria",
    chinese: "毒蝇鹅膏",
    authority: "(L.) Lam., 1783",
    parent: "Amanita",
    description:
      "童话插图里最经典的红色白点蘑菇,菌盖鲜红覆白色疣点,与云杉、桦树等形成外生菌根。含鹅膏蕈氨酸与蝇蕈醇等神经毒素,历史上曾用作杀蝇剂与萨满致幻剂,罕致死亡但可致谵妄与幻觉。",
    morphology:
      "菌盖直径 8-20 厘米,鲜红色覆白色锥形疣点,菌环膜质,基部具杯状菌托。",
    habitat: "桦木、松与云杉等针阔混交林地的外生菌根菌。",
    distribution: "北半球温带广布,并随针叶树造林扩散至南半球。",
    tags: ["species", "flagship", "有毒"],
  },
  {
    rank: "species",
    latin: "Boletus edulis",
    chinese: "美味牛肝菌",
    authority: "Bull., 1782",
    parent: "Boletus",
    description:
      "欧洲美食中的牛肝菌之王,意大利人称之为 porcini,也是中国西南山区的著名山珍。菌盖半球形、黏滑褐色,管孔幼白后黄绿,菌肉肥厚香气浓郁,主要与栎、松等形成菌根,难以人工栽培,依赖野生采集。",
    morphology:
      "菌盖直径 8-25 厘米,褐色平滑黏滑,管孔层易剥离,菌柄粗壮具网纹,菌肉白色致密。",
    habitat: "与栎、松、云杉共生的针阔叶林,夏秋季群生或散生。",
    distribution: "北半球温带广布,中国西南山地夏秋季盛产。",
    tags: ["species", "经济物种"],
  },
  {
    rank: "species",
    latin: "Ganoderma lucidum",
    chinese: "灵芝",
    authority: "(Curtis) P. Karst., 1881",
    parent: "Ganoderma",
    description:
      "传统名贵药用真菌,《神农本草经》列为上品,两千年来被视为吉祥与长寿的象征。担子果肾形、红褐色具漆样光泽,多糖与三萜类为主要活性成分,现代研究集中于免疫调节与辅助抗肿瘤,现已可大面积人工栽培。",
    morphology:
      "菌盖肾形,直径 5-20 厘米,红褐色具漆光与同心环纹,管孔面浅黄色,柄侧生,质地坚硬。",
    habitat: "阔叶树立木基部与伐桩上腐生,喜温暖湿润。",
    distribution: "东亚温带至热带广布,中国各地均普遍栽培。",
    tags: ["species", "flagship", "药用"],
  },
  {
    rank: "species",
    latin: "Lentinula edodes",
    chinese: "香菇",
    authority: "(Berk.) Pegler, 1976",
    parent: "Lentinula",
    description:
      "世界第二大栽培食用菌,原产东亚,传统以段木打孔接种栽培,现多用木屑菌棒。香菇多糖被广泛用作免疫辅助剂,独特香气来自含硫挥发物,晒干过程还能显著提升维生素 D 前体含量。",
    morphology:
      "菌盖褐色被浅色鳞片,直径 5-12 厘米,菌褶白色密,菌柄中生纤维质,子实体单生或群生。",
    habitat: "腐生于壳斗科等阔叶树枯木,喜温湿交替环境。",
    distribution: "原产东亚,现已推广至全球各大洲商业化栽培。",
    ncbiTaxId: 5353,
    tags: ["species", "经济物种"],
  },
  {
    rank: "species",
    latin: "Pleurotus ostreatus",
    chinese: "糙皮侧耳",
    authority: "(Jacq.) P. Kumm., 1871",
    parent: "Pleurotus",
    description:
      "即日常所食的平菇,扇形菌盖侧生成簇叠生,是极易栽培的世界性食用菌,能利用秸秆等农业废料转化蛋白质。有趣的是,它能以毒素麻痹并降解线虫获取氮素,展现了真菌的捕食行为。",
    morphology:
      "菌盖扇形,灰至褐色,直径 5-20 厘米,菌褶白色延生,柄短侧生或近无柄,簇生。",
    habitat: "阔叶树腐朽木上簇生,秋冬低温下仍可出菇。",
    distribution: "北半球温带广布,现已在全球各地普遍栽培。",
    tags: ["species", "经济物种"],
  },
  {
    rank: "species",
    latin: "Puccinia graminis",
    chinese: "禾柄锈菌",
    authority: "Pers., 1794",
    parent: "Puccinia",
    description:
      "小麦秆锈病的病原,夏孢子随高空气流远距离传播,可在数周内摧毁整片麦田,历史上屡酿粮灾。生活史转主寄生:性孢子与锈孢子期在小檗上,夏孢子与冬孢子期在小麦上,共经历五种孢子型,是植物病理学的教科书案例。",
    morphology:
      "夏孢子单胞橙黄表面有刺,冬孢子双细胞深褐色具长柄,孢子堆在茎叶上排列成条状。",
    habitat: "小麦、大麦等禾草的茎叶,以及转主寄主小檗的叶片。",
    distribution: "世界各麦区均有发生,随气流完成周年传播循环。",
    tags: ["species", "致病原"],
  },
  {
    rank: "species",
    latin: "Ustilago maydis",
    chinese: "玉米黑粉菌",
    authority: "(DC.) Corda, 1842",
    parent: "Ustilago",
    description:
      "玉米黑粉病的病原,亦是研究深入的担子菌遗传模式:两个交配型菌株结合后才形成侵染性双核菌丝,诱导玉米长出灰黑色肿瘤状菌瘿,内含大量冬孢子。在墨西哥,幼嫩菌瘿被当作佳蔬食用,有玉米松露之称。",
    morphology:
      "菌瘿直径数厘米至十余厘米,表面银白薄膜破裂后露出黑粉状冬孢子,冬孢子球形具细刺。",
    habitat: "玉米植株地上各部的幼嫩组织,尤以腋芽与果穗等分生区。",
    distribution: "世界各玉米产区普遍发生,温暖多湿年份较重。",
    ncbiTaxId: 5270,
    tags: ["species", "模式生物", "致病原"],
  },
  {
    rank: "species",
    latin: "Cryptococcus neoformans",
    chinese: "新型隐球酵母",
    authority: "(San Felice) Vuill., 1901",
    parent: "Cryptococcus",
    description:
      "带厚荚膜的担子菌酵母,环境中富集于鸽粪与腐木,吸入孢子后多数人无症状,但免疫低下者可发生致命的隐球菌脑膜炎,是艾滋病人群最主要的致死性真菌感染之一。荚膜、黑色素与 37 度生长能力为其三大毒力因子。",
    morphology:
      "酵母细胞直径 4-10 微米,外包厚多糖荚膜,出芽繁殖,芽颈窄,墨汁负染可见透亮荚膜。",
    habitat: "鸽粪富集的土壤、陈腐树木以及鸟类栖息的巢区环境。",
    distribution: "全球性分布,热带与亚热带的血清型尤为多样。",
    ncbiTaxId: 5207,
    tags: ["species", "致病原"],
  },
  {
    rank: "species",
    latin: "Tremella fuciformis",
    chinese: "银耳",
    authority: "Berk., 1856",
    parent: "Tremella",
    description:
      "中国传统名贵胶质食用菌,俗称白木耳,子实体乳白半透明如菊花。富含银耳多糖,常作羹汤滋补品;自然条件下寄生于阔叶朽木上的伴生真菌并依赖其提供营养,栽培时须同养伴生菌,福建古田为著名主产地。",
    morphology:
      "子实体瓣片菊花状,径 5-15 厘米,乳白色半透明胶质,干后角质强烈收缩,担子十字纵隔。",
    habitat: "壳斗等阔叶腐木上,依赖伴生菌提供碳源,喜湿热。",
    distribution: "东亚亚热带至热带为主,中国各地广泛栽培。",
    tags: ["species", "经济物种"],
  },
  {
    rank: "species",
    latin: "Rhizopus stolonifer",
    chinese: "黑根霉",
    authority: "(Ehrenb.) Vuill., 1902",
    parent: "Rhizopus",
    description:
      "面包与果蔬上最常见的黑霉,又称匍枝根霉。匍匐菌丝接触基质即生假根,孢囊梗自假根处直立伸出,顶端黑色孢子囊一次释放数千枚孢囊孢子,是食品霉变与果蔬软腐的常因,偶致免疫力低下者的接合菌病。",
    morphology:
      "菌丝无隔、生长极速,匍匐丝与假根明显,孢囊梗成束直立,孢子囊黑色球形,囊轴半球形。",
    habitat: "面包、草莓等含糖基质与土壤,喜温暖潮湿。",
    distribution: "世界性分布的常见霉腐菌,温暖潮湿环境尤多。",
    tags: ["species", "致病原"],
  },
  {
    rank: "species",
    latin: "Batrachochytrium dendrobatidis",
    chinese: "蛙壶菌",
    authority: "Longcore, Simmons & Meyers, 1999",
    parent: "Batrachochytrium",
    description:
      "全球两栖动物衰退的主要推手之一,寄生于皮肤角质层并经出管释放游动孢子,破坏皮肤电解质平衡,可致壶菌病与心脏衰竭。近百年来随两栖类贸易扩散至各大洲,被认为是史上最具破坏性的野生动物病原体之一。",
    morphology:
      "游动孢子后生单鞭毛,长约 2-5 微米,孢子囊球形附于宿主表皮细胞内,经出管释放孢子。",
    habitat: "两栖动物皮肤与淡水水体,较凉水温更利于其繁殖。",
    distribution: "全球各两栖类分布区均有发现,并随宠物贸易继续扩散。",
    tags: ["species", "flagship", "致病原"],
  },
  {
    rank: "species",
    latin: "Rhizophagus irregularis",
    chinese: "不规则根孢囊霉",
    parent: "Rhizophagus",
    description:
      "丛枝菌根真菌的旗舰模式种,曾名根内球囊霉。菌丝侵入植物根皮层形成丛枝,在菌与植物间交换磷与碳,无法脱离宿主纯培养;基因组测序揭示其依赖宿主供应脂质的代谢特征,广泛用于菌根机理与农业接种剂研究。",
    morphology:
      "菌丝粗而无隔,根内形成二叉分支丛枝与泡囊,土壤中产生百余微米级的圆形厚壁孢子。",
    habitat: "农田、草地与森林土壤,与绝大多数陆地植物根系共生。",
    distribution: "全球性土壤分布,模式菌株分离自加拿大农田土壤。",
    tags: ["species", "模式生物"],
  },
];

