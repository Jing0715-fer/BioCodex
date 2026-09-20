import { TaxonSeed } from "../types";

// 棘皮动物门深扩充种子数据(Task 6-a 重试 expansion4)。
// 主题:棘皮动物 22 物种 —— 海星纲 7(蓝指海星/面包海星/粒皮海星/飞白枫海星/海燕/棘冠海星/砂海星)、
// 海胆纲 5(刺冠海胆/白棘三列海胆/喇叭毒棘海胆/心形海胆/光棘球海胆)、
// 海参纲 6(梅花参/绿刺参/玉足海参/黑乳参/糙海参/海地瓜)、
// 蛇尾纲 2(滩栖阳遂足/脆蛇尾)、海百合纲 2(日本海羊齿/圆等海百合,纲级新建)。
// 每个物种均含 5 项科学档案字段(etymology / discovery / genomeInfo / ecologyRole / researchValue)。
// species 的 parent 引用两类来源:
//   1) DB 已有分类单元(/tmp/taxa-inventory.tsv,2018 条):
//      Echinodermata(棘皮动物门)/ Asteroidea(海星纲)/ Echinoidea(海胆纲)/ Holothuroidea(海参纲)/
//      Ophiuroidea(蛇尾纲)/ Camarodonta(拱齿目)/ Strongylocentrotidae(球海胆科)/
//      Aspidochirotida(楯手目)/ Stichopodidae(刺参科);
//   2) 本文件内先行定义的新中间阶元(1 纲 / 5 目 / 11 科 / 20 属,共 37 条)。
// 查重已跳过清单已有单元:多棘海盘车、紫海胆、马粪海胆、仿刺参、萨氏真蛇尾;
// 候补「紫海胆 Heliocidaris crassispina」因中文名与清单 Strongylocentrotus purpuratus(紫海胆)重名,
// 依「拉丁+中文双查」规则改用替补:光棘球海胆、喇叭毒棘海胆。
// 与并行文件 expansion4-worms-sponges / molluscs / cryptogams / arthropods2 的拉丁名已粗查零重复。
export const expansion4Echinoderms: TaxonSeed[] = [
  // ===================== 一、海百合纲 Crinoidea(新建,挂 Echinodermata,2 种) =====================
  {
    rank: "class",
    latin: "Crinoidea",
    chinese: "海百合纲",
    parent: "Echinodermata",
    description:
      "海百合纲是现存最古老的棘皮动物类群,现生约六百余种,分深海固着的有柄海百合与无柄的羽枝类海羊齿两型,口面向上、腕分枝成羽状,滤食浮游生物,化石记录逾四亿年。",
  },
  {
    rank: "genus",
    latin: "Oxycomanthus",
    chinese: "海羊齿属",
    parent: "Crinoidea",
    description:
      "海羊齿属为无柄羽枝类海百合,体盘小而腕多细,腕侧生羽枝,以卷枝临时附着于礁石与海绵上,夜间伸展腕枝滤食,含日本沿岸发育生物学研究最多的日本海羊齿。",
  },
  {
    rank: "species",
    latin: "Oxycomanthus japonicus",
    chinese: "日本海羊齿",
    parent: "Oxycomanthus",
    description:
      "日本海羊齿是日本本州沿岸礁坡常见的羽枝类海百合,以卷枝附着海绵与礁石,夜间张开数十条羽腕滤食浮游生物。其产卵同步、胚胎透明,百余年来一直是海百合发育研究的经典材料;化石近亲遍布中生代海相地层,故常被视为棘皮动物中「活化石」式的代表。",
    morphology: "体盘小,腕数十条细长分枝,各腕两侧列生羽枝,基部卷枝钩状,体色黄褐带深色环纹。",
    habitat: "栖于水流适中的礁坡与礁缘,附着于海绵、石面与缆绳等基质,避强光,夜间活动。",
    distribution: "西北太平洋日本本州沿岸至九州,相模湾等地最常见,黄海深水亦有零星记录报道。",
    etymology:
      "属名 Oxycomanthus 由 oxys(尖锐)与旧属名 Comanthus 复合而成,指细长腕枝;种加词 japonicus 意为日本的,指模式产地。",
    discovery:
      "该种依日本沿岸标本定名,长期置于 Comanthus 属内,后经腕枝与卷枝形态比较移入现属;因相模湾易采且产卵量大,自二十世纪初即为海百合胚胎学的标准材料。",
    genomeInfo:
      "全基因组测序尚待完善,已有胚胎转录组与发育基因研究;海百合被视为了解棘皮动物祖先基因组与后口动物起源的关键类群。",
    ecologyRole:
      "礁坡固着滤食者,夜间滤取浮游生物与有机碎屑,种群密度可反映水团输送与沿岸初级生产力状况。",
    researchValue:
      "海百合发育与再生研究的模式种,用于探讨后口动物体轴决定与纤毛运动,亦为古生物学者校准海百合化石演化的现生参照。",
    tags: ["模式生物"],
  },
  {
    rank: "genus",
    latin: "Metacrinus",
    chinese: "等海百合属",
    parent: "Crinoidea",
    description:
      "等海百合属为具长茎柄的深海海百合,以柔软分节茎柄固着于硬底,冠部五出腕枝杯状开展,滤食浮游物,现生种分布于西太平洋与印度洋陆坡深水,含日本研究最详的圆等海百合。",
  },
  {
    rank: "species",
    latin: "Metacrinus rotundus",
    chinese: "圆等海百合",
    parent: "Metacrinus",
    description:
      "圆等海百合是日本相模湾等陆坡深水的具柄海百合,以可弯曲的长茎柄固着岩底,冠部腕枝反复分枝、夜间摆动滤食。茎柄受敌或受损可断落再生,再生能力惊人;近缘类群化石常整株保存于地层,使其兼为深海生物学与海百合演化研究的双重样本。",
    morphology: "茎柄细长分节,顶端冠部碗状,五腕羽状多分枝,冠径可达二十厘米,体色浅黄至橙褐。",
    habitat: "栖于一百至数百米深的陆坡岩底与碎石坡,以卷枝钩附基质,避强流处伸展滤食。",
    distribution: "西北太平洋日本本州沿岸陆坡,相模湾、骏河湾与土佐湾等均有长期采集记录。",
    etymology:
      "属名 Metacrinus 意为「在海百合之后」,指其与古生代海百合的承继关系;种加词 rotundus 意为圆形的,指冠部轮廓浑圆。",
    discovery:
      "十九世纪后期深水拖网调查兴起后依日本近海标本建立并记述;此后相模湾的长期采集与深潜观察使其成为研究最详的现生具柄海百合之一。",
    genomeInfo:
      "具柄海百合基因组测序尚在起步,已有线粒体基因组与茎柄发育相关研究;其茎柄节片形成机制受再生生物学关注。",
    ecologyRole:
      "深海固着滤食者,清除悬浮有机物并为底层群落提供结构;幼体阶段性漂浮扩散,种群常呈斑块状分布。",
    researchValue:
      "茎柄自切与再生研究的模式,其节片发生过程常与脊椎动物体节发生作比较,亦是深海生态与古生物交叉研究的展示种。",
    tags: ["深海物种"],
  },

  // ===================== 二、蛇尾纲 Ophiuroidea(清单已有纲,2 种) =====================
  {
    rank: "family",
    latin: "Amphiuridae",
    chinese: "阳遂足科",
    parent: "Ophiuroidea",
    description:
      "阳遂足科为穴居型蛇尾,盘小腕细,腕棘退化,潜居沙泥底管穴内,仅伸腕枝于穴口收集碎屑,种数逾二百,是软底底栖群落生物量的重要组成。",
  },
  {
    rank: "genus",
    latin: "Amphiura",
    chinese: "阳遂足属",
    parent: "Amphiuridae",
    description:
      "阳遂足属为典型穴居小型蛇尾,盘径常不足一厘米,腕细长无粗棘,深潜沙泥中筑 U 形穴道,夜间伸出数条腕枝扫集沉积物表面有机质为食。",
  },
  {
    rank: "species",
    latin: "Amphiura vadicola",
    chinese: "滩栖阳遂足",
    parent: "Amphiura",
    description:
      "滩栖阳遂足是中国沿岸潮间带与浅海泥沙底的优势底栖动物,盘微小、腕细长,穴居深十余厘米的管穴,仅伸腕枝收集表层碎屑。在黄渤海与东海软底,其密度常居大型底栖动物前列,生物扰动与碎屑周转作用显著;是底栖生态学与污染监测中最常引用的指示种之一。",
    morphology: "盘径仅数毫米,腕长可达盘径数倍,腕细而柔,背面光滑无粗棘,体色灰白至淡褐。",
    habitat: "穴居潮间带至数十米浅海的软泥与砂泥底,退潮时深埋滩面之下,穴道与表面相通。",
    distribution: "西太平洋中国渤海、黄海、东海与南海北部沿岸,亦见于日本与朝鲜半岛近岸软底。",
    etymology:
      "属名 Amphiura 源自 amphi(两侧)与 oura(尾),指两侧细长的腕;种加词 vadicola 意为栖于浅滩,指滩涂栖生习性。",
    discovery:
      "依东亚沿岸滩涂标本定名,二十世纪中国海洋调查发现其为黄渤海泥沙底栖群落的优势种,此后大量见于底栖生态与污染生物学报告。",
    genomeInfo:
      "分子资源尚少,已有用于底栖群落结构分析的种群数据;其低氧耐受与穴居生理研究仍以形态与行为观察为主。",
    ecologyRole:
      "软底碎屑食者与生物扰动者,翻耕沉积物促进有机质矿化,位居底栖食物链中间环节,群落生物量占比可观。",
    researchValue:
      "中国海洋大型底栖动物监测与群落健康评价的标志种,广泛用于富营养化与沉积物污染的生物监测评估。",
    tags: ["环境指示种"],
  },
  {
    rank: "family",
    latin: "Ophiothricidae",
    chinese: "刺蛇尾科",
    parent: "Ophiuroidea",
    description:
      "刺蛇尾科为表栖型蛇尾,盘与腕覆细刺或细鳞,腕棘发达成列,多聚群于礁石、海绵与藻丛间悬腕滤食,种类多数量大,是浅海底栖群落的优势蛇尾类群。",
  },
  {
    rank: "genus",
    latin: "Ophiothrix",
    chinese: "刺蛇尾属",
    parent: "Ophiothricidae",
    description:
      "刺蛇尾属为浅海常见表栖蛇尾,盘背被细刺,腕长而柔,腕棘成对排列,体色多变常带鲜明斑纹,悬腕于水流中捕食浮游颗粒,遇险极易断腕。",
  },
  {
    rank: "species",
    latin: "Ophiothrix fragilis",
    chinese: "脆蛇尾",
    authority: "(Linnaeus, 1758)",
    parent: "Ophiothrix",
    description:
      "脆蛇尾是东北大西洋最常见的蛇尾,体色自橙红至灰褐带斑纹,遇敌时腕极易自切断落而得名。常成千上万聚集成「蛇尾床」,悬腕滤食浮游生物,单平方米密度可达数千条;其种群动态与再生能力研究使它成为蛇尾类中引用最多的模式种。",
    morphology: "盘径约一厘米,五腕细长,腕棘成对如梳,盘背覆细刺,体色橙红、灰紫或花斑多变。",
    habitat: "栖于岩石、砾石与海绵藻丛表面,喜中等水流,常高密度聚群,夜间觅食活动增强。",
    distribution: "东北大西洋自挪威至地中海与北非沿岸,北海与英吉利海峡的聚群床最为著名。",
    etymology:
      "属名 Ophiothrix 由 ophis(蛇)与 thrix(毛刺)构成,指腕上毛状细棘;种加词 fragilis 意为脆的,指腕极易自切脱落。",
    discovery:
      "林奈 1758 年即已描述,是蛇尾类最早定名的种之一;十九世纪末其聚群床生态引起关注,现仍是欧洲底栖生态研究最多的蛇尾。",
    genomeInfo:
      "已有线粒体基因组与微卫星等分子标记,全基因组资源尚在建设;北海与英吉利海峡种群遗传结构研究较系统。",
    ecologyRole:
      "悬浮食者,聚群床可将水体浮游生物大量固定到底域,是底栖与水体物质耦合的关键环节,亦为多种鱼类饵料。",
    researchValue:
      "蛇尾再生、集群生态与种群遗传的经典研究种,用于海洋保护区效果评估与气候波动影响监测。",
    tags: ["模式生物"],
  },

  // ===================== 三、海胆纲 Echinoidea(清单已有纲,5 种) =====================
  {
    rank: "order",
    latin: "Diadematoida",
    chinese: "冠海胆目",
    parent: "Echinoidea",
    description:
      "冠海胆目为正形海胆,壳薄而大棘细长中空、常带毒性,管足发达,多为夜行性礁栖种,含刺冠海胆等珊瑚礁区大型种类,对礁区生物侵蚀影响显著。",
  },
  {
    rank: "family",
    latin: "Diadematidae",
    chinese: "冠海胆科",
    parent: "Diadematoida",
    description:
      "冠海胆科壳薄径大,大棘细长尖锐且常与毒腺关联,昼伏夜出,广布热带珊瑚礁,成体长棘可逾二十厘米,是礁区生物侵蚀与群落调控的重要因素。",
  },
  {
    rank: "genus",
    latin: "Diadema",
    chinese: "刺冠海胆属",
    parent: "Diadematidae",
    description:
      "刺冠海胆属为大型礁栖海胆,壳薄而大棘极长,反口面常具特征性蓝紫辉光点,夜间成群觅食藻类,白天藏于礁缝,含珊瑚礁区最著名的刺冠海胆。",
  },
  {
    rank: "species",
    latin: "Diadema setosum",
    chinese: "刺冠海胆",
    authority: "(Leske, 1778)",
    parent: "Diadema",
    description:
      "刺冠海胆是印度-西太平洋珊瑚礁最具标志性的长棘海胆,黑色长棘可逾二十厘米,反口面围肛区具醒目的蓝橙光环。白天隐匿礁缝,夜间成群啃食底栖藻类;在礁区与食草鱼类共同压制藻类蔓延,其牧食对珊瑚礁稳态至关重要。近缘种曾在加勒比海大规模死亡并引发礁区藻化,警示意义深远。",
    morphology: "壳径可达十余厘米,长棘黑而尖锐,反口面具五辐蓝橙辉光环,管足细长吸附力强。",
    habitat: "栖于珊瑚礁与岩礁的礁缝、洞穴与礁坪,白天隐蔽,夜间迁移觅食,常成小群活动。",
    distribution: "印度-西太平洋热带海域,自红海、东非至日本南部、澳洲大堡礁与中国南海诸岛。",
    etymology:
      "属名 Diadema 意为冠冕,指长棘环列如冠;种加词 setosum 意为刚毛密布的,指细长棘刺丛生。",
    discovery:
      "1778 年莱斯克依东南亚标本定名;二十世纪中叶以来其群体消长对珊瑚礁群落的影响持续受生态学界关注。",
    genomeInfo:
      "全基因组测序尚在完善,已有线粒体基因组与群体遗传研究;其发达的先天免疫基因家族为礁栖适应研究热点。",
    ecologyRole:
      "礁区关键牧食者,啃食大型藻类防止其遮蔽珊瑚,昼夜迁移搬运能量与营养;群体消退曾引发礁区藻化。",
    researchValue:
      "珊瑚礁稳态与生物侵蚀研究的核心种;加勒比近缘种大批死亡致礁相转变的教训使其成为生态学经典案例。",
    tags: ["生态关键种"],
  },
  {
    rank: "order",
    latin: "Spatangoida",
    chinese: "心形海胆目",
    parent: "Echinoidea",
    description:
      "心形海胆目为不规则海胆,壳心形、前缘具口缘浅凹,管足特化为掘沙与呼吸器官,不具咀嚼器官,全为内栖沙泥底的沉积食者,陆架与深海均有代表。",
  },
  {
    rank: "genus",
    latin: "Echinocardium",
    chinese: "心形海胆属",
    parent: "Spatangoida",
    description:
      "心形海胆属壳心形而略扁,反口面后部具特化的肛下花区管足,栖于细砂层内,以黏液黏砂构筑栖道与表面相通,是北方细砂滩习见的内栖海胆类。",
  },
  {
    rank: "species",
    latin: "Echinocardium cordatum",
    chinese: "心形海胆",
    authority: "(Pennant, 1777)",
    parent: "Echinocardium",
    description:
      "心形海胆是东北大西洋至西太平洋细砂底的内栖海胆,壳心形、棘短而密,在砂中斜栖约十厘米深处,栖道与滩面相通。其滤食碎屑并翻动沉积物,单个体即可搬运可观的砂量,是软底生物地球化学研究的经典对象;风暴后大量个体常被冲积于滩面而引人注目。",
    morphology: "壳心形,长可达六厘米,密布细棘,前缘口部内陷,反口面肛板偏后,体色浅褐。",
    habitat: "内栖于洁净细砂与砂泥底,自潮间带至约二百米,栖道以黏液加固并与滩面连通。",
    distribution: "东北大西洋、北海与地中海,并见于西太平洋日本与中国黄海沿岸细砂底。",
    etymology:
      "属名 Echinocardium 由 echinos(棘)与 kardia(心)构成,指心形壳;种加词 cordatum 亦意为心形的,同样指壳形。",
    discovery:
      "1777 年彭南特依英国威尔士海岸标本定名;长期作为欧洲沙质潮间带生物学的教学经典种,内栖构造研究详尽。",
    genomeInfo:
      "已有线粒体基因组等分子数据;全基因组尚未发表,其栖道构筑与低氧耐受的分子机制受关注。",
    ecologyRole:
      "沉积食者与生物扰动者,黏液栖道改变砂层通气与化学梯度,是砂滩生态系统的「生态系统工程师」。",
    researchValue:
      "内栖行为、栖道构筑与生物扰动地化研究的经典种,广泛用于砂质海岸环境监测与海洋生物学教学。",
  },
  {
    rank: "family",
    latin: "Toxopneustidae",
    chinese: "毒棘海胆科",
    parent: "Camarodonta",
    description:
      "毒棘海胆科为正形海胆,叉棘特化为葡萄状毒叉可注毒液,大棘短钝或针状,多为热带礁栖种,含白棘三列海胆等大型经济种与著名有毒花海胆类。",
  },
  {
    rank: "genus",
    latin: "Tripneustes",
    chinese: "三列海胆属",
    parent: "Toxopneustidae",
    description:
      "三列海胆属壳大而圆,大棘短钝灰白,管足长大,步带区管足成三列排布,生殖腺肥厚,是热带海域最重要的食用海胆类群,俗称白海胆类。",
  },
  {
    rank: "species",
    latin: "Tripneustes gratilla",
    chinese: "白棘三列海胆",
    authority: "(Linnaeus, 1758)",
    parent: "Tripneustes",
    description:
      "白棘三列海胆俗称白海胆,是印度-西太平洋热带浅海的大型食用海胆,壳黑紫而大棘短钝乳白,生殖腺秋季肥满、风味清甜。夏威夷、东南亚与太平洋岛民捕采历史悠久,现已发展苗种培育与网箱养殖;其在礁坪与海草床啃食藻类,牧食压力直接影响底栖群落结构。",
    morphology: "壳径可达十五厘米,大棘短钝白色,壳面黑紫,管足长而色深,顶系大而醒目。",
    habitat: "栖于珊瑚礁坪、海草床与砂砾底浅海,常藏于礁块之下或海草根部,昼间多隐蔽。",
    distribution: "印度-西太平洋热带区,自东非、红海至夏威夷与法属波利尼西亚,中国南海常见。",
    etymology:
      "属名 Tripneustes 由 tri(三)与 pneustes(呼吸器)构成,指成列的呼吸管足;种加词 gratilla 源出旧俗名,词义难考。",
    discovery:
      "1758 年林奈定名;二十世纪后期起成为热带海胆增养殖与渔业管理的重点对象,多国建立捕捞配额。",
    genomeInfo:
      "全基因组测序尚未见正式发表,已有微卫星与线粒体标记用于群体遗传与渔业资源评估。",
    ecologyRole:
      "礁坪与海草床牧食者,过度捕捞可致藻类扩散;亦是海胆与海草、珊瑚相互作用研究的焦点种。",
    researchValue:
      "热带食用海胆养殖的核心候选种,生殖腺增育与苗种放流技术较成熟,渔业资源评估研究活跃。",
    tags: ["经济物种", "食用"],
  },
  {
    rank: "genus",
    latin: "Toxopneustes",
    chinese: "毒棘海胆属",
    parent: "Toxopneustidae",
    description:
      "毒棘海胆属大棘短而似喇叭或针状,真正的危险来自花朵状毒叉,钳刺可致剧痛,含喇叭毒棘海胆等著名有毒种,俗称花海胆类,为热带礁区代表。",
  },
  {
    rank: "species",
    latin: "Toxopneustes pileolus",
    chinese: "喇叭毒棘海胆",
    authority: "(Lamarck, 1816)",
    parent: "Toxopneustes",
    description:
      "喇叭毒棘海胆俗称花海胆,是印太珊瑚礁著名的有毒海胆,大棘喇叭状膨大、粉紫如花,真正的危险来自体表花朵状毒叉,钳刺可致剧痛、麻木甚至晕厥。白天多藏礁缝,夜出啃食钙藻与附生生物;其毒液成分为神经药理学与天然产物化学的研究对象,致痛机制已被阐明。",
    morphology: "壳径可达十余厘米,大棘喇叭状先端膨大,色泽粉紫红白相间,毒叉大而似花。",
    habitat: "栖于珊瑚礁洞穴、礁缘与砂砾底,白天隐蔽于礁缝,夜间外出啃食钙藻与碎屑。",
    distribution: "印度-西太平洋热带海域,自东非至日本南部、澳洲与中国南海礁区。",
    etymology:
      "属名 Toxopneustes 由 toxon(毒)与 pneustes(呼吸器)构成,指具毒的球棘;种加词 pileolus 意为小帽,指喇叭状棘形如檐帽。",
    discovery:
      "1816 年拉马克依印度洋标本定名;二十一世纪初其毒叉毒素的致痛机制被证明作用于感觉神经离子通道。",
    genomeInfo:
      "作为有毒棘皮动物代表已有毒液蛋白组学研究;全基因组测序尚未完成,毒器官转录组是研究切入点。",
    ecologyRole:
      "礁区夜行牧食者,啃食钙藻与附生生物;鲜艳体色与毒叉构成强防御,自然天敌甚少。",
    researchValue:
      "动物毒液致痛机制与感觉神经离子通道研究的模型,亦为天然毒素筛选与镇痛药物开发的潜在来源。",
    tags: ["有毒"],
  },
  {
    rank: "genus",
    latin: "Mesocentrotus",
    chinese: "光棘球海胆属",
    parent: "Strongylocentrotidae",
    description:
      "光棘球海胆属自球海胆属分出,壳较低平,大棘粗壮光洁无细刺,分布于西北太平洋冷温带,含大连沿海传统采捕种光棘球海胆,渔业地位重要。",
  },
  {
    rank: "species",
    latin: "Mesocentrotus nudus",
    chinese: "光棘球海胆",
    authority: "(A. Agassiz, 1864)",
    parent: "Mesocentrotus",
    description:
      "光棘球海胆俗称大连紫海胆,是中国北方黄渤海冷温带岩礁底的重要食用海胆,壳半球形、大棘紫黑粗壮,生殖腺秋季肥满色深黄。辽东半岛与山东半岛采捕逾百年,是大连海胆罐头与鲜活出口的主打种;近年苗种繁育与底播增殖推广,资源养护与研究持续加强。",
    morphology: "壳径可达八厘米余,大棘紫黑粗壮末端钝,管足色深,顶系闭合,生殖腺橙黄浓艳。",
    habitat: "栖于低潮线至数十米岩礁与砾石底,喜冷水高盐环境,海带与大型藻繁茂处多见。",
    distribution: "西北太平洋冷温带,日本海与鄂霍次克海南部、朝鲜半岛及中国大连、烟台近岸。",
    etymology:
      "属名 Mesocentrotus 由 mesos(中间)与 kentron(棘)词根构成,指介于近缘属间的地位;种加词 nudus 意为裸的,指光洁大棘。",
    discovery:
      "1864 年阿加西依西北太平洋标本定名,长期置于球海胆属;分子系统学证据支持其独立成属,中文通称光棘球海胆。",
    genomeInfo:
      "与紫球海胆近缘,基因组规模约八亿碱基对级;冷适应与性腺发育相关的转录组研究已有积累。",
    ecologyRole:
      "岩礁底牧食者,啃食海带与大型褐藻,种群波动可影响藻林幼体补充,亦为海獭与底栖鱼类饵料。",
    researchValue:
      "中国北方海胆渔业与增养殖的核心种,性腺增育、底播增殖与冷适应生理研究活跃,经济价值突出。",
    tags: ["经济物种", "食用"],
  },

  // ===================== 四、海星纲 Asteroidea(清单已有纲,7 种) =====================
  {
    rank: "order",
    latin: "Valvatida",
    chinese: "有瓣目",
    parent: "Asteroidea",
    description:
      "有瓣目为海星第一大目,体壁多厚实,管足具瓣,叉棘发达呈瓣状,含瘤海星、海燕、棘冠海星等逾千种,广布热带礁区至冷温带沿岸底域。",
  },
  {
    rank: "family",
    latin: "Oreasteridae",
    chinese: "瘤海星科",
    parent: "Valvatida",
    description:
      "瘤海星科体厚腕短,背板愈合成疣瘤状凸起,体大而显眼,多为热带浅海礁栖种,含面包海星、粒皮海星等大型种,西太平洋礁区常见。",
  },
  {
    rank: "genus",
    latin: "Culcita",
    chinese: "面包海星属",
    parent: "Oreasteridae",
    description:
      "面包海星属体近五角浑圆如厚枕,腕极短仅存棱线,背板愈合成钝瘤突,是印太礁区最大的底栖海星类,通称面包海星,以取食珊瑚虫著称。",
  },
  {
    rank: "species",
    latin: "Culcita novaeguineae",
    chinese: "面包海星",
    authority: "Müller & Troschel, 1842",
    parent: "Culcita",
    description:
      "面包海星是印度-西太平洋珊瑚礁最大的海星之一,体型近五角浑圆如厚枕,辐径可达半米,橙红底色缀乳白斑点。昼间匍匐礁坪啃食石珊瑚等珊瑚虫,行动迟缓;个体大、食量可观,种群增长时可对礁区珊瑚造成压力,又因体色醒目成为潜水观光的常见明星。",
    morphology: "体近五角厚枕状,间辐部极宽,腕仅存短棱,背板愈合呈钝瘤突,体色橙红缀白点。",
    habitat: "栖于珊瑚礁坪与礁坡浅水,匍匐于活珊瑚与死礁表面,白天多暴露活动,行动迟缓。",
    distribution: "印度-西太平洋热带海域,自马达加斯加、东南亚至大堡礁,中国南海诸岛有记录。",
    etymology:
      "属名 Culcita 拉丁语意为坐垫、褥垫,指厚枕状体型;种加词 novaeguineae 意为新几内亚的,指模式产地。",
    discovery:
      "1842 年米勒与特罗舍尔依新几内亚标本定名;其对珊瑚的取食与种群动态在礁区生态研究中长期被关注。",
    genomeInfo:
      "全基因组尚未发表;已有基于线粒体标记的种群遗传研究,探讨印太礁区间幼体扩散格局。",
    ecologyRole:
      "礁区珊瑚捕食者,取食石珊瑚虫群体;种群密度受捕食与补充波动调节,为礁区群落上层调控者之一。",
    researchValue:
      "珊瑚礁食物网与珊瑚-捕食者相互作用研究的代表种,亦是潜水旅游与公众海洋教育的标志性礁区生物。",
    tags: ["观赏"],
  },
  {
    rank: "genus",
    latin: "Choriaster",
    chinese: "粒皮海星属",
    parent: "Oreasteridae",
    description:
      "粒皮海星属现知单种,体五角厚实,腕宽钝,背面密布颗粒状钝棘,皮鳃域发达,为印太礁区体色粉嫩的大型海星,即粒皮海星。",
  },
  {
    rank: "species",
    latin: "Choriaster granulatus",
    chinese: "粒皮海星",
    authority: "Lütken, 1869",
    parent: "Choriaster",
    description:
      "粒皮海星是印太珊瑚礁体色最柔和的大型海星,五腕宽钝,背面颗粒状钝棘密布,通体粉红至乳白。白天多暴露于礁坪缓慢爬行,以珊瑚虫、藻类与碎屑为食;因其温顺体态与浅粉色泽,成为礁区潜水的明星生物,生态旅游形象价值突出。",
    morphology: "腕五条宽钝,体厚实,背面满布钝颗粒状小棘,体色粉红至乳白,辐径可达四十厘米。",
    habitat: "栖于珊瑚礁坪、礁坡与砂砾衔接带,常暴露于日光下缓慢活动,不惧潜水者接近。",
    distribution: "印度-西太平洋热带海域,自红海、东非至西太平洋岛链,中国南沙群岛有记录。",
    etymology:
      "属名 Choriaster 由 chorion(皮)与 aster(星)构成,指颗粒状体表;种加词 granulatus 意为颗粒状的。",
    discovery:
      "1869 年吕特肯定名;因体色与造型独特,长期是礁区潜水观察与生态摄影的著名对象。",
    genomeInfo:
      "基因组数据缺乏,分类地位依形态与分子证据均已确认,种群遗传与保护研究尚待开展。",
    ecologyRole:
      "礁区杂食性底栖者,取食珊瑚虫与附生生物,活动缓慢,构成礁区大型底栖生物量的组成部分。",
    researchValue:
      "珊瑚礁生态旅游与公众海洋教育的形象种,常用于礁区生物多样性宣传与潜水图鉴编纂。",
    tags: ["观赏"],
  },
  {
    rank: "family",
    latin: "Archasteridae",
    chinese: "枫海星科",
    parent: "Valvatida",
    description:
      "枫海星科体扁腕尖,腹面步带沟宽大,两性生殖且常见成对交叠的假交配行为,种类少,多栖热带沙底潮间带,含习见的飞白枫海星。",
  },
  {
    rank: "genus",
    latin: "Archaster",
    chinese: "枫海星属",
    parent: "Archasteridae",
    description:
      "枫海星属体扁平五腕,背面灰褐具深色纵纹,腹面橙黄,栖于沙底并常半埋,夜间成对叠置行假交配,是印太潮间带习见的砂栖海星类。",
  },
  {
    rank: "species",
    latin: "Archaster typicus",
    chinese: "飞白枫海星",
    authority: "Müller & Troschel, 1840",
    parent: "Archaster",
    description:
      "飞白枫海星是印太沿岸潮间带最常见的砂栖海星,体扁平五腕,背面灰褐纵纹交错如飞白书体,腹面橙黄。退潮时半埋于砂中,涨潮后爬行觅食;生殖季雄星叠伏雌星之上行假交配、同步排精产卵,此行为使其成为海星繁殖行为学的经典研究对象。",
    morphology: "体扁薄五腕,辐径十余厘米,背面灰褐具深色纵纹与横斑,腹面步带沟宽而色浅。",
    habitat: "栖于潮间带至浅海沙与砂砾底,常半埋仅露背面,避晒避浪,夜间活动增强。",
    distribution: "印度-西太平洋热带与亚热带,自东非至日本南部、澳洲,中国南海与台湾沿岸习见。",
    etymology:
      "属名 Archaster 由 arche(原始)与 aster(星)构成;种加词 typicus 意为典型的,指其属的模式种身份。",
    discovery:
      "1840 年米勒与特罗舍尔定名;其假交配行为自二十世纪初被详细记述,成为行为生态学经典案例。",
    genomeInfo:
      "分子标记研究显示其与瓣类海星近缘;全基因组测序尚未开展,发育与行为分子研究缺乏。",
    ecologyRole:
      "潮间带砂底吞食型底栖者,吞入砂粒消化其中有机质与微生物,顺带翻动表层沉积物。",
    researchValue:
      "海星假交配与同步繁殖行为研究的经典种,亦用于潮间带生态学与底栖多样性监测教学。",
  },
  {
    rank: "family",
    latin: "Asterinidae",
    chinese: "海燕科",
    parent: "Valvatida",
    description:
      "海燕科为小型厚体海星,腕短体厚腹面步带沟宽,多具两性生殖与护幼现象,沿岸岩礁潮间带极常见,含北方岩岸的习见种海燕。",
  },
  {
    rank: "genus",
    latin: "Asterina",
    chinese: "海燕属",
    parent: "Asterinidae",
    description:
      "海燕属体近五角而厚,腕宽短,背板细密,体色上暗下艳,栖岩岸潮间带,食藻类与碎屑,发育兼具浮游幼虫与直接发育两型,广布世界暖海。",
  },
  {
    rank: "species",
    latin: "Asterina pectinifera",
    chinese: "海燕",
    authority: "(Müller & Troschel, 1842)",
    parent: "Asterina",
    description:
      "海燕是中国北方岩岸潮间带最常见的小型海星,体近五角、腕宽短,背面蓝紫底色缀橙红斑点,腹面橙黄。退潮时匍匐石面吞食藻类与碎屑,数量大而醒目;其生殖期集中、卵径大而透明,自二十世纪初即为海星胚胎发育的经典实验材料,近期分子分类多将其移入 Patiria 属。",
    morphology: "体近五角厚实,辐径可达十厘米,腕宽短具明显缘板,背面蓝紫缀橙红斑,腹面橙黄。",
    habitat: "栖于岩礁潮间带至浅海,退潮时藏于石下或匍匐石面,耐干燥与温度剧烈波动。",
    distribution: "西北太平洋冷温带,日本沿岸、朝鲜半岛与中国渤海、黄海岩岸均极习见。",
    etymology:
      "属名 Asterina 为 aster(星)的指小词,指其小体型;种加词 pectinifera 意为具栉的,指背板栉状纹饰。",
    discovery:
      "1842 年米勒与特罗舍尔依日本标本定名;二十世纪以来其同步产卵与大型透明卵广泛用于棘皮动物胚胎学教学与研究。",
    genomeInfo:
      "转录组与胚胎发育基因表达研究丰富;近期分子系统学研究主张将其移入 Patiria 属,分类仍在修订。",
    ecologyRole:
      "潮间带岩岸优势底栖者,啃食藻类与贻贝、藤壶幼体,自身为鸥类等岸鸟的重要捕食对象。",
    researchValue:
      "海星早期发育、卵母细胞成熟与减数分裂研究的经典模式,体外受精同步性极佳,百年来见于各国胚胎学教材。",
    tags: ["模式生物"],
  },
  {
    rank: "family",
    latin: "Acanthasteridae",
    chinese: "棘冠海星科",
    parent: "Valvatida",
    description:
      "棘冠海星科单属单种,体盘小而腕多柔,背面密布长毒棘,专性捕食造礁石珊瑚,是大堡礁等印太礁区著名的珊瑚捕食者与暴发种。",
  },
  {
    rank: "genus",
    latin: "Acanthaster",
    chinese: "棘冠海星属",
    parent: "Acanthasteridae",
    description:
      "棘冠海星属体盘小,腕十余至二十余条,背面覆长而锐利的毒棘,胃可外翻体外消化活珊瑚虫,本属仅棘冠海星一种,成体辐径为海星之冠。",
  },
  {
    rank: "species",
    latin: "Acanthaster planci",
    chinese: "棘冠海星",
    authority: "(Linnaeus, 1758)",
    parent: "Acanthaster",
    description:
      "棘冠海星是印度-太平洋珊瑚礁最著名的珊瑚捕食者,具十余至二十余条柔腕,背面覆长而锐利的毒棘。夜间翻胃体外消化活石珊瑚,一只成虫年啃食数平方米;周期性种群暴发可在数年内摧毁大片礁区,与大堡礁珊瑚衰退直接相关,各国长期实施人工清除与暴发预警,天敌法螺的保护亦被强调。",
    morphology: "体盘小,腕11至21条,辐径可达三十余厘米,背棘长数厘米且有毒,体色紫红褐绿多变。",
    habitat: "栖于珊瑚礁坡与礁坪,白天藏礁缝,夜间迁移捕食,浮游幼虫随暖流水团扩散。",
    distribution: "印度-太平洋热带,红海、东非、大堡礁至法属波利尼西亚,中国南海诸岛周边礁区。",
    etymology:
      "属名 Acanthaster 由 akanthos(棘)与 aster(星)构成,指毒棘遍布;种加词 planci 词源古老难考,或与人名拉丁化有关。",
    discovery:
      "1758 年林奈定名;二十世纪六十年代大堡礁暴发摧毁大面积珊瑚后,其暴发机制成为全球礁区生态学核心议题。",
    genomeInfo:
      "全基因组草图已发表,揭示嗅觉与感觉相关基因家族的扩张,为解释种群暴发提供分子线索。",
    ecologyRole:
      "专性珊瑚捕食者,暴发时为礁区珊瑚群落的主导干扰源,深刻调控礁相演替,营养盐再循环作用亦大。",
    researchValue:
      "珊瑚礁暴发生态与天敌法螺保护研究的核心对象,人工清除、监测预警与幼虫补充模型均以其为案例。",
    tags: ["生态关键种", "有毒"],
  },
  {
    rank: "order",
    latin: "Paxillosida",
    chinese: "柱星目",
    parent: "Asteroidea",
    description:
      "柱星目为特化的底栖海星,管足无吸盘,腕尖步带沟末端封闭,背板柱状,多为砂泥底吞食型,含砂海星等各大洋陆架习见属种。",
  },
  {
    rank: "family",
    latin: "Luidiidae",
    chinese: "砂海星科",
    parent: "Paxillosida",
    description:
      "砂海星科单属,腕五条尖细,体扁而柔软,管足尖锥状无吸盘,步带沟窄,栖砂泥底捕食吞咽小型底栖动物,广布各大洋陆架浅海。",
  },
  {
    rank: "genus",
    latin: "Luidia",
    chinese: "砂海星属",
    parent: "Luidiidae",
    description:
      "砂海星属腕尖细、体扁柔软,背板柱状排列,管足尖锥无吸盘,栖沙底昼伏夜出,受惊可自切断腕逃脱,含黄渤海习见的砂海星等百余种。",
  },
  {
    rank: "species",
    latin: "Luidia quinaria",
    chinese: "砂海星",
    parent: "Luidia",
    description:
      "砂海星是中国黄渤海沙底浅海最习见的海星,五腕细尖而体扁,背面灰褐缀浅斑。埋栖沙中昼伏夜出,捕食贝类、多毛类等小型底栖动物并能翻胃体外消化;对滩涂贝类养殖有一定危害,其种群数量常被用作底栖群落状况与环境变动的指标之一。",
    morphology: "体扁盘小,五腕细长渐尖,辐径可达二十厘米,背面灰褐缀浅斑,管足尖细无吸盘。",
    habitat: "栖于沙与砂泥底浅海,自低潮线至数十米,白天半埋,夜间爬行觅食,受惊自切逃脱。",
    distribution: "西北太平洋,日本海、朝鲜半岛西岸与中国渤海、黄海、东海北部沙底浅海。",
    etymology:
      "属名 Luidia 源自早期学者姓氏的拉丁化;种加词 quinaria 意为五的,指其典型五腕形态。",
    discovery:
      "1865 年冯马滕斯依日本标本定名;二十世纪中国海洋调查确认其为黄渤海优势海星,贝类养殖敌害研究引用极多。",
    genomeInfo:
      "基因组数据缺乏;线粒体序列已用于海星类系统发育比较,断腕再生与步带神经再生研究受关注。",
    ecologyRole:
      "沙底中下层捕食者,压制贝类与多毛类种群,遭强烈扰动可大量自切,自身为底栖鱼类重要饵料。",
    researchValue:
      "黄渤海底栖群落与贝类养殖敌害研究的代表种,断腕再生与神经再生研究价值突出。",
    tags: ["环境指示种"],
  },
  {
    rank: "genus",
    latin: "Linckia",
    chinese: "指海星属",
    parent: "Valvatida",
    description:
      "指海星属腕圆柱形如指,体壁粗糙,断腕可独立再生为彗星状新个体,是印太礁区著名的再生类群,含体色鲜明的蓝指海星等数种。",
  },
  {
    rank: "species",
    latin: "Linckia laevigata",
    chinese: "蓝指海星",
    authority: "(Linnaeus, 1758)",
    parent: "Linckia",
    description:
      "蓝指海星是印太珊瑚礁最具辨识度的蓝色海星,五腕粗圆如指,体色纯蓝至淡紫。断腕再生能力极强,落单断腕可长成彗星状新个体;礁坪与潟湖常见,以底栖藻膜与碎屑为食。因体色鲜明、耐受性有限,常作为礁区环境异常与盐度骤降事件的指示生物,也是海水水族展示的明星。",
    morphology: "辐径可达三十厘米,腕圆柱状末端圆钝,体表粗糙粒状,体色明亮蓝至蓝紫,口面色浅。",
    habitat: "栖于珊瑚礁坪、潟湖与礁坡浅水,匍匐礁面,对低盐与暴雨径流敏感,常随异常事件大量死亡。",
    distribution: "印度-太平洋热带,自东非、红海至夏威夷与南太平洋诸岛,中国南海诸岛常见。",
    etymology:
      "属名 Linckia 纪念德国博物学家林克;种加词 laevigata 意为光滑的,指圆钝光洁的腕形。",
    discovery:
      "1758 年林奈定名;其彗星状断腕再生个体十九世纪即被记述,长期作为棘皮动物再生研究素材。",
    genomeInfo:
      "已有微卫星与线粒体谱系研究,揭示印太礁区间显著遗传分化;全基因组尚未发表。",
    ecologyRole:
      "礁区底栖食碎屑者,兼食藻膜与附生生物;种群对低盐与高温事件敏感,可作礁区环境异常指示。",
    researchValue:
      "断腕再生与种群连通性研究的代表种,亦为海洋酸化与升温耐受实验对象,礁区生态监测常用。",
    tags: ["观赏", "环境指示种"],
  },

  // ===================== 五、海参纲 Holothuroidea(清单已有纲,6 种) =====================
  {
    rank: "order",
    latin: "Molpadida",
    chinese: "芋参目",
    parent: "Holothuroidea",
    description:
      "芋参目为尾端渐细的纺锤形海参,体壁薄、骨片常呈白垩质,潜居泥沙底吞食沉积物,后端伸向穴道通气排水,浅海至深海均有分布。",
  },
  {
    rank: "family",
    latin: "Molpadiidae",
    chinese: "芋参科",
    parent: "Molpadida",
    description:
      "芋参科体纺锤或胡萝卜状,尾部延长尖细,体壁薄而柔软,骨片白垩质,潜居泥底穴道中吞食沉积物,是软底内栖群落常见组成。",
  },
  {
    rank: "genus",
    latin: "Acaudina",
    chinese: "海地瓜属",
    parent: "Molpadiidae",
    description:
      "海地瓜属体前部膨大后端削尖,体壁薄而柔软,潜居泥中穴道底部,吞食底泥消化有机质,中国沿岸常见种即海地瓜,量大而价低。",
  },
  {
    rank: "species",
    latin: "Acaudina molpadioides",
    chinese: "海地瓜",
    parent: "Acaudina",
    description:
      "海地瓜是中国沿岸潮间带至浅海泥底的习见芋参类海参,体前部肥钝、后端细长,淡红褐色,潜居泥中吞食有机底泥。过去长期被视为低值参类,鲜销或盐渍加工;近年因体壁明胶与活性肽的资源化研究重新进入视野,也是泥滩底栖生态与污染监测的常见指示种。",
    morphology: "体长可达二十厘米余,前部膨大后端削尖,体壁薄,体色淡红褐,触手十五枚。",
    habitat: "潜居于泥与砂泥底潮间带至浅海,体后端伸向穴口,借水流通气与过滤。",
    distribution: "西太平洋中国黄海、东海与南海沿岸,亦见于日本与朝鲜半岛近岸泥底。",
    etymology:
      "属名 Acaudina 由 a(无)与 cauda(尾)构成,指尾部形态不显;种加词 molpadioides 意为似芋参的,指与芋参属形态相近。",
    discovery:
      "依东亚沿岸标本定名;中国沿海泥滩底栖调查中记录极多,长期作为群落优势参类出现在海洋调查报告。",
    genomeInfo:
      "全基因组与大规模分子数据尚缺;其体壁胶原蛋白与活性肽已有较系统的食品科学研究。",
    ecologyRole:
      "泥底内栖沉积食者,吞吐泥量巨大,改善底质物质循环,是泥滩底栖群落生物量的稳定组分。",
    researchValue:
      "低值海参高值化利用的典型对象,体壁明胶、胶原肽与抗氧化活性成分研究活跃,亦是泥滩监测指示种。",
    tags: ["经济物种", "环境指示种"],
  },
  {
    rank: "family",
    latin: "Holothuriidae",
    chinese: "海参科",
    parent: "Aspidochirotida",
    description:
      "海参科为楯手目核心科,触手楯状约二十枚,管足遍布或成纵列,体壁厚实,含海参属等全球最重要的食用与药用海参类群。",
  },
  {
    rank: "genus",
    latin: "Holothuria",
    chinese: "海参属",
    parent: "Holothuriidae",
    description:
      "海参属是海参纲的模式属,种逾百数,体圆柱状,腹面管足成纵列、背面疣足,广布热带浅海,含玉足海参、糙海参、黑乳参等名贵种。",
  },
  {
    rank: "species",
    latin: "Holothuria leucospilota",
    chinese: "玉足海参",
    authority: "(Brandt, 1835)",
    parent: "Holothuria",
    description:
      "玉足海参俗称荡皮参,是中国南海及印太沿岸最习见的黑色海参,体圆筒状,背面疣足与腹面管足发达,受激时体壁软化并喷出居维氏管御敌。栖礁坪沙砾底,吞食沉积物消化其中有机质;资源量曾极大,是南方沿海捕捞与低值参加工的常见种,现亦为海参皂苷活性研究的重要材料。",
    morphology: "体长可达四十厘米,圆筒状,体壁黑柔,背面密布疣足,腹面管足成纵列,触手二十枚。",
    habitat: "栖于珊瑚礁坪、沙砾与碎石底,潮间带至十余米,昼伏夜出,吞食底沉积物。",
    distribution: "印度-西太平洋热带与亚热带,自红海、东非至日本南部与澳洲,中国南海习见。",
    etymology:
      "属名 Holothuria 为林奈所拟,源自希腊语海参类古名;种加词 leucospilota 由 leukos(白)与 spilos(斑)构成,指体表白点。",
    discovery:
      "1835 年勃兰特定名;中国南方沿海作为荡皮参长期捕捞,近年居维氏管防御与皂苷化学研究使其重受重视。",
    genomeInfo:
      "全基因组测序近年推进,皂苷生物合成与体壁软化相关的转录组研究已有积累,染色体级组装尚未见报道。",
    ecologyRole:
      "礁区沉积食者,昼夜吞吐大量砂泥、促进有机质再悬浮与矿化,居维氏管防御亦影响捕食者行为。",
    researchValue:
      "居维氏管防御行为、皂苷化学防御与体壁流变学研究的模式种,亦是热带海参资源评估对象。",
    tags: ["经济物种", "药用"],
  },
  {
    rank: "species",
    latin: "Holothuria nobilis",
    chinese: "黑乳参",
    parent: "Holothuria",
    description:
      "黑乳参是印太礁区最名贵的食用海参之一,商品名黑乳参、乌乳参,体肥厚,背面与体侧各具一行粗大乳突状疣足。因体大壁厚、干品率高,长期遭高价捕捞,资源锐减,多国已实施捕捞与贸易管制;南海及南洋历史上均为重要捕捞对象,分子研究近年将太平洋群体分立为近缘种。",
    morphology: "体肥厚圆筒状,长可达四十厘米,体壁厚,背面与体侧各一行粗大乳突,体色黑褐。",
    habitat: "栖于珊瑚礁坪与潟湖沙砾底,昼伏夜出,吞食沉积物,常半埋于碎屑之间。",
    distribution: "印度-太平洋热带礁区,自东非、红海至东南亚与大堡礁,中国南海诸岛有分布。",
    etymology:
      "种加词 nobilis 意为高贵的,指其体大而名贵;因具乳状疣足,英文通称黑乳鱼参(black teatfish)。",
    discovery:
      "依印太标本于十九世纪定名;二十一世纪初分子证据将太平洋群体分立为 H. whitmaei,分类仍在更新。",
    genomeInfo:
      "基因组数据尚缺;作为高值参种,资源遗传学与线粒体标记研究已用于贸易溯源与种群评估。",
    ecologyRole:
      "礁区大型沉积食者,吞吐量巨大、翻耕沙层影响营养流转;种群锐减后其生态功能缺位受关注。",
    researchValue:
      "名贵海参资源衰退与贸易管制的典型案例,为海参养护、限额捕捞与溯源技术研究提供核心样本。",
    tags: ["经济物种"],
  },
  {
    rank: "species",
    latin: "Holothuria scabra",
    chinese: "糙海参",
    authority: "Jaeger, 1833",
    parent: "Holothuria",
    description:
      "糙海参是热带海参养殖最核心的种,体圆筒状、体壁厚而粗糙,通体灰白至褐黄,俗名沙参。栖沙泥底吞食沉积物,昼夜随月相埋栖与出土;因野生资源趋于枯竭,自二十世纪末起印度尼西亚、越南等国发展苗种放流与池塘养殖,是暖水海参人工繁育技术研究最成熟的种,中国亦有引种与杂交试验。",
    morphology: "体长可达四十厘米,圆筒形,背腹分化明显,背面横皱粗糙,体色灰白黄褐,常裹沙粒。",
    habitat: "栖于沿岸沙泥底、海草床与红树林缘,埋栖浅层,随月相与昼夜节律出土觅食。",
    distribution: "印度-西太平洋暖水区,自东非、波斯湾至南太平洋岛国,中国海南与南海诸岛有分布。",
    etymology:
      "种加词 scabra 意为粗糙的,指体壁横皱与粗糙质感;俗名沙参源于栖沙习性与体表裹沙。",
    discovery:
      "1833 年耶格尔定名;二十世纪九十年代野生种群被系统评估并趋于枯竭,推动多国建立苗种与放流产业。",
    genomeInfo:
      "全基因组测序近年取得进展,生长、抗逆与皂苷相关的分子标记开发活跃,支撑选育研究。",
    ecologyRole:
      "沙泥底沉积食者与生物扰动者,埋栖活动改善底质通透;高密度养殖排泄亦带来局部富营养压力。",
    researchValue:
      "全球热带海参养殖与放流增殖的模式种,人工育苗、中间培育与底播技术均以其先行建立。",
    tags: ["经济物种", "食用"],
  },
  {
    rank: "genus",
    latin: "Thelenota",
    chinese: "梅花参属",
    parent: "Stichopodidae",
    description:
      "梅花参属体巨大,背面疣足粗大成树状簇,是体长最大的海参类,栖热带礁坡深水,含梅花参等数种,均为高值捕捞对象。",
  },
  {
    rank: "species",
    latin: "Thelenota ananas",
    chinese: "梅花参",
    authority: "(Jaeger, 1833)",
    parent: "Thelenota",
    description:
      "梅花参是世界上最长的海参,伸展可达一米,背面疣足大而成树状簇聚、状若梅花瓣,故得名。栖于南海与印太礁坡沙底,吞食沉积物;体大肉厚,干制品为南海传统参中珍品;因长期高强度捕捞,资源明显衰退,南海已实施捕捞管控与资源养护,皂苷与多糖活性研究持续开展。",
    morphology: "体长可达一米,体壁厚,背面肉刺基部连合成簇如梅瓣,腹面管足密集,体色橙黄至褐红。",
    habitat: "栖于珊瑚礁坡与外礁沙底,自数米至二十余米,昼伏夜出吞食沉积物。",
    distribution: "印度-西太平洋热带,自红海、东非至南太平洋,中国西沙、南沙群岛礁区。",
    etymology:
      "属名 Thelenota 词源存疑,或与人名有关;种加词 ananas 意为菠萝,指背疣足簇如菠萝表面。",
    discovery:
      "1833 年耶格尔定名;因体长与品相,在南海渔业史与参市贸易中地位特殊,二十世纪资源调查记录密集。",
    genomeInfo:
      "全基因组尚未发表;已有线粒体与微卫星标记用于西沙、南沙种群连通性与资源评估研究。",
    ecologyRole:
      "礁区大型沉积食者,吞吐底沙量大,是深水礁坡物质循环的重要环节,亦是高值参资源的生态载体。",
    researchValue:
      "世界最大海参,热带参资源养护与增殖的标志性对象,其皂苷与多糖活性成分研究活跃。",
    tags: ["经济物种", "食用", "药用"],
  },
  {
    rank: "genus",
    latin: "Stichopus",
    chinese: "刺参属",
    parent: "Stichopodidae",
    description:
      "刺参属为热带刺参类,体壁厚,背面粗大圆锥疣足沿辐成行,体色多变,含绿刺参等多种经济参,与温带的仿刺参近缘而分布更偏暖水。",
  },
  {
    rank: "species",
    latin: "Stichopus chloronotus",
    chinese: "绿刺参",
    parent: "Stichopus",
    description:
      "绿刺参俗称方刺参,是印太礁区的重要食用海参,体方柱状,背疣足粗短沿体侧成行,通体墨绿至黑绿。栖息礁坪与礁坡,昼伏夜出吞食沉积物;其干品为南方市场常见商品参,体壁胶原与皂苷含量丰富,资源承受较大捕捞压力,近年已开展增殖与养殖探索,活性成分研究持续深入。",
    morphology: "体方柱形,长约三十厘米,背疣足粗大成行,体色墨绿至黑,腹面管足密集。",
    habitat: "栖于珊瑚礁坪与礁坡沙砾底,常藏于礁块与海草根间,夜间外出吞食沉积物。",
    distribution: "印度-西太平洋热带,自东非、东南亚至大堡礁,中国南海诸岛与海南岛周边。",
    etymology:
      "属名 Stichopus 由 stichos(列)与 pous(足)构成,指疣足成行;种加词 chloronotus 意为绿背的。",
    discovery:
      "1835 年勃兰特定名;南海渔业中长期以方刺参为商品名,资源与繁殖生物学研究近年增多。",
    genomeInfo:
      "已有线粒体基因组与部分转录组数据,全基因组测序尚待完成,可用于与仿刺参的比较研究。",
    ecologyRole:
      "礁区沉积食者,夜间吞吐沙砾促进碎屑周转;其栖息地选择与种群变动可反映礁区捕捞压力。",
    researchValue:
      "热带刺参资源与皂苷活性研究的重要种,人工育苗与增殖技术已有试验,体壁胶原蛋白利用研究活跃。",
    tags: ["经济物种", "食用", "药用"],
  },
];
