/**
 * E33 文字打磨战役:全站文字内容科学性扩写
 * - Phase species: 861 物种 × 9 档案字段
 * - Phase higher: 高阶元(非 species)× description
 *
 * 防幻觉三重防线:
 * 1. 系统提示铁律:基线事实保留;精确计数仅限教科书级;染色体/基因数/基因组大小禁新增数字;内部一致性自查
 * 2. 正则硬闸:genomeInfo 新数字直接拒收;须/触手/腕等附器计数(基线未载)拒收——拒收项进入定向重试反馈
 * 3. 字段级验收:长度区间+内容检查,不合格保留原文
 *
 * 断点续跑:description>=200(species)/>=150(higher)视为已打磨;429 连续6次自动中止保护图像配额
 * 用法: bun run scripts/polish-text.ts [species|higher] [--limit=N --offset=N --workers=N --dry]
 */
import { PrismaClient } from '@prisma/client';
import { appendFileSync } from 'fs';
import ZAI from 'z-ai-web-dev-sdk';

const db = new PrismaClient();
const PROGRESS = '/tmp/text-progress.jsonl';

const SPECIES_RULES: Record<string, [number, number, string]> = {
  description:  [220, 340, '物种综合介绍:分类地位、总体形态、体型量级、最标志性特征、生活型'],
  morphology:   [160, 280, '形态解剖细节:体段划分、对称性、附肢/鳍/翅结构、体色与花纹、雌雄差异(如有)'],
  habitat:      [120, 220, '生境:类型、水深/海拔/基质、温湿度偏好、微生境'],
  distribution: [120, 220, '地理分布:大区、国家、海域、特有性、国内分布范围'],
  etymology:    [130, 240, '学名词源:属名词根+种加词词根的拉丁/希腊语原义、直译、命名含义;中文正名由来(若可靠)'],
  discovery:    [150, 280, '发现与定名史:仅基于基线已有记载或公认史实;可写研究脉络、分类变动;不确定的人名年代绝不编造'],
  genomeInfo:   [120, 220, '基因组与染色体概况:定性优先;不得出现基线中没有的数字;无公开组装则写类群层面情况并如实说明'],
  ecologyRole:  [150, 280, '生态位:营养级/食性、繁殖策略、关键种间互作(传粉/捕食/共生/寄生)、生态功能'],
  researchValue:[150, 280, '科研与经济价值:模式生物/教学地位、食用药用工业价值、养殖现状、保护与文化意义'],
};
const HIGHER_RULES: Record<string, [number, number, string]> = {
  description:  [160, 280, '该类群综合介绍:主要共衍征(共同衍生特征)、体型幅度、多样性规模(已知物种数量级)、代表性成员、生态角色概述'],
};
const RULES_LABELS = Object.keys(SPECIES_RULES);

const SYSTEM_PROMPT = `你是一位严谨的生物分类学百科编辑,精通拉丁学名词源、比较形态学、生物地理学与生态学。你的任务是把生物档案的中文内容打磨得更丰富、准确、有信息量,面向有一定基础的读者。

【科学性铁律——最高优先级,逐条自查】
1. 现有内容是已核实的事实基线:其中全部具体事实(词根含义、命名者、年代、数字、地名)必须完整保留,不得篡改。
2. 若基线某表述与教科书级公认事实明显冲突,按公认事实修正;但绝不能无中生有。
3. 【精确计数禁令】新增的精确计数(须/触角/腕/刺/体节/鳍条的条数、眼数)仅当属于教科书级常识(如昆虫六足四翅、蜘蛛八足八眼、甲壳类两对触角)时才可写;否则一律定性描述("口须发达""触手细长众多")。禁止给出内部不一致的数字。
4. 【基因组数字禁令】染色体数目(2n=…)、基因数量、精确基因组大小(Mb/Gb/bp):除非基线已记载,否则一律不得出现数字,用定性表述("基因组属中等大小""染色体基数尚待澄清""已完成参考基因组组装"仅在确有把握时写)。
5. 严禁编造:具体文献引用、精确采集人/采集日期、模式产地精确坐标。体型量级与翅展/体长范围可用"约"表述。
6. 数字量级不确定时用"约、一般、大体、据报道";没有把握的内容宁可略去。
7. 不得使用第一/二人称;不得出现"我们""您""小编";不得广告化;客观陈述的百科文体,信息密度高。

【输出格式】只输出一个纯 JSON 对象,键为要求的字段名,值为扩写后的中文文本。不要代码块围栏,不要解释,不要多余文字。`;

function fieldPrompts(rules: Record<string, [number, number, string]>) {
  return Object.entries(rules).map(([k, [lo, hi, guide]]) => `- ${k}(${lo}-${hi}字): ${guide}`).join('\n');
}

function clean(s: string): string {
  return (s || '').replace(/```json|```/g, '').replace(/^[\s"']+|[\s"']+$/g, '').replace(/\s*\n\s*/g, '').trim();
}

// ===== 防幻觉正则闸 =====
const KARYO = /\d+\s*n\s*=/i;                                    // 2n=30
const GENE_COUNT = /\d[\d,]*\s*(个|条)/.source;                  // 20000个
const NUM_IN_GENOME = /[0-9]/;                                   // genomeInfo 内任何数字
const APPENDAGE = /[0-9一二两三四五六七八九十]+\s*(条|根|对|只|个)\s*(须|触手|触角|腕|眼|鳍条)/; // 八条须/1对触角

function guardIssues(field: string, nv: string, baseline: string): string[] {
  const issues: string[] = [];
  if (field === 'genomeInfo') {
    if (NUM_IN_GENOME.test(nv) && !NUM_IN_GENOME.test(baseline)) issues.push('含基线没有的数字(基因组数字禁令),须全部改为定性表述');
  } else {
    const m = nv.match(APPENDAGE);
    if (m && !APPENDAGE.test(baseline)) issues.push(`新增附器计数"${m[0]}"未经基线核实(精确计数禁令),改为定性描述或教科书级常识`);
    if (KARYO.test(nv) && !KARYO.test(baseline)) issues.push('含基线没有的染色体记法(2n=),删除');
  }
  return issues;
}

function validate(field: string, v: any, lo: number, hi: number, baseline: string): { ok: boolean; issues: string[] } {
  const issues: string[] = [];
  if (typeof v !== 'string' || v.length === 0) return { ok: false, issues: ['缺失'] };
  const nv = v.replace(/\s*\n\s*/g, '');
  if (nv.length < lo) issues.push(`字数${nv.length}不足${lo}`);
  if (nv.length > hi) issues.push(`字数${nv.length}超过${hi}`);
  if (/我们|您|小编|JSON/.test(nv)) issues.push('含禁用人称或"JSON"字样');
  issues.push(...guardIssues(field, nv, baseline));
  return { ok: issues.length === 0, issues };
}

class RateLimitError extends Error {}

async function llmCall(zai: any, user: string, rules: Record<string, [number, number, string]>, feedback = ''): Promise<Record<string, string> | null> {
  const userMsg = user + '\n\n【字段与字数要求】\n' + fieldPrompts(rules) +
    (feedback ? `\n\n【上次输出的问题,这次必须全部修正】\n${feedback}` : '') +
    '\n\n现在输出 JSON(键: ' + Object.keys(rules).join(', ') + '):';
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const c = await zai.chat.completions.create({
        messages: [
          { role: 'assistant', content: SYSTEM_PROMPT },
          { role: 'user', content: userMsg },
        ],
        thinking: { type: 'disabled' },
      });
      let raw = c.choices[0]?.message?.content || '';
      const m = raw.match(/\{[\s\S]*\}/);
      if (m) raw = m[0];
      return JSON.parse(clean(raw));
    } catch (e: any) {
      const msg = String(e?.message || e);
      if (msg.includes('429') || msg.includes('Too many') || msg.includes('too many')) throw new RateLimitError(msg.slice(0, 60));
      if (attempt < 2) { await new Promise(r => setTimeout(r, 5000)); continue; } // 网络/瞬时错误重试
      return null;
    }
  }
  return null;
}

async function dbUpdate(fn: () => Promise<any>): Promise<boolean> {
  for (let i = 0; i < 3; i++) {
    try { await fn(); return true; }
    catch (e: any) { if (String(e?.message).includes('RATE_LIMIT')) throw e; await new Promise(r => setTimeout(r, 600 * (i + 1))); }
  }
  return false;
}

function log(line: string) {
  console.log(line);
  try { appendFileSync(PROGRESS, line + '\n'); } catch {}
}

type T = { id: string; rank: string; latinName: string; chineseName: string; parentId: string | null };
let taxaMap: Map<string, T> | null = null;
async function getTaxaMap() {
  if (taxaMap) return taxaMap;
  const all = await db.taxon.findMany({ select: { id: true, rank: true, latinName: true, chineseName: true, parentId: true } });
  taxaMap = new Map(all.map(t => [t.id, t]));
  return taxaMap;
}
function lineage(id: string, map: Map<string, T>): string {
  const chain: string[] = [];
  let cur = map.get(id);
  while (cur) {
    if (['phylum', 'class', 'order', 'family', 'genus'].includes(cur.rank)) chain.unshift(`${cur.chineseName}(${cur.latinName})`);
    cur = cur.parentId ? map.get(cur.parentId) : undefined;
  }
  return chain.join(' → ');
}

async function main() {
  const args = process.argv.slice(2);
  const phase = args[0] || 'species';
  const getOpt = (name: string, def: number) => { const m = args.find(a => a.startsWith(`--${name}=`)); return m ? parseInt(m.split('=')[1]) : def; };
  const limit = getOpt('limit', 100000), offset = getOpt('offset', 0), workers = getOpt('workers', 2);
  const dry = args.includes('--dry');
  const isSpecies = phase !== 'higher';
  const rules = isSpecies ? SPECIES_RULES : HIGHER_RULES;

  const zai = await ZAI.create();
  const map = await getTaxaMap();

  const rows = await db.taxon.findMany({
    where: isSpecies ? { rank: 'species' as const } : { rank: { not: 'species' as const } },
    select: {
      id: true, rank: true, latinName: true, chineseName: true, authority: true, conservation: true,
      ncbiTaxId: true, parentId: true,
      description: true, morphology: true, habitat: true, distribution: true,
      etymology: true, discovery: true, genomeInfo: true, ecologyRole: true, researchValue: true,
    },
    orderBy: { latinName: 'asc' },
  });
  const doneMark = (r: any) => {
    const rules = isSpecies ? SPECIES_RULES : HIGHER_RULES;
    return Object.entries(rules).every(([f, [lo]]) => ((r[f] as string) || '').length >= lo);
  };
  // 逐物种只重生成未达标字段(避免已达标字段被重新轮换降质)
  const weakFields = (r: any) => {
    const all = isSpecies ? SPECIES_RULES : HIGHER_RULES;
    const weak: Record<string, [number, number, string]> = {};
    for (const [f, rule] of Object.entries(all)) if (((r[f] as string) || '').length < rule[0]) weak[f] = rule;
    return weak;
  };
  const pending = rows.filter(r => !doneMark(r));
  const pool = pending.slice(offset, offset + limit);
  console.log(`[polish] phase=${phase} 总${rows.length} 待打磨${pending.length} 本轮${pool.length} workers=${workers}${dry ? ' (dry)' : ''}`);
  const t0 = Date.now();
  let ok = 0, partial = 0, fail = 0, consecutive429 = 0, consecutiveFail = 0;
  const queue: any[] = [...pool]; // 真队列:shift 取任务,429 归还队首,杜绝同物种并发重复

  async function worker() {
    while (queue.length > 0) {
      if (consecutiveFail >= 30) { log('[abort] 连续异常失败×30,中止'); return; }
      const r = queue.shift();
      const rules = weakFields(r); // 该物种待打磨的弱字段子集
      if (Object.keys(rules).length === 0) { ok++; continue; }
      const base: Record<string, string> = {};
      for (const f of RULES_LABELS) base[f] = (r[f] as string) || '';
      if (!isSpecies) base.description = r.description || '';
      const ctx = `【分类上下文】\n${isSpecies ? '物种' : '类群'}: ${r.chineseName}(${r.latinName})${r.authority ? ' ' + r.authority : ''}\n分类谱系: ${lineage(r.id, map)}${r.conservation ? `\nIUCN: ${r.conservation}` : ''}${r.ncbiTaxId ? `\nNCBI TaxID: ${r.ncbiTaxId}` : ''}\n\n【现有内容(已核实事实基线,保留其中全部具体事实;仅需重写要求中列出的字段)】\n${JSON.stringify(base)}`;
      const t1 = Date.now();
      try {
        let obj = await llmCall(zai, ctx, rules);
        // 第一轮收集全部问题(长度+闸门),一次定向重试
        if (obj) {
          const allIssues: string[] = [];
          for (const [f, [lo, hi]] of Object.entries(rules)) {
            const v = (obj[f] || '').replace(/\s*\n\s*/g, '');
            const { issues } = validate(f, v, lo, hi, base[f] || '');
            if (issues.length) allIssues.push(`${f}: ${issues.join(',')}`);
          }
          if (allIssues.length) {
            const obj2 = await llmCall(zai, ctx, rules, allIssues.join('; '));
            if (obj2) obj = obj2;
          }
        }
        if (!obj) { fail++; consecutiveFail++; log(`[fail] ${r.latinName} 解析失败(${consecutiveFail}连)`); continue; }
        const update: Record<string, string> = {};
        const adopted: string[] = [], kept: string[] = [];
        for (const [f, [lo, hi]] of Object.entries(rules)) {
          const nv = clean(obj[f]);
          const { ok: pass } = validate(f, nv, lo, hi, base[f] || '');
          if (pass) { update[f] = nv; adopted.push(f); } else kept.push(f);
        }
        if (Object.keys(update).length === 0) { fail++; log(`[fail] ${r.latinName} 全字段不合格`); continue; }
        if (!dry) {
          const w = await dbUpdate(() => db.taxon.update({ where: { id: r.id }, data: update }));
          if (!w) { fail++; log(`[fail] ${r.latinName} DB写入失败`); continue; }
        }
        if (kept.length === 0) ok++; else partial++;
        consecutive429 = 0; consecutiveFail = 0;
        log(`[${kept.length === 0 ? 'ok' : 'partial'}] ${r.latinName} 采纳${adopted.length}/${Object.keys(rules).length}字段 保留${kept.join(',') || '无'} ${Date.now() - t1}ms`);
      } catch (e: any) {
        if (e instanceof RateLimitError) {
          consecutive429++;
          queue.unshift(r);
          // 夜间守望模式:不自杀,退避封顶 90s+抖动,持续捕捉配额间隙
          await new Promise(s => setTimeout(s, Math.min(15000 * consecutive429, 90000) + Math.random() * 15000));
          if (consecutive429 % 5 === 1) log(`[429] 退避 #${consecutive429} 剩${queue.length} @ ${r.latinName}`);
          continue;
        }
        fail++; log(`[err] ${r.latinName} ${String(e?.message).slice(0, 80)}`);
      }
      await new Promise(r => setTimeout(r, 3000)); // 呼吸节流,与图像窗口共存
    }
  }
  await Promise.all(Array.from({ length: workers }, () => worker()));
  console.log(`[polish] phase=${phase} 完成: ok=${ok} partial=${partial} fail=${fail} / 本轮${pool.length} 用时${Math.round((Date.now() - t0) / 1000)}s`);
  await db.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
