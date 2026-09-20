import { TaxonSeed } from "../types";

// 脊椎动物扩充种子数据 III(Task 4-d expansion3)。
// 主题:哺乳纲深扩充(啮齿目/翼手目/小型食肉目)+ 爬行纲与两栖纲深扩充。
// 每个物种均含 5 项科学档案字段(etymology / discovery / genomeInfo / ecologyRole / researchValue)。
// species 的 parent 引用两类来源:
//   1) DB 已有分类单元(/tmp/taxa-inventory.tsv,1685 条):
//      Rodentia / Cricetidae / Chiroptera / Carnivora / Canidae / Squamata / Viperidae /
//      Testudines / Geoemydidae / Trionychidae / Caudata / Salamandridae / Anura / Rhinolophus;
//   2) 本文件内先行定义的新中间阶元(13 科 + 26 属)。
// 注意:与 seed-incremental.ts 汇总合并使用时,父级必须(DB ∪ 新数据)闭合。
// 查重说明:推荐名单中已有物种均已核对 inventory 后跳过——
//   马铁菊头蝠/绿海龟/玳瑁/大鲵/东方蝾螈/中华眼镜蛇/银环蛇/竹叶青蛇/眼镜王蛇/缅甸蟒/
//   豚鼠/小家鼠/褐家鼠/亚洲黑熊/穿山甲/马来熊/中华蟾蜍 等不重复收录。
export const expansion3MammalsHerps: TaxonSeed[] = [
  // ===================== 啮齿目 Rodentia =====================
  {
    rank: "family",
    latin: "Castoridae",
    chinese: "河狸科",
    parent: "Rodentia",
    description:
      "河狸科为现存最大的啮齿类之一,体重可达 30 公斤,半水栖,后足具蹼,尾扁覆鳞如桨,以树枝筑坝造塘改造溪流,现存欧亚河狸与北美河狸两种。",
  },
  {
    rank: "genus",
    latin: "Castor",
    chinese: "河狸属",
    parent: "Castoridae",
    description:
      "河狸属为北半球温带半水栖大型啮齿类,门齿橙黄而终身生长,以树皮与水草为食,筑坝蓄水营造湿地,被誉为生态系统工程师,现生两种。",
  },
  {
    rank: "species",
    latin: "Castor fiber",
    chinese: "欧亚河狸",
    authority: "Linnaeus, 1758",
    parent: "Castor",
    description:
      "欧亚河狸是欧亚大陆温带溪流中的半水栖大型啮齿类,体重可逾 20 公斤,夜行营家族生活,以树皮与水草为食。它们用树枝泥土筑坝成塘,营造的湿地滋养无数物种,曾因皮毛与香腺猎杀几近绝迹,经二十世纪大规模重引入后种群恢复至百万级,IUCN 已将其降为无危。",
    morphology: "体肥硕,被毛栗褐而密,尾扁平覆角质鳞片如桨,后足具蹼,门齿橙黄,体长可达 80 厘米,体重逾 20 公斤。",
    habitat: "栖于流速缓慢的森林溪河与湖沼,营半水栖家族生活,以坝塘与沿岸掘洞的巢室为核心活动领域。",
    distribution: "历史分布遍及欧亚大陆温带,经重引入现已覆盖自伊比利亚至西伯利亚、蒙古与中国新疆北部的诸水系。",
    conservation: "LC",
    etymology:
      "属名 Castor 源自希腊语 kastor(河狸);种加词 fiber 为拉丁语河狸之意,与属名同义,系林奈沿用旧大陆土名。",
    discovery:
      "1758 年林奈定名;中世纪至十九世纪因河狸香入药与皮毛贸易遭毁灭性猎杀,二十世纪起欧洲逾二十国实施重引入,种群由约千余只残存个体恢复至逾百万。",
    genomeInfo: "全基因组约 3 Gb 量级,近缘北美河狸已完成染色体级组装,支撑半水栖适应与坝建行为的比较研究。",
    ecologyRole: "生态系统工程师:筑坝形成的河狸塘抬高地下水位、截留泥沙、创造湿地,使两栖类、水禽与鱼类普遍受益。",
    researchValue: "重引入保护生物学的世界级成功案例;其坝塘被用于欧洲河流修复工程,河狸香贸易史亦是人兽关系经典题材。",
    tags: ["旗舰物种", "重引入物种"],
  },
  {
    rank: "species",
    latin: "Castor canadensis",
    chinese: "北美河狸",
    authority: "Kuhl, 1820",
    parent: "Castor",
    description:
      "北美河狸是北美洲的半水栖大型啮齿类,习性与欧亚河狸相近,以筑坝改造溪流著称,是加拿大的国家象征动物。皮毛贸易曾使其种群锐减,后经保护恢复至数百万只,其坝塘是北美湿地生态的核心,对鳟鱼、水禽与驼鹿等具有伞护效应。",
    morphology: "外形与欧亚河狸几无差别,体稍大,体重可逾 25 公斤,尾覆鳞片扁平如桨,后足蹼状,门齿橙黄而强健。",
    habitat: "栖于北美森林带的溪河、湖泊与沼泽,家族营巢于坝塘中央巢丘或沿岸洞穴,冬季冰下取食贮枝。",
    distribution: "遍布加拿大、美国与墨西哥北部,并被引入南美火地岛,在当地形成入侵性种群并改变河溪生态。",
    conservation: "LC",
    etymology:
      "种加词 canadensis 意为加拿大的,指模式产地北美;本种曾长期与欧亚河狸混同,后经形态与遗传厘清为独立种。",
    discovery:
      "1820 年库尔定名;十七至十九世纪皮毛贸易以河狸毡帽为核心,哈德逊湾公司等由此驱动北美腹地开发,种群一度濒危后全面恢复。",
    genomeInfo: "染色体级参考基因组近年发表,约 2.7 Gb,为研究其筑坝行为演化与昼夜节律适应奠定分子基础。",
    ecologyRole: "北美湿地的生态系统工程师,坝塘改变水文并提升生物多样性;火地岛引入种群则成为入侵生态的著名反面案例。",
    researchValue: "与欧亚河狸并列为生态系统工程研究模式;火地岛案例用于研究生物入侵的级联生态效应与河流演化。",
    tags: ["旗舰物种", "入侵物种"],
  },
  {
    rank: "genus",
    latin: "Phodopus",
    chinese: "毛足鼠属",
    parent: "Cricetidae",
    description:
      "毛足鼠属为亚洲中部草原的小型仓鼠,体长不足 10 厘米,足底密毛适于沙地,背具深色纵纹,含黑线毛足鼠等三个著名的实验与宠物物种。",
  },
  {
    rank: "species",
    latin: "Phodopus sungorus",
    chinese: "黑线毛足鼠",
    authority: "(Pallas, 1773)",
    parent: "Phodopus",
    description:
      "黑线毛足鼠俗称西伯利亚仓鼠或加卡利亚仓鼠,背具黑色纵纹,足底被密毛,入冬毛色可转为通体雪白。它是光周期调控繁殖与季节性蛰眠的明星实验动物,短日照诱发自发蛰眠与体重季节调节,宠物市场的三线仓鼠即其驯化品系。",
    morphology: "体长 8-10 厘米,背毛灰褐而具黑色纵纹,腹毛白色,足底密布白毛,冬季毛色可转纯白,尾极短。",
    habitat: "栖于干旱草原与半荒漠的沙质草地,穴居夜行,以草籽与昆虫为食,冬季依赖贮粮与周期性蛰眠越冬。",
    distribution: "分布于东欧至哈萨克斯坦与西伯利亚西南部草原,中国新疆北缘的记录尚存争议;驯化品系遍布全球宠物市场。",
    conservation: "LC",
    etymology:
      "种加词 sungorus 源自准噶尔旧称,指中亚草原模式产地;属名 Phodopus 意为毛足,指其足底厚密的毛垫。",
    discovery:
      "1773 年帕拉斯依中亚草原标本定名;1960 年代起进入西方实验室,成为光周期生物学与季节性蛰眠研究的核心模型;后以三线仓鼠风靡宠物市场。",
    genomeInfo: "全基因组约 2.4 Gb,参考基因组资源已建立,短日照应答与繁殖季节转换的神经内分泌通路研究深入。",
    ecologyRole: "草原小植食鼠类,捕食昆虫、扰动土壤,是猛禽与鼬类的重要猎物;季节性蛰眠显著降低冬季能量消耗。",
    researchValue: "光周期与季节生物学经典模型:短日照自发蛰眠用于研究冬眠代谢开关、褪黑素信号与季节性免疫调节。",
    tags: ["模式生物", "驯化物种"],
  },
  {
    rank: "genus",
    latin: "Cricetulus",
    chinese: "仓鼠属",
    parent: "Cricetidae",
    description:
      "仓鼠属为亚洲温带至荒漠的小型仓鼠,尾短,颊囊极发达,背多具暗色纵纹,含黑线仓鼠与中国仓鼠等,后者衍生的 CHO 细胞是生物制药支柱。",
  },
  {
    rank: "species",
    latin: "Cricetulus barabensis",
    chinese: "黑线仓鼠",
    authority: "(Pallas, 1773)",
    parent: "Cricetulus",
    description:
      "黑线仓鼠是中国北方农田与草原最常见的小型啮齿类之一,背具醒目黑色纵纹,颊囊发达,穴居夜行,秋季大量贮粮。它与生物制药中著名的 CHO 细胞来源种中国仓鼠近缘且种界长期纠缠,是啮齿动物物种界定研究与农田害鼠管理的代表性类群。",
    morphology: "体长 8-12 厘米,尾短不及体长之半,背毛灰褐,沿脊具一条清晰黑纹,腹毛灰白,颊囊极发达。",
    habitat: "栖于农田、草原与沙地边缘,自掘洞系深达半米,夜行性,以种子与植物绿色部分为食并大量贮粮。",
    distribution: "分布于中国华北、东北与内蒙古,及蒙古与俄罗斯外贝加尔,是中国北方旱作区的优势鼠种之一。",
    conservation: "LC",
    etymology:
      "属名 Cricetulus 为 Cricetus(仓鼠)的指小词,意为小仓鼠;种加词 barabensis 取自西伯利亚巴拉巴草原模式产地。",
    discovery:
      "1773 年帕拉斯依巴拉巴草原标本定名;与 CHO 细胞来源的中国仓鼠的种界长期争论,现代分类多视后者为独立种。",
    genomeInfo: "与 CHO 细胞来源种中国仓鼠近缘且核型相近,后者的基因组与细胞系研究为生物制药奠定了理解基础。",
    ecologyRole: "华北农田能量流的重要环节,是猛禽、蛇类与鼬科动物的关键猎物,数量波动与作物受害程度密切相关。",
    researchValue: "农田害鼠种群生态与防治研究的代表种;近缘中国仓鼠的 CHO 细胞系贡献了全球多数重组抗体药物生产。",
    tags: ["农业害鼠", "生物制药相关"],
  },
  {
    rank: "family",
    latin: "Sciuridae",
    chinese: "松鼠科",
    parent: "Rodentia",
    description:
      "松鼠科为啮齿目大科,含树松鼠、地松鼠、旱獭与花栗鼠等,尾长多毛,适应林栖、地栖与穴居多种生活型,广布各大陆,约近三百种。",
  },
  {
    rank: "genus",
    latin: "Marmota",
    chinese: "旱獭属",
    parent: "Sciuridae",
    description:
      "旱獭属为大型地栖松鼠类,体粗壮,群居洞系,冬季深眠数月,分布于欧亚与北美的高山与草原,含美洲旱獭与喜马拉雅旱獭等十余种。",
  },
  {
    rank: "species",
    latin: "Marmota monax",
    chinese: "美洲旱獭",
    authority: "(Linnaeus, 1758)",
    parent: "Marmota",
    description:
      "美洲旱獭又称土拨鼠,是北美东部常见的地栖松鼠,体粗壮,冬季深眠数月,北美民间以二月二日「土拨鼠日」占卜春临而闻名。其体内携带的旱獭肝炎病毒与人类乙肝病毒高度相似,使它成为乙肝研究最重要的动物模型之一,冬眠生理研究亦成果丰硕。",
    morphology: "体长 40-65 厘米,体重 2-6 公斤,体粗壮,前肢具强爪适掘,毛灰褐而蓬松,尾短而扁平。",
    habitat: "栖于林地边缘、草地与农田坡地,掘深逾一米的冬夏双洞,独居而领域性强,白昼活动采食。",
    distribution: "广泛分布于北美东部与中部,自阿拉斯加东南至美国东南部,是北美最常见的野生哺乳动物之一。",
    conservation: "LC",
    etymology:
      "属名 Marmota 源自阿尔卑斯地区罗曼语 marmotte(旱獭);种加词 monax 采自美洲原住民语言对旱獭的称谓。",
    discovery:
      "1758 年林奈定为 Mus monax;1978 年康奈尔大学学者在其体内发现旱獭肝炎病毒,直接催生了乙型肝炎的动物模型体系。",
    genomeInfo: "全基因组约 2.5 Gb 量级,测序工作近年开展,支撑肝炎病毒模型与深度冬眠生理的分子研究。",
    ecologyRole: "重要的土壤工程师,大量掘土形成洞群改变草地群落结构,是郊狼、狐与猛禽的常见猎物。",
    researchValue: "旱獭肝炎病毒使其成为乙肝与肝癌研究的经典模型;深度冬眠的代谢抑制机制为低温医学提供线索。",
    tags: ["模式生物"],
  },
  {
    rank: "genus",
    latin: "Spermophilus",
    chinese: "黄鼠属",
    parent: "Sciuridae",
    description:
      "黄鼠属为欧亚草原的地栖松鼠类,体中型,耳小尾短,直立瞭望姿态醒目,穴居群栖,多为冬眠严格的草原代表种,含欧黄鼠等十余种。",
  },
  {
    rank: "species",
    latin: "Spermophilus citellus",
    chinese: "欧黄鼠",
    authority: "(Linnaeus, 1766)",
    parent: "Spermophilus",
    description:
      "欧黄鼠是欧洲中部至东南部草原的群居地栖松鼠,直立瞭望是其标志性姿态,冬眠可长达半年。农业集约化使草甸被翻耕、洞穴被犁平,种群在多国锐减,IUCN 列为易危,中欧多国正以重引入与割草制度改良等手段开展抢救。",
    morphology: "体长约 20 厘米,尾短仅 5-7 厘米,背毛黄褐杂以暗斑,耳极小,遇险直立后足并尖啸报警。",
    habitat: "栖于干燥草甸、草原与牧场,群居洞系,以禾草与昆虫为食,秋季蓄脂后入洞深眠至翌春。",
    distribution: "分布于中欧至巴尔干、乌克兰与土耳其西北部,奥地利、捷克等国种群经重引入逐步恢复。",
    conservation: "VU",
    etymology:
      "属名 Spermophilus 由希腊语 sperma(种子)与 philos(喜好)构成,指其嗜食种子;种加词 citellus 为其意大利土名。",
    discovery:
      "1766 年林奈定为 Mus citellus;二十世纪农业集约化致其在中欧多国绝迹,近三十年开展系统重引入与草场管理保护。",
    genomeInfo: "线粒体谱系清晰揭示其冰期避难所与建群历史,全基因组研究近年启动,支撑小种群遗传抢救管理。",
    ecologyRole: "草原生态系统的基石种,掘穴为多种动物提供居所,是鼬类与猛禽的核心猎物,存续指示草甸健康。",
    researchValue: "欧洲草原恢复的旗舰物种;重引入实验为放归遗传管理提供教科书案例,冬眠生理研究亦有积累。",
    tags: ["重引入物种", "草地指示种"],
  },
  {
    rank: "family",
    latin: "Heterocephalidae",
    chinese: "裸鼹鼠科",
    parent: "Rodentia",
    description:
      "裸鼹鼠科为东非特有,仅裸鼹鼠一种,体几无毛而代谢近于变温,具哺乳动物中唯一的真社会性结构,曾被归入滨鼠科,现代系统学独立成科。",
  },
  {
    rank: "genus",
    latin: "Heterocephalus",
    chinese: "裸鼹鼠属",
    parent: "Heterocephalidae",
    description:
      "裸鼹鼠属为单型属,代表种裸鼹鼠栖于东非干旱高原的地下洞群,一后多工、世代重叠,如昆虫般营真社会性生活。",
  },
  {
    rank: "species",
    latin: "Heterocephalus glaber",
    chinese: "裸鼹鼠",
    authority: "Rüppell, 1842",
    parent: "Heterocephalus",
    description:
      "裸鼹鼠是东非地下的无毛啮齿类,是唯一具真社会性结构的哺乳动物:群落由一名鼠后与专职工鼠、兵鼠组成,如蜂群般分工。它几乎不患癌、对酸与缺氧极端耐受,寿命远超同体型啮齿类,是衰老与抗逆生物学当之无愧的明星模式动物。",
    morphology: "体长 8-9 厘米,皮肤粉褐松弛多褶而几无毛,门齿外露可各自独立操作,眼极小,触毛稀疏而畏光。",
    habitat: "栖于埃塞俄比亚、索马里与肯尼亚干旱高原的地下洞群,以大块根茎为食,近乎终年不见天日。",
    distribution: "非洲之角干旱地区;实验室种群遍布全球,是衰老与神经生物学研究的常用材料。",
    conservation: "LC",
    ncbiTaxId: 10181,
    etymology:
      "属名由希腊语 heteros(异)与 kephale(头)构成,指其头骨形态特异;种加词 glaber 为拉丁语光滑无毛的,指其体表。",
    discovery:
      "1842 年吕佩尔于埃塞俄比亚发现并定名;1980 年代起其真社会性渐被揭示,2011 年全基因组测序后成为衰老研究大热点。",
    genomeInfo: "2n=60,全基因组约 2.7 Gb,2011 年完成测序,揭示其 DNA 修复与蛋白折叠相关基因的特殊适应。",
    ecologyRole: "地下生态系统的掘进者,取食的块根可再生,庞大洞群为多种无脊椎动物提供微生境,主要天敌为蛇类。",
    researchValue: "衰老、抗癌与缺氧耐受研究的超级模式生物,成果多次登上《自然》《科学》;痛觉缺失机制启发镇痛策略。",
    tags: ["模式生物", "长寿物种"],
  },
  // ===================== 翼手目 Chiroptera =====================
  {
    rank: "family",
    latin: "Pteropodidae",
    chinese: "狐蝠科",
    parent: "Chiroptera",
    description:
      "狐蝠科为旧大陆果蝠类,眼大而视觉发达,主食果实与花蜜,是热带雨林种子传播与传粉主力,除果蝠属外一般不具回声定位,含近两百种。",
  },
  {
    rank: "genus",
    latin: "Rousettus",
    chinese: "果蝠属",
    parent: "Pteropodidae",
    description:
      "果蝠属为中型旧大陆果蝠,群栖洞穴,以舌击声实现果蝠中唯一的回声定位,兼用视觉与嗅觉,含埃及果蝠等十余种。",
  },
  {
    rank: "species",
    latin: "Rousettus aegyptiacus",
    chinese: "埃及果蝠",
    authority: "(E. Geoffroy, 1810)",
    parent: "Rousettus",
    description:
      "埃及果蝠是旧大陆唯一会回声定位的大蝙蝠,黑暗中以舌击发出的粗嘶声导航,又兼大眼与敏锐的视觉嗅觉。它是非洲与中东常见的洞穴群栖果蝠,数万只可共居一洞,作为马尔堡病毒等烈性病原的自然宿主,成为病毒生态学最重要的研究物种之一。",
    morphology: "中型果蝠,前臂长约 9-10 厘米,吻长如犬,眼大,耳壳简单,体背褐灰而颈肩毛色略浅,尾短。",
    habitat: "栖于热带与亚热带的洞穴、废井与岩缝,大群栖息,夜出觅食无花果等果实与花蜜,飞程可达数十公里。",
    distribution: "广布非洲大陆、中东至巴基斯坦与印度西北部;实验室种群亦见于欧美病毒研究机构。",
    conservation: "LC",
    etymology:
      "属名 Rousettus 源自法语 roux(红褐色)的指小词,指其毛色;种加词 aegyptiacus 意为埃及的,指模式产地。",
    discovery:
      "1810 年圣伊莱尔依埃及标本定名;2007 年起在乌干达洞穴种群中直接分离到马尔堡病毒,确立其自然宿主身份。",
    genomeInfo: "全基因组约 2 Gb,已发表组装;兼具回声定位与视觉的独特感官组合使其成为感官演化比较研究焦点。",
    ecologyRole: "热带果树与无花果的重要传粉与种子传播者,一晚可散布数千枚种子;洞穴群栖使其成为病毒循环的关键节点。",
    researchValue: "马尔堡病毒自然宿主与实验模型;舌击回声定位为蝙蝠声呐演化提供了关键的过渡类型证据。",
    tags: ["病毒宿主", "种子传播者"],
  },
  {
    rank: "family",
    latin: "Vespertilionidae",
    chinese: "蝙蝠科",
    parent: "Chiroptera",
    description:
      "蝙蝠科为翼手目最大的科,体多小型,耳壳发达,以喉部超声回声定位捕虫,种类逾四百,夜空中大多数蝙蝠皆属此科,广布全球。",
  },
  {
    rank: "genus",
    latin: "Eptesicus",
    chinese: "棕蝠属",
    parent: "Vespertilionidae",
    description:
      "棕蝠属为中大型蝙蝠科蝙蝠,吻部粗壮,翼宽而飞行稳健,多栖于建筑缝隙与树洞,广布新旧大陆,含大棕蝠与欧洲大棕蝠等近十种。",
  },
  {
    rank: "species",
    latin: "Eptesicus fuscus",
    chinese: "大棕蝠",
    authority: "(Beauvois, 1796)",
    parent: "Eptesicus",
    description:
      "大棕蝠是北美最常见的蝙蝠之一,体褐色,栖于屋檐烟囱,黄昏低空巡飞捕虫。它对狂犬病毒耐受性强,寿命可近二十年而远超同体型哺乳动物,是蝙蝠长寿免疫研究的明星,也是白鼻综合征阴霾下相对耐受的物种,免疫机制备受关注。",
    morphology: "体型较粗壮,前臂 4-5 厘米,通体油亮褐色,耳短而圆,吻部粗钝,翼宽,飞行稳健而略显迟缓。",
    habitat: "夏栖建筑缝隙与树洞,冬眠于洞穴与矿坑,黄昏外出,沿林缘与水面巡飞捕食甲虫与蛾类。",
    distribution: "遍及北美自加拿大南部至南美北部及加勒比群岛,是最适应人类环境的蝙蝠之一。",
    conservation: "LC",
    etymology:
      "属名 Eptesicus 源自希腊语,意为屋居者,指其常栖于房舍;种加词 fuscus 为拉丁语深褐色的,指其体色。",
    discovery:
      "1796 年博瓦依美国宾夕法尼亚标本定名;二十世纪环志研究证实其寿命逾十九年,一举打破蝙蝠短命的旧观念。",
    genomeInfo: "全基因组约 2 Gb,已发表组装;与白鼻综合征高感的小鼠耳蝠属比较,揭示蝙蝠免疫耐受差异的遗传基础。",
    ecologyRole: "北美夜空的主力食虫蝙蝠,一晚捕虫量可及自身体重量级,对农业害虫与蚊虫具有显著压制作用。",
    researchValue: "狂犬病毒感染与免疫耐受的经典模型;长寿与 DNA 修复研究亦以本种为蝙蝠代表之一。",
    tags: ["害虫天敌"],
  },
  {
    rank: "species",
    latin: "Rhinolophus sinicus",
    chinese: "中华菊头蝠",
    authority: "K. Andersen, 1905",
    parent: "Rhinolophus",
    description:
      "中华菊头蝠是中国南方洞穴常见的马蹄形鼻叶蝙蝠,发射长恒频超声在林间锁定猎物。菊头蝠属多种是 SARS 相关冠状病毒的天然宿主,本种长期参与蝙蝠病毒库调查与冠状病毒溯源研究,其全基因组亦已发表,是蝙蝠免疫适应研究的代表物种。",
    morphology: "体型中小,蹄铁状鼻叶复杂而醒目,耳大无耳屏,翼宽,体毛柔褐,前臂约 5 厘米,静止时以翼膜裹身倒挂。",
    habitat: "栖于天然洞穴、废矿洞与隧道,群栖可达数百只,飞行低缓,在林间以长恒频声呐锁定蛾类与蚊类。",
    distribution: "分布于中国华中、华南至西南,亦见于越南北部等邻近地区,是中国南方洞穴蝙蝠群落的优势种之一。",
    conservation: "LC",
    etymology:
      "属名 Rhinolophus 由希腊语 rhis(鼻)与 lophos(冠脊)构成,指马蹄形鼻叶;种加词 sinicus 意为中国的。",
    discovery:
      "1905 年丹麦博物学家安德森定为独立种,此前长期与南亚近缘种混淆;2005 年起菊头蝠属冠状病毒研究使其种群备受关注。",
    genomeInfo: "全基因组约 2 Gb,已发表;其 DNA 感应与干扰素通路的独特配置被视为蝙蝠与病毒长期共存的遗传基础。",
    ecologyRole: "山地森林与洞穴系统的食虫蝙蝠,夜间压制蛾类种群,洞穴粪堆滋养特化的无脊椎动物群落。",
    researchValue: "冠状病毒自然史与蝙蝠免疫学的代表性物种;恒频声呐的听觉神经科学亦是经典研究系统。",
    tags: ["病毒宿主", "洞穴物种"],
  },
  {
    rank: "family",
    latin: "Phyllostomidae",
    chinese: "叶口蝠科",
    parent: "Chiroptera",
    description:
      "叶口蝠科为新大陆蝙蝠最大科,鼻叶形态多样,食性自昆虫扩展至果实、花蜜、花粉、血液与小型脊椎动物,适应性辐射被喻为蝙蝠中的达尔文雀。",
  },
  {
    rank: "genus",
    latin: "Desmodus",
    chinese: "吸血蝠属",
    parent: "Phyllostomidae",
    description:
      "吸血蝠属为专性吸血的叶口蝠类,拇指长而利,可在地面疾走跳跃,以抗凝唾液舔食动物伤口血液,单型属,代表种为普通吸血蝠。",
  },
  {
    rank: "species",
    latin: "Desmodus rotundus",
    chinese: "普通吸血蝠",
    authority: "(E. Geoffroy, 1810)",
    parent: "Desmodus",
    description:
      "普通吸血蝠是极少数以血液为主食的哺乳动物,夜间潜至牛马猪等哺乳动物身旁,以门齿切开皮肤舔食血液,唾液中的强力抗凝成分成为抗栓药物研究的宝库。其红外感温、陆地奔跑能力与同类间血液分享的互惠行为,使它成为演化生物学的明星物种。",
    morphology: "体小,前臂约 5 厘米,拇指特长而具肉垫,可四足奔跑跳跃,鼻叶呈 U 形,无尾,齿列特化利于切皮舔血。",
    habitat: "栖于洞穴、树洞与废弃建筑,群栖数十至数百只,夜出寻找大型哺乳动物,食性专化为舔舐伤口血液。",
    distribution: "分布自墨西哥至南美洲阿根廷北部;气候变暖使其分布区呈缓慢北扩趋势。",
    conservation: "LC",
    etymology:
      "属名 Desmodus 由希腊语 desmos(束带)与 odous(齿)构成,喻其特化的齿;种加词 rotundus 意为圆胖的。",
    discovery:
      "1810 年圣伊莱尔定名;二十世纪拉丁美洲为防控狂犬病对其大规模扑杀,后转向牛群免疫接种的生态友好策略。",
    genomeInfo: "全基因组约 2 Gb,已发表;嗅觉与受体基因家族的收缩扩张与其极端的食性特化相对应。",
    ecologyRole: "血液寄生性捕食者,与宿主动物构成稳定的吸血关系,亦是狂犬病毒在拉美牛群中的重要传播环节。",
    researchValue: "唾液抗凝组分启发抗血栓药物研发;红外感温受体与血液互惠分享研究是演化医学的经典案例。",
    tags: ["病毒宿主", "药物来源物种"],
  },
  // ===================== 食肉目 Carnivora =====================
  {
    rank: "family",
    latin: "Mustelidae",
    chinese: "鼬科",
    parent: "Carnivora",
    description:
      "鼬科为食肉目最大的科,体多细长而四肢短,肛腺发达,体型跨度自三十克的伶鼬至逾三十公斤的大型獾类,含鼬、獾、水獭与貂约六十种。",
  },
  {
    rank: "genus",
    latin: "Mellivora",
    chinese: "蜜獾属",
    parent: "Mustelidae",
    description:
      "蜜獾属为单型属,代表种蜜獾皮厚而松弛,爪长有力,嗜食蜂蜜并捕食毒蛇,分布非洲与南亚,以无所畏惧著称于世。",
  },
  {
    rank: "species",
    latin: "Mellivora capensis",
    chinese: "蜜獾",
    authority: "(Schreber, 1776)",
    parent: "Mellivora",
    description:
      "蜜獾体格粗壮、皮肤厚而松弛,毒蛇咬不穿、蜂蜇不惧,连狮豹都难迅速制服,以「世界上最无所畏惧的动物」闻名。它凭厚皮与对蛇毒的部分耐受捕食眼镜蛇与蜂巢,烟碱型乙酰胆碱受体的突变研究揭示了鼬类抗蛇毒的分子机制。",
    morphology: "体长 60-70 厘米,背灰白腹黑色而分界醒目,皮厚松弛可在皮下转动转身反咬,爪长逾 2 厘米,咬合力强。",
    habitat: "栖于撒哈拉以南非洲与南亚的干旱稀树草原、灌丛与雨林,昼伏夜出,领地游荡范围极大。",
    distribution: "分布于非洲撒哈拉以南大部分地区、阿拉伯半岛南部、伊朗至印度次大陆。",
    conservation: "LC",
    etymology:
      "属名 Mellivora 由拉丁语 mel(蜜)与 vorare(吞食)构成,直译食蜜者,指其嗜食蜂蜜;种加词 capensis 意为好望角的。",
    discovery:
      "1776 年施雷贝尔定名;2010 年代分子研究证实其蛇毒耐受源于烟碱型受体突变,科普传播使其成为最著名的无畏动物。",
    genomeInfo: "暂缺高质量参考基因组;抗蛇毒的烟碱型乙酰胆碱受体突变与厚皮结构蛋白是现阶段分子研究焦点。",
    ecologyRole: "机会主义杂食者,掘食蜂蜜、蛇类、啮齿类与腐肉,翻动土壤促进种子萌发,被称为草原的翻土清道夫。",
    researchValue: "蛇毒耐受受体突变为抗毒机制演化的范本;厚皮结构与无畏行为生态学具仿生与行为研究价值。",
    tags: ["明星物种"],
  },
  {
    rank: "genus",
    latin: "Mustela",
    chinese: "鼬属",
    parent: "Mustelidae",
    description:
      "鼬属为小型鼬类,体细长敏捷,以鼠类为主食而食量惊人,北纬种群冬季毛色转白,含伶鼬、白鼬、黄鼬与家养化雪貂等约十七种。",
  },
  {
    rank: "species",
    latin: "Mustela nivalis",
    chinese: "伶鼬",
    authority: "Linnaeus, 1758",
    parent: "Mustela",
    description:
      "伶鼬是世界上体型最小的食肉目动物,雌体仅三十克上下,却能猎杀数倍体重的野兔与鼠类。它代谢极高、昼夜巡猎不休,北方种群冬季毛色转白与雪原浑然一体,是小型食肉动物能量学与雪地隐蔽色适应的经典研究对象。",
    morphology: "体细长,体长 13-26 厘米,尾短,夏毛背褐腹白,寒地种群冬季全身转白仅尾尖留黑,吻颌狭长而犬齿锐利。",
    habitat: "栖于草原、农田、林缘与山地灌丛,昼夜均活动,依赖高代谢持续捕猎,以小型啮齿类为主食。",
    distribution: "广布北美、欧亚大陆与北非,是全球分布最广的鼬类之一。",
    conservation: "LC",
    etymology:
      "属名 Mustela 为拉丁语鼬;种加词 nivalis 意为雪的,指其北方种群冬季的雪白毛色。",
    discovery:
      "1758 年林奈定名;其极小体型与极高代谢的经典生理学研究贯穿二十世纪,为体型与代谢率异速生长定律提供关键数据。",
    genomeInfo: "与家养雪貂同属,可借其约 2.4 Gb 参考基因组开展比较研究,本种体型演化的遗传基础尚待解析。",
    ecologyRole: "鼠类种群的关键天敌,被视为天然生物防治力量;亦为猛禽与大型鼬类的猎物,居食物链中枢纽带。",
    researchValue: "最小食肉动物的能量学与体型演化研究模型;其在欧洲与新西兰的引入史亦为入侵生态学案例。",
    tags: ["生物防治物种"],
  },
  {
    rank: "genus",
    latin: "Nyctereutes",
    chinese: "貉属",
    parent: "Canidae",
    description:
      "貉属为东亚犬科动物,形圆钝似浣熊而面部具黑纹,冬季囤脂休眠,是犬科中罕见的冬眠种类,现仅貉一种。",
  },
  {
    rank: "species",
    latin: "Nyctereutes procyonoides",
    chinese: "貉",
    authority: "(Gray, 1834)",
    parent: "Nyctereutes",
    description:
      "貉是东亚特有的犬科动物,形似浣熊,冬季囤积脂肪入洞穴休眠,是犬科中罕见的冬眠者。二十世纪为毛皮业被大规模引入苏联欧洲部分,后扩散为全欧洲的入侵种群;在中国上海,貉定居城市小区的现象使其成为都市野生动物共存研究的国民级案例。",
    morphology: "体长 50-70 厘米,体粗钝而腿短,面部黑褐色面罩纹,颊毛长而蓬松,尾粗下垂,冬毛厚实。",
    habitat: "栖于平原林地、湿地苇丛与丘陵,夜行杂食,主食啮齿类、果实与两栖类;城市种群栖于绿地与小区。",
    distribution: "原产东亚的中国、日本、朝鲜半岛与俄罗斯远东;二十世纪引入欧洲后广布北欧至巴尔干。",
    conservation: "LC",
    etymology:
      "属名 Nyctereutes 源自希腊语 nyx(夜)与 ereutes(游荡者),意为夜游者;种加词 procyonoides 意为似浣熊的。",
    discovery:
      "1834 年格雷依中国标本定名;1930 至 1950 年代苏联为毛皮业引入逾九千只至欧洲,如今成为欧陆最成功的入侵食肉动物。",
    genomeInfo: "全基因组近年已发表;犬科中独特的冬眠习性与杂食适应成为其基因组学研究的焦点方向。",
    ecologyRole: "湿地与林缘的杂食者,传播种子并捕食两栖类;欧洲入侵种群危害水鸟与两栖类,是入侵管理重点。",
    researchValue: "犬科冬眠与杂食适应的研究模型;上海城市貉调查成为中国公众科学与城市共存研究的旗舰项目。",
    tags: ["入侵物种", "城市野生动物"],
  },
  // ===================== 有鳞目 Squamata =====================
  {
    rank: "family",
    latin: "Colubridae",
    chinese: "游蛇科",
    parent: "Squamata",
    description:
      "游蛇科为有鳞目最大的科,含约两千种典型蛇类,齿型多样而多无前沟牙,食性极广,部分后沟牙种类具医学意义毒性,广布各大陆。",
  },
  {
    rank: "genus",
    latin: "Rhabdophis",
    chinese: "颈槽蛇属",
    parent: "Colubridae",
    description:
      "颈槽蛇属为东亚至南亚蛇类,后颈具特化的颈槽腺,能富集蟾蜍毒素作化学防御,主食蛙蟾,含虎斑颈槽蛇等近三十种。",
  },
  {
    rank: "species",
    latin: "Rhabdophis tigrinus",
    chinese: "虎斑颈槽蛇",
    authority: "(Boie, 1826)",
    parent: "Rhabdophis",
    description:
      "虎斑颈槽蛇是中国最常见的颈槽蛇,颈背具槽腺,捕食蟾蜍后将蟾毒富集于腺体,遇天敌昂颈喷射防御,是动物界「食毒用毒」的经典案例。它看似温驯实则具后沟牙毒液,日本曾有致人死亡的记录;毒素来源与母体向卵转移毒素的机制使其成为化学防御生态学的模式蛇。",
    morphology: "体长 60-90 厘米,背面翠绿具黑斑,颈背正中具一对纵沟腺,受惊时昂颈膨腺,腹面黄白色,头椭圆形。",
    habitat: "栖于平原水田、溪流与池塘周边,善游泳,晨昏活动,主食蛙类与蟾蜍,亦食鱼类与小型啮齿类。",
    distribution: "分布于东亚,自俄罗斯远东、中国大部至日本、朝鲜半岛与越南北部。",
    conservation: "LC",
    etymology:
      "属名 Rhabdophis 由希腊语 rhabdos(棒)与 ophis(蛇)构成;种加词 tigrinus 意为虎斑的,指其颈背斑纹。",
    discovery:
      "1826 年博依定名;2000 年代证实其颈槽腺毒素源自猎物蟾蜍并能跨代传给后代,成为化学防御研究的里程碑。",
    genomeInfo: "基因组数据尚有限;毒素的吸收、储存与传代生理学以化学分析与同位素示踪为主要研究工具。",
    ecologyRole: "水田与湿地食物链的中间环节,压制蛙蟾种群;颈腺毒素驱使天敌回避,构成利用猎物毒素的经典三角关系。",
    researchValue: "化学防御生态学的模式种;后沟牙毒液的医学重要性受毒理学关注,日本已研制对应抗蛇毒血清。",
    tags: ["化学防御经典", "有毒动物"],
  },
  {
    rank: "genus",
    latin: "Protobothrops",
    chinese: "原矛头蝮属",
    parent: "Viperidae",
    description:
      "原矛头蝮属为亚洲蝰科毒蛇,头呈长三角而吻端上翘,具管牙与热感受窝,毒液以血循毒素为主,含原矛头蝮与莽山原矛头蝮等十余种。",
  },
  {
    rank: "species",
    latin: "Protobothrops mangshanensis",
    chinese: "莽山原矛头蝮",
    authority: "(Zhao, 1990)",
    parent: "Protobothrops",
    description:
      "莽山原矛头蝮俗称莽山烙铁头,仅见于湘粤交界的莽山局部林区,通体墨绿衬黄褐网纹,头部三角如烙铁,野外数量仅数百条,被称为「蛇中大熊猫」。1990 年定名后长期遭黑市炒作与盗猎,现已升为国家一级保护,是明星级的旗舰蛇类。",
    morphology: "体长可达 2 米,头大呈三角而吻端上翘,体背墨绿具黄褐色不规则网纹,瞳纵置,尾端黄白色可摆动诱饵。",
    habitat: "栖于海拔 700-1300 米的常绿阔叶林山溪附近,夜行,以伏击方式捕食小型哺乳类与鸟类。",
    distribution: "仅分布于湖南莽山与粤北接壤的狭窄山区,分布面积不足百平方公里,中国特有。",
    conservation: "CR",
    etymology:
      "属名 Protobothrops 意为原始的矛头蝮;种加词 mangshanensis 取自模式产地湖南莽山,俗名烙铁头喻其头形。",
    discovery:
      "1990 年赵尔宓依莽山标本定名为莽山烙铁头,后移入原矛头蝮属;「蛇博士」陈远辉长期守护该物种并多次为蛇伤所困。",
    genomeInfo: "毒腺转录组研究已揭示其毒素基因构成;全基因组尚未发表,保护遗传学依赖线粒体与微卫星标记。",
    ecologyRole: "莽山山地顶级伏击型捕食者,调控林下啮齿类;其稀有性与明星效应使其成为南岭保护的伞护物种。",
    researchValue: "中国蛇类保护的旗舰物种;毒素组学与人工繁育研究为其资源化保护提供路径。",
    tags: ["国家一级保护", "中国特有", "旗舰物种"],
  },
  {
    rank: "genus",
    latin: "Vipera",
    chinese: "蝰属",
    parent: "Viperidae",
    description:
      "蝰属为欧洲至西亚的蝰蛇类,体型粗短,头背覆细鳞而非大盾,多为胎生而耐寒,极北蝰是唯一深入北极圈越冬的蛇类,含约二十种。",
  },
  {
    rank: "species",
    latin: "Vipera berus",
    chinese: "极北蝰",
    authority: "(Linnaeus, 1758)",
    parent: "Vipera",
    description:
      "极北蝰是地球上分布最北的蛇,在斯堪的纳维亚深入北极圈,以胎生方式繁殖,仔蛇产出即可捕食。它毒液温和而性情沉稳,是英国唯一的毒蛇,咬伤多肿胀疼痛但罕见致命;冰期后自南方避难所快速再殖民的遗传轨迹,使其成为种群历史重建的经典物种。",
    morphology: "体粗短,长 50-70 厘米,头背覆细鳞,背具深色锯齿状之字形纵带,体色自铜灰至黑化多变。",
    habitat: "栖于荒原、石楠灌丛与山麓石坡,耐寒性极强,春季出蛰后长时间晒背,胎生,以小型啮齿类为主食。",
    distribution: "分布自西欧经欧亚大陆至太平洋沿岸的库页岛,北入北极圈,是分布范围最广的蛇种之一。",
    conservation: "LC",
    etymology:
      "属名 Vipera 为拉丁语蝰蛇,一说由 vivus(活的)与 parere(生产)构成,指其胎生;种加词 berus 为其古名。",
    discovery:
      "1758 年林奈定为 Coluber berus,后归蝰属;分子谱系揭示其在欧洲经多个避难所冰后迅速扩张,是冰川后再殖民遗传学的经典案例。",
    genomeInfo: "基因组约 1.7 Gb;线粒体谱系地理研究深入,清晰重构了冰期避难所与冰后扩张路线。",
    ecologyRole: "北方生态系统的伏击型捕食者,压制田鼠种群,自身是猛禽与哺乳类天敌的重要猎物。",
    researchValue: "蛇类耐寒生理与种群基因组学模型;作为英国仅存毒蛇,其物种行动计划是公众保育教育的样本。",
    tags: ["耐寒物种"],
  },
  {
    rank: "genus",
    latin: "Deinagkistrodon",
    chinese: "尖吻蝮属",
    parent: "Viperidae",
    description:
      "尖吻蝮属为单型属,吻端尖而上翘,背具菱形斑块,毒液富含出血与抗凝成分,代表种尖吻蝮是中国南方文化意涵最深的毒蛇。",
  },
  {
    rank: "species",
    latin: "Deinagkistrodon acutus",
    chinese: "尖吻蝮",
    authority: "(Günther, 1888)",
    parent: "Deinagkistrodon",
    description:
      "尖吻蝮俗称五步蛇,吻尖上翘,背具一列菱形斑纹,毒液以出血与抗凝为主,咬伤常致严重肿胀与凝血紊乱。其干燥全体入药称「蕲蛇」,载于《本草纲目》沿用至今,蛇毒提取的去纤制剂曾广泛用于血栓疾病,是集生态、医药与文化于一身的明星毒蛇。",
    morphology: "体长 1-1.5 米,头大呈三角,吻端尖突上翘,背具一列深色菱形斑块,腹白,尾尖具角质尖刺。",
    habitat: "栖于海拔 100-1300 米的山地溪谷、茶园与林缘,白日蛰伏夜出,伏击猎物,闷热雨前活动尤频。",
    distribution: "分布于中国长江以南各省及台湾,南延至越南北部,是华南山地的代表性毒蛇。",
    etymology:
      "属名 Deinagkistrodon 由希腊语 deinos(可怖)与 agkistrodon(蝮蛇)构成;种加词 acutus 意为尖锐的,指其翘吻。",
    discovery:
      "1888 年贡特依中国标本定名;李时珍《本草纲目》已详载蕲蛇疗效,因蕲州所产得名,数百年药用史影响深远。",
    genomeInfo: "毒腺转录组与毒液蛋白组研究充分;去纤酶样组分为长效降纤药物开发的经典来源。",
    ecologyRole: "南方山地溪谷的伏击型捕食者,压制啮齿类种群;长期药用捕捉曾使局部种群显著衰退。",
    researchValue: "传统名贵药材蕲蛇的来源种;毒液降纤组分曾开发为治疗血栓性疾病的酶制剂,医教价值兼备。",
    tags: ["药用物种", "有毒动物"],
  },
  {
    rank: "family",
    latin: "Agamidae",
    chinese: "鬣蜥科",
    parent: "Squamata",
    description:
      "鬣蜥科为旧大陆蜥蜴大科,体多侧扁而具鬣鳞或喉囊,日行性,体色与体温的行为调节敏捷,含飞蜥、沙蜥与鬃狮蜥等逾四百种。",
  },
  {
    rank: "genus",
    latin: "Pogona",
    chinese: "鬃狮蜥属",
    parent: "Agamidae",
    description:
      "鬃狮蜥属为澳大利亚干旱区的中型鬣蜥,受惊时膨喉竖刺如狮鬣,日行地栖,含八种,中部鬃狮蜥是全球最流行的爬宠之一。",
  },
  {
    rank: "species",
    latin: "Pogona vitticeps",
    chinese: "鬃狮蜥",
    authority: "(Ahl, 1926)",
    parent: "Pogona",
    description:
      "鬃狮蜥是澳大利亚干旱灌丛的中型鬣蜥,受威胁时鼓起带刺喉囊摆出狮鬣架势,以温顺性格成为全球第一爬宠。爬行动物学界更看重它的染色体:极端高温可使 ZZ 遗传型胚胎反转为功能性雌性,由此引发的野生性别比失衡是气候变暖影响爬行类最直接的案例。",
    morphology: "体长约 20 厘米,体侧扁,头三角形,颈侧与喉部具成列刺鳞,受惊时喉囊膨大变黑竖刺,体色多变。",
    habitat: "栖于澳大利亚内陆干旱灌丛与疏林,白昼活动,占据树杈、岩桩与倒木,晒背规律,杂食偏虫。",
    distribution: "原产澳大利亚中部与东部干旱带;因宠物贸易繁育出众多品系,人工种群遍布全球。",
    etymology:
      "属名 Pogona 源自希腊语 pogonias(须鬃),指其喉部刺鬣;种加词 vitticeps 由拉丁语 vitta(条纹)与 ceps(头)构成。",
    discovery:
      "1926 年阿尔定名;1990 年代起成为全球主流爬宠,2015 年前后其高温诱发遗传雄性表型反转的研究引发全球关注。",
    genomeInfo: "全基因组约 1.9 Gb,已发表;具 ZZ/ZW 性染色体,极端高温可令 ZZ 胚胎发育为可育雌性并传代改变性决定方式。",
    ecologyRole: "干旱内陆杂食性蜥蜴,捕食昆虫并取食花叶,自身为猛禽与蛇类的重要猎物。",
    researchValue: "温度与遗传双通道性别决定研究的核心物种;点头挥手等社交信号亦是蜥蜴行为学的经典系统。",
    tags: ["观赏动物", "模式生物"],
  },
  {
    rank: "family",
    latin: "Iguanidae",
    chinese: "美洲鬣蜥科",
    parent: "Squamata",
    description:
      "美洲鬣蜥科为新大陆中大型鬣蜥,背具立列鬣鳞,喉垂发达,多为植食性,头顶具感光的第三只眼,含绿鬣蜥与海鬣蜥等约四十种。",
  },
  {
    rank: "genus",
    latin: "Iguana",
    chinese: "美洲鬣蜥属",
    parent: "Iguanidae",
    description:
      "美洲鬣蜥属为中大型植食鬣蜥,喉垂片大而背鬣显著,栖中南美洲热带,绿鬣蜥为广布代表,近年自复合体细分出多个种。",
  },
  {
    rank: "species",
    latin: "Iguana iguana",
    chinese: "绿鬣蜥",
    authority: "Linnaeus, 1758",
    parent: "Iguana",
    description:
      "绿鬣蜥是中南美洲雨林标志性的大型植食蜥蜴,幼体翠绿善攀,成体连尾可逾 1.5 米,靠发达的后肠发酵消化叶食,并以盐腺「打喷嚏」排出多余盐分。它是 CITES 附录 II 物种与全球最热门爬宠之一,亦因弃养在佛罗里达等地建立入侵种群而酿成经济损失。",
    morphology: "连尾体长可达 1.5-2 米,体具一列立状背鬣,喉垂片大而下垂,鼓膜显著,幼体鲜绿,成体灰绿至橙调。",
    habitat: "栖于热带雨林与疏林河岸,善攀高晒阳,遇险坠水潜泳遁走,成体主食叶片、花与果实。",
    distribution: "原产墨西哥至南美热带与加勒比;弃养与逃逸种群见于美国佛罗里达、波多黎各与斐济等地。",
    etymology:
      "属名与种加词同为 Iguana,源出加勒比原住民语言对鬣蜥的称谓,是林奈沿用最早的动物土名之一。",
    discovery:
      "1758 年林奈定名;近十年物种复合体被重新细分,中美种群陆续分立为新种,原概念收敛为南美核心种群。",
    genomeInfo: "全基因组约 1.8 Gb;作为美洲鬣蜥类的基因组锚点之一,支撑鬣蜥类演化与植食适应研究。",
    ecologyRole: "雨林大型植食者与种子传播者;北美入侵种群掘洞损伤堤岸,咬断电缆造成基础设施损失。",
    researchValue: "脊椎动物植食适应与肠道菌群发酵的研究模型;爬宠产业与入侵生物学的双重研究题材。",
    tags: ["入侵物种", "观赏动物"],
  },
  // ===================== 龟鳖目 Testudines =====================
  {
    rank: "genus",
    latin: "Mauremys",
    chinese: "拟水龟属",
    parent: "Geoemydidae",
    description:
      "拟水龟属为东亚淡水龟类,甲壳低平,头背光滑,栖河湖缓流而食性杂,含乌龟、黄喉拟水龟与安南龟等,受盗猎与种间杂交渗入威胁严重。",
  },
  {
    rank: "species",
    latin: "Mauremys reevesii",
    chinese: "乌龟",
    authority: "(Gray, 1831)",
    parent: "Mauremys",
    description:
      "乌龟即俗称的中华草龟,是中国分布最广、文化意涵最深的淡水龟,背甲具三棱,雄性成体渐墨化称「墨龟」。它长期充当观赏、食用与龟甲药材的来源,过度捕捉使野生种群剧减,IUCN 评估为濒危;与近缘种的人为杂交渗入又给纯种存续雪上加霜。",
    morphology: "甲长 10-15 厘米,椭圆形,背甲具三条纵棱而雄性成体棱弱,头背平滑,雄性墨黑,腹甲常具黑斑。",
    habitat: "栖于江河湖沼缓流与稻田沟渠,半水栖而杂食,晒背习性显著,冬季潜入泥中冬眠。",
    distribution: "分布于中国南北各省、朝鲜半岛、日本与越南北部;人工养殖量极大,亦有归化种群。",
    conservation: "EN",
    etymology:
      "属名 Mauremys 词源不明,一说关联地中海地名;种加词 reevesii 纪念英国博物学家约翰·里夫斯,其向西方输送了大量中国标本。",
    discovery:
      "1831 年格雷依里夫斯所获中国标本定名;因龟板入药与宠物、食用的长期压力,野生资源自二十世纪后期起持续萎缩。",
    genomeInfo: "全基因组约 2.4 Gb,染色体级组装已发表;其温度与遗传型并存的性别决定机制是龟类研究核心平台。",
    ecologyRole: "淡水缓流生态系统的杂食者,摄食螺类、水草与腐屑;放生文化使其种群动态与人为活动深度交织。",
    researchValue: "传统药材龟板的法定来源之一;性别决定机制与龟类衰老研究的重要模型,亦是放生伦理议题的标志性物种。",
    tags: ["药用物种", "文化物种"],
  },
  {
    rank: "genus",
    latin: "Pelochelys",
    chinese: "鼋属",
    parent: "Trionychidae",
    description:
      "鼋属为亚洲超大型鳖类,吻突宽钝,背甲覆柔软皮肤而骨骼笨重,栖大江深潭,古称鼋,含鼋等约三种,野外均近乎绝迹。",
  },
  {
    rank: "species",
    latin: "Pelochelys cantorii",
    chinese: "鼋",
    authority: "Gray, 1864",
    parent: "Pelochelys",
    description:
      "鼋是亚洲江河中体型最大的鳖,背盘可逾一米、体重可达百公斤,吻部宽钝,深潜底沙伏击鱼类。它在中国文化中承载「系鼋以白璧」的典故与癞头鼋的俗称,近半世纪因捕捞、河床采砂与水利建设,长江珠江水系的野生个体近乎绝迹,名列全球最受威胁的龟鳖。",
    morphology: "背盘长 1-1.3 米,重可达 100 公斤以上,吻突宽钝不及眼径之半,背甲覆柔软皮肤,体灰褐,颈缩有力。",
    habitat: "栖于大江大河干流深潭与缓沙河床,深居水底,偶浮水面换气,昼伏夜出捕食鱼类与甲壳类。",
    distribution: "历史分布于中国长江、珠江流域及东南亚至印度南部的大河水系,现存记录零星。",
    conservation: "CR",
    etymology:
      "属名 Pelochelys 由希腊语 pelos(泥)与 chelys(鳖)构成,意为居泥之鳖;种加词 cantorii 纪念丹麦博物学家坎托尔。",
    discovery:
      "1864 年格雷依坎托尔采集的亚洲标本定名;近年分子研究主张亚洲各水系种群隐存分种,其系统学仍在修订中。",
    genomeInfo: "线粒体基因组已测序并用于鳖类系统发育;全基因组尚未发表,保护遗传学依赖稀少样本的分子标记。",
    ecologyRole: "大河底栖的顶级伏击捕食者,吞食鱼类与动物尸骸;营巢于沙洲,产卵活动联通水陆营养循环。",
    researchValue: "全球极危龟鳖旗舰物种,圈养个体极度稀缺,其繁育探索代表大型鳖类保护的最后机会。",
    tags: ["国家一级保护", "旗舰物种"],
  },
  {
    rank: "family",
    latin: "Testudinidae",
    chinese: "陆龟科",
    parent: "Testudines",
    description:
      "陆龟科为完全陆栖龟类,背甲高隆而四肢圆柱具鳞,植食为主,寿命极长,自沙漠到雨林皆有分布,含象龟与陆龟五十余种。",
  },
  {
    rank: "genus",
    latin: "Testudo",
    chinese: "陆龟属",
    parent: "Testudinidae",
    description:
      "陆龟属为地中海至中亚的中小型陆龟,背甲高隆,四肢具蹄状鳞,冬眠或夏眠依气候,模式种希腊陆龟由林奈定名,含五种左右。",
  },
  {
    rank: "species",
    latin: "Testudo horsfieldii",
    chinese: "四爪陆龟",
    authority: "Gray, 1844",
    parent: "Testudo",
    description:
      "四爪陆龟以四肢均仅四爪而得名,是中亚荒漠草原的耐寒陆龟,春季短暂活动后夏眠又冬眠,一年活跃不足四个月。在中国仅存于新疆伊犁河谷的极小区域,个体数曾跌至数百,被列为国家一级保护动物,是中亚荒漠龟类保育的缩影。",
    morphology: "背甲长 15-25 厘米,圆隆而黄褐,前后肢各具四爪而别于他种陆龟的五爪,头部覆鳞,遇险可缩壳内。",
    habitat: "栖于黄土荒漠草原与山麓,春雪融后集中活动繁殖,盛夏掘穴夏眠,冬季深眠,主食草叶与花。",
    distribution: "分布自里海东岸经中亚至中国新疆霍城,在中国仅存一孤立小种群,列为国家一级保护野生动物。",
    conservation: "VU",
    etymology:
      "属名 Testudo 为拉丁语龟;种加词 horsfieldii 纪念美国博物学家霍斯菲尔德,其长期在亚洲采集并研究陆龟。",
    discovery:
      "1844 年格雷定名;中国种群于二十世纪七十至八十年代调查仅存约两千只,后经保护区与人工繁育缓慢回升。",
    genomeInfo: "基因组资源近年建立;中亚干旱适应与长寿性状的比较研究以近缘地中海陆龟基因组为参照。",
    ecologyRole: "荒漠草原的植食者与种子传播者,洞穴为蜥蜴与甲虫提供微生境,被视为荒漠生态的表征物种。",
    researchValue: "中国最濒危龟类之一,是边疆物种保护与气候变化下荒漠生态系统监测的旗舰对象。",
    tags: ["国家一级保护", "耐寒物种"],
  },
  // ===================== 有尾目 Caudata =====================
  {
    rank: "genus",
    latin: "Echinotriton",
    chinese: "棘螈属",
    parent: "Salamandridae",
    description:
      "棘螈属为东亚蝾螈,肋骨尖端可穿出体侧形成棘状防御,体背疣粒粗糙,含镇海棘螈与琉球棘螈等,皆为濒危孑遗种。",
  },
  {
    rank: "species",
    latin: "Echinotriton chinhaiensis",
    chinese: "镇海棘螈",
    authority: "(Chang, 1932)",
    parent: "Echinotriton",
    description:
      "镇海棘螈是全球分布区最狭窄的两栖动物之一,仅存于浙江宁波沿海数平方公里的低山丘陵,体黑而肋侧具疣状棘突。1932 年定名后一度销声遁迹半个世纪,1980 年代被重新发现,野生总数估计仅数百尾,列为国家一级保护,是中国两栖保护的旗舰物种。",
    morphology: "体长 11-15 厘米,体粗壮,背黑褐而侧腹具橙斑,肋背一列疣粒状棘突受惊时可刺出,尾侧扁。",
    habitat: "栖于海拔 100-200 米丘陵的常绿林下静水塘与沼泽,非繁殖期陆栖隐匿石下腐木,春雨夜入水产卵。",
    distribution: "仅分布于浙江宁波镇海、北仑沿海极小区域,全球分布面积不足十平方公里,中国特有。",
    conservation: "CR",
    etymology:
      "属名 Echinotriton 由希腊语 echinos(棘)与 Triton(蝾螈)构成;种加词 chinhaiensis 取自模式产地浙江镇海。",
    discovery:
      "1932 年张孟闻定名,此后数十年未见踪迹,1980 年代初被重新发现;现存小种群依赖人工扩繁与栖息地严格保护。",
    genomeInfo: "线粒体基因组与微卫星研究揭示其遗传多样性极低;全基因组测序已列入保护研究规划。",
    ecologyRole: "丘陵湿地的两栖捕食者,捕食螺类、蠕虫与昆虫;卵与幼体是静水塘生态链的重要组成。",
    researchValue: "分布极窄的孑遗两栖类,为小种群灭绝旋涡与保护遗传学研究提供教科书案例。",
    tags: ["国家一级保护", "中国特有", "旗舰物种"],
  },
  {
    rank: "genus",
    latin: "Salamandra",
    chinese: "蝾螈属",
    parent: "Salamandridae",
    description:
      "蝾螈属为欧洲黑底黄斑的蝾螈,皮腺分泌沙曼达林类生物碱,警示色显著,繁殖方式自溪流产幼到卵胎生皆有,含十余种。",
  },
  {
    rank: "species",
    latin: "Salamandra salamandra",
    chinese: "火蝾螈",
    authority: "(Linnaeus, 1758)",
    parent: "Salamandra",
    description:
      "火蝾螈黑身黄斑,是欧洲最经典的警示色两栖类,皮肤分泌强心甾类生物碱御敌。多数种群在溪流产下已发育的幼螈,某些亚种甚至直接产下陆生幼体,繁殖模式变异丰富;2013 年前后壶菌 Bsal 在荷兰致其种群骤减逾九成,使其成为两栖疫病全球警戒的旗舰。",
    morphology: "体长 15-20 厘米,通体黑亮具鲜黄斑块,个别种群黄黑相反,背腺隆起,眼突出,尾圆柱状而四肢短壮。",
    habitat: "栖于湿润山地的落叶林溪谷,昼伏夜出,雨后活动频繁,幼体春季发育于清洁溪流,成体陆栖。",
    distribution: "分布自西欧至中东的山地,中欧与南欧为分布中心,亚种分化多达十余个。",
    conservation: "LC",
    etymology:
      "属名与种加词同为 Salamandra,为拉丁语借自希腊语的蝾螈古名,传说其穿火不焚,故中文称火蝾螈。",
    discovery:
      "1758 年林奈定为 Lacerta salamandra 后归蝾螈属;2013 年荷兰种群因 Bsal 壶菌暴跌九成余,该真菌经宠物贸易扩散,推动欧洲两栖检疫立法。",
    genomeInfo: "两栖类基因组普遍庞大而本种资源仍在建设;Bsal 疫病研究依赖群体基因组与转录组数据。",
    ecologyRole: "林地无脊椎动物捕食者,控制蜗牛、蠕虫与昆虫;毒素令多数天敌回避,自身面临疫病与栖息地破碎化。",
    researchValue: "警示色与毒素生态的经典教材物种;Bsal 疫病模型使其成为全球两栖疫病防控研究的核心。",
    tags: ["疫病指示种", "有毒动物"],
  },
  // ===================== 无尾目 Anura =====================
  {
    rank: "family",
    latin: "Dicroglossidae",
    chinese: "叉舌蛙科",
    parent: "Anura",
    description:
      "叉舌蛙科为亚洲南部与非洲的蛙类,舌呈叉状而得名,骨骼结构特殊,含虎纹蛙、棘蛙与大绿蛙等,多为山溪或稻田的强壮蛙类。",
  },
  {
    rank: "genus",
    latin: "Hoplobatrachus",
    chinese: "虎纹蛙属",
    parent: "Dicroglossidae",
    description:
      "虎纹蛙属为亚洲大型蛙类,体粗壮而四肢发达,背具肤棱似虎纹,昼伏夜出而性凶猛,含虎纹蛙等数种,多为重要食用蛙。",
  },
  {
    rank: "species",
    latin: "Hoplobatrachus rugulosus",
    chinese: "虎纹蛙",
    authority: "(Wiegmann, 1834)",
    parent: "Hoplobatrachus",
    description:
      "虎纹蛙是中国体型最大的蛙类之一,体可逾 10 厘米,背侧肤棱纵横如虎纹,性凶猛,可吞食鼠类与雏鸟。肉质细嫩而称田鸡,在中国列为国家二级保护野生动物,人工养殖缓解了野外捕捉压力;东南亚种群持续下降,IUCN 评估为近危。",
    morphology: "体长 6-12 厘米,体粗壮而吻尖,背面橄榄褐具肤棱与深色虎纹,指趾端钝,后肢粗壮善跳善泳。",
    habitat: "栖于稻田、池塘与沟渠静水,白昼匿于泥洞草丛,夜出捕食,冬季潜入泥穴冬眠。",
    distribution: "分布于中国长江以南各省、台湾与海南,南至中南半岛的广大东南亚地区。",
    conservation: "NT",
    etymology:
      "属名 Hoplobatrachus 由希腊语 hoplon(甲具)与 batrachos(蛙)构成,指其粗糙肤棱;种加词 rugulosus 意为多皱的。",
    discovery:
      "1834 年维格曼定名;因肉质鲜美长期遭大量捕捉,中国于 1989 年将其列入国家二级保护并发展人工养殖。",
    genomeInfo: "种质资源研究以微卫星与线粒体标记为主,支撑养殖群体与野生资源的遗传区分管理。",
    ecologyRole: "稻田湿地食物链的顶端蛙类,捕食昆虫、小鱼乃至小型鼠类,亦为蛇类与鹭鸟所捕食,是农田生态指示物种。",
    researchValue: "集经济食用蛙与保护物种于一身,是两栖资源可持续利用与养殖遗传学研究的代表。",
    tags: ["国家二级保护", "经济物种"],
  },
  {
    rank: "genus",
    latin: "Quasipaa",
    chinese: "棘蛙属",
    parent: "Dicroglossidae",
    description:
      "棘蛙属为中国至东南亚的山溪蛙类,雄蛙胸腹部具锥状角质刺,繁殖期抱对紧扣,俗称石蛙,肉质鲜美而遭高强度捕捉。",
  },
  {
    rank: "species",
    latin: "Quasipaa spinosa",
    chinese: "棘胸蛙",
    authority: "(David, 1875)",
    parent: "Quasipaa",
    description:
      "棘胸蛙俗称石蛙,是华中至华南山溪中的大型蛙类,雄蛙胸部密布黑色角质刺,鸣声低沉如击木。因肉质被推崇为蛙中之王而长期遭高强度捕捉,种群显著下降,IUCN 列为易危,人工养殖虽有规模但门槛高,山溪水电开发亦不断压缩其生境。",
    morphology: "体长 8-12 厘米,体粗壮,背面棕色散布深色疣粒,雄蛙胸腹具锥状黑刺,后肢粗壮适于山溪攀爬。",
    habitat: "栖于海拔 300-1500 米的山溪与瀑布潭,喜阴凉急流,昼匿石穴夜出,低温下生长缓慢。",
    distribution: "分布于中国华中、华南与西南山地的清洁溪流,越南北部亦有记录。",
    conservation: "VU",
    etymology:
      "属名 Quasipaa 意为近似 Paa 属,paa 为尼泊尔土语蛙;种加词 spinosa 意为多刺的,指雄蛙胸部的角质刺。",
    discovery:
      "1875 年法国博物学家谭微道(戴维)依中国标本定名;作为石蛙的商品捕捉持续至今,野生资源逐年萎缩。",
    genomeInfo: "全基因组尚未发表,种质鉴定与种群遗传研究以线粒体序列与微卫星标记为主。",
    ecologyRole: "山溪生态系统的高级消费者,捕食水生昆虫与螺类,对水质极为敏感,是溪流健康的指示种。",
    researchValue: "名贵食用蛙养殖的核心候选,是山溪蛙类资源衰退与养殖遗传管理研究的代表物种。",
    tags: ["经济物种", "溪流指示种"],
  },
  {
    rank: "family",
    latin: "Hylidae",
    chinese: "雨蛙科",
    parent: "Anura",
    description:
      "雨蛙科为树栖蛙科大科,指趾端具吸盘而善攀,多绿色,主产美洲与大洋洲,旧大陆仅雨蛙属等少数,雨后合唱嘹亮,含近千种。",
  },
  {
    rank: "genus",
    latin: "Hyla",
    chinese: "雨蛙属",
    parent: "Hylidae",
    description:
      "雨蛙属为旧大陆绿色树蛙,体小而指端具吸盘,雄蛙喉鸣囊发达,雨后群鸣嘹亮,含欧洲雨蛙与中国雨蛙等三十余种。",
  },
  {
    rank: "species",
    latin: "Hyla arborea",
    chinese: "欧洲雨蛙",
    authority: "(Linnaeus, 1758)",
    parent: "Hyla",
    description:
      "欧洲雨蛙通体黄绿、体侧具黑纹,是欧洲夜晚最嘹亮的雨后歌手,雄蛙鸣囊如气泡般鼓起,合唱可传数百米。其指端吸盘使它能攀上芦苇与灌木猎食昆虫;西欧湿地退化使局地种群下降,声通讯、合唱行为与配偶选择的经典研究都以它为模型。",
    morphology: "体长仅 3-5 厘米,背面鲜绿至黄绿可随环境变色,体侧具黑褐纵纹,腹面乳白,指趾端具圆吸盘。",
    habitat: "栖于湿地灌丛、芦苇与树篱,善攀栖于植物茎叶间,雨后与夜间鸣唱活跃,捕食小型昆虫。",
    distribution: "分布自法国经中东欧至西亚与高加索,西欧局地因湿地消失而种群退化。",
    conservation: "LC",
    etymology:
      "属名 Hyla 为拉丁语雨蛙,一说源自希腊语 hyle(森林);种加词 arborea 意为栖树的,指其树栖习性。",
    discovery:
      "1758 年林奈定为 Rana arborea,后归雨蛙属;其鸣声声学与合唱行为研究自二十世纪初持续至今。",
    genomeInfo: "线粒体基因组与种群遗传结构研究充分,全基因组资源尚在建设中。",
    ecologyRole: "灌丛与湿地的昆虫捕食者,夏季合唱是湿地声景观的核心,自身为蛇与鸟类的重要猎物。",
    researchValue: "两栖声通讯与性选择的经典研究物种,亦是欧洲两栖监测网络的指示种之一。",
    tags: ["湿地指示种"],
  },
];
