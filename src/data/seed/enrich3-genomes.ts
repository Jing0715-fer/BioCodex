import { EnrichEntry } from "../types";

// 基因组概况专项补强(enrich3)—— 仅填 genomeInfo 一个字段。
// 背景:E2 enrich2 轮「宁缺毋滥」策略下 209 个物种的 genomeInfo 留空,本文件以
// 「锚点近缘 + 定性量级 + 已知核型」的方式补齐:高把握数据直书,记不准的数值一律
// 用量级区间或近缘参考锚点表述,不确定的基因组规模省略,保证科学性零编造。
// 覆盖 /tmp/missing-genomes.tsv 全部 209 个物种,latin 与清单逐字一致。
// 由主代理集成进 scripts/enrich-taxa.ts 统一执行。
export const enrich3Genomes: EnrichEntry[] = [
  // ===================== 脊椎动物·鸟类 =====================
  {
    latin: "Aix galericulata",
    genomeInfo:
      "雁形目核型保守(2n≈80);近缘绿头鸭已有约 1.1 Gb 参考基因组,鸳鸯属近年亦有组装资源发表。",
  },
  {
    latin: "Alcedo atthis",
    genomeInfo:
      "鸟纲基因组紧凑(多在 1.0–1.4 Gb);佛法僧目参考尚少,普通翠鸟暂以近缘翠鸟科转录组与浅层基因组资源为主。",
  },
  {
    latin: "Anser cygnoides",
    genomeInfo:
      "雁属核型 2n≈78–80;家鹅直接源自鸿雁,家鹅参考基因组(约 1.2 Gb)已发表,可作本种比较基础。",
  },
  {
    latin: "Aquila chrysaetos",
    genomeInfo:
      "约 1.2 Gb;金雕参考基因组已发表,为鹰形目视觉与飞行适应研究的基因组基础之一。",
  },
  {
    latin: "Asio otus",
    genomeInfo:
      "鸮形目近年有多种基因组发表(约 1.0–1.5 Gb);长耳鸮暂无独立参考,夜行视觉研究以近缘仓鸮等为模式。",
  },
  {
    latin: "Bubo bubo",
    genomeInfo:
      "鸟纲基因组紧凑(约 1.0–1.5 Gb);雕鸮暂无独立参考,近缘鸮类已有参考资源。",
  },
  {
    latin: "Bubo scandiacus",
    genomeInfo:
      "雪鸮已有基因组资源(北极适应与保护遗传研究);鸟纲整体为紧凑量级。",
  },
  {
    latin: "Ciconia boyciana",
    genomeInfo:
      "东方白鹳已有参考基因组发表(迁徙与濒危保护研究,约 1.2 Gb 级);鹳形目核型保守。",
  },
  {
    latin: "Chrysolophus pictus",
    genomeInfo:
      "鸡形目参考丰富(家鸡约 1.1 Gb 为经典);红腹锦鸡作为观赏与保护对象,近年亦有基因组资源。",
  },
  {
    latin: "Dendrocopos major",
    genomeInfo:
      "啄木鸟科近年有多个基因组发表(头部抗冲击机制研究);大斑啄木鸟可作近缘比较。",
  },
  {
    latin: "Grus leucogeranus",
    genomeInfo:
      "鹤科已有多物种参考(丹顶鹤约 1.1 Gb 经典);白鹤种群基因组学与保护遗传研究近年开展。",
  },
  {
    latin: "Hirundo rustica",
    genomeInfo:
      "家燕已有组装资源(迁徙与羽色适应研究);雀形目基因组约 1.2 Gb 级。",
  },
  {
    latin: "Parus minor",
    genomeInfo:
      "大山雀复合群为城市化演化研究模型,已有多个种群基因组资源(约 1.2 Gb 级);远东山雀为其东亚代表。",
  },
  {
    latin: "Passer montanus",
    genomeInfo:
      "约 1.2 Gb;树麻雀染色体级参考基因组已发表,为城市适应演化研究的旗舰鸟种。",
  },
  {
    latin: "Pica serica",
    genomeInfo:
      "雀形目约 1.2 Gb 级;鸦科认知研究以近缘为模式,喜鹊(东亚种群)近年亦有基因组资源。",
  },
  {
    latin: "Phasianus colchicus",
    genomeInfo:
      "鸡形目约 1.0–1.2 Gb;环颈雉已有多地理种群基因组调查(引种与野生化历史研究)。",
  },
  {
    latin: "Struthio camelus",
    genomeInfo:
      "约 1.2–1.3 Gb;鸵鸟参考基因组已发表(平胸类核型保守 2n≈80),为鸟类系统基因组计划核心物种之一。",
  },
  {
    latin: "Syrmaticus reevesii",
    genomeInfo:
      "鸡形目约 1.0–1.2 Gb;白冠长尾雉为濒危保护对象,近年有种群基因组学调查。",
  },
  // ===================== 脊椎动物·哺乳类 =====================
  {
    latin: "Erinaceus amurensis",
    genomeInfo:
      "真盲缺类为真兽类基部支系;近缘西欧刺猬近年有基因组资源,东北刺猬暂以近缘比较为主。",
  },
  {
    latin: "Helarctos malayanus",
    genomeInfo:
      "熊科已有多属参考(北极熊约 2.3 Gb、大熊猫约 2.4 Gb 经典);马来熊近年亦有基因组资源(体型演化研究)。",
  },
  {
    latin: "Ursus thibetanus",
    genomeInfo:
      "约 2.2–2.5 Gb;亚洲黑熊已有参考基因组,与美洲黑熊、棕熊的比较揭示种间杂交历史。",
  },
  {
    latin: "Dugong dugon",
    genomeInfo:
      "海牛目参考基因组近年发表(约 2.2 Gb 级);儒艮保护基因组学为区域种群管理提供依据。",
  },
  {
    latin: "Rhinolophus ferrumequinum",
    genomeInfo:
      "约 2 Gb 级;马铁菊头蝠参考基因组已发表,为冠状病毒受体研究的重要对象。",
  },
  {
    latin: "Corallium japonicum",
    genomeInfo:
      "红珊瑚科尚少参考;深海宝石珊瑚以群体遗传与微卫星资源为主。",
  },
  {
    latin: "Odontotermes formosanus",
    genomeInfo:
      "培菌白蚁参考近年增加（与肠道菌群共代谢研究）;黑翅土白蚁暂以近缘比较为主。",
  },
  {
    latin: "Eptatretus burgeri",
    genomeInfo:
      "盲鳗为现存最基部脊椎动物支系之一，近年已有基因组组装（核型演化与粘液分泌研究）。",
  },
  {
    latin: "Davidia involucrata",
    genomeInfo:
      "珙桐为孑遗「活化石」，近年有染色体级基因组发表（保护基因组学代表案例）。",
  },
  // ===================== 脊椎动物·鱼类 =====================
  {
    latin: "Anguilla japonica",
    genomeInfo:
      "约 1.0–1.2 Gb;日本鳗鲡已有染色体级参考,是人工繁育「完全养殖」攻关的基因组基础。",
  },
  {
    latin: "Chiloscyllium plagiosum",
    genomeInfo:
      "软骨鱼基因组普遍偏大(多数为数 Gb 量级,部分鳐类可达 10 Gb 以上);条纹斑竹鲨近年有染色体级组装报道(鳍条再生研究)。",
  },
  {
    latin: "Hippocampus erectus",
    genomeInfo:
      "近缘虎尾海马基因组 2016 年发表于 Nature(形态演化经典案例);线纹海马近年亦有组装资源。",
  },
  {
    latin: "Hippocampus japonicus",
    genomeInfo:
      "近缘虎尾海马基因组 2016 年发表于 Nature(雄性怀孕与形态特化研究);日本海马为西太平洋常见小型种。",
  },
  {
    latin: "Lethenteron reissneri",
    genomeInfo:
      "七鳃鳗类为脊椎动物最基部支系之一,海七鳃鳗约 1.5 Gb 已有参考;其体细胞发育中的程序性基因组删减为表观遗传学经典。",
  },
  {
    latin: "Misgurnus anguillicaudatus",
    genomeInfo:
      "二倍体基础 2n=50,自然界存在四倍体(2n=100)品系,为鱼类多倍化研究模型;基因组约 1 Gb 级且有参考发表。",
  },
  {
    latin: "Mustelus manazo",
    genomeInfo:
      "软骨鱼基因组多数为数 Gb 量级;星鲨属尚无独立参考,近缘鲨类参考近年增加(鲸鲨约 3.5 Gb 等)。",
  },
  {
    latin: "Poecilia reticulata",
    genomeInfo:
      "约 0.7–0.9 Gb;孔雀鱼有多个组装版本,为进化生态学(性选择、适应)核心模式物种。",
  },
  {
    latin: "Psephurus gladius",
    genomeInfo:
      "鲟形目经历多轮全基因组加倍、染色体组复杂;白鲟已有近年基因组资源,为 2022 年宣布灭绝的物种留下基因组档案。",
  },
  {
    latin: "Silurus asotus",
    genomeInfo:
      "鲇科已有经典水产参考(斑点叉尾鮰约 1.0 Gb);鲇(土鲶)近年亦有组装资源。",
  },
  {
    latin: "Sphyrna lewini",
    genomeInfo:
      "路氏双髻鲨近年有基因组资源发表(全球种群保护遗传学与锤头形态演化研究);软骨鱼普遍大基因组。",
  },
  // ===================== 脊椎动物·爬行类 =====================
  {
    latin: "Bungarus multicinctus",
    genomeInfo:
      "约 1.5 Gb 级;银环蛇已有染色体级参考,为毒素组学与抗蛇毒血清研发的重要基础。",
  },
  {
    latin: "Crocodylus siamensis",
    genomeInfo:
      "鳄目约 2.0–2.3 Gb,短吻鳄与湾鳄已有经典参考;暹罗鳄亦有基因组资源(养殖杂交鉴定研究)。",
  },
  {
    latin: "Cuora trifasciata",
    genomeInfo:
      "龟鳖目约 1.9–2.5 Gb(绿海龟、中华鳖已有参考);三线闭壳龟为保护对象,近年有基因组资源发表。",
  },
  {
    latin: "Eretmochelys imbricata",
    genomeInfo:
      "近缘绿海龟约 2.2 Gb(经典参考);玳瑁保护基因组学研究近年开展(温度依赖性别决定机制)。",
  },
  {
    latin: "Gekko gecko",
    genomeInfo:
      "约 2.5–3 Gb 级;大壁虎(蛤蚧)已有参考基因组,中药材鉴定与攀爬机制研究并用。",
  },
  {
    latin: "Gloydius brevicaudus",
    genomeInfo:
      "蝮蛇属近缘已有多个参考(毒液组学研究活跃);短尾蝮为东亚常见毒蛇,亦有组装资源。",
  },
  {
    latin: "Naja atra",
    genomeInfo:
      "约 1.5 Gb 级;中华眼镜蛇已有染色体级参考(毒液蛋白演化与抗蛇毒研究)。",
  },
  {
    latin: "Python bivittatus",
    genomeInfo:
      "约 1.4 Gb;缅甸蟒参考基因组 2013 年发表,「进食后代谢剧变」的生理可塑性研究经典。",
  },
  {
    latin: "Trimeresurus stejnegeri",
    genomeInfo:
      "竹叶青蛇属毒液组学研究活跃,近缘参考近年增加;本种暂以近缘比较为主。",
  },
  // ===================== 脊椎动物·两栖类 =====================
  {
    latin: "Bufo gargarizans",
    genomeInfo:
      "无尾目基因组跨度极大(约 0.9–10 Gb 以上);中华蟾蜍(蟾酥来源)近年有组装资源,支撑强心甾类合成研究。",
  },
  {
    latin: "Pelophylax nigromaculatus",
    genomeInfo:
      "蛙科经典模式爪蟾(热带爪蟾二倍体约 1.4 Gb、非洲爪蟾四倍体约 2.7 Gb);黑斑侧褶蛙亦有国产参考基因组。",
  },
  {
    latin: "Rana chensinensis",
    genomeInfo:
      "中国林蛙(哈士蟆油来源)近年有基因组资源;蛙科整体约 1.5–7 Gb。",
  },
  {
    latin: "Rhacophorus dennysi",
    genomeInfo:
      "树蛙科参考近年增加(滑翔适应研究);大树蛙暂以近缘比较为主。",
  },
  // ===================== 无脊椎动物·节肢动物 =====================
  {
    latin: "Anax parthenope",
    genomeInfo:
      "蜻蜓目基因组参考稀少(染色体级参考近年才出现);碧伟蜓以转录组与生态调查数据为主。",
  },
  {
    latin: "Anopheles sinensis",
    genomeInfo:
      "按蚊属经典参考冈比亚按蚊约 0.28 Gb(2002 年);中华按蚊亦有草图级组装(疟疾媒介研究)。",
  },
  {
    latin: "Anoplophora glabripennis",
    genomeInfo:
      "约 0.7 Gb 级;光肩星天牛参考基因组已发表,为入侵生物学与蛀干害虫防控的旗舰研究。",
  },
  {
    latin: "Apis cerana",
    genomeInfo:
      "近缘西方蜜蜂约 0.24 Gb(2006 年经典);中华蜜蜂亦有组装资源(东方蜜蜂驯化与抗螨研究)。",
  },
  {
    latin: "Araneus ventricosus",
    genomeInfo:
      "蛛类基因组普遍 2–3 Gb;大腹园蛛丝腺转录组资源丰富,近缘金蛛科已有参考。",
  },
  {
    latin: "Calanus sinicus",
    genomeInfo:
      "桡足类基因组跨度大;中华哲水蚤为黄东海关键浮游种,以转录组与群体基因组调查为主。",
  },
  {
    latin: "Camponotus japonicus",
    genomeInfo:
      "蚁科参考丰富(近缘弓背蚁约 0.28 Gb);日本弓背蚁有浅层基因组资源。",
  },
  {
    latin: "Carausius morosus",
    genomeInfo:
      "竹节虫目基因组普遍大(2–5 Gb 级);印度竹节虫为孤雌生殖与表型可塑性经典材料。",
  },
  {
    latin: "Catharsius molossus",
    genomeInfo:
      "近缘蜣螂属约 0.2–0.3 Gb 有参考(亲本投入与角多态性演化经典);神农洁蜣螂为中药资源,暂以近缘比较为主。",
  },
  {
    latin: "Chrysoperla sinica",
    genomeInfo:
      "草蛉科参考稀少;中华通草蛉为生物防治重要天敌,以转录组资源为主。",
  },
  {
    latin: "Cicindela chinensis",
    genomeInfo:
      "虎甲科参考稀少;中华虎甲以线粒体基因组与生态调查为主。",
  },
  {
    latin: "Coccinella septempunctata",
    genomeInfo:
      "近缘异色瓢虫已有参考(入侵遗传学,约 1 Gb 级);七星瓢虫为生物防治旗舰天敌。",
  },
  {
    latin: "Coptotermes formosanus",
    genomeInfo:
      "白蚁参考近年增加(与肠道菌群共代谢研究);台湾乳白蚁为入侵经济害虫,有基因组资源。",
  },
  {
    latin: "Cryptotympana atrata",
    genomeInfo:
      "蝉总科参考近年出现(近缘周期蝉的爆发周期基因组研究);黑蚱蝉以近缘比较为主。",
  },
  {
    latin: "Ixodes persulcatus",
    genomeInfo:
      "近缘肩突硬蜱约 2.1 Gb(2016 年经典);全沟硬蜱亦有组装资源(蜱传脑炎媒介研究)。",
  },
  {
    latin: "Luehdorfia chinensis",
    genomeInfo:
      "凤蝶科已有多物种参考(约 0.4 Gb 级);中华虎凤蝶为保护对象,暂以近缘比较为主。",
  },
  {
    latin: "Lycorma delicatula",
    genomeInfo:
      "斑衣蜡蝉参考基因组已发表,为入侵预警与生物防治研究(入侵昆虫基因组计划)的代表。",
  },
  {
    latin: "Macrobrachium nipponense",
    genomeInfo:
      "十足目基因组跨度大(0.2–6 Gb);日本沼虾已有基因组资源发表(水产育种)。",
  },
  {
    latin: "Mesobuthus martensii",
    genomeInfo:
      "马氏钳蝎为蝎目最早有参考基因组的物种之一,毒素肽组学研究的经典对象。",
  },
  {
    latin: "Musca domestica",
    genomeInfo:
      "约 0.55 Gb;家蝇参考基因组已发表(杀虫剂抗性管理研究)。",
  },
  {
    latin: "Oxya chinensis",
    genomeInfo:
      "直翅目近缘飞蝗基因组约 6 Gb 级(群居型转化研究经典);中华稻蝗以近缘比较为主。",
  },
  {
    latin: "Portunus trituberculatus",
    genomeInfo:
      "三疣梭子蟹已有基因组资源发表(水产育种核心种,蜕壳与生长性状研究)。",
  },
  {
    latin: "Sasakia charonda",
    genomeInfo:
      "蛱蝶科参考丰富(斑蝶、袖蝶等为经典);大紫蛱蝶为日本「国蝶」,暂以近缘比较为主。",
  },
  {
    latin: "Tenodera sinensis",
    genomeInfo:
      "螳螂目基因组资源近年才出现(立体视觉研究价值);中华大刀螳已有初步组装。",
  },
  {
    latin: "Teinopalpus aureus",
    genomeInfo:
      "凤蝶科约 0.4 Gb 级参考丰富;金斑喙凤蝶为中国最珍稀蝶类保护对象,暂以近缘比较为主。",
  },
  {
    latin: "Tetranychus cinnabarinus",
    genomeInfo:
      "近缘二斑叶螨约 0.09 Gb(2011 年经典,最小节肢动物基因组之一);朱砂叶螨为其近缘复合种。",
  },
  {
    latin: "Trypoxylus dichotomus",
    genomeInfo:
      "独角仙参考基因组已发表,为角多态性与交配策略演化的经典研究体系。",
  },
  {
    latin: "Vespa mandarinia",
    genomeInfo:
      "金环胡蜂基因组已发表(2021 年前后,北美入侵预警研究)。",
  },
  // ===================== 无脊椎动物·软体动物 =====================
  {
    latin: "Acanthochiton rubrolineatus",
    genomeInfo:
      "多板纲基因组参考稀少;石鳖的「背甲微眼」为视觉演化奇观,近缘近年有初步基因组资源。",
  },
  {
    latin: "Achatina fulica",
    genomeInfo:
      "约 1.8–2.0 Gb 级;褐云玛瑙螺已有草图参考(入侵扩散与寄生虫中间宿主研究)。",
  },
  {
    latin: "Cipangopaludina chinensis",
    genomeInfo:
      "田螺科尚少参考;中国圆田螺以线粒体基因组为代表资源。",
  },
  {
    latin: "Conus geographus",
    genomeInfo:
      "芋螺属已有多个基因组资源(毒肽多样性演化研究);地纹芋螺为「香烟螺」剧毒代表。",
  },
  {
    latin: "Corbicula fluminea",
    genomeInfo:
      "双壳类参考近年大增(牡蛎、贻贝、扇贝等);河蚬为克隆繁殖入侵研究对象,以线粒体基因组为代表。",
  },
  {
    latin: "Hyriopsis cumingii",
    genomeInfo:
      "三角帆蚌已有基因组资源发表(淡水育珠核心种,珍珠层生物矿化研究)。",
  },
  {
    latin: "Meretrix meretrix",
    genomeInfo:
      "文蛤已有基因组资源发表(水产育种与耐盐适应研究)。",
  },
  {
    latin: "Mytilus galloprovincialis",
    genomeInfo:
      "贻贝属已有染色体级参考(约 1.2–1.6 Gb,高杂合度为组装挑战);紫贻贝为环境适应与附着机制模式。",
  },
  {
    latin: "Nautilus pompilius",
    genomeInfo:
      "头足纲古老保守支系;鹦鹉螺近年有初步基因组资源(壳室与浮力调节研究),较章鱼(约 2.5 Gb)更小。",
  },
  {
    latin: "Octopus ocellatus",
    genomeInfo:
      "近缘双斑章鱼约 2.5 Gb(2015 年 Nature 经典,揭示庞大基因家族扩张);头足纲近年多种基因组发表。",
  },
  {
    latin: "Pinctada fucata",
    genomeInfo:
      "约 1.3–1.5 Gb;合浦珠母贝参考基因组已发表,为珍珠生物矿化的经典研究体系。",
  },
  {
    latin: "Rapana venosa",
    genomeInfo:
      "脉红螺近年有基因组资源(入侵贝类与性分化研究)。",
  },
  {
    latin: "Scapharca subcrenata",
    genomeInfo:
      "蚶科近年有基因组资源(血淋巴富含血红蛋白的低氧适应研究);毛蚶为水产种。",
  },
  {
    latin: "Sepia esculenta",
    genomeInfo:
      "头足纲近年多种基因组发表(1–2.5 Gb 级);金乌贼为黄渤海重要水产种,已有组装资源。",
  },
  {
    latin: "Sepiella maindroni",
    genomeInfo:
      "曼氏无针乌贼已有基因组资源发表(水产增殖放流对象)。",
  },
  {
    latin: "Tegillarca granosa",
    genomeInfo:
      "泥蚶有基因组资源(水产种,血淋巴含血红蛋白)。",
  },
  {
    latin: "Uroteuthis chinensis",
    genomeInfo:
      "中国枪乌贼近年有基因组资源(头足纲水产基因组计划)。",
  },
  // ===================== 无脊椎动物·刺胞等无脊椎类 =====================
  {
    latin: "Acropora cervicornis",
    genomeInfo:
      "鹿角珊瑚属已有多个参考(近缘数字枝鹿角珊瑚约 0.4 Gb 为 2011 年经典);本种 2020 年前后亦有发表(白化与恢复力研究)。",
  },
  {
    latin: "Actinia equina",
    genomeInfo:
      "近缘模式海葵(星状海葵)约 0.45 Gb 为刺胞动物经典参考(2007 年);等指海葵暂以近缘比较为主。",
  },
  {
    latin: "Craspedacusta sowerbii",
    genomeInfo:
      "刺胞动物整体 0.2–1.3 Gb;桃花水母有近年基因组资源(休眠孢囊与扩散研究)。",
  },
  {
    latin: "Cyanea capillata",
    genomeInfo:
      "钵水母纲近缘海月水母已有参考;狮鬃水母为大型水母代表,以近缘比较为主。",
  },
  {
    latin: "Hydra viridissima",
    genomeInfo:
      "近缘模式水螅约 1.0–1.4 Gb(干细胞与再生经典);绿水螅的绿藻内共生为共生演化研究模型。",
  },
  {
    latin: "Physalia physalis",
    genomeInfo:
      "管水母基因组研究刚起步;僧帽水母以毒素组学与浮游生物学调查为主。",
  },
  {
    latin: "Asterias amurensis",
    genomeInfo:
      "棘皮动物基因组紧凑;近缘棘冠海星约 0.45–0.5 Gb 已有参考,多棘海盘车为入侵生态研究对象。",
  },
  {
    latin: "Hemicentrotus pulcherrimus",
    genomeInfo:
      "近缘模式紫球海胆约 0.81 Gb(2006 年经典);马粪海胆作为水产种近年亦有染色体级组装。",
  },
  {
    latin: "Ophiura sarsii",
    genomeInfo:
      "蛇尾纲参考稀少;萨氏真蛇尾以分类与深海生态调查为主。",
  },
  {
    latin: "Ammonia beccarii",
    genomeInfo:
      "有孔虫基因组研究刚起步;本类群以世代交替与独特细胞遗传学著称,近缘近年有初步组装报道。",
  },
  {
    latin: "Balanoglossus misakiensis",
    genomeInfo:
      "半索动物 2015 年有两种柱头虫经典参考同期发表;三崎柱头虫为发育生物学传统材料,暂以近缘比较为主。",
  },
  {
    latin: "Dugesia japonica",
    genomeInfo:
      "近缘模式涡虫(地中海涡虫)约 1 Gb 为再生生物学经典参考;日本三角涡虫亦有基因组资源。",
  },
  {
    latin: "Eisenia fetida",
    genomeInfo:
      "环带纲参考近年增加;赤子爱胜蚓已有基因组资源(土壤生态毒理模式)。",
  },
  {
    latin: "Pheretima aspergillum",
    genomeInfo:
      "参环毛蚓(中药地龙)已有基因组资源发表(纤溶活性物质研究)。",
  },
  {
    latin: "Euplectella aspergillum",
    genomeInfo:
      "六放海绵纲参考稀少;偕老同穴的硅质骨针为生物矿化研究奇观,近年有本属组装报道。",
  },
  {
    latin: "Spongia officinalis",
    genomeInfo:
      "真海绵纲尚少参考;浴用海绵以次生代谢产物(抗癌活性筛选)著称。",
  },
  {
    latin: "Sycon ciliatum",
    genomeInfo:
      "钙质海绵为最基部动物支系之一;毛壶已有参考资源(约 2014 年前后发表)。",
  },
  {
    latin: "Styela clava",
    genomeInfo:
      "海鞘类基因组小(近缘玻璃海鞘约 0.16 Gb 经典);柄海鞘为入侵与沿岸生态研究对象。",
  },
  {
    latin: "Hirudo medicinalis",
    genomeInfo:
      "蛭类参考近年发表,医蛭科亦有基因组资源;抗凝肽组学研究依赖高质量参考。",
  },
  {
    latin: "Nereis virens",
    genomeInfo:
      "近缘模式多毛类(小头虫科)约 0.3 Gb 为经典参考;沙蚕以再生与环境监测研究为主。",
  },
  {
    latin: "Perinereis aibuhitensis",
    genomeInfo:
      "双齿围沙蚕已有基因组资源(水产与生态修复种)。",
  },
  {
    latin: "Fasciola hepatica",
    genomeInfo:
      "约 1.0–1.4 Gb;肝片吸虫参考基因组已发表(耐药与疫苗研究)。",
  },
  {
    latin: "Trichinella spiralis",
    genomeInfo:
      "约 1.6 Gb 级;旋毛形线虫参考基因组已发表,多物种比较基因组学为寄生虫学经典。",
  },
  {
    latin: "Cyclospora cayetanensis",
    genomeInfo:
      "约 0.04–0.05 Gb 级;环孢子虫参考基因组已发表(与艾美耳球虫近缘的食源性寄生虫)。",
  },
  {
    latin: "Scolopendra mutilans",
    genomeInfo:
      "近缘石蜈蚣目模式约 0.18 Gb(2014 年经典);少棘蜈蚣(中药)近年亦有组装资源。",
  },
  {
    latin: "Tachypleus tridentatus",
    genomeInfo:
      "近缘美洲鲎约 1.8 Gb;中华鲎近年亦有组装资源(鲎试剂免疫研究与保护遗传学)。",
  },
  {
    latin: "Homarus americanus",
    genomeInfo:
      "约 2.4 Gb;美洲螯龙虾染色体级参考已发表(神经再生与甲壳动物经济性状研究)。",
  },
  {
    latin: "Nephila clavata",
    genomeInfo:
      "络新妇属及其近缘金蛛科已有参考(蛛丝蛋白基因家族研究);棒络新妇为东亚常见大型蛛。",
  },
  // ===================== 植物·裸子植物 =====================
  {
    latin: "Cycas panzhihuaensis",
    genomeInfo:
      "苏铁类为裸子植物最古老分化的支系之一,基因组巨大(数 Gb 至 10 Gb 以上);攀枝花苏铁以群体遗传调查为主。",
  },
  {
    latin: "Cycas revoluta",
    genomeInfo:
      "苏铁属大基因组级(裸子植物普遍多 Gb);苏铁为园艺经典,暂以近缘比较为主。",
  },
  {
    latin: "Ephedra sinica",
    genomeInfo:
      "裸子植物级偏大基因组;草麻黄有中药基因组资源(麻黄碱合成研究)。",
  },
  {
    latin: "Metasequoia glyptostroboides",
    genomeInfo:
      "裸子植物大基因组(柏科数 Gb 级);水杉为「活化石」孑遗树种,近年有染色体级组装报道(保护遗传研究)。",
  },
  {
    latin: "Picea asperata",
    genomeInfo:
      "云杉属巨大基因组(近缘欧洲云杉约 19.6 Gb,2013 年最大植物基因组纪录之一);云杉暂以近缘量级为准。",
  },
  {
    latin: "Pinus massoniana",
    genomeInfo:
      "松属为已知最大植物基因组之列(约 20–31 Gb,糖松约 31 Gb 为纪录级);马尾松已有大规模测序尝试。",
  },
  {
    latin: "Platycladus orientalis",
    genomeInfo:
      "柏科大基因组级(数 Gb 至 10 Gb 级);侧柏为乡土绿化核心树种。",
  },
  {
    latin: "Taxus cuspidata",
    genomeInfo:
      "东北红豆杉近年有基因组资源,为紫杉醇合成通路解析的物种基础。",
  },
  {
    latin: "Torreya grandis",
    genomeInfo:
      "裸子植物大基因组级;香榧近年有基因组资源(「三代果」经济性状与种子油脂研究)。",
  },
  // ===================== 植物·被子植物 =====================
  {
    latin: "Acer truncatum",
    genomeInfo:
      "槭属基数 x=13(多为二倍体 2n=26);元宝槭暂无独立参考,近缘槭树已有基因组资源(彩叶性状研究)。",
  },
  {
    latin: "Aloe vera",
    genomeInfo:
      "芦荟属基数 x=7,常见栽培居群为三倍体(2n=21,与其低籽性相关);已有草图级基因组。",
  },
  {
    latin: "Artemisia annua",
    genomeInfo:
      "约 1.5–1.7 Gb;黄花蒿已有多个参考组装,为青蒿素合成通路研究的核心物种。",
  },
  {
    latin: "Camellia japonica",
    genomeInfo:
      "山茶属基因组大(近缘茶树约 3 Gb 级经典);山茶近年亦有染色体级组装(观赏性状研究)。",
  },
  {
    latin: "Castanea mollissima",
    genomeInfo:
      "约 0.7–1 Gb 级;中国板栗参考基因组已发表(抗栗疫病与坚果性状研究)。",
  },
  {
    latin: "Cinnamomum camphora",
    genomeInfo:
      "樟科参考近年增加;樟树已有基因组资源(芳樟醇与香樟性状研究)。",
  },
  {
    latin: "Cinnamomum cassia",
    genomeInfo:
      "肉桂近年有基因组资源(药用植物计划,挥发油合成研究)。",
  },
  {
    latin: "Coptis chinensis",
    genomeInfo:
      "黄连已有基因组资源(小檗碱合成通路研究,中药基因组计划)。",
  },
  {
    latin: "Fallopia multiflora",
    genomeInfo:
      "何首乌有基因组资源(中药计划,蒽醌类成分合成研究)。",
  },
  {
    latin: "Houttuynia cordata",
    genomeInfo:
      "蕺菜(鱼腥草)有基因组资源(鱼腥草素与挥发物研究)。",
  },
  {
    latin: "Hydrangea macrophylla",
    genomeInfo:
      "绣球已有基因组资源(花色随土壤酸碱度变化的呈色机制研究)。",
  },
  {
    latin: "Hylocereus undatus",
    genomeInfo:
      "量天尺(火龙果)已有基因组资源(仙人掌科基因组计划,甜菜色素呈色研究)。",
  },
  {
    latin: "Echinocactus grusonii",
    genomeInfo:
      "仙人掌科参考近年增加(近缘梨果仙人掌已有);金琥为观赏经典,暂以近缘比较为主。",
  },
  {
    latin: "Opuntia ficus-indica",
    genomeInfo:
      "梨果仙人掌已有参考基因组资源(仙人掌科代表,刺与抗旱性状研究)。",
  },
  {
    latin: "Litsea cubeba",
    genomeInfo:
      "樟科近缘已有资源;山鸡椒以挥发油化学型与转录组研究为主。",
  },
  {
    latin: "Magnolia denudata",
    genomeInfo:
      "木兰科为被子植物基部支系;木兰属近年有基因组资源发表(花被演化研究)。",
  },
  {
    latin: "Magnolia grandiflora",
    genomeInfo:
      "荷花玉兰暂以木兰属近缘比较为主。",
  },
  {
    latin: "Manglietiastrum sinicum",
    genomeInfo:
      "华盖木为极小种群野生植物(云南特有孑遗),保护基因组学调查对象,尚无染色体级参考。",
  },
  {
    latin: "Mentha haplocalyx",
    genomeInfo:
      "唇形科参考近年增加;薄荷(本种)以近缘薄荷属比较为主。",
  },
  {
    latin: "Morus alba",
    genomeInfo:
      "桑属常见 2n=28;近缘桑树参考约 0.33 Gb 已发表,栽培桑亦有组装(家蚕饲料与果桑性状研究)。",
  },
  {
    latin: "Nepenthes mirabilis",
    genomeInfo:
      "猪笼草属尚少高质量参考;食虫植物研究以茅膏菜、捕蝇草等为近缘锚点。",
  },
  {
    latin: "Osmanthus fragrans",
    genomeInfo:
      "木犀已有参考基因组(桂花「晚香」节律与香气释放研究经典)。",
  },
  {
    latin: "Paeonia lactiflora",
    genomeInfo:
      "芍药属基数 x=5(二倍体 2n=10,栽培常见多倍化);芍药已有染色体级参考(花型与药用成分研究)。",
  },
  {
    latin: "Paeonia suffruticosa",
    genomeInfo:
      "牡丹亦有染色体级基因组发表(花青素呈色与重瓣「花王」性状研究)。",
  },
  {
    latin: "Panax notoginseng",
    genomeInfo:
      "人参属约 3–3.5 Gb 级(人参为四倍体 2n=48 经典);三七已有参考(皂苷合成研究)。",
  },
  {
    latin: "Piper nigrum",
    genomeInfo:
      "胡椒已有基因组资源(胡椒碱合成,「香料之王」经济性状研究)。",
  },
  {
    latin: "Quercus mongolica",
    genomeInfo:
      "近缘夏栎约 1.5 Gb 已有经典参考;蒙古栎亦有组装资源(东北温带落叶阔叶林建群种)。",
  },
  {
    latin: "Rhododendron simsii",
    genomeInfo:
      "杜鹃花属近年有参考发表(花色与耐铝性状研究)。",
  },
  {
    latin: "Rosa rugosa",
    genomeInfo:
      "蔷薇属基数 x=7,玫瑰为二倍体(2n=14);近缘月季花约 0.56 Gb 为经典参考(2018 年)。",
  },
  {
    latin: "Salix babylonica",
    genomeInfo:
      "杨柳科基因组紧凑(近缘柳树约 0.4–0.5 Gb 已有参考);垂柳暂以近缘比较为主。",
  },
  {
    latin: "Trachycarpus fortunei",
    genomeInfo:
      "棕榈科跨度 0.6–1.8 Gb(椰子、油棕为经典参考);棕榈暂以近缘比较为主。",
  },
  {
    latin: "Dionaea muscipula",
    genomeInfo:
      "捕蝇草参考基因组 2020 年发表(食虫性状起源与触叶闭合机制研究)。",
  },
  {
    latin: "Drosera rotundifolia",
    genomeInfo:
      "茅膏菜为食虫植物比较基因组学核心物种之一(与捕蝇草等构成「肉食综合征」研究)。",
  },
  // ===================== 植物·兰科 =====================
  {
    latin: "Cymbidium goeringii",
    genomeInfo:
      "兰科约 1–3 Gb;春兰已有基因组资源发表(国兰香气与花型研究)。",
  },
  {
    latin: "Cymbidium sinense",
    genomeInfo:
      "兰科量级(1–3 Gb);墨兰暂以近缘春兰比较为主。",
  },
  {
    latin: "Cypripedium macranthos",
    genomeInfo:
      "兰科保护对象,尚无高质量参考;杓兰属以群体遗传调查为主。",
  },
  {
    latin: "Dendrobium officinale",
    genomeInfo:
      "铁皮石斛已有参考基因组(中药基因组计划经典,多糖合成研究)。",
  },
  {
    latin: "Phalaenopsis aphrodite",
    genomeInfo:
      "兰科近年多种参考发表;蝴蝶兰属以近缘组装为基础开展品种改良。",
  },
  // ===================== 孢子植物·蕨类 =====================
  {
    latin: "Adiantum capillus-veneris",
    genomeInfo:
      "铁线蕨为近年蕨类基因组计划的代表物种之一(维管植物大基因组与蕨类适应性研究)。",
  },
  {
    latin: "Dryopteris crassirhizoma",
    genomeInfo:
      "蕨类普遍大基因组(数 Gb 至 10 Gb 以上);绵马鳞毛蕨(东北贯众来源)暂以近缘比较为主。",
  },
  {
    latin: "Equisetum arvense",
    genomeInfo:
      "木贼科为蕨类最古老分化的支系之一,近年有基因组组装报道(形态简化与硅代谢研究)。",
  },
  {
    latin: "Isoetes sinensis",
    genomeInfo:
      "水韭属包含蕨类植物中最大基因组之列(部分种超过 10 Gb);中华水韭为濒危保护对象,尚无高质量参考。",
  },
  {
    latin: "Lycopodium clavatum",
    genomeInfo:
      "近缘江南卷柏约 0.1 Gb 为经典小基因组参考;石松属则大得多(数 Gb 级)。",
  },
  {
    latin: "Marsilea quadrifolia",
    genomeInfo:
      "近缘水蕨为蕨类分子遗传经典模式(近年已发表参考);苹(田字草)暂以近缘比较为主。",
  },
  {
    latin: "Nephrolepis cordifolia",
    genomeInfo:
      "蕨类大基因组级;肾蕨为园艺经典,以高倍性细胞遗传学记录著称。",
  },
  {
    latin: "Platycerium bifurcatum",
    genomeInfo:
      "蕨类大基因组级;鹿角蕨为附生观赏经典,暂以近缘比较为主。",
  },
  {
    latin: "Pteridium aquilinum",
    genomeInfo:
      "蕨类大基因组级(数 Gb 至 10 Gb 以上);蕨(拳头菜)为世界性扩张蕨类,以群体遗传调查为主。",
  },
  {
    latin: "Selaginella tamariscina",
    genomeInfo:
      "近缘江南卷柏约 0.1 Gb 为石松类小基因组经典;卷柏(还魂草)亦有药用基因组资源。",
  },
  // ===================== 孢子植物·苔藓 =====================
  {
    latin: "Conocephalum conicum",
    genomeInfo:
      "近缘地钱约 0.23 Gb 为苔类经典模式参考;蛇苔(叶状苔)以近缘比较为主。",
  },
  {
    latin: "Funaria hygrometrica",
    genomeInfo:
      "近缘小立碗藓约 0.48 Gb 为苔藓经典模式(2008 年);葫芦藓为教学传统材料。",
  },
  {
    latin: "Polytrichum commune",
    genomeInfo:
      "近缘小立碗藓约 0.48 Gb 为参考锚点;金发藓科稍大,细胞遗传学记录丰富。",
  },
  {
    latin: "Sphagnum palustre",
    genomeInfo:
      "泥炭藓属已有参考资源(碳汇与湿地研究);苔藓整体约 0.3–0.5 Gb 级。",
  },
  // ===================== 真菌 =====================
  {
    latin: "Amanita muscaria",
    genomeInfo:
      "毒蝇鹅膏已有基因组资源(鹅膏毒素合成基因簇研究)。",
  },
  {
    latin: "Boletus edulis",
    genomeInfo:
      "外生菌根菌难以纯培养,高质量参考尚少;美味牛肝菌以群体基因组调查为主。",
  },
  {
    latin: "Cantharellus cibarius",
    genomeInfo:
      "鸡油菌尚少参考;以共生生态与人工促繁研究为主。",
  },
  {
    latin: "Marasmius androsaceus",
    genomeInfo:
      "安络小皮伞(药用「安络痛」来源)尚无高质量参考。",
  },
  {
    latin: "Phallus indusiatus",
    genomeInfo:
      "长裙竹荪已有基因组资源(多糖与凝集素研究)。",
  },
  {
    latin: "Rhizopus stolonifer",
    genomeInfo:
      "毛霉科小型基因组(近缘致病种约 0.045 Gb 级经典);黑根霉为实验教学与工业发酵传统菌。",
  },
  {
    latin: "Trametes versicolor",
    genomeInfo:
      "云芝已有基因组资源(漆酶降解与多糖 PSK/PSP 免疫调节研究)。",
  },
  {
    latin: "Tremella fuciformis",
    genomeInfo:
      "银耳已有基因组资源(胶质子实体发育与多糖合成研究)。",
  },
  {
    latin: "Tricholoma matsutake",
    genomeInfo:
      "松茸近年有基因组资源(菌根共生与「松茸土」微生态研究)。",
  },
  // ===================== 藻类 =====================
  {
    latin: "Alexandrium catenella",
    genomeInfo:
      "甲藻以巨大且结构奇特的基因组著称(常达数 Gb 以上,染色体永久凝缩);链状亚历山大藻为麻痹性贝毒研究模型。",
  },
  {
    latin: "Corallina officinalis",
    genomeInfo:
      "珊瑚藻科(钙化红藻)参考稀少;近缘有无节珊瑚藻基因组资源(钙化机制研究)。",
  },
  {
    latin: "Gracilaria lemaneiformis",
    genomeInfo:
      "红藻小型基因组级(约 0.1 Gb 量级);龙须菜已有组装资源(琼胶合成研究)。",
  },
  {
    latin: "Macrocystis pyrifera",
    genomeInfo:
      "褐藻参考近年增加(经典长囊水云约 0.2 Gb);巨藻已有草图级资源(海藻林生态旗舰研究)。",
  },
  {
    latin: "Noctiluca scintillans",
    genomeInfo:
      "甲藻以巨大基因组著称(常达数 Gb 至数十 Gb,染色体永久凝缩);夜光藻以转录组资源为主。",
  },
  {
    latin: "Pyropia yezoensis",
    genomeInfo:
      "红藻小型基因组(数十 Mb 级);条斑紫菜已有参考(「海苔」水产基因组计划经典)。",
  },
  {
    latin: "Sargassum fusiforme",
    genomeInfo:
      "褐藻约 0.1–0.6 Gb 量级;羊栖菜有水产转录组与初步组装资源。",
  },
  {
    latin: "Ulva lactuca",
    genomeInfo:
      "石莼属已有参考(约 0.1 Gb 级,绿藻中等偏小);「绿潮」暴发机制研究对象。",
  },
  {
    latin: "Volvox aureus",
    genomeInfo:
      "近缘团藻约 0.14 Gb 为多细胞化演化经典参考;金黄团藻以近缘比较为主。",
  },
  // ===================== 原生生物与微生物 =====================
  {
    latin: "Amoeba proteus",
    genomeInfo:
      "以巨大基因组著称(历史测值达约 290 Gb、人类数十倍量级;具体数值因多倍性与测量方法存争议)。",
  },
  {
    latin: "Monosiga ovata",
    genomeInfo:
      "近缘领鞭毛虫约 0.04 Gb(2008 年经典,动物最近的单细胞近亲参考);卵形单领虫以近缘比较为主。",
  },
  {
    latin: "Stentor coeruleus",
    genomeInfo:
      "喇叭虫为单细胞巨大化与再生经典;近年已有基因组资源(体细胞大核表观遗传研究)。",
  },
  {
    latin: "Vorticella campanula",
    genomeInfo:
      "纤毛虫基因组多样性大(大核/小核双系统);伞形钟虫以形态学与收缩蛋白研究为主。",
  },
  {
    latin: "Geobacillus stearothermophilus",
    genomeInfo:
      "约 3.5–3.8 Mb,GC 约 52%;多株已测序(嗜热灭菌指示菌与工业酶来源)。",
  },
  {
    latin: "Nostoc flagelliforme",
    genomeInfo:
      "蓝细菌基因组多在 3–10 Mb 级;发状念珠藻(发菜)已有全基因组测序报道。",
  },
];
