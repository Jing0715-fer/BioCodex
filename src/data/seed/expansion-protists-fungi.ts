import { TaxonSeed } from "../types";

// 原生生物界(Protista)与真菌界(Fungi)的扩充种子数据(Task 2-b)。
// 在 protists-fungi.ts 已有 1267 条清单基础上新增 16 物种(原生生物 6 + 真菌 10)
// 及必要的新属/科/目等中间阶元;所有 parent 均精确引用清单已有单元或本文件先定义的单元。
// 命名者与 NCBI TaxId 仅在高置信时填写;物种未添加 flagship 标签。
export const expansionProtistsFungi: TaxonSeed[] = [
  // ===================== 原生生物界:领鞭动物分支(动物近亲) =====================
  {
    rank: "phylum",
    latin: "Choanozoa",
    chinese: "领鞭动物门",
    parent: "Protista",
    description:
      "鞭毛基部环绕微绒毛领的单细胞或群体原生生物,借鞭毛摆动驱动水流以领滤食细菌。作为动物界最近的单细胞近缘类群,是探讨后生动物起源与多细胞性演化的关键材料。",
    tags: ["phylum"],
  },
  {
    rank: "class",
    latin: "Choanoflagellatea",
    chinese: "领鞭毛虫纲",
    parent: "Choanozoa",
    description:
      "领鞭毛虫的主体类群,细胞具单根鞭毛与环状微绒毛领,多为固着或自由游泳的单细胞与群体,以海生为主。",
    tags: ["class"],
  },
  {
    rank: "order",
    latin: "Choanoflagellida",
    chinese: "领鞭毛虫目",
    parent: "Choanoflagellatea",
    description:
      "具领细胞构造的固着或游泳型鞭毛虫类,部分种类形成群体或借胶质柄附着,以细菌与微小有机颗粒为食。",
    tags: ["order"],
  },
  {
    rank: "family",
    latin: "Codonosigidae",
    chinese: "单领虫科",
    parent: "Choanoflagellida",
    description:
      "无鞘领鞭毛虫科,细胞裸露不具花篮状硅质外鞘,多借胶质柄或假柄固着生活,单领虫属为代表属。",
    tags: ["family"],
  },
  {
    rank: "genus",
    latin: "Monosiga",
    chinese: "单领虫属",
    parent: "Codonosigidae",
    description:
      "单细胞无鞘领鞭毛虫,卵形细胞顶端生单根鞭毛并环以微绒毛领,常借细柄附着于基质滤食细菌。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Monosiga ovata",
    chinese: "卵形单领虫",
    parent: "Monosiga",
    description:
      "领鞭毛虫的习见代表种,卵形细胞顶面伸出单根鞭毛,鞭毛基部围成一圈微绒毛领,摆动驱动水流将细菌送向领部捕获。领鞭毛虫被公认为动物界最近的单细胞亲属,其领细胞与海绵领细胞高度同源,是研究多细胞动物起源的关键类群。",
    morphology: "细胞卵形,直径 3-6 微米,顶端一根鞭毛环以微绒毛领,常以细柄附着基质。",
    habitat: "淡水与浅海中附着于沉水植物、碎石及有机碎屑表面。",
    distribution: "全球性分布,温带海域沿岸带与静水淡水水体中均常见。",
    tags: ["species", "动物近亲"],
  },

  // ===================== 原生生物界:棘阿米巴分支(变形虫门新纲) =====================
  {
    rank: "class",
    latin: "Discosea",
    chinese: "盘状纲",
    parent: "Amoebozoa",
    description:
      "体形扁平、伪足宽叶片状或棘状的变形虫类,运动时不形成单一管状伪足,含棘阿米巴与扇变形虫等类群,广布于土壤与水体。",
    tags: ["class"],
  },
  {
    rank: "order",
    latin: "Flabellinia",
    chinese: "扇足目",
    parent: "Discosea",
    description:
      "盘状纲中行扇形运动、前进时形成宽大透明扇状伪足的类群,多数栖息于土壤与淡水,少数为机会性病原。",
    tags: ["order"],
  },
  {
    rank: "family",
    latin: "Acanthamoebidae",
    chinese: "棘阿米巴科",
    parent: "Flabellinia",
    description:
      "体表具细棘状伪足的变形虫科,生活史含滋养体与抗性双壁包囊两期,多营自由生活,少数为机会性人类病原。",
    tags: ["family"],
  },
  {
    rank: "genus",
    latin: "Acanthamoeba",
    chinese: "棘阿米巴属",
    parent: "Acanthamoebidae",
    description:
      "广泛分布于土壤与水体的自由生活变形虫,滋养体伸出细刺状棘足,包囊抵抗力极强,部分种致角膜炎与脑炎。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Acanthamoeba castellanii",
    chinese: "卡氏棘阿米巴",
    parent: "Acanthamoeba",
    description:
      "自由生活的机会性病原变形虫,以细菌为食,滋养体可侵入破损角膜引发棘阿米巴角膜炎,免疫低下者偶致肉芽肿性阿米巴脑炎。其包囊对氯与干燥耐受极强,细胞内还能容留军团菌等病原菌并协助其扩散,是环境与健康研究的重要对象。",
    morphology: "滋养体 15-35 微米,体表伸出细棘状伪足,包囊双层壁,直径 10-25 微米。",
    habitat: "土壤、淡水、海水与自来水等环境中自由生活,滋养体以细菌为食。",
    distribution: "全球性分布,温暖潮湿环境与镜片护理液中常被检出。",
    ncbiTaxId: 5755,
    tags: ["species", "人类病原"],
  },

  // ===================== 原生生物界:顶复门球虫分支 =====================
  {
    rank: "family",
    latin: "Eimeriidae",
    chinese: "艾美耳球虫科",
    parent: "Eucoccidiorida",
    description:
      "球虫类最大的科,寄生于脊椎动物肠上皮等细胞,行裂体生殖与配子生殖,卵囊需在外界孢子化后方具感染性。",
    tags: ["family"],
  },
  {
    rank: "genus",
    latin: "Cyclospora",
    chinese: "环孢子虫属",
    parent: "Eimeriidae",
    description:
      "寄生于人兽肠道的顶复体原虫,球形卵囊内含两个孢子囊,随粪便排出的卵囊需在外界完成孢子化才具感染性。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Cyclospora cayetanensis",
    chinese: "卡耶塔环孢子虫",
    authority: "Ortega, Gilman & Sterling, 1994",
    parent: "Cyclospora",
    description:
      "人类环孢子虫病的病原,卵囊污染水源与浆果、叶菜后经粪口途径传播,引发迁延性水样腹泻。1990 年代北美多起树莓与生菜相关暴发使其声名大噪,种名取自秘鲁卡耶塔诺·埃雷迪亚大学。现以甲氧苄啶-磺胺甲噁唑治疗,尚无有效疫苗。",
    morphology: "卵囊球形,直径 8-10 微米,内含两个孢子囊,各具两个子孢子。",
    habitat: "仅寄生于人体小肠上皮细胞,卵囊随粪便排出后在外界完成孢子化。",
    distribution: "热带与亚热带地方性流行,秘鲁、尼泊尔、危地马拉等地高发。",
    tags: ["species", "人类病原"],
  },

  // ===================== 原生生物界:锥虫科补充病原 =====================
  {
    rank: "genus",
    latin: "Leishmania",
    chinese: "利什曼原虫属",
    authority: "Ross, 1903",
    parent: "Trypanosomatidae",
    description:
      "前鞭毛体寄居于白蛉消化道、无鞭毛体寄生于脊椎动物巨噬细胞内的动基体原虫,多种为利什曼病病原。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Leishmania donovani",
    chinese: "杜氏利什曼原虫",
    authority: "(Laveran & Mesnil, 1903)",
    parent: "Leishmania",
    description:
      "内脏利什曼病(黑热病)的病原,雌白蛉叮咬将前鞭毛体注入人体,无鞭毛体在巨噬细胞内大量增殖,致肝脾肿大、发热与全血细胞减少,不治者病死率高。20 世纪上半叶曾肆虐中国北方,经灭蛉与治疗已获控制,锑剂与两性霉素 B 脂质体为现用药物。",
    morphology: "无鞭毛体卵圆形 2-5 微米,具棒状动基体;白蛉体内为前鞭毛体,具前伸鞭毛。",
    habitat: "寄生于人与犬等哺乳动物巨噬细胞,在媒介白蛉消化道内发育。",
    distribution: "南亚、东非与地中海盆地为主,中国西北地区仍有散发。",
    tags: ["species", "人类病原"],
  },
  {
    rank: "species",
    latin: "Trypanosoma cruzi",
    chinese: "克氏锥虫",
    authority: "Chagas, 1909",
    parent: "Trypanosoma",
    description:
      "美洲锥虫病(恰加斯病)的病原,1909 年由巴西医生恰加斯发现。锥蝽吸血排粪传播,锥鞭毛体经伤口侵入,先在细胞内转化为无鞭毛体增殖,再入血播散,慢性期主要累及心脏与消化道,致心肌病与巨结肠。拉美数百万人受染,输血与垂直传播亦是重要途径。",
    morphology: "血液中锥鞭毛体约 20 微米,动基体大而位于后端,血涂片中常呈 C 形。",
    habitat: "寄生于人及犬、猫、犰狳等哺乳动物血液与心肌细胞,锥蝽肠道内繁殖。",
    distribution: "墨西哥至阿根廷的拉丁美洲广泛流行,并扩散至美国南部。",
    ncbiTaxId: 5693,
    tags: ["species", "人类病原"],
  },
  {
    rank: "species",
    latin: "Plasmodium vivax",
    chinese: "间日疟原虫",
    authority: "(Grassi & Feletti, 1890)",
    parent: "Plasmodium",
    description:
      "分布范围最广的人类疟原虫,引发间日疟,典型发作间隔 48 小时。与恶性疟原虫不同,其在肝细胞内形成休眠子,可在感染数月至数年后复燃,根治需伯氨喹等清除肝内虫期。红细胞 Duffy 抗原是其入侵受体,西非人群因该受体缺失而罕受感染。",
    morphology: "环状体较大,受染红细胞胀大并现薛氏细点,成熟裂殖体含 12-24 个裂殖子。",
    habitat: "寄生于人肝细胞与红细胞,雌按蚊体内完成配子生殖与孢子增殖。",
    distribution: "亚洲、中南美洲与东非热带至温带广布,病例数最多的疟原虫之一。",
    ncbiTaxId: 5855,
    tags: ["species", "人类病原"],
  },

  // ===================== 真菌界:红菇目-猴头菌分支 =====================
  {
    rank: "order",
    latin: "Russulales",
    chinese: "红菇目",
    parent: "Agaricomycetes",
    description:
      "担孢子具淀粉质纹孔、菌肉脆而不纤维质的伞菌与多孔菌类群,含红菇、乳菇、猴头菌与刺革菌等,菌根与腐生种类兼备。",
    tags: ["order"],
  },
  {
    rank: "family",
    latin: "Hericiaceae",
    chinese: "猴头菌科",
    parent: "Russulales",
    description:
      "子实层体为下垂刺状的肉质真菌科,担子果块状或珊瑚状分枝,猴头菌属为代表,腐生于树干伤口与腐木。",
    tags: ["family"],
  },
  {
    rank: "genus",
    latin: "Hericium",
    chinese: "猴头菌属",
    parent: "Hericiaceae",
    description:
      "担子果刺状、肉质洁白的腐生真菌属,多生于硬木伤口或心材腐朽处,含猴头菌等食药兼用经济种。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Hericium erinaceus",
    chinese: "猴头菌",
    authority: "(Bull.) Pers.",
    parent: "Hericium",
    description:
      "传统名贵食药兼用菌,担子果白色绒球状,下垂长刺如猿猴鬃毛而得名。菌丝体与子实体分别产生具神经营养因子诱导活性的刺菌素与猴头菌酮,是神经退行性疾病研究热点;猴头菌制剂在中国广泛用于消化道疾患,现已实现大规模人工栽培。",
    morphology: "担子果球形至扁块状,直径 5-30 厘米,刺长 1-5 厘米下垂,白色肉质。",
    habitat: "腐生于壳斗科等硬木树干伤口与心材腐朽处,偶见伐桩,秋冬季发生。",
    distribution: "北半球温带广布,中国东北、西南山地均产,各地普遍栽培。",
    tags: ["species", "食用菌", "药用"],
  },

  // ===================== 真菌界:鸡油菌目分支 =====================
  {
    rank: "order",
    latin: "Cantharellales",
    chinese: "鸡油菌目",
    parent: "Agaricomycetes",
    description:
      "子实层体为钝厚皱脊(假菌褶)的喇叭形真菌目,含鸡油菌、齿菌与喇叭菌等类群,多为外生菌根菌,难以人工栽培。",
    tags: ["order"],
  },
  {
    rank: "family",
    latin: "Cantharellaceae",
    chinese: "鸡油菌科",
    parent: "Cantharellales",
    description:
      "担子果喇叭形、子实层体延生为钝褶状脊的科,与树木形成外生菌根,鸡油菌属为著名美味食用菌代表。",
    tags: ["family"],
  },
  {
    rank: "genus",
    latin: "Cantharellus",
    chinese: "鸡油菌属",
    parent: "Cantharellaceae",
    description:
      "蛋黄色喇叭形食用菌属,子实层体为延生的钝厚分叉假褶,散发杏香,主产北温带针阔混交林中。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Cantharellus cibarius",
    chinese: "鸡油菌",
    authority: "Fr.",
    parent: "Cantharellus",
    description:
      "欧洲最负盛名的野生食用菌之一,蛋黄色喇叭状子实体散发杏子与胡椒混合香气,子实层体为钝厚分叉的假菌褶而非真菌褶。与松、栎等树木形成外生菌根,至今无法人工栽培,野生采集支撑着庞大市场;富含维生素 D 前体与类胡萝卜素。",
    morphology: "菌盖漏斗状,宽 3-10 厘米,蛋黄色,假菌褶延生分叉,柄与盖无明显界限。",
    habitat: "夏秋季与松、栎、山毛榉等形成外生菌根,林中群生或散生。",
    distribution: "欧洲、北美与亚洲温带针阔混交林中广泛分布。",
    tags: ["species", "食用菌"],
  },

  // ===================== 真菌界:鬼笔目-竹荪分支 =====================
  {
    rank: "order",
    latin: "Phallales",
    chinese: "鬼笔目",
    parent: "Agaricomycetes",
    description:
      "发育方式独特的腐生真菌目,子实体先在地下形成蛋状菌蕾,成熟后菌柄迅速伸长,产孢体具恶臭引诱昆虫传播孢子。",
    tags: ["order"],
  },
  {
    rank: "family",
    latin: "Phallaceae",
    chinese: "鬼笔科",
    parent: "Phallales",
    description:
      "子实体成熟时菌柄迅速伸长、顶部产孢体呈网格或钟形并散发腐臭的真菌科,竹荪与鬼笔为代表属种。",
    tags: ["family"],
  },
  {
    rank: "genus",
    latin: "Phallus",
    chinese: "鬼笔属",
    parent: "Phallaceae",
    description:
      "菌柄海绵质圆柱形、顶端具钟形产孢体的鬼笔类,部分种菌盖下悬网状菌裙,即名贵食用菌竹荪。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Phallus indusiatus",
    chinese: "长裙竹荪",
    parent: "Phallus",
    description:
      "即竹荪,菌蕾破壳后菌柄迅速伸高,菌盖下垂洁白网状菌裙,形态如着纱仕女,被誉为'真菌之花'。腐生于竹林落叶层,是我国传统名贵食用菌,滋味鲜美,现已规模化栽培;产孢体腐臭引诱蝇类传播孢子,干制后臭味消失。",
    morphology: "菌柄海绵状白色,高 12-25 厘米,菌裙网状下垂达柄中部,菌盖钟形。",
    habitat: "夏秋季腐生于竹林、阔叶林落叶层与朽木上,单生或群生。",
    distribution: "华南与西南竹林地带,热带亚洲广布,各地已广泛栽培。",
    tags: ["species", "食用菌"],
  },

  // ===================== 真菌界:口蘑科-松茸 =====================
  {
    rank: "genus",
    latin: "Tricholoma",
    chinese: "口蘑属",
    parent: "Tricholomataceae",
    description:
      "菌褶弯生、孢子光滑无色的外生菌根伞菌属,含数百种,松茸为东亚最名贵代表,亦不乏毒种。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Tricholoma matsutake",
    chinese: "松茸",
    authority: "(S. Ito & S. Imai) Singer",
    parent: "Tricholoma",
    description:
      "东亚最负盛名的野生食用菌,与赤松、栎树等形成外生菌根,菌塘经数十年缓慢扩展方能出菇,独特松木清香令日本市场价屡创新高。子实体破土后数日即衰败,采集窗口极短;松林结构变化致产区持续萎缩,人工栽培至今未获成功。",
    morphology: "菌盖半球形后平展,直径 5-20 厘米,浅褐具纤毛状鳞片,菌环上位。",
    habitat: "秋季单生或群生于赤松、栎、云杉林下,与树根形成外生菌根菌塘。",
    distribution: "日本、朝鲜半岛及中国东北与横断山区,北美西部产近缘种。",
    tags: ["species", "食用菌"],
  },

  // ===================== 真菌界:曲霉属补充 =====================
  {
    rank: "species",
    latin: "Aspergillus flavus",
    chinese: "黄曲霉",
    authority: "Link",
    parent: "Aspergillus",
    description:
      "黄曲霉毒素的头号生产菌,其 B1 型毒素为迄今毒性最强的天然肝致癌物,污染玉米、花生与棉籽等粮油,是全球食品安全的重点监控对象。温暖潮湿的储粮环境极易暴发,畜禽误食可致急性中毒与肝癌,同时也是重要的侵袭性曲霉病病原。",
    morphology: "分生孢子头黄绿色放射状,顶囊近球形,产孢结构单层,菌落后期转褐。",
    habitat: "土壤与腐败有机物中常见,花生、玉米等储粮与田间果穗上高发。",
    distribution: "世界性分布,以热带与亚热带地区储粮污染最重。",
    ncbiTaxId: 5059,
    tags: ["species", "人类病原", "植物病原"],
  },

  // ===================== 真菌界:小皮伞分支 =====================
  {
    rank: "family",
    latin: "Marasmiaceae",
    chinese: "小皮伞科",
    parent: "Agaricales",
    description:
      "小到中型伞菌科,菌柄常坚韧、干燥后可复苏再生长,多生于枯叶落枝等凋落物上,含小皮伞属等腐生类群。",
    tags: ["family"],
  },
  {
    rank: "genus",
    latin: "Marasmius",
    chinese: "小皮伞属",
    parent: "Marasmiaceae",
    description:
      "菌肉极薄、菌柄坚韧细长的伞菌属,干缩后遇水可恢复生长,生于落叶枯枝,含数百种腐生菌。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Marasmius androsaceus",
    chinese: "安络小皮伞",
    authority: "(L.) Fr.",
    parent: "Marasmius",
    description:
      "个体微小的腐生小伞菌,常成片生于针叶与阔叶落叶上,深色毛发状细柄极易识别。中国以其发酵产物制成'安络痛'制剂,用于坐骨神经痛、三叉神经痛与风湿性关节痛,是民间药用真菌的重要代表,现代研究关注其倍半萜与酚类活性成分。",
    morphology: "菌盖膜质,宽 5-15 毫米,白至浅褐色具放射状褶,菌柄黑色细韧如发。",
    habitat: "群生或散生于林下针叶、阔叶树的落叶与枯枝上。",
    distribution: "北半球温带至亚热带广布,中国南方林区常见。",
    tags: ["species", "药用"],
  },

  // ===================== 真菌界:多孔菌科-云芝分支 =====================
  {
    rank: "family",
    latin: "Polyporaceae",
    chinese: "多孔菌科",
    parent: "Polyporales",
    description:
      "担子果帽状、平伏反卷或蹄形、子实层体为管孔状的木材腐朽菌科,白腐的主力类群,含栓菌属等重要属。",
    tags: ["family"],
  },
  {
    rank: "genus",
    latin: "Trametes",
    chinese: "栓菌属",
    parent: "Polyporaceae",
    description:
      "一年生帽状至平伏反卷的多孔菌属,菌盖多毛具环纹,管孔面完整,白腐能力强劲,云芝为代表种。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Trametes versicolor",
    chinese: "云芝",
    authority: "(L.) Lloyd",
    parent: "Trametes",
    description:
      "担子果覆瓦状叠生、绒毛质菌盖具彩色同心环带,形似雉鸡尾羽,故英名'火鸡尾'。世界性木材白腐菌,对木质素降解能力突出;其多糖 PSK 在日本获准作肿瘤辅助治疗药物,中国的云芝糖肽 PSP 亦用于免疫调节,是研究最深入的药用多孔菌之一。",
    morphology: "菌盖半圆形覆瓦状叠生,宽 2-10 厘米,绒毛质具彩色同心环带,管孔面白色。",
    habitat: "全年见于腐朽硬木树干与伐桩,偶生针叶木,群生叠生。",
    distribution: "全球性分布,各大洲温带至热带均极常见。",
    tags: ["species", "药用"],
  },

  // ===================== 真菌界:镰刀菌分支(植物病原) =====================
  {
    rank: "family",
    latin: "Nectriaceae",
    chinese: "丛赤壳科",
    parent: "Hypocreales",
    description:
      "子囊壳色泽鲜红或鲜黄的肉座菌科,含镰刀菌属等重要植物病原与真菌毒素产生菌,寄主范围极广。",
    tags: ["family"],
  },
  {
    rank: "genus",
    latin: "Fusarium",
    chinese: "镰刀菌属",
    parent: "Nectriaceae",
    description:
      "具镰形大分生孢子的土栖真菌属,兼具毁灭性植物病原、谷物毒素产生者与机会性人类病原三重身份,种复合体众多。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Fusarium oxysporum",
    chinese: "尖孢镰刀菌",
    authority: "Schltdl.",
    parent: "Fusarium",
    description:
      "毁灭性土传植物病原,不同专化型分别引发番茄、棉花、香蕉等百余种作物的枯萎病,病菌定殖导管致整株萎蔫枯死。香蕉'热带4号'小种正威胁全球卡文迪什香蕉产业,被视为最具破坏力的植物病原真菌之一;防治依赖抗病育种与土壤处理,极难根治。",
    morphology: "大型分生孢子镰刀形具 3-5 隔,小型分生孢子单胞卵形,菌落絮状粉红。",
    habitat: "土壤中长期存活,自根系侵入寄主维管束并定殖于导管。",
    distribution: "世界性分布,热带与暖温带农业区为害最烈。",
    tags: ["species", "植物病原"],
  },

  // ===================== 真菌界:虫草分支 =====================
  {
    rank: "family",
    latin: "Cordycipitaceae",
    chinese: "虫草科",
    parent: "Hypocreales",
    description:
      "寄生于昆虫与蜘蛛的肉座菌科,子座棒状肉质、色泽鲜明,子囊壳埋生于子座内,蛹虫草为其代表。",
    tags: ["family"],
  },
  {
    rank: "genus",
    latin: "Cordyceps",
    chinese: "虫草属",
    parent: "Cordycipitaceae",
    description:
      "寄生昆虫的肉质子座菌属,子座自虫尸头部或体表伸出,蛹虫草为代表种,含虫草素等活性物质。",
    tags: ["genus"],
  },
  {
    rank: "species",
    latin: "Cordyceps militaris",
    chinese: "蛹虫草",
    parent: "Cordyceps",
    description:
      "俗称北虫草,橙黄色棒状子座自蛾蛹体中破壳而出,是虫草属的模式种。虫草素、喷司他丁与多糖为主要活性成分,药理研究集中于免疫调节与抗肿瘤;与冬虫夏草近缘而可人工培育,中国已用大米与蚕蛹基质实现工厂化生产,产值可观。",
    morphology: "子座棒状橙黄至橙红,高 2-8 厘米,顶部可孕,着生于蛹体上。",
    habitat: "夏秋季生于林下土中鳞翅目蛹体,室内以大米、蚕蛹基质大量培养。",
    distribution: "北半球温带广布,中国东北至西南山地均有记录。",
    tags: ["species", "药用"],
  },

  // ===================== 真菌界:鹅膏属补充(剧毒) =====================
  {
    rank: "species",
    latin: "Amanita phalloides",
    chinese: "毒鹅膏",
    parent: "Amanita",
    description:
      "全球致死性毒菇的代表,鹅膏毒肽抑制 RNA 聚合酶 II 引致肝细胞坏死,一朵子实体即可致命,占欧洲毒菇中毒死亡案例的九成。菌盖绿褐、具菌环与杯状菌托,与栎树等形成外生菌根;随树苗引种无意传入北美与澳洲并成为入侵毒菌,救治依赖早期识别与肝脏支持。",
    morphology: "菌盖近钟形后平展,宽 4-15 厘米,绿黄色,具菌环与白色杯状菌托。",
    habitat: "夏秋季与栎、栗、松形成外生菌根,林下单生或散生。",
    distribution: "原产欧洲,随苗木传入北美与澳大利亚并持续扩散。",
    tags: ["species", "有毒"],
  },
];
