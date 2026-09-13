import { TaxonSeed } from "../types";

// ============================================================
// 无脊椎动物扩充种子数据 expansion-invertebrates
// 在 invertebrates.ts 76 物种基础上扩充 25 个新物种 + 45 个中间阶元
// (1 纲 / 1 亚纲 / 6 目 / 10 科 / 27 属),所有 parent 均精确引用
// 清单已有单元(invertebrates.ts 等)或本文件先定义的新单元:
//   昆虫补缺门类:虎凤蝶/喙凤蝶(凤蝶科) · 红火蚁(蚁科)
//     家白蚁(鼻白蚁科新链) · 双斑蟋(蟋蟀科新链)
//     竹节虫(䗛目新链) · 草蛉(脉翅目新链) · 稻蝗/洁蜣螂
//   软体动物:无针乌贼/短蛸/中国枪乌贼(闭眼目新链)
//     栉孔扇贝+虾夷扇贝(扇贝目新链) · 泥蚶+毛蚶(蚶目新链)
//     河蚬(蚬科) · 中国圆田螺(主扭舌目新链)
//   刺胞动物:加勒比鹿角珊瑚 · 桃花水母(淡水水母目新链)
//   环节动物:参环毛蚓(巨蚓科新链,药材地龙) · 沙蚕
//   甲壳动物:青虾+罗氏沼虾(长臂虾科) · 中华哲水蚤(颚足纲桡足亚纲新链)
// ============================================================

export const expansionInvertebrates: TaxonSeed[] = [
  // ================= 鳞翅目:珍稀凤蝶 =================
  {
    rank: "genus",
    latin: "Luehdorfia",
    chinese: "虎凤蝶属",
    parent: "Papilionidae",
    description:
      "虎凤蝶属是东亚特有的珍稀凤蝶类群,仅数种,成虫早春羽化,翅黄底黑纹如虎斑,后翅具尾突与红色亚缘斑。幼虫取食细辛等马兜铃科草本,各成员种群零散,均被列入保护名录。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Luehdorfia chinensis",
    chinese: "中华虎凤蝶",
    authority: "Leech, 1889",
    parent: "Luehdorfia",
    description:
      "中华虎凤蝶是中国特有的珍稀蝶类,早春三月即破蛹羽化,在料峭春光中访花求偶。翅面黄底黑纹如虎斑,后翅尾突短小,被蝶友誉为'国宝蝴蝶'。幼虫专食细辛属草本,分布狭窄、种群岛屿化,对生境变化极为敏感,被列为国家二级保护野生动物。",
    morphology: "中型凤蝶,翅展55-65毫米;前翅黄色底上贯黑色虎纹斜带,后翅黑黄相间,外缘红色斑列清晰,尾突短。",
    habitat: "栖于长江中下游低中海拔山地林缘与灌草丛,成虫早春出现,幼虫取食细辛属植物叶片。",
    distribution: "分布于江苏、浙江、安徽、湖北、陕西及甘肃东南部等地,为中国特有种。",
    conservation: "EN",
    tags: ["国家二级保护"],
  },
  {
    rank: "genus",
    latin: "Teinopalpus",
    chinese: "喙凤蝶属",
    parent: "Papilionidae",
    description:
      "喙凤蝶属仅两种,分布于喜马拉雅至中国南方山地,是凤蝶科最珍稀的类群之一。翅黑底缀金绿斑,雄蝶后翅金黄大斑流光溢彩,被誉为'蝶中皇后',因收藏界觊觎而严禁贸易。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Teinopalpus aureus",
    chinese: "金斑喙凤蝶",
    authority: "Mell, 1923",
    parent: "Teinopalpus",
    description:
      "金斑喙凤蝶被称为'蝶中皇后',是中国唯一列为国家一级保护野生动物的蝶种。雄蝶后翅中域大片金绿色斑在阳光下熠熠生辉,极为华贵。其行踪隐蔽、数量稀少,历史上长期仅凭零星标本而闻名,野外调查极难发现成体,被视为世界蝴蝶研究中的传奇物种。",
    morphology: "大型凤蝶,翅展约100毫米;前翅黑色缀黄绿斑带,雄蝶后翅具金黄大斑,雌蝶翅色深暗,尾突细长。",
    habitat: "栖于南方中高山常绿阔叶林,一年一代,晨昏活动访花,寄主为含笑等木兰科植物。",
    distribution: "分布于海南、广东、广西、福建、江西、浙江及中南半岛北部高山地带。",
    conservation: "CR",
    tags: ["国家一级保护"],
  },

  // ================= 膜翅目:红火蚁 =================
  {
    rank: "genus",
    latin: "Solenopsis",
    chinese: "火蚁属",
    parent: "Formicidae",
    description:
      "火蚁属约二百种,主产新热带界,工蚁腹末具螫针,受扰时群起螫刺,痛如火灼,故名。部分种类随国际贸易入侵全球暖区,红火蚁即其中危害最著的世界级入侵害虫。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Solenopsis invicta",
    chinese: "红火蚁",
    authority: "Buren, 1972",
    parent: "Solenopsis",
    description:
      "红火蚁原产南美巴拉那河流域,随货柜贸易扩散至北美、澳洲与东亚,名列世界百大入侵物种。蚁群多后制,繁殖扩散极快,攻击时以螫针反复注入毒液,人群被螫可致红肿脓疱乃至过敏性休克;并取食作物种子幼芽、捕食土栖动物,对农林业与生物多样性危害巨大。",
    morphology: "中小型红褐色蚂蚁,同一巢内工蚁体长2.5-6毫米连续多态,腹柄节两节,腹末具螫针。",
    habitat: "筑隆起蚁丘于草地、农田、绿化带与撂荒地,丘口蜂窝状,受扰后工蚁群涌而出攻击。",
    distribution: "原产南美;已入侵美国、澳大利亚及中国华南、西南十余省区,为重要检疫对象。",
    ncbiTaxId: 13692,
    tags: ["入侵物种"],
  },

  // ================= 蜚蠊目:鼻白蚁科(家白蚁) =================
  {
    rank: "family",
    latin: "Rhinotermitidae",
    chinese: "鼻白蚁科",
    parent: "Blattodea",
    description:
      "鼻白蚁科为高等白蚁类群,筑巢于土壤或木材,兵蚁头壳前缘具囟孔,受扰时喷出乳白色防御液。土木两栖的取食习性使其成为破坏建筑物最严重的白蚁类群之一。",
    tags: ["family"],
  },
  {
    rank: "genus",
    latin: "Coptotermes",
    chinese: "乳白蚁属",
    parent: "Rhinotermitidae",
    description:
      "乳白蚁属是鼻白蚁科中危害最大的属,巢群庞大可逾百万头,工蚁经地下蚁路隐蔽蛀食木构件,表面完好而内部中空,防治须依靠监测诱杀与药剂屏障系统。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Coptotermes formosanus",
    chinese: "台湾乳白蚁",
    authority: "Shiraki, 1909",
    parent: "Coptotermes",
    description:
      "台湾乳白蚁俗称家白蚁,原产东亚温暖地区,随木材贸易扩散至全球,是世界公认破坏力最强的入侵白蚁。成熟巢群个体可达数百万,工蚁经隐蔽蚁路蛀空房屋木构、活树与堤坝,水利堤防遭其贯穿常形成溃决险情,每年在全球造成数十亿美元经济损失。",
    morphology: "兵蚁头卵圆形、黄褐色,囟孔受扰喷出乳白黏液;工蚁白色柔软,体长约5毫米。",
    habitat: "筑大型地下主巢与多个副巢,栖于建筑木结构、树干与堤坝内,喜温暖潮湿环境。",
    distribution: "原产中国南方与日本等地,现入侵美国东南部、夏威夷等,遍布热带亚热带。",
    tags: ["入侵物种"],
  },

  // ================= 直翅目:蟋蟀科 + 稻蝗属 =================
  {
    rank: "family",
    latin: "Gryllidae",
    chinese: "蟋蟀科",
    parent: "Orthoptera",
    description:
      "蟋蟀科昆虫体粗壮善跳跃,雄虫前翅特化发音器,靠摩擦发声,鸣声具求偶与宣示领域功能;听器位于前足胫节。栖地表或穴居,杂食性,斗蟋文化在中国绵延千年。",
    tags: ["family"],
  },
  {
    rank: "genus",
    latin: "Gryllus",
    chinese: "蟋蟀属",
    parent: "Gryllidae",
    description:
      "蟋蟀属为蟋蟀科模式属,通称田蟋,体黑褐粗壮,后足为发达跳跃足,雄虫昼夜鸣叫,鸣声连续响亮,是鸣声节律与神经生物学研究的经典材料。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Gryllus bimaculatus",
    chinese: "双斑蟋",
    authority: "De Geer, 1773",
    parent: "Gryllus",
    description:
      "双斑蟋是世界性分布的蟋蟀科昆虫,因雄虫前翅基部各具一黄白色斑而得名。作为昆虫学经典模式生物,广泛用于昼夜节律钟机制、鸣声通讯与神经编码研究;雄虫前翅摩擦发声求偶,鸣声节律受脑内钟神经元调控,相关成果已成为时间生物学的教科书内容。",
    morphology: "体黑褐粗壮,长15-25毫米;雄虫前翅达腹端,基部各一黄斑;雌虫产卵管细长针状。",
    habitat: "栖于地表石下、土缝与草丛,昼伏夜出,杂食性,具趋光性,雄虫整夜鸣叫。",
    distribution: "分布于欧洲、非洲、南亚与中国南北各地,实验室种群遍及全球。",
    tags: ["模式生物"],
  },
  {
    rank: "genus",
    latin: "Oxya",
    chinese: "稻蝗属",
    parent: "Acrididae",
    description:
      "稻蝗属约三十种,主产东洋界,体绿色中小型,栖于水稻等禾本科作物田,成若虫取食稻叶稻穗,是东亚稻区常发害虫,代表种中华稻蝗亦为细胞遗传学经典材料。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Oxya chinensis",
    chinese: "中华稻蝗",
    authority: "(Thunberg, 1815)",
    parent: "Oxya",
    description:
      "中华稻蝗是中国稻区最常见的大型蝗虫,成虫与若虫群集啃食稻叶、穗颈与谷粒,重发年份可致明显减产,是水稻害虫防治的重点对象。其染色体数目少而形态清晰,长期用作昆虫细胞遗传学的实验材料,研究文献详实,分布遍及全国主要稻作区。",
    morphology: "体绿色或黄绿色,长25-40毫米;前胸背板侧缘具黑色纵纹,前翅发达,后足腿节黄色。",
    habitat: "栖于稻田、苇塘与湿草地,喜食禾本科植物,以卵囊在田埂土壤中越冬。",
    distribution: "广布于中国南北各省及东亚、东南亚稻作区,一年发生一至二代。",
    tags: ["农业害虫"],
  },

  // ================= 䗛目(竹节虫目)新链 =================
  {
    rank: "order",
    latin: "Phasmatodea",
    chinese: "竹节虫目",
    parent: "Insecta",
    description:
      "竹节虫目又称䗛目,体细长如枝或扁宽如叶,拟态枯枝树叶堪称一绝。前胸短,中后胸延长,渐变态,植食性,部分种类行孤雌生殖,已知约三千种,多分布于热带亚热带。",
    tags: ["order"],
  },
  {
    rank: "family",
    latin: "Diapheromeridae",
    chinese: "竹节虫科",
    parent: "Phasmatodea",
    description:
      "竹节虫科为䗛目最大的科之一,体棒状细长,无翅或翅退化,栖息时前足前伸强化枝条拟态,夜行植食性,代表属竹节虫属是世界实验室最常用的竹节虫材料。",
    tags: ["family"],
  },
  {
    rank: "genus",
    latin: "Carausius",
    chinese: "竹节虫属",
    parent: "Diapheromeridae",
    description:
      "竹节虫属原产亚洲,模式种印度竹节虫因孤雌生殖、饲养简易而成为昆虫神经生理与发育研究的经典对象,巨型神经纤维尤适于电生理记录。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Carausius morosus",
    chinese: "印度竹节虫",
    parent: "Carausius",
    description:
      "印度竹节虫俗称实验室竹节虫,体态酷肖竹枝,静止时前足前伸更增迷惑,是昆虫拟态研究的教科书案例。其巨型运动神经元与轴突适于电生理记录,自二十世纪初即用于神经生理学;种群以孤雌生殖维系,雄虫极罕见,饲养容易,现仍是发育、再生与运动控制研究的常用材料。",
    morphology: "体细长无翅,成虫长7-9厘米,绿色至棕褐色,足细长,整体形如竹枝,触角丝状。",
    habitat: "原产印度南部灌丛,夜间取食多种植物叶片,白昼静伏枝上拟态,受惊坠地假死。",
    distribution: "原产南亚,作为实验与观赏昆虫被引种世界各地,部分热带地区已归化。",
    tags: ["模式生物"],
  },

  // ================= 脉翅目新链:草蛉 =================
  {
    rank: "order",
    latin: "Neuroptera",
    chinese: "脉翅目",
    parent: "Insecta",
    description:
      "脉翅目昆虫翅膜质,翅脉分支交织成网,咀嚼式口器,幼虫几乎全部捕食性,蚜狮捕食蚜虫效率极高,草蛉等已被大规模工厂化繁殖用于生物防治。全变态,已知约六千种。",
    tags: ["order"],
  },
  {
    rank: "family",
    latin: "Chrysopidae",
    chinese: "草蛉科",
    parent: "Neuroptera",
    description:
      "草蛉科成虫体纤弱,复眼金绿具金属光泽,翅宽大透明,产卵于细长卵柄顶端,幼虫称蚜狮,捕食蚜虫粉虱与鳞翅目卵,是农林害虫生物防治的主力天敌类群。",
    tags: ["family"],
  },
  {
    rank: "genus",
    latin: "Chrysoperla",
    chinese: "通草蛉属",
    parent: "Chrysopidae",
    description:
      "通草蛉属成虫绿色,翅脉淡绿,随季节转换体色并以土黄色越冬,成虫专食花粉蜜露,幼虫嗜捕蚜虫,多种已商品化生产,是农田生防应用最广的类群。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Chrysoperla sinica",
    chinese: "中华通草蛉",
    authority: "(Tjeder, 1936)",
    parent: "Chrysoperla",
    description:
      "中华通草蛉是中国农田最常见的草蛉,幼虫俗称蚜狮,口器特化为一对吸管状大颚,刺入蚜虫体内吸尽体液,一头幼虫一生可捕食蚜虫数百头,是蚜虫生物防治的主力天敌。成虫金眼绿翅,秋季体色转黄潜入越冬,翌春复苏,可人工繁殖后释放于果园与大棚。",
    morphology: "体长约10毫米,绿色;翅透明宽大,翅脉绿色呈网状;复眼金绿色,触角丝状细长。",
    habitat: "见于农田、果园与林缘,幼虫游走于蚜群间捕食,成虫食花粉蜜露,夜间趋光。",
    distribution: "广布于中国各地及朝鲜半岛、日本,为北方农田天敌优势种。",
    tags: ["天敌昆虫"],
  },

  // ================= 鞘翅目:洁蜣螂属 =================
  {
    rank: "genus",
    latin: "Catharsius",
    chinese: "洁蜣螂属",
    parent: "Scarabaeidae",
    description:
      "洁蜣螂属为大型粪食金龟,唇基宽扁如铲,雄虫头具角突,善掘土埋粪成球,子代在粪球中发育,因分解粪便、传播种子被誉为'自然清道夫',成虫入药称蜣螂。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Catharsius molossus",
    chinese: "神农洁蜣螂",
    authority: "(Linnaeus, 1758)",
    parent: "Catharsius",
    description:
      "神农洁蜣螂俗称屎壳郎,是典型的粪食性金龟,成虫将兽粪搓滚成球埋入地下,既作子代食料又完成粪便分解、土壤改良与种子传播,被誉为自然界的清道夫。其干燥成虫入药称蜣螂,具破瘀通便、攻毒散肿之效,是传统本草沿用千年的动物药材,主产华南西南。",
    morphology: "体黑色粗壮,长20-30毫米;雄虫头具片状角突,唇基铲状;前足开掘式,胫节外缘列齿。",
    habitat: "活动于牧场、山坡与林缘,夜间趋光,掘穴埋粪球,幼虫匿居球中取食发育。",
    distribution: "分布于中国南方各地及南亚、东南亚,为中药材蜣螂的主要来源种。",
    tags: ["药用"],
  },

  // ================= 头足纲:无针乌贼 + 短蛸 + 枪乌贼 =================
  {
    rank: "genus",
    latin: "Sepiella",
    chinese: "无针乌贼属",
    parent: "Sepiidae",
    description:
      "无针乌贼属与乌贼属近缘,但内壳后端不具骨针,体卵圆形,背部色素点斑细密,栖近海岛礁间,代表种曼氏无针乌贼曾列东海'四大海产',渔汛盛极一时。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Sepiella maindroni",
    chinese: "曼氏无针乌贼",
    parent: "Sepiella",
    description:
      "曼氏无针乌贼曾与大黄鱼、小黄鱼、带鱼并称东海'四大海产',资源鼎盛时浙闽沿海渔汛蔽海。内壳石灰质薄而埋于皮下,后端无骨针,由此得名。上世纪八九十年代因过度捕捞与产卵场破坏,资源几近崩溃,近年通过增殖放流与限额捕捞逐步恢复,是中国海洋渔业资源兴衰的标志性物种。",
    morphology: "体袋状,背腹稍扁,背部灰褐密布深色色素点;鳍窄,占体侧全缘;内壳后端无针。",
    habitat: "暖水性近海种,栖于岛礁清水海域,肉食性,春夏向近岸作生殖洄游,卵缠附海藻。",
    distribution: "分布于东海、南海及西太平洋暖水海区,以浙江近海资源最著称。",
    tags: ["经济物种"],
  },
  {
    rank: "species",
    latin: "Octopus ocellatus",
    chinese: "短蛸",
    authority: "Gray, 1849",
    parent: "Octopus",
    description:
      "短蛸俗称八带蛸、八带鱼,是黄渤海近海小型经济章鱼。秋季集群索饵,冬季钻泥穴居,肉质紧实鲜美,胶东'葱拌八带'与日式煮蛸皆以此为主料。生命周期约一年,亲体护卵孵幼后相继死亡,资源更新快,是底拖网与蛸壶渔业的重要捕捞对象。",
    morphology: "小型章鱼,胴部卵圆形,腕短粗;两眼间背面各具一枚金黄色环斑,为鉴别特征。",
    habitat: "栖于泥沙底近海,夜出捕食蟹类贝类;秋末钻穴越冬,春暖出穴交配产卵。",
    distribution: "分布于黄渤海、东海及日本、朝鲜半岛近海,北方市场俗称八带。",
    tags: ["经济物种"],
  },
  {
    rank: "order",
    latin: "Myopsida",
    chinese: "闭眼目",
    parent: "Cephalopoda",
    description:
      "闭眼目即闭眼鱿鱼类,眼球外被覆半透明角膜,适应近海混浊水域,两鳍位于胴部后段,内壳角质,统称枪乌贼,资源量大,是世界头足类渔业的主要对象。",
    tags: ["order"],
  },
  {
    rank: "family",
    latin: "Loliginidae",
    chinese: "枪乌贼科",
    parent: "Myopsida",
    description:
      "枪乌贼科体圆锥形,侧鳍位于胴部后段,触腕穗吸盘成行,内壳角质透明,近海集群生活,昼夜垂直移动明显,是灯光围网渔业的主要类群,经济价值高。",
    tags: ["family"],
  },
  {
    rank: "genus",
    latin: "Uroteuthis",
    chinese: "枪乌贼属",
    parent: "Loliginidae",
    description:
      "枪乌贼属为西太平洋近海枪乌贼的主要属,通称鱿鱼,体形流线运动迅速,集群洄游,中国枪乌贼资源量最大,是鲜销与鱿鱼干制品的核心原料。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Uroteuthis chinensis",
    chinese: "中国枪乌贼",
    authority: "(Gray, 1849)",
    parent: "Uroteuthis",
    description:
      "中国枪乌贼是中国近海最重要的经济鱿鱼,南海与东海的底拖网、灯光围网渔业常年大量捕捞。胴部细锥形,内壳为透明角质羽状片,集群洄游明显,春夏游向近岸繁殖。鲜品是市售鱿鱼的主流,加工的鱿鱼干与调味制品出口值高,支撑华南头足类全产业链。",
    morphology: "胴部圆锥形,长可达40厘米;两鳍相接呈菱形;触腕穗吸盘四行,腕吸盘两行,内壳角质。",
    habitat: "暖水性种,栖于大陆架水域;白昼栖于底层,夜间升上层捕食小鱼虾,随暖流洄游。",
    distribution: "分布于南海、东海及西太平洋暖水区,以华南近海资源最为丰富。",
    tags: ["经济物种"],
  },

  // ================= 双壳纲:扇贝 + 蚶 + 蚬 =================
  {
    rank: "order",
    latin: "Pectinida",
    chinese: "扇贝目",
    parent: "Bivalvia",
    description:
      "扇贝目贝壳扇形,具粗放射肋与前后耳,闭壳肌发达,遇敌时猛然合壳喷水逃逸,是双壳类中罕见的'游泳者'。除极地外广布各海,多种为重要的养殖经济贝类。",
    tags: ["order"],
  },
  {
    rank: "family",
    latin: "Pectinidae",
    chinese: "扇贝科",
    parent: "Pectinida",
    description:
      "扇贝科贝壳扇形,具耳与放射肋,以发达闭壳肌拍水游动,滤食浮游藻类,栉孔扇贝与虾夷扇贝等支撑庞大养殖产业,闭壳肌干制品即名贵海味'干贝'。",
    tags: ["family"],
  },
  {
    rank: "genus",
    latin: "Chlamys",
    chinese: "栉孔扇贝属",
    parent: "Pectinidae",
    description:
      "栉孔扇贝属壳质坚厚,放射肋上常具鳞片状突起,右壳前耳具栉孔,以足丝附着生活,种间形态变异大,中国北方与南方海区各有主导养殖种。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Chlamys farreri",
    chinese: "栉孔扇贝",
    authority: "(Jones & Preston, 1904)",
    parent: "Chlamys",
    description:
      "栉孔扇贝是中国北方海域的传统养殖贝类,山东长岛、荣成等地筏式养殖已有数十年历史。壳呈扇形,前耳腹面具一列栉孔,幼贝借以伸出足丝附着岩礁。滤食生长快,闭壳肌粗壮,干制即名贵海味'干贝',粒粒成柱,是中式宴席的经典食材。",
    morphology: "壳扇形,高达8-10厘米;左壳灰褐具放射肋,右壳色浅;前耳具栉孔列,足丝黄褐。",
    habitat: "以足丝附着于低潮线以下岩礁砾石,滤食浮游硅藻,喜水清流急的高盐海域。",
    distribution: "分布于黄渤海及朝鲜半岛近海,为北方扇贝养殖产业的主导种。",
    tags: ["经济物种"],
  },
  {
    rank: "genus",
    latin: "Mizuhopecten",
    chinese: "虾夷扇贝属",
    parent: "Pectinidae",
    description:
      "虾夷扇贝属仅现生一种,即虾夷扇贝,壳大而圆凸,冷水性,原产日本北部至远东海域,引入中国黄海北部后底播增殖成功,经济价值居扇贝之首。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Mizuhopecten yessoensis",
    chinese: "虾夷扇贝",
    authority: "(Jay, 1857)",
    parent: "Mizuhopecten",
    description:
      "虾夷扇贝是冷水性大型扇贝,壳高可达二十厘米,闭壳肌特大,为扇贝之冠,速冻贝柱与即食干贝畅销国际市场。原产日本北海道至鄂霍次克海,上世纪八十年代引种至黄海北部,底播增殖在长岛、獐子岛海域取得成功,创立了中国'海洋牧场'的范本。",
    morphology: "壳近圆形,大而凸,壳高可达18-20厘米;左壳紫褐色放射肋宽,右壳白色,肋扁。",
    habitat: "冷水性种,栖于低温高盐水域的沙砾底,成贝贴底生活,可拍壳喷水短程游动。",
    distribution: "原产日本北部至俄罗斯远东海域;中国黄海北部已引种增殖形成产业。",
    tags: ["经济物种"],
  },
  {
    rank: "order",
    latin: "Arcida",
    chinese: "蚶目",
    parent: "Bivalvia",
    description:
      "蚶目种类铰合齿多而细密,排成一列栉状,壳表常覆褐色壳皮并具放射肋,血液含血红蛋白而呈红色,营埋栖或半埋栖生活,多数可食用,是中国滩涂养殖传统类群。",
    tags: ["order"],
  },
  {
    rank: "family",
    latin: "Arcidae",
    chinese: "蚶科",
    parent: "Arcida",
    description:
      "蚶科壳卵圆形,壳皮绒状,放射肋粗细因属而异,血液红色、耐干露力强,泥蚶毛蚶等是中国沿海大宗渔获与养殖对象,'血蚶'之名即源于其赤红血液。",
    tags: ["family"],
  },
  {
    rank: "genus",
    latin: "Tegillarca",
    chinese: "泥蚶属",
    parent: "Arcidae",
    description:
      "泥蚶属壳小而厚,放射肋平滑无结节,埋栖潮间带泥滩,耐干露力强,适于滩涂蓄水养殖,代表种泥蚶是浙闽粤传统养殖蚶,鲜食具血蚶独特风味。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Tegillarca granosa",
    chinese: "泥蚶",
    authority: "(Linnaeus, 1758)",
    parent: "Tegillarca",
    description:
      "泥蚶俗称血蚶,是中国东南沿海养殖历史逾五百年的传统贝类,浙江宁海、福建云霄等地滩涂蓄水养殖自成体系。血液富含血红蛋白,壳内肉色淡红,沸水轻烫数秒即食,鲜嫩微甜,亦常糟醉腌制。明清曾列为贡品,至今仍是闽浙宴席冷盘头道与冬令滋补美味。",
    morphology: "壳卵圆坚厚,长2-4厘米;壳面被棕色壳皮,约20条放射肋,壳内白色,铰合齿细密。",
    habitat: "埋栖于潮间带泥沙滩,耐干露,滤食硅藻;适于滩涂蓄水养殖与虾塘混养。",
    distribution: "分布于印度-西太平洋暖水区;中国浙闽粤沿海养殖最为集中。",
    tags: ["经济物种"],
  },
  {
    rank: "genus",
    latin: "Scapharca",
    chinese: "毛蚶属",
    parent: "Arcidae",
    description:
      "毛蚶属壳面被绒毛状褐色壳皮,放射肋细密,栖近海软泥底,代表种毛蚶曾为渤海大宗渔获,因携带甲肝病毒的生食风险而深刻影响中国公共卫生史。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Scapharca subcrenata",
    chinese: "毛蚶",
    authority: "(Lischke, 1869)",
    parent: "Scapharca",
    description:
      "毛蚶是黄渤海产量最大的蚶类,壳面绒毛状褐色壳皮使触感如毡,由此得名,曾为渤海湾冬季大宗渔获。因其滤食习性可富集水体中的病毒,1988年携带甲型肝炎病毒的毛蚶引发上海三十余万人感染的特大疫情,自此禁止生食毛蚶成为公共卫生共识,深刻改变了贝类消费与监管方式。",
    morphology: "壳卵圆形,长3-4厘米;壳面被绒毛状壳皮,具30余条细放射肋,壳内缘具细齿列。",
    habitat: "栖于低潮线以下软泥沙底,滤食浮游藻类,常密集成片分布,资源量波动大。",
    distribution: "分布于黄渤海、东海北部及日本、朝鲜半岛近海,以渤海资源著称。",
    tags: ["经济物种"],
  },
  {
    rank: "family",
    latin: "Corbiculidae",
    chinese: "蚬科",
    parent: "Venerida",
    description:
      "蚬科壳小而坚厚,呈三角卵圆形,壳面粗糙具同心轮脉,俗称河蚬,栖于淡水与河口沙泥底,密度极高,是内陆水域重要经济贝类与毒性试验模式动物。",
    tags: ["family"],
  },
  {
    rank: "genus",
    latin: "Corbicula",
    chinese: "蚬属",
    parent: "Corbiculidae",
    description:
      "蚬属为蚬科代表属,广布东亚江河水域,产量巨大,是大众化水产与家禽饵料来源,已随人类活动入侵欧美水域,造成管道堵塞等危害。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Corbicula fluminea",
    chinese: "河蚬",
    authority: "(O. F. Müller, 1774)",
    parent: "Corbicula",
    description:
      "河蚬俗称蚬子,是东亚淡水水域产量最大的经济贝类之一,壳虽小而种群密度极高,沙洲上一平方米可达数百枚。汤鲜味美,两广炖汤、江浙葱姜炒蚬皆以本种为主料,亦用作禽类与青鱼饲料。作为沉积物毒性的标准试验生物广泛用于环境毒理学;在北美则成为堵塞管道的入侵种。",
    morphology: "壳三角卵圆形,长2-3厘米,黄褐至黑褐色;壳面粗糙,同心轮脉细密,壳内瓷白。",
    habitat: "栖于江河湖塘沙泥底,喜缓流水域,滤食藻类与有机碎屑,耐一定盐度。",
    distribution: "广布于东亚各水系;随压舱水入侵北美与欧洲,为世界性淡水贝类。",
    tags: ["经济物种"],
  },

  // ================= 腹足纲:田螺(主扭舌目新链) =================
  {
    rank: "order",
    latin: "Architaenioglossa",
    chinese: "主扭舌目",
    parent: "Gastropoda",
    description:
      "主扭舌目为腹足纲的原始分支,齿舌横齿众多,具角质厣,雌雄异体,淡水中分化出田螺科等大型类群,兼具东亚食用螺类与北美入侵螺类。",
    tags: ["order"],
  },
  {
    rank: "family",
    latin: "Viviparidae",
    chinese: "田螺科",
    parent: "Architaenioglossa",
    description:
      "田螺科壳圆锥形,壳口全缘,厣角质,行卵胎生,胚胎在母体育儿囊内发育为幼螺后产出,广布淡水湖泊稻田,是中国最重要的食用螺类,'螺蛳'多指本科种类。",
    tags: ["family"],
  },
  {
    rank: "genus",
    latin: "Cipangopaludina",
    chinese: "圆田螺属",
    parent: "Viviparidae",
    description:
      "圆田螺属是田螺科体型最大的淡水螺属之一,壳厚而光滑,绿褐色,栖静水底泥,卵胎生,代表种中国圆田螺俗称田螺,是南北通行的传统食材。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Cipangopaludina chinensis",
    chinese: "中国圆田螺",
    authority: "(Gray, 1834)",
    parent: "Cipangopaludina",
    description:
      "中国圆田螺通称田螺,是中国最重要的淡水食用螺。壳口全缘无缺刻,行卵胎生,胚胎在母体育儿囊中发育成幼螺方才产出,护幼机制降低了繁殖风险。稻田池塘中数量丰富,炖汤爆炒皆宜,'嗦螺'夜市文化深入人心;亦作为入侵种定居北美,被称为中华神秘螺。",
    morphology: "壳长圆锥形,高可达6厘米,绿褐色;螺层七层,各层膨圆;壳口卵圆全缘,厣角质。",
    habitat: "栖于湖泊、河流、稻田与沟渠,底泥腐殖质丰富处多见,以硅藻与腐屑为食。",
    distribution: "广布于中国各地水系;随引入扩散至北美,成为当地入侵淡水螺。",
    tags: ["经济物种"],
  },

  // ================= 刺胞动物门:珊瑚 + 淡水水母 =================
  {
    rank: "species",
    latin: "Acropora cervicornis",
    chinese: "加勒比鹿角珊瑚",
    authority: "(Lamarck, 1816)",
    parent: "Acropora",
    description:
      "加勒比鹿角珊瑚即staghorn coral,枝条鹿角状丛生,生长迅速,曾与elkhorn珊瑚同为加勒比礁坪的建架优势种。自1980年代起,白带病、飓风与升温白化叠加打击,种群崩溃逾九成,残株碎块化,被IUCN评为极危,现广泛开展苗圃断枝培育与移植复礁工程。",
    morphology: "群体树枝状,枝条渐细而末端尖;珊瑚杯小而密集,生活组织呈黄棕至褐色。",
    habitat: "生于加勒比海浅礁坪与礁前坡迎浪带,水深约2-15米,喜强光照与强水流。",
    distribution: "特产于加勒比海、巴哈马与佛罗里达海域的西大西洋暖水区。",
    conservation: "CR",
    tags: ["濒危物种"],
  },
  {
    rank: "order",
    latin: "Limnomedusae",
    chinese: "淡水水母目",
    parent: "Hydrozoa",
    description:
      "淡水水母目是刺胞动物中罕见的淡水类群,水螅体微小附着生活,水母体伞缘触手众多,散布于世界温带静水水域,桃花水母属为其明星成员,中国古籍早有记载。",
    tags: ["order"],
  },
  {
    rank: "family",
    latin: "Olindiidae",
    chinese: "笠水母科",
    parent: "Limnomedusae",
    description:
      "笠水母科水母伞扁盘状,生殖腺贴附于辐管,触手众多而可弯曲,多数海产,少数如桃花水母属成功定居淡水,生活史隐蔽,水母体仅偶尔大量出现。",
    tags: ["family"],
  },
  {
    rank: "genus",
    latin: "Craspedacusta",
    chinese: "桃花水母属",
    parent: "Olindiidae",
    description:
      "桃花水母属为淡水水母,伞体透明,缘膜发达,多数种产中国,水母体仅在温暖季节偶现,与桃花同放而得名,古人称'桃花鱼',多产地将其列为保护对象。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Craspedacusta sowerbii",
    chinese: "桃花水母",
    authority: "Lankester, 1880",
    parent: "Craspedacusta",
    description:
      "桃花水母是全球分布最广的淡水水母。水母体伞径约2厘米,通体透明,伞缘数百条纤细触手随水流缓缓开合,温暖季节偶现于池塘水库,数周后踪迹全无。生活史绝大部分时间以毫米级水螅体潜伏水底,环境契合时方产出水母体,来去如谜;中国古籍咏其为'桃花鱼',今则被视为水质指示生物。",
    morphology: "伞扁半球形,径1-2.5厘米,透明微带乳白;缘膜发达,触手纤细众多,放射排列。",
    habitat: "出现于温暖季节的静水池塘、水库与缓流河道,水螅体附着水底石块水草生活。",
    distribution: "世界性分布于各大洲温带淡水,中国南北均有出现记录。",
    tags: ["珍稀物种"],
  },

  // ================= 环节动物门:地龙 + 沙蚕 =================
  {
    rank: "family",
    latin: "Megascolecidae",
    chinese: "巨蚓科",
    parent: "Opisthopora",
    description:
      "巨蚓科是寡毛纲最大的科,每体节刚毛成环排列,环带环状,种类逾千,广布东洋界与澳新区,中国南方习见的环毛蚓类即属此科,是土壤生态与药材地龙的来源。",
    tags: ["family"],
  },
  {
    rank: "genus",
    latin: "Pheretima",
    chinese: "环毛蚓属",
    parent: "Megascolecidae",
    description:
      "环毛蚓属为巨蚓科模式属,种类逾百,体大而刚毛环生,环带位于第十四至十六体节,中国南方的参环毛蚓是药材广地龙的原动物。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Pheretima aspergillum",
    chinese: "参环毛蚓",
    parent: "Pheretima",
    description:
      "参环毛蚓是中药'广地龙'的原动物,主产两广,干燥全体入药,性寒味咸,归肝、脾、膀胱经,功能清热定惊、通络平喘、利尿,主治高热惊厥、关节痹痛与痰热咳喘,现代研究关注其纤溶活性成分。野生资源因垦殖萎缩,现以林地堆肥半人工养殖供药用,是动物药材驯化成功的范例。",
    morphology: "体圆柱形,长15-20厘米,背部紫灰,腹面色淡;每节刚毛成环,环带占14-16节呈戒指状。",
    habitat: "栖于肥沃湿润的园田林地腐殖土中,吞食腐殖土,夜间与雨后常出土活动。",
    distribution: "分布于广东、广西、福建、海南与台湾,为道地药材广地龙的来源。",
    tags: ["药用"],
  },
  {
    rank: "genus",
    latin: "Nereis",
    chinese: "沙蚕属",
    parent: "Nereididae",
    description:
      "沙蚕属是多毛纲沙蚕科的模式属,头部感觉器官发达,疣足叶片状,掠食性,是环节动物形态学与再生研究的经典材料,大型种类为优质钓饵与饵料生物。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Nereis virens",
    chinese: "沙蚕",
    parent: "Nereis",
    description:
      "沙蚕俗称青虫、大沙蚕,是多毛纲环节动物的经典代表种,体分节鲜明、疣足发达,游走活泼如蛾。因个体大、易饲养,长期用于再生生物学与生态毒理学研究;又是世界著名的活钓饵与水产苗种活饵,支撑欧美规模化的采捕与人工养殖产业,享有'万能钓饵'之誉。",
    morphology: "体长10-20厘米,青绿或红褐色;头部具触手触角,各体节一对疣足,疣足着生刚毛。",
    habitat: "穴居于潮间带泥沙底,昼伏夜出,捕食小形底栖动物,亦食腐屑与藻类。",
    distribution: "分布于北大西洋两岸温带海域,冷温潮间带滩涂资源量大。",
    tags: ["模式生物", "经济物种"],
  },

  // ================= 甲壳亚门:沼虾 + 桡足类新链 =================
  {
    rank: "family",
    latin: "Palaemonidae",
    chinese: "长臂虾科",
    parent: "Decapoda",
    description:
      "长臂虾科第二对步足特别发达形成大螯,故称长臂,额角侧扁,淡海水皆产,沼虾属支撑中国淡水养虾业的两大支柱,长臂虾类亦为近海渔业对象。",
    tags: ["family"],
  },
  {
    rank: "genus",
    latin: "Macrobrachium",
    chinese: "沼虾属",
    parent: "Palaemonidae",
    description:
      "沼虾属约二百种,为大型淡水虾,第二对步足远长于体长且具刺,幼体需在咸淡水中变态发育,罗氏沼虾与日本沼虾分别支撑热带与温带淡水养虾业。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Macrobrachium nipponense",
    chinese: "日本沼虾",
    authority: "(De Haan, 1849)",
    parent: "Macrobrachium",
    description:
      "日本沼虾通称青虾,是中国淡水虾的原生代表种,太湖、洞庭湖等天然水域资源亦丰。体色青绿透亮,第二对步足远长于体长,雄虾尤显威武。杂食贪长,与鱼类混养可清理残饵提高综合效益;肉质紧嫩,白灼、油爆皆为席上佳肴,经济价值居淡水虾类前列。",
    morphology: "体青绿半透明,长5-8厘米;额角平直具锯齿;雄性第二步足粗长,密布小刺。",
    habitat: "栖于湖泊河沟水草丛,昼伏夜出,杂食性,冬季潜入深水泥底越冬。",
    distribution: "分布于中国南北各地及日本、朝鲜半岛淡水水域,为全国性常见种。",
    tags: ["经济物种"],
  },
  {
    rank: "species",
    latin: "Macrobrachium rosenbergii",
    chinese: "罗氏沼虾",
    authority: "(De Man, 1879)",
    parent: "Macrobrachium",
    description:
      "罗氏沼虾又称淡水长臂大虾,原产东南亚至大洋洲北部,是世上个体最大的淡水虾之一,体重可逾百克,雄性蓝色巨螯长逾体长,威武夺目。幼体须在咸淡水中经历变态方能回到淡水生活,养殖须配套育苗体系;中国1976年引种成功,已发展为南方淡水养虾的支柱产业之一。",
    morphology: "体青蓝色具橙斑,成虾体长可达20厘米以上;雄性第二步足极长呈蓝色,掌部膨大。",
    habitat: "栖于热带河流湖泊;幼体在河口咸水中发育变态,成虾回归淡水,不耐低温。",
    distribution: "原产东南亚及大洋洲北部;已引种至全球热带亚热带,中国南方养殖普遍。",
    tags: ["经济物种"],
  },
  {
    rank: "class",
    latin: "Maxillopoda",
    chinese: "颚足纲",
    parent: "Crustacea",
    description:
      "颚足纲身体分节退化,头部附肢发达,体多小型,包含桡足类、藤壶与鱼虱等形态迥异的类群,多营滤食或寄生,浮游底栖兼有,是甲壳动物适应辐射的典型代表。",
    tags: ["class"],
  },
  {
    rank: "subclass",
    latin: "Copepoda",
    chinese: "桡足亚纲",
    parent: "Maxillopoda",
    description:
      "桡足亚纲是颚足纲最大类群,体小分节,第一触角发达,头胸腹分明,自由生活者多为浮游滤食,构成海洋浮游生物主体,另有大量寄生种类,淡水海水俱备。",
    tags: ["subclass"],
  },
  {
    rank: "order",
    latin: "Calanoida",
    chinese: "哲水蚤目",
    parent: "Copepoda",
    description:
      "哲水蚤目为大型浮游桡足类,第一触角细长常超过体长,胸腹间活动关节明显,多栖上层水体,以触角划水悬浮取食,是海洋食物网初级消费者与仔幼鱼的关键饵料。",
    tags: ["order"],
  },
  {
    rank: "family",
    latin: "Calanidae",
    chinese: "哲水蚤科",
    parent: "Calanoida",
    description:
      "哲水蚤科为哲水蚤目代表科,个体较大,广泛分布于各大洋表层,生物量惊人,北极哲水蚤等是鲸类与鱼类的重要食物,中华哲水蚤为黄东海优势种。",
    tags: ["family"],
  },
  {
    rank: "genus",
    latin: "Calanus",
    chinese: "哲水蚤属",
    parent: "Calanidae",
    description:
      "哲水蚤属是北温带与极地海洋的优势浮游桡足类,个体粗壮,体内具储脂囊,冬季下沉深水滞育,春夏上浮繁殖,是高纬度海洋食物网的核心物种。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Calanus sinicus",
    chinese: "中华哲水蚤",
    parent: "Calanus",
    description:
      "中华哲水蚤是黄海、东海浮游动物的优势种与关键种,数量居黄海桡足类之冠,直接维系鳀鱼、鲐鲹等经济鱼类资源的丰歉。个体虽仅数毫米,却以巨大生物量滤食春季水华,参与碳向深层输送的生物泵过程;夏季高温迫其退栖黄海冷水团,其季节垂直迁移是陆架海生态学的经典命题。",
    morphology: "体长2-3毫米,头胸部粗大椭圆,腹部短小;第一触角细长过体,雌体春末常见成对卵囊。",
    habitat: "随海流浮游于黄东海中上层,滤食硅藻;冬季下沉深水滞育,春夏上层繁殖。",
    distribution: "分布于黄海、东海及日本周边陆架水域,为西北太平洋陆架特有种。",
    tags: ["浮游生物"],
  },
];
