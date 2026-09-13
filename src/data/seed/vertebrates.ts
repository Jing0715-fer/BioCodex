import { TaxonSeed } from "../types";

// 脊索动物门(脊椎动物)种子数据:圆口纲 → 哺乳纲。
// 层级链:species → genus → family → order → (subclass) → class
//         → subphylum Vertebrata → phylum Chordata → kingdom Animalia。
// 注意:Chordata 另被 invertebrates.ts 引用为尾索/头索亚门之父,
// 其 latin 必须精确为 "Chordata"。
export const vertebrates: TaxonSeed[] = [
  // ===================== 脊索动物门 / 脊椎动物亚门 =====================
  {
    rank: "phylum",
    latin: "Chordata",
    chinese: "脊索动物门",
    parent: "Animalia",
    description:
      "脊索动物门具脊索、背神经管与咽鳃裂三大共有特征,涵盖尾索、头索动物及脊椎动物。从固着的海鞘到三十米的蓝鲸,现存约八万余种,是动物界体制最高等、适应最广的门类之一。",
  },
  {
    rank: "subphylum",
    latin: "Vertebrata",
    chinese: "脊椎动物亚门",
    parent: "Chordata",
    description:
      "脊椎动物以分节脊柱取代脊索,具头骨保护的发达脑与感觉器官,包括圆口类、鱼类、两栖、爬行、鸟与哺乳类。现存约七万种,占据水陆空各类生态位,是结构最复杂的动物类群。",
  },

  // ===================== 圆口纲 Cyclostomata =====================
  {
    rank: "class",
    latin: "Cyclostomata",
    chinese: "圆口纲",
    parent: "Vertebrata",
    description:
      "圆口纲是无颌的原始脊椎动物,口呈圆形漏斗状,无成对偶鳍,内骨骼全为软骨。包括七鳃鳗与盲鳗两类,多营寄生或腐食生活,被视为最接近脊椎动物起源的现生类群。",
  },
  {
    rank: "order",
    latin: "Petromyzontiformes",
    chinese: "七鳃鳗目",
    parent: "Cyclostomata",
    description:
      "七鳃鳗目成体口为吸盘状并具角质齿,吸附于鱼类体表营半寄生生活,眼后各有七个外鳃孔,故俗称七鳃鳗。多分布于北半球温带淡水与海洋,溯河或陆封繁殖。",
  },
  {
    rank: "family",
    latin: "Petromyzontidae",
    chinese: "七鳃鳗科",
    parent: "Petromyzontiformes",
    description:
      "七鳃鳗科是现生七鳃鳗的主要类群,背鳍连续,肛门下位具棒状突,广布北半球温带水域,部分种类在河湖与海洋间洄游,幼体沙隐虫埋栖滤食数年。",
  },
  {
    rank: "genus",
    latin: "Lethenteron",
    chinese: "七鳃鳗属",
    parent: "Petromyzontidae",
    description:
      "七鳃鳗属为小型七鳃鳗类,分布于东亚与北美北部冷凉水域,成体多为非寄生或半寄生型,是研究脊椎动物起源与变态发育的重要材料。",
  },
  {
    rank: "species",
    latin: "Lethenteron reissneri",
    chinese: "东北七鳃鳗",
    authority: "(Dybowski, 1869)",
    parent: "Lethenteron",
    description:
      "东北七鳃鳗是小型淡水七鳃鳗,终生栖息于东北亚河湖,体鳗形,口吸盘具细齿,眼后列七个鳃孔。幼体沙隐虫埋栖泥沙滤食数年后变态为成体,成体多不营寄生,是研究脊椎动物起源与变态发育的经典对象。",
    morphology: "体鳗形,一般约 15-25 厘米,皮肤光滑无鳞,口呈吸盘状,背部深灰,腹部色浅,眼后具七对鳃孔。",
    habitat: "栖息于水质清澈、底质砂砾的河流与湖泊,白日藏于石下。",
    distribution: "分布于中国东北水系、俄罗斯远东、朝鲜半岛及日本北部。",
  },
  {
    rank: "order",
    latin: "Myxiniformes",
    chinese: "盲鳗目",
    parent: "Cyclostomata",
    description:
      "盲鳗目体鳗形无脊椎骨,口缘具肉质触须,眼退化埋于皮下,鼻孔一个。多以腐尸与垂死鱼类为食,遇险可分泌大量黏液御敌,栖息于较冷海底,雌雄同体。",
  },
  {
    rank: "family",
    latin: "Myxinidae",
    chinese: "盲鳗科",
    parent: "Myxiniformes",
    description:
      "盲鳗科是盲鳗目唯一现存科,约八十种,分布于世界各大洋的大陆架与深海泥底,体外受精,卵大而数少,角质齿舌刮食猎物。",
  },
  {
    rank: "genus",
    latin: "Eptatretus",
    chinese: "粘盲鳗属",
    parent: "Myxinidae",
    description:
      "粘盲鳗属是盲鳗科最大的属,吻端具四对触须,鳃孔数因种而异,分布于太平洋、印度洋与大西洋的暖温海域近底。",
  },
  {
    rank: "species",
    latin: "Eptatretus burgeri",
    chinese: "布氏粘盲鳗",
    authority: "(Girard, 1855)",
    parent: "Eptatretus",
    description:
      "布氏粘盲鳗分布于西北太平洋近海,体鳗形光滑无鳞,眼退化埋于皮下,口缘肉质触须灵敏。常钻入落网或垂死鱼体内刮食,遇险时体侧粘液孔分泌大量黏液缠结成团御敌,是研究脊椎动物先天免疫与黏液分泌的重要模型。",
    morphology: "体延长呈鳗形,可达 60 厘米,体色粉褐,鳃孔与粘液孔成列,口周具四对触须,眼退化无外露。",
    habitat: "栖息于近海泥沙底质水域,常穴居软泥,昼伏夜出。",
    distribution: "分布于日本、韩国沿海及中国东海、南海大陆架近海。",
  },

  // ===================== 软骨鱼纲 Chondrichthyes =====================
  {
    rank: "class",
    latin: "Chondrichthyes",
    chinese: "软骨鱼纲",
    parent: "Vertebrata",
    description:
      "软骨鱼纲内骨骼全为软骨,体多被盾鳞,具五至七对鳃裂而无鳃盖,雄鱼腹鳍特化为交配器鳍脚。包括鲨与鳐等,多为海洋肉食者,现存约一千二百余种。",
  },
  {
    rank: "order",
    latin: "Lamniformes",
    chinese: "鼠鲨目",
    parent: "Chondrichthyes",
    description:
      "鼠鲨目包含噬人鲨、灰鲭鲨等顶级掠食者,体纺锤形,尾鳍新月形,部分种类具血管逆流换热的恒温能力,是大洋中游泳最迅速的鲨类之一。",
  },
  {
    rank: "family",
    latin: "Lamnidae",
    chinese: "鼠鲨科",
    parent: "Lamniformes",
    description:
      "鼠鲨科即俗称的噬人鲨科,体呈流线纺锤形,吻尖,尾柄具侧突,能维持体温高于海水,广布全球温带大洋上层,游速极快。",
  },
  {
    rank: "genus",
    latin: "Carcharodon",
    chinese: "噬人鲨属",
    parent: "Lamnidae",
    description:
      "噬人鲨属现仅存一种,化石记录可追溯至中新世,巨齿鲨为其远古近亲,以大型海洋脊椎动物为食,是地球史上最著名的顶级掠食者类群。",
  },
  {
    rank: "species",
    latin: "Carcharodon carcharias",
    chinese: "噬人鲨",
    authority: "(Linnaeus, 1758)",
    parent: "Carcharodon",
    description:
      "噬人鲨俗称大白鲨,是现存最大的掠食性鱼类之一,以海豹、海狮等海洋哺乳类和鱼类为食。具部分恒温能力,嗅觉与电感应极其敏锐,针对人类的袭击事件使其成为最具传奇色彩的海洋掠食者,被 IUCN 列为易危物种。",
    morphology: "体粗壮呈纺锤形,一般长 4-6 米,背部铅灰、腹部白色,新月形尾鳍,口中三角形锯齿利齿成排替换。",
    habitat: "栖息于温带与亚热带近海至开阔大洋,常出没于海豹聚集的岛屿周边。",
    distribution: "广布于全球各大洋温带海域,以南非、澳大利亚、北美加州近海最著名。",
    conservation: "VU",
    tags: ["flagship"],
  },
  {
    rank: "order",
    latin: "Orectolobiformes",
    chinese: "须鲨目",
    parent: "Chondrichthyes",
    description:
      "须鲨目口位于头部前端或下位,常具口须,包括鲸鲨、斑竹鲨与须鲨等。底栖种类于礁区缓行,大洋种类则远距离迁徙,卵生或卵胎生。",
  },
  {
    rank: "family",
    latin: "Rhincodontidae",
    chinese: "鲸鲨科",
    parent: "Orectolobiformes",
    description:
      "鲸鲨科现仅鲸鲨一种,为滤食性巨鲨,以浮游生物与小鱼为食,科内体长为鱼类之冠,鳃裂巨大,体具白色斑点与格纹。",
  },
  {
    rank: "genus",
    latin: "Rhincodon",
    chinese: "鲸鲨属",
    parent: "Rhincodontidae",
    description:
      "鲸鲨属为单型属,体庞大具白斑,滤食浮游生物,性情温和,可长距离迁徙,是已知现存最大的鱼类属。",
  },
  {
    rank: "species",
    latin: "Rhincodon typus",
    chinese: "鲸鲨",
    authority: "(Smith, 1828)",
    parent: "Rhincodon",
    description:
      "鲸鲨是现存最大的鱼类,体长可达 12 米,以浮游生物、小鱼与乌贼为滤食对象,性情温和,对人类几乎无威胁。庞大身躯与白色星斑使其极易识别,全球多处潜点以其发展生态旅游,受过度捕捞与船只撞击威胁,列濒危。",
    morphology: "体庞大延长,可达 12 米,灰褐色体表布满白色斑点与格纹,口宽近一米,五对巨大鳃裂。",
    habitat: "栖息于热带与暖温带沿岸及大洋上层,随浮游生物聚集作季节性迁徙。",
    distribution: "广布于全球热带与温带海域,中国南海、东海及台湾周边有记录。",
    conservation: "EN",
    tags: ["flagship"],
  },
  {
    rank: "family",
    latin: "Hemiscylliidae",
    chinese: "长尾须鲨科",
    parent: "Orectolobiformes",
    description:
      "长尾须鲨科俗称竹鲨科,体细长具口须,栖息于印度-西太平洋近岸珊瑚礁沙底,卵生,卵壳螺旋状,常被水族馆饲养与用于发育研究。",
  },
  {
    rank: "genus",
    latin: "Chiloscyllium",
    chinese: "竹鲨属",
    parent: "Hemiscylliidae",
    description:
      "竹鲨属体具横带或斑点,能耐受低氧环境,底栖夜行,卵大易孵,是软骨鱼类胚胎发育与感觉生理研究的常用对象。",
  },
  {
    rank: "species",
    latin: "Chiloscyllium plagiosum",
    chinese: "条纹斑竹鲨",
    authority: "(Bennett, 1830)",
    parent: "Chiloscyllium",
    description:
      "条纹斑竹鲨分布于印度-西太平洋近岸,幼体具深色横带如竹节,底栖夜行,以小鱼虾蟹与底栖无脊椎动物为食。对低氧耐受极强,卵壳易孵化饲养,长期作为软骨鱼胚胎发育与电感受研究的模式动物。",
    morphology: "体细长,一般不足 1 米,幼体深褐横带明显、成体渐散,口具小口须,背鳍后位,尾鳍长。",
    habitat: "栖息于潮间带至浅海的珊瑚礁与沙泥底质海域,昼伏礁洞夜出觅食。",
    distribution: "分布于中国南海、东海及印度尼西亚、泰国、新加坡等印度-西太平洋近岸。",
    tags: ["模式生物"],
  },
  {
    rank: "order",
    latin: "Carcharhiniformes",
    chinese: "真鲨目",
    parent: "Chondrichthyes",
    description:
      "真鲨目是鲨类最大的目,含真鲨、双髻鲨、皱唇鲨等约二百七十余种,眼具瞬膜,鳃裂五对,广布全球海洋,从礁区到大洋均有,生态位多样。",
  },
  {
    rank: "family",
    latin: "Sphyrnidae",
    chinese: "双髻鲨科",
    parent: "Carcharhiniformes",
    description:
      "双髻鲨科以锤状头型著称,眼与鼻孔位于头翼两端,显著扩大视野与嗅觉扫描范围,群游于暖水大洋,以鱼类与头足类为食。",
  },
  {
    rank: "genus",
    latin: "Sphyrna",
    chinese: "双髻鲨属",
    parent: "Sphyrnidae",
    description:
      "双髻鲨属头翼宽大,日间常集群巡游,夜间分散捕食鱼类与鳐,部分种群作长距离迁徙,鱼翅贸易压力沉重。",
  },
  {
    rank: "species",
    latin: "Sphyrna lewini",
    chinese: "路氏双髻鲨",
    authority: "(Griffith & Smith, 1834)",
    parent: "Sphyrna",
    description:
      "路氏双髻鲨头部前缘呈圆弧形,群体巡游于暖海,以鱼类、头足类与鳐类为食,常数百尾聚群夜潜捕猎。其鱼翅为鱼翅贸易的主要对象之一,过度捕捞使全球种群数十年间锐减,被 IUCN 升列为极危。",
    morphology: "体长可达 3-4 米,头呈锤形且前缘弧曲,眼位于头翼两端,背鳍高,背部灰褐、腹部白色。",
    habitat: "栖息于温暖沿岸与大洋上层,日间集群、夜间上浮分散捕食,可潜入深水。",
    distribution: "广布于全球热带与暖温带海域,中国南海与东海较常见。",
    conservation: "CR",
  },
  {
    rank: "family",
    latin: "Triakidae",
    chinese: "皱唇鲨科",
    parent: "Carcharhiniformes",
    description:
      "皱唇鲨科为中小型鲨类,眼具瞬膜,齿小而多列,以底栖无脊椎动物与鱼类为食,包括星鲨与皱唇鲨等,多为卵胎生,是近海底拖渔业常见兼捕对象。",
  },
  {
    rank: "genus",
    latin: "Mustelus",
    chinese: "星鲨属",
    parent: "Triakidae",
    description:
      "星鲨属体光滑常具白斑,背鳍两片无棘,齿扁平适于碾碎硬壳猎物,广布温带近海,卵胎生或胎盘胎生,经济价值较高。",
  },
  {
    rank: "species",
    latin: "Mustelus manazo",
    chinese: "白斑星鲨",
    authority: "Bleeker, 1855",
    parent: "Mustelus",
    description:
      "白斑星鲨分布于西北太平洋近海,背部灰褐密布白色斑点,以底栖甲壳类、贝类与小鱼为食,卵胎生。是东亚近海常见的小型经济鲨类,肉质细嫩,亦常作为软骨鱼类解剖学教学材料。",
    morphology: "体细长,约 1 米,背部灰褐具白点,腹部白色,两背鳍无硬棘,尾鳍上叶长于下叶。",
    habitat: "栖息于大陆架沙泥底近海,常集小群游弋,行动迟缓。",
    distribution: "分布于中国沿海、日本南部与朝鲜半岛近海水域。",
  },

  // ===================== 硬骨鱼纲 Osteichthyes =====================
  {
    rank: "class",
    latin: "Osteichthyes",
    chinese: "硬骨鱼纲",
    parent: "Vertebrata",
    description:
      "硬骨鱼纲骨骼至少部分骨化,具鳃盖骨,体多覆骨鳞,是现存最大的鱼类类群,分为辐鳍亚纲与肉鳍亚纲,逾三万种,几乎涵盖所有经济鱼类,与四足动物同属硬骨脊椎动物。",
  },
  {
    rank: "subclass",
    latin: "Actinopterygii",
    chinese: "辐鳍亚纲",
    parent: "Osteichthyes",
    description:
      "辐鳍亚纲偶鳍由辐射状硬骨鳍条支撑,鳞为骨鳞,涵盖现存鱼类的绝大多数,从鲤、鲑到海马、比目鱼,淡水海洋生态类型极其多样,演化极为成功。",
  },
  {
    rank: "subclass",
    latin: "Sarcopterygii",
    chinese: "肉鳍亚纲",
    parent: "Osteichthyes",
    description:
      "肉鳍亚纲偶鳍具肉质叶与单一骨轴,包括肺鱼与腔棘鱼两支,与四足动物亲缘极近,是鱼类登陆演化的关键类群,现存仅矛尾鱼与数种肺鱼,被誉为活化石。",
  },
  {
    rank: "order",
    latin: "Cypriniformes",
    chinese: "鲤形目",
    parent: "Actinopterygii",
    description:
      "鲤形目是最大的淡水鱼目,具韦伯氏器连接鳔与内耳,口多无齿而咽齿发达,全球逾四千种,鲤科鱼类占据东亚淡水鱼类的主体,包括众多养殖与观赏种类。",
  },
  {
    rank: "family",
    latin: "Cyprinidae",
    chinese: "鲤科",
    parent: "Cypriniformes",
    description:
      "鲤科是鲤形目最大科,咽齿发达用以研磨食物,颌骨无齿,包括鲤、鲫、草鱼、鲢及金鱼等,是淡水养殖与观赏渔业的主体,东亚为其多样性中心。",
  },
  {
    rank: "genus",
    latin: "Cyprinus",
    chinese: "鲤属",
    parent: "Cyprinidae",
    description:
      "鲤属具两对口须,咽齿三行研磨硬质食物,是欧亚大陆最重要的养殖鱼类属之一,锦鲤与镜鲤等品系皆源于其驯化。",
  },
  {
    rank: "species",
    latin: "Cyprinus carpio",
    chinese: "鲤",
    authority: "Linnaeus, 1758",
    parent: "Cyprinus",
    description:
      "鲤是世界上最古老的养殖鱼之一,在中国有两千余年养殖史,经选育形成镜鲤、锦鲤等诸多品系。适应力极强,被引种至各大洲后于多地成为入侵物种,同时也是基因组学与免疫学研究的对象。",
    morphology: "体侧扁延长,背鳍前缘具硬棘,口角具须两对,咽齿发达,体色青灰或金褐,鳞大而厚。",
    habitat: "栖息于底质松软、水草繁茂的湖泊河流与池塘中下层,耐低氧能力强。",
    distribution: "原产欧亚大陆温带水域,现已被引种至全球各温带地区。",
    conservation: "LC",
    tags: ["flagship", "驯化祖先"],
  },
  {
    rank: "genus",
    latin: "Carassius",
    chinese: "鲫属",
    parent: "Cyprinidae",
    description:
      "鲫属无口须或仅具一对短须,咽齿一行,包括鲫与银鲫等,广泛分布于欧亚淡水,金鱼由其家养变异选育而来。",
  },
  {
    rank: "species",
    latin: "Carassius auratus",
    chinese: "鲫",
    authority: "(Linnaeus, 1758)",
    parent: "Carassius",
    description:
      "鲫是东亚最常见的野生小鱼之一,经千年家养选育诞生金鱼——最古老的观赏鱼。银灰体色变异出红、金、花色与龙睛、水泡眼等数百个品种,是人工选择与表型多样性研究的经典范例。",
    morphology: "体侧扁而高,一般 10-20 厘米,无口须,背鳍起点位于体最高处,体色银灰,变异极多。",
    habitat: "喜栖息于水草丛生的湖泊、池塘与河湾,耐低氧与冰冻能力极强。",
    distribution: "广布于中国、日本、朝鲜半岛及俄罗斯远东,已引种至世界各地。",
    tags: ["驯化祖先"],
  },
  {
    rank: "genus",
    latin: "Ctenopharyngodon",
    chinese: "草鱼属",
    parent: "Cyprinidae",
    description:
      "草鱼属为单型属,体长筒形,咽齿侧扁如梳,是专以水草为食的大型鲤科鱼,生长迅速,养殖地位重要。",
  },
  {
    rank: "species",
    latin: "Ctenopharyngodon idella",
    chinese: "草鱼",
    authority: "(Valenciennes, 1844)",
    parent: "Ctenopharyngodon",
    description:
      "草鱼是中国四大家鱼之一,以水草为主食,食量巨大,生长迅速,是全球养殖产量最高的鱼类之一。其草食天性曾被用于清除河道与稻田杂草,故名草鱼,水库湖泊亦以其调控水草。",
    morphology: "体长筒形,可达 1 米余,鳞大,体茶黄色,腹部灰白,无口须,背鳍短无硬棘。",
    habitat: "喜栖于江河中下层与泛滥平原草丛区,产漂流性卵于流水。",
    distribution: "原产中国东部至俄罗斯远东各大水系,已引种至全球五十余国养殖。",
    conservation: "LC",
  },
  {
    rank: "genus",
    latin: "Hypophthalmichthys",
    chinese: "鲢属",
    parent: "Cyprinidae",
    description:
      "鲢属眼位低,鳃耙细密愈合成海绵状滤食结构,以浮游生物为食,包括鲢与鳙,均为大型滤食性鲃类,养殖与水质调控价值突出。",
  },
  {
    rank: "species",
    latin: "Hypophthalmichthys molitrix",
    chinese: "鲢",
    authority: "(Valenciennes, 1844)",
    parent: "Hypophthalmichthys",
    description:
      "鲢俗称白鲢,是四大家鱼中唯一滤食浮游植物者,以海绵状鳃耙滤取藻类,被称为水体控藻鱼。与鳙搭配放养,是池塘混养与水库渔业的主力,亦用于蓝藻水华的生物调控。",
    morphology: "体侧扁稍高,鳞细小,腹部窄棱延至肛前,体银白色,眼位低,鳃耙密结如筛。",
    habitat: "栖息于大型江河、水库与湖泊上层,性活泼善跳跃,产漂流性卵。",
    distribution: "原产中国东部平原水系,现广泛引种于亚洲、美洲与欧洲。",
  },
  {
    rank: "order",
    latin: "Siluriformes",
    chinese: "鲇形目",
    parent: "Actinopterygii",
    description:
      "鲇形目体多裸露无鳞,皮肤富黏液,口周多须,广布于淡水并延伸至海洋,约四千种,夜行肉食为主,包括鲇、鲿与海鲶等,具重要经济价值。",
  },
  {
    rank: "family",
    latin: "Siluridae",
    chinese: "鲇科",
    parent: "Siluriformes",
    description:
      "鲇科背鳍小或缺,臀鳍长,无脂鳍,须二至四对,是欧亚大陆淡水底栖肉食鱼的常见类群,夜行伏击猎物。",
  },
  {
    rank: "genus",
    latin: "Silurus",
    chinese: "鲇属",
    parent: "Siluridae",
    description:
      "鲇属体前部圆胖后部侧扁,头宽口阔,须两对,多为大型伏击型捕食者,广布欧亚,包括欧鲇等巨型种。",
  },
  {
    rank: "species",
    latin: "Silurus asotus",
    chinese: "鲇",
    authority: "Linnaeus, 1758",
    parent: "Silurus",
    description:
      "鲇俗称鲶鱼,黄昏与夜间活跃,潜伏于洞穴与障碍物间伏击小鱼小虾,昼间深藏不出,是东亚河湖常见的大型底栖鱼。发达的口须与黏滑无鳞的皮肤使其辨识度极高。",
    morphology: "体前部圆胖后部侧扁,无鳞而黏滑,口宽大,上颌须长可及胸鳍末端,尾鳍小而圆。",
    habitat: "喜栖息于多洞穴缓流或静水的河湖底层,昼伏夜出,冬季深居少动。",
    distribution: "分布于中国、日本、朝鲜半岛及俄罗斯远东各水系。",
  },
  {
    rank: "order",
    latin: "Gadiformes",
    chinese: "鳕形目",
    parent: "Actinopterygii",
    description:
      "鳕形目多为冷水性海洋鱼类,鳍无硬棘,腹鳍喉位,包括鳕、狭鳕与无须鳕等,集群分布于大陆架与陆坡,是全球最重要的底层渔业资源类群。",
  },
  {
    rank: "family",
    latin: "Gadidae",
    chinese: "鳕科",
    parent: "Gadiformes",
    description:
      "鳕科通常具三个背鳍与两个臀鳍,颏部具一枚短须,广布北半球冷海,是北大西洋渔业史上最著名的科,鳕鱼干与肝油影响数百年经济史。",
  },
  {
    rank: "genus",
    latin: "Gadus",
    chinese: "鳕属",
    parent: "Gadidae",
    description:
      "鳕属包括大西洋鳕、太平洋鳕与格陵兰鳕,聚群底栖,历史上长期是人类最重要的海洋蛋白质来源之一。",
  },
  {
    rank: "species",
    latin: "Gadus morhua",
    chinese: "大西洋鳕",
    authority: "Linnaeus, 1758",
    parent: "Gadus",
    description:
      "大西洋鳕是渔业史上最传奇的鱼类,曾支撑纽芬兰大渔场数百年繁荣,二十世纪末因过度捕捞致使种群崩溃、渔场永久关闭,成为全球渔业管理的警世案例。林奈 1758 年即为其命名,鳕鱼干与鱼肝油产业影响深远。",
    morphology: "体延长,具三背鳍两臀鳍,颏部具一短须,体背棕灰色具斑点,侧线明显,可达 1.5 米。",
    habitat: "栖息于大陆架冷水域底层与中层,随年龄增长向深水迁移,聚群洄游。",
    distribution: "分布于北大西洋,自北美近海至北欧巴伦支海与波罗的海。",
    conservation: "VU",
    tags: ["渔业传奇"],
  },
  {
    rank: "order",
    latin: "Salmoniformes",
    chinese: "鲑形目",
    parent: "Actinopterygii",
    description:
      "鲑形目为北半球冷水性鱼类,脂鳍发达,包括鲑、鳟与白鲑等,多具溯河降海洄游习性,是冷水养殖与游钓产业的核心类群,群体导航机制研究经典。",
  },
  {
    rank: "family",
    latin: "Salmonidae",
    chinese: "鲑科",
    parent: "Salmoniformes",
    description:
      "鲑科具脂鳍,侧线完全,幼鱼多具竖斑,广泛分布于北温带冷水系,溯河产卵洄游壮观,经济与生态价值极高。",
  },
  {
    rank: "genus",
    latin: "Oncorhynchus",
    chinese: "太平洋鲑属",
    parent: "Salmonidae",
    description:
      "太平洋鲑属即大马哈鱼属,分布于环太平洋,繁殖期雄鱼吻端钩曲变形,溯河产卵后多即死亡,包括虹鳟与五种太平洋鲑。",
  },
  {
    rank: "species",
    latin: "Oncorhynchus mykiss",
    chinese: "虹鳟",
    authority: "(Walbaum, 1792)",
    parent: "Oncorhynchus",
    description:
      "虹鳟原产北美太平洋沿岸,是冷水养殖的支柱鱼类,因体侧虹彩纵带与强适应力而传播全球。驯化品系繁多,金鳟与陆封型三文鳟等养殖广泛,亦是水产营养与遗传研究的常用鱼类。",
    morphology: "体纺锤形,侧线中带具紫虹彩,背部蓝绿散布黑斑,具脂鳍,一般 30-60 厘米。",
    habitat: "栖息于清澈低温的河流、湖泊与近海,适温约 10-18 摄氏度。",
    distribution: "原产北美落基山脉至太平洋沿岸水域,已养殖引种至全球各洲。",
    conservation: "LC",
  },
  {
    rank: "genus",
    latin: "Salmo",
    chinese: "鲑属",
    parent: "Salmonidae",
    description:
      "鲑属即大西洋鲑属,分布于环北大西洋水系,包括大西洋鲑与多种鳟,具溯河洄游种群与陆封种群分化现象。",
  },
  {
    rank: "species",
    latin: "Salmo salar",
    chinese: "大西洋鲑",
    authority: "Linnaeus, 1758",
    parent: "Salmo",
    description:
      "大西洋鲑是著名的溯河洄游鱼类,幼鱼在淡水中生活一至数年后降海生长,性成熟后凭嗅觉记忆回到出生河流产卵。野生种群受过度捕捞与养殖逃逸影响承压,养殖业已使其成为最常见的食用鲑鱼。",
    morphology: "体纺锤形,海中银白具 X 形黑斑,繁殖期雄鱼下颌上翘成钩,具脂鳍,可达 1.5 米。",
    habitat: "幼鱼栖息于清澈淡水溪流,成鱼生活于北大西洋,产卵时返回出生河流。",
    distribution: "环北大西洋分布于欧洲与北美东岸,养殖以挪威与智利为主。",
    conservation: "LC",
  },
  {
    rank: "order",
    latin: "Perciformes",
    chinese: "鲈形目",
    parent: "Actinopterygii",
    description:
      "鲈形目是脊椎动物最大的目,背鳍常具鳍棘,多为海洋鱼类,涵盖鲈、石首鱼、慈鲷与雀鲷等上万种,辐射演化极为成功,养殖与观赏种类众多。",
  },
  {
    rank: "family",
    latin: "Sciaenidae",
    chinese: "石首鱼科",
    parent: "Perciformes",
    description:
      "石首鱼科以鳔与肌肉摩擦发声著称,耳石发达,颌齿细小,多为沿岸底栖经济鱼类,包括大黄鱼、小黄鱼与美国红鱼,集群生殖时鸣声如雷。",
  },
  {
    rank: "genus",
    latin: "Larimichthys",
    chinese: "黄鱼属",
    parent: "Sciaenidae",
    description:
      "黄鱼属为中国近海特有,体金黄,鳔发声,包括大黄鱼与小黄鱼,曾是东海与南海最重要传统渔获,现资源严重衰退。",
  },
  {
    rank: "species",
    latin: "Larimichthys crocea",
    chinese: "大黄鱼",
    authority: "(Richardson, 1846)",
    parent: "Larimichthys",
    description:
      "大黄鱼曾居中国海洋四大渔产之首,因敲罟作业与连年滥捕,上世纪七十年代野生资源几近崩溃。人工繁育技术突破后,如今养殖年产量居海水鱼之首,被誉为中国海水鱼养殖的旗舰奇迹,野生种群仍极度濒危。",
    morphology: "体延长侧扁,背侧灰黄,腹部金黄,尾柄细,鳔侧分支,耳石大,一般 40-50 厘米。",
    habitat: "栖息于近海 60 米以浅的泥沙底水域,生殖期集群发声,可听到鸣声。",
    distribution: "分布于中国黄海南部、东海与南海,以舟山渔场历史最著名。",
    conservation: "CR",
    tags: ["flagship", "渔业传奇"],
  },
  {
    rank: "order",
    latin: "Pleuronectiformes",
    chinese: "鲽形目",
    parent: "Actinopterygii",
    description:
      "鲽形目即比目鱼类,幼鱼起初对称浮游,变态后双眼移至同一侧而侧卧海底,不对称发育是脊椎动物发育生物学的经典课题,包括鲆、鲽、鳎与舌鳎。",
  },
  {
    rank: "family",
    latin: "Paralichthyidae",
    chinese: "牙鲆科",
    parent: "Pleuronectiformes",
    description:
      "牙鲆科两眼位于体左侧,偶鳍条多不分枝,无眼侧白色,是东亚与美洲近海重要鲆类,养殖与渔业并举,伏沙底栖肉食。",
  },
  {
    rank: "genus",
    latin: "Paralichthys",
    chinese: "牙鲆属",
    parent: "Paralichthyidae",
    description:
      "牙鲆属体长卵圆形,口大齿利,底栖伏击小鱼虾,是东亚沿海最重要的鲆科经济鱼类属,养殖技术成熟。",
  },
  {
    rank: "species",
    latin: "Paralichthys olivaceus",
    chinese: "褐牙鲆",
    authority: "(Temminck & Schlegel, 1846)",
    parent: "Paralichthys",
    description:
      "褐牙鲆是中国北方最重要的海水养殖鱼类之一,苗种繁育与工厂化循环水养殖技术成熟。幼鱼起初对称浮游,变态后右眼越过头顶移至左侧,侧卧沙底捕食小鱼虾,其不对称变态发育是重要的研究模型。",
    morphology: "体长卵圆形,两眼位于左侧,有眼侧褐色具暗斑,无眼侧白色,鳞小,可达 80 厘米。",
    habitat: "栖息于沙泥底质近海,幼鱼浮游,变态后底栖,常潜沙伏击。",
    distribution: "分布于中国渤海、黄海、东海及日本、朝鲜半岛近海。",
  },
  {
    rank: "order",
    latin: "Tetraodontiformes",
    chinese: "鲀形目",
    parent: "Actinopterygii",
    description:
      "鲀形目鱼体多短圆或侧扁,齿愈合成喙状齿板,包括河鲀、翻车鲀与箱鲀等,多含河鲀毒素或具棘刺,御敌机制与体型极为多样。",
  },
  {
    rank: "family",
    latin: "Tetraodontidae",
    chinese: "鲀科",
    parent: "Tetraodontiformes",
    description:
      "鲀科遇险可吞水鼓胀成球,肝脏与卵巢富集河鲀毒素,基因组极为紧凑,东方鲀属曾是首批全基因组测序的鱼类之一。",
  },
  {
    rank: "genus",
    latin: "Takifugu",
    chinese: "东方鲀属",
    parent: "Tetraodontidae",
    description:
      "东方鲀属分布于西北太平洋,体可膨大,皮肤与内脏多含剧毒,是东亚河豚饮食文化的核心,养殖控毒研究持续至今。",
  },
  {
    rank: "species",
    latin: "Takifugu rubripes",
    chinese: "红鳍东方鲀",
    authority: "(Temminck & Schlegel, 1850)",
    parent: "Takifugu",
    description:
      "红鳍东方鲀是最著名的食用河豚,剧毒集中于肝脏与卵巢,毒素为神经毒河鲀毒素,微量即可致命。其基因组仅约数亿碱基对且内含子极短,曾为首批完成全基因组测序的鱼类,是基因组紧凑性的经典研究对象。",
    morphology: "体亚圆筒形,遇险吞水鼓胀成球,背面暗褐具白缘斑点,臀鳍白色,胸鳍橙红色。",
    habitat: "栖息于近海与河口咸淡水,常潜伏于沙底,春季进入河口繁殖。",
    distribution: "分布于日本海、渤海、黄海与东海,朝鲜半岛近海亦有分布。",
    tags: ["剧毒"],
  },
  {
    rank: "order",
    latin: "Syngnathiformes",
    chinese: "海龙目",
    parent: "Actinopterygii",
    description:
      "海龙目吻部延伸成管,体多被骨板环,包括海马、海龙与管口鱼等,雄鱼具育儿袋或携卵孵化行为,雄性怀孕现象在动物界极为独特。",
  },
  {
    rank: "family",
    latin: "Syngnathidae",
    chinese: "海龙科",
    parent: "Syngnathiformes",
    description:
      "海龙科雄鱼腹部具育儿袋,雌鱼将卵产于其中由雄鱼孵化并提供营养,鳔与体骨结构特殊,全部物种均列入 CITES 附录,受贸易威胁显著。",
  },
  {
    rank: "genus",
    latin: "Hippocampus",
    chinese: "海马属",
    parent: "Syngnathidae",
    description:
      "海马属头似马形,尾可卷缠固着,直立游泳,雄鱼育儿袋孵卵,全世界四十余种,均受贸易管制与栖息地退化威胁。",
  },
  {
    rank: "species",
    latin: "Hippocampus japonicus",
    chinese: "日本海马",
    authority: "Kaup, 1856",
    parent: "Hippocampus",
    description:
      "日本海马是西北太平洋最常见的海马之一,体小而体色多变,常以卷尾附于海草与马尾藻间。传统中医药将其列为药材,长期采捕使海马类资源普遍衰退,人工繁育与栖息保护研究正在推进。",
    morphology: "体直立被骨环,吻管状,尾细长可卷曲,体色黄褐多变,一般仅 4-8 厘米。",
    habitat: "栖息于近岸海草床、藻场与珊瑚礁,以尾卷附于固着物上,捕食浮游小甲壳类。",
    distribution: "分布于中国沿海、日本及朝鲜半岛近岸浅水。",
  },
  {
    rank: "order",
    latin: "Anguilliformes",
    chinese: "鳗鲡目",
    parent: "Actinopterygii",
    description:
      "鳗鲡目体细长如带,无腹鳍,鳞片退化埋于皮下,包括鳗鲡、海鳗与康吉鳗,其柳叶状幼体随洋流漂散,生活史长期是生物学谜团。",
  },
  {
    rank: "family",
    latin: "Anguillidae",
    chinese: "鳗鲡科",
    parent: "Anguilliformes",
    description:
      "鳗鲡科为降海产卵的淡水鳗类,产卵场位于深海,玻璃鳗溯河生长,生活史数百年成谜,是全球水产养殖与物种保护的双重难题。",
  },
  {
    rank: "genus",
    latin: "Anguilla",
    chinese: "鳗鲡属",
    parent: "Anguillidae",
    description:
      "鳗鲡属现存十余种,降海洄游产卵,玻璃鳗苗逆流而上,因苗种无法人工量产,自然资源因过度捕捞与筑坝严重衰退。",
  },
  {
    rank: "species",
    latin: "Anguilla japonica",
    chinese: "日本鳗鲡",
    authority: "Temminck & Schlegel, 1846",
    parent: "Anguilla",
    description:
      "日本鳗鲡在河湖中生长、性成熟后降海洄游至西太平洋马里亚纳群岛附近深水产卵,其产卵场直到近年才被精准定位。人工育苗至今未能规模化,玻璃鳗苗价格飙升,资源急剧衰退,列为濒危物种。",
    morphology: "体蛇形细长,黏滑无可见鳞,背鳍与臀鳍长并与尾鳍相连,背暗绿褐、腹银白,可达 1 米余。",
    habitat: "栖息于江河湖泊静水底层,昼伏夜出,性成熟后降海作数千公里洄游。",
    distribution: "分布于中国、日本、朝鲜半岛的江河,产卵于西太平洋马里亚纳海域。",
    conservation: "EN",
  },
  {
    rank: "order",
    latin: "Acipenseriformes",
    chinese: "鲟形目",
    parent: "Actinopterygii",
    description:
      "鲟形目为古老软骨硬鳞鱼类,体被五行骨板,吻长口下位,起源可追溯至两亿年前,鲟鱼子酱取自其卵,所有物种均列入 CITES 附录。",
  },
  {
    rank: "family",
    latin: "Acipenseridae",
    chinese: "鲟科",
    parent: "Acipenseriformes",
    description:
      "鲟科为北半球大河与近海的洄游巨型鱼类,寿命长、性成熟迟,在筑坝、截流与捕捞多重压力下多数濒危,是河谷生态保护的旗舰类群。",
  },
  {
    rank: "genus",
    latin: "Acipenser",
    chinese: "鲟属",
    parent: "Acipenseridae",
    description:
      "鲟属包括中华鲟、达氏鲟与俄罗斯鲟等,吻下位触须发达,洄游于大河与海洋之间,多数物种处于受威胁状态。",
  },
  {
    rank: "species",
    latin: "Acipenser sinensis",
    chinese: "中华鲟",
    authority: "Gray, 1834",
    parent: "Acipenser",
    description:
      "中华鲟是长江最大的鱼类,被称为长江鱼王,生于长江、育于大海,性成熟后溯河千里回归出生地产卵。大坝截断洄游通道后自然繁殖严重受阻,人工增殖放流持续数十年,是极危的国家一级保护动物。",
    morphology: "体梭形,具五行菱形骨板,吻尖长,口下位须短,背青灰腹白,可达 4 米、重数百千克。",
    habitat: "成鱼栖息于近海大陆架,性成熟后进入长江作生殖洄游。",
    distribution: "分布于中国长江水系及东海、南海近海,历史上黄河珠江亦有记录。",
    conservation: "CR",
    tags: ["flagship", "活化石"],
  },
  {
    rank: "order",
    latin: "Cyprinodontiformes",
    chinese: "鳉形目",
    parent: "Actinopterygii",
    description:
      "鳉形目为小型口端位鱼类,多生活于暖水,包括卵生鳉与卵胎生花鳉类,孔雀鱼、食蚊鱼等随人为扩散遍布全球,是进化与行为研究的经典类群。",
  },
  {
    rank: "family",
    latin: "Poeciliidae",
    chinese: "花鳉科",
    parent: "Cyprinodontiformes",
    description:
      "花鳉科雄鱼臀鳍特化为交合肢,体内受精卵胎生,适应多变暖水环境,包括孔雀鱼、食蚊鱼与月光鱼,被广泛用于遗传与性选择实验。",
  },
  {
    rank: "genus",
    latin: "Poecilia",
    chinese: "花鳉属",
    parent: "Poeciliidae",
    description:
      "花鳉属分布于中南美洲暖水,卵胎生,雄鱼体色华丽变异极大,孔雀鱼即其驯化与自然选择的著名代表。",
  },
  {
    rank: "species",
    latin: "Poecilia reticulata",
    chinese: "孔雀鱼",
    authority: "Peters, 1859",
    parent: "Poecilia",
    description:
      "孔雀鱼是世界上最普及的观赏鱼之一,雄鱼色彩斑斓、尾型千变万化,世代短、繁殖快。自二十世纪初以来被持续用于遗传、性选择与野外适应实验,是生态遗传学与进化生物学的经典模式鱼类。",
    morphology: "雄鱼仅数厘米,体色尾型变异极多;雌鱼较大,体灰黄朴素,卵胎生,臀鳍雄鱼特化成交合肢。",
    habitat: "喜暖水沟渠、溪流与池塘,耐污性强,适温约 22-28 摄氏度。",
    distribution: "原产南美洲北部与加勒比地区,已归化于全球热带亚热带水域。",
    conservation: "LC",
    tags: ["flagship", "观赏", "模式生物"],
  },
  {
    rank: "order",
    latin: "Coelacanthiformes",
    chinese: "腔棘鱼目",
    parent: "Sarcopterygii",
    description:
      "腔棘鱼目曾被认为于白垩纪末与恐龙一同灭绝,1938 年南非海域捕获活体震动学界,成为活化石的代名词,叶状偶鳍与铰接颅骨延续数亿年形态。",
  },
  {
    rank: "family",
    latin: "Latimeriidae",
    chinese: "矛尾鱼科",
    parent: "Coelacanthiformes",
    description:
      "矛尾鱼科现仅存一属一种,具叶状偶鳍、颅内铰关节与脂肪质鳔,是肉鳍鱼类现生代表,种群稀少而珍贵。",
  },
  {
    rank: "genus",
    latin: "Latimeria",
    chinese: "矛尾鱼属",
    parent: "Latimeriidae",
    description:
      "矛尾鱼属以南非博物馆员拉蒂默命名,昼伏夜出于深礁洞穴,卵胎生,寿命可逾半世纪,现存两种分踞印度洋两岸。",
  },
  {
    rank: "species",
    latin: "Latimeria chalumnae",
    chinese: "矛尾鱼",
    authority: "Smith, 1939",
    parent: "Latimeria",
    description:
      "1938 年南非渔港捕获的活体腔棘鱼震惊世界,这一被认为灭绝六千五百万年的孑遗类群得以重见天日。矛尾鱼具叶状偶鳍与铰接颅骨,是四足动物远亲的活体档案,现存种群估计仅数百尾,列极危。",
    morphology: "体呈钢蓝色具白斑,可达 2 米,偶鳍肉叶状具骨轴,尾鳍三叶如矛,鳔内充脂肪。",
    habitat: "栖息于印度洋深水礁坡洞穴,昼伏洞中夜出巡游捕食鱼类与乌贼。",
    distribution: "分布于科摩罗群岛及南非、肯尼亚、坦桑尼亚近海。",
    conservation: "CR",
    tags: ["flagship", "活化石"],
  },

  // ===================== 两栖纲 Amphibia =====================
  {
    rank: "class",
    latin: "Amphibia",
    chinese: "两栖纲",
    parent: "Vertebrata",
    description:
      "两栖纲幼体水生以鳃呼吸,成体多陆栖以肺呼吸、皮肤辅助,皮肤裸露湿润,现存约八千六百余种。作为四足动物登陆的第一步,其透皮呼吸对环境变化极敏感,被视为生态健康的指示类群。",
  },
  {
    rank: "order",
    latin: "Caudata",
    chinese: "有尾目",
    parent: "Amphibia",
    description:
      "有尾目即蝾螈类,体长尾存、四肢短小,终生水栖或成体陆栖,变态不明显,以其卓越的断肢再生能力闻名于再生生物学。",
  },
  {
    rank: "family",
    latin: "Cryptobranchidae",
    chinese: "隐鳃鲵科",
    parent: "Caudata",
    description:
      "隐鳃鲵科为现存最大的两栖动物类群,终生水栖,头宽扁,体侧肤褶密集血管辅助呼吸,含亚洲大鲵与美洲隐鳃鲵两支孑遗。",
  },
  {
    rank: "genus",
    latin: "Andrias",
    chinese: "大鲵属",
    parent: "Cryptobranchidae",
    description:
      "大鲵属为巨型古老蝾螈,寿命可逾半百,鸣声似婴啼故俗称娃娃鱼,现存三种,分布于东亚山溪与北美。",
  },
  {
    rank: "species",
    latin: "Andrias davidianus",
    chinese: "大鲵",
    authority: "(Blanchard, 1871)",
    parent: "Andrias",
    description:
      "大鲵是现存最大的两栖动物,体长可逾 1.5 米,夜行于湍急山溪,鸣声似婴啼而得娃娃鱼之名。栖息地退化与盗捕使其野生种群锐减,人工养殖规模庞大却加剧了遗传资源混杂,列极危,为国家二级保护动物。",
    morphology: "体扁长,头宽圆,眼小无眼睑,体侧具纵行肤褶,皮肤光滑黏润,黑褐斑杂,可达 1.5 米以上。",
    habitat: "栖息于山区清澈湍急的溪流,白日藏于石穴,夜间守候捕食。",
    distribution: "特产于中国长江、黄河、珠江中上游山溪,增殖放流已扩散多地。",
    conservation: "CR",
    tags: ["flagship"],
  },
  {
    rank: "family",
    latin: "Salamandridae",
    chinese: "蝾螈科",
    parent: "Caudata",
    description:
      "蝾螈科皮肤毒腺发达,腹面警戒色鲜艳,陆栖种类繁殖期返回水中,包括蝾螈、瘰螈与疣螈等,欧亚与北美广布。",
  },
  {
    rank: "genus",
    latin: "Cynops",
    chinese: "东方蝾螈属",
    parent: "Salamandridae",
    description:
      "东方蝾螈属体小,背黑腹赤橙具黑斑,皮肤分泌河鲀毒素类物质,栖息于东亚静水,是实验动物学常用材料。",
  },
  {
    rank: "species",
    latin: "Cynops orientalis",
    chinese: "东方蝾螈",
    authority: "(David, 1875)",
    parent: "Cynops",
    description:
      "东方蝾螈是中国最常见的蝾螈,背部黑褐、腹面橘红斑驳为其警戒色。皮肤含河鲀毒素类神经毒,长期作为两栖胚胎学与再生研究材料,断肢可再生完整结构,是发育与再生生物学的经典模式动物。",
    morphology: "体小,约 7-9 厘米,背黑褐,腹橘红具不规则黑斑,尾侧扁,皮肤具粒状腺体。",
    habitat: "栖息于山地静水塘、水田与缓流溪沟,游动缓慢,水草间觅食。",
    distribution: "特产于中国华东与华中低山丘陵水域。",
    conservation: "LC",
    tags: ["模式生物"],
  },
  {
    rank: "order",
    latin: "Anura",
    chinese: "无尾目",
    parent: "Amphibia",
    description:
      "无尾目即蛙与蟾蜍,成体无尾、后肢发达善跳跃,鸣声求偶,蝌蚪变态发育,约七千五百种,是两栖纲最大目,昼伏或夜行皆有。",
  },
  {
    rank: "family",
    latin: "Bufonidae",
    chinese: "蟾蜍科",
    parent: "Anura",
    description:
      "蟾蜍科皮肤干燥多疣,耳后毒腺分泌白色毒浆,行走多于跳跃,广布各大洲,蟾酥与蟾皮为传统药材。",
  },
  {
    rank: "genus",
    latin: "Bufo",
    chinese: "蟾蜍属",
    parent: "Bufonidae",
    description:
      "蟾蜍属即典型蟾蜍,耳后腺发达,适应干旱与城市环境,广布欧亚与美洲,中华蟾蜍为其东亚代表。",
  },
  {
    rank: "species",
    latin: "Bufo gargarizans",
    chinese: "中华蟾蜍",
    authority: "Cantor, 1842",
    parent: "Bufo",
    description:
      "中华蟾蜍即俗称的癞蛤蟆,背部疣粒与耳后腺分泌毒浆御敌,蟾酥为传统名贵药材。适应力极强,遍布中国南北,冬眠后春夜集群于水塘暴发式繁殖,鸣声低沉,其胚胎是发育生物学的传统材料。",
    morphology: "体粗短,皮肤极粗糙,背疣显著,耳后腺长椭圆形隆起,体色黄褐变异大,一般 6-10 厘米。",
    habitat: "栖息于田边、宅院、沟渠等多样的环境中,昼匿夜出,繁殖期聚于静水。",
    distribution: "除青藏高原与极干旱区外广布中国,朝鲜半岛与俄罗斯远东亦有。",
    conservation: "LC",
  },
  {
    rank: "family",
    latin: "Ranidae",
    chinese: "蛙科",
    parent: "Anura",
    description:
      "蛙科即典型青蛙,体健善跳善泳,舌尖分叉可外翻捕虫,广布全球温热带,是农田害虫的天敌与生态卫士。",
  },
  {
    rank: "genus",
    latin: "Pelophylax",
    chinese: "侧褶蛙属",
    parent: "Ranidae",
    description:
      "侧褶蛙属背侧褶发达,常呈绿色型,广布欧洲与东亚,部分种间存在复杂的杂交遗传系统,是研究物种形成的模型。",
  },
  {
    rank: "species",
    latin: "Pelophylax nigromaculatus",
    chinese: "黑斑侧褶蛙",
    authority: "(Hallowell, 1861)",
    parent: "Pelophylax",
    description:
      "黑斑侧褶蛙即传统语境中的青蛙,曾遍及中国稻田与池塘,夏夜鸣声成片。农业集约化、农药使用与捕获食用使其种群显著下降,是中国最早被公众认知的两栖受胁物种之一。",
    morphology: "体健壮,背侧褶明显,背绿褐散布黑斑,腹面白色,雄蛙具声囊与婚垫,一般 5-9 厘米。",
    habitat: "栖息于稻田、池塘、沟渠与河湾,善跳善泳,冬季于泥穴冬眠。",
    distribution: "广布于中国东部平原至朝鲜半岛、日本与俄罗斯远东。",
    conservation: "LC",
  },
  {
    rank: "genus",
    latin: "Rana",
    chinese: "蛙属",
    parent: "Ranidae",
    description:
      "蛙属为典型的褐色林蛙类群,栖于山地森林,秋季集群潜入河底越冬,其输卵管干制品称雪蛤,经济利用历史久远。",
  },
  {
    rank: "species",
    latin: "Rana chensinensis",
    chinese: "中国林蛙",
    authority: "David, 1875",
    parent: "Rana",
    description:
      "中国林蛙即哈士蟆的原动物,秋季集群潜入河底泥穴越冬,春季上岸繁殖。输卵管干制品雪蛤为传统滋补食材,长期高强度捕捞对种群形成压力,养殖与保护并行发展。",
    morphology: "体背褐色具深色斑,鼓膜显著,后肢修长善跳,一般 4-6 厘米,雄蛙略小。",
    habitat: "生活于山地森林与草甸,繁殖期聚集于静水塘,冬季入河底泥中越冬。",
    distribution: "分布于中国东北、华北山地及朝鲜半岛与俄罗斯远东。",
  },
  {
    rank: "family",
    latin: "Rhacophoridae",
    chinese: "树蛙科",
    parent: "Anura",
    description:
      "树蛙科指端膨大具吸盘,树栖繁殖时于枝叶间搅出泡沫卵巢,分布于亚洲与非洲热带亚热带,包括著名的飞蛙类。",
  },
  {
    rank: "genus",
    latin: "Rhacophorus",
    chinese: "树蛙属",
    parent: "Rhacophoridae",
    description:
      "树蛙属即飞蛙类,指趾间蹼发达,高空跃下时可展蹼滑翔减速,繁殖期雌雄合力打出泡沫卵巢悬于枝上。",
  },
  {
    rank: "species",
    latin: "Rhacophorus dennysi",
    chinese: "大树蛙",
    authority: "Blanchard, 1877",
    parent: "Rhacophorus",
    description:
      "大树蛙是中国最大的树蛙,指端吸盘发达,可攀上高树,受惊跃下时四肢展开、发达蹼膜助其在空中滑翔降落。繁殖期雌雄抱对在垂水枝上搅出泡沫巢,卵在其中发育,雨季蝌蚪坠水。",
    morphology: "体大而扁,可达 10 厘米余,背面绿色缀黑斑,指端大吸盘,指趾间蹼膜发达。",
    habitat: "栖息于丘陵山区溪流两岸的高大乔木与灌丛,雨夜活跃。",
    distribution: "分布于中国华南、华中、西南及越南北部。",
  },

  // ===================== 爬行纲 Reptilia =====================
  {
    rank: "class",
    latin: "Reptilia",
    chinese: "爬行纲",
    parent: "Vertebrata",
    description:
      "爬行纲为具羊膜卵的陆生脊椎动物,皮肤覆角质鳞而干燥,以肺呼吸,变温,包括龟鳖、有鳞、鳄与喙头类,现存约一万二千种,恐龙与其翼龙近亲为其史前巨支。",
  },
  {
    rank: "order",
    latin: "Testudines",
    chinese: "龟鳖目",
    parent: "Reptilia",
    description:
      "龟鳖目以甲壳护体,肋骨与脊椎愈合成背甲,无齿而以角质喙切食,生活于海洋、淡水与陆地,寿命普遍极长,是形态最独特的爬行动物目。",
  },
  {
    rank: "family",
    latin: "Cheloniidae",
    chinese: "海龟科",
    parent: "Testudines",
    description:
      "海龟科为温热带大洋性海龟,四肢桨状,肺呼吸却可长时间潜水,雌龟千里洄游回出生海滩产卵,全部物种均列入受胁等级。",
  },
  {
    rank: "genus",
    latin: "Chelonia",
    chinese: "海龟属",
    parent: "Cheloniidae",
    description:
      "海龟属现仅绿海龟一种,以海草与海藻为主食,体脂肪因叶绿素积累呈绿色而得名,产卵集群于热带沙滩。",
  },
  {
    rank: "species",
    latin: "Chelonia mydas",
    chinese: "绿海龟",
    authority: "(Linnaeus, 1758)",
    parent: "Chelonia",
    description:
      "绿海龟是分布最广的大型海龟,成龟以海草与海藻为食,脂肪色绿而得名。雌龟跨越数千公里洄游回出生沙滩产卵,沙滩温度决定孵化后代性别,受海岸开发、盗采龟卵与塑料污染持续威胁。",
    morphology: "背甲心形,长可达 1 米余,红棕或暗绿具放射纹,四肢桨状各一爪,头圆鳞大。",
    habitat: "栖息于热带亚热带近海海草床与珊瑚礁,产卵时上岸于沙滩掘穴。",
    distribution: "广布于全球热带与亚热带海洋,中国南海诸岛有重要产卵场。",
    conservation: "EN",
  },
  {
    rank: "genus",
    latin: "Eretmochelys",
    chinese: "玳瑁属",
    parent: "Cheloniidae",
    description:
      "玳瑁属喙尖如鹰嘴,背甲盾片层叠如覆瓦,以海绵为主的礁区特化食性,龟甲贸易曾使其濒临绝境。",
  },
  {
    rank: "species",
    latin: "Eretmochelys imbricata",
    chinese: "玳瑁",
    authority: "(Linnaeus, 1766)",
    parent: "Eretmochelys",
    description:
      "玳瑁喙尖如鹰、背甲橙黄斑澜,古称文甲,龟甲制品贸易使其被猎捕千年,现已全面禁止国际贸易。其盾片覆瓦层叠、食剧毒海绵而肉常带毒,是珊瑚礁生态的特化成员,延续极危状态。",
    morphology: "背甲心形,盾片覆瓦状排列,黄褐具黑褐云斑,喙尖长钩曲,体长约 60-90 厘米。",
    habitat: "栖息于热带珊瑚礁与岩礁区,觅食海绵等固着动物。",
    distribution: "广布于全球热带海洋,中国南海有分布与产卵记录。",
    conservation: "CR",
  },
  {
    rank: "family",
    latin: "Trionychidae",
    chinese: "鳖科",
    parent: "Testudines",
    description:
      "鳖科体被革质皮肤而无角质盾片,吻长鼻孔位于吻端,伏击性底栖,广布温带与热带淡水,中华鳖为其东亚代表。",
  },
  {
    rank: "genus",
    latin: "Pelodiscus",
    chinese: "鳖属",
    parent: "Trionychidae",
    description:
      "鳖属即中华鳖所在,颈可缩入甲缘内侧,凶猛贪食,广布东亚淡水,是最重要的养殖龟鳖类群。",
  },
  {
    rank: "species",
    latin: "Pelodiscus sinensis",
    chinese: "中华鳖",
    authority: "(Wiegmann, 1835)",
    parent: "Pelodiscus",
    description:
      "中华鳖俗称甲鱼、团鱼,是中国最重要的养殖龟鳖,千年来鳖裙被视为滋补珍馐。野生资源因捕捞持续衰退,养殖年产量巨大,分类学研究还发现其种下隐存多样性与外来引入种混杂。",
    morphology: "体椭圆扁平,革质背甲具疣粒,缘裙柔软,吻长鼻管状,颈长可缩,体暗橄榄绿。",
    habitat: "栖息于泥沙底河流、湖泊与池塘,常浮出呼吸,晒背于岸石。",
    distribution: "分布于中国南北各地及朝鲜半岛、日本、越南北部。",
    conservation: "VU",
  },
  {
    rank: "family",
    latin: "Geoemydidae",
    chinese: "地龟科",
    parent: "Testudines",
    description:
      "地龟科为淡水与半水栖龟类最大科,壳形与颈缩机制多样,闭壳龟腹甲可铰合关闭如盒,亚洲是其多样性中心,多数物种受贸易威胁。",
  },
  {
    rank: "genus",
    latin: "Cuora",
    chinese: "闭壳龟属",
    parent: "Geoemydidae",
    description:
      "闭壳龟属腹甲前后以韧带与背甲相连,遇敌可将甲壳完全闭合成盒,故俗称金钱龟等名品,市场价格极高。",
  },
  {
    rank: "species",
    latin: "Cuora trifasciata",
    chinese: "三线闭壳龟",
    authority: "(Bell, 1825)",
    parent: "Cuora",
    description:
      "三线闭壳龟俗称金钱龟,背甲三条黑线与可完全闭合的腹甲使其在宠物与传统医药市场被炒至天价。野生种群经数十年扫荡性采集几近枯竭,人工繁育种群庞大,列极危,为国家二级保护动物。",
    morphology: "背甲棕褐具三条黑色纵棱线,腹甲前后以韧带相连可完全闭合,头金色,枕部具黑纹。",
    habitat: "栖息于山区溪流附近的林地,半水栖,杂食性,昼伏夜出。",
    distribution: "特产于中国华南的广东、广西、海南及越南北部山地。",
    conservation: "CR",
  },
  {
    rank: "order",
    latin: "Squamata",
    chinese: "有鳞目",
    parent: "Reptilia",
    description:
      "有鳞目包括蜥蜴与蛇,体覆重叠角质鳞,下颌两半以弹性韧带相连、蛇类更可大幅张开,现存逾一万一千种,为爬行纲最大目。",
  },
  {
    rank: "family",
    latin: "Pythonidae",
    chinese: "蟒科",
    parent: "Squamata",
    description:
      "蟒科为大型无毒蛇,以缠绕绞杀猎物,唇鳞窝感知红外热源,卵生,雌蟒盘绕孵卵并借肌肉颤动增温,广布旧大陆热带。",
  },
  {
    rank: "genus",
    latin: "Python",
    chinese: "蟒属",
    parent: "Pythonidae",
    description:
      "蟒属为旧大陆巨型蛇类,肛门两侧具后肢残余爪状结构,栖息热带森林与灌丛,缅甸蟒为其东亚东南亚代表。",
  },
  {
    rank: "species",
    latin: "Python bivittatus",
    chinese: "缅甸蟒",
    authority: "Kuhl, 1820",
    parent: "Python",
    description:
      "缅甸蟒是世界最长蛇类之一,绞杀鹿与猪等大型猎物,唇窝红外感知使其在黑暗中锁定温血动物。入侵美国佛罗里达大沼泽后种群爆发并改变食物网,成为研究爬行动物生理可塑性的著名案例。",
    morphology: "体粗长,可达 5 米以上,背部黄褐具鞍形黑斑延至尾部,肛侧具爪状后肢残迹。",
    habitat: "栖息于热带雨林、沼泽与岩坡,善攀爬善游泳,常近水域活动。",
    distribution: "分布于东南亚,中国云南、广西、海南南部亦有,已入侵美国佛州。",
    conservation: "VU",
  },
  {
    rank: "family",
    latin: "Elapidae",
    chinese: "眼镜蛇科",
    parent: "Squamata",
    description:
      "眼镜蛇科毒牙短而固定于颌骨前端,毒液以神经毒素为主,包括眼镜蛇、环蛇、海蛇与珊瑚蛇,广布各大洲温热带,部分种致死率高。",
  },
  {
    rank: "genus",
    latin: "Naja",
    chinese: "眼镜蛇属",
    parent: "Elapidae",
    description:
      "眼镜蛇属受威胁时立起前半身并膨扩颈部皮褶,部分种类能将毒液喷射入敌眼,广布非洲与亚洲。",
  },
  {
    rank: "species",
    latin: "Naja atra",
    chinese: "中华眼镜蛇",
    authority: "Cantor, 1842",
    parent: "Naja",
    description:
      "中华眼镜蛇俗称舟山眼镜蛇,受威胁时立起前半身、膨出颈褶,背面双斑如眼镜状纹。毒液以神经与细胞毒素为主,是华南蛇伤的主要肇事者之一,取毒制备抗蛇毒血清与镇痛研究历史悠久。",
    morphology: "体粗长 1-2 米,颈褶背面具白色双圈斑纹,背黑褐具黄白窄横纹,毒牙固定于前端。",
    habitat: "栖息于丘陵平原的农田、灌丛与鼠洞,昼活动,受扰即立身膨颈。",
    distribution: "分布于中国华南、华中、东南沿海及越南北部。",
    tags: ["剧毒"],
  },
  {
    rank: "genus",
    latin: "Bungarus",
    chinese: "环蛇属",
    parent: "Elapidae",
    description:
      "环蛇属体背黑环与白环相间,毒牙极短而毒性猛烈,性情温驯,夜行,卵生,广布南亚与东南亚。",
  },
  {
    rank: "species",
    latin: "Bungarus multicinctus",
    chinese: "银环蛇",
    authority: "Blyth, 1860",
    parent: "Bungarus",
    description:
      "银环蛇是中国陆生毒性最强的毒蛇,黑底白环,咬伤初期常无明显痛感而贻误救治,神经毒素可致呼吸肌麻痹。其银环蛇毒素是乙酰胆碱受体研究的经典工具分子,支撑了多项神经科学成果。",
    morphology: "体细长,黑环与白环相间、白环窄,头椭圆不显眼,毒牙短小,可达 1.5 米。",
    habitat: "夜行于平原丘陵近水域处,白日藏于石堆鼠穴,性情胆怯。",
    distribution: "分布于中国长江以南及台湾、海南,越南、老挝、缅甸北部亦有。",
    tags: ["剧毒"],
  },
  {
    rank: "family",
    latin: "Viperidae",
    chinese: "蝰科",
    parent: "Squamata",
    description:
      "蝰科毒牙长而可折叠收放,头部三角形,毒液以血循毒素为主,蝮亚科具颊窝红外感知器官,是毒蛇中种类最多分布最广的科。",
  },
  {
    rank: "genus",
    latin: "Gloydius",
    chinese: "蝮属",
    parent: "Viperidae",
    description:
      "蝮属具颊窝热感应,体粗尾短,卵胎生,是东亚与中亚分布最广的毒蛇属,蛇伤医学意义重大。",
  },
  {
    rank: "species",
    latin: "Gloydius brevicaudus",
    chinese: "短尾蝮",
    authority: "(Stejneger, 1907)",
    parent: "Gloydius",
    description:
      "短尾蝮是中国分布最广、致伤最多的毒蛇之一,体色如土,晨昏活动,颊窝感知恒温动物热源精准伏击。毒液以血循毒为主,抗蝮蛇毒血清救治大量患者,其毒素成分亦用于降压药研发。",
    morphology: "体粗短,尾短且突然变细,头三角形,背具深色横斑,体灰褐,一般 50-70 厘米。",
    habitat: "栖息于平原至低山的田野、坟地、沟边,伏击鼠类与蛙类。",
    distribution: "广布于中国除青藏高原外大部分省区,朝鲜半岛亦有。",
    tags: ["剧毒"],
  },
  {
    rank: "family",
    latin: "Gekkonidae",
    chinese: "壁虎科",
    parent: "Squamata",
    description:
      "壁虎科眼大而无活动眼睑,以舌舐目清洁,趾端微观刚毛阵列产生分子间作用力可攀竖直壁面,多能发声,断尾再生。",
  },
  {
    rank: "genus",
    latin: "Gekko",
    chinese: "壁虎属",
    parent: "Gekkonidae",
    description:
      "壁虎属趾垫发达攀爬力卓绝,常栖人类屋檐墙缝捕虫,鸣声显著,大壁虎即传统药材蛤蚧的原动物。",
  },
  {
    rank: "species",
    latin: "Gekko gecko",
    chinese: "大壁虎",
    authority: "(Linnaeus, 1758)",
    parent: "Gekko",
    description:
      "大壁虎即蛤蚧,鸣声似其名而得名,是最大型的壁虎之一,干制品为传统名贵药材。长期高强度捕捉使野生资源锐减,列易危,为国家二级保护动物,人工养殖历史悠久但规模有限。",
    morphology: "体大,可达 30 厘米余,背蓝灰缀橙黄斑点与蓝斑,指趾端膨大,尾可断再生。",
    habitat: "栖息于热带岩缝、树洞与建筑物壁面,夜行捕食昆虫与小动物。",
    distribution: "分布于中国华南、西南及东南亚至印度东北部。",
    conservation: "VU",
  },
  {
    rank: "order",
    latin: "Crocodylia",
    chinese: "鳄目",
    parent: "Reptilia",
    description:
      "鳄目为半水栖大型爬行动物,具四腔心脏与次生腭,筑巢护卵具社会行为,与恐龙及鸟同属主龙类,现存二十余种,分布于热带水域。",
  },
  {
    rank: "family",
    latin: "Alligatoridae",
    chinese: "短吻鳄科",
    parent: "Crocodylia",
    description:
      "短吻鳄科吻宽钝圆,下颌闭合时第四齿藏于上颌内侧,栖于淡水沼泽,包括短吻鳄与凯门鳄,耐凉性胜于真鳄。",
  },
  {
    rank: "genus",
    latin: "Alligator",
    chinese: "短吻鳄属",
    parent: "Alligatoridae",
    description:
      "短吻鳄属现存扬子鳄与密河鳄两种,分踞东亚与北美,是洲际间断分布的经典案例,均经历濒危后恢复。",
  },
  {
    rank: "species",
    latin: "Alligator sinensis",
    chinese: "扬子鳄",
    authority: "Fauvel, 1879",
    parent: "Alligator",
    description:
      "扬子鳄古称鼍,是与恐龙同时代的孑遗,曾广布长江中下游湿地,野生个体现仅约百余条,靠人工繁育与重引入维系,俗称猪婆龙,是中国湿地保护的旗舰物种,国家一级保护。",
    morphology: "体长 1.5-2 米,吻短钝,背具成行角质盾板,前肢五指后肢四趾,尾侧扁强壮有力。",
    habitat: "栖息于丘陵水塘、沼泽与竹林沟壑,掘洞穴居,冬季冬眠。",
    distribution: "野生种群残存于安徽长江南岸湿地,已重引入浙江、上海等地。",
    conservation: "CR",
    tags: ["flagship", "活化石"],
  },
  {
    rank: "order",
    latin: "Rhynchocephalia",
    chinese: "喙头目",
    parent: "Reptilia",
    description:
      "喙头目曾与恐龙时代同时繁盛,现仅楔齿蜥一种孑遗于新西兰,形似蜥蜴而颅骨与牙齿结构极为原始,被誉为活化石的教科书案例。",
  },
  {
    rank: "family",
    latin: "Sphenodontidae",
    chinese: "楔齿蜥科",
    parent: "Rhynchocephalia",
    description:
      "楔齿蜥科延续两亿年而形态几乎未变,颅顶具退化的感光顶眼,成体生长缓慢而寿命极长,仅存于新西兰岛屿。",
  },
  {
    rank: "genus",
    latin: "Sphenodon",
    chinese: "楔齿蜥属",
    parent: "Sphenodontidae",
    description:
      "楔齿蜥属单型孑遗,栖于海岛洞穴与灌丛,夜凉时活动觅食昆虫与鸟蛋,受岛屿入侵捕食者威胁沉重。",
  },
  {
    rank: "species",
    latin: "Sphenodon punctatus",
    chinese: "楔齿蜥",
    authority: "(Gray, 1842)",
    parent: "Sphenodon",
    description:
      "楔齿蜥是两亿年形态几无变化的孑遗爬行动物,仅存于新西兰,颅顶退化的顶眼可感知光周期。岛屿入侵的食卵捕食者曾将其推向灭绝边缘,经清岛灭鼠与人工孵化,种群已在多个保护区恢复。",
    morphology: "形似蜥蜴,背具棘状鳞列,体灰橄榄绿,颅顶具顶眼,长约 50-80 厘米,雄体粗大。",
    habitat: "栖息于新西兰近海岛屿的岩缝与海鸟洞巢,夜间与凉爽时段活动。",
    distribution: "特产于新西兰及周边无捕食者岛屿,主岛正逐步重引入。",
    tags: ["flagship", "活化石"],
  },

  // ===================== 鸟纲 Aves =====================
  {
    rank: "class",
    latin: "Aves",
    chinese: "鸟纲",
    parent: "Vertebrata",
    description:
      "鸟纲为羽毛覆盖的恒温脊椎动物,前肢成翼、喙无齿、卵生育雏,由兽脚类恐龙演化而来,现存逾一万一千种,自极地至大洋分布极广,是陆生脊椎动物最成功的类群之一。",
  },
  {
    rank: "order",
    latin: "Struthioniformes",
    chinese: "鸵鸟目",
    parent: "Aves",
    description:
      "鸵鸟目为不会飞的超大型平胸鸟类,胸骨无龙骨突,后肢极强健善奔跑,现仅非洲鸵鸟一种,史前近亲曾广布欧亚与美洲。",
  },
  {
    rank: "family",
    latin: "Struthionidae",
    chinese: "鸵鸟科",
    parent: "Struthioniformes",
    description:
      "鸵鸟科为现存最大鸟类,雄鸟体黑翎白,一雄多雌共巢孵卵,疾驰时速可近七十公里,足仅二趾,卵为现存鸟卵之最。",
  },
  {
    rank: "genus",
    latin: "Struthio",
    chinese: "鸵鸟属",
    parent: "Struthionidae",
    description:
      "鸵鸟属现存于非洲草原荒漠,史前曾广布欧亚大陆,现广泛半放养以取羽、革与肉,是最早被规模驯养的大型走禽。",
  },
  {
    rank: "species",
    latin: "Struthio camelus",
    chinese: "非洲鸵鸟",
    authority: "Linnaeus, 1758",
    parent: "Struthio",
    description:
      "非洲鸵鸟是现存最大最重的鸟类,雄鸟可逾 2.5 米高、150 千克重,翼羽退化不能飞,双腿一步数米、冲刺时速近七十公里。群居于草原,一雄多雌共巢,巨型卵重可达 1.5 千克,史上猎羽业几度兴衰。",
    morphology: "雄鸟体黑颈腿裸红,翅尖白翎;雌鸟灰褐,颈腿长裸,足仅二趾,眼巨具睫毛。",
    habitat: "栖息于非洲稀树草原、萨赫勒荒漠与灌丛地带,成小群游荡。",
    distribution: "分布于撒哈拉以南非洲开阔地带,养殖种群遍及全球温带。",
    conservation: "LC",
  },
  {
    rank: "order",
    latin: "Galliformes",
    chinese: "鸡形目",
    parent: "Aves",
    description:
      "鸡形目为地栖陆禽,喙短坚适啄食,雄鸟多羽色华丽具距,善走拙飞,包括雉、鹑与松鸡等,家鸡的野生祖先红原鸡即在本目。",
  },
  {
    rank: "family",
    latin: "Phasianidae",
    chinese: "雉科",
    parent: "Galliformes",
    description:
      "雉科是鸡形目最大科,性二态显著,雄鸟羽色华丽以炫耀求偶,包括原鸡、雉、锦鸡与鹑等,广布各大陆,为狩猎与驯化的重要类群。",
  },
  {
    rank: "genus",
    latin: "Gallus",
    chinese: "原鸡属",
    parent: "Phasianidae",
    description:
      "原鸡属雄鸟具肉冠肉垂与尖锐距,晨啼领域性显著,集群于林缘,红原鸡被驯化为家鸡,是鸟类驯化史之源。",
  },
  {
    rank: "species",
    latin: "Gallus gallus",
    chinese: "红原鸡",
    authority: "(Linnaeus, 1758)",
    parent: "Gallus",
    description:
      "红原鸡是所有家鸡的野生祖先,约八千年前在亚洲被驯化,如今数百亿只家鸡使其成为地球上数量最多的鸟类。晨间啼鸣、领域炫耀与就巢行为至今留存于家鸡,是研究驯化遗传学的关键物种。",
    morphology: "雄鸟金红羽具长镰状尾羽,肉冠发达;雌鸟小巧褐色具细纹,脚具锐距,善飞善攀。",
    habitat: "栖息于热带亚热带次生林、竹林缘与耕地边缘,晨昏觅食。",
    distribution: "分布于东南亚、南亚与中国云南、海南及广西南部。",
    conservation: "LC",
    tags: ["flagship", "驯化祖先"],
  },
  {
    rank: "genus",
    latin: "Phasianus",
    chinese: "雉属",
    parent: "Phasianidae",
    description:
      "雉属雄鸟颈具白环纹、尾长而尖,雌鸟小而褐色,是最早被引种全球的猎用禽类,即俗称的野鸡。",
  },
  {
    rank: "species",
    latin: "Phasianus colchicus",
    chinese: "环颈雉",
    authority: "Linnaeus, 1758",
    parent: "Phasianus",
    description:
      "环颈雉俗称野鸡、雉鸡,雄鸟颈部白环与长尾极为醒目,求偶时侧羽炫尾。原产亚洲,经千余年引种散布欧亚与北美,是全球最重要的猎用鸟类之一,中国文化中的雉即指本种。",
    morphology: "雄鸟羽金绿具白颈环,尾长尖带横斑;雌鸟土黄杂斑,尾短,善奔走善藏匿。",
    habitat: "栖息于农田边缘、草丛灌丛与丘陵疏林,杂食性强。",
    distribution: "原产中国至中亚与朝鲜半岛,已引种至欧洲、北美等地。",
  },
  {
    rank: "genus",
    latin: "Chrysolophus",
    chinese: "锦鸡属",
    parent: "Phasianidae",
    description:
      "锦鸡属为中国特有,雄鸟颈具可竖立的披肩状羽,羽色绚烂,红腹锦鸡常被视为神话凤凰的原型。",
  },
  {
    rank: "species",
    latin: "Chrysolophus pictus",
    chinese: "红腹锦鸡",
    authority: "(Linnaeus, 1758)",
    parent: "Chrysolophus",
    description:
      "红腹锦鸡即金鸡,雄鸟赤金披肩、翠绛背羽、腹色如朱,是中国特有鸟类中羽色最华丽者,常被视为神话凤凰的现实原型。求偶时雄鸟展披肩炫羽于雌前,画面广传于自然摄影,国家二级保护。",
    morphology: "雄鸟头具金黄丝状冠羽,橙披肩,上背翠绿,腹赤红,尾长黑斑;雌鸟褐杂黄斑。",
    habitat: "栖息于中海拔山地森林与林缘,秋冬结小群下至农田觅食。",
    distribution: "特产于中国中部与西南山区,青海、甘肃、陕西至云贵川。",
    conservation: "LC",
    tags: ["flagship"],
  },
  {
    rank: "order",
    latin: "Anseriformes",
    chinese: "雁形目",
    parent: "Aves",
    description:
      "雁形目即雁鸭类,喙扁具角质齿缘滤食,蹼足善泳,遍布全球水域,北半球高纬繁殖、越冬迁徙壮阔,家鸭与家鹅由其驯化而来。",
  },
  {
    rank: "family",
    latin: "Anatidae",
    chinese: "鸭科",
    parent: "Anseriformes",
    description:
      "鸭科含雁、鸭、天鹅与鸳鸯等约一百七十余种,蹼足扁喙,绒羽保温性能极佳,繁殖期换羽集中,越冬集群形成壮观鸟浪。",
  },
  {
    rank: "genus",
    latin: "Anas",
    chinese: "鸭属",
    parent: "Anatidae",
    description:
      "鸭属为典型浅水河鸭,喙扁滤食,翼镜色彩为识别关键,绿头鸭是几乎所有家鸭品种的直接祖先。",
  },
  {
    rank: "species",
    latin: "Anas platyrhynchos",
    chinese: "绿头鸭",
    authority: "Linnaeus, 1758",
    parent: "Anas",
    description:
      "绿头鸭是家鸭的野生祖先,全球广布,雄鸟绿头白颈环栗胸极为醒目。驯化历史悠久,绝大多数家鸭品种皆源于此,放生与逃逸使基因交流持续,是研究驯化与种群混合的对象。",
    morphology: "雄鸟头绿具白颈环,胸栗色,尾上卷羽黑;雌鸟褐色斑杂,翼镜蓝紫具白缘,喙扁。",
    habitat: "栖息于湖泊、河流、沼泽等各类湿地,杂食滤食,集群越冬。",
    distribution: "广布于北半球温带,越冬南迁至亚热带,是最常见迁徙水禽之一。",
    tags: ["驯化祖先"],
  },
  {
    rank: "genus",
    latin: "Aix",
    chinese: "鸳鸯属",
    parent: "Anatidae",
    description:
      "鸳鸯属为东亚树洞营巢鸭类,雄鸟羽色华丽,繁殖期成对活动,雏鸟孵出后跳巢随母入水,越冬集群于开阔水域。",
  },
  {
    rank: "species",
    latin: "Aix galericulata",
    chinese: "鸳鸯",
    authority: "(Linnaeus, 1758)",
    parent: "Aix",
    description:
      "雄鸳鸯羽色为鸭类中华丽之最,橙帆羽立于胁侧、白眉后翘,自古是爱情与婚姻的文化象征,所谓只羡鸳鸯不羡仙。树洞营巢,雏鸟孵出后跃下高巢随母赴水,国家二级保护。",
    morphology: "雄鸟羽具金属彩,橙帆羽立胁侧,冠羽白纹;雌鸟灰褐具白眼圈,尾短,静水潜栖。",
    habitat: "栖息于山林溪流与山麓湖泊,树洞营巢,越冬时集群于开阔水域。",
    distribution: "繁殖于东亚东北,越冬于中国南方至日本、朝鲜半岛。",
    conservation: "LC",
    tags: ["flagship", "文化象征"],
  },
  {
    rank: "order",
    latin: "Gruiformes",
    chinese: "鹤形目",
    parent: "Aves",
    description:
      "鹤形目包括鹤、秧鸡与鸨等,颈长喙长后肢长,栖息于湿地与草原,鹤类以壮丽的长途迁徙与求偶对舞著称。",
  },
  {
    rank: "family",
    latin: "Gruidae",
    chinese: "鹤科",
    parent: "Gruiformes",
    description:
      "鹤科体型大,气管在胸骨内盘曲使鸣声如号角可传数里,寿命长,雌雄终生成对,东西方文化皆奉为祥瑞长寿之征。",
  },
  {
    rank: "genus",
    latin: "Grus",
    chinese: "鹤属",
    parent: "Gruidae",
    description:
      "鹤属全球约十种,多数处于受胁状态,长途迁徙依赖连片湿地,白鹤、丹顶鹤等是湿地保护的旗舰物种。",
  },
  {
    rank: "species",
    latin: "Grus japonensis",
    chinese: "丹顶鹤",
    authority: "(P.L.S. Müller, 1776)",
    parent: "Grus",
    description:
      "丹顶鹤即仙鹤,头顶朱红、体白如雪,求偶对舞、引颈长鸣,是东亚长寿与忠贞的千年文化符号。繁殖于中国东北沼泽,越冬于江苏盐城,全球野生种群约数千只,国家一级保护。",
    morphology: "体白,次级飞羽黑,头顶裸皮朱红,颈腿皆长,鸣声如号,身高可达 1.5 米余。",
    habitat: "繁殖于开阔沼泽芦苇湿地,越冬于沿海滩涂与河口浅滩。",
    distribution: "繁殖于中俄蒙交界沼泽,越冬于中国江苏、朝鲜半岛非军事区与日本。",
    conservation: "EN",
    tags: ["flagship", "文化象征"],
  },
  {
    rank: "species",
    latin: "Grus leucogeranus",
    chinese: "白鹤",
    authority: "Pallas, 1773",
    parent: "Grus",
    description:
      "白鹤通体雪白仅翼端黑色,自西伯利亚北极苔原繁殖区迁徙数千公里至鄱阳湖越冬,是候鸟迁徙的传奇物种。全球种群高度集中于少数越冬地,湿地变化即牵动其存亡,列极危,国家一级保护。",
    morphology: "体大羽白,飞翔时翅端黑色,喙砖红长直,腿暗红,站立高约 1.3-1.4 米。",
    habitat: "繁殖于苔原沼泽,越冬于淡水湖滩的浅水泥滩,掘食水生植物球茎。",
    distribution: "繁殖于西伯利亚北部,越冬于中国鄱阳湖及伊朗、印度零散湿地。",
    conservation: "CR",
  },
  {
    rank: "order",
    latin: "Pelecaniformes",
    chinese: "鹈形目",
    parent: "Aves",
    description:
      "鹈形目涵盖鹈鹕、鹭、鹮与鲣鸟等中型至大型水鸟,蹼足长喙捕鱼,多集群营巢于树冠或岩岛,雏鸟晚成,群落壮观。",
  },
  {
    rank: "family",
    latin: "Threskiornithidae",
    chinese: "鹮科",
    parent: "Pelecaniformes",
    description:
      "鹮科喙长下弯或前端扁平,觅食时以触觉探入泥中,包括鹮与琵鹭,集群营巢于树冠,东亚的朱鹮是其保护传奇的代表。",
  },
  {
    rank: "genus",
    latin: "Nipponia",
    chinese: "朱鹮属",
    parent: "Threskiornithidae",
    description:
      "朱鹮属为单型属,羽白染粉,脸颊裸皮朱红,枕部冠羽下垂,曾广布东亚,几近灭绝后在陕西洋县被重新发现并拯救。",
  },
  {
    rank: "species",
    latin: "Nipponia nippon",
    chinese: "朱鹮",
    authority: "(Temminck, 1835)",
    parent: "Nipponia",
    description:
      "朱鹮曾一度被认为野外灭绝,1981 年在陕西洋县仅存的七只被重新发现,经四十年保护繁育,如今全球种群已恢复至上万羽,并重返日韩天空,是全球濒危物种保护里程碑式的典范。",
    morphology: "体白沾粉,翼下粉红显著,面部裸皮朱红,枕具冠羽,喙黑长略下弯,繁殖期具灰婚羽。",
    habitat: "营巢于高大乔木,觅食于水稻田、溪流与沼泽泥滩,啄食小鱼泥鳅螺类。",
    distribution: "现存核心种群在中国陕西汉中,已重引入日本、韩国多地。",
    conservation: "EN",
    tags: ["flagship"],
  },
  {
    rank: "order",
    latin: "Ciconiiformes",
    chinese: "鹳形目",
    parent: "Aves",
    description:
      "鹳形目为大型涉禽,喙粗长颈劲直,飞行时颈与腿前后伸直,营大巢于高树与塔架,巢可多年沿用增修。",
  },
  {
    rank: "family",
    latin: "Ciconiidae",
    chinese: "鹳科",
    parent: "Ciconiiformes",
    description:
      "鹳科喙长厚直,鸣管退化而以上下喙拍击发声,营巨大树巢,幼雏晚成,包括东方白鹳、白鹳与秃鹳。",
  },
  {
    rank: "genus",
    latin: "Ciconia",
    chinese: "鹳属",
    parent: "Ciconiidae",
    description:
      "鹳属体白翅黑,长途迁徙,反刍哺雏,营大巢于高树或塔架,东方白鹳为其东亚代表,繁殖地萎缩受胁深重。",
  },
  {
    rank: "species",
    latin: "Ciconia boyciana",
    chinese: "东方白鹳",
    authority: "Swinhoe, 1873",
    parent: "Ciconia",
    description:
      "东方白鹳喙黑如漆,繁殖于中国东北与俄远东湿地,长江中下游越冬。湿地围垦使繁殖地萎缩,全球种群仅数千只,营巢于大树与输电塔,人工招引巢与栖息地恢复工程并进,国家一级保护。",
    morphology: "体白,飞羽与喙黑色,眼周具红皮,颈劲直,站立高逾 1 米,翼展约 2 米。",
    habitat: "繁殖于沼泽湿地的高树营巢,越冬于湖泊滩涂与收割后的农田。",
    distribution: "繁殖于黑龙江流域与俄远东,越冬于长江中下游湿地。",
    conservation: "EN",
  },
  {
    rank: "order",
    latin: "Accipitriformes",
    chinese: "鹰形目",
    parent: "Aves",
    description:
      "鹰形目为昼行性猛禽,喙钩爪利,视力为脊椎动物之冠,包括鹰、雕、鹫与鸢,居食物链顶端,对农药等环境毒物高度敏感。",
  },
  {
    rank: "family",
    latin: "Accipitridae",
    chinese: "鹰科",
    parent: "Accipitriformes",
    description:
      "鹰科为猛禽最大科,雌鸟常大于雄鸟,涵盖雕、鹰、鹞与秃鹫等逾二百种,翼型与捕猎方式极为多样,广布全球。",
  },
  {
    rank: "genus",
    latin: "Aquila",
    chinese: "雕属",
    parent: "Accipitridae",
    description:
      "雕属即真雕类,翼宽展、飞羽端呈指状,自高空俯冲击杀大型猎物,金雕广布北半球,驯鹰文化地位崇高。",
  },
  {
    rank: "species",
    latin: "Aquila chrysaetos",
    chinese: "金雕",
    authority: "(Linnaeus, 1758)",
    parent: "Aquila",
    description:
      "金雕是北半球最负盛名的大型猛禽,金褐色后颈与两米翼展尽显王者气派,捕猎野兔、旱獭乃至中小型有蹄类。中亚与东亚的驯鹰文化中地位崇高,是国家一级保护动物,空中生态的旗舰物种。",
    morphology: "体大羽暗褐,后颈金褐色矛状羽,尾长而圆,跗蹠被羽,爪黑粗壮,翼展逾 2 米。",
    habitat: "栖于山地、高原与开阔草原,悬崖营巢,领域性强,翱翔觅食。",
    distribution: "广布北半球山地,中国西部与北方山区较常见。",
    conservation: "LC",
    tags: ["flagship"],
  },
  {
    rank: "order",
    latin: "Falconiformes",
    chinese: "隼形目",
    parent: "Aves",
    description:
      "隼形目即隼类,翅尖长善疾飞,喙具齿突可切割猎物颈椎,与鹰类亲缘疏远,包括游隼、红隼与猎隼等约六十种,全球广布。",
  },
  {
    rank: "family",
    latin: "Falconidae",
    chinese: "隼科",
    parent: "Falconiformes",
    description:
      "隼科雌大于雄,多不筑巢而占鸦鹰旧巢,雏鸟晚成,俯冲捕猎技艺登峰造极,是驯鹰史上最尊贵的类群之一。",
  },
  {
    rank: "genus",
    latin: "Falco",
    chinese: "隼属",
    parent: "Falconidae",
    description:
      "隼属包括游隼、猎隼与红隼等,翅型因捕猎策略而异,从疾追到悬停盘旋皆有,全球除雨林深处外广布。",
  },
  {
    rank: "species",
    latin: "Falco peregrinus",
    chinese: "游隼",
    authority: "Tunstall, 1771",
    parent: "Falco",
    description:
      "游隼是俯冲速度之王,自高空扑击猎物时速可超三百公里,是地球上最快的动物。上世纪 DDT 使其卵壳变薄致种群崩溃,禁用后奇迹恢复,成为环保运动史标志性胜利,驯隼术横贯人类文明千年。",
    morphology: "上体青灰,下体白带黑横纹,髭纹黑显,翅尖长,眼大而神,体长约 35-50 厘米。",
    habitat: "栖于山地、海岸至城市高楼,巢于悬崖与建筑檐台,捕鸽鸭等飞鸟。",
    distribution: "遍布全球除南极与部分雨林,城市筑巢种群渐增。",
    conservation: "LC",
    tags: ["flagship"],
  },
  {
    rank: "order",
    latin: "Strigiformes",
    chinese: "鸮形目",
    parent: "Aves",
    description:
      "鸮形目即猫头鹰,面盘收集声波、双眼前视、头颈可转约二百七十度,飞羽锯齿消音实现静夜无声飞行,是夜行性顶级捕食者。",
  },
  {
    rank: "family",
    latin: "Strigidae",
    chinese: "鸱鸮科",
    parent: "Strigiformes",
    description:
      "鸱鸮科为鸮类主体科,耳羽簇或有或无,爪强有力,昼隐夜出,鸣声为领域信号,从雨林到荒漠苔原均有分布。",
  },
  {
    rank: "genus",
    latin: "Bubo",
    chinese: "雕鸮属",
    parent: "Strigidae",
    description:
      "雕鸮属为世界最大的鸮类,耳羽簇显著,虹膜橙亮,栖于山地至荒漠,夜猎兽鸟蛇蛙,威慑一方夜空。",
  },
  {
    rank: "species",
    latin: "Bubo bubo",
    chinese: "雕鸮",
    authority: "(Linnaeus, 1758)",
    parent: "Bubo",
    description:
      "雕鸮是体型最大的猫头鹰之一,橙目如炬、耳羽耸立,夜色中无声滑翔捕杀刺猬、雉类甚至豪猪。低沉鸣声可传数里,欧亚山地荒漠皆有分布,是暗夜生态的顶级掠食者,国家二级保护。",
    morphology: "体大灰褐具细斑,耳簇显著,虹膜橙黄,跗蹠被羽,体长约 60-70 厘米。",
    habitat: "栖息于山地森林、崖壁、荒漠与河谷,昼藏岩缝树冠,夜出巡猎。",
    distribution: "广布欧亚大陆,自伊比利亚半岛至中国东部与西伯利亚。",
    conservation: "LC",
  },
  {
    rank: "order",
    latin: "Passeriformes",
    chinese: "雀形目",
    parent: "Aves",
    description:
      "雀形目为鸟纲最大目,鸣管与鸣肌发达而善鸣,即俗称鸣禽,含鸦、雀、燕、莺等六千余种,占现存鸟类一半以上,足型适栖枝。",
  },
  {
    rank: "family",
    latin: "Passeridae",
    chinese: "雀科",
    parent: "Passeriformes",
    description:
      "雀科为小型地栖雀类,喙圆锥状适啄谷物种子,与人伴生密切,城市乡村皆见,分布于旧大陆,数种随人类扩散至全球。",
  },
  {
    rank: "genus",
    latin: "Passer",
    chinese: "雀属",
    parent: "Passeridae",
    description:
      "雀属即麻雀,伴人栖于城镇农田,秋冬集群游荡,雀形目的名称即源于此属,是最广为人知的小型鸟类。",
  },
  {
    rank: "species",
    latin: "Passer montanus",
    chinese: "麻雀",
    authority: "(Linnaeus, 1758)",
    parent: "Passer",
    description:
      "麻雀是最贴近人类生活的鸟类,城乡屋檐皆见其跳跃觅食、嘈杂成群。上世纪除四害曾使其种群骤减,如今农药与建筑封檐又压缩其繁殖场所,其兴衰始终是伴人鸟类命运的晴雨表。",
    morphology: "体小圆胖,头顶栗褐,颊白具黑斑,喉黑,背褐具纵纹,喙短圆锥,约 12-15 厘米。",
    habitat: "伴人栖息于村落城镇的屋檐、墙洞与行道树,冬结大群游荡。",
    distribution: "广布欧亚大陆,已被引种至北美、澳洲等地。",
  },
  {
    rank: "family",
    latin: "Corvidae",
    chinese: "鸦科",
    parent: "Passeriformes",
    description:
      "鸦科包括鸦、鹊与松鸦等,脑量居鸟类前列,具工具使用、食物储藏与长期记忆能力,认知科学研究成果斐然。",
  },
  {
    rank: "genus",
    latin: "Pica",
    chinese: "鹊属",
    parent: "Corvidae",
    description:
      "鹊属黑白长尾,巢为树顶巨大圆顶结构,鸣声复杂,新大陆与旧大陆种群近年被划分为不同种,东亚即喜鹊。",
  },
  {
    rank: "species",
    latin: "Pica serica",
    chinese: "喜鹊",
    authority: "Gould, 1845",
    parent: "Pica",
    description:
      "喜鹊是民俗中的报喜鸟与鹊桥传说主角,黑白长尾、鸣声粗哑,却极聪明,近缘实验显示鹊类能通过镜像自我识别测验,是少数具此能力的非哺乳动物,营巨大圆顶巢于高树。",
    morphology: "头颈胸黑具蓝紫金属光,腹白,翅具白斑,尾长具金属绿光,体长约 45 厘米。",
    habitat: "伴人栖于城乡树木、公园与农田,繁殖期领域性极强。",
    distribution: "广布中国各地,东至朝鲜半岛,南至喜马拉雅南麓与中南半岛北部。",
    tags: ["flagship", "文化象征"],
  },
  {
    rank: "family",
    latin: "Hirundinidae",
    chinese: "燕科",
    parent: "Passeriformes",
    description:
      "燕科翅尖长叉尾善疾飞,喙宽口裂大,于空中兜捕飞虫,衔泥筑巢于檐壁,跨洲迁徙,古人以燕归记春。",
  },
  {
    rank: "genus",
    latin: "Hirundo",
    chinese: "燕属",
    parent: "Hirundinidae",
    description:
      "燕属即典型燕子,喉红额栗尾深叉,巢筑于屋檐梁下,是迁徙距离与巢位忠诚研究的经典对象。",
  },
  {
    rank: "species",
    latin: "Hirundo rustica",
    chinese: "家燕",
    authority: "Linnaeus, 1758",
    parent: "Hirundo",
    description:
      "家燕是春来秋去的报春使者,每年往返于北半球繁殖地与非洲、东南亚越冬地之间,年年重归旧巢,方向感与巢位记忆惊人。衔泥筑巢于屋檐被视为福兆,旧时王谢堂前燕咏叹的正是它。",
    morphology: "上体钢蓝,额喉栗红,腹白,尾深叉形长,翅尖窄,飞行灵巧,约 17 厘米。",
    habitat: "繁殖期栖于人类建筑周边,空中捕虫,巢筑于檐梁衔泥而成。",
    distribution: "繁殖遍及北半球,越冬于南美、非洲与东南亚。",
    tags: ["flagship", "文化象征"],
  },
  {
    rank: "family",
    latin: "Paridae",
    chinese: "山雀科",
    parent: "Passeriformes",
    description:
      "山雀科小型灵巧,常倒挂枝间啄虫,秋季储藏种子以备寒冬,具空间记忆与认知能力,是行为生态学常用模型。",
  },
  {
    rank: "genus",
    latin: "Parus",
    chinese: "山雀属",
    parent: "Paridae",
    description:
      "山雀属曾统括广布山雀类,分子系统学重排后代表东亚类群,鸣声方言分化明显,是城市适应研究焦点。",
  },
  {
    rank: "species",
    latin: "Parus minor",
    chinese: "远东山雀",
    authority: "Temminck & Schlegel, 1848",
    parent: "Parus",
    description:
      "远东山雀曾与欧亚大山雀混称,黑头白领腹黄,鸣声清亮多变,是城市园林最活跃的小鸟之一。其鸣声方言与城市噪声下的音调上移被长期追踪,是研究人类环境驱动鸟鸣演化的经典物种。",
    morphology: "头黑具大型白颊斑,胸腹黄具黑色中央纵纹,背绿灰,翅具白斑,约 13-15 厘米。",
    habitat: "栖息于各类林地、果园与城市公园,结小群穿枝觅虫。",
    distribution: "分布于东亚,自中国东部至日本、朝鲜半岛与俄远东。",
  },
  {
    rank: "order",
    latin: "Coraciiformes",
    chinese: "佛法僧目",
    parent: "Aves",
    description:
      "佛法僧目羽色艳丽夺目,多为空中捕虫或潜水捕鱼鸟类,包括翠鸟、蜂虎与佛法僧,多凿土洞营巢,广布旧大陆温热带。",
  },
  {
    rank: "family",
    latin: "Alcedinidae",
    chinese: "翠鸟科",
    parent: "Coraciiformes",
    description:
      "翠鸟科喙直尖如矛,羽色为羽轴角蛋白对光的干涉结构色,栖于水畔静伏,俯冲入水捕鱼毫秒完成,动作精准。",
  },
  {
    rank: "genus",
    latin: "Alcedo",
    chinese: "翠鸟属",
    parent: "Alcedinidae",
    description:
      "翠鸟属即小翠鸟类,背钴蓝腹橙栗,栖枝静候,俯冲入水捕鱼,其蓝色来自羽小枝结构对光的散射而非色素。",
  },
  {
    rank: "species",
    latin: "Alcedo atthis",
    chinese: "普通翠鸟",
    authority: "(Linnaeus, 1758)",
    parent: "Alcedo",
    description:
      "普通翠鸟俗称打鱼郎,一抹钴蓝掠过水面即消失,静止时如蓝宝石立于苇梢。其羽色来自微观结构对光的散射而非色素,俯冲入水捕鱼于毫秒间完成,翡翠之名即源于此类艳羽。",
    morphology: "体小约 16 厘米,背钴蓝具亮斑,腹橙栗色,喙黑长直,雌鸟下喙红,脚红小。",
    habitat: "栖息于溪流、池塘与河岸,栖枝静候,俯冲捕食鱼虾。",
    distribution: "广布欧亚大陆与北非,中国南北各地皆常见。",
    tags: ["flagship"],
  },
  {
    rank: "order",
    latin: "Piciformes",
    chinese: "啄木鸟目",
    parent: "Aves",
    description:
      "啄木鸟目多为凿洞营巢鸟类,啄木鸟以喙锥击树干取虫,舌骨绕颅减震,是森林蛀干害虫的重要天敌,被称为森林医生。",
  },
  {
    rank: "family",
    latin: "Picidae",
    chinese: "啄木鸟科",
    parent: "Piciformes",
    description:
      "啄木鸟科趾为对趾型,尾羽尖硬支撑凿洞,喙强直如凿,脑周具减震构造,高频啄击而无恙,凿出的树洞惠及众多洞居鸟兽。",
  },
  {
    rank: "genus",
    latin: "Dendrocopos",
    chinese: "啄木鸟属",
    parent: "Picidae",
    description:
      "啄木鸟属为中型黑白啄木鸟,雄鸟枕部具红斑,击木节奏亦是领域信号,广布欧亚森林,俗称森林医生所指多在本属。",
  },
  {
    rank: "species",
    latin: "Dendrocopos major",
    chinese: "大斑啄木鸟",
    authority: "(Linnaeus, 1758)",
    parent: "Dendrocopos",
    description:
      "大斑啄木鸟是中国最常见的啄木鸟,以喙高频凿木啄取树皮下蛀干害虫,脑部减震结构使其无惧冲击,细长带倒钩的舌可探入虫道钩出幼虫,其所凿树洞亦是次级洞巢鸟兽的居所。",
    morphology: "上体黑具白肩斑与翅斑,下体污白,尾下覆羽红,雄鸟枕部红斑,约 22-23 厘米。",
    habitat: "栖息于各类森林、果园与城市林带,攀树凿洞,敲击觅食。",
    distribution: "广布欧亚大陆森林带,中国各地林区常见。",
    conservation: "LC",
  },

  // ===================== 哺乳纲 Mammalia =====================
  {
    rank: "class",
    latin: "Mammalia",
    chinese: "哺乳纲",
    parent: "Vertebrata",
    description:
      "哺乳纲以毛发覆盖皮肤、乳腺哺育幼崽为特征,多为胎生具胎盘,恒温,下颌仅由单一齿骨构成,现存逾六千种,从两克的鼩鼱到近两百吨的蓝鲸,体型跨度居脊椎动物之首。",
  },
  {
    rank: "order",
    latin: "Monotremata",
    chinese: "单孔目",
    parent: "Mammalia",
    description:
      "单孔目为卵生的原始哺乳动物,具单一泄殖腔孔,乳腺无乳头而直接泌乳于腹部皮肤,仅鸭嘴兽与针鼹两类,是哺乳动物起源研究的关键窗口。",
  },
  {
    rank: "family",
    latin: "Ornithorhynchidae",
    chinese: "鸭嘴兽科",
    parent: "Monotremata",
    description:
      "鸭嘴兽科半水栖,鸭状喙、蹼足与扁尾并存,雄兽后踝具毒距,是极罕见的产毒哺乳类,现存仅鸭嘴兽一种,澳洲特有。",
  },
  {
    rank: "genus",
    latin: "Ornithorhynchus",
    chinese: "鸭嘴兽属",
    parent: "Ornithorhynchidae",
    description:
      "鸭嘴兽属为单型孑遗,喙面分布数千电感受器,闭眼潜水时以电场定位猎物,洞穴营巢,卵生哺乳。",
  },
  {
    rank: "species",
    latin: "Ornithorhynchus anatinus",
    chinese: "鸭嘴兽",
    authority: "(Shaw, 1799)",
    parent: "Ornithorhynchus",
    description:
      "鸭嘴兽的标本 1799 年初抵欧洲时曾被怀疑是恶作剧的缝合品,鸭喙、蹼足、扁尾与毒距集于一身,卵生却哺乳,是动物界最著名的演化拼合案例。喙上数千电感受体使其闭眼潜行时以电场定位猎物,堪称活体奇珍。",
    morphology: "体扁流线,被致密褐色绒毛,喙角质柔软湿润,蹼足可内折,尾扁如桨,雄兽后踝具毒距。",
    habitat: "栖息于澳大利亚东部河溪,掘长洞于岸壁,晨昏潜水觅食底栖无脊椎动物。",
    distribution: "分布于澳大利亚东部与塔斯马尼亚的淡水水系。",
    conservation: "NT",
    tags: ["flagship"],
  },
  {
    rank: "order",
    latin: "Diprotodontia",
    chinese: "双门齿目",
    parent: "Mammalia",
    description:
      "双门齿目是有袋类最大的目,下颌门齿仅两枚,后两趾并合,包括袋鼠、考拉与袋熊等,多为植食,育儿袋开口向前或向后因种而异,澳洲为主体。",
  },
  {
    rank: "family",
    latin: "Phascolarctidae",
    chinese: "树袋熊科",
    parent: "Diprotodontia",
    description:
      "树袋熊科现存仅考拉一种,臼齿高冠适碾桉叶,指分对握无尾,树栖懒动,育儿袋开口朝后,特产于澳洲东部。",
  },
  {
    rank: "genus",
    latin: "Phascolarctos",
    chinese: "树袋熊属",
    parent: "Phascolarctidae",
    description:
      "树袋熊属树栖蛰伏于桉树杈,代谢率低而睡眠极长,幼崽于育儿袋哺育约半年后骑背成长,特产澳洲东部。",
  },
  {
    rank: "species",
    latin: "Phascolarctos cinereus",
    chinese: "树袋熊",
    authority: "(Goldfuss, 1817)",
    parent: "Phascolarctos",
    description:
      "考拉几乎专食桉树叶,日眠近二十小时以抵消低能量食物,指分对握紧抱树干,幼崽在育儿袋哺育半载再骑背学食。栖息地破碎化、山火与衣原体疫病使其种群持续下滑,IUCN 已将其由易危上调为濒危。",
    morphology: "体敦实无尾,毛灰褐厚密,耳圆毛蓬,鼻大而黑裸,前肢指分对握,雄兽胸前具臭腺。",
    habitat: "栖息于澳大利亚东部与南部的开阔桉树林,攀行缓慢,领域鸣叫低沉。",
    distribution: "零散分布于澳洲东部昆士兰至维多利亚与南澳的桉林带。",
    conservation: "EN",
    tags: ["flagship"],
  },
  {
    rank: "order",
    latin: "Chiroptera",
    chinese: "翼手目",
    parent: "Mammalia",
    description:
      "翼手目即蝙蝠,是唯一具持续飞行能力的哺乳类,延长的指骨支撑皮膜成翼,多以回声定位补夜视之缺,逾一千四百种,数量居哺乳纲第二,广布全球。",
  },
  {
    rank: "family",
    latin: "Rhinolophidae",
    chinese: "菊头蝠科",
    parent: "Chiroptera",
    description:
      "菊头蝠科鼻叶复杂呈马蹄形,发射高频声波经鼻孔定向,耳大而无耳屏,洞穴群栖冬眠,是回声定位机制研究的经典类群。",
  },
  {
    rank: "genus",
    latin: "Rhinolophus",
    chinese: "菊头蝠属",
    parent: "Rhinolophidae",
    description:
      "菊头蝠属逾百种,鼻叶三段结构复杂,倒悬栖息,洞穴集群,其冠状病毒多样性与人畜共患病研究备受关注。",
  },
  {
    rank: "species",
    latin: "Rhinolophus ferrumequinum",
    chinese: "马铁菊头蝠",
    authority: "(Schreber, 1774)",
    parent: "Rhinolophus",
    description:
      "马铁菊头蝠是欧亚洞栖蝙蝠的代表,马蹄形鼻叶定向发射超声波,使其在漆黑洞穴与夜空中精确锁定飞虫。冬眠于溶洞深处的群体对洞穴扰动极为敏感,是洞穴生态系统健康的指示物种,中国三有保护名录收录。",
    morphology: "体中型,鼻叶复杂呈马蹄形,耳大无耳屏,翼宽,背灰褐腹色浅,前臂约五至六厘米。",
    habitat: "栖息于山洞、矿井与废弃建筑,冬眠群聚,夜捕飞蛾与甲虫。",
    distribution: "分布于西欧、北非、中东至东亚的中国、日本与朝鲜半岛。",
  },
  {
    rank: "order",
    latin: "Primates",
    chinese: "灵长目",
    parent: "Mammalia",
    description:
      "灵长目脑量相对大,指端具扁甲而拇指多对生,双眼前视立体视觉发达,以热带森林为主要栖息地,包括原猴、猴、猿与人约五百种,社会行为复杂。",
  },
  {
    rank: "family",
    latin: "Cercopithecidae",
    chinese: "猴科",
    parent: "Primates",
    description:
      "猴科即旧大陆猴,鼻孔朝下,具颊囊与臀疣,尾长短不一,广布非洲与亚洲,含猕猴、金丝猴与狒狒等,是社会行为研究的经典类群。",
  },
  {
    rank: "genus",
    latin: "Macaca",
    chinese: "猕猴属",
    parent: "Cercopithecidae",
    description:
      "猕猴属是分布最广的非人灵长类,自北非经南亚至东亚日本,适应森林至城乡环境,恒河猕猴是生物医学最重要的灵长模型。",
  },
  {
    rank: "species",
    latin: "Macaca mulatta",
    chinese: "猕猴",
    authority: "(Zimmermann, 1780)",
    parent: "Macaca",
    description:
      "猕猴即恒河猴,是生物医学史上最重要的灵长类模式动物,免疫、神经与生殖领域的诸多成果以其为基石,基因组测序早已完成。亚洲城乡边缘的猴群与人类互动复杂,既是文化符号也是保护议题,国家二级保护。",
    morphology: "体被棕灰色毛,面部裸露呈粉色,尾长约体长之半,具颊囊储食,臀疣裸露,雄大于雌。",
    habitat: "栖息于林地岩坡至寺院与城镇边缘,昼行群居,杂食性强。",
    distribution: "自阿富汗、印度经东南亚至中国华南、华东与西南山地。",
    conservation: "LC",
    tags: ["模式生物"],
  },
  {
    rank: "genus",
    latin: "Rhinopithecus",
    chinese: "金丝猴属",
    parent: "Cercopithecidae",
    description:
      "金丝猴属为亚洲特有的疣猴类,鼻孔上翘朝天,高寒针叶林树栖,含川、滇、黔、缅与怒江五种,均为珍稀保护物种。",
  },
  {
    rank: "species",
    latin: "Rhinopithecus roxellana",
    chinese: "川金丝猴",
    authority: "(Milne-Edwards, 1870)",
    parent: "Rhinopithecus",
    description:
      "川金丝猴披金色长毛、面孔湛蓝,栖于川陕甘鄂高山针叶林,常被视为美猴王孙悟空的原型之一。以地衣与松萝为主食,冬季啃食树皮枝芽御寒,社会结构为独特的重层社会,国家一级保护动物。",
    morphology: "体被金褐色长毛,颜面天蓝,鼻孔上翘,唇厚,尾长与体相当,成年雄性肩背披毛显著。",
    habitat: "栖息于海拔 1500-3500 米的高山针叶与针阔混交林,树栖耐寒,冬季下移。",
    distribution: "特产于四川、陕西、甘肃与湖北山区。",
    conservation: "EN",
    tags: ["flagship"],
  },
  {
    rank: "family",
    latin: "Hominidae",
    chinese: "人科",
    parent: "Primates",
    description:
      "人科即大型类人猿,体大无尾,直立或半直立,脑量为灵长之冠,现仅猩猩、大猩猩、黑猩猩与人四属,黑猩猩与人的基因组相似度超过百分之九十八。",
  },
  {
    rank: "genus",
    latin: "Pan",
    chinese: "黑猩猩属",
    parent: "Hominidae",
    description:
      "黑猩猩属与人属是现生亲缘最近的灵长类,分化于数百万年前,含黑猩猩与倭黑猩猩两种,工具使用与文化传递研究颠覆了人类独特性的传统定义。",
  },
  {
    rank: "species",
    latin: "Pan troglodytes",
    chinese: "黑猩猩",
    authority: "(Blumenbach, 1775)",
    parent: "Pan",
    description:
      "黑猩猩是与人类亲缘最近的现存动物,基因组相似度超过百分之九十八,会制造工具、集体狩猎并具种群间文化差异。野外种群因盗猎、埃博拉等疫病与森林砍伐持续萎缩,长期是灵长行为学与认知研究的核心对象。",
    morphology: "体被黑毛而面裸,臂长指长,行走以指节拄地,耳大廓突,成年雄性体重约 40-60 千克。",
    habitat: "栖息于非洲赤道雨林与林缘疏林,结多雄多雌群,雄性主导。",
    distribution: "自西非至东非的赤道带,零散分布于二十余国。",
    conservation: "EN",
    ncbiTaxId: 9598,
  },
  {
    rank: "genus",
    latin: "Homo",
    chinese: "人属",
    parent: "Hominidae",
    description:
      "人属出现于两百多万年前,能人、直立人与尼安德特人等曾多支并存,现仅存智人一种,脑容量约 1200-1700 毫升,语言与文化能力无出其右。",
  },
  {
    rank: "species",
    latin: "Homo sapiens",
    chinese: "智人",
    authority: "Linnaeus, 1758",
    parent: "Homo",
    description:
      "智人是唯一现存的人属物种,以语言、抽象思维与技术彻底改变了地球面貌,种群约八十亿,影响遍及每一个生态系统。人类基因组计划以其为首个完整测序对象,是生物医学不可替代的模式与参照物种。",
    morphology: "直立行走,脑容量约 1200-1700 毫升,体毛退化,双手精巧,喉位低而语音复杂。",
    habitat: "遍居全球所有生物群系,自极地苔原至荒漠与超级都市。",
    distribution: "约三十万年前起源于非洲,现已遍布全球各大洲。",
    conservation: "LC",
    ncbiTaxId: 9606,
    tags: ["flagship"],
  },
  {
    rank: "order",
    latin: "Carnivora",
    chinese: "食肉目",
    parent: "Mammalia",
    description:
      "食肉目上颌最后前臼齿与下颌第一臼齿特化为裂齿适切割肉类,犬齿锋利,猫、犬、熊、鼬与鳍脚类皆属之,约三百种,多数陆栖,海豹海狮一支重返海洋。",
  },
  {
    rank: "family",
    latin: "Ursidae",
    chinese: "熊科",
    parent: "Carnivora",
    description:
      "熊科体壮笨重,跖行,杂食或特化食性,冬眠习性典型,现存八种,分布于欧亚、北美与南美安第斯,大熊猫与北极熊是其特化极端。",
  },
  {
    rank: "genus",
    latin: "Ailuropoda",
    chinese: "大熊猫属",
    parent: "Ursidae",
    description:
      "大熊猫属为孑遗单型属,以竹为主食的特化熊类,腕部籽骨扩大成伪拇指以握竹,更新世曾广布中国南方,现仅存川陕甘山区。",
  },
  {
    rank: "species",
    latin: "Ailuropoda melanoleuca",
    chinese: "大熊猫",
    authority: "(David, 1869)",
    parent: "Ailuropoda",
    description:
      "大熊猫黑白分明,以竹为生,日食竹可达数十斤,腕部籽骨形成第六指灵活握秆。世界自然基金会会徽与熊猫外交使其成为全球野生动物保护的旗舰符号,受威胁等级已由濒危下调至易危,国家一级保护。",
    morphology: "体肥硕,眼圈、耳、四肢与肩带黑色,余体白色,圆脸黑鼻,尾短,前掌具伪拇指,成兽 80-120 千克。",
    habitat: "栖息于川陕甘山区湿润竹林沟谷,独居,以气味标记领域,不冬眠。",
    distribution: "特产于中国四川、陕西与甘肃的秦岭、岷山等山系。",
    conservation: "VU",
    ncbiTaxId: 9694,
    tags: ["flagship"],
  },
  {
    rank: "family",
    latin: "Felidae",
    chinese: "猫科",
    parent: "Carnivora",
    description:
      "猫科为纯肉食的特化捕食者,爪可伸缩、犬齿锐长,舌面具角质倒刺,伏击突袭为主,除家猫外野生种多数处于受胁状态,广布各大陆。",
  },
  {
    rank: "genus",
    latin: "Panthera",
    chinese: "豹属",
    parent: "Felidae",
    description:
      "豹属即大型吼猫,舌骨部分骨化使能低吼,狮、虎、豹、雪豹与美洲豹皆属之,是各大陆顶级生态系统的主宰。",
  },
  {
    rank: "species",
    latin: "Panthera tigris",
    chinese: "虎",
    authority: "(Linnaeus, 1758)",
    parent: "Panthera",
    description:
      "虎是最大的猫科动物,独行伏击,一身条纹如指纹个体唯一,百年间野生种群从约十万头锐减至数千头,九个亚种已绝其三。作为森林生态健康的标尺与顶级捕食者,它是亚洲旗舰保护物种之首,国家一级保护。",
    morphology: "体硕大,橙底黑纹,腹白,耳黑具白斑,四肢壮而爪利,雄虎体重可达 200 千克上下。",
    habitat: "栖息于茂密植被的山林与草莽,近水领域独居,晨昏夜行伏击猎物。",
    distribution: "零散分布于南亚、东南亚至俄罗斯远东约十余国,曾广布亚洲。",
    conservation: "EN",
    tags: ["flagship"],
  },
  {
    rank: "family",
    latin: "Canidae",
    chinese: "犬科",
    parent: "Carnivora",
    description:
      "犬科鼻吻尖长善嗅,爪不能伸缩,以追击与耐力捕猎著称,狼、狐、豺与貉皆属之,多数结群协作,家犬由灰狼驯化而来。",
  },
  {
    rank: "genus",
    latin: "Canis",
    chinese: "犬属",
    parent: "Canidae",
    description:
      "犬属包括狼、金豺与侧纹豺及家犬,社会性群猎,嚎叫维系群体,是犬科中体型最大、协作最复杂的属。",
  },
  {
    rank: "species",
    latin: "Canis lupus",
    chinese: "狼",
    authority: "Linnaeus, 1758",
    parent: "Canis",
    description:
      "狼是家犬的野生祖先,约一万五千至四万年前部分种群与人结盟渐成家犬,如今家犬数量数亿。其群体协作围猎与严密等级结构深植人类文化,从童话反派到荒野图腾,是最具争议的哺乳动物。",
    morphology: "体健硕,吻宽额高,尾蓬松下垂,毛色灰黄变异大,北方种群体型更大。",
    habitat: "栖息于森林、苔原、草原与荒漠,领域群居,巢于岩穴,长途游猎。",
    distribution: "历史上遍布北半球,现存于欧亚与北美的广大零散区域。",
    conservation: "LC",
    tags: ["驯化祖先"],
  },
  {
    rank: "order",
    latin: "Artiodactyla",
    chinese: "偶蹄目",
    parent: "Mammalia",
    description:
      "偶蹄目每足第三、四趾并列承重,包括猪、骆驼、鹿、牛与长颈鹿,反刍类具多室胃以发酵粗饲,与鲸类共同构成鲸偶蹄总目,是大型陆生兽的主体。",
  },
  {
    rank: "family",
    latin: "Suidae",
    chinese: "猪科",
    parent: "Artiodactyla",
    description:
      "猪科吻端具活动鼻盘拱土掘食,獠牙或发达,嗅觉极敏锐,杂食而智力高,家猪由野猪驯化而来,广布欧亚与非洲。",
  },
  {
    rank: "genus",
    latin: "Sus",
    chinese: "猪属",
    parent: "Suidae",
    description:
      "猪属即野猪与其近缘,鬃毛粗硬、獠牙外翘,适应力极强,家猪源于其多个亚种的独立驯化,全球家猪以亿计。",
  },
  {
    rank: "species",
    latin: "Sus scrofa",
    chinese: "野猪",
    authority: "Linnaeus, 1758",
    parent: "Sus",
    description:
      "野猪是家猪的野生祖先,约万年前在亚洲与欧洲被分别驯化。拱土觅食的习性重塑林地土壤,本身则是虎、狼等顶级捕食者的基础猎物,近年重返欧洲城市与农田成为管理难题,中国三有保护名录收录。",
    morphology: "体健鬃粗,吻长端具活动鼻盘,雄猪獠牙外翘上弯,仔猪具保护性条纹,毛色深褐变异大。",
    habitat: "栖息于森林、灌丛、草地与沼泽,杂食性,昼夜活动因干扰而变。",
    distribution: "原产欧亚与北非,已引种至美洲与大洋洲,分布极广。",
    conservation: "LC",
    tags: ["驯化祖先"],
  },
  {
    rank: "family",
    latin: "Cervidae",
    chinese: "鹿科",
    parent: "Artiodactyla",
    description:
      "鹿科雄鹿多具实角,每年脱落再生,为哺乳动物唯一整骨再生器官,反刍植食,栖于森林至苔原,麋鹿、梅花鹿与驼鹿皆属之。",
  },
  {
    rank: "genus",
    latin: "Elaphurus",
    chinese: "麋鹿属",
    parent: "Cervidae",
    description:
      "麋鹿属角似鹿非鹿、脸似马非马、蹄似牛非牛、尾似驴非驴,俗称四不像,为第四纪孑遗的单型属,特产于中国东部湿地。",
  },
  {
    rank: "species",
    latin: "Elaphurus davidianus",
    chinese: "麋鹿",
    authority: "(Milne-Edwards, 1866)",
    parent: "Elaphurus",
    description:
      "麋鹿因湿地萎缩与洪水在中国本土绝迹,最后的种群存于北京南海子皇家猎苑,1900 年战乱中殒灭,幸存者经英国乌邦寺繁育延续血脉。1985 年重引入中国,如今种群数千,是野外灭绝后成功重引入的世界经典,国家一级保护。",
    morphology: "体大尾长为鹿类之最,角分叉多向后伸展,蹄宽适沼泽,夏毛红褐冬灰,雄大于雌。",
    habitat: "栖息于沼泽湿地与芦苇草滩,善泳喜泥浴,集群活动。",
    distribution: "重引入于江苏大丰、北京南海子与湖北石首等保护区湿地。",
    conservation: "EW",
    tags: ["flagship"],
  },
  {
    rank: "family",
    latin: "Camelidae",
    chinese: "骆驼科",
    parent: "Artiodactyla",
    description:
      "骆驼科颈长腿长,上唇分裂,红血球椭圆形耐失水,适应干旱与高寒,包括双峰驼、单峰驼、羊驼与骆马,现生野生种仅存于南美安第斯与中亚荒漠。",
  },
  {
    rank: "genus",
    latin: "Camelus",
    chinese: "骆驼属",
    parent: "Camelidae",
    description:
      "骆驼属包括家养单峰驼与双峰驼,驼峰储脂肪耐饥渴,足垫宽适流沙,野生双峰驼为独立极危种,与家驼外形近而遗传有别。",
  },
  {
    rank: "species",
    latin: "Camelus ferus",
    chinese: "野骆驼",
    authority: "Przewalski, 1878",
    parent: "Camelus",
    description:
      "野双峰驼是唯一幸存的野生骆驼,现存约千峰,仅存于中蒙边境的罗布泊-嘎顺戈壁与阿尔金山荒漠,可饮苦咸水、数日不食,耐渴耐饥能力冠绝有蹄类,是荒漠生态系统的旗舰孑遗,国家一级保护。",
    morphology: "体高大瘦削,双驼峰尖小,睫毛长密,耳小,足垫宽厚,毛沙褐色,吻部具裂唇。",
    habitat: "栖息于极端干旱的戈壁、荒漠山前与盐泉散布区,远距离游走觅食。",
    distribution: "分布于中国罗布泊、阿尔金山、安南坝保护区及中蒙边境地区。",
    conservation: "CR",
  },
  {
    rank: "order",
    latin: "Cetacea",
    chinese: "鲸目",
    parent: "Mammalia",
    description:
      "鲸目为完全水生的海洋哺乳类,后肢退化,以水平尾鳍推进,鼻孔移至头顶成喷气孔,须鲸滤食磷虾小鱼、齿鲸捕鱼猎兽,与偶蹄类共组鲸偶蹄总目。",
  },
  {
    rank: "family",
    latin: "Balaenopteridae",
    chinese: "须鲸科",
    parent: "Cetacea",
    description:
      "须鲸科口具鲸须板滤食,喉腹部褶沟可扩张吞入巨量海水,包括蓝鲸、长须鲸与座头鲸等,各大洋作长距离季节洄游,多曾被大规模捕猎。",
  },
  {
    rank: "genus",
    latin: "Balaenoptera",
    chinese: "须鲸属",
    parent: "Balaenopteridae",
    description:
      "须鲸属体流线修长,腹褶沟众多,包括蓝鲸、长须鲸与小须鲸等,快速游泳滤食,其低频鸣声可传数百公里。",
  },
  {
    rank: "species",
    latin: "Balaenoptera musculus",
    chinese: "蓝鲸",
    authority: "(Linnaeus, 1758)",
    parent: "Balaenoptera",
    description:
      "蓝鲸是地球已知史上最大的动物,体长可达三十米、体重近两百吨,仅以拇指大小的磷虾为食,日吞数吨。二十世纪捕鲸业猎杀近三十万头,全球禁捕后缓慢恢复,现存约万余头,其低频鸣声可传数百公里。",
    morphology: "体修长蓝灰色,体侧与腹具浅色斑驳,背鳍小而位后,尾鳍宽大,喉褶沟长,口具黑色须板。",
    habitat: "远洋洄游,夏季至高纬海域索饵,冬季回热带与亚热带繁殖。",
    distribution: "全球各大洋,自南极缘海至印度洋与太平洋温带。",
    conservation: "EN",
    tags: ["flagship"],
  },
  {
    rank: "family",
    latin: "Phocoenidae",
    chinese: "鼠海豚科",
    parent: "Cetacea",
    description:
      "鼠海豚科为小型钝吻鲸类,无喙,背鳍三角形,齿呈铲状,近岸栖,易受刺网渔业误捕,长江江豚为其唯一的纯淡水种群代表。",
  },
  {
    rank: "genus",
    latin: "Neophocaena",
    chinese: "江豚属",
    parent: "Phocoenidae",
    description:
      "江豚属无背鳍,背部具疣粒皮肤嵴,曾统称江豚,现分窄脊与宽脊两种,长江种群被独立为长江特有的淡水种。",
  },
  {
    rank: "species",
    latin: "Neophocaena asiaeorientalis",
    chinese: "长江江豚",
    authority: "(Pilleri & Gihr, 1972)",
    parent: "Neophocaena",
    description:
      "长江江豚是长江仅存的淡水鲸类,嘴角天生上扬如微笑,被称为长江的微笑。白鱀豚功能性灭绝后,它成为长江生态的最后标志,种群约千余头,长江十年禁渔与迁地保护并举,国家一级保护动物。",
    morphology: "体纺锤形铅灰色,无背鳍,背部具疣粒嵴,头圆额隆前凸,嘴角自然上扬,体长约 1.2-1.6 米。",
    habitat: "栖息于长江中下游干流沙洲缓流区及洞庭湖、鄱阳湖,常成对活动。",
    distribution: "特产于中国长江中下游干流及两大通江湖泊。",
    conservation: "CR",
    tags: ["flagship"],
  },
  {
    rank: "order",
    latin: "Perissodactyla",
    chinese: "奇蹄目",
    parent: "Mammalia",
    description:
      "奇蹄目蹄数为奇数,以第三趾承重,侧趾退化,单胃而盲肠发达发酵消化,包括马、犀牛与貘三支,历史上曾极度繁盛,现存种多数濒危。",
  },
  {
    rank: "family",
    latin: "Equidae",
    chinese: "马科",
    parent: "Perissodactyla",
    description:
      "马科现仅存马属一属,含野马、野驴与多种斑马,单趾蹄行,颈长具鬃毛,善疾驰,其驯化深刻改变了人类文明进程。",
  },
  {
    rank: "genus",
    latin: "Equus",
    chinese: "马属",
    parent: "Equidae",
    description:
      "马属含家马的野生近缘、非洲野驴与斑马等,史前类群曾遍布各洲,现存多为受胁种,普氏野马是最后存续的野生马。",
  },
  {
    rank: "species",
    latin: "Equus przewalskii",
    chinese: "普氏野马",
    authority: "Poliakov, 1881",
    parent: "Equus",
    description:
      "普氏野马是最后存续的野生马,上世纪中叶野外灭绝,全球圈养种群皆源自十九世纪末捕获的十余匹基础个体,近交压力深重。1985 年起陆续重引入蒙古与中国卡拉麦里,荒野重现奔腾,国家一级保护。",
    morphology: "体矮壮,鬃短硬直立,毛沙褐无斑,尾粗长毛,染色体数目与家马有别,杂交可育。",
    habitat: "栖息于荒漠草原与戈壁,结小群游荡,耐寒耐渴,冬季刨雪觅食。",
    distribution: "重引入于蒙古大戈壁与中国新疆卡拉麦里、甘肃敦煌放归区。",
    conservation: "EN",
  },
  {
    rank: "order",
    latin: "Rodentia",
    chinese: "啮齿目",
    parent: "Mammalia",
    description:
      "啮齿目门齿终生生长而需磨啃,无犬齿,约二千六百种,占哺乳类四成,自北极冻原到城市下水道无处不在,适应辐射极为成功。",
  },
  {
    rank: "family",
    latin: "Muridae",
    chinese: "鼠科",
    parent: "Rodentia",
    description:
      "鼠科为啮齿目最大科,数百种鼠类广布全球,繁殖力强,小家鼠与褐家鼠伴人遍布各洲,既是科研功臣也是农业与卫生害兽。",
  },
  {
    rank: "genus",
    latin: "Mus",
    chinese: "小鼠属",
    parent: "Muridae",
    description:
      "小鼠属含小家鼠等近四十种,基因组研究积累最深,数百个近交系小鼠支撑起现代生物医学的大厦。",
  },
  {
    rank: "species",
    latin: "Mus musculus",
    chinese: "小家鼠",
    authority: "Linnaeus, 1758",
    parent: "Mus",
    description:
      "小家鼠是生物医学第一模式动物,数十年近交系培育与基因敲除技术使其成为研究人类疾病与基因功能的主力,也是首批完成全基因组测序的哺乳动物之一。伴人扩散至全球,亦是最成功的小型入侵哺乳类之一。",
    morphology: "体小灰褐色,耳圆半裸,吻尖,尾长近体长,成体体长约 7-10 厘米,家栖与野栖型分化。",
    habitat: "伴人栖于仓舍、田野与建筑物,杂食,夜行,繁殖力极强。",
    distribution: "原产亚洲西部与南亚,随人类扩散至全球各大陆。",
    conservation: "LC",
    ncbiTaxId: 10090,
    tags: ["flagship", "模式生物"],
  },
  {
    rank: "genus",
    latin: "Rattus",
    chinese: "大鼠属",
    parent: "Muridae",
    description:
      "大鼠属含褐家鼠与黑鼠等数十种,实验室大白鼠即褐家鼠的白化品系,行为学、药理与毒理研究的经典对象。",
  },
  {
    rank: "species",
    latin: "Rattus norvegicus",
    chinese: "褐家鼠",
    authority: "(Berkenhout, 1769)",
    parent: "Rattus",
    description:
      "褐家鼠俗称沟鼠,是大白鼠的野生型,行为学、药理与毒理学研究的经典实验动物,为继人与小鼠之后完成全基因组测序的第三种哺乳动物。随人类航运遍布全球城市与农田,既是害兽又是功勋实验动物。",
    morphology: "体粗大灰褐色,耳短厚,尾鳞环明显、短于体长,成体重约 200-400 克,大白鼠即其白化系。",
    habitat: "穴居于阴沟、仓库与田野,善攀善泳,杂食,夜行。",
    distribution: "原产亚洲北部,随人类航运扩散至全球城镇乡村。",
    conservation: "LC",
    ncbiTaxId: 10116,
    tags: ["模式生物"],
  },
  {
    rank: "order",
    latin: "Proboscidea",
    chinese: "长鼻目",
    parent: "Mammalia",
    description:
      "长鼻目鼻与上唇延成长鼻,具灵活指状突,上门齿延长成象牙,史前曾遍布各大陆,猛犸象灭绝后仅存亚洲象与非洲象,现存最大陆生动物。",
  },
  {
    rank: "family",
    latin: "Elephantidae",
    chinese: "象科",
    parent: "Proboscidea",
    description:
      "象科现存两属两种,皮厚毛稀,耳扇控温,四肢柱状,母系社会终身维系,亚洲象与非洲象分别踞居两大陆热带。",
  },
  {
    rank: "genus",
    latin: "Elephas",
    chinese: "亚洲象属",
    parent: "Elephantidae",
    description:
      "亚洲象属鼻端仅单一指状突,耳小而背拱起,仅部分雌象象牙外露,栖于南亚与东南亚热带林,集群游走。",
  },
  {
    rank: "species",
    latin: "Elephas maximus",
    chinese: "亚洲象",
    authority: "Linnaeus, 1758",
    parent: "Elephas",
    description:
      "亚洲象栖于南亚与东南亚热带森林,母系家族相伴终生,鼻子集触觉、嗅觉与抓握于一体,能记住水源路线数十年。中国云南边境残存种群仅数百头,人象冲突与栖息地破碎化是最大挑战,国家一级保护。",
    morphology: "体巨皮厚灰褐多褶皱,耳小贴肩,背拱起,鼻端单指状突,雄象牙长者外露,肩高 2.5-3 米。",
    habitat: "栖息于热带雨林、季雨林及林缘草地,涉水采食,晨昏活动。",
    distribution: "南亚与东南亚十余国,中国云南西双版纳与普洱边境有分布。",
    conservation: "EN",
    tags: ["flagship"],
  },
  {
    rank: "order",
    latin: "Sirenia",
    chinese: "海牛目",
    parent: "Mammalia",
    description:
      "海牛目是唯一植食性水生哺乳类,前肢桨状,后肢退化,尾鳍水平,行动迟缓,包括儒艮与三种海牛,均为受胁物种,与大象亲缘较近。",
  },
  {
    rank: "family",
    latin: "Dugongidae",
    chinese: "儒艮科",
    parent: "Sirenia",
    description:
      "儒艮科现存仅儒艮一种,尾鳍分叉如鲸,以海草为食,行动缓慢,印度洋-太平洋暖海草床是其家园,美洲的斯特拉海牛已于十八世纪灭绝。",
  },
  {
    rank: "genus",
    latin: "Dugong",
    chinese: "儒艮属",
    parent: "Dugongidae",
    description:
      "儒艮属为单型孑遗,吻端下垂啃食海草根茎,在草床犁出蛇形食痕,怀抱幼崽浮于水面的姿态被认为是美人鱼传说的来源。",
  },
  {
    rank: "species",
    latin: "Dugong dugon",
    chinese: "儒艮",
    authority: "(Müller, 1776)",
    parent: "Dugong",
    description:
      "儒艮怀抱幼崽浮出水面哺乳的剪影,被认为是美人鱼传说的现实原型。以海草为食,游动缓慢,沿海开发、刺网与船只使其种群百年间持续缩减,2022 年研究宣布其在中国沿海已功能性灭绝,全球列易危。",
    morphology: "体纺锤形灰褐,皮厚多皱,吻短口位向下,尾鳍水平分叉,前肢桨状,无后肢。",
    habitat: "栖息于热带沿岸海草床,潜水啃食海草根茎,定期浮起换气。",
    distribution: "印度洋-西太平洋四十余国沿岸暖水海域。",
    conservation: "VU",
  },
  {
    rank: "order",
    latin: "Eulipotyphla",
    chinese: "真盲缺目",
    parent: "Mammalia",
    description:
      "真盲缺目为小型食虫哺乳类,包括刺猬、鼩鼱与鼹类,代谢率极高而终日觅食,嗅觉与触觉发达而视觉退化,旧称食虫目的核心成员。",
  },
  {
    rank: "family",
    latin: "Erinaceidae",
    chinese: "猬科",
    parent: "Eulipotyphla",
    description:
      "猬科棘毛特化成刺,遇险蜷缩成球以刺御敌,吻尖齿多,夜行食虫,广布欧亚与非洲,城市绿地亦可安家。",
  },
  {
    rank: "genus",
    latin: "Erinaceus",
    chinese: "刺猬属",
    parent: "Erinaceidae",
    description:
      "刺猬属即典型刺猬,背部棘刺环肌收缩可蜷球,夜间翻找昆虫蠕虫蜗牛越冬前大量储食,是中国北方最常见的食虫兽。",
  },
  {
    rank: "species",
    latin: "Erinaceus amurensis",
    chinese: "东北刺猬",
    authority: "Schrenk, 1859",
    parent: "Erinaceus",
    description:
      "东北刺猬是中国北方最常见的刺猬,遇险蜷成刺球令捕食者无从下口,以昆虫、蠕虫与蜗牛为食,秋末暴食后入洞穴冬眠数月。城市公园与绿地亦有其踪,是离人类最近的野生食虫兽,中国三有保护名录收录。",
    morphology: "体背棘刺褐白相间,腹部毛粗,吻尖眼小,体长约 18-28 厘米,尾极短。",
    habitat: "栖息于林缘、灌丛、田园与城市绿地,夜行翻找食物。",
    distribution: "分布于中国东北、华北至华东,朝鲜半岛与俄罗斯远东亦有。",
  },
];
