import { TaxonSeed } from "../types";

// 原核生物扩充数据:在 prokaryotes.ts(31 物种)基础上新增 15 物种(细菌 12 + 古菌 3)
// 新增中间阶元的 parent 均引用 /tmp/taxa-inventory.tsv 已有单元;物种 parent 引用新属或已有属
// 标签规范:不使用 "flagship"(旗舰物种由主控统一管理)
export const expansionProkaryotes: TaxonSeed[] = [
  // ================================================================
  // 一、细菌域 Bacteria —— 变形菌门 Pseudomonadota 扩充
  // ================================================================

  // ---- ε-变形菌纲支系(幽门螺杆菌)----
  {
    rank: "class",
    latin: "Epsilonproteobacteria",
    chinese: "ε-变形菌纲",
    parent: "Pseudomonadota",
    description:
      "ε-变形菌纲为细长弯曲或螺旋形的革兰氏阴性微需氧菌,多栖于人畜消化道与口腔黏膜,含幽门螺杆菌与空肠弯曲菌等重要病原,现多主张将其独立为弯曲菌门(Campylobacterota)。",
    tags: ["class"],
  },
  {
    rank: "order",
    latin: "Campylobacterales",
    chinese: "弯曲菌目",
    parent: "Epsilonproteobacteria",
    description:
      "弯曲菌目为螺旋形或逗点状的微需氧革兰氏阴性菌,运动活泼,栖于脊椎动物消化道,幽门螺杆菌与空肠弯曲菌分别致消化性溃疡与细菌性胃肠炎。",
    tags: ["order"],
  },
  {
    rank: "family",
    latin: "Helicobacteraceae",
    chinese: "螺杆菌科",
    parent: "Campylobacterales",
    description:
      "螺杆菌科为螺旋形、末端钝圆的微需氧菌,多栖于人畜胃黏膜及肝胆道,产生大量尿素酶以中和胃酸,模式属为螺杆菌属。",
    tags: ["family"],
  },
  {
    rank: "genus",
    latin: "Helicobacter",
    chinese: "螺杆菌属",
    parent: "Helicobacteraceae",
    description:
      "螺杆菌属含逾40种螺旋形微需氧菌,栖于哺乳动物与鸟类的胃黏膜,幽门螺杆菌为人类胃炎与消化性溃疡的主要病原。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Helicobacter pylori",
    chinese: "幽门螺杆菌",
    authority: "(Marshall et al., 1985) Goodwin et al., 1989",
    parent: "Helicobacter",
    ncbiTaxId: 859,
    description:
      "幽门螺杆菌定植于人胃黏膜黏液层,是慢性胃炎、消化性溃疡与胃癌的主要危险因子,被世界卫生组织列为一类致癌因子。该菌以鞭毛运动并借尿素酶中和胃酸,经口口与粪口途径传播,全球约半数人口感染。Marshall与Warren因发现其致病作用获2005年诺贝尔生理学或医学奖。",
    morphology: "S形或弧形弯曲杆菌,端生多根鞘鞭毛,微需氧。",
    habitat: "人胃黏膜表层黏液层与胃窦腺窝,人群间经口传播。",
    distribution: "全球约半数人口感染,发展中国家人群感染率更高。",
    tags: ["species", "人类病原"],
  },

  // ---- 军团菌目支系(嗜肺军团菌)----
  {
    rank: "order",
    latin: "Legionellales",
    chinese: "军团菌目",
    parent: "Gammaproteobacteria",
    description:
      "军团菌目为需氧的革兰氏阴性细长杆菌,生长需半胱氨酸与铁盐,广布于天然水体与人工水系统,可在阿米巴等原生动物体内胞内寄生。",
    tags: ["order"],
  },
  {
    rank: "family",
    latin: "Legionellaceae",
    chinese: "军团菌科",
    parent: "Legionellales",
    description:
      "军团菌科为不发酵糖类的革兰氏阴性杆菌,无法在普通培养基上生长,借气溶胶经肺部侵入人体,致军团菌病与庞蒂亚克热。",
    tags: ["family"],
  },
  {
    rank: "genus",
    latin: "Legionella",
    chinese: "军团菌属",
    parent: "Legionellaceae",
    description:
      "军团菌属含逾60种水源性细菌,在温暖人工水系统中借原生动物增殖,经冷却塔与管路气溶胶传播,嗜肺军团菌为主要致病种。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Legionella pneumophila",
    chinese: "嗜肺军团菌",
    authority: "Brenner et al., 1979",
    parent: "Legionella",
    description:
      "嗜肺军团菌因1976年美国费城退伍军人集会暴发流行而得名,是军团菌病与庞蒂亚克热的病原。它在温暖人工水系统内以原生动物为胞内宿主增殖,经冷却塔与管道气溶胶吸入引发重症肺炎,是现代建筑水环境管理的重点对象。",
    morphology: "革兰氏阴性纤细杆菌,端生或侧生鞭毛,不发酵糖类。",
    habitat: "温水系统、冷却塔、热水器与管道生物膜及阿米巴体内。",
    distribution: "全球分布,夏秋季散发与暴发,医院与旅馆水系统常见。",
    tags: ["species", "人类病原"],
  },

  // ---- 莫拉菌科支系(鲍曼不动杆菌)----
  {
    rank: "family",
    latin: "Moraxellaceae",
    chinese: "莫拉菌科",
    parent: "Pseudomonadales",
    description:
      "莫拉菌科为氧化酶多阳性的革兰氏阴性球菌或短杆菌,严格好氧,含不动杆菌属与莫拉菌属等,多栖于人畜黏膜或寒冷环境。",
    tags: ["family"],
  },
  {
    rank: "genus",
    latin: "Acinetobacter",
    chinese: "不动杆菌属",
    parent: "Moraxellaceae",
    description:
      "不动杆菌属为氧化酶阴性、不运动的球杆菌,环境适应力极强,可长期耐受干燥,其中鲍曼不动杆菌是多重耐药医院感染的代表。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Acinetobacter baumannii",
    chinese: "鲍曼不动杆菌",
    authority: "Bouvet & Grimont, 1986",
    parent: "Acinetobacter",
    description:
      "鲍曼不动杆菌是医院获得性感染的代表性多重耐药菌,常致呼吸机相关肺炎、导管相关血流感染与战创伤伤口感染,被世界卫生组织列为亟需新型抗生素的关键优先病原。其耐受干燥并易获取多种耐药基因,曾在战地伤员感染中被称为'伊拉克杆菌'。",
    morphology: "革兰氏阴性短球杆菌,无鞭毛不运动,氧化酶阴性。",
    habitat: "医院环境、医疗器械表面与人体皮肤及呼吸道黏膜。",
    distribution: "全球医院内流行,热带与亚热带地区环境分离亦多。",
    tags: ["species", "人类病原"],
  },

  // ---- 巴斯德菌目支系(流感嗜血杆菌)----
  {
    rank: "order",
    latin: "Pasteurellales",
    chinese: "巴斯德菌目",
    parent: "Gammaproteobacteria",
    description:
      "巴斯德菌目为小至微小的革兰氏阴性球杆菌或纤细杆菌,常栖于人畜上呼吸道黏膜,生长多需血液因子,含嗜血杆菌属与巴斯德菌属。",
    tags: ["order"],
  },
  {
    rank: "family",
    latin: "Pasteurellaceae",
    chinese: "巴斯德菌科",
    parent: "Pasteurellales",
    description:
      "巴斯德菌科为兼性厌氧的小杆菌,生长依赖氯化血红素与辅酶I等血液因子,多为人畜黏膜共栖菌或病原菌。",
    tags: ["family"],
  },
  {
    rank: "genus",
    latin: "Haemophilus",
    chinese: "嗜血杆菌属",
    parent: "Pasteurellaceae",
    description:
      "嗜血杆菌属为需要血液生长因子的小杆菌,栖于人口咽黏膜,流感嗜血杆菌可致脑膜炎与肺炎,b型结合疫苗已大幅降低其发病率。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Haemophilus influenzae",
    chinese: "流感嗜血杆菌",
    authority: "(Lehmann & Neumann, 1896) Winslow et al., 1917",
    parent: "Haemophilus",
    ncbiTaxId: 727,
    description:
      "流感嗜血杆菌因曾在大流感中被误认作病原而得名,实际定植于上呼吸道,荚膜b型菌株可致儿童脑膜炎、会厌炎与肺炎。其Rd菌株基因组于1995年成为首个完成全基因组测序的自由生活生物,开创了基因组学时代。b型结合疫苗已使相关侵袭性疾病发病率下降逾九成。",
    morphology: "革兰氏阴性小球杆菌,部分菌株具多糖荚膜。",
    habitat: "人上呼吸道黏膜,儿童鼻咽部无症状携带常见。",
    distribution: "全球分布,疫苗普及前侵袭性疾病以五岁以下儿童为主。",
    tags: ["species", "人类病原"],
  },

  // ---- 伯克霍尔德菌目支系(百日咳鲍特菌)----
  {
    rank: "order",
    latin: "Burkholderiales",
    chinese: "伯克霍尔德菌目",
    parent: "Betaproteobacteria",
    description:
      "伯克霍尔德菌目为β-变形菌纲最大的目,代谢极为多样,含固氮菌、降解污染物的环境菌与动植物病原菌,模式属为伯克霍尔德菌属。",
    tags: ["order"],
  },
  {
    rank: "family",
    latin: "Alcaligenaceae",
    chinese: "产碱杆菌科",
    parent: "Burkholderiales",
    description:
      "产碱杆菌科为好氧、不发酵糖的革兰氏阴性杆菌或球杆菌,栖于水土与人畜黏膜,含百日咳病原鲍特菌属及条件致病菌。",
    tags: ["family"],
  },
  {
    rank: "genus",
    latin: "Bordetella",
    chinese: "鲍特菌属",
    parent: "Alcaligenaceae",
    description:
      "鲍特菌属为细小球杆菌,专性寄生于呼吸道纤毛上皮,百日咳鲍特菌引起典型百日咳,支气管败血鲍特菌则感染多种哺乳动物。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Bordetella pertussis",
    chinese: "百日咳鲍特菌",
    authority: "(Bergey et al., 1923) Moreno-López, 1952",
    parent: "Bordetella",
    ncbiTaxId: 520,
    description:
      "百日咳鲍特菌是人类百日咳的病原,借飞沫传播,黏附于气管与支气管纤毛上皮并分泌百日咳毒素等毒力因子,引起阵发性痉挛性咳嗽与哮吼样吸气。疫苗使发病率大幅下降,但保护力随时间衰减,近年多国百日咳明显回升,成为加强免疫策略的研究焦点。",
    morphology: "革兰氏阴性小卵圆杆菌,两端浓染,无鞭毛。",
    habitat: "人呼吸道纤毛上皮表面,人类为唯一自然宿主。",
    distribution: "全球分布,疫苗薄弱人群与青少年中易再流行。",
    tags: ["species", "人类病原"],
  },

  // ---- 既有属下补充种(变形菌门)----
  {
    rank: "species",
    latin: "Neisseria gonorrhoeae",
    chinese: "淋病奈瑟菌",
    authority: "(Zopf, 1885)",
    parent: "Neisseria",
    ncbiTaxId: 485,
    description:
      "淋病奈瑟菌是淋病的病原菌,人类为其唯一自然宿主,经性接触传播,引起尿道炎、宫颈炎与盆腔炎,亦可致新生儿眼炎。菌体借菌毛、外膜蛋白与IgA蛋白酶黏附侵入黏膜上皮,抗原变异能力极强;其耐药性持续演进,治疗需依据药敏监测动态调整。",
    morphology: "肾形或豆形双球菌,接触面平坦,无鞭毛与芽孢。",
    habitat: "人泌尿生殖道黏膜,亦可定植咽部与直肠。",
    distribution: "全球性分布,是最常见的细菌性传播疾病之一。",
    tags: ["species", "人类病原"],
  },
  {
    rank: "species",
    latin: "Vibrio parahaemolyticus",
    chinese: "副溶血性弧菌",
    authority: "(Fujino et al., 1951) Sakazaki et al., 1963",
    parent: "Vibrio",
    description:
      "副溶血性弧菌是嗜盐性海洋细菌,食入污染海产品引起急性胃肠炎,以东亚沿海地区最为多见,是当地食源性疾病的主要病因之一。多数致病株携带耐热直接溶血毒素基因,暖季近岸海水中菌量激增;冷藏抑菌与充分加热是关键防控措施。",
    morphology: "弧形或逗点状杆菌,单鞭毛运动活泼,嗜盐。",
    habitat: "近岸海水、海底沉积物及贝类与甲壳类体内。",
    distribution: "全球暖水沿岸,东亚夏秋生食海产季节高发。",
    tags: ["species", "人类病原"],
  },

  // ================================================================
  // 二、细菌域 —— 厚壁菌门 Bacillota 扩充
  // ================================================================

  // ---- 地芽孢杆菌属(嗜热脂肪地芽孢杆菌)----
  {
    rank: "genus",
    latin: "Geobacillus",
    chinese: "地芽孢杆菌属",
    parent: "Bacillaceae",
    description:
      "地芽孢杆菌属为嗜热的革兰氏阳性产芽孢杆菌,2001年自芽孢杆菌属分出,广布于堆肥、油藏与地热环境,是工业耐热酶的重要来源。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Geobacillus stearothermophilus",
    chinese: "嗜热脂肪地芽孢杆菌",
    authority: "(Donk, 1920) Nazina et al., 2001",
    parent: "Geobacillus",
    description:
      "嗜热脂肪地芽孢杆菌旧称嗜热脂肪芽孢杆菌,最适生长约55-65°C,其芽孢对湿热的抵抗力远超一般病原菌,故被制成生物指示剂用于高压蒸汽灭菌程序的验证。该菌产生的耐热淀粉酶等胞外酶亦具工业应用价值,2001年连同多个嗜热种移入新建的地芽孢杆菌属。",
    morphology: "革兰氏阳性直杆菌,端生椭圆形芽孢,周生鞭毛。",
    habitat: "堆肥、地热土壤、制糖厂加热系统与罐装食品。",
    distribution: "全球散布于温热环境,土壤与腐败植物质中常见。",
    tags: ["species", "工业菌种"],
  },

  // ---- 李斯特菌科支系(单核细胞增生李斯特菌)----
  {
    rank: "family",
    latin: "Listeriaceae",
    chinese: "李斯特菌科",
    parent: "Bacillales",
    description:
      "李斯特菌科为革兰氏阳性、耐冷、不产芽孢的可运动杆菌,代表属李斯特菌属,其中单核细胞增生李斯特菌为重要食源性病原。",
    tags: ["family"],
  },
  {
    rank: "genus",
    latin: "Listeria",
    chinese: "李斯特菌属",
    parent: "Listeriaceae",
    description:
      "李斯特菌属为短小杆菌,具特征性翻滚式运动,能在4°C冷藏食品中生长,以单核细胞增生李斯特菌最具医学与食品安全意义。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Listeria monocytogenes",
    chinese: "单核细胞增生李斯特菌",
    authority: "(Murray et al., 1926) Pirie, 1940",
    parent: "Listeria",
    ncbiTaxId: 1639,
    description:
      "单核细胞增生李斯特菌是重要的食源性病原菌,能在4°C冷藏条件下繁殖,经污染乳制品、肉制品与生鲜蔬菜感染,引起胃肠炎、菌血症与脑膜脑炎,孕妇感染可致流产。该菌为兼性胞内寄生菌,借肌动蛋白聚合在细胞间直接传播,是研究细胞内寄生与固有免疫的经典模型。",
    morphology: "革兰氏阳性短杆菌,25°C下翻滚运动,无芽孢。",
    habitat: "腐败植物、土壤、污水与即食食品加工环境。",
    distribution: "全球分布,经冷链食品周期性引发暴发疫情。",
    tags: ["species", "人类病原"],
  },

  // ---- 既有属下补充种(厚壁菌门)----
  {
    rank: "species",
    latin: "Clostridium botulinum",
    chinese: "肉毒梭菌",
    authority: "(van Ermengem, 1896) Bergey et al., 1923",
    parent: "Clostridium",
    ncbiTaxId: 1491,
    description:
      "肉毒梭菌产生的肉毒神经毒素是已知毒性最强的天然物质,可阻断神经肌肉接头处乙酰胆碱的释放而致弛缓性麻痹。毒素分A至G七型,人类中毒多因污染的罐头与发酵食品,也见于婴儿肠道定植与创伤感染;痕量提纯毒素亦用于肌张力障碍与美容治疗。",
    morphology: "革兰氏阳性粗大杆菌,亚极端芽孢使其呈汤匙状。",
    habitat: "土壤、湖泊沉积物及厌氧腐败的有机物与食品。",
    distribution: "全球分布,温带与亚极地土壤及湖底沉积物中常见。",
    tags: ["species", "人类病原"],
  },
  {
    rank: "species",
    latin: "Streptococcus pyogenes",
    chinese: "化脓性链球菌",
    authority: "Rosenbach, 1884",
    parent: "Streptococcus",
    ncbiTaxId: 1314,
    description:
      "化脓性链球菌即A群链球菌,是链球菌性咽炎、猩红热、丹毒与坏死性筋膜炎的病原,部分感染后诱发风湿热与急性肾小球肾炎等自身免疫后遗症。其M蛋白血清型逾百种,兼具抗吞噬与抗原变异能力;青霉素仍为首选治疗,全球每年感染数以千万计。",
    morphology: "链状排列的革兰氏阳性球菌,血平板β溶血。",
    habitat: "人咽喉与皮肤表面,偶见肛门与阴道定植。",
    distribution: "全球分布,人群密集与卫生条件差的地区高发。",
    tags: ["species", "人类病原"],
  },

  // ================================================================
  // 三、细菌域 —— 放线菌门 Actinomycetota 补充
  // ================================================================
  {
    rank: "species",
    latin: "Mycobacterium leprae",
    chinese: "麻风分枝杆菌",
    authority: "(Hansen, 1880) Lehmann & Neumann, 1896",
    parent: "Mycobacterium",
    ncbiTaxId: 470,
    description:
      "麻风分枝杆菌由汉森于1873年发现,是首个被证实的人类细菌性病原,引起麻风,主要侵犯皮肤、周围神经与黏膜。其宿主范围极窄且至今无法体外培养,基因组因大量假基因化而依赖宿主代谢;多药联合疗法已使全球病例数大幅下降,被视为基本消灭的公共卫生成就。",
    morphology: "细长略弯的抗酸杆菌,常聚集成束,胞壁富含脂质。",
    habitat: "人皮肤巨噬细胞与施万细胞内,尚无人工培养基。",
    distribution: "历史上全球分布,现病例集中于南亚、非洲与巴西。",
    tags: ["species", "人类病原"],
  },

  // ================================================================
  // 四、古菌域 Archaea 扩充
  // ================================================================

  // ---- 甲烷球菌纲支系(詹氏甲烷球菌)----
  {
    rank: "class",
    latin: "Methanococci",
    chinese: "甲烷球菌纲",
    parent: "Euryarchaeota",
    description:
      "甲烷球菌纲为不规则球状的超嗜热产甲烷古菌,利用氢与二氧化碳合成甲烷,细胞壁为蛋白质S层,广布于深海热液与地热沉积物。",
    tags: ["class"],
  },
  {
    rank: "order",
    latin: "Methanococcales",
    chinese: "甲烷球菌目",
    parent: "Methanococci",
    description:
      "甲烷球菌目为自养型氢营养产甲烷古菌,生长迅速且最适温度高,含甲烷球菌属与甲烷暖球菌属等类群,栖于海洋与陆地热系统。",
    tags: ["order"],
  },
  {
    rank: "family",
    latin: "Methanocaldococcaceae",
    chinese: "甲烷暖球菌科",
    parent: "Methanococcales",
    description:
      "甲烷暖球菌科为极端嗜热的产甲烷球菌,最适生长温度多在85°C上下,栖于深海热液喷口,模式种詹氏甲烷球菌为首个完成全基因组测序的古菌。",
    tags: ["family"],
  },
  {
    rank: "genus",
    latin: "Methanocaldococcus",
    chinese: "甲烷暖球菌属",
    parent: "Methanocaldococcaceae",
    description:
      "甲烷暖球菌属为超嗜热自养产甲烷的不规则球菌,具极生鞭毛,栖于海洋热液系统,以詹氏甲烷球菌最为著名。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Methanocaldococcus jannaschii",
    chinese: "詹氏甲烷球菌",
    parent: "Methanocaldococcus",
    description:
      "詹氏甲烷球菌分离自东太平洋2600米深'白烟囱'热液沉积物,最适生长约85°C,以氢与二氧化碳合成甲烷。1996年其基因组作为首个完成全基因组测序的古菌(亦为第三种测序的微生物)发表,为古菌构成独立生命域提供了基因组学证据,成为里程碑事件。",
    morphology: "不规则球菌,具两簇极生鞭毛,细胞壁为蛋白质S层。",
    habitat: "深海热液喷口的高温还原性沉积物,严格厌氧。",
    distribution: "东太平洋海隆热液区,亦见于其他深海热液系统。",
    tags: ["species", "模式生物"],
  },

  // ---- 既有属下补充种(古菌)----
  {
    rank: "species",
    latin: "Methanosarcina acetivorans",
    chinese: "乙酸甲烷八叠球菌",
    parent: "Methanosarcina",
    description:
      "乙酸甲烷八叠球菌分离自海洋沉积物,是可经乙酸裂解途径产甲烷的模式古菌,亦能代谢甲醇与甲胺,代谢多样性使其成为产甲烷遗传与生化研究的首选系统。其基因组于2002年完成测序,揭示了复杂的产甲烷调控网络,对厌氧消化与生物甲烷技术具有重要意义。",
    morphology: "不规则大球菌,常聚集成团块状假包囊。",
    habitat: "海洋与盐沼沉积物、稻田及厌氧消化器等缺氧环境。",
    distribution: "全球缺氧沉积环境,河口与沼泽软泥中常见。",
    tags: ["species", "模式生物"],
  },
  {
    rank: "species",
    latin: "Pyrococcus abyssi",
    chinese: "深海火球菌",
    parent: "Pyrococcus",
    description:
      "深海火球菌分离自西南太平洋北斐济盆地2000米深的热液沉积物,最适生长温度约96°C,是超嗜热古菌的代表性物种之一。其基因组紧凑且插入序列稀少,是研究高温下DNA复制、修复与染色体结构的重要模型,所产耐热酶亦具生物技术潜力。",
    morphology: "不规则球形细胞,具极簇生鞭毛,表面为糖蛋白S层。",
    habitat: "深海热液喷口沉积物,严格厌氧的高温环境。",
    distribution: "西南太平洋北斐济盆地深海热液区。",
    tags: ["species"],
  },
];
