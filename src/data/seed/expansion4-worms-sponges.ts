import { TaxonSeed } from "../types";

// 扁形/线虫/海绵/环节动物深扩充种子数据(Task 6-b expansion4)。
// 主题:23 物种 —— 涡虫纲(地中海涡虫/多目涡虫/微口涡虫)、吸虫纲(华支睾吸虫/卫氏并殖吸虫/
// 布氏姜片虫/矛形双腔吸虫)、绦虫纲(牛带绦虫/细粒棘球绦虫/多房棘球绦虫/微小膜壳绦虫/
// 阔节裂头绦虫)、线虫门(十二指肠钩虫/美洲板口线虫/南方根结线虫/腐烂茎线虫)、
// 多孔动物门(脆针海绵/昆士兰海绵/冈田软海绵)、环节动物门(宽体金线蛭/日本医蛭/
// 杜氏阔沙蚕/正颤蚓)。
// 每个物种均含 5 项科学档案字段(etymology / discovery / genomeInfo / ecologyRole / researchValue)。
// species 的 parent 引用两类来源:
//   1) DB 已有分类单元(/tmp/taxa-inventory.tsv,2018 条):
//      Turbellaria(涡虫纲)/Tricladida/Dugesiidae(三角涡虫科)、Trematoda/Plagiorchiida(斜睾目)/
//      Fasciolidae(片形科)、Cestoda/Cyclophyllidea(圆叶目)/Taeniidae(带科)/Taenia(带绦虫属)、
//      Nematoda/Chromadorea(色矛纲)、Porifera/Demospongiae(寻常海绵纲)、
//      Annelida/Oligochaeta(寡毛纲)/Nereididae(沙蚕科)/Hirudinidae(医蛭科)/Hirudo(医蛭属);
//   2) 本文件内先行定义的新中间阶元(8 目 / 14 科 / 20 属,共 42 条)。
// 查重已跳过清单已有物种:日本三角涡虫 Dugesia japonica、肝片吸虫 Fasciola hepatica、
// 日本血吸虫 Schistosoma japonicum、猪带绦虫 Taenia solium、秀丽隐杆线虫、似蚓蛔线虫、
// 旋毛形线虫、毛壶、偕老同穴、浴用海绵、双齿围沙蚕、赤子爱胜蚓、欧洲医蛭、
// 参环毛蚓 Pheretima aspergillum、沙蚕 Nereis virens(后两种为 expansion-invertebrates 已加)。
// 网络核验:GBIF Backbone 逐条核对学名/命名人/科目归属,NCBI eutils 回名比对 taxid
// (拉丁名与 NCBI 现用名不一致者按「宁缺毋滥」省略 taxid,如 Hymenolepis nana NCBI 现用
// Rodentolepis nana、Spongilla fragilis 现用 Eunapius fragilis、Diphyllobothrium latum 现用
// Dibothriocephalus latus)。寄生虫均未做 IUCN 评估,不写 conservation。
export const expansion4WormsSponges: TaxonSeed[] = [
  // ===================== 一、涡虫纲 Turbellaria(3 种) =====================
  {
    rank: "family",
    latin: "Planariidae",
    chinese: "涡虫科",
    parent: "Tricladida",
    description:
      "涡虫科为三肠目淡水类群,头端具眼点,肠分三支,雌雄同体,广布全球温带淡水,多目涡虫等属是底栖群落生态与教学的常用材料。",
  },
  {
    rank: "genus",
    latin: "Schmidtea",
    chinese: "施密特涡虫属",
    parent: "Dugesiidae",
    description:
      "施密特涡虫属为小型半透明淡水涡虫,现行系统置于三角涡虫科内,地中海涡虫的实验室无性品系以横裂繁殖,是当代再生生物学的核心模式。",
  },
  {
    rank: "species",
    latin: "Schmidtea mediterranea",
    chinese: "地中海涡虫",
    authority: "(Benazzi, Baguñà, Ballester & del Papa, 1975)",
    ncbiTaxId: 79327,
    parent: "Schmidtea",
    description:
      "地中海涡虫是当代再生生物学最重要的模式动物之一,实验室通称 Smed。可从任意小残片再生出完整个体,秘密在于遍布全身的成体多能干细胞。无性品系只靠横裂繁殖,配合高效 RNAi 技术,使其成为干细胞与组织再生研究的黄金材料。",
    morphology: "体长 5-15 毫米,通体半透明乳白,头端钝圆无耳突,具一对眼点,体表纤毛密布。",
    habitat: "栖于西地中海沿岸清洁溪流的石块下,避光生活,捕食小型水生无脊椎动物。",
    distribution: "野生种群见于西班牙等西地中海沿岸淡水域,实验室品系遍布全球研究机构。",
    etymology:
      "种加词 mediterranea 意为地中海的,指模式产地;中文文献按其再生模式身份通称地中海涡虫。",
    discovery:
      "1975 年贝纳齐等依地中海沿岸标本定名,当时置于三角涡虫属,后移入施密特涡虫属;20 世纪 90 年代末被发掘为再生分子生物学的核心模型。",
    genomeInfo:
      "无性品系基因组约 800 Mb,高度杂合且富含重复序列,染色体级参考组装已发表。",
    ecologyRole:
      "夜行捕食小型水生无脊椎;野生种群行有性生殖,实验室品系以横裂无性繁殖,种群增长迅速。",
    researchValue:
      "其成体多能干细胞是已知唯一能再生完整个体的成体干细胞群,是干细胞与再生医学研究的第一模型。",
    tags: ["模式生物"],
  },
  {
    rank: "genus",
    latin: "Polycelis",
    chinese: "多目涡虫属",
    parent: "Planariidae",
    description:
      "多目涡虫属头缘眼点密集排列成弧带而得名,淡水栖息,种类多而常见于欧美湖沼,是淡水底栖群落生态研究的经典对象。",
  },
  {
    rank: "species",
    latin: "Polycelis tenuis",
    chinese: "多目涡虫",
    authority: "Ijima, 1884",
    ncbiTaxId: 66754,
    parent: "Polycelis",
    description:
      "多目涡虫头部前缘密布数十枚眼点,沿弧形排列,是三肠目中独特的一类。它栖息于欧亚大陆的湖泊池沼,白天潜伏石下,夜间活动觅食。20 世纪中叶英国学者以其与近缘种的野外竞争实验,奠定了淡水底栖群落生态学的经典理论。",
    morphology: "体长 5-15 毫米,背色深灰至黑,头端前缘具数十枚眼点排成弧带,体扁薄,尾端尖。",
    habitat: "栖于湖泊、池塘与溪流的石块底面,避光,捕食小型水生动物与动物残体。",
    distribution: "广布欧亚大陆温带淡水,自欧洲经西伯利亚至日本均有记录。",
    etymology:
      "属名 Polycelis 意为多眼,指头缘密集的眼点;种加词 tenuis 意为纤细,指其扁平薄削的体形。",
    discovery:
      "1884 年日本学者饭岛魁定名;20 世纪中叶英国学者以多目涡虫属种类开展竞争与捕食实验,重塑了淡水底栖生态研究范式。",
    genomeInfo: "基因组数据尚少,种间鉴定长期依赖生殖器形态与酶学等经典手段。",
    ecologyRole:
      "捕食小型底栖动物,又被鱼类与水鸟取食,是淡水底栖食物网的中间环节,对水质变化敏感。",
    researchValue:
      "作为竞争排斥与群落结构性状研究的经典对象被生态学教科书广泛收录,也是涡虫区系调查的常见种。",
    tags: ["经典实验材料"],
  },
  {
    rank: "order",
    latin: "Macrostomida",
    chinese: "大口目",
    parent: "Turbellaria",
    description:
      "大口目是涡虫纲中最原始的类群之一,体微小,口位于前端腹面,咽简单而肠不分支,多为间栖或底栖自由生活,是理解扁形动物体制演化的基部分支。",
  },
  {
    rank: "family",
    latin: "Microstomidae",
    chinese: "微口科",
    parent: "Macrostomida",
    description:
      "微口科虫体微小,常以横裂形成分体链,每一分体发育出独立的口与眼点,淡水和海洋均有分布,微口涡虫为其著名代表。",
  },
  {
    rank: "genus",
    latin: "Microstomum",
    chinese: "微口虫属",
    parent: "Microstomidae",
    description:
      "微口虫属为微小涡虫,体常不足一毫米,以连续横裂形成的分体链行无性繁殖,各分体长出口与眼后才脱离,广布温带水域。",
  },
  {
    rank: "species",
    latin: "Microstomum lineare",
    chinese: "微口涡虫",
    authority: "(Müller, 1773)",
    ncbiTaxId: 52057,
    parent: "Microstomum",
    description:
      "微口涡虫是淡水中的微小涡虫,体长常不足一毫米,却以奇特的无性繁殖闻名:虫体连续横裂却不分开,数个分体首尾相连排成链状,每一节都长出自己的口、眼与神经,发育成熟后才彼此脱离。这一分体链现象是无脊椎动物教学的经典案例。",
    morphology: "体长 0.3-1.5 毫米,无色透明,前端具一对眼点,分体链各节均有独立口与眼点。",
    habitat: "栖于池塘、缓流与湖泊沿岸的水草与腐叶间,以纤毛在基质表面爬行。",
    distribution: "广布欧洲、北美与东亚温带淡水,中国亦有记录。",
    etymology:
      "属名 Microstomum 意为小口,指口位于体前端腹面;种加词 lineare 意为线形,形容虫体细长。",
    discovery:
      "1773 年丹麦博物学家米勒依欧洲水样定名;分体链现象自 19 世纪起被反复用作讨论动物个体性的经典材料。",
    genomeInfo: "基因组研究尚少,分类与系统发育主要依赖形态与分子条码。",
    ecologyRole:
      "以硅藻与小型藻类为食,又被鱼类等捕食,是淡水底栖微型食物网的组成部分。",
    researchValue:
      "是扁形动物早期分支类群的代表,也是无脊椎教学中演示无性繁殖与涡虫体制的经典材料。",
    tags: ["经典实验材料"],
  },

  // ===================== 二、吸虫纲 Trematoda(4 种) =====================
  {
    rank: "family",
    latin: "Opisthorchiidae",
    chinese: "后睾科",
    parent: "Plagiorchiida",
    description:
      "后睾科吸虫睾丸前后排列于体后部,卵巢位于睾丸之前,成虫寄生于食鱼动物胆管,华支睾吸虫与猫后睾吸虫是重要的人兽共患病原。",
  },
  {
    rank: "genus",
    latin: "Clonorchis",
    chinese: "支睾属",
    parent: "Opisthorchiidae",
    description:
      "支睾属为单型属,仅华支睾吸虫一种,因睾丸高度分支呈珊瑚状而得名,寄生于人及食鱼哺乳动物胆管,是东亚肝吸虫病病原。",
  },
  {
    rank: "species",
    latin: "Clonorchis sinensis",
    chinese: "华支睾吸虫",
    authority: "(Cobbold, 1875)",
    ncbiTaxId: 79923,
    parent: "Clonorchis",
    description:
      "华支睾吸虫俗称肝吸虫,寄生于人或猫犬的胆管,感染人数以千万计。虫卵随粪便入水,被豆螺类吞食后增殖,尾蚴侵入淡水鱼形成囊蚴,人因食生鱼片而感染。国际癌症研究机构将其列为胆管癌的一类致癌物,是中国食源性寄生虫病防治的头号目标。",
    morphology: "成虫狭长叶状,长 10-25 毫米,薄而半透明,睾丸呈珊瑚状分支前后排列于体后部。",
    habitat: "成虫寄生于胆管,幼虫经淡水螺与鲤科鱼类完成发育。",
    distribution: "流行于东亚,中国两广与东北等有食生鱼习惯的地区为高发区。",
    etymology:
      "属名 Clonorchis 意为分支的睾丸;种加词 sinensis 意为中国的,指其发现于中国患者。",
    discovery:
      "1874 年麦康奈尔在加尔各答华工尸检中首次发现,1875 年科博尔德定名,1907 年洛斯据此建立支睾属。",
    genomeInfo:
      "全基因组测序已完成,为疫苗候选分子与药物靶点研究提供序列基础。",
    ecologyRole:
      "保虫宿主广泛,猫犬猪鼠皆可感染,经螺-鱼-人的水生食物链传播,是典型的食物网寄生者。",
    researchValue:
      "肝吸虫病防治列入全国重点寄生虫病规划,其慢性感染致胆管癌的机制是寄生虫与肿瘤研究的交叉热点。",
    tags: ["医学寄生虫", "人畜共患"],
  },
  {
    rank: "family",
    latin: "Paragonimidae",
    chinese: "并殖科",
    parent: "Plagiorchiida",
    description:
      "并殖科吸虫体肥厚,卵巢与睾丸左右并列,成虫寄生于肺并形成囊肿,需螺与甲壳类两个中间宿主,是肺吸虫病的病原类群。",
  },
  {
    rank: "genus",
    latin: "Paragonimus",
    chinese: "并殖属",
    parent: "Paragonimidae",
    description:
      "并殖属虫体肥厚如豆瓣,生殖器官左右并列,成虫寄生于肺,卫氏并殖吸虫为主要人兽共患病原,虎豹猫犬等皆可感染。",
  },
  {
    rank: "species",
    latin: "Paragonimus westermani",
    chinese: "卫氏并殖吸虫",
    authority: "(Kerbert, 1878)",
    ncbiTaxId: 34504,
    parent: "Paragonimus",
    description:
      "卫氏并殖吸虫俗称肺吸虫,成虫寄生于人肺,引发咳嗽、咯血与烂桃样痰。第一中间宿主为蜷类淡水螺,尾蚴侵入溪蟹与蝲蛄形成囊蚴,人因生食醉蟹而感染。移行至脑部的虫体可致癫痫,是东亚山区重要的食源性寄生虫。",
    morphology: "成虫肥厚椭圆似半粒花生,长 7-12 毫米,活体红棕色,皮棘单生,卵巢与睾丸左右并列。",
    habitat: "成虫寄生于肺形成囊肿,幼虫经螺与蟹类发育,亦可移行至人脑与皮下。",
    distribution: "流行于东亚与东南亚山区溪流蟹类分布区,中国华东与华南为主要疫区。",
    etymology:
      "属名 Paragonimus 意为生殖腺并列,指卵巢与睾丸左右并列;种名纪念荷兰动物园长韦斯特曼。",
    discovery:
      "1878 年克尔伯特依阿姆斯特丹动物园死亡孟加拉虎肺中标本定名,1899 年布劳恩据此建立并殖属。",
    genomeInfo:
      "全基因组数据已发表,为诊断抗原筛选与药物靶点研究提供支撑。",
    ecologyRole:
      "虎、豹、猫、犬等为保虫宿主,经螺蟹两级中间宿主传播,是连接野生动物与人的共患桥梁。",
    researchValue:
      "肺吸虫病防治依赖饮食干预与影像诊断,是流行病学与脑寄生虫病研究的经典病种。",
    tags: ["医学寄生虫", "人畜共患"],
  },
  {
    rank: "genus",
    latin: "Fasciolopsis",
    chinese: "姜片属",
    parent: "Fasciolidae",
    description:
      "姜片属吸虫体大而肥厚,腹吸盘巨大且紧邻口吸盘,寄生于人猪小肠,布氏姜片虫是寄生于人体的最大吸虫。",
  },
  {
    rank: "species",
    latin: "Fasciolopsis buski",
    chinese: "布氏姜片虫",
    authority: "(Lankester, 1857)",
    parent: "Fasciolopsis",
    description:
      "布氏姜片虫是寄生于人体的最大吸虫,虫体肥厚如姜片,长可达七厘米。成虫吸附于小肠,以扁卷螺为中间宿主,囊蚴附着于菱角、荸荠与茭白上,人剥食时经口感染。上世纪中叶前浙江绍兴等种菱地区曾严重流行,重度感染可致肠梗阻与浮肿。",
    morphology: "虫体肥厚叶状,长 20-75 毫米,肉红色,腹吸盘紧邻口吸盘且大数倍,肠支波浪状。",
    habitat: "成虫寄生于十二指肠与空肠,幼虫经扁卷螺与水生植物完成生活史。",
    distribution: "流行于印度、孟加拉至中国与东南亚的水乡菱产区。",
    etymology:
      "属名 Fasciolopsis 意为似片形吸虫;种加词纪念首先发现该虫的英国内科医生巴斯克。",
    discovery:
      "19 世纪中叶伦敦尸检亚洲船员时发现,1857 年兰克斯特定名,20 世纪中国流行区调查阐明其水生植物媒介途径。",
    genomeInfo: "基因组数据有限,研究以形态鉴定、流行病学与免疫诊断为主。",
    ecologyRole:
      "猪是最重要的储存宿主,人畜共栖的水生种植体系是维持其流行的生态基础。",
    researchValue:
      "姜片虫病在我国的消退过程是改水改厕与卫生运动成效的经典例证,至今仍是寄生虫学教学重点。",
    tags: ["医学寄生虫"],
  },
  {
    rank: "family",
    latin: "Dicrocoeliidae",
    chinese: "双腔科",
    parent: "Plagiorchiida",
    description:
      "双腔科吸虫体细长矛形,肠支两支,寄生于胆管,需陆地螺与蚂蚁作中间宿主,生活史涉及著名的蚂蚁攀草行为操纵。",
  },
  {
    rank: "genus",
    latin: "Dicrocoelium",
    chinese: "双腔属",
    parent: "Dicrocoeliidae",
    description:
      "双腔属虫体矛形半透明,寄生于反刍动物胆管,矛形双腔吸虫以操纵蚂蚁行为的传播方式闻名于寄生虫学界。",
  },
  {
    rank: "species",
    latin: "Dicrocoelium dendriticum",
    chinese: "矛形双腔吸虫",
    authority: "(Rudolphi, 1819)",
    ncbiTaxId: 57078,
    parent: "Dicrocoelium",
    description:
      "矛形双腔吸虫形似柳叶刀,寄生于牛羊胆管。其生活史是寄生虫操纵宿主行为的教科书案例:尾蚴进入蚂蚁体内后,一只移居脑神经节,使蚂蚁夜间爬上草叶顶端紧咬不放,连同草叶被牛羊吞食而完成传播。人误食含蚴蚂蚁偶可感染。",
    morphology: "虫体狭长矛形,长 5-15 毫米,半透明,睾丸前后斜列于体中部,肠支直达体末端。",
    habitat: "成虫寄生于牛羊等反刍动物胆管,幼虫经陆地螺与蚂蚁发育。",
    distribution: "温带牧区全球分布,欧洲、北美与中国北方牧区均有流行。",
    etymology:
      "属名 Dicrocoelium 意为双腔,指具两条盲肠的构造;种加词 dendriticum 意为树枝状,指内部构造分支。",
    discovery:
      "1819 年鲁道菲依欧洲家畜胆管标本定名;20 世纪中叶蚁脑寄生与攀草行为被阐明,轰动寄生虫学界。",
    genomeInfo: "线粒体基因组与转录组数据已用于系统发育与流行病学比较研究。",
    ecologyRole:
      "在螺-蚁-草-牛羊链中循环,被操纵的蚂蚁是病原从土壤牧场进入食草动物的载体。",
    researchValue:
      "是寄生虫改变宿主行为的最著名模型,广泛用于寄生虫生态学、神经调控机制研究与科普。",
    tags: ["寄生虫"],
  },

  // ===================== 三、绦虫纲 Cestoda(5 种) =====================
  {
    rank: "species",
    latin: "Taenia saginata",
    chinese: "牛带绦虫",
    authority: "Goeze, 1782",
    ncbiTaxId: 6206,
    parent: "Taenia",
    description:
      "牛带绦虫是人体最长的常见寄生虫之一,成虫可达八米,寄生于人小肠。人是唯一终宿主,牛为中间宿主,囊尾蚴只寄生于牛组织,故人吃未熟牛肉而感染却不会得囊虫病,与猪带绦虫形成关键差异。孕节常主动自肛门逸出,成为诊断线索。",
    morphology: "成虫长 4-8 米,节片逾千,头节方形无小钩,孕节子宫每侧整齐分支 15-30 条。",
    habitat: "成虫寄生于人小肠,囊尾蚴寄生于牛的肌肉与内脏。",
    distribution: "全球性分布,中国内蒙古、新疆与西藏等牧区感染率较高。",
    etymology: "属名 Taenia 意为带;种加词 saginata 意为肥的,指节片肥厚。",
    discovery:
      "1782 年格策定名;其与猪带绦虫在头节小钩与孕节分支上的差异于 19 世纪被厘清,结束长期混称。",
    genomeInfo: "带绦虫比较基因组学已展开,全基因组数据用于种群鉴定与种系判定。",
    ecologyRole:
      "人-牛食物链构成其生活循环,粪便管理与牛肉检疫是传播链上的两道生态闸门。",
    researchValue:
      "牛带绦虫病是肉品卫生检疫必检项目,也是绦虫生理与驱虫药效研究的经典对象。",
    tags: ["医学寄生虫"],
  },
  {
    rank: "genus",
    latin: "Echinococcus",
    chinese: "棘球绦虫属",
    parent: "Taeniidae",
    description:
      "棘球绦虫属成虫仅数毫米,寄生于犬科动物肠道,幼虫在人畜内脏形成包囊并不断增殖,细粒与多房两种所致包虫病危害深重。",
  },
  {
    rank: "species",
    latin: "Echinococcus granulosus",
    chinese: "细粒棘球绦虫",
    authority: "(Batsch, 1786)",
    ncbiTaxId: 6210,
    parent: "Echinococcus",
    description:
      "细粒棘球绦虫成虫仅数毫米,寄生于犬科动物肠内,幼虫却可在人或牛羊肝肺中长成直径数十厘米的棘球蚴囊,即包虫病。囊肿破裂可致过敏性休克,治疗依赖完整手术摘除,严禁随意穿刺。中国西北牧区至今仍是全球高流行区之一。",
    morphology: "成虫长 2-7 毫米,仅 3-4 个节片,头节具顶突与小钩;棘球蚴囊内含子囊与头节砂。",
    habitat: "成虫寄生于犬科动物小肠,棘球蚴寄生于牛羊与人等中间宿主的肝肺。",
    distribution: "全球牧区流行,中国新疆、青海、甘肃、内蒙古与西藏为高发区。",
    etymology:
      "属名 Echinococcus 由希腊语棘与颗粒组成,形容囊内砂粒状头节;种加词意为颗粒状。",
    discovery:
      "1786 年巴奇定名;冰岛 19 世纪凭禁犬与肉品管理成为全球首个消除包虫病的地区,成为公共卫生经典。",
    genomeInfo: "全基因组随 2013 年四绦虫比较基因组计划完成,支撑药物靶点筛选。",
    ecologyRole:
      "犬-家畜循环是主要传播链,狼-野生反刍类循环维持自然疫源性,人是误入的中间宿主。",
    researchValue:
      "包虫病列入国家重点防治寄生虫病,超声筛查加犬驱虫的综合策略在中国西部成效显著。",
    tags: ["医学寄生虫", "人畜共患"],
  },
  {
    rank: "species",
    latin: "Echinococcus multilocularis",
    chinese: "多房棘球绦虫",
    authority: "(Leuckart, 1863)",
    ncbiTaxId: 6211,
    parent: "Echinococcus",
    description:
      "多房棘球绦虫的幼虫称泡球蚴,在肝内像恶性肿瘤一样向外芽殖浸润,所致泡型包虫病被称为虫癌,未经治疗者十年病死率极高。终宿主为狐类,田鼠等为中间宿主,人因误食虫卵而偶然感染。青藏高原是中国最重要的流行区。",
    morphology: "成虫长 1.2-3.7 毫米,较细粒棘球绦虫更小;泡球蚴由无数微小囊泡组成蜂窝状病灶。",
    habitat: "成虫寄生于狐与犬猫小肠,泡球蚴寄生于啮齿类与人的肝脏。",
    distribution: "北半球高纬与高原地区,中国青藏高原与新疆北部为流行区。",
    etymology:
      "种加词 multilocularis 意为多房的,指其泡球蚴由众多小囊泡组成的生长方式。",
    discovery:
      "1863 年洛伊卡特定名;其泡球蚴的浸润性生长曾被早期病理学家误认作肝脏肿瘤,故有虫癌之称。",
    genomeInfo: "与细粒棘球绦虫同为 2013 年比较基因组计划对象,泡球蚴体外培养体系成熟。",
    ecologyRole:
      "狐-鼠循环维持自然疫源地,犬猫捕食鼠类将风险引入人类居住区,人是不再传播的终点宿主。",
    researchValue:
      "泡球蚴可在体外长期培养,是研究绦虫幼虫增殖与筛选新型抗绦虫药物的独特系统。",
    tags: ["医学寄生虫", "人畜共患"],
  },
  {
    rank: "family",
    latin: "Hymenolepididae",
    chinese: "膜壳绦虫科",
    parent: "Cyclophyllidea",
    description:
      "膜壳绦虫科为小型圆叶目绦虫,节片薄而透明,寄生于鼠鸟与人类肠道,微小膜壳绦虫可不经中间宿主而直接感染终宿主。",
  },
  {
    rank: "genus",
    latin: "Hymenolepis",
    chinese: "膜壳绦虫属",
    parent: "Hymenolepididae",
    description:
      "膜壳绦虫属虫体小而节片宽短,顶突可伸缩,寄生于人鼠小肠,微小膜壳绦虫是人体最常见的绦虫之一。",
  },
  {
    rank: "species",
    latin: "Hymenolepis nana",
    chinese: "微小膜壳绦虫",
    parent: "Hymenolepis",
    description:
      "微小膜壳绦虫是寄生于人小肠的小型绦虫,亦是唯一可不需中间宿主、虫卵直接感染人的绦虫。虫卵若在肠内滞留孵出,可造成自身重复感染,儿童因此反复重度感染。鼠类是重要储存宿主,粪口途径在拥挤的卫生不良环境中极易传播。",
    morphology: "成虫长 5-40 毫米,为人体寄生绦虫中最小的一种,节片宽短,顶突具一圈小钩。",
    habitat: "成虫寄生于人鼠小肠,虫卵亦可经蚤类等昆虫中间宿主传播。",
    distribution: "全球分布,温暖潮湿地区与儿童集体机构感染率较高。",
    etymology:
      "属名 Hymenolepis 意为膜质鳞片,指薄而半透明的节片;种加词 nana 意为矮小。",
    discovery:
      "19 世纪中叶定名;其后实验证实虫卵可直接经口感染终宿主,揭示了体内自身重复感染的途径。",
    genomeInfo: "近缘的小鼠膜壳绦虫已随绦虫比较基因组计划测序,可作间接参考。",
    ecologyRole:
      "鼠类储存宿主与拥挤卫生环境共同维持传播,儿童集体机构是高发场所。",
    researchValue:
      "不需中间宿主的简化生活史使其成为研究绦虫与宿主免疫关系的便利模型。",
    tags: ["医学寄生虫"],
  },
  {
    rank: "order",
    latin: "Diphyllobothriidea",
    chinese: "裂头目",
    parent: "Cestoda",
    description:
      "裂头目由传统假叶目重新界定而来,头节具背腹吸槽,虫卵有盖,幼虫称裂头蚴,经桡足类与鱼类传递,成虫寄生于食鱼动物肠道。",
  },
  {
    rank: "family",
    latin: "Diphyllobothriidae",
    chinese: "裂头绦虫科",
    parent: "Diphyllobothriidea",
    description:
      "裂头绦虫科虫体长可达十米,节片宽扁,生殖孔与子宫孔分别开口于节片腹面,阔节裂头绦虫是寄生于人体的最长绦虫。",
  },
  {
    rank: "genus",
    latin: "Diphyllobothrium",
    chinese: "裂头绦虫属",
    parent: "Diphyllobothriidae",
    description:
      "裂头绦虫属成虫寄生于人及食鱼哺乳动物,裂头蚴见于淡水鱼肌肉,人类因生食鱼肉而罹患裂头绦虫病。",
  },
  {
    rank: "species",
    latin: "Diphyllobothrium latum",
    chinese: "阔节裂头绦虫",
    authority: "(Linnaeus, 1758)",
    parent: "Diphyllobothrium",
    description:
      "阔节裂头绦虫是寄生于人体的最长绦虫,记录个体可逾十米。头节仅有背腹两个吸槽,虫卵罕见地带卵盖。其幼虫裂头蚴寄生于狗鱼等淡水鱼肌肉,人因生食鱼肉感染,成虫竞争性夺取宿主维生素 B12,曾致芬兰等地出现绦虫性恶性贫血。",
    morphology: "成虫长可达 10 米,节片三千余,头节具背腹两吸槽;虫卵卵圆形,一端具盖。",
    habitat: "成虫寄生于人及犬猫小肠,幼虫经剑水蚤与淡水鱼完成发育。",
    distribution: "北半球寒温带流行,欧洲、俄罗斯与北美多见,中国东北偶有报告。",
    etymology:
      "属名 Diphyllobothrium 意为双裂的槽,指头节背腹吸槽;种加词 latum 意为宽的。",
    discovery:
      "1758 年林奈定名;19 世纪末芬兰医生确认其与巨幼红细胞性贫血的关系,成为寄生虫致病生理的经典。",
    genomeInfo: "现行分类将其近缘种群细分为多个独立种,线粒体基因组被广泛用于分子鉴定。",
    ecologyRole:
      "桡足类-鱼-食鱼动物食物链构成其循环,水体富营养化推高剑水蚤密度而放大流行风险。",
    researchValue:
      "是绦虫生理学的历史经典,其竞争性夺取维生素 B12 的机制至今被营养学教材引用。",
    tags: ["医学寄生虫"],
  },

  // ===================== 四、线虫动物门 Nematoda(4 种) =====================
  {
    rank: "order",
    latin: "Strongylida",
    chinese: "圆线目",
    parent: "Chromadorea",
    description:
      "圆线目线虫口囊发达或具叶冠,雄虫交合伞辐肋排列是分类依据,寄生于脊椎动物肠道或肺,钩虫类是人类贫血的重要病原。",
  },
  {
    rank: "family",
    latin: "Ancylostomatidae",
    chinese: "钩口科",
    parent: "Strongylida",
    description:
      "钩口科线虫口囊内具钩齿或板齿,成虫寄生于小肠吸血,感染期幼虫经皮肤侵入,是全球性分布的土壤源性寄生虫。",
  },
  {
    rank: "genus",
    latin: "Ancylostoma",
    chinese: "钩口线虫属",
    parent: "Ancylostomatidae",
    description:
      "钩口线虫属口囊具成对钩齿,虫体呈 C 形,寄生于人畜小肠吸血致贫血,十二指肠钩虫为代表种。",
  },
  {
    rank: "species",
    latin: "Ancylostoma duodenale",
    chinese: "十二指肠钩虫",
    authority: "(Dubini, 1843)",
    ncbiTaxId: 51022,
    parent: "Ancylostoma",
    description:
      "十二指肠钩虫以口囊内两对钩齿咬附小肠黏膜,边吸血边分泌抗凝物质,长期感染导致缺铁性贫血与儿童发育障碍。感染性丝状蚴经足底皮肤侵入,农民赤足下田而染,曾造成热带农村大范围「桑叶黄」流行,全球感染人数以亿计。",
    morphology: "虫体细长,雌虫长 10-13 毫米,活体呈 C 形,口囊腹缘具两对钩齿,雌虫尾端有尾刺。",
    habitat: "成虫寄生于小肠,丝状蚴栖于温暖潮湿土壤,经皮肤侵入人体。",
    distribution: "全球温热带分布,中国南北皆有,北方较美洲钩虫更占优势。",
    etymology: "属名 Ancylostoma 意为弯钩状口;种加词 duodenale 指其寄生于十二指肠。",
    discovery:
      "1843 年都比尼于米兰尸检中发现;圣哥达隧道工程的矿工贫血事件使钩虫病成为职业医学的起点。",
    genomeInfo: "功能基因组研究聚焦其抗凝肽与疫苗候选分子的发掘。",
    ecologyRole:
      "幼虫在温暖土壤发育,成虫在肠道吸血,构成经土壤传播的典型土壤源性蠕虫循环。",
    researchValue:
      "钩虫分泌的抗凝多肽是新型抗血栓药物的候选来源,相关疫苗研发亦在推进。",
    tags: ["医学寄生虫"],
  },
  {
    rank: "genus",
    latin: "Necator",
    chinese: "板口线虫属",
    parent: "Ancylostomatidae",
    description:
      "板口线虫属口囊具一对半月形板齿,虫体呈 S 形,寄生于人畜小肠,美洲板口线虫是全球感染人数最多的钩虫。",
  },
  {
    rank: "species",
    latin: "Necator americanus",
    chinese: "美洲板口线虫",
    authority: "(Stiles, 1902)",
    ncbiTaxId: 51031,
    parent: "Necator",
    description:
      "美洲板口线虫即美洲钩虫,口囊内一对板齿咬附肠壁吸血。它原是美洲土著寄生虫,随奴隶贸易扩散至非洲与亚洲,成为全球感染人数最多的钩虫。其分泌的多种抗凝与免疫调控分子,使它成为当今钩虫基因组学与疫苗研究的主要对象。",
    morphology: "虫体较纤细,头端背仰,活体呈 S 形,口囊腹缘具一对半月形板齿,尾端无刺。",
    habitat: "成虫寄生于小肠,幼虫栖于热带潮湿土壤,经皮肤感染。",
    distribution: "全球热带亚热带广布,中国南方为优势钩虫种。",
    etymology: "属名 Necator 意为杀手,指其致贫血之力;种加词 americanus 指其美洲起源。",
    discovery:
      "1902 年美国动物学家斯泰尔斯定名;此后美国南方的钩虫病防治运动成为其公共卫生史的转折点。",
    genomeInfo: "全基因组测序已发表,揭示与吸血和免疫逃避相关的基因家族扩张。",
    ecologyRole:
      "在热带土壤中发育并经皮肤入侵,是全球土壤传播蠕虫病疾病负担的重要构成。",
    researchValue:
      "以其为基础的钩虫疫苗与重组抗凝蛋白研究持续推进,流行病学模型亦多以其为标尺。",
    tags: ["医学寄生虫"],
  },
  {
    rank: "order",
    latin: "Tylenchida",
    chinese: "垫刃目",
    parent: "Chromadorea",
    description:
      "垫刃目线虫具口针,以植物或真菌为食,食道具瓣球,包括根结线虫与茎线虫等重大农业有害类群,经济意义巨大。",
  },
  {
    rank: "family",
    latin: "Meloidogynidae",
    chinese: "根结线虫科",
    parent: "Tylenchida",
    description:
      "根结线虫科雌虫定居性膨大呈囊或梨形,在根内诱生巨细胞形成根结,常见孤雌生殖,是全球作物损失最大的植物寄生线虫类群。",
  },
  {
    rank: "genus",
    latin: "Meloidogyne",
    chinese: "根结线虫属",
    parent: "Meloidogynidae",
    description:
      "根结线虫属雌虫梨形埋于根结内,产卵于胶质卵囊,寄主范围极广,南方根结线虫等数种为害遍及全球农业。",
  },
  {
    rank: "species",
    latin: "Meloidogyne incognita",
    chinese: "南方根结线虫",
    authority: "(Kofoid & White, 1919)",
    ncbiTaxId: 6306,
    parent: "Meloidogyne",
    description:
      "南方根结线虫是全球危害最重的植物寄生线虫之一,二龄幼虫侵入根部诱生巨细胞,形成瘤状根结,寄主植物逾千种。其行孤雌生殖,一虫即可建群,温室与热带农业损失巨大。水平转移获得的纤维素酶基因帮助其消化植物细胞壁,是动物基因跨界获得的著名案例。",
    morphology: "雌虫膨大呈梨形,约 0.5-1 毫米,白色,会阴部具特征花纹;雄虫细长线形。",
    habitat: "栖于植物根内与土壤,危害茄科、葫芦科等几乎所有温带热带作物根部。",
    distribution: "全球温暖地区与温室普遍发生,中国长江流域以南为害尤重。",
    etymology:
      "属名 Meloidogyne 意为瓜形雌虫,指膨大的雌虫;种加词 incognita 意为未知的,形容其曾长期与他种混淆。",
    discovery:
      "1919 年科伊德与怀特定名,1949 年奇特伍德正式建立根结线虫属;2008 年其全基因组与北方根结线虫同年率先发表。",
    genomeInfo:
      "2008 年完成全基因组测序,是最早测序的植物寄生线虫之一,基因组较秀丽隐杆线虫显著缩小。",
    ecologyRole:
      "孤雌生殖使种群增殖极快,与土壤病原真菌协同加剧作物枯萎,是农田生态的隐形破坏者。",
    researchValue:
      "是植物寄生线虫效应子与水平基因转移研究的第一模型,也是抗线虫育种的核心靶标。",
    tags: ["植物病原", "农业害虫"],
  },
  {
    rank: "family",
    latin: "Anguinidae",
    chinese: "粒线虫科",
    parent: "Tylenchida",
    description:
      "粒线虫科虫体细长,口针小,寄生于植物茎叶与种子或取食真菌,小麦粒线虫与茎线虫等是世界性重要有害种。",
  },
  {
    rank: "genus",
    latin: "Ditylenchus",
    chinese: "茎线虫属",
    parent: "Anguinidae",
    description:
      "茎线虫属寄生于植物地下茎块与鳞茎,亦可取食真菌,引起干腐与空腔病变,腐烂茎线虫是重要检疫性有害生物。",
  },
  {
    rank: "species",
    latin: "Ditylenchus destructor",
    chinese: "腐烂茎线虫",
    authority: "Thorne, 1945",
    ncbiTaxId: 166010,
    parent: "Ditylenchus",
    description:
      "腐烂茎线虫钻入植物地下部取食,引起甘薯糠心与马铃薯薯块干腐,是甘薯产区的毁灭性有害生物。四龄幼虫耐干燥休眠,随种薯远距离传播,也能取食真菌度过无寄主期。防治依赖无病种薯、轮作与检疫,各国将其列为重点检疫对象。",
    morphology: "虫体蠕虫形,长 0.8-1.6 毫米,口针细小,尾端渐细而圆,雌雄同形异体。",
    habitat: "栖于薯块、鳞茎与根部组织内,亦可在土壤真菌上取食存活。",
    distribution: "温带地区广布,中国华北与华东甘薯产区为害严重。",
    etymology:
      "属名 Ditylenchus 指垫刃类中具双卵巢的类群;种加词 destructor 意为破坏者,指其致腐能力。",
    discovery:
      "1945 年索恩自马铃薯腐烂薯块中定名;20 世纪随种薯调运全球扩散,促使各国完善检疫制度。",
    genomeInfo: "全基因组测序已见报道,为其食性与寄生适应机制研究提供线索。",
    ecologyRole:
      "兼性寄生,可在真菌基质上繁殖越冬,农田残体与带病土壤构成其重要存储库。",
    researchValue:
      "是植物线虫检疫与无病种薯繁育体系的核心对象,也是抗线虫甘薯育种的攻关标靶。",
    tags: ["植物病原", "农业害虫"],
  },

  // ===================== 五、多孔动物门 Porifera(3 种) =====================
  {
    rank: "order",
    latin: "Spongillida",
    chinese: "淡水海绵目",
    parent: "Demospongiae",
    description:
      "淡水海绵目是唯一成功定居淡水的海绵类群,以芽球度过冰冻与干旱,群体常含共生绿藻而呈绿色,广布全球湖塘与缓流。",
  },
  {
    rank: "family",
    latin: "Spongillidae",
    chinese: "淡水海绵科",
    parent: "Spongillida",
    description:
      "淡水海绵科骨针单轴硅质,芽球具双盘状微骨针,群体壳状或团块状,栖于清洁淡水硬底,针海绵属为全球广布代表。",
  },
  {
    rank: "genus",
    latin: "Spongilla",
    chinese: "针海绵属",
    parent: "Spongillidae",
    description:
      "针海绵属群体壳状或团块状,多因共生绿藻而呈绿色,骨针平滑单轴,以芽球越冬,是北半球最常见淡水海绵。",
  },
  {
    rank: "species",
    latin: "Spongilla fragilis",
    chinese: "脆针海绵",
    authority: "Leidy, 1851",
    parent: "Spongilla",
    description:
      "脆针海绵是淡水中的常见海绵,群体壳状或团块状,因体内共生绿藻而通体翠绿。秋冬环境恶化时,体内生成芽球——一层硅质骨针装甲包裹的休眠细胞团,来春萌发为新个体,是淡水海绵度过冰封与干旱的关键策略。",
    morphology: "群体壳状至不规则团块,常呈鲜绿色;硅质骨针单轴,芽球具双盘状微骨针。",
    habitat: "固着于清洁湖泊、池塘与缓流的石块、枝条及水草表面,滤食为生。",
    distribution: "北美洲与东亚淡水域均有记录,中国南北湖泊池塘常见。",
    etymology:
      "属名 Spongilla 为海绵一词的指小词,意即小海绵;种加词 fragilis 意为脆的,指干燥后易碎。",
    discovery:
      "1851 年美国博物学家雷迪定名;淡水海绵芽球的滞育与萌发实验是动物抗逆研究的早期素材。",
    genomeInfo: "基因组研究尚少,近年以线粒体基因与骨针形态特征进行物种界定。",
    ecologyRole:
      "滤食悬浮微粒并为小型无脊椎提供微生境,对水质敏感,是清洁水体的指示生物。",
    researchValue:
      "芽球耐受冰冻干旱并长期保存活力的机制,为动物休眠与抗逆研究提供独特素材。",
    tags: ["环境指示种"],
  },
  {
    rank: "order",
    latin: "Haplosclerida",
    chinese: "简骨海绵目",
    parent: "Demospongiae",
    description:
      "简骨海绵目骨针简单多为单轴且排列规则,类群庞大,浅海广布,基因组模式海绵昆士兰海绵即属此目,具重要研究价值。",
  },
  {
    rank: "family",
    latin: "Niphatidae",
    chinese: "雪骨海绵科",
    parent: "Haplosclerida",
    description:
      "雪骨海绵科体壁柔软,骨针网状排列,出水孔明显,多为浅海壳状或块状海绵,科名源自希腊语雪,指其骨针洁白。",
  },
  {
    rank: "genus",
    latin: "Amphimedon",
    chinese: "安菲海绵属",
    parent: "Niphatidae",
    description:
      "安菲海绵属群体块状,骨针单轴,分布于印度-太平洋珊瑚礁海域,昆士兰海绵是首个完成全基因组测序的海绵。",
  },
  {
    rank: "species",
    latin: "Amphimedon queenslandica",
    chinese: "昆士兰海绵",
    authority: "Hooper & van Soest, 2006",
    ncbiTaxId: 400682,
    parent: "Amphimedon",
    description:
      "昆士兰海绵生活在澳大利亚大堡礁海域,看似不起眼,却是动物演化研究的明星。2010 年它成为第一种完成全基因组测序的海绵,让科学家得以横向对比海绵与其他动物的基因,追溯神经元、肌肉等动物核心特征的最早起源。",
    morphology: "群体块状至壳状,表面具细密孔网,质地柔软,骨针为硅质单轴。",
    habitat: "固着于昆士兰近岸珊瑚礁海域的硬质基底与礁坪碎屑之间。",
    distribution: "目前已知分布于澳大利亚昆士兰海域,实验室培养系遍布各国。",
    etymology:
      "属名 Amphimedon 源自《奥德赛》中求婚者安菲墨冬之名;种加词 queenslandica 指昆士兰模式产地。",
    discovery:
      "2006 年胡珀与范索斯特依昆士兰标本定名;2010 年其全基因组发表于《自然》,掀起动物起源研究热潮。",
    genomeInfo:
      "全基因组约 1.7 亿碱基对,是首个完成测序的海绵,显示动物核心基因工具箱在海绵期已齐备。",
    ecologyRole:
      "滤食珊瑚礁悬浮物,体内共生微生物群提供代谢支持,是礁区底栖群落的结构组分之一。",
    researchValue:
      "作为海绵分子生物学唯一成熟模式,支撑了动物多细胞化、神经起源与共生研究的诸多突破。",
    tags: ["模式生物"],
  },
  {
    rank: "order",
    latin: "Suberitida",
    chinese: "软木海绵目",
    parent: "Demospongiae",
    description:
      "软木海绵目骨针散布或成束,体质松软,含软海绵科与软木海绵等浅海常见类群,多种为天然产物与药物研究的来源。",
  },
  {
    rank: "family",
    latin: "Halichondriidae",
    chinese: "软海绵科",
    parent: "Suberitida",
    description:
      "软海绵科群体壳状或块状,骨针单轴散布而无规则骨架,体质松软易碎,广布全球浅海,是生物活性物质的重要来源。",
  },
  {
    rank: "genus",
    latin: "Halichondria",
    chinese: "软海绵属",
    parent: "Halichondriidae",
    description:
      "软海绵属体色黄褐至橙,体质酥脆,骨针散布,潮间带常见,冈田软海绵以软海绵酸与抗癌药源闻名于世。",
  },
  {
    rank: "species",
    latin: "Halichondria okadai",
    chinese: "冈田软海绵",
    authority: "(Kadota, 1922)",
    ncbiTaxId: 163232,
    parent: "Halichondria",
    description:
      "冈田软海绵是日本沿岸普通的黄橙色海绵,却深刻影响了现代生物化学。1981 年化学家从中分离出软海绵酸,成为细胞生物学最重要的蛋白磷酸酶抑制剂工具药。此后以其成分为骨架简化而来的抗癌药艾日布林上市,用于治疗晚期乳腺癌。",
    morphology: "群体壳状至瘤状块,黄褐至橙黄色,体质松软易碎,骨针单轴散布体内。",
    habitat: "固着于潮间带至浅海的岩石缝隙与贝壳表面,耐受泥沙环境。",
    distribution: "分布于西北太平洋日本本州至九州沿岸海域。",
    etymology:
      "种加词 okadai 纪念日本动物学家冈田;软海绵酸之名即源自该种学名。",
    discovery:
      "1922 年日本学者门田定名;1981 年橘等从中分离出软海绵酸,随后确立其蛋白磷酸酶抑制活性。",
    genomeInfo: "研究重心在次生代谢产物,基因组层面数据尚少。",
    ecologyRole:
      "滤食沿岸悬浮物,体表微生物与化感物质共同抵御鱼类捕食,是潮间带群落常见成员。",
    researchValue:
      "软海绵酸是磷酸酶研究的通用工具化合物,衍生抗癌药艾日布林已获批上市。",
    tags: ["药物来源物种"],
  },

  // ===================== 六、环节动物门 Annelida(4 种) =====================
  {
    rank: "genus",
    latin: "Whitmania",
    chinese: "金线蛭属",
    parent: "Hirudinidae",
    description:
      "金线蛭属体宽扁,不吸血而吞食螺类等小动物,是中国水域常见大型水蛭,宽体金线蛭是水蛭药材的重要基原动物。",
  },
  {
    rank: "species",
    latin: "Whitmania pigra",
    chinese: "宽体金线蛭",
    authority: "(Whitman, 1884)",
    ncbiTaxId: 486152,
    parent: "Whitmania",
    description:
      "宽体金线蛭是中国水域最常见的「蚂蟥」,体宽扁肥大,背面具金色细纹。与吸血的医蛭不同,它以吞食螺类等小动物为生,却因个头大、易捕捉而长期被大量捕捉干燥,作为药典水蛭的另一基原「蚂蟥」入药,是药材市场流通量最大的水蛭类。",
    morphology: "体长 5-12 厘米,宽扁,背面暗绿褐色具金黄色纵纹,腹面灰白色,体环规则。",
    habitat: "栖于水田、池塘与缓流石下,捕食螺蛳、水蚯蚓等小型底栖动物。",
    distribution: "广泛分布于中国南北各省平原水网地带,亦见于日本与朝鲜半岛。",
    etymology:
      "种加词 pigra 意为迟钝的,形容其行动缓慢;中文以金色细纹与宽扁体形得名金线蛭。",
    discovery:
      "1884 年惠特曼定名;因药典蚂蟥基原身份与野生资源下降,近年其人工养殖研究活跃。",
    genomeInfo: "基因组数据尚少,鉴定研究以线粒体条码与形态特征为主。",
    ecologyRole:
      "螺类捕食者,在淡水底栖食物网中控制螺口密度,对水质与底质变化较为敏感。",
    researchValue:
      "药材需求驱动其营养与繁殖生物学研究,是变温动物药材养殖的代表性课题。",
    tags: ["药用"],
  },
  {
    rank: "species",
    latin: "Hirudo nipponia",
    chinese: "日本医蛭",
    authority: "Whitman, 1886",
    ncbiTaxId: 42736,
    parent: "Hirudo",
    description:
      "日本医蛭是中国药典「水蛭」的主要基原动物,颚板可切开人畜皮肤吸血。其唾液中的水蛭素是已知最强的天然凝血酶抑制剂,由此开发的重组水蛭素与比伐芦定已是临床一线抗凝药物。中医以干燥全体入药用于破血逐瘀,应用逾两千年。",
    morphology: "体长 3-6 厘米,伸展时细长;背面黄绿色具深色纵纹,腹面灰白色,前后吸盘各一。",
    habitat: "栖于水田、池塘与沟渠,昼伏夜出,伏击人畜等温血动物吸血。",
    distribution: "分布于中国各地、日本及俄罗斯远东的淡水水域。",
    etymology: "种加词 nipponia 意为日本的,指模式产地日本;中文称日本医蛭。",
    discovery:
      "1886 年美国动物学家惠特曼定名;其吸血抗凝机制研究催生了水蛭素类抗凝药物。",
    genomeInfo: "研究聚焦唾液腺活性成分,水蛭素家族多肽已获系统鉴定。",
    ecologyRole:
      "暂时性外寄生虫,吸血一顿可耐饥数月,在水田生态中与人畜活动紧密交织。",
    researchValue:
      "水蛭素是抗凝治疗的基石药物之一,活蛭疗法亦用于显微外科淤血引流。",
    tags: ["药用"],
  },
  {
    rank: "genus",
    latin: "Platynereis",
    chinese: "阔沙蚕属",
    parent: "Nereididae",
    description:
      "阔沙蚕属头部感觉器发达,疣足叶片状,栖于岩礁管穴,杜氏阔沙蚕是欧洲演化发育生物学的核心模式种。",
  },
  {
    rank: "species",
    latin: "Platynereis dumerilii",
    chinese: "杜氏阔沙蚕",
    authority: "(Audouin & Milne Edwards, 1833)",
    ncbiTaxId: 6359,
    parent: "Platynereis",
    description:
      "杜氏阔沙蚕是欧洲实验室驯化最成功的海洋环节动物模型:世代短、全年可繁育,胚胎与幼虫透明,体节与神经系统可逐细胞追踪。其受月光调控的月周期产卵节律尤为著名,演化发育生物学以它比较环节动物与脊椎动物的共同祖先蓝图。",
    morphology: "体长 2-4 厘米,头部具两对眼与多根触须,各体节一对叶片状疣足,刚毛成束。",
    habitat: "栖于浅海岩石裂隙与藻丛间的管穴,成熟个体夜间上浮海面繁殖。",
    distribution: "东北大西洋与地中海沿岸,全球实验室均有饲养品系。",
    etymology:
      "种加词 dumerilii 纪念法国动物学家杜梅里;中文按属名意译阔沙蚕,指其宽大疣足。",
    discovery:
      "1833 年奥杜安与米尔恩-爱德华兹依法国海岸标本定名;20 世纪 60 年代在欧洲实验室建立常年繁育体系。",
    genomeInfo: "全基因组测序已完成,约十亿碱基对量级,支撑比较基因组与染色体演化研究。",
    ecologyRole:
      "底栖杂食者,自身为鱼类饵料;大群同步上浮繁殖是浅海食物网的脉冲事件。",
    researchValue:
      "是环节动物演化发育生物学首席模型,月光节律与脑分区保守性研究皆以它取得突破。",
    tags: ["模式生物"],
  },
  {
    rank: "order",
    latin: "Tubificida",
    chinese: "颤蚓目",
    parent: "Oligochaeta",
    description:
      "颤蚓目为淡水底栖寡毛类,体细长多呈红色,耐缺氧,常密集成团于有机质底泥,是水质与沉积物监测的关键类群。",
  },
  {
    rank: "family",
    latin: "Tubificidae",
    chinese: "颤蚓科",
    parent: "Tubificida",
    description:
      "颤蚓科虫体血红色,尾部埋泥而头端摆动滤食,对有机污染耐受性强,现行分类多将本科并入仙女虫科,传统上仍是污底指示核心。",
  },
  {
    rank: "genus",
    latin: "Tubifex",
    chinese: "颤蚓属",
    parent: "Tubificidae",
    description:
      "颤蚓属分泌薄管栖于底泥,群体密度与污染梯度对应,正颤蚓是全球淡水监测与毒理测试的标准物种。",
  },
  {
    rank: "species",
    latin: "Tubifex tubifex",
    chinese: "正颤蚓",
    authority: "(Müller, 1774)",
    ncbiTaxId: 6386,
    parent: "Tubifex",
    description:
      "正颤蚓通体血红色,尾端扎入底泥、头端在水中摆动,密集成团生活于富含有机质的污底,是水体有机污染的经典指示生物。它耐低氧与重金属的生理能力突出,因此成为沉积物毒性测试的标准受试动物;在北美它还是虹鳟眩晕病病原的必经中间宿主,牵动鲑鱼资源管理。",
    morphology: "体细长 1-4 厘米,血红色,体节刚毛细小,常数百条纠结成团生活。",
    habitat: "栖于池塘、湖泊与缓流的底泥,尤喜富有机质甚至缺氧的黑臭底质。",
    distribution: "全球广布,北半球温带水域尤多,中国各水系常见。",
    etymology:
      "属名 Tubifex 意为筑管者,指其分泌薄管栖居;种名重述属名,表明其为模式种。",
    discovery:
      "1774 年米勒定名;20 世纪起成为各国水质生物监测体系的核心指示物种。",
    genomeInfo: "全基因组数据有限,转录组已被用于缺氧与重金属响应研究。",
    ecologyRole:
      "摄食底泥有机碎屑,群落密度反映污染梯度,同时作为底栖食物链基础被鱼类取食。",
    researchValue:
      "是淡水沉积物毒性测试的标准受试生物,亦用于缺氧适应生理与水质评价研究。",
    tags: ["环境指示种"],
  },
];
