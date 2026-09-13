import { TaxonSeed } from "../types";

// 原核生物种子数据:细菌域 8 门 24 物种 + 古菌域 4 门 7 物种
// 层级规则:三域系统下门级 parent 直接挂 Bacteria / Archaea(见 core.ts)
// 每个物种提供完整链条:species → genus → family → order → class → phylum
export const prokaryotes: TaxonSeed[] = [
  // ================================================================
  // 细菌域 Bacteria
  // ================================================================

  // ---- 1. 变形菌门 Pseudomonadota ----
  {
    rank: "phylum",
    latin: "Pseudomonadota",
    chinese: "变形菌门",
    parent: "Bacteria",
    description:
      "变形菌门是细菌域中物种最多的门,均为革兰氏阴性,含 α、β、γ、δ、ε 五个纲,代谢类型极为多样,从病原菌、固氮菌到深海化能自养菌皆有,线粒体的祖先亦源自此类群。",
    tags: ["phylum"],
  },
  {
    rank: "class",
    latin: "Gammaproteobacteria",
    chinese: "γ-变形菌纲",
    parent: "Pseudomonadota",
    description:
      "γ-变形菌纲是变形菌门中最大的纲,包括肠杆菌目、弧菌目与假单胞菌目等,医学与工业上最重要的革兰氏阴性菌多聚于此,兼性厌氧、严格好氧与专性胞内寄生种类皆有。",
    tags: ["class"],
  },
  {
    rank: "class",
    latin: "Alphaproteobacteria",
    chinese: "α-变形菌纲",
    parent: "Pseudomonadota",
    description:
      "α-变形菌纲多为好氧的革兰氏阴性杆菌或类球菌,含光养菌、植物共生菌与细胞内寄生菌,主流观点认为真核细胞的线粒体即源自本纲的早期成员。",
    tags: ["class"],
  },
  {
    rank: "class",
    latin: "Betaproteobacteria",
    chinese: "β-变形菌纲",
    parent: "Pseudomonadota",
    description:
      "β-变形菌纲为好氧或兼性厌氧的革兰氏阴性菌,广泛见于水体、土壤与黏膜表面,包含奈瑟菌属及氨氧化、氢氧化等化能自养类群。",
    tags: ["class"],
  },
  {
    rank: "order",
    latin: "Enterobacterales",
    chinese: "肠杆菌目",
    parent: "Gammaproteobacteria",
    description:
      "肠杆菌目为兼性厌氧的革兰氏阴性杆菌,不产芽孢、氧化酶阴性,含肠杆菌科与耶尔森菌科等,多栖于人畜肠道,是医学与食品微生物学的核心类群。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Vibrionales",
    chinese: "弧菌目",
    parent: "Gammaproteobacteria",
    description:
      "弧菌目为氧化酶阳性、常具极生鞭毛的弯曲或短杆菌,普遍见于海水与淡水,部分为人类及水生动物的病原菌,部分与深海动物发光器官共生。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Pseudomonadales",
    chinese: "假单胞菌目",
    parent: "Gammaproteobacteria",
    description:
      "假单胞菌目为好氧、氧化酶阳性的革兰氏阴性直或微弯杆菌,代谢谱极广,能降解众多难分解有机物,广布于土壤、水体与植物表面。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Rhizobiales",
    chinese: "根瘤菌目",
    parent: "Alphaproteobacteria",
    description:
      "根瘤菌目为好氧的革兰氏阴性杆菌,含与豆科植物共生固氮的根瘤菌科、植物病原农杆菌及甲基营养菌等,现亦称生丝微菌目(Hyphomicrobiales)。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Rickettsiales",
    chinese: "立克次体目",
    parent: "Alphaproteobacteria",
    description:
      "立克次体目为小球形至杆状的革兰氏阴性菌,专性寄生于真核细胞内,经虱、蚤、蜱螨等节肢动物传播,是斑疹伤寒等急性传染病的病原。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Neisseriales",
    chinese: "奈瑟菌目",
    parent: "Betaproteobacteria",
    description:
      "奈瑟菌目为氧化酶阳性的革兰氏阴性球菌或短杆菌,常成双排列,好氧,栖于人与动物的黏膜表面,含致脑膜炎与淋病的病原属。",
    tags: ["order"],
  },
  {
    rank: "family",
    latin: "Enterobacteriaceae",
    chinese: "肠杆菌科",
    parent: "Enterobacterales",
    description:
      "肠杆菌科为兼性厌氧的革兰氏阴性杆菌,发酵葡萄糖、氧化酶阴性,含埃希菌属与沙门菌属等肠道相关菌属,与医学和食品卫生关系极密切。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Yersiniaceae",
    chinese: "耶尔森菌科",
    parent: "Enterobacterales",
    description:
      "耶尔森菌科为 2016 年自肠杆菌科分立的科,含耶尔森菌属与沙雷菌属等,成员多与动物或环境相关,鼠疫耶尔森菌为其最著名的致病种。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Vibrionaceae",
    chinese: "弧菌科",
    parent: "Vibrionales",
    description:
      "弧菌科为氧化酶阳性、发酵型的弯曲杆菌,多具极生鞭毛,栖于海洋与河口,含霍乱弧菌、副溶血弧菌等病原菌及发光共生菌。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Pseudomonadaceae",
    chinese: "假单胞菌科",
    parent: "Pseudomonadales",
    description:
      "假单胞菌科为好氧、氧化酶阳性的革兰氏阴性直或微弯杆菌,代谢极为多样,广布于土壤与水体,含重要条件致病菌与植物病原菌。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Rhizobiaceae",
    chinese: "根瘤菌科",
    parent: "Rhizobiales",
    description:
      "根瘤菌科为好氧革兰氏阴性杆菌,能侵入豆科根部结瘤固氮,含根瘤菌属与农杆菌属,后者介导的基因转移是植物遗传工程的基石。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Rickettsiaceae",
    chinese: "立克次体科",
    parent: "Rickettsiales",
    description:
      "立克次体科为专性细胞内寄生的小杆菌,不能在无细胞培养基上生长,经节肢动物叮咬或其粪便传播,立克次体属可致斑疹伤寒等急性热病。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Neisseriaceae",
    chinese: "奈瑟菌科",
    parent: "Neisseriales",
    description:
      "奈瑟菌科为氧化酶与触酶阳性的革兰氏阴性球菌,常成双排列,栖于人与动物黏膜,含致流行性脑脊髓膜炎与淋病的两个重要病原种。",
    tags: ["family"],
  },
  {
    rank: "genus",
    latin: "Escherichia",
    chinese: "埃希菌属",
    parent: "Enterobacteriaceae",
    description:
      "埃希菌属为肠杆菌科的模式属,兼性厌杆菌,栖于温血动物肠道,以大肠杆菌最为著名。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Salmonella",
    chinese: "沙门菌属",
    parent: "Enterobacteriaceae",
    description:
      "沙门菌属为肠杆菌科致病菌,血清型逾两千,经污染食物与水传播,致胃肠炎与肠热症。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Yersinia",
    chinese: "耶尔森菌属",
    parent: "Yersiniaceae",
    description:
      "耶尔森菌属含鼠疫、假结核与小肠结肠炎耶尔森菌等,多为人兽共患病原,部分种可在低温生长。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Vibrio",
    chinese: "弧菌属",
    parent: "Vibrionaceae",
    description:
      "弧菌属为弯曲的革兰氏阴性杆菌,广布于海洋,部分致人类腹泻与创伤感染,部分与动物共生发光。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Pseudomonas",
    chinese: "假单胞菌属",
    parent: "Pseudomonadaceae",
    description:
      "假单胞菌属为好氧杆菌,代谢谱极广、环境适应力强,模式种为铜绿假单胞菌,亦多植物相关种。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Rhizobium",
    chinese: "根瘤菌属",
    parent: "Rhizobiaceae",
    description:
      "根瘤菌属为好氧杆菌,侵染豆科根毛并诱导根瘤固氮,与农杆菌属近缘,代表种为豌豆根瘤菌。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Rickettsia",
    chinese: "立克次体属",
    parent: "Rickettsiaceae",
    description:
      "立克次体属为专性胞内寄生的小杆菌,经虱、蚤、蜱、螨传播,致斑疹伤寒与斑点热类疾病。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Neisseria",
    chinese: "奈瑟菌属",
    parent: "Neisseriaceae",
    description:
      "奈瑟菌属为氧化酶阳性双球菌,栖于人黏膜,脑膜炎奈瑟菌与淋病奈瑟菌为其重要病原种。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Escherichia coli",
    chinese: "大肠杆菌",
    authority: "(Migula, 1895)",
    parent: "Escherichia",
    ncbiTaxId: 562,
    description:
      "大肠杆菌是研究最透彻的模式生物,基因工程的标准宿主与分子遗传学的基石,操纵子学说即奠基于此。多数菌株栖居温血动物肠道,属正常菌群;而 O157:H7 等血清型可致出血性腹泻与溶血尿毒综合征。",
    morphology: "两端钝圆的短直杆菌,周生鞭毛运动,革兰氏阴性。",
    habitat: "温血动物肠道后段,亦见于水土与食品环境。",
    distribution: "全球性分布,凡温血动物栖居处皆可检出。",
    tags: ["species", "flagship", "模式生物"],
  },
  {
    rank: "species",
    latin: "Salmonella enterica",
    chinese: "肠道沙门菌",
    authority: "(ex Kauffmann & Edwards, 1952) Le Minor & Popoff, 1987",
    parent: "Salmonella",
    ncbiTaxId: 28901,
    description:
      "肠道沙门菌含六个亚种、逾两千五百个血清型,是重要的食源性病原菌。多数血清型致自限性胃肠炎,而 Typhi 与 Paratyphi 血清型可侵入血流引起伤寒与副伤寒,针对后者已有成熟的疫苗与治疗方案。",
    morphology: "革兰氏阴性直杆菌,周生鞭毛运动,不产芽孢。",
    habitat: "人畜与爬行类肠道,经污染的水与食物扩散。",
    distribution: "全球分布,是感染性腹泻的主要细菌病因之一。",
    tags: ["species"],
  },
  {
    rank: "species",
    latin: "Vibrio cholerae",
    chinese: "霍乱弧菌",
    authority: "Pacini, 1854",
    parent: "Vibrio",
    ncbiTaxId: 666,
    description:
      "霍乱弧菌是霍乱的病原体,历史上多次大流行均由 O1 血清型引起,1990 年代 O139 曾引发区域流行。产霍乱肠毒素的菌株引起米泔水样剧烈腹泻;多数环境菌株无毒,常附着于浮游动物与甲壳素表面生活。",
    morphology: "逗点状弯曲杆菌,极端单鞭毛,运动活泼。",
    habitat: "河口与近岸咸淡水,常附生于桡足类与贝壳。",
    distribution: "全球暖水域,南亚与非洲构成主要流行区。",
    tags: ["species"],
  },
  {
    rank: "species",
    latin: "Yersinia pestis",
    chinese: "鼠疫耶尔森菌",
    authority: "(Lehmann & Neumann, 1896)",
    parent: "Yersinia",
    ncbiTaxId: 632,
    description:
      "鼠疫耶尔森菌在啮齿类与蚤类间循环维持自然疫源,人经带菌蚤叮咬或吸入带菌飞沫感染,临床分腺鼠疫、肺鼠疫与败血型。历史三次鼠疫大流行重塑了欧亚社会,至今仍在旱獭等疫源地散发,在中国列于甲类传染病。",
    morphology: "卵圆形短杆菌,革兰氏阴性,两端浓染。",
    habitat: "疫源啮齿类与蚤类体内,偶侵人畜。",
    distribution: "亚洲、非洲与美洲的部分自然疫源地。",
    tags: ["species"],
  },
  {
    rank: "species",
    latin: "Pseudomonas aeruginosa",
    chinese: "铜绿假单胞菌",
    authority: "(Schroeter, 1872) Migula, 1900",
    parent: "Pseudomonas",
    ncbiTaxId: 287,
    description:
      "铜绿假单胞菌是医院获得性感染的重要条件致病菌,致烧伤创面感染、呼吸机相关肺炎及囊性纤维化患者的慢性肺感染。其天然耐受多种抗生素并易形成生物膜,产生的绿脓素与荧光素使脓液与培养物呈蓝绿色。",
    morphology: "直或微弯杆菌,端生单鞭毛运动,无芽孢。",
    habitat: "潮湿环境与医疗器械表面,亦见于湿土与水体。",
    distribution: "全球分布,医院水系统与导管内常见。",
    tags: ["species"],
  },
  {
    rank: "species",
    latin: "Rhizobium leguminosarum",
    chinese: "豌豆根瘤菌",
    authority: "(Frank, 1889)",
    parent: "Rhizobium",
    description:
      "豌豆根瘤菌经根毛侵入豆科根部,诱导根瘤并分化为类菌体,由固氮酶将大气氮还原为氨供给植物,换取光合产物。结瘤与固氮基因位于巨型共生质粒上,是共生固氮遗传学的经典研究对象,也是豆科接种剂的主力菌种。",
    morphology: "革兰氏阴性小杆菌,周生或亚极生鞭毛,无芽孢。",
    habitat: "温带土壤,侵入豌豆、蚕豆、三叶草等根部。",
    distribution: "世界农业区,随豆科种植而广泛分布。",
    tags: ["species"],
  },
  {
    rank: "species",
    latin: "Rickettsia prowazekii",
    chinese: "普氏立克次体",
    authority: "da Rocha-Lima, 1916",
    parent: "Rickettsia",
    description:
      "普氏立克次体是流行性斑疹伤寒的病原体,寄生于人虱肠上皮并随虱粪排出,经抓痕与气溶胶侵入人体,在血管内皮细胞内增殖,战争与灾荒中屡酿大流行。其高度精简的基因组曾被视为最接近线粒体祖先的原核类群之一。",
    morphology: "多形性小杆菌或球杆菌,革兰氏阴性,胞内寄生。",
    habitat: "人虱肠上皮与人血管内皮细胞内。",
    distribution: "战乱与贫困地区散发,以非洲与南美为主。",
    tags: ["species"],
  },
  {
    rank: "species",
    latin: "Neisseria meningitidis",
    chinese: "脑膜炎奈瑟菌",
    authority: "(Albrecht & Ghon, 1901)",
    parent: "Neisseria",
    ncbiTaxId: 482,
    description:
      "脑膜炎奈瑟菌为定植于鼻咽的双球菌,少数感染者进展为暴发性脑脊髓膜炎或败血症,起病急、进展快,婴幼儿与青少年最易感。按荚膜多糖可分十余个血清群,疫苗已覆盖 A、B、C、W、Y 等主要致病血清群。",
    morphology: "肾形革兰氏阴性双球菌,凹面相邻成对排列。",
    habitat: "人鼻咽部黏膜,经飞沫与密切接触传播。",
    distribution: "全球分布,撒哈拉以南「脑膜炎带」高发。",
    tags: ["species"],
  },

  // ---- 2. 厚壁菌门 Bacillota ----
  {
    rank: "phylum",
    latin: "Bacillota",
    chinese: "厚壁菌门",
    parent: "Bacteria",
    description:
      "厚壁菌门即原 Firmicutes,多为低 GC 含量的革兰氏阳性菌,含产芽孢的芽孢杆菌与梭菌、不产芽孢的乳酸菌与葡萄球菌,以及无细胞壁的支原体类群,是肠道与发酵食品中的核心菌群。",
    tags: ["phylum"],
  },
  {
    rank: "class",
    latin: "Bacilli",
    chinese: "芽孢杆菌纲",
    parent: "Bacillota",
    description:
      "芽孢杆菌纲为革兰氏阳性低 GC 细菌,含芽孢杆菌目与乳杆菌目,前者多为好氧产芽孢杆菌,后者为发酵产乳酸、多不运动的球菌与杆菌。",
    tags: ["class"],
  },
  {
    rank: "class",
    latin: "Clostridia",
    chinese: "梭菌纲",
    parent: "Bacillota",
    description:
      "梭菌纲为厌氧或耐氧的革兰氏阳性杆菌,多能形成内生芽孢,常见于土壤、沉积物与肠道,既有分解纤维素的腐生菌,也有产生强烈外毒素的病原菌。",
    tags: ["class"],
  },
  {
    rank: "order",
    latin: "Bacillales",
    chinese: "芽孢杆菌目",
    parent: "Bacilli",
    description:
      "芽孢杆菌目为好氧或兼性厌氧的革兰氏阳性菌,多形成抗逆性极强的内生芽孢,含芽孢杆菌科与葡萄球菌科,盛见于土壤、尘埃与食物。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Lactobacillales",
    chinese: "乳杆菌目",
    parent: "Bacilli",
    description:
      "乳杆菌目为低 GC 革兰氏阳性菌,不产芽孢,发酵糖类以乳酸为主要终产物,含链球菌科与乳杆菌科,是发酵食品与益生菌的主要来源。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Clostridiales",
    chinese: "梭菌目",
    parent: "Clostridia",
    description:
      "梭菌目为厌氧产芽孢的革兰氏阳性杆菌,行发酵代谢,栖于土壤、沉积物与肠道,部分种产生神经毒素或组织毒素,可致破伤风、肉毒中毒等重症。",
    tags: ["order"],
  },
  {
    rank: "family",
    latin: "Bacillaceae",
    chinese: "芽孢杆菌科",
    parent: "Bacillales",
    description:
      "芽孢杆菌科为好氧或兼性厌氧的产芽孢杆菌,多具周生鞭毛,广布于土壤与尘埃,含枯草芽孢杆菌与炭疽芽孢杆菌等著名物种。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Staphylococcaceae",
    chinese: "葡萄球菌科",
    parent: "Bacillales",
    description:
      "葡萄球菌科为不运动、不产芽孢的革兰氏阳性球菌,成葡萄串状聚集,触酶阳性、耐高盐,栖于人畜皮肤黏膜,条件致病性强。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Streptococcaceae",
    chinese: "链球菌科",
    parent: "Lactobacillales",
    description:
      "链球菌科为触酶阴性、发酵产酸的革兰氏阳性球菌,沿单平面分裂成链,栖于人与动物黏膜,含肺炎链球菌等致病种及乳球菌属。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Lactobacillaceae",
    chinese: "乳杆菌科",
    parent: "Lactobacillales",
    description:
      "乳杆菌科为微需氧至厌氧的革兰氏阳性杆菌,耐酸,发酵产生大量乳酸,见于乳制品、发酵食品与动物黏膜,是益生菌的主力类群。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Clostridiaceae",
    chinese: "梭菌科",
    parent: "Clostridiales",
    description:
      "梭菌科为厌氧、产芽孢的革兰氏阳性杆菌,芽孢常使菌体膨大呈梭形,多营腐生,少数产生破伤风毒素、肉毒毒素等强烈外毒素。",
    tags: ["family"],
  },
  {
    rank: "genus",
    latin: "Bacillus",
    chinese: "芽孢杆菌属",
    parent: "Bacillaceae",
    description:
      "芽孢杆菌属为好氧产芽孢的大杆菌,广布于土壤,含枯草芽孢杆菌、炭疽芽孢杆菌与苏云金杆菌等。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Staphylococcus",
    chinese: "葡萄球菌属",
    parent: "Staphylococcaceae",
    description:
      "葡萄球菌属为耐盐球菌,常聚成葡萄串状,栖于皮肤与黏膜,代表种金黄色葡萄球菌耐药问题突出。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Streptococcus",
    chinese: "链球菌属",
    parent: "Streptococcaceae",
    description:
      "链球菌属为触酶阴性球菌,成对或成链排列,按溶血性与多糖抗原分群分型,含多种致病种。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Lactobacillus",
    chinese: "乳杆菌属",
    parent: "Lactobacillaceae",
    description:
      "乳杆菌属为耐酸产乳酸的杆菌,栖于发酵食品与动物黏膜,2020 年经再分拆后仍保留以德氏乳杆菌为代表的核心种。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Clostridium",
    chinese: "梭菌属",
    parent: "Clostridiaceae",
    description:
      "梭菌属为厌氧产芽孢的革兰氏阳性杆菌,多为土壤腐生菌,少数产生神经毒素或肠毒素,危害剧烈。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Bacillus subtilis",
    chinese: "枯草芽孢杆菌",
    authority: "(Ehrenberg, 1835) Cohn, 1872",
    parent: "Bacillus",
    ncbiTaxId: 1423,
    description:
      "枯草芽孢杆菌是非致病性土壤杆菌,以芽孢耐受长期干旱与高温,是继大肠杆菌之后最重要的原核模式生物,芽孢形成、细胞分化与分泌表达研究多以它为体系。其近缘菌株亦是纳豆与多种工业酶制剂的生产菌。",
    morphology: "直杆状,周生鞭毛,芽孢椭圆中生、不膨大。",
    habitat: "土壤腐殖层、枯草浸液与淡水体。",
    distribution: "全球分布,农田与草地土壤尤为常见。",
    tags: ["species", "模式生物"],
  },
  {
    rank: "species",
    latin: "Staphylococcus aureus",
    chinese: "金黄色葡萄球菌",
    authority: "Rosenbach, 1884",
    parent: "Staphylococcus",
    ncbiTaxId: 1280,
    description:
      "金黄色葡萄球菌常定植于人体鼻前庭与皮肤,可致疖痈、肺炎、心内膜炎及由耐热肠毒素介导的食物中毒。金黄色源自类胡萝卜素 staphyloxanthin;耐甲氧西林金黄色葡萄球菌(MRSA)已成为全球院内感染的标志性难题。",
    morphology: "球形,呈葡萄串状排列,无鞭毛与芽孢。",
    habitat: "人体皮肤、鼻前庭与会阴,及含盐食品。",
    distribution: "全球分布,人群携带率高。",
    tags: ["species"],
  },
  {
    rank: "species",
    latin: "Streptococcus pneumoniae",
    chinese: "肺炎链球菌",
    authority: "(Klein, 1884)",
    parent: "Streptococcus",
    ncbiTaxId: 1313,
    description:
      "肺炎链球菌具厚荚膜、常成双排列,是细菌性肺炎、中耳炎与非流行性脑膜炎的主要病原,婴幼儿与老人受害最重。1928 年格里菲斯以其光滑型与粗糙型菌株完成转化实验,最终引出 DNA 是遗传物质的结论;荚膜血清型逾九十,对应多价结合疫苗。",
    morphology: "卵圆形双球菌,宽端相对,外被厚荚膜。",
    habitat: "人鼻咽部黏膜,携带者为主要传染源。",
    distribution: "全球分布,儿童与老年人群高发。",
    tags: ["species"],
  },
  {
    rank: "species",
    latin: "Clostridium tetani",
    chinese: "破伤风梭菌",
    authority: "(Flügge, 1886)",
    parent: "Clostridium",
    ncbiTaxId: 1131,
    description:
      "破伤风梭菌的芽孢广布于土壤与人畜粪便,侵入深部厌氧创口后萌发繁殖并分泌痉挛毒素。毒素经逆向轴突运输达中枢神经,阻断抑制性递质释放,致全身骨骼肌强直痉挛,角弓反张为典型体征;类毒素疫苗与清创预防极为有效。",
    morphology: "细长杆菌,芽孢正圆、顶端位,使菌呈鼓槌形。",
    habitat: "土壤、尘埃及动物粪便,深部厌氧创口。",
    distribution: "全球分布,土壤中芽孢可存活多年。",
    tags: ["species"],
  },
  {
    rank: "species",
    latin: "Lactobacillus delbrueckii",
    chinese: "德氏乳杆菌",
    authority: "(Leichmann, 1896)",
    parent: "Lactobacillus",
    description:
      "德氏乳杆菌是乳杆菌属的模式种,嗜热,在 45 ℃ 上下旺盛发酵乳糖产酸。其保加利亚亚种与嗜热链球菌搭档酿制酸奶已逾百年,是乳品工业发酵剂的支柱,亦作为益生菌广泛添加于功能食品。",
    morphology: "长杆状,不运动,常呈链状排列,革兰氏阳性。",
    habitat: "乳与乳制品及温热的植物发酵液。",
    distribution: "全球乳品工业,传统发酵乳中亦常见。",
    tags: ["species"],
  },

  // ---- 3. 放线菌门 Actinomycetota ----
  {
    rank: "phylum",
    latin: "Actinomycetota",
    chinese: "放线菌门",
    parent: "Bacteria",
    description:
      "放线菌门为高 GC 含量的革兰氏阳性菌,多呈分支菌丝状,是土壤中最常见的细菌类群之一,产生数千种抗生素与生物活性物质,也含结核分枝杆菌等重要病原菌。",
    tags: ["phylum"],
  },
  {
    rank: "class",
    latin: "Actinomycetia",
    chinese: "放线菌纲",
    parent: "Actinomycetota",
    description:
      "放线菌纲为放线菌门的核心纲,菌体自短杆状至发达菌丝体,多数严格好氧、营腐生生活,是抗生素、酶与生物活性次级代谢产物最重要的生物来源。",
    tags: ["class"],
  },
  {
    rank: "order",
    latin: "Streptomycetales",
    chinese: "链霉菌目",
    parent: "Actinomycetia",
    description:
      "链霉菌目为丝状放线菌,具基质菌丝、气生菌丝与成链孢子,腐生于土壤,是已知天然抗生素与生物活性物质最重要的产生者。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Mycobacteriales",
    chinese: "分枝杆菌目",
    parent: "Actinomycetia",
    description:
      "分枝杆菌目为好氧、不产芽孢的放线菌,细胞壁富含蜡质分枝菌酸,常呈抗酸染色阳性,代表科分枝杆菌科生长缓慢,含重要慢性传染病病原。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Corynebacteriales",
    chinese: "棒杆菌目",
    parent: "Actinomycetia",
    description:
      "棒杆菌目为好氧的不规则杆菌或球菌,细胞壁含短链分枝菌酸,含棒杆菌科、诺卡菌科等,兼有环境腐生种与致病种,白喉杆菌即属此目。",
    tags: ["order"],
  },
  {
    rank: "family",
    latin: "Streptomycetaceae",
    chinese: "链霉菌科",
    parent: "Streptomycetales",
    description:
      "链霉菌科为产成链孢子的丝状放线菌,基因组庞大、次级代谢基因簇众多,链霉素、四环素等经典抗生素皆出自本科链霉菌。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Mycobacteriaceae",
    chinese: "分枝杆菌科",
    parent: "Mycobacteriales",
    description:
      "分枝杆菌科为缓慢生长的抗酸阳性杆菌,细胞壁富含分枝菌酸而疏水,含结核分枝杆菌与麻风分枝杆菌等慢性传染病病原,亦多环境腐生种。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Corynebacteriaceae",
    chinese: "棒杆菌科",
    parent: "Corynebacteriales",
    description:
      "棒杆菌科为不规则形、常呈棒状的革兰氏阳性杆菌,不运动、不产芽孢,常呈栅栏状排列,含白喉棒杆菌与多种皮肤及环境腐生种。",
    tags: ["family"],
  },
  {
    rank: "genus",
    latin: "Streptomyces",
    chinese: "链霉菌属",
    parent: "Streptomycetaceae",
    description:
      "链霉菌属为丝状产孢放线菌,栖于土壤,是天然抗生素最重要的产生菌,已知种逾五百。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Mycobacterium",
    chinese: "分枝杆菌属",
    parent: "Mycobacteriaceae",
    description:
      "分枝杆菌属为抗酸杆菌,细胞壁含蜡质分枝菌酸,生长缓慢,含结核与麻风杆菌等重要病原及众多腐生种。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Corynebacterium",
    chinese: "棒杆菌属",
    parent: "Corynebacteriaceae",
    description:
      "棒杆菌属为不规则形革兰氏阳性杆菌,除白喉棒杆菌外,多数为皮肤与环境中的无害腐生菌。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Streptomyces coelicolor",
    chinese: "天蓝色链霉菌",
    authority: "(Müller, 1908) Waksman & Henrici, 1948",
    parent: "Streptomyces",
    ncbiTaxId: 1902,
    description:
      "天蓝色链霉菌是放线菌遗传学最重要的模式菌,完整经历基质菌丝、气生菌丝与孢子分化,并产生多种色素类抗生素。其 2002 年完成的基因组约 8.7 Mb,为当时已测序细菌中最庞大者之一,是研究次级代谢调控与形态分化的经典体系。",
    morphology: "分支丝状体,气生菌丝孢子成链,菌落青蓝色。",
    habitat: "土壤有机质层,好氧腐生。",
    distribution: "全球土壤,温带地区尤为常见。",
    tags: ["species", "模式生物"],
  },
  {
    rank: "species",
    latin: "Mycobacterium tuberculosis",
    chinese: "结核分枝杆菌",
    authority: "(Zopf, 1883) Lehmann & Neumann, 1896",
    parent: "Mycobacterium",
    ncbiTaxId: 1773,
    description:
      "结核分枝杆菌是结核病的病原菌,抗酸阳性、细胞壁富含蜡质,倍增需十余小时,可在巨噬细胞内长期潜伏。飞沫传播使其易在人群密集处蔓延,至今仍是致死人数最多的传染病之一,耐多药菌株更添治疗难度;卡介苗源自其近缘的牛分枝杆菌。",
    morphology: "细长微弯的杆菌,抗酸染色阳性,无芽孢与鞭毛。",
    habitat: "人巨噬细胞内与肺部肉芽肿病灶。",
    distribution: "全球分布,亚洲与非洲疾病负担最重。",
    tags: ["species", "flagship"],
  },
  {
    rank: "species",
    latin: "Corynebacterium diphtheriae",
    chinese: "白喉棒杆菌",
    authority: "(Kruse, 1886) Lehmann & Neumann, 1896",
    parent: "Corynebacterium",
    description:
      "白喉棒杆菌经飞沫与接触传播,在咽部黏膜增殖并形成灰白色假膜;仅携带 tox 基因棒状噬菌体的菌株产生白喉毒素,抑制宿主蛋白合成而引发心肌炎与神经麻痹等致命并发症。抗毒素与类毒素疫苗曾将此病推向消亡,仍需持续接种以防复燃。",
    morphology: "不规则棒状杆菌,V、L 形栅栏排列,异染颗粒明显。",
    habitat: "人呼吸道黏膜,偶见于皮肤创口。",
    distribution: "全球散发,疫苗薄弱地区可复燃流行。",
    tags: ["species"],
  },

  // ---- 4. 拟杆菌门 Bacteroidota ----
  {
    rank: "phylum",
    latin: "Bacteroidota",
    chinese: "拟杆菌门",
    parent: "Bacteria",
    description:
      "拟杆菌门是一大类革兰氏阴性杆菌,多为专性厌氧,是动物肠道与口腔菌群的重要成员,亦见于土壤与沉积物,擅长降解多糖等大分子有机物。",
    tags: ["phylum"],
  },
  {
    rank: "class",
    latin: "Bacteroidia",
    chinese: "拟杆菌纲",
    parent: "Bacteroidota",
    description:
      "拟杆菌纲为不产芽孢的革兰氏阴性厌氧杆菌,是脊椎动物肠道与口腔的优势菌群,能发酵多糖获取能量,对宿主营养与免疫影响深远。",
    tags: ["class"],
  },
  {
    rank: "order",
    latin: "Bacteroidales",
    chinese: "拟杆菌目",
    parent: "Bacteroidia",
    description:
      "拟杆菌目为专性厌氧的革兰氏阴性杆菌,栖于人与动物肠道,是肠道菌群的重要组成,能水解并发酵复杂多糖,个别为条件致病菌。",
    tags: ["order"],
  },
  {
    rank: "family",
    latin: "Bacteroidaceae",
    chinese: "拟杆菌科",
    parent: "Bacteroidales",
    description:
      "拟杆菌科为专性厌氧、不产芽孢的革兰氏阴性杆菌,栖于人与动物结肠,为正常菌群的优势成员,个别种可致腹腔等处机会感染。",
    tags: ["family"],
  },
  {
    rank: "genus",
    latin: "Bacteroides",
    chinese: "拟杆菌属",
    parent: "Bacteroidaceae",
    description:
      "拟杆菌属为结肠厌氧菌的优势属,能利用多种多糖,代表种为脆弱拟杆菌,个别种为条件致病菌。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Bacteroides fragilis",
    chinese: "脆弱拟杆菌",
    authority: "(Veillon & Zuber, 1898)",
    parent: "Bacteroides",
    description:
      "脆弱拟杆菌是人结肠中数量占优的厌氧菌,能水解发酵复杂多糖,其荚膜多糖可塑造肠道免疫平衡。离开肠道后它又是最常见的厌氧性条件致病菌,致腹腔脓肿与术后感染;部分菌株产 β-内酰胺酶,给治疗带来耐药难题。",
    morphology: "革兰氏阴性小杆菌,两端圆钝,具荚膜。",
    habitat: "人与动物结肠,偶见于口腔等黏膜。",
    distribution: "全球分布,健康人群肠道普遍定植。",
    tags: ["species"],
  },

  // ---- 5. 蓝细菌门 Cyanobacteria ----
  {
    rank: "phylum",
    latin: "Cyanobacteria",
    chinese: "蓝细菌门",
    parent: "Bacteria",
    description:
      "蓝细菌门是唯一行产氧光合作用的原核生物,旧称蓝藻或蓝绿藻,其起源改变了地球大气组成,并经内共生演化出叶绿体;成员自直径不足一微米的原绿球藻到丝状的念珠藻。",
    tags: ["phylum"],
  },
  {
    rank: "class",
    latin: "Cyanophyceae",
    chinese: "蓝藻纲",
    parent: "Cyanobacteria",
    description:
      "蓝藻纲即蓝细菌的纲级类群,行产氧光合作用,形态自单细胞至不分枝丝状体,部分丝状种类具异形胞而能固氮,俗称蓝绿藻。",
    tags: ["class"],
  },
  {
    rank: "order",
    latin: "Nostocales",
    chinese: "念珠藻目",
    parent: "Cyanophyceae",
    description:
      "念珠藻目为具异形胞的丝状蓝细菌,部分种还形成厚壁孢子以度过不良环境,常见于淡水、土壤与湿润岩面,念珠藻科为其中最大的科。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Oscillatoriales",
    chinese: "颤藻目",
    parent: "Cyanophyceae",
    description:
      "颤藻目为不分枝的丝状蓝细菌,无异形胞,以滑行运动著称,广布于淡水、海水与温泉,节螺藻属与颤藻属皆隶属此目。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Synechococcales",
    chinese: "聚球菌目",
    parent: "Cyanophyceae",
    description:
      "聚球菌目为单细胞至简单丝状的蓝细菌,无异形胞,海洋中的聚球菌与原绿球藻是地球上数量最庞大的光合类群之一。",
    tags: ["order"],
  },
  {
    rank: "family",
    latin: "Nostocaceae",
    chinese: "念珠藻科",
    parent: "Nostocales",
    description:
      "念珠藻科为丝状蓝细菌,藻丝由球形至桶形细胞串成,多具异形胞与厚壁孢子,外被公共胶质鞘,常见于淡水与陆生湿润处。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Oscillatoriaceae",
    chinese: "颤藻科",
    parent: "Oscillatoriales",
    description:
      "颤藻科为无异形胞的不分枝丝状蓝细菌,可滑行颤动,呈蓝绿色,广布于淡水与海洋底泥及温泉,节螺藻属亦曾归于此科。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Prochloraceae",
    chinese: "原绿球藻科",
    parent: "Synechococcales",
    description:
      "原绿球藻科为超微型海洋球状蓝细菌,以二乙烯基叶绿素 a 与 b 捕光,是寡营养大洋中数量最多的光合自养原核生物之一。",
    tags: ["family"],
  },
  {
    rank: "genus",
    latin: "Nostoc",
    chinese: "念珠藻属",
    parent: "Nostocaceae",
    description:
      "念珠藻属为具异形胞与胶鞘的丝状蓝细菌,固氮能力强,代表种发状念珠藻俗称发菜。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Arthrospira",
    chinese: "节螺藻属",
    parent: "Oscillatoriaceae",
    description:
      "节螺藻属为螺旋丝状蓝细菌,即俗称的螺旋藻,高蛋白、耐高碱,广为养殖与食用。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Prochlorococcus",
    chinese: "原绿球藻属",
    parent: "Prochloraceae",
    description:
      "原绿球藻属为超微型海洋蓝细菌,直径不足一微米,被认为是地球上数量最多的光合生物。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Nostoc flagelliforme",
    chinese: "发状念珠藻",
    parent: "Nostoc",
    description:
      "发状念珠藻俗称发菜,群体黑绿毛发状,耐极端干旱、高温与强辐射,是荒漠草原生物结皮的建群生物之一,胶质鞘护持藻丝度过旱季。因采挖发菜严重破坏草原植被,中国已将其列为一级保护野生植物并严禁采集销售。",
    morphology: "串珠状藻丝外包胶质鞘,群体细长呈毛发状。",
    habitat: "干旱半干旱草原地表结皮与岩面。",
    distribution: "中国西北、蒙古高原及中亚干旱区。",
    tags: ["species"],
  },
  {
    rank: "species",
    latin: "Arthrospira platensis",
    chinese: "钝顶螺旋藻",
    parent: "Arthrospira",
    description:
      "钝顶螺旋藻是商品螺旋藻的主体种类,丝状体螺旋规则,蛋白质含量高,并含藻蓝蛋白与 β-胡萝卜素等活性成分,已实现大规模养殖。其嗜碱耐高温,高 pH 养殖池可抑制杂菌生长,曾作为应对营养短缺的未来蛋白资源推广。",
    morphology: "多细胞丝状体,螺旋规则,横壁清晰,蓝绿色。",
    habitat: "热带亚热带碱湖与高 pH 人工养殖池。",
    distribution: "非洲与美洲碱湖原产,全球广泛养殖。",
    tags: ["species"],
  },
  {
    rank: "species",
    latin: "Prochlorococcus marinus",
    chinese: "原绿球藻",
    authority: "Chisholm et al., 1992",
    parent: "Prochlorococcus",
    description:
      "原绿球藻直径约 0.5—0.7 微米,是已知最小的光合细胞,以二乙烯基叶绿素 a 与 b 捕光,并分化出适应高光与低光水层的生态型。其细胞丰度常居海洋浮游生物之首,被认为是地球上数量最多的光合生物,主导大洋初级生产的重要份额。",
    morphology: "超微型球菌,单生或成对,蓝绿色,无胶鞘。",
    habitat: "寡营养大洋真光层,依光强分层分布。",
    distribution: "南北纬 40° 之间的全球大洋。",
    tags: ["species"],
  },

  // ---- 6. 螺旋体门 Spirochaetota ----
  {
    rank: "phylum",
    latin: "Spirochaetota",
    chinese: "螺旋体门",
    parent: "Bacteria",
    description:
      "螺旋体门为细长的螺旋形细菌,具周质内鞭毛的独特运动装置,行波状游动,多为厌氧或微需氧,含寄生、共生与自由生活类群,梅毒与莱姆病的病原体皆属此门。",
    tags: ["phylum"],
  },
  {
    rank: "class",
    latin: "Spirochaetia",
    chinese: "螺旋体纲",
    parent: "Spirochaetota",
    description:
      "螺旋体纲为螺旋体门的主要纲,菌体细长螺旋状,以内鞭毛驱动波状运动,兼有自由生活与寄生种类,后者多经节肢动物媒介传播致病。",
    tags: ["class"],
  },
  {
    rank: "order",
    latin: "Spirochaetales",
    chinese: "螺旋体目",
    parent: "Spirochaetia",
    description:
      "螺旋体目为螺旋体门的核心目,菌体螺旋状、借内鞭毛行波状运动,含自由生活的螺旋体属及致梅毒、莱姆病与回归热的寄生属。",
    tags: ["order"],
  },
  {
    rank: "family",
    latin: "Treponemataceae",
    chinese: "密螺旋体科",
    parent: "Spirochaetales",
    description:
      "密螺旋体科为螺旋致密规则的细长螺旋体,多为厌氧,栖于人畜口腔、肠道与生殖道,含梅毒病原苍白密螺旋体及自由生活种。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Borreliaceae",
    chinese: "疏螺旋体科",
    parent: "Spirochaetales",
    description:
      "疏螺旋体科为螺旋疏松的螺旋体,经蜱或虱媒传播,含致莱姆病的伯氏疏螺旋体与致回归热的回归热疏螺旋体等病原。",
    tags: ["family"],
  },
  {
    rank: "genus",
    latin: "Treponema",
    chinese: "密螺旋体属",
    parent: "Treponemataceae",
    description:
      "密螺旋体属为螺旋细密的细长螺旋体,多为厌氧,栖于人畜黏膜,梅毒病原体即属之。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Borrelia",
    chinese: "疏螺旋体属",
    parent: "Borreliaceae",
    description:
      "疏螺旋体属为螺旋疏松的螺旋体,经蜱虱传播,是莱姆病与回归热等人兽共患病的病原属。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Treponema pallidum",
    chinese: "苍白密螺旋体",
    authority: "(Schaudinn & Hoffmann, 1905)",
    parent: "Treponema",
    ncbiTaxId: 160,
    description:
      "苍白密螺旋体是梅毒的病原体,经性接触与母婴垂直传播,病程自一期硬下疳、二期皮疹直至三期树胶肿,可迁延数十年并反复潜伏。迄今仍难常规体外培养,长期依靠兔睾丸接种维持菌株与血清学诊断,青霉素治疗依然高效。",
    morphology: "细长螺旋体,螺旋密致规则,两端尖细。",
    habitat: "生殖道黏膜与皮损局部,可经胎盘感染胎儿。",
    distribution: "全球分布,主要性传播疾病之一。",
    tags: ["species"],
  },
  {
    rank: "species",
    latin: "Borrelia burgdorferi",
    chinese: "伯氏疏螺旋体",
    authority: "Johnson, Hyde & Rumpel, 1984",
    parent: "Borrelia",
    ncbiTaxId: 139,
    description:
      "伯氏疏螺旋体经硬蜱叮咬传播,是莱姆病的病原体,早期见游走性红斑,未经治疗可进展为关节炎、面神经麻痹与心脏传导异常。其基因组由线性染色体及众多线形与环形质粒构成,质粒编码的表面蛋白变异助其逃逸免疫,给疫苗研发带来困难。",
    morphology: "螺旋疏松的细长螺旋体,两端尖细,运动活跃。",
    habitat: "硬蜱中肠与鼠类等储存宿主体内。",
    distribution: "北半球温带林区,北美与欧洲多发。",
    tags: ["species"],
  },

  // ---- 7. 衣原体门 Chlamydiota ----
  {
    rank: "phylum",
    latin: "Chlamydiota",
    chinese: "衣原体门",
    parent: "Bacteria",
    description:
      "衣原体门为专性细胞内寄生的小型细菌,具原体与网状体交替的双相发育周期,缺乏多数代谢通路而依赖宿主供能,古称「能量寄生菌」,可致沙眼、肺炎等疾病。",
    tags: ["phylum"],
  },
  {
    rank: "class",
    latin: "Chlamydiae",
    chinese: "衣原体纲",
    parent: "Chlamydiota",
    description:
      "衣原体纲为衣原体门的唯一纲,专性寄生于真核细胞,以具感染性的原体散播、以网状体在包涵体内增殖,代谢精简而依赖宿主,是重要的人畜病原。",
    tags: ["class"],
  },
  {
    rank: "order",
    latin: "Chlamydiales",
    chinese: "衣原体目",
    parent: "Chlamydiae",
    description:
      "衣原体目为专性细胞内寄生的小细菌,以原体感染、在宿主包涵体内以网状体增殖,衣原体科成员是人类的常见病原。",
    tags: ["order"],
  },
  {
    rank: "family",
    latin: "Chlamydiaceae",
    chinese: "衣原体科",
    parent: "Chlamydiales",
    description:
      "衣原体科为专性细胞内寄生菌,具原体与网状体双相发育周期,含沙眼衣原体与肺炎衣原体等,常致眼部、生殖道与呼吸道感染。",
    tags: ["family"],
  },
  {
    rank: "genus",
    latin: "Chlamydia",
    chinese: "衣原体属",
    parent: "Chlamydiaceae",
    description:
      "衣原体属为专性胞内寄生菌,含致沙眼与性传播感染的沙眼衣原体及致肺炎的肺炎衣原体。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Chlamydia trachomatis",
    chinese: "沙眼衣原体",
    parent: "Chlamydia",
    ncbiTaxId: 813,
    description:
      "沙眼衣原体按血清型分为致沙眼(A—C)、生殖道与新生儿感染(D—K)及性病淋巴肉芽肿(L1—L3)三大类,是全球报告最多的细菌性传播病原之一,女性反复感染可致输卵管性不孕。沙眼在卫生落后地区仍是感染性致盲的首要原因,筛查与阿奇霉素干预已被证明有效。",
    morphology: "球形原体与网状体两相,原体直径约 0.3 微米。",
    habitat: "眼结膜与泌尿生殖道柱状上皮细胞内。",
    distribution: "全球分布,卫生欠佳地区沙眼高发。",
    tags: ["species"],
  },

  // ---- 8. 异常球菌门 Deinococcota ----
  {
    rank: "phylum",
    latin: "Deinococcota",
    chinese: "异常球菌门",
    parent: "Bacteria",
    description:
      "异常球菌门又称 Deinococcus-Thermus 类群,含耐辐射的异常球菌与耐热的栖热菌两大分支,细胞壁肽聚糖含鸟氨酸,对辐射、干燥与高温等胁迫耐受性极强。",
    tags: ["phylum"],
  },
  {
    rank: "class",
    latin: "Deinococci",
    chinese: "异常球菌纲",
    parent: "Deinococcota",
    description:
      "异常球菌纲为球形、无芽孢的阳性菌,常成对或四联排列,以极端耐受电离辐射、紫外线与干燥著称,依托强大而精准的 DNA 修复系统。",
    tags: ["class"],
  },
  {
    rank: "order",
    latin: "Deinococcales",
    chinese: "异常球菌目",
    parent: "Deinococci",
    description:
      "异常球菌目为异常球菌纲的唯一目,含耐辐射的异常球菌科与产黄色素、耐高温的栖热菌科,生境横跨冻原土壤到酸性热泉。",
    tags: ["order"],
  },
  {
    rank: "family",
    latin: "Deinococcaceae",
    chinese: "异常球菌科",
    parent: "Deinococcales",
    description:
      "异常球菌科为菌落粉红的球菌,成对或四联排列,以极端抗电离辐射与干燥闻名,其 DNA 修复体系是基因组稳定性研究的经典模型。",
    tags: ["family"],
  },
  {
    rank: "genus",
    latin: "Deinococcus",
    chinese: "异常球菌属",
    parent: "Deinococcaceae",
    description:
      "异常球菌属为耐辐射球菌,菌落多呈粉红色,以非凡的 DNA 修复与抗氧化能力闻名。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Deinococcus radiodurans",
    chinese: "耐辐射异常球菌",
    authority: "(Raj et al., 1960) Brooks & Murray, 1981",
    parent: "Deinococcus",
    ncbiTaxId: 1299,
    description:
      "耐辐射异常球菌又称耐放射球菌、奇球菌,能承受致死人类上千倍的电离辐射剂量,基因组被破碎为数百片段后仍可在数小时内精确拼接复原,秘诀在于多拷贝基因组与高效的同源重组及抗氧化体系。因最早分离自辐照后仍败坏的罐装肉品而有「世界上最坚韧细菌」之称,是 DNA 修复与核废料生物治理研究的明星。",
    morphology: "菌体球形,常成对或四联,菌落粉红色,不产芽孢。",
    habitat: "干旱土壤、岩面、辐照食品与医疗器械。",
    distribution: "全球分布,自极地到沙漠皆有记录。",
    tags: ["species", "flagship"],
  },

  // ================================================================
  // 古菌域 Archaea
  // ================================================================

  // ---- 1. 广古菌门 Euryarchaeota ----
  {
    rank: "phylum",
    latin: "Euryarchaeota",
    chinese: "广古菌门",
    parent: "Archaea",
    description:
      "广古菌门是古菌域中代谢最庞杂的门,含产甲烷的甲烷杆菌纲与甲烷微菌纲、极端嗜盐的盐杆菌纲、超嗜热的热球菌纲及无细胞壁的热原体等类群,生境自湿地、盐湖直至深海热液。",
    tags: ["phylum"],
  },
  {
    rank: "class",
    latin: "Halobacteria",
    chinese: "盐杆菌纲",
    parent: "Euryarchaeota",
    description:
      "盐杆菌纲为极端嗜盐古菌,需 15% 以上氯化钠方能生存,胞内以钾离子平衡外界高渗,多产类胡萝卜素而使盐水染红,是盐湖与盐场的优势菌群。",
    tags: ["class"],
  },
  {
    rank: "class",
    latin: "Methanobacteria",
    chinese: "甲烷杆菌纲",
    parent: "Euryarchaeota",
    description:
      "甲烷杆菌纲为严格厌氧的产甲烷古菌,细胞壁由假肽聚糖构成,以氢还原二氧化碳产甲烷,广泛栖于湿地、厌氧消化器与动物消化道。",
    tags: ["class"],
  },
  {
    rank: "class",
    latin: "Thermococci",
    chinese: "热球菌纲",
    parent: "Euryarchaeota",
    description:
      "热球菌纲为超嗜热、严格厌氧的异养古菌,生长上限多在 100 ℃ 之上,栖于海底热液与地下油层,是耐高温酶的天然宝库。",
    tags: ["class"],
  },
  {
    rank: "class",
    latin: "Methanomicrobia",
    chinese: "甲烷微菌纲",
    parent: "Euryarchaeota",
    description:
      "甲烷微菌纲为形态多样的产甲烷古菌,含甲烷八叠球菌目与甲烷微菌目,部分种类能利用甲醇、乙酸等底物,是污泥厌氧消化的主力菌群。",
    tags: ["class"],
  },
  {
    rank: "order",
    latin: "Halobacteriales",
    chinese: "盐杆菌目",
    parent: "Halobacteria",
    description:
      "盐杆菌目为极端嗜盐古菌,生存依赖近饱和盐水,菌落多呈红色,代表科盐杆菌科以有机物生长,部分菌株具紫膜光能系统。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Methanobacteriales",
    chinese: "甲烷杆菌目",
    parent: "Methanobacteria",
    description:
      "甲烷杆菌目为严格厌氧的产甲烷古菌,细胞壁具假肽聚糖,利用氢与二氧化碳或甲酸产甲烷,栖于湿地、瘤胃与厌氧消化器。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Thermococcales",
    chinese: "热球菌目",
    parent: "Thermococci",
    description:
      "热球菌目为超嗜热、严格厌氧的古菌,栖于海底热液喷口,发酵肽类与糖类,常以元素硫为电子受体,火球菌属与热球菌属为其代表。",
    tags: ["order"],
  },
  {
    rank: "order",
    latin: "Methanosarcinales",
    chinese: "甲烷八叠球菌目",
    parent: "Methanomicrobia",
    description:
      "甲烷八叠球菌目为底物利用最广的产甲烷古菌,可分解甲醇、甲胺与乙酸产甲烷,菌体常聚集成团或包被鞘层,广布于沉积物与厌氧反应器。",
    tags: ["order"],
  },
  {
    rank: "family",
    latin: "Halobacteriaceae",
    chinese: "盐杆菌科",
    parent: "Halobacteriales",
    description:
      "盐杆菌科为极端嗜盐古菌,细胞壁为糖蛋白 S 层,胞内积累高浓度钾离子以平衡渗透,菌落红紫色,盛见于盐湖与盐场结晶池。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Methanobacteriaceae",
    chinese: "甲烷杆菌科",
    parent: "Methanobacteriales",
    description:
      "甲烷杆菌科为严格厌氧的产甲烷古菌,细胞壁含假肽聚糖,利用氢与二氧化碳或甲酸产甲烷,栖于湿地、污水与动物消化道。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Thermococcaceae",
    chinese: "热球菌科",
    parent: "Thermococcales",
    description:
      "热球菌科为超嗜热厌氧古菌,菌体球形,常具极生多鞭毛,栖于海底热液系统,火球菌属与热球菌属是高温酶学研究的骨干。",
    tags: ["family"],
  },
  {
    rank: "family",
    latin: "Methanosarcinaceae",
    chinese: "甲烷八叠球菌科",
    parent: "Methanosarcinales",
    description:
      "甲烷八叠球菌科为可利用乙酸、甲醇、甲胺与氢产甲烷的古菌,细胞常聚集成团并包被鞘层,是沉积物与厌氧消化器的主要产甲烷者。",
    tags: ["family"],
  },
  {
    rank: "genus",
    latin: "Halobacterium",
    chinese: "盐杆菌属",
    parent: "Halobacteriaceae",
    description:
      "盐杆菌属为极端嗜盐古菌的模式属,部分菌株具紫膜,以菌视紫质进行光驱质子泵。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Methanobacterium",
    chinese: "甲烷杆菌属",
    parent: "Methanobacteriaceae",
    description:
      "甲烷杆菌属为杆状产甲烷古菌,利用氢与二氧化碳或甲酸,代表种为甲酸甲烷杆菌。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Pyrococcus",
    chinese: "火球菌属",
    parent: "Thermococcaceae",
    description:
      "火球菌属为超嗜热球菌,最适温度接近 100 ℃,其 Pfu 聚合酶广泛用于高保真 PCR。",
    tags: ["genus"],
  },
  {
    rank: "genus",
    latin: "Methanosarcina",
    chinese: "甲烷八叠球菌属",
    parent: "Methanosarcinaceae",
    description:
      "甲烷八叠球菌属为底物谱最宽的产甲烷古菌,可利用乙酸、甲醇与甲胺,常聚集成团生长。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Halobacterium salinarum",
    chinese: "盐生盐杆菌",
    authority: "(Harrison & Kennedy, 1922)",
    parent: "Halobacterium",
    description:
      "盐生盐杆菌生长于近饱和盐水,胞内积累高浓度钾离子以平衡渗透压。紫膜上的菌视紫质为光驱动质子泵,受光即可跨膜泵出质子合成 ATP,是生物能量转换研究的里程碑分子;该菌及其 NRC-1 株是古菌学的经典模式生物。",
    morphology: "杆状至多形性,菌落红紫色,革兰氏阴性反应。",
    habitat: "盐湖、盐场结晶池、腌肉与盐渍皮革。",
    distribution: "全球高盐生境,常将盐池染成红色。",
    tags: ["species", "flagship", "模式生物"],
  },
  {
    rank: "species",
    latin: "Methanobacterium formicicum",
    chinese: "甲酸甲烷杆菌",
    authority: "(Schnellen, 1947)",
    parent: "Methanobacterium",
    description:
      "甲酸甲烷杆菌为严格厌氧的产甲烷古菌,能以氢与二氧化碳或甲酸为底物产生甲烷,是湿地、污泥消化器与动物消化道中的常见功能成员。作为甲烷杆菌属的代表种,其细胞壁由假肽聚糖构成,被广泛用作产甲烷代谢研究的模式菌株。",
    morphology: "细长杆状,不运动,常呈链状或丝状排列。",
    habitat: "缺氧沉积物、沼泽、污水污泥与肠道。",
    distribution: "全球厌氧环境,淡水生境尤为常见。",
    tags: ["species"],
  },
  {
    rank: "species",
    latin: "Pyrococcus furiosus",
    chinese: "激烈火球菌",
    authority: "Fiala & Stetter, 1986",
    parent: "Pyrococcus",
    description:
      "激烈火球菌最适温度约 100 ℃,厌氧发酵糖类与肽类,并以含钨酶为特色的代谢系统著称。从中纯化的 Pfu DNA 聚合酶具 3′→5′ 校对活性,是高保真 PCR 与测序的主力工具酶;该菌亦是超嗜热酶学与遗传体系的模式古菌。",
    morphology: "不规则球菌,极生鞭毛束,革兰氏阴性反应。",
    habitat: "海底热液喷口与高温海洋沉积物。",
    distribution: "地中海武尔卡诺岛等海洋地热区。",
    tags: ["species"],
  },
  {
    rank: "species",
    latin: "Methanosarcina mazei",
    chinese: "马氏甲烷八叠球菌",
    authority: "(Barker, 1936) Mah & Kuhn, 1984",
    parent: "Methanosarcina",
    description:
      "马氏甲烷八叠球菌能利用氢、甲醇、甲胺与乙酸四类底物产甲烷,底物谱居产甲烷古菌前列,常以聚集成团并包被鞘层的形态出现。其基因组约 4.1 Mb,为较大的古菌基因组,富含重复基因,是研究产甲烷调控与乙酸裂解途径的模式菌。",
    morphology: "不规则球菌,多细胞聚集成团,外被鞘层。",
    habitat: "湖海沉积物、稻田土壤与厌氧消化器。",
    distribution: "全球缺氧沉积物与污水处理系统。",
    tags: ["species"],
  },

  // ---- 2. 泉古菌门 Crenarchaeota ----
  {
    rank: "phylum",
    latin: "Crenarchaeota",
    chinese: "泉古菌门",
    parent: "Archaea",
    description:
      "泉古菌门多为超嗜热或嗜酸热的化能营养古菌,栖于酸性热泉、火山土壤与深海热液,细胞壁为糖蛋白 S 层而非肽聚糖,代表属有硫化叶菌与热变形菌,硫代谢活跃。",
    tags: ["phylum"],
  },
  {
    rank: "class",
    latin: "Thermoprotei",
    chinese: "热变形菌纲",
    parent: "Crenarchaeota",
    description:
      "热变形菌纲为泉古菌门的代表纲,菌体杆状、丝状或叶球状,超嗜热,栖于热泉与深海热液,硫化叶菌目与热变形菌目皆属之。",
    tags: ["class"],
  },
  {
    rank: "order",
    latin: "Sulfolobales",
    chinese: "硫化叶菌目",
    parent: "Thermoprotei",
    description:
      "硫化叶菌目为嗜酸热古菌,于 80 ℃ 上下、pH 2—3 的环境生长,好氧氧化硫与有机物,菌体不规则叶状,栖于酸性热泉与火山土壤。",
    tags: ["order"],
  },
  {
    rank: "family",
    latin: "Sulfolobaceae",
    chinese: "硫化叶菌科",
    parent: "Sulfolobales",
    description:
      "硫化叶菌科为嗜酸热古菌,菌体不规则叶球状,好氧,氧化元素硫与有机物获能,栖于酸性热泉与火山地区,模式属为硫化叶菌属。",
    tags: ["family"],
  },
  {
    rank: "genus",
    latin: "Sulfolobus",
    chinese: "硫化叶菌属",
    parent: "Sulfolobaceae",
    description:
      "硫化叶菌属为嗜酸热古菌的经典属,叶球状细胞栖于酸性热泉,是泉古菌遗传研究的基础。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Sulfolobus acidocaldarius",
    chinese: "嗜酸热硫化叶菌",
    authority: "Brock et al., 1972",
    parent: "Sulfolobus",
    description:
      "嗜酸热硫化叶菌生长于约 75 ℃、pH 3 上下的酸性热泉,好氧氧化有机物与硫化物,菌体不规则叶状。它是泉古菌中遗传操作最成熟的模式菌,基因敲除与报告系统一应俱全,为古菌细胞生物学与 DNA 修复研究提供关键平台,最初发现于黄石公园酸性热泉。",
    morphology: "不规则叶状球菌,单生,细胞壁为糖蛋白 S 层。",
    habitat: "酸性硫磺热泉、火山土壤与泥沼。",
    distribution: "全球火山区,如黄石与冰岛地热田。",
    tags: ["species"],
  },

  // ---- 3. 纳米古菌门 Nanoarchaeota ----
  {
    rank: "phylum",
    latin: "Nanoarchaeota",
    chinese: "纳米古菌门",
    parent: "Archaea",
    description:
      "纳米古菌门为已知细胞最小的古菌类群,细胞直径仅约 400 纳米,基因组高度精简、缺失多数代谢与合成基因,专性附生于其他古菌表面,是研究最小基因组与共生演化的独特体系。",
    tags: ["phylum"],
  },
  {
    rank: "class",
    latin: "Nanoarchaeia",
    chinese: "纳米古菌纲",
    parent: "Nanoarchaeota",
    description:
      "纳米古菌纲为已知最小的细胞生物类群,直径约 0.4 微米,专性附生于其他古菌表面生活,基因组极简,几乎不含独立代谢基因。",
    tags: ["class"],
  },
  {
    rank: "order",
    latin: "Nanoarchaeales",
    chinese: "纳米古菌目",
    parent: "Nanoarchaeia",
    description:
      "纳米古菌目为超微小的附生古菌,专性附生于宿主古菌 Ignicoccus 表面以获取脂质、能量与代谢中间物,见于深海热液与陆地热泉。",
    tags: ["order"],
  },
  {
    rank: "family",
    latin: "Nanoarchaeaceae",
    chinese: "纳米古菌科",
    parent: "Nanoarchaeales",
    description:
      "纳米古菌科为超微小附生古菌,基因组不足 50 万碱基对,为已知最小的细胞基因组之一,几乎所有代谢功能均依赖宿主细胞提供。",
    tags: ["family"],
  },
  {
    rank: "genus",
    latin: "Nanoarchaeum",
    chinese: "纳古菌属",
    parent: "Nanoarchaeaceae",
    description:
      "纳古菌属为已知最小的细胞生物之一,仅含一个种,必须附生于宿主古菌 Ignicoccus 才能生存。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Nanoarchaeum equitans",
    chinese: "骑行纳古菌",
    authority: "Huber et al., 2002",
    parent: "Nanoarchaeum",
    description:
      "骑行纳古菌为已知细胞最小的生物之一,直径约 400 纳米,基因组仅约 49 万碱基对,缺乏氨基酸与脂质合成等基本途径,必须骑附于宿主古菌 Ignicoccus 表面获取能量与前体分子。这一「最小细胞」是研究基因组精简与专性共生演化的天然样本,2002 年发现于冰岛附近海底热泉。",
    morphology: "超微小球菌,直径约 0.4 微米,表面具附着结构。",
    habitat: "深海热液喷口,附生于 Ignicoccus 表面。",
    distribution: "冰岛附近海脊等海底热液系统。",
    tags: ["species"],
  },

  // ---- 4. 奇古菌门 Thaumarchaeota ----
  {
    rank: "phylum",
    latin: "Thaumarchaeota",
    chinese: "奇古菌门",
    parent: "Archaea",
    description:
      "奇古菌门为好氧的化能自养古菌,能将氨氧化为亚硝酸盐,广泛分布于海洋、土壤与温泉,是全球氨氧化与氮循环的重要驱动者,纠正了氨氧化仅由细菌承担的旧观念。",
    tags: ["phylum"],
  },
  {
    rank: "class",
    latin: "Nitrososphaeria",
    chinese: "奇古菌纲",
    parent: "Thaumarchaeota",
    description:
      "奇古菌纲即氨氧化古菌,好氧化能自养,将氨氧化为亚硝酸盐并固定二氧化碳,在海洋与土壤中无处不在,是地球上最丰富的微生物类群之一。",
    tags: ["class"],
  },
  {
    rank: "order",
    latin: "Nitrosopumilales",
    chinese: "亚硝化细小古菌目",
    parent: "Nitrososphaeria",
    description:
      "亚硝化细小古菌目为好氧的氨氧化古菌,细胞细小,自养固定二氧化碳,见于海洋、河口与土壤,是这些生境中最丰富的古菌群之一。",
    tags: ["order"],
  },
  {
    rank: "family",
    latin: "Nitrosopumilaceae",
    chinese: "亚硝化细小古菌科",
    parent: "Nitrosopumilales",
    description:
      "亚硝化细小古菌科为海洋与土壤中优势的氨氧化古菌,细胞杆状至梨形,好氧自养,以 SCM1 等模式菌株研究最为深入。",
    tags: ["family"],
  },
  {
    rank: "genus",
    latin: "Nitrosopumilus",
    chinese: "亚硝化细小古菌属",
    parent: "Nitrosopumilaceae",
    description:
      "亚硝化细小古菌属为海洋优势氨氧化古菌,好氧自养,是海洋硝化作用的主要承担者之一。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Nitrosopumilus maritimus",
    chinese: "海洋亚硝化细小古菌",
    authority: "Könneke et al., 2005",
    parent: "Nitrosopumilus",
    description:
      "海洋亚硝化细小古菌是首个获得纯培养的氨氧化古菌,将氨氧化为亚硝酸盐并自养固定二氧化碳,以精简的基因组和极小的细胞适应寡营养海水。其近缘类群在开阔大洋无处不在,主导海洋氨氧化过程,深刻改变了学界对全球氮循环的认知。",
    morphology: "细小杆状至梨形细胞,体积远小于一般细菌。",
    habitat: "寡营养海水上层、海洋沉积物与土壤。",
    distribution: "全球大洋及广泛陆地土壤生境。",
    tags: ["species"],
  },
];
