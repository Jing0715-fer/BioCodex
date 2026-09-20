import { TaxonSeed } from "../types";

// 鱼纲深扩充种子数据(Task 4-b expansion3)。
// 主题:鱼类 26 物种 —— 鲈形目(鲈/鳜/小丑鱼/朴丽鱼/鲷/石斑/尖吻鲈)、鲀形目(刺鲀/绿鳍斑鲀)、
// 鳗鲡目(欧洲鳗鲡/花鳗鲡)、鮟鱇目(霍氏角鮟鱇)、鲟形目(俄罗斯鲟/美洲匙吻鲟)、
// 鲑形目(银大麻哈鱼/大麻哈鱼/香鱼)、鲤形目(青鱼/鳙/团头鲂/胭脂鱼/稀有鮈鲫)、
// 鲽形目(半滑舌鳎)、软骨鱼纲(巨型蝠鲼/姥鲨/尖吻鲭鲨)。
// 每个物种均含 5 项科学档案字段(etymology / discovery / genomeInfo / ecologyRole / researchValue)。
// species 的 parent 引用两类来源:
//   1) DB 已有分类单元(/tmp/taxa-inventory.tsv,1685 条,含 488 物种):
//      Perciformes / Tetraodontiformes / Tetraodontidae / Anguillidae(鳗鲡属 Anguilla)/
//      Acipenseridae(鲟属 Acipenser)/ Polyodontidae / Salmonidae(太平洋鲑属 Oncorhynchus)/
//      Cyprinidae / Cypriniformes / Pleuronectiformes / Cichlidae / Lamniformes / Lamnidae /
//      Actinopterygii(辐鳍亚纲)/ Chondrichthyes(软骨鱼纲);
//   2) 本文件内先行定义的新中间阶元(2 目 / 13 科 / 20 属)。
// 查重已跳过清单已有物种:尼罗罗非鱼、红鳍东方鲀、翻车鱼、日本鳗鲡、中华鲟、白鲟、
// 达氏鳇、大西洋鲑、虹鳟、草鱼、鲢、鲤、鲫、鲇、大黄鱼、褐牙鲆、大菱鲆、泥鳅、青鳉、
// 斑马鱼、大口黑鲈、斑点叉尾鮰、细鳞鲑、太平洋蓝鳍金枪鱼、日本海马、鲸鲨、噬人鲨、
// 路氏双髻鲨、条纹斑竹鲨、白斑星鲨、孔雀鱼、矛尾鱼。
export const expansion3Fishes: TaxonSeed[] = [
  // ===================== 一、鲈形目 Perciformes(7 种) =====================
  {
    rank: "family",
    latin: "Lateolabracidae",
    chinese: "真鲈科",
    parent: "Perciformes",
    description:
      "真鲈科为西太平洋沿岸的中大型鲈形鱼类,背鳍连续、尾鳍浅叉,广盐性,栖于近海与河口,代表属真鲈俗称海鲈,是重要的海水养殖类群。",
  },
  {
    rank: "genus",
    latin: "Lateolabrax",
    chinese: "真鲈属",
    parent: "Lateolabracidae",
    description:
      "真鲈属为沿岸与河口间的洄游性鲈类,体侧扁,口大,体侧常散布黑色斑点,幼鱼入河口肥育,成鱼近海越冬,通称海鲈、七星鲈。",
  },
  {
    rank: "species",
    latin: "Lateolabrax japonicus",
    chinese: "日本真鲈",
    authority: "(Temminck & Schlegel, 1846)",
    parent: "Lateolabrax",
    description:
      "日本真鲈俗称海鲈、七星鲈,广布西北太平洋沿岸,是广盐性生殖洄游鱼类,秋末由近海进入河口咸淡水区产卵。其生长快、肉质佳,为中国海水网箱养殖与游钓业的当家鲈类;近年研究将中国沿海曾混称「花鲈」的群体分立为近缘种中国花鲈,二者长期被视为同一种。",
    morphology: "体延长而侧扁,披小栉鳞,口大,下颌长于上颌,背部青灰色,体侧与背鳍鳍膜散布黑色斑点。",
    habitat: "栖于近海岩礁、沙泥底与河口半咸水区,可深入淡水,幼鱼常集群于潮间带觅食。",
    distribution: "西北太平洋沿岸,自日本、朝鲜半岛至中国渤海、黄海、东海及南海北部水域。",
    etymology:
      "属名 Lateolabrax 由鲈类古名 lates 与 labrax(海鲈)复合而成;种加词 japonicus 意为日本的,指模式产地日本。",
    discovery:
      "1846 年特明克与施莱格尔依日本标本定名;中国沿海养殖业长期以花鲈统称之,分种后资源与育种研究逐步细化。",
    genomeInfo: "全基因组约 1 Gb,染色体级组装已发表,近缘中国花鲈的参考图谱亦已完成,支撑盐度适应研究。",
    ecologyRole: "沿岸与河口的上层掠食者,捕食小鱼虾,是近海食物网的高层消费者,入河时亦影响淡水群落。",
    researchValue: "中国海水养殖产量最大的鲈类之一,广盐性适应与洄游生理为研究热点,亦为河口生态指示种。",
    tags: ["经济物种"],
  },
  {
    rank: "family",
    latin: "Sinipercidae",
    chinese: "鳜科",
    parent: "Perciformes",
    description:
      "鳜科为东亚特有的淡水鲈形鱼类,背鳍棘部发达,口大而斜裂,体具斑块与斜带,行伏击式捕食,含鳜与少鳞鳜等名优养殖鱼类。",
  },
  {
    rank: "genus",
    latin: "Siniperca",
    chinese: "鳜属",
    parent: "Sinipercidae",
    description:
      "鳜属为东亚江河湖库的伏击型肉食鲈类,体高而侧扁,体侧具暗色斜带与斑块,背鳍硬棘发达,代表种翘嘴鳜即俗称的鳜鱼、桂花鱼。",
  },
  {
    rank: "species",
    latin: "Siniperca chuatsi",
    chinese: "翘嘴鳜",
    authority: "(Basilewsky, 1855)",
    parent: "Siniperca",
    description:
      "翘嘴鳜通称鳜鱼、桂花鱼,是中国东部江河湖库中的顶层伏击型肉食鱼类,背部隆起,口裂大,以小鱼虾为食。其肉质细嫩少刺,自古为席上珍馐,现已突破人工繁殖与配合饲料驯化,成为淡水名优养殖的支柱品种,全基因组选育研究活跃。",
    morphology: "体高而侧扁,背部隆起,口大上位,下颌前突,体黄褐色布不规则黑斑,自吻经眼至背鳍具暗色斜带。",
    habitat: "栖于水质清澈的江河湖泊静水与缓流区,常藏身水草、石穴与障碍物旁伺机伏击猎物。",
    distribution: "中国特有,广布长江中下游、珠江及闽江等水系,南至海南岛,已推广至全国人工养殖。",
    etymology:
      "属名 Siniperca 由拉丁语 sini(中国的)与 perca(鲈)构成,指其为中国特有鲈形鱼;种加词 chuatsi 音译自中文土名「鳜」。",
    discovery:
      "1855 年俄国博物学家巴西列夫斯基依华北标本定名;二十世纪九十年代突破人工繁殖与苗种规模化,奠定养殖产业基础。",
    genomeInfo: "全基因组约 0.8 Gb,染色体级组装已发表,肉食性转化与生长、抗病性状的遗传基础研究活跃。",
    ecologyRole: "淡水顶层伏击型捕食者,调控小型鱼类种群结构,其丰度常被视为湖泊渔业群落状态的指示。",
    researchValue: "中国淡水名优养殖鱼类(桂花鱼),饲料驯化与抗病育种是产业攻关方向,亦是东亚鲈形鱼类演化的研究材料。",
    tags: ["经济物种", "中国特有"],
  },
  {
    rank: "family",
    latin: "Pomacentridae",
    chinese: "雀鲷科",
    parent: "Perciformes",
    description:
      "雀鲷科为珊瑚礁小型鲈形鱼类,侧线中断为上下两部,颌齿刷状,营藻食、浮游食或与海葵共生等多种生活型,是礁区种数最多的鱼科之一。",
  },
  {
    rank: "genus",
    latin: "Amphiprion",
    chinese: "双锯鱼属",
    parent: "Pomacentridae",
    description:
      "双锯鱼属即俗称的小丑鱼,终生与大型海葵共生,体色艳丽具白环带,群体具严格大小等级,先雄后雌的性转变显著,含约三十种。",
  },
  {
    rank: "species",
    latin: "Amphiprion ocellaris",
    chinese: "眼斑双锯鱼",
    authority: "Cuvier, 1830",
    parent: "Amphiprion",
    description:
      "眼斑双锯鱼即水族界著名的公子小丑鱼,栖于印度洋-西太平洋珊瑚礁,终生与大型海葵共生,体表黏液使其免于海葵触手的蜇伤。群体内具严格的等级序位与顺序性雌雄转变,胚体透明,是珊瑚礁共生与鱼类性别决定研究的模式物种,参考基因组已完成测序。",
    morphology: "体椭圆形,橙红色,具三条镶黑边的白色环带,背鳍与臀鳍上各有一枚黑缘眼斑,成体长约 8 厘米。",
    habitat: "终生栖于礁前与潟湖的大型海葵触手间,活动半径不逾宿主周围数米,以浮游生物与藻屑为食。",
    distribution: "印度洋-西太平洋热带海域,自安达曼海、东南亚至大堡礁与澳大利亚西北部,不含印度洋西部。",
    etymology:
      "属名 Amphiprion 由希腊语 amphi(两侧)与 prion(锯)构成,指其颌齿呈锯齿状;种加词 ocellaris 意为具眼状斑的。",
    discovery:
      "1830 年居维叶定名;1970 年代海葵鱼人工繁育技术成熟,使其成为最受欢迎的海水观赏鱼和实验鱼类之一。",
    genomeInfo: "全基因组约 0.9 Gb,已发表染色体级组装,为礁区鱼类共生演化的比较基因组学参照物种。",
    ecologyRole: "与海葵互利共生,为宿主清理坏死组织并借其庇护御敌,是珊瑚礁共生网络的标志性环节。",
    researchValue: "礁鱼类共生生态与性转变机制的模式种,海水观赏鱼繁育与珊瑚礁保护教育的明星种类。",
    tags: ["模式生物", "观赏鱼类"],
  },
  {
    rank: "genus",
    latin: "Haplochromis",
    chinese: "朴丽鱼属",
    parent: "Cichlidae",
    description:
      "朴丽鱼属是东非大湖慈鲷辐射的核心属,曾涵盖维多利亚湖数百物种,口孵护幼、领域行为发达,现存界定为并系,含行为学模式物种布氏朴丽鱼。",
  },
  {
    rank: "species",
    latin: "Haplochromis burtoni",
    chinese: "布氏朴丽鱼",
    authority: "(Günther, 1893)",
    parent: "Haplochromis",
    description:
      "布氏朴丽鱼是东非坦噶尼喀湖流域的口孵慈鲷,部分文献将其置于罗非鲫属 Astatotilapia。其社会组织与神经内分泌机制被广泛研究,优势雄鱼的地位转换可在数日内重塑脑内促性腺激素细胞;其近缘类群在维多利亚湖万年尺度的爆发性辐射,是研究快速物种形成与适应性辐射的经典体系。",
    morphology: "体侧扁而延长,唇厚,口中等大,体灰绿具数条深色纵纹,繁殖期雄鱼泛蓝黄辉光,体长约 10 厘米。",
    habitat: "栖于湖泊沿岸沼泽与河口浅水,底质泥沙,耐受盐度波动,口孵护幼,雄鱼具强烈领域性。",
    distribution: "东非坦噶尼喀湖及其支流沼泽与周边咸淡水湖沼,亦为非洲慈鲷研究常用实验群体来源。",
    etymology:
      "属名 Haplochromis 由希腊语 haploos(单一的)与丽鱼古名 chromis 构成;种加词 burtoni 纪念采集者伯顿。",
    discovery:
      "1893 年贡特尔依伯顿采自坦噶尼喀湖的标本定名;二十世纪七十年代起成为行为神经内分泌学的经典模型。",
    genomeInfo: "全基因组约 1 Gb,已发表参考组装,维多利亚湖慈鲷物种群的比较基因组学资源丰富。",
    ecologyRole: "杂食性口孵慈鲷,摄食藻类与无脊椎动物,是非洲大湖沿岸带鱼类群落与食物网的重要组分。",
    researchValue: "社会行为与神经可塑性研究的重要鱼类模型,亦是快速物种形成与适应性辐射研究的关键类群。",
    tags: ["模式生物"],
  },
  {
    rank: "family",
    latin: "Sparidae",
    chinese: "鲷科",
    parent: "Perciformes",
    description:
      "鲷科为沿岸底栖的中型鲈形鱼类,体高而侧扁,颌齿分化为切齿与臼齿,能压碎贝类与海胆,含真鲷、黑鲷等名贵经济鱼类,多雌雄同体。",
  },
  {
    rank: "genus",
    latin: "Pagrus",
    chinese: "真鲷属",
    parent: "Sparidae",
    description:
      "真鲷属为温带与亚热带沿岸的红色鲷类,体披银红栉鳞,咽齿臼状压食底栖无脊椎动物,代表种真鲷是东亚最重要的海水养殖鲷类。",
  },
  {
    rank: "species",
    latin: "Pagrus major",
    chinese: "真鲷",
    authority: "(Temminck & Schlegel, 1843)",
    parent: "Pagrus",
    description:
      "真鲷是西北太平洋近海的传统名贵海产,体色绯红缀翠蓝星点,喜岩礁沙砾底,寿命可达四十年以上,在日本象征吉庆,中国北方称加吉鱼。作为重要海水养殖对象,其替代蛋白饲料、耐温与生长选育研究持续深入,染色体级基因组图谱已经发表,天然种群则因过度捕捞明显衰退。",
    morphology: "体椭圆形而侧扁,绯红色布翠蓝色小点,背鳍连续具硬棘,尾鳍后缘具黑边,成体可达 1 米。",
    habitat: "栖于岩礁与沙砾底近海,行群体游动,春秋向近岸浅水作生殖移动,主食底栖甲壳类与贝类。",
    distribution: "西北太平洋,自日本列岛、朝鲜半岛至中国的黄海、东海与南海北部近海。",
    etymology:
      "属名 Pagrus 源自古罗马人对真鲷的称呼;种加词 major 意为较大的,指其在同类中体型较大而名贵。",
    discovery:
      "1843 年特明克与施莱格尔依日本标本定名;东亚各国长期以其为庆典与祭祀用鱼,红色寓意吉祥,文化意涵深厚。",
    genomeInfo: "全基因组约 0.8 Gb,染色体级组装已发表,为鲷科性决定机制与经济性状选育提供基因组平台。",
    ecologyRole: "岩礁区底栖捕食者,以臼齿压碎贝类与海胆,调控底栖群落结构,是近海岩礁生态系统的关键消费者。",
    researchValue: "东亚最重要的海水养殖鲷类之一,人工繁育与配合饲料技术成熟,是水产遗传育种的经典对象。",
    tags: ["经济物种"],
  },
  {
    rank: "family",
    latin: "Epinephelidae",
    chinese: "石斑鱼科",
    parent: "Perciformes",
    description:
      "石斑鱼科为暖海礁区中大型鲈形鱼类,口大具犬齿,背鳍连续,体色斑纹多变,普遍雌性先熟、性转变,是华南最重要的海水养殖鱼群。",
  },
  {
    rank: "genus",
    latin: "Epinephelus",
    chinese: "石斑鱼属",
    parent: "Epinephelidae",
    description:
      "石斑鱼属为礁区穴居性伏击鱼类,体被细栉鳞,尾鳍圆形,体色与斑纹极其多样,含斜带石斑鱼等百余种,多见于印度-西太平洋暖水。",
  },
  {
    rank: "species",
    latin: "Epinephelus coioides",
    chinese: "斜带石斑鱼",
    authority: "(Hamilton, 1822)",
    parent: "Epinephelus",
    description:
      "斜带石斑鱼为印度-西太平洋暖水礁区的大型石斑鱼,体侧具橙色斜带与白点,雌性先熟、后转雄性。它是华南与东南亚石斑鱼养殖的第一大种,工厂化循环水与深水网箱养殖规模庞大;天然种群因成鱼过度捕捞与苗期采捕承压,资源养护与雄性化育种研究并行推进。",
    morphology: "体长椭圆形而侧扁,口大,体棕黄色,具橙红色斜纹与散布白点,背鳍具硬棘,尾鳍圆形,成体可达 1 米。",
    habitat: "栖于大陆架岩礁、珊瑚礁与泥沙底海域,喜穴居,昼伏夜出捕食,幼鱼常见于河口红树林区。",
    distribution: "印度-西太平洋暖水区,自非洲东岸经东南亚至华南沿海、台湾与日本南部,养殖遍布东亚。",
    etymology:
      "属名 Epinephelus 源自希腊语 epinephes(似海绵的),指上颌的绒毛状结构;种加词 coioides 意为似古属 Coius 的。",
    discovery:
      "1822 年汉密尔顿依印度河口标本定名;二十世纪末突破批量人工育苗后,成为中国南方石斑鱼养殖产业支柱。",
    genomeInfo: "全基因组约 1.1 Gb,已发表组装与高密度遗传连锁图谱,支撑温度耐受与生长性状的选育研究。",
    ecologyRole: "礁区大型伏击型捕食者,吞食鱼、蟹与头足类,是热带近海岩礁群落的顶层类群,易因捕捞衰退。",
    researchValue: "中国海水鱼养殖产量最大的石斑鱼种,先雌后雄的性控育种与工厂化育苗研究居全球前列。",
    tags: ["经济物种"],
  },
  {
    rank: "family",
    latin: "Latidae",
    chinese: "尖吻鲈科",
    parent: "Perciformes",
    description:
      "尖吻鲈科为非洲与印度-西太平洋暖水的大型河海洄游鲈类,背鳍深凹具硬棘,口大而吻尖,广盐性,含尼罗尖吻鲈等巨型捕食者与养殖种。",
  },
  {
    rank: "genus",
    latin: "Lates",
    chinese: "尖吻鲈属",
    parent: "Latidae",
    description:
      "尖吻鲈属为大型河海洄游鲈类,体银灰带蓝,背鳍前部具硬棘,幼鱼沿岸草丛养育,成鱼深水巡游,成体可逾 2 米,含著名的尼罗尖吻鲈。",
  },
  {
    rank: "species",
    latin: "Lates niloticus",
    chinese: "尼罗尖吻鲈",
    authority: "(Linnaeus, 1758)",
    parent: "Lates",
    description:
      "尼罗尖吻鲈是非洲最大的淡水鱼之一,巨口银灰,成体可达 2 米。二十世纪五六十年代被引入维多利亚湖,借湖中富饶的慈鲷资源迅速成为巨型渔业,亦导致数百种本地特有慈鲷濒危或消失,被生态学教科书视为外来种重塑整个湖泊生态系统的最著名案例,现亦为非洲重要的养殖与捕捞对象。",
    morphology: "体延长而侧扁,背鳍深凹具硬棘,口大,吻尖,体银灰泛蓝,成鱼眼周与口部金黄,最大逾 2 米、200 千克。",
    habitat: "栖于大湖开阔水域与河流深潭,昼间集群,黄昏捕食,幼鱼在沿岸水草丛中养育,成鱼占据深水层。",
    distribution: "原产尼罗河、刚果河与西非诸水系;被引入维多利亚湖、基奥加湖等东非湖泊,养殖遍及热带地区。",
    etymology:
      "属名 Lates 为古希腊语对该类鲈鱼的称呼;种加词 niloticus 意为尼罗河的,指其模式产地尼罗河水系。",
    discovery:
      "1758 年林奈依尼罗河标本定名;1954 年起被引入维多利亚湖,随后引发的湖泊生态剧变成为外来种研究的世界案例。",
    genomeInfo: "全基因组组装已发表,其巨型化生长与伏击捕食适应性状受到比较基因组学关注。",
    ecologyRole: "大湖顶层巨型掠食者,引入后重塑维多利亚湖食物网,导致数十种特有慈鲷局域灭绝,亦催生新渔业经济。",
    researchValue: "外来种引入生态效应的教科书案例,亦为非洲最重要的养殖与捕捞鲈类,资源管理研究持续深入。",
    conservation: "LC",
    tags: ["入侵物种", "经济物种"],
  },

  // ===================== 二、鲀形目 Tetraodontiformes(2 种) =====================
  {
    rank: "family",
    latin: "Diodontidae",
    chinese: "刺鲀科",
    parent: "Tetraodontiformes",
    description:
      "刺鲀科为暖海礁坡的底栖鲀形鱼类,鳞特化为可竖立的长棘,遇敌吞水使体膨大成刺球,颌齿愈合成板状,以贝、蟹与海胆为食。",
  },
  {
    rank: "genus",
    latin: "Diodon",
    chinese: "刺鲀属",
    parent: "Diodontidae",
    description:
      "刺鲀属体被能竖立的长棘,吻短钝,体具大黑斑,遇敌吞水或吞气胀成刺球令捕食者无从下口,广布全球暖海礁区,夜行捕食硬壳猎物。",
  },
  {
    rank: "species",
    latin: "Diodon holocanthus",
    chinese: "六斑刺鲀",
    authority: "Linnaeus, 1758",
    parent: "Diodon",
    description:
      "六斑刺鲀是暖海礁坡的中下层刺鲀,遇敌时吞水或吞气使体膨大成刺球,棘刺竖立,令捕食者无从下口。它体内河鲀毒素含量很低,膨体行为由特化的吞水机制与胃的极限扩张完成,是研究鱼类防御行为与生物浮力调节的常见范例,也是水族馆的常客。",
    morphology: "体短圆,鳞特化为棘,腹部棘长而可竖立,体沙褐色具数枚大黑斑,胀体时呈刺球,体长约 30 厘米。",
    habitat: "昼间潜伏于礁坡洞穴与沙泥底,夜出觅食,以硬壳贝类、海胆与蟹类为食,遇险即膨体御敌。",
    distribution: "全球暖海广布,印度-太平洋与大西洋热带礁区均有,中国见于南海诸岛、台湾与东海沿岸。",
    etymology:
      "属名 Diodon 由希腊语 di-(二)与 odous(齿)构成,指上下颌各愈合成两枚板齿;种加词 holocanthus 意为全刺的。",
    discovery:
      "1758 年林奈定名;其可膨胀的刺球形态自古为沿海渔民熟知,亦是海洋博物学早期铜版画的经典题材。",
    genomeInfo: "本种精细基因组尚未组装,近缘鲀类普遍具 0.4-0.9 Gb 的小型基因组,是比较基因组学热点类群。",
    ecologyRole: "礁区底栖捕食者,压碎硬壳无脊椎动物,膨体防御使其在礁区食物网中近乎没有天敌。",
    researchValue: "鱼类防御行为与浮力调节机制研究的教学案例,亦是海水水族馆的常见展示鱼类。",
    tags: ["观赏鱼类"],
  },
  {
    rank: "genus",
    latin: "Tetraodon",
    chinese: "四齿鲀属",
    parent: "Tetraodontidae",
    description:
      "四齿鲀属为河海交界与淡水的中小型鲀类,颌齿愈合成四枚齿板,遇敌可吞水膨体,含脊椎动物基因组最小的模式物种绿鳍斑鲀。",
  },
  {
    rank: "species",
    latin: "Tetraodon nigroviridis",
    chinese: "绿鳍斑鲀",
    authority: "Bloch & Schneider, 1801",
    parent: "Tetraodon",
    description:
      "绿鳍斑鲀为东南亚河口的中小型四齿鲀,水族市场称「绿河鲀」。它拥有已知最小的脊椎动物基因组之一,仅约 340 Mb,基因间区与重复序列极少,2004 年即完成全基因组测序,成为判定脊椎动物早期全基因组加倍与基因得失的重要参照,是比较基因组学的经典物种。",
    morphology: "体圆筒状,背部绿褐密布黑斑,腹部乳白,眼鲜红,胸鳍基具黑斑,遇敌可吞水膨体,体长约 7 厘米。",
    habitat: "栖于河口红树林、半咸水沼泽与低地河流,可短期进入海水或淡水,底栖,捕食螺贝与小无脊椎动物。",
    distribution: "东南亚至南亚河口半咸水区,自印度、斯里兰卡经中南半岛至印尼诸岛,随水族贸易传播各地。",
    etymology:
      "属名 Tetraodon 由希腊语 tetra(四)与 odous(齿)构成,指颌齿愈合成四枚齿板;种加词 nigroviridis 意为绿黑色的。",
    discovery:
      "1801 年布洛赫与施奈德依印度洋标本定名;2004 年全基因组测序问世,使其成为脊椎动物小基因组研究的旗舰。",
    genomeInfo: "全基因组仅约 340 Mb,为已知最小的脊椎动物基因组之一,2004 年完成测序,基因密度极高。",
    ecologyRole: "河口与红树林的底栖捕食者,压碎螺贝为食,对盐度剧烈波动耐受,是红树林鱼类群落常见成员。",
    researchValue: "比较基因组学的经典参照物种,用于推断脊椎动物祖先核型与全基因组加倍后的基因丢失规律。",
    ncbiTaxId: 117493,
    tags: ["模式生物", "观赏鱼类"],
  },

  // ===================== 三、鳗鲡目 Anguilliformes(2 种)+ 鮟鱇目 Lophiiformes(1 种) =====================
  {
    rank: "species",
    latin: "Anguilla anguilla",
    chinese: "欧洲鳗鲡",
    authority: "(Linnaeus, 1758)",
    parent: "Anguilla",
    description:
      "欧洲鳗鲡在马尾藻海深处产卵,柳叶鳗随湾流漂游约三年抵达欧洲,变态为玻璃鳗后溯河成长,一生跨越七千公里。因人工繁育始终未能实现产业闭环,渔业完全依赖玻璃鳗捕捞,走私猖獗叠加栖息地退化,种群锐减,IUCN 列为极危,是欧洲最受关注的保护鱼类。",
    morphology: "体鳗形,背鳍与臀鳍长而后部相连,成体背部黑褐、腹部银白,性成熟银化时眼径增大,消化道退化。",
    habitat: "玻璃鳗与黄鳗阶段栖于河湖溪流的石缝泥底,夜间觅食,银化后降海向马尾藻海作生殖洄游。",
    distribution: "自北欧至北非的大西洋、波罗的海与地中海沿岸水系,产卵场位于马尾藻海,贯穿大半个海盆。",
    etymology:
      "属名 Anguilla 为鳗的拉丁古名;种加词 anguilla 亦指鳗,属名与种本名同义,是命名法中的经典重复命名。",
    discovery:
      "1758 年林奈定名;1922 年施密特定位其马尾藻海产卵场,其叶状幼体来源之谜历经两百年方才解开。",
    genomeInfo: "全基因组约 1.1 Gb,染色体级图谱已发表;人工繁育近年屡获突破,但尚未实现产业化闭环。",
    ecologyRole: "串联海洋与欧洲内陆河湖的能量纽带,捕食底栖无脊椎动物,亦是鸬鹚、水獭等的重要猎物。",
    researchValue: "人工繁育「最后的难关」,玻璃鳗走私监管与增殖放流是欧盟渔业与保护政策的焦点议题。",
    conservation: "CR",
    tags: ["经济物种", "濒危物种"],
  },
  {
    rank: "species",
    latin: "Anguilla marmorata",
    chinese: "花鳗鲡",
    authority: "(Quoy & Gaimard, 1824)",
    parent: "Anguilla",
    description:
      "花鳗鲡是体型最大的鳗鲡之一,体具云纹状大理石花斑,成体可逾 2 米,广布印度洋-太平洋热带与亚热带河川。其幼鳗溯河而栖,是山溪深潭中的夜行巨物;因拦坝截流、酷渔滥捕与生境破碎,种群明显萎缩,在中国被列为国家二级保护野生动物,放流增殖持续开展。",
    morphology: "体鳗形粗壮,背部与体侧布黄褐色云纹状大理石斑,口大唇厚,背鳍起点远在胸鳍之后,成体逾 1 米。",
    habitat: "栖于山溪深潭、河湾与河口石缝洞穴,夜出捕食鱼虾蟹类,可攀越湿润岩壁与低坝,生态位属顶层。",
    distribution: "印度洋-太平洋广布,东非至东亚、南太平洋诸岛均有;中国见于华南、华东与台湾各水系。",
    etymology:
      "种加词 marmoratus 意为大理石纹的,指其体侧云纹状花斑,中文名「花鳗鲡」亦由此而来。",
    discovery:
      "1824 年法国博物学家依环球航行采于新几内亚的标本定名;种下分类经分子研究多次修订,单元划分仍有讨论。",
    genomeInfo: "全基因组约 1.1 Gb 量级,与欧洲鳗鲡相近,组装资源仍在完善,洄游分化研究方兴未艾。",
    ecologyRole: "热带河川顶层夜行捕食者,压制溪潭鱼虾种群,亦是河流纵向连通性的指示物种。",
    researchValue: "巨鳗保护生物学与河流连通性研究的目标种,中国二级保护野生动物,放流评估实践持续开展。",
    tags: ["国家二级保护"],
  },
  {
    rank: "order",
    latin: "Lophiiformes",
    chinese: "鮟鱇目",
    parent: "Actinopterygii",
    description:
      "鮟鱇目以「钓捕」著称,第一背鳍棘特化为诱捕拟饵,头大口巨,涵盖浅海鮟鱇、躄鱼与深海角鮟鱇等,营底栖伏击或中层诱捕生活。",
  },
  {
    rank: "family",
    latin: "Ceratiidae",
    chinese: "角鮟鱇科",
    parent: "Lophiiformes",
    description:
      "角鮟鱇科为大洋中层带深海鮟鱇,雌鱼体大,拟饵内共生发光细菌诱猎,雄鱼极小,咬附雌体后终生寄生愈合,性二态为脊椎动物之最。",
  },
  {
    rank: "genus",
    latin: "Ceratias",
    chinese: "角鮟鱇属",
    parent: "Ceratiidae",
    description:
      "角鮟鱇属广布各大洋深水带,雌鱼体球状、口巨齿长,头顶拟饵发光诱捕,雄鱼咬附后血管与体壁愈合,终生寄生取营养。",
  },
  {
    rank: "species",
    latin: "Ceratias holboelli",
    chinese: "霍氏角鮟鱇",
    authority: "Krøyer, 1845",
    parent: "Ceratias",
    description:
      "霍氏角鮟鱇是千米以深大洋中层带的角鮟鱇,雌鱼头顶拟饵由共生发光细菌点亮,在永夜中诱捕猎物;雄鱼仅数厘米,咬附雌体后血管愈合、终生寄生,极端性二态使其成为深海生物学最著名的类群。2020 年多物种基因组测序还揭示其丢失了大部免疫识别基因。",
    morphology: "雌鱼体球状,口巨具长犬齿,第一背鳍棘特化为发光拟饵,雄鱼极小,附体后体躯与雌鱼愈合,雌鱼可达 60 厘米。",
    habitat: "栖于大洋中层带至两千米深水,随昼夜作垂直迁移,个体密度极稀,行寄生性交配,终生不见日光。",
    distribution: "全球各大洋深水带广布,自亚极地边缘至热带海域均有采集记录,中国见于南海与东海外海深水。",
    etymology:
      "属名 Ceratias 源自希腊语 keras(角),指其头前延长的发光「钓竿」;种加词 holboelli 纪念丹麦博物学家霍尔博尔。",
    discovery:
      "1845 年丹麦动物学家克勒伊尔依格陵兰海域标本定名;寄生雄鱼初被发现时曾被误立为不同科属的独立种。",
    genomeInfo: "2020 年多种深海鮟鱇的测序显示,行性寄生的角鮟鱇类丢失了主要组织相容性复合体的大部基因。",
    ecologyRole: "深水中层带伏击型捕食者,拟饵诱集鱼虾与头足类,是深海食物网中层消费者的代表类群。",
    researchValue: "极端性二态与免疫基因退化的世界级研究案例,为组织相容机制与免疫演化提供反常参照。",
    tags: ["深海物种"],
  },

  // ===================== 四、鲟形目 Acipenseriformes(2 种) =====================
  {
    rank: "species",
    latin: "Acipenser gueldenstaedtii",
    chinese: "俄罗斯鲟",
    authority: "Brandt & Ratzeburg, 1833",
    parent: "Acipenser",
    description:
      "俄罗斯鲟是里海与黑海水系的溯河产卵鲟类,成体可逾 2 米,曾撑起世界鱼子酱产业的黄金时代。过度捕捞、拦坝截流与栖息地退化使其种群百年间持续崩落,2023 年 IUCN 已将全球现存鲟类全部列为极危;其复杂的多倍化染色体组,亦是研究脊椎动物多倍体基因组演化的宝贵体系。",
    morphology: "体梭形,吻短钝,口腹位横裂,吻腹具四根须,体被五行骨板,背部灰蓝色,成体可达 2 米以上。",
    habitat: "成鱼栖于里海、黑海半咸水沿岸,溯伏尔加河、多瑙河等产卵,幼鲟在河口停留数年后入海肥育。",
    distribution: "里海、黑海与亚速海水系并溯河至东欧诸河;养殖种群遍布中欧、中国等地的鱼子酱农场。",
    etymology:
      "种加词 gueldenstaedtii 纪念俄国博物学家居尔登施泰特,他最早对高加索地区的鱼类区系作系统调查。",
    discovery:
      "1833 年勃兰特与拉茨堡定名;二十世纪末野生鱼子酱贸易濒临崩溃,CITES 随之全面管制鲟类制品国际贸易。",
    genomeInfo: "鲟类古老的多倍化历史使基因组庞大而复杂,染色体级组装近年完成,为多倍体解析提供范本。",
    ecologyRole: "大型底栖捕食者,翻掘底质取食软体动物与多毛类,是里海、黑海沿岸与河口生态系统的关键种。",
    researchValue: "鱼子酱产业的核心养殖鲟种,多倍体基因组演化与鲟类种间杂交研究的重要材料。",
    conservation: "CR",
    tags: ["经济物种"],
  },
  {
    rank: "genus",
    latin: "Polyodon",
    chinese: "匙吻鲟属",
    parent: "Polyodontidae",
    description:
      "匙吻鲟属为北美的滤食性鲟类,吻扁平延长如桨并布满电感受器,口前位张滤,鳃耙细密,现存仅美洲匙吻鲟一种,东亚近缘白鲟已灭绝。",
  },
  {
    rank: "species",
    latin: "Polyodon spathula",
    chinese: "美洲匙吻鲟",
    authority: "(Walbaum, 1792)",
    parent: "Polyodon",
    description:
      "美洲匙吻鲟是密西西比河水系的滤食性鲟类,桨状吻部布满电感受器,可感应浮游动物集群的微弱生物电场,张口滤食,与长江已灭绝的白鲟并称匙吻鲟科的孑遗两属。其引种中国的水库养殖与鱼子酱生产已经成功,野生种群因拦坝截流与盗捕列为易危,人工繁育与放流技术成熟。",
    morphology: "体光滑无鳞,吻扁平延长呈桨状,约占体长三分之一,密布电感受器,口前位,鳃耙细密,尾鳍歪型。",
    habitat: "栖于大中型河流的缓流开阔水道与连通湖库,喜浑水,群游滤食浮游动物,耐低氧能力较强。",
    distribution: "密西西比河流域及墨西哥东北部水系;已引种至中国、俄罗斯与欧洲多国开展水库养殖。",
    etymology:
      "属名 Polyodon 由希腊语 poly(多)与 odous(齿)构成,指幼鱼颌部细齿;种加词 spathula 意为匙形桨状的。",
    discovery:
      "1792 年瓦尔鲍姆定名;二十世纪九十年代引种中国成功,成为水库渔业与新兴鱼子酱产业的重要鱼种。",
    genomeInfo: "2n=60,全基因组约 1.8 Gb,染色体级组装已发表,电感受器发育的分子基础研究受到聚焦。",
    ecologyRole: "河流上层滤食者,大规模摄取浮游动物,桨吻电感应是鱼类中罕见独立演化的弱电感知。",
    researchValue: "鲟类中最成熟的引种养殖对象,电感受与滤食适应演化研究的目标物种。",
    conservation: "VU",
    tags: ["经济物种"],
  },

  // ===================== 五、鲑形目 Salmoniformes(3 种) =====================
  {
    rank: "species",
    latin: "Oncorhynchus kisutch",
    chinese: "银大麻哈鱼",
    authority: "(Walbaum, 1792)",
    parent: "Oncorhynchus",
    description:
      "银大麻哈鱼即银鲑,北太平洋溯河产卵鲑类,幼鱼在淡水生活一至两年后降海,两年后性成熟返河,繁殖后即死。其银灰流线的凶猛体型适于大洋巡游,是美国西海岸与智利鲑鱼养殖业的第二大种,野生种群自阿拉斯加至加利福尼亚多数呈下降趋势,基因组与选育研究成熟。",
    morphology: "体流线形,银蓝色,背部与尾鳍上叶散布黑点,繁殖期雄鱼弓背钩吻、体侧转红,成体 60-80 厘米。",
    habitat: "栖于北太平洋近海与大陆架水域,溯河至中小型清澈溪流,雌鱼筑巢于砾石滩,亲鱼护巢至死。",
    distribution: "环北太平洋两岸,自日本北部、俄远东、阿拉斯加至加利福尼亚;养殖主产于智利与北美西岸。",
    etymology:
      "属名 Oncorhynchus 由希腊语 onkos(钩)与 rhyngchos(吻)构成,指繁殖期雄鱼上弯的钩吻;种加词 kisutch 取自俄语土名。",
    discovery:
      "1792 年瓦尔鲍姆定名;二十世纪七十年代起成为智利海水养殖支柱鱼种,银鲑产业渐与大西洋鲑并列。",
    genomeInfo: "全基因组约 2.4 Gb,2020 年前后完成染色体级组装,支撑生长与抗病的基因组选择育种。",
    ecologyRole: "大洋上层食物网的重要一环,溯河死亡把海洋氮磷输入溪流,滋养整条流域的森林与野生动物。",
    researchValue: "全球第二大养殖鲑类,海洋驯化与早期性成熟演化研究的重要对象。",
    ncbiTaxId: 8023,
    tags: ["经济物种"],
  },
  {
    rank: "species",
    latin: "Oncorhynchus keta",
    chinese: "大麻哈鱼",
    authority: "(Walbaum, 1792)",
    parent: "Oncorhynchus",
    description:
      "大麻哈鱼即狗鲑,是分布最靠北、资源量最大的太平洋鲑类,幼鱼降海后远游至白令海肥育,两三年后跨数千公里精确返乡,繁殖后双双死亡。秋汛盛期成群溯河,溪流为之染红,秋季死于故土的亲鱼滋养着棕熊、水鸟与河岸森林,构成北方流域最壮观的物质流奇观。",
    morphology: "体银白,繁殖期转为暗橄榄紫色,体侧浮现艳红纵纹与斑块,吻弯背弓、犬齿发达,体长 60-70 厘米。",
    habitat: "栖于北太平洋与白令海外洋,秋汛溯河至砾石底质的清澈支流,选择深潭与涌泉带筑巢产卵。",
    distribution: "环北太平洋,自日本、俄远东、白令海峡至北美西北岸;中国仅黑龙江、绥芬河与图们江有生殖洄游。",
    etymology:
      "种加词 keta 取自堪察加半岛的土名;「大麻哈」中文名承自清代东北地方志,指其秋汛成群溯河的渔汛。",
    discovery:
      "1792 年瓦尔鲍姆定名;每年秋季沿黑龙江上溯的洄游盛景,自古就是东北渔事与物候的自然历法。",
    genomeInfo: "全基因组约 2.4 Gb,多份参考组装已发表,洄游导航与产卵时程分化的遗传基础研究活跃。",
    ecologyRole: "洄游死亡把海洋养分输入北方溪流,棕熊与水鸟依赖其丰歉,是北方流域物质流的纽带物种。",
    researchValue: "太平洋鲑渔业最大宗种类,中国仅存的天然溯河鲑,耳石微化学溯源与增殖放流评估的目标种。",
    ncbiTaxId: 8018,
    tags: ["经济物种"],
  },
  {
    rank: "family",
    latin: "Plecoglossidae",
    chinese: "香鱼科",
    parent: "Salmoniformes",
    description:
      "香鱼科为东亚特有的一年生溯河鱼类,口下位具梳状栉齿,背鳍后具脂鳍,以下颌刮食石面藻类,现生仅香鱼一种,古称年鱼。",
  },
  {
    rank: "genus",
    latin: "Plecoglossus",
    chinese: "香鱼属",
    parent: "Plecoglossidae",
    description:
      "香鱼属仅香鱼一种,体窄长具脂鳍,颌齿梳状用于刮食藻类,秋季降海或入湖产卵后亲鱼几乎全数死亡,俗称年鱼。",
  },
  {
    rank: "species",
    latin: "Plecoglossus altivelis",
    chinese: "香鱼",
    authority: "(Temminck & Schlegel, 1846)",
    parent: "Plecoglossus",
    description:
      "香鱼是东亚特有的一年生溯河鱼类,秋季降海产卵后亲鱼几乎全部死亡,翌年幼鱼再溯河成长,故称「年鱼」。它以下颌刮食石面硅藻与蓝藻,口腔后部散发瓜果清香,古为中日溪流的头等河鲜;现以陆封型种群与养殖群体维系产业,增殖放流与基因组研究并进。",
    morphology: "体窄长而银青,被细圆鳞,口下位,上下颌具梳状栉齿,背鳍后具小脂鳍,体侧具淡黄纵带,体长约 20 厘米。",
    habitat: "栖于清澈冷凉的溪河中游,刮食石面藻类与有机碎屑,秋季集群降海或在湖中产卵,陆封型终生居湖。",
    distribution: "东亚特有,自日本、朝鲜半岛至中国辽河、鸭绿江以南诸水系及台湾;多地开展人工增养殖。",
    etymology:
      "属名 Plecoglossus 由希腊语 plekos(编织)与 glossa(舌)构成,指其梳状颌齿;种加词 altivelis 意为高鳍的。",
    discovery:
      "1846 年特明克与施莱格尔依日本标本定名;其瓜香与年鱼生活史自古载于中日典籍,「香鱼」之名流传千年。",
    genomeInfo: "全基因组约 1 Gb,染色体级组装已发表,溯河型与陆封型的分化遗传学是研究热点。",
    ecologyRole: "刮食石面藻类的溪流「清道夫」,衔接初级生产与鱼类群落,其丰度反映溪流富营养化程度。",
    researchValue: "东亚特有名贵河鲜,增殖放流、陆封驯养与养殖技术成熟,是溪流渔业管理的旗舰对象。",
    tags: ["经济物种"],
  },

  // ===================== 六、鲤形目 Cypriniformes(5 种) =====================
  {
    rank: "genus",
    latin: "Mylopharyngodon",
    chinese: "青鱼属",
    parent: "Cyprinidae",
    description:
      "青鱼属为中国东部平原江河的大型底层鲤类,咽齿一行呈臼状,专碾螺蚌为食,体青黑色,仅青鱼一种,位列四大家鱼。",
  },
  {
    rank: "species",
    latin: "Mylopharyngodon piceus",
    chinese: "青鱼",
    authority: "(Richardson, 1846)",
    parent: "Mylopharyngodon",
    description:
      "青鱼是中国「四大家鱼」之一,通体青黑,栖江河深水底层,咽齿粗大如臼,专以螺蚌为食,成体可逾 1 米。在传统池塘混养体系中,它与草鱼、鲢、鳙分别占据底层、中层与上层生态位,相得益彰;1958 年人工繁殖突破后实现全国苗种供应,基因组选育研究不断深化。",
    morphology: "体长筒形,背部青黑、腹部灰白,鳞大,咽齿一行臼状适于碾压螺壳,成体可达 1.4 米、70 千克。",
    habitat: "栖于江河深潭与湖库底层,喜硬底多螺蚌处,冬季集群越冬,食量大,生长快,不耐低氧。",
    distribution: "以中国东部平原水系为主,长江中下游最盛;移植至各地湖库池塘,亦见于俄远东与越南北部。",
    etymology:
      "属名 Mylopharyngodon 由希腊语 myle(磨石)、pharynx(咽)与 odon(齿)构成,指臼状咽齿;种加词 piceus 意为沥青黑的。",
    discovery:
      "1846 年理查森依长江水系标本定名;1958 年四大家鱼人工繁殖技术集体突破,是水产养殖史上的里程碑。",
    genomeInfo: "全基因组约 1.1 Gb,染色体级组装已发表,螺食性咽齿发育与低氧适应研究利用其基因组资源。",
    ecologyRole: "江河底层软体动物的压制者,是唯一以螺蚌为主食的大型鲤类,可抑制水体螺类过度增殖。",
    researchValue: "四大家鱼之一,传统混养体系的底层主角,养殖遗传改良与种质资源研究持续深入。",
    tags: ["经济物种", "驯化物种"],
  },
  {
    rank: "species",
    latin: "Hypophthalmichthys nobilis",
    chinese: "鳙",
    authority: "(Richardson, 1845)",
    parent: "Hypophthalmichthys",
    description:
      "鳙俗称胖头鱼、花鲢,头部几占体长三分之一,栖江河湖库开阔水面,终生滤食浮游动物,与滤食藻类的鲢构成互补,是四大家鱼之一、池塘与大水面渔业的核心放养种,产量长期位居全球淡水养殖鱼类前列。引种欧美后部分地区野化建群,又被视为入侵风险种。",
    morphology: "体侧扁而高大,头大而圆钝,约占体长三分之一,体灰黑散布暗斑,腹棱短,鳃耙密而彼此分离。",
    habitat: "栖于江河干流、湖库与池塘的开阔中上层,群游性强,随浮游动物昼夜垂直迁移而上下觅食。",
    distribution: "原产中国东部各大水系,长江中下游最盛;引种至全球数十国,部分地区野化并形成入侵种群。",
    etymology:
      "属名由希腊语 hypo(下)、ophthalmos(眼)与 ichthys(鱼)构成,指眼位低于头部中轴;种加词 nobilis 意为显赫的。",
    discovery:
      "1845 年理查森依长江标本定名;五十年代末人工繁殖突破后,鳙跃居全球产量最大的淡水养殖鱼类之列。",
    genomeInfo: "2n=48,全基因组组装与高密度遗传图谱均已发表,支撑家系选育与肌间骨发育机制研究。",
    ecologyRole: "上层滤食浮游动物,压控枝角类与桡足类种群,是淡水食物网能量流转的关键环节,亦用于控水净水。",
    researchValue: "四大家鱼之一、全球淡水养殖产量巨头,滤食器官发育与少肌间骨育种研究兼具产业与科学价值。",
    tags: ["经济物种", "驯化物种"],
  },
  {
    rank: "genus",
    latin: "Megalobrama",
    chinese: "鲂属",
    parent: "Cyprinidae",
    description:
      "鲂属为中国江河湖泊的中型草食性鲤类,体高呈菱形,腹棱不完全,背鳍硬棘发达,体侧常具暗纵纹,含团头鲂与三角鲂等。",
  },
  {
    rank: "species",
    latin: "Megalobrama amblycephala",
    chinese: "团头鲂",
    authority: "Yih, 1955",
    parent: "Megalobrama",
    description:
      "团头鲂即名满天下的「武昌鱼」,原仅见于湖北梁子湖水系,体呈菱形而头短钝,草食性。1955 年定名后迅速驯化养殖,翌年「才饮长沙水,又食武昌鱼」的诗句使其家喻户晓;如今已是全国性的池塘与湖库主养鱼,饲料营养与基因组选育研究体系完备。",
    morphology: "体高呈菱形,极侧扁,头短钝,背鳍第三硬棘最强壮,腹棱自腹鳍至肛门,体灰黑,成鱼体侧具暗纵纹。",
    habitat: "栖于湖泊静水与缓流河湾,喜沉水植物茂盛的软泥底,集群活动,主食水草兼浮游生物与碎屑。",
    distribution: "原产长江中下游附属湖泊,模式产地为湖北梁子湖;已推广至全国池塘湖库,并移植多个国家。",
    etymology:
      "属名 Megalobrama 由希腊语 megalo(大)与鲂类旧名 brama 复合;种加词 amblycephala 意为钝头的,指其短圆头形。",
    discovery:
      "1955 年中国鱼类学家易伯鲁依梁子湖标本定名,厘清了「武昌鱼」的物种身份;翌年毛泽东诗句令其名扬天下。",
    genomeInfo: "2n=48,全基因组约 1 Gb,染色体级组装与高密度图谱已发表,饲料转化性状选育研究深入。",
    ecologyRole: "湖泊草食性消费者,牧食沉水植物与周丛生物,是长江中下游湖群鱼类群落的重要组分。",
    researchValue: "中国特色主养鱼,驯化与选育历史脉络清晰,是养殖鱼类遗传改良研究的经典范例。",
    tags: ["经济物种", "驯化物种", "中国特有"],
  },
  {
    rank: "family",
    latin: "Catostomidae",
    chinese: "亚口鱼科",
    parent: "Cypriniformes",
    description:
      "亚口鱼科以北美为分布中心,口腹位、唇厚,咽骨镰刀状,底栖吸食底栖生物,东半球仅孑遗胭脂鱼一属,是洲际间断分布的经典。",
  },
  {
    rank: "genus",
    latin: "Myxocyprinus",
    chinese: "胭脂鱼属",
    parent: "Catostomidae",
    description:
      "胭脂鱼属为东亚亚口鱼科唯一孑遗,背鳍前基隆起似帆,体色随生长由幼鱼横带转为成鱼绯红,仅胭脂鱼一种,栖长江水系。",
  },
  {
    rank: "species",
    latin: "Myxocyprinus asiaticus",
    chinese: "胭脂鱼",
    authority: "(Bleeker, 1864)",
    parent: "Myxocyprinus",
    description:
      "胭脂鱼是中国特有的亚口鱼科孑遗,幼鱼背鳍高耸具三条黑色横带,成鱼体侧绯红沿侧线具胭脂色纵带,俗称「一帆风顺」。它溯长江生殖洄游,曾广布长江与闽江;因拦坝隔断、采卵与航运干扰,种群剧减,列为国家二级保护野生动物,人工繁育与放流保护已持续数十年。",
    morphology: "体侧扁而高,背鳍前基隆起如帆,幼鱼灰褐具三条黑横带,成鱼体侧绯红具胭脂纵带,成体可达 1 米。",
    habitat: "成鱼栖于长江干流中下层,摄食底栖无脊椎动物,春季溯河至上游砾石滩产卵,幼鱼生活于支流缓流带。",
    distribution: "中国特有,主产长江干支流;闽江种群因筑坝阻隔与过度捕捞几近绝迹。",
    etymology:
      "属名 Myxocyprinus 由希腊语 myxa(黏液)与 cyprinus(鲤)构成;种加词 asiaticus 意为亚洲的,指其在东半球的独特地位。",
    discovery:
      "1864 年布莱克尔依中国市场标本定名;其与北美亚口鱼的洲际亲缘,长期被视为动物地理学经典案例。",
    genomeInfo: "基因组保留古老多倍化痕迹,染色体级组装近年发表,为亚口鱼科演化与保护遗传学提供平台。",
    ecologyRole: "东亚孑遗的亚口鱼类,吸食底栖无脊椎动物,其种群存续指示长江干流栖息地的连通状况。",
    researchValue: "亚口鱼科在东亚的唯一孑遗属种,保护遗传结构与放流效果评估研究持续开展。",
    conservation: "CR",
    tags: ["国家二级保护", "中国特有"],
  },
  {
    rank: "genus",
    latin: "Gobiocypris",
    chinese: "鮈鲫属",
    parent: "Cyprinidae",
    description:
      "鮈鲫属为四川山溪特有小型鲤类,形态介于鮈与鲫之间,口亚下位,仅稀有鮈鲫一种,已驯化为中国的水生态毒理学模式鱼。",
  },
  {
    rank: "species",
    latin: "Gobiocypris rarus",
    chinese: "稀有鮈鲫",
    authority: "Ye & Fu, 1983",
    parent: "Gobiocypris",
    description:
      "稀有鮈鲫是四川山区溪流特有的小型鲤类,体不足一掌,却是中国自主建立的水生模式鱼。它寿命短、繁殖快、胚胎发育同步且对污染物敏感,已写入国家与行业水质毒性测试标准,并完成基因组测序,堪称「中国的斑马鱼」,广泛用于生态毒理与环境基准研究。",
    morphology: "体细长而微侧扁,头钝圆,口亚下位,体银灰色,侧线完全,幼鱼体侧常隐现暗色细纹,成体仅 6-8 厘米。",
    habitat: "栖于川西山溪缓流段与河湾沙泥底,喜小砾石与水草边缘,群游,杂食浮游生物与有机碎屑。",
    distribution: "中国四川特有,仅见于岷江中游支流与大渡河部分支流,分布区狭窄,种群数量有限。",
    etymology:
      "属名 Gobiocypris 由鮈类旧名 gobio 与鲤类 cypris 复合,指其似鮈似鲫的过渡形态;种加词 rarus 意为稀有的。",
    discovery:
      "1983 年依四川汉源流沙河标本定名;1990 年代被确立为中国水生态毒理学研究的标准试验鱼种。",
    genomeInfo: "参考基因组已发表,组学资源逐步完善,为本土鱼类的模式化与基因功能研究奠定基础。",
    ecologyRole: "山区溪流小型杂食鱼,摄食浮游与底栖生物,是上游食物网的中间环节,对水质变化敏感。",
    researchValue: "中国标准毒性测试模式鱼,生态毒理、水质基准与内分泌干扰物研究的本土平台物种。",
    tags: ["模式生物", "中国特有"],
  },

  // ===================== 七、鲽形目 Pleuronectiformes(1 种) =====================
  {
    rank: "family",
    latin: "Cynoglossidae",
    chinese: "舌鳎科",
    parent: "Pleuronectiformes",
    description:
      "舌鳎科为两眼位于体左侧的比目鱼类,体舌形而延长,鳞小或裸,无胸鳍,奇鳍前后相连,伏栖于沙泥底海区,含多种名贵经济鱼。",
  },
  {
    rank: "genus",
    latin: "Cynoglossus",
    chinese: "舌鳎属",
    parent: "Cynoglossidae",
    description:
      "舌鳎属为沿岸沙泥底的大型舌鳎类,体长舌形,两眼居左侧,口小下位,雌雄生长差异显著,含重要养殖种半滑舌鳎等百余种。",
  },
  {
    rank: "species",
    latin: "Cynoglossus semilaevis",
    chinese: "半滑舌鳎",
    authority: "Günther, 1873",
    parent: "Cynoglossus",
    description:
      "半滑舌鳎是中国北方近海的名贵比目鱼,两眼位于体左侧,伏底而栖,雌鱼显著大于雄鱼。2014 年其全基因组测序揭示 ZW 型性染色体系统与高温诱导雄鱼伪雌化机制,成为鱼类性别决定与表观遗传研究的经典案例;突破苗种瓶颈后,现已成为环渤海工厂化养殖的支柱品种。",
    morphology: "体舌状延长,两眼居左侧,鳞细小埋于皮下,无胸鳍,背臀尾鳍相连,有眼侧褐色具黑斑,雌鱼远大于雄鱼。",
    habitat: "昼伏夜出,半埋于近海沙泥底,以底栖贝类、多毛类与小虾为食,仔鱼变态后即营底栖生活。",
    distribution: "黄渤海与东海北部近海,朝鲜半岛西岸亦有;野生主产山东、河北近岸,养殖集中于环渤海工厂。",
    etymology:
      "属名 Cynoglossus 由希腊语 kyon(犬)与 glossa(舌)构成,指其长舌状体形;种加词 semilaevis 意为半滑的,指部分鳞片埋于皮下。",
    discovery:
      "1873 年贡特尔定名;2000 年代突破人工育苗,2014 年其 ZW 性染色体基因组研究登上国际顶级期刊。",
    genomeInfo: "全基因组仅约 0.5 Gb,2014 年即完成测序,揭示 ZW 性染色体与温度诱导性逆转的甲基化机制。",
    ecologyRole: "底栖捕食者,压制贝类与多毛类种群,是黄渤海软底群落的中层消费者,天然资源因滥捕锐减。",
    researchValue: "鱼类性别决定与环境型性逆转研究的模式物种,亦是北方工厂化养殖的核心经济鱼类。",
    tags: ["模式生物", "经济物种"],
  },

  // ===================== 八、软骨鱼纲 Chondrichthyes(3 种) =====================
  {
    rank: "order",
    latin: "Myliobatiformes",
    chinese: "鲼形目",
    parent: "Chondrichthyes",
    description:
      "鲼形目为高等鳐类,体盘宽大呈菱形,胸鳍翼状拍水推进,鳃裂腹位,涵盖底栖鳐类与远洋滤食的蝠鲼,多为卵胎生或胎生类群。",
  },
  {
    rank: "family",
    latin: "Mobulidae",
    chinese: "蝠鲼科",
    parent: "Myliobatiformes",
    description:
      "蝠鲼科为大型远洋滤食性鳐类,头鳍一对、内卷导流入食,口前位,鳃裂腹位,每胎仅产一仔,含双吻前口蝠鲼等巨型种。",
  },
  {
    rank: "genus",
    latin: "Manta",
    chinese: "前口蝠鲼属",
    parent: "Mobulidae",
    description:
      "前口蝠鲼属为体盘最宽的鳐类,口前位,头鳍长而内卷,滤食浮游动物,翼展可达七米,近年分子研究主张并入蝠鲼属 Mobula。",
  },
  {
    rank: "species",
    latin: "Manta birostris",
    chinese: "双吻前口蝠鲼",
    authority: "(Walbaum, 1792)",
    parent: "Manta",
    description:
      "双吻前口蝠鲼俗称巨型蝠鲼,翼展可达 7 米,是体型最大的鳐类。它终生滤食浮游动物,常造访清洁站接受鱼类清理体表寄生虫,脑化指数居鱼类之冠;低繁殖率使其对目标渔业与兼捕极为脆弱,近年有分类研究主张将其并入蝠鲼属,在中国连同蝠鲼均列为国家二级保护动物并列入 CITES 附录 II。",
    morphology: "体盘菱形,头鳍一对、内卷如角,口前位,鳃裂腹位,背面黑具白肩斑,腹面白具黑斑,翼展可达 7 米。",
    habitat: "远洋与近海外缘上层巡游,随浮游动物丰度迁徙,常至固定的清洁站接受隆头鱼等清理寄生虫。",
    distribution: "全球暖海外缘与远洋水域,热带大西洋、印度洋至太平洋均有;中国见于南海与台湾周边海域。",
    etymology:
      "属名 Manta 取自西班牙语「披风」,指其宽大如氅的体盘;种加词 birostris 意为具双喙的,指一对可卷的头鳍。",
    discovery:
      "1792 年瓦尔鲍姆定名;2017 年以来的分子与形态研究主张将本属并入蝠鲼属 Mobula,两属划分仍在讨论之中。",
    genomeInfo: "软骨鱼类典型大基因组,约 3-4 Gb,高质量组装近年发表,支撑鳐类比较基因组学起步。",
    ecologyRole: "远洋上层巨型滤食者,大量消费浮游动物与鱼类集群,清洁站网络的核心物种,潜水生态旅游旗舰。",
    researchValue: "鲨鳐保护生物学的旗舰物种,卫星标记与种群遗传结构研究支撑全球养护管理决策。",
    conservation: "EN",
    tags: ["国家二级保护", "旗舰物种"],
  },
  {
    rank: "family",
    latin: "Cetorhinidae",
    chinese: "姥鲨科",
    parent: "Lamniformes",
    description:
      "姥鲨科为巨型滤食性鲨类,鳃裂巨大、几乎环绕体周,鳃耙细长如筛且季节性脱落再生,肝脏巨大富含油脂,现存仅姥鲨一种。",
  },
  {
    rank: "genus",
    latin: "Cetorhinus",
    chinese: "姥鲨属",
    parent: "Cetorhinidae",
    description:
      "姥鲨属为温带海区表层巡游的巨型滤食鲨,口裂深弧,鳃耙密长如筛,行动迟缓而群聚,现存唯姥鲨一种,体长可达 10 米。",
  },
  {
    rank: "species",
    latin: "Cetorhinus maximus",
    chinese: "姥鲨",
    authority: "(Gunnerus, 1765)",
    parent: "Cetorhinus",
    description:
      "姥鲨是仅次于鲸鲨的现存第二大鱼类,体长可达 10 米,张口缓游滤食桡足类等浮游动物,鳃耙冬季脱落、来年再生。它性情温和、常群聚表层,历史上被多国大规模猎捕提炼鱼肝油,种群百年未复;卫星追踪揭示其跨洋深潜迁徙,现为多国重点监测的保护物种。",
    morphology: "体粗大呈梭形,五对鳃裂巨大、几乎环绕体周,鳃耙密长如筛,肝大富含油脂,背面灰褐,体可达 10 米。",
    habitat: "巡游于大陆架表层与浮游动物富集的锋面水团,可深潜逾千米,常侧浮晒暖,群聚滤食桡足类与鱼卵。",
    distribution: "全球温带与亚极海区,北大西洋、北太平洋、南大洋均有记录;中国黄海、东海偶有误捕记录。",
    etymology:
      "属名 Cetorhinus 由希腊语 ketos(海怪)与 rhinos(鼻)构成;种加词 maximus 意为最大的,指其巨大体躯。",
    discovery:
      "1765 年贡内鲁斯依挪威近海标本定名;十九至二十世纪的肝油渔业几乎扫空东北大西洋种群,保护管理延续至今。",
    genomeInfo: "全基因组约 3 Gb 量级,高质量组装已发表,为滤食性鲨类巨型化与缓慢生活史的遗传研究提供参照。",
    ecologyRole: "温带海区巨型滤食者,大规模摄取桡足类,是表层食物网能量流的重要通道,迁徙散布跨洋物质。",
    researchValue: "卫星追踪与种群评估的重点保护物种,鲨类巨型化与滤食适应演化研究的关键案例。",
    conservation: "EN",
    tags: ["旗舰物种"],
  },
  {
    rank: "genus",
    latin: "Isurus",
    chinese: "鲭鲨属",
    parent: "Lamnidae",
    description:
      "鲭鲨属为远洋高速鲨类,体流线形,尾柄侧突发达,尾鳍新月形,具区域温血能力,短程冲刺居鲨类之首,含尖吻鲭鲨等两种。",
  },
  {
    rank: "species",
    latin: "Isurus oxyrinchus",
    chinese: "尖吻鲭鲨",
    authority: "Rafinesque, 1810",
    parent: "Isurus",
    description:
      "尖吻鲭鲨俗称灰鲭鲨,是鼠鲨科的远洋暖血鲨类,短程冲刺为鲨类之最,时速可逾 40 公里;行卵胎生的「子宫内食卵」策略,每胎仅产数尾发育完好的大幼鲨。其肉与鳍经济价值高,延绳钓与流刺网渔业的持续捕获使全球种群下滑,被 IUCN 列为易危,大西洋管理争议经年不休。",
    morphology: "体流线形,吻尖呈锥形,尾柄侧突发达,尾鳍新月形,背面金属深蓝、腹面白色,齿光滑无锯齿如利刃。",
    habitat: "远洋上层与大陆坡水域,随暖流与猎物群巡游,追捕金枪鱼、旗鱼与头足类,可跃出水面数米。",
    distribution: "全球温带与暖海外洋,自大西洋两岸至印度-太平洋均有;中国偶见于东海、台湾以东与南海。",
    etymology:
      "属名 Isurus 由希腊语 isos(相等)与 oura(尾)构成,指尾鳍上下叶约等长;种加词 oxyrinchus 意为尖吻的。",
    discovery:
      "1810 年拉菲内斯克定名;其血管逆流热交换的区域温血机制使肌肉与眼脑保持高于海水温度,游速与视敏俱佳。",
    genomeInfo: "软骨鱼典型大基因组,组装仍在完善,鼠鲨科区域温血适应的比较基因组学研究正在推进。",
    ecologyRole: "远洋顶层掠食者,追捕金枪鱼与旗鱼等高速猎物,跨洋迁徙,调控大洋上层群落结构。",
    researchValue: "鲨类运动生理与区域温血演化的研究焦点,亦为延绳钓渔业兼捕养护的核心对象。",
    conservation: "VU",
    tags: ["经济物种"],
  },
];
