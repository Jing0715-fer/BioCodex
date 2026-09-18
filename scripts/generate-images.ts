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
    "antique desert plate: ONE squat dark woody stump like a weathered carrot stub rooted in Namib gravel, and from its crown exactly TWO broad flat leathery green straps sprawling in opposite directions along the ground like two old leather belts laid side by side, each strap one single unbroken band with slightly wavy edges — never split never shredded never torn into strips, two straps total and nothing leafy anywhere, sparse gravel and a distant fog bank, absolutely NO crown of many leaves NO tree shape NO fern, ink stippling, no text no letters no labels",
  "Metasequoia glyptostroboides":
    "vintage botanical illustration of Metasequoia glyptostroboides (dawn redwood 水杉): a tall deciduous conifer with reddish-brown shredding trunk, one main branch detail showing opposite branching with flat feathery sprays of many small linear soft green leaves arranged in two neat rows along each branchlet, small round pendant cones on short stalks, a separate bare winter twig with opposite buds, copperplate engraving with hand-tinted watercolor on aged parchment, no text no letters no labels",
  "Salix babylonica":
    "vintage botanical illustration of Salix babylonica (weeping willow 垂柳) beside a lake: a broad-crowned tree with rough grey trunk, countless very long slender yellow-green branchlets cascading down to the water surface like a curtain, narrow lanceolate leaves with finely serrated edges, one detail sprig with drooping catkins, copperplate engraving with hand-tinted watercolor on aged parchment, no text no letters no labels",
  "Schistosoma japonicum":
    "antique parasitology still-life on aged parchment: resting alone in the center of a shallow glass laboratory dish ONE single thick pale flesh-pink wax cord, plump and smooth and completely featureless, with one deep lengthwise groove running along its whole side like a split pea pod showing its hollow channel, both ends cut bluntly round, absolutely nothing else in the dish — no second worm no thread no face no eyes no limbs no segments, one object only, a thin wash of pink stain at the dish edges, ink stippling, no text no letters no labels",
  "Caenorhabditis elegans":
    "antique microscope field-of-view plate of Caenorhabditis elegans (秀丽隐杆线虫): several tiny translucent glass-clear thread animals gliding over a pale smooth agar dish seen through the round lens, each about one millimeter long with smooth bodies tapered at both ends like fine clear sewing threads, faint straight inner tubes showing through the clear skin, one slimmer individual with a narrow tapered tail, soft circular vignette of the lens edge, vintage copperplate engraving with ink stippling on aged parchment, no text no letters no labels",
  "Haliotis discus hannai":
    "vintage conchology plate of Haliotis discus hannai (abalone 皱纹盘鲍), NOT a spiral whelk: an ear-shaped very flat low oval marine gastropod shell, greenish-brown exterior with fine wrinkled spiral ribs, a single row of small raised pore holes along the left edge, paired with a second specimen shown from inside with iridescent mother-of-pearl and a big creamy-white muscular foot, copperplate engraving with watercolor on aged parchment, no text no letters no labels",
  "Apostichopus japonicus":
    "antique seafood-market still-life: one fat dark SPINY CUCUMBER lying on crushed ice, its body a stout oval cylinder like a stale baguette or a large gherkin, the skin soft and leathery and wrinkled with rows of small fleshy bumps running along five lengthwise lines, at one end a small crown of short soft tree-branch tentacles like a tiny mop, at the other end a simple round hole, absolutely NO eyes NO head NO bone NO fins NO arms with suckers — a sedentary spiky loaf resting on ice, ink stippling, no text no letters no labels",
  "Sphenodon punctatus":
    "vintage natural history illustration of Sphenodon punctatus (tuatara 楔齿蜥), NOT a common lizard: a robust ancient reptile with olive-grey heavily wrinkled saggy skin, a conspicuous crest of triangular spiny scales from nape down the back, strong limbs with clawed digits splayed on New Zealand coastal rocks, bright alert eye, ridged tail, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Nipponia nippon":
    "vintage ornithological illustration of Nipponia nippon (crested ibis 朱鹮): an elegant medium-large wading bird standing in a wetland paddy, white plumage washed with delicate pale pink especially on the wing undersides, bare brick-red facial skin around the eye, long slightly decurved black bill, wispy lanceolate crest plumes drooping on the nape, black legs, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Branchiostoma belcheri":
    "antique zoology plate: ONE small animal like a two-inch SLIVER OF FROSTED GLASS laid on black velvet, both ends drawn out into fine points, the body utterly translucent pale white with no head no eyes no jaws no scales no lateral fins, along the flank a fine row of tiny V-shaped chevrons showing through the glass like a strip of sergeant's insignia, a low continuous fin rim running around the whole tail like the curled edge of a wax-paper wing, a small round mouth fringed with fine cirri at the front tip, absolutely NO face NO eye of any kind, ink stippling, no text no letters no labels",
  "Spirobranchus giganteus":
    "vintage marine natural history illustration of Spirobranchus giganteus (Christmas tree worm 大旋鳃虫): two identical small spiral conical feathery gill crowns like miniature fir trees, one vivid violet-blue and one golden-orange, each formed of two perfectly spiraling rows of delicate radiole feathers, rising side by side from a tiny round hole in a living massive coral head, underwater coral reef scene, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Eunice aphroditois":
    "antique deep-sea plate: from one U-shaped burrow hole in the pale seabed emerges a single long soft RIBBON of dark iridescent bronze-purple like a strip of shot silk sliding out of a sleeve, the ribbon's two edges lined with a continuous fine fringe of soft bristle combs, at its tip one small rounded simple head bearing one short straight pair of feelers, the body rippling like cloth underwater, absolutely NO jointed legs NO pincers NO armour plates NO compound eyes — a silk ribbon with a fringed hem emerging from a sand burrow, ink stippling, no text no letters no labels",
  // —— E13 第二批:海藻类统一走「压制标本/显微镜视野」构图,规避陆生植物词汇 ——
  "Ulva lactuca":
    "antique beach plate: ONE sheet of sea lettuce like a crumpled sheet of thin green WAX PAPER or a sheet of fresh green pasta, the sheet soft, translucent and ruffled at the edges like a lettuce leaf freshly torn from a salad, its surface completely smooth and featureless with absolutely NO central vein NO side veins NO net of lines of any kind, a pale small holdfast dot at the base, a few grains of sand, ink stippling, no text no letters no labels",
  "Pyropia yezoensis":
    "vintage food-illustration plate on aged parchment: a small stack of dried sushi nori sheets — several thin flat matte sheets of deep purplish-black with a rosy-purple sheen, exactly like square-cut pressed nori paper for sushi, smooth matte surfaces like fine handmade paper with faint darker mottling, corners softly curling up off the stack, one sheet leaning apart showing its plain even face, absolutely no ribs no veins no stalks no green color anywhere, copperplate border with watercolor tinting, no text no letters no labels",
  "Sargassum fusiforme":
    "antique seaweed plate laid on white paper: ONE small brown branching sea-plant like a tiny underwater shrub no taller than a hand, its stems studded with small spindle-shaped FLOAT BLADDERS like tiny inflated sausages or bean pods — some round and swollen, others short and stick-like — all smooth and glossy olive-brown, the base a disc-shaped holdfast pad like a small suction cup (absolutely NOT roots NOT a soil-rooted plant), a wet glossy rubbery texture, ink stippling, no text no letters no labels",
  "Macrocystis pyrifera":
    "vintage phycology plate of a pressed giant kelp specimen arranged in vertical folds on aged parchment: Macrocystis pyrifera (giant kelp 巨藻), one extremely long smooth rope-like golden-brown stipe coiled in gentle S-folds up the sheet, bearing at close regular intervals many short flat strap-shaped blades like long fronds, every single blade swollen at its base into a small pear-shaped gas bladder (pneumatocyst) clearly drawn as a little pod, blades slightly crinkled with wrinkled surface, a small branching holdfast at the very bottom, NO plant stem NO tree trunk NO flowers NO seeds NO roots, copperplate engraving with watercolor tinting, no text no letters no labels",
  // —— 真菌类:纠正香菇=毒蝇伞、牛肝菌=菌褶两类高频张冠李戴 ——
  "Lentinula edodes":
    "antique mycology plate of Lentinula edodes (shiitake 香菇), NOT the red fly agaric: a cluster of three edible mushrooms growing from a short hardwood log, each cap dome-shaped and entirely dull chestnut to dark brown, the surface covered with fine scattered white cracks and pale veil remnants, rim curled under and faintly scalloped, creamy-white crowded gills beneath, a tough fibrous pale stem with a shredding snakeskin texture, absolutely NO red cap NO white dots NO ring NO cup at stem base, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Boletus edulis":
    "antique mycology plate drawn half from below to show the cap underside: that underside is a SOFT SPONGE cushion of densely packed tiny round dimples — exactly like a slice of honeycomb or the closed pores of a pale wasp nest — absolutely NO thin blades NO radiating gill plates NO knife-edge structures of any kind, above it a fat bread-loaf chestnut-brown cap and a thick club-shaped stem wearing a fine raised net pattern like delicate netting, one cut half beside it showing pure white dense flesh, moss and pine needles below, ink stippling, no text no letters no labels",
  "Hericium erinaceus":
    "antique mycology plate of Hericium erinaceus (lion's mane fungus 猴头菌), NOT a normal capped mushroom: one large round white fruiting body like a frozen cascading fountain hanging from a cut hardwood trunk, its whole surface breaking into hundreds of long soft downward-pointing icicle spines of pure white, finer young spines near the top and longer dangling ones below, no cap no stalk no gills, pale cream shading in the crevices, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  // —— 微型模式生物:显微镜视野构图 ——
  "Trypanosoma brucei":
    "antique microscope field-of-view plate of Trypanosoma brucei (sleeping sickness trypanosome 布氏锥虫) in a blood smear: several long slender pale single-celled organisms like thin flattened serpents among round pinkish blood cells, each with a single extremely long wavy undulating membrane running the length of the body and one trailing flagellum at the front end, a compact darkly-stained dot kinetoplast near the rear end, a small pale oval nucleus in the middle of the body, Giemsa-stained slide look, vintage copperplate engraving with ink stippling, no text no letters no labels",
  "Nitrosopumilus maritimus":
    "antique electron-microscope plate: a loose scatter of very small plain smooth cells shaped like TINY BLUNT MATCHSTICKS and short pencils, all the same small size, some slightly curved like little bananas, each drawn as a simple smooth rod outline with a faint fibrous interior, a few rods lying flat on the crinkled surface of one much larger rounded particle of sea silt, deep neutral grey-brown background like old EM film, absolutely NO spheres NO spiky balls NO large egg-shaped cells — only small blunt rods, ink stippling with sepia wash, no text no letters no labels",
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
    "antique still-life: one long flat WHITE RIBBON of soft fresh pasta (like a broad lasagna noodle or a tailor's measuring tape) loosely coiled in a flat spiral on a dark slate table, at one end the ribbon widens slightly into a small round button bearing four tiny dots (a sucker button), the whole ribbon's surface divided into faint shallow rectangle segments like a strip of postage stamps or a folded paper fan, completely flat, soft, opaque ivory-white, absolutely NO eyes NO legs NO head NO mouth NO antennae — this is a flat white ribbon, nothing more, ink stippling, no text no letters no labels",
  "Ascaris lumbricoides":
    "antique laboratory still-life: three plain smooth cream-coloured RUBBER TUBES of different lengths laid straight side by side on a glass tray beside a steel ruler, each tube perfectly cylindrical like garden hose or soft candle-wax, with blunt rounded sealed ends, one tube tied in a single loose overhand knot proving it is soft and hollow, the surfaces utterly featureless and smooth, absolutely NO face NO eyes NO mouth NO segmentation NO limbs NO bristles — three plain rubber tubes as a still-life object study, ink stippling, no text no letters no labels",
  "Hirudo medicinalis":
    "antique apothecary scene: one soft coffee-black LEATHER STRAP lying in a gentle C-curve on wet gravel beside a glass jar, the strap thick as a thumb and tapering smoothly to two rounded points, its back decorated with fine lengthwise rows of thin yellow-green dashes like machine stitching, the belly a plain pale grey, NO legs NO segments NO face NO eyes NO jaw — one smooth continuous soft strap of living leather, entirely limbless like a dropped belt, ink stippling, no text no letters no labels",
  "Eisenia fetida":
    "vintage natural history plate of the compost earthworm Eisenia fetida (赤子爱胜蚓): three long soft cylindrical worms lying in loose curves on dark crumbly garden soil, each like a length of smooth dull reddish-brown rubber tube with a subtle purple-grey sheen, the segmentation visible only as very fine faint encircling lines like the grooves of a flexible hose, a thick smooth pale pink collar band (clitellum) wrapped around each body about one third from the head like a sleeve, skin glossy with a wet rain sheen, absolutely NO legs NO antennae NO eyes NO hard shell plates — this is an earthworm, a soft smooth tube, NOT an insect NOT a millipede NOT a centipede NOT a caterpillar, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Perinereis aibuhitensis":
    "antique bait-fisher's plate: one long soft IRIDESCENT SATIN RIBBON of olive-green shot with pearly pink, lying coiled in a shallow pool of seawater in a wooden bucket, the ribbon's two edges fringed with one continuous row of tiny soft fleshy petals like a skirt hem, its body a smooth chain of many pillow-like segments, a small rounded simple head with two tiny black dots, absolutely NO legs NO jointed limbs NO antennae NO pincers NO compound eyes — a swimming ribbon of silk with a petal hem, ink stippling, no text no letters no labels",
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
    "antique conchology cabinet plate: ONE squat heavy cone shell shaped like an upside-down ice-cream cone whose top has been pinched to a very LOW blunt crown only one-tenth of the shell's total height, widest across the middle shoulder, the whole surface covered with a fine NET of tiny brown tent-line marks over a pale cream ground exactly like an old treasure map, the opening a long narrow slit running the full length, a tiny skirt of spire whorls at the very top, absolutely NOT a tall tower NOT a high spire — a squat low-crowned net-patterned cone, ink stippling, no text no letters no labels",
  "Lethenteron reissneri":
    "antique fisheries specimen in strict side profile: a smooth plain eel-like animal of dull blue-grey, its mouth a round O-shaped SUCKER DISC like the rubber cup of a sink plunger, the disc lined with fine concentric rings of small blunt teeth like the grooves of a bottle cap, one small round eye, and behind the eye a neat row of SEVEN small round gill holes spaced evenly like a row of buttons, two low separate fins on the back, absolutely NO jaws NO fangs NO gill-cover flap NO paired side fins — a soft smooth cord with a plunger mouth, ink stippling, no text no letters no labels",
  // —— E22:24 条硬骨头新锚点(蠕虫×3/贝类×4/节肢×4/棘皮半索×2/鱼类×2/植物苔藓×8/微生物×1) ——
  "Cryptococcus neoformans":
    "antique microscope field-of-view plate of Cryptococcus neoformans (新型隐球酵母) as an India-ink negative stain preparation: several round translucent glassy yeast cells like tiny pale pearls scattered across a sooty black ink field, each single cell perfectly round with a narrow bud pinching off on a narrow neck, and around EVERY cell one thick brilliant clear gelatin halo ring standing out bright against the dark background like a moon with a glowing atmosphere, absolutely NO mushroom caps NO hyphae threads NO spore chains — the thick clear capsule halo around round budding cells is its single identity, ink stippling and watercolor tinting, vintage copperplate engraving on aged parchment, no text no letters no labels",
  "Polytrichum commune":
    "vintage botanical plate of the haircap moss Polytrichum commune (金发藓) drawn larger than life: a dense lawn of dozens of tiny unbranched green bottle-brush stems standing perfectly straight like a miniature forest of green stakes, each slender stem clothed in tiny narrow green lance leaves pressed close, and from the tip of several stems rises a long thin red stalk (seta) each bearing one small erect brown box capsule like a tiny four-sided pencil case with a lid, one capsule still wearing its fuzzy golden-brown hairy cap like a chef's tuque drawn slipping off, absolutely NO flowers NO petals NO seeds NO woody trunk — the upright stems with box capsules on red stalks are its identity, copperplate engraving with hand-tinted watercolor on aged parchment, no text no letters no labels",
  "Conocephalum conicum":
    "vintage botanical plate of the liverwort Conocephalum conicum (蛇苔): one broad flat ribbon of thick leathery deep-green thallus lying flat on damp streamside soil, its whole upper surface tiled with a neat honeycomb network of hexagonal scale cells exactly like the repeating pattern of snake skin or a turtle shell, the ribbon forking into two equal blunt tongues at its tip, one small downturned cone on a thin stalk rising from the surface near the middle, absolutely NO leaves NO stems NO roots NO flowers NO veins — a flat snakeskin-patterned green ribbon is its identity, copperplate engraving with hand-tinted watercolor on aged parchment, no text no letters no labels",
  "Adiantum capillus-veneris":
    "antique pot-plant plate: a fountain of delicate fronds, each frond carried on a wire-thin stalk of glossy JET-BLACK like black piano wire, at the tip a spread of small rounded leaflets, every single leaflet shaped like a half-open HAND FAN or a quarter-circle wedge that is WIDER THAN IT IS LONG — never long, never narrow, never strap-shaped — with fine radiating ribs and a lightly scalloped edge like a lace doily, many fronds arching out in a soft vase-shaped spray from a small rootstock, absolutely NO flowering NO broad flat leaves, ink stippling, no text no letters no labels",
  "Picea asperata":
    "vintage botanical illustration of the dragon spruce Picea asperata (云杉), a tall pyramidal conifer of Chinese mountains: the whole tree a dense narrow spire of dark green like a church steeple, one lower branch brought forward in detail showing short stiff sharp-pointed four-angled needles standing out ALL AROUND the twig like a bottle brush (not flat sprays), and hanging DOWNWARD from the branch on short curved stalks several pendant cylindrical seed cones like small dangling cucumbers of purple-brown, their thin papery scales with ragged fringed edges beginning to open, a few loose winged seeds drifting, absolutely NO flat wide leaves NO upright cones — sharp all-round needles and hanging cylindrical cones are its identity, copperplate engraving with hand-tinted watercolor on aged parchment, no text no letters no labels",
  "Platycladus orientalis":
    "antique temple-garden plate: a small evergreen tree whose whole greenery is made of many small FLAT SPRAYS, each spray a thin panel pressed flat in ONE plane like a piece of green lace or a paper doily, the tiny leaves flat rounded SCALE-DOTS like rows of tiny green fingernails or fish-roe beads overlapping neatly in ranks on the flat twigs, absolutely NO needles of any kind NO long thin leaves, hanging from the sprays a few small woody cones with a tiny hook on each scale like little carved rose-buds, one detached spray drawn enlarged beside the tree, ink stippling, no text no letters no labels",
  "Houttuynia cordata":
    "antique streamside plate: a patch of low herb with heart-shaped deep-green leaves like small friendly hearts on short stalks, and rising above the leaves ONE single strange bloom like a white HANDKERCHIEF spread flat beneath a standing yellow crayon — the white part four separate oval BRACTS arranged in an open cross like four white leaves, the yellow part one dense blunt standing SPIKE like a short pencil, absolutely NOT round white petals around a round yellow centre — four pointed white bracts under one yellow pencil-spike is its identity, ink stippling, no text no letters no labels",
  "Zingiber officinale":
    "vintage botanical illustration of ginger Zingiber officinale (姜) with the treasure placed centre stage: one plump hand of fresh ginger rhizome drawn large — a flat palm-like underground stem of pale warm beige with knobby rounded finger segments branching like a fat hand, its thin papery skin with fine rings and tiny scale eyes, one finger broken open showing the pale yellow fibrous flesh inside, beside it a small growing plant of long lance-shaped green leaves and one cone of yellow-green bracts with a yellow lip flower rising straight from the soil, soil brushed from the rhizome to show it all, the rhizome NOT like a carrot NOT like a potato — the knobby branching beige hand is its identity, copperplate engraving with hand-tinted watercolor on aged parchment, no text no letters no labels",
  "Coptis chinensis":
    "antique botanical plate: above ground a rosette of dark glossy leaves, each leaf divided into exactly THREE broad lobes spread like a bird's footprint or a goose foot — never five leaflets, never feather-shaped — each lobe coarsely toothed, and beside the plant its treasure laid bare on the dark soil: a cluster of long branching rhizomes of bright egg-yolk GOLD like thin golden carrots or turmeric fingers with wiry roots, a few small pale yellow-green flowers of narrow white petals, absolutely NOT a fern NOT a palm, ink stippling, no text no letters no labels",
  "Spongia officinalis":
    "antique bath-house still-life: ONE irregular rounded lump the size of a loaf of bread lying beside a bar of soap on a marble shelf, entirely SOFT and ELASTIC like a natural bath sponge — its surface woolly and velvety like thick felt, dotted with countless tiny round pores like a fine grater, a few larger crater openings on the raised lobes, one corner sliced open showing the fine fibrous HONEYCOMB interior like a natural loofah, warm dark brown, absolutely NO hard shell NO coral branches NO plant roots, ink stippling, no text no letters no labels",
  "Dugesia japonica":
    "antique magnifying-glass plate: seen through a round brass magnifier resting on a wet stream pebble, ONE single small soft flattened creature shaped like a brown pumpkin seed or a living band-aid, its head end formed into a clean triangle point carrying two tiny milky eye dots, the rest an utterly smooth featureless flat teardrop gliding on a film of water, no limbs, no segments, no stripes, its whole silhouette like a small brown guitar pick or a chocolate teardrop, absolutely NOT a trilobite NOT a beetle NOT an armoured creature of any kind, ink stippling, no text no letters no labels",
  "Trichinella spiralis":
    "antique parasitology microscope plate of Trichinella spiralis (旋毛形线虫·旋毛虫) in muscle tissue, a stained histology slide view: long parallel bands of striated muscle fibres like bundles of pink cords with fine lengthwise stripes running across the field, and inside one swollen transformed muscle cell a neat lemon-shaped cyst capsule like a small oval nut shell, within which one minute white worm is curled in a tight flat spiral like a coiled watch spring — one and a half perfect coils visible, the nurse-cell capsule sitting between the muscle bands, a magnified detail circle beside it showing the spiral worm alone enlarged, absolutely NO legs NO antennae — the spiral-coiled larva inside a lemon-shaped capsule in muscle is its identity, copperplate engraving with ink stippling and watercolor tinting on aged parchment, no text no letters no labels",
  "Hyriopsis cumingii":
    "antique freshwater-mussel plate: TWO flat matching shells hinged together like a slightly open OYSTER or two brown dinner plates joined at the back, each shell a flat rounded triangle, absolutely NO spiral NO coil NO tower NO spire of any kind, from the hinge line a tall thin SAIL-like flange rises along the back edge like a ship's fin, the outside dark brown-black with coarse growth rings, the inside glowing silver-white mother-of-pearl with a soft rainbow sheen, three small round pearls arranged beside, ink stippling, no text no letters no labels",
  "Meretrix meretrix":
    "antique conchology plate: TWO matching thick oval shells like two heavy porcelain soup-spoons laid on pale beach sand, the outer surface painted with bold brown ZIGZAG LIGHTNING stripes and flame-shaped cloud marks over a warm cream ground like Morse code or a frozen bolt of lightning on porcelain, fine concentric growth rings crossing the pattern, the hinge end bearing a small pointed beak, the inner faces a clean porcelain white with a polished satiny rim, absolutely NOT spiral NOT a snail — two matching bivalve shells with brown zigzag flames, ink stippling, no text no letters no labels",
  "Acanthochiton rubrolineatus":
    "antique shore plate: one small oval SHIELD like a miniature armadillo shell seen from directly above on a wet beach pebble, made of EIGHT separate fingernail-like plates overlapping in one neat single row down the middle like eight curved roof tiles, each plate arched, slate-olive and etched with bold red-brown lengthwise stripes, the plates ringed by a narrow fleshy leather belt studded with tiny bristles, the whole animal flat like a pressed flower specimen, absolutely NO legs NO antennae NO face NO tail of any kind, ink stippling, no text no letters no labels",
  "Anopheles sinensis":
    "antique entomology plate: ONE slim grey-brown mosquito resting on a mud wall in its diagnostic stance — the body resting TAIL-HIGH at a steep angle like the raised prow of a boat, supported by long thin hind legs, a very long straight slender proboscis projecting forward like a thin needle, long palps beside it nearly as long as the proboscis, one pair of narrow transparent wings lying flat over the back with an alternating pattern of dark and pale spots along the veins like a speckled veil, spindly legs banded with pale rings, absolutely NO fat body NO house-fly shape, ink stippling, no text no letters no labels",
  "Tetranychus cinnabarinus":
    "antique microscope plate hugely magnified: a colony of mites each one drawn smaller than a grain of salt with a grain of salt and a single leaf-hair pictured beside them for scale, each mite a soft translucent RED JELLY DOME like a drop of red sealing wax or a tiny red jellybean, bearing exactly EIGHT long hair-thin legs like eight spider-silk threads, absolutely NO wings NO antennae NO hard shell NO separate visible head, a few silk threads strung between the leaf veins like a miniature cat's cradle, several glassy round eggs like tiny soap bubbles in a row, ink stippling, no text no letters no labels",
  "Daphnia magna":
    "antique microscope plate: ONE tiny plankton animal like a TRANSPARENT JELLY BEAN-POD, its whole body a single see-through oval pouch of clear polished jelly like a tiny water balloon, through the glassy wall one large dark round eye dot, a cluster of fine feathery leaf-legs, and a small simple oval heart show inside, two long branched FEATHERED antennae spread out like two oars or two bird feathers, one small straight tail spine extending backwards like a tiny nail, pale translucent green-grey, absolutely NO hard shell NO jointed legs NO insect wings, ink stippling, no text no letters no labels",
  "Ophiura sarsii":
    "vintage marine natural history plate of the brittle star Ophiura sarsii (萨氏真蛇尾) from directly above on grey deep-sea mud: one small round flat central disc like a gently domed coin of grey-brown finely scaled skin, and from its rim exactly FIVE very long thin snake-like arms radiating outward, each arm astonishingly slender like a strand of spaghetti and clearly separate from the disc right to the base — made of a neat chain of tiny square ossicle plates like a bamboo bead curtain, each joint bearing a pair of tiny flat arm spines like fine combs, the arms gently curving in different directions like starfish rays drawn impossibly thin, the disc upper surface with a fine radial scale pattern and small central plates, absolutely NOT a starfish whose thick arms merge into the disc — the coin disc plus five separate thread arms is its identity, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Balanoglossus misakiensis":
    "antique beachcombing plate: one soft flesh-pink BALLOON-ANIMAL TUBE laid in a gentle S-curve on wet sand, built of exactly three parts — front a plump rounded cone like a small acorn lying on its side, then a short narrow ring like a collar bead, then a very long smooth plain hose tapering to the tail, the whole surface smooth translucent and featureless with a faint row of tiny pore dots near the collar, absolutely NO legs NO eyes NO antennae NO shell NO armour of any kind — a soft pink three-part balloon animal, ink stippling, no text no letters no labels",
  "Eptatretus burgeri":
    "antique deep-sea specimen on a slate lab table: one soft plain pinkish-brown HOSE like a length of thick soft rubber tubing, NO visible eyes (only one small pale spot near the snout tip), one single nostril hole on top of the snout, the mouth a soft round opening fringed by SIX short plump tentacles arranged like a small crown of sausages, the skin completely smooth, naked and slimy with a low continuous fin rim encircling the tail like the edge of a jellyfish, absolutely NO jaws NO big eyes NO scales NO paired fins of any kind, ink stippling, no text no letters no labels",
  "Chiloscyllium plagiosum":
    "vintage natural history plate of the whitespotted bamboo shark Chiloscyllium plagiosum (条纹斑竹鲨) in side profile gliding over a shallow reef: one slender elongate shark of pale tan and brown, its body notably slim and supple like a stretched lozenge with a very LONG low tail fin whose upper lobe stretches far back like a ribbon, over the back a bold pattern of wide dark brown saddle bands spaced like the nodes of a bamboo stalk, each band edged with scattered small white spots, the head short and bluntly rounded like a rounded spoon with small eyes and tiny spiracles, two small nasal barbels like a cat's whiskers hanging beside each nostril, two similar-sized small dorsal fins far back on the body and broad paddle pectoral fins, absolutely NOT a nurse shark NOT a whale — the bamboo-node saddle bands, blunt head with whisker barbels and very long tail are its identity, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Paralithodes camtschaticus":
    "antique fisheries plate: a huge red king crab displayed on crushed ice at a fish market, drawn from directly above — a spiny triangular shield body compact like a rounded heart, EXACTLY SIX long jointed spiky walking legs (three on each side, count them: six, no more) plus one enormous right claw like a bolt cutter and one smaller left claw, the long legs like a spider's, the abdomen folded flat under the body, the legs tipped with sharp points, the whole crab a live red-orange, absolutely NOT eight walking legs — six walking legs and two claws make eight limbs in total, ink stippling, no text no letters no labels",
  "Nephila clavata":
    "vintage natural history illustration of the golden orb-weaver Nephila clavata (棒络新妇) at the centre of her web in an autumn forest clearing: one slender elongated female spider of chartreuse yellow-green, the elongated oval abdomen decorated with fine wavy dark blue-black and yellow horizontal bands like a striped candy, the small head end with silvery grey cephalothorax, legs extremely long and slender in yellow and black bands with small tufts of dark hair like tiny feather brushes near the joints, she hangs head-down at the hub of an enormous round orb web whose silk gleams warm GOLD in slanting sunlight like fine spun brass threads strung with dew, a corner of the web anchored to red maple leaves, absolutely NOT a crab spider NOT a tarantula — the slender striped legs hanging in a golden orb web is her identity, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  // —— E22 追加:3 张孤儿待审物种的备用 prompt(审计失败则按新锚点重生成) ——
  "Takifugu rubripes":
    "vintage natural history plate of the torafugu pufferfish Takifugu rubripes (红鳍东方鲀) in side profile swimming above coastal gravel: one plump stubby fish shaped like a rounded loaf with a blunt rounded snout, its back dark olive-brown covered with bold scattered round pale spots each ringed with a fine white margin like a field of small moons, the flanks pale silver, and one small anal fin near the tail coloured pure WHITE like a scrap of paper while the small paddle-shaped pectoral fins glow bright ORANGE-RED like autumn leaves, tiny prickly skin folds suggested on the belly, small beady eye high on the head, NOT a balloon NOT a globe fish floating round — a chubby spotted fish with white anal fin and orange-red pectoral fins is its identity, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Anguilla japonica":
    "antique fisheries plate: one long silver-brown EEL like a living shoe-horn or a broad satin ribbon come alive, the body perfectly smooth and naked with no scales visible, completely LIMBLESS with no legs of any kind, the long back fin, tail fin and belly fin joined into one single continuous ribbon running around the tail like the trim of a scarf, a small pointed head with a wide gaping jaw, two small pectoral fin fans behind the head, the belly bright silver-white, absolutely NOT a lizard NOT a salamander NO legs NO four limbs, ink stippling, no text no letters no labels",
  "Hippocampus japonicus":
    "vintage natural history plate of the Japanese seahorse Hippocampus japonicus (日本海马) drawn upright coiled around a strand of eelgrass: one tiny fish standing fully UPRIGHT like a chess knight piece, its body armour of hard bony ring segments like a string of small stacked beads from chest to tail, the head at a right angle to the body ending in a long thin tubular snout like a slender trumpet pipe with a small toothless mouth at its tip, a small coronet crown of tiny spines on top of the head, one gill opening like a small pore, small transparent dorsal fin fluttering on the back, the long tail curled forward in a neat spiral coil gripping the green eelgrass ribbon, overall colour warm yellowish brown with pale saddle marks, one egg-brooding male drawn beside with a visible pouch, NOT a pipefish with a straight body NOT a dragon — the upright ringed body with tubular snout and curled tail is its identity, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  // —— E22-merge: 并行会话补充的 2 条(鲢/中华大刀螳,内容过滤措辞规避版) ——
  "Hypophthalmichthys molitrix":
    "vintage fisheries plate of the silver carp Hypophthalmichthys molitrix (鲢) swimming in side profile: a large deep-bodied silvery fish like a polished chrome oval plate, its back plain steely grey and flanks bright mirror silver, the mouth a small upturned shelf with NO teeth NO barbels, the eyes set LOW on the head below the mouth line, a sharp keeled belly ridge like the seam of a boat hull, a single plain dorsal fin placed mid-back, fine silver scales even and neat, soft cloud reflections on the water surface above, NOT a carp with barbels NOT a predator with fangs — the uniform mirror-silver body with upturned toothless mouth and low-set eyes is its identity, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Tenodera sinensis":
    "vintage natural history plate of the Chinese mantis Tenodera sinensis (中华大刀螳) poised on a reed stem: a long slender green insect with a narrow elongated prothorax stretched like a graceful neck, a triangular head that turns with TWO large calm compound eyes, the forelegs FOLDED raised in a prayer pose, each armed along the inner edge with a neat row of small alternating spines like a folded jackknife, long delicate antennae like twin grass blades, two pairs of long translucent finely-veined wings folded over the abdomen like a closed paper fan, the hind legs long and thin for walking, a plain green and pale-brown palette, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels",
  "Cuora trifasciata":
    "antique museum specimen seen from directly above: an oval high-domed tortoise shell of warm chestnut brown, along the carapace exactly THREE bold BLACK LENGTHWISE STRIPES running parallel from neck to tail like three racing stripes painted along the shell's three keel lines — never four, never broken into blocks — the head olive-brown with one bold black stripe passing through the eye and one on the snout, the shell edges smooth and rounded, the limbs dark with pale scales, ink stippling, no text no letters no labels",
  "Naja atra":
    "antique zoological plate: ONE Chinese cobra with its hood spread wide like an open fan seen from above-front, on the back of the grey-brown hood a bold WHITE SPECTACLE MARK shaped like a pair of linked ovals or a wide bow-tie drawn in white outline, the body dark grey-brown marked with narrow pale yellowish CROSS-BANDS like faint rungs of a ladder, a small neat head with round pupils and pale lip scales, coiled in a calm resting pose, absolutely NOT an Indian cobra NOT a solid unpatterned hood — the white linked-oval spectacle on the hood is its identity, ink stippling, no text no letters no labels",
  "Pelodiscus sinensis":
    "antique pond-side plate: ONE soft-shelled turtle of olive-grey, its carapace NOT hard but one smooth continuous sheet of soft LEATHERY SKIN like a wet brown leather purse or a freshly steamed bun — absolutely NO scutes NO horny plates NO seam lines on the shell — the rim edged with a soft pliable skirt of loose skin, a long tube-like pig snout with round nostrils at its tip, small dark eyes set high, pale speckling on the neck, flat webbed feet with three claws, lying at the edge of a pond on wet mud, ink stippling, no text no letters no labels",
  "Gloydius brevicaudus":
    "antique herpetology plate: ONE pit-viper in a calm resting coil, the body STOCKY and thick like a fat sausage, a clear TRIANGULAR arrow-shaped head distinctly wider than its neck, a deep heat-sensing pit between the eye and nostril, vertical slit pupils, a chain of bold dark brown ZIGZAG saddle marks down the pale brown back like a row of linked chevrons, and a remarkably SHORT STUBBY TAIL like a thumb — the tail abruptly tiny compared to the body and ending bluntly, giving the whole snake a compact chunky silhouette, absolutely NOT a long slender snake NOT a tapering whip tail, ink stippling, no text no letters no labels",
  "Rhinolophus ferrumequinum":
    "antique zoological plate: ONE greater horseshoe bat hanging upside-down from a cave beam with wings folded about its body like a closed umbrella, its face dominated by the elaborate HORSESHOE NOSELEAF — a wide U-shaped fleshy flap around the nostrils like a tiny horseshoe magnet glued to the face, above it a pointed lance rising between the eyes, the ears large cupped and pointed with no tragus, fur fine and rusty-red-brown, tiny bright black eyes, the wing membranes thin and translucent with visible finger bones, absolutely NO simple flat face NO plain nose, ink stippling, no text no letters no labels",
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
