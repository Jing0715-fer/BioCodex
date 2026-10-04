/**
 * E43 证据驱动锚点迭代工具:用 VLM 分析 rejected/ 隔离图,提炼具体视觉病灶。
 *
 * 用法:
 *   bun scripts/analyze-rejected.ts hirudo-nipponia            # 分析单个 slug
 *   bun scripts/analyze-rejected.ts --recent 8                 # 分析最近 N 张拒审图
 *
 * 输出:每物种 ≤3 条按严重度排序的视觉病灶 + prompt 修改建议(中文),
 * 用于指导 generate-images.ts 锚点迭代——替代盲目 v+1 重试。
 * VLM 429 时打印提示并退出(配额恢复后续跑)。
 */
import ZAI from "z-ai-web-dev-sdk";
import { readFileSync, readdirSync, statSync, existsSync } from "fs";
import { join } from "path";
import { Database } from "bun:sqlite";

const REJECTED_DIR = "public/generated/rejected";

type Meta = { slug: string; file: string; latin: string; chinese: string; profile: string; mtime: number };

function slugToLatin(slug: string): { latin: string; chinese: string; profile: string } | null {
  const db = new Database("db/custom.db", { readonly: true });
  // slug 约定 = latinName 小写 + 空格转连字符;反查用 LIKE 双向
  const guess = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  let row: any = db
    .query("SELECT latinName, chineseName, description, morphology FROM Taxon WHERE lower(replace(latinName,' ','')) = lower(replace(?,' ','')) AND rank='species'")
    .get(guess);
  if (!row) {
    const row2 = db
      .query("SELECT latinName, chineseName, description, morphology FROM Taxon WHERE lower(latinName) = ? AND rank='species'")
      .get(slug.replace(/-/g, " ")) as any;
    if (row2) row = row2;
  }
  if (!row) return null;
  const profile = [row.description, row.morphology].filter(Boolean).join(" ").slice(0, 260);
  return { latin: row.latinName, chinese: row.chineseName, profile };
}

async function analyzeOne(zai: any, m: Meta) {
  const b64 = Buffer.from(readFileSync(m.file)).toString("base64");
  const prompt = `你是博物学审图员。这张图是为生物图鉴物种 ${m.latin}(${m.chinese}) 生成的复古博物学风格插图,但被复审否决隔离了。
该物种真实档案:${m.profile}
请仔细看图,对照档案,输出一个 JSON 对象(不要多余文字):
{
  "identity": "图中实际画的是什么(一句话)",
  "problems": ["最严重的视觉病灶(具体到部位)", "次严重病灶", "再次病灶"],
  "prompt_advice": "针对以上病灶,给生成提示词的具体修改建议(一句话,要可操作)"
}
注意:只描述看得见的问题(形态/数量/结构/颜色错位),不要泛泛而谈风格问题。`;
  const res = await zai.chat.completions.createVision({
    model: "glm-4.5v",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: prompt },
          { type: "image_url", image_url: { url: `data:image/png;base64,${b64}` } },
        ],
      },
    ],
    thinking: { type: "disabled" },
  });
  return (res.choices[0]?.message?.content || "").trim();
}

function parseJsonLoose(text: string): any {
  const m = text.match(/\{[\s\S]*\}/);
  if (!m) return null;
  try {
    return JSON.parse(m[0]);
  } catch {
    return null;
  }
}

async function main() {
  const args = process.argv.slice(2);
  if (!args.length) {
    console.log("用法: bun scripts/analyze-rejected.ts <slug> | --recent N");
    process.exit(0);
  }
  if (!existsSync(REJECTED_DIR)) {
    console.log("无 rejected 目录");
    process.exit(0);
  }
  let metas: Meta[] = [];
  if (args[0] === "--recent") {
    const n = parseInt(args[1] || "8", 10);
    const files = readdirSync(REJECTED_DIR)
      .filter((f) => f.endsWith(".png"))
      .map((f) => ({ f, mtime: statSync(join(REJECTED_DIR, f)).mtimeMs }))
      .sort((a, b) => b.mtime - a.mtime)
      .slice(0, n);
    for (const { f } of files) {
      const slug = f.replace(/\.png$/, "");
      const meta = slugToLatin(slug);
      metas.push({ slug, file: join(REJECTED_DIR, f), ...(meta ?? { latin: slug, chinese: "?", profile: "" }), mtime: 0 });
    }
  } else {
    const slug = args[0].replace(/\.png$/, "");
    const meta = slugToLatin(slug);
    const file = join(REJECTED_DIR, `${slug}.png`);
    if (!existsSync(file)) {
      console.log(`文件不存在: ${file}`);
      process.exit(0);
    }
    metas.push({ slug, file, ...(meta ?? { latin: slug, chinese: "?", profile: "" }), mtime: 0 });
  }

  console.log(`[analyze] 待分析 ${metas.length} 张拒审图`);
  const zai = await ZAI.create();
  for (const m of metas) {
    try {
      const text = await analyzeOne(zai, m);
      const j = parseJsonLoose(text);
      console.log(`\n=== ${m.latin}(${m.chinese}) [${m.slug}] ===`);
      if (j) {
        console.log(`画成了: ${j.identity}`);
        (j.problems || []).forEach((p: string, i: number) => console.log(`  病灶${i + 1}: ${p}`));
        console.log(`建议: ${j.prompt_advice}`);
      } else {
        console.log(text.slice(0, 600));
      }
    } catch (e: any) {
      const msg = String(e?.message || e);
      if (msg.includes("429") || msg.toLowerCase().includes("too many")) {
        console.log("\n[429] VLM 配额不可用,稍后重跑本脚本即可(无损,逐张输出)");
        process.exit(0);
      }
      console.log(`[err] ${m.slug}: ${msg.slice(0, 120)}`);
    }
  }
}

main();
