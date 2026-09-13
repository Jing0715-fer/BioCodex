import type { EnrichEntry } from "../types";

// 原核生物(细菌+古菌)与原生生物科学档案补强数据 第二轮 —— Task 5-a
// 定位对象:/tmp/list-proto.tsv 所列 35 个"无科学档案"物种(细菌/古菌 12 + 原生生物 23)
// 数据原则:仅收录高把握史实,latin 与清单逐字一致(定位键);不确定的基因组数值与命名年份一律省略
export const enrich2ProkaryotesProtists: EnrichEntry[] = [
  // ================================================================
  // 一、细菌与古菌(12 种)
  // ================================================================

  // 1. 豌豆根瘤菌
  {
    latin: "Rhizobium leguminosarum",
    etymology:
      "属名 Rhizobium 源于希腊语 rhiza(根)与 bios(生命),意为『栖根而生』;种名指其寄主豆科植物(旧学名 Leguminosae)。",
    discovery:
      "1886-1888 年 Hellriegel 与 Wilfarth 证明豆科靠根瘤中的微生物固氮;1888 年 Beijerinck 获纯培养;1889 年 Frank 建立根瘤菌属,本种为模式种。",
    genomeInfo:
      "测序株 bv. viciae 3841 基因组逾 7 Mb(2006 年发表),由染色体与多个大质粒组成,结瘤与固氮基因集中于巨型共生质粒上。",
    ecologyRole:
      "与豌豆、蚕豆、野豌豆等豆科植物共生,侵入根毛诱导根瘤,在瘤内将氮气还原为氨供宿主利用;是农田轮作培肥与生物氮素输入的核心环节。",
    researchValue:
      "共生固氮分子对话的经典:类黄酮-NodD-结瘤因子级联、固氮酶氧防护机制均以其阐明;豆科接种根瘤菌剂为世界性增产措施,3841 为标准实验株。",
  },

  // 2. 白喉棒杆菌
  {
    latin: "Corynebacterium diphtheriae",
    etymology:
      "属名 Corynebacterium 源于希腊语 koryne(棍棒)+ bakterion(小杆),指菌体一端膨大如棒;种名源自希腊语 diphthera(皮革),指咽部坚韧假膜。",
    discovery:
      "1883 年 Klebs 查见,1884 年 Löffler 培养成功;1888 年 Roux 与 Yersin 确证毒素致病;1890 年 Behring、北里柴三郎制成抗毒素,获首届诺奖。",
    genomeInfo:
      "参考株 NCTC 13129 基因组约 2.5 Mb、GC 约 53%,2003 年完成测序;铁应答调控蛋白 DtxR 控制毒素基因表达。",
    ecologyRole:
      "人类专性呼吸道寄生物,定殖咽部黏膜引发白喉,人类为唯一储存宿主;细菌不侵入深部组织,致病全赖循环外毒素。",
    researchValue:
      "毒素-抗毒素血清疗法与类毒素疫苗(DTP 组分)的奠基病原;1951 年 Freeman 证明产毒依赖 β 噬菌体溶原化,成为噬菌体横向转移毒力的经典。",
  },

  // 3. 脆弱拟杆菌
  {
    latin: "Bacteroides fragilis",
    etymology:
      "属名 Bacteroides 由希腊语 bakterion(杆)+ eidos(形)构成,意为『杆菌样的』;种名 fragilis 拉丁语『脆弱的』,指培养物易溶解破坏。",
    discovery:
      "1898 年 Veillon 与 Zuber 自阑尾脓肿分离厌氧杆菌并命名;20 世纪临床厌氧菌学兴起后归入拟杆菌属,成为研究最多的厌氧病原菌。",
    genomeInfo:
      "基因组约 5.2 Mb、GC 约 43%,模式株 NCTC 9343 等多株已测序;富含可移动元件与耐药、毒力相关位点。",
    ecologyRole:
      "人与哺乳动物结肠最丰富的革兰阴性厌氧菌之一,降解膳食纤维与黏液糖蛋白生成短链脂肪酸供宿主;移位至无菌腔隙即成腹腔感染头号病原。",
    researchValue:
      "肠道菌群-免疫互作的明星菌:荚膜多糖 A 诱导调节性 T 细胞、神经鞘脂塑造 NKT 细胞发育;金属蛋白酶毒素与耐药机制亦为临床研究热点。",
  },

  // 4. 发状念珠藻(发菜)
  {
    latin: "Nostoc flagelliforme",
    etymology:
      "属名 Nostoc 为 16 世纪炼金术士对雨后胶质『星冻』的旧称,词源成谜(一说出自帕拉塞尔苏斯);种名意为『鞭状的』,指发状藻体。",
    discovery:
      "发菜在中国与蒙古作药食已逾千年;现代研究确认为极度耐旱的陆生蓝细菌;2000 年国务院明令禁止采集销售,以遏制草原破坏。",
    ecologyRole:
      "荒漠草原土壤生物结皮的构建种:干燥休眠、遇水复苏,分泌胞外多糖黏结土粒保墒固沙,并具固氮能力,是荒漠化防治的天然工程师。",
    researchValue:
      "极端耐旱与光保护机制、胞外多糖与活性物质研究的模式蓝细菌;因采挖严重破坏草场而被禁售禁挖,推动人工培养与替代原料研究。",
  },

  // 5. 钝顶螺旋藻
  {
    latin: "Arthrospira platensis",
    etymology:
      "属名 Arthrospira 源于希腊语 arthron(节)+ speira(螺旋),指具横隔的螺旋丝体;种名意为『拉普拉塔河的』,纪念南美模式产地。",
    discovery:
      "乍得湖畔 Kanembu 人与墨西哥碱湖居民的传统食物;1960 年代比利时植物学家 Léonard 考察乍得湖后引发国际重视,墨西哥 1970 年代率先工业化生产。",
    genomeInfo:
      "测序株 NIES-39 基因组约 6.8 Mb(2010 年);含大量串联重复序列,株间结构变异频繁,给组装与比较基因组带来挑战。",
    ecologyRole:
      "热带亚热带碱湖(pH 9-11)的优势浮游蓝细菌,嗜高碱、高温与强光;高蛋白生物量支撑碱湖食物网,小火烈鸟几乎以其为食。",
    researchValue:
      "螺旋藻保健食品与饲料产业主栽种,蛋白质可达干重六成以上,富含藻蓝蛋白与 β-胡萝卜素;曾为 NASA 太空食品候选;藻蓝蛋白为天然色素与荧光标签。",
  },

  // 6. 原绿球藻
  {
    latin: "Prochlorococcus marinus",
    etymology:
      "属名意为『原绿球菌』:pro-(替代)+ 希腊 chloros(绿)+ kokkos(球粒),因其含叶绿素 b 而被视为绿藻的『原核对应体』;种名『海生的』。",
    discovery:
      "1988 年 Chisholm 与 Olson 等以流式细胞术发现于北大西洋,1992 年正式定名;是最后被发现的大洋优势类群,也是最小的光养细胞之一。",
    genomeInfo:
      "2003 年同期公布高光型 MED4(约 1.66 Mb,最小光养基因组之一)与低光型 MIT 9313(约 2.4 Mb)两株参考基因组。",
    ecologyRole:
      "40°N 至 40°S 大洋透光层最丰富的自养生物,每毫升海水可逾十万细胞;以精简的光合装置驱动大洋碳循环的相当份额。",
    researchValue:
      "泛基因组结构、生态型分化与噬菌体互作研究的旗舰物种;其光适应与生理参数是大洋生态与碳通量模型的重要基础。",
  },

  // 7. 伯氏疏螺旋体
  {
    latin: "Borrelia burgdorferi",
    etymology:
      "属名纪念法国细菌学家 Amédée Borrel;种名纪念 1982 年发现者、瑞士裔美国科学家 Willy Burgdorfer。",
    discovery:
      "1975 年美国 Lyme 镇儿童关节炎聚集病例引发调查;1982 年 Burgdorfer 自肩突硬蜱中肠分离本菌;1984 年定名以志其功。",
    genomeInfo:
      "模式株 B31 基因组约 1.5 Mb,由约 0.9 Mb 线性染色体与十余个线性、环状质粒构成,1997 年起陆续测序;多数毒力相关基因位于质粒。",
    ecologyRole:
      "莱姆病病原,自然循环于硬蜱与白足鼠、鸟类等储存宿主间;人遭带菌蜱叮咬后见游走性红斑,延误治疗可累及关节、神经与心脏。",
    researchValue:
      "北半球最常见的蜱媒病原;OspA 疫苗(1998 年上市,2002 年撤市)与新疫苗的研发史是疫苗政策经典;极端精简代谢与质粒冗余基因组亦是热点。",
  },

  // 8. 海洋亚硝化细小古菌
  {
    latin: "Nitrosopumilus maritimus",
    etymology:
      "属名由拉丁语 nitrosus(产亚硝酸)与 pumilus(侏儒般矮小)组成,指其为氨氧化且体态极小的古菌;种名拉丁语『海生的』。",
    discovery:
      "2005 年 Könneke 等自美国西雅图水族馆海水中富集分离,成为首个纯培养的氨氧化古菌,解开大洋奇古菌『何以为生』之谜。",
    genomeInfo:
      "模式株 SCM1 基因组约 1.65 Mb,高度精简且基因密度高,仅保留氨氧化与自养固碳等核心通路。",
    ecologyRole:
      "海洋浮游奇古菌的氨氧化者:把铵氧化为亚硝酸盐,启动硝化第一步、衔接氮循环与碳循环;深层海水中常居原核生物的大多数。",
    researchValue:
      "证实奇古菌化能自养氨氧化、修订全球硝化模型的里程碑物种;其氨单加氧酶与 3-羟基丙酸/4-羟基丁酸固碳途径为古菌生理学前沿。",
  },

  // 9. 淋病奈瑟菌
  {
    latin: "Neisseria gonorrhoeae",
    etymology:
      "属名纪念德国皮肤性病学家 Albert Neisser;种名源自希腊语 gonos(种液)与 rhoia(流淌),即旧籍『淋证』之名的拉丁转写。",
    discovery:
      "1879 年 Neisser 自淋病脓液涂片中发现;1882 年 Leistikow 培养成功,1885 年 von Bumm 证实致病性;此后耐药步步演进。",
    genomeInfo:
      "基因组约 2.15 Mb、GC 约 52%;富含重复序列与移动元件,表面抗原基因因此频繁转换。",
    ecologyRole:
      "人类专性黏膜病原,定殖尿道、宫颈、咽与直肠,性接触传播;菌毛、Opa 蛋白与脂寡糖的相变异使其逃逸免疫,不形成保护性免疫。",
    researchValue:
      "自然转化与抗原相变异研究经典;全球耐药监测重点(青霉素、氟喹诺酮相继失效),WHO 列为亟需新抗菌药的威胁;疫苗研发仍在攻坚。",
  },

  // 10. 副溶血性弧菌
  {
    latin: "Vibrio parahaemolyticus",
    etymology:
      "属名 Vibrio 源自拉丁语 vibrare(颤动),指运动活泼;种名 para-(似)+ haemolyticum(溶血的),意为『近于溶血性弧菌』。",
    discovery:
      "1950 年日本大阪小沙丁鱼干引发集体中毒,藤野等自患者与食物分离命名;1963 年坂崎等移入弧菌属;神奈川现象后成致病株标志。",
    genomeInfo:
      "参考株 RIMD 2210633 具两条环状染色体(约 3.3 与 1.9 Mb,合计约 5.2 Mb),2003 年完成测序;TDH 溶血素定位于毒力岛。",
    ecologyRole:
      "暖海河口嗜盐菌,附生于浮游甲壳类与贝类,随水温升高增殖;生食贝类与虾蟹制品是感染主因,近岸变暖使其分布北扩。",
    researchValue:
      "全球海产食物中毒头号病原之一;双染色体结构、III 型分泌系统与毒力岛水平转移的基因组学样本;亦是海洋变暖风险评估指示菌。",
  },

  // 11. 嗜热脂肪地芽孢杆菌
  {
    latin: "Geobacillus stearothermophilus",
    etymology:
      "属名 Geobacillus = 希腊 geo-(土)+ bacillus(杆菌);种名 = stear(脂肪)+ thermo(热)+ philus(喜好),指其于高温含脂食品中生长。",
    discovery:
      "1920 年 Donk 研究罐头『平酸变质』时分离命名;2001 年分子分类学自此类嗜热芽孢杆菌设立地芽孢杆菌属,本种为模式种。",
    ecologyRole:
      "土壤、温泉、堆肥与热加工线的高温栖居者,最适温度约 55-60 ℃,芽孢耐湿热;是罐装低酸食品与糖厂冷却水变质的主要肇事菌。",
    researchValue:
      "高压蒸汽灭菌工艺的全球标准生物指示剂(孢子条 56-60 ℃ 复苏培养);其 Bst DNA 聚合酶大片段是 LAMP 等温扩增的核心工具酶。",
  },

  // 12. 化脓性链球菌
  {
    latin: "Streptococcus pyogenes",
    etymology:
      "属名 Streptococcus 源于希腊 streptos(链)+ kokkos(球菌),指链状排列;种名 pyogenes = pyon(脓)+ gennan(产生),意为『生脓的』。",
    discovery:
      "1874 年 Billroth 描述链球菌;1883 年 Fehleisen 自丹毒分离培养;1884 年 Rosenbach 定名;1930 年代 Lancefield 确立 A 群分型。",
    genomeInfo:
      "模式株 SF370 基因组约 1.85 Mb、GC 约 38%(2001 年测序);emm 基因编码的 M 蛋白为分型与疫苗研究核心抗原。",
    ecologyRole:
      "人类专属病原,飞沫与接触传播:咽炎、脓疱疮、丹毒、猩红热,重症为坏死性筋膜炎与中毒性休克;感染后免疫交叉可致风湿热。",
    researchValue:
      "M 蛋白分子模拟与风湿热机制、噬菌体编码超抗原的研究经典;emm 分型驱动的分子流行病学监控猩红热回升;疫苗研发持续投入。",
  },

  // ================================================================
  // 二、原生生物(23 种):纤毛虫、甲藻、硅藻、绿藻大型藻、红藻褐藻、寄生虫等
  // ================================================================

  // 13. 天蓝喇叭虫
  {
    latin: "Stentor coeruleus",
    etymology:
      "属名 Stentor 取自荷马史诗《伊利亚特》中声若五十人的传令官;种名 coeruleus 拉丁语『天蓝色的』,指体内蓝绿色色素颗粒。",
    discovery:
      "巨型纤毛虫自 18 世纪显微学家起屡被描绘;摩尔根 1901 年《再生》集喇叭虫实验之大成;Tartar 1961 年专著确立其经典模型地位。",
    ecologyRole:
      "淡水最大的单细胞生物之一,体长可达 1-2 毫米;以黏着盘固着水草,借纤毛漏斗滤食细菌与藻类,是微型食物网顶级原生消费者。",
    researchValue:
      "单细胞再生与极性重建的百年经典:切断后仍重建完整个体;蓝色素 stentorin 光敏反应、收缩系统与巨核多线化亦是活跃课题。",
  },

  // 14. 伞形钟虫
  {
    latin: "Vorticella campanula",
    etymology:
      "属名 Vorticella 是拉丁语 vortex(漩涡)的指小词,指口缘纤毛带旋起摄食水涡;种名 campanula 意为『小钟』,恰述其钟形虫体。",
    discovery:
      "17 世纪 70 年代列文虎克已在显微书信中描绘其突然蜷缩;18 世纪林奈将其纳入分类体系;19 世纪起成为细胞学常规材料。",
    ecologyRole:
      "淡水固着型缘毛类纤毛虫,柄内痉挛丝可在数毫秒内卷缩避害;滤食细菌与碎屑,常见于富含有机质水体,是活性污泥健康度的指示生物。",
    researchValue:
      "痉挛丝的钙驱动超快收缩(非肌动蛋白-肌球蛋白机制)是生物马达与仿生致动素材;亦是污水生物处理与水质评价经典指示种。",
  },

  // 15. 嗜热四膜虫
  {
    latin: "Tetrahymena thermophila",
    etymology:
      "属名 Tetrahymena 意为『四片小膜』(希腊 tetra 四 + hymen 膜),指口部左侧的口围小膜列;种名『嗜热的』,源于最初分离自温暖水体。",
    discovery:
      "20 世纪中叶自暖水分离,长期混称梨形四膜虫;1976 年 Nanney 与 McCoy 依交配型群独立定种,奠定现代株系体系。",
    genomeInfo:
      "大核基因组约 104 Mb、约 2.7 万个蛋白编码基因(2006 年测序);大核体核与小核生殖核并存的二核体制为表观遗传研究样本。",
    ecologyRole:
      "淡水纤毛虫,捕食细菌、小型藻类与碎屑,连接微生物环与后生动物营养级;喜温暖富营养水体,常见于池塘与污水处理系统。",
    researchValue:
      "一门两诺奖的功勋细胞:Cech 发现核酶、Blackburn 与 Greider 发现端粒酶皆用其大核;大核发育中的程序性 DNA 重排亦是经典课题。",
  },

  // 16. 夜光藻
  {
    latin: "Noctiluca scintillans",
    etymology:
      "属名 Noctiluca 拉丁语『夜光者』(nox 夜 + lucere 发光);种名 scintillans『闪烁的』,叠述其夜间点点蓝光。",
    discovery:
      "1810 年 Macartney 已作科学记述,1921 年 Kofoid 与 Swezy 组合为现名;海上荧光千百年来见于航海志,今以『蓝眼泪』闻名。",
    ecologyRole:
      "全球近海浮游异养甲藻,吞噬浮游生物与鱼卵;高密度聚集形成发光赤潮,夜间海面泛蓝光;大量死亡分解耗氧,可危害养殖生物。",
    researchValue:
      "闪烁体(scintillon)发光机理——膜电位触发囊泡内 pH 骤变——的研究模型;赤潮监测与滨海荧光旅游的科普主角。",
  },

  // 17. 链状亚历山大藻
  {
    latin: "Alexandrium catenella",
    etymology:
      "属名 Alexandrium 得自埃及亚历山大港(Halim 1960 年据港内标本建属);种名 catenella 拉丁『小链』,指细胞常连成短链。",
    discovery:
      "1936 年 Whedon 与 Kofoid 据加州标本定名(时置膝沟藻属),1985 年 Balech 移入亚历山大藻属;其毒素于 1950 年代获纯化。",
    ecologyRole:
      "有毒甲藻:休眠孢囊沉底越冬,水温回升萌发成麻痹性贝毒赤潮;石房蛤毒素经贝类滤食富集,危害食用者与养殖产业。",
    researchValue:
      "贝类毒素监测与赤潮应急管理的核心目标种;石房蛤毒素为钠通道阻断工具药,并列入《禁止化学武器公约》管控;孢囊沉积记录用于追溯历史赤潮。",
  },

  // 18. 假微型海链藻
  {
    latin: "Thalassiosira pseudonana",
    etymology:
      "属名 Thalassiosira 得名于希腊海神 Thalassa;种名 pseudonana = pseudo(似)+ nana(矮小),意为『似微型海链藻而相别』。",
    discovery:
      "1970 年 Hasle 与 Heimdal 定名;模式克隆 3H 采自美国长岛海峡,后成为基因组学标准株(CCMP1335)。",
    genomeInfo:
      "基因组约 34 Mb,2004 年作为首个硅藻全基因组发表于《科学》,揭示硅壳沉积与氮磷代谢的独特遗传基础。",
    ecologyRole:
      "全球近海与大洋广布的小型中心硅藻,春季水华主力;硅质壳体沉降输送碳与硅,是生物泵与硅循环的重要载体。",
    researchValue:
      "硅藻基因组学与生物硅矿化分子机制的模式种;碳浓缩机制与光驯化实验的标准体系;浮游生态模型参数的来源物种。",
  },

  // 19. 三角褐指藻
  {
    latin: "Phaeodactylum tricornutum",
    etymology:
      "属名 Phaeodactylum = 希腊 phaeos(褐)+ daktylos(指),指褐色指状细胞;种名 tricornutum 意为『具三角的』,指三突梭形。",
    discovery:
      "1897 年 Bohlin 描述定名;20 世纪因培养简易、形态可塑(梭形、三出、卵圆可互变)而渐成模式硅藻。",
    genomeInfo:
      "基因组约 27.4 Mb(2008 年测序),为第二个完成测序的硅藻;是少数可在缺硅条件下增殖的模式硅藻。",
    ecologyRole:
      "近海内湾与岩池适应性强的真核微藻,形态型随环境转换;耐富营养与温度波动,常成围隔实验与养殖水体的优势种群。",
    researchValue:
      "遗传操作最成熟的硅藻之一(基因敲低与 CRISPR 体系);脂质与岩藻黄素高附加值产物合成的底盘细胞;形态建成与环境适应研究样本。",
  },

  // 20. 金黄团藻
  {
    latin: "Volvox aureus",
    etymology:
      "属名 Volvox 源自拉丁语 volvere(滚动),指群体滚动前进;种名 aureus 拉丁语『金黄色的』,述其色素体色泽。",
    discovery:
      "滚动的绿球自列文虎克时代即入显微观察;林奈 1758 年命名属内代表;金黄团藻 19 世纪独立成种,渐成演化议题常客。",
    ecologyRole:
      "温暖淡水池塘的浮游群体绿藻,数百至数千细胞组成中空球体,内藏子群体;群体游动趋光,滋生季暴发使水色转绿。",
    researchValue:
      "体细胞-生殖细胞分工与群体运动协调的演化实验材料;与模式种 V. carteri 共同支撑『由单细胞到多细胞个体』的起源研究。",
  },

  // 21. 石莼
  {
    latin: "Ulva lactuca",
    etymology:
      "属名 Ulva 为拉丁语对水生草藻的泛称;种名 lactuca 即『莴苣』,指叶状体形似莴苣叶,故俗称海莴苣。",
    discovery:
      "1753 年林奈《植物种志》定名,是最早依双名法命名的海藻之一;其富营养条件下的暴发促成『绿潮』概念的形成。",
    ecologyRole:
      "中潮带至浅海固着岩礁的片状绿藻,耐盐波动与富营养;氮磷充足时大量增殖,是绿潮事件的常见组成(黄海大绿潮由近缘浒苔主导)。",
    researchValue:
      "食用『海白菜』与饲料利用;硫酸多糖 ulvan 的结构与活性研究对象;绿潮成因与氮磷生物滤除评估的对照种。",
  },

  // 22. 普通小球藻
  {
    latin: "Chlorella vulgaris",
    etymology:
      "属名 Chlorella 为希腊语 chloros(绿)的指小词,意为『小绿藻』;种名 vulgaris 拉丁语『普通的』,言其常见。",
    discovery:
      "1890 年 Beijerinck 分离培养并命名;20 世纪 40-50 年代 Calvin 以其做碳同位素脉冲追踪实验,阐明光合碳循环并获 1961 年诺贝尔化学奖。",
    genomeInfo:
      "测序株 C-169 基因组约 46 Mb,含大量转座与病毒来源序列;不同株系间基因组大小差异显著。",
    ecologyRole:
      "全球淡水与土壤常见微绿藻,繁殖迅速,是基础生产力的重要组成;高 CO2 与富营养条件下常占优势,亦可生活于原生动物细胞内。",
    researchValue:
      "光合碳循环阐明的功勋材料;健康食品(CGF 生长因子)、饲料与 CO2 固定、废水处理反应器的常客;微藻大规模培养工艺的起点物种。",
  },

  // 23. 海带
  {
    latin: "Saccharina japonica",
    etymology:
      "属名 Saccharina 源自拉丁语 saccharum(糖),指富含甘露醇的甜味;种名 japonica『日本的』,指模式产地日本海沿岸。",
    discovery:
      "1851 年 Areschoug 以昆布属描述,2006 年依分子证据移入 Saccharina;中国 1950 年代经曾呈奎等突破筏式养殖与夏苗法,跃居世界产量第一。",
    genomeInfo:
      "基因组约 540 Mb(2015 年发表),揭示褐藻糖胶合成与卤代物代谢的遗传基础。",
    ecologyRole:
      "冷温带潮下带大型褐藻,固着岩礁形成成片海藻场,为鱼虾贝提供栖息与育苗场;春夏快速生长,是沿岸蓝碳与藻场产业的支柱。",
    researchValue:
      "中国年产量居全球首位的养殖海藻;碘、褐藻胶、甘露醇的工业原料与大宗食品;褐藻糖胶药理活性与基因组育种的前沿对象。",
  },

  // 24. 巨藻
  {
    latin: "Macrocystis pyrifera",
    etymology:
      "属名 Macrocystis = 希腊 makros(巨)+ kystis(囊),指巨大浮囊;种名 pyrifera = 拉丁 pyrus(梨)+ ferre(携带),指梨形浮器。",
    discovery:
      "18 世纪欧洲博物学家据航海标本描述为『梨形墨角藻』,后经瑞典 C. Agardh 建属组合为现名;20 世纪成为海藻林生态学旗舰物种。",
    ecologyRole:
      "东北太平洋海藻林冠层奠基种,叶柄日伸长可达数十厘米;为海獭、鱼群与无脊椎动物构筑三维栖息地,生产力可媲美雨林。",
    researchValue:
      "海獭-海胆-巨藻营养级联(1974 年 Estes 等)是保护生物学教科书案例;加州商业化采收制褐藻胶;蓝碳与海洋保护区设计的研究核心。",
  },

  // 25. 羊栖菜
  {
    latin: "Sargassum fusiforme",
    etymology:
      "属名 Sargassum 源自伊比利亚语 sargazo(海面漂藻),马尾藻海亦因之得名;种名 fusiforme 拉丁语『纺锤形的』,指膨大如纺锤的气枝。",
    discovery:
      "中国药食两用逾千年,为《中国药典》『海藻』药材基原之一;学名经 19 世纪 Harvey 描述、20 世纪初 Setchell 组合确立。",
    ecologyRole:
      "暖温带潮间带至潮下褐藻,固着岩礁形成马尾藻场,为幼鱼与小动物提供庇护;气枝助叶片上浮采光,是海藻场修复常用种。",
    researchValue:
      "浙江洞头为『中国羊栖菜之乡』,干品主销日本;羊栖菜多糖抗肿瘤与免疫调节药理研究活跃;育苗与浮筏养殖技术成熟,兼生态修复用途。",
  },

  // 26. 水云
  {
    latin: "Ectocarpus siliculosus",
    etymology:
      "属名 Ectocarpus = 希腊 ektos(外)+ karpos(果),指生殖结构外生;种名 siliculosum 意为『多小荚的』,指荚状多室孢子囊。",
    discovery:
      "19 世纪初由北欧藻类学者定名;2010 年成为首个完成全基因组测序的褐藻,确立其褐藻模式生物地位。",
    genomeInfo:
      "基因组约 200 Mb(2010 年,《自然》),为首个测序的褐藻;具 U/V 性染色体,含褐藻糖胶代谢相关大基因家族。",
    ecologyRole:
      "世界性分布的丝状褐藻,附生于岩砾、大藻与缆绳等基质;等世代交替生活史,是潮间带褐藻群落的先锋种。",
    researchValue:
      "褐藻界的『拟南芥』:生活史、形态建成、胁迫响应及与褐藻病毒的互作研究均以其为模式;气候变化生态基因组学的样本。",
  },

  // 27. 条斑紫菜
  {
    latin: "Pyropia yezoensis",
    etymology:
      "属名 Pyropia 取希腊语 pyr(火)之意,指紫红色泽如火;种名 yezoensis『虾夷的』,即北海道旧称,指模式产地。",
    discovery:
      "1932 年定名为 Porphyra yezoensis,2011 年移入新属 Pyropia;1949 年 Drew-Baker 揭示壳斑藻即其孢子体,奠定现代紫菜人工养殖。",
    ecologyRole:
      "冷温带潮间带红藻:叶状体冬季生于中低潮带岩礁,耐受周期干露;丝状体钻入贝壳越夏,生活史与潮间带节律深度耦合。",
    researchValue:
      "中日韩紫菜产业主力栽培种,江苏条斑紫菜为海苔原料;丝状体育苗与壳孢子采苗技术是海藻养殖学的奠基成果。",
  },

  // 28. 龙须菜
  {
    latin: "Gracilaria lemaneiformis",
    etymology:
      "属名 Gracilaria 源自拉丁语 gracilis(纤细),指细枝藻体;种名意为『似 Lemanea 藻形的』,借形态比似淡水红藻 Lemanea。",
    discovery:
      "19 世纪上半叶经 Bory 与 Greville 之手描述组合成现名;中国 20 世纪末实现规模化养殖,成为琼脂与鲍饵料产业支柱之一。",
    ecologyRole:
      "暖温带沿岸固着沙砾的多年生红藻,耐割刈、再生力强;为鲍等草食动物优质饵料,耐污适应力使其亦用于近岸生态修复。",
    researchValue:
      "琼脂工业重要原料藻;规模化养殖支撑南方鲍鱼饲料与藻胶产业;藻红蛋白天然色素及重金属吸附研究的常用材料。",
  },

  // 29. 珊瑚藻
  {
    latin: "Corallina officinalis",
    etymology:
      "属名 Corallina 源自拉丁语 corallium(珊瑚),指钙化外观似珊瑚;种名 officinalis 意为『药用的』,源于欧洲药坊曾作药用。",
    discovery:
      "1753 年林奈《植物种志》定名,是最早科学描述的钙化红藻之一;现代成为海洋酸化研究的世界标准指示种。",
    ecologyRole:
      "钙化红藻,在潮间带形成硬质结壳并产生钙质沙;为小型无脊椎动物提供微生境;对海水 CO2 升高敏感,壳体易受酸化侵蚀。",
    researchValue:
      "海洋酸化的经典指示生物;高镁方解石骨骼生长环层用作古环境代用记录;钙化机理与藻礁生态的研究样本。",
  },

  // 30. 刚地弓形虫
  {
    latin: "Toxoplasma gondii",
    etymology:
      "属名 Toxoplasma = 希腊 toxon(弓)+ plasma(形体),指新月形虫体;种名纪念最初宿主、北非啮齿动物栉鼠(当地称 gundi)。",
    discovery:
      "1908-1909 年 Nicolle 与 Manceaux 在突尼斯自栉鼠发现并描述,同期 Splendore 在巴西家兔中独立发现;猫科终末宿主迟至 1970 年前后阐明。",
    genomeInfo:
      "基因组约 65 Mb、14 条染色体;ME49 等多个克隆株已测序,兼有保守区与快速演化的效应子家族。",
    ecologyRole:
      "全球性细胞内寄生虫:猫科为终末宿主、卵囊随粪播散,几乎所有恒温动物(含人)为中间宿主,包囊长期潜伏于肌肉与脑;经肉食、猫粪与母婴传播。",
    researchValue:
      "免疫学明星病原(Th1/IFN-γ 抗感染范式);机会性感染与产前筛查的医学重点;对啮齿类『恐猫反射消除』的行为操纵成为操控宿主研究的范式。",
  },

  // 31. 毕克卷转虫
  {
    latin: "Ammonia beccarii",
    etymology:
      "属名 Ammonia 得名于埃及神阿蒙——壳室旋卷如公羊角;种名纪念意大利博物学家 Beccari。",
    discovery:
      "1758 年林奈置于鹦鹉螺属(Nautilus beccarii),后经多代修订归入卷转虫属;因壳形高度可变,20 世纪以来证实为隐存种复合群。",
    ecologyRole:
      "全球沿岸浅海泥沙底最常见底栖有孔虫之一;广盐广温,耐受河口低盐低氧;死亡壳体沉积地层,记录环境变迁。",
    researchValue:
      "古海洋学经典:壳体形态与元素同位素重建盐度、温度与缺氧历史;分子标记厘清隐存种,成为形态种与分子种讨论的教科书案例。",
  },

  // 32. 致病疫霉
  {
    latin: "Phytophthora infestans",
    etymology:
      "属名 Phytophthora = 希腊 phyton(植物)+ phthora(毁坏),意为『毁植物者』;种名 infestans 拉丁语『侵扰为害的』。",
    discovery:
      "1845 年起引发爱尔兰马铃薯晚疫大饥荒,约百万人死亡、逾百万人移民;1846 年 Berkeley 描述病原,1876 年 de Bary 建疫霉属,本种为模式种。",
    genomeInfo:
      "基因组约 230-240 Mb、富含反转座子(2009 年测序);效应子集中于重复区的『双速基因组』概念即由此提出。",
    ecologyRole:
      "卵菌类病原,侵染马铃薯与番茄的叶茎薯块,低温高湿下暴发流行;以病薯越冬,墨西哥中部为遗传多样性中心。",
    researchValue:
      "植物病理学奠基病原:效应子运送(RxLR 基序)与抗病基因育种研究的持续前沿;晚疫病防控与全球粮食安全的活教材。",
  },

  // 33. 卵形单领虫
  {
    latin: "Monosiga ovata",
    etymology:
      "属名 Monosiga 由希腊语 monos(单一)加表『独自生活』的词根构成,指单生而非群体;种名 ovata 拉丁语『卵形的』,述其体型。",
    discovery:
      "1880 年前后 Saville-Kent 等系统描述领鞭毛虫并建立本属;20 世纪末分子系统学确立其为动物最近缘的单细胞类群。",
    ecologyRole:
      "海洋与淡水中的滤食性领鞭毛虫,以领毛捕获细菌,衔接细菌与浮游食物网;附生或游泳生活,是微食物环的重要组分。",
    researchValue:
      "动物的单细胞近亲:研究多细胞性起源的首选外群;近缘短颈单领虫 2008 年基因组发现钙黏蛋白与酪氨酸激酶先于动物出现,改写黏附信号起源叙事。",
  },

  // 34. 卡氏棘阿米巴
  {
    latin: "Acanthamoeba castellanii",
    etymology:
      "属名 Acanthamoeba = 希腊 akantha(棘刺)+ amoeba(变形虫),指细刺状伪足;种名纪念意大利医师 Castellani。",
    discovery:
      "20 世纪 30 年代自培养物污染源、土壤与水体分离,经 Castellani、Volkonsky、Douglas 等厘清属种;近年因角膜炎报告增多而备受重视。",
    genomeInfo:
      "标准实验株 Neff 基因组逾 40 Mb,富含重复与转座成分,基因数目庞大。",
    ecologyRole:
      "全球土壤、淡水与供水系统中的自由生活阿米巴,滋养体捕食细菌,逆境时形成抗性包囊;污染水可致棘阿米巴角膜炎,免疫受损者可发肉芽肿性脑炎。",
    researchValue:
      "细胞运动、巨吞饮与囊泡运输研究模型;拟菌病毒等巨型 DNA 病毒以其为『培养皿』被发现,开辟巨病毒研究领域;角膜炎预防的教育范例。",
  },

  // 35. 卡耶塔环孢子虫
  {
    latin: "Cyclospora cayetanensis",
    etymology:
      "属名 Cyclospora = 希腊 kyklos(环)+ sporos(孢子),指圆形卵囊;种名源于秘鲁卡耶塔诺·埃雷迪亚大学,纪念其研究团队的奠基工作。",
    discovery:
      "1979 年 Ashford 在巴布亚新几内亚患者肠道发现『蓝细菌样体』;1990 年代秘鲁团队确证为球虫新种并命名;1996 年美国覆盆子相关逾千例暴发使其广为人知。",
    ecologyRole:
      "人类专性肠道球虫,卵囊随粪排出后需在外界发育数日至数周方具感染性;经污染水与食物(莓果、罗勒、生菜)传播,热带亚热带多见。",
    researchValue:
      "进口生鲜食品安全监管的代表病原(美国曾对高危产地实施季节性进口限制);分子检测与暴发溯源研究的公共卫生场景样本。",
  },
];
