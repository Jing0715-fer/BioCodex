import { TaxonSeed } from "../types";

// 多孔菌目深扩种子数据(Task E28-a expansion8 文件三)。
// 库内多孔菌目已有 4 种(灵芝/云芝/茯苓/猪苓),Polyporales 挂 Agaricomycetes
// (Basidiomycota→Fungi→Eukarya,已核 DB);科一层现有 Ganodermataceae 与
// Polyporaceae(栓菌属/多孔菌属/茯苓属皆挂其下)。本文件新增 4 物种 + 3 新属
// (灰树花属 Grifola、硫磺菌属 Laetiporus、拟层孔菌属 Fomitopsis)+ 3 新科
// (灰树花科 Grifolaceae、硫磺菌科 Laetiporaceae、拟层孔菌科 Fomitopsidaceae,
// 均直挂 Polyporales)= 10 条。
// 关键分类决策(与任务书不同的三处,均有核验依据):
// ①桦褐孔菌 Fuscoporia obliqua 与库内 Inonotus obliquus 桦褐孔菌为同一物种,
//   中文名与物种本体均已入库(/tmp/taxa-inventory.tsv 2275-2280 行区段),
//   重复入库违反唯一性约束,故放弃该条目,改以同目高价值种松生拟层孔菌
//   Fomitopsis pinicola 顶替(新科 Fomitopsidaceae+新属 Fomitopsis,保持
//   『新科新属』结构;NCBI Lineage: Polyporales→Fomitopsidaceae→Fomitopsis);
// ②桑黄孔菌属 Sanghuangporus 与刺革菌科 Hymenochaetaceae 库内已存在(挂
//   Hymenochaetales 而非 Polyporales——现代分类刺革菌目自多孔菌目分出,从库),
//   故杨树桑黄只补物种记录,不新建科属;中文名『桑黄』已被 S. sanghuang 占用,
//   本种采用文献通行的『杨树桑黄』(寄主以杨树为主,亦是中国桑黄栽培主力种);
// ③NCBI Lineage 逐一核验:Grifola frondosa→Grifolaceae、Laetiporus sulphureus→
//   Laetiporaceae、Fomitopsis pinicola→Fomitopsidaceae,三科均挂 Polyporales,
//   与任务书一致;腐解类型经 Europe PMC 文献核验——灰树花为白腐(2025 年
//   "Two-stage wood decay by Grifola frondosa" 摘要明言 white-rot fungus),
//   硫磺菌与拟层孔菌为褐腐。
// ncbiTaxId 均经 NCBI esearch 查询、esummary/efetch 复核学名与 Lineage;
// 命名者经 GBIF Backbone 核验(ACCEPTED);Sanghuangporus vaninii 命名者从
// 现行组合发表形式的 "(Lj.N. Vassiljeva) L.W. Zhou & Y.C. Dai"(GBIF 缩写为
// "(Ljub.) L.W.Zhou & Y.C.Dai",异形同指)。
// IUCN:四种真菌均未被全球红色名录评估(GBIF IUCN 数据集查无),conservation
// 一律留空。基因组事实经 Europe PMC 核验:灰树花近完整基因组 2025(J Fungi)、
// 硫磺菌基因组支撑 UbiA 型异戊烯基转移酶挖掘(Nat Prod Bioprospect 2026)、
// 松生拟层孔菌缺氧褐腐机制(Nat Commun 2025)与线粒体基因组(MRA 2023)、
// 桑黄孔菌属五种线粒体基因组比较(BMC Genomics 2026)。
// tags 全部取自库内既有词表(食用菌/药用),flagship 按任务书加于灰树花;
// species 条目不含 rank 词。查重依据 /tmp/taxa-inventory.tsv,拉丁名与中文名
// 零冲突(灰树花/硫磺菌/松生拟层孔菌/杨树桑黄及三科三属均无重名)。
export const expansion8Polypores: TaxonSeed[] = [
  // ===================== 一、灰树花科 Grifolaceae(新科,挂多孔菌目) =====================
  {
    rank: "family",
    latin: "Grifolaceae",
    chinese: "灰树花科",
    parent: "Polyporales",
    description:
      "灰树花科为多孔菌目单型小科,通常仅含灰树花属一属;子实体大型、多回分枝、菌盖层叠如莲座,腐生于阔叶树根部行白腐,代表种灰树花为著名食药用菌。",
  },
  {
    rank: "genus",
    latin: "Grifola",
    chinese: "灰树花属",
    parent: "Grifolaceae",
    description:
      "灰树花属常作单型属处理,仅灰树花一种;子实体由多回分枝的菌柄撑起层层扇形菌盖,重可达十余公斤,生于栎栗等活树根际,兼具食用与药用价值。",
  },
  {
    rank: "species",
    latin: "Grifola frondosa",
    chinese: "灰树花",
    authority: "(Dicks.) Gray",
    parent: "Grifola",
    ncbiTaxId: 5627,
    description:
      "灰树花在山民口中叫『栗蘑』,日本人唤作舞茸——传说采得此菌者喜极而舞。一株成熟子实体由数十枚灰褐色扇形小盖层叠簇拥,如老树根上开出的莲座,重可达十余公斤;它滋味清鲜,又是免疫调节多糖『D-组分』的来源,食药两途皆为明星。",
    morphology:
      "菌柄多回分枝,末端生扇形至匙形菌盖,叠生成丛;盖面灰褐具辐射细纹,孔面白色至淡黄,管口细小,孢子无色卵形。",
    habitat:
      "夏秋腐生于栎、栗等阔叶树根部与老桩,致根基白腐;喜凉爽湿润的阔叶林下层。",
    distribution:
      "分布于东亚与北美东部阔叶林区;中国见于东北、华北与西南山区,河北迁西等地已大规模仿野生栽培。",
    etymology:
      "种加词 frondosa 意为『多叶的』,指层叠如叶的菌盖;『舞茸』之名一说取采菇人得之起舞的传说,一说状其如旋舞的裙裾。",
    discovery:
      "1785 年迪克森定为 Boletus frondosus,1821 年格雷移入灰树花属;二十世纪八十年代日本确立人工栽培,舞茸自此走向世界餐桌。",
    genomeInfo:
      "近完整基因组 2025 年见于《Journal of Fungi》,结合转录组筛出光诱导的三萜合成相关基因;子实体分化的转录组研究亦有发表。",
    ecologyRole:
      "阔叶树根部白腐菌,缓慢降解根颈木材、把老龄树的根转化为森林养分库;子实体亦是蕈甲与蛞蝓的取食对象。",
    researchValue:
      "β-葡聚糖免疫调节研究的代表食用菌;少数实现规模化人工栽培的药用菌之一,栽培生理与多糖发酵工艺成熟。",
    tags: ["flagship", "食用菌", "药用"],
  },

  // ===================== 二、硫磺菌科 Laetiporaceae(新科,挂多孔菌目) =====================
  {
    rank: "family",
    latin: "Laetiporaceae",
    chinese: "硫磺菌科",
    parent: "Polyporales",
    description:
      "硫磺菌科为多孔菌目行褐腐的小科;子实体一年生、肉质多汁,橙黄至硫磺色,叠生呈莲座状,生于针阔叶树活立木与枯木,代表属为硫磺菌属。",
  },
  {
    rank: "genus",
    latin: "Laetiporus",
    chinese: "硫磺菌属",
    parent: "Laetiporaceae",
    description:
      "硫磺菌属含十余种致褐腐的肉质多孔菌;子实体鲜橙黄色、叠生如花冠,生于树干之上,幼时可食,欧美俗呼『森林鸡』,种复合体的分子系统学研究方兴未艾。",
  },
  {
    rank: "species",
    latin: "Laetiporus sulphureus",
    chinese: "硫磺菌",
    authority: "(Bull.) Murrill",
    parent: "Laetiporus",
    ncbiTaxId: 5630,
    description:
      "硫磺菌在栎树干上叠出橙黄鲜亮的莲座,远望如树身开出一簇硫磺色的花。欧美称它『森林鸡』——幼嫩子实体弹嫩多汁,煎烤颇有禽肉滋味,老熟后则纤维粗硬不堪入口。作为典型褐腐菌,它只拆解纤维素而留下褐色木质素残骸,在林中格外显眼。",
    morphology:
      "菌盖肉质扇形,数枚至数十枚叠生;盖面橙红带环纹、如天鹅绒,边缘鲜黄;孔面硫磺色,管口细密;孢子椭圆形无色。",
    habitat:
      "夏秋生于阔叶树(尤喜栎、栗)活立木干基与伤损处,亦见于针叶树朽木,致心材褐腐。",
    distribution:
      "广布欧洲与东亚、北美东部林区;中国自东北至西南山地均有记录,城市古树干上亦时有所见。",
    etymology:
      "属名 Laetiporus 由拉丁语 laetus(鲜艳)与 porus(孔)复合,指鲜黄色孔面;种加词 sulphureus 意为『硫磺色的』。",
    discovery:
      "布尔雅尔于十八世纪末定为 Boletus sulphureus,1920 年默里尔移入硫磺菌属;分子证据显示其为种复合体,北美隐存种已相继分出。",
    genomeInfo:
      "基因组已测序并支撑 UbiA 型异戊烯基转移酶等活性萜类合成基因的挖掘;同属的哀牢山硫磺菌线粒体基因组比较研究亦有发表。",
    ecologyRole:
      "褐腐真菌选择性降解纤维素,塑造森林粗木质残体的褐色腐解路径;活立木心材腐朽加速老树折倒,亦是林窗更新的推手。",
    researchValue:
      "褐腐选择性降解机制的模式真菌;幼菌可食但需谨慎鉴别,种复合体是真菌隐存多样性的教学案例,多糖与色素研究亦有积累。",
    tags: ["食用菌", "药用"],
  },

  // ===================== 三、拟层孔菌科 Fomitopsidaceae(新科,挂多孔菌目) =====================
  {
    rank: "family",
    latin: "Fomitopsidaceae",
    chinese: "拟层孔菌科",
    parent: "Polyporales",
    description:
      "拟层孔菌科为多孔菌目中褐腐真菌的核心科之一;子实体一年生至多年生,肉质、蜡质至坚硬木栓质,蹄形或平伏反卷,是针阔叶林木材降解的主力类群。",
  },
  {
    rank: "genus",
    latin: "Fomitopsis",
    chinese: "拟层孔菌属",
    parent: "Fomitopsidaceae",
    description:
      "拟层孔菌属为多年生坚硬孔菌,菌盖蹄形、年轮状分层加厚;行褐腐,寄居针阔叶树倒木与活立木,含松生拟层孔菌等北温带最常见的木蹄菌。",
  },
  {
    rank: "species",
    latin: "Fomitopsis pinicola",
    chinese: "松生拟层孔菌",
    authority: "(Sw.) P. Karst.",
    parent: "Fomitopsis",
    ncbiTaxId: 40483,
    description:
      "松生拟层孔菌是北温带针阔混交林最常见的多年生木蹄菌之一:马蹄形硬菌盖一圈圈年轮般增厚,活盖边缘镶一道橙红『红带』,欧美称之红带菌。它终生固守一段朽木,缓缓把倒木拆成褐色粉末,子实体的环层里,记着每一年的气候。",
    morphology:
      "菌盖马蹄形、硬木质,盖面灰褐具环沟,生长缘带橙红至红色;孔面乳白至淡黄,管口细密圆形;孢子圆柱形无色。",
    habitat:
      "生于针叶树与阔叶树倒木、伐桩及活立木伤口,致典型褐腐;多年生子实体逐年加层,随基物耗竭而衰亡。",
    distribution:
      "环北温带广布于欧洲、东亚与北美针阔混交林;中国东北与西南山地林区常见。",
    etymology:
      "属名 Fomitopsis 意为『似火绒菌 Fomes 的』,指同具蹄形硬菌盖;种加词 pinicola 意为『生于松树上的』。",
    discovery:
      "瑞典植物学家斯瓦茨定为 Boletus pinicola,1881 年芬兰真菌学之父卡尔滕移入拟层孔菌属;其种界定的分子修订近年仍在推进。",
    genomeInfo:
      "线粒体基因组已完成测序;2025 年《Nature Communications》报道其在缺氧条件下的褐腐机制,欧洲范围的群体基因组学研究亦在进行。",
    ecologyRole:
      "针叶林倒木最主要的褐腐分解者之一,留存木质素的褐腐残体是森林土壤碳库的重要组分;多年生子实体为甲虫提供持久微生境。",
    researchValue:
      "褐腐『选择性吃掉纤维素』降解机制的经典研究物种,对木材保护、生物制浆与森林碳循环研究均有标杆意义。",
    tags: ["药用"],
  },

  // ===================== 四、桑黄孔菌属增补(杨树桑黄;属与科库内已有) =====================
  {
    rank: "species",
    latin: "Sanghuangporus vaninii",
    chinese: "杨树桑黄",
    authority: "(Lj.N. Vassiljeva) L.W. Zhou & Y.C. Dai",
    parent: "Sanghuangporus",
    ncbiTaxId: 175686,
    description:
      "桑黄之名因生于桑树而得,是东亚沿用千年的药用真菌;现代研究厘清了它的身世——市售栽培『桑黄』的主力其实是杨树桑黄:野生居群栖身杨、柳等阔叶树,全国的桑黄段木与菌包多由它育成。千年药典里的深山奇药,就这样走进了标准化车间。",
    morphology:
      "子实体多年生,蹄形至半球形,硬木质;盖面幼时黄褐、后呈深灰黑,具同心环棱与龟裂;孔面黄褐,菌肉金褐色,层次分明。",
    habitat:
      "腐生于杨、柳等阔叶树立木与枯木,致心材白腐;人工栽培以杨树段木与代料为主,喜通风湿润环境。",
    distribution:
      "产中国东北与俄罗斯远东的杨桦林区,为东亚温带特有种;作为栽培种已遍布中国各桑黄产区。",
    etymology:
      "属名 Sanghuangporus 取中文『桑黄』加拉丁语 porus(孔菌)构成;种加词 vaninii 为纪念俄国学者。",
    discovery:
      "俄国真菌学家瓦西里耶娃依远东标本定为 Phellinus vaninii;2016 年中国学者周丽伟、戴玉成等将桑黄类独立为桑黄孔菌属,本种随之改用现组合。",
    genomeInfo:
      "种级高质量核基因组尚未见权威发表;桑黄孔菌属五种线粒体基因组的比较基因组学已见报道,其多糖合成关键基因亦获功能验证。",
    ecologyRole:
      "阔叶树立木心材白腐菌,缓慢蚀空树干、推动老树折倒;子实体多年生长,为树栖昆虫提供长久的微生境。",
    researchValue:
      "桑黄多糖与多酚活性成分研究的主要药源;段木栽培技术成熟,是食药用菌产业化的新兴支柱,亦是真菌分类修订的典型案例。",
    tags: ["药用"],
  },
];
