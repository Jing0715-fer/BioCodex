# -*- coding: utf-8 -*-
"""E29-b2: build expanded fields for batch2 (173 species)."""
import json

E = {}  # latin -> {field: text}

# ============ morphology (noimg=true: 60-110 chars) ============
E['Claviceps purpurea'] = {'morphology': '菌核弯角状、暗紫色,长1-5厘米,表面具纵沟,质坚硬,断面粉白带紫晕;萌发产生带细柄的头状子座,头部球形,子囊壳埋生于子座表层,孔口外露;子囊孢子丝状无色。'}
E['Welwitschia mirabilis'] = {
    'morphology': '茎粗短倒锥形,木质,直径可达1米,树皮厚而扭曲;终生仅两片带状真叶,自茎顶环状基部长出,革质,叶基持续生长,长达数米,被风撕裂成条带状;雌雄异株,球果具翅;具粗壮直根。',
    'distribution': '特产于纳米比亚与安哥拉南部库内内河一带的纳米布沙漠海雾带,分布区狭窄,世界各地植物园有引种栽培。'}
E['Fasciola hepatica'] = {'morphology': '虫体扁平叶状,形似柳叶,长2-3厘米、宽约1厘米,棕褐色;前端锥形头锥上着生口、腹吸盘,体表覆细棘;肠支与睾丸高度分支,卵黄腺布满体侧,子宫盘曲于体前部。'}
E['Ascaris lumbricoides'] = {'morphology': '虫体圆柱形似蚯蚓,乳白微带粉红,体表具细横纹;口周具三片唇瓣;雌虫长20-35厘米,尾端锥直,雄虫略小,尾端向腹面弯曲并具一对交合刺;虫卵椭圆形,外被波浪状蛋白膜。'}
E['Meretrix meretrix'] = {
    'morphology': '壳三角卵圆形、膨圆光滑,壳长可达7厘米;壳面黄白或浅褐,具褐色锯齿纹或云状放射彩纹,内面瓷白;铰合部具主齿,外套窦浅;斧状足发达,适于潜沙爬行。',
    'distribution': '广布于中国南北沿海及朝鲜半岛、日本、越南等西太平洋暖水海域,是中国滩涂养殖的传统贝类。'}
E['Apostichopus japonicus'] = {'morphology': '体圆筒形,背面隆起,体长可达40厘米;背肉刺四至六行排列成行,体壁肥厚;口在前端腹侧,具二十枚楯状触手;腹面密布管足;体色有黑褐、黄褐、青灰与白等色型。'}
E['Anguilla japonica'] = {'morphology': '体蛇形细长,黏滑,鳞细小呈带状埋于皮下;头尖长,下颌稍突出;背鳍与臀鳍长并与尾鳍相连,胸鳍短圆;背部暗绿褐、腹部银白,可长逾1米;降海繁殖前体转银亮,眼径增大。'}
E['Dendrocopos major'] = {
    'morphology': '体长约22-23厘米;上体黑色,翼具白横斑与白肩斑;下体污白,下腹与尾下覆羽鲜红;尾羽硬直,外侧白色,借以撑贴树干;雄鸟枕部具红斑,幼鸟头顶红;喙灰黑锥形,舌长具倒钩。',
    'distribution': '广布于欧亚大陆温带至寒温带森林带,并延伸至北非;中国各地林区常见,多为留鸟。'}
E['Ciona intestinalis'] = {'morphology': '体长10-15厘米,长圆筒形,以基部固着;被囊薄而透明,可透见内部鳃笼;体壁具数条纵行肌带;顶端具入水管与出水管各一,管缘常具橙黄色环纹;个体常密集群生。'}
E['Legionella pneumophila'] = {'morphology': '革兰氏阴性纤细杆菌,端生或侧生鞭毛,运动活泼;不发酵糖类,生长需半胱氨酸与铁;专性胞内寄生,在阿米巴与巨噬细胞内繁殖;菌落灰白,边缘具波纹。'}
E['Listeria monocytogenes'] = {'morphology': '革兰氏阳性短杆菌,常呈V形或成对排列;无芽孢、无荚膜;25°C下借周生鞭毛作翻滚运动,37°C则不运动;菌落小而蓝灰、半透明,乙型溶血;陈旧培养物可成长丝状。'}
E['Acanthamoeba castellanii'] = {'morphology': '滋养体15-35微米,形态不规则,体表伸出细棘状伪足,缓慢滑行,胞核内含大核仁;遇不良环境缩成圆球,包囊双层壁,直径10-25微米,外壁皱纹状、内壁呈多角形星芒状。'}
E['Plasmodium vivax'] = {'morphology': '环状体约占红细胞直径三分之一;滋养体阿米巴样,受染红细胞胀大、褪色并现薛氏细点;成熟裂殖体含12-24个裂殖子,疟色素棕黄细粒状;配子体圆形,几乎充满胀大的红细胞。'}
E['Aspergillus flavus'] = {'morphology': '菌落生长迅速,绒状,初黄绿后转褐;分生孢子梗壁粗糙无色,顶端膨大成近球形顶囊,产孢结构单层,分生孢子头黄绿色放射状;分生孢子球形、表面细刺,串链着生。'}
E['Cordyceps militaris'] = {'morphology': '子座单生或数枚,自蛹体头胸部发出;柄圆柱形,淡黄白色;顶部可孕部分棒状至圆柱状,橙黄至橙红,高2-8厘米,表面密布细小孔口;子囊孢子线形、多隔;蛹体外被白色菌丝膜。'}
E['Nepenthes mirabilis'] = {'morphology': '攀援藤本,茎圆柱形可长数米;叶中脉延伸成卷须,末端具瓶状捕虫笼,笼长数厘米至十余厘米,绿色常带红斑,笼口具沟槽状唇与盖,盖下密布蜜腺;总状花序,花小暗褐,雌雄异株。'}
E['Camellia japonica'] = {'morphology': '常绿灌木或小乔木,枝灰色;叶革质椭圆形,长5-10厘米,深绿光亮,缘具细锯齿;花近无柄,单生枝顶,径5-10厘米,花瓣红色、先端微凹;蒴果球形,3室,种子近球形有棱。'}
E['Cinnamomum cassia'] = {'morphology': '常绿乔木,高可达10余米;幼枝略呈四棱形;树皮灰褐,内皮红棕色,香气浓郁;叶对生长椭圆形,长8-20厘米,离基三出脉;圆锥花序,花小黄绿色;果卵球形,熟时紫黑,托以浅杯状果托。'}
E['Echinocactus grusonii'] = {'morphology': '球形多肉植物,幼株浑圆,老株高可达1米余;茎绿色,具21-37条锐棱;辐射刺8-12枚、金黄色,中刺1-4枚,硬直如针;顶部密被黄色绵毛,漏斗状黄花自绵毛中开出。'}
E['Panax notoginseng'] = {'morphology': '多年生草本,高30-60厘米;主根肉质,倒圆锥形或拳状,表面灰黄;掌状复叶3-6枚轮生茎顶,小叶5-7枚,缘具细锯齿;伞形花序顶生,花黄绿色;果熟时鲜红色。'}
E['Luehdorfia chinensis'] = {'morphology': '中型凤蝶,翅展55-65毫米;体黑色被毛;前翅黄色底上贯黑色虎纹斜带,后翅黑黄相间,外缘红色斑列清晰,尾突短;翅反面黄褐,斑纹同正面而色浅;飞翔低缓。'}
E['Gryllus bimaculatus'] = {'morphology': '体黑褐粗壮,长15-25毫米,具光泽;头大,复眼突出;雄虫前翅达腹端,基部各具一枚黄白斑,翅上具发声器,摩擦发声;雌虫产卵管细长针状;后足股节粗壮善跳,尾须长。'}
E['Catharsius molossus'] = {'morphology': '体黑色粗壮,略呈半球形,长20-30毫米,体表具强光泽;雄虫头具片状角突,唇基铲状;前足开掘式,胫节外缘具齿列;鞘翅隆拱、密布刻点。'}
E['Chlamys farreri'] = {'morphology': '壳扇形,近圆形,壳高可达8-10厘米;左壳灰褐、右壳色浅,均具放射肋,肋上着生棘状小突起;壳前耳大,其腹面具栉孔列,幼贝以黄褐足丝附着;闭壳肌肥大,干制为干贝。'}
E['Corbicula fluminea'] = {'morphology': '壳三角卵圆形,膨胀,长2-3厘米;壳面粗糙,黄褐至黑褐色,同心生长轮脉细密;壳内面瓷白或淡紫,外套窦浅;斧足发达、白色,善潜沙爬行。'}
E['Pheretima aspergillum'] = {'morphology': '体圆柱形粗大,长15-20厘米、宽约1厘米,体节百余个;背部紫灰或紫红色,腹面色淡;每节刚毛成环排列;环带位于第14-16节,色浅光滑,呈戒指状。'}
E['Calanus sinicus'] = {'morphology': '体长2-3毫米,透明微黄;头胸部粗大呈椭圆,腹部短小;第一触角细长过体,雌体春末常见成对灰白卵囊悬挂体侧;尾叉短小,具尾刚毛;雄体右第一触角特化为执握肢。'}
E['Thunnus orientalis'] = {'morphology': '体纺锤形,吻尖,口大;体覆小鳞,胸鳍短;第一背鳍可收入沟内,第二背鳍与臀鳍小;尾柄具发达侧突与新月形尾鳍;背部深蓝、腹部银白,体侧闪银;成体可逾2米、重数百公斤。'}
E['Trimeresurus stejnegeri'] = {'morphology': '体侧扁细长,全长可达80厘米;头大呈三角形,覆细鳞,瞳孔直立,鼻孔与眼间具颊窝;背鳞翠绿,体侧具白色或黄白纵线,腹面黄白;尾具缠绕性,末端焦红色;具长管牙。'}
E['Melopsittacus undulatus'] = {'morphology': '体长约18厘米,尾长约占三分之一;头圆,钩喙灰白;原种额与脸黄色,颊部具紫色斑块,喉部具小黑斑;背部黄绿布黑色波状横纹,翅具黑纹与黄斑;蜡膜雄蓝雌褐;人工品系羽色繁多。'}
E['Panthera uncia'] = {'morphology': '体长约1-1.3米,体重25-55公斤;毛被厚密,底色灰白,缀黑边空心玫瑰斑,头颈斑点小而密;头小而圆,耳短圆;四肢粗短,足垫宽大被毛;尾粗长近体长,用作平衡与保暖。'}
E['Ursus maritimus'] = {'morphology': '体长可达3米,雄性体重可逾500公斤,为熊科最大;毛白色而中空半透明,皮下脂肪厚;耳小、颈长、吻长;足掌宽大,具防滑粗垫与短黑弯爪;跖行式行走。'}
E['Manis pentadactyla'] = {'morphology': '头体长42-60厘米,尾长约25-38厘米;体背与体侧覆棕褐色瓦状重叠鳞甲,鳞间夹毛,腹面无鳞被毛;吻尖无齿,耳小;舌细长可伸逾体长;前爪粗壮适掘穴,遇敌蜷成球状。'}
E['Pantholops hodgsonii'] = {'morphology': '肩高约80厘米,体重25-40公斤;体背棕黄,腹部白,四肢前侧具黑纹;雄羊角长50-70厘米、近黑色,直而微后弯呈竖琴状,表面具横环棱;雌羊无角;鼻腔膨大适应缺氧。'}
E['Bacillus anthracis'] = {'morphology': '革兰氏阳性粗大杆菌,长3-10微米,首尾相接呈竹节状长链;芽孢椭圆形,位于菌体中央、直径不膨大;体内形成荚膜;无鞭毛;菌落灰白粗糙,边缘呈卷发状。'}
E['Pasteurella multocida'] = {'morphology': '革兰氏阴性小球杆菌,单个或成双、短链排列;经瑞氏染色呈特征性两极浓染;无鞭毛与芽孢,新分离菌株具多糖荚膜;菌落灰白湿润、光滑。'}
E['Planktothrix rubescens'] = {'morphology': '藻丝单条、直或略弯,不分支;细胞圆柱形,横壁不收缢,宽3.5-8微米;细胞内含气囊与红色藻胆蛋白,群体呈紫红至铁锈色;顶端细胞钝圆,无异形胞。'}
E['Candida albicans'] = {'morphology': '细胞卵圆形,长4-8微米,出芽繁殖;条件适宜时延伸为假菌丝乃至侵入性真菌丝,顶端可生球形厚垣孢子;菌落乳白奶油状、光滑,中央凸起。'}
E['Beauveria bassiana'] = {'morphology': '菌丝白色绒毛状;分生孢子梗瓶状、簇聚成放射花环,分生孢子球形、直径2-3微米;菌落粉状,初白后转乳黄,常显同心轮纹;寄主虫尸僵硬,覆满白色孢子粉。'}
E['Sorghum bicolor'] = {'morphology': '一年生高大草本,秆直立实心多髓质,高1-4米,节间常具白色蜡粉;叶片披针形,中脉白色;圆锥花序大而密集,或直立或下垂;颖果裸露,圆卵形,红褐或白色。'}
E['Setaria italica'] = {'morphology': '一年生草本,秆直立,高0.5-1.5米;叶片线状披针形;圆锥花序圆柱状密生成穗,下垂或直立,主轴密生刚毛,小穗下托数枚粗刚毛;颖果小,卵圆形,黄色或黑褐色。'}
E['Nicotiana tabacum'] = {'morphology': '一年生高大草本,高1-2米,全株被带黏液的腺毛;叶大型长椭圆形,无柄抱茎或下延;顶生圆锥花序,花冠漏斗状、粉红色;蒴果卵形,熟时2裂,种子细小褐色。'}
E['Mangifera indica'] = {'morphology': '常绿大乔木,高可达10余米;单叶互生,革质披针形,嫩叶铜红色;圆锥花序顶生,花小、黄绿带红晕;核果大而肾形,中果皮肉质、黄或橙红,内果皮纤维质,包被种子。'}
E['Schistocerca gregaria'] = {'morphology': '群居型成虫体长60-75毫米;前胸背板鞍形;前翅橙黄、半透明,具黑斑;后足股节粗壮,内侧鲜红,遇扰显露警戒色;独居型体色暗淡,草绿或土褐;头大,复眼突出,触角丝状。'}
E['Oncomelania hupensis'] = {'morphology': '壳高7-10毫米,长圆锥形,具5-8个螺层;壳面黄褐,纵肋粗细随生境变异;壳口卵圆形,周缘常具黑色窄框;厣角质黄褐;触角细长,鳃退化,兼营皮肤呼吸。'}
E['Rhopilema esculentum'] = {'morphology': '伞径30-50余厘米,半球形,胶质层厚,体色乳白带青蓝或浅褐;伞缘无触手;口腕8条、三翼型褶皱,肩板发达,末端具棒状附属器;碟状幼体经横裂生殖大量产出。'}
E['Limulus polyphemus'] = {'morphology': '体长含尾剑可达60厘米,雌体大于雄体;头胸甲马蹄形,背面具一对侧复眼与一对中单眼;腹甲六对板状附肢,后缘具六对侧刺;尾剑三棱、细长;甲壳棕褐;雄体第一对步足特化为钩状交配钩。'}
E['Oreochromis niloticus'] = {'morphology': '体侧扁呈长椭圆形,被中大圆鳞;体灰蓝带橄榄绿,体侧具数条暗色垂直纹;背鳍具十余枚硬棘,延续至尾柄;尾鳍平截、终生具暗色垂直横纹;繁殖期雄鱼喉胸呈灰黑色。'}
E['Brachymystax lenok'] = {'morphology': '体长侧扁,纺锤形;鳞细小,侧线完全;具脂鳍;口小,上颌骨后延不过眼后缘,上颌具一对短须;背部青绿色,体侧散布较大黑色斑点;繁殖期体色加深,腹部泛橙红。'}
E['Columba livia'] = {'morphology': '体长约32厘米,头圆喙短;体蓝灰色,颈羽具绿色与紫红色金属辉光,翼上两道黑色横斑,腰部白色,尾端具黑带;眼橙红色,蜡膜白色,脚紫红;雌鸟羽色较暗淡。'}
E['Meriones unguiculatus'] = {'morphology': '体细长,头体长9-11厘米,体重约60-100克;背毛沙黄褐、腹毛白色;眼大而黑;尾长与体近等,被密毛、端部具黑色毛簇;足掌被毛,爪黑而锐,善掘穴。'}
E['Nasonia vitripennis'] = {'morphology': '体长约2毫米,具蓝绿金属光泽;眼红色,触角膝状;足黄褐色;翅透明无斑;腹部具短柄;雌虫腹末具短产卵器,可刺入蝇蛹壳产卵。'}
E['Megachile rotundata'] = {'morphology': '体长7-10毫米,灰黑色;雌蜂腹面具橘黄色采粉毛刷,大颚发达,用以切割叶片筑巢;雄蜂额区密布白毛;翅透明微带烟色;巢室以圆叶片卷成筒状。'}
E['Aedes albopictus'] = {'morphology': '体长约5毫米,通体黑色;胸背具一条纵行银白条纹,其侧另具白色条斑;腹部各背板基部具白环;后足多节具白环、末跗节全白;翅鳞黑色;喙细直。'}
E['Cloeon dipterum'] = {'morphology': '体长约1厘米,纤弱,体色橙褐或灰白;前翅三角状、膜质透明,后翅完全退化;尾丝两条与中尾丝共三条,约体长两倍;雄虫复眼上部呈罩状隆起;成虫口器退化,不再取食。'}
E['Forficula auricularia'] = {'morphology': '体长12-15毫米,扁平,红褐至深褐色,具光泽;触角念珠状;前翅短革质,后翅如折扇收纳其下;腹部末端尾铗钳状,雄虫铗长而弯、分大小两型,雌虫铗短直;翅罕用。'}
E['Aquatica leii'] = {'morphology': '成虫体长约1厘米,头小,复眼大;前胸背板橙红色,鞘翅黑褐;雄虫翅完整善飞,雌虫翅短缩、腹背外露;腹末发光器乳白色,夜间发出绿色冷光,闪烁求偶。'}
E['Hyphantria cunea'] = {'morphology': '翅展3-4厘米,成虫体翅纯白,部分个体前翅具黑点;雄触角双栉齿状,雌锯齿状;老熟幼虫头部黑亮,背部具黑褐纵带,体侧黄毛发达,毛瘤上着生白色长毛。'}
E['Pediculus humanus'] = {'morphology': '体长2-3毫米,背腹扁平,灰白色;头小,眼退化;三对足粗壮,胫节与爪合抱成钳,可紧握毛发与纤维;腹部膨大、分节明显,侧缘气门略突出;卵白色,胶粘于毛发或衣缝。'}
E['Amphiprion ocellaris'] = {'morphology': '体椭圆形,侧扁;口小前位,眼大;体橙红色,具三条镶黑边的白色环带,背鳍与臀鳍上各有一枚黑缘眼斑;各鳍外缘黑;成体长约8厘米;雌雄同形,雌体略大。'}
E['Lates niloticus'] = {'morphology': '体延长而侧扁,被栉鳞;背鳍发达,前为硬棘后为软条、深凹;口大,上颌后延过眼,颌齿细密;尾鳍圆扇形;体银灰泛蓝,成鱼眼周与口部金黄;最大逾2米、200公斤。'}
E['Anguilla marmorata'] = {'morphology': '体鳗形粗壮,成体逾1米,大者达2米;头锥形,口大唇厚,下颌稍突出;鳞细小埋于皮下;背部与体侧布黄褐色云纹状大理石斑;背鳍起点远在胸鳍之后,与臀鳍、尾鳍相连。'}
E['Oncorhynchus kisutch'] = {'morphology': '体流线形,银蓝色,腹部雪白;背部与尾鳍散布黑点,尾鳍黑点呈放射状;具脂鳍,齿尖锐;成体60-80厘米;繁殖期雄鱼弓背、上下颌弯成钩吻,体侧转鲜红,腹部转暗。'}
E['Hypophthalmichthys nobilis'] = {'morphology': '体侧扁而高大,腹部仅腹鳍至肛门间具腹棱;头大而圆钝,约占体长三分之一;口端位,眼小位低;体灰黑,体侧散布不规则暗斑;鳞细小;鳃耙密而彼此分离,连成滤食筛。'}
E['Cynoglossus semilaevis'] = {'morphology': '体舌状、极侧扁,两眼居左侧;口裂弯呈弧形;鳞细小埋于皮下,无胸鳍;背鳍、臀鳍与尾鳍相连;有眼侧褐色具黑斑,无眼侧乳白;成体雌鱼可达半米余,远大于雄鱼。'}
E['Alauda arvensis'] = {'morphology': '体长约18厘米,头具短羽冠、受惊可竖立;背面沙褐具黑褐纵纹,眉纹浅白;胸棕色具细黑纵纹,腹部污白;外侧尾羽白色;后爪长而近直;起飞时两翼宽展,姿态朴拙。'}
E['Certhia familiaris'] = {'morphology': '体长约12厘米,上体棕褐杂白点,翅具淡色横斑;眉纹浅白;喙细长下弯;尾羽坚硬而尖,借以撑贴树干;下体污白;爪弯而有力,螺旋攀绕树干觅食。'}
E['Parus major'] = {'morphology': '体长约14厘米;头黑具大白领颊斑,背橄榄绿,翅上具一道白翼斑;腹部黄色,自喉至下腹贯以黑色宽胸带;尾蓝灰较长;喙短而锐;性活泼,常攀吊枝梢。'}
E['Nymphicus hollandicus'] = {'morphology': '体长约32厘米,近半为长尾;通体灰羽,头具可竖立的尖细冠羽;面颊具橙红色圆斑;翼具白色翼斑;喙灰白钩状;雌鸟尾下覆羽具横斑;驯化色型繁多。'}
E['Glaucidium cuculoides'] = {'morphology': '体长约23厘米;头圆无耳簇,面盘不显;通体密布棕白横斑,喉与眉纹白色;虹膜黄色,喙黄绿,半垂眼睑似睡非醒;尾具横斑;跗蹠被羽,爪黑而锐。'}
E['Apus apus'] = {'morphology': '体长约17厘米,翅展逾40厘米;通体暗褐,仅喉部污白;翅狭长如镰,飞行迅捷;尾浅叉;眼大而黑;喙极短,嘴裂宽阔;脚极短弱,爪弯,仅能攀附垂直面。'}
E['Alectoris chukar'] = {'morphology': '体长约33厘米,上体灰棕;眉纹白色显著,其下具黑色贯眼纹;喉白色,围以黑色项圈;胸灰蓝,体侧具十余道栗黑相间横纹;喙与脚红色;尾圆短。'}
E['Castor canadensis'] = {'morphology': '外形与欧亚河狸几无差别,头体长74-90厘米,体重可逾25公斤;体毛栗褐、绒毛致密;耳小圆,潜水时耳鼻孔可关闭;尾覆鳞片、扁平如桨;后足具蹼,第二趾具梳爪;门齿橙黄而强健。'}
E['Spermophilus citellus'] = {'morphology': '体长约20厘米,体圆而肥硕;尾短仅5-7厘米;背毛黄褐杂以暗斑,腹面浅黄;耳极小近裸;眼大而突出;前爪弯锐善掘;遇险直立后足并尖啸报警。'}
E['Rhinolophus sinicus'] = {'morphology': '体型中小,前臂约5厘米;蹄铁状鼻叶复杂而醒目,由马蹄叶、鞍状叶与竖立的联接叶叠成;耳大无耳屏;翼宽;背毛深褐、腹毛浅褐;静止时以翼膜裹身倒挂洞顶。'}
E['Nyctereutes procyonoides'] = {'morphology': '体长50-70厘米,体重4-10公斤;体粗钝而腿短;毛灰褐至暗褐,四肢深黑褐;面部具黑褐色面罩纹,颊毛长而蓬松;尾粗短下垂、毛蓬松,端部色深;冬毛厚实。'}
E['Deinagkistrodon acutus'] = {'morphology': '体长1-1.5米;头大呈三角,背覆对称大鳞,吻端尖突上翘,鼻孔与眼间具颊窝,瞳孔直立;背鳞起棱,棕褐底色上具一列深色菱形斑块;腹面白色,两侧具暗斑;尾尖具角质尖刺。'}
E['Pelochelys cantorii'] = {'morphology': '背盘长1-1.3米、重可达100公斤以上,为鳖科体型最大者之一;吻突极宽钝,不及眼径之半;背甲覆柔软皮肤,裙缘宽厚;四肢扁平、趾间蹼发达;体灰褐,颈缩有力;尾短。'}
E['Hoplobatrachus rugulosus'] = {'morphology': '体长6-12厘米,体型硕大;体粗壮而吻尖,鼓膜显著;背面橄榄褐,具纵行肤棱与深色虎纹;腹面白色;雄蛙具声囊,鸣声低沉似犬吠;指趾端钝,趾间近全蹼,后肢粗壮善跳善泳。'}
E['Setaria viridis'] = {'morphology': '一年生草本,秆细、丛生,高20-100厘米;叶片线形,粗糙;圆锥花序圆柱状,直立或微弯,主轴密生绿色或紫化刚毛;小穗椭圆形,簇生于短枝;颖果小,具皱纹,成熟后脱落。'}
E['Medicago truncatula'] = {'morphology': '一年生草本,平卧或上升,被短毛;三出复叶,小叶倒卵形,缘具锯齿;花小、蝶形黄色,数朵腋生;荚果螺旋盘卷2-6转,被钩状硬刺;种子肾形。'}
E['Robinia pseudoacacia'] = {'morphology': '落叶乔木,高可达20余米,树皮厚而深纵裂;小枝褐色,托叶刺一对;奇数羽状复叶,小叶7-19枚椭圆形;总状花序下垂,花白色芳香,旗瓣基部具黄绿斑;荚果扁平条状,红褐色。'}
E['Solanum melongena'] = {'morphology': '半灌木状草本,高可达1米,全株被星状毛;叶大,卵形至椭圆形,缘波状;花大单生,花冠辐状、紫堇色,雄蕊黄色;浆果大而有光泽,自长条至球形,深紫或白绿;宿萼常具刺。'}
E['Capsella bursa-pastoris'] = {'morphology': '一年生小草本,高10-40厘米;基生叶莲座状、羽状分裂,茎生叶基部抱茎;总状花序伸长,花小、白色四瓣;短角果倒三角形、压扁,顶端微凹,内含多数细小种子。'}
E['Gastrodia elata'] = {'morphology': '腐生草本,全体无叶绿素;块茎肥厚长椭圆形,表面具环状环节;花葶直立、黄赤色,高可达1米,总状花序顶生;花壶状,萼瓣合生;蒴果细长;种子粉尘状极多。'}
E['Eriobotrya japonica'] = {'morphology': '常绿小乔木;小枝密被锈色绒毛;叶革质披针形,长可达30厘米,上面光绿、背面密被锈褐绒毛;圆锥花序顶生,花白色芳香;梨果球形至卵球形,黄色,被锈色柔毛。'}
E['Amphiura vadicola'] = {'morphology': '盘径仅数毫米,五腕细长不分枝,为盘径数倍;腕分节清晰、细柔易断,背面光滑无粗棘;体色灰白至淡褐,半透明;管足特化为细触手,密列腕侧。'}
E['Tripneustes gratilla'] = {'morphology': '壳低半球形,壳径可达15厘米;反口面大棘短钝、乳白色,壳面底色黑紫,远观白紫相间;管足长而色深,伸出壳外;顶系大而醒目;口面平坦,棘较短密。'}
E['Choriaster granulatus'] = {'morphology': '腕五条,短而宽钝、末端圆,体厚实;辐径可达40厘米;背面满布钝圆颗粒状小棘,不扎手;体色粉红至乳白,常带深色小点;腹面管足密布,末端具吸盘。'}
E['Luidia quinaria'] = {'morphology': '体扁、盘小,五腕细长渐尖,略呈翅状,辐径可达20厘米;腕基部宽、向末端收细;背面灰褐,缀浅色斑块;腹面管足尖细、无吸盘;受惊可自切腕臂脱落。'}
E['Holothuria nobilis'] = {'morphology': '体肥厚圆筒状,后端渐细,长可达40厘米;体壁厚韧;背面与体侧各具一行粗大乳突状疣足;腹面管足密布;口偏于腹面,具二十枚楯状触手;体色黑褐。'}
E['Schmidtea mediterranea'] = {'morphology': '体长5-15毫米,柳叶形,通体半透明乳白;头端钝圆、无耳突,背侧具一对眼点;咽自体中段腹面伸出;体表纤毛密布,借黏液滑行;无性品系以横裂繁殖。'}
E['Paragonimus westermani'] = {'morphology': '成虫肥厚椭圆似半粒花生,长7-12毫米、宽4-6毫米,活体红棕色;口、腹吸盘大小相近,腹吸盘位于体前半;体表皮棘单生;卵巢与睾丸左右并列;虫卵金黄色,具卵盖。'}
E['Echinococcus granulosus'] = {'morphology': '成虫长2-7毫米,仅3-4个节片;头节具四个吸盘与顶突,顶突上两圈小钩;链体依次为幼节、成节与孕节,孕节子宫侧枝发达;棘球蚴为大小不一的囊,内含子囊与头节砂。'}
E['Ancylostoma duodenale'] = {'morphology': '虫体细长,活体淡红半透明,僵死呈C形;口囊发达,腹缘具两对钩齿;雌虫长10-13毫米,尾端具尾刺;雄虫略小,尾端膨大成伞状交合伞,具一对交合刺。'}
E['Spongilla fragilis'] = {'morphology': '群体壳状至不规则团块,表面具隆起与散生出水孔;因共生绿藻常呈鲜绿色;骨骼为单轴硅质骨针;环境恶化时形成芽球越冬,芽球具双盘状微骨针,壁厚而坚韧。'}
E['Hirudo nipponia'] = {'morphology': '体长3-6厘米,伸展时细长,背腹扁平;背面黄绿色,具深色纵纹,腹面灰白色;体分27节,每节具五道环纹;口藏于前吸盘中央,具三片带细齿的颚板;后吸盘大而圆。'}
E['Exopalaemon carinicauda'] = {'morphology': '体长5-9厘米,甲壳薄而白色微透,体表散布棕红色小点;额角细长上扬;尾节背缘隆起成脊、末端尖;步足纤细,第二步足之钳甚小;腹肢发达,善游泳。'}
E['Charybdis feriata'] = {'morphology': '头胸甲宽逾12厘米,表面光滑、分区隆起,底色乳白,布红褐网状花纹,眼区间具锈色横带;额缘具六齿;螯足粗壮,长节内缘具强齿;末对步足桨状,适游泳。'}
E['Chthamalus challengeri'] = {'morphology': '壳径仅数毫米,呈低矮圆锥或圆丘状,壳灰白微带紫色;壁板六片、常愈合,壳口菱形,覆以两对盖板;干露时盖板紧闭以防失水;蔓足六对,涨水时伸出滤食。'}
E['Agelena labyrinthica'] = {'morphology': '体长8-15毫米,体色灰褐;背甲具两条深色纵纹,八眼两列;后纺器显著两节、长而后伸;步足细长;结大型漏斗网,受惊闪退入漏斗管深处。'}
E['Hylyphantes graminicola'] = {'morphology': '体长2-3毫米,微小;雄蛛亮黑色,雌蛛暗褐色;八眼两列,步足细而色淡;腹部椭圆,被细毛;织小型水平片网,网上方覆不规则支持丝,蛛匿于网侧叶下。'}
E['Dermatophagoides pteronyssinus'] = {'morphology': '体长0.2-0.3毫米,乳白半透明,肉眼不可见;体长椭圆形,表皮具细密横纹,布细刚毛;颚体小,足四对、短粗,末端具小吸盘;雄螨腹面具一对肛吸盘。'}
E['Bradybaena ravida'] = {'morphology': '壳近扁球形,直径约20毫米,具5-6个螺层;壳面灰黄褐色,具细生长线;壳口卵圆形,脐孔狭小;体灰褐色,大触角端部色深;遇惊缩入壳内。'}
E['Haliotis diversicolor'] = {'morphology': '壳椭圆扁平呈耳状,长可达8厘米;螺层少,壳顶低平;壳表红褐色,具疣状突起与细螺肋;具七至九个呼水孔,沿壳缘一列排列;壳内珍珠层虹彩;足宽大肥厚。'}
E['Charonia tritonis'] = {'morphology': '壳纺锤形,厚重,成壳长达半米;螺层膨圆,壳表乳白,布褐色斑块与粗螺肋;壳口卵圆形,内面具瓷光;外唇缘厚而外扩;前沟长,厣角质,体大足肥。'}
E['Mimachlamys nobilis'] = {'morphology': '壳近圆形,径6-8厘米,前后耳明显;左壳紫褐、具鳞状放射肋,右壳色浅;壳内面桃红色;闭壳肌粗大,干制为瑶柱;幼贝以足丝附着岩礁,成贝可断足丝弹游。'}
E['Cristaria plicata'] = {'morphology': '壳大而薄,长可达20厘米以上,膨胀;后背缘向上延伸成褶皱的翼状冠嵴;壳表黄褐,同心生长纹粗糙;铰合部齿退化,韧带长;壳内珠层乳白具虹彩;幼体为钩介幼虫。'}
E['Octopus bimaculoides'] = {'morphology': '胴部卵圆形,皮肤具乳突;腕中等长,吸盘两列;体色灰褐斑驳,善随底质变色;每侧眼后下方各具一枚蓝边假眼斑,受激时明亮醒目;雄性右侧第三腕特化为交接腕。'}
E['Amanita pantherina'] = {'morphology': '菌盖宽5-12厘米,半球至平展,黄褐至棕褐色,被白色易脱落锥形疣点,盖缘光滑无条纹;菌褶白色、离生;菌柄白色,基部略膨大;菌环膜质下垂,菌托环领状;孢子白色。'}
E['Armillaria mellea'] = {'morphology': '子实体丛生;菌盖宽3-10厘米,蜜黄色至棕褐色,被细纤毛或鳞片;菌褶直生至延生,白色转锈斑;菌柄圆柱形,基部渐细呈根状,上部具下垂膜质菌环;担孢子白色。'}
E['Inonotus obliquus'] = {'morphology': '菌核不规则瘤块状,直径可达20厘米以上;表面黑色、深裂如炭,坚硬角质;内部黄褐色,具同心轮层纹理;真正子实层体罕见,生于寄主树皮下的朽木内,脆革质。'}
E['Fuligo septica'] = {'morphology': '原质团鲜黄色,缓慢蠕动于腐木表面;成熟形成复囊体,垫状至枕状,直径数厘米至十余厘米;外表蜡质易碎,含白色石灰结;内部粉状,散布暗褐色、具网纹的球形孢子。'}
E['Cyrtomium fortunei'] = {'morphology': '根状茎短而直立;叶簇生,一回羽状,株高可达60厘米;羽片八至二十对,镰状披针形,基部上侧具耳状凸起;叶脉网状;孢子囊群圆形,满布叶背,囊群盖盾状褐色。'}
E['Pyrrosia lingua'] = {'morphology': '根状茎横走,密被鳞片;植株高10-25厘米;叶远生,一型或近二型,狭披针形,革质,上面光滑绿色,背面密被锈褐星状毛;孢子囊群圆形无盖,深褐,密布叶背中上部。'}
E['Mitsukurina owstoni'] = {'morphology': '体柔软松弛、延长;吻扁平延长如剑;眼小无瞬膜;齿细长尖锐,密布颌缘;皮肤半透明呈粉白色,血色隐现;成体长3-4米;双颌可极端前伸弹出,咬住猎物。'}
E['Myctophum punctatum'] = {'morphology': '体长形似小鲱,体银褐,被大圆鳞;眼大,口斜上位;背鳍后具小脂鳍;体侧发光器成两纵列,缀点如珠带,尾部具发光腺;体长不足十厘米。'}
E['Varanus salvator'] = {'morphology': '体粗壮,颈长,吻窄长;四肢强壮具锐爪;尾长侧扁如桨,约为头体长1.5倍;鼻孔椭圆近吻端;体背黑褐,满布黄色斑点构成的横行斑纹;幼体斑纹金黄鲜明;成体可达2米以上。'}
E['Pusa hispida'] = {'morphology': '体小而圆润,纺锤形;吻短;背面深灰,散布白色环状斑纹,腹面银灰;新生仔披白色绒毛;前鳍肢爪强壮、善凿冰呼吸孔;成体长约1.3米,体重不足百公斤。'}
E['Rhinopithecus bieti'] = {'morphology': '体被长而厚的黑褐毛,肩背覆银灰长毛披垂;面部粉白,眼周与吻部具黑斑;唇宽厚、朱红色;尾长与体相当,毛浓密;雄性体长逾70厘米、体重可达15公斤;幼体毛色浅灰白。'}
E['Tylototriton asperrimus'] = {'morphology': '头部扁平宽大,躯干圆浑;体背与尾黑褐,皮肤粗糙;背中线嵴棱明显;体侧两列细密瘰疣,色橙黄;腹面具橙斑;四肢细长、指趾端圆;尾侧扁;体长约14厘米。'}
E['Acinonyx jubatus'] = {'morphology': '体细长弓背,肩高约80厘米;毛短而粗糙,底色黄褐,满布实心黑斑;泪纹黑色,自眼角延至口部;腿高,爪钝而半伸缩;尾长具黑环、末端白色;体重约40-60公斤。'}
E['Ceratotherium simum'] = {'morphology': '肩高1.7-1.9米,头体长3-4米,体重可达2.3吨,为犀科最大;皮肤灰厚光滑、几无褶皱;颈背隆起承托长巨头,耳小管状;双角角质、前长后短;唇部宽方,适啃短草。'}
E['Gorilla gorilla'] = {'morphology': '雄性站立高1.6-1.8米、体重常逾150公斤,雌性约其半;毛色黑褐带灰,前额常带红棕;成年雄性背部银白披毛(银背),头部矢状冠突发达;臂展远超身高,以指节着地行走。'}
E['Ailurus fulgens'] = {'morphology': '体如家猫大小,毛红棕色;面部白纹醒目,耳大而尖、缘具白毛;腹与四肢黑褐;尾蓬松近体长,具红褐与浅黄相间环纹;掌侧籽骨延伸成第六「假拇指」,以抓握竹枝。'}
E['Macropus giganteus'] = {'morphology': '直立高逾两米,雄性体重可达60-90公斤,雌性约其半;毛灰褐色,耳长直立;前肢短小具爪,后肢粗壮,肌腱弹性储能;尾长逾1米,粗壮用作撑杆;雌兽腹部具育儿袋。'}
E['Arenicola marina'] = {'morphology': '体粗壮、前端渐细,长可达20厘米;躯干分区明显,中段两侧具成对分支状红鳃;后部膨大呈囊状,红色体壁透出血红蛋白;头端具吻、可外翻,无触手,疣足退化。'}
E['Sabellaria alveolata'] = {'morphology': '体长3-4厘米,细长分节,胸腹异形;栖管由沙粒粘合而成,虫体缩入管中;取食时伸出触手冠,冠缘一圈金色端生刚毛,如芒似帚;体色橙黄,带紫褐横纹。'}
E['Glycera dibranchiata'] = {'morphology': '体圆柱形,环节密而体表光滑、具虹彩,体长可达30厘米上下;吻可外翻近半体长,末端具四枚黑色大颚;前部疣足具红色鳃;体色粉红至暗红,即俗称的血虫。'}
E['Tegenaria domestica'] = {'morphology': '雌蛛体长约10毫米,黄褐色;头胸中线具纵纹;后纺器细长而分两节,为漏斗蛛科典型特征;雄蛛较小、步足更显细长;网为漏斗状,网面铺展,巢管藏于缝隙。'}
E['Cymothoa exigua'] = {'morphology': '雌虫体长约3厘米,扁阔近椭圆、背面微拱;头小,胸肢七对,末端钩爪发达,口针适于吸血;雄虫显著较小,体色浅黄并带黑斑,眼小;雌虫腹部具叠覆腹板,居鱼舌上时色浅。'}
E['Asellus aquaticus'] = {'morphology': '体长约1-2厘米,扁长而背面微拱;体分头、胸、腹三部,背板灰褐色具浅色横斑;眼小;七对步足短壮;尾肢短而呈圆柱状;行动迟缓,受扰仅缓慢爬行或短暂侧泳。'}
E['Alpheus japonicus'] = {'morphology': '体长约5厘米,甲壳光滑半透,黄褐带褐斑;额角短尖;一大一小两只螯足粗壮侧扁,大螯闭合射出高速水流、伴随爆响;第二对步足细长;眼完全被头胸甲覆盖;腹部肌肉发达。'}
E['Cancer pagurus'] = {'morphology': '头胸甲圆扇形,宽可达25厘米;背面红棕色,具细颗粒,前侧缘具九个圆钝缘齿;螯足粗壮,指尖黑紫;步足短壮,末对步足尖爪状;雌蟹腹部宽大,抱卵于腹肢。'}
E['Watasenia scintillans'] = {'morphology': '体长5-7厘米,鳍圆大,背侧紫褐;眼柄腹面具发光器;第3、4腕末端各具数枚黑色发光器,大而醒目;外套膜腹面发光器细密成片;触腕细,可缩入鞘中。'}
E['Sepia officinalis'] = {'morphology': '胴体宽扁椭圆;周缘鳍窄、贯穿全胴;体内背侧嵌钙质骨板;瞳孔呈W形横裂;八腕短、吸盘四列,触腕一对可全缩入囊;体色灰褐,善瞬息万变。'}
E['Bletilla striata'] = {'morphology': '假鳞茎扁球形,白色;茎直立,株高可达半米;叶四至五枚披针形,平行脉显;总状花序具3-8朵花,紫红或淡红,萼瓣同形,唇瓣白色带紫脉,先端五裂,蕊柱细长弯曲。'}
E['Cymbidium kanran'] = {'morphology': '假鳞茎小,集生成丛;根肉质粗长;叶三至七枚,狭长挺立,缘具细齿;花葶细长显著高出叶面,着花五至十余朵、疏生;被片窄披针形,色由青绿转暗紫,唇瓣具斑纹,香气清幽。'}
E['Vigna angularis'] = {'morphology': '一年生草本,茎蔓生或直立,被倒毛;三出复叶,小叶卵形至菱卵形;总状花序腋生,黄色蝶形花小而多;荚细圆筒形、无缢缩,熟时开裂;种子长圆形,赤红色,种脐白色居中。'}
E['Fomitopsis pinicola'] = {'morphology': '子实体多年生、无柄;菌盖马蹄形、硬木质,可达20厘米以上,盖面灰褐具环沟,活盖生长缘镶橙红至红色环带;菌肉淡褐色;孔面乳白至淡黄,管口细密圆形;孢子圆柱形无色。'}

# ============ morphology (noimg=false: 25-45 chars) ============
E['Vibrio cholerae'] = {'morphology': '逗点状弯曲杆菌,革兰氏阴性,极端单鞭毛,运动活泼,菌落圆形、表面光滑半透明。'}
E['Streptococcus pneumoniae'] = {'morphology': '革兰氏阳性卵圆双球菌,常宽端相对、尖端相背,外被厚荚膜,菌落光滑型具光泽。'}
E['Methanosarcina acetivorans'] = {'morphology': '不规则大球菌,成群时围以共同包被聚集成团块状假包囊,单个细胞具极生鞭毛、可运动。'}

# ============ habitat (25-50 chars) ============
E.setdefault('Rickettsia prowazekii', {})['habitat'] = '专性胞内寄生,增殖于人虱肠上皮细胞,随虱粪排出后经伤口侵入人体,在血管内皮细胞内繁殖。'
E.setdefault('Streptococcus pneumoniae', {})['habitat'] = '定植于人鼻咽部黏膜,健康携带者为传染源,机体抵抗力下降时侵入肺部、中耳与脑膜。'
E.setdefault('Mycobacterium tuberculosis', {})['habitat'] = '胞内寄生于人肺泡巨噬细胞,可潜伏于干酪样坏死与肉芽肿病灶内数年乃至终身。'
E.setdefault('Arthrospira platensis', {})['habitat'] = '生长于热带亚热带碱湖与盐碱水体,喜高温强光与高pH,亦大量培育于人工养殖池。'
E.setdefault('Chlamydia trachomatis', {})['habitat'] = '专性寄生于人眼结膜与泌尿生殖道的柱状上皮细胞内,以包涵体形式完成繁殖。'
E.setdefault('Pyrococcus furiosus', {})['habitat'] = '栖息于海底热液喷口与高温海洋沉积物,最适温度约100℃,严格厌氧,需盐分。'
E.setdefault('Nitrosopumilus maritimus', {})['habitat'] = '自养生活于寡营养开阔大洋上层至深海、海洋沉积物,亦见于土壤,氧化氨获能。'
E.setdefault('Dryopteris crassirhizoma', {})['habitat'] = '生于针阔混交林及红松林下阴湿肥沃的微酸性腐殖土上,常成片簇生。'
E.setdefault('Litsea cubeba', {})['habitat'] = '生于向阳山坡、灌丛、疏林与采伐迹地,喜湿润酸性红黄壤,常为次生林先锋树种。'
E.setdefault('Triticum aestivum', {})['habitat'] = '喜冷凉干燥、日照充足气候,较耐寒;冬小麦秋播越冬返青、翌夏收获,春小麦春播。'
E.setdefault('Curcuma longa', {})['habitat'] = '喜高温多湿与强光,宜肥沃疏松、排水良好的砂质壤土,热带作多年生栽培。'
E.setdefault('Rosa chinensis', {})['habitat'] = '喜光耐修剪,喜肥沃湿润而排水良好土壤,冬季需适度低温;普遍栽培于园圃与绿化带。'
E.setdefault('Arabidopsis thaliana', {})['habitat'] = '野生于田埂、路边与荒地等干燥扰动生境,常与伴人杂草混生,实验室极易栽培。'
E.setdefault('Salix babylonica', {})['habitat'] = '极耐水湿,多生于河岸、湖畔与堤旁湿地,平原广泛栽培,扦插极易成活。'
E.setdefault('Actinidia chinensis', {})['habitat'] = '生于山谷与林缘湿润处,攀援大乔木直上林冠,喜温暖多雾与腐殖质深厚的酸性土。'
E.setdefault('Osmanthus fragrans', {})['habitat'] = '喜温暖湿润的亚热带气候,稍耐阴,宜疏松肥沃微酸性土;广泛栽培于庭园与路旁。'
E.setdefault('Panax ginseng', {})['habitat'] = '生于以红松为主的针阔混交林下阴湿处,需深厚腐殖土与适度荫蔽,生长极慢。'
E.setdefault('Lycorma delicatula', {})['habitat'] = '寄主广泛,嗜臭椿与葡萄,亦害林果;成虫群聚树干吸汁,卵成块产于树皮。'
E.setdefault('Periplaneta americana', {})['habitat'] = '栖于厨房、餐厅、下水道与垃圾房等湿热黑暗处,昼伏夜出,群居缝隙。'
E.setdefault('Homarus americanus', {})['habitat'] = '栖于北大西洋冷水近岸的岩礁、砾石与泥沙底,昼伏洞穴岩缝,夜间出游觅食。'

# ============ distribution (25-50 chars) ============
E.setdefault('Vibrio cholerae', {})['distribution'] = '全球暖水域均有,河口与近岸常见;南亚恒河三角洲与非洲构成霍乱主要流行区。'
E.setdefault('Rickettsia prowazekii', {})['distribution'] = '全球散发,流行于战乱、贫困与人群拥挤地区,今以非洲中东部与南美安第斯山区为主。'
E.setdefault('Streptococcus pneumoniae', {})['distribution'] = '全球分布,寄居于各地人群鼻咽;婴幼儿与老年人中肺炎、脑膜炎等侵袭性疾病高发。'
E.setdefault('Mycobacterium tuberculosis', {})['distribution'] = '全球分布,印度、中国等亚洲国家与撒哈拉以南非洲疾病负担最重,年死亡数居前列。'
E.setdefault('Arthrospira platensis', {})['distribution'] = '原产非洲乍得湖与墨西哥特斯科科湖等碱湖,现全球热带亚热带广泛养殖,印度与中国为主产。'
E.setdefault('Chlamydia trachomatis', {})['distribution'] = '全球分布,为报告最多的细菌性传播病原之一;沙眼高发于非洲等卫生欠佳缺水地区。'
E.setdefault('Pyrococcus furiosus', {})['distribution'] = '分离自意大利武尔卡诺岛浅海热泉,同类菌株亦见于其他海底热液区与高温沉积物。'
E.setdefault('Nitrosopumilus maritimus', {})['distribution'] = '分离自美国西雅图海水水族箱;近缘类群遍布全球大洋与土壤,为海洋最丰富的古菌类群之一。'
E.setdefault('Sequoia sempervirens', {})['distribution'] = '天然分布狭窄,自美国俄勒冈州西南至加利福尼亚中部沿岸雾带,老龄林多存于保护区。'
E.setdefault('Phalaenopsis aphrodite', {})['distribution'] = '原产菲律宾吕宋及邻近岛屿与中国台湾南部,现全球热带亚热带广泛栽培,品种极多。'
E.setdefault('Curcuma longa', {})['distribution'] = '可能原产印度与东南亚,印度为主产国;亚洲热带至中国华南、云南等地广泛栽培。'
E.setdefault('Arabidopsis thaliana', {})['distribution'] = '原产欧亚大陆温带与非洲山地,随人类活动扩散至全球各大洲,温带扰动地常见。'
E.setdefault('Salix babylonica', {})['distribution'] = '原产中国,历史上传入日本、印度等地,今全球温带至亚热带广泛栽培,多植水畔。'
E.setdefault('Actinidia chinensis', {})['distribution'] = '中国特有,主产长江流域及其以南山地丘陵,湖北、湖南与川陕南部为多,引种全球。'
E.setdefault('Osmanthus fragrans', {})['distribution'] = '原产中国西南部,长江流域及其以南普遍栽培,咸宁、桂林、杭州尤盛;日本亦有引种。'
E.setdefault('Panax ginseng', {})['distribution'] = '分布于长白山区、俄远东锡霍特山及朝鲜半岛北部,野生极稀少,园参栽培量大。'
E.setdefault('Corallium japonicum', {})['distribution'] = '分布于日本南部外海至中国台湾东北部及南海北部的深水岩礁带,资源因采捕趋竭。'
E.setdefault('Trichinella spiralis', {})['distribution'] = '全球分布,家猪与鼠类间循环传播,亦见于熊、野猪等野生动物;中国偶有局部暴发。'
E.setdefault('Mytilus galloprovincialis', {})['distribution'] = '原产地中海与黑海,随航运扩散至全球温带沿岸,为中国北方主要养殖贻贝之一。'
E.setdefault('Trypoxylus dichotomus', {})['distribution'] = '分布于日本、朝鲜半岛及中国东部与华中各省,数量因光污染与滥捕而趋减少。'
E.setdefault('Apis cerana', {})['distribution'] = '原产东亚,广布于中国各省区、朝鲜半岛、日本及东南亚山地,为东方养蜂的当家蜂种。'
E.setdefault('Drosophila melanogaster', {})['distribution'] = '原产非洲,随人类活动与果品运输遍布全球温热带,果园与市场周围常年可见。'
E.setdefault('Periplaneta americana', {})['distribution'] = '原产非洲,随商船扩散至全球热带亚热带及有供暖的建筑内,温带室内亦常见。'
E.setdefault('Fenneropenaeus chinensis', {})['distribution'] = '分布于黄渤海及东海北部,朝鲜半岛西岸亦产;资源衰退后靠增殖放流补充。'
E.setdefault('Homarus americanus', {})['distribution'] = '分布于北美大西洋沿岸,自加拿大拉布拉多至美国北卡罗来纳,缅因湾渔获最丰。'
E.setdefault('Asterias amurensis', {})['distribution'] = '分布于中国黄渤海、日本海及远东沿岸,并见于北美西海岸;入侵澳洲塔斯马尼亚。'
E.setdefault('Cynops orientalis', {})['distribution'] = '特产于中国华东与华中低山丘陵,见于安徽、浙江、江苏、江西、湖北、湖南等地水域。'

# ============ build output ============
with open('/tmp/e29-batch2.json') as f:
    batch = json.load(f)

species_out = {}
covered, missing = 0, []
for latin, info in batch.items():
    fields = info['fields_to_expand']
    entry = {}
    for fld in fields:
        if latin in E and fld in E[latin]:
            entry[fld] = E[latin][fld]
        else:
            missing.append((latin, fld))
    if entry:
        species_out[latin] = entry
        covered += len(entry)

out = {'species': species_out, 'higher': {}}
with open('/tmp/e29-out-batch2.json', 'w') as f:
    json.dump(out, f, ensure_ascii=False, indent=1)

print('species written:', len(species_out))
print('fields written:', covered)
print('MISSING:', missing)

# ============ validate ============
print('\n--- validation ---')
bad = []
with open('/tmp/e29-out-batch2.json') as f:
    result = json.load(f)
for latin, entry in result['species'].items():
    info = batch[latin]
    for fld, text in entry.items():
        n = len(text)
        if fld == 'morphology':
            lo, hi = (60, 110) if info['noimg'] else (25, 45)
        else:
            lo, hi = 25, 50
        ok = lo <= n <= hi
        flag = 'OK ' if ok else 'BAD'
        if not ok:
            bad.append((latin, fld, n, lo, hi))
        print(f'{flag} {latin[:28]:30s} {fld:13s} len={n} ({lo}-{hi})')
print('\nBAD entries:', len(bad))
for b in bad:
    print('  ', b)
