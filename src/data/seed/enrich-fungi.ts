import { EnrichEntry } from "../types";

// 真菌界(Fungi)已有物种的科学档案补强数据 —— Task 3-g。
// 覆盖 DB 中全部 31 个真菌物种(子囊菌门 11 / 担子菌门 17 / 毛霉门 1 / 壶菌门 1 / 球囊菌门 1),
// 每条 4-5 个字段。科学准确性优先:基因组大小等数据仅在有把握时给出并加"约"字,
// 命名与发现史依 Index Fungorum 与主流文献的通行记载;不确定的字段宁缺毋滥,一律省略。
export const enrichFungi: EnrichEntry[] = [
  // ===================== 酵母与模式真菌 =====================
  {
    latin: "Saccharomyces cerevisiae",
    etymology:
      "属名由希腊语 sakcharon(糖)与 mykēs(真菌)复合而成,意为嗜糖之菌;种加词取自拉丁语,义为啤酒。",
    discovery:
      "人类自新石器时代随酿酒活动驯化此菌;1837 年 Meyen 予以科学描述,1883 年 Hansen 在嘉士伯实验室创立纯种培养法,巴斯德则已证明发酵由活酵母引起。",
    genomeInfo:
      "参考菌株 S288C 基因组约 12.1 Mb,含 16 条染色体与约六千个基因;1996 年成为首个完成全基因组测序的真核生物。",
    ecologyRole:
      "自然界栖居葡萄等果实表皮与树液渗流处,缺氧时行发酵产乙醇;数千年来与人类酿造及烘焙环境深度绑定。",
    researchValue:
      "真核细胞生物学的头号模式:细胞周期、膜泡运输与蛋白分泌研究三获诺贝尔奖,如今又是合成生物学'人工酵母基因组计划'的底盘。",
  },
  {
    latin: "Neurospora crassa",
    etymology:
      "属名由希腊语 neuron(神经)与 spora(孢子)构成,指子囊孢子表面的神经样纵纹;种加词为拉丁语'厚而粗糙的'。",
    discovery:
      "1843 年法国面包房的'红面包霉'流行引人注目,1927 年 Shear 与 Dodge 定名并确立其遗传学地位,1941 年 Beadle 与 Tatum 借此提出一基因一酶假说。",
    genomeInfo:
      "基因组约 40 Mb,7 条染色体,约一万个基因;2003 年完成测序,DNA 甲基化(MIP)与光应答通路研究尤为深入。",
    ecologyRole:
      "腐生于植物残体与土壤,在火烧迹地率先爆发定殖,是森林火灾后有机质再循环的先锋分解者。",
    researchValue:
      "1958 年诺贝尔生理学奖背后的功臣;昼夜节律分子钟框架率先在其体内建立,至今仍是表观遗传与生物钟研究主力。",
  },

  // ===================== 工业与医学真菌(子囊菌) =====================
  {
    latin: "Penicillium chrysogenum",
    etymology:
      "属名源自拉丁语 penicillus(小画笔),形容帚状分枝的分生孢子梗;种加词意为'产金的',指菌落背面渗出金黄色素。",
    discovery:
      "弗莱明 1928 年发现青霉素所用菌株实为近缘的 P. rubens;1941 年自美国甜瓜分离的 NRRL 1951 株经持续诱变选育,支撑了二战期间的大规模量产。",
    genomeInfo:
      "基因组约 32 Mb;工业高产菌株经数十年诱变积累大量染色体变异,青霉素合成基因簇整体位于同一染色体区段。",
    ecologyRole:
      "土壤与腐烂果蔬上的常见腐生菌,沿海与冷凉地区尤多,干燥孢子随气流长距离扩散并定殖含糖基质。",
    researchValue:
      "青霉素的工业之源,开启抗生素时代;次级代谢基因簇的调控研究亦使其成为真菌代谢工程的教科书范例。",
  },
  {
    latin: "Aspergillus niger",
    etymology:
      "属名取自拉丁语 aspergillum(洒圣水的刷子),指放射状分生孢子头形似刷头;种加词 niger 意为'黑色的'。",
    discovery:
      "1867 年 van Tieghem 定名;1917 年前后 Currie 论证其柠檬酸发酵潜力,数年后即实现工业化生产,奠定真菌有机酸工业。",
    genomeInfo:
      "基因组约 35 Mb,8 条染色体,约 1.4 万个基因;工业参考株 CBS 513.88 与 ATCC 1015 均已完成测序。",
    ecologyRole:
      "分解力极强的土壤腐生菌,分泌淀粉酶、果胶酶等大量胞外酶,积极参与自然界有机质的降解与矿化。",
    researchValue:
      "全球约九成柠檬酸由其发酵生产,获美国 FDA 的 GRAS 安全地位;亦为工业酶制剂与异源蛋白表达的主力平台。",
  },
  {
    latin: "Aspergillus flavus",
    etymology:
      "属名源自拉丁语 aspergillum(洒圣水的刷子),指分生孢子头形态;种加词 flavus 为拉丁语'黄色的',指黄绿色孢子头。",
    discovery:
      "1809 年 Link 定名;1960 年英国'火鸡 X 病'致约十万只火鸡死亡,追溯至其污染的花生粕,次年即分离鉴定出黄曲霉毒素。",
    genomeInfo:
      "参考菌株 NRRL 3357 基因组约 37 Mb,黄曲霉毒素合成基因成簇排列,已随基因组测序计划完成解析。",
    ecologyRole:
      "土壤与植物际的常见腐生兼弱寄生菌,干旱与虫伤等逆境下在玉米、花生籽仁中大量产毒,温暖储粮环境尤甚。",
    researchValue:
      "黄曲霉毒素 B1 为 IARC 一类致癌物,是全球食品安全限量标准与'不产毒株竞争法'生物防控的核心对象。",
  },
  {
    latin: "Fusarium oxysporum",
    etymology:
      "属名源自拉丁语 fusus(纺锤),指镰形大分生孢子;种加词由希腊语 oxys(尖锐)与 spora(孢子)构成,指孢子顶端渐尖。",
    discovery:
      "1824 年 Schlechtendal 定名;20 世纪确立的'专化型'体系解释了其寄主专化性,香蕉 TR4 小种近年震动全球产业。",
    genomeInfo:
      "番茄专化型菌株 4287 基因组约 60 Mb,携带可在菌株间水平转移的'谱系特异性'致病染色体。",
    ecologyRole:
      "土壤中的腐生-寄生双面体:可长期在土壤腐生存活,侵入根系后定殖维管束并堵塞导管,致植株整株萎蔫。",
    researchValue:
      "植物病理学模式菌;其致病染色体水平转移的发现改写了学界对真菌致病性演化机制的认知。",
  },
  {
    latin: "Claviceps purpurea",
    etymology:
      "属名由拉丁语 clavus(棒)与 caput(头)组成,指棒槌状子座;种加词 purpurea 为拉丁语'紫色的',指菌核颜色。",
    discovery:
      "1853 年 Tulasne 兄弟完整阐明其生活史;1918 年 Stoll 分离出麦角胺,1938 年 Hofmann 合成 LSD,皆源于麦角生物碱化学。",
    genomeInfo:
      "参考基因组约 30 Mb;生物碱合成基因成簇排列,与近缘麦角菌类的比较组学研究活跃。",
    ecologyRole:
      "专性寄生于黑麦等禾草花器,菌核随收获混杂谷物并落土越冬,萌发后再侵染花器,冷凉多雨年份流行加剧。",
    researchValue:
      "麦角碱家族衍生出产科止血药麦角新碱、偏头痛药麦角胺与致幻剂 LSD,是药学史与毒理学交汇的经典物种。",
  },
  {
    latin: "Ophiocordyceps sinensis",
    etymology:
      "属名由希腊语 ophis(蛇)与 kordyks(棒)构成,形容纤细蛇形的子座;种加词 sinensis 为拉丁语'中国的',指主产区。",
    discovery:
      "18 世纪法国传教士杜阿尔德向欧洲介绍此物;1878 年 Berkeley 予以定名,2007 年分子系统学将其移入新属 Ophiocordyceps。",
    genomeInfo:
      "多株全基因组测序已发表,不同菌株基因组大小差异显著,资源遗传学与活性成分研究持续深入。",
    ecologyRole:
      "高原蝙蝠蛾幼虫的专性寄生真菌,调节宿主昆虫种群密度,是高寒草甸食物网中独特的寄生环节。",
    researchValue:
      "价格高企的传统药材,资源萎缩推动菌丝体发酵替代品研究,其物种界定与药效成分至今仍存争议。",
  },
  {
    latin: "Cordyceps militaris",
    etymology:
      "属名由希腊语 kordyle(棒)与'头'词尾构成,指棒状子座;种加词 militaris 为拉丁语'军人的',指子座挺立如列阵士兵。",
    discovery:
      "林奈 1753 年以珊瑚菌属物种记载,1833 年 Link 组合至虫草属,为该属模式种;中国近年实现大规模工厂化培育。",
    genomeInfo:
      "全基因组测序已完成;虫草素与喷司他丁'协同合成'的通路已在其体内得到阐明。",
    ecologyRole:
      "土壤中鳞翅目蛹的专性寄生菌,子座破土释放孢子再侵染,构成虫生真菌典型的年度生活环。",
    researchValue:
      "冬虫夏草的近缘可培养替代种,是虫草素药源开发与虫生真菌-昆虫互作研究的第一模式。",
  },
  {
    latin: "Tuber melanosporum",
    etymology:
      "属名 Tuber 为拉丁语'块茎、块状物';种加词由希腊语 melas(黑)与 spora(孢子)合成,指其黑褐色孢子。",
    discovery:
      "1831 年 Vittadini 在其意大利块菌专著中定名;2000 年代微卫星与群体基因组研究揭示其雌雄异株、严格异宗配合的繁育结构。",
    genomeInfo:
      "2010 年完成基因组测序并发表于 Nature,为首个测序的外生菌根子囊菌;基因组约 125 Mb,转座元件占比异常之高。",
    ecologyRole:
      "与橡树、榛树等形成外生菌根,子实体地下发育,以浓烈气味诱引动物掘食传播孢子,参与钙质林地养分循环。",
    researchValue:
      "黑松露经济的科学核心;以育苗接种建立'块菌园'的半人工栽培模式,亦是菌根共生与挥发性信号演化研究对象。",
  },
  {
    latin: "Morchella esculenta",
    etymology:
      "属名 Morchella 来自德语 Morchel,即羊肚菌的欧洲古称;种加词 esculenta 为拉丁语'可食的'。",
    discovery:
      "林奈 1753 年将其记为马鞍菌属物种,1822 年 Persoon 组合入羊肚菌属;2012 年起分子系统学将北美多个隐存种自本种分出。",
    genomeInfo:
      "羊肚菌属多个物种的基因组近年相继发表,为菌核形成、出菇机理与人工驯化研究奠定数据基础。",
    ecologyRole:
      "春季腐生于林地凋落层并分解腐殖质;火烧迹地常爆发性出菇,其与树木是否构成菌根关系仍有争议。",
    researchValue:
      "名贵食用菌代表;中国以'外营养袋'技术突破田间栽培并实现量产,是近年菌物驯化最成功的范例之一。",
  },

  // ===================== 医学相关担子菌 =====================
  {
    latin: "Cryptococcus neoformans",
    etymology:
      "属名由希腊语 kryptos(隐匿)与 kokkos(颗粒)构成,指其貌不扬的酵母态;种加词意为'新成形的',定名时被视为新菌。",
    discovery:
      "1894-1895 年 Busse 与 Sanfelice 先后自患者与牛乳分离该菌;1975 年 Kwon-Chung 发现其有性型,将其归入担子菌门。",
    genomeInfo:
      "参考株 H99 基因组约 19 Mb,2005 年发表于 Science;性决定位点庞大逾十万碱基,结构异常复杂。",
    ecologyRole:
      "腐生于鸽粪富集的土壤与腐朽木材,孢子经呼吸道进入宿主,以荚膜与黑色素抵御免疫细胞的清除。",
    researchValue:
      "人类真菌病研究的首要模式菌之一;荚膜合成与 37 度高温适应的演化机制被广泛用作教材案例。",
  },
  {
    latin: "Ustilago maydis",
    etymology:
      "属名源自拉丁语 ustus(烧焦的),指菌瘿中黑粉状孢子团似焦炭;种加词 maydis 意为'玉米的',词根出自泰诺语 mahiz。",
    discovery:
      "19 世纪初 de Candolle 记载,1842 年 Corda 确立现名;2006 年其全基因组登上 Nature,成为植物-病原互作分子研究的范式。",
    genomeInfo:
      "基因组约 20.5 Mb,2006 年发表于 Nature;精简的基因组与成簇排列的效应蛋白基因曾刷新对活体营养病原的认知。",
    ecologyRole:
      "玉米专性活体营养病原,双核菌丝只在活组织定殖并诱导肿瘤状菌瘿,冬孢子越冬萌发后重启侵染循环。",
    researchValue:
      "玉米-真菌互作与双核体形态建成的经典模式菌,遗传操作便利,亦用作工业酶与蛋白表达平台。",
  },
  {
    latin: "Puccinia graminis",
    etymology:
      "属名致敬意大利解剖学家 Tommaso Puccini;种加词 graminis 为拉丁语'禾草的',指其寄主范围。",
    discovery:
      "1794 年 Persoon 定名;1916 年北美大流行催生抗锈育种,1927 年 Craigie 阐明其性孢子器功能与转主寄生,1999 年强毒小种 Ug99 再拉全球警报。",
    genomeInfo:
      "小麦秆锈菌基因组约 89 Mb,2011 年与杨树叶锈菌同期发表,富含候选效应蛋白家族。",
    ecologyRole:
      "专性活体寄生的转主寄生菌:小檗与禾草两种寄主承载五种孢子型,夏孢子随高空气流实现跨洲传播。",
    researchValue:
      "植物病理学的教科书物种;Sr 抗病基因与无毒基因的军备竞赛研究直接推动'基因堆叠'抗病育种。",
  },
  {
    latin: "Batrachochytrium dendrobatidis",
    etymology:
      "属名由希腊语 batrachos(蛙)与 chytrion(小罐)构成,指寄生于蛙类的罐形孢子囊;种加词指其首个记录宿主箭毒蛙属。",
    discovery:
      "1999 年 Longcore 等予以命名;博物馆标本回溯将其踪迹推至 20 世纪初,但起源地(亚洲或非洲)至今存争议。",
    genomeInfo:
      "基因组约 24 Mb;全球流行株系 BdGPL 毒力最强,已随两栖类贸易侵袭各大洲。",
    ecologyRole:
      "两栖类皮肤专性寄生物,经水中游动孢子扩散;非洲爪蟾等自然宿主可携带而不发病,构成隐性传染库。",
    researchValue:
      "野生动物疫病研究的旗舰案例,驱动全球两栖类监测、微生物组防控与迁地保育行动。",
  },
  {
    latin: "Rhizophagus irregularis",
    etymology:
      "属名由希腊语 rhiza(根)与 phagos(取食、亲根)构成,指其与根相依的习性;种加词意为'不规则的',指孢子外形。",
    discovery:
      "1982 年以 Glomus intraradices 之名记载,2011 年分子系统学正名为现名;模式菌株 DAOM 197198 分离自加拿大农田。",
    genomeInfo:
      "参考株 DAOM 197198 基因组约 153 Mb,2013 年发表于 Nature;缺失脂肪酸从头合成的关键基因,须仰赖宿主脂质。",
    ecologyRole:
      "丛枝菌根共生体,与绝大多数陆地植物交换磷与碳,土壤菌丝网络还可在相邻植株间传递养分。",
    researchValue:
      "菌根共生分子机理研究的世界模式种,亦是全球商业化农业菌剂接种物的主力菌种。",
  },
  {
    latin: "Rhizopus stolonifer",
    etymology:
      "属名由希腊语 rhiza(根)与 pous(足)构成,指假根之上生出孢囊梗;种加词意为'具匍匐茎的',指发达的匍匐菌丝。",
    discovery:
      "1818 年 Ehrenberg 以毛霉属物种记载,1902 年 Vuillemin 移入根霉属;1904 年 Blakeslee 借根霉类发现真菌的异宗配合现象。",
    ecologyRole:
      "抢占糖分基质的先锋腐生菌,生长速度极快,是果蔬软腐与食品霉变的主要肇事者,偶致免疫力低下者感染。",
    researchValue:
      "异宗配合现象的发现材料,奠定接合菌遗传学基础;亦为食品防腐检测与毛霉病研究的常用菌种。",
  },

  // ===================== 食用与药用担子菌 =====================
  {
    latin: "Agaricus bisporus",
    etymology:
      "属名 Agaricus 沿自古希腊语 agarikon 的植物学旧名,林奈借作伞菌属名;种加词意为'二孢的',指担子上通常仅两枚担孢子。",
    discovery:
      "1926 年美国菇农 Lambert 发现白色突变株,成为全球白蘑菇产业的共同始祖;2012 年双核参考基因组发表。",
    genomeInfo:
      "基因组约 30 Mb;测序揭示栽培种遗传基础极为狭窄,育种亟需野生种质的引入。",
    ecologyRole:
      "草原腐殖质与堆肥上的腐生菌,自然界参与畜粪与植物残体的降解;商业化堆肥栽培已逾百年。",
    researchValue:
      "全球栽培量最大的食用菌;其'二孢'减数分裂产物排列与采后后熟衰老机制是独特的科学研究素材。",
  },
  {
    latin: "Lentinula edodes",
    etymology:
      "属名 Lentinula 为 Lentinus(源自拉丁语 lentus,坚韧)的指小词;种加词 edodes 一般认为源自日文名'椎茸'的拉丁转写。",
    discovery:
      "19 世纪 70 年代 Berkeley 依日本标本定名,1976 年 Pegler 移入 Lentinula 属;日本段木栽培与中国传统栽培先后迈入菌种化时代。",
    genomeInfo:
      "全基因组测序已完成,其木质纤维素降解酶系相关基因家族的扩张受到持续关注。",
    ecologyRole:
      "阔叶枯木上的白腐分解者,自然界降解木质素与纤维素,深度参与森林物质循环。",
    researchValue:
      "世界第二大栽培食用菌;香菇多糖已作肿瘤免疫辅助剂上市,降解酶系与出菇机理研究持续深入。",
  },
  {
    latin: "Pleurotus ostreatus",
    etymology:
      "属名由希腊语 pleuron(体侧)与 ous(耳)构成,指菌盖侧生似耳;种加词为拉丁语'似牡蛎的',形容菌盖形态。",
    discovery:
      "18 世纪 70 年代 Jacquin 描述定名,1871 年 Kummer 移入侧耳属;一战期间德国发展木屑栽培以补充战时食物。",
    genomeInfo:
      "全基因组测序已完成,庞大的木质素降解酶基因家族使其成为白腐酶学研究的参照物种。",
    ecologyRole:
      "阔叶朽木白腐菌,兼以毒素麻痹线虫补充氮源的'食线虫'策略,生态角色灵活多样。",
    researchValue:
      "最易栽培的世界性食用菌,是秸秆转化蛋白质的循环农业典范;亦是木质素降解与真菌捕食行为研究模式。",
  },
  {
    latin: "Tremella fuciformis",
    etymology:
      "属名源自拉丁语 tremere(颤动),指胶质子实体颤巍巍的质感;种加词 fuciformis 意为'形似墨角藻的'。",
    discovery:
      "1856 年 Berkeley 定名;中国清代已发展砍花式半人工栽培,20 世纪 70 年代后纯菌种与袋料栽培普及,福建古田成为'银耳之乡'。",
    ecologyRole:
      "阔叶朽木上的胶质腐生菌,自然界需借助伴生菌分解基质获取碳源,形成独特的'伴生菌-银耳'联合体。",
    researchValue:
      "传统滋补食用菌,银耳多糖的保湿与免疫调节研究活跃;依赖伴生菌的营养方式亦是菌物互作研究素材。",
  },
  {
    latin: "Ganoderma lucidum",
    etymology:
      "属名由希腊语 ganos(光泽)与 derma(皮肤)构成,指漆样光泽的菌盖;种加词 lucidum 为拉丁语'明亮的'。",
    discovery:
      "1781 年 Curtis 以牛肝菌属物种记载,1881 年 Karsten 移入其新建的灵芝属;中国《神农本草经》早已将其列为上品。",
    genomeInfo:
      "全基因组测序已完成,为三萜与多糖类活性成分的生物合成研究提供了组学基础。",
    ecologyRole:
      "阔叶树立木与伐桩上的白腐菌,降解木质素参与森林碳循环,自然条件下引致树木白色心腐。",
    researchValue:
      "灵芝多糖与三萜的免疫调节药理文献量居药用真菌之首,亦是活性成分生物合成研究的模式物种。",
  },
  {
    latin: "Trametes versicolor",
    etymology:
      "属名源自拉丁语 trama(织物的纬纱、髓层),指疏松的菌髓结构;种加词 versicolor 为拉丁语'变色的',指多彩同心环带。",
    discovery:
      "林奈 1753 年定名,20 世纪 20 年代 Lloyd 组合至栓菌属;1977 年其多糖制剂 PSK 在日本获批用于肿瘤辅助治疗。",
    ecologyRole:
      "全球性硬木白腐主力菌,高效降解木质素,是森林碳循环与木材耐久性测试的标准菌种。",
    researchValue:
      "漆酶基因家族庞大的白腐模式菌;PSK 与云芝糖肽 PSP 的免疫调节药理已积累数十年临床证据。",
  },
  {
    latin: "Hericium erinaceus",
    etymology:
      "属名源自拉丁语 hericius(刺猬),指刺毛下垂的子实体;种加词 erinaceus 同样意为'刺猬的'。",
    discovery:
      "Bulliard 于 18 世纪末描述,1797 年 Persoon 组合为现名;20 世纪后期实现人工驯化,现为中国主栽珍稀食用菌之一。",
    genomeInfo:
      "已有全基因组测序报道,为猴头菌素类活性成分的生物合成研究提供支撑。",
    ecologyRole:
      "硬木心材白腐菌,致树木心腐并促成树洞形成;成熟子实体靠气流传播担孢子。",
    researchValue:
      "猴头菌素诱导神经生长因子合成的研究热点物种,食药兼用产业价值居珍稀食用菌前列。",
  },
  {
    latin: "Marasmius androsaceus",
    etymology:
      "属名源自希腊语 marasmos(枯萎),指子实体干缩后遇水复苏的习性;种加词转自古希腊药草名 androsakes。",
    discovery:
      "林奈 1753 年记载于伞菌属,1838 年 Fries 移入小皮伞属,为该属的经典老种。",
    ecologyRole:
      "凋落物微型分解者,常成片生于落叶枯枝,是森林凋落物微型食物网的组成部分。",
    researchValue:
      "中国'安络痛'药剂的发酵来源菌,其镇痛活性与倍半萜类成分研究持续推进。",
  },
  {
    latin: "Phallus indusiatus",
    etymology:
      "属名取自希腊语 phallos(阳具),指子实体形态;种加词意为'穿薄纱衣的',形容下垂如裙的网状菌幕。",
    discovery:
      "18 世纪末 Ventenat 描述,后经 Desvaux 组合为现用学名;20 世纪后期中国实现人工驯化,现已规模化栽培。",
    ecologyRole:
      "竹林与阔叶林凋落层的腐生菌,以恶臭产孢体引诱蝇类传播孢子,参与凋落物分解。",
    researchValue:
      "'真菌之花'名贵食用菌;菌蕾破壳后菌柄数小时内快速伸长的过程是担子菌发育生物学经典素材。",
  },

  // ===================== 外生菌根食用菌 =====================
  {
    latin: "Amanita muscaria",
    etymology:
      "属名 Amanita 或源自小亚细亚阿曼山古称;种加词取自拉丁语 musca(苍蝇),因欧洲民俗曾以其制剂毒杀苍蝇。",
    discovery:
      "林奈 1753 年定名,1783 年 Lamarck 移入鹅膏属;鹅膏蕈氨酸与蝇蕈醇于 20 世纪中叶相继鉴定,毒理得以阐明。",
    ecologyRole:
      "与桦、松、云杉形成外生菌根的广布共生菌,随全球针叶树造林被引种扩散至南半球林地。",
    researchValue:
      "童话红伞白点的文化原型;蝇蕈醇作为 GABA 受体激动剂,长期充当神经药理学研究的工具分子。",
  },
  {
    latin: "Amanita phalloides",
    etymology:
      "属名或源自小亚细亚阿曼山古称;种加词由希腊语 phallos(阳具)与 eidos(形)构成,指幼蕾形态。",
    discovery:
      "1833 年 Link 确立现用学名;主要毒素鹅膏毒肽的化学结构由德国化学家 Th. Wieland 于 20 世纪中叶解析。",
    genomeInfo:
      "染色体级参考基因组近年发表;群体基因组学研究揭示其入侵北美源于自欧洲的引入。",
    ecologyRole:
      "与栎、松等形成外生菌根的共生菌,在新大陆的入侵扩散亦随寄主树苗的移植而行。",
    researchValue:
      "鹅膏毒肽是 RNA 聚合酶 II 的特异性抑制剂,作为分子生物学工具广泛使用,亦是真菌毒理学经典模型。",
  },
  {
    latin: "Boletus edulis",
    etymology:
      "属名 Boletus 源出古希腊语对蘑菇的古称;种加词 edulis 为拉丁语'可食的'。",
    discovery:
      "1782 年 Bulliard 定名;21 世纪分子研究确认其为物种复合体,欧洲多个隐存种已被拆分另立。",
    ecologyRole:
      "与栎、松、云杉形成外生菌根,菌丝网络在树木间传递碳与养分,是森林地下网络的关键枢纽。",
    researchValue:
      "无法栽培的顶级山珍,porcini 野生贸易量巨大;菌根合成实验与外生菌根菌生态研究的重要对象。",
  },
  {
    latin: "Cantharellus cibarius",
    etymology:
      "属名为希腊语 kantharos(杯)的指小词,指漏斗形子实体;种加词 cibarius 为拉丁语'可供食用的'。",
    discovery:
      "林奈 1753 年定名,Fries 1821 年组合为现用学名;21 世纪欧洲学者确认其为多物种复合体并陆续拆分。",
    ecologyRole:
      "与松、栎等形成外生菌根,盛产季的子实体为森林动物提供食物,是林下菌物资源的旗舰种。",
    researchValue:
      "无法离体结实的名贵野生食用菌代表,是研究外生菌根菌'不可栽培性'机制的经典对象。",
  },
  {
    latin: "Tricholoma matsutake",
    etymology:
      "属名由希腊语 thrix(毛)与 lōma(衣缘)构成,指菌盖边缘的纤毛;种加词直接转写日文'松茸'(松下之茸)。",
    discovery:
      "20 世纪 30 年代日本学者伊藤与今井依日本标本描述,后由 Singer 组合至口蘑属;全人工栽培至今未能实现。",
    ecologyRole:
      "与赤松等根系形成外生菌根并维持'菌塘'数十年,菌塘随宿主林分演替而兴衰。",
    researchValue:
      "东亚市价最高的野生食用菌,菌根促繁与松林营林研究的核心对象,资源保护议题持续升温。",
  },
];
