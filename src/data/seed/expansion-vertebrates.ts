import { TaxonSeed } from "../types";

// 脊椎动物扩充种子数据(Task 2-e expansion)。
// 所有 species 的 parent 引用两类来源:
//   1) DB 已有分类单元(vertebrates.ts 已入库,见 /tmp/taxa-inventory.tsv):如
//      Acipenseriformes / Acipenseridae / Hippocampus / Perciformes / Tetraodontiformes /
//      Cypriniformes / Elapidae / Viperidae / Crocodylia / Aves / Bubo / Strigidae /
//      Anatidae / Phasianidae / Panthera / Felidae / Ursidae / Cetacea / Mammalia /
//      Canidae / Cervidae / Artiodactyla;
//   2) 本文件内先行定义的新中间阶元。
// 注意:与 seed-incremental.ts 汇总合并使用,父级必须(DB ∪ 新数据)闭合。
export const expansionVertebrates: TaxonSeed[] = [
  // ===================== 鱼类(辐鳍亚纲/鲟形目等) =====================
  {
    rank: "family",
    latin: "Polyodontidae",
    chinese: "匙吻鲟科",
    parent: "Acipenseriformes",
    description:
      "匙吻鲟科吻部延长或前扁如桨,以滤食浮游动物为生,现仅存北美匙吻鲟与亚洲白鲟两属,后者已于近年灭绝,是鲟形目中最孑遗的支系之一。",
  },
  {
    rank: "genus",
    latin: "Psephurus",
    chinese: "白鲟属",
    parent: "Polyodontidae",
    description:
      "白鲟属为东亚特有的大型淡水匙吻鲟类,吻呈剑状延长,口可前伸,曾栖于长江水系,唯一种白鲟已被宣布灭绝。",
  },
  {
    rank: "species",
    latin: "Psephurus gladius",
    chinese: "白鲟",
    authority: "(Martens, 1862)",
    parent: "Psephurus",
    description:
      "白鲟为中国长江特有的大型匙吻鲟类,吻部剑状延长,俗称象鱼,最大体长可达七米,是淡水鱼类中的巨物。以鱼类为食,曾广布长江干流并及钱塘江、黄河水系。因过度捕捞、航运与栖息地破坏,种群自二十世纪八十年代急剧衰退,2003 年后再无确证目击,IUCN 于 2022 年将其正式列为灭绝。",
    morphology: "体长梭形,吻呈剑状延长,体表裸露无鳞,尾歪形,背部青灰、腹部白色,最大可达七米。",
    habitat: "栖息于长江中下游干流及沿江大型湖泊,春季溯河至上游砾石滩产卵。",
    distribution: "特产于中国长江水系,历史上亦曾见于钱塘江与黄河下游。",
    conservation: "EX",
    tags: ["国家一级保护", "活化石"],
  },
  {
    rank: "genus",
    latin: "Huso",
    chinese: "鳇属",
    parent: "Acipenseridae",
    description:
      "鳇属为大型鲟类,上颌不能活动,吻短钝,以鱼类为食,分布于里海—黑海与黑龙江水系,代表性种为欧洲鳇与达氏鳇。",
  },
  {
    rank: "species",
    latin: "Huso dauricus",
    chinese: "达氏鳇",
    authority: "(Georgi, 1775)",
    parent: "Huso",
    description:
      "达氏鳇是黑龙江流域特有的大型鲟类,体可逾三米、重数百公斤,与中华鲟同为鲟科孑遗,有活化石之称。性凶猛,以鱼类为食,寿命可达数十年。因拦河筑坝隔断洄游通道与盗捕,自然资源量锐减,IUCN 将其列为极危,现依赖人工增殖与放流维持种群。",
    morphology: "体延长呈圆锥形,吻尖突,口大呈半月形,体具五行骨板,背部灰褐、腹部白色。",
    habitat: "栖息于黑龙江干流深水区,底质砂砾,冬季集中于深潭越冬,产卵时溯河而上。",
    distribution: "仅分布于黑龙江水系,包括中国境内的黑龙江、松花江与乌苏里江江段。",
    conservation: "CR",
    tags: ["活化石", "经济物种"],
  },
  {
    rank: "species",
    latin: "Hippocampus erectus",
    chinese: "线纹海马",
    authority: "Perry, 1810",
    parent: "Hippocampus",
    description:
      "线纹海马分布于西大西洋暖水域,体侧具数条白色纵纹,雄鱼具育儿袋、由雄性孕育后代,是海马科繁殖方式特化的典型代表。为传统药材海马的重要来源种之一,长期被捕捞用于药材与观赏贸易,种群持续下降,被 IUCN 列为易危。",
    morphology: "体直立,被环状骨板包裹,吻细长管状,尾卷曲,体色深浅多变,体侧具数条白色纵纹。",
    habitat: "栖息于近岸海草床、红树林根系与珊瑚礁缘,常以尾部卷附于固着物上。",
    distribution: "分布于西大西洋,自北美东海岸南段经墨西哥湾至加勒比海及南美北部近海。",
    conservation: "VU",
    tags: ["药用"],
  },
  {
    rank: "family",
    latin: "Scombridae",
    chinese: "鲭科",
    parent: "Perciformes",
    description:
      "鲭科为外洋高速游泳鱼类,体纺锤形,具细鳞与棱鳞,血管逆流换热能力强,含金枪鱼、鲭与马鲛等重要经济属种,是全球渔业的核心类群。",
  },
  {
    rank: "genus",
    latin: "Thunnus",
    chinese: "金枪鱼属",
    parent: "Scombridae",
    description:
      "金枪鱼属为大型大洋性鲭类,体温可高于水温数度,巡游迅速,含蓝鳍、黄鳍与大眼金枪鱼等,属顶级经济鱼类,多物种处于过度捕捞状态。",
  },
  {
    rank: "species",
    latin: "Thunnus orientalis",
    chinese: "太平洋蓝鳍金枪鱼",
    authority: "(Temminck & Schlegel, 1844)",
    parent: "Thunnus",
    description:
      "太平洋蓝鳍金枪鱼是大洋性顶级掠食鱼类,可潜至数百米深水,具血管逆流换热结构维持体温,巡游极速,跨整个北太平洋洄游。为高价值生鱼片渔业的主要目标种,长期过度捕捞使产卵群体锐减,是中西太平洋区域养护管理的焦点物种。",
    morphology: "体纺锤形,吻尖,尾柄具侧突与新月形尾鳍,第一背鳍可收入沟内,背部深蓝、腹部银白。",
    habitat: "大洋上层至中层巡游,随暖流洄游,幼鱼在日本近海育肥,成鱼跨洋往返东西太平洋。",
    distribution: "分布于北太平洋温带海域,产卵于日本近海与东海,向东可至北美沿岸。",
    conservation: "EN",
    tags: ["经济物种"],
  },
  {
    rank: "family",
    latin: "Molidae",
    chinese: "翻车鲀科",
    parent: "Tetraodontiformes",
    description:
      "翻车鲀科体侧扁呈椭圆盘状,无尾鳍而代以波状舵鳍,含世界上体重最大的硬骨鱼类,以水母与浮游动物为食,皮肤粗糙多黏液。",
  },
  {
    rank: "genus",
    latin: "Mola",
    chinese: "翻车鲀属",
    parent: "Molidae",
    description:
      "翻车鲀属为大型大洋鱼类,体高而侧扁,常侧浮海面晒日,产卵量数以亿计,唯一种翻车鱼广布全球暖海。",
  },
  {
    rank: "species",
    latin: "Mola mola",
    chinese: "翻车鱼",
    authority: "(Linnaeus, 1758)",
    parent: "Mola",
    description:
      "翻车鱼是现存最重的硬骨鱼类之一,成鱼可达两吨以上,体侧扁近椭圆,常侧卧海面晒日以调节体温与驱除寄生虫,俗称太阳鱼。以水母、浮游动物为主食,一次产卵可数亿枚,但流刺网误捕与海洋垃圾威胁使其种群衰退,被 IUCN 评为易危。",
    morphology: "体高而侧扁,呈椭圆盘状,无真正尾鳍而具波状舵鳍,背鳍与臀鳍高大对称,皮肤粗糙多黏液。",
    habitat: "栖息于大洋表层暖水域,常侧浮于海面晒阳,亦潜至深水摄食,随洋流漂游。",
    distribution: "环球热带与温带海域均有分布,中国东海、南海亦常见。",
    conservation: "VU",
  },
  {
    rank: "family",
    latin: "Cobitidae",
    chinese: "鳅科",
    parent: "Cypriniformes",
    description:
      "鳅科为底栖小型鱼类,体细长,口周具须三至六对,鳞细小或裸露,部分种类可行肠呼吸,广布欧亚溪河与稻田,含泥鳅、条鳅等。",
  },
  {
    rank: "genus",
    latin: "Misgurnus",
    chinese: "泥鳅属",
    parent: "Cobitidae",
    description:
      "泥鳅属体延长,口须五对,肠呼吸能力强,耐低氧,栖于泥质底,含泥鳅与大鳞副泥鳅等,兼具食用、药用与研究价值。",
  },
  {
    rank: "species",
    latin: "Misgurnus anguillicaudatus",
    chinese: "泥鳅",
    authority: "(Cantor, 1842)",
    parent: "Misgurnus",
    description:
      "泥鳅是东亚常见的小型底栖鳅类,体表黏液丰富,可吞气行肠呼吸,耐低氧,离水后仍可存活较久。栖居于稻田、沟渠与缓溪泥底,昼伏夜出,以有机碎屑与小型无脊椎动物为食。是广泛养殖的经济鱼类与食药两用物种,亦常用于环境毒理学试验。",
    morphology: "体细长呈圆柱形,口须五对,鳞细小埋于皮下,体背灰褐具黑斑,腹部浅黄,一般十余厘米。",
    habitat: "栖息于稻田、沟渠、池塘与缓流溪河的泥质底,善钻泥,耐低氧。",
    distribution: "分布于中国、朝鲜半岛、日本与俄罗斯远东,并被引种至多地。",
    conservation: "LC",
    tags: ["药用", "经济物种"],
  },

  // ===================== 爬行纲(有鳞目/鳄目) =====================
  {
    rank: "genus",
    latin: "Ophiophagus",
    chinese: "眼镜王蛇属",
    parent: "Elapidae",
    description:
      "眼镜王蛇属为眼镜蛇科特化的食蛇支系,体型居毒蛇之首,筑巢护卵的行为在蛇类中罕见,现生唯一种,毒性猛烈。",
  },
  {
    rank: "species",
    latin: "Ophiophagus hannah",
    chinese: "眼镜王蛇",
    authority: "(Cantor, 1836)",
    parent: "Ophiophagus",
    description:
      "眼镜王蛇是世界上体型最长的毒蛇,可达五米以上,主要以其他蛇类为食,故有食蛇者之称。受扰时立起前半身、扩张颈褶并发出低吼,单次注毒量大,咬伤可致命。栖于南亚至东南亚的热带森林,因栖地丧失与捕捉,被 IUCN 列为易危,在中国属国家二级保护动物。",
    morphology: "体粗长,颈部可扩展平褶,背面整体黑褐并具浅色横纹,幼体色鲜明,头顶具一对枕鳞。",
    habitat: "栖息于热带与亚热带森林、竹林及种植园近水处,昼行性,善攀爬。",
    distribution: "分布于南亚、东南亚至中国华南与西南,包括西藏东南部低地。",
    conservation: "VU",
    tags: ["剧毒", "国家二级保护"],
  },
  {
    rank: "genus",
    latin: "Trimeresurus",
    chinese: "竹叶青蛇属",
    parent: "Viperidae",
    description:
      "竹叶青蛇属为亚洲树栖蝮类,体绿色或褐色,具颊窝与管状毒牙,卵胎生,种类繁多,含通称青竹丝的多个近缘种。",
  },
  {
    rank: "species",
    latin: "Trimeresurus stejnegeri",
    chinese: "竹叶青蛇",
    authority: "Schmidt, 1925",
    parent: "Trimeresurus",
    description:
      "竹叶青蛇是中国南方最常见的树栖毒蛇,通体翠绿,尾背焦红色,亦称赤尾青竹丝。夜间伏于灌木与竹丛上捕食蛙、蜥与小兽,卵胎生。因栖息于茶园与林区边缘而与人接触频繁,咬伤局部肿痛,是南方毒蛇咬伤的常见肇事种之一。",
    morphology: "体侧扁细长,头大呈三角形,瞳孔直立,背鳞翠绿,体侧具白色纵线,尾端焦红色。",
    habitat: "栖息于丘陵山地的灌木丛、竹林与溪边茶田,树栖性,夜行性。",
    distribution: "分布于中国长江以南及中南半岛北部,包括南亚东北部边缘。",
    conservation: "LC",
    tags: ["剧毒"],
  },
  {
    rank: "family",
    latin: "Crocodylidae",
    chinese: "鳄科",
    parent: "Crocodylia",
    description:
      "鳄科为真鳄类,吻形因食性而分化,第四下颌齿在口闭合时外露,营土堆巢并护卵,含尼罗鳄、湾鳄与暹罗鳄等,兼野生保护与规模化养殖。",
  },
  {
    rank: "genus",
    latin: "Crocodylus",
    chinese: "鳄属",
    parent: "Crocodylidae",
    description:
      "鳄属是鳄科最大属,广布热带水域,包含湾鳄、尼罗鳄与暹罗鳄等十余种,体型与鳞饰变异大,为皮革产业的主要对象。",
  },
  {
    rank: "species",
    latin: "Crocodylus siamensis",
    chinese: "暹罗鳄",
    authority: "Schneider, 1801",
    parent: "Crocodylus",
    description:
      "暹罗鳄为东南亚特有的淡水鳄类,吻中等长,栖于沼泽与缓流河川,以植被营土堆巢,护巢性甚强。二十世纪后期因皮用猎捕与栖息地丧失,野生种群几近绝迹,现被 IUCN 列为极危。东南亚养殖量大,种源保护与野外放归是当前保育重点。",
    morphology: "体暗橄榄色并具黑斑,吻中等长度,第四下颌齿闭合时外露,幼体金黄具黑条纹。",
    habitat: "栖息于淡水沼泽、湖泊与缓流河流,掘洞蛰伏以度旱季。",
    distribution: "分布于中南半岛低地水域,野生个体稀少,种群以泰国、柬埔寨为主。",
    conservation: "CR",
    tags: ["经济物种"],
  },

  // ===================== 鸟纲(企鹅目/鹦形目/鸮形目/雁形目/鸡形目) =====================
  {
    rank: "order",
    latin: "Sphenisciformes",
    chinese: "企鹅目",
    parent: "Aves",
    description:
      "企鹅目为南半球海鸟类,双翼特化为鳍状而不能飞行,直立行走,皮下脂肪厚密,潜泳捕食磷虾与鱼类,全部种类均列入保护名录。",
  },
  {
    rank: "family",
    latin: "Spheniscidae",
    chinese: "企鹅科",
    parent: "Sphenisciformes",
    description:
      "企鹅科现存六属十八种,自温带环企鹅属至南极的帝企鹅属体型递增,集群繁殖,换羽与育雏周期严酷,依赖冷流与海冰。",
  },
  {
    rank: "genus",
    latin: "Aptenodytes",
    chinese: "王企鹅属",
    parent: "Spheniscidae",
    description:
      "王企鹅属为体型最大的企鹅属,喙长而弯,颈部橙黄,单卵孵育期极长,仅帝企鹅与王企鹅两种,限于南极及亚南极。",
  },
  {
    rank: "species",
    latin: "Aptenodytes forsteri",
    chinese: "帝企鹅",
    authority: "Gray, 1844",
    parent: "Aptenodytes",
    description:
      "帝企鹅是现存体型最大的企鹅,仅分布于南极大陆及周边冰缘,在南极深冬零下数十度的黑暗中繁殖,雄鸟以足背孵卵、绝食约两月,是鸟类中繁殖条件最严酷的代表。其集群御寒行为与生理耐寒机制为极地生物学的经典研究课题,因海冰变化被列为近危。",
    morphology: "体高逾一米,体重可达四十公斤,头侧与颈部橙黄色,胸腹乳白,背部蓝灰,雏鸟披银灰绒羽。",
    habitat: "栖息于南极大陆冰架与固定海冰边缘,非繁殖期在冰缘海域觅食。",
    distribution: "环南极大陆分布,繁殖地多位于南纬 66 度以南的稳定冰缘。",
    conservation: "NT",
    ncbiTaxId: 92319,
    tags: ["观赏鸟类"],
  },
  {
    rank: "species",
    latin: "Bubo scandiacus",
    chinese: "雪鸮",
    authority: "(Linnaeus, 1758)",
    parent: "Bubo",
    description:
      "雪鸮为环北极分布的白色大型鸮类,昼行性,主食旅鼠,繁殖强度随猎物周期波动,灾荒年份大规模南迁。雄鸟几近纯白,雌鸟具黑褐色横斑。因北极变暖致旅鼠周期紊乱与繁殖地退化,2021 年被上调为易危,亦为中国北方的罕见冬候鸟。",
    morphology: "体大而圆,通体白色缀黑褐横斑,虹膜金黄,跗跖被羽,翅展可达一米半。",
    habitat: "繁殖于北极苔原,越冬于开阔草原、湿地与机场旷地,昼行性。",
    distribution: "环北极繁殖,冬季南迁至加拿大与欧亚大陆北部,偶见于中国北方。",
    conservation: "VU",
    tags: ["观赏鸟类", "国家二级保护"],
  },
  {
    rank: "order",
    latin: "Psittaciformes",
    chinese: "鹦形目",
    parent: "Aves",
    description:
      "鹦形目为攀禽,喙强劲可左右碾磨种子,对趾足善攀,舌肉质灵活,鸣叫与模仿能力突出,分布泛热带,含三百余种。",
  },
  {
    rank: "family",
    latin: "Psittaculidae",
    chinese: "鹦鹉科",
    parent: "Psittaciformes",
    description:
      "鹦鹉科为旧大陆鹦鹉类,尾形多变,求偶喂食行为复杂,包含虎皮鹦鹉、玫瑰鹦鹉与情侣鹦鹉等,是观赏鸟贸易的主体类群。",
  },
  {
    rank: "genus",
    latin: "Melopsittacus",
    chinese: "虎皮鹦鹉属",
    parent: "Psittaculidae",
    description:
      "虎皮鹦鹉属为单型属,原产澳洲内陆,游牧性强,是世界上饲养最普遍的笼鸟,亦为发声学习研究的模式鸟类。",
  },
  {
    rank: "species",
    latin: "Melopsittacus undulatus",
    chinese: "虎皮鹦鹉",
    authority: "(Shaw, 1805)",
    parent: "Melopsittacus",
    description:
      "虎皮鹦鹉原产澳大利亚内陆,是世界上最普及的笼养观赏鸟,也是鸟类发声学习研究的经典模型,经百余年选育形成数百种羽色品系。野生种群游牧性极强,随降雨与草籽丰歉大群迁徙,在水源附近可聚成数万只的鸟群,是干旱内陆生态的指示物种。",
    morphology: "体长约十八厘米,尾长,原种背部黄绿具黑横纹,喉部具小紫斑,人工品系羽色繁多。",
    habitat: "栖息于澳洲干旱内陆的疏林草原与灌丛,高度依赖水源,游牧性强。",
    distribution: "原产并遍及澳大利亚内陆干旱区;全球广泛笼养并在部分地区逃逸建群。",
    conservation: "LC",
    tags: ["观赏鸟类", "模式生物"],
  },
  {
    rank: "genus",
    latin: "Anser",
    chinese: "雁属",
    parent: "Anatidae",
    description:
      "雁属为中大型雁类,喙缘具细齿,颈中等长,迁徙时列队飞行,鸣声洪亮,包含鸿雁、豆雁与白额雁等,是雁形目的模式属之一。",
  },
  {
    rank: "species",
    latin: "Anser cygnoides",
    chinese: "鸿雁",
    authority: "(Linnaeus, 1758)",
    parent: "Anser",
    description:
      "鸿雁是东亚特有的雁类,中国家鹅的野生祖先,颈部修长前倾,喙基至上枕具一道白色细纹。繁殖于蒙古与中国东北,在长江中下游越冬,迁徙时列人字形长队、鸣声嘹亮,是古诗文中雁意象的原型。受湿地围垦与狩猎影响,种群持续下降,被 IUCN 列为易危。",
    morphology: "体灰褐色,颈长而前倾,自喙基至头后具白色细线,雄鸟上喙基具瘤状突。",
    habitat: "繁殖于草原与草甸湿地湖泊,越冬于大型湖泊、河滩与沿海滩涂。",
    distribution: "繁殖于蒙古、中国东北与俄罗斯东南部,越冬于长江中下游及华东沿海。",
    conservation: "VU",
    tags: ["驯化祖先"],
  },
  {
    rank: "genus",
    latin: "Syrmaticus",
    chinese: "长尾雉属",
    parent: "Phasianidae",
    description:
      "长尾雉属为亚洲东部特有雉类,雄鸟尾羽极长,雌鸟体色隐晦,地栖而夜宿树上,含白冠长尾雉、白颈长尾雉等珍稀种。",
  },
  {
    rank: "species",
    latin: "Syrmaticus reevesii",
    chinese: "白冠长尾雉",
    authority: "(Gray, 1829)",
    parent: "Syrmaticus",
    description:
      "白冠长尾雉为中国中部山地特有雉类,雄鸟尾羽可逾一米,古人取其翎羽为武冠装饰,戏曲中的雉翎即源于此。栖于山地常绿阔叶林与针阔混交林,地栖受惊时骤然垂直起飞。因栖息地破碎化与盗猎,分布区大幅收缩,被 IUCN 列为濒危。",
    morphology: "雄鸟通体金黄具黑缘鳞斑,尾羽极长而具黑白横斑;雌鸟黄褐杂斑,尾短。",
    habitat: "栖息于中低山地的针阔混交林与林缘灌丛,夜宿树上,昼间地面觅食。",
    distribution: "特产于中国华中与西南山区,包括河南、湖北、陕西及贵州等地。",
    conservation: "EN",
    tags: ["中国特有", "观赏鸟类"],
  },
  {
    rank: "genus",
    latin: "Asio",
    chinese: "耳鸮属",
    parent: "Strigidae",
    description:
      "耳鸮属为中型夜行鸮类,具直立的耳羽簇,面盘发达,全球分布,捕食鼠类,含长耳鸮与短耳鸮,巢多侵占他鸟旧巢。",
  },
  {
    rank: "species",
    latin: "Asio otus",
    chinese: "长耳鸮",
    authority: "(Linnaeus, 1758)",
    parent: "Asio",
    description:
      "长耳鸮为广布于北半球的夜行性鸮类,面盘狭长,耳羽簇长而直立,不自营巢而侵占鸦科旧巢。夜间捕食小型啮齿类,常将整鼠吞下再吐出骨毛食丸,冬季成群栖于城市园林,以食丸分析为基础的猛禽食性研究多以其为材料。",
    morphology: "体中型,橙黄色面盘周缘具黑纹,耳羽簇竖立,虹膜橙黄,体色黄褐杂深纹。",
    habitat: "栖息于针叶林与混交林,越冬时昼间集群栖于城镇树木密丛,夜出捕食。",
    distribution: "繁殖于欧亚大陆与北美北部,越冬南移,中国南北均可见。",
    conservation: "LC",
    tags: ["国家二级保护"],
  },

  // ===================== 哺乳纲(食肉目/鲸目/鳞甲目/兔形目/偶蹄目) =====================
  {
    rank: "species",
    latin: "Panthera uncia",
    chinese: "雪豹",
    authority: "(Schreber, 1775)",
    parent: "Panthera",
    description:
      "雪豹是中亚高山带的顶级食肉动物,栖于海拔三至五千米的雪线附近,被誉为雪山之王。毛被厚密、尾粗长,善跳跃攀岩,以岩羊等山地有蹄类为食。因盗猎、栖息地退化与气候变暖,全球种群估计不足万只,被 IUCN 列为易危,中国是其最重要的分布国。",
    morphology: "体灰白缀黑色玫瑰斑,毛被厚密,尾长近体长,四肢粗短,足垫宽大被毛。",
    habitat: "栖息于高山裸岩、草甸与流石滩,夏季上移至雪线,冬季降至谷地林缘。",
    distribution: "分布于中亚十二国的高山,以青藏高原及周边山系为核心。",
    conservation: "VU",
    ncbiTaxId: 29074,
    tags: ["国家一级保护"],
  },
  {
    rank: "genus",
    latin: "Neofelis",
    chinese: "云豹属",
    parent: "Felidae",
    description:
      "云豹属为亚洲热带森林猫类,体具云朵状斑纹,犬齿比例居猫科之冠,树栖性强,含云豹与巽他云豹两种,均属受胁物种。",
  },
  {
    rank: "species",
    latin: "Neofelis nebulosa",
    chinese: "云豹",
    authority: "(Griffith, 1821)",
    parent: "Neofelis",
    description:
      "云豹得名于体侧云朵状大块斑纹,是现生猫科中犬齿比例最长者,有现代剑齿虎之称。栖于南亚至东亚的热带与亚热带常绿林,树栖性极强,能倒挂攀行,捕食猴类与小型鹿类。因毛皮贸易与森林砍伐,种群数十年来锐减,在中国属国家一级保护动物。",
    morphology: "体黄褐色具黑边云状斑,犬齿发达,尾长而粗,四肢短壮,脚掌宽大。",
    habitat: "栖息于原始常绿阔叶林与季雨林,树栖性强,多于夜间与晨昏活动。",
    distribution: "分布于喜马拉雅南麓至东南亚,及中国华南、西南山地。",
    conservation: "VU",
    tags: ["国家一级保护"],
  },
  {
    rank: "genus",
    latin: "Lynx",
    chinese: "猞猁属",
    parent: "Felidae",
    description:
      "猞猁属为北方中型猫科,尾极短,耳尖具黑色簇毛,足掌宽大善雪行,主捕兔类,含欧亚猞猁、加拿大猞猁与伊比利亚猞猁等四种。",
  },
  {
    rank: "species",
    latin: "Lynx lynx",
    chinese: "猞猁",
    authority: "(Linnaeus, 1758)",
    parent: "Lynx",
    description:
      "猞猁为欧亚大陆北方针叶林带的中型猫科动物,耳尖黑色簇毛与短尾是其显著特征。独居,主捕野兔与啮齿类,种群随猎物数量呈周期波动,宽大足掌便于雪地行走。在中国见于东北与西北山地,属国家二级保护动物。",
    morphology: "体灰棕色杂黑斑,耳尖具黑色簇毛,尾极短而钝,颊毛下垂,足掌宽大。",
    habitat: "栖息于寒温带针叶林、混交林与多岩山地,独居,领域性强。",
    distribution: "广布于欧亚大陆北部森林带,中国见于东北、新疆与青藏高原东部。",
    conservation: "NT",
    tags: ["国家二级保护"],
  },
  {
    rank: "genus",
    latin: "Ursus",
    chinese: "熊属",
    parent: "Ursidae",
    description:
      "熊属为熊科模式属,体型大,分布横跨欧亚大陆与北美,含棕熊、北极熊、亚洲黑熊与美洲黑熊等,杂食性,高纬种群具蛰伏习性。",
  },
  {
    rank: "species",
    latin: "Ursus arctos",
    chinese: "棕熊",
    authority: "Linnaeus, 1758",
    parent: "Ursus",
    description:
      "棕熊是分布最广的陆生大型食肉动物之一,横跨欧亚大陆与北美,包含多个地理亚种,如科迪亚克棕熊与青藏高原的藏马熊。杂食性,秋季大量采食浆果与鲑鱼以蓄积冬脂,冬季蛰伏半眠。中国西部的青藏亚种为高原特有棕熊,列为国家二级保护动物。",
    morphology: "体形粗壮,肩部隆起,毛色自深褐至金黄多变,颜面部中央凹陷,爪长而弯不可缩。",
    habitat: "栖息于山地森林、苔原与高原草甸,领域广,冬季具蛰伏半眠习性。",
    distribution: "欧亚大陆与北美北部广布,中国见于东北、西北与青藏高原。",
    conservation: "LC",
    ncbiTaxId: 9644,
    tags: ["国家二级保护"],
  },
  {
    rank: "species",
    latin: "Ursus maritimus",
    chinese: "北极熊",
    authority: "Phipps, 1774",
    parent: "Ursus",
    description:
      "北极熊是熊科中最大的陆生食肉动物,为适应海冰生活而体披厚密白毛、皮下脂肪厚实,主要捕食环斑海豹。依赖海冰作为捕猎平台,随夏季海冰消退被迫长距离游泳与上岸禁食,被 IUCN 列为易危,是气候变化影响大型哺乳动物的标志性物种。",
    morphology: "体长可达三米,毛色白而中空半透明,耳小颈长,足掌宽大具防滑粗垫。",
    habitat: "栖息于北冰洋沿岸浮冰带与冰缘水域,母子于陆缘雪堆掘穴越冬产仔。",
    distribution: "环北冰洋分布,涉及加拿大、格陵兰、挪威、俄罗斯与美国阿拉斯加。",
    conservation: "VU",
    ncbiTaxId: 29073,
  },
  {
    rank: "species",
    latin: "Ursus thibetanus",
    chinese: "亚洲黑熊",
    authority: "G. Cuvier, 1823",
    parent: "Ursus",
    description:
      "亚洲黑熊因胸前新月形白斑而称月熊,栖于南亚至东亚的山地森林,杂食性强,以坚果、浆果、昆虫与动物尸体为食。传统药材熊胆的需求曾催生活熊取胆产业,给种群带来深重伤害。受盗猎与栖息地破碎化威胁,被 IUCN 列为易危,在中国属国家二级保护动物。",
    morphology: "体黑亮,胸前具白色新月形斑,耳圆而大,肩部无隆起,爪弯长适于攀树。",
    habitat: "栖息于中低山常绿阔叶林与针阔混交林,善攀树,高纬种群冬季有蛰伏习性。",
    distribution: "分布于南亚、东亚至东北亚山地,包括中国大部分林区。",
    conservation: "VU",
    tags: ["药用", "国家二级保护"],
  },
  {
    rank: "genus",
    latin: "Helarctos",
    chinese: "马来熊属",
    parent: "Ursidae",
    description:
      "马来熊属为单型属,现生体型最小的熊类,胸前具马蹄形斑,舌极长适于舔食蚁蜜,栖于东南亚雨林,盗捕与毁林使其种群受胁。",
  },
  {
    rank: "species",
    latin: "Helarctos malayanus",
    chinese: "马来熊",
    authority: "(Raffles, 1822)",
    parent: "Helarctos",
    description:
      "马来熊是现生体型最小的熊类,体重常不足七十公斤,胸前具马蹄形黄白斑,舌特别长,便于舔食蜂巢与蚁穴。栖于东南亚热带雨林,杂食而偏果食性,树栖性强。因森林砍伐与盗捕入药,全球种群下降,被 IUCN 列为易危,在中国属国家一级保护动物。",
    morphology: "体小而粗短,毛短黑亮,胸前具 U 形橙黄斑,舌极长,趾向内弯适于攀爬。",
    habitat: "栖息于低地与山地热带雨林,树栖性强,昼间活动,夜宿树上。",
    distribution: "分布于东南亚大陆与岛屿,北限至中国云南与西藏南缘。",
    conservation: "VU",
    tags: ["国家一级保护"],
  },
  {
    rank: "family",
    latin: "Lipotidae",
    chinese: "白鱀豚科",
    parent: "Cetacea",
    description:
      "白鱀豚科为长江特有淡水齿鲸支系,分化历史逾两千万年,与其他淡水豚类亲缘疏远,现唯一种已属功能性灭绝,是鲸类演化中独特的孑遗。",
  },
  {
    rank: "genus",
    latin: "Lipotes",
    chinese: "白鱀豚属",
    parent: "Lipotidae",
    description:
      "白鱀豚属为单型属,吻狭长,额隆圆隆,视力退化而回声定位发达,适于浑浊江水,唯一种白鱀豚或已功能性灭绝。",
  },
  {
    rank: "species",
    latin: "Lipotes vexillifer",
    chinese: "白鱀豚",
    authority: "Miller, 1918",
    parent: "Lipotes",
    description:
      "白鱀豚为长江特有的淡水齿鲸,自古被称作长江女神,营家族群生活,依靠回声定位在浑浊江水中捕食鱼类。因航运撞击、渔具误捕、水利工程与污染,种群自二十世纪后期崩溃,2002 年后再无活体确证,2007 年被宣布功能性灭绝,是鲸类保护史上最惨痛的教训。",
    morphology: "体纺锤形,背面青灰、腹面白色,吻狭长上翘,额隆圆隆,背鳍低矮,眼极小。",
    habitat: "栖息于长江干流沙洲间的流水区,常成对或小群活动,呼吸时露出背鳍。",
    distribution: "特产于中国长江中下游干流,历史上洞庭湖与鄱阳湖亦有分布。",
    conservation: "CR",
    tags: ["国家一级保护", "中国特有"],
  },
  {
    rank: "order",
    latin: "Pholidota",
    chinese: "鳞甲目",
    parent: "Mammalia",
    description:
      "鳞甲目即穿山甲类,全身覆角蛋白鳞甲,无齿而舌长,专食蚁类,分为亚洲与非洲共三属八种,全部处于受胁状态,为全球非法贸易量最大的哺乳动物类群。",
  },
  {
    rank: "family",
    latin: "Manidae",
    chinese: "穿山甲科",
    parent: "Pholidota",
    description:
      "穿山甲科为鳞甲目唯一科,遇敌蜷成球状,前爪掘穴,胎数少而育儿精细,含亚洲四种与非洲四种,甲片药用需求令种群全面受胁。",
  },
  {
    rank: "genus",
    latin: "Manis",
    chinese: "穿山甲属",
    parent: "Manidae",
    description:
      "穿山甲属为亚洲穿山甲类,耳侧位,尾下裸面宽大,含中华穿山甲、马来穿山甲与印度穿山甲等,均因盗猎而种群锐减。",
  },
  {
    rank: "species",
    latin: "Manis pentadactyla",
    chinese: "中华穿山甲",
    authority: "Linnaeus, 1758",
    parent: "Manis",
    description:
      "中华穿山甲全身覆瓦状鳞甲,遇敌蜷成球状,以细长粘舌专食白蚁与蚂蚁,一只成年个体年食蚁数万窝,有森林卫士之称。甲片入药与野味消费致百年猎捕,中国种群崩减逾九成,是全球非法贸易量最大的哺乳动物之一,现列为国家一级保护动物,IUCN 评为极危。",
    morphology: "体背与体侧覆重叠鳞甲,鳞间夹毛,吻尖无齿,舌长可逾体长,前爪粗壮适于掘穴。",
    habitat: "栖息于中低山森林与灌丛,穴居夜行,善攀树,领域性弱。",
    distribution: "分布于中国华南、西南及南亚次大陆北部与中南半岛北部。",
    conservation: "CR",
    tags: ["国家一级保护", "药用"],
  },
  {
    rank: "order",
    latin: "Lagomorpha",
    chinese: "兔形目",
    parent: "Mammalia",
    description:
      "兔形目为上颌具两对门齿的草食哺乳类,与啮齿目互为姊妹群,含兔科与鼠兔科两科,广布全球,许多种类种群呈剧烈周期波动。",
  },
  {
    rank: "family",
    latin: "Leporidae",
    chinese: "兔科",
    parent: "Lagomorpha",
    description:
      "兔科为长耳、后肢强健的跳跃型兔类,穴居或地面活动,繁殖力强,含穴兔、草兔与棉尾兔等属,温带与寒带广布。",
  },
  {
    rank: "genus",
    latin: "Oryctolagus",
    chinese: "穴兔属",
    parent: "Leporidae",
    description:
      "穴兔属为单型属,群居掘洞穴系统,是家兔的野生祖先,亦为免疫学与生殖生物学的经典实验动物。",
  },
  {
    rank: "species",
    latin: "Oryctolagus cuniculus",
    chinese: "穴兔",
    authority: "(Linnaeus, 1758)",
    parent: "Oryctolagus",
    description:
      "穴兔原产伊比利亚半岛与北非,是唯一被驯化为家兔的野生种,数百年选育形成肉用、毛用与观赏等众多品系。群居,掘复杂洞穴系统,繁殖力极强,兔瘟与黏液瘤病流行令欧洲野生种群大减。在澳洲等地成为著名入侵种,同时也是免疫学与生殖生物学的经典模式生物。",
    morphology: "体灰褐色,耳长直立,后腿长善跳跃,尾短而上面白色,幼兔生于盲穴中,被毛闭眼。",
    habitat: "群居于具黏土层的疏林草地与灌丛,掘洞穴系统共居,晨昏活动。",
    distribution: "原产伊比利亚半岛与北非;驯化后随人类遍布全球并在多地野化。",
    conservation: "NT",
    ncbiTaxId: 9986,
    tags: ["模式生物", "驯化祖先", "入侵物种"],
  },
  {
    rank: "genus",
    latin: "Cervus",
    chinese: "鹿属",
    parent: "Cervidae",
    description:
      "鹿属为鹿科模式属,雄性具分叉的实角并周期性脱落再生,含梅花鹿、马鹿与白臀鹿等,鹿茸入药的经济利用历史深远。",
  },
  {
    rank: "species",
    latin: "Cervus nippon",
    chinese: "梅花鹿",
    parent: "Cervus",
    description:
      "梅花鹿夏毛红棕、缀白斑如梅花点,雄鹿具四叉鹿角,每年脱落再生,是鹿角周期研究的经典对象。原产东亚,日本种群庞大,中国大陆野生种群稀少而斑块化。鹿茸、鹿角入药历史逾千年,催生庞大养殖产业,是食药两用与野外保护并存的典型经济物种。",
    morphology: "夏毛红棕具成行白斑,冬毛灰褐无斑,雄鹿具分叉茸角,泪窝发达,尾短。",
    habitat: "栖息于林缘草地与山地森林,晨昏活动,群居,冬季常集成大群。",
    distribution: "分布于东亚,包括中国东北、华南的残留种群与日本、俄罗斯远东。",
    conservation: "LC",
    tags: ["药用", "经济物种"],
  },
  {
    rank: "genus",
    latin: "Vulpes",
    chinese: "狐属",
    parent: "Canidae",
    description:
      "狐属为体型中小的犬科动物,耳尖吻长、尾蓬松,食性杂,适应力极强,含赤狐、沙狐与藏狐等十余种,遍及各大洲。",
  },
  {
    rank: "species",
    latin: "Vulpes vulpes",
    chinese: "赤狐",
    authority: "(Linnaeus, 1758)",
    parent: "Vulpes",
    description:
      "赤狐是分布最广的野生犬科动物,跨越整个北半球并被引入澳洲。食性极杂,捕食鼠、兔、鸟类,亦食果实与腐物,以贮藏食物的行为与狡黠智慧著称,是东西方民间文化中狐形象的原型。俄罗斯银狐驯化实验以其为材料,揭示了温顺性状的发育与选择机制。",
    morphology: "体锈红色,背部深而腹面白,耳尖黑色,尾长蓬松、尖端白色,体型似中型犬。",
    habitat: "栖息环境极为广泛,自苔原、森林、草原至城市郊区,掘穴而昼伏夜行。",
    distribution: "遍布北半球大陆,并人为引入澳洲;中国各地均有分布。",
    conservation: "LC",
  },
  {
    rank: "family",
    latin: "Bovidae",
    chinese: "牛科",
    parent: "Artiodactyla",
    description:
      "牛科为具洞角的反刍有蹄类,角由骨质角心与角鞘构成且终生不脱,含羚羊、山羊、绵羊与牛等约五十属,是偶蹄目中最大的科。",
  },
  {
    rank: "genus",
    latin: "Pantholops",
    chinese: "藏羚属",
    parent: "Bovidae",
    description:
      "藏羚属为青藏高原特有单型属,鼻腔膨大适应高原缺氧,底绒极细,集群作长距离迁徙,经反盗猎保护后种群回升。",
  },
  {
    rank: "species",
    latin: "Pantholops hodgsonii",
    chinese: "藏羚",
    authority: "(Abel, 1826)",
    parent: "Pantholops",
    description:
      "藏羚为青藏高原特有有蹄类,因底绒极细、可织沙图什披肩而在二十世纪末遭疯狂盗猎,种群从逾百万只锐减至不足十万。经武装反盗猎与保护区网络建设,种群已回升至约三十万只,2016 年由濒危降为近危,是国际保护合作的标志性成功案例。",
    morphology: "体棕黄色,腹部白色,雄羊角长而直、后弯呈竖琴状,鼻腔膨大适应缺氧。",
    habitat: "栖息于海拔四千米以上的高原草甸与荒漠,作长距离迁徙产仔。",
    distribution: "特产于青藏高原,集中于羌塘、可可西里与三江源保护区群。",
    conservation: "NT",
    tags: ["国家一级保护"],
  },
];
