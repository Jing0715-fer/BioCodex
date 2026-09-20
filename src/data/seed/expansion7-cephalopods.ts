import { TaxonSeed } from "../types";

// 头足纲深扩种子数据(Task E16-a expansion7;E15-b 因网络超时七次未产出,本轮重试)。
// 库内头足纲已有 13 种:八腕目章鱼科(普通章鱼/短蛸/长蛸/双斑蛸)、拟态章鱼、蓝环章鱼、
// 乌贼目(金乌贼/虎斑乌贼/曼氏无针乌贼)、鹦鹉螺目(鹦鹉螺)、闭眼目(中国枪乌贼/莱氏拟乌贼)、
// 船蛸科(船蛸,科直挂纲)。任务书候选中蓝环章鱼、鹦鹉螺、莱氏拟乌贼已在库,短蛸已以
// Octopus ocellatus 在库(Amphioctopus fangsiao 为其晚出异名),故另择库内空白高价值类群。
// 本文件新增 12 物种 + 10 新属 + 8 新科 + 5 新目 = 35 条——
// 开眼目(头足纲最大空白目:大王乌贼/美洲大赤鱿/太平洋褶柔鱼/萤火乌贼)、
// 幽灵蛸目(幽灵蛸,独立目唯一现存种)、旋壳乌贼目(旋壳乌贼)、
// 耳乌贼目(夏威夷短尾乌贼,发光共生头号模式)、微鳍乌贼目(微鳍乌贼,最小头足类)、
// 乌贼目增补(普通乌贼/澳大利亚巨乌贼/火焰乌贼,后两者依 2024 年系统修订移入复活属
// Ascarosepion 后乌贼属)、八腕目增补巨蛸科(北太平洋巨型章鱼,现存最大章鱼)。
// 学名/命名者/科属/ncbiTaxId 均经 GBIF Backbone、NCBI Taxonomy(esearch+esummary/efetch)、
// WoRMS(AphiaClassification)三方在线核验,关键决策:
// ①Vampyroteuthis 目级拼写三方一致为 Vampyromorpha(任务书作 Vampyromorphida,从权威库);
// ②Idiosepida 拼写从 GBIF+WoRMS(NCBI 置于 Decapodiformes incertae sedis 无目级);
// ③耳乌贼科 Sepiolidae 依 WoRMS 提升为独立目 Sepiolida(GBIF/NCBI 暂仍归乌贼目);
// ④Sepia apama 与 Metasepia pfefferi 依现行系统(GBIF+NCBI+WoRMS 三方一致)移入 2024 年
// 复活的 Ascarosepion,中文名从 GBIF zho 俗名库「后乌贼属」;
// ⑤Enteroctopus 科从 GBIF+WoRMS 用 Enteroctopodidae(NCBI 暂用广义 Octopodidae)。
// IUCN 等级经 GBIF 挂载的 IUCN 红色名录官方数据集核验:大王乌贼/太平洋褶柔鱼/萤火乌贼/
// 旋壳乌贼/普通乌贼/北太平洋巨型章鱼 LC,澳大利亚巨乌贼 NT,美洲大赤鱿/夏威夷短尾乌贼/
// 微鳍乌贼/火焰乌贼 DD,幽灵蛸未评估留空。基因组事实经 Europe PMC 文献核验
// (普通乌贼 eLife 2025 染色体级组装、幽灵蛸 iScience 2025 巨型基因组等)。
// 中文科属名尽量取 GBIF zho 俗名库已收录译名(四盘耳乌贼属/后乌贼属/武装鱿科/柔鱼科/
// 耳乌贼科/微鳍乌贼科/微鳍乌贼属/幽灵蛸属/幽灵蛸科),大王乌贼科/茎柔鱼属等从大陆通行
// 译名。tags 全部取自库内既有词表;任务书词表中的「剧毒物种」库内实为「剧毒」,从库。
// flagship 按任务书加于大王乌贼、幽灵蛸两种高辨识度物种(tags 数组内 "flagship")。
// 查重依据 /tmp/taxa-inventory.tsv(2546 条),拉丁名与中文名零冲突。
export const expansion7Cephalopods: TaxonSeed[] = [
  // ===================== 一、开眼目 Oegopsida(新目:大洋鱿鱼,4 科 4 属 4 种) =====================
  {
    rank: "order",
    latin: "Oegopsida",
    chinese: "开眼目",
    parent: "Cephalopoda",
    description:
      "开眼目为大洋性头足类的主体,眼外无角膜覆盖,与闭眼目相对;多数种类具发光器,包含大王乌贼、柔鱼科等远洋渔业支柱与深海巨物。",
  },
  {
    rank: "family",
    latin: "Architeuthidae",
    chinese: "大王乌贼科",
    parent: "Oegopsida",
    description:
      "大王乌贼科为单型科,仅大王乌贼一属一种;体长为现存无脊椎动物之最,遍布各大洋中层至深海,是深海巨型化的象征与海怪传说的原型。",
  },
  {
    rank: "genus",
    latin: "Architeuthis",
    chinese: "大王乌贼属",
    parent: "Architeuthidae",
    description:
      "大王乌贼属为单型属,仅大王乌贼一种;眼径可达二十七厘米,居动物界最大之列。全球标本的分子证据支持各大洋个体同属一种的假说。",
  },
  {
    rank: "species",
    latin: "Architeuthis dux",
    chinese: "大王乌贼",
    authority: "Steenstrup, 1857",
    parent: "Architeuthis",
    ncbiTaxId: 256136,
    conservation: "LC",
    description:
      "大王乌贼是现存最大的无脊椎动物,全长可达约十三米,眼径可达二十七厘米,居动物界最大之列。它栖息于全球大洋的中层与深海,长期仅以搁浅个体、鲸胃含物与拖网副获为人所知;2004 年才首次拍到活体,儒勒·凡尔纳笔下的巨型海怪即以它为原型。",
    morphology:
      "体呈长圆锥形,鳍短小;八腕与一对极长的触腕上布小钩与吸盘,眼巨大,体暗红至紫红色。",
    habitat:
      "栖于数百至千米级的大陆坡与深海,昼潜夜升作垂直洄游,与抹香鲸上演深海捕食对抗。",
    distribution:
      "全球各大大洋均有记录,以纽芬兰、挪威、日本与新西兰外海的搁浅和捕获报告最多。",
    etymology:
      "属名由希腊语 archi(首要)与 teuthis(乌贼)复合,意为『乌贼之王』;种加词 dux 为拉丁语『统帅』。",
    discovery:
      "1857 年丹麦动物学家斯滕斯特鲁普依搁浅标本定名;1873 年纽芬兰搁浅轰动欧美,2004 年日本团队首拍活体,2012 年完成首次活体录像。",
    genomeInfo:
      "线粒体数据显示全球个体遗传差异极小,支持单种假说;染色体级全基因组组装尚未公开。",
    ecologyRole:
      "大洋深海的大型捕食者,猎食鱼类与鱿鱼,是抹香鲸最重要的猎物之一;其种群规模可由鲸群摄食量反推,远比搁浅记录庞大。",
    researchValue:
      "『现存最大无脊椎动物』的头衔物种与深海科普旗舰;全球单种结构的分子研究是隐存种判定与扩散能力的著名范例。",
    tags: ["flagship", "深海物种", "明星物种"],
  },
  {
    rank: "family",
    latin: "Ommastrephidae",
    chinese: "柔鱼科",
    parent: "Oegopsida",
    description:
      "柔鱼科即俗称的『飞行鱿鱼』,肉鳍相接呈横菱形,可喷水滑行出水;含美洲大赤鱿、太平洋褶柔鱼等,是世界头足类渔业产量第一大科。",
  },
  {
    rank: "genus",
    latin: "Dosidicus",
    chinese: "茎柔鱼属",
    parent: "Ommastrephidae",
    description:
      "茎柔鱼属为东太平洋特有的单型属,仅美洲大赤鱿一种;体型居鱿鱼类最前列,集群凶猛,英文俗称洪堡鱿鱼、红色魔鬼。",
  },
  {
    rank: "species",
    latin: "Dosidicus gigas",
    chinese: "美洲大赤鱿",
    authority: "(d'Orbigny, 1835)",
    parent: "Dosidicus",
    ncbiTaxId: 346249,
    conservation: "DD",
    description:
      "美洲大赤鱿即大陆文献的标准名茎柔鱼,俗称秘鲁鱿鱼、洪堡鱿鱼,是东太平洋头号头足类渔业对象,年渔获量常居世界前列。群体凶猛、善攻猎物,渔民称之为『红色魔鬼』;其昼夜往返于千米低氧层与上层海的垂直洄游,是缺氧耐受生理的明星研究体系。",
    morphology:
      "体粗壮呈圆锥形,肉鳍大而横菱形,体背红棕具紫斑,腕与触腕具利钩,大者全长逾一米二。",
    habitat:
      "栖于大陆架外缘至陆坡,昼潜千米低氧水层,夜升上层追猎集群;行动迅疾,捕食行为凶猛。",
    distribution:
      "秘鲁与智利外海为分布中心,北至加利福尼亚湾,暖事件年份可北扩至俄勒冈乃至阿拉斯加湾。",
    etymology:
      "属名 Dosidicus 词源晦暗;种加词 gigas 为拉丁语『巨人』,指其巨大体型。",
    discovery:
      "1835 年法国博物学家多比尼依美洲西岸标本定名;二十世纪后期东太平洋鱿钓渔业兴起,跃居世界头足类单种渔获量最前列。",
    genomeInfo:
      "缺氧耐受与高速运动的生理研究积累深厚;物种鉴定与群体遗传的组学工作近年逐步展开。",
    ecologyRole:
      "东太平洋食物网的枢纽捕食者,昼夜垂直洄游沟通上下层能量,猎食小型鱼类与鱿鱼,又被海鸟、海豹与大型鱼类捕食。",
    researchValue:
      "世界鱿鱼渔业支柱与我国远洋鱿钓的主要对象;穿越氧气最小层的耐受机制是海洋低氧生理学热点,北扩现象亦成气候变化指标。",
    tags: ["经济物种"],
  },
  {
    rank: "genus",
    latin: "Todarodes",
    chinese: "褶柔鱼属",
    parent: "Ommastrephidae",
    description:
      "褶柔鱼属为大洋性鱿鱼,寿命多仅一年,集群作长距离索饵洄游;模式种太平洋褶柔鱼是西太平洋最重要的鱿钓渔业对象。",
  },
  {
    rank: "species",
    latin: "Todarodes pacificus",
    chinese: "太平洋褶柔鱼",
    authority: "(Steenstrup, 1880)",
    parent: "Todarodes",
    ncbiTaxId: 6637,
    conservation: "LC",
    description:
      "太平洋褶柔鱼即俗称的『日本鱿鱼』,是西北太平洋最重要的头足类资源、日本鱿钓渔业的基石,鱿鱼干等传统干制品的主要原料。生命周期仅约一年,资源量随黑潮势力剧烈波动,其丰欠与海况关系的预报研究是渔业海洋学的经典课题。",
    morphology:
      "体呈圆锥形,肉鳍横菱形,背侧灰紫具细斑;触腕穗兼具钩与吸盘,大者全长近半米。",
    habitat:
      "栖于大陆架外缘至陆坡水域,昼潜深层、夜升表层索饵,随季节作南北集群洄游。",
    distribution:
      "鄂霍次克海、日本海至黄东海的西太平洋温带海域,秋冬集群向日本近岸洄游。",
    etymology:
      "属名承旧属名 Todarus 加后缀 -odes(『类似』)而成;种加词 pacificus 意为『太平洋的』。",
    discovery:
      "1880 年斯滕斯特鲁普定名;一个多世纪以来支撑日本头号鱿鱼渔业,资源波动与暖流关系的研究积累居头足类之冠。",
    genomeInfo:
      "群体遗传结构与海况关系研究持续;染色体级参考基因组尚未公开发表,组学资源仍在建设。",
    ecologyRole:
      "西太平洋食物网的关键种,一年生高速能量转换,大量捕食鱼类与浮游甲壳类,又是鲸类、海鸟与金枪鱼的重要饵料。",
    researchValue:
      "日本与中国远洋鱿钓的核心对象;一年生种群对海况的敏感响应使其成为短生命周期资源评估与管理的教科书案例。",
    tags: ["经济物种"],
  },
  {
    rank: "family",
    latin: "Enoploteuthidae",
    chinese: "武装鱿科",
    parent: "Oegopsida",
    description:
      "武装鱿科为小型大洋性鱿鱼,腕与触腕末端具钩,体表密布发光器,夜升上层索饵;萤火乌贼的春季荧光潮即本科的著名景观,台湾译名作武装鱿科。",
  },
  {
    rank: "genus",
    latin: "Watasenia",
    chinese: "萤乌贼属",
    parent: "Enoploteuthidae",
    description:
      "萤乌贼属为日本海侧特有单型属,全身具三类发光器;春季集群涌向富山湾岸产卵,将海面点成幽蓝荧光,名列日本天然纪念物。",
  },
  {
    rank: "species",
    latin: "Watasenia scintillans",
    chinese: "萤火乌贼",
    authority: "(Berry, 1911)",
    parent: "Watasenia",
    ncbiTaxId: 6625,
    conservation: "LC",
    description:
      "萤火乌贼亦称萤乌贼,是日本富山湾春季『荧光岸』奇观的主角,数以亿计的个体随涨潮涌向岸边,全身发光器将海面点成幽蓝星河。发光由体内腔肠素类萤光素体系驱动,发光器分三类、可同步或异步闪烁;这一世界级发光景观同时是地方渔业与观光的名片。",
    morphology:
      "体长五至七厘米,鳍圆大,背侧紫褐;全身分布发光器,腕末端者大而醒目,腹面者细密成片。",
    habitat:
      "栖于日本海侧大陆坡中层,昼潜数百米夜升上层;春汛集群涌向富山湾等浅岸产卵,死后仍发光。",
    distribution:
      "日本海与日本太平洋侧近海的西太平洋温带海域,以富山湾春汛最著名,对马海峡亦有记录。",
    etymology:
      "属名 Watasenia 纪念日本动物学家渡濑氏;种加词 scintillans 为拉丁语『闪烁的』,指其发光。",
    discovery:
      "1911 年美国头足类学者贝里依日本标本定名;富山湾荧光岸自古为地方奇观,现为日本天然纪念物与定番观光资源。",
    genomeInfo:
      "发光基因的基因组与转录组分析已开展;三类发光器的反照光行为与婚配制度研究近年活跃。",
    ecologyRole:
      "中层集群垂直洄游者,发光用以遮蔽轮廓与种内通讯,是上层鱼类与海鸟的重要饵料,春汛亦支撑小型定置渔业。",
    researchValue:
      "海洋生物发光的代表性研究对象与发光科普的第一现场;将生态、渔业与观光结为一体,行为生态学研究持续产出。",
    tags: ["明星物种", "经济物种"],
  },

  // ===================== 二、幽灵蛸目 Vampyromorpha(新目:孑遗支系,1 科 1 属 1 种) =====================
  {
    rank: "order",
    latin: "Vampyromorpha",
    chinese: "幽灵蛸目",
    parent: "Cephalopoda",
    description:
      "幽灵蛸目为头足纲中孤立的孑遗目级支系,现仅幽灵蛸一属一种;形态介于乌贼与章鱼之间,兼具蹼膜、丝状触腕与发光器,被视为头足类演化的枢纽活化石。",
  },
  {
    rank: "family",
    latin: "Vampyroteuthidae",
    chinese: "幽灵蛸科",
    parent: "Vampyromorpha",
    description:
      "幽灵蛸科为单型科,仅幽灵蛸一种;软体呈斗篷状蹼膜,藏一对可伸缩的丝状触腕,体表与腕端发光器齐备,是低氧中层深海独特的慢速居民。",
  },
  {
    rank: "genus",
    latin: "Vampyroteuthis",
    chinese: "幽灵蛸属",
    parent: "Vampyroteuthidae",
    description:
      "幽灵蛸属为单型属,仅幽灵蛸一种;代谢率居头足类之最低档,遇险时翻转蹼膜露出刺列御敌,俗称吸血鬼乌贼,实以海洋雪为食。",
  },
  {
    rank: "species",
    latin: "Vampyroteuthis infernalis",
    chinese: "幽灵蛸",
    authority: "Chun, 1903",
    parent: "Vampyroteuthis",
    ncbiTaxId: 55288,
    description:
      "幽灵蛸俗称吸血鬼乌贼,是幽灵蛸目唯一的现存种,身披暗紫红色斗篷状蹼膜,栖居于低氧的深海中层。它以极低的代谢悬浮缓游,主食沉降的海洋雪,遇险时翻转蹼膜露出刺状内里自御;这一介于乌贼与章鱼之间的孑遗支系常被称为『活化石』。",
    morphology:
      "体呈钟形,暗红紫色,八腕间膜深厚如斗篷;另有一对丝状触腕可卷收于囊内,体表与腕端具发光器。",
    habitat:
      "栖于六百至九百米的氧气最小层,悬浮缓游极少激烈运动,终生不离开中层深海,罕见于人类。",
    distribution:
      "热带与温带各大洋的中层深海均有记录,全球范围内视为单一种,活体捕获记录稀少。",
    etymology:
      "属名由拉丁语 vampyrus(吸血鬼)与希腊语 teuthis(乌贼)复合;种加词 infernalis 意为『地狱的』。",
    discovery:
      "1903 年德国瓦尔迪维亚号深海考察队学者丘恩定名;二十世纪后期深潜观察揭示其反转斗篷等奇行,确立独立目级地位。",
    genomeInfo:
      "巨型全基因组已测序,为头足类最大基因组之一;分析显示现生章鱼类的核型属衍生状态。",
    ecologyRole:
      "氧气最小层的慢速清道夫,以海洋雪与弱泳小生物为食,凭低耗氧策略独占多数动物回避的深海生态位。",
    researchValue:
      "头足类演化树上孤立分支的『活化石』;极低代谢与低氧适应研究为深海生理学提供极端案例,巨型基因组的演化意义引人注目。",
    tags: ["flagship", "深海物种", "活化石"],
  },

  // ===================== 三、旋壳乌贼目 Spirulida(新目:螺旋内壳活化石,1 科 1 属 1 种) =====================
  {
    rank: "order",
    latin: "Spirulida",
    chinese: "旋壳乌贼目",
    parent: "Cephalopoda",
    description:
      "旋壳乌贼目为具分室螺旋内壳的特化支系,现仅旋壳乌贼一种;螺旋壳房室依次增大,与菊石类外壳遥相呼应,被视为头足类中的活化石类群。",
  },
  {
    rank: "family",
    latin: "Spirulidae",
    chinese: "旋壳乌贼科",
    parent: "Spirulida",
    description:
      "旋壳乌贼科为单型科,仅旋壳乌贼一种;体内后部藏一枚羊角状螺旋内壳,分室充气调节浮力,死后内壳随洋流漂上世界各地海滩。",
  },
  {
    rank: "genus",
    latin: "Spirula",
    chinese: "旋壳乌贼属",
    parent: "Spirulidae",
    description:
      "旋壳乌贼属为单型属,仅旋壳乌贼一种;螺旋内壳为其独有标志,英文俗称公羊角鱿,壳体房室的浮力物理长期为学界关注。",
  },
  {
    rank: "species",
    latin: "Spirula spirula",
    chinese: "旋壳乌贼",
    authority: "(Linnaeus, 1758)",
    parent: "Spirula",
    ncbiTaxId: 34541,
    conservation: "LC",
    description:
      "旋壳乌贼是旋壳乌贼目唯一的现存种,体内藏有一枚分室的羊角状螺旋内壳,与灭绝菊石类的外壳遥相呼应,被视为『活化石』。活体深居热带大洋中层、罕见于人,死后内壳却大量漂上世界各热带海滩,成为贝壳收藏的入门珍品。",
    morphology:
      "体呈圆锥形,鳍圆而位近体末,腕短具蹼膜;体末藏螺旋分室的内壳,壳尖朝后,外套薄而软。",
    habitat:
      "栖于数百米级的中层海域,夜间垂直上移索饵;内壳使其死后随洋流远播,漂岸记录遍布热带。",
    distribution:
      "热带与暖温带的大西洋、印度洋与太平洋中层水域,以外壳漂岸记录最常见,活体罕获。",
    etymology:
      "Spirula 为拉丁语 spira(螺旋)的指小词,意为『小螺旋』;属名与种加词同词,皆指其螺旋内壳。",
    discovery:
      "1758 年林奈定名;其内壳在近代贝类学兴起时即为标本室珍品,活体中层生态直至二十世纪拖网时代才逐步揭示。",
    genomeInfo:
      "基因组资源尚有限;内壳房室生长周期与壳体结构研究近年借助显微断层扫描等手段推进。",
    ecologyRole:
      "中层垂直洄游的浮游性捕食者,以微小甲壳类为食,又被深海鱼类与鲸类捕食;螺旋内壳为其标志性浮力结构。",
    researchValue:
      "分室螺旋壳是头足类浮力调节的经典物理模型,亦为理解菊石类壳体功能的现生参照,深受古生物学家倚重。",
    tags: ["活化石"],
  },

  // ===================== 四、耳乌贼目 Sepiolida(新目:发光共生小鱿,1 科 1 属 1 种) =====================
  {
    rank: "order",
    latin: "Sepiolida",
    chinese: "耳乌贼目",
    parent: "Cephalopoda",
    description:
      "耳乌贼目为浅海小型底栖头足类,体圆短而鳍圆如耳,俗称团子鱿;部分种类腹面埋发光器官并与发光细菌专性共生。WoRMS 现列为独立目,与乌贼目并立。",
  },
  {
    rank: "family",
    latin: "Sepiolidae",
    chinese: "耳乌贼科",
    parent: "Sepiolida",
    description:
      "耳乌贼科为模式耳乌贼类,体背圆鼓,腹面发光器官内培养发光细菌,以光晕抹除月光轮廓;含共生生物学头号模式夏威夷短尾乌贼等。",
  },
  {
    rank: "genus",
    latin: "Euprymna",
    chinese: "四盘耳乌贼属",
    parent: "Sepiolidae",
    description:
      "四盘耳乌贼属为浅海小型耳乌贼,腹面发光器官与发光细菌专性共生;属内以夏威夷短尾乌贼最为知名,是动物-微生物共生研究的旗舰物种。",
  },
  {
    rank: "species",
    latin: "Euprymna scolopes",
    chinese: "夏威夷短尾乌贼",
    authority: "Berry, 1913",
    parent: "Euprymna",
    ncbiTaxId: 6613,
    conservation: "DD",
    description:
      "夏威夷短尾乌贼又称夏威夷四盘耳乌贼,是动物-微生物共生的头号模式生物:腹面发光器官内专性培养发光细菌,以光晕抹去月光投影、隐蔽自身轮廓。孵化仅数小时的幼体便能从海水精准筛选共生菌,这一互作体系贯穿共生生物学教科书;2021 年它还被送上国际空间站研究航天免疫。",
    morphology:
      "体圆胖,背鳍圆大如耳,背侧灰褐具斑点;腹面具发光器官,内藏共生发光菌,雄性具茎化腕。",
    habitat:
      "昼匿浅海沙底,夜出捕食小虾蟹;幼体自海水中获取发光菌定殖于发育中的发光器官。",
    distribution:
      "夏威夷群岛浅海沙泥底的特有种,模式种群集中于欧胡岛近岸水域。",
    etymology:
      "属名由希腊语 eu(良好)与 prymna(后部)复合;种加词 scolopes 源自希腊语『尖桩』,取义已难确考。",
    discovery:
      "1913 年贝里依夏威夷标本定名;二十世纪九十年代起其发光共生体系被确立为模式,2021 年随航天任务进入国际空间站。",
    genomeInfo:
      "全基因组测序与基因注释已发表;共生器官发育与免疫因子的转录组资源丰富,是组学支撑最全的头足类之一。",
    ecologyRole:
      "沙底夜行捕食者,以发光拟态月光实现反阴影隐蔽;为共生菌提供营养微环境,构成教科书级的互利体系。",
    researchValue:
      "动物-微生物共生与定殖识别的世界级模式;器官水平的光学适应研究透彻,兼作航天免疫实验对象。",
    tags: ["经典实验材料"],
  },

  // ===================== 五、微鳍乌贼目 Idiosepida(新目:最小头足类,1 科 1 属 1 种) =====================
  {
    rank: "order",
    latin: "Idiosepida",
    chinese: "微鳍乌贼目",
    parent: "Cephalopoda",
    description:
      "微鳍乌贼目为体型最小的一目,成体仅数厘米,背侧具卵圆形黏着器吸附海草;直接发育而无浮游幼体期,系统位置长期存疑,现多置于十腕类基部。",
  },
  {
    rank: "family",
    latin: "Idiosepiidae",
    chinese: "微鳍乌贼科",
    parent: "Idiosepida",
    description:
      "微鳍乌贼科为最小的头足类科,成体不足三厘米,背侧黏着器可瞬时吸附于海草叶片;孵化幼体即亲体缩影,是发育学的微型模型。",
  },
  {
    rank: "genus",
    latin: "Idiosepius",
    chinese: "微鳍乌贼属",
    parent: "Idiosepiidae",
    description:
      "微鳍乌贼属为最小头足类的代表属,分布于印太沿岸海草床;附叶伏击、直接发育与紧凑神经系统使其成为微型发育与神经研究的便捷对象。",
  },
  {
    rank: "species",
    latin: "Idiosepius paradoxus",
    chinese: "微鳍乌贼",
    authority: "(Ortmann, 1888)",
    parent: "Idiosepius",
    ncbiTaxId: 294707,
    conservation: "DD",
    description:
      "微鳍乌贼是体型最小的头足类,雌性成体不过三厘米,雄性更小,日本人称之为『姬乌贼』。它以背侧的卵圆形黏着器吸附海草叶片,伏击过往的小虾;孵化幼体即亲体缩影、无浮游幼体期,是头足类中罕见的直接发育者,为微型发育与神经研究提供便捷材料。",
    morphology:
      "体仅一至三厘米,鳍小位近体末,背侧中具黏着器;腕短,雄性一对腕特化为茎化腕。",
    habitat:
      "栖于内湾海草与大型海藻床,吸附叶面伏击小型甲壳类,寿命短暂,世代快速更替。",
    distribution:
      "日本、朝鲜半岛至中国北部沿海的西太平洋温带浅海均有分布记录。",
    etymology:
      "属名由希腊语 idios(独特的)与 sepius(乌贼)复合,指其独特的背侧黏着器;种加词意为『奇异的』。",
    discovery:
      "1888 年德国学者奥尔特曼依日本标本定名;其极简体型与直接发育近年持续吸引发育学与微型化研究跟进。",
    genomeInfo:
      "组学资源尚在建设;作为体型小型化的候选研究模型,分子层面的关注正在增加。",
    ecologyRole:
      "海草床的微型伏击者,捕食小虾与桡足类,又被浅海鱼类捕食;附叶生活使其成为海草床群落的组成一员。",
    researchValue:
      "『最小头足类』头衔物种;直接发育、快速世代与紧凑神经系统为头足类体型下限与发育模式研究提供对照。",
    tags: ["明星物种"],
  },

  // ===================== 六、乌贼目 Sepiida(库内已有目)增补 3 种 =====================
  {
    rank: "species",
    latin: "Sepia officinalis",
    chinese: "普通乌贼",
    authority: "Linnaeus, 1758",
    parent: "Sepia",
    ncbiTaxId: 6610,
    conservation: "LC",
    description:
      "普通乌贼即欧洲菜场与教科书里的『标准乌贼』,是地中海与东北大西洋的头足类渔业支柱,欧洲名菜墨鱼汁烩饭的墨即取自此类。其体色与纹理瞬息万变,色素细胞的神经调控研究自十九世纪延续至今;胚胎发育与人工繁育技术亦为乌贼类中最成熟。",
    morphology:
      "体宽扁椭圆,背具钙质骨板,周缘鳍窄;腕短而触腕可全缩,体色灰褐而善瞬变。",
    habitat:
      "栖于近海沙泥底与海草床,常半埋潜沙;捕食虾蟹与鱼类,以骨板房室调节浮力。",
    distribution:
      "波罗的海至西非的东北大西洋及地中海,英吉利海峡与比斯开湾种群最丰。",
    etymology:
      "属名 Sepia 为古典时代对乌贼的称谓,颜料『乌贼墨褐色』即以此命名;种加词 officinalis 意为『药用的』。",
    discovery:
      "1758 年林奈定名;十九世纪起作为头足类胚胎学与皮肤变色的基准生物,研究文献量居乌贼类之冠。",
    genomeInfo:
      "染色体级基因组组装已于近年发表;色素细胞、壳体矿化与早期发育的分子资源齐备。",
    ecologyRole:
      "近海底栖的活跃捕食者,压制虾蟹贝类数量,亦为海豚、大鱼与渔业共同的目标;骨板与墨汁双双入用。",
    researchValue:
      "乌贼类研究的基准种与欧洲重要经济种;变色神经回路与胚胎发育体系是百年经典,养殖增殖技术成熟。",
    tags: ["经典实验材料", "经济物种"],
  },
  {
    rank: "genus",
    latin: "Ascarosepion",
    chinese: "后乌贼属",
    parent: "Sepiidae",
    description:
      "后乌贼属为 2024 年分子系统研究自广义乌贼属拆分复活的属,含现存最大的乌贼与具警戒色的火焰乌贼等,多为印度-太平洋温暖海域的礁砂带居民。",
  },
  {
    rank: "species",
    latin: "Ascarosepion apama",
    chinese: "澳大利亚巨乌贼",
    authority: "(Gray, 1849)",
    parent: "Ascarosepion",
    ncbiTaxId: 3248876,
    conservation: "NT",
    description:
      "澳大利亚巨乌贼是现存最大的乌贼类,外套膜长可达半米,南澳怀阿拉每年冬季的数十万个体繁殖聚集是世界著名的潜水盛事。雄性在产卵场以电光般的体色变化激烈竞争,宛如海中开屏孔雀;分布局限而面临捕捞与气候压力,IUCN 评估为近危。",
    morphology:
      "体宽大,背具大型骨板,周缘鳍宽;体色可瞬息变换斑斓纹路,触腕特化可弹射猎食。",
    habitat:
      "栖于澳大利亚南部温带礁砂带,常隐于礁缘与海藻丛;繁殖期集群涌向浅水产卵场。",
    distribution:
      "澳大利亚南部沿岸特有,自西澳经南澳至新南威尔士,以斯宾塞湾的聚集最为著称。",
    etymology:
      "属名 Ascarosepion 为 2024 年自广义乌贼属拆分时复活的旧属名;种加词 apama 由格雷拟定,词源不详。",
    discovery:
      "1849 年格雷依澳大利亚标本定名;上世纪九十年代怀阿拉聚集公之于世,2024 年分子系统将其移入复活的后乌贼属。",
    genomeInfo:
      "基因组资源尚有限;聚集种群的遗传连通性与行为生态研究持续开展,资源评估依赖野外监测。",
    ecologyRole:
      "礁砂带的顶级伏击者,猎食蟹虾与鱼类;繁殖场雄性色彩竞争与配偶选择是行为生态学的著名研究系统。",
    researchValue:
      "现存最大乌贼与头足类行为学的明星;怀阿拉聚集是科普、潜水旅游与近危物种保护宣传的世界级窗口。",
    tags: ["明星物种"],
  },
  {
    rank: "species",
    latin: "Ascarosepion pfefferi",
    chinese: "火焰乌贼",
    authority: "(Hoyle, 1885)",
    parent: "Ascarosepion",
    ncbiTaxId: 3248885,
    conservation: "DD",
    description:
      "火焰乌贼是已知唯一有毒的乌贼,体表紫红、亮黄与雪白构成强烈警戒色,在泥沙底部如一簇移动的火焰。它弃游泳而改用腕足『行走』,肌肉组织中检测出河豚毒素类物质,令捕食者却步;小型艳丽使它同时成为水族界的宠儿,惟采集饲养均需谨慎。",
    morphology:
      "体小而紧凑,背骨板显著缩小,鳍窄;腕短粗,以腕尖支撑爬行,警戒花纹夺目。",
    habitat:
      "栖于泥沙与珊瑚砂混合的热带浅海底部,缓行伏击小虾蟹,极少游泳。",
    distribution:
      "印度尼西亚、巴布亚新几内亚至澳大利亚北部及昆士兰的热带浅海均有分布。",
    etymology:
      "种加词 pfefferi 纪念德国贝类学家格奥尔格·普法伊费尔;原属名 Metasepia 意为『变异的乌贼』,现已并入后乌贼属。",
    discovery:
      "1885 年霍伊尔依新几内亚标本定名;近代研究确认其警戒色与毒性,2024 年随系统修订移入后乌贼属。",
    genomeInfo:
      "基因组资源尚缺;毒素化学组成与警戒信号的演化是本种的主要研究方向。",
    ecologyRole:
      "泥沙底缓行伏击者,猎食小型甲壳类;毒素与警戒色共同构成对捕食者的双重防线。",
    researchValue:
      "已知唯一有毒乌贼的独特地位使其毒素学与警戒演化研究独树一帜;亦是水族贸易与科普图鉴的明星种。",
    tags: ["剧毒", "观赏动物"],
  },

  // ===================== 七、八腕目 Octopoda(库内已有目)增补巨蛸科 =====================
  {
    rank: "family",
    latin: "Enteroctopodidae",
    chinese: "巨蛸科",
    parent: "Octopoda",
    description:
      "巨蛸科为大型底栖章鱼类,腕粗长而消化道特化,含现存最大的章鱼北太平洋巨型章鱼;近年从广义章鱼科分出,独立成科。",
  },
  {
    rank: "genus",
    latin: "Enteroctopus",
    chinese: "巨蛸属",
    parent: "Enteroctopodidae",
    description:
      "巨蛸属为冷水大型章鱼,腕展可达数米,北太平洋巨型章鱼为现存最大章鱼;自广义章鱼属分出的历史悠久,属内多种均以巨体著称。",
  },
  {
    rank: "species",
    latin: "Enteroctopus dofleini",
    chinese: "北太平洋巨型章鱼",
    authority: "(Wülker, 1910)",
    parent: "Enteroctopus",
    ncbiTaxId: 267067,
    conservation: "LC",
    description:
      "北太平洋巨型章鱼是现存最大的章鱼,臂展可逾六米、体重可达五十公斤,心智却灵巧过人,能开罐、越障、辨认饲养者,长期充当头足类智力的代言人。它在冷水中生长缓慢,寿命仅四五年,雌章一次产卵数万枚后看护至死;北美西海岸的传统渔业与水族馆展示皆以它为名物。",
    morphology:
      "体粗巨,暗红至棕橙色,皮肤多乳突;八腕粗壮具双列吸盘,雄性右侧第三腕特化为交接腕。",
    habitat:
      "栖于冷水礁盘、岩缝与沙底的潮下带,昼伏夜出,独居而领域性强。",
    distribution:
      "北太平洋两岸,自加利福尼亚经阿拉斯加、阿留申群岛至日本与朝鲜半岛近海。",
    etymology:
      "属名由希腊语 enteron(肠)与 octopus 复合,字面意为『有肠之章鱼』;种加词纪念德国动物学家多夫莱因。",
    discovery:
      "1910 年维尔克定名;水族馆驯化展示使其智力试验闻名于世,开瓶取食等实验表现屡破纪录。",
    genomeInfo:
      "全基因组资源尚有限,章鱼类基因组学以近缘的双斑蛸为代表;本种研究以行为与生理为主。",
    ecologyRole:
      "冷水礁底的顶级伏击者,蟹、贝、鱼类通吃,偶捕小型鲨鱼;短寿命暴长的能量通量在底栖食物网中巨大。",
    researchValue:
      "现存最大章鱼与头足类认知研究的代表种;学习能力、个体识别与问题解决实验的经典对象。",
    tags: ["明星物种"],
  },
];
