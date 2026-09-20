import { TaxonSeed } from "../types";

// 旗舰物种补全种子数据(Task 6-main expansion4 icons)。
// 背景:QA 实测发现「帮我对比老虎和狮子」时 Panthera leo(狮)缺失 —— Panthera 属仅存虎与雪豹。
// 本文件补全 16 个全球标志性物种 + 6 新中间阶元(3 科 + 6 属,长颈鹿科/河马科/犀科 + 各属)。
// 查重依据:/tmp/taxa-inventory.tsv(2379 条),全部物种与阶元均不在库中。
// 每个物种均含 5 项科学档案字段(etymology / discovery / genomeInfo / ecologyRole / researchValue)。
export const expansion4Icons: TaxonSeed[] = [
  // ===================== 一、猫科旗舰(4 种) =====================
  {
    rank: "genus",
    latin: "Acinonyx",
    chinese: "猎豹属",
    parent: "Felidae",
    description:
      "猎豹属为猫科中高度特化的陆栖追猎支系,爪不能完全回缩、躯干细长,以陆地短距冲刺速度著称,现仅存猎豹一种。",
  },
  {
    rank: "species",
    latin: "Panthera leo",
    chinese: "狮",
    authority: "(Linnaeus, 1758)",
    parent: "Panthera",
    conservation: "VU",
    ncbiTaxId: 9691,
    description:
      "狮是现存体型第二大的猫科动物,也是唯一稳定群居的猫科,雌狮结群合作狩猎、雄狮以鬃毛与吼声竞争领地。历史上广布欧亚非大陆,如今野生种群主要残存于撒哈拉以南非洲与印度吉尔保护区。作为「草原之王」的文化符号与保护旗舰,其种群百年间缩减逾九成。",
    morphology: "体格粗壮,头体长可达两米余,雄狮颈部具标志性鬃毛,尾端有一撮黑色丛毛,毛色沙黄。",
    habitat: "栖于稀树草原、开阔灌丛与半荒漠,避让密林与沙漠腹地,有水伏击水源地猎物。",
    distribution: "撒哈拉以南非洲东部与南部为主,印度吉尔森林存一小群;北非与中东种群已区域性灭绝。",
    etymology:
      "种加词 leo 即拉丁语「狮」,词源或与希腊 leōn 同源,林奈 1758 年直取古名;中文「狮」为西域译音古字,汉代作「师子」。",
    discovery:
      "林奈 1758 年依北非与印度标本定名;20 世纪依据形态与线粒体研究将狮划分数亚种,2017 年后多采「北方狮-南方狮」两支或更细分割。",
    genomeInfo:
      "二倍体 2n=38,基因组约 2.4 Gb;2011 年与 2013 年全基因组测序发表,揭示狮虎豹分化仅数百万年、种间杂交可育。",
    ecologyRole:
      "草原顶级捕食者,主要猎食斑马、角马与野牛,通过压制食草动物数量与清除病弱个体塑造整个稀树草原群落,亦是鬣狗与秃鹫的「供餐者」。",
    researchValue:
      "猫科杂交与种系发生研究的关键节点;人兽冲突、战利品狩猎与保护区管理议题的旗舰物种,种群遗传学研究估测非洲仅存约两万余头。",
    tags: ["旗舰物种"],
  },
  {
    rank: "species",
    latin: "Panthera pardus",
    chinese: "豹",
    authority: "(Linnaeus, 1758)",
    parent: "Panthera",
    conservation: "VU",
    description:
      "豹是适应力最强的猫科之一,从雨林到沙漠、从海岸到高原均有分布,能将猎物拖上树以躲避狮鬣狗抢食。金色皮毛缀黑环斑,部分个体基因变异呈通体黑色称「黑豹」。全球种群持续衰退,我国境内华北豹与金钱豹为一级保护动物。",
    morphology: "体修长而四肢短健,头体长约一米至一米九,玫瑰状空心黑斑遍布体侧,尾长逾体长之半。",
    habitat: "栖境极为宽泛:雨林、疏林草原、山地针叶林、干草原与半荒漠均可,善于攀爬伏击。",
    distribution: "分布横跨撒哈拉以南非洲、中东、南亚至东亚与东南亚,历史上为分布最广的大型猫科。",
    etymology:
      "种加词 pardus 源自希腊pardalis「斑豹」;古代欧洲曾误认狮豹杂交生豹,词义里保留了这段迷思;中文俗称金钱豹取斑纹意象。",
    discovery:
      "林奈 1758 年定名;当代分类承认约八至九个亚种,非洲豹与亚洲豹分化约 50 万年,华南种群近年经红外相机与 DNA 确认残存多个孤立小群。",
    genomeInfo: "2n=38,基因组约 2.4 Gb,与狮虎高度同源;黑豹毛色的 MC1R 等位变异为经典单基因性状案例。",
    ecologyRole:
      "中型顶级或次级捕食者,食谱跨越有蹄类、灵长类与啮齿类,树上藏食行为维系腐食动物与森林结构,是生态链「弹性锚种」。",
    researchValue:
      "人兽冲突与盗穿山甲等非法贸易的指示物种;我国华北豹种群恢复是「空域生态位再填充」研究范本。",
    tags: ["国家一级保护"],
  },
  {
    rank: "species",
    latin: "Panthera onca",
    chinese: "美洲豹",
    authority: "(Linnaeus, 1758)",
    parent: "Panthera",
    conservation: "NT",
    description:
      "美洲豹是美洲最大的猫科动物,咬合力冠绝猫科,能以碎裂头骨的方式猎杀凯门鳄与水豚;体斑为空心大玫瑰斑,与豹的区分要点。从墨西哥延伸至阿根廷的种群大但破碎化,亚马孙盆地为其最后的连片堡垒。",
    morphology: "体粗壮近虎,四肢较短,玫瑰斑中央具黑点,下颌与颞肌异常发达,黑化个体亦常见。",
    habitat: "栖于热带雨林、湿地潘塔纳尔与稀树草原,嗜水,常沿河岸伏击猎物,会游泳捕鳄。",
    distribution: "中美洲至南美洲阿根廷北部,美国西南偶有游荡个体;历史上曾遍布美洲大部。",
    etymology:
      "种加词 onca 源自图皮语「yaguareté」之转写,意为「一跃致命之兽」;英语 jaguar 与中文「美洲豹」皆以其大陆冠名,考古与民俗中地位近虎。",
    discovery:
      "林奈 1758 年依南美标本定名;2017 年全基因组分析将其与狮的亲缘关系厘清,确认豹属内美洲豹-狮-豹构成姊妹群结构。",
    genomeInfo: "2n=38;全基因组测序 2017 年发表,证实更新世跨巴拿马地峡扩散后种群两度瓶颈。",
    ecologyRole:
      "新热带界顶级捕食者,调控水豚、貘与凯门鳄等关键物种,其在河岸「猎兽小径」的巡行塑造雨林边缘带群落结构。",
    researchValue:
      "美洲保护区旗舰物种;咬合力学研究为猫科头骨功能分化经典,潘塔纳尔洪水周期种群动态是气候-捕食关系长期研究样板。",
    tags: ["旗舰物种"],
  },
  {
    rank: "species",
    latin: "Acinonyx jubatus",
    chinese: "猎豹",
    authority: "(Schreber, 1775)",
    parent: "Acinonyx",
    conservation: "VU",
    description:
      "猎豹是陆地上短距离冲刺最快的动物,极速可达约 110 公里/小时,流线躯干、半伸缩爪与刚性尾共同构成「弹簧刀」式奔跑机器。近亲繁殖史使基因组惊人均一,现存的两次历史瓶颈在基因中清晰可读。",
    morphology: "体细长弓背,腿高爪钝,泪纹黑色条纹从眼角延至口部,体重约 40-60 公斤,斑点实心。",
    habitat: "开阔草原、稀树灌丛与半荒漠,需要视野开阔的短草地以发挥冲刺优势并躲避狮鬣狗。",
    distribution: "非洲南部与东部为主,伊朗残存最后一批亚洲猎豹(2022 年仅存数只),历史广布亚非。",
    etymology:
      "属名 Acinonyx 源自希腊 akinitos「不动」与 onyx「爪」,指其爪不能完全缩回;种加词 jubatus 意为「有鬃的」,指幼体颈背鬃毛。",
    discovery:
      "施雷贝尔 1775 年定名;1990 年代微卫星研究揭示其遗传多样性极低,推断近万年前与近千年内两度种群瓶颈。",
    genomeInfo:
      "2n=38,约 2.5 Gb;2015 年全基因组测序,发现与猎豹免疫与精子生成相关基因高度纯合,为近交衰退研究范本。",
    ecologyRole:
      "日行性伏击型短跑捕食者,捕猎成功率大型猫科之冠,但猎物常被狮鬣狗劫掠,处于种间竞争下位的「精算型猎手」。",
    researchValue:
      "奔跑生物力学经典模型;保护上依赖 Anatolian 牧羊犬驱避等人兽冲突缓解方案,伊朗种群濒灭是保护生物学警示案例。",
    tags: ["旗舰物种"],
  },

  // ===================== 二、非洲巨型兽(4 种) =====================
  {
    rank: "genus",
    latin: "Loxodonta",
    chinese: "非洲象属",
    parent: "Elephantidae",
    description:
      "非洲象属为现存体型最大的陆生动物,耳廓巨大、指状鼻突两枚,含草原象与森林象两种,前者为非洲稀树草原生态工程师。",
  },
  {
    rank: "species",
    latin: "Loxodonta africana",
    chinese: "非洲草原象",
    authority: "(Blumenbach, 1797)",
    parent: "Loxodonta",
    conservation: "EN",
    description:
      "非洲草原象是现存最大的陆生动物,成年雄象肩高可近四米,象鼻数万肌束赋予其抓握、吸吮与社交的全能。象牙盗猎与栖息地压缩使其百年种群衰退逾八成,2021 年 IUCN 将其与森林象分种评估为濒危(EN)。",
    morphology: "肩高 3-4 米,体重可达 6 吨,耳廓上缘弧圆如非洲版图,鼻端具两枚指状突,雌雄普遍长牙。",
    habitat: "稀树草原、灌丛走廊与林缘,每日迁徙数十公里觅食饮水,旱季依赖固定水源。",
    distribution: "撒哈拉以南非洲 37 国,南部与东部种群为主力;西非残群以森林象为主。",
    etymology:
      "属名 Loxodonta 意为「斜齿」,指其磨牙菱形斜纹珐琅质环;种加词 africana 记大陆之名;中文名区分草原与森林两生态型。",
    discovery:
      "布卢门巴赫 1797 年定名;2001 年起线粒体与核基因组研究确立森林象 L. cyclotis 为独立种,2021 年 IUCN 红色名录正式分种评估。",
    genomeInfo:
      "基因组约 3.1 Gb;2011 年非洲象参考基因组发表,猛犸象古基因组比对以现存象为骨架,揭示了长毛猛犸的冷适应基因。",
    ecologyRole:
      "「生态工程师」:推树开道维持草灌平衡,旱季掘坑成水塘惠泽全群落,传播巨型果实种子,失去大象的稀树草原将渐次密林化。",
    researchValue:
      "保护生物学与动物认知研究旗舰:镜前自认、哀悼行为与次声长距通讯均为经典课题;盗猎压力下无牙象比例上升是演化「实时直播」案例。",
    tags: ["旗舰物种"],
  },
  {
    rank: "family",
    latin: "Giraffidae",
    chinese: "长颈鹿科",
    parent: "Artiodactyla",
    description:
      "长颈鹿科为非洲特有的偶蹄类,含长颈鹿与㺢㹛两属,以超长颈部、皮骨角与特有的「碎步同侧摆肢」步态区别于鹿科牛科。",
  },
  {
    rank: "genus",
    latin: "Giraffa",
    chinese: "长颈鹿属",
    parent: "Giraffidae",
    description:
      "长颈鹿属为现存最高陆生动物,雄性身高可达 5.5 米以上,以皮骨角与网状斑纹为属征,当代分类多承认四个物种或数亚种。",
  },
  {
    rank: "species",
    latin: "Giraffa camelopardalis",
    chinese: "北方长颈鹿",
    authority: "(Linnaeus, 1758)",
    parent: "Giraffa",
    conservation: "VU",
    description:
      "长颈鹿是现存最高的动物,颈长与人类同为七块颈椎、单块颈椎倍长;「皮骨角」覆盖皮肤,血压为哺乳动物之冠以向两米外的脑部供血。过去三十年「无声灭绝」使种群缩减三成,IUCN 评估整体为易危(VU)。",
    morphology: "雄性肩高可及 3.3 米、总高 5.5 米,网状多边形褐斑,舌长逾半米呈紫黑色可缠棘刺。",
    habitat: "稀树草原与开阔疏林,偏好金合欢分布带,取食树冠顶层嫩叶。",
    distribution: "自西非萨赫勒至东非、南非的撒哈拉以南断续分布,整体北方种群萎缩最剧。",
    etymology:
      "种加词 camelopardalis 源于希腊 kamēlos(骆驼)+pardalis(豹),罗马人视其为「驼豹混血」;中文名取颈长本义。",
    discovery:
      "林奈 1758 年定名;2016 年基因组研究将传统一分为四候选种(北方/网纹/马赛/南方长颈鹿),触发分类学大讨论与保护等级重估。",
    genomeInfo:
      "基因组约 2.9 Gb,2016 年发表首个全基因组并与㺢㹛比对;FGFRL1 基因特异变异被指与颈椎延长相关。",
    ecologyRole:
      "唯一能系统取食金合欢树冠的巨型食叶者,与金合欢的「高叶-长颈」演化军备竞赛是教科书级协同演化案例。",
    researchValue:
      "心血管生理(高血压不中风)与骨骼异速生长研究天然模型;四候选种的物种界定是基因组时代分类学标志性辩论。",
    tags: ["旗舰物种"],
  },
  {
    rank: "family",
    latin: "Hippopotamidae",
    chinese: "河马科",
    parent: "Artiodactyla",
    description:
      "河马科为半水生巨型偶蹄类,皮肤裸露仅具黏膜分泌物「血汗」防晒,四趾着地,含河马与倭河马两属,均限于非洲。",
  },
  {
    rank: "genus",
    latin: "Hippopotamus",
    chinese: "河马属",
    parent: "Hippopotamidae",
    description:
      "河马属为非洲大陆河湖中的巨型草食兽,昼伏水中夜出食草,咬合力巨大且领地性极强,现存仅河马一种。",
  },
  {
    rank: "species",
    latin: "Hippopotamus amphibius",
    chinese: "河马",
    authority: "(Linnaeus, 1758)",
    parent: "Hippopotamus",
    conservation: "VU",
    description:
      "河马白日浸水调节体温,夜间上岸食草数十公斤,其「红汗」分泌物兼具防晒与抗菌功能。作为非洲最危险的大型动物之一,雄性领地争斗与陆地夜行使其与人冲突频繁;种群三十年持续下滑列为易危。",
    morphology: "体长 3-5 米、重达 1.5-3 吨,皮肤近乎无毛,犬齿成獠牙状可逾半米,眼耳高位适应水面露出。",
    habitat: "栖于河流、湖泊与沼泽浅水带,水岸草场为其夜牧场,干旱期集群挤占残存水坑。",
    distribution: "撒哈拉以南非洲的河湖系统,西非种群萎缩严重,历史上北非与尼罗河种群已灭绝。",
    etymology:
      "种加词 amphibius 意为「两栖的」,直记其水陆双栖;古埃及称其「河中之猪」,希腊人复合成 hippopotamos「马河」之名。",
    discovery:
      "林奈 1758 年定名;分子系统学揭示其最近的近亲竟为鲸类,「河马-鲸偶蹄」支系重写了偶蹄目内部树。",
    genomeInfo:
      "基因组约 3.3 Gb;系统发生学置于 Whippomorpha(鲸-河马)支系,使其成为鲸类陆地近亲的关键参照物种。",
    ecologyRole:
      "「河流园丁」:夜牧粪便肥沃河湖、河道穿行维持深潭,其生物量搬运与非洲河湖营养循环深度绑定;牙痕与踩踏塑造岸线植被。",
    researchValue:
      "鲸类登陆演化问题的反向参照(河马入水之半);「红汗」抗菌肽为新型抗菌药物筛选来源;入侵哥伦比亚等地的失控种群是外来种经典案例。",
    tags: ["旗舰物种"],
  },
  {
    rank: "family",
    latin: "Rhinocerotidae",
    chinese: "犀科",
    parent: "Perissodactyla",
    description:
      "犀科为巨型奇蹄类,皮肤厚实成铠甲褶、鼻或额生角(角为角蛋白纤维构成而非骨质),现存五种,均因盗猎面临严重威胁。",
  },
  {
    rank: "genus",
    latin: "Ceratotherium",
    chinese: "白犀属",
    parent: "Rhinocerotidae",
    description:
      "白犀属为犀科最大的属种,方唇适于啃草,现存南方白犀与北方白犀两亚种,后者 2018 年起仅存两头雌性,功能性灭绝。",
  },
  {
    rank: "species",
    latin: "Ceratotherium simum",
    chinese: "白犀",
    authority: "(Burchell, 1817)",
    parent: "Ceratotherium",
    conservation: "NT",
    description:
      "白犀是犀科最大者,方唇专门啃食短草,与尖唇的黑犀分据草、灌食物位。南方白犀经百年保护从不足百头恢复至逾万头,是保育史上最著名翻盘;北方白犀仅存两头雌性,依赖体外受精延续「最后一搏」。",
    morphology: "肩高 1.7-1.9 米,体重可达 2.3 吨,颈背隆起承托巨头,双角前长后短,唇部宽方。",
    habitat: "开阔草原与灌丛草甸,近水源短草地为核心觅食区,泥浴水坑为固定活动点。",
    distribution: "南非为核心(全球九成以上),纳米比亚、博茨瓦纳等存再引入群;北方亚种残存肯尼亚奥佩杰塔。",
    etymology:
      "属名 Ceratotherium 意为「角兽」;「白」白犀之名系南非荷兰语 wijd(宽)误译为 white 所致,与颜色无关,指其宽唇。",
    discovery:
      "伯切尔 1817 年定名;2018 年雄性「苏丹」离世标志北方白犀功能性灭绝,其精子已冷冻,卵母细胞取自仅存雌性,胚胎移植借南方白犀代孕。",
    genomeInfo:
      "2n=82;南北两亚种全基因组 2021 年发表,揭示约 50 万年分化和成系基因差异,为「灭绝逆转」研究提供蓝图。",
    ecologyRole:
      "最大的食草巨兽之一,方唇如割草机维持短草斑块,泥浴塑造水坑 micro生境,供养龟鸟虫等伴生群落。",
    researchValue:
      "辅助生殖技术拯救物种的前沿实验场:体外受精、胚胎移植与代孕跨亚种尝试是保护科学的极限案例;盗猎经济学研究标本。",
    tags: ["旗舰物种"],
  },
  {
    rank: "species",
    latin: "Equus quagga",
    chinese: "平原斑马",
    authority: "(Burchell, 1817)",
    parent: "Equus",
    conservation: "NT",
    description:
      "平原斑马是斑马中分布最广、数量最多者,黑白条纹个体如指纹般独一无二;条纹驱虻假说与体温调节假说的长期之争是演化生物学著名公案。每年数百万头随降水在塞伦盖蒂-马拉系统中大迁徙。",
    morphology: "肩高 1.2-1.4 米,黑白宽纹延展至腹部,颈部鬃毛短立,后肢斑纹细密,各地亚群纹样有别。",
    habitat: "稀树草原与草甸,逐水草迁徙,旱季聚拢残存草场,依赖每日饮水。",
    distribution: "东非至南非断续分布,塞伦盖蒂-马拉迁徙群为地球上最大陆地兽群之一。",
    etymology:
      "种加词 quagga 源自科伊语拟声名,原指已灭绝的斑驴亚种;平原斑马曾据此并入「quagga」种名,中文名取开阔草原生境。",
    discovery:
      "伯切尔 1817 年重新启用 quagga 之名统称平原斑马;已灭绝斑驴 1984 年从肌肉标本提取出首份古 DNA,古 DNA 学科由此奠基。",
    genomeInfo:
      "2n=44-45(罗伯逊易位多态);全基因组测序 2018 年发表,斑驴、山斑马与平原斑马的种级比较确立三者分化于百万年内。",
    ecologyRole:
      "迁徙兽群「割草机」:先于角马啃食长草为后者开路,粪便广播种子与养分,狮鬣狗猎物基座;斑纹群体混淆效应干扰捕食者锁定个体。",
    researchValue:
      "条纹功能检验的科学方法学范例(实地驱虻实验、温度地理相关性);斑驴古 DNA 是「物种能否复活」讨论的起点。",
    tags: ["旗舰物种"],
  },

  // ===================== 三、海洋哺乳(2 种) =====================
  {
    rank: "genus",
    latin: "Orcinus",
    chinese: "虎鲸属",
    parent: "Delphinidae",
    description:
      "虎鲸属为海豚科最大成员,高背鳍与黑白对比色显著,全球各洋广布,单型属但含多个生态型,被视为潜在种复合群。",
  },
  {
    rank: "species",
    latin: "Orcinus orca",
    chinese: "虎鲸",
    authority: "(Linnaeus, 1758)",
    parent: "Orcinus",
    conservation: "DD",
    ncbiTaxId: 9733,
    description:
      "虎鲸是现存最大的海豚科动物,以母系社群与「方言」呼叫著称,不同生态型食性迥异(鱼食型与哺乳食型几无交集),堪称海洋中的文化物种。全球数据缺乏(DD)掩盖了局部种群衰退,南方居留群濒危。",
    morphology: "体长 6-9 米,雄性背鳍可高逾 1.8 米呈立剑状,通体黑白分明,眼后白斑与灰色鞍斑为个体识别依据。",
    habitat: "全洋域分布,从极地冰缘到热带海岸、自近岸浅湾至公海深水,高生产力上升流区密度最高。",
    distribution: "全球各洋均有,北太平洋与南极水域生态型分化研究最深,部分居留群终生活动于数百公里海域。",
    etymology:
      "Orcinus 意为「属冥界的/食人的」,古罗马称其为 orca;「killer whale」源出「鲸之杀手」的倒装;中文以其凶猛称虎鲸。",
    discovery:
      "林奈 1758 年定名;1970 年代起 Vancouver Island 长期照片识别与声学研究揭示其生态型与「文化」分化,当代基因组学支持多个未定名种。",
    genomeInfo:
      "2n=44;全基因组 2016 年发表,南极 A/B/C 型与居留/过境型群体比较揭示数百万年分化,被视为隐存种复合群。",
    ecologyRole:
      "海洋顶级捕食者:鱼食型压制鲱鲑群,哺乳食型猎海豹鲸幼崽,其捕猎策略的文化传递是动物行为学高峰课题;南北极生态型构成独立营养通道。",
    researchValue:
      "动物文化、方言与母系社会的旗舰研究对象;污染物沿食物链顶端富集的生态毒理学指示种;圈养福利伦理讨论的焦点物种。",
    tags: ["旗舰物种"],
  },
  {
    rank: "family",
    latin: "Monodontidae",
    chinese: "一角鲸科",
    parent: "Cetacea",
    description:
      "一角鲸科为北极高纬小型齿鲸,含白鲸与一角鲸两属,无背鳍、颈部灵活,白鲸通体乳白,一角鲸雄性具螺旋长左牙。",
  },
  {
    rank: "genus",
    latin: "Delphinapterus",
    chinese: "白鲸属",
    parent: "Monodontidae",
    description:
      "白鲸属为纯白色北冰洋齿鲸,额隆柔软可变形发出丰富面部表情与多元叫声,故有「海中金丝雀」之称,单型属。",
  },
  {
    rank: "species",
    latin: "Delphinapterus leucas",
    chinese: "白鲸",
    authority: "(Pallas, 1776)",
    parent: "Delphinapterus",
    description:
      "白鲸通体雪白、额隆可 voluntary 变形,能发出口哨、鸟鸣等上百种声信号,被誉为「海中金丝雀」;季节性蜕皮与聚河暖身行为独特。历史上捕鲸与航道噪声使其局部种群受胁,库克湾等小种群濒危。",
    morphology: "成体长 3.5-5.5 米,通体乳白,无背鳍,颈部椎骨未愈合而颈部灵活,额隆隆起可形变。",
    habitat: "北冰洋及邻接亚北极海域,夏季聚河口与浅湾蜕皮暖身,冬季随冰缘开阔水道迁移。",
    distribution: "环北极分布,阿拉斯加、加拿大北部、格陵兰与俄属北岸诸群离散,库克湾种群孤立受胁。",
    etymology:
      "属名 Delphinapterus 意为「无鳍的海豚」;种加词 leucas 为希腊「白」;俄语 belukha 同义,中文名直接取毛色。",
    discovery:
      "帕拉斯 1776 年定名;19 世纪商业捕鲸重创种群;20 世纪末声学与卫星标记研究揭示其蜕皮聚群与冰缘迁移节律。",
    genomeInfo: "2n=44;2014 年白鲸全基因组发表,与一角鲸比较揭示 Arctic 适应与低氧耐受相关基因选择信号。",
    ecologyRole:
      "北极食物网中层消费者,捕鱼与底栖无脊椎;本身为北极熊与虎鲸的猎物,河口聚集行为将海洋营养注入淡水系统。",
    researchValue:
      "发声学习与「方言」研究模型;北极航道噪声与气候变化的哨兵物种;水族馆「微笑」表象背后的鲸类福利议题代表。",
    tags: ["旗舰物种"],
  },

  // ===================== 四、类人猿(3 种) =====================
  {
    rank: "genus",
    latin: "Pan",
    chinese: "黑猩猩属",
    parent: "Hominidae",
    description:
      "黑猩猩属为人科最亲近的现存属支,含黑猩猩与倭黑猩猩两种,与人类基因组相似度约 98.7%,工具制造、政治联盟与自我医疗等行为研究重塑了对「人性」边界的认知。",
  },
  {
    rank: "species",
    latin: "Pan troglodytes",
    chinese: "黑猩猩",
    authority: "(Blumenbach, 1775)",
    parent: "Pan",
    conservation: "EN",
    ncbiTaxId: 9598,
    description:
      "黑猩猩是与人类亲缘最近的现存物种之一,制造工具、捕猎分工、政治结盟与文化传递一应俱全;贡贝与塔伊两大野外站点持续观测逾六十年,是行为生态学最长纪录。盗猎、丛林肉贸易与埃博拉使种群三十年缩减逾八成,列为濒危。",
    morphology: "体高 1-1.7 米,重 40-70 公斤,毛黑粗,耳大圆而突出,幼体面部粉白随年龄转深,行走以指关节拄地。",
    habitat: "热带雨林、湿润疏林与林草交错带,巢居树上夜筑新巢,日活动域可达数十平方公里。",
    distribution: "中西非自塞内加尔至坦桑尼亚西部的赤道带,四个亚种区隔明显,西非种群受胁最重。",
    etymology:
      "属名 Pan 取希腊牧神潘之通形;种加词 troglodytes 意为「穴居者」,源自古人对其夜隐密林的想象;中文以毛色冠名。",
    discovery:
      "布卢门巴赫 1775 年定名;1960 年古道尔在贡贝首次记录其工具「钓蚁」,终结「唯人制器」的旧观念,开启类人猿行为学时代。",
    genomeInfo:
      "2n=48,比人类多一对;2005 年黑猩猩基因组图谱发表,与人类差异约 1.2%,主要为结构变异而非点突变。",
    ecologyRole:
      "雨林种子 disperser(食果)+ 果核猎手(合作猎猴),双层角色耦合果实丰歉与捕食压力;是多种与人类共享病原的天然宿主库。",
    researchValue:
      "人类起源与医学的近缘参照:HIV-1 源自其 SIVcpz 跨种传播;比较基因组学、正义感与道德起源研究的核心物种。",
    tags: ["模式生物", "旗舰物种"],
  },
  {
    rank: "genus",
    latin: "Gorilla",
    chinese: "大猩猩属",
    parent: "Hominidae",
    description:
      "大猩猩为现存体重最大的灵长类,两性异形显著,银背雄性领群,地面指 knuckle-walking 为主,食叶性高,分东西两种各两亚种。",
  },
  {
    rank: "species",
    latin: "Gorilla gorilla",
    chinese: "西部大猩猩",
    authority: "(Savage, 1847)",
    parent: "Gorilla",
    conservation: "CR",
    description:
      "西部大猩猩含西部低地大猩猩与克罗斯河大猩猩两亚种,是动物园与研究中「大猩猩」的原型;埃博拉反复扫荡叠加盗猎,使其总群数持续下探,列为极危(CR)。银背捶胸、克罗斯河亚种工具使用(涉水探杖)均为经典行为记录。",
    morphology: "雄性站立高 1.6-1.8 米、体重常逾 150 公斤,银背自背部延伸,头部矢状冠突发达,臂展远超身高。",
    habitat: "低地雨林、沼泽林与林间空地(ny 灌木bais),高食叶量使其活动范围相对小而稳定。",
    distribution: "西非自尼日利亚克罗斯河至安哥拉卡宾达的雨林带,刚果盆地西部为核心。",
    etymology:
      "属名 Gorilla 源于迦太基航海者记录的「毛人部落」之称;种加词重取属名;中文沿「猩猩」古义转用(古之猩猩本指此属近亲)。",
    discovery:
      "萨维奇 1847 年定名;1902 年东部亚种山猩猩被发现;西非埃博拉 1990-2000 年代消灭局部逾九成群,2010 年代监测遗传普查逐渐补全。",
    genomeInfo: "2n=48;首个大猩猩基因组 2012 年发表,与人分化约 800-1000 万年,发现其与人类在听觉基因上的趋同。",
    ecologyRole:
      "「雨林园丁」:巨型果树的种子散布者,取食与巢建开辟林隙;低地种群对藤本植物群落结构影响显著。",
    researchValue:
      "灵长类保护医学(埃博拉-物种衰减)与遗传普查(粪便 DNA)方法学范例;认知上其为自我认知与符号语言研究的早期主角。",
    tags: ["旗舰物种"],
  },
  {
    rank: "genus",
    latin: "Pongo",
    chinese: "猩猩属",
    parent: "Hominidae",
    description:
      "猩猩为亚洲仅存大猿,树栖性极强、雄性具颊垂与喉囊,独居亚成体分散模式,含婆罗洲与苏门答腊两种,均极危。",
  },
  {
    rank: "species",
    latin: "Pongo pygmaeus",
    chinese: "婆罗洲猩猩",
    authority: "(Lacépède, 1799)",
    parent: "Pongo",
    conservation: "CR",
    description:
      "婆罗洲猩猩是亚洲最大的树栖动物,「红毛猩猩」独居于雨林冠层,以果实为主食并表现拟医学行为(自敷植物);雌性八年一胎为哺乳类最慢繁殖之一。油棕扩张与林火使其半个世纪锐减逾六成,列为极危。",
    morphology: "雄性体重可达 90 公斤以上,颊垂宽大喉囊深垂,毛红棕粗糙,臂展逾两米适于悬垂移动。",
    habitat: "低地与丘陵原始雨林,尤喜龙脑香林果实盛期;筑巢夜宿,雨季以叶为伞。",
    distribution: "婆罗洲岛残存斑块,沙巴、中加里曼丹与西加里曼丹为三大残域,岛内已碎片化。",
    etymology:
      "属名 Pongo 源自西非原语言「猿/大力灵」的转用;种加词 pygmaeus「侏儒」系早期误判体型;中文「猩猩」为自《礼记》即有的古兽名转今用。",
    discovery:
      "拉塞佩德 1799 年定名;1996-2017 年对开(Pongo tapanuliensis)从中分出第三个猩猩物种,总数仅存数百头。",
    genomeInfo: "2n=48;2011 年全基因组测序,与人类分化约 1200-1500 万年,发现种内低遗传多样性提示历史瓶颈。",
    ecologyRole:
      "雨林「顶果捕食者」:龙脑香等大果实种子传播者,取食选择与撒播行为维系 hardwood 森林更新,被称为「雨林播种人」。",
    researchValue:
      "认知科学明星(工具制备、有意教学与「文化区」);拯救行动(救孤-野化-重引入)体系完整,是热带雨林保护的伞护旗舰。",
    tags: ["旗舰物种"],
  },

  // ===================== 五、鬣狗与猛禽(2 种) =====================
  {
    rank: "family",
    latin: "Hyaenidae",
    chinese: "鬣狗科",
    parent: "Carnivora",
    description:
      "鬣狗科为猫形亚目特立支系,前肢长于后肢的背负式体态,非犬类近亲,含斑鬣狗、棕鬣狗、缟鬣狗与食蚁的土狼四属,以斑鬣狗社会与「女权结构」著称。",
  },
  {
    rank: "genus",
    latin: "Crocuta",
    chinese: "斑鬣狗属",
    parent: "Hyaenidae",
    description:
      "斑鬣狗属为鬣狗科最大现生属,咬合力冠绝哺乳类之列,群体「氏族」以雌性主导,单型种遍布撒哈拉以南非洲。",
  },
  {
    rank: "species",
    latin: "Crocuta crocuta",
    chinese: "斑鬣狗",
    authority: "(Erxleben, 1777)",
    parent: "Crocuta",
    conservation: "LC",
    description:
      "斑鬣狗是非洲数量最多的大型食肉动物,氏族社会以雌性居主导、地位世袭,集体狩猎成功率常压狮一头;「小丑狂笑」般的叫声是非洲夜的声音名片。强力咬肌与骨裂咬合使其能把猎物连骨嚼尽。",
    morphology: "肩高约 0.9 米,前躯高后躯低,棕黄体色缀不规则黑斑,咬合力逾 1000 牛顿级,雌性具假阴茎结构。",
    habitat: "稀树草原、半荒漠与山地,氏族领域数十至数百平方公里,核心区设公共巢穴育幼。",
    distribution: "撒哈拉以南非洲广泛分布,西非林区种群稀少,整体无危(LC)但局部受毒饵威胁。",
    etymology:
      "Crocuta 源自希腊 kroketos(番红花色)或按普林尼记载取自衣索匹亚土语;种加词重复属名;「笑鬣狗」之名来自其咯咯叫声。",
    discovery:
      "埃尔克斯莱本 1777 年定名;20 世纪 80-90 年代 Masai Mara 长期研究揭示其氏族社会与雌性支配结构,大幅纠正了「食腐懦夫」的污名。",
    genomeInfo: "2n=40;2012 年全基因组发表,确认鬣狗科隶属猫形亚目,并与猫科构成姊妹群,与犬科分异逾 2500 万年。",
    ecologyRole:
      "非洲最效率的清道夫兼猎手:处理尸骸速度与彻底度无出其右,压制疫病传播;作为与狮直接竞争的次顶级捕食者,共同构成双顶级格局。",
    researchValue:
      "社会演化(雌性支配、地位继承)与生殖生理(雌性假阴茎)研究独一无二的模型;其肠道微生物组骨消化研究具生物燃料启示。",
    tags: ["旗舰物种"],
  },
  {
    rank: "genus",
    latin: "Haliaeetus",
    chinese: "海雕属",
    parent: "Accipitridae",
    description:
      "海雕属为大型渔食猛禽,喙强而深、跗蹠裸露适于抓鱼,含白头海雕、白尾海雕等八种,几乎全部分布于海岸与大河沿岸带。",
  },
  {
    rank: "species",
    latin: "Haliaeetus leucocephalus",
    chinese: "白头海雕",
    authority: "(Linnaeus, 1758)",
    parent: "Haliaeetus",
    conservation: "LC",
    description:
      "白头海雕是美国的国鸟象征,以鱼为主食、盗抢亦不忌;DDT 导致的蛋壳变薄曾使其坠入濒危,禁用 DDT 与保护立法后种群强势反弹,成为环境法胜利的图腾。求偶「空中爪锁坠落」行为 spectacular。",
    morphology: "翼展可逾 2 米,成体头尾纯白、体棕黑,喙爪黄亮,亚成体斑杂,四至五年方披成体羽。",
    habitat: "临水而居:海岸、大湖与大河沿岸,高树造巨巢(可累用数十年、最重达一吨级),冬季随鱼群移动。",
    distribution: "北美洲大部,阿拉斯加与加拿大种群最密,美国本土 48 州经恢复计划重返各州。",
    etymology:
      "属名 Haliaeetus 意为「海雕」;种加词 leucocephalus「白头」直述其成体特征;1782 年北美大陆会议定为国徽图案主角。",
    discovery:
      "林奈 1758 年定名;1962 年卡森《寂静的春天》以 DDT-蛋壳薄化关系立论,白头海雕为其关键证据,直接催生 1972 年美国 DDT 禁令。",
    genomeInfo: "2n=66;全基因组 2013 年发表,与金雕比较揭示嗅觉基因家族扩张痕迹,染色体融合事件较频繁。",
    ecologyRole:
      "水域顶级捕食者与清道夫双角色:冬季聚鲑群与水禽尸体带,「盗食寄生」行为抑制他种捕食者过度消耗,巢树群落供养数十种伴生生物。",
    researchValue:
      "环境毒理学(DDT、铅弹中毒)经典指示种;《濒危物种法》与《白头海雕-金鹰保护法》的立法生物学标本;种群恢复建模教学案例。",
    tags: ["旗舰物种"],
  },

  // ===================== 六、补录:小熊猫/浣熊/鹿科/有袋/贫齿(8 种) =====================
  {
    rank: "family",
    latin: "Ailuridae",
    chinese: "小熊猫科",
    parent: "Carnivora",
    description:
      "小熊猫科为食肉目中独立的单型孑遗科,竹食性独树一帜,长期被归入熊科或浣熊科,分子研究确立其独立科地位。",
  },
{
  rank: "genus",
  latin: "Ailurus",
  chinese: "小熊猫属",
  parent: "Ailuridae",
  description:
    "小熊猫属为喜马拉雅-横断山特有的竹食性小型食肉动物, 现仅存小熊猫一种, 古老支系的唯一现存代表。",
},
{
  rank: "species",
  latin: "Ailurus fulgens",
  chinese: "小熊猫",
  authority: "(Cuvier, 1825)",
  parent: "Ailurus",
  conservation: "EN",
  description:
    "小熊猫是「panda」之名的最初主人, 早于大熊猫半个世纪被科学命名; 红棕毛色、环纹长尾与「假拇指」皆为竹食适应。近半世纪种群因栖息地丧失锐减, 现列为濒危(EN), 为喜马拉雅山地保护的伞护旗舰。",
  morphology: "体如家猫而尾蓬松近体长, 面部白纹醒目, 掌侧籽骨延伸成第六「假拇指」以抓握竹枝。",
  habitat: "喜马拉雅南麓与横断山的温带针阔混交林, 林冠层活动, 主食竹笋嫩叶, 嗜晨昏活动。",
  distribution: "尼泊尔、不丹、缅甸北部至中国川滇藏山地, 印度锡金至阿鲁纳恰尔亦有残群。",
  etymology:
    "属名 Ailurus 源于希腊 ailos(猫)+ouros(尾),「猫尾」;「熊猫/panda」一名源出尼泊尔一带土语, 最初专指本种, 大熊猫晚出借用其名。",
  discovery:
    "弗烈德里克·居维叶 1825 年依化石与标本定名; 二十世纪后半叶的分子系统学将其从浣熊科/熊科反复摇摆的归属中独立成科。",
  genomeInfo: "全基因组测序已发表; 与大熊猫的假拇指为趋同演化经典案例, 两支系分化逾三千万年。",
  ecologyRole: "竹林的种子传播与嫩笋啃食者, 也是雪豹、貂狸等中小食肉动物的猎物环节; 横断山针叶林健康的指示物种。",
  researchValue: "趋同演化(假拇指、低营养竹食消化)研究双星之一; 红外相机监测网络与社区保护(喜马拉山区)的旗舰。",
  tags: ["旗舰物种", "濒危物种"],
},
{
  rank: "family",
  latin: "Procyonidae",
  chinese: "浣熊科",
  parent: "Carnivora",
  description:
    "浣熊科为美洲原产的中小型杂食性犬型亚目支系, 趾行、尾具环纹、前爪灵巧, 含浣熊、蜜熊、白鼻浣熊等属, 浣熊已入侵欧亚。",
},
{
  rank: "genus",
  latin: "Procyon",
  chinese: "浣熊属",
  parent: "Procyonidae",
  description:
    "浣熊属为夜行性攀爬高手, 前爪触觉极敏锐, 「浣洗」食物与开盖取食等行为显示高度问题解决能力, 单型广布种。",
},
{
  rank: "species",
  latin: "Procyon lotor",
  chinese: "浣熊",
  authority: "(Linnaeus, 1758)",
  parent: "Procyon",
  conservation: "LC",
  description:
    "浣熊以「洗手」行为得名, 前爪触觉神经密度极高, 水中触辨食物如盲读盲文; 城市个体开启垃圾桶、过下水道, 被视为城市适应力冠军。20 世纪因毛皮贸易引入欧洲后成为强势入侵种。",
  morphology: "体灰棕, 黑色面罩纹横过双眼, 尾具 5-10 道环纹, 体重 4-10 公斤, 前爪五指细长灵巧。",
  habitat: "林缘水畔、沼泽到城市公园与下水道系统, 极强生态位弹性, 夜行性。",
  distribution: "原产北美; 因毛皮与宠物贸易入侵欧洲中西部与日本, 种群持续北扩。",
  etymology:
    "属名 Procyon 意为「先于犬」(早于犬吠活动的兽); 种加词 lotor 为拉丁「洗衣者」, 直记其浣洗食物的招牌动作。",
  discovery:
    "林奈 1758 年定名; 20 世纪德国为毛皮养殖引入, 二战空袭致个体逃逸, 遂酿成欧洲最著名入侵种群之一。",
  genomeInfo: "2n=38; 全基因组测序已发表, 城市与森林种群的比较基因组研究揭示感官与代谢相关基因的分化信号。",
  ecologyRole: "杂食清道夫与卵捕食者; 在入侵地压制两爬鸟类巢穴, 城市食物链顶端的「垃圾桶生态位」。",
  researchValue: "动物认知(延迟满足、开锁)经典实验对象; 入侵生物学(欧洲种群遗传瓶颈与适应)研究样板。",
  tags: ["入侵物种", "城市适应种"],
},
{
  rank: "genus",
  latin: "Alces",
  chinese: "驼鹿属",
  parent: "Cervidae",
  description:
    "驼鹿属为现存体型最大的鹿科动物, 雄性掌状巨角、肩高逾两米, 单型属环北纬分布, 中国大兴安岭为其分布南缘。",
},
{
  rank: "species",
  latin: "Alces alces",
  chinese: "驼鹿",
  authority: "(Linnaeus, 1758)",
  parent: "Alces",
  conservation: "LC",
  description:
    "驼鹿是现存最大的鹿科动物, 肩高可达两米余, 掌状巨角与「垂颌」为雄性标志; 长腿适应雪地与涉水取食水生植物。在中国仅存于大小兴安岭, 为国家一级保护动物。",
  morphology: "肩高 1.8-2.1 米, 体重可达 500-700 公斤, 雄角宽逾一米呈掌状, 鼻部下垂如驼, 喉部皮褶。",
  habitat: "寒温带针叶林与泰加林, 夏季湖沼采食水草, 冬季啃食柳桦枝皮, 狼与棕熊为主要天敌。",
  distribution: "环北欧、西伯利亚至远东北美; 中国东北为其亚洲分布的南缘残群。",
  etymology:
    "种加词 alces 为古典博物学中的「麋」类巨鹿古名; 「驼鹿」中文名取其驼形垂鼻; 北美称 moose 源自东阿尔冈昆语。",
  discovery:
    "林奈 1758 年定名; 北美亚种群的更新世巨型种(广额驼鹿)已灭绝, 现生种骨骼研究揭示肩高演化趋势。",
  genomeInfo: "2n=68(欧亚)或 70(北美), 染色体多态为鹿科之最; 全基因组测序已发表以支撑种群管理。",
  ecologyRole: "泰加林最大的食草者, 对柳桦灌丛与水生植被结构塑造显著; 狼群冬季主要猎物, 全球气候-捕食-猎物三联研究的关键种。",
  researchValue: "北美车辆碰撞管理与「 Moose 警示」体系经典; 旧大陆种群衰退监测与中俄跨境栖息地研究载体。",
  tags: ["国家一级保护"],
},
{
  rank: "genus",
  latin: "Rangifer",
  chinese: "驯鹿属",
  parent: "Cervidae",
  description:
    "驯鹿属为唯一雌雄均长角且被大规模驯养的鹿科动物, 蹄宽如雪鞋, 单型属环北极及亚北极分布。",
},
{
  rank: "species",
  latin: "Rangifer tarandus",
  chinese: "驯鹿",
  authority: "(Linnaeus, 1758)",
  parent: "Rangifer",
  conservation: "VU",
  description:
    "驯鹿是唯一雌性也长角的鹿, 视觉系统专为极夜紫外场景调谐; 数十族群被欧亚北极原住民驯化, 与人共生逾两千年。野生种群全球性衰退(列为易危), 北美苔原大迁徙为自然界最大规模陆移动物群之一。",
  morphology: "角多分叉且雌雄皆有, 颈鬃长垂, 蹄宽大可掘雪, 夏褐冬灰白, 体重 90-210 公斤。",
  habitat: "苔原、泰加北缘与山地冻原, 季节性迁徙可达数千公里, 主食地衣(驯鹿苔)。",
  distribution: "环北极的欧亚与北美, 涵盖驯化群(斯堪的纳维亚、西伯利亚)与野生群(北美苔原、山地)。",
  etymology:
    "属名 Rangifer 源自萨米语对驯鹿之古称; 种加词 tarandus 为古典时代对苔原鹿的记载名; 「驯鹿」之名记其驯养史。",
  discovery:
    "林奈 1758 年定名; 北美野生群与欧亚驯化群的线粒体研究揭示驯化起源多元; 2019 年驯鹿全基因组揭示地衣消化与维生素D代谢的北极适应。",
  genomeInfo: "2n=70(驯化)与 68-70 多态; 全基因组测序揭示 VD 代谢基因受选择, 适应极夜光照。",
  ecologyRole: "苔原最大食草动物, 每年迁徙廊道维系狼熊与食腐群落; 踩踏与啃食控制灌丛侵入苔原, 地衣牧场的「活犁」。",
  researchValue: "驯化起源与原住民文化(萨米/鄂温克)研究载体; 气候变化下苔原物候错配(产犊-草期)的旗舰指示。",
  tags: ["驯化物种", "旗舰物种"],
},
{
  rank: "family",
  latin: "Macropodidae",
  chinese: "袋鼠科",
  parent: "Diprotodontia",
  description:
    "袋鼠科为双门齿目最大科, 大型种后肢跳跃行进、尾粗为平衡舵, 雌兽育儿袋典型, 涵盖袋鼠、沙袋鼠与小袋鼠。",
},
{
  rank: "genus",
  latin: "Macropus",
  chinese: "大袋鼠属",
  parent: "Macropodidae",
  description:
    "大袋鼠属为现存最大的有袋类支系, 含灰袋鼠与红袋鼠等大体型种, 跳跃经济时速与体温调节机制研究深入。",
},
{
  rank: "species",
  latin: "Macropus giganteus",
  chinese: "东部灰大袋鼠",
  authority: "(Shaw, 1790)",
  parent: "Macropus",
  conservation: "LC",
  description:
    "东部灰大袋鼠是现存体型最大的有袋类之一, 高速跳跃的能效学研究颠覆「跳跃昂贵」直觉——速度越快能耗越平稳。澳洲东部草地种群繁盛至需计划性管控, 是「国兽过剩」管理难题的当事者。",
  morphology: "直立高逾两米, 雄性体重可达 60-90 公斤, 毛灰褐, 后肢肌肉腱弹性储能, 尾长逾一米。",
  habitat: "澳洲东部开阔草地、疏林缘与农田草地, 晨昏活动, 白日荫凉处卧息。",
  distribution: "澳洲东部自昆士兰至南澳与塔斯马尼亚, 种群估计数千万级, 局部密度过高。",
  etymology:
    "属名 Macropus 为希腊「长足」; 种加词 giganteus「巨大」直述体型; 澳洲国徽上的袋鼠即取本种或近缘红袋鼠形象。",
  discovery:
    "肖 1790 年定名; 跳跃能效学研究(1970s-80s)揭示肌腱弹性回能使高速跳跃能耗近恒定, 为生物力学经典。",
  genomeInfo: "2n=16; 全基因组测序 2011 年发表(袋鼠类首批), 为有袋类性染色体与基因组演化研究基石。",
  ecologyRole: "草原最大食草者, 与牛羊竞争牧场; 跳跃觅食廊道维持草被斑块化, 支撑鸸鹋等共栖群落。",
  researchValue: "跳跃生物力学与肌腱储能研究范例; 有袋类免疫(幼体无胎盘)与种群调控(计划捕杀伦理)研究焦点。",
  tags: ["旗舰物种"],
},
{
  rank: "order",
  latin: "Pilosa",
  chinese: "披毛目",
  parent: "Mammalia",
  description:
    "披毛目为异关节总目的分支, 含食蚁兽与树懒两支, 前肢爪特化、无齿或齿简单, 新热带界特有, 化石支系含大地懒。",
},
{
  rank: "family",
  latin: "Myrmecophagidae",
  chinese: "食蚁兽科",
  parent: "Pilosa",
  description:
    "食蚁兽科为专食白蚁蚂蚁的披毛目支系, 管状吻、丝状舌与巨爪特化, 含大食蚁兽与小食蚁兽两属。",
},
{
  rank: "genus",
  latin: "Myrmecophaga",
  chinese: "大食蚁兽属",
  parent: "Myrmecophagidae",
  description:
    "大食蚁兽属为地栖食蚁兽科代表, 背具黑鬃、尾如旗, 无齿而舌日伸缩逾万次, 单型种南美广布。",
},
{
  rank: "species",
  latin: "Myrmecophaga tridactyla",
  chinese: "大食蚁兽",
  authority: "(Linnaeus, 1758)",
  parent: "Myrmecophaga",
  conservation: "VU",
  description:
    "大食蚁兽是南美草原最具辨识度的动物之一: 管状吻无齿, 丝舌日探蚁巢万次, 前爪如镰能一击裂开白蚁丘; 受威胁时以后肢直立挥爪。草地焚烧与栖息地破碎使其列为易危(VU)。",
  morphology: "体长 1.8-2.4 米(含尾), 背鬃黑色沿背中线, 前肢乳白三道黑纹, 前爪长逾 10 厘米。",
  habitat: "南美热带草原塞拉多、疏林与湿地草甸, 昼夜均活动但避正午, 领域独居标记。",
  distribution: "自洪都拉斯断续至阿根廷北部, 塞拉多草原与亚马逊林缘为核心。",
  etymology:
    "属名 Myrmecophaga 为希腊「食蚁者」; 种加词 tridactyla「三趾」记其前肢三爪; 中文以体型冠「大」。",
  discovery:
    "林奈 1758 年定名; 19 世纪化石大地懒(Megatherium)的发现确认披毛目曾含数吨巨兽, 达尔文以此讨论演化。",
  genomeInfo: "2n=60; 染色体研究显示其与树懒的核型高度重排; 全基因组测序尚未完整发表, 为南美哺乳类基因组空缺之一。",
  ecologyRole: "白蚁种群最主要的天敌, 单只年食蚁逾三万巢当量; 掘蚁丘翻土促进草原养分循环; 美洲豹与美洲狮的猎物。",
  researchValue: "「捕食者-社会性昆虫」协同演化研究; 塞拉多草原焚毁-破碎化保护的旗舰物种; 人工饲养消化疾病(肌病)研究难题。",
  tags: ["旗舰物种"],
},
{
  rank: "order",
  latin: "Cingulata",
  chinese: "有甲目",
  parent: "Mammalia",
  description:
    "有甲目为异关节总目的甲胄支系, 皮肤骨化成活动环甲, 含犰狳科等, 化石支系含雕齿兽与潘帕兽两类装甲巨兽。",
},
{
  rank: "family",
  latin: "Dasypodidae",
  chinese: "犰狳科",
  parent: "Cingulata",
  description:
    "犰狳科为穴居杂食的有甲目代表, 甲带 7-11 环可部分卷曲, 爪强善掘, 九带犰狳为唯一北拓至美国的种。",
},
{
  rank: "genus",
  latin: "Dasypus",
  chinese: "犰狳属",
  parent: "Dasypodidae",
  description:
    "犰狳科模式属, 含九带犰狳等多种, 卵生性延迟着床与几乎恒定的同卵四胞胎为其繁殖学奇观。",
},
{
  rank: "species",
  latin: "Dasypus novemcinctus",
  chinese: "九带犰狳",
  authority: "(Linnaeus, 1758)",
  parent: "Dasypus",
  conservation: "LC",
  description:
    "九带犰狳每次妊娠必产基因近乎一致的同期四胞胎(受精卵早期分裂), 为哺乳类之奇; 其较低体温使其成为麻风杆菌的天然宿主, 是麻风研究的「活培养皿」。近百年北扩入美, 是气候变暖物种迁徙的实时例证。",
  morphology: "体长 38-58 厘米, 甲九活动环带可蜷, 耳长尖, 前肢四爪中三爪巨长善掘, 受惊可跃起。",
  habitat: "疏林、草原、灌丛与河滩, 穴居夜行, 主食昆虫无脊椎, 雨后觅食最活跃。",
  distribution: "自美国中部至阿根廷, 近一个世纪分布北界北移数个纬度, 唯一北入美国的犰狳。",
  etymology:
    "属名 Dasypus 为希腊「毛足」; 种加词 novemcinctus 意为「九环」; 中文「犰狳」为古籍兽名借用, 《山海经》有「状如菟而鸟喙」的犰狳记文。",
  discovery:
    "林奈 1758 年定名; 1971 年证实其携带麻风杆菌, 基因组测序进一步揭示其先天免疫与体温共同造就的易感性。",
  genomeInfo: "2n=64(雌)/66?——染色体两性核型特殊; 全基因组 2011 年发表, 揭示麻风易感免疫基因缺失。",
  ecologyRole: "掘穴翻土(每公顷年掘数百穴)为种子床与甲虫群落造微生境; 白蚁与昆虫种群的捕食调节者; 部分种群体内携带麻风杆菌。",
  researchValue: "麻风病研究的不可替代模型(天然宿主); 同卵四胞胎遗传一致性的表观遗传研究素材; 物种北扩的气候变化实证。",
  tags: ["模式生物"],
},
{
  rank: "species",
  latin: "Mustela erminea",
  chinese: "白鼬",
  authority: "(Linnaeus, 1758)",
  parent: "Mustela",
  conservation: "LC",
  description:
    "白鼬冬装雪白仅尾尖留黑,「银鼠」皮草曾是欧洲王室权杖上的白鼬皮意象(纯净不染); 换季棕白双色交替是教科书式季节性毛色适应。其「催眠舞」捕猎行为(跳跃扭动迷惑兔)近年成行为学热点。",
  morphology: "体细长 17-33 厘米, 夏毛背棕腹白, 冬毛通体雪白而尾尖恒黑, 北方种群换装随雪期。",
  habitat: "寒温带森林、灌丛、荒原与农田, 领域性强, 主捕鼠类旅鼠。",
  distribution: "欧亚与北美寒温带全域, 高纬种群雪白冬装; 引入新西兰后成入侵捕食者。",
  etymology:
    "种加词 erminea 源自亚美尼亚语对白鼬皮的称谓, 后转拉丁 erminium(白鼬皮); 英 ermine 直承其皮草史。",
  discovery:
    "林奈 1758 年定名; 其冬白基因(Mc1r 调控)与雪期错配(雪迟而鼬白)成为气候表型适应研究范本。",
  genomeInfo: "2n=44; 全基因组已测序(鼬科比较基因组计划); 冬季白毛开关与毛色多态位点已被定位。",
  ecologyRole: "小型啮齿类(鼠、旅兔)的主要天敌, 北方旅鼠周期波动的跟随者; 巢穴窃据与兔群压制显著。",
  researchValue: "季节性毛色适应与气候错配研究的模式; 「催眠舞」捕猎行为学争论焦点; 新西兰入侵(威胁海鸟)种群遗传溯源案例。",
  tags: ["模式生物"],
},
]
