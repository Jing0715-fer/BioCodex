import { TaxonSeed } from "../types";

// 脊椎动物扩充种子数据 II(Task 3-e expansion2)。
// 主题:模式实验动物 + 经济/养殖动物,每个物种均含 5 项科学档案字段
// (etymology / discovery / genomeInfo / ecologyRole / researchValue)。
// species 的 parent 引用两类来源:
//   1) DB 已有分类单元(/tmp/taxa-inventory.tsv,1524 条):
//      Cyprinidae / Perciformes / Pleuronectiformes / Siluriformes / Salmonidae /
//      Actinopterygii / Caudata / Anura / Testudines / Pelecaniformes / Aves /
//      Phasianidae / Rodentia / Muridae;
//   2) 本文件内先行定义的新中间阶元。
// 注意:与 seed-incremental.ts 汇总合并使用时,父级必须(DB ∪ 新数据)闭合。
// 推荐名单中已有物种(小家鼠/褐家鼠/红原鸡/绿头鸭/鲤/鲫/虹鳟/褐牙鲆/泥鳅/穴兔)均已查重跳过。
export const expansion2Vertebrates: TaxonSeed[] = [
  // ===================== 鱼类(辐鳍亚纲) =====================
  {
    rank: "order",
    latin: "Beloniformes",
    chinese: "颌针鱼目",
    parent: "Actinopterygii",
    description:
      "颌针鱼目为表层营浮游生活的鱼类类群,体细长,鳍无硬棘,两颌延长或尖突,含颌针鱼、鱵、飞鱼与青鳉等,多数海生,唯青鳉科栖于淡水。",
  },
  {
    rank: "family",
    latin: "Adrianichthyidae",
    chinese: "青鳉科",
    parent: "Beloniformes",
    description:
      "青鳉科为小型卵生鳉类,口上位,背鳍位置靠后,栖于东亚至南亚的稻田与沟渠,受精卵具绒毛状附着丝粘挂水草,含模式鱼类青鳉等三十余种。",
  },
  {
    rank: "genus",
    latin: "Oryzias",
    chinese: "青鳉属",
    parent: "Adrianichthyidae",
    description:
      "青鳉属为稻田小型卵生鳉类,体长多不足五厘米,口上位,卵粒粘附水草孵化,模式种青鳉是历史最悠久的鱼类遗传学材料之一。",
  },
  {
    rank: "species",
    latin: "Oryzias latipes",
    chinese: "青鳉",
    authority: "(Temminck & Schlegel, 1846)",
    parent: "Oryzias",
    description:
      "青鳉是东亚稻田与沟渠中的小型卵生鳉类,体长不足五厘米,口上位适于掠食水面,卵具附着丝粘挂水草。它与斑马鱼并列为两大鱼类模式生物,基因组小巧而高度纯合,大量近交系与自然品系使其成为遗传学与性别决定研究的经典材料,2007 年即完成高质量全基因组测序。",
    morphology: "体小侧扁,头背平直,口上位,臀鳍基部长,体银灰色,雄鱼背鳍与臀鳍鳍条延长。",
    habitat: "栖于稻田、灌溉沟渠与池塘缓流浅水,喜水草丛生处,对盐度与水温变化适应力强。",
    distribution: "自然分布于日本、朝鲜半岛与中国东部淡水水域,已被引入各国实验室作研究材料。",
    ncbiTaxId: 8090,
    etymology:
      "属名 Oryzias 源自希腊语 oryza(稻),指其栖居稻田;种加词 latipes 由拉丁语 latus(宽)与 pes(足)构成。",
    discovery:
      "1846 年特明克与施莱格尔在《日本动物志》中定名;1921 年日本学者发现其体色伴性遗传,开创鱼类遗传学研究的百年传统。",
    genomeInfo: "2n=48,基因组仅约 700 Mb,2007 年完成全基因组测序,是基因组最小的脊椎模式鱼类之一。",
    ecologyRole: "稻田与沟渠表层鱼类,捕食水面浮游生物与蚊虫幼虫,与季风亚洲的湿地农田生态系统共生。",
    researchValue: "与斑马鱼并列的鱼类模式生物,近交系与自然群体资源丰富,用于遗传学、性别决定与环境毒理学研究。",
    tags: ["模式生物"],
  },
  {
    rank: "genus",
    latin: "Danio",
    chinese: "斑马鱼属",
    parent: "Cyprinidae",
    description:
      "斑马鱼属为南亚小型鲤类,体具纵纹,集群活泼,卵小而发育迅速,模式种斑马鱼是当代发育遗传学的核心模式生物。",
  },
  {
    rank: "species",
    latin: "Danio rerio",
    chinese: "斑马鱼",
    authority: "(Hamilton, 1822)",
    parent: "Danio",
    description:
      "斑马鱼原产南亚溪流与稻田,体侧数条蓝色纵纹如斑马,繁殖力强,胚胎体外发育且早期通体透明。凭借世代短、子代量大与转基因及随机诱变技术成熟,自二十世纪九十年代起成为发育生物学最重要的脊椎模式动物,大规模突变库与完整基因组使其在药物筛选和人类疾病建模中地位难以替代。",
    morphology: "体细长微侧扁,体侧具 4-6 条蓝色纵纹间以金色细纹,雄鱼修长、臀鳍金黄,成体长约 4 厘米。",
    habitat: "喜集群于缓流清水、稻田与池塘浅水,适温 22-28℃,杂食浮游生物与小型无脊椎动物。",
    distribution: "原产喜马拉雅山南麓的印度、孟加拉国与尼泊尔溪河水系,已引种至全球实验室与水族业。",
    ncbiTaxId: 7955,
    etymology: "属名 Danio 源自孟加拉语 dhani(稻田),指其栖居稻田;种加词 rerio 取自当地土名,本义不详。",
    discovery:
      "1822 年苏格兰学者汉密尔顿依恒河水系标本定名;二十世纪三十年代起用于发育研究,1996 年大规模诱变筛选奠定其模式地位。",
    genomeInfo: "2n=50,基因组约 1.5 Gb,参考基因组 GRCz11 已完成,是首批全基因组测序的鱼类之一。",
    ecologyRole: "小型表层集群鱼类,捕食浮游生物与蚊幼虫,是南亚淡水生态系统中层消费者的组成部分。",
    researchValue: "最重要的脊椎模式动物之一,胚胎透明、体外发育,广泛用于发育遗传学、药物筛选与毒理学研究。",
    tags: ["模式生物", "观赏鱼类"],
  },
  {
    rank: "family",
    latin: "Cichlidae",
    chinese: "慈鲷科",
    parent: "Perciformes",
    description:
      "慈鲷科为鲈形目最大的科之一,体侧扁,两颌具细齿,口孵与领域行为高度发达,主产非洲大湖与南美,是适应性辐射研究的经典类群。",
  },
  {
    rank: "genus",
    latin: "Oreochromis",
    chinese: "罗非鱼属",
    parent: "Cichlidae",
    description:
      "罗非鱼属为非洲慈鲷类,雌鱼口孵护卵,耐低氧,食性广,能摄食蓝藻与有机碎屑,含多种重要暖水养殖鱼类,通称罗非鱼。",
  },
  {
    rank: "species",
    latin: "Oreochromis niloticus",
    chinese: "尼罗罗非鱼",
    authority: "(Linnaeus, 1758)",
    parent: "Oreochromis",
    description:
      "尼罗罗非鱼原产非洲尼罗河水系,生长快、耐低氧、抗病力强,并能滤食蓝藻改善水质,是慈鲷科最重要的暖水养殖鱼类,全球产量长期位居养殖鱼类前列。经引种扩散至热带亚热带各国,在部分水域形成野化种群,挤压土著鱼类资源,被多国列为需要管理的外来引入种。",
    morphology: "体侧扁呈长椭圆形,背鳍具十余枚硬棘,尾鳍平截而具暗色横纹,繁殖期雄鱼喉部呈灰黑色。",
    habitat: "栖于热带湖泊与河川沿岸浅水,耐低氧、可适应一定盐度,喜温暖静水,杂食偏浮游生物。",
    distribution: "原产尼罗河水系及非洲东西部暖水区域,现全球热带亚热带均有引种养殖,部分水域野化建群。",
    ncbiTaxId: 8664,
    etymology: "属名 Oreochromis 源自希腊语 chromis(古鱼名)加前缀构成;种加词 niloticus 意为尼罗河的,指模式产地。",
    discovery:
      "1758 年林奈依埃及尼罗河标本定名;二十世纪中叶起经系统选育推广为全球性养殖鱼种,是联合国粮农组织重点推介的品种。",
    genomeInfo: "2n=44,全基因组约 1 Gb,2014 年前后完成精细图谱,全雄育种与基因编辑研究活跃。",
    ecologyRole: "暖水杂食鱼类,滤食蓝藻与有机碎屑,占据湖泊沿岸与池塘生态位;野化种群可竞争挤压土著鱼类。",
    researchValue: "全球产量最大的暖水养殖鱼类之一,是水产遗传育种、盐碱水养殖与慈鲷科演化研究的核心物种。",
    tags: ["经济物种", "驯化物种"],
  },
  {
    rank: "family",
    latin: "Centrarchidae",
    chinese: "太阳鱼科",
    parent: "Perciformes",
    description:
      "太阳鱼科为北美特有的淡水鲈形类,背鳍棘部与软条部相连,雄鱼具筑巢护卵的亲鱼行为,含黑鲈与太阳鱼等游钓名类,多为地方渔业支柱。",
  },
  {
    rank: "genus",
    latin: "Micropterus",
    chinese: "黑鲈属",
    parent: "Centrarchidae",
    description:
      "黑鲈属为北美大型掠食性太阳鱼科鱼类,口裂大,背鳍前部为棘、后部为软条,营伏击式捕食,含游钓名种大口黑鲈。",
  },
  {
    rank: "species",
    latin: "Micropterus salmoides",
    chinese: "大口黑鲈",
    authority: "(Lacepède, 1802)",
    parent: "Micropterus",
    description:
      "大口黑鲈原产北美洲,是太阳鱼科体型最大的掠食鱼类,口裂大而性情凶猛,以伏击方式捕食鱼虾。二十世纪八十年代引入中国后形成规模化养殖产业,是国内重要名优水产品,也是世界性游钓鱼种。因生长快、适应力强,在引种地逃逸建群后常威胁土著小型鱼类,具有潜在入侵风险。",
    morphology: "体侧扁而延长,口大,上颌后缘超过眼后缘,体侧具不规则深色斑纹,背鳍前后两部相连而具浅凹。",
    habitat: "栖于湖库沿岸水草区与淹没植被带,喜清洁暖水,常藏于障碍物旁伺机伏击猎物。",
    distribution: "原产北美东部与中部水系,已引种至东亚、欧洲与非洲南部等地,多国建有养殖与游钓种群。",
    ncbiTaxId: 4081,
    etymology:
      "属名由希腊语 mikros(小)与 pteron(翼)构成,指模式种背鳍形似小翼;种加词 salmoides 意为似鲑的。",
    discovery:
      "1802 年拉塞佩德依北美标本定名;引入中国后于广东等地驯养成功,现已成为大宗名优养殖鱼类。",
    genomeInfo: "全基因组约 1.4 Gb,染色体级组装已发表,为生长、耐低氧与抗病性状的分子育种提供支撑。",
    ecologyRole: "湖泊与河流的顶级伏击型掠食者,捕食小鱼虾并调控群落结构;引入种群可威胁土著小型鱼类。",
    researchValue: "全球最重要的游钓鱼类之一,亦为中国名优养殖鲈类;基因组资源支撑其分子育种与驯化研究。",
    tags: ["经济物种"],
  },
  {
    rank: "family",
    latin: "Scophthalmidae",
    chinese: "菱鲆科",
    parent: "Pleuronectiformes",
    description:
      "菱鲆科为两眼位于体左侧的比目鱼类,体近菱形,口大而前位,栖东北大西洋沙泥底近海,含重要海水养殖种大菱鲆。",
  },
  {
    rank: "genus",
    latin: "Scophthalmus",
    chinese: "菱鲆属",
    parent: "Scophthalmidae",
    description:
      "菱鲆属体极侧扁近菱形,双眼位于体左侧,有眼侧沙褐色具黑斑,底栖伏击型肉食性,代表种大菱鲆为重要海水养殖鱼。",
  },
  {
    rank: "species",
    latin: "Scophthalmus maximus",
    chinese: "大菱鲆",
    authority: "(Linnaeus, 1758)",
    parent: "Scophthalmus",
    description:
      "大菱鲆是东北大西洋近岸的底栖比目鱼,两眼位于体左侧,体近菱形,常半埋泥沙中伏击鱼虾。商品名「多宝鱼」,1990 年代引进中国后开创海水工厂化循环水养殖模式,成为北方沿海支柱养殖品种;其耐低温、适合高密度养殖,也是水产基因组选择育种最早成功应用的物种之一。",
    morphology: "体近菱形极侧扁,双眼位于体左侧,有眼侧沙褐色具黑斑,无眼侧白色,鳞小而埋于皮下。",
    habitat: "栖于浅海沙泥底质,常半埋泥沙中伏击猎物,适较低水温,仔鱼经变态由对称转为不对称。",
    distribution: "原产东北大西洋、波罗的海、地中海与黑海,已引种至中国北方沿海工厂化养殖。",
    etymology:
      "属名由希腊语 skopein(注视)与 ophthalmos(眼)构成,指双眼同置一侧;种加词 maximus 意为最大的。",
    discovery:
      "1758 年林奈定为鲽属 Pleuronectes maximus,后归入菱鲆属;中国 1992 年前后引进并突破人工繁育技术。",
    genomeInfo: "2n=44,全基因组约 550 Mb,已发表染色体级组装,并率先建立抗病全基因组选择育种体系。",
    ecologyRole: "底栖肉食性比目鱼,捕食小鱼虾与底栖无脊椎动物,是东北大西洋近岸沙泥底群落的捕食者。",
    researchValue: "海水工厂化养殖的代表鱼种(多宝鱼),是水产基因组育种与循环水养殖技术的示范物种。",
    tags: ["经济物种"],
  },
  {
    rank: "family",
    latin: "Ictaluridae",
    chinese: "叉尾鮰科",
    parent: "Siluriformes",
    description:
      "叉尾鮰科为北美特有的鲇类,体表光滑无鳞,触须发达,具脂鳍,栖于大河与湖库,含斑点叉尾鮰等重要淡水养殖与游钓鱼类。",
  },
  {
    rank: "genus",
    latin: "Ictalurus",
    chinese: "叉尾鮰属",
    parent: "Ictaluridae",
    description:
      "叉尾鮰属为北美中型鲇类,头部具四对触须,尾鳍深叉,体侧常散布斑点,底栖夜行,代表种斑点叉尾鮰已推广至全球养殖。",
  },
  {
    rank: "species",
    latin: "Ictalurus punctatus",
    chinese: "斑点叉尾鮰",
    authority: "(Rafinesque, 1818)",
    parent: "Ictalurus",
    description:
      "斑点叉尾鮰原产北美洲,体表光滑无鳞,触须四对,尾鳍深叉,是北美最大的淡水养殖鱼类。1984 年引入中国后形成完整的「鮰鱼」养殖、加工与出口产业,成为大宗淡水名优品种;其耐低氧、饲料转化率高,基因组研究积累深厚,是鲇形目遗传与育种研究的重要物种。",
    morphology: "体延长而无鳞,皮肤光滑,头部具四对触须,尾鳍深叉形,幼鱼体侧散布黑色斑点,成鱼渐淡。",
    habitat: "栖于大中型河流与湖库的沙泥底缓流深水,喜岩缝洞穴隐蔽,夜间沿底觅食。",
    distribution: "原产北美密西西比河水系与墨西哥北部,已引种至中国、东南亚与欧洲等地养殖。",
    ncbiTaxId: 7998,
    etymology:
      "属名 Ictalurus 由希腊语 ichthys(鱼)与 ailouros(猫)构成,指其须似猫须;种加词 punctatus 意为有斑点的。",
    discovery:
      "1818 年拉菲内斯克依美国俄亥俄水系标本定名;二十世纪中叶成为北美主养鱼类,后引种推广至全球。",
    genomeInfo: "2n=58,全基因组约 0.9 Gb,是鲇形目最早完成精细基因组图谱的物种之一。",
    ecologyRole: "底栖杂食性鲇类,夜间摄食底栖无脊椎动物与小鱼,是北美大型河流底栖群落的重要组成。",
    researchValue: "北美最大宗淡水养殖鱼类,中国鮰鱼出口产业的核心种;较早完成基因组测序,支撑鲇类育种研究。",
    tags: ["经济物种"],
  },
  {
    rank: "genus",
    latin: "Brachymystax",
    chinese: "细鳞鲑属",
    parent: "Salmonidae",
    description:
      "细鳞鲑属为东亚特有的鲑科鱼类,口小,上颌骨后延不超过眼后缘,上颌具一对短须,鳞细小,栖寒冷清澈山溪,含细鳞鲑等种。",
  },
  {
    rank: "species",
    latin: "Brachymystax lenok",
    chinese: "细鳞鲑",
    authority: "(Pallas, 1773)",
    parent: "Brachymystax",
    description:
      "细鳞鲑是分布于西伯利亚至中国山地的冷水性鲑科鱼类,因鳞片细小、上颌具一对短须而得名,栖于清澈山溪。它对水质与栖息地连通性要求苛刻,被视为山涧生态健康的指示物种,秦岭种群近年被分立为独立种秦岭细鳞鲑。在中国列为国家二级保护野生动物,同时也是冷水鱼驯养繁殖与放流研究的重点对象。",
    morphology: "体长侧扁,口小,上颌骨后延不过眼后缘,上颌具一对短须,背部青绿色,体侧散布黑色斑点。",
    habitat: "栖于水质清澈、溶氧高、砾石底质的冷水溪河与山涧,秋末向下游深水移动越冬。",
    distribution: "分布于西伯利亚与俄罗斯远东至中国东北、华北及秦岭山地水系,种群呈斑块化分布。",
    etymology:
      "属名由希腊语 brachys(短)与 mystax(上唇须)构成,指其短小的上颌须;种加词 lenok 取自西伯利亚土名。",
    discovery:
      "1773 年帕拉斯依西伯利亚河流标本定名;秦岭与川陕种群经形态与分子研究近年被分立为独立物种。",
    genomeInfo: "鲑科祖先经历全基因组加倍,其基因组约 2-3 Gb,染色体级参考基因组已用于高原适应研究。",
    ecologyRole: "冷水溪流的重要捕食者,摄食水生昆虫与小鱼,对水质与栖息连通性敏感,是指示物种。",
    researchValue: "冷水鱼类养殖与资源增殖对象,是研究鲑科系统演化与鱼类耐寒适应机制的重要材料。",
    tags: ["国家二级保护", "冷水鱼类"],
  },
  // ===================== 两栖纲 Amphibia =====================
  {
    rank: "family",
    latin: "Ambystomatidae",
    chinese: "钝口螈科",
    parent: "Caudata",
    description:
      "钝口螈科为北美特有的蝾螈类,体粗壮,肋沟明显,幼体水栖具外鳃,成体多陆栖,以幼态持续著称的墨西哥钝口螈是其著名成员。",
  },
  {
    rank: "genus",
    latin: "Ambystoma",
    chinese: "钝口螈属",
    parent: "Ambystomatidae",
    description:
      "钝口螈属为北美的螈类,骨骼粗壮,肋沟深,多数种类陆栖、秋季迁水繁殖,墨西哥钝口螈以卓越的再生能力闻名于世。",
  },
  {
    rank: "species",
    latin: "Ambystoma mexicanum",
    chinese: "墨西哥钝口螈",
    authority: "(Shaw, 1789)",
    parent: "Ambystoma",
    description:
      "墨西哥钝口螈终生水栖并保留外鳃,是幼态持续现象的典型代表,成年不经变态即可繁殖。其断肢、尾、脊髓乃至部分心脏均可完美再生,是再生医学最重要的脊椎模式动物。野生种群仅存于墨西哥城霍奇米尔科湖群的残存运河,受城市化与入侵鱼类挤压,IUCN 将其列为极危。",
    morphology: "体侧扁,头宽而钝,具三对羽状外鳃,四肢细弱,尾长侧扁,常见黑褐与白化品系,体长可达 30 厘米。",
    habitat: "栖于墨西哥高原湖泊与运河水草区,水温 15-22℃ 为宜,低温等胁迫可诱发少数个体变态。",
    distribution: "野生仅见于墨西哥盆地霍奇米尔科与查尔科湖群水系,实验与宠物种群遍布全球。",
    conservation: "CR",
    ncbiTaxId: 8296,
    etymology:
      "属名 Ambystoma 词源存争议,一说源于希腊语 amblys(钝)与 stoma(口),指宽钝的口部;种加词指产地墨西哥。",
    discovery:
      "1789 年肖依墨西哥湖中所获幼态标本定名;1865 年巴黎科学园观察到罕见变态个体,厘清其与近缘种的亲缘关系。",
    genomeInfo: "2n=28,基因组约 32 Gb,为已知最大的动物基因组之一,完整图谱已揭示其再生相关基因。",
    ecologyRole: "高原湖泊水栖捕食者,主食螺类、水生昆虫与小鱼,是墨西哥盆地残存湿地的孑遗代表物种。",
    researchValue: "再生医学核心模式动物,断肢与脊髓可再生,广泛用于再生生物学、发育学与基因组学研究。",
    tags: ["模式生物", "观赏动物"],
  },
  {
    rank: "family",
    latin: "Pipidae",
    chinese: "负子蟾科",
    parent: "Anura",
    description:
      "负子蟾科为完全水栖的原始蛙类,舌退化,体侧具侧线感孔,后肢强壮善泳,栖南美与撒哈拉以南非洲静水,含非洲爪蟾等。",
  },
  {
    rank: "genus",
    latin: "Xenopus",
    chinese: "爪蟾属",
    parent: "Pipidae",
    description:
      "爪蟾属为非洲水栖蛙类,体扁而皮肤光滑,眼位背侧上仰,后肢内侧三趾具角质爪,行体外受精,非洲爪蟾为经典模式生物。",
  },
  {
    rank: "species",
    latin: "Xenopus laevis",
    chinese: "非洲爪蟾",
    authority: "(Daudin, 1802)",
    parent: "Xenopus",
    description:
      "非洲爪蟾是完全水栖的非洲蛙类,后肢三趾具黑色角质爪,俗称光滑爪蟾。二十世纪三十年代发现孕妇尿液可诱导其大量排卵,使其成为全球临床妊娠检验的标准工具,此后发展为细胞周期、核移植与胚胎学的经典模式生物,格登的克隆先驱实验即以其为材料并因此获 2012 年诺贝尔奖。",
    morphology: "体扁平而皮肤光滑,头尖,眼位背侧上仰,后肢内侧三趾具角质黑爪,侧线感孔呈点线状分布。",
    habitat: "栖于撒哈拉以南非洲的池塘、沼泽与缓流河川,完全水栖,干旱时蛰伏泥底待雨复苏。",
    distribution: "原产撒哈拉以南非洲大部分地区,已入侵北美西部、南美智利与欧洲局部温暖水域。",
    conservation: "LC",
    ncbiTaxId: 8355,
    etymology:
      "属名 Xenopus 由希腊语 xenos(奇异)与 pous(足)构成,指其具爪的奇异后足;种加词 laevis 意为光滑的。",
    discovery:
      "1802 年多丹定名;1930 年代发现其可被孕妇尿中激素诱导排卵,首创以两栖类作妊娠检验并沿用数十年。",
    genomeInfo: "异源四倍体物种,2n=36,基因组约 3.1 Gb,双亚基因组组装揭示其古老的基因组加倍事件。",
    ecologyRole: "完全水栖的杂食性捕食者,夜间摄食底栖无脊椎与小鱼,繁殖力强,入侵种群危害土著两栖类。",
    researchValue: "细胞周期、核移植与胚胎发育的经典模式生物,克隆先驱实验材料,亦用于毒理与听觉研究。",
    tags: ["模式生物", "入侵物种"],
  },
  // ===================== 爬行纲 Reptilia =====================
  {
    rank: "family",
    latin: "Emydidae",
    chinese: "泽龟科",
    parent: "Testudines",
    description:
      "泽龟科多为水栖或半水栖龟类,甲壳低扁,四肢具蹼,喜日光晒背,食性杂,主产新大陆,欧洲亦存泽龟属代表种类。",
  },
  {
    rank: "genus",
    latin: "Trachemys",
    chinese: "彩龟属",
    parent: "Emydidae",
    description:
      "彩龟属为中大型泽龟,头颈具条纹或斑块,甲壳绿褐而具环纹,幼体色彩鲜明,栖缓流水体,红耳彩龟因宠物贸易遍布全球。",
  },
  {
    rank: "species",
    latin: "Trachemys scripta",
    chinese: "红耳彩龟",
    authority: "(Thunberg, 1792)",
    parent: "Trachemys",
    description:
      "红耳彩龟因眼后醒目红斑俗称「巴西龟」,是全球宠物贸易量最大的龟类。其繁殖力强、食性杂、环境耐受宽,弃养放生后在多国水域建立优势种群,挤压土著龟类并传播病害,被列入世界百大入侵种;中国已将其列为禁止放生和投放自然水体的外来物种。",
    morphology: "头侧眼后具醒目红斑,甲壳绿褐具同心环纹,腹甲黄色而具深斑,成体后体色渐深暗,爪长而尖。",
    habitat: "栖于池塘、沼泽与缓流河渠,喜向阳晒背场,幼体偏肉食、成体偏植食,寿命可达数十年。",
    distribution: "原产美国中部至墨西哥东北部,随宠物贸易扩散至全球各大洲温暖水域,中国南北均常见。",
    conservation: "LC",
    etymology:
      "属名由希腊语 trachys(粗糙)与 emys(水龟)构成;种加词 scripta 意为书写的,指甲上如笔画的纹样。",
    discovery:
      "1792 年通贝里定为 Testudo scripta,后归入彩龟属;二十世纪后期随宠物贸易成为全球扩散最广的水龟。",
    genomeInfo: "2n=50,全基因组约 2.3 Gb,已发表组装,是龟类温度依赖型性别决定研究的关键物种。",
    ecologyRole: "半水栖杂食龟类,晒背习性显著,摄食水草、无脊椎与小鱼;入侵种群改变水体食物网并传播疾病。",
    researchValue: "爬行动物温度型性别决定的经典模型,亦用于衰老与冬眠研究;入侵生物学的标志性案例物种。",
    tags: ["入侵物种", "观赏动物"],
  },
  // ===================== 鸟纲 Aves =====================
  {
    rank: "order",
    latin: "Columbiformes",
    chinese: "鸽形目",
    parent: "Aves",
    description:
      "鸽形目喙短而基部具蜡膜,嗉囊发达、可分泌「鸽乳」哺育雏鸟,翅长善飞,栖崖栖树兼有,含鸠鸽科三百余种,广布全球。",
  },
  {
    rank: "family",
    latin: "Columbidae",
    chinese: "鸠鸽科",
    parent: "Columbiformes",
    description:
      "鸠鸽科喙短具蜡膜,体多灰褐,以嗉囊乳育雏,树栖或地栖兼有,谷食性强,含鸽、斑鸠等三百余种,遍布各大陆温暖地区。",
  },
  {
    rank: "genus",
    latin: "Columba",
    chinese: "鸽属",
    parent: "Columbidae",
    description:
      "鸽属为中型鸠鸽类,翅尖长,尾短或中等,多栖山地岩崖,谷食性强,原鸽为家鸽的野生祖先,城市鸽群即其驯化后裔。",
  },
  {
    rank: "species",
    latin: "Columba livia",
    chinese: "原鸽",
    authority: "Gmelin, 1789",
    parent: "Columba",
    description:
      "原鸽是家鸽的野生祖先,原栖地中海至南亚的滨海崖壁与山地岩洞,体羽蓝灰、翼具两道黑横斑。人类驯化家鸽已逾五千年,培育出数百个品种,达尔文曾以其多样性阐释人工选择的力量。逃逸家鸽在城市繁衍并与野生种群互配,使其成为研究驯化与野化基因流的天然模型。",
    morphology: "体蓝灰色,颈羽具绿色与紫红色金属辉光,翼上两道黑色横斑,腰部白色,尾端具黑带,眼橙红色。",
    habitat: "原栖海岸崖壁与山地岩洞,群居谷食;城市种群栖于檐洞、桥梁等类岩穴环境,晨昏集群觅食。",
    distribution: "原产欧亚大陆中南部、北非与南亚,驯化种群随人类遍布全球城市与乡村。",
    conservation: "LC",
    ncbiTaxId: 8932,
    etymology: "属名 Columba 为拉丁语鸽;种加词 livia 一说源于 lividus(铅灰蓝),指其岩灰蓝色的羽色。",
    discovery:
      "1789 年格梅林定名;家鸽驯化逾五千年,达尔文在《物种起源》中以鸽类品种多样性论证人工选择。",
    genomeInfo: "2n=80,全基因组约 1.2 Gb,已用于羽色变异、品种分化与导航行为的遗传研究。",
    ecologyRole: "崖栖群居谷食鸟类,兼为种子散布者;驯化逃逸个体形成城市种群,与野生原鸽持续基因交流。",
    researchValue: "人工选择与品种多样性研究的经典对象,亦用于鸟类定向导航与城市适应研究。",
    tags: ["驯化物种"],
  },
  {
    rank: "family",
    latin: "Ardeidae",
    chinese: "鹭科",
    parent: "Pelecaniformes",
    description:
      "鹭科为湿地涉禽,颈长腿长,喙尖直如矛,飞翔时颈缩成 S 形,栖于浅水湿地,多集群营巢于树梢,广布全球温带与热带。",
  },
  {
    rank: "genus",
    latin: "Egretta",
    chinese: "白鹭属",
    parent: "Ardeidae",
    description:
      "白鹭属为中型白色鹭类,喙细长,趾长而具鲜黄,繁殖期枕后具长冠羽、背披蓑羽,栖稻田滩涂,白鹭在中国南方极为常见。",
  },
  {
    rank: "species",
    latin: "Egretta garzetta",
    chinese: "白鹭",
    authority: "(Linnaeus, 1758)",
    parent: "Egretta",
    description:
      "白鹭是广布旧大陆暖湿地区的中型鹭类,通体雪白,喙黑而趾鲜黄,繁殖期枕后垂双条长冠羽、肩披蓑羽。十九世纪末其羽饰曾掀起毁灭性猎捕浪潮,直接催生英美现代鸟类保护运动。在中国南方稻田与湿地极为常见,自古即为诗词意象,是湿地生态健康的常见指示鸟类。",
    morphology: "通体纯白,喙细长而黑色,腿黑、趾鲜黄色,繁殖期枕后垂两条长冠羽,肩背披细散蓑羽。",
    habitat: "栖于稻田、河滩、湖滨与红树林缘浅水,单独或小群涉水觅食,集群营巢于乔木林梢。",
    distribution: "广布欧亚大陆南部、非洲与大洋洲;中国南方为常见留鸟,长江以北多为夏候鸟。",
    conservation: "LC",
    etymology: "属名源自法语 aigrette(白鹭及其冠羽);种加词 garzetta 采自意大利语对小白鹭的俗称。",
    discovery:
      "1758 年林奈定为苍鹭属 Ardea garzetta,后归白鹭属;十九世纪末鹭羽帽饰贸易致种群暴跌,催生英国皇家鸟类保护协会。",
    genomeInfo: "全基因组约 1.2 Gb,线粒体基因组已完整测序,是鹭科系统发育与羽色演化研究的代表种。",
    ecologyRole: "浅水湿地涉禽,捕食鱼虾、两栖类与水生昆虫,集群营巢形成混合鹭巢群,是湿地健康指示物种。",
    researchValue: "鹭科代表种,用于湿地污染监测与水鸟群体遗传研究;其羽饰贸易史是现代保育运动的起点案例。",
    tags: ["湿地指示种"],
  },
  {
    rank: "genus",
    latin: "Coturnix",
    chinese: "鹌鹑属",
    parent: "Phasianidae",
    description:
      "鹌鹑属为小型圆钝的鸡形目鸟类,翅尖尾短,迁徙性强,谷食为主,驯化品系产蛋量高,含家养鹌鹑的祖先日本鹌鹑等种。",
  },
  {
    rank: "species",
    latin: "Coturnix japonica",
    chinese: "日本鹌鹑",
    authority: "Temminck & Schlegel, 1849",
    parent: "Coturnix",
    description:
      "日本鹌鹑是东亚草原带的小型迁徙鸡形目鸟类,是家养鹌鹑的野生祖先。日本自中世纪起驯养其鸣声,二十世纪选育出全球主要的蛋用与肉用鹌鹑品系。其世代短、产蛋多、孵化快,与鸡的基因组高度共线,被广泛用作鸡形目发育生物学与性别决定研究的第二模式鸟类。",
    morphology: "体小圆钝,尾短翼尖,雄鸟颜面栗褐而具白色眉纹,雌鸟通体沙褐密布黑斑,成体体长约 18 厘米。",
    habitat: "栖于草原、河滩草甸与休耕农田,迁飞时集群,夜伏草丛,主食草籽、嫩芽与昆虫。",
    distribution: "繁殖于东北亚草原与农田,越冬于东南亚及南亚北部;驯化种群遍布全球各地。",
    ncbiTaxId: 93957,
    etymology: "属名 Coturnix 为拉丁语鹌鹑;种加词 japonica 意为日本的,指该种的模式产地日本。",
    discovery:
      "1849 年特明克与施莱格尔依日本标本定名;日本中世纪驯养其鸣唱,二十世纪转型为蛋用与肉用品系选育。",
    genomeInfo: "2n=78,全基因组约 1.1 Gb,与鸡高度共线,是鸡形目比较基因组与数量遗传研究的模式鸟类。",
    ecologyRole: "草原草甸的迁徙鸟类,食草籽与昆虫,集群迁徙,受捕猎与栖息地退化影响种群趋于下降。",
    researchValue: "家养鹌鹑的祖先与鸡形目第二模式鸟类,用于发育、性别决定、应激行为与卵用性状研究。",
    tags: ["模式生物", "经济物种", "驯化物种"],
  },
  // ===================== 哺乳纲 Mammalia =====================
  {
    rank: "family",
    latin: "Cricetidae",
    chinese: "仓鼠科",
    parent: "Rodentia",
    description:
      "仓鼠科为啮齿目最大的科,含仓鼠、田鼠、沙鼠与麝鼠等类群,臼齿齿型多样,适应从林地、冻原到荒漠的多样生境,广布新旧大陆。",
  },
  {
    rank: "genus",
    latin: "Mesocricetus",
    chinese: "金仓鼠属",
    parent: "Cricetidae",
    description:
      "金仓鼠属为中东地区的穴居仓鼠,颊囊极发达,体粗圆而尾短,金黄地鼠的实验品系与宠物种群均源自叙利亚少数奠基个体。",
  },
  {
    rank: "species",
    latin: "Mesocricetus auratus",
    chinese: "金黄地鼠",
    authority: "(Waterhouse, 1839)",
    parent: "Mesocricetus",
    description:
      "金黄地鼠是叙利亚干旱草原的穴居仓鼠,1930 年代从阿勒颇近郊捕获的一窝个体繁育出全球实验室与宠物种群,奠基者效应使其遗传多样性极低。其颊囊薄壁透光便于在体观察,冬眠生理独特,是胆固醇代谢、季节免疫与呼吸道病毒研究的经典动物,新冠疫情期间再度成为重要病毒模型。",
    morphology: "体粗圆,尾极短,耳小而圆,背毛金棕色、腹部灰白,足底密毛,颊囊极发达可膨至肩背暂存食物。",
    habitat: "野生栖于叙利亚至土耳其南部的干旱草原与农田边缘,穴居深洞、夜行;驯化种适应温暖干燥环境。",
    distribution: "野生种群仅限叙利亚北部与土耳其南部,驯化种群遍布全球实验室与家庭。",
    ncbiTaxId: 10029,
    etymology: "属名由希腊语 mesos(中间)与 cricetus(仓鼠)构成;种加词 auratus 意为金黄色的,指其毛色。",
    discovery:
      "1839 年沃特豪斯依叙利亚阿勒颇标本定名;1930 年捕获的少数个体繁育出现存全部实验与宠物种群。",
    genomeInfo: "2n=44,全基因组约 2.4 Gb,染色体级组装已发表,支撑呼吸病毒感染与冬眠生理研究。",
    ecologyRole: "草原穴居植食鼠类,大量贮粮越冬,天敌众多;驯化后为全球大宗宠物与实验动物。",
    researchValue: "重要实验动物,用于胆固醇代谢、冬眠、呼吸道病毒与利什曼原虫研究;亦是宠物市场大宗。",
    tags: ["模式生物", "驯化物种"],
  },
  {
    rank: "genus",
    latin: "Meriones",
    chinese: "沙鼠属",
    parent: "Muridae",
    description:
      "沙鼠属为荒漠草原的群居鼠类,后足加长善奔,尾长而被密毛、端部常具毛簇,以种子为食,含重要实验动物长爪沙鼠等。",
  },
  {
    rank: "species",
    latin: "Meriones unguiculatus",
    chinese: "长爪沙鼠",
    authority: "(Milne-Edwards, 1867)",
    parent: "Meriones",
    description:
      "长爪沙鼠是蒙古高原干旱草原的群居啮齿类,尾端具黑色毛簇,后足掌被毛适沙地奔跑。1935 年自蒙古引入日本的约二十对野生个体繁育出现存全球实验种群。其脑底动脉环发育不全的解剖特点使其成为脑缺血与中风研究的经典模型,亦广泛用于幽门螺杆菌感染及听觉研究。",
    morphology: "体细长,背毛沙黄褐、腹毛白色,尾长与体近等且被密毛、端部具黑色毛簇,足掌被毛,爪黑而锐。",
    habitat: "栖于干旱草原与沙质草地,群居复杂洞系,昼间活动,以草籽与植物地下茎为食并大量贮粮。",
    distribution: "分布于蒙古高原及中国内蒙古、华北北部干旱草原,亦见于俄罗斯外贝加尔地区。",
    etymology:
      "属名 Meriones 源自希腊语,一说取自荷马史诗中的勇士之名,喻其敏捷;种加词 unguiculatus 意为具小爪的。",
    discovery:
      "1867 年米尔纳-爱德华兹依中国北方标本定名;1935 年引入日本驯繁,后扩散至欧美实验动物体系。",
    genomeInfo: "2n=44,全基因组约 2.5 Gb,参考基因组已发表,支撑脑缺血模型与听觉退化比较研究。",
    ecologyRole: "荒漠草原的关键植食鼠种,洞群显著扰动土壤并促进植被异质性,对鼠疫等病原体高度敏感。",
    researchValue: "脑缺血研究的经典模型动物,亦用于幽门螺杆菌、癫痫、听力与亲本行为研究,遗传背景清晰。",
    tags: ["模式生物"],
  },
  {
    rank: "family",
    latin: "Caviidae",
    chinese: "豚鼠科",
    parent: "Rodentia",
    description:
      "豚鼠科为南美豚鼠形类啮齿动物,体粗短无尾,四肢短,群居性强,含豚鼠、长耳豚鼠与岩豚鼠等,多为开阔地带的穴居或岩栖动物。",
  },
  {
    rank: "genus",
    latin: "Cavia",
    chinese: "豚鼠属",
    parent: "Caviidae",
    description:
      "豚鼠属为南美草原啮齿类,体粗短而无尾,耳小,群居性,驯化种豚鼠为经典实验动物与安第斯地区的传统家畜。",
  },
  {
    rank: "species",
    latin: "Cavia porcellus",
    chinese: "豚鼠",
    authority: "(Linnaeus, 1758)",
    parent: "Cavia",
    description:
      "豚鼠是安第斯先民约五千年前驯化的草食啮齿动物,没有野生自然种群。因体内缺乏合成维生素 C 的酶,它是坏血病与维生素代谢研究的经典模型,也是免疫学、耳蜗听觉研究与传染病学的传统实验动物;在安第斯地区至今仍是重要的肉用家畜与民俗文化符号。",
    morphology: "体粗短而无尾,头大、耳小而圆,四肢短,被毛粗密,毛色从纯白、褐黑到花斑多样,成体约 1 公斤。",
    habitat: "家养驯化种,喜温暖干燥环境,原生于安第斯高原的宅院与草地,群居而具社会性。",
    distribution: "驯化于南美洲安第斯地区,作为肉用与实验动物引种至全球各地饲养。",
    ncbiTaxId: 10141,
    etymology:
      "属名 Cavia 源自南美原住民语言的 cabiai(豚鼠土名);种加词 porcellus 为拉丁语小猪,指其鸣声与体态似猪。",
    discovery:
      "1758 年林奈定名;驯化始于安第斯山区,十六世纪被西班牙人带回欧洲,渐成实验与伴侣动物。",
    genomeInfo: "2n=64;作为豚鼠形类分支的代表,其参考基因组已用于阐明南美啮齿动物的演化历史。",
    ecologyRole: "驯化草食动物,栖居安第斯农牧系统,以牧草与作物残余为食,是传统社会的蛋白来源与民俗对象。",
    researchValue: "经典实验动物,坏血病模型,广泛用于免疫学、耳科学、呼吸系统与传染病研究,亦为肉用家畜。",
    tags: ["模式生物", "驯化物种"],
  },
  {
    rank: "family",
    latin: "Hystricidae",
    chinese: "豪猪科",
    parent: "Rodentia",
    description:
      "豪猪科为旧大陆大型豪猪类,背具长而中空、扁可倒竖的棘刺与鬃毛,穴居夜行,植食性,遇敌竖棘并以倒身撞击御敌,含三属十余种。",
  },
  {
    rank: "genus",
    latin: "Hystrix",
    chinese: "豪猪属",
    parent: "Hystricidae",
    description:
      "豪猪属为旧大陆体型最大的啮齿类之一,体覆黑白相间的扁长棘刺,竖棘倒身可御敌,穴居而植食,广布亚欧大陆南部与非洲。",
  },
  {
    rank: "species",
    latin: "Hystrix brachyura",
    chinese: "马来豪猪",
    authority: "Linnaeus, 1758",
    parent: "Hystrix",
    description:
      "马来豪猪是旧大陆体型最大的啮齿类之一,自肩至尾覆黑白相间的扁长中空棘刺,遇敌竖刺并以短尾倒身撞击御敌。其植食与掘穴习性对森林种子传播与土壤扰动有独特作用,棘刺入药载于本草。因盗猎肉用与药用压力种群持续下降,中国于 2021 年将其升格为国家二级保护野生动物。",
    morphology: "体粗壮,背覆扁长中空、黑白相间的棘刺,颈肩具长鬃毛,尾短,四肢具强爪,体重可达 20 公斤。",
    habitat: "栖于山地常绿林、林缘灌丛与农地边缘,穴居岩隙或自掘土洞,夜行性,以根茎与落果为食。",
    distribution: "分布于南亚次大陆、东南亚至中国长江以南的山地林区,种群受盗猎影响而下降。",
    conservation: "LC",
    etymology:
      "属名 Hystrix 为希腊语豪猪(刺猪);种加词 brachyura 由希腊语 brachys(短)与 oura(尾)构成,指其短尾。",
    discovery:
      "1758 年林奈定名;中国本草古籍早载其棘刺入药,2021 年新版国家重点保护名录将其升为二级。",
    genomeInfo: "全基因组研究尚少,作为旧大陆豪猪科的代表种,已被纳入啮齿目比较基因组学的目标类群。",
    ecologyRole: "夜行地栖植食者,掘穴松土、传播大粒种子,是南方山地森林生态系统的改造者。",
    researchValue: "传统药用与狩猎物种,种群受盗猎威胁下降,已成为啮齿目保护与管理研究的关注对象。",
    tags: ["国家二级保护"],
  },
  {
    rank: "family",
    latin: "Spalacidae",
    chinese: "鼹形鼠科",
    parent: "Rodentia",
    description:
      "鼹形鼠科为高度适应地下生活的啮齿类,含竹鼠、鼢鼠与盲鼠等类群,眼耳多退化,门齿与前爪适掘,植食地下茎,分布亚欧非。",
  },
  {
    rank: "genus",
    latin: "Rhizomys",
    chinese: "竹鼠属",
    parent: "Spalacidae",
    description:
      "竹鼠属为东亚竹林中的大型穴居鼠类,体粗圆,眼小耳隐,爪扁直适掘,以竹笋与竹根为食,含中华竹鼠等四种。",
  },
  {
    rank: "species",
    latin: "Rhizomys sinensis",
    chinese: "中华竹鼠",
    authority: "(Gray, 1831)",
    parent: "Rhizomys",
    description:
      "中华竹鼠是中国南方山地竹林的大型穴居啮齿类,以竹笋、竹根与芒草地下茎为食,四肢粗壮、爪扁直适掘,洞系复杂。其肉用养殖曾是南方山区重要的特色产业,2020 年全面禁食陆生野生动物政策实施后,养殖产业整体退出转型,成为野生动物利用政策研究的标志性案例。",
    morphology: "体粗圆钝,眼小而耳隐于毛中,吻钝圆,背毛灰褐带锈色,爪扁直强锐适掘,尾短而被稀疏短毛。",
    habitat: "栖于山地竹林与芒草坡地,昼伏夜出,栖自掘洞系,洞道多开口于竹丛根下,洞内具巢室与粪洞。",
    distribution: "分布于中国华南、华中与西南山地,亦见于缅甸北部与越南北部的竹林山地。",
    etymology:
      "属名 Rhizomys 由希腊语 rhiza(根)与 mys(鼠)构成,指其掘食根茎的习性;种加词 sinensis 意为中国的。",
    discovery:
      "1831 年格雷依中国南方标本定名;2020 年禁食陆生野生动物政策实施后,其规模养殖产业整体退出转型。",
    genomeInfo: "全基因组数据仍有限,作为鼹形鼠科的东亚代表,其地下挖掘与竹食适应的基因组学研究待补。",
    ecologyRole: "竹林地下生态的改造者,掘食竹笋根茎、疏松土壤,复杂洞系为多种动物提供隐蔽场所。",
    researchValue: "原为南方特种养殖的主力物种,其产业转型成为野生动物政策研究的案例;亦为鼹形鼠类演化材料。",
    tags: ["经济物种"],
  },
];
