import { TaxonSeed } from "../types";

// 真菌地衣 + 苔藓蕨类深扩充种子数据(Task 6-e expansion4)。
// 主题:真菌界深扩(伞菌目食用/毒菌专题、刺革菌目药用木生真菌、地衣化子囊菌、黏菌)
//      + 苔藓(藓类/苔类)+ 蕨类(含异型孢子水生蕨、古老支系)深扩,共 25 物种 + 40 中间阶元。
// 每个物种均含 5 项科学档案字段(etymology / discovery / genomeInfo / ecologyRole / researchValue)。
// species 的 parent 引用两类来源:
//   1) DB 已有分类单元(/tmp/taxa-inventory.tsv,2018 条,含 626 物种):
//      Amanita(鹅膏菌属)/ Agaricales(伞菌目)/ Agaricaceae(蘑菇科)/ Russulales(红菇目)/
//      Agaricomycetes(伞菌纲)/ Ascomycota(子囊菌门)/ Physaraceae(绒泡菌科)/
//      Bryopsida(真藓纲)/ Marchantiales(地钱目)/ Dryopteridaceae(鳞毛蕨科)/
//      Salviniales(槐叶蘋目)/ Equisetum(木贼属)/ Polypodiopsida(蕨纲)/
//      Polypodiaceae(水龙骨科)/ Pteridaceae(凤尾蕨科);
//   2) 本文件内先行定义的新中间阶元(1 纲 / 6 目 / 12 科 / 21 属)。
// 查重已跳过清单已有物种(据硬性查重规则换替补):
//   - 毒蝇鹅膏 Amanita muscaria、毒鹅膏 A. phalloides、美味牛肝菌 Boletus edulis、
//     鸡油菌 Cantharellus cibarius、长裙竹荪 Phallus indusiatus、松茸 Tricholoma matsutake、
//     云芝 Trametes versicolor、茯苓 Wolfiporia extensa、猪苓 Polyporus umbellatus、猴头菌;
//   - 多头绒泡菌 Physarum polycephalum(黏菌明星已在库,替补煤绒泡菌);
//   - 泥炭藓 Sphagnum palustre、葫芦藓 Funaria hygrometrica、地钱 Marchantia polymorpha、
//     蛇苔 Conocephalum conicum;
//   - 肾蕨 Nephrolepis cordifolia、铁线蕨 Adiantum capillus-veneris、问荆 Equisetum arvense、
//     卷柏 Selaginella tamariscina、苹 Marsilea quadrifolia、蕨 Pteridium aquilinum。
// 命名者与 NCBI TaxID 逐条经 NCBI eutils + GBIF Backbone 双重核验;
// 松萝 Usnea diffracta(GBIF 已移长松萝属 Dolichousnea)与大灰藓 Hypnum plumaeforme
// (NCBI 移 Calohypnum plumiforme)存在新组合分歧,按宁缺毋滥原则不录 TaxID,分歧记入 discovery。
export const expansion4Cryptogams: TaxonSeed[] = [
  // ===================== 一、鹅膏菌科 Amanitaceae 毒菌深扩(3 种,parent 挂已有 Amanita) =====================
  {
    rank: "species",
    latin: "Amanita fuliginea",
    chinese: "灰花纹鹅膏",
    authority: "Hongo, 1953",
    parent: "Amanita",
    ncbiTaxId: 67708,
    description:
      "华中至华南山地常见的剧毒鹅膏,菌盖烟灰褐色具深色辐射状花纹,基部球状并包裹白色菌托。含鹅膏毒肽,误食后经一至两天假愈期突然暴发肝衰竭,致死率极高,是中国南方蘑菇中毒致死事件的头号元凶之一。",
    morphology: "菌盖宽 3-9 厘米,烟灰褐至暗褐色,表面有纤丝状辐射纹;菌肉白色,菌褶离生白色,菌柄细长,基部球茎状膨大。",
    habitat: "夏秋季单生或散生于针阔混交林地上,与松、栲、栎等树木形成外生菌根。",
    distribution: "中国长江以南山地丘陵,日本亦有分布,湖南、贵州、云南等地中毒事件频发。",
    etymology: "种加词 fuliginea 源于拉丁语 fuligo(烟灰),形容菌盖烟灰褐色;中名依菌盖灰黑色花纹直译。",
    discovery: "1953 年日本菌物学家本乡次雄依日本标本定名;其后中国南方多起致死中毒事件的流行病学调查证实其为东亚最危险毒菌之一。",
    genomeInfo: "鹅膏毒肽由核糖体基因编码的前体肽经翻译后剪切成环,近缘致命鹅膏的基因组已解析毒素合成基因簇,本种研究以毒检与代谢组为主。",
    ecologyRole: "外生菌根菌,与松、栲等共生参与森林碳氮循环;子实体脆嫩无警示色,极易被误采误食。",
    researchValue: "鹅膏毒肽抑制真核生物 RNA 聚合酶 II 的特性使其成为细胞生物学经典工具分子,中毒快速检测与解毒靶点研究持续以本类群为核心。",
    tags: ["有毒"],
  },
  {
    rank: "species",
    latin: "Amanita pantherina",
    chinese: "豹斑鹅膏",
    authority: "(DC.) Krombh.",
    parent: "Amanita",
    ncbiTaxId: 67721,
    description:
      "北温带常见毒鹅膏,菌盖黄褐色散布白色锥形疣点,形如豹纹而得名。含鹅膏氨酸与蝇蕈醇,误食后出现谵妄、幻觉、胃肠症状,重症可致昏迷。常被误认为可食褐色鹅膏,是神经精神型中毒的代表菌。",
    morphology: "菌盖宽 5-12 厘米,黄褐至棕褐色,被白色易脱落的锥形疣点;菌环膜质下垂,菌托环领状,孢子白色。",
    habitat: "夏秋季散生或群生于针叶林和阔叶林地上,与松、栎、桦等多种树木形成外生菌根。",
    distribution: "广泛分布于北半球温带,中国东北、华北及西南山地常见。",
    etymology: "种加词 pantherina 意为豹的,指菌盖白点如豹纹;中名豹斑鹅膏直译其意。",
    discovery: "德堪多依欧洲标本定名,克罗姆布霍尔茨将其组合入鹅膏菌属;欧洲经典毒菌志早有精美图版,长期作为幻觉型毒菌教学代表。",
    genomeInfo: "本种未见公开参考基因组;毒理学研究集中于鹅膏氨酸与蝇蕈醇对中枢谷氨酸受体和 GABA 受体的双向作用。",
    ecologyRole: "外生菌根菌,与松、栎、桦共生;白色疣点系外菌幕残余,易被雨水冲脱,常致野外识别困难。",
    researchValue: "蝇蕈醇是 GABA 受体激动剂的经典配体来源之一,其致谵妄机制为神经药理学与毒物鉴定教学常用案例。",
    tags: ["有毒"],
  },
  {
    rank: "species",
    latin: "Amanita virosa",
    chinese: "白毒鹅膏",
    authority: "Bertill., 1866",
    parent: "Amanita",
    ncbiTaxId: 78357,
    description:
      "欧洲经典的致命鹅膏,英文俗称「毁灭天使」。通体纯白,具膜质菌环与袋状菌托。含鹅膏毒肽,一朵即可致成人肝肾功能衰竭,与多种可食白色蘑菇形态近似而极易误采,中毒死亡率居各菌之首。",
    morphology: "菌盖宽 4-10 厘米,纯白色,幼时圆锥形后平展,表面光滑黏润;菌褶白色离生,菌柄细长,菌托袋状,孢子近球形。",
    habitat: "夏秋季单生或散生于阔叶林和针阔混交林地上,与栎、桦、松等树形成外生菌根。",
    distribution: "欧洲温带及东亚山区,北美的相近白色剧毒种群曾长期混用本名后分立。",
    etymology: "种加词 virosa 意为有毒的,源于拉丁语 virus(毒);中名依通体白色与剧毒命名。",
    discovery: "贝尔蒂永 1866 年定名;百余年因其纯净外形与致命毒性的反差被称为「毁灭天使」,成为全球毒菌教育的符号。",
    genomeInfo: "近缘毒鹅膏基因组已测序,研究揭示鹅膏毒肽合成基因簇在多条毒素鹅膏支系中独立起源演化。",
    ecologyRole: "外生菌根菌,在温带森林地下菌根网络中与多种树木交换碳氮;子实体夏秋大量发生,速生速腐。",
    researchValue: "与库内毒鹅膏同为鹅膏毒肽研究的模式类群,推动了 RNA 聚合酶 II 抑制机理、肝损伤救治与毒素免疫快检技术发展。",
    tags: ["有毒"],
  },

  // ===================== 二、伞菌目食用菌深扩(4 种) =====================
  {
    rank: "family",
    latin: "Pluteaceae",
    chinese: "光柄菇科",
    parent: "Agaricales",
    description:
      "菌褶离生、菌柄易自菌盖分离的伞菌科,孢子印粉红色,多腐生于朽木与腐草,含光柄菇属、草菇属等,后者为热带亚热带最重要的栽培食用菌来源之一。",
  },
  {
    rank: "genus",
    latin: "Volvariella",
    chinese: "草菇属",
    parent: "Pluteaceae",
    description:
      "腐草生伞菌属,子实体幼时整体被杯状菌托包裹,菌褶由白转粉红,孢子光滑粉褐色,约五十种,主产热带,代表种草菇为世界性栽培菇种。",
  },
  {
    rank: "species",
    latin: "Volvariella volvacea",
    chinese: "草菇",
    authority: "(Bull.) Singer",
    parent: "Volvariella",
    ncbiTaxId: 36659,
    description:
      "重要的热带亚热带栽培食用菌,幼嫩蛋形期整体被厚菌托包裹,俗称「菇蛋」,开伞后菌褶粉红色。以稻草、废棉为基质堆制发酵栽培,出菇只需十余天。中国华南栽培历史逾三百年,被誉为「中国蘑菇」。",
    morphology: "菌盖宽 5-16 厘米,灰黑至灰褐色,光滑;菌肉白色,菌褶初白后转粉红,菌柄白色,基部被厚杯状菌托。",
    habitat: "野生于热带草地腐草堆与堆肥上;人工栽培以稻草堆置发酵,高温高湿环境下快速出菇。",
    distribution: "原产热带亚洲,中国华南为主产区,栽培技术随移民传播至东南亚、非洲与美洲。",
    etymology: "属名源于拉丁语 volva(菌托),指显著的杯状菌托;种加词 volvacea 意为具菌托的;中名依腐草基物得名。",
    discovery: "布利亚尔最早描述,辛格完成现代组合;清代华南僧俗以稻草堆叠栽培,20 世纪经张树庭等推动走向世界。",
    genomeInfo: "全基因组测序已经完成,富含降解纤维素的糖苷水解酶基因家族,与其腐草营养方式高度匹配。",
    ecologyRole: "草腐菌,快速分解热带草地凋落的禾草残体;子实体发育迅速,数日成熟并自溶散播孢子。",
    researchValue: "食用菌栽培学与高温真菌生理研究的代表种,开伞自溶与采后保鲜机理研究活跃,是南方稻草资源化利用的抓手。",
    tags: ["食用菌", "驯化物种"],
  },
  {
    rank: "genus",
    latin: "Coprinus",
    chinese: "鬼伞属",
    parent: "Agaricaceae",
    description:
      "狭义鬼伞属现仅含毛头鬼伞等少数种,因分子系统学将多数旧种移入拟鬼伞属等;菌盖圆锥形覆鳞片,菌褶自下而上液化成墨汁,蛋期可食并已栽培。",
  },
  {
    rank: "species",
    latin: "Coprinus comatus",
    chinese: "毛头鬼伞",
    authority: "(O.F.Müll.) Pers.",
    parent: "Coprinus",
    ncbiTaxId: 56187,
    description:
      "俗称鸡腿菇的著名食用菌,菌盖圆柱形覆反卷毛状鳞片,形似毛笔头。子实体成熟后菌褶自下而上溶为黑色墨汁滴落,须趁蛋期采食。野生与栽培均常见,是展示菌物自溶现象与孢子弹射的活教材。",
    morphology: "菌盖高 5-15 厘米,圆柱形,表面被褐色反卷毛状鳞片;菌褶稠密由白转黑并液化,菌柄中空较长。",
    habitat: "春秋季单生或群生于草地、林缘、路旁及堆肥场,喜富含有机质的土壤。",
    distribution: "全球广布,中国南北各地常见,已有规模化人工栽培并出口。",
    etymology: "属名源于希腊语 kopros(粪),指早期认知中该类多生于粪肥基质;种加词 comatus 意为长发的,指毛状鳞片。",
    discovery: "穆勒最早描述,珀松完成现代组合;20 世纪九十年代中国实现商业化栽培,成为珍稀菇生产的重要种。",
    genomeInfo: "担子菌典型的同核体-异核体交配体系;自溶过程由几丁质酶与蛋白酶协同驱动,相关基因表达研究活跃。",
    ecologyRole: "草腐生菌,快速分解草地凋落物与畜粪并释放养分;子实体数小时内完成孢子释放与自溶。",
    researchValue: "菌褶胶质化自溶是细胞程序性死亡研究的经典模型;栽培周期仅十余天,蛋白质含量高,经济价值显著。",
    tags: ["食用菌", "驯化物种"],
  },
  {
    rank: "family",
    latin: "Physalacriaceae",
    chinese: "膨瑚菌科",
    parent: "Agaricales",
    description:
      "伞菌目中形态多样的科,含具发光菌索的蜜环菌属、低温出菇的小火菇属及膨瑚菌属等,多种为重要食用菌或林木病原菌,系统位置经分子研究自口蘑类复合群中理清。",
  },
  {
    rank: "genus",
    latin: "Armillaria",
    chinese: "蜜环菌属",
    parent: "Physalacriaceae",
    description:
      "菌索发达的伞菌属,黑色根状菌索可在土壤与朽木中延伸数米,菌丝在暗处发蓝绿荧光;既是著名的丛生食用菌,又是全球林木根朽病的病原复合群。",
  },
  {
    rank: "species",
    latin: "Armillaria mellea",
    chinese: "蜜环菌",
    authority: "(Vahl) P.Kumm.",
    parent: "Armillaria",
    ncbiTaxId: 47429,
    description:
      "林间常见的兼性病原担子菌,蜜黄色子实体成丛着生于树桩基部,菌丝体在暗处发蓝绿色荧光,黑色菌索在地下网状延伸。与名贵药材天麻构成特殊营养关系——天麻靠消化侵入的蜜环菌菌索获得养分,是中药材栽培的关键菌。",
    morphology: "菌盖宽 3-10 厘米,蜜黄色至棕褐色,被细纤毛或鳞片;菌褶直生至延生,白色转锈斑;菌柄上部具下垂膜质菌环。",
    habitat: "夏秋季丛生于老树桩、树干基部及埋藏朽木上,地下菌索在林地表层扩展。",
    distribution: "北半球温带广布,中国各林区常见,亦是天麻产区必配的伴生菌。",
    etymology: "属名源于拉丁语 armilla(手镯),指菌柄上显著的环状菌环;种加词 mellea 意为蜜色的,指菌盖色调。",
    discovery: "韦尔依欧洲标本定名,库默尔完成组合;20 世纪中国学者阐明天麻与蜜环菌的寄生消化关系,奠定天麻人工栽培基础。",
    genomeInfo: "同属多个物种的基因组已发表,基因组学证据表明蜜环菌复合群含多个隐存种,种界划定持续修订。",
    ecologyRole: "兼性腐生与病原菌,分解枯木亦侵染活树根系引发根朽;菌索作为长寿传播结构长期蛰伏土壤。",
    researchValue: "天麻栽培必须预先培养蜜环菌材,构成药材生产核心环节;菌丝生物发光与菌索形态建成具独特研究价值。",
    tags: ["食用菌", "药用"],
  },
  {
    rank: "genus",
    latin: "Flammulina",
    chinese: "小火菇属",
    parent: "Physalacriaceae",
    description:
      "低温季节生于阔叶枯木的小型伞菌属,菌盖黏滑、菌柄下部密被绒毛,含数种近缘种,代表种金针菇经驯化后成为全球工厂化产量前列的食用菌。",
  },
  {
    rank: "species",
    latin: "Flammulina velutipes",
    chinese: "金针菇",
    authority: "(Curtis) Singer",
    parent: "Flammulina",
    ncbiTaxId: 38945,
    description:
      "世界主要工厂化栽培食用菌,商品形态乳白细柄小盖,与野生黄褐短柄形态迥异。自然生于秋冬低温期的杨、柳等阔叶枯枝上,耐寒性强。担子菌低温结实与子实体发育调控研究的经典材料。",
    morphology: "野生菌盖直径 2-8 厘米,黄褐至深褐色,黏滑;菌柄上部浅色下部深褐被绒毛;栽培品系通体乳白,柄长盖小。",
    habitat: "晚秋至早春簇生于阔叶树枯枝、树桩上,雪季亦见,喜低温高湿。",
    distribution: "北半球温带广布,中国、日本、韩国为全球金针菇工厂化主产区。",
    etymology: "属名 Flammulina 是拉丁语 flamma(火焰)的指小词,指野生菌盖火褐色;种加词 velutipes 意为天鹅绒状菌柄。",
    discovery: "寇蒂斯最早描述,辛格完成现代组合;日本育出白色品系实现全年瓶栽,东亚栽培种群近年被部分学者分立为新种。",
    genomeInfo: "双核体基因组已发表,交配型基因与低温诱导出菇的转录组研究深入,支撑全基因组选择育种。",
    ecologyRole: "白腐型担子菌,在低温季分解阔叶枯木,其漆酶与过氧化物酶系统于冬季凋落物分解中保持活跃。",
    researchValue: "全球产量居前列的食用菌;白色突变品系遗传与光温信号调控是菌物发育遗传学的教科书案例。",
    tags: ["食用菌", "驯化物种"],
  },

  // ===================== 三、红菇目 Russulales 深扩(1 种) =====================
  {
    rank: "family",
    latin: "Russulaceae",
    chinese: "红菇科",
    parent: "Russulales",
    description:
      "菌肉脆、具乳汁或汁液的伞菌科,孢子球形至宽椭圆形、表面具淀粉质刺状纹饰,全部为外生菌根菌,含乳菇属与红菇属,是温带森林菌根网络的主力类群。",
  },
  {
    rank: "genus",
    latin: "Lactarius",
    chinese: "乳菇属",
    parent: "Russulaceae",
    description:
      "受伤流出乳汁的伞菌属,乳汁白色或橙红色,遇空气变色,孢子具网刺纹饰,均为树木外生菌根菌,不少种为著名野生食用菌,全球逾百种。",
  },
  {
    rank: "species",
    latin: "Lactarius deliciosus",
    chinese: "松乳菇",
    authority: "(L.) Gray, 1821",
    parent: "Lactarius",
    ncbiTaxId: 55514,
    description:
      "与松树共生的著名野生食用菌,伤处流出橙红色乳汁,菌肉渐染蓝绿色。菌盖漏斗形,橙红色具同心环纹。地中海至东亚松林均形成采食传统,因尚难人工栽培而被视为菌根食用菌产业化的代表对象。",
    morphology: "菌盖宽 4-10 厘米,浅漏斗状,橙红至砖红色,具明显同心环纹;乳汁橙红,氧化后变绿;孢子印淡黄。",
    habitat: "夏秋季散生于松林及针阔混交林地上,与松属树木形成外生菌根。",
    distribution: "欧洲地中海地区至东亚,中国南方马尾松林及西南松林地带常见。",
    etymology: "属名 Lactarius 意为产乳的,指受伤流汁特性;种加词 deliciosus 意为美味的,直陈其食用价值。",
    discovery: "林奈 1753 年作为伞菌描述,格雷 1821 年移入乳菇属;长期是欧洲集市与中国南方松林的标志性采食物种。",
    genomeInfo: "乳菇属研究聚焦乳汁倍半萜代谢与菌根互作基因家族,外生菌根真菌基因组中扩张的转运基因家族受到关注。",
    ecologyRole: "松林外生菌根菌,为宿主换取磷氮;乳汁含倍半萜类物质,对真菌与线虫具抑制活性,被视为化学防御。",
    researchValue: "菌根食用菌人工促繁与合成菌群构建研究的代表种;乳汁活性成分具抗菌与杀线虫开发潜力。",
    tags: ["食用菌"],
  },

  // ===================== 四、刺革菌目 Hymenochaetales 药用木生真菌(2 种) =====================
  {
    rank: "order",
    latin: "Hymenochaetales",
    chinese: "刺革菌目",
    parent: "Agaricomycetes",
    description:
      "多孔菌类群中独立成目的一支,子实体一年生至多年生、蹄形或平展,造成木材白色腐朽,缺囊状体,含刺革菌科与平革菌科等,多种为药用真菌或林木病原菌。",
  },
  {
    rank: "family",
    latin: "Hymenochaetaceae",
    chinese: "刺革菌科",
    parent: "Hymenochaetales",
    description:
      "木生多孔菌的核心科,子实体蹄形、平展或平伏反卷,菌肉锈褐至黄褐,引致木材白腐,桑黄孔菌属与纤孔菌属的多糖、三萜药用价值研究极为活跃。",
  },
  {
    rank: "genus",
    latin: "Sanghuangporus",
    chinese: "桑黄孔菌属",
    parent: "Hymenochaetaceae",
    description:
      "寄生于阔叶树的多年生蹄形孔菌属,菌肉金黄色,以专性寄生于桑树的桑黄为代表,自纤孔菌属复合群分立,种级划分依托分子证据系统厘清。",
  },
  {
    rank: "species",
    latin: "Sanghuangporus sanghuang",
    chinese: "桑黄",
    authority: "(Sheng H. Wu, T. Hatt. & Y.C. Dai) Sheng H. Wu, L.W. Zhou & Y.C. Dai",
    parent: "Sanghuangporus",
    ncbiTaxId: 1659845,
    description:
      "专性寄生于桑树的珍稀药用木生真菌,子实体马蹄形硬木质,断面金黄色。历代本草以「桑黄」入药,有活血止血之载。现代研究聚焦多糖与三萜类成分的抗肿瘤与免疫调节活性,野生资源稀缺,人工栽培近年起步。",
    morphology: "子实体多年生,马蹄形至半球形,硬木质;上表面深褐色具同心环沟,边缘钝圆;菌肉金黄至褐色,孔口细密圆形。",
    habitat: "生于衰老桑树主干,形成多年生担子果,亦偶见于其他阔叶树。",
    distribution: "中国华东、华中桑蚕区及日本、韩国,模式标本采自东亚桑树。",
    etymology: "属名 Sanghuangporus 意为桑黄的孔菌;种加词沿用中文药名桑黄,凸显其唯一寄主与药材身份。",
    discovery: "2012 年吴声华、戴玉成等依采自桑树的标本确认为独立新种,终结「桑黄」一名多来源混用;其后新建桑黄孔菌属并为组合模式种。",
    genomeInfo: "基因组测序已经开展,多糖合成与三萜代谢相关基因家族分析支撑活性成分规模化开发。",
    ecologyRole: "桑树专性寄生与腐生菌,侵染衰老植株导致心材白腐,自然条件下子实体稀有而缓慢生长。",
    researchValue: "桑黄多糖、三萜与酚类成分的抗肿瘤和免疫调节评价大量发表,是药用真菌产业化热点,液体发酵与段木栽培并行。",
    tags: ["药用"],
  },
  {
    rank: "genus",
    latin: "Inonotus",
    chinese: "纤孔菌属",
    parent: "Hymenochaetaceae",
    description:
      "木生真菌属,子实体一年生、纤毛质至海绵质,菌肉锈褐色,孢子黄色平滑,造成木材白腐,含桦褐孔菌等著名药用真菌及林木腐朽菌。",
  },
  {
    rank: "species",
    latin: "Inonotus obliquus",
    chinese: "桦褐孔菌",
    authority: "(Fr.) Pilát",
    parent: "Inonotus",
    ncbiTaxId: 167356,
    description:
      "寄生于桦树的药用真菌,菌核黑褐色瘤块状如烧焦炭团,内部黄褐色。俄罗斯与西伯利亚民间数百年以煎剂代茶保健,商品名「白桦茸」。含三萜、多糖与黑色素类成分,抗炎抗氧化研究活跃,资源依赖野生采集。",
    morphology: "菌核不规则瘤块状,表面黑色深裂如炭,坚硬角质;内部黄褐色具同心轮层;真正子实层体罕见,生于寄主树皮下。",
    habitat: "寄生于桦属活树主干,形成多年生黑色菌核,寒温带针阔混交林中多见。",
    distribution: "北纬四十五度以北寒温带,俄罗斯西伯利亚、北欧至中国东北大小兴安岭。",
    etymology: "属名由希腊语 inos(纤维)与 notus(背)构成,指子实层体纤维质;种加词 obliquus 意为斜的,指孔口倾斜排列。",
    discovery: "弗里斯描述,皮拉特移入纤孔菌属;十六世纪起俄罗斯民间以其煎剂保健,近年全球保健品市场热度居高不下。",
    genomeInfo: "基因组与发酵转录组研究聚焦桦木醇衍生三萜的合成途径;菌核黑色素为其标志性特征成分之一。",
    ecologyRole: "桦树心材腐朽菌,多年生菌核缓慢瓦解寄主木质部,参与寒温带森林长期碳循环。",
    researchValue: "民间保健品「白桦茸」的基原真菌,吸收桦木醇转化而成的桦木酸衍生物抗肿瘤筛选与降糖研究广泛开展。",
    tags: ["药用"],
  },

  // ===================== 五、地衣化子囊菌:茶渍菌纲新链(3 种,挂 Ascomycota) =====================
  {
    rank: "class",
    latin: "Lecanoromycetes",
    chinese: "茶渍菌纲",
    parent: "Ascomycota",
    description:
      "子囊菌门最大的纲,逾两万种,绝大多数为地衣型真菌,与绿藻或蓝细菌形成稳定的共生体,子囊果常为裸露的盘状子囊盘,是地衣生物多样性的主体。",
  },
  {
    rank: "order",
    latin: "Lecanorales",
    chinese: "茶渍目",
    parent: "Lecanoromycetes",
    description:
      "地衣型子囊菌中最大的目之一,子囊盘裸露无果托,含石蕊科、梅衣科等大科,地衣体枝状、叶状或壳状,广布全球岩面、树皮与土壤。",
  },
  {
    rank: "family",
    latin: "Cladoniaceae",
    chinese: "石蕊科",
    parent: "Lecanorales",
    description:
      "地衣体明显分化的科:贴地鳞片状初级体与直立的次级枝状或杯状体,子囊盘顶生或侧生,广布寒温带与苔原,是驯鹿冬季的主要牧草类群。",
  },
  {
    rank: "genus",
    latin: "Cladonia",
    chinese: "石蕊属",
    parent: "Cladoniaceae",
    description:
      "具鳞片状原叶体与杯状、枝状次生体的地衣属,逾百种广布全球,自林区腐木到极地苔原皆有,杯粉芽与地衣酸类次生产物是分类的重要性状。",
  },
  {
    rank: "species",
    latin: "Cladonia rangiferina",
    chinese: "石蕊",
    authority: "(L.) Weber",
    parent: "Cladonia",
    ncbiTaxId: 111670,
    description:
      "极地与寒温带地面的灰白色枝状地衣,灌丛状成片生长,是驯鹿冬季刨雪觅食的主要食物,得名驯鹿地衣。生长极缓,每年仅伸长数毫米。地衣酸类成分是传统石蕊指示剂原料地衣类群之一,亦是大气污染与苔原放牧的指示生物。",
    morphology: "地衣体直立枝状,多回二叉分枝成垫状灰白灌丛,高 5-12 厘米,无杯状结构,子囊盘罕见顶生。",
    habitat: "寒温带针叶林与苔原地面成片生长,常与多种石蕊属地衣共建地衣垫层。",
    distribution: "环北极及高山苔原地带,欧亚大陆北部与北美,是北方牧场植被的建群成分。",
    etymology: "属名 Cladonia 源于希腊语 kladon(枝),指枝状次生地衣体;种加词 rangiferina 意为驯鹿的。",
    discovery: "林奈 1753 年在《植物种志》中描述,韦伯组合为现名;其驯鹿越冬牧草地位使早期极地探险与民族志文献屡有记载。",
    genomeInfo: "地衣体含真菌与共生藻两套遗传系统,本类群基因组研究聚焦菌藻互作与共生重新合成的分子对话。",
    ecologyRole: "苔原地被建群种,冬季被驯鹿刨雪啃食;年生长量极低,过度放牧或踩踏后恢复常需数十年。",
    researchValue: "生长缓慢而累积地衣酸的特性被用于测年与污染历史重建;对二氧化硫高度敏感,长期充当大气监测与气候变化的生物指示。",
    tags: ["环境指示种"],
  },
  {
    rank: "family",
    latin: "Parmeliaceae",
    chinese: "梅衣科",
    parent: "Lecanorales",
    description:
      "地衣体叶状、枝状或丝状的大科,下表面常具假根,含梅衣属、松萝属等千余种,遍布全球树皮与岩面,多种富含地衣酸类活性成分。",
  },
  {
    rank: "genus",
    latin: "Usnea",
    chinese: "松萝属",
    parent: "Parmeliaceae",
    description:
      "枝状悬垂地衣属,体内具软骨质中轴,表面环状开裂,体含松萝酸,对大气污染极敏感,主产湿润山林与高山针叶林区,数百种广布全球。",
  },
  {
    rank: "species",
    latin: "Usnea diffracta",
    chinese: "松萝",
    authority: "Vain., 1921",
    parent: "Usnea",
    description:
      "悬垂于针叶树枝的须状地衣,细长枝条反复二叉分枝垂坠如丝帘,可长达三十厘米。体含松萝酸等抗菌活性成分,是传统药材松萝的原植物之一。对空气质量极为敏感,堪称森林大气的天然指示计。",
    morphology: "地衣体细线形,主枝等二叉分枝成垂坠须丛,表面灰绿色,具环状裂纹与外露白色髓层。",
    habitat: "悬垂于冷杉、云杉等针叶树及高海拔灌丛枝干上,要求空气湿润洁净。",
    distribution: "中国东北、西南山地针叶林区及日本等东亚温带山地。",
    etymology: "属名 Usnea 源于阿拉伯语 ushnah(苔藓状植物);种加词 diffracta 意为断裂的,指枝条环裂形态。",
    discovery: "瓦伊尼奥 1921 年依东亚标本定名;现代分子研究将本种移入长松萝属 Dolichousnea,药典与中文文献仍沿用松萝之名。",
    genomeInfo: "地衣共生体由真菌与绿藻两套基因组构成,松萝酸的聚酮合成途径研究正在近缘种中推进。",
    ecologyRole: "附生地衣,以雨水与大气沉降为养分来源;须状体表面积大,对二氧化硫等污染物尤为敏感。",
    researchValue: "松萝酸具广谱抗菌活性,是天然抗菌剂开发热点;本属地衣长期作为大气污染生物学监测的标准材料。",
    tags: ["药用", "环境指示种"],
  },
  {
    rank: "genus",
    latin: "Parmelia",
    chinese: "梅衣属",
    parent: "Parmeliaceae",
    description:
      "叶状地衣的模式属,地衣体近圆形,裂片宽大放射伸展,上表面灰绿色具网状皱点,下表面黑色具假根,广布北半球岩面树皮,曾作天然染料。",
  },
  {
    rank: "species",
    latin: "Parmelia saxatilis",
    chinese: "梅衣",
    authority: "(L.) Ach.",
    parent: "Parmelia",
    ncbiTaxId: 87261,
    description:
      "温带岩面与树皮常见的叶状地衣,圆形裂片如梅瓣贴生伸展,与共球藻构成稳定共生体,是地衣互惠共生的教科书模型。对大气污染敏感而用于环境监测,历史上亦曾作褐绿色天然染料与指示剂原料。",
    morphology: "地衣体近圆形,直径 5-15 厘米;裂片放射状宽圆;上表面灰绿色具白点网纹,下表面黑色,假根黑色密生。",
    habitat: "着生于岩面、树皮及苔藓层上,喜光照充足、干湿交替的中生生境。",
    distribution: "全球温带广布,欧洲、北美及东亚山地的岩石与树干常见。",
    etymology: "属名 Parmelia 一说源自拉丁语 parma(圆盾),指盾状贴生的叶状体;种加词 saxatilis 意为生于岩石的。",
    discovery: "林奈描述,阿卡里乌斯组合为现名;广布性与形态多态使其成为地衣形态学与化学分类的经典研究种。",
    genomeInfo: "地衣体中真菌为光合共球藻提供庇护与矿质水分,基因组学聚焦菌藻识别与共生稳态的分子机制。",
    ecologyRole: "岩面先锋生物,分泌地衣酸风化基岩参与成土过程;为微小无脊椎动物提供食物与隐蔽生境。",
    researchValue: "菌藻共生体系结构简明而关系稳固,是研究生物互惠共生起源与大气监测网络建设的经典对象。",
    tags: ["环境指示种"],
  },

  // ===================== 六、黏菌纲深扩(1 种,parent 挂已有 Physaraceae) =====================
  {
    rank: "genus",
    latin: "Fuligo",
    chinese: "煤绒泡菌属",
    parent: "Physaraceae",
    description:
      "绒泡菌科黏菌属,原质团大而色鲜,成熟后形成垫状大型复囊体,孢丝具石灰质结节,广布于腐木、堆肥与潮湿林地,模式种煤绒泡菌全球常见。",
  },
  {
    rank: "species",
    latin: "Fuligo septica",
    chinese: "煤绒泡菌",
    authority: "(L.) F.H.Wigg., 1780",
    parent: "Fuligo",
    ncbiTaxId: 159720,
    description:
      "体型最显眼的黏菌之一,黄色原生质团在腐木表面缓慢游走,吞噬细菌与真菌,成熟后聚成枕头状蜡黄色复囊体,英文俗称「狗呕吐菌」。无细胞壁的原生质流肉眼可辨,是观察细胞质流动的经典活体材料。",
    morphology: "复囊体垫状至枕状,直径数厘米至十余厘米,表面蜡黄易碎,内部含粉状暗褐色孢子;原质团鲜黄色。",
    habitat: "腐木、树皮、堆肥及潮湿林地表面,取食细菌、真菌与有机碎屑。",
    distribution: "全球广布,中国各地雨季腐木与堆肥上常见。",
    etymology: "属名 Fuligo 拉丁语意为烟灰;种加词 septica 源于希腊语 sepein(腐烂),指其生于腐物。",
    discovery: "林奈最早记载,维格斯 1780 年归入黏菌;其鲜艳突发的复囊体屡被公众误认成霉菌甚至外星生物。",
    genomeInfo: "原质团为多核共质体,核分裂同步进行、无细胞壁阻隔,是研究细胞周期同步与原生质流动物理的独特体系。",
    ecologyRole: "腐木表面的吞噬营养者,捕食细菌与真菌,参与凋落物微生物群落的能量再分配。",
    researchValue: "细胞质流动与黏菌生活史观察的入门实验材料,与库内多头绒泡菌同为原生质流与表型可塑性研究经典。",
  },

  // ===================== 七、藓类植物门 Bryophyta 深扩(2 种,挂已有 Bryopsida) =====================
  {
    rank: "order",
    latin: "Hypnales",
    chinese: "灰藓目",
    parent: "Bryopsida",
    description:
      "真藓纲中种类最多的目,茎多匍匐或倾立、常呈羽状分枝,孢蒴侧生下垂,是林地地毯状藓层与树干附生藓群的主体,全球四百余属。",
  },
  {
    rank: "family",
    latin: "Hypnaceae",
    chinese: "灰藓科",
    parent: "Hypnales",
    description:
      "匍匐或倾立生长的侧蒴藓科,叶片常镰刀状弯向一侧、多无中肋或具短双中肋,枝条常扁平羽状,全球广布,大灰藓为东亚常见代表种。",
  },
  {
    rank: "genus",
    latin: "Hypnum",
    chinese: "灰藓属",
    parent: "Hypnaceae",
    description:
      "茎匍匐、规则羽状分枝的经典藓属,叶片镰状偏斜,孢蒴圆柱形侧垂;属名意为催眠之草,古时西方牧人以之铺卧具而得此名。",
  },
  {
    rank: "species",
    latin: "Hypnum plumaeforme",
    chinese: "大灰藓",
    authority: "Wilson, 1848",
    parent: "Hypnum",
    description:
      "东亚林地最常见的匍匐藓之一,茎羽状平铺,大片交织覆盖林下地表与岩面。因富集大气沉降重金属而被广泛用作污染监测的生物材料,亦作盆景铺面藓。中国苔藓区系调查与生物监测研究的代表种。",
    morphology: "植物体黄绿至棕黄色,茎匍匐规则羽状分枝;枝扁平,叶片镰刀状弯向一侧,无中肋,叶细胞狭长。",
    habitat: "林下地表、岩面、树基及腐木上成片生长,喜中湿生境,亦见于城市阴湿绿地。",
    distribution: "中国长江流域以南山地为主,日本、朝鲜半岛及东亚亚热带林区广布。",
    etymology: "属名源于希腊语 hypnon(睡眠),古人相信以该类藓铺卧可安眠;种加词 plumaeforme 意为羽毛状的,形容羽状枝形。",
    discovery: "威尔逊 1848 年依东亚标本定名;分子系统研究有学者将其移入 Calohypnum 属,中文文献仍多沿用灰藓属。",
    genomeInfo: "本种尚未见参考基因组;作为重金属生物监测材料,其响应研究多采用生理与转录组手段。",
    ecologyRole: "构成林地地毯状覆盖层,截留降水、缓冲径流并保存种子,为土壤动物提供微生境;叶片富集沉降重金属。",
    researchValue: "藓袋法与移植监测中的常用指示藓种,广泛用于城市、矿区与道路沿线的大气重金属污染评价。",
    tags: ["环境指示种"],
  },
  {
    rank: "order",
    latin: "Bryales",
    chinese: "真藓目",
    parent: "Bryopsida",
    description:
      "真藓纲核心目,植物体多直立疏丛生,叶片卵形、中肋粗壮,孢蒴顶生常下垂倾垂,含真藓科与提灯藓科等大科,全球广布。",
  },
  {
    rank: "family",
    latin: "Mniaceae",
    chinese: "提灯藓科",
    parent: "Bryales",
    description:
      "植物体较大而柔软的顶蒴藓科,叶大质脆、中肋粗壮、叶缘常具齿,科名源于下垂如提灯的蒴柄形态,含匍灯藓属等,是五倍子蚜的越冬寄主藓类。",
  },
  {
    rank: "genus",
    latin: "Plagiomnium",
    chinese: "匍灯藓属",
    parent: "Mniaceae",
    description:
      "具匍匐不育枝的提灯藓类,生殖枝直立、顶部叶聚成莲座状,叶片卵状舌形、中肋粗、叶缘双列齿,北温带林下常见,部分种为倍蚜冬寄主。",
  },
  {
    rank: "species",
    latin: "Plagiomnium cuspidatum",
    chinese: "匍灯藓",
    authority: "(Hedw.) T.J.Kop.",
    parent: "Plagiomnium",
    ncbiTaxId: 65535,
    description:
      "提灯藓科代表藓,不育枝匍匐蔓生,生殖枝直立,顶部叶簇生如莲座。是重要工业原料五倍子蚜虫的越冬寄主藓之一——倍蚜在藓上越冬后迁回盐肤木结瘿。叶缘双齿与粗中肋为其野外识别要点。",
    morphology: "植物体疏丛生,不育枝匍匐,生殖枝直立;叶片卵状舌形,中肋粗壮达尖,叶缘具双列锐齿。",
    habitat: "阴湿肥沃的林缘土坡、沟边、岩面薄土及腐木上,常成片蔓生。",
    distribution: "东亚分布,中国各省区山地及日本、朝鲜半岛常见。",
    etymology: "属名由希腊语 plagios(斜)与 Mnium(提灯藓属)复合,指本属蒴柄倾垂区别于提灯藓属;种加词 cuspidatum 意为骤尖的。",
    discovery: "赫德维希最早描述,科波宁 1968 年移入匍灯藓属;其与五倍子蚜的寄生关系于二十世纪中叶得到系统研究。",
    genomeInfo: "本种未见参考基因组;匍灯藓属染色体数目多变,多倍体复合体的细胞地理学研究有积累。",
    ecologyRole: "五倍子蚜类的越冬寄主藓,维系盐肤木虫瘿形成链条;本身构成林下地被层并固持表土。",
    researchValue: "五倍子生产以「培藓养蚜」为核心技术环节,本种等提灯藓科藓类是人工培殖的关键种,支撑单宁酸原料产业。",
    tags: ["经济物种"],
  },

  // ===================== 八、苔类植物门 Marchantiophyta 深扩(1 种,挂已有 Marchantiales) =====================
  {
    rank: "family",
    latin: "Aytoniaceae",
    chinese: "瘤冠苔科",
    parent: "Marchantiales",
    description:
      "复合型叶状体苔类科,背面具气室与气孔,雌托伞状半球形,腹鳞片具附器,含瘤冠苔属、石地钱属等,多为旱生倾向的土面岩面类群。",
  },
  {
    rank: "genus",
    latin: "Reboulia",
    chinese: "石地钱属",
    parent: "Aytoniaceae",
    description:
      "叶状体苔属,气室多层,雌托半球形具裂瓣、垂生孢蒴,雄托圆盘状无柄,广布温带土坡岩缝,耐旱性较强,含数个近缘种。",
  },
  {
    rank: "species",
    latin: "Reboulia hemisphaerica",
    chinese: "石地钱",
    authority: "(L.) Raddi",
    parent: "Reboulia",
    ncbiTaxId: 37395,
    description:
      "常见叶状体苔类,叶状体带状二叉分枝,背面绿色具气室网纹,半球形伞状雌托挺立其上,为其最醒目的鉴别特征。生于土坡岩缝,耐旱性强,干湿交替后迅速复苏,是苔类干旱胁迫与复苏生物学的研究材料。",
    morphology: "叶状体带状二叉分枝,背面具六边形气室网纹,腹面具紫色鳞片;雌托半球形具四至七裂瓣,雄托圆盘状。",
    habitat: "阴湿土坡、田埂、岩缝及林缘,耐一定干旱,常成丛贴生。",
    distribution: "泛温带至亚热带广布,中国各省区山地常见,欧洲与北美亦产。",
    etymology: "种加词 hemisphaerica 意为半球形的,指雌托轮廓;属名纪念法国蒙彼利埃博物学家雷布尔。",
    discovery: "林奈时期已有记载,拉迪将其归入独立的石地钱属;其雌托半球形的独特构型长期见于苔类形态学教学图版。",
    genomeInfo: "苔类基因组研究以地钱为模式;本种未见独立参考序列,耐旱复苏机制研究多依托转录组与代谢组。",
    ecologyRole: "岩缝土面先锋定居者,固持表土促进成土;雨后迅速恢复光合,为微小动物提供季节性覆盖生境。",
    researchValue: "干湿交替中叶绿体结构与光合系统损伤修复的机制研究材料,对农业抗逆育种具参考潜力。",
  },

  // ===================== 九、蕨类植物门 Polypodiophyta 深扩(8 种) =====================
  {
    rank: "genus",
    latin: "Cyrtomium",
    chinese: "贯众属",
    parent: "Dryopteridaceae",
    description:
      "常绿中型蕨属,叶一回羽状,羽片镰形、叶脉网状,孢子囊群盖盾状,主产东亚亚热带石灰岩山地,多种入药或作阴生园艺植物。",
  },
  {
    rank: "species",
    latin: "Cyrtomium fortunei",
    chinese: "贯众",
    authority: "J.Sm.",
    parent: "Cyrtomium",
    ncbiTaxId: 207839,
    description:
      "常绿中型蕨,一回羽状复叶的镰形羽片如列刀,叶脉网状。根状茎连同叶柄基是传统药材贯众的来源之一,历代各地「贯众」基原复杂,同库紫萁与绵马鳞毛蕨亦为不同处方的贯众来源。耐阴耐钙,园艺常用。",
    morphology: "叶簇生,一回羽状,羽片八至二十对,镰状披针形,基部上侧耳状凸起;叶脉网状,孢子囊群圆形,囊群盖盾状。",
    habitat: "林下石灰岩缝、沟谷阴湿岩壁及墙基,耐钙质与短期干旱。",
    distribution: "中国亚热带山地至华南、西南,越南亦有,日本有归化记录。",
    etymology: "属名 Cyrtomium 源于希腊语 kyrtoma(弯曲),指羽片镰状弯拱;种加词纪念采集其模式标本的英国植物学家福钧。",
    discovery: "约翰·史密斯依福钧采自中国的标本于十九世纪六十年代定名,此后成为中国贯众类蕨类研究与药材基原考订的基准种。",
    genomeInfo: "贯众属染色体基数多样、多倍化频繁;本种未见参考基因组,鳞毛蕨科蕨类基因组大小差异显著。",
    ecologyRole: "阴湿岩壁与林下常绿草本,冬季维持绿被;配子体独立生活完成世代交替,孢子随风扩散。",
    researchValue: "贯众药材基原植物之一,驱虫与抗病毒成分研究屡见报道;园艺上作耐阴地被与盆栽叶材。",
    tags: ["药用"],
  },
  {
    rank: "family",
    latin: "Salviniaceae",
    chinese: "槐叶蘋科",
    parent: "Salviniales",
    description:
      "漂浮水生异型孢子蕨科,孢子果分大孢子果与小孢子果,槐叶蘋属无真根、满江红属具悬垂根,两者是蕨类中仅有的漂浮属群,与蓝细菌或水体环境形成特化关系。",
  },
  {
    rank: "genus",
    latin: "Azolla",
    chinese: "满江红属",
    parent: "Salviniaceae",
    description:
      "微型漂浮蕨属,叶片背侧裂片空腔内共生固氮蓝细菌,孢子果大小异型,泛热带亚热带分布,作稻田绿肥与禽畜饲料,是蕨类中唯一的固氮共生类群。",
  },
  {
    rank: "species",
    latin: "Azolla imbricata",
    chinese: "满江红",
    authority: "(Roxb. ex Griff.) Nakai",
    parent: "Azolla",
    ncbiTaxId: 872383,
    description:
      "稻田水面的微型漂浮蕨,鳞片状小叶覆瓦排列,叶腔内共生固氮蓝细菌满江红鱼腥藻,是著名生物绿肥。冷凉或强光下体色转红,「满江红」由此得名。蕨类与固氮蓝细菌直接内共生的体系使其成为农业氮循环研究的经典。",
    morphology: "植株小三角形漂浮,叶二列覆瓦互生,每叶深裂为背腹两裂片,背裂片具含蓝细菌的空腔;根悬垂水中,秋后泛红。",
    habitat: "静水稻田、池塘及沟渠水面漂浮,温暖季节行无性断裂繁殖,极快铺满水面。",
    distribution: "中国长江流域及以南,东亚至东南亚热带亚热带水域。",
    etymology: "属名 Azolla 由希腊语 aza(干枯)与 ollyo(致死)复合,意指离水即枯;中名形容秋后水面尽染的红色。",
    discovery: "罗克斯堡与格里菲思依印度标本描述,中井猛之进组合为现名;东亚稻作史中长期放养作绿肥,中国植物志系统将其视为独立种。",
    genomeInfo: "近缘种满江红 Azolla filiculoides 基因组于 2018 年发表,约 0.75 Gb,为蕨类最早基因组之一,揭示与蓝细菌长期共生的遗传基础。",
    ecologyRole: "稻田水面覆盖抑草降温,与蓝细菌共生固氮为水稻提供氮源;亦作猪禽鱼饵料与重金属吸附材料。",
    researchValue: "稻田绿肥与可持续农业固氮研究的经典体系;蕨类-蓝细菌内共生机制是植物共生演化与合成生物学的前沿模型。",
    tags: ["经济物种"],
  },
  {
    rank: "genus",
    latin: "Salvinia",
    chinese: "槐叶蘋属",
    parent: "Salviniaceae",
    description:
      "无根漂浮蕨属,三叶轮生,两片漂浮叶表面密被疏水毛被,一片沉水叶细裂成根状丝,孢子果簇生于沉水叶基部,泛热带分布十余种。",
  },
  {
    rank: "species",
    latin: "Salvinia natans",
    chinese: "槐叶蘋",
    authority: "(L.) All., 1785",
    parent: "Salvinia",
    ncbiTaxId: 42333,
    description:
      "无根的漂浮蕨,三叶轮生:两片漂浮叶表面密被乳突状毛防水,一片沉水叶变态为须状丝负责吸收与稳定植株。孢子果大小异型,被视为异型孢子演化的活体教材。夏秋水面繁茂,秋季随低温沉衰。",
    morphology: "漂浮叶卵状椭圆形对生,上表面密被乳头状疏水毛;沉水叶细裂成根状丝丛;真根退化缺失,孢子果簇生沉水叶基部。",
    habitat: "稻田、池塘、沟渠等静水水面漂浮,喜温暖富营养水体。",
    distribution: "欧亚大陆温带至亚热带,中国各地水域常见。",
    etymology: "属名 Salvinia 纪念意大利学者萨尔维尼;种加词 natans 意为漂浮的,直指其生活型。",
    discovery: "林奈 1753 年描述,阿利奥尼组合为现名;其叶面毛被的超疏水结构近年成为仿生材料研究引用的经典。",
    genomeInfo: "与满江红同目,近缘种槐叶蘋属基因组自 2018 年起陆续发表,支撑异型孢子与漂浮形态的演化研究。",
    ecologyRole: "静水表面快速增殖,为鱼类提供遮阴与产卵基质;过度增殖会隔绝光照并降低水体溶氧。",
    researchValue: "孢子异型被视为种子植物先驱性状,是繁殖生物学演化的经典案例;叶面超疏水结构被仿生工程研究广泛借鉴。",
  },
  {
    rank: "species",
    latin: "Equisetum hyemale",
    chinese: "木贼",
    authority: "L., 1753",
    parent: "Equisetum",
    ncbiTaxId: 3262,
    description:
      "茎中空有节、表面纵棱硅质粗糙、节上罕分枝的常绿木贼,古称锉草,曾广泛用于打磨木器与竹器。全草为药典中药材木贼的来源,疏散风热。现存木贼属是唯一幸存的木贼类,化石记录绵延约三亿年。",
    morphology: "茎直立,高 30-100 厘米,粗 0.5-1 厘米,绿色具 10-30 条纵棱,触感粗糙;叶鞘管状黑褐色,孢子穗顶生。",
    habitat: "河岸沙地、沟渠边及湿草地,喜湿耐寒,借根状茎成片克隆生长。",
    distribution: "北半球温带及寒温带广布,中国东北、华北、西北山地常见。",
    etymology: "属名 Equisetum 由拉丁语 equus(马)与 seta(刚毛)构成,指形如马尾;种加词 hyemale 意为冬季的,指茎经冬不枯。",
    discovery: "林奈 1753 年描述;中国古以之擦磨器物,称锉草、擦草,历代器物工艺与本草文献均有记载。",
    genomeInfo: "木贼属现生十余种,为木贼目唯一现存属;全基因组组装近年才见报道,系统位置为蕨类中早期分化支系之一。",
    ecologyRole: "根状茎深扎的克隆植物,固持河岸沙地;高硅组织少被动物取食,凋落物分解缓慢。",
    researchValue: "植物硅沉积的细胞学机制研究模型;中药材木贼的药典基原植物,成分与药理研究广泛。",
    tags: ["药用"],
  },
  {
    rank: "order",
    latin: "Osmundales",
    chinese: "紫萁目",
    parent: "Polypodiopsida",
    description:
      "真蕨中古老而独立的支系,根状茎兼具原始管胞列与进化的网状中柱,孢子囊大型、环带侧生,化石记录连绵约两亿年,系统位置长期是蕨类演化讨论的焦点。",
  },
  {
    rank: "family",
    latin: "Osmundaceae",
    chinese: "紫萁科",
    parent: "Osmundales",
    description:
      "大型土生蕨科,叶二型或能育羽片收缩成褐色穗状,孢子囊壁薄、无完整环带,单叶可产数以亿计孢子,现生数属,跨温带至热带。",
  },
  {
    rank: "genus",
    latin: "Osmunda",
    chinese: "紫萁属",
    parent: "Osmundaceae",
    description:
      "落叶性大型蕨属,叶簇生,能育羽片强度收缩成穗状,主产东亚与北美,拳卷幼芽薇菜与根状茎药材均有悠久经济利用。",
  },
  {
    rank: "species",
    latin: "Osmunda japonica",
    chinese: "紫萁",
    authority: "Thunb., 1784",
    parent: "Osmunda",
    ncbiTaxId: 90693,
    description:
      "东亚山地常见大型蕨,营养叶一回羽状,能育叶羽片收缩成褐色穗状。拳卷幼叶即山珍「薇菜」,盐渍与干制品长期出口日本;根状茎入药称紫萁贯众。紫萁科化石记录连绵两亿年,形态几无变化,是著名的活化石类群。",
    morphology: "植株高 50-80 厘米;营养叶簇生一回羽状,羽片长圆形具细锯齿;能育叶羽片收缩成狭线形,密布孢子囊,成熟后褐枯。",
    habitat: "山地林缘、灌丛下及溪谷旁阴湿处,喜酸性土壤,常成片生长。",
    distribution: "东亚温带至亚热带山地,中国长江流域以南最盛,日本、朝鲜半岛亦产。",
    etymology: "属名 Osmunda 由来诸说纷纭,或谓源自北欧神话人物名;种加词 japonica 指模式产地日本。",
    discovery: "通贝里 1784 年依日本植物志描述;薇菜采加工业长期是中国南方山区出口创汇的林副产业,资源过度采挖已受关注。",
    genomeInfo: "紫萁科为古老真蕨类群,本种未见参考基因组;其兼具原始与衍生维管特征的解剖学长期用于木质部演化教学。",
    ecologyRole: "酸性山地林下草本层优势种,拳卷幼芽被采集食用;粗壮根状茎储存养分,火烧后率先复苏。",
    researchValue: "薇菜产业与紫萁贯众药材的基原植物;维管植物木质部演化研究中兼具原始与衍生性状的关键参照。",
    tags: ["药用", "经济物种"],
  },
  {
    rank: "genus",
    latin: "Pyrrosia",
    chinese: "石韦属",
    parent: "Polypodiaceae",
    description:
      "附生旱生蕨属,叶革质、背面密被星状毛,孢子囊群圆形无盖,主产泛热带至亚热带,逾百种,多种为石韦类药材或园艺蕨。",
  },
  {
    rank: "species",
    latin: "Pyrrosia lingua",
    chinese: "石韦",
    authority: "(Thunb.) Farw.",
    parent: "Pyrrosia",
    ncbiTaxId: 187374,
    description:
      "附生或石生的中小型蕨,狭披针形革质叶片背面密布星状毛,孢子囊群橙褐如锈斑。干燥全草是药典中药材石韦的来源之一,利尿通淋、清肺止咳。附生习性使其成为蕨类耐旱与适应性辐射研究的常用类群。",
    morphology: "植株高 10-25 厘米;叶远生,一型或近二型,狭披针形,革质,背面密被星状毛;孢子囊群圆形无盖,密布叶背中上部。",
    habitat: "附生于树干及岩壁上,林下阴湿处或半荫石缝,耐旱耐瘠。",
    distribution: "中国长江以南各省区,越南、日本及东亚亚热带山地。",
    etymology: "属名 Pyrrosia 源于希腊语 pyrrhos(火红色),指孢子囊群锈色如火;种加词 lingua 意为舌的,指叶舌形。",
    discovery: "通贝里最早描述,法韦尔组合为现名;《神农本草经》即收录石韦,历代本草沿承,为中国最古老药用蕨类之一。",
    genomeInfo: "水龙骨科附生蕨的基因组仅少数代表种已测序;本种研究以活性成分分析与组织培养快繁为主。",
    ecologyRole: "树干岩面附生,星状毛减缓蒸腾、滞留雨水与尘埃;为附生动物与微生物提供覆盖微生境。",
    researchValue: "药典药材石韦的基原之一,芒果苷、绿原酸等指标成分支撑利尿抗炎药理研究,栽培驯化持续进行。",
    tags: ["药用"],
  },
  {
    rank: "genus",
    latin: "Pteris",
    chinese: "凤尾蕨属",
    parent: "Pteridaceae",
    description:
      "叶一回羽状至二回的大型蕨属,孢子囊沿叶缘连续着生成线,主产泛热带,逾两百种,多个种药用、观赏或为砷耐性研究材料,凤尾草类药材基原。",
  },
  {
    rank: "species",
    latin: "Pteris multifida",
    chinese: "井栏边草",
    authority: "Poir.",
    parent: "Pteris",
    ncbiTaxId: 170715,
    description:
      "凤尾蕨科常见蕨,叶二型,不育叶一回羽状如凤尾,能育叶羽片狭线形。因其常自墙缝井沿逸生而得名,全草即民间药「凤尾草」。同属蜈蚣草是砷超富集修复的明星种,本种的重金属耐受研究亦有报道。",
    morphology: "植株高 30-60 厘米;不育叶一回羽状,羽片三至六对,披针形具锐锯齿;能育叶羽片狭线形,孢子囊沿边缘连续成线。",
    habitat: "墙缝、井沿、石灰岩缝及疏林下,耐钙喜荫,亦耐城市干旱生境。",
    distribution: "中国秦岭以南广布,华东、华南最常见,东南亚亦有。",
    etymology: "属名 Pteris 源于希腊语 pteron(羽翼),指羽状叶;种加词 multifida 意为多裂的,指羽片深裂。",
    discovery: "普瓦雷十九世纪初描述;因常生于井栏墙隙而得中名,各地本草以凤尾草之名入药,沿用至今。",
    genomeInfo: "凤尾蕨科染色体基数多样;同属蜈蚣草的砷富集机制基因研究深入,本种相关基因组数据尚少。",
    ecologyRole: "墙缝岩隙的先锋蕨,孢子随风远播快速定居新裸露生境,对城市人工生境适应力强。",
    researchValue: "民间药凤尾草的基原之一,清热利湿研究广泛;凤尾蕨科砷耐性与富集的比较研究具污染修复应用前景。",
    tags: ["药用"],
  },
  {
    rank: "order",
    latin: "Schizaeales",
    chinese: "莎草蕨目",
    parent: "Polypodiopsida",
    description:
      "古老真蕨支系,孢子囊单生于叶脉顶端、环带顶生,含莎草蕨科与海金沙科,叶形独特呈帚状或攀援缠绕,热带亚热带分布为主,化石记录悠久。",
  },
  {
    rank: "family",
    latin: "Lygodiaceae",
    parent: "Schizaeales",
    chinese: "海金沙科",
    description:
      "单属的攀援蕨科,叶轴无限生长缠绕如藤蔓,能育羽片边缘孢子囊流苏状排列,孢子金黄粉状,泛热带至暖温带分布,孢子为传统药材。",
  },
  {
    rank: "genus",
    latin: "Lygodium",
    chinese: "海金沙属",
    parent: "Lygodiaceae",
    description:
      "藤本状攀援蕨属,叶轴无限延伸可达数米,缠绕灌草攀缘,能育羽片边缘流苏状着生孢子囊,泛热带约数十种,部分种在热带地区成入侵杂草。",
  },
  {
    rank: "species",
    latin: "Lygodium japonicum",
    chinese: "海金沙",
    authority: "(Thunb.) Sw.",
    parent: "Lygodium",
    ncbiTaxId: 13824,
    description:
      "独特的缠绕攀援蕨,叶轴无限生长,螺旋缠绕灌草攀缘数米,堪称蕨类中的藤本。能育羽片边缘密生流苏状孢子囊,成熟抖落金黄孢子粉,即药典药材海金沙。孢子粉富含油脂,遇火即燃,旧时民间用于花炮引火。",
    morphology: "植株攀援可达数米;叶轴细长缠绕;不育羽片掌状分裂,能育羽片边缘具流苏状孢子囊,孢子黄褐色细粉状。",
    habitat: "林缘灌丛、路边坡地及疏林下,借灌草攀援至冠层光照处。",
    distribution: "东亚至南亚热带亚热带,中国南方丘陵极常见。",
    etymology: "属名 Lygodium 源于希腊语 lygodes(柔韧的),指柔韧缠绕的叶轴;中名形容孢子色如金、细如沙。",
    discovery: "通贝里最早描述,斯瓦茨组合为现名;海金沙自历代本草收录至今,主产中国南方丘陵,采粉靠抖落干裂的能育羽片。",
    genomeInfo: "现生真蕨基因组数据集中于水生与模式类群;本种研究以系统发育、孢子形态与活性成分为主,未见参考序列。",
    ecologyRole: "林缘藤状蕨,快速覆盖灌丛形成层片;金黄孢子随风远播,快速定殖扰动坡地与路缘。",
    researchValue: "药典药材海金沙的基原植物,利尿通淋;孢子粉的易燃特性常用于民俗演示与显微鉴定教学。",
    tags: ["药用"],
  },
];
