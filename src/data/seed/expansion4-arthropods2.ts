import { TaxonSeed } from "../types";

// 甲壳动物 + 蛛形纲深扩种子数据(Task 6-c expansion4)。
// 主题:十足目 8 种(斑节对虾/脊尾白虾/口虾蛄/远海梭子蟹/红星梭子蟹/锈斑蟳/拟穴青蟹/红螯螯虾)、
// 鞘甲纲-蔓足亚纲藤壶 2 种(纹藤壶/东方小藤壶)、桡足亚纲 2 种(飞马哲水蚤/近邻剑水蚤)、
// 蜘蛛目 7 种(白额高脚蛛/迷宫漏斗蛛/三突花蛛/拟环纹豹蛛/穴居狼蛛/草间钻头蛛/黑色蝇虎)、
// 蝎目 1 种(帝王蝎)、蜱螨亚纲 4 种(人疥螨/屋尘螨/智利小植绥螨/二斑叶螨)。
// 每个物种均含 5 项科学档案字段(etymology / discovery / genomeInfo / ecologyRole / researchValue)。
// species 的 parent 引用两类来源:
//   1) DB 已有分类单元(/tmp/taxa-inventory.tsv,2018 条,含 626 物种):
//      Penaeidae / Palaemonidae / Portunidae / Malacostraca / Decapoda /
//      Crustacea(甲壳亚门)/ Copepoda(桡足亚纲)/ Calanus(哲水蚤属)/ Portunus(梭子蟹属)/
//      Tetranychus(叶螨属)/ Arachnida / Araneae / Scorpiones / Acari;
//   2) 本文件内先行定义的新中间阶元(1 纲 / 1 亚纲 / 5 目 / 15 科 / 20 属,共 42 条)。
// 鞘甲纲 Thecostraca 依现行体系新立并挂甲壳亚门(与 Malacostraca/Maxillopoda 平级,
// 传统颚足纲已被视为多系);蔓足类作其亚纲、无柄目为常见藤壶之目。
// 查重已跳过清单已有物种:美洲螯龙虾 Homarus americanus、日本沼虾 Macrobrachium nipponense、
// 锦绣龙虾 Panulirus ornatus、马氏钳蝎 Mesobuthus martensii(即东亚药用钳蝎)、
// 棒络新妇 Nephila clavata(= 现行 Trichonephila clavata)、朱砂叶螨 Tetranychus cinnabarinus;
// 以红螯螯虾、帝王蝎、穴居狼蛛、二斑叶螨等高把握种替补,物种拉丁名与中文名
// 均经 GBIF Backbone + NCBI Taxonomy 双重核验(查重唯一依据:/tmp/taxa-inventory.tsv)。
// 沿用中国动物志/渔业文献的传统组合:三突花蛛保留 Misumenops tricuspidatus(现行体系多作
// Ebrechtella tricuspidata)、脊尾白虾保留 Exopalaemon carinicauda(部分体系并入 Palaemon),
// 均在对应 description/genomeInfo 中注明,不另立异名条目。
export const expansion4Arthropods2: TaxonSeed[] = [
  // ===================== 一、十足目 Decapoda(8 种) =====================
  {
    rank: "genus",
    latin: "Penaeus",
    chinese: "对虾属",
    parent: "Penaeidae",
    description:
      "对虾属是对虾科模式属,体大侧扁,额角具锯齿,雌雄交接器形态为分种关键;热带与亚热带海域最重要的经济虾类群属之一,含斑节对虾等巨型种。",
  },
  {
    rank: "species",
    latin: "Penaeus monodon",
    chinese: "斑节对虾",
    authority: "Fabricius, 1798",
    parent: "Penaeus",
    ncbiTaxId: 6687,
    description:
      "斑节对虾俗称草虾、虎虾,是对虾属体型最大的种,成虾体重可逾三百克,通体具黑绿与土黄相间的横带。天然分布横跨印度-西太平洋,是全球第二大养殖对虾物种;生长快、耐低盐与高密度,但易患白斑综合征,抗病育种研究持续推进。",
    morphology: "体长可达 33 厘米,头胸甲具肝刺与触角刺,额角侧扁具锯齿;体色深褐,横带明显,步足蓝黄相间具环纹。",
    habitat: "栖于沙泥底近岸与河口海域,稚虾期入红树林与河口低盐水域肥育,夜间捕食底栖动物。",
    distribution: "印度-西太平洋暖水区,东非至日本、澳洲北部;中国见于东海与南海,为华南主要养殖虾种。",
    etymology: "属名 Penaeus 源自希腊语 penaios(可食之虾);种加词 monodon 意为『单齿』,指额角下缘齿数稀少的特征。",
    discovery:
      "1798 年法布里修斯依印度洋标本定名;二十世纪八十年代成为东亚与东南亚养殖支柱,后被凡纳滨对虾超越,近年全基因组选择育种取得进展。",
    genomeInfo: "全基因组约 2 Gb 量级,染色体级组装与高密度遗传图谱已发表,支撑生长、抗病与耐逆性状位点解析。",
    ecologyRole: "底栖杂食-捕食者,夜间摄食多毛类、贝类与小虾;稚虾依赖红树林河口育幼,是沿岸食物网的重要环节。",
    researchValue: "全球第二大养殖虾种;对白斑综合征等病毒病的易感性、耐低氧与低盐适应机理是育种与病害研究的核心课题。",
    tags: ["经济物种"],
  },
  {
    rank: "genus",
    latin: "Exopalaemon",
    chinese: "白虾属",
    parent: "Palaemonidae",
    description:
      "白虾属为西太平洋近岸中小型长臂虾类,体白而半透明,额角细长上扬,第二步足不呈大螯;栖于低盐河口与沿岸,代表种脊尾白虾是中国重要经济虾类。",
  },
  {
    rank: "species",
    latin: "Exopalaemon carinicauda",
    chinese: "脊尾白虾",
    authority: "(Holthuis, 1950)",
    parent: "Exopalaemon",
    ncbiTaxId: 392227,
    description:
      "脊尾白虾俗称白虾,是黄渤海与长江口近岸的中小型优势经济虾类,因腹部末节背面隆起成脊而得名。其耐低盐、耐干露,可在低盐度池塘与虾蟹贝混养系统中高密度养殖;近年分子系统学将其并入广义长臂虾属,但传统名称仍广泛沿用。",
    morphology: "体长 5-9 厘米,甲壳薄而白色微透,额角细长上扬;尾节背缘隆起成脊,步足纤细,第二步足之钳甚小。",
    habitat: "栖于沙泥底近岸浅水、河口与低盐水域,能耐受盐度剧烈波动,冬春季向深水移动。",
    distribution: "中国黄渤海、东海与南海北部,以及朝鲜半岛西岸与日本近岸水域,长江口产量尤丰。",
    etymology: "种加词 carinicauda 由拉丁语 carina(隆脊)与 cauda(尾)复合而成,直指其尾节背脊,中文名由此而来。",
    discovery:
      "1950 年荷兰甲壳动物学家霍尔蒂斯定名;中国渔业统计与养殖文献沿用至今,近年被并入长臂虾属的广义组合。",
    genomeInfo: "全基因组与转录组资源已建立,高密度遗传图谱支撑选育,低盐度适应机理为特色研究方向。",
    ecologyRole: "杂食性底栖者,摄食有机碎屑与小型底栖生物,是河口与近岸食物网的中间环节,亦为多种经济鱼类所食。",
    researchValue: "黄渤海与长江口的重要经济虾类;耐低盐与干露能力突出,是虾蟹贝混养体系与低盐适应研究的模式种。",
    tags: ["经济物种"],
  },
  {
    rank: "order",
    latin: "Stomatopoda",
    chinese: "口足目",
    parent: "Malacostraca",
    description:
      "口足目通称虾蛄或螳螂虾,第二颚足特化为捕击肢,分穿刺型与粉碎型两式,复眼结构极其复杂;全世界逾四百五十种,多为暖海底栖伏击猎手。",
  },
  {
    rank: "family",
    latin: "Squillidae",
    chinese: "虾蛄科",
    parent: "Stomatopoda",
    description:
      "虾蛄科是口足目最大的科,体平扁而尾扇发达,捕击肢为穿刺型,眼柄粗短;多为浅海沙泥底埋栖种,包含重要渔业对象口虾蛄等。",
  },
  {
    rank: "genus",
    latin: "Oratosquilla",
    chinese: "口虾蛄属",
    parent: "Squillidae",
    description:
      "口虾蛄属为西太平洋至印度洋的浅海底栖虾蛄类,体背具纵脊与色纹,捕击肢末端列生倒刺;掘穴而居,代表种口虾蛄是重要渔业资源。",
  },
  {
    rank: "species",
    latin: "Oratosquilla oratoria",
    chinese: "口虾蛄",
    authority: "(De Haan, 1844)",
    parent: "Oratosquilla",
    ncbiTaxId: 337810,
    description:
      "口虾蛄俗称皮皮虾,是西北太平洋最重要的虾蛄渔业物种,春汛渔获以抱卵雌虾最受追捧。其第二颚足为穿刺型捕肢,出击速度以毫秒计;种群具明显的周年与年间波动,是渤海与东海底栖群落的优势种与渔获统计的重点对象。",
    morphology: "体长达 15-18 厘米,背腹扁平,头胸甲小,腹部与尾扇发达;捕击肢镰状,末端列生倒刺,体色青灰具黄褐横纹。",
    habitat: "穴居于沙泥底浅海,穴道呈 U 形,以捕肢伏击小鱼虾与软体动物,冬季深潜越冬。",
    distribution: "西北太平洋温带与亚热带海域,自日本北海道以南、朝鲜半岛至中国渤黄东海及南海北部。",
    etymology: "种加词 oratoria 为拉丁语『演说者』,或与其摩擦发声习性相关;中文俗名皮皮虾广为流行。",
    discovery:
      "1844 年德哈恩依日本标本定名(原置于 Squilla 属,发表于《日本动物志》);渤海种群动态与繁殖生物学研究积累深厚。",
    genomeInfo: "全基因组与转录组资源逐步建立;复眼与色觉相关的视觉基因家族是分子研究的核心兴趣。",
    ecologyRole: "沙泥底群落的伏击型捕食者,压制小型甲壳类、贝类与幼鱼;穴居活动促进底质交换,亦为大型鱼类所食。",
    researchValue: "口足类视觉研究的西太平洋代表种;种群动态与繁殖研究支撑渔汛预报,是渤海虾蛄渔业管理的重要对象。",
    tags: ["经济物种"],
  },
  {
    rank: "species",
    latin: "Portunus pelagicus",
    chinese: "远海梭子蟹",
    authority: "(Linnaeus, 1758)",
    parent: "Portunus",
    ncbiTaxId: 80836,
    description:
      "远海梭子蟹俗称蓝花蟹,雄性双螯与步足呈醒目的蓝紫色斑纹,是印度-西太平洋拖网与流刺网渔业的重要蟹种。其对生境适应力强、生长快,已成为多国海湾与池塘养殖的对象;雄蓝雌紫的两性异色使其成为体色与性选择研究的热门材料。",
    morphology: "头胸甲宽 15-20 厘米,表面颗粒细密;末对步足扁平成桨,雄性螯足与步足具蓝紫与白斑,雌性青灰带紫斑。",
    habitat: "栖于沙泥与贝壳碎屑底质的近海至五十米浅海,幼蟹集群于河口与海草床,夜行性捕食。",
    distribution: "印度-西太平洋暖水海域,自红海、东非至日本、东南亚与澳洲北部,中国以南海产量最高。",
    etymology: "种加词 pelagicus 意为『远洋的』,中文名由此直译;属名 Portunus 为罗马神话中的港口与航行之神。",
    discovery:
      "1758 年林奈作为 Cancer pelagicus 定名;其种下地理变异与雄性蓝螯的体色功能长期受行为生态学关注。",
    genomeInfo: "染色体级基因组组装已见报道,支撑蜕壳调控、眼柄激素与性分化研究;多态性标记用于种群遗传管理。",
    ecologyRole: "活跃的底栖游泳蟹,捕食贝类、甲壳类与小鱼,兼食腐;是近海底栖食物网的中层捕食者。",
    researchValue: "重要经济蟹类与海水养殖新兴对象;雄性蓝紫体色的结构色机理与性选择研究具国际影响。",
    tags: ["经济物种"],
  },
  {
    rank: "species",
    latin: "Portunus sanguinolentus",
    chinese: "红星梭子蟹",
    authority: "(Herbst, 1783)",
    parent: "Portunus",
    ncbiTaxId: 411673,
    description:
      "红星梭子蟹俗称三点蟹,因头胸甲后缘三枚暗红色血斑状圆斑而得名,是印度-西太平洋常见的经济蟹类。其常与远海梭子蟹混栖混捕,在南海与东南亚市场常统称花蟹出售;个体中型、肉质清甜,资源评估多与梭子蟹类一并开展。",
    morphology: "头胸甲宽 10-14 厘米,表面光滑具微细颗粒,鳃区各具一红斑,后缘三枚血斑排成弧线;末对步足桨状。",
    habitat: "栖于沙泥与碎壳底质的近海至三十余米水层,夜间活跃,捕食底栖贝类与甲壳类。",
    distribution: "印度-西太平洋暖水域,自东非、红海至日本、夏威夷与澳洲,中国见于南海与东海。",
    etymology: "种加词 sanguinolentus 意为『血染的』,指其三枚血红色圆斑;中文名『红星』与俗名『三点蟹』皆源于此。",
    discovery:
      "1783 年赫布斯特定名;三斑特征使其成为梭子蟹属中辨识度最高的种类之一,长期纳入南海蟹类渔业统计。",
    genomeInfo: "种内分子条码与种群遗传研究已有积累,全基因组资源相对有限。",
    ecologyRole: "中层底栖捕食者,食贝类、多毛类与小虾;本身为大型鱼类、章鱼与海龟的猎物。",
    researchValue: "区域性经济蟹种;作为梭子蟹属多样性比较与体色斑纹研究的对照种之一。",
    tags: ["经济物种"],
  },
  {
    rank: "genus",
    latin: "Charybdis",
    chinese: "蟳属",
    parent: "Portunidae",
    description:
      "蟳属为梭子蟹科的暖水游泳蟹类,头胸甲宽呈六边形,前侧缘分齿,螯足粗壮;多为近岸岩礁与沙泥底种,锈斑蟳等是重要渔业对象。",
  },
  {
    rank: "species",
    latin: "Charybdis feriata",
    chinese: "锈斑蟳",
    authority: "(Linnaeus, 1758)",
    parent: "Charybdis",
    ncbiTaxId: 65693,
    description:
      "锈斑蟳俗称花蠘、红蟹,头胸甲具红褐与乳白相间的网状花斑,是印度-西太平洋暖水区的重要经济蟹种。其栖息范围广,自潮间带岩礁至百余米沙泥底均有记录,南海产量可观;体色鲜丽而价格高,也是蟹类体色多态研究的常见材料。",
    morphology: "头胸甲宽逾 12 厘米,表面分区隆起,眼区间具锈色横带;螯足长节内缘具强齿,末对步足桨状。",
    habitat: "栖于岩礁、珊瑚礁与沙泥交错的近海底层,夜行性,捕食贝类、甲壳类与小鱼。",
    distribution: "印度-西太平洋广泛分布,自东非至日本、澳洲与夏威夷,中国以南海与东海为多。",
    etymology: "种加词 feriata 意为『节日的』,或指其如盛装般鲜艳的斑纹;中文名取其锈色斑纹。",
    discovery:
      "1758 年林奈作为 Cancer feriatus 定名;长期是南海蟳类渔业统计的主要对象,分类地位历经修订而稳定。",
    genomeInfo: "种群遗传与繁殖生物学研究充分,染色体与基因组研究近年展开,支撑渔业资源评估。",
    ecologyRole: "底栖杂食-捕食者,夜出猎食贝类与小动物,是近岸底层食物网的常见中层消费者。",
    researchValue: "华南重要经济蟹类;蟳属系统发育与体色适应研究的代表种。",
    tags: ["经济物种"],
  },
  {
    rank: "genus",
    latin: "Scylla",
    chinese: "青蟹属",
    parent: "Portunidae",
    description:
      "青蟹属通称青蟹或膏蟹,头胸甲青绿光滑,螯足粗壮,泳足桨状;栖于红树林、河口与泥质滩涂,是印太海域最重要的养殖蟹类群,种级划分长期存争议。",
  },
  {
    rank: "species",
    latin: "Scylla paramamosain",
    chinese: "拟穴青蟹",
    authority: "Estampador, 1950",
    parent: "Scylla",
    ncbiTaxId: 85552,
    description:
      "拟穴青蟹是中国青蟹养殖的主导物种,俗称膏蟹、肉蟹,掘穴栖息于泥质滩涂与红树林缘。青蟹属的种级划分长期混乱,分子研究确认其为独立种并厘清了『锯缘青蟹复合种』的组成;育肥养殖、蟹膏形成机理与人工育苗技术是产业与科研的热点。",
    morphology: "头胸甲宽可达 20 厘米,甲面光滑青绿,前侧缘约九齿;螯足不对称而粗壮,第四对步足特化为泳足。",
    habitat: "穴居于河口泥滩、红树林与养殖塘底,白天匿居洞中,夜出觅食,耐干露与低盐。",
    distribution: "西太平洋与印度洋东部暖水域,自中国东南沿海至东南亚,养殖以福建、广东、广西为盛。",
    etymology: "种加词 paramamosain 源自菲律宾土名 mamosain 加前缀 para(近似);中文名『拟穴』指其掘穴而居的习性。",
    discovery:
      "1950 年菲律宾学者埃斯塔帕多尔定名;2000 年代分子系统学确证青蟹属含多个隐存种,中国养殖群体主要即本种。",
    genomeInfo: "染色体级基因组已发表,支撑家系选育、性早熟与蟹膏品质性状研究;人工育苗技术持续完善。",
    ecologyRole: "红树林与河口滩涂的顶层甲壳类捕食者,掘穴改造底质;幼蟹为大型鱼类与水鸟的猎物。",
    researchValue: "中国海水蟹类养殖中产值最高的类群之一;隐存种鉴定与遗传育种研究具国际影响。",
    tags: ["经济物种"],
  },
  {
    rank: "family",
    latin: "Parastacidae",
    chinese: "拟螯虾科",
    parent: "Decapoda",
    description:
      "拟螯虾科为南半球特有的淡水螯虾科,分布于澳洲、新几内亚、南美与马达加斯加;属种多样,包含世界养殖与观赏的重要螯虾类群。",
  },
  {
    rank: "genus",
    latin: "Cherax",
    chinese: "澳螯虾属",
    parent: "Parastacidae",
    description:
      "澳螯虾属是澳洲与新几内亚最大的淡水螯虾属,逾四十种;螯足壮硕、体色多样,既有养殖种红螯螯虾,也有水族市场追捧的炫色种。",
  },
  {
    rank: "species",
    latin: "Cherax quadricarinatus",
    chinese: "红螯螯虾",
    authority: "(von Martens, 1868)",
    parent: "Cherax",
    ncbiTaxId: 27406,
    description:
      "红螯螯虾俗称澳洲淡水龙虾,原产澳洲北部与新几内亚,雄性螯外缘与体侧具红色斑块,个体可达数百克。它是重要的淡水养殖螯虾,性情温驯、耐密集;也是十足目性别决定与雄性化腺研究的经典模型,引种后在多国形成野外种群。",
    morphology: "体长可达 25 厘米,甲壳青蓝至橄榄色,螯足修长而螯外缘膜区猩红;雄性红螯特征随成熟度加深。",
    habitat: "栖于澳洲北部河流、湖泊与湿润洞窟,昼伏夜出,杂食性,耐低氧与较高水温。",
    distribution: "原产澳洲北部与新几内亚南部;引种至东南亚、美洲与非洲多国,中国以华南养殖为多。",
    etymology: "种加词 quadricarinatus 意为『四条隆线的』,指头胸甲的纵行隆脊;中文名以雄性红螯为标志。",
    discovery:
      "1868 年冯·马滕斯定名;二十世纪八十年代起成为澳洲与多国水产养殖重点,雄性化腺研究使其广为人知。",
    genomeInfo: "性别连锁标记与核型研究充分;基因组学与温度影响性别分化的机理研究近年展开。",
    ecologyRole: "淡水底栖杂食者,掘洞改变岸带结构;引入种群在局部水系形成优势,挤压土著种生存空间。",
    researchValue: "十足目性别控制与雄性化腺移植研究的模式种;水产杂交育种与免疫研究的常用材料。",
    tags: ["经济物种", "驯化物种"],
  },
  // ===================== 二、鞘甲纲 Thecostraca:藤壶(2 种) =====================
  {
    rank: "class",
    latin: "Thecostraca",
    chinese: "鞘甲纲",
    parent: "Crustacea",
    description:
      "鞘甲纲为固着或寄生的甲壳动物,幼体历经无节幼体与金星幼体期,以头部附着变态固着;包括藤壶类与寄生性的异甲类,现生逾千种,多为海生。",
  },
  {
    rank: "subclass",
    latin: "Cirripedia",
    chinese: "蔓足亚纲",
    parent: "Thecostraca",
    description:
      "蔓足亚纲通称藤壶与茗荷,成体固着或寄生于他物,胸肢特化为滤食的蔓足,外壳由钙质板片构成;传统作纲或下纲,现代体系列为鞘甲纲之亚纲。",
  },
  {
    rank: "order",
    latin: "Sessilia",
    chinese: "无柄目",
    parent: "Cirripedia",
    description:
      "无柄目即常见的锥形藤壶,无柄部而壳体直接固着于基底,钙质板片围成圆锥,蔓足伸出壳口滤食;是潮间带到深海的主要固着类群与污损生物主体。",
  },
  {
    rank: "family",
    latin: "Balanidae",
    chinese: "藤壶科",
    parent: "Sessilia",
    description:
      "藤壶科为无柄目大科,壳板六片以上,壁板具管与放射内突,壳口可开闭;全球暖温带海域皆有,纹藤壶等是船底与养殖设施污损的优势类群。",
  },
  {
    rank: "genus",
    latin: "Amphibalanus",
    chinese: "纹藤壶属",
    parent: "Balanidae",
    description:
      "纹藤壶属原为藤壶属的亚属,2004 年依壳板与内部解剖特征分立;种类多栖于中低潮带与污损基面,模式种纹藤壶是全球污损生态研究的标准种。",
  },
  {
    rank: "species",
    latin: "Amphibalanus amphitrite",
    chinese: "纹藤壶",
    authority: "(Darwin, 1854)",
    parent: "Amphibalanus",
    ncbiTaxId: 1232801,
    description:
      "纹藤壶是全球性分布的污损生物标准种,壳口具紫纹,附着于船底、浮标、管道与养殖网具造成巨大经济损失。达尔文 1854 年在藤壶分类体系中对其详加描述;其金星幼体的附着机理与水下粘附物质,至今仍是防污涂层开发的核心模型。",
    morphology: "壳体圆锥形,直径 10-15 毫米,壁板六片,表面光滑或具纵肋;壳口缘紫纹相间,闭壳肌痕明显。",
    habitat: "固着于潮间带下缘至浅海的硬底与人工设施,耐盐度波动与高温,喜硬质附着基。",
    distribution: "全球暖水与温带海域,随航运扩散至各大洋;中国各海区岩岸与污损群落中均为优势种。",
    etymology: "种加词 amphitrite 源自希腊神话海洋女神安菲特里忒;属名 Amphibalanus 由 amphi(环绕)与 balanos(橡实)构成。",
    discovery:
      "1854 年达尔文在《蔓足类专论》中作为 Balanus amphitrite 详述;2004 年移入新立的 Amphibalanus 属;达尔文的藤壶研究为其进化论奠基。",
    genomeInfo: "全基因组测序已发表;附着蛋白、水泥腺分泌物与幼体附着行为的基因解析为防污技术提供靶点。",
    ecologyRole: "污损群落先锋种,为幼鱼等提供荫蔽与饵料;密集成层会覆盖贝类与藻类,改变群落演替方向。",
    researchValue: "国际防污涂料效力评价的标准试验种;金星幼体附着调控与水下粘附机理的分子研究经典。",
    tags: ["污损生物", "入侵物种"],
  },
  {
    rank: "family",
    latin: "Chthamalidae",
    chinese: "小藤壶科",
    parent: "Sessilia",
    description:
      "小藤壶科为耐旱耐温的高潮带藤壶类,壳板四至六片且常愈合成环,无鞘部;常占据潮间带最高分带,是岩岸带状分布格局的指示类群。",
  },
  {
    rank: "genus",
    latin: "Chthamalus",
    chinese: "小藤壶属",
    parent: "Chthamalidae",
    description:
      "小藤壶属为环球热带与暖温带高潮带代表属,壳小而壁板愈合,极耐曝晒与失水;其与下层藤壶的竞争和捕食关系是潮间带生态学经典。",
  },
  {
    rank: "species",
    latin: "Chthamalus challengeri",
    chinese: "东方小藤壶",
    authority: "Hoek, 1883",
    parent: "Chthamalus",
    ncbiTaxId: 261891,
    description:
      "东方小藤壶是西北太平洋岩岸高潮带的优势藤壶,常与低潮带的纹藤壶构成清晰的带状分布格局。种名纪念挑战者号环球科考,标本即采自该航次;耐曝晒与失水能力极强,是岩相潮间带垂直分带研究与气候波动监测的经典指示种。",
    morphology: "壳径仅数毫米,呈低矮圆锥或圆丘状,壁板常愈合,壳口菱形;干露时壳口紧闭以防失水。",
    habitat: "固着于开敞性岩岸与石堤的高潮带,夏季可耐受数小时曝晒,涨水时滤食悬浮颗粒。",
    distribution: "西北太平洋岩岸,自日本北海道至九州、朝鲜半岛与中国黄渤海,为高潮带标志种。",
    etymology: "种加词 challengeri 纪念 1872-1876 年英国挑战者号环球考察;中文名『东方』指其西太平洋分布。",
    discovery:
      "1883 年胡克依挑战者号采集标本定名;百余年来持续作为日本与中国岩岸潮间带分带研究的基准物种。",
    genomeInfo: "基因组资源尚少;分子系统学正逐步厘清其与近缘种的隐存多样性及更新世避难所历史。",
    ecologyRole: "高潮带拓殖先锋,滤食微型浮游生物,为滨螺等提供微地貌,幼体被鱼类与海鸟捕食。",
    researchValue: "潮间带垂直分带、种间竞争与气候变化监测的经典指示种;西北太平洋物候记录逾百年。",
    tags: ["污损生物", "环境指示种"],
  },
  // ===================== 三、桡足亚纲 Copepoda(2 种) =====================
  {
    rank: "species",
    latin: "Calanus finmarchicus",
    chinese: "飞马哲水蚤",
    authority: "(Gunnerus, 1770)",
    parent: "Calanus",
    ncbiTaxId: 6837,
    description:
      "飞马哲水蚤是北大西洋中高纬浮游动物生物量的支柱种,以储脂越冬滞育与昼夜垂直迁移著称,是鲱、鳕幼鱼与须鲸的关键饵料。自 1930 年代起连续浮游生物记录仪计划即以其为气候变化的核心指示种;其分布北移已成为北大西洋暖化的标志性证据。",
    morphology: "体长 2.5-3 毫米,头胸部椭圆,末胸节与第一腹节界限清晰;第一触角长过体,储脂个体体色油蓝。",
    habitat: "栖息于大陆架与深海上层,春夏在表水层滤食硅藻,秋冬深潜逾千米滞育越冬。",
    distribution: "北大西洋中高纬度,自挪威海、纽芬兰滩至北海;随暖水北扩,分布中心持续北移。",
    etymology: "种加词 finmarchicus 意为『芬马克(挪威北部)的』,指其最早产地;中文名沿用旧译。",
    discovery:
      "1770 年挪威主教兼博物学家贡纳鲁斯定名;1931 年起的连续浮游生物记录使其成为监测历史最长的浮游物种。",
    genomeInfo: "基因组庞大,估算达数 Gb 量级;滞育生理、脂代谢与昼夜节律研究正依托基因组工具深入。",
    ecologyRole: "链接硅藻与鱼类鲸类的能量枢纽;越冬脂库构成『脂泵』,将碳输送至深海,调节生物泵效率。",
    researchValue: "海洋生态学、垂直迁移与滞育生理的模式种;近百年的连续浮游记录支撑气候变化研究。",
    tags: ["环境指示种"],
  },
  {
    rank: "order",
    latin: "Cyclopoida",
    chinese: "剑水蚤目",
    parent: "Copepoda",
    description:
      "剑水蚤目为淡水与海洋桡足类,第一触角短于头胸部,两性生殖具精英传递;多为浮游与底栖捕食者,亦含若干寄生支系,淡水类群尤盛。",
  },
  {
    rank: "family",
    latin: "Cyclopidae",
    chinese: "剑水蚤科",
    parent: "Cyclopoida",
    description:
      "剑水蚤科是淡水浮游动物的主要科,体分头胸部与腹部,尾叉刚毛发达,多为捕食性;全球数百种,是湖泊池塘食物网与水质评价的关键类群。",
  },
  {
    rank: "genus",
    latin: "Cyclops",
    chinese: "剑水蚤属",
    parent: "Cyclopidae",
    description:
      "剑水蚤属为淡水桡足类模式属,头部具一枚红色中眼,形如独眼巨人而得名;种类多而形态趋同,广布池塘湖库浮游群落。",
  },
  {
    rank: "species",
    latin: "Cyclops vicinus",
    chinese: "近邻剑水蚤",
    authority: "Uljanin, 1875",
    parent: "Cyclops",
    ncbiTaxId: 1314695,
    description:
      "近邻剑水蚤是欧亚大陆池塘与富营养湖泊的习见浮游桡足类,冬春季种群盛发。其耐低温与缺氧,垂直分布与昼夜迁移节律明显,是淡水食物网中连接藻类与鱼类的重要环节;作为室内毒性试验与淡水生态研究的常用种,已积累百余年观察记录。",
    morphology: "雌体长 1.2-1.8 毫米,头胸部卵圆,中眼红色点状,第一触角短于头长;尾叉刚毛展开,卵囊一对侧挂。",
    habitat: "栖于池塘、湖泊沿岸带与缓流水体,昼潜夜升,冬春季丰度最高,可耐冰下低氧水层。",
    distribution: "欧亚大陆温带至亚热带广布,中国南北各大水系与池塘常见,亦被用作实验种群。",
    etymology: "种加词 vicinus 为拉丁语『邻近的』;属名 Cyclops 借自希腊神话独眼巨人,指其头部中眼。",
    discovery:
      "1875 年俄国学者乌利亚宁定名;淡水生物学与渔业饵料生物学教材中的常见代表,长期用于实验生态研究。",
    genomeInfo: "种内条形码与系统发育研究正推进;全基因组资源尚少,属内隐存种问题受关注。",
    ecologyRole: "杂食-捕食性浮游者,摄食藻类、鞭毛虫与轮虫,本身为幼鱼与枝角类的猎物,可调控藻类水华。",
    researchValue: "淡水食物网结构与生态毒理试验的常用种;剑水蚤属作为部分线虫中间宿主的医学意义亦有记载。",
    tags: ["环境指示种"],
  },
  // ===================== 四、蜘蛛目 Araneae(7 种) =====================
  {
    rank: "family",
    latin: "Sparassidae",
    chinese: "高脚蛛科",
    parent: "Araneae",
    description:
      "高脚蛛科旧称巨蟹蛛科,体躯横长而足极长,行动敏捷,夜间游猎不结网;全球逾千种,多栖热带,若干种随人类宅舍扩散至世界各地。",
  },
  {
    rank: "genus",
    latin: "Heteropoda",
    chinese: "高脚蛛属",
    parent: "Sparassidae",
    description:
      "高脚蛛属为亚洲至澳洲的大型游猎蜘蛛属,足展可达十余厘米,体色褐黄而斑纹隐匿;夜行捕食,白额高脚蛛为宅舍环境最广布的种。",
  },
  {
    rank: "species",
    latin: "Heteropoda venatoria",
    chinese: "白额高脚蛛",
    authority: "(Linnaeus, 1767)",
    parent: "Heteropoda",
    ncbiTaxId: 152925,
    description:
      "白额高脚蛛俗称旯犽、拉牙,是世界热带与亚热带宅舍中最大的常见蜘蛛,雌体足展可达十二厘米。其额区白纹醒目,夜间游猎蟑螂等家庭害虫,被视为天然的居家益虫;虽形貌骇人,但性情羞怯、毒性微弱,基本不主动伤人。",
    morphology: "体扁而足长,雌体足展 10-12 厘米,头胸甲前缘白色横纹显著;步足密布刺毛,腹部背面具人字纹。",
    habitat: "栖于房舍、仓库与庭院墙角缝隙,昼匿夜出,不结网,主动追猎蟑螂、蛾类与小型节肢动物。",
    distribution: "全球热带与亚热带,随航运扩散;中国见于华南、西南与台湾,北方室内偶见。",
    etymology: "种加词 venatoria 为拉丁语『狩猎的』;属名 Heteropoda 由 heteros(异)与 pous(足)构成。",
    discovery:
      "1767 年林奈定名,是最早被科学描述的蜘蛛之一;其全球宅舍扩散史是伴人生物研究的经典案例。",
    genomeInfo: "全基因组资源尚少;性二型与伏击行为研究以形态与行为观察为主,线粒体条码用于扩散史重建。",
    ecologyRole: "宅舍与庭院夜间大型捕食者,压制蟑螂、蛾类等害虫种群,广受民间视为居家益虫。",
    researchValue: "生物防治的民间明星与蜘蛛伴人扩散研究的模型;蜘蛛恐惧症脱敏与科普教育的常用种。",
    tags: ["城市适应种", "生物防治"],
  },
  {
    rank: "family",
    latin: "Agelenidae",
    chinese: "漏斗蛛科",
    parent: "Araneae",
    description:
      "漏斗蛛科结片状网并具漏斗形退居管,网面由辐射丝与螺旋丝铺成,漏斗口外接喇叭面;广布全球草甸与灌丛,对震动定位极敏锐。",
  },
  {
    rank: "genus",
    latin: "Agelena",
    chinese: "漏斗蛛属",
    parent: "Agelenidae",
    description:
      "漏斗蛛属结大型漏斗网居草原灌丛,体中型褐色,行动迅捷;代表种迷宫漏斗蛛是欧洲草甸蜘蛛研究的经典对象。",
  },
  {
    rank: "species",
    latin: "Agelena labyrinthica",
    chinese: "迷宫漏斗蛛",
    authority: "(Clerck, 1757)",
    parent: "Agelena",
    ncbiTaxId: 286032,
    description:
      "迷宫漏斗蛛在草甸与灌丛间结漏斗状巨网,网面宽达数十厘米,蛛匿于漏斗深处凭震动感知猎物。1757 年瑞典学者克勒克在其蜘蛛学开山之作中定名;其网震传导与定位行为长期作为感觉生态学模型,群居倾向与网的扩展结构亦见于行为学研究。",
    morphology: "体长 8-15 毫米,体色灰褐,背甲具两条纵纹,后纺器显著两节;步足细长,受惊闪退入漏斗管。",
    habitat: "栖于草地、路缘与灌木低层的向阳坡面,网口朝南以最大化拦截飞行猎物,卵囊越冬。",
    distribution: "欧洲至中亚温带广布,中国见于北方草原与山地草甸,成蛛夏末秋初盛见。",
    etymology: "种加词 labyrinthica 意为『迷宫的』,指网型;属名 Agelena 源自希腊语,本义为田野之蛛。",
    discovery:
      "1757 年克勒克《瑞典蜘蛛》以本法命名,早于林奈十版《自然系统》一年,是动物双名法的先行文献之一。",
    genomeInfo: "基因组与转录组资源有限;网震感觉与丝蛋白研究以生理生化手段为主。",
    ecologyRole: "草甸群落的中型捕食者,网面拦截蝇、蜂、蛾等飞行虫,卵囊越冬为来年种群之基。",
    researchValue: "蜘蛛感觉生态与织网行为学的经典模型种;也是欧洲农地生境与景观连接度评价的指示种。",
    tags: ["生物防治"],
  },
  {
    rank: "family",
    latin: "Thomisidae",
    chinese: "蟹蛛科",
    parent: "Araneae",
    description:
      "蟹蛛科蜘蛛前两对步足横展如蟹,多不结网而埋伏花叶间伏击,体色常与花色协同;全球两千余种,是农田与花园常见的天敌类群。",
  },
  {
    rank: "genus",
    latin: "Misumenops",
    chinese: "花蛛属",
    parent: "Thomisidae",
    description:
      "花蛛属为小型蟹蛛类,步足横伸,体色绿或黄白常随环境微调;多活动于花枝与嫩梢,伏击小虫,三突花蛛是中国农田的优势天敌蛛。",
  },
  {
    rank: "species",
    latin: "Misumenops tricuspidatus",
    chinese: "三突花蛛",
    authority: "(Fabricius, 1775)",
    parent: "Misumenops",
    ncbiTaxId: 1112414,
    description:
      "三突花蛛是中国农区最习见的花蛛,伏击于棉花、蔬菜与果树的花朵嫩叶间,捕食蚜虫、蓟马、叶蝉与蛾蝶幼虫。其体色随花色渐变,绿底透黄的迷彩极尽隐蔽;作为生物防治评估的基准天敌之一,对化学农药的敏感性长期用于害虫综合治理研究。",
    morphology: "体长 3-6 毫米,雌蛛绿或黄白,腹部梨形且背面红纹隐现;前两对步足显著横展,雄蛛具暗红纵带。",
    habitat: "游猎于草本与灌木的花、叶、果表面,不结网,耐受农区高温,随作物花期转移分布。",
    distribution: "古北界东部至东洋界广布,中国各省区农田、果园与园林极常见,东亚各国亦有记录。",
    etymology: "种加词 tricuspidatus 意为『三尖的』,指雄蛛触肢胫节的三个突起,中文名『三突』由此而来。",
    discovery:
      "1775 年法布里修斯定名;二十世纪中国棉蚜与果树害虫天敌调查确立其为农区蜘蛛群落的优势种之一。",
    genomeInfo: "现行体系多将其移入新组合 Ebrechtella 属;基因资源尚少,种群遗传以线粒体条码为主。",
    ecologyRole: "农田花层伏击者,日捕蚜虫等小虫数十头,压制作物苗期与花期虫害,与狼蛛科构成天敌互补。",
    researchValue: "中国害虫生物防治与农药生态风险评估的基准天敌蛛;体色可塑与伏击策略的行为研究材料。",
    tags: ["生物防治"],
  },
  {
    rank: "family",
    latin: "Lycosidae",
    chinese: "狼蛛科",
    parent: "Araneae",
    description:
      "狼蛛科为游猎型蜘蛛大科,眼式四列而前中眼大,视力敏锐;雌蛛携卵囊于纺器,幼蛛攀附母背数日;遍布全球,是农田生防主力类群。",
  },
  {
    rank: "genus",
    latin: "Lycosa",
    chinese: "狼蛛属",
    parent: "Lycosidae",
    description:
      "狼蛛属为狼蛛科模式属,体较大而粗壮,掘穴而居,夜间出穴游猎;欧洲塔兰图拉毒蛛传说与亚洲的穴居狼蛛均出自本属。",
  },
  {
    rank: "species",
    latin: "Lycosa singoriensis",
    chinese: "穴居狼蛛",
    authority: "(Laxmann, 1770)",
    parent: "Lycosa",
    ncbiTaxId: 434756,
    description:
      "穴居狼蛛是中国西北荒漠草原最大的有毒蜘蛛,成蛛体长近三厘米,筑垂直深穴并加活盖,夜间守穴捕猎。其毒液较强,新疆等地夏秋咬伤病例时有报告,局部剧痛并伴全身症状;穴居习性与毒液活性成分使其成为蛛毒与荒漠生态研究的代表种。",
    morphology: "体长 25-30 毫米,体色灰褐密毛,背甲正中纵纹与放射纹明显;螯肢粗壮,穴口缠丝并覆碎土活盖。",
    habitat: "栖于荒漠草原、戈壁与农田边缘,穴深可达数十厘米,夜间伏击甲虫与直翅类等猎物。",
    distribution: "自东欧、中亚至蒙古与中国西北,新疆、内蒙古荒漠带种群密度较高。",
    etymology: "种加词 singoriensis 源自西伯利亚地名;中文名取其掘穴而居的鲜明习性。",
    discovery:
      "1770 年俄国博物学家拉克斯曼定名;二十世纪以来新疆蛛伤流行病学资料使其广受医学界关注。",
    genomeInfo: "毒腺转录组研究揭示多样的神经毒素成分;全基因组与系统地理学研究尚待深入。",
    ecologyRole: "荒漠地表与穴口的伏击型捕食者,压制甲虫与直翅类等植食性昆虫;本身为鸟类与蜥蜴所捕食。",
    researchValue: "中国蛛伤医学与蛛毒蛋白研究的重点种;荒漠穴居行为与活盖构造亦有行为学报道。",
    tags: ["生物防治", "有毒动物"],
  },
  {
    rank: "genus",
    latin: "Pardosa",
    chinese: "豹蛛属",
    parent: "Lycosidae",
    description:
      "豹蛛属是狼蛛科最大属之一,体中小而步足修长,背甲正中条斑分叉;广布全球,是湿地草甸与稻田的游猎优势蛛类,含数百种。",
  },
  {
    rank: "species",
    latin: "Pardosa pseudoannulata",
    chinese: "拟环纹豹蛛",
    authority: "(Bösenberg & Strand, 1906)",
    parent: "Pardosa",
    ncbiTaxId: 330961,
    description:
      "拟环纹豹蛛是亚洲稻区最具代表性的游猎蜘蛛,不结网,昼夜巡行稻株基部捕食飞虱、叶蝉与螟虫幼虫。稻田蛛量高峰期每平方米可达数头,对稻飞虱的自然控制被誉为害虫综合治理的基石;其对拟除虫菊酯等农药敏感,长期用作生防安全性与农药生态风险的评价物种。",
    morphology: "体长 4-8 毫米,雌蛛背甲正中条斑呈 T 形,腹部背面具矛形心斑与黄白环纹;步足具轮纹,雄蛛色深。",
    habitat: "游猎于稻田、沟渠湿地与低草丛,受惊疾走善跳跃,白色卵囊由母蛛随身携带。",
    distribution: "东亚、南亚与东南亚稻作区,中国南方各稻区均为优势蛛种,亦分布至新几内亚。",
    etymology: "种加词 pseudoannulata 由 pseudo(拟)与 annulatus(环纹)复合;中文名直接译自此词。",
    discovery:
      "1906 年伯森伯格与斯特兰德依日本标本定名;上世纪中国稻飞虱生防普查确立其稻田优势地位。",
    genomeInfo: "染色体级基因组组装近年发表,为稻田天敌保护利用与农药敏感性研究提供分子基础。",
    ecologyRole: "稻田表层游猎者,成幼蛛日均捕食飞虱若虫多头,是水稻害虫自然控制的核心天敌。",
    researchValue: "水稻害虫综合治理与天敌保护利用的核心物种;捕食功能反应与农药风险评价的标准试验蛛。",
    tags: ["生物防治"],
  },
  {
    rank: "family",
    latin: "Linyphiidae",
    chinese: "皿蛛科",
    parent: "Araneae",
    description:
      "皿蛛科是蜘蛛目最大科之一,结水平片网,常群集成毯;体多微小,西方俗称钱蛛;全球近五千种,农地与温带灌丛极盛。",
  },
  {
    rank: "genus",
    latin: "Hylyphantes",
    chinese: "钻头蛛属",
    parent: "Linyphiidae",
    description:
      "钻头蛛属为东亚小型皿蛛,体长仅数毫米,黑色光亮;片网织于植株下层,草间钻头蛛是中国农区极常见的微小型天敌蛛。",
  },
  {
    rank: "species",
    latin: "Hylyphantes graminicola",
    chinese: "草间钻头蛛",
    authority: "(Sundevall, 1830)",
    parent: "Hylyphantes",
    ncbiTaxId: 259057,
    description:
      "草间钻头蛛是中国农区数量最大的微小型皿蛛,体黑而仅数毫米,在稻、棉、豆植株下层结水平片网,捕食飞虱、蚜虫与摇蚊等小虫。其幼蛛常以丝气球随风飞航扩散;全基因组测序已发表,是蛛类基因组学与农田天敌种群研究的双层模式。",
    morphology: "体长 2-3 毫米,雄蛛亮黑,雌蛛暗褐;腹部椭圆,片网水平,网上方覆不规则支持丝。",
    habitat: "栖于农田、草地与林缘灌丛下部,网布于叶层之间;幼蛛借丝球飞航远距扩散,重建田间种群。",
    distribution: "古北界至东洋界广布,中国各大农区均为皿蛛科优势种,田间密度随季节波动显著。",
    etymology: "种加词 graminicola 由拉丁语 gramin(草)与 colare(栖居)复合;中文名『草间』与之对应。",
    discovery:
      "1830 年松德瓦尔定名;本世纪其全基因组发表,成为最早完成基因组测序的中国农区优势蛛种之一。",
    genomeInfo: "全基因组约 1 Gb 量级已发表,为蛛类小体型比较基因组与飞航扩散行为研究提供参照。",
    ecologyRole: "农地表层结网捕食者,网阵密度极高,压制飞虱蚜虫等微小害虫;本身为食虫鸟与胡蜂所食。",
    researchValue: "农田生防与蛛类基因组学研究的模式种;种群动态模型与景观生境管理评价的指示种。",
    tags: ["生物防治", "模式生物"],
  },
  {
    rank: "family",
    latin: "Salticidae",
    chinese: "跳蛛科",
    parent: "Araneae",
    description:
      "跳蛛科是蜘蛛目第一大科,前中眼巨大而视觉敏锐,可辨色彩与轮廓;不结网,凭视觉潜行跳跃捕猎,求偶炫耀多样;全球逾六千种。",
  },
  {
    rank: "genus",
    latin: "Plexippus",
    chinese: "蝇虎属",
    parent: "Salticidae",
    description:
      "蝇虎属为全球暖区宅舍常见跳蛛,体褐色具白纵带,善跳跃善攀,游猎蝇蚊等小虫;黑色蝇虎为世界性伴人种,行为学多有研究。",
  },
  {
    rank: "species",
    latin: "Plexippus paykulli",
    chinese: "黑色蝇虎",
    authority: "(Audouin, 1826)",
    parent: "Plexippus",
    ncbiTaxId: 243411,
    description:
      "黑色蝇虎是世界暖区宅舍与庭园最常见的跳蛛之一,雄蛛亮黑具白纵带,雌蛛褐色斑驳。其凭巨大前中眼精准测距,跃击蝇、蛾等猎物,对不同猎物切换扑跳与迂回策略;全球随人类航运扩散,是视觉导向捕食行为研究的经典对象。",
    morphology: "体长 7-12 毫米,前中眼大而朝前;雄蛛体黑,背甲与腹部各具白色纵带,步足强壮,跃距数倍体长。",
    habitat: "栖于墙面、窗台与庭院植株,昼行性游猎,受惊疾跳逃生,常拖保险丝以护坠。",
    distribution: "全球热带与暖温带伴人分布,原产旧大陆热带,经航运扩散至美洲;中国南北皆有。",
    etymology: "种加词 paykulli 纪念瑞典昆虫学家帕于库尔;属名 Plexippus 取自希腊神话人名。",
    discovery:
      "1826 年奥杜安依埃及标本定名;作为伴人跳蛛的世界扩散与捕猎策略研究持续见于行为学文献。",
    genomeInfo: "全基因组资源尚少;视网膜结构与跳跃力学研究以形态生理为主,视觉基因见于跳蛛科比较研究。",
    ecologyRole: "宅舍与庭园的昼间小型捕食者,猎食蝇、蚊、蛾等小虫;本身为鸟、蜥蜴与胡蜂所捕食。",
    researchValue: "跳蛛视觉认知与猎物特化捕策的行为学经典;蜘蛛恐惧症脱敏治疗与科普常用物种。",
    tags: ["城市适应种"],
  },
  // ===================== 五、蝎目 Scorpiones(1 种) =====================
  {
    rank: "family",
    latin: "Scorpionidae",
    chinese: "蝎科",
    parent: "Scorpiones",
    description:
      "蝎科为体型最大的蝎类科,螯钳壮硕而尾针毒性较弱,分布于非洲与亚洲热带;部分种类被列入 CITES 附录管制贸易,帝王蝎为著名代表。",
  },
  {
    rank: "genus",
    latin: "Pandinus",
    chinese: "帝王蝎属",
    parent: "Scorpionidae",
    description:
      "帝王蝎属为西非雨林大蝎,体黑亮而螯钳肥厚,毒弱钳强,掘穴伏击;含著名观赏种帝王蝎,CITES 贸易管制促使多国规范其出口。",
  },
  {
    rank: "species",
    latin: "Pandinus imperator",
    chinese: "帝王蝎",
    authority: "(C. L. Koch, 1841)",
    parent: "Pandinus",
    ncbiTaxId: 55084,
    description:
      "帝王蝎是世界上最具知名度的观赏蝎,成体全长可逾十八厘米,黑亮甲壳配红棕色巨螯,尾针虽具而毒力温和。其以强大螯钳制服猎物、很少用毒的策略成为『钳强毒弱』演化权衡的代表案例;孕期长,幼蝎攀母背由母蝎护养,是节肢动物母性行为研究的经典对象。",
    morphology: "体长 12-18 厘米,通体黑亮,螯钳红棕而厚重;尾节粗短,毒针相对小;初生幼蝎白色,攀附母背蜕皮。",
    habitat: "栖于西非雨林地表与掘穴中,昼匿夜出,伏击昆虫等猎物,喜高温高湿环境。",
    distribution: "西非雨带,自塞内加尔至喀麦隆一带;因宠物贸易扩散至全球饲养市场。",
    etymology: "种加词 imperator 意为『皇帝』;中文名直译而来,呼应其王者气度与宠物市场地位。",
    discovery:
      "1841 年科赫定名;二十世纪九十年代因贸易量巨大被列入 CITES 附录二,成为蛛形纲贸易管制的标志性物种。",
    genomeInfo: "基因资源相较钳蝎类尚少;蝎类祖先全基因组复制的假说正以比较基因组学检验。",
    ecologyRole: "雨林地表夜行伏击者,压制昆虫等无脊椎动物;幼蝎存活高度依赖母体护育,本身为鸟兽所捕食。",
    researchValue: "观赏贸易与 CITES 管制的经典案例;『以钳代毒』功能权衡与母性抚育行为研究的代表种。",
    tags: ["观赏动物", "有毒动物"],
  },
  // ===================== 六、蜱螨亚纲 Acari(4 种) =====================
  {
    rank: "order",
    latin: "Sarcoptiformes",
    chinese: "疥螨目",
    parent: "Acari",
    description:
      "疥螨目含甲螨与无气门螨两大支系,体多柔软;包括皮肤寄生的疥螨、居室的尘螨与庞大的土壤甲螨群,与人类健康和土壤生态关系密切。",
  },
  {
    rank: "family",
    latin: "Sarcoptidae",
    chinese: "疥螨科",
    parent: "Sarcoptiformes",
    description:
      "疥螨科为钻入皮肤角质层寄生的螨类,体圆而背具横纹与棘刺,足粗短具吸盘;寄生于哺乳动物与鸟类,人疥螨引起的疥疮全球流行。",
  },
  {
    rank: "genus",
    latin: "Sarcoptes",
    chinese: "疥螨属",
    parent: "Sarcoptidae",
    description:
      "疥螨属为哺乳动物皮内寄生螨的代表属,在角质层掘隧道以组织液为食,致剧痒与丘疹;宿主专化形成多个变种,分种地位长期有争议。",
  },
  {
    rank: "species",
    latin: "Sarcoptes scabiei",
    chinese: "人疥螨",
    authority: "(De Geer, 1778)",
    parent: "Sarcoptes",
    ncbiTaxId: 52283,
    description:
      "人疥螨是疥疮的病原,雌螨在人体表皮角质层掘隧道产卵,其排泄物与尸体引发剧烈瘙痒与过敏性丘疹,夜间尤甚,经密切接触传播。全球年感染数以千万计,疥疮被世界卫生组织列入重点关注的体表寄生虫病;结痂型疥疮传染力极强,是院感防控的棘手问题。",
    morphology: "雌螨长 0.3-0.5 毫米,乳白半球形,背面横纹与棘刺密布;足四对短粗,后两对末端具长柄吸盘。",
    habitat: "寄生于指缝、腕屈侧、腋窝等薄嫩表皮的角质层内,隧道蜿蜒;离体后仅能存活数日。",
    distribution: "全球性分布,拥挤、贫困与护理机构中流行尤烈;历史上周期性大流行与战争饥荒相伴。",
    etymology: "种加词 scabiei 为拉丁语『痂疮的』;属名 Sarcoptes 由 sarx(肉)与 koptein(剪切)构成。",
    discovery:
      "1778 年德热尔定名;1687 年已有虫与病相关的记载,1834 年在皮肤隧道内查见螨体,确立病原学,成为医学螨学的起点。",
    genomeInfo: "基因组在节肢动物中属极小,仅数十 Mb 量级;寄生适应伴随基因家族缩减,已被基因组研究揭示。",
    ecologyRole: "专性人体寄生虫,直接接触传播而不经中间宿主;犬猫等动物变种偶可短暂侵人,多难完成世代。",
    researchValue: "疥疮诊断、伊维菌素治疗与杀螨剂耐药研究的核心;被忽视热带病防控与皮肤病学的重要对象。",
    tags: ["寄生虫", "人类病原"],
  },
  {
    rank: "family",
    latin: "Pyroglyphidae",
    chinese: "麦食螨科",
    parent: "Sarcoptiformes",
    description:
      "麦食螨科为居所与鸟兽巢穴中的无气门螨类,以皮屑毛发为食;其排泄与蜕皮产物是室内过敏原的主要来源,屋尘螨为全球过敏疾病头号螨种。",
  },
  {
    rank: "genus",
    latin: "Dermatophagoides",
    chinese: "尘螨属",
    parent: "Pyroglyphidae",
    description:
      "尘螨属体小而半透明,足短体表具细横纹,专营动物皮屑等有机碎屑;其粪便与蜕皮蛋白为强效过敏原,屋尘螨遍布人类居所。",
  },
  {
    rank: "species",
    latin: "Dermatophagoides pteronyssinus",
    chinese: "屋尘螨",
    authority: "(Trouessart, 1897)",
    parent: "Dermatophagoides",
    ncbiTaxId: 6956,
    description:
      "屋尘螨是世界上最主要的室内过敏原来源之一,以人体脱落的皮屑为食,孳生于床垫、沙发与地毯的温暖潮湿微环境。其粪便颗粒中的 Der p 1、Der p 2 等蛋白诱发哮喘、鼻炎与湿疹,全球致敏人口数以亿计;过敏原组分标准化与免疫治疗研究均以其为基准体系。",
    morphology: "体长 0.2-0.3 毫米,乳白半透明,雄螨腹面具一对肛吸盘;体表细横纹,足末端为球状吸盘。",
    habitat: "孳生于床垫、被褥、软家具与地毯,以人畜皮屑为食,温暖潮湿环境密度最高。",
    distribution: "全球性室内分布,热带与湿润温带居室最普遍;干燥与高海拔地区密度低。",
    etymology: "属名 Dermatophagoides 意为『食皮的拟甲螨』;种加词 pteronyssinus 或指其翼状刺毛组合。",
    discovery:
      "1897 年特鲁萨尔定名;1960 年代确立尘螨与哮喘过敏的关系,屋尘螨随之成为过敏学研究的中心对象。",
    genomeInfo: "基因组数十 Mb 量级;过敏原组分 Der p 系列已克隆并标准化命名,基因组资源近年建立。",
    ecologyRole: "居室碎屑食物链的分解者,转化皮屑毛发;种群受温湿度调控,是室内微生态的重要组成。",
    researchValue: "全球过敏性疾病研究的核心螨种;WHO/IUIS 过敏原命名体系与舌下免疫治疗评价的基准。",
    tags: ["人类病原"],
  },
  {
    rank: "order",
    latin: "Mesostigmata",
    chinese: "中气门目",
    parent: "Acari",
    description:
      "中气门螨类气门位于体侧的气门沟中,包括土壤捕食螨、寄生性革螨与植绥螨等;植绥螨类为农林害螨生物防治的支柱,商品化历史逾六十年。",
  },
  {
    rank: "family",
    latin: "Phytoseiidae",
    chinese: "植绥螨科",
    parent: "Mesostigmata",
    description:
      "植绥螨科为捕食性中气门螨,背板刚毛排列体系严密;全球两千余种,以叶螨为主食,是天敌商品化最成功、投放量最大的螨类类群。",
  },
  {
    rank: "genus",
    latin: "Phytoseiulus",
    chinese: "小植绥螨属",
    parent: "Phytoseiidae",
    description:
      "小植绥螨属为叶螨的专性捕食者,体橙红而足长善疾走,增殖迅速;代表种智利小植绥螨是温室害螨生物防治的世界标准种。",
  },
  {
    rank: "species",
    latin: "Phytoseiulus persimilis",
    chinese: "智利小植绥螨",
    authority: "Athias-Henriot, 1957",
    parent: "Phytoseiulus",
    ncbiTaxId: 44414,
    description:
      "智利小植绥螨是害螨生物防治的历史性功臣,专性捕食二斑叶螨,行动敏捷而增殖力强,可在温室中迅速压平叶螨种群。1950 年代末在地中海被发现,1968 年起商品化投放,开创了天敌大规模繁育释放的产业模式;至今仍是全球温室作物害螨治理的第一线投放种。",
    morphology: "体长约 0.35 毫米,橙红梨形,足长而第四对最长;背板刚毛少而排列固定,受惊疾走搜寻猎物。",
    habitat: "活动于植物叶背叶螨群落处,凭化学痕迹搜寻猎物;高温低湿条件下种群明显衰减。",
    distribution: "原产地中海至南美一带;经商品化投放遍及全球温室,中国自二十世纪七十年代引进应用。",
    etymology: "种加词 persimilis 意为『极相似的』;属名 Phytoseiulus 为植绥螨之名的缩小形式,谓其小巧。",
    discovery:
      "1957 年阿蒂亚-亨利奥特定名;1968 年起在荷兰与英美率先商品化,被誉为现代生物防治产业的开端。",
    genomeInfo: "全基因组测序已开展,嗅觉受体与快速增殖相关的基因家族解析支撑天敌性状改良育种。",
    ecologyRole: "二斑叶螨等害螨的专性捕食者,功能反应与数值反应敏捷;不耐饥饿,猎物耗尽后种群迅速衰减。",
    researchValue: "天敌产业与捕食者-猎物相互作用生态学的模式种;温室害螨综合治理成效评价的世界标准。",
    tags: ["生物防治", "驯化物种"],
  },
  {
    rank: "species",
    latin: "Tetranychus urticae",
    chinese: "二斑叶螨",
    authority: "Koch, 1836",
    parent: "Tetranychus",
    ncbiTaxId: 32264,
    description:
      "二斑叶螨俗称红蜘蛛,因体侧两块暗斑得名,是公认的世界性头号害螨,寄主植物逾千种。孤雌产雄的生殖方式使抗药基因迅速扩散,对上百种农药产生抗性;其全基因组测序揭示了广泛的解毒基因扩张与水平转移基因,已成为蛛形纲基因组学与害螨抗药性治理的模式体系。",
    morphology: "雌螨体长 0.4-0.5 毫米,体色黄绿至橙红,体侧各具一大暗斑;雄螨菱形较小,须肢端感器发达。",
    habitat: "刺吸植物叶背汁液,在温室与旱田作物上易爆发;吐丝结网护卵,干热条件下增殖极快。",
    distribution: "全球性分布,温室与大田栽培区尤烈;中国各农区蔬菜、果树与花卉上普遍成灾。",
    etymology: "种加词 urticae 意为『荨麻上的』,指模式标本采自荨麻;中文俗称红蜘蛛广为流行。",
    discovery:
      "1836 年科赫定名;二十世纪成为抗药性进化研究的经典对象,2011 年全基因组发表于《自然》杂志。",
    genomeInfo: "基因组仅约 90 Mb,为蛛形纲最小之列;解毒基因家族显著扩张,并发现植物来源的水平转移基因。",
    ecologyRole: "多食性植食螨,刺吸叶片致失绿落叶;种群受智利小植绥螨等天敌调控,是捕食-猎物系统研究支点。",
    researchValue: "害螨抗药性治理与新型防治手段的世界模型;多食性适应与解毒演化的基因组学经典。",
    tags: ["农业害虫", "模式生物"],
  },
];
