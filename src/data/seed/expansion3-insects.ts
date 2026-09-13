import { TaxonSeed } from "../types";

// 昆虫纲深扩种子数据(Task 4-a expansion3)。
// 主题:昆虫纲代表性物种深扩充,每个物种均含 5 项科学档案字段
// (etymology / discovery / genomeInfo / ecologyRole / researchValue)。
// species/属/科的 parent 引用两类来源:
//   1) DB 已有分类单元(/tmp/taxa-inventory.tsv,1685 条):
//      Insecta / Hymenoptera / Diptera / Orthoptera / Odonata / Mantodea / Blattodea /
//      Coleoptera / Lepidoptera / Hemiptera(目)/ Formicidae / Gryllidae / Coccinellidae /
//      Saturniidae / Aphididae(科)/ Aedes / Drosophila(属);
//   2) 本文件内先行定义的新中间阶元。
// 注意:与 seed-incremental.ts 汇总合并使用时,父级必须(DB ∪ 新数据)闭合。
// 推荐名单中已入库物种(红火蚁/中华蜜蜂/黑腹果蝇/埃及伊蚊/家蝇/飞蝗/沙漠蝗/冈比亚按蚊/
// 地熊蜂/中华大刀螳/台湾乳白蚁/双斑蟋/中华稻蝗/印度竹节虫/豌豆蚜/樗蚕等)均已查重跳过。
export const expansion3Insects: TaxonSeed[] = [
  // ===================== 膜翅目 Hymenoptera =====================
  {
    rank: "family",
    latin: "Pteromalidae",
    chinese: "金小蜂科",
    parent: "Hymenoptera",
    description:
      "金小蜂科是膜翅目最大的寄生蜂科之一,逾三千种,体小而多具蓝绿金属光泽,以其他昆虫的卵、幼虫与蛹为寄主,许多种类已被开发为生物防治天敌。",
  },
  {
    rank: "genus",
    latin: "Nasonia",
    chinese: "蝇蛹金小蜂属",
    parent: "Pteromalidae",
    description:
      "金小蜂科微型寄生蜂小属,雌蜂将卵产入麻蝇、丽蝇等蛹内,子代在蛹壳中发育至羽化,因易于饲养与遗传操作而成为模式物种。",
  },
  {
    rank: "species",
    latin: "Nasonia vitripennis",
    chinese: "丽蝇蛹金小蜂",
    authority: "(Walker, 1836)",
    parent: "Nasonia",
    description:
      "丽蝇蛹金小蜂是全球广布的微型寄生蜂,雌蜂以产卵器刺入蝇蛹产卵,幼虫取食蛹内组织,是腐食性蝇类的天敌。它世代短、雄虫单倍体可直观遗传操作,三个近缘种全基因组同期测序,使其成为物种形成与寄生适应遗传学研究的模式生物。",
    morphology: "体长约 2 毫米,具蓝绿金属光泽,眼红色,雄虫翅透明无斑,雌虫腹部具短产卵器。",
    habitat: "栖于腐肉、垃圾与兽粪附近,追踪寄主蝇类的繁殖场所,成虫访花取食蜜露。",
    distribution: "全球温带与热带广布,是野外常见寄生蜂,亦遍布各国实验室模式种群。",
    ncbiTaxId: 7425,
    etymology: "种加词 vitripennis 由拉丁语 vitreus(玻璃般)与 pennis(翅)构成,指其透明的翅。",
    discovery:
      "1836 年沃克依英国标本定名;2010 年其与两个近缘种的基因组同期发表于《科学》,开创寄生蜂比较基因组学。",
    genomeInfo: "雄蜂为未受精卵发育的单倍体,n=5;2010 年作为首批完成全基因组测序的寄生蜂之一,是比较基因组学基准物种。",
    ecologyRole: "蝇蛹的群居性寄生者,对腐食性蝇类种群有自然控制作用,是粪便与腐物生态系统中的顶级消费者。",
    researchValue: "物种形成遗传学经典模式:种间杂交不育基因已逐一鉴定;沃尔巴克氏体诱导的胞质不相容亦以本属研究最透。",
    tags: ["模式生物"],
  },
  {
    rank: "genus",
    latin: "Atta",
    chinese: "切叶蚁属",
    parent: "Formicidae",
    description:
      "切叶蚁属为新热带大型蚂蚁,巢群个体可达数百万,工蚁多型分化,切割植物叶片回巢培养真菌为食,是真菌农业与社会分工研究的经典类群。",
  },
  {
    rank: "species",
    latin: "Atta cephalotes",
    chinese: "切叶蚁",
    authority: "(Linnaeus, 1758)",
    parent: "Atta",
    description:
      "切叶蚁是中南美洲热带雨林最引人注目的蚂蚁,工蚁列队切割叶片运回地下巢群,栽培共生的真菌花园。巢群可达数百万个体,工蚁按体型分化为切叶、护送、园艺与兵蚁等品级,蚁后携菌种分巢,堪称除人类外最庞大的农业体系。",
    morphology: "工蚁体长 2-20 毫米,红棕色,体表多刺;大型兵蚁头部极度膨大,颚锐利;蚁后体长逾 2 厘米。",
    habitat: "栖于热带雨林与次生林地下的庞大巢群,菌圃与废料区分区明确,蚁巢常隆起成丘。",
    distribution: "分布自墨西哥经中美洲至南美洲热带区域,栖于低地雨林。",
    etymology: "种加词 cephalotes 意为「大头的」,指兵蚁与大型工蚁极度膨大的头部。",
    discovery:
      "1758 年林奈定为 Formica cephalotes,后归切叶蚁属;其真菌农业体系自十九世纪起被持续研究至今。",
    genomeInfo: "全基因组测序于 2011 年完成,为蚂蚁真菌农业与社会分工的分子演化研究提供基准;蚁后寿命可逾十年。",
    ecologyRole: "雨林中主要的植物收割者,单一大巢群年切割叶片量惊人,深刻影响植被更新与养分循环。",
    researchValue: "真社会性与共生真菌农业研究的经典模型;其菌圃的抗菌物质与垃圾分类行为持续启发抗生素探索。",
    tags: ["模式生物"],
  },
  {
    rank: "family",
    latin: "Ichneumonidae",
    chinese: "姬蜂科",
    parent: "Hymenoptera",
    description:
      "姬蜂科是膜翅目最大的科之一,逾两万种,体细长、触角多节,产卵器或短或极长,幼虫多为其他昆虫的体内寄生者,是最重要的天敌昆虫类群之一。",
  },
  {
    rank: "genus",
    latin: "Megarhyssa",
    chinese: "马尾姬蜂属",
    parent: "Ichneumonidae",
    description:
      "姬蜂科大形类群,雌蜂产卵器细长如马尾、远超体长,可垂直刺入树干寄生树蜂幼虫,其钻掘机制是生物力学研究范例。",
  },
  {
    rank: "species",
    latin: "Megarhyssa macrurus",
    chinese: "长尾马尾姬蜂",
    parent: "Megarhyssa",
    description:
      "长尾马尾姬蜂是北美洲落叶林中的大型寄生蜂,雌蜂产卵器可超过十厘米,能像钻头般探入病腐木,寄生其中取食木质的树蜂幼虫。其产卵器分节滑插、尖端经微量元素强化,被视为自然界的精密钻探工具,也是达尔文论述自然选择不具目的性的著名例证。",
    morphology: "体长 3-5 厘米,棕黑色具黄红斑纹,雌蜂产卵器丝状、长达十余厘米,下垂如马尾。",
    habitat: "栖于有病腐硬木的阔叶林,常在倒木与枯立木旁盘旋,寻访树蜂幼虫蛀道。",
    distribution: "分布于北美洲东部与中部落叶林区,夏秋季林缘常见。",
    etymology: "种加词 macrurus 由希腊语 makros(长)与 oura(尾)构成,指其极长的产卵器;属名意为「巨钻」。",
    discovery:
      "十八世纪即被欧洲博物学者记述;达尔文 1860 年致信格雷,以姬蜂类活体寄生为例讨论自然界的残酷与设计之辩。",
    genomeInfo: "尚无全基因组测序数据;其产卵器尖端锌、锰元素强化的研究为生物材料学提供了范例。",
    ecologyRole: "病腐木中树蜂幼虫的专性寄生者,调控蛀干害虫种群,是森林分解链中的关键天敌。",
    researchValue: "产卵器插刺力学与仿生钻具研究热点;亦作为「达尔文黄蜂」广泛用于演化论教学与科学传播。",
    tags: ["观赏昆虫"],
  },
  {
    rank: "family",
    latin: "Trichogrammatidae",
    chinese: "赤眼蜂科",
    parent: "Hymenoptera",
    description:
      "赤眼蜂科为微小型卵寄生蜂,体长多不足一毫米,复眼常呈赤红色,寄生于鳞翅目等昆虫的卵内,是全球应用最广的天敌昆虫类群。",
  },
  {
    rank: "genus",
    latin: "Trichogramma",
    chinese: "赤眼蜂属",
    parent: "Trichogrammatidae",
    description:
      "赤眼蜂属是世界最小的昆虫类群之一,以其他昆虫的卵为寄主,被大规模工厂化繁殖并释放到田间防虫,应用历史逾百年。",
  },
  {
    rank: "species",
    latin: "Trichogramma dendrolimi",
    chinese: "松毛虫赤眼蜂",
    authority: "Matsumura, 1926",
    parent: "Trichogramma",
    description:
      "松毛虫赤眼蜂体长不足半毫米,是亚洲应用最广的卵寄生蜂,把卵产入松毛虫、玉米螟等害虫卵内使其无法孵化。中国以柞蚕卵为寄主建立大规模繁蜂技术体系,年放蜂面积以百万公顷计,是最经典的天敌昆虫产业化案例。",
    morphology: "体长 0.4-0.5 毫米,复眼赤红,翅极狭如桨、缘毛长密,体黄褐而具光泽。",
    habitat: "栖于农田、松林与果园,成虫主动搜寻新鲜害虫卵,取食花蜜可延长寿命。",
    distribution: "分布于东亚与南亚暖温带,在中国自东北至华南广泛人工释放。",
    etymology: "种加词 dendrolimi 源自寄主松毛虫属名 Dendrolimus,直指其与松毛虫的寄生关系。",
    discovery:
      "1926 年日本学者松村定名;二十世纪中叶起中国建立柞蚕卵繁蜂与田间放蜂体系,成为生物防治标杆。",
    genomeInfo: "体长不足半毫米,部分品系由沃尔巴克氏体诱导行产雌孤雌生殖;全基因组测序见诸报道,支撑繁蜂工艺改良。",
    ecologyRole: "鳞翅目害虫卵期的专性寄生者,在松林、玉米地与菜地中压低害虫的初始种群数量。",
    researchValue: "中国天敌昆虫产业的核心蜂种;其寄主识别、种群品质改良与孤雌生殖机制研究活跃。",
    tags: ["天敌昆虫", "生物防治"],
  },
  {
    rank: "family",
    latin: "Megachilidae",
    chinese: "切叶蜂科",
    parent: "Hymenoptera",
    description:
      "切叶蜂科为独栖性蜂类,雌蜂腹面具采粉毛刷,部分种类切取叶片筑巢于孔洞,含切叶蜂、壁蜂等重要传粉昆虫,全球逾四千种。",
  },
  {
    rank: "genus",
    latin: "Megachile",
    chinese: "切叶蜂属",
    parent: "Megachilidae",
    description:
      "切叶蜂属为世界性独栖蜂,雌蜂用上颚切下圆形叶片衬于巢室育儿,访花采粉效率极高,含数百种重要传粉者。",
  },
  {
    rank: "species",
    latin: "Megachile rotundata",
    chinese: "苜蓿切叶蜂",
    parent: "Megachile",
    description:
      "苜蓿切叶蜂原产欧亚大陆,独栖营巢于孔洞,以切割的叶片筑成紧凑巢室,是紫花苜蓿的高效传粉者。二十世纪被引入北美后发展为规模化管理的传粉蜂种,与蜜蜂形成互补的授粉产业;其孤居习性又与蜜蜂的社会性对照,成为社会性演化研究的参照物种。",
    morphology: "体长 7-10 毫米,灰黑色,腹面具橘黄色采粉毛刷,雄蜂额区密布白毛。",
    habitat: "栖于草原农田周边,筑巢于秸秆、木孔与人工巢板,成虫访苜蓿等豆科花朵。",
    distribution: "原产欧亚大陆温暖地区,已随苜蓿种植推广至北美、澳洲等地并建立种群。",
    etymology: "属名由希腊语 megas(大)与 cheilos(颚)构成,指其发达的切叶上颚;种加词意为浑圆的。",
    discovery:
      "十八世纪末依欧洲标本定名;二十世纪中叶在北美苜蓿产区实现商品化管理,开创独居蜂授粉产业。",
    genomeInfo: "独栖蜂中较早完成全基因组测序的物种,为蜜蜂总科从独居到真社会性演化的比较研究提供参照。",
    ecologyRole: "苜蓿等豆科牧草的关键传粉者,其「掀花」式访花行为显著提高苜蓿的结籽率。",
    researchValue: "全球管理规模最大的独居传粉蜂;基因组学上与蜜蜂对照研究社会性演化的经典材料。",
    tags: ["经济物种", "传粉昆虫"],
  },
  // ===================== 双翅目 Diptera =====================
  {
    rank: "family",
    latin: "Glossinidae",
    chinese: "舌蝇科",
    parent: "Diptera",
    description:
      "舌蝇科为非洲特有的吸血蝇类,仅一属数种,雌蝇不产卵而直接产下成熟幼虫,以哺乳动物血液为食,是非洲锥虫的传播媒介。",
  },
  {
    rank: "genus",
    latin: "Glossina",
    chinese: "舌蝇属",
    parent: "Glossinidae",
    description:
      "舌蝇俗称采采蝇,雌蝇一次仅育一幼虫,以「乳汁」滋养至产出,是昏睡病与家畜那加那病的传播媒介,媒介生物学经典对象。",
  },
  {
    rank: "species",
    latin: "Glossina morsitans",
    chinese: "刺舌蝇",
    authority: "Westwood, 1850",
    parent: "Glossina",
    description:
      "刺舌蝇是非洲萨瓦纳地带的吸血蝇,雌雄均吸哺乳动物血液,直接产下蛆状幼虫入土化蛹。它是非洲锥虫的主要媒介,传播人类昏睡病与家畜那加那病,深刻影响撒哈拉以南的牧业与公共卫生;其胎生方式与专性共生菌体系使它成为媒介生物学独一无二的模型。",
    morphology: "体长 8-11 毫米,黄褐色,静止时双翅交叠如剪,口器向前平伸,触角芒具羽状分支。",
    habitat: "栖于疏林与灌丛,白天活动,藏身树荫下伺机吸血,偏好大型哺乳动物与人类。",
    distribution: "分布于撒哈拉以南非洲的疏林草原带,自东非延至南部非洲。",
    etymology: "种加词 morsitans 为拉丁语「咬人的」;英语 tsetse 源自南部非洲茨瓦纳语对蝇的称呼。",
    discovery:
      "1850 年韦斯特伍德定名;二十世纪初确认其传播锥虫后,旋即成为非洲公共卫生与牧业政策的核心对象。",
    genomeInfo: "全基因组约 3.66 亿碱基对、约 1.2 万个蛋白编码基因,2014 年由国际联合体发表于《科学》。",
    ecologyRole: "非洲稀树草原的吸血昆虫,调控大型哺乳动物分布;其传播的锥虫使大片牧地难以养牛。",
    researchValue: "昏睡病媒介控制靶标:不育雄虫释放与蓝布诱捕均以本种验证;与威格沃思氏共生菌的关系是专性共生经典案例。",
    tags: ["病媒生物", "医学媒介"],
  },
  {
    rank: "family",
    latin: "Cecidomyiidae",
    chinese: "瘿蚊科",
    parent: "Diptera",
    description:
      "瘿蚊科为纤小如蚊的蝇类,全球逾六千种,幼虫多刺激植物组织形成虫瘿并在其中取食,亦有捕食蚜虫与食菌者,含多种农业害虫。",
  },
  {
    rank: "genus",
    latin: "Mayetiola",
    chinese: "麦瘿蚊属",
    parent: "Cecidomyiidae",
    description:
      "麦瘿蚊属为瘿蚊科小属,幼虫潜居小麦等禾谷类幼苗上吸食并致植株畸形,代表种黑森瘿蚊为世界性小麦害虫。",
  },
  {
    rank: "species",
    latin: "Mayetiola destructor",
    chinese: "黑森瘿蚊",
    authority: "(Say, 1817)",
    parent: "Mayetiola",
    description:
      "黑森瘿蚊是小麦的专性害虫,微小幼虫附着叶面吸食并诱导植株畸形,严重时整田倒伏绝收。十八世纪随黑森士兵的麦草传入北美而得名;其与小麦抗虫品种间经典的「基因对基因」关系、庞大的唾腺效应子家族与父本基因组消除的奇特种系,使它成为植食昆虫研究的模式物种。",
    morphology: "体长 3-4 毫米,纤细似蚊,灰黑色,翅宽而被微毛,雌虫产橙红色长卵,幼虫橙色蛆状。",
    habitat: "成虫寿命极短,栖于麦田;幼虫在叶面叶舌处吸食,以伪茧在麦株或表土越冬。",
    distribution: "起源于旧大陆麦区,已随麦种传播至北美、欧洲、北非等主要产麦区。",
    etymology: "属名纪念法国昆虫学家马耶(Mayet);种加词 destructor 意为「破坏者」。",
    discovery:
      "1817 年塞伊依北美标本定名;「黑森蝇」之名相传源于独立战争时期黑森雇佣兵随行麦草的传入。",
    genomeInfo: "雄虫具父本基因组消除现象——胚胎早期父源染色体被剔除,成体近乎母本单倍体;唾腺效应子基因家族庞大。",
    ecologyRole: "小麦专性害虫,严重年份造成显著减产;其寄主专一性与小麦抗虫基因协同演化。",
    researchValue: "基因对基因抗虫研究的经典系统;效应子与无毒基因克隆直接支撑麦类抗虫育种。",
    tags: ["入侵物种", "农业害虫"],
  },
  {
    rank: "family",
    latin: "Oestridae",
    chinese: "狂蝇科",
    parent: "Diptera",
    description:
      "狂蝇科为高度特化的体内寄生蝇类,成虫口器退化不进食、形似蜜蜂,幼虫寄生于哺乳动物鼻腔或消化道,含马胃蝇、牛皮蝇等重要兽医害虫。",
  },
  {
    rank: "genus",
    latin: "Gasterophilus",
    chinese: "胃蝇属",
    parent: "Oestridae",
    description:
      "胃蝇属成虫形似蜂、不取食,将卵粘附于马匹被毛,幼虫寄居马胃黏膜,是马科动物的专性体内寄生虫。",
  },
  {
    rank: "species",
    latin: "Gasterophilus intestinalis",
    chinese: "马胃蝇",
    authority: "(De Geer, 1776)",
    parent: "Gasterophilus",
    description:
      "马胃蝇是马属动物最常见的体内寄生虫之一,成虫形似小蜂、寿命仅数日,将黄色卵粒粘于马匹肩腿部被毛。幼虫随舔舐进入口腔、钻入黏膜,最终附着胃壁取食,经粪便排出后入土化蛹。大量寄生引起胃炎、消瘦乃至穿孔,是兽医寄生虫学的经典对象。",
    morphology: "成虫体长约 1.2 厘米,密生黄褐色毛,形似蜜蜂;幼虫体节具刺钩,粉红至红色。",
    habitat: "与马匹牧场伴生,成虫夏秋飞翔于马体周围产卵,幼虫栖居消化道内。",
    distribution: "随马匹饲养遍布全球温带地区,中国北方与西部牧区常见。",
    etymology: "属名由希腊语 gaster(胃)与 philos(喜好者)构成;种加词 intestinalis 意为肠道的。",
    discovery:
      "1776 年德热尔定名;其在马体的迁行路线与致病性自十九世纪起即为兽医寄生虫学经典内容。",
    genomeInfo: "兽医寄生虫学经典对象,线粒体基因组已测序,核基因组研究仍较有限。",
    ecologyRole: "马科动物消化道的专性寄生虫,自然界与野生马类长期共存,牧场密集饲养放大其危害。",
    researchValue: "驱虫药评价与马匹保健的标准模型;幼虫口钩的附着机制亦受仿生材料研究关注。",
    tags: ["寄生虫"],
  },
  {
    rank: "species",
    latin: "Aedes albopictus",
    chinese: "白纹伊蚊",
    authority: "(Skuse, 1894)",
    parent: "Aedes",
    description:
      "白纹伊蚊原产东南亚,体肢具银白斑纹而称「亚洲虎纹」,白昼凶猛叮人。二十世纪后期随废旧轮胎与幸运竹贸易扩散至全球,是登革热、基孔肯雅热与寨卡病毒的重要媒介,中国南方的登革热流行即以本种为主媒介;其卵具滞育性,使入侵种群得以深入温带。",
    morphology: "体长约 5 毫米,黑色,胸背具一条纵行银白条纹,后足多节具白环,翅鳞黑色。",
    habitat: "栖于城乡人居周边,孳生于树洞、废轮胎、花盆托盘等小型积水,白昼叮咬。",
    distribution: "原产东南亚森林,现入侵全球各大洲温热带,是中国南北广布的优势伊蚊。",
    ncbiTaxId: 296529,
    etymology: "种加词 albopictus 由拉丁语 albus(白)与 pictus(有斑纹的)构成,指其银白斑;属名意为「可憎的」。",
    discovery:
      "1894 年斯丘斯依印度加尔各答标本定名;二十世纪末随轮胎贸易全球扩散,现列世界百大入侵种。",
    genomeInfo: "全基因组近 2 Gb 量级,为蚊科最大之列且富含转座元件;2020 年代完成染色体级组装。",
    ecologyRole: "人居周边小型积水的优势蚊种,兼吸人畜血液,维系虫媒病毒的野外循环与人间传播。",
    researchValue: "登革热等虫媒病毒的核心媒介;其滞育卵与入侵种群的适应遗传学是入侵生物学热点。",
    tags: ["入侵物种", "病媒生物"],
  },
  {
    rank: "species",
    latin: "Drosophila suzukii",
    chinese: "斑翅果蝇",
    authority: "(Matsumura, 1931)",
    parent: "Drosophila",
    description:
      "斑翅果蝇原产东亚,雄虫翅端具黑斑而得名。与多数取食腐果的果蝇不同,其雌虫锯齿产卵器可刺破完好成熟的浆果产卵,造成樱桃、草莓、蓝莓等直接损失。2008 年前后入侵欧美后爆发成灾,成为近二十年最重要的新发果树害虫,也是食性与寄主利用快速演化的研究模型。",
    morphology: "体长 2-3 毫米,黄褐色,雄虫前翅端部具黑斑、前足具性梳,雌虫产卵器大而锯齿发达。",
    habitat: "栖于果园、灌丛与林地,偏好成熟多汁的浆果,活动盛期为夏秋。",
    distribution: "原产东亚,已入侵欧洲、美洲与非洲多国,中国各果区亦渐有危害报道。",
    ncbiTaxId: 28584,
    etymology: "种加词 suzukii 为纪念姓氏铃木的拉丁化人名;中文名源于雄虫翅端黑斑。",
    discovery:
      "1931 年松村依日本标本定名;2008 年起在北美与欧洲接连暴发,一跃成为全球性果树害虫。",
    genomeInfo: "2013 年完成草图基因组,现有多套染色体级组装;与黑腹果蝇同属,遗传工具可迁移利用。",
    ecologyRole: "浆果类果实的主要取食者与真菌传播者,在果园生态中兼具害虫与分解者角色。",
    researchValue: "入侵生物学与寄主范围演化的模式种;对比黑腹果蝇可解析锯齿产卵器等适应性性状的遗传基础。",
    tags: ["入侵物种", "农业害虫"],
  },
  // ===================== 直翅目 Orthoptera =====================
  {
    rank: "family",
    latin: "Tettigoniidae",
    chinese: "螽斯科",
    parent: "Orthoptera",
    description:
      "螽斯科为直翅目长角类群,触角远长于体,雄虫以前翅摩擦发音鸣唱,植食或捕食,栖草丛灌林,含纺织娘、蝈蝈等著名鸣虫,全球逾七千种。",
  },
  {
    rank: "genus",
    latin: "Mecopoda",
    chinese: "纺织娘属",
    parent: "Tettigoniidae",
    description:
      "纺织娘属为螽斯科大型鸣虫,雄虫夜间鸣声急促连绵、酷似纺车转动而得名,分布东亚至东南亚暖湿地区。",
  },
  {
    rank: "species",
    latin: "Mecopoda elongata",
    chinese: "纺织娘",
    authority: "(Linnaeus, 1758)",
    parent: "Mecopoda",
    description:
      "纺织娘是中国南方乡野最熟悉的鸣虫之一,雄虫夜间鼓动双翅,发出「轧织、轧织」般急促声响,宛如纺车转动,由此得名。其体色分绿褐两型以拟态叶片;成虫夏秋活跃于豆棚瓜架与灌草丛。作为传统鸣虫文化的代表,它与蟋蟀、蝈蝈一道构成中国特有的听虫民俗。",
    morphology: "体长 5-7 厘米,翅宽广似叶,绿色型通体翠绿,褐色型如枯叶,后足发达善跳,产卵器镰刀状。",
    habitat: "栖于温暖草丛、豆架与灌木,昼伏夜出,取食嫩叶花瓣,雄虫夜间鸣唱。",
    distribution: "分布于中国华东、华南至东南亚热带地区,南方丘陵平原常见。",
    etymology: "属名由希腊语 mēkos(长)与 pous(足)构成;种加词意为「延长的」,皆指修长体形。",
    discovery:
      "1758 年林奈定名;中文名取其鸣声酷似纺车之声,为南方农谚民谣与乡野记忆中的常见意象。",
    genomeInfo: "螽斯类经典核型为雄虫 2n=31(XO 型);本种全基因组数据仍待积累。",
    ecologyRole: "植食为主的夜行大型螽斯,取食叶片花果,为蝙蝠与夜行鸟类所捕,是夜间声景的构建者。",
    researchValue: "鸣虫声通信与雄虫鸣声同步行为研究的模式种之一;亦是传统鸣虫经济与文化昆虫。",
    tags: ["观赏昆虫"],
  },
  {
    rank: "genus",
    latin: "Acheta",
    chinese: "家蟋蟀属",
    parent: "Gryllidae",
    description:
      "家蟋蟀属为蟋蟀科中型鸣虫,雄虫前翅具发音镜膜,彻夜鸣叫求偶,代表种家蟋蟀已发展为全球性食用与饲用昆虫。",
  },
  {
    rank: "species",
    latin: "Acheta domesticus",
    chinese: "家蟋蟀",
    authority: "(Linnaeus, 1758)",
    parent: "Acheta",
    description:
      "家蟋蟀原产旧大陆温暖地区,常栖暖房仓库,雄虫彻夜鸣叫。它是全球食用昆虫产业的首要物种,干体蛋白质含量约六成,已实现大规模工厂化养殖,欧盟亦批准其制品作为新型食品。其世代短、易饲养,同时是昆虫生理学与衰老研究的传统实验对象。",
    morphology: "体长 16-22 毫米,浅黄褐色,头侧具深色纵带,后足粗壮,雌虫产卵器细长如针。",
    habitat: "原栖暖温带,现多见于人居周边暖处、仓库与养殖盒,夜行杂食。",
    distribution: "原产西南亚一带,随人类活动扩散至全球温带,养殖种群遍布各大洲。",
    etymology: "种加词 domesticus 意为「家宅的」,指其近人栖居;Acheta 为古拉丁语蟋蟀。",
    discovery:
      "1758 年林奈定名;二十世纪后期起成为食用昆虫产业代表,近年进入欧美新型食品清单。",
    genomeInfo: "全基因组逾十亿碱基对量级,近年已见组装报道,为食用昆虫选育提供分子标记。",
    ecologyRole: "腐殖质与有机废料的取食者,养殖体系中可把农业副产物转化为高蛋白饲料。",
    researchValue: "食用昆虫产业化的旗舰物种;其免疫与衰老生理研究积累深厚,与分子数据结合潜力大。",
    tags: ["经济物种", "食用昆虫"],
  },
  // ===================== 蜉蝣目 Ephemeroptera =====================
  {
    rank: "order",
    latin: "Ephemeroptera",
    chinese: "蜉蝣目",
    parent: "Insecta",
    description:
      "蜉蝣目为最原始的有翅昆虫之一,稚虫水生、腹侧具鳃,成虫口器退化不再进食,寿命多仅数小时至数日;独有的「亚成虫」羽化阶段是昆虫变态演化的活证,全球逾三千种。",
  },
  {
    rank: "family",
    latin: "Baetidae",
    chinese: "四节蜉科",
    parent: "Ephemeroptera",
    description:
      "四节蜉科为蜉蝣目最大的一科,稚虫细长流线形、善泳,栖于流水与湖泊,成虫纤小而后翅常退化,全球逾千种。",
  },
  {
    rank: "genus",
    latin: "Cloeon",
    chinese: "二尾蜉属",
    parent: "Baetidae",
    description:
      "二尾蜉属为四节蜉科静水常见蜉蝣,稚虫栖湖泊池沼,部分种群营孤雌生殖,是蜉蝣生理生态研究的常用材料。",
  },
  {
    rank: "species",
    latin: "Cloeon dipterum",
    chinese: "双翅二尾蜉",
    authority: "(Linnaeus, 1761)",
    parent: "Cloeon",
    description:
      "双翅二尾蜉是欧洲池沼溪流中常见的蜉蝣,成虫后翅完全退化,仅存一对前翅。雌虫具罕见的卵胎生习性,卵在体内孕育后产出旋即孵化;其亚成虫阶段、朝生暮死的成虫寿命与黄昏婚飞群舞,使蜉蝣成为「短暂生命」的文化符号,自《诗经》起被反复吟咏。",
    morphology: "体长约 1 厘米,纤弱橙褐或灰白,前翅三角状、后翅退化,尾丝两条与中尾丝共三条。",
    habitat: "稚虫栖湖泊池沼与缓流水域,成虫黄昏群舞于水面上方,寿命一至数日。",
    distribution: "分布于欧洲、北非至西亚,近缘种遍布亚洲东部。",
    etymology: "种加词 dipterum 意为「双翅的」,指其后翅退化、仅余一对前翅。",
    discovery:
      "1761 年林奈定名;其卵胎生与孤雌生殖种群自十九世纪起即为蜉蝣生物学的经典课题。",
    genomeInfo: "已建立全基因组与转录组数据资源,是蜉蝣目分子发育研究的代表种。",
    ecologyRole: "稚虫取食藻类与碎屑,羽化群飞为鱼类与水鸟提供集中的食物脉冲,是水质指示类群。",
    researchValue: "蜉蝣翅型演化与变态发育研究的分子平台;卵胎生为繁殖方式演化提供罕见的对照系。",
    tags: ["环境指示种"],
  },
  // ===================== 蜻蜓目 Odonata =====================
  {
    rank: "family",
    latin: "Libellulidae",
    chinese: "蜻科",
    parent: "Odonata",
    description:
      "蜻科为蜻蜓目最大的科,全球逾千种,成虫常在池塘湖沼上空巡飞,稚虫伏于水底淤泥伏击猎物,是湿地生态的顶层捕食者之一。",
  },
  {
    rank: "genus",
    latin: "Pantala",
    chinese: "黄蜻属",
    parent: "Libellulidae",
    description:
      "黄蜻属为世界性迁飞蜻蜓,现生仅一种,以跨洋长距离迁飞与全球种群高度遗传混杂著称。",
  },
  {
    rank: "species",
    latin: "Pantala flavescens",
    chinese: "黄蜻",
    authority: "(Fabricius, 1798)",
    parent: "Pantala",
    description:
      "黄蜻是全球分布最广的蜻蜓,除南极外各大洲皆有踪迹,中国城市公园秋日成群盘旋的蜻蜓多即本种。它借助季风在高空滑翔,完成跨越印度洋的多代际迁徙,往返里程据估逾万公里,堪称昆虫迁飞之王;全球种群遗传分化极低,印证频繁的洲际基因交流。",
    morphology: "体长约 4 厘米,黄褐色,翅宽长透明、基部略染琥珀色,老熟个体腹部覆白霜。",
    habitat: "栖于池塘、水田与临时雨塘等开阔水域,集群高飞,捕食飞行小虫。",
    distribution: "全球温热带广布,是分布范围最大的蜻蜓,中国各地常见。",
    etymology: "种加词 flavescens 意为「淡黄色的」,指其黄褐色体色。",
    discovery:
      "1798 年法布里丘斯定名;二十一世纪初的标记与遗传研究揭示其跨越印度洋的迁飞环线。",
    genomeInfo: "全球种群线粒体与核基因研究显示极低分化度,全基因组测序近年见诸报道。",
    ecologyRole: "临时水体的快速开发者,稚虫赶在雨塘干涸前完成发育羽化;成虫集群捕食小飞虫。",
    researchValue: "昆虫长距离迁飞与全球遗传混合研究范式;宽翅的滑翔空气动力学受仿生学关注。",
    tags: ["环境指示种"],
  },
  {
    rank: "family",
    latin: "Calopterygidae",
    chinese: "色蟌科",
    parent: "Odonata",
    description:
      "色蟌科为大形豆娘,四翅宽大,常具金属蓝绿色泽或色斑,雄虫沿溪建立领域,栖于清澈流水,全球约一百六十余种。",
  },
  {
    rank: "genus",
    latin: "Matrona",
    chinese: "单脉色蟌属",
    parent: "Calopterygidae",
    description:
      "单脉色蟌属为东亚特有的大形豆娘,雄虫四翅蓝紫金属色而端部透明,雌虫翅褐具白斑,栖山溪,是中国溪流豆娘的旗舰类群。",
  },
  {
    rank: "species",
    latin: "Matrona basilaris",
    chinese: "透顶单脉色蟌",
    parent: "Matrona",
    description:
      "透顶单脉色蟌是中国山地溪流的代表性豆娘,雄虫通体深绿金属色,四翅蓝紫辉光、端部透明如「透顶」,飞舞时宛如流动的宝石,雌虫翅褐色、具醒目白斑。其翅色是典型的结构色,源于几丁质多层膜的光学干涉,是生物光子学与溪流生态监测的双料明星物种。",
    morphology: "体长约 6 厘米,雄虫体具绿金属光泽,翅蓝紫而端部透明;雌虫翅淡褐、伪翅痣白色。",
    habitat: "栖于林荫遮蔽的清澈山溪,雄虫守领域,雌虫产卵于沉水植物组织内。",
    distribution: "分布于中国南北山地溪流及邻近地区,夏秋溪畔常见。",
    etymology: "属名 Matrona 源自拉丁语「主妇」,或指其端庄体态;中文名指翅端透明的特征。",
    discovery:
      "十九世纪中叶依东亚标本定名,此后成为中国豆娘区系调查与溪流监测的基准种之一。",
    genomeInfo: "全基因组测序尚待开展;其翅色为几丁质多层膜结构色,是生物光子学研究对象。",
    ecologyRole: "山溪捕食者,稚虫伏于石间捕食水虫,成虫沿溪捕食小飞虫,对水质与林荫敏感。",
    researchValue: "豆娘翅结构色与性信号演化研究的热点物种,亦是溪流生态健康的指示类群。",
    tags: ["观赏昆虫"],
  },
  // ===================== 螳螂目 Mantodea =====================
  {
    rank: "family",
    latin: "Hymenopodidae",
    chinese: "花螳科",
    parent: "Mantodea",
    description:
      "花螳科为螳螂中特化的花栖类群,前足与中足股节扩展如花瓣,多粉白或艳色,拟态花朵伏击访虫,含兰花螳螂等知名种。",
  },
  {
    rank: "genus",
    latin: "Hymenopus",
    chinese: "兰花螳属",
    parent: "Hymenopodidae",
    description:
      "兰花螳属为东南亚雨林花螳,体与足似粉白花瓣,静伏花间伏击传粉昆虫,其拟态之精妙举世闻名。",
  },
  {
    rank: "species",
    latin: "Hymenopus coronatus",
    chinese: "兰花螳螂",
    parent: "Hymenopus",
    description:
      "兰花螳螂被誉为昆虫拟态的巅峰之作:若虫通体粉白、足扩张如瓣,静伏枝头宛如一朵兰花。研究证实其体色在传粉昆虫的视觉中与真实花朵难以区分,甚至能凭空吸引猎物主动来访。雌雄体型悬殊,随蜕皮由粉转白,是雨林昆虫中知名度最高的旗舰物种。",
    morphology: "雌成虫体长 6-7 厘米,粉白色,四足股节扩展如花瓣;雄虫仅约 2.5 厘米,体色褐白相间。",
    habitat: "栖于东南亚雨林花木之间,若虫伏于花上守株待兔,成虫渐离花游猎。",
    distribution: "分布于马来半岛、泰国与印尼苏门答腊、爪哇、婆罗洲等雨林。",
    etymology: "属名由希腊语 hymen(膜)与 pous(足)构成,指足上瓣状膜质扩展;种加词意为「如加冕的」。",
    discovery:
      "十八世纪末依东南亚标本定名;2014 年前后行为实验证实其「花拟态」确可吸引访花昆虫上门。",
    genomeInfo: "全基因组数据尚缺;色觉生态研究显示其体色信号匹配传粉昆虫的感受谱,拟态几可乱真。",
    ecologyRole: "花间伏击型捕食者,取食蜂、蝇、蝶等访花昆虫,亦是鸟类与小蜥蜴的猎物。",
    researchValue: "拟态与感觉生态学的经典案例;「猎物主动上门」的欺骗机制被写入行为学教科书。",
    tags: ["观赏昆虫"],
  },
  // ===================== 革翅目 Dermaptera =====================
  {
    rank: "order",
    latin: "Dermaptera",
    chinese: "革翅目",
    parent: "Insecta",
    description:
      "革翅目体中型延长,前翅革质短截,后翅如折扇收拢其下,腹端一对骨化尾铗;渐变态、多夜行杂食,部分种类具母性护卵行为,全球约两千种。",
  },
  {
    rank: "family",
    latin: "Forficulidae",
    chinese: "蠼螋科",
    parent: "Dermaptera",
    description:
      "蠼螋科为革翅目最大的科,尾铗发达,杂食夜行,栖落叶石下与树皮缝,雌虫清洁守护卵粒并护育若虫,广布全球温带。",
  },
  {
    rank: "genus",
    latin: "Forficula",
    chinese: "蠼螋属",
    parent: "Forficulidae",
    description:
      "蠼螋属为蠼螋科的模式属,雄虫尾铗分长铗短铗二型,杂食,代表种欧洲蠼螋具详尽的母性行为研究记录。",
  },
  {
    rank: "species",
    latin: "Forficula auricularia",
    chinese: "欧洲蠼螋",
    authority: "(Linnaeus, 1758)",
    parent: "Forficula",
    description:
      "欧洲蠼螋原产欧洲,现随贸易遍布全球温带,是最常见的蠼螋。其母性照料堪称昆虫界典范:雌虫冬季守护卵堆,舔舐清洁防霉,若虫孵出后仍伴随保护。雄虫尾铗分长铗短铗两型,由幼期营养状况决定;后翅如折扇般收拢于短革翅下,被视为自然界最精巧的折叠结构之一。",
    morphology: "体长 12-15 毫米,红褐色,触角念珠状,尾铗钳状,雄虫铗长而弯,雌虫铗短直。",
    habitat: "栖于腐木、石下、树皮缝与人居周边阴湿处,昼伏夜出,受惊时释放臭液。",
    distribution: "原产欧洲与西亚,已入侵北美、澳洲等全球温带地区。",
    etymology: "属名为拉丁语「小剪刀」;种加词 auricularia 源自「耳」,源于旧俗误信其钻入人耳。",
    discovery:
      "1758 年林奈定名;二十世纪分子研究揭示其在北美的种群实为多个隐存种构成的复合体。",
    genomeInfo: "核基因组测序仍有限;经典细胞遗传学与隐存种复合体的分子鉴定研究丰富。",
    ecologyRole: "杂食性地面取食者,捕食蚜虫等小虫兼食腐殖;母性育幼推进了社会性起源研究。",
    researchValue: "亲本投资与母性行为演化的经典模型;后翅折叠机制启发航天展开结构的仿生设计。",
    tags: ["入侵物种"],
  },
  // ===================== 啮虫目 Psocoptera =====================
  {
    rank: "order",
    latin: "Psocoptera",
    chinese: "啮虫目",
    parent: "Insecta",
    description:
      "啮虫目为小型软弱昆虫,咀嚼式口器,翅常退化,多栖树皮、书页与储粮间,以霉菌孢子与有机碎屑为食,含书虱等储藏害虫,现常与虱目合并为啮总目。",
  },
  {
    rank: "family",
    latin: "Liposcelididae",
    chinese: "书虱科",
    parent: "Psocoptera",
    description:
      "书虱科为微小型无翅啮虫,体扁柔软,取食霉菌与淀粉质,滋生于书库、粮仓与博物馆,是重要储藏害虫类群。",
  },
  {
    rank: "genus",
    latin: "Liposcelis",
    chinese: "书虱属",
    parent: "Liposcelididae",
    description:
      "书虱属为世界性微小储藏害虫,无翅、多营孤雌生殖,对干燥与气调环境耐受力强,含嗜卷书虱等全球广布种。",
  },
  {
    rank: "species",
    latin: "Liposcelis bostrychophila",
    chinese: "嗜卷书虱",
    authority: "Badonnel, 1931",
    parent: "Liposcelis",
    description:
      "嗜卷书虱体长仅约一毫米,无翅畏光,滋生于粮仓、档案馆与古籍书页之间,啮食霉斑与淀粉胶质,是储藏物害虫的代表。其全球种群全部为雌性,专性孤雌生殖由体内沃尔巴克氏体诱导;耐干燥、抗药性强,是储粮与文保行业最难对付的微型害虫之一。",
    morphology: "体长 1-1.5 毫米,扁薄柔软,黄褐至灰白,无翅,触角细长,眼退化。",
    habitat: "栖于仓库、书店、档案馆与居室阴湿缝隙,喜高湿微环境,畏光而善疾走。",
    distribution: "随粮食书籍贸易遍布全球,热带亚热带尤盛,中国各地仓库常见。",
    etymology: "中文「书虱」直指其嗜书习性与虱般微小;种加词意为「喜卷曲之物者」,词源古老难考。",
    discovery:
      "1931 年巴登内尔定名;二十世纪后期其孤雌生殖的共生菌诱导机制被逐步阐明。",
    genomeInfo: "专性孤雌生殖(全雌种群)由沃尔巴克氏体诱导;抗药性与耐逆相关的转录组研究活跃。",
    ecologyRole: "仓储与文保环境的菌食者,高湿条件下暴发成灾,啃食谷物、装帧与标本。",
    researchValue: "储藏物害虫防治与孤雌生殖演化研究的模式虫种,抗药性监测的行业标准物种。",
    tags: ["入侵物种", "农业害虫"],
  },
  // ===================== 鞘翅目 Coleoptera =====================
  {
    rank: "family",
    latin: "Tenebrionidae",
    chinese: "拟步甲科",
    parent: "Coleoptera",
    description:
      "拟步甲科为鞘翅目最大的科之一,全球逾两万种,体壁坚硬多暗色,栖荒漠沙地或仓储环境,含赤拟谷盗等著名储粮害虫。",
  },
  {
    rank: "genus",
    latin: "Tribolium",
    chinese: "拟谷盗属",
    parent: "Tenebrionidae",
    description:
      "拟谷盗属为仓储拟步甲,栖于面粉谷物,取食破碎粮粒与粉屑,代表种赤拟谷盗兼具世界性储粮害虫与鞘翅目模式物种双重身份。",
  },
  {
    rank: "species",
    latin: "Tribolium castaneum",
    chinese: "赤拟谷盗",
    authority: "(Herbst, 1797)",
    parent: "Tribolium",
    description:
      "赤拟谷盗是世界性储粮害虫,栖于面粉厂与粮仓,取食碎粮粉尘,群体散发刺激性苯醌气味污染面粉。同时它是鞘翅目功能最全的模式生物:2008 年作为第一只完成全基因组测序的甲虫,其短胚带发育、亲代 RNAi 干扰与大规模突变筛选,使它成为与果蝇并称的发育遗传学平台。",
    morphology: "体长 3-4 毫米,扁长椭圆形,红褐至锈红色,触角端部膨大呈锤状,鞘翅具细刻点行。",
    habitat: "栖于面粉、谷物与加工副产物堆中,不耐低温,依赖仓储温暖环境繁衍。",
    distribution: "全球广布于储粮与食品加工场所,中国各粮区常见。",
    ncbiTaxId: 7334,
    etymology: "种加词 castaneus 意为「栗色的」,指其锈红体色;属名或取自古希腊三棱刺之名。",
    discovery:
      "1797 年赫布斯特定名;2008 年其基因组发表于《自然》,开启甲虫基因组学时代。",
    genomeInfo: "2n=20,全基因组约 2 亿碱基对,为首个完成测序的鞘翅目物种,基因数约 1.6 万。",
    ecologyRole: "破碎粮粒的次级取食者,种群内自相残杀显著,是经典种间竞争实验的素材。",
    researchValue: "鞘翅目发育遗传学核心模式;帕克以其与混淆拟谷盗的经典竞争实验奠定竞争排斥理论。",
    tags: ["模式生物", "农业害虫"],
  },
  {
    rank: "genus",
    latin: "Harmonia",
    chinese: "异色瓢虫属",
    parent: "Coccinellidae",
    description:
      "异色瓢虫属为亚洲瓢虫类群,鞘翅底色与斑纹变异极大,代表种异色瓢虫兼具生物防治功臣与全球入侵者的双重身份。",
  },
  {
    rank: "species",
    latin: "Harmonia axyridis",
    chinese: "异色瓢虫",
    authority: "(Pallas, 1773)",
    parent: "Harmonia",
    description:
      "异色瓢虫原产东亚,鞘翅色斑变化之大为昆虫之冠,同一群体可见从纯黑到橙红斑驳的百余种色型。它被引入欧美防治蚜虫后失控扩张,被视为扩张最快的入侵昆虫之一:挤压土著瓢虫、入室聚集扰民、污染葡萄酒。其色斑遗传与入侵机制研究,使它成为演化遗传学的明星物种。",
    morphology: "体长 5-8 毫米,鞘翅色型极多,底色黄橙红黑不一,斑纹零至十九个,胸背板呈「M」形黑纹。",
    habitat: "栖于农田、林缘与草地,捕食蚜虫;秋后大量聚集于山脊岩缝与人居室越冬。",
    distribution: "原产东亚,已入侵欧洲、南北美洲与非洲多国,中国南北广布。",
    etymology: "属名取自希腊神话和谐女神 Harmonia;种加词 axyridis 词源古老难考。",
    discovery:
      "1773 年帕拉斯定名;1988 年前后在北美建立野生种群,此后以惊人速度席卷全球多洲。",
    genomeInfo: "全基因组测序已完成;研究揭示其色斑多态与染色体大倒位构成的「超基因」区密切相关。",
    ecologyRole: "蚜虫的重要天敌,控蚜作用显著;入侵区排挤土著瓢虫,其携带的微孢子虫被疑为致胜武器。",
    researchValue: "色斑多态遗传学与入侵遗传学的双料经典;生物防治引入风险评估的教科书案例。",
    tags: ["入侵物种", "生物防治"],
  },
  {
    rank: "family",
    latin: "Lampyridae",
    chinese: "萤科",
    parent: "Coleoptera",
    description:
      "萤科甲虫体壁柔软,多数种类的幼虫与成虫具发光器,以冷光求偶或警戒,幼虫多捕食螺类与蜗牛,部分类群水栖,全球两千余种。",
  },
  {
    rank: "genus",
    latin: "Aquatica",
    chinese: "水萤属",
    parent: "Lampyridae",
    description:
      "水萤属为亚洲萤火虫特有属,幼虫水栖、捕食淡水螺类,成虫于水草间发光求偶,是萤科中罕见的回归水生演化支系。",
  },
  {
    rank: "species",
    latin: "Aquatica leii",
    chinese: "雷氏萤",
    parent: "Aquatica",
    description:
      "雷氏萤是中国特有的水栖萤火虫,幼虫生活于湖泊池沼水中,捕食淡水螺类,成虫夏夜沿水岸发出点点绿光。它以武汉等长江中下游城市湿地为家,却因光污染干扰闪光通讯与湿地消失而急剧衰退,成为中国萤火虫保育的旗舰物种,也是城市生态修复成效的活体指示。",
    morphology: "成虫体长约 1 厘米,前胸背板橙红,鞘翅黑褐;雄虫翅完整,雌虫翅短,腹末发光器乳白。",
    habitat: "栖于水质清洁、水草丰茂的湖岸池畔,幼虫水栖,成虫低飞于草丛间发光。",
    distribution: "中国特有,已知分布于湖北、江西等长江中下游湿地。",
    etymology: "属名 Aquatica 为拉丁语「水生的」,指幼虫水栖;种加词 leii 为人名纪念名。",
    discovery:
      "2000 年代初依华中地区标本定名,后随水栖萤类的系统修订移入水萤属,成为城市萤火虫保育象征。",
    genomeInfo: "全基因组测序见诸报道,为萤光信号通讯与水栖适应研究提供参照。",
    ecologyRole: "水陆两栖的螺类捕食者,闪光求偶依赖黑暗环境,是湿地与暗夜质量的指示物种。",
    researchValue: "萤火虫保育与暗夜生态研究旗舰;萤光素-萤光素酶体系被广泛用于分子检测技术。",
    tags: ["中国特有", "环境指示种"],
  },
  // ===================== 鳞翅目 Lepidoptera =====================
  {
    rank: "family",
    latin: "Noctuidae",
    chinese: "夜蛾科",
    parent: "Lepidoptera",
    description:
      "夜蛾科为鳞翅目最大的科之一,全球逾两万种,体粗壮多毛、夜行趋光,幼虫多植食,含棉铃虫、粘虫、地老虎等重大迁飞性害虫。",
  },
  {
    rank: "genus",
    latin: "Helicoverpa",
    chinese: "铃虫属",
    parent: "Noctuidae",
    description:
      "铃虫属为夜蛾科大形蛾类,翅具环纹肾纹,幼虫蛀食花蕾铃果,迁飞能力强、寄主极广,含棉铃虫等世界性大害虫。",
  },
  {
    rank: "species",
    latin: "Helicoverpa armigera",
    chinese: "棉铃虫",
    authority: "(Hübner, 1808)",
    parent: "Helicoverpa",
    description:
      "棉铃虫是旧大陆首要农业害虫之一,幼虫蛀食棉花蕾铃、玉米穗与多种蔬菜果实,惊人的抗药性令植保界头疼。它随季风远距离迁飞,中国自 1997 年商业化种植 Bt 棉花靶向其危害,成为全球转基因害虫治理的经典范例;其广食性与解毒基因家族的研究亦居昆虫学前沿。",
    morphology: "翅展 3-4 厘米,前翅黄褐具环状纹与肾状纹,后翅浅色端带黑边;幼虫体色多变,体表具小刺。",
    habitat: "栖于棉田、玉米地与菜园,成虫夜飞趋光,幼虫蛀入蕾果内部取食。",
    distribution: "广布非洲、亚洲、澳洲与欧洲南部;2013 年首次现身南美洲巴西。",
    ncbiTaxId: 29027,
    etymology: "种加词 armigera 意为「武装的」,状其如披甲之敌;中文名指幼虫蛀食棉花铃果。",
    discovery:
      "1808 年许布纳定名;二十世纪末其与 Bt 棉花的攻防成为全球农业史上的标志性事件。",
    genomeInfo: "全基因组测序于 2017 年完成,细胞色素 P450 等解毒酶基因家族的扩张与广食性抗药性相关。",
    ecologyRole: "多食性植食者,取食数百种植物;作为鸟兽与寄生蜂的猎物,是农田食物网的关键节点。",
    researchValue: "昆虫抗药性与寄主谱演化的模式种;Bt 作物抗性管理研究的全球标杆。",
    tags: ["农业害虫"],
  },
  {
    rank: "family",
    latin: "Pieridae",
    chinese: "粉蝶科",
    parent: "Lepidoptera",
    description:
      "粉蝶科为常见中型蝶类,全球逾千种,翅多白黄橙色,幼虫取食十字花科等植物,含菜粉蝶、豆粉蝶等最熟悉的蝶类。",
  },
  {
    rank: "genus",
    latin: "Pieris",
    chinese: "粉蝶属",
    parent: "Pieridae",
    description:
      "粉蝶属为全球最熟悉的白色蝴蝶,翅白具黑斑,幼虫即俗称的菜青虫,取食十字花科蔬菜,代表种菜粉蝶遍布世界菜田。",
  },
  {
    rank: "species",
    latin: "Pieris rapae",
    chinese: "菜粉蝶",
    authority: "(Linnaeus, 1758)",
    parent: "Pieris",
    description:
      "菜粉蝶是全球最常见的蝴蝶之一,春日菜园里成对翻飞的白蝶多半就是它,幼虫即啃食甘蓝白菜的「菜青虫」。原产欧亚大陆的它约于 1860 年传入北美,此后百年扩散全球温带;其幼虫巧用解毒蛋白把芥子油苷的毒物转化为无害腈类,是昆虫与植物军备竞赛的教科书案例。",
    morphology: "翅展 4-5 厘米,翅白色,前翅顶角与后翅前缘具黑斑,雌虫黑斑更显著,翅背微黄。",
    habitat: "栖于菜园、田野与荒地,成虫日间访花,幼虫群集叶背取食十字花科植物。",
    distribution: "原产欧亚大陆与北非,已传入北美、澳洲等地,遍布全球温带。",
    etymology: "种加词 rapae 意为「芸薹的」,指幼虫寄主;属名源于缪斯故乡庇厄里亚之名。",
    discovery:
      "1758 年林奈定名;约 1860 年随贸易传入北美,此后百年间席卷全洲菜田。",
    genomeInfo: "染色体级基因组组装近年见诸报道,为菜田鳞翅目害虫研究提供分子基础。",
    ecologyRole: "十字花科植物的专性植食者,种群随菜园扩张而繁盛,是寄生蜂与食虫鸟的经典猎物。",
    researchValue: "昆虫-植物协同演化经典模型:腈 specifier 蛋白解毒芥子油苷的机制已被详尽解析。",
    tags: ["农业害虫"],
  },
  {
    rank: "genus",
    latin: "Antheraea",
    chinese: "柞蚕属",
    parent: "Saturniidae",
    description:
      "柞蚕属为大蚕蛾科大形蛾类,翅具眼斑,幼虫粗壮,多取食栎属植物,含驯化种柞蚕与天蚕等著名绢丝昆虫。",
  },
  {
    rank: "species",
    latin: "Antheraea pernyi",
    chinese: "柞蚕",
    authority: "(Guérin-Méneville, 1855)",
    parent: "Antheraea",
    description:
      "柞蚕是中国独有的放养型绢丝昆虫,幼虫在山间柞树林中露天取食栎叶,茧丝即柞蚕丝。自明代形成规模放养以来,辽宁、山东等地发展出完整的柞蚕丝产业,产量长期居世界之首;其硕大蛹体既是东北传统美食,也是中国繁育赤眼蜂的标准寄主,一虫多用。",
    morphology: "翅展 12-15 厘米,翅棕褐具四枚眼斑与粉白横带,幼虫绿色具毛瘤,茧褐而紧实。",
    habitat: "幼虫放养于山坡柞树(栎属)林间,成虫秋夕飞翔,以蛹滞育越冬。",
    distribution: "原产中国,主产辽宁、山东、河南等北方山区,朝鲜半岛与东北亚亦有放养。",
    etymology: "种加词 pernyi 纪念十九世纪在华采集标本的法国博物学者贝尔尼(Perny)。",
    discovery:
      "1855 年盖兰-梅内维尔定名;中国柞蚕放养技术明代已见于记载,清代形成规模化产业。",
    genomeInfo: "染色体级基因组组装近年见诸报道;其光周期滞育的内分泌调控研究积累深厚。",
    ecologyRole: "栎林食叶昆虫,人工放养下与山地生态系统共荣;蛹期支撑繁蜂与食用两大产业。",
    researchValue: "绢丝昆虫育种与滞育生理的经典材料;柞蚕卵为赤眼蜂大规模繁育的标准载体。",
    tags: ["经济物种", "驯化物种", "食用昆虫"],
  },
  {
    rank: "family",
    latin: "Erebidae",
    chinese: "裳蛾科",
    parent: "Lepidoptera",
    description:
      "裳蛾科为鳞翅目最大的科之一,整合了传统灯蛾、毒蛾等类群,幼虫多具毛或杂食,含美国白蛾、舞毒蛾等世界著名害虫,全球逾两万种。",
  },
  {
    rank: "genus",
    latin: "Hyphantria",
    chinese: "白蛾属",
    parent: "Erebidae",
    description:
      "白蛾属为北美起源的裳蛾类群,幼虫群集结网幕为害阔叶树,代表种美国白蛾为国际重要检疫害虫。",
  },
  {
    rank: "species",
    latin: "Hyphantria cunea",
    chinese: "美国白蛾",
    authority: "(Drury, 1773)",
    parent: "Hyphantria",
    description:
      "美国白蛾原产北美,幼虫在枝梢结成大网幕群居啃食叶片,可为害三百余种植物。1979 年经辽宁丹东传入中国后蔓延华北,为害林木果树,被列为国家林业检疫性有害生物;中国学者发掘其专性寄生蜂周氏啮小蜂开展大规模生物防治,成为以虫治虫的著名案例。",
    morphology: "翅展 3-4 厘米,成虫体翅纯白(部分雌虫前翅具黑点),幼虫背具黑褐纵带、体侧黄毛发达。",
    habitat: "栖于阔叶林、果园与城乡行道树,幼虫结网幕群居为害,北方一年两代。",
    distribution: "原产北美洲,已入侵欧洲与东亚,中国华北至东北均有发生。",
    etymology: "种加词 cunea 意为「楔形的」,或指前翅斑形;属名或与「编织」词根相关,暗合结网习性。",
    discovery:
      "1773 年德鲁里定名;1979 年于中国辽宁丹东首次发现,此后列为重点检疫与治理对象。",
    genomeInfo: "全基因组测序见诸报道,广谱解毒与感受基因家族的扩张与其多寄主食性相关。",
    ecologyRole: "多食性食叶害虫,暴发年份可致整树光秃;入侵地缺乏天敌是成灾主因。",
    researchValue: "入侵生物学与生物防治研究范本:周氏啮小蜂的发掘与规模化应用即其经典成果。",
    tags: ["入侵物种", "农业害虫"],
  },
  // ===================== 半翅目 Hemiptera =====================
  {
    rank: "genus",
    latin: "Aphis",
    chinese: "蚜属",
    parent: "Aphididae",
    description:
      "蚜属为蚜科最大的属之一,含数百种小型植食性蚜虫,孤雌生殖力惊人,棉蚜等是世界性农业大害虫。",
  },
  {
    rank: "species",
    latin: "Aphis gossypii",
    chinese: "棉蚜",
    authority: "(Glover, 1877)",
    parent: "Aphis",
    description:
      "棉蚜是全球最重要的农业害虫之一,体长仅两毫米上下,群集嫩梢吸汁并传播数十种植物病毒,棉花、瓜类受害尤烈。其抗药性进化极快,色型分黄绿,兼营有性与孤雌生殖;中国种群以卵在木槿等越冬寄主上越冬,春季迁入棉田,是害虫抗性管理的经典研究对象。",
    morphology: "体长 1.5-2 毫米,夏季多黄绿色、秋季深绿或黑色,腹管黑短,触角短于体。",
    habitat: "群集于棉花、瓜类与多种作物的嫩梢叶背,密度高时产生有翅型扩散。",
    distribution: "全球暖温热带广布,中国各棉区与瓜菜区均为常发害虫。",
    etymology: "种加词 gossypii 意为「棉花的」,指其模式寄主;属名 Aphis 为希腊语蚜虫。",
    discovery:
      "1877 年格洛弗定名;二十世纪以来始终位居世界最顽固的农业害虫之列。",
    genomeInfo: "已发表多套全基因组组装(约数亿碱基对),杀虫剂靶标抗性突变研究深入。",
    ecologyRole: "作物嫩梢的密集吸汁者,蜜露诱发煤污病;亦是瓢虫、草蛉与蚜茧蜂的支柱猎物。",
    researchValue: "害虫抗药性监测与治理的标杆虫种;孤雌与两性交替的繁殖策略是遗传学与进化教材案例。",
    tags: ["农业害虫"],
  },
  {
    rank: "family",
    latin: "Aleyrodidae",
    chinese: "粉虱科",
    parent: "Hemiptera",
    description:
      "粉虱科为微小型半翅目昆虫,成虫体翅覆白蜡,幼虫固定于叶背吸汁,全球逾一千五百种,含烟粉虱等超级害虫。",
  },
  {
    rank: "genus",
    latin: "Bemisia",
    chinese: "粉虱属",
    parent: "Aleyrodidae",
    description:
      "粉虱属为白色微小型粉虱,群集叶背吸汁,传毒能力极强,代表种烟粉虱被誉为「超级害虫」。",
  },
  {
    rank: "species",
    latin: "Bemisia tabaci",
    chinese: "烟粉虱",
    authority: "(Gennadius, 1889)",
    parent: "Bemisia",
    description:
      "烟粉虱体长不足一毫米,通体覆白蜡,看似柔弱,实为世界公认的「超级害虫」:它吸食数百种植物汁液、传播百余种植物病毒,给多国农业造成巨额损失。更奇的是,研究发现它从植物基因组中水平转移获得一个解毒基因,用以中和植物毒素——昆虫如何「偷窃」武器对抗植物防御,由此成为演化研究焦点。",
    morphology: "体长约 0.9 毫米,体翅纯白被蜡粉,翅近三角形,静息时如屋脊状相叠,若虫扁椭圆透明。",
    habitat: "群集于温室与农田植物叶背,温暖环境全年繁殖,成虫受扰短距离飞散。",
    distribution: "旧大陆热带起源,现遍布全球,中国自南向北扩散危害。",
    etymology: "种加词 tabaci 意为「烟草的」,指 1889 年定名所依据的希腊烟草寄主。",
    discovery:
      "1889 年根纳迪乌斯依希腊烟草上的标本定名;二十世纪末随全球贸易暴发为超级害虫。",
    genomeInfo: "多个隐存种已分别完成全基因组测序;携带植物源水平转移基因 BtPMaT1,可中和植物酚苷毒素。",
    ecologyRole: "广食性吸汁者与最强植物病毒媒介之一,分泌蜜露诱发煤污病,温室受害尤烈。",
    researchValue: "基因水平转移的经典新案例;其隐存种复合群是物种界定与入侵研究的焦点。",
    tags: ["入侵物种", "农业害虫"],
  },
  // ===================== 蚤目 Siphonaptera =====================
  {
    rank: "order",
    latin: "Siphonaptera",
    chinese: "蚤目",
    parent: "Insecta",
    description:
      "蚤目为侧扁无翅的全变态昆虫,体被倒刺、后足跳跃力极强,成虫外寄生于鸟兽体表吸血,传播鼠疫等疾病;分子证据显示其与长翅目近缘,全球逾两千种。",
  },
  {
    rank: "family",
    latin: "Pulicidae",
    chinese: "蚤科",
    parent: "Siphonaptera",
    description:
      "蚤科为蚤目最大的科,体侧扁、口器刺吸,寄主广泛,含人蚤、猫蚤与鼠疫媒介印鼠客蚤等医学重要蚤种。",
  },
  {
    rank: "genus",
    latin: "Xenopsylla",
    chinese: "客蚤属",
    parent: "Pulicidae",
    description:
      "客蚤属为啮齿类体表的常见跳蚤,繁殖力强,是鼠疫与鼠型斑疹伤寒的主要传播者,代表种印鼠客蚤为医学昆虫学经典。",
  },
  {
    rank: "species",
    latin: "Xenopsylla cheopis",
    chinese: "印鼠客蚤",
    authority: "(Rothschild, 1903)",
    parent: "Xenopsylla",
    description:
      "印鼠客蚤寄生于鼠类体表,是腺鼠疫的经典媒介:鼠疫杆菌在其前胃结成菌栓,使蚤反流注菌入血,完成鼠—蚤—人传播。历史上的鼠疫大流行多循此链,1894 年香港鼠疫期间鼠疫杆菌的分离即与其宿主褐家鼠直接相关;它同时传播鼠型斑疹伤寒,是医学昆虫学的标志性物种。",
    morphology: "体长约 2.5 毫米,棕褐色,体侧扁,受精囊形态为鉴定特征,后足粗壮善跳。",
    habitat: "栖于鼠巢与鼠体表,主要寄主为褐家鼠等家鼠,人被叮咬多因鼠患流行。",
    distribution: "全球暖热地区广布,随鼠类航运扩散,是中国南方鼠疫疫区的重要媒介。",
    etymology: "属名由希腊语 xenos(奇异)与 psylla(蚤)构成;种加词相传取自法老奇阿普斯之名。",
    discovery:
      "1903 年罗斯柴尔德定名;1894 年香港鼠疫大流行中,耶尔森与北里柴三郎分离出鼠疫杆菌。",
    genomeInfo: "线粒体基因组与媒介相关转录组数据已发表,核基因组研究相对滞后。",
    ecologyRole: "鼠类种群的主要外寄生虫,维系鼠疫杆菌在鼠间的长期循环,并可波及人类。",
    researchValue: "鼠疫媒介生物学与菌栓机制研究的经典;鼠疫监测与防控培训的标准虫种。",
    tags: ["病媒生物", "医学媒介"],
  },
  // ===================== 虱目 Phthiraptera =====================
  {
    rank: "order",
    latin: "Phthiraptera",
    chinese: "虱目",
    parent: "Insecta",
    description:
      "虱目为扁小无翅的永久性外寄生虫,足端特化为抓握爪,终生寄生于鸟兽体表,渐变态,与啮虫目近缘,全球逾五千种。",
  },
  {
    rank: "family",
    latin: "Pediculidae",
    chinese: "虱科",
    parent: "Phthiraptera",
    description:
      "虱科为寄生于人体的吸血虱,体扁足壮、爪钳发达,卵粘于毛发或衣物纤维,传播斑疹伤寒、回归热等疾病。",
  },
  {
    rank: "genus",
    latin: "Pediculus",
    chinese: "虱属",
    parent: "Pediculidae",
    description:
      "虱属为人体的专性寄生虱,含头虱与体虱,伴随人类演化数万年,是分子人类学独特的「共生物证」。",
  },
  {
    rank: "species",
    latin: "Pediculus humanus",
    chinese: "人虱",
    authority: "(Linnaeus, 1758)",
    parent: "Pediculus",
    description:
      "人虱是伴随人类数万年的专性寄生虫,头虱栖发际、体虱居衣缝,以爪钳勾住毛发或纤维吸血。体虱是流行性斑疹伤寒、战壕热与虱传回归热的媒介,在历史上的战争与围城中夺命无算。其线粒体谱系被用来追溯人类走出非洲的路线乃至穿衣的历史,堪称最小的「人类史书」。",
    morphology: "体长 2-3 毫米,灰白色扁平,足粗壮末端具钳形爪,腹部膨大,卵白色胶粘于毛发纤维。",
    habitat: "终生栖于人体毛发与贴身衣物缝隙,离体后一至两日内死亡,卫生不良时猖獗。",
    distribution: "随人类遍布全球,拥挤与战乱环境种群暴发,今在部分地区仍常见。",
    etymology: "种加词 humanus 意为「人的」;属名 Pediculus 为拉丁语虱。",
    discovery:
      "1758 年林奈定名;2010 年其体虱基因组发表,为当时已知最小的昆虫基因组。",
    genomeInfo: "全基因组约 1.08 亿碱基对、约 1.1 万个基因,内含子稀少;内共生细菌为其供应 B 族维生素。",
    ecologyRole: "人类专性外寄生虫,种群密度受卫生条件与人群流动性影响,历史上多次随战争流行。",
    researchValue: "斑疹伤寒媒介研究的经典;虱的分子谱系成为推断人类迁徙与穿衣起源的独特工具。",
    tags: ["病媒生物", "医学媒介"],
  },
  // ===================== 蜚蠊目 Blattodea =====================
  {
    rank: "family",
    latin: "Ectobiidae",
    chinese: "姬蠊科",
    parent: "Blattodea",
    description:
      "姬蠊科为蜚蠊目最大的科之一,体小型至中型,栖室内与林下腐木间,含德国小蠊等世界性室内害虫,全球数千种。",
  },
  {
    rank: "genus",
    latin: "Blattella",
    chinese: "小蠊属",
    parent: "Ectobiidae",
    description:
      "小蠊属为小型蜚蠊,体淡色具纵纹,繁殖速率在蟑螂中数一数二,代表种德国小蠊是全球室内蟑螂之首。",
  },
  {
    rank: "species",
    latin: "Blattella germanica",
    chinese: "德国小蠊",
    authority: "(Linnaeus, 1767)",
    parent: "Blattella",
    description:
      "德国小蠊是全球室内数量最多的蟑螂,前胸背板两条黑色纵纹是它的身份证。它繁殖极快,雌虫携带卵鞘直至孵化,数月即可成灾;对各类杀虫剂演化出惊人抗性,部分种群甚至学会拒绝含糖毒饵。其排泄物是重要的室内过敏原,城市昆虫学与害虫抗性研究以它为头号对象。",
    morphology: "体长 1.2-1.6 厘米,淡黄褐色,前胸背板具两条平行黑纵纹,翅发达覆盖腹端。",
    habitat: "栖于厨房、餐厅与食品加工场所的温暖潮湿缝隙,夜行,嗜发酵食源与水。",
    distribution: "遍布全球室内,热带亚热带尤盛,中国各地城市常见。",
    etymology: "属名为 Blatta(蜚蠊)的指小词,意为「小蠊」;种加词意为「德国的」,得名缘由难考。",
    discovery:
      "1767 年林奈定名;二十世纪随城市化成为室内头号蜚蠊,抗药性研究至今不衰。",
    genomeInfo: "高质量全基因组近年见诸报道,嗅觉受体与解毒酶基因家族显著扩张,契合其广食性。",
    ecologyRole: "人居伴生杂食者,取食残渣碎屑;密度高时污染食物并诱发过敏性疾病。",
    researchValue: "城市害虫治理与抗药性演化研究的旗舰;「避糖」行为的进化成为感官生态学经典案例。",
    tags: ["入侵物种", "病媒生物"],
  },
];
