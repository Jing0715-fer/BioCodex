/// <reference types="bun-types" />
/**
 * BioCodex 物种插图科学性 VLM 审计脚本
 *
 * 对每张 AI 生成插图,把「物种文字档案(描述/形态)」与图像一并交给 VLM,判定:
 *   match   : 图中主体是否大概率是该物种(而非其他生物/物体)
 *   anatomy : 是否存在明显解剖学/形态学错误(肢体数、器官结构、比例严重失真)
 *   text    : 图中文字/字母是否为不可读乱码
 *   verdict : ok | warn | fail
 *
 * 运行模式:
 *   bun scripts/audit-images-vlm.ts             # 审计并输出报告(不动数据库)
 *   APPLY=1 bun scripts/audit-images-vlm.ts     # 审计 + fail 图自动下架
 *               (清除 DB image/imageCaption 引用,雕版占位图兜底;文件移入 rejected/)
 *   LIMIT=10                                    # 本轮最多审计 N 张(限流友好)
 *
 * 断点续跑:/tmp/vlm-audit.jsonl 逐条追加,已审计物种自动跳过。
 * 429 限流:指数退避(45s×attempt),连续 3 次 429 中止本轮(下轮续跑)。
 */
import { db } from "../src/lib/db";
import ZAI from "z-ai-web-dev-sdk";
import { existsSync, mkdirSync, renameSync, readFileSync } from "node:fs";
import { join } from "node:path";

const OUT = "/tmp/vlm-audit.jsonl";
const LIMIT = parseInt(process.env.LIMIT || "999", 10);
const APPLY = process.env.APPLY === "1";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

interface Verdict {
  match: boolean;
  anatomy: boolean; // true = 有明显错误
  text: boolean; // true = 有乱码
  verdict: "ok" | "warn" | "fail";
  reason: string;
}

function parseVerdict(raw: string): Verdict | null {
  // 容错解析:截取首个 {...} JSON 块
  const m = raw.match(/\{[\s\S]*\}/);
  if (!m) return null;
  try {
    const j = JSON.parse(m[0]);
    if (typeof j.match !== "boolean") return null;
    const anatomy = !!(j.anatomy_errors || j.anatomy);
    const garbled = !!(j.garbled_text || j.text);
    let verdict: Verdict["verdict"] = "ok";
    if (!j.match) verdict = "fail";
    else if (anatomy || garbled) verdict = "warn";
    return { match: j.match, anatomy, text: garbled, verdict, reason: String(j.reason || j.comment || "").slice(0, 200) };
  } catch {
    return null;
  }
}

async function main() {
  const taxa = await db.taxon.findMany({
    where: { image: { not: null }, rank: "species" },
    select: {
      id: true, chineseName: true, latinName: true, image: true,
      description: true, morphology: true,
    },
    orderBy: { latinName: "asc" },
  });

  const done = new Set<string>();
  if (existsSync(OUT)) {
    for (const line of readFileSync(OUT, "utf8").split("\n")) {
      if (!line.trim()) continue;
      try { done.add(JSON.parse(line).id); } catch {}
    }
  }
  const pending = taxa.filter((t) => !done.has(t.id)).slice(0, LIMIT);
  console.log(`[vlm-audit] 库内 ${taxa.length} 张,已完成 ${done.size},本轮 ${pending.length}(APPLY=${APPLY ? "on" : "off"})`);
  if (pending.length === 0) { console.log("全部已审计。"); return; }

  const zai = await ZAI.create();
  let consecutive429 = 0;
  let audited = 0, fails = 0, warns = 0;

  for (const t of pending) {
    const file = "public" + t.image!;
    if (!existsSync(file)) {
      const row = { id: t.id, latin: t.latinName, chinese: t.chineseName, verdict: "fail", reason: "本地文件缺失", ts: Date.now() };
      await Bun.write(OUT, JSON.stringify(row) + "\n");
      continue;
    }
    const b64 = Buffer.from(readFileSync(file)).toString("base64");
    const profile = [t.description, t.morphology].filter(Boolean).join(" ").slice(0, 220);
    const prompt = `你是一位严格的博物学审图员。这张图是图鉴为物种 ${t.latinName}(${t.chineseName}) 生成的复古博物学风格 AI 插图。
该物种的真实档案摘要:${profile}
请严格判定并只输出一个 JSON 对象(不要多余文字):
{
  "match": true/false,            // 图中主体是否大概率是该物种(而不是其他生物或不相干物体)
  "anatomy_errors": true/false,   // 是否存在明显解剖学/形态学错误(如肢体数量错误、器官结构荒谬、比例严重失真)
  "garbled_text": true/false,     // 图中文字/字母是否为不可读乱码
  "reason": "一句话依据(中文)"
}
判定原则:风格化演绎(铜版画风、水彩做旧)不算错误;只关注主体身份与科学性硬伤。`;

    let verdict: Verdict | null = null;
    try {
      const res = await zai.chat.completions.createVision({
        model: "glm-4.5v",
        messages: [{
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: `data:image/png;base64,${b64}` } },
          ],
        }],
        thinking: { type: "disabled" },
      });
      verdict = parseVerdict(res.choices[0]?.message?.content || "");
      consecutive429 = 0;
    } catch (e: any) {
      const msg = String(e?.message || e);
      if (msg.includes("429") || msg.toLowerCase().includes("too many")) {
        consecutive429++;
        console.log(`[429] 连续第 ${consecutive429} 次,退避 ${45 * consecutive429}s`);
        if (consecutive429 >= 3) { console.log("[stop] 限流持续,本轮中止,进度已保存,可稍后续跑"); break; }
        await sleep(45000 * consecutive429);
        continue; // 不标 done,下轮重试
      }
      console.log(`[err] ${t.latinName}: ${msg.slice(0, 120)}`);
    }

    if (!verdict) {
      // 解析失败也记录(标记 unknown,下轮不重复,避免死循环)
      await Bun.write(OUT, JSON.stringify({ id: t.id, latin: t.latinName, chinese: t.chineseName, verdict: "unknown", reason: "VLM 输出无法解析", ts: Date.now() }) + "\n");
      continue;
    }

    const row = { id: t.id, latin: t.latinName, chinese: t.chineseName, file: t.image, ...verdict, ts: Date.now() };
    await Bun.write(OUT, JSON.stringify(row) + "\n");
    audited++;
    if (verdict.verdict === "fail") fails++;
    if (verdict.verdict === "warn") warns++;
    console.log(`[${verdict.verdict}] ${t.latinName}(${t.chineseName}) ${verdict.reason}`);

    // APPLY 模式:fail 下架(回退雕版占位图),warn 仅提示
    if (APPLY && verdict.verdict === "fail") {
      const rejectedDir = "public/generated/rejected";
      mkdirSync(rejectedDir, { recursive: true });
      const dest = join(rejectedDir, t.image!.split("/").pop()!);
      try {
        await db.taxon.update({ where: { id: t.id }, data: { image: null, imageCaption: null } });
        if (existsSync(file)) renameSync(file, dest);
        console.log(`  [下架] DB 引用已清除,文件移入 rejected/`);
      } catch (e: any) {
        console.log(`  [下架失败] ${e.message?.slice(0, 80)}`);
      }
    }
    await sleep(1500 + Math.random() * 2500);
  }

  console.log(`\n[summary] 本轮审计 ${audited}(fail ${fails} / warn ${warns}),报告: ${OUT}`);
  console.log(fails > 0 && !APPLY ? "存在 fail 图:运行 APPLY=1 bun scripts/audit-images-vlm.ts 可自动下架(回退占位图)" : "");
}

main()
  .catch((e) => { console.error("FATAL", e); process.exit(1); })
  .finally(async () => { await db.$disconnect(); });
