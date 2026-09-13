import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import { db } from "@/lib/db";
import { getFlatTaxa, getKingdomPaths, getTree } from "@/lib/bio-server";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

interface ChatMsg {
  role: "user" | "assistant";
  content: string;
}

// 从用户消息中提取检索词(中英混合)
function extractTerms(text: string): string[] {
  const cleaned = text.replace(/[,.?!;:、,。?!;:""''()\[\]{}]/g, " ");
  const raw = cleaned.split(/\s+/).filter(Boolean);
  const terms: string[] = [];
  for (const t of raw) {
    if (t.length >= 2) terms.push(t);
    // 长中文串切出 2-3 字子串,提高命中率
    if (/[\u4e00-\u9fa5]{4,}/.test(t)) {
      const s = t.match(/[\u4e00-\u9fa5]+/)?.[0] || "";
      for (let i = 0; i + 2 <= s.length; i++) terms.push(s.slice(i, i + 2));
    }
  }
  return [...new Set(terms)].slice(0, 12);
}

async function searchCandidates(terms: string[]) {
  if (!terms.length) return [];
  const seen = new Map<string, number>();
  for (const term of terms) {
    const rows = await db.taxon.findMany({
      where: {
        OR: [
          { latinName: { contains: term } },
          { chineseName: { contains: term } },
          { description: { contains: term } },
          { habitat: { contains: term } },
          { morphology: { contains: term } },
        ],
      },
      select: {
        id: true, latinName: true, chineseName: true, rank: true,
        description: true, image: true, conservation: true, tags: true, parentId: true,
      },
      take: 30,
    });
    for (const r of rows) {
      let w = 1;
      if (r.latinName.toLowerCase().includes(term.toLowerCase())) w += 3;
      if (r.chineseName.includes(term)) w += 3;
      if (r.rank === "species") w += 2;
      if ((r.tags || "").includes("flagship")) w += 1;
      seen.set(r.id, (seen.get(r.id) || 0) + w);
    }
  }
  const top = [...seen.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([id]) => id);
  if (!top.length) return [];
  const result = await db.taxon.findMany({
    where: { id: { in: top } },
    select: {
      id: true, latinName: true, chineseName: true, rank: true,
      description: true, image: true, conservation: true, parentId: true,
    },
  });
  const order = new Map(top.map((id, i) => [id, i]));
  return result.sort((a, b) => order.get(a.id)! - order.get(b.id)!);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages: ChatMsg[] = Array.isArray(body?.messages) ? body.messages : [];
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUser) {
      return NextResponse.json({ success: false, error: "缺少用户消息" }, { status: 400 });
    }

    // ===== 检索库内相关分类单元 =====
    const terms = extractTerms(lastUser.content);
    let candidates = await searchCandidates(terms);
    const lowerMsg = lastUser.content;

    // 保护状况关键词命中时,补充相应等级的物种
    const conservationHit: Record<string, string[]> = {
      极危: ["CR"], 濒危: ["EN", "CR"], 易危: ["VU"], 灭绝: ["EX", "EW"],
      保护: ["CR", "EN", "VU", "EW"], 红色名录: ["CR", "EN", "VU"],
    };
    const wantedCodes = new Set<string>();
    for (const [kw, codes] of Object.entries(conservationHit)) {
      if (lowerMsg.includes(kw)) codes.forEach((c) => wantedCodes.add(c));
    }
    if (wantedCodes.size) {
      const cons = await db.taxon.findMany({
        where: {
          rank: "species",
          conservation: { in: [...wantedCodes] },
          OR: [{ tags: { contains: "flagship" } }, { description: { contains: "保护" } }],
        },
        select: { id: true },
        take: 30,
      });
      const have = new Set(candidates.map((c) => c.id));
      const extraIds = cons.map((c) => c.id).filter((id) => !have.has(id)).slice(0, 6);
      if (extraIds.length) {
        const extra = await db.taxon.findMany({
          where: { id: { in: extraIds } },
          select: {
            id: true, latinName: true, chineseName: true, rank: true,
            description: true, image: true, conservation: true, parentId: true,
          },
        });
        candidates = [...candidates, ...extra];
      }
    }
    const paths = await getKingdomPaths();

    const brief = candidates.slice(0, 12).map((c) => {
      const path = (paths.get(c.id) || []).join("/");
      return `- [[${c.id}]] ${c.chineseName}(${c.latinName}),分类:${path},阶元:${c.rank}${c.conservation ? `,IUCN:${c.conservation}` : ""}。简介:${(c.description || "暂无").slice(0, 80)}…`;
    });

    // ===== 旗舰物种速查表(供推荐时引用) =====
    const flagshipRows = await db.taxon.findMany({
      where: { rank: "species", tags: { contains: "flagship" } },
      orderBy: { sortOrder: "asc" },
      select: { id: true, chineseName: true, latinName: true, conservation: true },
      take: 90,
    });
    const flagshipList = flagshipRows
      .map((f) => `- [[${f.id}]] ${f.chineseName}(${f.latinName})${f.conservation ? `[${f.conservation}]` : ""}`)
      .join("\n");

    // ===== 图鉴全局概览 =====
    const tree = await getTree();
    const speciesTotal = await db.taxon.count({ where: { rank: "species" } });
    const phylaList: string[] = [];
    const walkPhyla = (nodes: any[]) => {
      for (const n of nodes) {
        if (n.rank === "phylum") phylaList.push(`${n.cn}(${n.la},${n.sc}种)`);
        else if (n.rank !== "species" && n.rank !== "genus" && n.rank !== "family" && n.rank !== "order" && n.rank !== "class") walkPhyla(n.children);
      }
    };
    walkPhyla(tree);

    const system = `你是"BioCodex 生物图鉴"内置的 AI 博物学家助手,名叫"阿博"。你熟稔生物分类学、生态学与保护生物学,语气专业而亲切,像一位博学的自然博物馆讲解员。

《图鉴概览》本图鉴收录 ${speciesTotal} 个物种、覆盖从细菌古菌、原生生物、真菌、植物到无脊椎动物与脊椎动物的所有主要门类,分类阶元为域-界-门-纲-目-科-属-种。主要门类包括:${phylaList.slice(0, 20).join("、")} 等。

《本轮检索到的库内条目》:
${brief.length ? brief.join("\n") : "(未检索到直接匹配的条目,可依据知识回答,或建议用户换个说法)"}

《库内旗舰物种速查表》(推荐/举例时优先从这里选):
${flagshipList}

回答规范:
1. 用中文回答;物种名首次出现时给出中文+斜体拉丁学名(拉丁名用 *斜体*)。
2. [[id]] 引用标记只能使用上述两个清单中真实出现的 id,绝对不要编造、也不要写"[[需确认id]]"之类的占位符——清单里没有的物种,直接用普通文字提及并说明"图鉴暂未收录"。
3. 引用标记应紧跟物种名,如:大熊猫 [[id]] 是熊科的旗舰物种。
4. 适当使用要点列表让回答更清晰;长度控制在 300 字以内,除非用户要求详细展开。
5. 若用户想找某类生物,推荐 2-5 个库内条目并附 [[id]] 引用标记,邀请用户点击查看图鉴页面。
6. 涉及保护等级时使用 IUCN 代码并解释。诚实为本:不确定的就说不确定,不编造数据。`;

    // ===== 调用 LLM =====
    const zai = await ZAI.create();
    const completion = await zai.chat.completions.create({
      messages: [
        { role: "assistant", content: system },
        ...messages.slice(-12).map((m) => ({
          role: m.role,
          content: m.content,
        })),
      ],
      thinking: { type: "disabled" },
    });
    const content = completion.choices[0]?.message?.content || "";

    // ===== 附带可跳转的匹配条目(供前端渲染卡片) =====
    const citedIds = [...content.matchAll(/\[\[([a-zA-Z0-9]+)\]\]/g)].map((m) => m[1]);
    const allIds = [...new Set([...citedIds, ...candidates.map((c) => c.id)])].slice(0, 10);
    const matchRows = allIds.length
      ? await db.taxon.findMany({
          where: { id: { in: allIds } },
          select: {
            id: true, latinName: true, chineseName: true, rank: true,
            image: true, conservation: true, description: true, parentId: true,
          },
        })
      : [];
    const matchOrder = new Map(allIds.map((id, i) => [id, i]));
    const matches = matchRows
      .sort((a, b) => matchOrder.get(a.id)! - matchOrder.get(b.id)!)
      .map((r) => ({
        id: r.id,
        latinName: r.latinName,
        chineseName: r.chineseName,
        rank: r.rank,
        image: r.image,
        conservation: r.conservation,
        kingdom: (paths.get(r.id) || []).slice(-1)[0] || "",
      }));

    return NextResponse.json({ success: true, content, matches });
  } catch (e: any) {
    console.error("agent error", e);
    return NextResponse.json(
      { success: false, error: "助手暂时失联,请稍后再试" },
      { status: 500 }
    );
  }
}
