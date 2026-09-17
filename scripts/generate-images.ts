/// <reference types="bun-types" />
/**
 * BioCodex 物种插画批量生成脚本 V2(生成→VLM 复审闸门→合格才入库)
 *
 * E6 审计教训:AI 图像模型对微观世界/物种鉴别特征掌控薄弱(原始 Fail 33%),
 * "生成即上架"不可行 → 本脚本每张生成图必须通过 VLM 科学性复核才写入 DB,
 * 复审不过的文件隔离到 rejected/,物种保持雕版占位图(科学性零风险)。
 *
 * 环境变量:
 *   BATCH=N        本轮最多处理 N 个(默认全部)
 *   SCOPE=all|flagship  处理范围(默认 flagship)
 *   CONCURRENCY=N  并发 worker 数(默认 2,限流友好)
 *   RETRY=2        每物种最大生成尝试轮数
 *   AUDIT_ONLY=1   仅审计已存在但未入库的文件,不生成新图
 * 断点续跑:/tmp/gen-progress.jsonl 记录已处理物种(id → accepted|rejected),
 *   rejected 的下轮不再重试(宁缺毋滥),accepted 的已入 DB 自然过滤。
 * 用法: BATCH=20 SCOPE=all CONCURRENCY=2 bun scripts/generate-images.ts
 */
import { db } from "../src/lib/db";
import ZAI from "z-ai-web-dev-sdk";
import { existsSync, mkdirSync, renameSync, appendFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = "public/generated";
const REJECTED_DIR = "public/generated/rejected";
const PROGRESS = "/tmp/gen-progress.jsonl";
const BATCH = parseInt(process.env.BATCH || "999", 10);
const SCOPE = process.env.SCOPE || "flagship";
const CONCURRENCY = parseInt(process.env.CONCURRENCY || "2", 10);
const ONLY = (process.env.ONLY || "").split(",").map((s) => s.trim()).filter(Boolean); // E13:定向重生成(用户报告问题物种)
const MAX_RETRY = parseInt(process.env.RETRY || "2", 10);
const AUDIT_ONLY = process.env.AUDIT_ONLY === "1";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** 界别构图框架(E6 三轮 prompt 实验收敛版:微观类用显微镜视野构图——实测通过率最高) */
const KINGDOM_STYLE: Record<string, (cn: string, la: string) => string> = {
  Bacteria: (cn, la) =>
    `antique microscope field-of-view plate of ${la} (${cn}): dozens of tiny bacterial cells scattered across the field, drawn as a vintage copperplate engraving with ink stippling and soft watercolor wash on aged parchment, clean composition, no text no letters no labels`,
  Archaea: (cn, la) =>
    `antique microscope field-of-view plate of ${la} (${cn}): dozens of tiny archaeal cells scattered across the field with a faint hint of hot-spring water, vintage copperplate engraving with ink stippling and watercolor on aged parchment, clean composition, no text no letters no labels`,
  Protista: (cn, la) =>
    `antique microscope field-of-view plate of ${la} (${cn}): several small single-celled protists across the round field of view showing their true cell shape and organelles, delicate ink stippling and watercolor tinting, aged parchment, vintage copperplate engraving, no text no letters no labels`,
  Fungi: (cn, la) =>
    `vintage natural history plate of ${la} (${cn}) in its scientifically correct life form as the description states (macro-mushroom cap-gills-stem, OR microscopic hyphae with spores under microscope, OR underground truffle body, OR insect-fungus complex), mycelium threads at base never plant roots, copperplate engraving with watercolor on aged parchment, no text no letters no labels`,
  Plantae: (cn, la) =>
    `vintage botanical illustration of ${la} (${cn}) with botanically accurate leaves, flowers/fruit/cones strictly matching the species description, copperplate engraving with hand-tinted watercolor on aged parchment, no text no letters no labels`,
  Animalia: (cn, la) =>
    `vintage natural history illustration of ${la} (${cn}) in natural posture with the diagnostic anatomy of this exact species per description (proportions, fins/limbs/beak/head), copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels`,
};

/**
 * E10 旗舰疑难物种专属 prompt(两轮通用模板未过审的 15 种,逐种定制鉴别特征构图):
 * 教训锚点——海带曾被画成维管植物(需强调固着器/柄/带片的海底漂姿)、酵母曾单特写失败(需"许多小细胞"构图)、
 * 文昌鱼曾被画成硬骨鱼(需"无头无眼+V形肌节")、鲍曾被画成峨螺(需"耳形扁平+壳孔列")、刺参曾被画成海胆(需"刺参状+背疣足行列")。
 */
const SPECIFIC_PROMPT: Record<string, string> = {
  "Saccharomyces cerevisiae":
    "antique microscope field-of-view plate of Saccharomyces cerevisiae (baker's yeast 酿酒酵母): dozens of tiny oval single-celled fungi like smooth translucent pale grapes or pebbles scattered across the round field, several cells with small round buds pinching off, a few four-spore ascii burst open, ink stippling and watercolor tinting, vintage copperplate engraving on aged parchment, no text no letters no labels",
  "Batrachochytrium dendrobatidis":
    "antique microscope slide viewed through a vintage brass microscope, circular field of view with a thin double-line border: Batrachochytrium dendrobatidis (蛙壶菌 chytrid fungus) inside pale amphibian skin — the field filled with a mosaic of large soft polygonal frog epidermal cells, several smooth glassy round sporangia nest inside them, each sporangium opens through one slender discharge tube, and swarms of tiny comma-shaped zoospores each trailing a single long hair-thin flagellum swim in the water between the cells, ink stippling and watercolor tinting, vintage copperplate engraving on aged parchment, no text no letters no labels",
  "Welwitschia mirabilis":
    "vintage botanical plate of Welwitschia mirabilis (百岁兰), desert curiosity in strict side profile: one stout dark woody cone-shaped trunk like an upside-down carrot crown on Namib gravel, and from its flat top exactly TWO long tattered cloth ribbons of dark leathery green sprawling left and right along the ground, each ribbon torn lengthwise into twisted streamers towards the far tips but whole and broad where it meets the trunk, reading like two worn banners flanking the cone, sparse gravel with distant fog bank, copperplate engraving with hand-tinted watercolor on aged parchment, no text no letters no labels",
  "Metasequoia glyptostroboides":
    "vintage botanical illustration of Metasequoia glyptostroboides (dawn redwood 水杉): a tall deciduous conifer with reddish-brown shredding trunk, one main branch detail showing opposite branching with flat feathery sprays of many small linear soft green leaves arranged in two neat rows along each branchlet, small round pendant cones on short stalks, a separate bare winter twig with opposite buds, copperplate engraving with hand-tinted watercolor on aged parchment, no text no letters no labels",
  "Salix babylonica":
    "vintage botanical illustration of Salix babylonica (weeping willow 垂柳) beside a lake: a broad-crowned tree with rough grey trunk, countless very long slender yellow-green branchlets cascading down to the water surface like a curtain, narrow lanceolate leaves with finely serrated edges, one detail sprig with drooping catkins, copperplate engraving with hand-tinted watercolor on aged parchment, no text no letters no labels",
  "Schistosoma japonicum":
    "antique parasitology microscope slide plate of Schistosoma japonicum (日本血吸虫), stained specimen view on plain glass: two long smooth pale flesh-pink worms lying close together, the male one thick soft round cord of wax with a long open groove running along one side, the much thinner darker female cord resting inside that groove like a thread in a channel, both ends bluntly tapered, bodies smooth and featureless like two pieces of soft pink wax cord, thin wash of stain at the edges of the slide, vintage copperplate engraving with ink stippling on aged parchment, no text no letters no labels",
  "Caenorhabditis elegans":
    "antique microscope field-of-view plate of Caenorhabditis elegans (秀丽隐杆线虫): several tiny translucent glass-clear thread animals gliding over a pale smooth agar dish seen through the round lens, each about one millimeter long with smooth bodies tapered at both ends like fine clear sewing threads, faint straight inner tubes showing through the clear skin, one slimmer individual with a narrow tapered tail, soft circular vignette of the lens edge, vintage copperplate engraving with ink stippling on aged parchment, no text no letters no labels",
  "Haliotis discus hannai":
    "vintage conchology plate of Haliotis discus hannai (abalone 皱纹盘鲍), NOT a spiral whelk: an ear-shaped very flat low oval marine gastropod shell, greenish-brown exterior with fine wrinkled spiral ribs, a single row of small raised pore holes along the left edge, paired with a second specimen shown from inside with iridescent mother-of-pearl and a big creamy-white muscular foot, copperplate engraving with watercolor on aged parchment, no text no letters no labels",
  "Apostichopus japonicus":
    "vintage natural history plate of Apostichopus japonicus (仿刺参), a plump sea cucumber drawn like a polished dark leather pickle lying on sandy seabed: one smooth plump elongated body of deep umber-brown leathery skin, soft conical warts in scattered rows along its back, tiny tube feet in bands underneath, one blunt end ringed by a short fringe of plump soft tentacle pegs, absolutely NO legs NO joints NO shell NO antennae NO eyes, gentle watercolor tinting, copperplate engraving on aged parchment, no text no letters no labels",
  "Sphenodon punctatus":
    "vintage natural history illustration of Sphenodon punctatus (tuatara 楔齿蜥), NOT a common lizard: a robust ancient reptile with olive-grey heavily wrinkled saggy skin, a conspicuous crest of triangular spiny scales from nape down the back, strong limbs with clawed digits splayed on New Zealand coastal rocks, bright alert eye, ridged tail, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Nipponia nippon":
    "vintage ornithological illustration of Nipponia nippon (crested ibis 朱鹮): an elegant medium-large wading bird standing in a wetland paddy, white plumage washed with delicate pale pink especially on the wing undersides, bare brick-red facial skin around the eye, long slightly decurved black bill, wispy lanceolate crest plumes drooping on the nape, black legs, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Branchiostoma belcheri":
    "antique zoological plate of Branchiostoma belcheri (白氏文昌鱼), a clear glassy lancet enlarged on plain parchment: one slender fully see-through body like a polished clear glass splinter, tapered to fine points at both ends, inside it a neat row of pale V-shaped chevrons running down the flank like delicate etched marks, a faint straight fringe of short mouth bristles at the tip, a low continuous soft fin border running around the tail like the melted rounded rim of a glass rod, NO eyes NO head NO jaws NO scales NO legs NO paired fins, copperplate engraving with ink stippling on aged parchment, no text no letters no labels",
  "Spirobranchus giganteus":
    "vintage marine natural history illustration of Spirobranchus giganteus (Christmas tree worm 大旋鳃虫): two identical small spiral conical feathery gill crowns like miniature fir trees, one vivid violet-blue and one golden-orange, each formed of two perfectly spiraling rows of delicate radiole feathers, rising side by side from a tiny round hole in a living massive coral head, underwater coral reef scene, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Eunice aphroditois":
    "vintage marine natural history illustration of Eunice aphroditois (bobbit worm 博比特虫): a very long segmented marine polychaete worm bursting from its burrow in reef sand, hundreds of flat segments with an iridescent purple-green-bronze sheen, five straight sensory antennae like fingers on the head, fierce open eversible pharynx revealing black sickle-shaped snapping jaws, short paddle parapodia along the sides, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  // —— E13 第二批:海藻类统一走「压制标本/显微镜视野」构图,规避陆生植物词汇 ——
  "Ulva lactuca":
    "vintage natural history plate on aged parchment: one bright grass-green sheet of very thin see-through silk paper, shaped as a soft irregular oval with its whole rim gently ruffled like a lasagna noodle edge, the fragile film shows lighter patches where light passes through it, one tiny pale round button at one corner, lying flat and weightless, absolutely plain smooth surface with no ribs no veins no stalks no roots no flowers of any kind, delicate watercolor tinting, no text no letters no labels",
  "Pyropia yezoensis":
    "vintage food-illustration plate on aged parchment: a small stack of dried sushi nori sheets — several thin flat matte sheets of deep purplish-black with a rosy-purple sheen, exactly like square-cut pressed nori paper for sushi, smooth matte surfaces like fine handmade paper with faint darker mottling, corners softly curling up off the stack, one sheet leaning apart showing its plain even face, absolutely no ribs no veins no stalks no green color anywhere, copperplate border with watercolor tinting, no text no letters no labels",
  "Sargassum fusiforme":
    "vintage natural history plate on aged parchment: a small loose tangle of fine wiry jet-black strands like a handful of soft black wire, each strand gently forking into thinner twigs densely studded all over with tiny smooth spindle-shaped beads like grains of rice strung on wire, a few thin straight dark sticks mixed in, at the base one small knobby disc gripping a pebble, drawn crisp and dry like a pressed curiosity, copperplate engraving with watercolor, no text no letters no labels",
  "Macrocystis pyrifera":
    "vintage phycology plate of a pressed giant kelp specimen arranged in vertical folds on aged parchment: Macrocystis pyrifera (giant kelp 巨藻), one extremely long smooth rope-like golden-brown stipe coiled in gentle S-folds up the sheet, bearing at close regular intervals many short flat strap-shaped blades like long fronds, every single blade swollen at its base into a small pear-shaped gas bladder (pneumatocyst) clearly drawn as a little pod, blades slightly crinkled with wrinkled surface, a small branching holdfast at the very bottom, NO plant stem NO tree trunk NO flowers NO seeds NO roots, copperplate engraving with watercolor tinting, no text no letters no labels",
  // —— 真菌类:纠正香菇=毒蝇伞、牛肝菌=菌褶两类高频张冠李戴 ——
  "Lentinula edodes":
    "antique mycology plate of Lentinula edodes (shiitake 香菇), NOT the red fly agaric: a cluster of three edible mushrooms growing from a short hardwood log, each cap dome-shaped and entirely dull chestnut to dark brown, the surface covered with fine scattered white cracks and pale veil remnants, rim curled under and faintly scalloped, creamy-white crowded gills beneath, a tough fibrous pale stem with a shredding snakeskin texture, absolutely NO red cap NO white dots NO ring NO cup at stem base, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Boletus edulis":
    "antique mycology plate of Boletus edulis (美味牛肝菌) porcini bolete, drawn half from below so the cap underside fills much of the view: that underside is a smooth spongy cushion of densely packed tiny round dimples in pale cream-yellow, exactly like fine honeycomb or the closed pores of a pale wasp nest, absolutely NO thin blades NO radiating gill plates of any kind, above it a thick bread-loaf chestnut-brown sticky cap and a fat club stem with delicate raised net pattern, one cut half beside it showing pure white dense flesh, moss and pine needles below, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Hericium erinaceus":
    "antique mycology plate of Hericium erinaceus (lion's mane fungus 猴头菌), NOT a normal capped mushroom: one large round white fruiting body like a frozen cascading fountain hanging from a cut hardwood trunk, its whole surface breaking into hundreds of long soft downward-pointing icicle spines of pure white, finer young spines near the top and longer dangling ones below, no cap no stalk no gills, pale cream shading in the crevices, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  // —— 微型模式生物:显微镜视野构图 ——
  "Trypanosoma brucei":
    "antique microscope field-of-view plate of Trypanosoma brucei (sleeping sickness trypanosome 布氏锥虫) in a blood smear: several long slender pale single-celled organisms like thin flattened serpents among round pinkish blood cells, each with a single extremely long wavy undulating membrane running the length of the body and one trailing flagellum at the front end, a compact darkly-stained dot kinetoplast near the rear end, a small pale oval nucleus in the middle of the body, Giemsa-stained slide look, vintage copperplate engraving with ink stippling, no text no letters no labels",
  "Nitrosopumilus maritimus":
    "vintage scanning-electron-microscope plate on aged parchment: Nitrosopumilus maritimus (氨氧化古菌) magnified — a loose scatter of very small plain smooth cells shaped like tiny blunt matchsticks and short pencils, some slightly curved like little bananas, all the same small size, each drawn as a simple smooth rod outline with a faint fibrous interior, a few lying flat against the crinkled surface of one much larger rounded particle of sea silt, deep neutral background like old EM film, no organelles no nuclei no spikes no spheres with spines, ink stippling and light sepia wash, no text no letters no labels",
  // —— 海带 prompt 第五代:连 kelp 一词也删(该词本身触发植物先验),纯材料几何描述,VLM 独立判定 ——
  "Saccharina japonica":
    "vintage natural history plate on aged parchment: a loose pile of several broad flat dried ribbons of deep olive-brown, like thick bands of dried fruit leather stacked and folded together, each ribbon a smooth wide strap of uniform width with calm even margins, one longer ribbon draped over the pile showing its great length and softly wavy edges, their matte surfaces dusted with a faint bloom of natural white powder like a dusting of fine flour, one short round cord and a tangle of coarse brown fibres at the base of the pile, no branches no leaves no stems of any kind, delicate watercolor tinting, no text no letters no labels",
  // —— Claviceps purpurea:E13 三次内容过滤拒绘(致幻关联),移出重试 ——
  "Penicillium chrysogenum":
    "antique microscope field-of-view plate of Penicillium chrysogenum (青霉) grown on a bread crumb: pale bluish-green mould, its name-giving paintbrush structures magnified large — several tall slender glassy stalks rise from tangled surface hyphae, each stalk ending in a neat symmetric broom of short branch fingers, and every finger tip trails a long straight chain of tiny round green spores like strings of small beads, one stalk drawn enlarged beside the field showing the brush clearly, ink stippling and watercolor tinting, vintage copperplate engraving on aged parchment, no text no letters no labels",
  "Ustilago maydis":
    "antique botanical plate of a maize ear with corn smut (Ustilago maydis 玉米黑粉菌): a plump corn cob with husk leaves peeled back, several kernels swollen into large smooth glossy grey-white pods like river pebbles, one pod split open oozing a wet mass of dense sooty black spore powder, a few loose black spores drawn magnified beside the ear as tiny round spiked balls, autumn corn field behind, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  // —— 肢口纲剑尾目:用户 E13 报告中华鲎被画成奇幻哺乳生物,VLM 确认 FAIL,重定制 ——
  "Tachypleus tridentatus":
    "vintage natural history plate of a Chinese horseshoe crab Tachypleus tridentatus (中华鲎) seen from directly above on wet estuary sand, NOT a crab NOT a scorpion NOT a mammal — no pincers no fur no face: the body in three clean hard-shelled parts, first a big smooth glossy dome-shaped horseshoe arch of olive green-brown cephalothoracic shield like a rounded steel helmet filling half the plate, its surface with faint ridges and two small round dark lateral eyes near the sides, second behind it a lower flatter roughly triangular abdomen plate with a neat row of small sharp backward-pointing movable spines along each side edge, third from the abdomen tip one single long slender straight rigid sword-like telson tail extending flat across the sand like a thin triangular spike, shallow water ripple at the edge, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Limulus polyphemus":
    "vintage natural history plate of an Atlantic horseshoe crab Limulus polyphemus (美洲鲎) drawn from directly above on a sandy seabed, NOT a crab NOT a trilobite NOT a scorpion: one large smooth arched helmet-shaped cephalothoracic shield of dark reddish brown like a polished round dome with two small round lateral eyes at the sides, followed by a flatter triangular abdomen shield whose side edges bear a neat row of small backward-pointing spines, and one long slender rigid sword-like telson tail lying straight on the sand, a second smaller male shown behind clinging onto the larger female's shield edge, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  // —— E21:蠕虫类抗节肢先验(物体类比+NOT 锚点)/鱼类鉴别特征前置/贝壳几何描述 ——
  "Taenia solium":
    "vintage natural history plate of the pork tapeworm Taenia solium (猪带绦虫) laid out in loose coils on parchment: an extremely long flat cream-white ribbon of nearly uniform width, like a length of soft silk sewing ribbon or a paper streamer curled gently, its surface smooth with faint fine rectangular segment lines like the seam lines of ribbon, one tiny narrow scoop-shaped head drawn magnified in a circle beside the main figure showing a small crown of hooks and four round suckers, absolutely NO legs NO antennae NO eyes NO bristles NO hard plates — this is a flatworm, a soft flat ribbon, NOT an insect NOT a millipede NOT a centipede NOT a caterpillar, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Ascaris lumbricoides":
    "vintage natural history plate of the large roundworm Ascaris lumbricoides (蛔虫): three smooth cylindrical pale cream-pink worms lying in loose curves like lengths of thick polished rubber tubing or pale garden hose, their bodies perfectly featureless and glossy with fine lengthwise striations only, gently tapered at both ends, one plumper female and two slimmer males whose tail tips curl into a small hooked bend, one magnified circle beside showing the three small lip flaps around the mouth end, absolutely NO legs NO antennae NO segments of hard armour NO eyes — this is a nematode roundworm, a smooth soft tube, NOT an insect NOT a millipede NOT a centipede NOT a caterpillar, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Hirudo medicinalis":
    "vintage natural history plate of the medicinal leech Hirudo medicinalis (欧洲医蛭) drawn in full dorsal view gliding on a wet river stone: one elongated soft flattened dark olive-black body like a plump coffee-brown slug, its back decorated with a regular elegant pattern of rust-red and black spots in neat rows and two continuous thin coral-red longitudinal stripes, front end rounded with a small round sucker-mouth underneath (drawn magnified in a circle beside: a circular rim lined with tiny saw-blade teeth), rear end finishing in a larger round disc sucker like the base of a suction cup, fine regular annular rings across the skin like the surface of a soft electrical cord, absolutely NO legs NO antennae NO bristles NO eye stalks — this is an annelid leech, a soft flat ribbon of flesh, NOT an insect NOT a centipede NOT a caterpillar, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Eisenia fetida":
    "vintage natural history plate of the compost earthworm Eisenia fetida (赤子爱胜蚓): three long soft cylindrical worms lying in loose curves on dark crumbly garden soil, each like a length of smooth dull reddish-brown rubber tube with a subtle purple-grey sheen, the segmentation visible only as very fine faint encircling lines like the grooves of a flexible hose, a thick smooth pale pink collar band (clitellum) wrapped around each body about one third from the head like a sleeve, skin glossy with a wet rain sheen, absolutely NO legs NO antennae NO eyes NO hard shell plates — this is an earthworm, a soft smooth tube, NOT an insect NOT a millipede NOT a centipede NOT a caterpillar, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Perinereis aibuhitensis":
    "vintage natural history plate of the ragworm Perinereis aibuhitensis (双齿围沙蚕) drawn from above on wet estuary mud: one long slender soft flattened body like a living ribbon of dark green-brown velvet gliding in an S-curve, along each side of every segment a pair of small soft fleshy oval paddle flaps like the frills on a dancer's skirt, each paddle tipped with a tiny tuft of fine golden bristles soft as an eyelash brush, the head small and blunt with two short feelers drawn like tiny flower stamens, absolutely NO jointed legs NO antennae like antennae of beetle NO compound eyes NO hard insect armour — this is a marine polychaete worm with soft paddles, NOT an insect NOT a centipede NOT a millipede, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Sphyrna lewini":
    "vintage natural history plate of the scalloped hammerhead shark Sphyrna lewini (路氏双髻鲨) swimming in side profile view: the head is a wide flat hammer-shaped bar (cephalofoil) extending sideways from the body like the head of a double-headed mallet or a wing, its front edge gently scalloped into lobes with a small central notch, one round eye placed at each far outer corner of the hammer, behind this remarkable head a streamlined grey-brown shark body with a tall pointed first dorsal fin like a sail, small second dorsal, long upper tail lobe, and five gill slits in a row, small mouth drawn open beneath showing rows of small teeth, NOT a whale NOT a dolphin NOT an ordinary pointed-nose shark — the wide hammer-shaped head with an eye at each end is the single identity of this species, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Gadus morhua":
    "vintage natural history plate of the Atlantic cod Gadus morhua (大西洋鳕) in side profile: a heavy elongated grey-brown fish with a large broad head and big mouth, from the tip of its lower jaw hangs one small single short chin barbel like a thin little whisker, along the back exactly THREE separate rounded dorsal fins evenly spaced like three small sails, below on the belly TWO separate anal fins, the white lateral line arcing high over the pectoral fin like a drawn pale curve, skin speckled with small dark dots, NOT a bass NOT a grouper NOT a catfish NOT a fish with one continuous fin — three dorsal fins plus one chin barbel is the identity of the cod, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Paralichthys olivaceus":
    "vintage natural history plate of the olive flounder Paralichthys olivaceus (褐牙鲆) drawn as a museum specimen lying flat from above: an extremely flattened oval body thin as a dinner plate resting flat on the seafloor sand, both eyes migrated onto the LEFT upper side of the head sitting close together like two buttons, the eyed upper surface coloured sandy brown with scattered dark irregular spots and fine rings providing camouflage, the underside pure chalk white, the mouth slightly crooked with small visible teeth, dorsal and anal fins forming a continuous frill around the oval rim, beside it a small faded ordinary round fish drawn for comparison emphasizing how incredibly flat the flounder is, NOT a round-bodied fish NOT a fish shown in side profile — flat as a plate with both eyes on one side is its identity, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Architeuthis dux":
    "vintage natural history plate of the giant squid Architeuthis dux (大王乌贼) in full extension pose: a long torpedo-shaped deep red-purple mantle body like a rigid airship with two large rounded rhombic swimming fins at its rear end like a pair of elephant ears, a muscular head with one enormous round eye the size of a dinner plate glistening, and exactly TEN arms radiating from the head — EIGHT shorter muscular arms of roughly equal length bearing two rows of round suckers along their inner faces, plus TWO much longer thin feeding tentacles stretching far beyond the others, each tentacle ending in a widened club armed with rows of sharp curved hooks, drawn rising dramatically, NOT an octopus with only eight equal arms NOT a fish NOT a jellyfish — exactly ten arms with two very long hooked tentacles is the identity, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Rapana venosa":
    "vintage natural history plate of the veined rapa whelk Rapana venosa (脉红螺) with the shell drawn in three arranged views — side view, view from above the spire, and view of the round open mouth: a large heavy globular marine snail shell like a polished stone ball, with a short stepped spire of few whorls rising like a small castle turret on top, its surface carved with bold raised vertical ribs crossed by fine spiral threads like woven wicker, the large round shell mouth (aperture) glowing deep orange-red within its thick smooth flaring inner lip like the inside of a glazed bowl, exterior cream-grey with faint brown zigzag flame veins, the dark oval operculum lid drawn beside like a small shield, this is a heavy sea-floor snail NOT a flat garden land snail NOT a long-spired conch — the globular body with short spire and orange-red aperture are its identity, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Conus geographus":
    "vintage natural history plate of the geography cone Conus geographus (地纹芋螺): three glossy cone shells arranged upright in a row on pale tropical sand, each shell a smooth polished cone like an ice-cream cone or a tall pawn chess piece, with a wide flat stable base, sides swelling gracefully to a low pointed spire at the crown, the porcelain surface white and pale blushing pink covered all over with fine brown net-mesh tent patterns like an antique map of coastlines, one shell lying flat showing the narrow straight slit of its aperture running the full length, NOT a spiral garden snail NOT a ribbed shell — the smooth cone shape with map-like net pattern is its identity, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Lethenteron reissneri":
    "vintage natural history plate of the Far Eastern brook lamprey Lethenteron reissneri (东北七鳃鳗) with a side profile plus one front-view circle of its mouth: an eel-like slim body of dull grey-brown finely speckled, entirely WITHOUT jaws and WITHOUT paired fins — the head ends in a round suction funnel mouth like the flared bell of a trumpet, shown open in the front-view circle with concentric rings of small sharp yellow teeth and a rasping piston tongue at the centre, behind each small eye a neat row of seven small round gill pore holes in a line, two low continuous fin folds running along the back and around the tail, NOT a true eel NOT a snake NOT an ordinary fish with jaws — the toothed funnel mouth and seven gill holes in a row are its identity, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  // —— E22:24 条硬骨头新锚点(蠕虫×3/贝类×4/节肢×4/棘皮半索×2/鱼类×2/植物苔藓×8/微生物×1) ——
  "Cryptococcus neoformans":
    "antique microscope field-of-view plate of Cryptococcus neoformans (新型隐球酵母) as an India-ink negative stain preparation: several round translucent glassy yeast cells like tiny pale pearls scattered across a sooty black ink field, each single cell perfectly round with a narrow bud pinching off on a narrow neck, and around EVERY cell one thick brilliant clear gelatin halo ring standing out bright against the dark background like a moon with a glowing atmosphere, absolutely NO mushroom caps NO hyphae threads NO spore chains — the thick clear capsule halo around round budding cells is its single identity, ink stippling and watercolor tinting, vintage copperplate engraving on aged parchment, no text no letters no labels",
  "Polytrichum commune":
    "vintage botanical plate of the haircap moss Polytrichum commune (金发藓) drawn larger than life: a dense lawn of dozens of tiny unbranched green bottle-brush stems standing perfectly straight like a miniature forest of green stakes, each slender stem clothed in tiny narrow green lance leaves pressed close, and from the tip of several stems rises a long thin red stalk (seta) each bearing one small erect brown box capsule like a tiny four-sided pencil case with a lid, one capsule still wearing its fuzzy golden-brown hairy cap like a chef's tuque drawn slipping off, absolutely NO flowers NO petals NO seeds NO woody trunk — the upright stems with box capsules on red stalks are its identity, copperplate engraving with hand-tinted watercolor on aged parchment, no text no letters no labels",
  "Conocephalum conicum":
    "vintage botanical plate of the liverwort Conocephalum conicum (蛇苔): one broad flat ribbon of thick leathery deep-green thallus lying flat on damp streamside soil, its whole upper surface tiled with a neat honeycomb network of hexagonal scale cells exactly like the repeating pattern of snake skin or a turtle shell, the ribbon forking into two equal blunt tongues at its tip, one small downturned cone on a thin stalk rising from the surface near the middle, absolutely NO leaves NO stems NO roots NO flowers NO veins — a flat snakeskin-patterned green ribbon is its identity, copperplate engraving with hand-tinted watercolor on aged parchment, no text no letters no labels",
  "Adiantum capillus-veneris":
    "vintage botanical illustration of the maidenhair fern Adiantum capillus-veneris (铁线蕨): a graceful fountain-shaped plant where every frond is held up by a slender wiry stalk of glossy jet-black like thin black piano wire, the black stalk curving over at the top to carry a spread of delicate pale-green fan-shaped leaflets, each tiny leaflet a thin translucent wedge like a half-open hand fan with fine radiating ribs and lightly scalloped edge, several fronds of different ages rising from the same small rootstock in a vase-like spray, absolutely NO flowers NO petals NO woody stem — black wire stalks with green fan leaflets are its identity, copperplate engraving with hand-tinted watercolor on aged parchment, no text no letters no labels",
  "Picea asperata":
    "vintage botanical illustration of the dragon spruce Picea asperata (云杉), a tall pyramidal conifer of Chinese mountains: the whole tree a dense narrow spire of dark green like a church steeple, one lower branch brought forward in detail showing short stiff sharp-pointed four-angled needles standing out ALL AROUND the twig like a bottle brush (not flat sprays), and hanging DOWNWARD from the branch on short curved stalks several pendant cylindrical seed cones like small dangling cucumbers of purple-brown, their thin papery scales with ragged fringed edges beginning to open, a few loose winged seeds drifting, absolutely NO flat wide leaves NO upright cones — sharp all-round needles and hanging cylindrical cones are its identity, copperplate engraving with hand-tinted watercolor on aged parchment, no text no letters no labels",
  "Platycladus orientalis":
    "vintage botanical illustration of the Oriental arborvitae Platycladus orientalis (侧柏): a small evergreen tree of temple courtyards whose greenery is made entirely of many small FLATTENED branchlet sprays, every spray a flat lacy two-dimensional panel of tiny green scale leaves pressed flat and overlapping like woven lace arranged in one plane, the flat sprays held mostly upright and vertical in stacked open tiers like a stand of green fans, tiny clusters of small woody round cones with a tiny hook on each scale, one detached spray drawn enlarged beside the tree showing its flat plane and minute scale leaves clearly, absolutely NO needles NO flat wide leaves — the flat lacy scale-leaf sprays in one plane are its identity, copperplate engraving with hand-tinted watercolor on aged parchment, no text no letters no labels",
  "Houttuynia cordata":
    "vintage botanical illustration of Houttuynia cordata (蕺菜鱼腥草) growing by a stream: a small patch of low herb with stems carrying alternate heart-shaped leaves of deep green like small friendly hearts on short stalks, and rising above the leaves one strange inflorescence like a tiny white cross beneath a yellow pencil — four large oval SNOW-WHITE bracts spread flat in a cross at the base while a stout yellow-green spike like a short blunt pencil stands straight up from its centre, the true flowers just minute dots on the spike, absolutely NOT four white petals around a yellow disc — four white bracts under one yellow spike is its identity, copperplate engraving with hand-tinted watercolor on aged parchment, no text no letters no labels",
  "Zingiber officinale":
    "vintage botanical illustration of ginger Zingiber officinale (姜) with the treasure placed centre stage: one plump hand of fresh ginger rhizome drawn large — a flat palm-like underground stem of pale warm beige with knobby rounded finger segments branching like a fat hand, its thin papery skin with fine rings and tiny scale eyes, one finger broken open showing the pale yellow fibrous flesh inside, beside it a small growing plant of long lance-shaped green leaves and one cone of yellow-green bracts with a yellow lip flower rising straight from the soil, soil brushed from the rhizome to show it all, the rhizome NOT like a carrot NOT like a potato — the knobby branching beige hand is its identity, copperplate engraving with hand-tinted watercolor on aged parchment, no text no letters no labels",
  "Coptis chinensis":
    "vintage botanical illustration of the Chinese goldthread Coptis chinensis (黄连) with its namesake gold drawn centre stage: a low evergreen forest herb whose crowning feature lies below ground — one cluster of long slender branching rhizomes like golden turmeric fingers of bright egg-yolk yellow with wiry roots, lifted clear of the dark soil beside the plant and drawn glossy and vivid, above ground a rosette of graceful trifoliate dark-green leaves, each leaflet finely toothed and three-lobed like a small bird's foot, one slender stem bearing a small umbel of tiny pale yellow-green flowers with narrow white petals, absolutely NOT a root like a carrot NOT a palm — golden yellow rhizomes plus fine three-part leaves are its identity, copperplate engraving with hand-tinted watercolor on aged parchment, no text no letters no labels",
  "Spongia officinalis":
    "vintage natural history plate of the commercial bath sponge Spongia officinalis (浴用海绵): one irregular rounded dome-shaped mass the size of a loaf of bread, entirely made of a springy honeycomb skeleton — its whole surface covered with round pores and openings of many sizes like a natural bath sponge or a block of fine bubble coral, the texture soft elastic and fibrous like dense tangles of fine silky horn fibres, coloured warm tan to dark brown with a slightly velvety nap, one corner cut away showing the even finer honeycomb network inside, lying on a Mediterranean sandy bottom with faint blue water above, absolutely NO coral branches NO plant leaves NO polyps with tentacles — the porous elastic honeycomb loaf is its identity, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Dugesia japonica":
    "antique natural history plate of the freshwater planarian Dugesia japonica (日本三角涡虫) gliding on a smooth wet pebble under clear stream water seen from directly above: one small soft flattened leaf-shaped body of deep chocolate brown like a living band-aid, its front end stretched into a neat triangular arrowhead point with two tiny round milky eyespots placed close together like a cartoon face, the body smooth glossy and featureless tapering to a softly pointed tail, no visible segmentation, one planarian drawn enlarged beside the stone showing the triangle head and eye pair clearly, absolutely NO legs NO segments NO suckers NO antennae NO stripes — the triangle head with two eyes and a plain soft flat body are its identity, copperplate engraving with ink stippling on aged parchment, no text no letters no labels",
  "Trichinella spiralis":
    "antique parasitology microscope plate of Trichinella spiralis (旋毛形线虫·旋毛虫) in muscle tissue, a stained histology slide view: long parallel bands of striated muscle fibres like bundles of pink cords with fine lengthwise stripes running across the field, and inside one swollen transformed muscle cell a neat lemon-shaped cyst capsule like a small oval nut shell, within which one minute white worm is curled in a tight flat spiral like a coiled watch spring — one and a half perfect coils visible, the nurse-cell capsule sitting between the muscle bands, a magnified detail circle beside it showing the spiral worm alone enlarged, absolutely NO legs NO antennae — the spiral-coiled larva inside a lemon-shaped capsule in muscle is its identity, copperplate engraving with ink stippling and watercolor tinting on aged parchment, no text no letters no labels",
  "Hyriopsis cumingii":
    "vintage conchology plate of the freshwater pearl mussel Hyriopsis cumingii (三角帆蚌): one large flat bivalve shell of deep black-brown drawn from outside in side-by-side pair slightly open like a book, its shape a broad flattened triangle whose rear upper edge rises into a tall thin wing-like sail — a large triangular flange standing up from the hinge line like the fin of a fish or a ship's lateen sail, the shell surface bearing fine concentric growth rings and faint green rays, beside it a second shell drawn from inside showing the thick pearly white nacre layer with a soft rainbow sheen like the inside of a soap bubble, and a strand of small round cultured pearls arranged beside it, absolutely NOT a spiral snail NOT a marine oyster with wavy frills — the flat triangular shell with a tall dorsal sail wing is its identity, copperplate engraving with watercolor on aged parchment, no text no letters no labels",
  "Meretrix meretrix":
    "vintage conchology plate of the hard clam Meretrix meretrix (文蛤): a pair of thick heavy bivalve shells of warm buff and cream tones lying open on estuarine sand like two matching shallow bowls, each shell a plump smooth triangle-oval with a high gentle dome, its surface polished and crossed with fine pattern like engraved topography — delicate brown zigzag lightning marks and cloud marbling over a pale tan background, the concentric growth ridges and fine radial threads crossing like woven linen, the inner faces glowing porcelain white with a smooth satiny lustre and a neat hinge line, one shell tilted upright showing the thick robust edge, absolutely NOT a spiral snail NOT a spiny oyster — the smooth thick oval with painted brown zigzag patterns is its identity, copperplate engraving with watercolor on aged parchment, no text no letters no labels",
  "Acanthochiton rubrolineatus":
    "vintage natural history plate of the chiton Acanthochiton rubrolineatus (红条毛肤石鳖) from directly above on wet tide-pool rock: one small oval shield like a miniature armadillo back — its upper surface paved with exactly EIGHT separate overlapping arched shell plates arranged in a neat single row down the midline like a low roof of curved tiles, the plates olive-grey etched with bold red-brown lengthwise stripes, and surrounding all the plates a narrow fleshy girdle belt of tough leathery skin studded with dense short bristles like a fringe of tiny eyelashes, the oval head hidden under the front plate and the soft pale foot gripping the stone below, one individual drawn rolled into a ball beside it like a pill bug, absolutely NOT a limpet with one single shell NOT a beetle — eight tiled plates in a row with a bristly girdle is its identity, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Anopheles sinensis":
    "vintage entomological plate of the malaria mosquito Anopheles sinensis (中华按蚊) resting on a mud wall in its characteristic stance: one slim grey-brown mosquito with a very long straight slender proboscis projecting forward like a thin needle, long thin hind legs raised high behind at a sharp angle so the body rests tail-high like the prow of a boat, one pair of narrow transparent wings lying flat over the back decorated with an alternating pattern of dark and pale spots along the wing veins like a speckled veil, small palps beside the proboscis nearly as long as the proboscis itself, spindly legs with pale band rings, absolutely NOT a crane fly NOT a house fly NOT a butterfly — the long thin proboscis, spotted wings and tail-up resting stance are its identity, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Tetranychus cinnabarinus":
    "antique microscope plate of the spider mite Tetranychus cinnabarinus (朱砂叶螨) on the underside of a leaf, drawn magnified: a colony of tiny plump oval mites of brick-red and cinnabar red like small translucent drops of sealing wax, each mite a soft rounded dome with NO antennae and exactly EIGHT fine hair-thin legs (four pairs) walking slowly, the body surface bearing a few pairs of fine pale dorsal setae like tiny glass bristles, around them sparse silk threads strung like a miniature cat's cradle across the leaf's veins, and several tiny glassy round eggs like miniature soap bubbles clustered along a vein, the leaf surface pale green with scattered pale feeding spots, absolutely NOT an insect NO six legs NO wings NO antennae — a soft red dome with eight legs is its identity, copperplate engraving with ink stippling and watercolor tinting on aged parchment, no text no letters no labels",
  "Daphnia magna":
    "antique microscope field-of-view plate of the water flea Daphnia magna (大型溞) seen from its left side, one adult drawn large: a plump transparent body enclosed in a clear folded carapace shell like a swimming lentil or a translucent kidney bean open at the front and split into a sharp beak at the top, through the glassy shell the inner anatomy plainly visible — one large single dark round eye near the head with a smaller tiny eye beside it, a rhythmic beating heart drawn as a small pale oval, rows of fine filtering legs like little combs in the middle, and a brood pouch at the back holding a cluster of round resting eggs like a string of pale pearls, one large branched antenna like a ram's horn oar extended from the head for rowing, a small tail spine extending from the back of the shell, absolutely NOT a shrimp with legs outside NOT a fish — the transparent lentil shell with ram-horn antennae and visible inner eye is its identity, copperplate engraving with ink stippling and watercolor tinting on aged parchment, no text no letters no labels",
  "Ophiura sarsii":
    "vintage marine natural history plate of the brittle star Ophiura sarsii (萨氏真蛇尾) from directly above on grey deep-sea mud: one small round flat central disc like a gently domed coin of grey-brown finely scaled skin, and from its rim exactly FIVE very long thin snake-like arms radiating outward, each arm astonishingly slender like a strand of spaghetti and clearly separate from the disc right to the base — made of a neat chain of tiny square ossicle plates like a bamboo bead curtain, each joint bearing a pair of tiny flat arm spines like fine combs, the arms gently curving in different directions like starfish rays drawn impossibly thin, the disc upper surface with a fine radial scale pattern and small central plates, absolutely NOT a starfish whose thick arms merge into the disc — the coin disc plus five separate thread arms is its identity, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Balanoglossus misakiensis":
    "vintage natural history plate of the acorn worm Balanoglossus misakiensis (三崎柱头虫) laid out on parchment beside a burrow cast: one long soft wet tongue-shaped body of dull ochre brown with clearly three divisions — at the front a plump rounded acorn-shaped proboscis like the cup of an acorn or the plunger of a syringe, behind it a short narrow collar ring like a rolled neckerchief, then the very long flat trunk stretching behind, along BOTH sides of the trunk's upper front half two neat rows of small round gill pore holes in close pairs like a line of button holes, the body smooth soft and slimy with faint lengthwise grooves, drawn partly emerged from its U-shaped sand burrow, absolutely NO legs NO segments NO antennae NO eyes NO fins — acorn proboscis plus collar plus long trunk with gill pores is its identity, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Eptatretus burgeri":
    "vintage natural history plate of the inshore hagfish Eptatretus burgeri (布氏粘盲鳗) in side profile on the seabed: one long limp soft body like a length of slack pinkish-grey garden hose lying in loose curves, smooth scaleless skin of pale pink-brown with a pale cream belly stripe, NO jaws and NO external eyes — the head bluntly rounded ending in one single round nostril hole ringed by a rosette of EIGHT short fleshy tentacle barbels like a fringe of fat little fingers arranged around the front, a row of small round gill pore openings along the side of the body, and near the tail a cluster of white slime glands oozing one ribbon of milky slime, one head drawn enlarged in a circle beside the body showing the tentacle rosette and rasping plate teeth, absolutely NOT an eel NOT a lamprey with funnel mouth — the tentacle-fringed round mouth of a jawless hose body is its identity, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Chiloscyllium plagiosum":
    "vintage natural history plate of the whitespotted bamboo shark Chiloscyllium plagiosum (条纹斑竹鲨) in side profile gliding over a shallow reef: one slender elongate shark of pale tan and brown, its body notably slim and supple like a stretched lozenge with a very LONG low tail fin whose upper lobe stretches far back like a ribbon, over the back a bold pattern of wide dark brown saddle bands spaced like the nodes of a bamboo stalk, each band edged with scattered small white spots, the head short and bluntly rounded like a rounded spoon with small eyes and tiny spiracles, two small nasal barbels like a cat's whiskers hanging beside each nostril, two similar-sized small dorsal fins far back on the body and broad paddle pectoral fins, absolutely NOT a nurse shark NOT a whale — the bamboo-node saddle bands, blunt head with whisker barbels and very long tail are its identity, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Paralithodes camtschaticus":
    "vintage natural history plate of the red king crab Paralithodes camtschaticus (勘察加拟石蟹帝王蟹) from directly above on deep-sea gravel: one massive crab of red-purple-brown, its round fan-shaped carapace like a heavily armoured shield studded all over with coarse blunt spines and tubercles like a mace head, a short spiny rostrum notch at the front between two small eyes on stalks, at the front ONE pair of thick crushing claws unequal in size with the right one noticeably larger and more massive like a boxing glove, and along each side exactly THREE pairs of very long spiny slender walking legs jointed like folded measuring sticks, the whole animal appearing to stand on six long legs plus two claws, the folded abdomen reduced to a small fan flap tucked underneath, absolutely NOT a lobster with a long tail NOT a spider — the spiny fan shield with six long legs and one giant claw is its identity, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Nephila clavata":
    "vintage natural history illustration of the golden orb-weaver Nephila clavata (棒络新妇) at the centre of her web in an autumn forest clearing: one slender elongated female spider of chartreuse yellow-green, the elongated oval abdomen decorated with fine wavy dark blue-black and yellow horizontal bands like a striped candy, the small head end with silvery grey cephalothorax, legs extremely long and slender in yellow and black bands with small tufts of dark hair like tiny feather brushes near the joints, she hangs head-down at the hub of an enormous round orb web whose silk gleams warm GOLD in slanting sunlight like fine spun brass threads strung with dew, a corner of the web anchored to red maple leaves, absolutely NOT a crab spider NOT a tarantula — the slender striped legs hanging in a golden orb web is her identity, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  // —— E22 追加:3 张孤儿待审物种的备用 prompt(审计失败则按新锚点重生成) ——
  "Takifugu rubripes":
    "vintage natural history plate of the torafugu pufferfish Takifugu rubripes (红鳍东方鲀) in side profile swimming above coastal gravel: one plump stubby fish shaped like a rounded loaf with a blunt rounded snout, its back dark olive-brown covered with bold scattered round pale spots each ringed with a fine white margin like a field of small moons, the flanks pale silver, and one small anal fin near the tail coloured pure WHITE like a scrap of paper while the small paddle-shaped pectoral fins glow bright ORANGE-RED like autumn leaves, tiny prickly skin folds suggested on the belly, small beady eye high on the head, NOT a balloon NOT a globe fish floating round — a chubby spotted fish with white anal fin and orange-red pectoral fins is its identity, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Anguilla japonica":
    "vintage natural history plate of the Japanese eel Anguilla japonica (日本鳗鲡) drawn in a long S-curve on pale parchment: one extremely elongate serpent-like fish of slimy smooth skin with NO visible scales, the body a very long rounded rope tapering only at the very tip of the tail, the whole back and top dark olive green-brown fading down the flanks to a belly of clean SILVER WHITE, the long low dorsal fin beginning far back near the middle of the body and running as one continuous frill around the tail joining the anal fin like a single ribbon border tracing the rear half, the small gill opening just a tiny slit low on the side, small eye near the pointed snout, one glass eel (the transparent juvenile) drawn tiny beside the adult, NOT a snake NOT a lamprey — the very long fin-ribbon border and snake body with silver belly is its identity, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Hippocampus japonicus":
    "vintage natural history plate of the Japanese seahorse Hippocampus japonicus (日本海马) drawn upright coiled around a strand of eelgrass: one tiny fish standing fully UPRIGHT like a chess knight piece, its body armour of hard bony ring segments like a string of small stacked beads from chest to tail, the head at a right angle to the body ending in a long thin tubular snout like a slender trumpet pipe with a small toothless mouth at its tip, a small coronet crown of tiny spines on top of the head, one gill opening like a small pore, small transparent dorsal fin fluttering on the back, the long tail curled forward in a neat spiral coil gripping the green eelgrass ribbon, overall colour warm yellowish brown with pale saddle marks, one egg-brooding male drawn beside with a visible pouch, NOT a pipefish with a straight body NOT a dragon — the upright ringed body with tubular snout and curled tail is its identity, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
};

/** 从中文形态/描述档案提炼关键鉴别特征注入 prompt(防止张冠李戴) */
function featureHints(morphology?: string | null, description?: string | null): string {
  const src = [morphology, description].filter(Boolean).join(" ");
  if (!src) return "";
  return ` The true diagnostic morphology (MUST depict accurately, from species profile): ${src.replace(/\s+/g, " ").slice(0, 110)}`;
}

async function getKingdoms(): Promise<Map<string, string>> {
  const all = await db.taxon.findMany({ select: { id: true, rank: true, latinName: true, parentId: true } });
  const byId = new Map(all.map((t) => [t.id, t]));
  const memo = new Map<string, string>();
  const walk = (id: string): string => {
    if (memo.has(id)) return memo.get(id)!;
    const n = byId.get(id);
    let res = "";
    if (n) {
      const isK = n.rank === "kingdom" || (n.rank === "domain" && (n.latinName === "Bacteria" || n.latinName === "Archaea"));
      if (isK) res = n.latinName;
      else if (n.parentId) res = walk(n.parentId);
    }
    memo.set(id, res);
    return res;
  };
  for (const t of all) walk(t.id);
  return memo;
}

function parseVerdict(raw: string): { ok: boolean; reason: string } | null {
  const m = raw.match(/\{[\s\S]*\}/);
  if (!m) return null;
  try {
    const j = JSON.parse(m[0]);
    if (typeof j.match !== "boolean") return null;
    const anatomy = !!(j.anatomy_errors || j.anatomy);
    const ok = j.match && !anatomy; // match 且无解剖硬伤才入库(拼写类小瑕疵可容忍)
    return { ok, reason: String(j.reason || "").slice(0, 160) };
  } catch {
    return null;
  }
}

type Task = {
  id: string; latinName: string; chineseName: string;
  morphology?: string | null; description?: string | null;
  file: string; exists: boolean;
};

let gen429 = 0;      // 生成侧 429 连击(跨 worker 共享)
let audit429 = 0;    // 审计侧 429 连击
let stopAll = false; // 三连退避全局熔断

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  mkdirSync(REJECTED_DIR, { recursive: true });
  const kingdoms = await getKingdoms();
  const zai = await ZAI.create();

  const where: any = SCOPE === "all"
    ? { rank: "species", image: null }
    : { rank: "species", image: null, tags: { contains: "flagship" } };
  if (ONLY.length) where.latinName = { in: ONLY };
  const species = await db.taxon.findMany({
    where,
    orderBy: { sortOrder: "asc" },
    select: { id: true, latinName: true, chineseName: true, morphology: true, description: true },
  });

  // 断点续跑:已处理(accepted|rejected)物种跳过
  const done = new Map<string, string>();
  if (existsSync(PROGRESS)) {
    for (const l of readFileSync(PROGRESS, "utf8").split("\n")) {
      if (!l.trim()) continue;
      try { const j = JSON.parse(l); done.set(j.id, j.result); } catch {}
    }
  }

  const tasks: Task[] = [];
  for (const s of species) {
    if (done.has(s.id)) continue;
    const slug = s.latinName.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase().replace(/^-|-$/g, "");
    tasks.push({ ...s, file: `${OUT_DIR}/${slug}.png`, exists: existsSync(`${OUT_DIR}/${slug}.png`) });
    if (tasks.length >= BATCH) break;
  }
  console.log(`[start] 范围:${SCOPE} 断点已处理 ${done.size} / 池剩 ${species.length - done.size},本轮任务 ${tasks.length}(磁盘已有待审 ${tasks.filter((t) => t.exists).length},待生成 ${tasks.filter((t) => !t.exists).length})`);

  let accepted = 0, rejected = 0, skipped = 0;

  /** VLM 审计一张图;返回 verdict 或 null(异常) */
  async function audit(t: Task): Promise<{ ok: boolean; reason: string } | null> {
    for (let i = 0; i < 2; i++) {
      try {
        const b64 = Buffer.from(readFileSync(t.file)).toString("base64");
        const vres = await zai.chat.completions.createVision({
          model: "glm-4.5v",
          messages: [{
            role: "user",
            content: [
              { type: "text", text: `你是一位严格的博物学审图员。这张图是为物种 ${t.latinName}(${t.chineseName}) 生成的复古博物学插图。真实档案:${[t.description, t.morphology].filter(Boolean).join(" ").slice(0, 180)}。只输出 JSON:{"match":true/false,"anatomy_errors":true/false,"reason":"一句话"}` },
              { type: "image_url", image_url: { url: `data:image/png;base64,${b64}` } },
            ],
          }],
          thinking: { type: "disabled" },
        });
        audit429 = 0;
        return parseVerdict(vres.choices[0]?.message?.content || "");
      } catch (e: any) {
        const msg = String(e?.message || e);
        if (msg.includes("429") || msg.toLowerCase().includes("too many")) {
          audit429++;
          console.log(`[429] 审计限流第 ${audit429} 次,退避 ${45 * audit429}s (${t.latinName})`);
          if (audit429 >= 3) { stopAll = true; return null; }
          await sleep(45000 * audit429);
          continue;
        }
        console.log(`[audit-err] ${t.latinName}: ${msg.slice(0, 90)}`);
        return null;
      }
    }
    return null;
  }

  /** 生成一张图;返回状态:E10 语义修复——区分瞬时失败(限流/网络)与终态失败(内容过滤),
   *  只有终态失败或真实 VLM 否决才允许标记 rejected,防止限流窗口误伤物种 */
  async function generate(prompt: string, out: string): Promise<"ok" | "filtered" | "ratelimited" | "error"> {
    for (let attempt = 1; attempt <= 3; attempt++) {
      if (stopAll) return "ratelimited";
      try {
        const imgRes = await zai.images.generations.create({ prompt, size: "1152x864" });
        const b64 = imgRes?.data?.[0]?.base64;
        if (!b64) { console.log("[gen-err] 响应无 base64"); return "error"; }
        await Bun.write(out, Buffer.from(b64, "base64"));
        gen429 = 0;
        return "ok";
      } catch (e: any) {
        const msg = String(e?.message || e);
        if (msg.includes("429") || msg.toLowerCase().includes("too many")) {
          gen429++;
          console.log(`[429] 生成限流第 ${gen429} 次,退避 ${60 * gen429}s`);
          if (gen429 >= 3) { stopAll = true; return "ratelimited"; }
          await sleep(60000 * gen429);
          continue;
        }
        if (msg.includes("400") || msg.toLowerCase().includes("content")) {
          console.log(`[filter] 内容过滤跳过: ${msg.slice(0, 80)}`);
          return "filtered";
        }
        console.log(`[gen-err] ${msg.slice(0, 90)}`);
        return "error";
      }
    }
    return "error";
  }

  async function worker() {
    while (queue.length > 0 && !stopAll) {
      const t = queue.shift() as Task | undefined;
      if (!t) return;
      const slug = t.latinName.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase().replace(/^-|-$/g, "");
      const kingdom = kingdoms.get(t.id) || "Animalia";
      const style = KINGDOM_STYLE[kingdom] || KINGDOM_STYLE.Animalia;
      // E10:疑难旗舰物种优先使用逐种定制 prompt(两轮通用模板未过审的硬骨头)
      const basePrompt = SPECIFIC_PROMPT[t.latinName] || style(t.chineseName, t.latinName);

      // 0) 磁盘已有未入库文件:先审计旧文件(未经闸门的历史遗留)
      let acceptedThis = false, lastReason = "";
      if (t.exists) {
        const v = await audit(t);
        if (v?.ok) {
          acceptedThis = true;
          lastReason = v.reason;
        } else if (v) {
          // 旧文件不合格 → 隔离,走重新生成
          renameSync(t.file, join(REJECTED_DIR, `${slug}-pre.png`));
          console.log(`[pre-reject] ${t.latinName} 存量图不合格已隔离: ${v.reason}`);
        } else {
          // 审计异常(429 熔断等):本轮放弃该物种,不消耗重试名额
          if (stopAll) return;
        }
      }

      // 1) 生成 → 审计闭环(每物种最多 RETRY 轮)
      let attempts = 0;
      let vlmFailed = false;    // E10:是否收到过明确的 VLM 否决(区别于限流/异常)
      let filteredOut = false;  // E10:内容过滤终态失败
      while (!acceptedThis && !AUDIT_ONLY && !stopAll && attempts < MAX_RETRY) {
        attempts++;
        const gres = await generate(basePrompt + featureHints(t.morphology, t.description), t.file);
        if (gres !== "ok") {
          if (stopAll || gres === "ratelimited") return; // 熔断:不记录,物种留待下轮窗口
          if (gres === "filtered") { filteredOut = true; lastReason = "内容过滤拒绘"; }
          else lastReason = "生成失败(瞬时)";
          break;
        }
        const v = await audit(t);
        if (v) {
          if (v.ok) { acceptedThis = true; lastReason = v.reason; }
          else { vlmFailed = true; lastReason = v.reason; console.log(`[reject] ${t.latinName} 尝试${attempts}: ${v.reason}`); }
        } else if (stopAll) return;
        else lastReason = "VLM 输出无法解析";
        if (!acceptedThis && attempts < MAX_RETRY) await sleep(2000);
      }

      // 2) 结果落库 / 隔离(E10:仅终态失败才记 rejected;瞬时失败不记,留待下轮)
      if (acceptedThis) {
        await db.taxon.update({
          where: { id: t.id },
          data: { image: `/generated/${slug}.png`, imageCaption: "复古博物学风格 AI 插图(经 VLM 科学性复核)" },
        });
        appendFileSync(PROGRESS, JSON.stringify({ id: t.id, latin: t.latinName, result: "accepted", attempts, reason: lastReason }) + "\n");
        accepted++;
        console.log(`[入库✓] ${t.latinName} (尝试${attempts}): ${lastReason.slice(0, 70)}`);
      } else if (vlmFailed || filteredOut) {
        if (existsSync(t.file)) renameSync(t.file, join(REJECTED_DIR, `${slug}.png`));
        appendFileSync(PROGRESS, JSON.stringify({ id: t.id, latin: t.latinName, result: "rejected", attempts, reason: lastReason }) + "\n");
        rejected++;
        console.log(`[放弃] ${t.latinName} 保持占位图: ${lastReason.slice(0, 80)}`);
      } else {
        skipped++;
        console.log(`[跳过] ${t.latinName} 瞬时失败不记录,留待下轮: ${lastReason.slice(0, 60)}`);
      }
      if (!AUDIT_ONLY) await sleep(1500 + Math.random() * 2500);
    }
  }

  const queue = [...tasks];
  await Promise.all(Array.from({ length: Math.max(1, CONCURRENCY) }, () => worker()));

  const total = await db.taxon.count({ where: { image: { not: null } } });
  console.log(`\n[done${stopAll ? "(限流熔断)" : ""}] 本轮:入库 ${accepted} / 放弃 ${rejected} / 瞬时跳过 ${skipped} / 任务 ${tasks.length};断点 ${PROGRESS};库内当前有效配图 ${total} 张`);
}

main()
  .catch((e) => { console.error("FATAL", e); process.exit(1); })
  .finally(async () => { await db.$disconnect(); });
