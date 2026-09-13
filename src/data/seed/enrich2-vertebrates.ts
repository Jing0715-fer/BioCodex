import { EnrichEntry } from "../types";

// 脊椎动物科学档案补强数据(第二轮 enrich2)—— 按 latin 定位 DB 中已有物种,
// 由主代理统一集成进 scripts/enrich-taxa.ts,仅更新 etymology/discovery/genomeInfo/
// ecologyRole/researchValue 五个档案字段(不入库、不碰 image/tags)。
// 覆盖 /tmp/list-verts.tsv 全部 63 个无档案脊椎动物物种,latin 与清单逐字一致,
// 条目顺序与清单一致。数据准则:高把握史实直书;记不准的基因组数值/命名年份一律
// 省略或定性表述,genomeInfo 仅 17 条(宁缺毋滥)。
// 集成提示:Hippocampus erectus / Hippocampus japonicus 在 enrich-vertebrates.ts(E1)
// 已有条目,本文件为完成 63 全覆盖仍收录二者;汇总进 enrich-taxa.ts 时需去重(保留一份)。
export const enrich2Vertebrates: EnrichEntry[] = [
  // ===================== 圆口纲与软骨鱼类 =====================
  // 东北七鳃鳗
  {
    latin: "Lethenteron reissneri",
    etymology:
      "Lethenteron 由希腊语 lēthē(忘川、遗忘)与 enteron(肠)构成,或指成体肠道退化如被遗忘;reissneri 一般认为纪念德裔解剖学家 Reissner。",
    discovery:
      "1869 年波兰博物学家 Dybowski 依阿穆尔河流域标本定名;本种系非寄生的陆封型七鳃鳗,与近缘种的分类纠缠至 20 世纪后期才逐渐厘清。",
    ecologyRole:
      "栖息于山溪与江河支流;幼体沙隐虫底栖滤食有机碎屑数年,成体不再进食,繁殖后死亡,是洁净溪流的指示物种。",
    researchValue:
      "现生无颌类代表,与盲鳗同属圆口纲,是研究脊椎动物起源、脊椎骨与神经嵴演化不可替代的活体材料。",
  },
  // 布氏粘盲鳗
  {
    latin: "Eptatretus burgeri",
    etymology:
      "Eptatretus 由希腊语 hepta(七)与 trētos(孔)构成,指典型七个外鳃孔;burgeri 纪念 19 世纪为西博尔德在日本采集标本的德国博物学家比尔格。",
    discovery:
      "19 世纪 30 年代经西博尔德日本采集队的标本传入欧洲并定名,是最早载入科学文献的盲鳗之一;东亚近海常见的盲鳗多指本种。",
    ecologyRole:
      "近海底栖食腐者,吞食沉底尸体与垂死鱼类,受惊时分泌大量黏液缠结天敌,是陆架海底的清道夫,亦偶损渔获。",
    researchValue:
      "黏液中的黏蛋白与中间纤维丝是仿生材料研究热点;其皮革长期加工为鳗皮制品;身为最原始脊椎动物谱系的代表,演化研究价值独特。",
  },
  // 条纹斑竹鲨
  {
    latin: "Chiloscyllium plagiosum",
    etymology:
      "Chiloscyllium 由希腊语 cheilos(唇)与 skylion(小角鲨)构成,指长唇褶;plagiosum 源自希腊语 plagios(斜),指体背斜向鞍状斑纹。",
    discovery:
      "1830 年前后英国学者 Bennett 依东南亚海域标本定名;幼体具醒目横带,与成体纹差异致早年误定,后经发育序列追踪澄清。",
    ecologyRole:
      "珊瑚礁与岩礁底栖小型鲨,夜行捕食底栖甲壳类与软体动物;卵生,卵壳具螺旋缠丝,可缠绕固定于礁缝。",
    researchValue:
      "水族展示中饲养最久的鲨鱼之一;其免疫系统的鲨鱼新型抗原受体(VNAR)可产生单域纳米抗体,是抗体药物开发的新兴来源。",
  },
  // 路氏双髻鲨
  {
    latin: "Sphyrna lewini",
    etymology:
      "Sphyrna 源自希腊语 sphyra(锤),指锤状头翼;lewini 一说纪念 19 世纪英国博物学家里温,命名沿革记述不详。",
    discovery:
      "1834 年定名;锤状头翼的功能争论逾百年,现知兼具扩展双眼视场与电场嗅觉扫掠之效,是形态适应研究的经典案例。",
    ecologyRole:
      "暖海集群中上层捕食者,以头翼电场感知搜寻鳐类与底栖鱼类;胎生群游,渔获长期位居鲨鱼鳍贸易前列。",
    researchValue:
      "头翼感觉生态与立体视觉研究经典对象;IUCN 评为濒危(CR),2013 年列入 CITES 附录 II,是鲨鱼保护谈判的旗舰物种。",
  },
  // 白斑星鲨
  {
    latin: "Mustelus manazo",
    etymology:
      "Mustelus 为拉丁语小鼬之意的缩小词,古罗马人以此称光滑小鲨;manazo 源自日本地方名,20 世纪初经 Jordan 与 Snyder 拉丁化。",
    discovery:
      "20 世纪初 Jordan 与 Snyder 依日本标本定名;中国黄海东海习见,是传统近海渔业中的经济鲨类,地方名星鲨。",
    ecologyRole:
      "近海底栖小型鲨,主食蟹虾等底栖甲壳类,胎生繁殖,每胎产数尾至十数尾,为黄东海底层食物网的中级捕食者。",
    researchValue:
      "软骨鱼生殖与渔业生物学常用研究样本;肉供食用并进入鱼翅低值贸易,种群评估依赖底拖渔业统计。",
  },
  // ===================== 鲤科与淡水养殖鱼类 =====================
  // 鲤
  {
    latin: "Cyprinus carpio",
    etymology:
      "Cyprinus 或源自希腊语 Kypros(塞浦路斯岛),古罗马人以多籽之鲤献奉维纳斯;carpio 为拉丁语对鲤的称呼。",
    discovery:
      "1758 年林奈定名;东亚驯化逾两千年,诗经即有岂其食鱼、必河之鲤之句,是世界上最早被养殖的鱼类之一。",
    genomeInfo:
      "基因组约 1.7-1.8Gb,2n=100,为经历第四轮全基因组加倍的异源四倍化鱼类;草图与染色体级组装均已发表。",
    ecologyRole:
      "底栖杂食,拱泥觅食扰动底质,深刻改变池塘缓流水体理化环境;随引种遍布全球,在北美与澳洲被列为入侵种。",
    researchValue:
      "全球产量居前的淡水养殖鱼,鲤科遗传学参照物种;锦鲤品系为体色遗传与人工选育研究提供经典体系。",
  },
  // 鲫
  {
    latin: "Carassius auratus",
    etymology:
      "Carassius 为拉丁化的鲫,或经东欧俗名 karas 转写;auratus 意为镀金的,指野生群体中的金红色变异个体。",
    discovery:
      "1758 年林奈定名;金鱼由中国野生鲫的红黄色变异选育而来,晋唐文献已见记载,是世上最早的驯化观赏鱼。",
    genomeInfo:
      "2n≈100,基因组约 1.8Gb,与鲤同为异源四倍体起源;金鱼染色体级参考基因组近年发表,支撑品系起源研究。",
    ecologyRole:
      "淡水底栖广食性鱼类,耐低氧冰冻,繁衍力强,是湖泊池塘食物网的枢纽种群,亦为水鸟与肉食鱼的重要猎物。",
    researchValue:
      "金鱼逾千品系构成表型多样性的活体文库,达尔文曾以其论证人工选择;鲫耐低氧机制亦是比较基因组学课题。",
  },
  // 草鱼
  {
    latin: "Ctenopharyngodon idella",
    etymology:
      "Ctenopharyngodon 由希腊语 ktenos(梳)与 pharynx(咽)构成,指研磨水草的梳状咽齿;idella 词源记述不详。",
    discovery:
      "1844 年 Valenciennes 定名;1958 年钟麟团队突破家鱼人工繁殖技术,终结千百年来依赖江河捞苗的养殖史。",
    genomeInfo:
      "基因组约 0.9Gb,2n=48;全基因组测序已发表,草食适应相关的味觉受体与消化酶基因演化受重点关注。",
    ecologyRole:
      "主食高等水生植物的鲤科鱼,食物链极短,转化效率高;广泛用于内陆水域控草与生态渔业,在北美成为入侵种。",
    researchValue:
      "全球单种产量最高的养殖鱼类之一,四大家鱼之首;肌间刺发育与草食性机理是当前育种攻关焦点。",
  },
  // 鲢
  {
    latin: "Hypophthalmichthys molitrix",
    etymology:
      "Hypophthalmichthys 由希腊语 hypo(下)、ophthalmos(眼)与 ichthys(鱼)构成,指眼位显著偏下;molitrix 词源不详。",
    discovery:
      "1844 年 Valenciennes 定名;1958 年人工繁殖突破后向全球推广,成为移植面积最广的养殖鱼类之一。",
    genomeInfo:
      "2n=48,基因组约 1.1Gb;已完成全基因组测序,滤食相关的鳃耙形态与感觉基因研究借助组学推进。",
    ecologyRole:
      "鳃耙致密的滤食性鱼类,主滤浮游藻类,是生物操纵控藻与鲢鳙渔业的支柱种;在密西西比流域形成著名入侵种群。",
    researchValue:
      "蓝藻水华治理的旗舰工具鱼,以鱼净水模式广泛推广;群体遗传学研究澄清其入侵种群的建群与扩张历史。",
  },
  // 鲇
  {
    latin: "Silurus asotus",
    etymology:
      "Silurus 源自希腊语 silouros,为古人对大型鲇鱼的称呼;asotus 拉丁语意为挥霍无度者,或谑其贪食。",
    discovery:
      "1758 年林奈定名;东亚习见土著鲇类,中国食用史悠久,古称鰋,北方俗称鲇鱼。",
    ecologyRole:
      "底栖夜行伏击型捕食者,吞食鱼虾蛙螺,潜伏于洞穴与倒木间;洪水期随涨水扩散,是淡水食物网顶端整合者之一。",
    researchValue:
      "中国北方重要养殖鲇类;鲇形目模式研究物种,用于夜视、须味觉与伏击行为的感觉神经生物学研究。",
  },
  // ===================== 海洋渔业与模式鱼类 =====================
  // 大西洋鳕
  {
    latin: "Gadus morhua",
    etymology:
      "Gadus 为拉丁语鳕的古称;morhua 沿用拉丁旧名,词源已不可确考。",
    discovery:
      "1758 年林奈定名;维京与巴斯克渔民捕捞逾千年,纽芬兰鳕渔场 1992 年因资源崩溃全面禁渔,成为全球渔业管理标志性事件。",
    genomeInfo:
      "基因组约 830Mb,2011 年测序;发现其缺失 MHC-II 通路的非常规免疫系统,为脊椎动物免疫演化提供罕见案例。",
    ecologyRole:
      "北大西洋冷水底栖群游捕食者,摄食鱼虾;曾是全球单种渔获之最,种群波动牵动整个寒带陆架生态系统。",
    researchValue:
      "渔业科学与资源管理的教科书物种:鳕鱼战争、禁渔与配额制度皆以其为轴心,适应变暖的种群遗传研究持续产出。",
  },
  // 虹鳟
  {
    latin: "Oncorhynchus mykiss",
    etymology:
      "Oncorhynchus 由希腊语 onkos(钩)与 rynchos(鼻)构成,指生殖期雄鱼上颌下弯成钩;mykiss 源自堪察加土名,1792 年经 Walbaum 拉丁化。",
    discovery:
      "1792 年 Walbaum 依堪察加标本定名;19 世纪起向各大洲引种,现已是养殖与游钓最重要的冷水鱼类之一。",
    genomeInfo:
      "基因组约 1.9Gb,2014 年发表;鲑科祖先全基因组加倍遗留的旁系同源基因对,使其成为基因组二倍化过程研究模型。",
    ecologyRole:
      "栖于冷凉溪流湖泊,部分种群降海为钢头鳟;引入南美非洲冷水域后常成入侵种群,冲击土著鱼类群落。",
    researchValue:
      "全球养殖产量最大的鲑鳟类之一;驯化遗传学与水温适应研究支撑循环水养殖扩张,亦为运动行为学模型。",
  },
  // 大西洋鲑
  {
    latin: "Salmo salar",
    etymology:
      "Salmo 为拉丁语鲑鳟之古称,源自 salire(跳跃),指其跃瀑洄游之能;种名同词重复,即善跃的跃者。",
    discovery:
      "1758 年林奈定名;幼鱼嗅觉印记母河的机制由 20 世纪中叶 Hasler 实验证实,开创洄游定向研究范式。",
    genomeInfo:
      "基因组约 3Gb,2n=58;高质量参考图谱已发表,全基因组加倍后再二倍化的区段化重组痕迹清晰可见。",
    ecologyRole:
      "洄游性顶级捕食者,出生淡水、降海生长、凭嗅觉回归母河产卵;洄归尸骸将海洋氮素回馈溪流食物网。",
    researchValue:
      "挪威深海网箱与陆基养殖产业支柱,全球养殖数百万吨;银化变态、盐度适应与洄游印记是经典生理学课题。",
  },
  // 大黄鱼
  {
    latin: "Larimichthys crocea",
    etymology:
      "Larimichthys 意为似 Larimus 的鱼,Larimus 为古籍所载海鱼名;crocea 拉丁语藏红花色,指金黄体色。",
    discovery:
      "1846 年 Richardson 定名;20 世纪中后期敲罟声驱作业重创野生资源,后赖人工育苗与池塘网箱养殖复兴。",
    genomeInfo:
      "较早完成全基因组测序的海水鱼之一,已实现基因组选择育种应用,鳔发声与耐低氧性状位点受持续定位。",
    ecologyRole:
      "近海中下层聚群鱼,鳔肌振动鸣声洪亮,集群产卵;曾列中国近海四大海产,野生资源经长期过度捕捞而枯竭。",
    researchValue:
      "中国海水鱼养殖旗舰种,产量居海水鱼之首;发声求偶、体型与抗病选育研究活跃,福建宁德为产业重镇。",
  },
  // 褐牙鲆
  {
    latin: "Paralichthys olivaceus",
    etymology:
      "Paralichthys 由希腊语 para(侧)与 ichthys(鱼)构成,或指双眼并居一侧之形;olivaceus 拉丁语橄榄色的。",
    discovery:
      "1846 年 Temminck 与 Schlegel 在《日本动物志》中定名;为中日韩主养鲜鲽类,中国北方俗称牙片、偏口。",
    genomeInfo:
      "基因组约 0.5-0.6Gb,属最紧凑的鲆鲽类之一;染色体级组装支撑变态发育与生长选育研究。",
    ecologyRole:
      "沙泥底伏击型捕食者,幼鱼变态时双眼移至身体左侧;摄食虾蟹小鱼,是底拖渔业与增殖放流的重要对象。",
    researchValue:
      "东亚鲜鲽类养殖主力物种;变态期不对称发育的内分泌调控兼具基础与育种价值,苗种体色改良研究成熟。",
  },
  // 日本海马
  {
    latin: "Hippocampus japonicus",
    etymology:
      "Hippocampus 由希腊语 hippos(马)与 kampos(海怪)构成,指马首卷尾之形;种名意为日本的,指模式产地。",
    discovery:
      "1856 年德国鱼类学家 Kaup 定名;中国近海习见的小型海马,是药典海马药材基原之一,北方俗称小海马。",
    ecologyRole:
      "缠绕于海草藻丛与定置网衣的定居型海马,以小型甲壳类为食;雄鱼育儿袋孕育后代,对沿岸生境退化极为敏感。",
    researchValue:
      "雄性怀孕与亲本投资的代表性类群;药材需求驱动人工养殖与资源评估,列入 CITES 贸易监管的海马之一。",
  },
  // 日本鳗鲡
  {
    latin: "Anguilla japonica",
    etymology:
      "Anguilla 为拉丁语鳗,与 anguis(蛇)同源;japonica 意为日本的,指模式产地。",
    discovery:
      "1846 年 Temminck 与 Schlegel 定名;产卵场成谜逾百年,1990 年代塚本胜巳团队在马里亚纳海山西侧确认。",
    ecologyRole:
      "降海洄游数千公里至西太平洋深水区繁殖,柳叶鳗随洋流漂流数月,变态为玻璃鳗进入东亚河口水系生长。",
    researchValue:
      "资源持续衰退被列为濒危;2010 年日本实现全周期人工育苗,被视为水产科学里程碑,鳗苗捕捞管理成为国际议题。",
  },
  // 孔雀鱼
  {
    latin: "Poecilia reticulata",
    etymology:
      "Poecilia 源自希腊语 poikilia(斑驳多变之色);reticulata 拉丁语网纹的,指体侧网状纹。",
    discovery:
      "1859 年 Peters 依委内瑞拉标本定名;20 世纪为控蚊引入全球暖水水域,终成世界最普及的观赏鱼之一。",
    ecologyRole:
      "溪塘表层卵胎生小鱼,大量捕食孑孓;繁殖极快,在引入地迅速建群,常对土著小型鱼类构成竞争与捕食压力。",
    researchValue:
      "进化生物学超级模型:特立尼达群体研究量化自然选择速率与性选择信号动态,Endler 经典实验即以其为材料。",
  },
  // ===================== 两栖动物 =====================
  // 东方蝾螈
  {
    latin: "Cynops orientalis",
    etymology:
      "Cynops 由希腊语 kyōn(犬)与 ōps(面)构成,指犬吻状头形;orientalis 意为东方的。",
    discovery:
      "1875 年谭卫道(Armand David)依华中标本定名;中国特有种,20 世纪长期作为中学与实验室两栖类代表。",
    genomeInfo:
      "蝾螈类以巨型基因组著称,本种估逾 15Gb、约人类五倍,海量重复序列致组装困难,是基因组膨胀演化的极端案例。",
    ecologyRole:
      "山区静水塘与溪缘水栖蝾螈;腹面橙红警戒色鲜明,皮肤与卵蓄积河豚毒素类似物,构成化学防御。",
    researchValue:
      "断肢与视网膜再生的经典实验材料;河豚毒素的体内蓄积机制为生物碱转运研究提供天然体系。",
  },
  // 中华蟾蜍
  {
    latin: "Bufo gargarizans",
    etymology:
      "Bufo 为拉丁语蟾蜍;gargarizans 源自 gargarizo(咕咕作声),或拟其低沉连续鸣叫。",
    discovery:
      "1842 年英国医生博物学家 Cantor 定名;中国广布种,蟾蜍入药记载可溯至《神农本草经》。",
    ecologyRole:
      "农田林缘夜行食虫者,主食金龟子、夜蛾等害虫,是农林害虫的重要天敌;耳后腺毒液为御敌主械,冬季集群入土越冬。",
    researchValue:
      "耳后腺分泌物干燥品即药典药材蟾酥,为六神丸等传统名药组分;蟾蜍二烯内酯的强心活性研究经年不衰。",
  },
  // 黑斑侧褶蛙
  {
    latin: "Pelophylax nigromaculatus",
    etymology:
      "Pelophylax 由希腊语 pēlos(泥泽)与 phylax(守卫)构成,意沼泽守卫;nigromaculatus 拉丁语黑斑的。",
    discovery:
      "1860 年 Hallowell 依日本标本定名,长期置于 Rana 属,后移入侧褶蛙属;曾为中国实验胚胎学与教学最常用蛙。",
    ecologyRole:
      "稻田池塘习见蛙类,捕食农业害虫;受栖息地缩减与农药影响,种群长期下降,被 IUCN 列为濒危(EN)。",
    researchValue:
      "东亚两栖类生态毒理学与环境监测的常用种;历史上作为中国早期胚胎学与细胞遗传学材料贡献显著。",
  },
  // 中国林蛙
  {
    latin: "Rana chensinensis",
    etymology:
      "Rana 为拉丁语蛙;chensinensis 意为秦地之蛙,指 1875 年定名时的陕西采集地。",
    discovery:
      "1875 年谭卫道依陕西标本定名;东北种群后分立为东北林蛙,药市所称雪蛤多出自后者。",
    ecologyRole:
      "针阔混交林的地栖蛙类,秋季集群下山入水越冬;成体捕食林间昆虫,是森林与湿地间能量流动的纽带物种。",
    researchValue:
      "雌蛙输卵管干制品即传统滋补品林蛙油(哈士蟆油);集群越冬的抗冻生理为低温生物学提供素材。",
  },
  // 大树蛙
  {
    latin: "Rhacophorus dennysi",
    etymology:
      "Rhacophorus 由希腊语 rhakos(碎布)与 phoros(背负)构成,直义背负碎布者,常联系其泡沫巢外形;dennysi 为纪念人物,记载有限。",
    discovery:
      "20 世纪初经印度博物馆学者定名;为中国体型最大的树蛙之一,华南丘陵雨季夜间鸣声洪亮,常见于村边大树。",
    ecologyRole:
      "树栖蛙类,指趾间蹼宽大可作滑翔减速;雌蛙以后肢搅打分泌液成泡沫巢悬于水面枝上,蝌蚪坠水完成发育。",
    researchValue:
      "滑翔肢体形态适应与泡沫巢防干机理研究材料;亦是华南两栖类保护教育中的常见旗舰形象。",
  },
  // ===================== 龟鳖类 =====================
  // 绿海龟
  {
    latin: "Chelonia mydas",
    etymology:
      "Chelonia 源自希腊语 chelys(龟甲);mydas 词源不明;英文 green turtle 指其脂肪绿色而非体色,中名易生误解。",
    discovery:
      "1758 年林奈定名;全球种群因采捕肉蛋长期衰退,现列 IUCN 濒危(EN)并列入 CITES 附录 I。",
    genomeInfo:
      "核型 2n=56,已完成全基因组测序;温度决定性别的机制使其成为气候变暖影响研究的爬行类焦点。",
    ecologyRole:
      "唯一以海草海藻为主食的成体海龟,修剪维持海草床结构与营养循环,被誉为海草床的割草机,维系泻湖生态平衡。",
    researchValue:
      "地磁印记洄游导航与温度依赖型性别决定的经典研究物种;全球海龟保护公约体系的旗舰对象。",
  },
  // 玳瑁
  {
    latin: "Eretmochelys imbricata",
    etymology:
      "Eretmochelys 由希腊语 eretmon(桨)与 chelys(龟)构成,指桨状鳍肢;imbricata 拉丁语覆瓦状,指叠覆的盾片。",
    discovery:
      "1766 年林奈定名;玳瑁甲贸易绵延千年致种群锐减,现列 IUCN 极危(CR),全部国际贸易已被禁止。",
    ecologyRole:
      "珊瑚礁专栖海龟,尖喙主食海绵,抑制其对珊瑚的空间竞争,是礁栖群落结构的关键调节者。",
    researchValue:
      "热带珊瑚礁保护旗舰物种;甲片贸易史与种群遗传结构评估共同支撑全球范围的存续行动。",
  },
  // 中华鳖
  {
    latin: "Pelodiscus sinensis",
    etymology:
      "Pelodiscus 由希腊语 pēlos(泥)与 diskos(盘)构成,指泥栖扁圆之形;sinensis 意为中国的。",
    discovery:
      "1834 年前后德国学者 Wiegmann 定名;中国食药两用逾两千年,鳖甲载于《神农本草经》。",
    genomeInfo:
      "较早完成全基因组测序的龟类,为羊膜动物演化比较基因组学提供关键节点;其性别决定机制中遗传与温度因素的作用长期存争。",
    ecologyRole:
      "底埋伏击型杂食者,吻突可伸出泥面呼吸,冬季伏泥蛰伏;江河湖库底栖食物网的中层捕食者。",
    researchValue:
      "中国龟鳖养殖产业第一大物种;性别决定机制研究焦点龟种,孵化温度调控技术直接服务苗种生产。",
  },
  // 三线闭壳龟
  {
    latin: "Cuora trifasciata",
    etymology:
      "Cuora 属名词源记载不明;trifasciata 拉丁语三线的,指背甲三条黑棱,商品名金钱龟由此得名。",
    discovery:
      "1825 年 Bell 定名;因滋补辟邪观念遭数十年盗采,野生种群近乎绝迹,现列 IUCN 极危(CR)。",
    ecologyRole:
      "华南溪流水田缘的闭壳龟,遇险时腹甲韧带闭壳缩头,密不透风;杂食昆虫小鱼落果,要求清洁缓流生境。",
    researchValue:
      "中国龟类保护旗舰案例:人工繁育与放归监测并行推进;盗猎压力使其长期处于执法与伦理讨论的风口。",
  },
  // ===================== 蛇类与蜥蜴 =====================
  // 缅甸蟒
  {
    latin: "Python bivittatus",
    etymology:
      "Python 源自希腊神话德尔斐圣地巨蟒;bivittatus 拉丁语双纵带的,指背侧两条浅色纵纹。",
    discovery:
      "1820 年 Kuhl 定名,长期作印度岩蟒亚种,21 世纪依分子证据恢复种级;1990 年代起在美国佛州形成入侵种群。",
    ecologyRole:
      "雨林湿地顶级伏击捕食者,以缠绕窒息猎物;入侵佛罗里达后浣熊、负鼠等中型哺乳动物数量骤减,重塑食物网。",
    researchValue:
      "餐后心脏肠道等器官快速可逆增生,为脊椎动物器官可塑性研究提供极端模型,亦为爬行类基因组学重要物种。",
  },
  // 中华眼镜蛇
  {
    latin: "Naja atra",
    etymology:
      "Naja 源自梵语 nāga(蛇神);atra 拉丁语暗黑的,指通体深色。",
    discovery:
      "1842 年 Cantor 定名;中国南方分布最广的剧毒蛇,膨颈示威姿态为公众辨识经典形象。",
    ecologyRole:
      "丘陵平原夜行大毒蛇,广食鼠蛙蛇乃至同类,是南方农田生态系统上层捕食者,对鼠害有实际抑制作用。",
    researchValue:
      "抗眼镜蛇毒血清的主要免疫原物种;蛇伤防治体系重点对象,毒液神经毒素组成为受体药理学工具分子。",
  },
  // 银环蛇
  {
    latin: "Bungarus multicinctus",
    etymology:
      "Bungarus 为南亚环蛇土名的拉丁化;multicinctus 拉丁语多环带的,指环状白纹。",
    discovery:
      "1861 年 Blyth 定名;中国陆生毒蛇中毒性最强者之一,咬伤局部微痛易被轻忽,延误则呼吸肌麻痹。",
    ecologyRole:
      "夜行性毒蛇,主食其他蛇类与蜥蜴;常栖水田溪畔,雨夜活动频繁,与人畜活动时段部分重叠。",
    researchValue:
      "α-银环蛇毒素是分离鉴定乙酰胆碱受体的里程碑工具,奠基神经肌肉接头分子生物学;抗毒血清体系重点物种。",
  },
  // 短尾蝮
  {
    latin: "Gloydius brevicaudus",
    etymology:
      "Gloydius 属名纪念美国爬虫学家 Howard Gloyd;brevicaudus 拉丁语短尾的,指相对短粗的尾。",
    discovery:
      "1907 年 Stejneger 定名,长期陷于蝮蛇复合群分类纠葛,20 世纪末以来厘定为独立种。",
    ecologyRole:
      "平原丘陵常见毒蛇,夜行伏击,主食鼠类蜥蜴,对农田鼠害有实质控制;冬季常群聚越冬。",
    researchValue:
      "中国蝮蛇伤流行病学与抗毒血清研发的核心物种;毒液兼具血循与神经毒性,是混合毒型毒理学典型。",
  },
  // 大壁虎
  {
    latin: "Gekko gecko",
    etymology:
      "Gekko 为马来语拟声词的拉丁化,种名重复即其鸣声,是双名法中著名的拟声命名案例。",
    discovery:
      "1758 年林奈定名;广西俗称蛤蚧,即拟其鸣声,药材记载见于唐宋以来的本草。",
    ecologyRole:
      "岩壁树洞夜行守候型捕食者,主食昆虫;鸣声洪亮远传,兼具领域宣示;趾垫刚毛令其可在垂直岩面疾走。",
    researchValue:
      "壁虎黏附力学的奠基物种:2000 年代证明趾垫黏附以范德华力为主,催生干性仿生黏合材料;药材蛤蚧收入药典。",
  },
  // ===================== 鸟类 =====================
  // 非洲鸵鸟
  {
    latin: "Struthio camelus",
    etymology:
      "Struthio 为希腊语大鸟、鸵鸟;camelus 拉丁语骆驼的,喻其长颈高背,故古有骆驼鸟之称。",
    discovery:
      "1758 年林奈定名;阿拉伯亚种 20 世纪中叶灭绝,北非种群依赖重引入计划缓慢恢复。",
    ecologyRole:
      "稀树草原最大走禽,飞行丧失而奔跑强化,冲刺时速可达 70 公里;一雄数雌共巢,育雏混群御敌,产鸟类最大之卵。",
    researchValue:
      "现存最大最重鸟类,为鸟类飞行丧失与双足奔跑力学研究提供参照;规模化养殖供皮革肉食羽毛。",
  },
  // 环颈雉
  {
    latin: "Phasianus colchicus",
    etymology:
      "Phasianus 源自希腊语法西斯河之鸟,指黑海东岸 Phasis 河(今里翁河);colchicus 意为科尔基斯古国之鸟,二者同指其传入欧洲的故乡。",
    discovery:
      "1758 年林奈定名;罗马时代已引入西欧,后放归全球,成为分布最广的猎禽之一,中国为其原生分布中心。",
    ecologyRole:
      "林缘灌丛地栖雉类,雌雄羽色体型悬殊;主食种子昆虫,地面营巢受巢捕食压力大,依赖灌丛隐蔽。",
    researchValue:
      "猎禽放归管理与种群遗传学的经典物种;七彩山鸡养殖产业的经济主力,亚种分化与渐变群研究积累逾百年。",
  },
  // 红腹锦鸡
  {
    latin: "Chrysolophus pictus",
    etymology:
      "Chrysolophus 由希腊语 chrysos(金)与 lophos(冠羽)构成,指金色披肩状颈羽;pictus 拉丁语彩绘的。",
    discovery:
      "1758 年林奈定名;中国特有种,金鸡自古为祥瑞纹样来源,民间视其为凤凰形象的现实原型之一。",
    ecologyRole:
      "华中山地竹林灌丛地栖雉类,冬季下移成小群觅食;雄鸟求偶展示极尽华丽,夜栖高树躲避天敌。",
    researchValue:
      "性选择与羽色演化研究常用例证;观赏雉类养殖与保护教育的代表种,为中国中部山地特有鸟类的名片。",
  },
  // 绿头鸭
  {
    latin: "Anas platyrhynchos",
    etymology:
      "Anas 为拉丁语鸭;platyrhynchos 由希腊语 platys(宽)与 rhynchos(喙)构成,指宽扁喙。",
    discovery:
      "1758 年林奈定名;中国与欧洲家鸭的主祖,驯化历史数千年,品种资源丰富。",
    genomeInfo:
      "基因组约 1.2Gb,2n=80;高质量参考基因组已发表,广泛用于禽流感宿主与病毒互作研究。",
    ecologyRole:
      "北半球最广布的鸭类,城市公园亦常见;杂食滤食,是低致病性禽流感病毒的天然储存宿主与跨种传播链关键。",
    researchValue:
      "禽流感生态学与疫苗评估的标准动物模型;家鸭驯化起源与品种资源研究兼有科学与经济价值。",
  },
  // 鸳鸯
  {
    latin: "Aix galericulata",
    etymology:
      "Aix 出自古希腊记载的一种水鸟之名;galericulata 源自拉丁语 galerum(头盔),指耸立如小盔的羽冠。",
    discovery:
      "1758 年林奈定名;中华文化爱情鸟意象的源头,实际配对多仅维持一个繁殖季。",
    ecologyRole:
      "东亚林间溪河栖鸭,树洞营巢,雏鸟出巢跳落随母下水;秋季大量取食橡子等坚果,参与阔叶林种子扩散。",
    researchValue:
      "雄性华丽羽色为性选择与遗传多样性的经典教学例证;树洞巢生物学与城市种群动态研究在东亚持续开展。",
  },
  // 东方白鹳
  {
    latin: "Ciconia boyciana",
    etymology:
      "Ciconia 为拉丁语鹳;boyciana 纪念 19 世纪在远东采集的英国博物学者 Boyce(音译博伊斯)。",
    discovery:
      "1873 年英国博物学家郇和(Swinhoe)定名;长期被视为欧洲白鹳亚种,20 世纪末确认为独立种。",
    ecologyRole:
      "东北沼泽大树或高压铁塔营巢,长江中下游湿地越冬;迁徙通道集中,种群对湿地退化高度敏感,IUCN 濒危(EN)。",
    researchValue:
      "东北亚湿地保护旗舰,人工招引巢与卫星追踪支撑种群恢复研究;中国一级保护动物,环志数据积累深厚。",
  },
  // 金雕
  {
    latin: "Aquila chrysaetos",
    etymology:
      "Aquila 为拉丁语鹰,兼指罗马军团鹰旗与星宿;chrysaetos 由希腊语 chrysos(金)与 aetos(鹰)构成。",
    discovery:
      "1758 年林奈定名;哈萨克与蒙古族的金雕驯养狩猎传统延续至今,欧洲同有千年鹰猎史。",
    ecologyRole:
      "山地高原顶级猛禽,捕食野兔旱獭及中小型有蹄类幼崽;崖巢领域性极强,繁殖密度低而种群稳定。",
    researchValue:
      "猛禽保护与风电场碰撞风险评估的旗舰物种;驯雕文化的活态遗产,亦用于食物链重金属富集监测。",
  },
  // 雕鸮
  {
    latin: "Bubo bubo",
    etymology:
      "Bubo 为拉丁语雕鸮,本身即摹拟其鸣声,种名重复属双名中的拟声趣例。",
    discovery:
      "1758 年林奈定名;欧亚体型最大鸮类,20 世纪德国实施重引入计划,重建中西欧崖栖种群。",
    ecologyRole:
      "黄昏夜间顶级猛禽,主食鼠兔刺猬;领域鸣声低沉传播数公里,依赖岩壁古堡废墟等悬崖状生境营巢。",
    researchValue:
      "夜行猛禽听觉定位与无声飞行空气动力学的研究参照;电线铁路碰撞为主要非自然死因,驱动工程防护设计。",
  },
  // 麻雀
  {
    latin: "Passer montanus",
    etymology:
      "Passer 为拉丁语雀;montanus 意为山栖的,为命名时代对其生境的早期印象,实则更喜人居农地。",
    discovery:
      "1758 年林奈定名;1958 年除四害运动中种群遭重创,翌年移出名单;此后农膜农药与农地整治持续影响其数量。",
    ecologyRole:
      "伴人集群小鸟,育雏期大量捕虫喂雏,非繁殖期集群掠食谷物;巢址依赖建筑缝隙树洞,城乡梯度分布特征显著。",
    researchValue:
      "城市化适应行为生态学热点对象;种群变动被视为农业集约化与污染的预警信号,长期监测网络覆盖东亚欧洲。",
  },
  // 喜鹊
  {
    latin: "Pica serica",
    etymology:
      "Pica 为拉丁语喜鹊;serica 意为丝国之鸟,Seres 即古希腊罗马对产丝之中国的称呼。",
    discovery:
      "1845 年 Gould 定名;长期被视为欧亚喜鹊亚种,2010 年代依分子证据分立,今通称喜鹊即指本种。",
    ecologyRole:
      "城乡杂食性鸦科鸟,取食昆虫果实小动物;营带顶球状巢,冬季集群游荡,对碎片化城市生境适应力强。",
    researchValue:
      "鸦科认知研究明星谱系:欧洲近缘喜鹊 2008 年首证鸟类通过镜子自我认知测试,东方种群认知研究方兴未艾。",
  },
  // 家燕
  {
    latin: "Hirundo rustica",
    etymology:
      "Hirundo 为拉丁语燕;rusticus 意为乡野的,指其乐于农舍檐下泥巢繁殖的习性。",
    discovery:
      "1758 年林奈定名;迁徙与归巢研究历史悠久,欧洲环志与巢记录积累逾一个世纪。",
    ecologyRole:
      "檐下营泥巢的伴人繁殖鸟,空中捕虫为生;横跨洲际迁徙至非洲东南亚越冬,是物候与气候研究的指示鸟种。",
    researchValue:
      "迁徙生态学长期监测的经典模型;春季到达期提前被视为气候变暖敏感指标,人燕巢址关系演化亦受关注。",
  },
  // 远东山雀
  {
    latin: "Parus minor",
    etymology:
      "Parus 为拉丁语山雀;minor 意为较小的,命名时以别于欧亚大山雀。",
    discovery:
      "1848 年 Temminck 与 Schlegel 依日本标本定名;长期降为大山雀亚种,2000 年代后依鸣声分子证据复立种级。",
    ecologyRole:
      "东亚落叶林与城市公园常见山雀,冬季贮食种子;繁殖季以鳞翅目幼虫育雏,天然抑制森林虫害,依赖树洞营巢。",
    researchValue:
      "鸣声句法研究里程碑:实验证明警报与召集叫声组合可产生新含义,首次为鸟类提供组合性语言证据。",
  },
  // 普通翠鸟
  {
    latin: "Alcedo atthis",
    etymology:
      "Alcedo 为希腊语 alkyōn(翠鸟)的拉丁化,风平浪静的神话翠鸟日即指此鸟;atthis 相传为萨福诗中少女之名。",
    discovery:
      "1758 年林奈定名;欧亚非广布,中国溪河习见,俗称打鱼郎、鱼狗。",
    ecologyRole:
      "溪河静水区定点俯冲潜水捕鱼,凿土岸营巢;领域性强,对水质浊度与岸带结构敏感,为河流健康指示鸟。",
    researchValue:
      "羽色结构色(非虹彩蓝色)的光学与仿生色彩经典模型;食物链重金属富集监测常用物种。",
  },
  // 大斑啄木鸟
  {
    latin: "Dendrocopos major",
    etymology:
      "Dendrocopos 由希腊语 dendron(树)与 koptō(啄击)构成,意啄木者;major 拉丁语较大的。",
    discovery:
      "1758 年林奈定名;欧亚分布最广的啄木鸟,城市园林亦能定居繁殖。",
    ecologyRole:
      "凿木探取树皮甲虫幼虫,巢洞被次级洞巢鸟兽沿用,是森林与园林小生境的工程师物种;击木声兼具领域信号。",
    researchValue:
      "头部抗冲击结构长期为仿生吸震设计灵感来源;洞巢网络使其成为森林管理与老龄林保留论证的关键种。",
  },
  // ===================== 哺乳类与尾索动物 =====================
  // 树袋熊
  {
    latin: "Phascolarctos cinereus",
    etymology:
      "Phascolarctos 由希腊语 phaskolos(皮囊)与 arktos(熊)构成,意有袋之熊;cinereus 拉丁语灰烬色的。",
    discovery:
      "1817 年 Goldfuss 定名;澳洲东南种群因毛皮贸易与林地开发于 20 世纪初锐减,保护立法后缓慢回升。",
    genomeInfo:
      "2018 年发表高质量基因组;细胞色素 P450 基因家族显著扩张,助其代谢桉叶酚类毒素,为食性特化的基因组案例。",
    ecologyRole:
      "桉树专食性树栖有袋类,取食常限数种桉树;日睡近 20 小时以节能,桉林退化与碎片化直接决定种群存续。",
    researchValue:
      "澳洲旗舰保护物种,栖息地破碎化与衣原体疫病研究持续;雄性低频吼声传播与繁殖生态具行为学价值。",
  },
  // 马铁菊头蝠
  {
    latin: "Rhinolophus ferrumequinum",
    etymology:
      "Rhinolophus 由希腊语 rhis(鼻)与 lophos(冠)构成,指马蹄形鼻叶;种名拉丁语马蹄铁的,直指同一构造。",
    discovery:
      "1774 年 Schreber 定名;其回声定位研究逾百年,洞穴群栖习性使其在欧洲殖民时代即有系统博物学记载。",
    ecologyRole:
      "洞穴与旧建筑群栖蝙蝠,发出定频超声锁定飞行蛾类;雌性集群育儿,对洞穴微气候依赖极强。",
    researchValue:
      "听觉神经生理与声呐仿生研究的经典物种;菊头蝠类为多种冠状病毒的储存宿主,病毒生态学重点关注类群。",
  },
  // 野骆驼
  {
    latin: "Camelus ferus",
    etymology:
      "Camelus 源自希腊语 kamēlos(骆驼),更早可溯闪米特语;ferus 拉丁语野生的,以别于家养双峰驼。",
    discovery:
      "1878-1883 年普热瓦利斯基考察队在罗布泊-阿尔金山一带采集并定名;此后百余年与家驼的种级关系争议不断。",
    genomeInfo:
      "2n=74,基因组约 2Gb;野生与家养双峰驼基因组比较支持两者为独立演化谱系,为驯化起源研究提供关键对照。",
    ecologyRole:
      "存续于极端干旱戈壁,能耐受剧烈温差与贫瘠草场,据野外观察可利用高矿化度水源;罗布泊阿尔金山为中核分布。",
    researchValue:
      "IUCN 极危(CR),全球存活约千余峰,荒漠保护旗舰;干旱适应的生理与基因组机制具潜在转化价值。",
  },
  // 儒艮
  {
    latin: "Dugong dugon",
    etymology:
      "Dugong 源自马来语 duyung(海中女子),与美人鱼传说同源;种名重复沿用俗名。",
    discovery:
      "1776 年 Müller 定名;2022 年系统评估认为中国海域种群已功能性灭绝,为海洋巨型动物衰退的标志性案例。",
    ecologyRole:
      "唯一严格海洋生活的草食性海牛类,专食海草,沿浅海草床成行割食留下沟痕,是海草床生态工程师与指示种。",
    researchValue:
      "IUCN 易危(VU)的海草床保护旗舰物种;中国功能性灭绝评估成为全球海洋生物多样性丧失讨论的基准案例。",
  },
  // 东北刺猬
  {
    latin: "Erinaceus amurensis",
    etymology:
      "Erinaceus 为拉丁语刺猬;amurensis 意为阿穆尔河(黑龙江)流域的,指模式产地。",
    discovery:
      "1859 年 Schrenk 据阿穆尔河流域标本定名;长期作欧洲刺猬亚种,后分立为种,中国北方至俄远东广布。",
    ecologyRole:
      "城郊夜行食虫者,主食蛞蝓甲虫蚯蚓;遇敌蜷成刺球,冬季休眠;庭院绿地与灌丛为其重要城市庇护所。",
    researchValue:
      "常被视为真盲缺类古老分支的代表,为胎盘类早期演化提供参照;城市刺猬种群与蜱媒病原研究活跃。",
  },
  // 柄海鞘
  {
    latin: "Styela clava",
    etymology:
      "Styela 源自希腊语 stylos(柱);clava 拉丁语棍棒,指具长柄的棒状体形。",
    discovery:
      "1881 年 Herdman 定名;原产西北太平洋,20 世纪 50 年代随船底污损首现英国,继而扩散欧洲大洋洲成入侵种。",
    ecologyRole:
      "附着于码头船底养殖笼的滤食者,滤食浮游生物;密集群落与养殖贝类竞争食物空间,改变附着带群落结构。",
    researchValue:
      "尾索动物发育生物学的经典材料;亦是防污技术研发与海洋入侵生物学研究的双重模式生物。",
  },
  // ===================== 清单追加批次(尾索/鱼类/爬行/鸟类/兽类) =====================
  // 线纹海马
  {
    latin: "Hippocampus erectus",
    etymology:
      "Hippocampus 由希腊语 hippos(马)与 kampos(海怪)构成,指马首卷尾;erectus 拉丁语直立的,指垂直游姿。",
    discovery:
      "1810 年 Perry 定名;西大西洋海马,自北美沿岸分布至南美,栖海草床海绵与结构物群落。",
    ecologyRole:
      "缠绕定居于海草与海绵群落,以小型甲壳类为食;雄鱼育儿袋孕育后代,对海草床退化与富营养化敏感。",
    researchValue:
      "雄性妊娠与育儿袋免疫耐受研究的重要物种;CITES 海马贸易监管覆盖种,种群监测数据持续积累。",
  },
  // 泥鳅
  {
    latin: "Misgurnus anguillicaudatus",
    etymology:
      "Misgurnus 属名词源记述不明,或为欧洲俗名拉丁化;anguillicaudatus 由拉丁语 anguilla(鳗)与 cauda(尾)构成。",
    discovery:
      "1842 年 Cantor 定名;东亚稻田沟渠习见小鱼,民间誉为水中人参,日韩市场消费传统深厚。",
    ecologyRole:
      "泥底栖居,可肠呼吸耐受极低溶氧,干旱时钻泥存活;杂食有机碎屑底栖生物,是稻田生态系统的纽带物种。",
    researchValue:
      "肠呼吸与耐低氧适应的经典生理材料;自然界并存二倍体四倍体与单性克隆系,为多倍体起源研究提供独特体系。",
  },
  // 眼镜王蛇
  {
    latin: "Ophiophagus hannah",
    etymology:
      "Ophiophagus 由希腊语 ophis(蛇)与 phagos(食)构成,意食蛇者;hannah 词源无定论,或与印度神话蛇神相关。",
    discovery:
      "1836 年 Cantor 依印度标本定名;世界最长毒蛇,成体常逾 3 米,纪录接近 6 米。",
    genomeInfo:
      "2013 年发表全基因组,为最早完成测序的毒蛇之一,毒液多基因家族的扩张与演化成为研究热点。",
    ecologyRole:
      "热带雨林季雨林顶层蛇类捕食者,主食其他蛇类与蜥蜴;是唯一会集叶筑巢并护卵的蛇类,护巢期攻击性显著。",
    researchValue:
      "蛇毒兼具神经毒与细胞毒,抗血清研发关键物种;筑巢护卵行为在蛇类行为学中罕见,东南亚蛇伤医学重点对象。",
  },
  // 竹叶青蛇
  {
    latin: "Trimeresurus stejnegeri",
    etymology:
      "Trimeresurus 由希腊语 tri(三)、meros(节)与 oura(尾)构成,或指尾部分节形态;种名纪念美国爬虫学家 Stejneger。",
    discovery:
      "20 世纪 20 年代 Schmidt 定名;华南山地习见的树栖毒蛇,通体碧绿因此得名竹叶青。",
    ecologyRole:
      "夜行树栖伏击,栖灌丛竹梢,以蛙蜥蜴小兽为食;卵胎生,尾具缠绕性,颊窝红外感知与保护色协同狩猎。",
    researchValue:
      "以血循毒为主的蛇伤防治对象;颊窝红外感知是蛇类热成像研究的代表结构,生态位分化研究亦有积累。",
  },
  // 暹罗鳄
  {
    latin: "Crocodylus siamensis",
    etymology:
      "Crocodylus 源自希腊语 krokodeilos(砾石间爬行者,后指鳄);siamensis 意为暹罗(今泰国)的。",
    discovery:
      "1801 年 Schneider 定名;野外种群因皮草贸易于 20 世纪几近覆灭,残余个体零散分布于柬埔寨泰国。",
    ecologyRole:
      "淡水沼泽缓流湿地的顶级捕食者,堆叶筑巢;其洞穴巢丘在旱季为鱼类两栖类提供庇护,具湿地工程师效应。",
    researchValue:
      "IUCN 极危(CR);柬埔寨孵育放归计划使其成为鳄类保护样板;养殖种群因历史杂交致种质纯正性问题突出。",
  },
  // 虎皮鹦鹉
  {
    latin: "Melopsittacus undulatus",
    etymology:
      "Melopsittacus 由希腊语 melos(歌)与 psittakos(鹦鹉)构成,意善歌的鹦鹉;undulatus 拉丁语波纹的,指翅背波状纹。",
    discovery:
      "1805 年 Shaw 定名;约 40 年后引入欧洲,自此成为全球数量最多的笼养鹦鹉,羽色品系数以百计。",
    genomeInfo:
      "基因组约 1.2Gb;系 2014 年鸟类生命之树 48 物种基因组计划成员,用于解析鹦鹉类发声学习的演化。",
    ecologyRole:
      "澳洲内陆干旱区的游牧性鹦鹉,追逐雨后草籽暴发繁殖;旱年集成数万只大群长距离移动,利用树洞营巢。",
    researchValue:
      "雀形目之外发声学习研究的代表物种,为鸣声学习神经环路的平行演化提供关键对照;宠物遗传学积累深厚。",
  },
  // 鸿雁
  {
    latin: "Anser cygnoides",
    etymology:
      "Anser 为拉丁语雁;cygnoides 由希腊语 kyknos(天鹅)加后缀 -oides(似)构成,指颈长似天鹅。",
    discovery:
      "1758 年林奈定名;中国家鹅的主要驯化祖先,驯化史逾两千年,与欧洲灰雁驯化鹅并立为两大独立起源。",
    ecologyRole:
      "东北草原沼泽繁殖、长江中下游越冬的候雁;鄱阳湖越冬种群庞大,对水位与草洲变化敏感,IUCN 易危(VU)。",
    researchValue:
      "家鹅驯化起源基因组研究的核心物种;迁徙与越冬监测支撑黄渤海及长江湿地保护网络评估。",
  },
  // 白冠长尾雉
  {
    latin: "Syrmaticus reevesii",
    etymology:
      "Syrmaticus 源自希腊语 syrma(曳地长裾),指修长尾羽;种名纪念英国博物学家 John Reeves。",
    discovery:
      "1829 年 Swainson 定名;中国中部山地特有雉类,雄鸟尾羽可逾 1.5 米,保有鸟类最长尾羽纪录。",
    ecologyRole:
      "华中山地林缘灌丛地栖,冬季成小群;雄鸟转向飞行时以超长尾羽为空气动力舵,为雉类中罕见特化。",
    researchValue:
      "中国特有濒危雉类(VU),栖息地片段化研究旗舰;尾羽曾用于戏曲雉翎行头,兼具人文与保护教育价值。",
  },
  // 长耳鸮
  {
    latin: "Asio otus",
    etymology:
      "Asio 为拉丁语有角之鸮;otus 源自希腊语 ōtus(角鸮),与 ous(耳)同根,指直立耳羽簇。",
    discovery:
      "1758 年林奈定名;全北界广布,越冬期常数十只集群栖于城市公园林地,昼栖夜猎。",
    ecologyRole:
      "田鼠专项捕食者,种群数量随鼠类周期波动;占用鸦鹰旧巢繁殖,不自筑巢,越冬集群体监测便利。",
    researchValue:
      "鼠害生物防治与啮齿类周期研究的指示猛禽;越冬集群易统计,是长期监测优选,铅毒与鼠药暴露研究亦有积累。",
  },
  // 亚洲黑熊
  {
    latin: "Ursus thibetanus",
    etymology:
      "Ursus 为拉丁语熊;thibetanus 意为西藏的(Thibet 为旧式拼写),缘于早期标本经藏边流入欧洲。",
    discovery:
      "19 世纪 20 年代经 G. 居维叶定名;胸前新月形白斑为其标志,英文遂称月熊。",
    ecologyRole:
      "林栖杂食大熊,主食壳斗科坚果浆果昆虫,食性季节性显著;自热带至寒温带森林均有分布,北方种群冬季冬眠。",
    researchValue:
      "活熊取胆争议推动熊去氧胆酸替代途径研究,成为中国动物保护立法里程碑;IUCN 易危,中国二级保护动物。",
  },
  // 马来熊
  {
    latin: "Helarctos malayanus",
    etymology:
      "Helarctos 由希腊语 hēlios(太阳)与 arktos(熊)构成,意太阳熊,指胸前旭日形胸斑;种名意为马来半岛的。",
    discovery:
      "19 世纪 20 年代初莱佛士(Raffles)据苏门答腊标本定名;为现存体型最小的熊科物种。",
    ecologyRole:
      "热带雨林中树栖性最强的熊类,主食无花果等果实与白蚁蜂巢,是重要种子传播者;栖息地丧失与盗猎威胁并存。",
    researchValue:
      "IUCN 易危(VU),东南亚雨林保护旗舰之一;人兽冲突与救援放归研究积累渐丰,食果生态为雨林更新研究提供素材。",
  },
];
