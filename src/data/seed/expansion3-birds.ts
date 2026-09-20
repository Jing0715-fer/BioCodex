import { TaxonSeed } from "../types";

// 鸟纲深扩充种子数据(Task 4-c expansion3)。
// 主题:雀形目鸣禽深扩 + 鹦形目/鸮形目/企鹅目/雨燕目 + 其他目代表物种,
// 每个物种均含 5 项科学档案字段(etymology / discovery / genomeInfo / ecologyRole / researchValue)。
// species 的 parent 引用两类来源:
//   1) DB 已有分类单元(/tmp/taxa-inventory.tsv):
//      Aves / Passeriformes / Psittaciformes / Strigiformes / Sphenisciformes /
//      Pelecaniformes / Ciconiiformes / Galliformes / Phasianidae / Anatidae /
//      Ciconiidae(Ciconia) / Paridae(Parus) / Strigidae / Spheniscidae(Aptenodytes);
//   2) 本文件内先行定义的新中间阶元(2 目 15 科 24 属)。
// 注意:与 seed-incremental.ts 汇总合并使用时,父级必须(DB ∪ 新数据)闭合。
// 推荐名单中已有物种(雕鸮 Bubo bubo / 雪鸮 Bubo scandiacus / 长耳鸮 Asio otus /
// 帝企鹅 Aptenodytes forsteri / 普通翠鸟 Alcedo atthis / 虎皮鹦鹉)均已查重跳过;
// 远东山雀 Parus minor 已在库,大山雀 P. major 为分立独立种,不构成重复。
// 命名者/TaxID 逐种经 GBIF Backbone 与 NCBI Taxonomy 核验(2026-09)。
export const expansion3Birds: TaxonSeed[] = [
  // ===================== 雀形目 Passeriformes(鸣禽深扩) =====================
  {
    rank: "family",
    latin: "Alaudidae",
    chinese: "百灵科",
    parent: "Passeriformes",
    description:
      "百灵科为地表栖型鸣禽,后爪长直,羽色土褐近保护色,雄鸟求偶时常直升高空悬飞放歌,栖草原荒漠灌丛,广布旧大陆。",
  },
  {
    rank: "genus",
    latin: "Alauda",
    chinese: "云雀属",
    parent: "Alaudidae",
    description:
      "云雀属为开阔地带地栖百灵类,喙略细,头顶具短冠羽,求偶鸣唱飞行可升至百余米,广布欧亚大陆与非洲。",
  },
  {
    rank: "species",
    latin: "Alauda arvensis",
    chinese: "云雀",
    authority: "Linnaeus, 1758",
    parent: "Alauda",
    description:
      "云雀是欧亚开阔草原的标志性鸣禽,以直上云端的悬飞鸣唱著称,雄鸟可攀升至百余米高空边飞边歌,余音袅袅,为雪莱名诗与沃恩·威廉斯名曲的灵感之源。它地栖筑巢于草丛,受惊先奔后飞,广泛见于农田草原;近数十年欧洲农业集约化使其种群持续下滑,成为农田鸟类保护的代表议题。",
    morphology: "体长约 18 厘米,背面沙褐具黑褐纵纹,具短羽冠,外侧尾羽白色,起飞时两翼宽展,姿态朴拙。",
    habitat: "栖开阔草原、干草甸与农田,巢筑地面浅窝,晨昏鸣唱,秋冬结大群游荡觅食。",
    distribution: "繁殖于欧亚大陆温带,越冬南移至北非与印度北部;中国北方为留鸟或夏候鸟。",
    conservation: "LC",
    ncbiTaxId: 88112,
    etymology:
      "属名 Alauda 为拉丁语云雀,借自高卢语,古释「高歌者」;种加词 arvensis 意为「田间的」,指其栖居农田草原。",
    discovery:
      "1758 年林奈定名,为云雀属模式种。其鸣唱在西方文学与音乐中被反复礼赞,雪莱《致云雀》即咏此鸟。",
    genomeInfo: "全基因组约 1.2 Gb,属雀形目典型小基因组;鸣声学习比较研究常以其与近缘类群对照。",
    ecologyRole: "草原生态系统的地栖食虫鸟,繁殖期大量捕食蝗虫等昆虫,秋冬转食草籽,是开阔地食物网的中间环节。",
    researchValue: "鸣声学习与求偶展示研究的经典对象;欧洲农业景观变化对其种群的影响是农田鸟类保护的核心案例。",
  },
  {
    rank: "family",
    latin: "Paradoxornithidae",
    chinese: "鸦雀科",
    parent: "Passeriformes",
    description:
      "鸦雀科为喙短厚似鹦鹉的小型苇丛鸣禽,头圆尾长,性活泼,栖东亚至东南亚芦苇与灌丛,多结小群,部分系统将其并入莺科。",
  },
  {
    rank: "genus",
    latin: "Paradoxornis",
    chinese: "鸦雀属",
    parent: "Paradoxornithidae",
    description:
      "鸦雀属喙短厚如鹦鹉而「名实相悖」,羽色多棕褐,攀缘苇秆灌丛觅食虫蛹,种类多栖东亚,震旦鸦雀为中国的珍稀代表。",
  },
  {
    rank: "species",
    latin: "Paradoxornis heudei",
    chinese: "震旦鸦雀",
    authority: "David, 1872",
    parent: "Paradoxornis",
    description:
      "震旦鸦雀是终年栖于芦苇荡的珍稀鸦雀,「震旦」为古印度对中国的称呼,指其模式产地在中国。其喙短厚似鹦鹉,攀缘苇丛啄食茎秆内的昆虫,苇絮纷飞时尤显灵动。因湿地围垦致芦苇生境破碎,种群稀少而分散,现已列为国家二级保护野生动物,被誉为「芦苇中的精灵」。",
    morphology: "体长约 17 厘米,喙粗短似鹦鹉,上体黄褐,头顶灰,眉纹细弱,翼上栗红,尾长而凸。",
    habitat: "栖河湖滩涂、江心洲与河口的大片芦苇荡,攀缘苇秆啄食茎中昆虫,结小群活动,极少远飞。",
    distribution: "分布于黑龙江流域与中国东北至长江下游的苇塘湿地,长江三角洲为重要残存分布区。",
    ncbiTaxId: 3150879,
    etymology:
      "「震旦」为古印度语对中国的称呼;种加词 heudei 纪念创建上海徐家汇博物院的法国博物学家韩伯禄。",
    discovery:
      "1872 年谭卫道(阿尔芒·大卫)依长江下游苇丛标本定名;徐家汇博物院为中国最早的博物馆之一,韩伯禄为首任院长。",
    genomeInfo: "全基因组约 1.2 Gb,尚无染色体级组装报道;残存种群的遗传结构研究为其湿地保护管理提供参考。",
    ecologyRole: "专性依赖芦苇湿地,啄食苇茎虫瘿与昆虫,营深杯状巢于苇丛,是芦苇湿地健康程度的指示物种。",
    researchValue: "东亚特有芦苇湿地鸟类,滨海湿地保护与修复工程以其为目标物种,种群监测持续开展。",
    tags: ["国家二级保护"],
  },
  {
    rank: "family",
    latin: "Leiothrichidae",
    chinese: "噪鹛科",
    parent: "Passeriformes",
    description:
      "噪鹛科旧隶广义画眉科,体羽蓬松,群居喧闹,鸣声多变善效鸣,栖亚洲南部山地森林与灌丛,含画眉、噪鹛等百余种。",
  },
  {
    rank: "genus",
    latin: "Garrulax",
    chinese: "噪鹛属",
    parent: "Leiothrichidae",
    description:
      "噪鹛属为亚洲南部的群居鹛类,鸣声洪亮婉转,善模仿他鸟鸣声,传统笼鸟文化以画眉为宠,若干种类因鸣唱遭盗猎。",
  },
  {
    rank: "species",
    latin: "Garrulax canorus",
    chinese: "画眉",
    authority: "(Linnaeus, 1758)",
    parent: "Garrulax",
    description:
      "画眉是中国南方山林的传统名笼鸟,眼周白色眉纹如精心描画而得名,鸣声悠扬多变、极善效鸣,历代「遛鸟」斗唱文化以之为首。它栖于灌丛竹林,机警善藏,广泛分布于长江以南;因笼养盗猎压力巨大,2021 年从「三有」动物升格为国家二级保护野生动物,CITES 亦将其列入附录 II。",
    morphology: "体长约 22 厘米,上体橄榄褐,眼周白色眉纹清晰,下体棕黄,翼短圆,尾长而凸,善疾走跳跃。",
    habitat: "栖丘陵山地灌丛、竹林与林缘,单独或成对藏匿枝间,领域性强,晨昏立于枝头高声鸣唱。",
    distribution: "分布于中国华中、华南与西南山地,为留鸟;曾引入台湾,与当地特有台湾画眉存在杂交。",
    conservation: "LC",
    ncbiTaxId: 238855,
    etymology:
      "属名 Garrulax 源自拉丁语 garrulus(饶舌的);种加词 canorus 意为「音调优美的」,皆指其鸣声;中名取眉纹如画。",
    discovery:
      "1758 年林奈定为鸫属 Turdus canorus。因笼鸟贸易长期遭盗猎,2021 年列入国家二级保护名录,贸易转入管制。",
    genomeInfo: "全基因组约 1.2 Gb;作为雀形目鸣声学习的亚洲代表,其鸣控核团与鸣声发育已有组织学描述。",
    ecologyRole: "林下灌丛食虫鸟,繁殖期捕食大量昆虫,秋冬转食浆果并传播种子,是南方山地森林的常见成分。",
    researchValue: "传统笼鸟文化的旗舰物种,其盗猎治理与消费观念转变成为中国野生动物保护宣教的标志性案例。",
    tags: ["国家二级保护", "观赏鸟类"],
  },
  {
    rank: "family",
    latin: "Turdidae",
    chinese: "鸫科",
    parent: "Passeriformes",
    description:
      "鸫科为中型地栖鸣禽,喙细长,鸣声圆润多变,食虫兼啄浆果,多种秋季集群迁徙,广布全球,乌鸫与旅鸫均为常见代表。",
  },
  {
    rank: "genus",
    latin: "Turdus",
    chinese: "鸫属",
    parent: "Turdidae",
    description:
      "鸫属为世界性中大型鸫类,约八十种,喙细长善鸣,多数迁徙,秋冬季成群啄食浆果并传播种子,常至城市绿地。",
  },
  {
    rank: "species",
    latin: "Turdus mandarinus",
    chinese: "乌鸫",
    authority: "Bonaparte, 1850",
    parent: "Turdus",
    description:
      "乌鸫是东亚城市中最常见的鸫科鸣禽,通体乌黑、喙橙黄,古称「百舌」,能效仿百鸟之音乃至汽车警报声,《礼记·月令》「反舌无声」即记其物候。它善在草坪翻找蚯蚓,繁殖期清晓彻夜高歌,对人造环境适应力极强,已成为城市鸟类生态学与噪声下鸣声调整研究的常用对象。",
    morphology: "体长约 26 厘米,雄鸟通体黑色,喙与眼圈橙黄;雌鸟体色暗褐,喉具细纹,飞行呈波浪形起伏。",
    habitat: "栖林地、公园与花园草坪,翻土取食蚯蚓昆虫,浆果期集群上树,城市中全年可见。",
    distribution: "分布于中国东部至南部及中南半岛,留鸟为主,北方种群冬季南迁,城市公园普遍。",
    conservation: "LC",
    ncbiTaxId: 486387,
    etymology: "属名 Turdus 为拉丁语鸫;种加词 mandarinus 意为「中国的」,指其模式产地。",
    discovery:
      "1850 年博纳帕特依中国标本分立定名,此前长期被视为欧亚鸫的亚种;中国古代以「百舌」记其鸣声物候。",
    genomeInfo: "全基因组约 1.2 Gb,属雀形目典型小基因组;城市与山地种群的比较基因组学研究正在展开。",
    ecologyRole: "城市绿地常见地栖鸟,翻土取食蚯蚓与昆虫,秋季大量啄食浆果并传播种子,兼具「城市清道夫」职能。",
    researchValue: "城市适应研究的常用物种,人工环境噪声下的鸣声频率调整研究多以其为材料。",
    tags: ["城市适应种"],
  },
  {
    rank: "family",
    latin: "Certhiidae",
    chinese: "旋木雀科",
    parent: "Passeriformes",
    description:
      "旋木雀科为小型攀禽,喙细长下弯,尾羽坚硬供支撑,沿树干螺旋攀行啄取皮缝昆虫,羽色与树皮浑然一体,栖旧大陆针阔林。",
  },
  {
    rank: "genus",
    latin: "Certhia",
    chinese: "旋木雀属",
    parent: "Certhiidae",
    description:
      "旋木雀属栖北方针阔叶林,尾硬喙弯,自树干基部螺旋攀升觅食,羽色树皮般隐蔽,种级界限研究活跃,含约十种。",
  },
  {
    rank: "species",
    latin: "Certhia familiaris",
    chinese: "普通旋木雀",
    authority: "Linnaeus, 1758",
    parent: "Certhia",
    description:
      "普通旋木雀是北方森林的小型攀禽,羽色与树皮浑然一体,以坚硬尾羽支撑身体,自树干基部螺旋攀升,用细弯的喙探取树皮缝隙中的虫蛹,至树梢后飞落邻树重新开始。其种加词「家常的」源于它冬季常在瑞典农家院落出没,是林奈笔下熟悉的邻家小鸟;在中国见于北方与西南山地针叶林。",
    morphology: "体长约 12 厘米,上体棕褐杂白点,喙细长下弯,尾羽坚硬,下体污白,爪弯而有力。",
    habitat: "栖成熟针叶林与混交林,攀绕树干啄食皮缝昆虫,冬季常加入山雀混群游荡,偶至林缘人家。",
    distribution: "广布欧亚大陆北部山地针叶林,在中国见于新疆、东北至西南高山,为留鸟或作垂直迁移。",
    conservation: "LC",
    ncbiTaxId: 73333,
    etymology:
      "属名 Certhia 源自希腊语 kerthios,指攀树小雀;种加词 familiaris 意为「亲善人家的」,指其亲近农舍习性。",
    discovery:
      "1758 年林奈定名,种加词取自其在瑞典冬季常造访农舍园圃的习性,是最早被科学命名的攀禽之一。",
    genomeInfo: "全基因组约 1.2 Gb;旋木雀属的种级分类与冰期避难所分析多基于线粒体全序列与多态位点数据。",
    ecologyRole: "树皮表面专门化觅食者,啄食皮缝越冬昆虫与虫卵,与啄木鸟、山雀共同构成森林害虫防线。",
    researchValue: "森林破碎化与历史生物地理的指示类群,其在欧亚的种级界限是分子系统学的经典问题。",
  },
  {
    rank: "family",
    latin: "Regulidae",
    chinese: "戴菊科",
    parent: "Passeriformes",
    description:
      "戴菊科为欧亚与北美最小的鸟类类群,体重仅数克,头顶具鲜艳冠纹,栖针叶林冠层,巢悬于枝端,窝卵数多,冬季结群漂泊。",
  },
  {
    rank: "genus",
    latin: "Regulus",
    chinese: "戴菊属",
    parent: "Regulidae",
    description:
      "戴菊属体小如雀而冠纹如王,头顶中央橙黄或猩红,两性略有差,栖针叶林,冬季混群漂泊,鸣声细弱频高。",
  },
  {
    rank: "species",
    latin: "Regulus regulus",
    chinese: "戴菊",
    authority: "(Linnaeus, 1758)",
    parent: "Regulus",
    description:
      "戴菊是欧亚大陆最小的鸟类之一,体重仅约五克,头顶一抹橙黄冠纹如簪金菊,古欧洲民间因其敢于栖上巨鹰之背竞飞,而封之为「鸟中之王」。它栖于针叶林冠层,悬吊细枝尖端啄食虫卵,窝卵数可达十枚以上,冠居体重比例之最;冬季结小群漂泊至平原园林,常被惊叹为蜂鸟般的小精灵。",
    morphology: "体长约 9 厘米,体重 4-7 克,上体橄榄绿,头顶中央橙黄冠纹两侧衬黑,翼具两道白斑。",
    habitat: "栖山地针叶林及针阔混交林,冬季结小群漂泊至平原园林,悬枝啄虫,好悬吊枝梢末端。",
    distribution: "繁殖于欧亚大陆北部与山地针叶林,越冬南移;在中国见于东北、新疆与西南高山。",
    conservation: "LC",
    ncbiTaxId: 68468,
    etymology:
      "属名 Regulus 为拉丁语「小王」,指其冠纹与「鸟王」传说;种加词沿用旧称重复,属同词重名种。",
    discovery:
      "1758 年林奈定为鹡鸰属 Motacilla regulus,后归戴菊属;欧洲民谚谓其匿于鹰羽之间赢得飞行大赛,故得王名。",
    genomeInfo: "全基因组约 1.1 Gb,居鸟类最小基因组之列;极小体型与高代谢使其成为能量生理研究材料。",
    ecologyRole: "针叶林冠层食虫鸟,冬季大量啄食蛾卵蚜虫,极寒夜群聚枝下避风,调节林间虫口密度。",
    researchValue: "最小鸟类代表,体温调节、窝卵投入与种群波动研究常用;鸣声频高,是声谱分析的教科书实例。",
  },
  {
    rank: "family",
    latin: "Sturnidae",
    chinese: "椋鸟科",
    parent: "Passeriformes",
    description:
      "椋鸟科为中型群居鸣禽,喙直有力,腿强健地面行走自如,善效鸣,秋冬季结成巨大鸟群,部分种类随人类扩散成为著名入侵种。",
  },
  {
    rank: "genus",
    latin: "Acridotheres",
    chinese: "八哥属",
    parent: "Sturnidae",
    description:
      "八哥属为亚洲热带椋鸟类,额具耸立冠羽,地栖性强,追随牲畜捕食惊起的昆虫,部分种类被引种后成为著名入侵种。",
  },
  {
    rank: "species",
    latin: "Acridotheres tristis",
    chinese: "家八哥",
    authority: "(Linnaeus, 1766)",
    parent: "Acridotheres",
    description:
      "家八哥原产南亚至云南热带低地,棕灰体羽配黄喙,翼具醒目白斑,飞行时如白色翼带。它追随耕牛捕食惊起的昆虫,与村落人居相伴故得名;自十九世纪被当作宠物与「益鸟」引种后,在澳大利亚、新西兰、南非与诸多岛屿建群,抢占树洞巢位、排挤本土洞巢鸟类,被列入世界百大入侵种。",
    morphology: "体长约 25 厘米,体羽暗褐,头颈灰,眼周裸皮黄,翼具大白斑,飞行时白带醒目,尾端具白缘。",
    habitat: "栖开阔农田、村落与城市绿地,地面行走觅食,夜集大群共栖,巢占树洞与建筑孔隙。",
    distribution: "原产南亚与东南亚,中国云南南部有自然分布;已引入澳大利亚、新西兰、南非与诸多岛屿。",
    conservation: "LC",
    ncbiTaxId: 279927,
    etymology:
      "属名 Acridotheres 由希腊语 akris(蝗虫)与 theras(猎手)构成,指其随畜捕虫;种加词 tristis 意为「黯淡的」。",
    discovery:
      "1766 年林奈定名;十九世纪末起被引入各殖民地作害虫防治与笼鸟,继而全球扩散,成为入侵生物学的著名案例。",
    genomeInfo: "全基因组约 1.1 Gb;入侵种群的原产地溯源与快速适应的基因组研究已多次采用重测序手段。",
    ecologyRole: "杂食性地面掠食者,捕食昆虫、取食果谷;入侵地强占树洞巢位,竞争挤压当地洞巢鸟类与小型动物。",
    researchValue: "入侵生态学与城市动物行为研究的模式种,其全球入侵成功与竞争能力的遗传机制受持续关注。",
    tags: ["入侵物种"],
  },
  {
    rank: "family",
    latin: "Emberizidae",
    chinese: "鹀科",
    parent: "Passeriformes",
    description:
      "鹀科为雀形目中与雀科近缘的鸣禽,喙圆锥形,羽多褐纹,栖开阔地带主食草籽,地面营巢,鹀属广布旧大陆,美洲种类极多。",
  },
  {
    rank: "genus",
    latin: "Emberiza",
    chinese: "鹀属",
    parent: "Emberizidae",
    description:
      "鹀属为雀形目最大的属之一,喙圆锥,羽色多栗黄褐纹,栖草原苇丛灌坡,秋季集群,旧大陆广布,含黄胸鹀等逾四十种。",
  },
  {
    rank: "species",
    latin: "Emberiza aureola",
    chinese: "黄胸鹀",
    authority: "Pallas, 1773",
    parent: "Emberiza",
    description:
      "黄胸鹀是繁殖于欧亚草原地带的小型鹀类,雄鸟头背栗红、胸腹金黄,因迁徙期成群啄食稻穗而被称「禾花雀」。近数十年南方食鸟市场的捕猎使其数量骤降九成以上,2004 至 2017 年间从近危一路连升至极危,是迄今数量崩溃最快的鸟类之一;中国 2021 年将其列为国家一级保护野生动物。",
    morphology: "雄鸟繁殖羽头与背栗红色,胸具鲜黄横带,腹面金黄;雌鸟上体褐而多纵纹,胸带淡黄。",
    habitat: "繁殖于草甸草原与湿草甸,迁徙停栖稻田苇丛,夜栖高草,秋冬集大群游荡。",
    distribution: "繁殖于北欧至远东的草原带,越冬于南亚与东南亚;中国东部为重要迁徙通道与越冬区。",
    conservation: "CR",
    ncbiTaxId: 433632,
    etymology:
      "属名 Emberiza 源自古德语 Ammerling(鹀);种加词 aureola 为拉丁语「小金色」,指其金黄胸腹。",
    discovery:
      "1773 年帕拉斯依外贝加尔草原标本定名;2004 年起因「禾花雀」贸易被 IUCN 十三年间连续上调濒危等级,2017 年列入极危。",
    genomeInfo: "全基因组约 1.2 Gb;近年重测序研究显示其遗传多样性在数量骤降中受损,为划分保护单元提供依据。",
    ecologyRole: "迁徙期大量取食稻谷与草籽,兼食昆虫,是草原与农田生态系统中的食谷-食虫转换者。",
    researchValue: "非法捕猎致物种崩溃的旗舰案例,种群基因组与迁徙追踪直接支撑保护执法与恢复评估。",
    tags: ["国家一级保护", "旗舰物种"],
  },
  // 大山雀:parent 为 DB 已有山雀属 Parus(库中已有远东山雀 P. minor,本种为分立种)
  {
    rank: "species",
    latin: "Parus major",
    chinese: "大山雀",
    authority: "Linnaeus, 1758",
    parent: "Parus",
    description:
      "大山雀是欧洲至西伯利亚的常见山雀,黑头白领、胸带黑亮,性活泼大胆,冬季与多种山雀混群游荡。英国二十世纪中期其「开奶瓶」偷奶油的创新行为传播被视为动物社会学习的经典案例;如今它更是城市演化生态学的前沿模式鸟,基因组与认知研究积累深厚,与见于东亚的近缘远东山雀在天山一带分布交汇。",
    morphology: "体长约 14 厘米,头黑具大白领颊斑,背橄榄绿,腹黄,中央贯以黑色宽胸带,喙短而锐。",
    habitat: "栖落叶林、混交林、公园与庭院,秋冬季结群游荡,搜寻越冬虫蛹,常至人工喂鸟器取食。",
    distribution: "分布于欧洲至西伯利亚及中国西北;东亚由近缘远东山雀替代,两种在天山一带分布交汇。",
    conservation: "LC",
    ncbiTaxId: 9157,
    etymology: "属名 Parus 为拉丁语山雀;种加词 major 意为「较大的」,指其在本属中体型相对为大。",
    discovery:
      "1758 年林奈定名;2000 年代中期依鸣声、形态与分子证据与远东山雀等分立,成为物种界限研究的著名范例。",
    genomeInfo: "全基因组约 1.2 Gb,参考组装已发表;欧洲多城市群体的全基因组重测序支撑城市适应基因组学。",
    ecologyRole: "林地与城市绿地的食虫鸟,繁殖季大量捕食毛虫,冬季搜寻越冬虫蛹,洞巢营巢,是森林害虫天敌。",
    researchValue: "认知生态学与城市演化研究的模式鸟类,「开奶瓶」社会学习与问题解决实验写入多部教科书。",
    tags: ["模式生物"],
  },
  // ===================== 鹦形目 Psittaciformes =====================
  {
    rank: "family",
    latin: "Psittacidae",
    chinese: "真鹦鹉科",
    parent: "Psittaciformes",
    description:
      "真鹦鹉科为非洲与美洲的鹦鹉类,舌端具刷状肉质,喙力强大,智力与发声学习能力居鸟类前列,含灰鹦鹉与金刚鹦鹉等,旧系统曾与旧大陆鹦鹉科合并。",
  },
  {
    rank: "genus",
    latin: "Psittacus",
    chinese: "灰鹦鹉属",
    parent: "Psittacidae",
    description:
      "灰鹦鹉属仅非洲灰鹦鹉一种,栖中非雨林,通体灰色红尾,以卓越的认知与模仿能力成为鸟类智能研究的代表。",
  },
  {
    rank: "species",
    latin: "Psittacus erithacus",
    chinese: "非洲灰鹦鹉",
    authority: "Linnaeus, 1758",
    parent: "Psittacus",
    description:
      "非洲灰鹦鹉是中非雨林的灰羽红尾大型鹦鹉,以卓越智力著称:佩珀伯格与灰鹦鹉「亚历克斯」三十年的实验证明,它能以近百个词汇命名物品、分辨颜色形状乃至触及「零」的概念,改写了鸟类认知的疆界。因数十年百万只级的宠物贸易与雨林砍伐,种群剧减,现列濒危并已移入 CITES 附录 I。",
    morphology: "体长约 33 厘米,通体灰色,尾羽鲜红,喙黑,眼周裸皮白,雌雄羽色相同,幼鸟尾尖暗色。",
    habitat: "栖低地雨林与红树林缘,晨昏集群觅食油棕等果实,夜共栖固定林段,巢占高大树洞。",
    distribution: "分布于赤道非洲西至肯尼亚的雨林带;近缘的提姆纳灰鹦鹉已分立为独立种,见于最西部。",
    conservation: "EN",
    ncbiTaxId: 57247,
    etymology:
      "属名 Psittacus 为拉丁语「鹦鹉」;种加词 erithacus 源自希腊语 erithakos,古希腊对某种小型鸣禽的旧称。",
    discovery:
      "1758 年林奈定名;1977 年起佩珀伯格与「亚历克斯」的系列实验使它成为动物认知科学的世纪明星。",
    genomeInfo: "全基因组约 1.2 Gb,参考组装已发表;鹦鹉类发声学习神经回路与认知基因研究多以其为起点。",
    ecologyRole: "雨林果食性鸟类,传播大型果树种子,废弃巢洞为其他洞巢动物所用,是雨林种子网络的重要节点。",
    researchValue: "鸟类认知与发声学习的旗舰模型,「亚历克斯」实验被写入比较心理学教科书,并推动鸟类福利立法。",
    tags: ["旗舰物种"],
  },
  {
    rank: "genus",
    latin: "Anodorhynchus",
    chinese: "紫蓝金刚鹦鹉属",
    parent: "Psittacidae",
    description:
      "紫蓝金刚鹦鹉属为南美特有的大型蓝色金刚鹦鹉,喙缘光滑无棱,现存紫蓝与李尔两种,栖干旱疏林,专营坚硬棕榈坚果。",
  },
  {
    rank: "species",
    latin: "Anodorhynchus hyacinthinus",
    chinese: "紫蓝金刚鹦鹉",
    authority: "(Latham, 1790)",
    parent: "Anodorhynchus",
    description:
      "紫蓝金刚鹦鹉是体型最大的飞行鹦鹉,体长近一米,通体钴蓝、眼圈金黄,凭借强大喙力专营潘塔纳尔沼泽的硬壳棕榈坚果,还常捡食牛群反刍落地的软化坚果。1980 年代宠物盗猎曾使其骤降至约三千只,经保护计划与人工巢箱推广回升至约六千只,现仍列为易危,是新热带保护事业的旗舰物种。",
    morphology: "体长约 100 厘米,通体钴蓝色,喙基与眼周具黄斑,喙灰黑而巨大,尾长渐尖,体重逾 1.5 公斤。",
    habitat: "栖潘塔纳尔湿地及邻近稀树草原,依赖棕榈结实与树洞巢,家族小群沿河岸低飞巡食。",
    distribution: "分布于巴西潘塔纳尔湿地及玻利维亚、巴拉圭交界地带;巴西东北部另有近缘的李尔金刚鹦鹉。",
    conservation: "VU",
    ncbiTaxId: 51900,
    etymology:
      "属名 Anodorhynchus 意为「无齿喙」,指其喙缘缺少锯齿棱;种加词 hyacinthinus 意为「风信子蓝的」。",
    discovery:
      "1790 年拉瑟姆定名;动画电影《里约大冒险》的主角原型为其近缘斯皮克斯金刚鹦鹉,令蓝色金刚鹦鹉声名大噪。",
    genomeInfo: "全基因组约 1.2 Gb;保护遗传学以其评估瓶颈效应与亚群遗传分化,指导圈养放归管理。",
    ecologyRole: "棕榈坚果专食者,破碎坚果传播种子,依赖老树与啄木鸟旧洞营巢,与巨嘴鸟存在巢位博弈。",
    researchValue: "新热带大型鹦鹉保护的旗舰物种,人工巢箱与社区监测成为濒危鹦鹉种群恢复的示范样板。",
    tags: ["旗舰物种"],
  },
  {
    rank: "family",
    latin: "Cacatuidae",
    chinese: "凤头鹦鹉科",
    parent: "Psittaciformes",
    description:
      "凤头鹦鹉科冠羽可竖立表达情绪,分布限于澳新地区,寿命长,社群行为复杂,多为白色大型种,葵花凤头与玄凤鹦鹉均隶此科。",
  },
  {
    rank: "genus",
    latin: "Cacatua",
    chinese: "凤头鹦鹉属",
    parent: "Cacatuidae",
    description:
      "凤头鹦鹉属为白色大型凤头鹦鹉,冠羽黄色或白色可竖立,喙强大,栖澳新地区森林,若干种类被引种至区外并建群。",
  },
  {
    rank: "species",
    latin: "Cacatua galerita",
    chinese: "葵花凤头鹦鹉",
    authority: "(Latham, 1790)",
    parent: "Cacatua",
    description:
      "葵花凤头鹦鹉是澳新地区的大型白鹦,冠羽舒展如葵花,鸣声尖锐嘹亮可传数里。它智力高超而长寿,研究者在名为「雪球」的个体上首次以科学方法证实鸟类能随音乐节拍起舞,揭示节奏感与发声学习的关联;悉尼等城市中其啄噬建筑与草坪的「鸟患」,亦成为城市人鸟共处研究的著名课题。",
    morphology: "体长约 45-50 厘米,通体白色,冠羽鲜黄可竖立,喙灰黑,眼周裸皮白,雌鸟眼圈较雄鸟红暗。",
    habitat: "栖沿海林地与疏林草原,集群喧闹,主食草籽坚果与块茎,晨昏必至水源,常侵入城市绿地。",
    distribution: "分布于澳大利亚东部与北部及新几内亚;被引种至西澳珀斯、新西兰北岛等地并已建立种群。",
    conservation: "LC",
    ncbiTaxId: 141274,
    etymology:
      "属名 Cacatua 源自马来语 kakatua(凤头鹦鹉);种加词 galerita 意为「具冠盔的」,指其可展冠羽。",
    discovery:
      "1790 年拉瑟姆定名;2009 年「雪球」随拍起舞的研究发表于《当代生物学》,2019 年又录得其十余种舞步。",
    genomeInfo: "全基因组约 1.2 Gb,作为凤头鹦鹉科代表纳入鸟基因组计划;长寿与认知的分子基础受关注。",
    ecologyRole: "疏林食种鸟,啄食坚果并传播,挖掘块茎翻动土壤;城市种群依赖人工草坪,啄损建筑引发生态冲突。",
    researchValue: "节奏同步与发声学习神经机制的著名研究对象,「雪球」个案改写了节奏能力演化理论。",
    tags: ["观赏动物"],
  },
  {
    rank: "genus",
    latin: "Nymphicus",
    chinese: "玄凤鹦鹉属",
    parent: "Cacatuidae",
    description:
      "玄凤鹦鹉属单型,为体型最小的凤头鹦鹉,冠羽尖细、尾羽修长,冠羽随情绪开合,原产澳大利亚内陆,已驯化为全球性笼养鸟。",
  },
  {
    rank: "species",
    latin: "Nymphicus hollandicus",
    chinese: "玄凤鹦鹉",
    authority: "(Kerr, 1792)",
    parent: "Nymphicus",
    description:
      "玄凤鹦鹉是体型最小的凤头鹦鹉,冠羽随情绪起伏开合,宛如情绪指示器,颊斑橙艳,尾羽修长。原产澳大利亚内陆,十九世纪引入欧洲后驯繁出白化、派勒等多种色型,现成为仅次于虎皮鹦鹉的全球第二大笼养鹦鹉;其社群性温和,雄鸟鸣声清亮多变,普及程度极高,是家庭观察鹦鹉行为的入门鸟。",
    morphology: "体长约 32 厘米,基本型灰羽、橙颊、白翅斑,冠羽尖细可竖立,雌鸟尾下覆羽具横斑,驯化色型繁多。",
    habitat: "栖澳大利亚内陆近水疏林与灌丛,游牧性结群,地面啄食草籽,晨昏集中饮水,繁殖随雨季。",
    distribution: "原产澳大利亚大部内陆;作为笼养鸟引种全球,逸逃个体在个别温暖地区偶见半野生群。",
    conservation: "LC",
    ncbiTaxId: 13180,
    etymology:
      "属名 Nymphicus 意为「小仙女」,赞其轻灵;种加词 hollandicus 指产地「新荷兰」,即澳大利亚旧称。",
    discovery:
      "1792 年克尔定名;十九世纪中叶前后引入欧洲驯养,二十世纪育出多种固定羽色品系,风靡全球宠物市场。",
    genomeInfo: "全基因组约 1.1 Gb;冠羽表达与羽色突变遗传研究使其成为鹦鹉羽毛发育的便利模型。",
    ecologyRole: "内陆稀树草原食谷鸟,啄食并传播草籽,依水源而居,种群数量随降雨丰歉大幅波动。",
    researchValue: "家养繁殖记录丰富的鹦鹉,羽色遗传、鸣声习得与伴侣动物行为研究的常用对象。",
    tags: ["驯化物种", "观赏动物"],
  },
  // ===================== 鸮形目 Strigiformes(草鸮科新建+鸱鸮科深扩) =====================
  {
    rank: "family",
    latin: "Tytonidae",
    chinese: "草鸮科",
    parent: "Strigiformes",
    description:
      "草鸮科具心形面盘,中爪内缘具栉突,腿细长,双耳孔高度不对称,可在黑暗中凭听觉定位猎物,含仓鸮与草鸮等约二十种。",
  },
  {
    rank: "genus",
    latin: "Tyto",
    chinese: "仓鸮属",
    parent: "Tytonidae",
    description:
      "仓鸮属为中大型草鸮类,面盘心形灰白,耳孔不对称,夜猎鼠类,广布全球温暖地带,仓鸮为其中分布最广者。",
  },
  {
    rank: "species",
    latin: "Tyto alba",
    chinese: "仓鸮",
    authority: "(Scopoli, 1769)",
    parent: "Tyto",
    description:
      "仓鸮以心形白面盘、无声夜飞与左右不对称的耳孔著称,能在漆黑中仅凭听觉锁定草丛中的鼠类,被誉为「飞行雷达」。它广布除南极洲外的各大洲,堪称分布最广的陆鸟之一;因惯居于谷仓、教堂钟楼而得名,欧洲的巢箱保育与第二代灭鼠剂管控成为其种群存续的关键,中国境内仅南方省区零星可见。",
    morphology: "体长约 34 厘米,面盘心形灰白缘褐,背羽金黄杂黑点,腹白散布暗斑,腿长爪利,眼深黑。",
    habitat: "栖开阔农田、草原与湿地缘,昼伏于谷仓钟楼、废墟岩洞,夜出低空巡猎鼠类。",
    distribution: "遍及除南极洲外的各大洲温暖地带;在中国见于云南、广西等南方省区,数量稀少。",
    conservation: "LC",
    ncbiTaxId: 56313,
    etymology:
      "属名 Tyto 源自希腊语 tuto(夜行的鸮);种加词 alba 意为「白色的」,指其苍白面盘与腹羽。",
    discovery:
      "1769 年斯科波利依意大利标本定名;二十世纪听觉神经科学以仓鸮脑内的「听觉空间图」破解声定位机理。",
    genomeInfo: "全基因组约 1.2 Gb;作为听觉神经科学的经典模型,其听觉通路基因表达谱研究积累丰富。",
    ecologyRole: "夜行捕鼠者,一窝雏鸟成长可消耗数百只鼠类,是农田鼠害生物防治的天然力量。",
    researchValue: "听觉定位机理的经典模型动物,其脑干声源空间图是神经科学教科书的著名案例。",
    tags: ["国家二级保护"],
  },
  {
    rank: "genus",
    latin: "Strix",
    chinese: "林鸮属",
    parent: "Strigidae",
    description:
      "林鸮属为头圆无耳簇的大型鸮类,面盘显著,栖林地夜行,鸣声低沉传远,广布各大陆温热带森林,灰林鸮为模式代表。",
  },
  {
    rank: "species",
    latin: "Strix aluco",
    chinese: "灰林鸮",
    authority: "Linnaeus, 1758",
    parent: "Strix",
    description:
      "灰林鸮是欧洲夜色的主人,圆头无耳簇,深目如潭,经典夜噪「咕——呼——」实为雌雄应答的二重唱。其灰褐二色型并存,芬兰四十余年的环志研究证明暖冬使褐色型比例持续上升,成为气候变化改变野生种群遗传结构的首批坚实证据,被誉为教科书级的演化案例;在中国仅零散见于西部山地针阔林。",
    morphology: "体长约 40 厘米,体羽灰或褐两型,均密布深斑,圆面盘深目,无耳簇,翅宽圆,爪黑。",
    habitat: "栖林地、果园与城市公园,占据全年领域,黄昏栖枝静候鼠类,冬夜领域鸣声最频。",
    distribution: "分布于欧亚大陆温带森林带;在中国零散见于西北与西部山地,为罕见留鸟。",
    conservation: "LC",
    ncbiTaxId: 111821,
    etymology:
      "属名 Strix 为拉丁语鸮,古罗马神话中夜出吸血的凶鸟;种加词 aluco 借自意大利语 allocco(灰林鸮)。",
    discovery:
      "1758 年林奈定名,为林鸮属模式种;其羽色型频率与气候关系的研究 2011 年发表于《自然·通讯》。",
    genomeInfo: "全基因组约 1.2 Gb;羽色型相关位点的基因组定位与自然选择检测是其种群遗传学亮点。",
    ecologyRole: "森林鼠类的主要夜行天敌,领域性极强而长居一地,鸣声密度常被用作种群监测指标。",
    researchValue: "羽色多态与气候选择、领域行为与城市夜噪声适应的研究明星,四十余年环志数据积累罕见。",
    tags: ["国家二级保护"],
  },
  {
    rank: "genus",
    latin: "Athene",
    chinese: "小鸮属",
    parent: "Strigidae",
    description:
      "小鸮属为小型鸮类,头扁面平,黄眼昼亦常开,栖开阔地与人类聚落缘,善地面奔跑捕虫,纵纹腹小鸮广布欧亚温带。",
  },
  {
    rank: "species",
    latin: "Athene noctua",
    chinese: "纵纹腹小鸮",
    authority: "(Scopoli, 1769)",
    parent: "Athene",
    description:
      "纵纹腹小鸮是欧亚温带开阔地的小型鸮,头颅扁平、柠檬黄眼常作凝视,受惊时上下摆头憨态可掬。它是古希腊智慧女神雅典娜的圣鸟,古雅典四德拉克马银币上的纹样即为此鸮;白日亦常出猎,栖立土堆电杆捕食昆虫鼠类,十九世纪被引入英国后归化定居,如今是英伦乡野与欧亚农田的常见猛禽。",
    morphology: "体长约 22 厘米,上体褐白斑驳,腹白具褐色纵纹,头扁面平,眼亮黄,喙黄绿,善地面奔走。",
    habitat: "栖荒地草原、田间土埂与村缘废墟,白日可见,捕食甲虫蚯蚓与鼠类,巢占堤岸洞穴或树洞。",
    distribution: "广布欧亚大陆温带与北非;中国见于西北、华北至青藏高原东缘的开阔地带,多为留鸟。",
    conservation: "LC",
    ncbiTaxId: 126797,
    etymology:
      "属名 Athene 取自智慧女神雅典娜,其圣鸟即小鸮;种加词 noctua 为拉丁语「夜鸮」之意。",
    discovery:
      "1769 年斯科波利定名;古雅典银币铸其形象流传两千余年,十九世纪四十年代起被引入英国并归化。",
    genomeInfo: "全基因组约 1.2 Gb;欧洲种群因农业集约化而衰退,其土地利用响应研究持续开展。",
    ecologyRole: "昼夜兼行的开阔地捕食者,大量捕食鞘翅目昆虫与鼠类,是农田草原害虫害鼠的天敌。",
    researchValue: "欧洲农业景观变化的指示鸮种;与雅典娜的文化渊源使其成为鸟类学史与古钱币学的交叉话题。",
    tags: ["国家二级保护"],
  },
  {
    rank: "genus",
    latin: "Glaucidium",
    chinese: "鸺鹠属",
    parent: "Strigidae",
    description:
      "鸺鹠属为袖珍鸮类,无耳簇,多为白昼活动的猎手,栖暖温带林缘灌丛,鸣声低沉空灵,亚洲的斑头鸺鹠最为常见。",
  },
  {
    rank: "species",
    latin: "Glaucidium cuculoides",
    chinese: "斑头鸺鹠",
    authority: "(Vigors, 1831)",
    parent: "Glaucidium",
    description:
      "斑头鸺鹠是中国南方最常见的袖珍鸮,昼间高调出猎,常立枝头被群雀围观围攻而不动声色。其体羽横纹斑驳似杜鹃,「鸺鹠」古名见于汉魏典籍;城市公园与丘陵林地均可闻其四声一度的低沉呼号,夜半尤显空灵,繁殖期彻夜不歇。捕食昆虫小鸟与鼠类,是林缘与城市绿地食物网的活跃节点。",
    morphology: "体长约 23 厘米,通体密布棕白横斑,无耳簇,头圆眼黄,尾具横斑,半垂眼睑似睡非醒。",
    habitat: "栖丘陵山地林缘、果园与城市公园,白日活跃,捕食昆虫小鸟与鼠类,巢占啄木鸟旧洞。",
    distribution: "分布于中国华东、华南、西南及中南半岛与喜马拉雅南麓,留鸟,低山丘陵常见。",
    conservation: "LC",
    ncbiTaxId: 543873,
    etymology:
      "属名 Glaucidium 为希腊语 glaux(鸮)的指小词,意为「小鸮」;种加词 cuculoides 意为「似杜鹃的」。",
    discovery:
      "1831 年维格尔斯依喜马拉雅标本定名;「鸺鹠」之名早见于中国典籍,古人以其昼鸣夜号附会占候之说。",
    genomeInfo: "全基因组约 1.1 Gb;昼行性鸮类的视网膜适应与鸣声个体识别研究偶见其作为材料。",
    ecologyRole: "昼行捕食者,大量取食昆虫、鼠类与小鸟,常遭雀鸟群起围攻,是林缘食物网的活跃节点。",
    researchValue: "中国南方鸮类生态的常见研究材料,城市夜鸣监测与声景研究多涉及其鸣声节律。",
    tags: ["国家二级保护"],
  },
  // ===================== 企鹅目 Sphenisciformes(科已在库,新建两属) =====================
  {
    rank: "genus",
    latin: "Pygoscelis",
    chinese: "阿德利企鹅属",
    parent: "Spheniscidae",
    description:
      "阿德利企鹅属具硬挺刷状尾,双腿后位致行走摇摆,栖南极半岛与大陆沿岸及岛屿,集群以石子筑巢,含三种。",
  },
  {
    rank: "species",
    latin: "Pygoscelis adeliae",
    chinese: "阿德利企鹅",
    authority: "(Hombron & Jacquinot, 1841)",
    parent: "Pygoscelis",
    description:
      "阿德利企鹅是南极分布最广的企鹅,黑白配色最为「标准」,以石子筑巢、偷石频发而成为南极研究的趣味主角。它以磷虾为食,海冰过多或过少皆影响繁殖成败;2010 年巨型冰山搁浅曾致阿德利兰一处大群繁殖近乎中断,成为气候影响的标志性事件。中国南极科考站周边的长期计数是其种群监测的基础。",
    morphology: "体长约 70 厘米,背黑腹白,眼周羽全白,喙红褐,羽黑色,腿短黑,行走左右摇摆。",
    habitat: "栖南极大陆沿岸与岛屿,夏季裸岩集群以石子筑巢,冬季北迁至浮冰区随冰越冬。",
    distribution: "环南极大陆与半岛沿岸分布,种群数以百万对计,南极半岛随变暖分布区南缩。",
    conservation: "LC",
    ncbiTaxId: 9238,
    etymology:
      "属名由希腊语 pygē(臀部)与 skelos(腿)构成,指其后位双腿;种加词 adeliae 源自阿德利兰之名,迪维尔以其妻阿德莉命名该地。",
    discovery:
      "1841 年霍姆布朗与雅基诺依法国南极远征标本定名;2014 年其基因组与帝企鹅基因组由中国团队同期发表。",
    genomeInfo: "全基因组约 1.2 Gb;全基因组重测序揭示末次冰期以来种群随海冰进退的扩张与收缩历史。",
    ecologyRole: "南极食物网中磷虾的最大消费者之一,亦为豹海豹与贼鸥的主要猎物,数量波动牵动南极生态平衡。",
    researchValue: "南极生态与气候变化研究的旗舰物种,数十年种群计数是极地科学的核心监测资产。",
    tags: ["旗舰物种"],
  },
  {
    rank: "genus",
    latin: "Eudyptes",
    chinese: "冠企鹅属",
    parent: "Spheniscidae",
    description:
      "冠企鹅属具黄色眉状冠羽与红喙,性情凶悍,栖亚南极群岛多岩海岸,繁殖产两卵而首卵显著较小,含跳岩企鹅等七种。",
  },
  {
    rank: "species",
    latin: "Eudyptes chrysocome",
    chinese: "南跳岩企鹅",
    authority: "(J.R. Forster, 1781)",
    parent: "Eudyptes",
    description:
      "南跳岩企鹅头顶金黄色冠羽、双眼红艳,不善行走而以双脚并跳穿行陡峭岩岸,故得「跳岩」之名。它性情凶悍、警觉护巢,是亚南极群岛的标志性居民;受海洋升温与食物短缺影响,种群三代内下降逾三成,已列为易危。其与北、东跳岩企鹅的分分合合,亦是企鹅分类学的著名公案。",
    morphology: "体长约 55 厘米,喙短红褐,头部黄黑冠羽斜向颈侧,眼红,脚粉红,石间跳跃如弹簧。",
    habitat: "栖风急浪高的岩岸群岛,巢筑岩缝草丛,出海数十至数百公里觅食磷虾与小型鱼乌贼。",
    distribution: "繁殖于智利与阿根廷南部、福克兰群岛及亚南极诸岛,越冬期向北大洋扩展游荡。",
    conservation: "VU",
    ncbiTaxId: 79626,
    etymology:
      "属名 Eudyptes 意为「善潜者」;种加词 chrysocome 由希腊语 chrysos(金)与 kome(毛发)构成,指金冠。",
    discovery:
      "1781 年库克第二次环球远征的博物学家福尔斯特定名;1990 年代起北跳岩与东跳岩企鹅相继分立,种界经分子证据多次修订。",
    genomeInfo: "全基因组约 1.2 Gb;冠企鹅属首卵显著小型化的演化机理借助内分泌与比较基因组手段研究。",
    ecologyRole: "亚南极岛屿群落的关键捕食者,磷虾与鱼类消费大户,密集粪肥滋养岛屿苔原与无脊椎群落。",
    researchValue: "种群下降与海洋变暖关系的研究对象;两卵异型所代表的繁殖投入权衡是演化生态学经典问题。",
    tags: ["旗舰物种"],
  },
  // 王企鹅:parent 为 DB 已有王企鹅属 Aptenodytes(库中已有帝企鹅,本种为同属近缘)
  {
    rank: "species",
    latin: "Aptenodytes patagonicus",
    chinese: "王企鹅",
    authority: "Miller, 1778",
    parent: "Aptenodytes",
    description:
      "王企鹅是体型第二大的企鹅,耳部橙黄斑鲜亮如徽章,颈侧橙带沿胸而下。其繁殖周期长达十四五个月,单枚卵置于脚背腹褶中孵化而不筑巢,雏鸟披褐色绒羽过冬,曾被十九世纪探险家误认为独立物种「毛企鹅」。爱丁堡动物园的王企鹅「尼尔斯·奥拉夫」受挪威王室卫队册封爵士,堪称世界上官衔最高的企鹅。",
    morphology: "体长约 90 厘米,上体蓝灰,耳斑与上胸橙黄,下胸渐淡,喙长扁而橙,腿短位靠后。",
    habitat: "栖亚南极岛屿与半岛沿岸,巨群繁殖,孵卵以脚背负卵于腹褶中,育雏期雏鸟聚「托儿所」越冬。",
    distribution: "繁殖于克罗泽、克尔格伦与南乔治亚等亚南极群岛,个别北游至南美与南非近岸。",
    conservation: "LC",
    ncbiTaxId: 9234,
    etymology:
      "属名 Aptenodytes 意为「无翼的潜鸟」,指其潜水之深;种加词 patagonicus 指其模式产地巴塔哥尼亚海域。",
    discovery:
      "1778 年米勒定名;其褐色绒羽幼鸟一度被探险家与商人当作独立「毛企鹅」出售,成为分类学史趣谈。",
    genomeInfo: "全基因组约 1.2 Gb;与帝企鹅同属,耐寒深潜适应的比较基因组研究以两属种对照展开。",
    ecologyRole: "亚南极食物网的中层捕食者,主食灯笼鱼与小型头足类,是南大洋能量流动的重要环节。",
    researchValue: "亚南极长期标记研究的核心物种,为企鹅寿命、配偶维系与气候响应提供数十年经典数据。",
    tags: ["旗舰物种"],
  },
  // ===================== 雨燕目 Apodiformes(新建目:雨燕+蜂鸟) =====================
  {
    rank: "order",
    latin: "Apodiformes",
    chinese: "雨燕目",
    parent: "Aves",
    description:
      "雨燕目由雨燕与蜂鸟组成,前肢高度特化为狭长翼,足短弱几乎不能行走;蜂鸟更演化出独有的悬停飞行与鸟类最高的代谢率,分子证据表明两者为最近的现生近亲。",
  },
  {
    rank: "family",
    latin: "Apodidae",
    chinese: "雨燕科",
    parent: "Apodiformes",
    description:
      "雨燕科为终年几乎不落地的飞行高手,翼狭长如镰刀,足退化仅可攀附垂直面,巢以唾液粘羽筑于岩缝檐洞,广布全球温热带。",
  },
  {
    rank: "genus",
    latin: "Apus",
    chinese: "雨燕属",
    parent: "Apodidae",
    description:
      "雨燕属为最典型的高空雨燕,翅镰形,跗跖被羽,除繁殖期外终日翱翔,巢筑古建檐洞与岩缝,广布旧大陆温热带。",
  },
  {
    rank: "species",
    latin: "Apus apus",
    chinese: "普通雨燕",
    authority: "(Linnaeus, 1758)",
    parent: "Apus",
    description:
      "普通雨燕是「以天为家」的极端飞行者:微型数据记录仪证实其可连续飞行十个月,取食、饮水、交配乃至休憩均在空中完成,仅繁殖时短暂攀附檐壁。北京的「雨燕」即其北京亚种,栖居正阳门与古塔檐下;光敏定位器追踪显示其往返非洲南部越冬,单程逾一万六千公里,是中国城市候鸟保护的旗舰故事。",
    morphology: "体长约 17 厘米,通体暗褐,喉部污白,翅狭长如镰,尾浅叉,脚极短弱,仅能攀垂直面。",
    habitat: "栖古城楼檐洞、岩缝与老树洞,晨昏高空集群兜捕飞虫,巢以唾液粘羽毛筑成浅碟。",
    distribution: "繁殖于欧亚大陆温带,越冬于赤道以南非洲;中国华北的北京雨燕迁徙直达非洲南端。",
    conservation: "LC",
    ncbiTaxId: 8895,
    etymology:
      "属名 Apus 源自希腊语 a(无)与 pous(足),古人视其终年不落地而误以为无足;种加词为同词重名。",
    discovery:
      "1758 年林奈定为燕属 Hirundo apus;2016 年《当代生物学》刊出其连续飞行十个月的追踪证据,震动学界。",
    genomeInfo: "全基因组约 1.2 Gb;极端飞行能量学与超长寿命(环志个体逾 20 年)的分子基础是研究热点。",
    ecologyRole: "高空飞虫的天敌,繁殖季日捕数千只飞虫喂雏;古建檐下巢位兼具文化遗产与城市生态价值。",
    researchValue: "迁徙追踪与城市古建保护结合的明星物种;北京雨燕定位研究为城市候鸟保护提供中国范例。",
    tags: ["城市适应种"],
  },
  {
    rank: "family",
    latin: "Trochilidae",
    chinese: "蜂鸟科",
    parent: "Apodiformes",
    description:
      "蜂鸟科为唯一能真正悬停并可倒飞的鸟类,代谢率居脊椎动物之冠,夜呈蛰伏态,喙形与管状花协同演化,全科仅见于美洲。",
  },
  {
    rank: "genus",
    latin: "Archilochus",
    chinese: "北蜂鸟属",
    parent: "Trochilidae",
    description:
      "北蜂鸟属为北美洲繁殖的蜂鸟,喙适中微曲,雄鸟喉部具金属闪光红斑,雌鸟素白,两种中红喉北蜂鸟分布最广。",
  },
  {
    rank: "species",
    latin: "Archilochus colubris",
    chinese: "红喉北蜂鸟",
    authority: "(Linnaeus, 1758)",
    parent: "Archilochus",
    description:
      "红喉北蜂鸟是北美东部唯一的繁殖蜂鸟,雄鸟喉部金属猩红如宝石,悬停时双翼每秒振拍逾五十次,八字形轨迹产生升力,可精准定位于花前并可倒飞退场。秋迁前其体重近乎翻倍,随后不停歇飞越近千公里的墨西哥湾;寒夜则进入蛰休骤降能耗,堪称鸟类代谢与迁徙生理的极限样本。",
    morphology: "体长约 9 厘米,体重 3-5 克,上体金属绿,雄鸟喉部猩红闪光,腹灰白,长喙如针,雄尾尖无凹。",
    habitat: "栖林缘、花圃与果园,访花吸蜜兼空中捕食小虫,杯形巢缀苔藓蛛丝,置于水平细枝。",
    distribution: "繁殖于北美东部,秋季经墨西哥湾不停歇迁往中美洲越冬,春季原路北返,数量以千万计。",
    conservation: "LC",
    ncbiTaxId: 190676,
    etymology:
      "属名 Archilochus 取自古希腊诗人阿尔基洛科斯;种加词 colubris 意为「蛇一般的」,命名缘由已不可考。",
    discovery:
      "1758 年林奈定为 Trochilus colubris;博物学家奥杜邦绘其筑巢育雏名画,使其成为北美家喻户晓的鸟类。",
    genomeInfo: "全基因组约 1.0 Gb,蜂鸟科基因组居鸟类最小之列;近缘安娜蜂鸟参考基因组支撑悬停代谢研究。",
    ecologyRole: "重要传粉者,喙形与管状花协同演化,迁飞路线沿途依赖花期补给,是花蜜网络中的移动节点。",
    researchValue: "悬停空气动力学、蛰休代谢与跨湾长距离迁徙能量学的经典研究材料,并见于多部生理学教材。",
  },
  // ===================== 鹳形目 Ciconiiformes(白鹳,科属已在库) =====================
  {
    rank: "species",
    latin: "Ciconia ciconia",
    chinese: "白鹳",
    authority: "(Linnaeus, 1758)",
    parent: "Ciconia",
    description:
      "白鹳是欧洲乡野的吉祥符号,「送子鸟」传说的主角。1822 年一只体插非洲长矛的白鹳落至德国罗斯托克近郊,一举揭破「鸟类冬眠」之谜、证实远距离迁徙,这类「箭鹳」成为鸟类学奠基性证据。它借暖气流绕开宽阔海面迁徙,博斯普鲁斯海峡的秋季大军可达数十万只,喙击之声替代退化的鸣管。",
    morphology: "体长约 100-115 厘米,通体白而飞羽黑,喙长直鲜红,颈腿皆长,翼展逾两米,飞行时颈前伸腿后蹬。",
    habitat: "栖湿地与农田缘,巢筑烟囱塔楼与大树,连年增筑成巨大巢盘,浅水缓步觅食鱼蛙昆虫。",
    distribution: "繁殖于欧洲至西亚,越冬于非洲;在中国仅偶见于新疆西部的伊犁与塔城一带,罕见。",
    conservation: "LC",
    ncbiTaxId: 8928,
    etymology:
      "属名与种加词同为拉丁语 Ciconia(鹳),为典型同词重名,一说拟其击喙之声;欧洲童话赋其送子之名。",
    discovery:
      "1758 年林奈定名;1822 年德国「箭鹳」标本证明其越冬非洲,直接开启科学的候鸟迁徙研究。",
    genomeInfo: "全基因组约 1.3 Gb;卫星追踪与基因组研究厘清其东、西两条迁徙通道的种群分化。",
    ecologyRole: "湿地浅水的捕食者,集群营巢形成「鹳村」,巨巢常被多种小型鸟类借用共栖。",
    researchValue: "迁徙研究的奠基物种,「箭鹳」故事写入科学史教材;欧洲巢架与再引入保育成效卓著。",
  },
  // ===================== 鹈形目 Pelecaniformes(卷羽鹈鹕) =====================
  {
    rank: "family",
    latin: "Pelecanidae",
    chinese: "鹈鹕科",
    parent: "Pelecaniformes",
    description:
      "鹈鹕科为大型水禽,喙下喉囊发达用以兜捕鱼类,常列队协同围猎,四趾具全蹼,栖内陆湖泊河口与海岸,全球共八种。",
  },
  {
    rank: "genus",
    latin: "Pelecanus",
    chinese: "鹈鹕属",
    parent: "Pelecanidae",
    description:
      "鹈鹕属为巨型水禽,喙长逾三十厘米,喉囊容量以升计,集群围圈驱鱼而捕,广布全球温暖水域,化石记录古老。",
  },
  {
    rank: "species",
    latin: "Pelecanus crispus",
    chinese: "卷羽鹈鹕",
    authority: "Bruch, 1832",
    parent: "Pelecanus",
    description:
      "卷羽鹈鹕是体型最大的鹈鹕,翼展可达 3.5 米,为淡水鸟类之最;后颈卷曲羽冠、银灰羽衣配铅色巨喙,气质雍容。它集群围渔,喉囊兜水吞鱼;全球种群仅数万只且持续下降,湿地排水与渔网缠绕是主要威胁,在中国属国家一级保护野生动物,东部沿海的越冬群近年备受观鸟界关注。",
    morphology: "体长 160-183 厘米,体重逾 10 公斤,银灰体色,颈背具卷曲冠羽,巨喙铅色,喉囊容量以升计。",
    habitat: "栖内陆湖泊、河口与海岸浅滩,集群围猎鱼类,营巢于芦苇岛或湖心孤洲,越冬集大群。",
    distribution: "繁殖于东南欧至中亚湿地,越冬于南亚与东亚;中国见于西北湿地与东部沿海,数量稀少。",
    conservation: "NT",
    ncbiTaxId: 36300,
    etymology:
      "属名 Pelecanus 为拉丁语鹈鹕,源自希腊语 pelekan;种加词 crispus 意为「卷曲的」,指颈背卷羽。",
    discovery:
      "1832 年布鲁赫定名;中世纪「鹈鹕以血哺雏」的虔诚意象使其成为教堂雕塑与纹章学的常客。",
    genomeInfo: "全基因组约 1.3 Gb,作为大型水禽代表纳入鸟基因组计划,种群遗传分化研究初步开展。",
    ecologyRole: "浅水鱼类顶级捕食者,集群围圈驱鱼而捕,种群动态反映湿地鱼类资源与水体健康状况。",
    researchValue: "欧亚湿地保护的旗舰物种,跨国越冬协同监测与环志网络为种群恢复评估提供基础。",
    tags: ["国家一级保护", "旗舰物种"],
  },
  // ===================== 鸡形目 Galliformes(石鸡,雉科已在库) =====================
  {
    rank: "genus",
    latin: "Alectoris",
    chinese: "石鸡属",
    parent: "Phasianidae",
    description:
      "石鸡属为山地岩坡的鹑类,红喙红脚条纹上体,善奔走滑翔,栖欧亚大陆干旱山地,多国引入作猎禽,含石鸡等七种。",
  },
  {
    rank: "species",
    latin: "Alectoris chukar",
    chinese: "石鸡",
    authority: "(J.E. Gray, 1830)",
    parent: "Alectoris",
    description:
      "石鸡是欧亚干旱山地的典型鹑类,红喙红脚、体侧栗色横纹,鸣声「嘎嘎」似敲石,故俗称「嘎嘎鸡」。受惊时沿坡疾奔、自高滑降,是猎禽行为的教科书范例;巴基斯坦奉其为国鸟,印度传说痴恋月光的「恰科尔」鸟即指此鸟。二十世纪被引入北美西部作猎禽,已成落基山地常见定居种。",
    morphology: "体长约 33 厘米,上体灰棕,体侧具十余道栗色横纹,眉纹白而喉白缘黑,喙与脚红色,尾圆短。",
    habitat: "栖干旱山地岩坡与黄土沟壑,晨昏成对或结小群啄食草籽嫩芽,奔走迅捷,夜栖岩缝。",
    distribution: "分布于巴尔干半岛至中亚与中国北部干旱山地,华北与黄土高原常见;引入北美西部定居。",
    conservation: "LC",
    ncbiTaxId: 9078,
    etymology:
      "属名 Alectoris 源自希腊语 alektoris(母鸡类);种加词 chukar 拟其鸣声,借自印地语「恰科尔」。",
    discovery:
      "1830 年约翰·爱德华·格雷依印度北部标本定名;英文名 Chukar 直接拟自其鸣声,是命名学中拟声命名典范。",
    genomeInfo: "全基因组约 1.1 Gb;与近缘岩鹑类在欧洲南部的渐渗杂交带是物种界限研究的经典系统。",
    ecologyRole: "干旱山地食谷鸟,传播草籽兼捕昆虫,是金雕等猛禽的重要猎物,维系山地食物网平衡。",
    researchValue: "猎禽管理与种群遗传研究的世界经典对象,环志与狩猎管理数据积累逾百年。",
    tags: ["经济物种"],
  },
  // ===================== 鹃形目 Cuculiformes(新建:大杜鹃) =====================
  {
    rank: "order",
    latin: "Cuculiformes",
    chinese: "鹃形目",
    parent: "Aves",
    description:
      "鹃形目为对趾型足的中型攀禽,约半数种类营巢寄生繁殖,雏鸟常将宿主卵雏排挤出巢;广布全球温热带,主食毛虫,含杜鹃等约一百五十种。",
  },
  {
    rank: "family",
    latin: "Cuculidae",
    chinese: "杜鹃科",
    parent: "Cuculiformes",
    description:
      "杜鹃科广布全球,树栖或地栖,约半数种类行巢寄生,雏鸟孵化后常将宿主卵雏推出巢外,其余自行营巢,嗜食毛虫等害虫。",
  },
  {
    rank: "genus",
    latin: "Cuculus",
    chinese: "杜鹃属",
    parent: "Cuculidae",
    description:
      "杜鹃属为中型树栖杜鹃,外形略似雀鹰,多行巢寄生,宿主逾百种,鸣声双音「布谷」式,广布旧大陆,嗜食毛虫。",
  },
  {
    rank: "species",
    latin: "Cuculus canorus",
    chinese: "大杜鹃",
    authority: "Linnaeus, 1758",
    parent: "Cuculus",
    description:
      "大杜鹃是巢寄生的教科书物种:不筑巢不孵卵,将拟态宿主的卵产入苇莺等百余种鸟的巢中,雏鸟孵出后凭本能将宿主卵雏尽数拱出,独享哺育。这场宿主识卵与杜鹃拟卵的「军备竞赛」是协同演化研究最完整的野外系统;「布谷催耕」与「杜鹃啼血」的东方诗意,亦皆由其鸣声而来。",
    morphology: "体长约 33 厘米,外形略似雀鹰,上体石板灰,腹白具细横纹,翅尖长,尾长而具白端斑。",
    habitat: "栖林地、苇丛与开阔灌坡,昼间窥伺宿主巢行寄生,春夜「布谷」之声常彻夜不息。",
    distribution: "繁殖遍及欧亚大陆,越冬于撒哈拉以南非洲与东南亚;中国各地夏候鸟,平原山区皆闻。",
    conservation: "LC",
    ncbiTaxId: 55661,
    etymology:
      "属名 Cuculus 为拉丁语杜鹃,拟其「咕咕」鸣声;种加词 canorus 意为「善歌的」,指其鸣声动听。",
    discovery:
      "1758 年林奈定名;二十世纪末戴维斯等以苇莺-杜鹃系统解析协同演化,成为行为生态学的范式研究。",
    genomeInfo: "全基因组约 1.1 Gb;基因组研究揭示了不同宿主特化雌性谱系(卵拟态型)的遗传分化基础。",
    ecologyRole: "嗜食多数鸟类畏避的带毛刺毛虫,是森林毛虫害的天然控制者;巢寄生压力塑造百余种宿主的繁殖行为。",
    researchValue: "巢寄生与协同演化研究的旗舰系统;英国鸟类学会的卫星追踪揭示其横穿撒哈拉至刚果的迁徙路线。",
    tags: ["协同演化经典模型"],
  },
  // ===================== 雁形目 Anseriformes(中华秋沙鸭,鸭科已在库) =====================
  {
    rank: "genus",
    latin: "Mergus",
    chinese: "秋沙鸭属",
    parent: "Anatidae",
    description:
      "秋沙鸭属为锯喙潜鸭类,喙缘具角质锯齿以衔固滑鱼,冠羽明显,栖清洁河湖,北半球繁殖,含中华秋沙鸭等数种。",
  },
  {
    rank: "species",
    latin: "Mergus squamatus",
    chinese: "中华秋沙鸭",
    authority: "Gould, 1862",
    parent: "Mergus",
    description:
      "中华秋沙鸭是第三纪孑遗的珍稀潜鸭,胁羽黑白鳞斑独树一帜,雄鸟绿首冠羽后掠。它仅在老龄河谷林的大树洞中营巢,雏鸟孵出次日便自高洞跳下随母入河,场面壮美;全球仅存数千只,被称为「鸟中大熊猫」,列为国家一级保护野生动物,长白山等地以人工巢箱助其繁殖。",
    morphology: "体长约 52-58 厘米,雄鸟头绿具后掠冠羽,背黑,胁具黑白鳞斑;雌鸟头褐,喙窄长具锯齿。",
    habitat: "繁殖于东北山地清澈河流两岸的老龄林,树洞营巢;越冬迁至南方江河急滩,潜水捕鱼。",
    distribution: "繁殖于中国东北长白山、小兴安岭及俄远东;越冬于长江流域及其以南的江河溪流。",
    conservation: "EN",
    ncbiTaxId: 670348,
    etymology:
      "属名 Mergus 为拉丁语潜鸭,源自动词 mergere(潜入);种加词 squamatus 意为「具鳞片的」,指其鳞斑胁羽。",
    discovery:
      "1862 年古尔德依中国标本定名;作为第三纪孑遗鸟类,其「活化石」地位与狭窄生境需求长期备受关注。",
    genomeInfo: "全基因组约 1.2 Gb;线粒体与微卫星研究显示种群遗传多样性偏低,存在明显的瓶颈效应。",
    ecologyRole: "清澈河段的鱼类捕食者,对河流生态完整性与老龄林依赖极强,是淡水生态系统健康的指示物种。",
    researchValue: "濒危水鸟保护的旗舰物种,人工巢箱与河道保护结合,成为中国濒危鸟类管理的示范案例。",
    tags: ["国家一级保护", "旗舰物种"],
  },
];
