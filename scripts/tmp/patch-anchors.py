import re, io

path = 'scripts/generate-images.ts'
with io.open(path, encoding='utf-8') as f:
    lines = f.readlines()

def find_block(key):
    for i, l in enumerate(lines):
        if l.strip() == f'"{key}":':
            j = i + 1
            while j < len(lines) and (lines[j].strip().startswith('//') or lines[j].strip() == ''):
                j += 1
            # j = prompt line
            k = j + 1
            while k < len(lines) and not lines[k].strip().startswith('"') and lines[k].strip() != '':
                k += 1
            return i, j, k  # key line, prompt line, next entry line
    raise SystemExit(f'NOT FOUND: {key}')

new_prompts = {
'Cetorhinus maximus': ('// v3(E45):v2「口WIDE OPEN」触发牙齿先验(同座头鲸病灶)——平静闭合口+鲸形潜艇隐喻+全删鲨/齿/大白鲨词(含否定式提及,v10去触发词方法论)+NO_HINTS隔离「口巨大」档案毒源',
'vintage natural history plate: ONE immense gentle grey fish gliding slow and calm in full side profile at the sea surface — a whale-shaped submarine of soft slate-grey ten metres long with a smoothly rounded back, FIVE extraordinarily LONG dark gill slits carved down each side of the throat like five tall narrow doorways reaching nearly round under the belly, the blunt rounded snout like the bow of an old freighter, a tiny eye set far forward, the mouth a closed soft shallow gentle curve with no prominent jaw of any kind, a small upright first dorsal fin far back near a long crescent tail, the whole animal quiet and harmless like a slow grey whale, soft grey-green sea with a calm horizon, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels'),
'Pelochelys cantorii': ('// v3(E45):v2仍被龟/鳖先验拉回硬壳盾片——纯物体化(软革坐垫)零龟词汇+NO_HINTS隔离「背甲/鳖科」档案毒源',
'antique still-life on a wet sandy riverbank tray: ONE huge soft dark-olive LEATHER CUSHION shaped like a broad flat oval pillow only two-thirds filled, its whole top one continuous sheet of smooth soft wrinkled old leather with a low gentle dome and not one single plate seam or hard shell edge anywhere, a thick fleshy soft skirt flaring around the entire rim like rolled pie crust, from the front edge of the pillow rises a thick wrinkled leather neck carrying a smooth flat frog-like head with an extremely short broad blunt nose and small close-set eyes, four flat soft leather paddles spread at the corners, each one broad and webbed like a mitten with no long claws, the soft skin uniformly grey-brown and slightly wet, absolutely no hard shell no horny plates no scutes no knobbly warty skin, a few river pebbles and wet sand, ink stippling, no text no letters no labels'),
'Ceratotherium simum': ('// v3(E45):v2侧视头部低垂仍被画成黑犀尖唇——改正面肖像:宽方唇直接面对观者,宽度无从误读',
'vintage natural history illustration: ONE immense grey rhinoceros standing squarely FACING the viewer on open grassland, its huge head carried low in front so the wide flat muzzle points straight toward the viewer, showing its great squared-off mouth as one broad straight horizontal edge as wide as a barn gate — the wide grazing lip clearly broader than it is tall, like the straight edge of a shovel pressed flat to the ground, the smooth grey hide entirely unbroken like poured concrete without a single fold or wrinkle anywhere, TWO smooth tapered horns standing one behind the other along the long nose with the front horn longer and gently curved back, two small tubular stick-ears pointing sideways like two open pipe ends, short pillar-like legs with three toes each touching the short grass, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels'),
'Crocuta crocuta': ('// v3(E45):v2拒审「背线过于平直+鬃毛过长」——坡道/跳台几何隐喻字面化+短鬃明确化+落差量化(髋低肩一头)',
'vintage natural history illustration: ONE spotted hyena standing in exact side profile on flat savannah dust, its body built like a RAMP or ski-jump pinned high at the front — the tall powerful FOREQUARTERS AND WITHERS stand clearly as the highest point of the whole animal, then the backline falls in one long steep unbroken diagonal down to the LOW drooping HINDQUARTERS whose hips stand a full head lower than the shoulders, the front legs long and straight as posts while the hind legs are visibly shorter and more bent, the neck and head carried low between the tall shoulders, the coat short-haired tawny gold covered with SOLID round black spots like scattered coins, denser on the body and fading on the legs, tiny round ears, a very short bushy tail with a black tip, a powerful thick neck and heavy jaws, absolutely NO stripes NO rosettes NO long flowing mane NO long whiplash tail, copperplate engraving with watercolor tinting on aged parchment, no text no letters no labels'),
'Welwitschia mirabilis': ('// v15(E45):v14计数指令仍画4-5片放射丛——彻底去植物词汇(叶/植株/长出全删),纯材料隐喻:残木墩+两条皮带,对角几何定位',
'antique herbarium sheet of aged cream paper with two faded brown mounting pins: pinned absolutely flat onto the paper — one squat woody DRIFTWOOD CONE like a cracked old tree-stump the size of a fist, wider at its top and narrowing toward its base, and from its flat top rim exactly TWO long dried LEATHER STRAPS run away in opposite directions, one strap running straight toward the upper LEFT corner of the sheet and the other strap running straight toward the lower RIGHT corner of the sheet, each strap as long as a forearm, leathery olive-green where it leaves the stump and fading to dry straw-brown at the far end where the tip is frayed into a few loose threads, both straps lying perfectly flat and pressed like two old leather belts on paper with fine lengthwise grain, the sheet holds nothing else — no pot no soil no roots no branches no flowers no cones, one stump and two straps and nothing more, copperplate engraving with faint watercolor tinting, no text no letters no labels'),
'Eunice aphroditois': ('// v15(E45):v14侧视仍节肢化(15连败)——病灶确诊:「五短触角如画笔尖」即昆虫触角先验触发词,全删+静物化(静卧沙面零运动态)',
'antique marine plate on aged parchment: ONE long soft motionless ribbon of dark bronze-purple IRIDESCENT SILK lying on pale sea-floor sand beside its round burrow mouth — the ribbon broad, flat and completely smooth with a soft sheen like a strip of wet oil-slick silk, one end resting just at the rim of the dark round hole ready to slip inside, the rest of the ribbon lying in two gentle loose curves on the sand, its head end blunt and plain with nothing sticking out, no eyes no feelers no antennae visible anywhere, the body utterly soft and boneless like a strip of wet cloth, soft blue-green water wash with a few drifting motes, absolutely NO legs NO jointed limbs NO bristles NO shell NO armor plating NO insect of any kind, ink stippling with watercolor tinting, no text no letters no labels'),
}

# Process from bottom to top so line numbers stay valid
targets = ['Cetorhinus maximus','Pelochelys cantorii','Ceratotherium simum','Crocuta crocuta','Welwitschia mirabilis','Eunice aphroditois']
blocks = {}
for key in targets:
    blocks[key] = find_block(key)

for key in sorted(targets, key=lambda k: -blocks[k][0]):
    i, j, k = blocks[key]
    comment, prompt = new_prompts[key]
    lines[i+1:k] = ['    ' + comment + '\n', '    "' + prompt + '",\n']

with io.open(path, 'w', encoding='utf-8') as f:
    f.writelines(lines)
print('6 anchors patched')

# NO_HINTS: append Cetorhinus + Pelochelys
src = ''.join(lines)
old_nh = 'Lactobacillus acidophilus,Tetrahymena pyriformis",'
new_nh = 'Lactobacillus acidophilus,Tetrahymena pyriformis,Cetorhinus maximus,Pelochelys cantorii",'
if old_nh in src:
    src = src.replace(old_nh, new_nh)
    with io.open(path, 'w', encoding='utf-8') as f:
        f.write(src)
    print('NO_HINTS: +2 species')
else:
    print('NO_HINTS marker not found!')
