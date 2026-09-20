import { TaxonSeed } from "../types";

// 环节动物门多毛纲深扩充种子数据(Task E7-a,expansion5)。
// 主题:多毛纲 11 物种 —— 沙蠋(经典泥滩生物扰动者)、缨鳃虫(地中海大扇虫/入侵种)、
// 大旋鳃虫(圣诞树蠕虫)、龙介虫(钙质管/污损生物)、毛翼虫(发光黏液/悬浮取食)、
// 蜂窝帚毛虫(生物造礁)、博比特虫(伏击捕食者)、多鳞虫、鳞沙蚕(共栖鳞虫)、
// 双鳃吻沙蚕(血虫饵料/毒颚)、大角蛰虫(北海沙塔建造者)。
// 每个物种均含 5 项科学档案字段(etymology / discovery / genomeInfo / ecologyRole / researchValue)。
// species 的 parent 引用两类来源:
//   1) DB 已有分类单元(/tmp/taxa-inventory.tsv,2378 条):
//      Annelida(环节动物门)/ Polychaeta(多毛纲)/ Phyllodocida(叶须虫目);
//   2) 本文件内先行定义的新中间阶元(3 目 / 9 科 / 11 属,共 23 条)。
// 目级归属按任务规约:沙蠋科、多鳞虫科、吻沙蚕科挂 Phyllodocida(广义的叶须虫目);
// 毛翼虫科挂 Sabellida;矶沙蚕目、蛰龙介目为新建目,挂 Polychaeta。
// 查重已跳过清单已有单元:双齿围沙蚕、沙蚕(Nereis virens)、杜氏阔沙蚕及其属科;
// 文件内 34 条拉丁名与中文名均无重复,与清单 2378 条零冲突。
// 学名核验策略:z-ai 网络搜索仍 429 限流(60 秒时限内失败),按离线把握值直书;
// authority 11/11 全录(多为林奈、帕拉斯等高把握项),conservation 与 ncbiTaxId 宁缺毋滥全省略。
export const expansion5Polychaetes: TaxonSeed[] = [
  // ===================== 一、沙蠋科 Arenicolidae(挂 Phyllodocida,1 种) =====================
  {
    rank: "family",
    latin: "Arenicolidae",
    chinese: "沙蠋科",
    parent: "Phyllodocida",
    description:
      "沙蠋科为体粗壮的穴居多毛类,身体前后分化明显,潜居沙质滩涂 L 形管穴,吞食泥沙消化其中有机质,粪沙堆排回滩面,是泥滩生物扰动的代表类群。",
  },
  {
    rank: "genus",
    latin: "Arenicola",
    chinese: "沙蠋属",
    parent: "Arenicolidae",
    description:
      "沙蠋属为泥沙滩穴居的大型多毛虫,体粗短、头端具吻而无触手,潜 L 形管穴吞泥消化,滩面遗留螺旋状粪堆,含欧洲研究逾二百年的模式种沙蠋。",
  },
  {
    rank: "species",
    latin: "Arenicola marina",
    chinese: "沙蠋",
    authority: "(Linnaeus, 1758)",
    parent: "Arenicola",
    description:
      "沙蠋是欧洲与东北大西洋泥沙滩的标志性穴居多毛虫,潜居深二十余厘米的 L 形管穴,整日吞食泥沙、消化有机质后将粪沙排回滩面。其泵水灌溉管穴,显著改变沉积物含氧量与氮循环,被视为生物扰动研究的经典物种;滩面上螺旋状的粪沙堆是最易辨认的生物痕迹之一。",
    morphology: "体粗壮前端渐细,长可达二十厘米,后部膨大呈囊状,红色体壁透出血红蛋白,头端具吻无触手。",
    habitat: "栖于中低潮带至浅海的细沙与泥沙底,潜 L 形管穴,穴道深可达三十厘米。",
    distribution: "东北大西洋欧洲沿岸,自不列颠、北海至波罗的海与地中海西部;北大西洋西部偶有记录。",
    etymology:
      "属名源自拉丁语 arena(沙)与 colere(栖居),意为「沙居者」;种加词 marina 意为海生的。",
    discovery:
      "林奈 1758 年在《自然系统》第十版中依欧洲标本定名。此后因泥滩取样便利,成为生物扰动、呼吸生理与环境毒理研究积累最深厚的多毛类之一。",
    genomeInfo:
      "已开展群体基因组与转录组学研究,用于解析潮间带缺氧耐受与种群分化;全基因组精细组装仍待完善。",
    ecologyRole:
      "生态系统工程师:吞食沉积物促进有机质矿化,泵水灌溉改善深层供氧,粪堆改变滩面微地形,亦为迁徙水鸟与鱼类提供食物。",
    researchValue:
      "生物扰动与生物灌溉研究的全球模式种,营养盐循环与沉积环境监测的重要对象,作为钓饵在欧洲沿岸有长期采捕传统。",
    tags: ["经济物种", "生态关键种"],
  },

  // ===================== 二、缨鳃虫目 Sabellida(新建,挂 Polychaeta,5 种) =====================
  {
    rank: "order",
    latin: "Sabellida",
    chinese: "缨鳃虫目",
    parent: "Polychaeta",
    description:
      "缨鳃虫目为管栖滤食多毛类,头部特化成扇状羽鳃冠,栖于革质或钙质管中,伸出鳃冠滤食悬浮颗粒,含缨鳃虫、龙介虫、帚毛虫等科,广布各纬度浅海。",
  },
  {
    rank: "family",
    latin: "Sabellidae",
    chinese: "缨鳃虫科",
    parent: "Sabellida",
    description:
      "缨鳃虫科栖于泥沙黏合的革质管中,头端伸出两扇羽状鳃冠,色彩常鲜艳夺目,滤食水中悬浮颗粒,广布温带与热带浅海,部分种为入侵与污损生物学名种。",
  },
  {
    rank: "genus",
    latin: "Sabella",
    chinese: "缨鳃虫属",
    parent: "Sabellidae",
    description:
      "缨鳃虫属为大型管栖多毛虫,栖管坚韧,头端两扇羽状鳃冠螺旋展开如扇花,滤食悬浮颗粒,含地中海至大西洋常见的大型模式种。",
  },
  {
    rank: "species",
    latin: "Sabella spallanzanii",
    chinese: "缨鳃虫",
    authority: "(Gmelin, 1791)",
    parent: "Sabella",
    description:
      "缨鳃虫是地中海原产的大型管栖多毛虫,俗称地中海大扇虫,头端一对羽状鳃冠展开如彩色扇面,滤食水中悬浮颗粒。群落密集时显著改变底表结构;后被船只携带入侵澳大利亚与新西兰南部,成为污损生态与入侵生物学研究的著名案例。",
    morphology: "体大型,两扇羽状鳃冠展开可逾十厘米,橙紫相间,体分胸腹两部,栖管为泥沙黏合的革质管。",
    habitat: "栖于数米至数十米深的泥沙与砾石底,亦大量固着于码头、船底与养殖网笼等人工设施。",
    distribution: "原产地中海与东北大西洋,已入侵澳大利亚南部、新西兰等南半球温带海域。",
    etymology:
      "属名 Sabella 词源存疑,或与拉丁语 sabulum(粗沙)相关;种加词纪念意大利博物学家斯帕兰扎尼。",
    discovery:
      "格梅林 1791 年依地中海标本定名。二十世纪末随船底污损与压舱水扩散至南澳大利亚,菲利普港湾的暴发使其成为入侵生态学经典研究对象。",
    genomeInfo:
      "尚无参考基因组,已有针对重金属与藻毒素暴露的转录组与生物标志物研究。",
    ecologyRole:
      "密集滤食者与底表结构改造者,大量抽取悬浮物、增加生境复杂度;入侵区与本地底栖生物竞争空间。",
    researchValue:
      "海洋污损生物学与入侵管理的模型种,广泛用作重金属污染与生物毒素的生态毒理学指示材料。",
    tags: ["入侵物种", "污损生物"],
  },
  {
    rank: "family",
    latin: "Serpulidae",
    chinese: "龙介虫科",
    parent: "Sabellida",
    description:
      "龙介虫科为分泌钙质栖管的管栖多毛类,具漏斗状口盖可严密封堵管口,鳃冠色彩鲜明,固着于岩石、贝壳与船底等硬底,是污损生物群的典型代表。",
  },
  {
    rank: "genus",
    latin: "Spirobranchus",
    chinese: "旋鳃虫属",
    parent: "Serpulidae",
    description:
      "旋鳃虫属栖于钙质螺旋管中,栖管常嵌入活珊瑚骨骼,两枚螺旋树状鳃冠色彩艳丽,受惊瞬间缩回管中并以角质口盖封管,含珊瑚礁明星圣诞树蠕虫。",
  },
  {
    rank: "species",
    latin: "Spirobranchus giganteus",
    chinese: "大旋鳃虫",
    authority: "(Pallas, 1766)",
    parent: "Spirobranchus",
    description:
      "大旋鳃虫即潜水者熟知的「圣诞树蠕虫」,栖于嵌入活珊瑚骨骼的钙质管中,伸出两枚螺旋树状鳃冠,红黄蓝紫各色俱全。鳃冠兼司滤食与呼吸,受光影或水流惊扰瞬间缩回管内封盖;其生存依赖造礁珊瑚,常被用作珊瑚健康状况的直观指示物种。",
    morphology: "体长可达四厘米,两枚螺旋鳃冠形如小圣诞树,直径一至二厘米,体色变异极为丰富。",
    habitat: "栖于热带珊瑚礁,钙质管埋入活的块状与枝状珊瑚骨骼,仅露鳃冠于礁面之上。",
    distribution: "印度-太平洋热带海域广布,自红海至西太平洋诸岛礁,加勒比海另有近缘种群。",
    etymology:
      "属名由希腊语 speira(螺旋)与 branchia(鳃)组成,指螺旋树状鳃冠;种加词 giganteus 意为巨大的。",
    discovery:
      "帕拉斯 1766 年定名。因鳃冠形态成为珊瑚礁摄影明星,其与宿主珊瑚的专性栖居关系经大量潜水观察与生态研究记录,隐存种分化近年受关注。",
    genomeInfo:
      "已开展物种界定与系统发育研究,全基因组测序尚未见系统报道。",
    ecologyRole:
      "专性栖居于活珊瑚的悬食者,鳃冠扰动礁面微水流;其数量与宿主珊瑚存活状况直接相关。",
    researchValue:
      "研究管栖多毛类与造礁珊瑚互作的代表种,其瞬间缩管反应与光感受行为是快速防御与感觉生态的经典教材。",
    tags: ["观赏动物", "珊瑚共生"],
  },
  {
    rank: "genus",
    latin: "Serpula",
    chinese: "龙介虫属",
    parent: "Serpulidae",
    description:
      "龙介虫属分泌盘曲钙质管固着硬底,红色漏斗状口盖为典型识别特征,鳃冠红白相间,既是污损生物群落常见成员,亦是钙质管矿化研究经典属。",
  },
  {
    rank: "species",
    latin: "Serpula vermicularis",
    chinese: "龙介虫",
    authority: "Linnaeus, 1767",
    parent: "Serpula",
    description:
      "龙介虫是东北大西洋与地中海常见的钙质管管栖多毛虫,附于石块、贝壳与船底等硬底,以红白相间的扇状鳃冠滤食,红色漏斗状口盖可将管口严密封堵。个体管长可达二十厘米;在苏格兰与爱尔兰的少数封闭海湾,密集群落层层堆叠可形成罕见的龙介虫生物礁。",
    morphology: "钙质栖管白色盘曲,鳃冠扇状红白相间,口盖漏斗形如烟囱,管径数毫米。",
    habitat: "固着于潮下带至百米内的岩石、贝壳、船底与浮标等硬质基底,喜缓流处。",
    distribution: "东北大西洋、北海与地中海,亚得里亚海亦有报告;苏格兰与爱尔兰湖湾见生物礁。",
    etymology:
      "属名为拉丁语「小蛇」,指蛇行盘曲的钙质栖管;种加词 vermicularis 意为蠕虫状的。",
    discovery:
      "林奈 1767 年在《自然系统》第十二版中定名。其钙质管自古引起博物学者兴趣,苏格兰湖湾的层状龙介虫礁自二十世纪起受到研究与保护。",
    genomeInfo:
      "基因组测序尚未见系统报道;钙质管生物矿化机制已有组织学与地球化学研究积累。",
    ecologyRole:
      "硬底悬食者与三维结构提供者,礁状堆积显著提升局部生物多样性,亦是船底污损群落的常见成员。",
    researchValue:
      "钙质管生物矿化与海洋酸化影响研究的经典对象,抗污损涂层开发常用的测试物种。",
    tags: ["污损生物", "经典实验材料"],
  },
  {
    rank: "family",
    latin: "Chaetopteridae",
    chinese: "毛翼虫科",
    parent: "Sabellida",
    description:
      "毛翼虫科体分三区、各段疣足形态迥异,栖 U 形革质管中,以翼状疣足鼓动水流并分泌黏液网滤食,部分种黏液遇扰可发蓝光,是悬浮取食特化的代表类群。",
  },
  {
    rank: "genus",
    latin: "Chaetopterus",
    chinese: "毛翼虫属",
    parent: "Chaetopteridae",
    description:
      "毛翼虫属栖于 U 形纸革质管,体前中后三区形态特异,中区翼状疣足昼夜鼓水,分泌黏液网滤取悬浮颗粒,黏液受扰发蓝光,属内以毛翼虫最著名。",
  },
  {
    rank: "species",
    latin: "Chaetopterus variopedatus",
    chinese: "毛翼虫",
    authority: "(Renier, 1804)",
    parent: "Chaetopterus",
    description:
      "毛翼虫栖于泥沙底的 U 形纸革质管中,身体分前中后三区,疣足形态迥异:中区翼状背叶如桨,昼夜鼓水驱动管内水流,同时分泌黏液网滤取悬浮颗粒。受扰时分泌大量黏液并可发蓝光,其发光机制研究逾百年,是海洋发光生物学的经典材料。",
    morphology: "体长可达二十厘米上下,三区异形:前区扁、中区具翼状疣足、后区柱状,体色淡黄带暗斑。",
    habitat: "栖于泥沙与贝壳碎屑底,筑 U 形革质管横卧表层之下,管口两端露出底面。",
    distribution: "温带各大洋沿岸均有分布记录,地中海、东北大西洋与西北太平洋皆有报告。",
    etymology:
      "属名由希腊语 chaite(刚毛)与 pteron(翼)组成,指翼状疣足;种加词 variopedatus 意为「异足的」。",
    discovery:
      "雷尼耶 1804 年依亚得里亚海标本定名。其分区化的身体构造与滤食机制自十九世纪起被反复解析,近年分子证据提示其为隐存种复合群。",
    genomeInfo:
      "已发表线粒体基因组与发育相关转录组,作为体分区化研究材料的基因组资源仍在充实。",
    ecologyRole:
      "管内单向水流加黏液网使其成为高效悬食者,废弃栖管为小型鱼类与甲壳类提供庇护所。",
    researchValue:
      "体区分化与疣足形态建成的经典发育学材料,发光机理与黏液分泌亦受化学与仿生学长期关注。",
    tags: ["经典实验材料"],
  },
  {
    rank: "family",
    latin: "Sabellariidae",
    chinese: "帚毛虫科",
    parent: "Sabellida",
    description:
      "帚毛虫科为群体造礁多毛类,以沙粒与壳屑粘合成硬质栖管,密集丛生成蜂窝状礁块,管口伸出金色端生刚毛构成的过滤冠,是暖温带岩岸显著的生物造礁者。",
  },
  {
    rank: "genus",
    latin: "Sabellaria",
    chinese: "帚毛虫属",
    parent: "Sabellariidae",
    description:
      "帚毛虫属群居于沙粒粘合的硬质管中,密集丛生成蜂窝礁,管口一圈金色刚毛兼作过滤筛,幼体对底质颗粒有主动选择行为,含欧洲造礁名种蜂窝帚毛虫。",
  },
  {
    rank: "species",
    latin: "Sabellaria alveolata",
    chinese: "蜂窝帚毛虫",
    authority: "(Pallas, 1766)",
    parent: "Sabellaria",
    description:
      "蜂窝帚毛虫为欧洲岩岸的造礁多毛虫,以吻部分选沙粒并分泌粘合剂筑管,成百上千管密集成蜂窝状礁盘,绵延可达数公顷。管口伸出金色刚毛冠滤食悬浮物;蜂窝礁抬高滩面、滞留碎屑,显著提升局部生物多样性,法国圣米歇尔湾的巨型蜂窝礁是欧洲最著名的例证。",
    morphology: "体长三至四厘米,栖管由沙粒粘合而成,管口一圈金色端生刚毛,体色橙黄带紫褐纹。",
    habitat: "固着于中低潮带岩石与贝砾底,幼体喜择粗沙定居,礁体发育需适度波浪扰动。",
    distribution: "东北大西洋自英国至摩洛哥沿岸,地中海西部亦有蜂窝礁报告。",
    etymology:
      "属名 Sabellaria 意为「小缨鳃虫」,指触手冠形态;种加词源自 alveolus(蜂窝小室),指蜂窝状礁体。",
    discovery:
      "帕拉斯 1766 年定名。十九世纪法国学者已详述其造礁行为,圣米歇尔湾绵延数公里的蜂窝礁自二十世纪成为生物造礁与海岸管理的标志性案例。",
    genomeInfo:
      "已有群体遗传与幼体附着行为研究,粘合物质的蛋白质组学近年有报道,全基因组资源尚在起步。",
    ecologyRole:
      "生态系统工程师:蜂窝礁营造三维硬结构,为藻类、贝类与幼鱼提供附着与庇护空间,亦缓冲波浪对底质的侵蚀。",
    researchValue:
      "生物沉积构造与天然粘合剂研究的模式种,其水下粘接机理受仿生材料学关注,礁体保育是海岸带管理课题。",
    tags: ["生态关键种"],
  },

  // ===================== 三、矶沙蚕目 Eunicida(新建,挂 Polychaeta,1 种) =====================
  {
    rank: "order",
    latin: "Eunicida",
    chinese: "矶沙蚕目",
    parent: "Polychaeta",
    description:
      "矶沙蚕目为体节众多的游走多毛类,咽具可外翻的复杂复颚器,多为穴居的伏击捕食者,含矶沙蚕、岩虫等类群,部分种体长可达数米,热带礁区常见。",
  },
  {
    rank: "family",
    latin: "Eunicidae",
    chinese: "矶沙蚕科",
    parent: "Eunicida",
    description:
      "矶沙蚕科为大型穴居多毛类,头具五枚触角,咽可外翻并露出复杂颚器,多为夜行伏击捕食者,栖于热带礁坡沙穴,含著名的博比特虫等巨型种。",
  },
  {
    rank: "genus",
    latin: "Eunice",
    chinese: "矶沙蚕属",
    parent: "Eunicidae",
    description:
      "矶沙蚕属体节众多而体长巨大,头具五触角,咽外翻时露出黑镰状颚器,夜间伏击猎物,含博比特虫等大型伏击捕食种,礁沙底质常见其穴道。",
  },
  {
    rank: "species",
    latin: "Eunice aphroditois",
    chinese: "博比特虫",
    authority: "(Pallas, 1788)",
    parent: "Eunice",
    description:
      "博比特虫是体长可近三米的大型伏击捕食多毛虫,栖于热带礁坡沙砾中的长穴道,仅露五枚触角于穴口感知猎物。感知到鱼虾靠近时以闪电般的速度弹出颚器咬合拖入穴中;因其奇异形象与水族箱「隐匿杀手」逸闻,成为大众科普中知名度最高的多毛虫。",
    morphology: "体长可达三米、体节数百,体表虹彩泛紫绿色,头具五触角,咽外翻时露出黑镰状颚器。",
    habitat: "穴居于热带珊瑚礁坡的沙砾与礁岩碎屑下,穴道深而多分支,守于穴口待猎。",
    distribution: "印度-太平洋热带与亚热带海域,自红海、东非沿岸至西太平洋诸岛礁。",
    etymology:
      "属名 Eunice 源自希腊神话海仙女欧尼刻之名;种加词与爱神阿芙洛狄忒相关。「博比特」为二十世纪末美国新闻逸闻衍生的英语俗名。",
    discovery:
      "帕拉斯 1788 年定名,科学描述历史悠久;「博比特虫」俗名随水族爱好者与纪录片传播而流行,其捕击速度近年才被定量测定。",
    genomeInfo:
      "大型多毛类全基因组测序困难,该种分子数据仍以线粒体与条形码片段为主。",
    ecologyRole:
      "礁区沉积环境的顶级伏击捕食者,调节底栖鱼类与甲壳类种群,废弃穴道为多种生物提供次生栖所。",
    researchValue:
      "颚器高速击发机制与几丁质颚材料力学受仿生学关注,是研究伏击捕食感觉与运动整合的极端案例。",
  },

  // ===================== 四、多鳞虫科 Polynoidae 与吻沙蚕科 Glyceridae(挂 Phyllodocida,3 种) =====================
  {
    rank: "family",
    latin: "Polynoidae",
    chinese: "多鳞虫科",
    parent: "Phyllodocida",
    description:
      "多鳞虫科俗称鳞虫,背面覆以疣足背叶特化成的覆瓦状鳞片,可自由生活或与海绵、棘皮动物共栖,遇敌能自断鳞片脱身,全球已记载逾八百种。",
  },
  {
    rank: "genus",
    latin: "Harmothoe",
    chinese: "多鳞虫属",
    parent: "Polynoidae",
    description:
      "多鳞虫属体椭圆形,背鳞十五对覆瓦排列,栖石下或与棘皮动物共栖,广布冷温带与极地浅海,属内以模式种多鳞虫研究积累最深。",
  },
  {
    rank: "species",
    latin: "Harmothoe imbricata",
    chinese: "多鳞虫",
    authority: "(Linnaeus, 1767)",
    parent: "Harmothoe",
    description:
      "多鳞虫是北大西洋冷温带的典型鳞虫,背面覆十五对覆瓦状排列的背鳞,受敌可自断鳞片脱身。常栖石块与海藻之下,亦见附于海星等棘皮动物体表共栖,捕食小型底栖动物;其分布环绕北方温带浅海,是底栖群落与共栖生态研究的常见对象。",
    morphology: "体椭圆形,长数厘米,背鳞十五对、缘饰细毛,体色灰褐至紫红,常泛虹彩光泽。",
    habitat: "栖于低潮线至数百米深的石下、海藻根部与海绵间,亦共栖于海星等棘皮动物体表。",
    distribution: "环北大西洋温带至北极浅海,北太平洋亦有其近缘类群记录。",
    etymology:
      "属名 Harmothoe 词源存疑,或与希腊语 harmozein(连接)相关;种加词 imbricata 意为覆瓦状排列的,指鳞片叠覆。",
    discovery:
      "林奈 1767 年依欧洲标本定名。二百余年来作为北方浅海最常见鳞虫之一被反复记述,共栖关系与鳞片再生研究持续至今。",
    genomeInfo:
      "染色体核型与线粒体数据已有零星报道,全基因组测序尚未完成。",
    ecologyRole:
      "中型捕食兼食腐者,调控石下小型动物种群;与棘皮动物的共栖关系是研究种间互利的天然样本。",
    researchValue:
      "鳞片自切与再生、共栖特化研究材料,亦用于北大西洋生物地理与底栖群落结构分析。",
  },
  {
    rank: "genus",
    latin: "Lepidonotus",
    chinese: "鳞沙蚕属",
    parent: "Polynoidae",
    description:
      "鳞沙蚕属体短粗,背鳞十二对几乎完全覆盖背面,栖石下碎壳与贝藻丛间,冷温带浅海底栖群落常见,是鳞虫类形态教学与分类的入门代表属。",
  },
  {
    rank: "species",
    latin: "Lepidonotus squamatus",
    chinese: "鳞沙蚕",
    authority: "(Linnaeus, 1758)",
    parent: "Lepidonotus",
    description:
      "鳞沙蚕是北大西洋冷温带浅海常见的短体鳞虫,背面十二对宽大背鳞覆瓦排列,几乎完全覆盖体节。栖于石块碎壳之间,捕食小型底栖动物,常群聚于贻贝床与藤壶丛;因其广布与特征典型,常作为北方底栖调查与分类学实习的入门鳞虫。",
    morphology: "体短粗,长约三厘米,背鳞十二对宽大如覆瓦,边缘具纤毛,体色黄褐杂斑。",
    habitat: "栖于低潮带至数十米深的石下、碎壳、贻贝床与藤壶丛间。",
    distribution: "北大西洋两岸温带至亚北极海域,波罗的海亦有记录。",
    etymology:
      "属名由希腊语 lepis(鳞)与 noton(背)组成,意为「背具鳞」;种加词 squamatus 意为有鳞的。",
    discovery:
      "林奈 1758 年在《自然系统》第十版定名,原置于当时广义的鳞虫组合内,后归入现属,是鳞虫类最早定名的物种之一。",
    genomeInfo:
      "分子系统学中用作多鳞虫科代表种之一,基因组级别数据尚缺。",
    ecologyRole:
      "底栖中小型捕食与食腐者,是石下群落与贻贝床食物网的重要一环,亦为鱼类饵料。",
    researchValue:
      "多鳞虫科分类与形态教学的代表种,用于示范背鳞结构、覆瓦排列与鳞虫自切行为。",
  },
  {
    rank: "family",
    latin: "Glyceridae",
    chinese: "吻沙蚕科",
    parent: "Phyllodocida",
    description:
      "吻沙蚕科体长环节多,具长而可外翻的吻,吻端四枚黑色颚齿可刺入猎物并注入毒液,多栖沙质浅海底,部分种为重要采捞饵料,俗称血虫。",
  },
  {
    rank: "genus",
    latin: "Glycera",
    chinese: "吻沙蚕属",
    parent: "Glyceridae",
    description:
      "吻沙蚕属体长圆柱形,吻可外翻近半体长,吻端四枚黑颚具毒,血液富集血红蛋白而体色红艳,北美「血虫」渔业即取材于本属,种数逾八十。",
  },
  {
    rank: "species",
    latin: "Glycera dibranchiata",
    chinese: "双鳃吻沙蚕",
    authority: "Ehlers, 1868",
    parent: "Glycera",
    description:
      "双鳃吻沙蚕是北美大西洋沿岸泥沙滩的名贵钓饵「血虫」,体液富含血红蛋白而通体鲜红。吻可外翻近半体长,末端四枚黑颚能刺入猎物并注入毒液;其巨大细胞外血红蛋白的结构与氧输送机理研究深入,曾被探索作为血液代用品的分子模型,北美有规模化采捕产业。",
    morphology: "体长可达三十厘米上下,环节密而体表光滑,吻端具四枚黑颚,鳃红色,体色粉红至暗红。",
    habitat: "穴居于潮间带至数十米深的泥沙滩与粉沙底,穴道分支不定形。",
    distribution: "北大西洋西北部,自加拿大东部沿岸至美国东南部,并见于墨西哥湾。",
    etymology:
      "属名 Glycera 源自希腊语 glykys(甜的),借自古时人名;种加词意为「二鳃的」,指疣足具两型鳃。",
    discovery:
      "埃勒斯 1868 年依北美标本定名。作为「血虫」钓饵支撑起缅因湾沿岸传统采挖渔业,其血红蛋白自二十世纪中叶起成为结构生物学经典对象。",
    genomeInfo:
      "巨大血红蛋白的基因与蛋白结构研究充分,全基因组数据近年才开始积累。",
    ecologyRole:
      "沙质穴居捕食者,取食小型底栖动物,穴道增强沉积物通透性,亦为鱼类重要天然饵料。",
    researchValue:
      "巨大细胞外血红蛋白作为氧载体分子模型被长期研究,毒液成分进入多毛类毒理学视野,兼具经济与科学价值。",
    tags: ["经济物种", "有毒动物"],
  },

  // ===================== 五、蛰龙介目 Terebellida(新建,挂 Polychaeta,1 种) =====================
  {
    rank: "order",
    latin: "Terebellida",
    chinese: "蛰龙介目",
    parent: "Polychaeta",
    description:
      "蛰龙介目为管居多毛类,体前端具多条丝状触手,以触手收集沉积物表面碎屑为食,栖泥沙管中,含蛰龙介等科,是软底群落生物量的重要组成。",
  },
  {
    rank: "family",
    latin: "Terebellidae",
    chinese: "蛰龙介科",
    parent: "Terebellida",
    description:
      "蛰龙介科栖于泥沙管中,头端多条长触手收集底表碎屑,鳃丝簇生于体前部背侧,管口常缀饰沙粒与壳屑,广布各纬度软底,种数逾四百。",
  },
  {
    rank: "genus",
    latin: "Lanice",
    chinese: "蛰龙介属",
    parent: "Terebellidae",
    description:
      "蛰龙介属栖于直立于泥沙中的栖管,管顶伸出缀沙的膜质饰缘与成束长触手,高密度群聚隆起成沙塔,是北海著名的「沙塔建造者」类群。",
  },
  {
    rank: "species",
    latin: "Lanice conchilega",
    chinese: "大角蛰虫",
    authority: "(Pallas, 1766)",
    parent: "Lanice",
    description:
      "大角蛰虫是北海与东北大西洋泥沙底的「沙塔建造者」,栖于直立泥沙管中,管顶伸出缀满沙粒的膜质饰缘与成束长触手,以触手扫集底表碎屑为食。高密度群聚可在滩面隆起成片沙塔,显著改造底质结构;这类管聚礁提升生物多样性,被誉为温带的生物建群者。",
    morphology: "体长可达十余厘米,栖管直立于泥沙中并露出数厘米,管顶膜质饰缘缀沙,触手多而长。",
    habitat: "栖于潮下带至数十米深的泥沙与沙底,喜中等水动力处,常高密度群聚成片。",
    distribution: "东北大西洋自挪威至伊比利亚沿岸,北海与波罗的海西部,地中海亦有报告。",
    etymology:
      "属名 Lanice 或源自拉丁语 lana(羊毛),指柔细长触手;种加词由 concha(贝壳)与 legere(收集)构成,指管表缀集壳屑沙粒。",
    discovery:
      "帕拉斯 1766 年定名。北海潮下带成片「沙塔」群聚自二十世纪中叶进入生态学视野,成为底栖生境工程研究的重点对象。",
    genomeInfo:
      "已有微卫星标记与群体遗传研究,基因组级别数据尚缺。",
    ecologyRole:
      "生态系统工程师:管群增加底表复杂度与沉积物-水界交换,为幼鱼与小型甲壳类提供庇护,聚礁区多样性显著高于裸底。",
    researchValue:
      "温带生物建群与管聚礁生态的模式种,用于研究空间结构对底栖群落的影响,亦为砂质浅海生境修复参照类群。",
    tags: ["生态关键种"],
  },
];
