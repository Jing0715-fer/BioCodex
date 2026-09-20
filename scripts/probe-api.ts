/// <reference types="bun-types" />
/**
 * BioCodex API 可用性探测脚本(E10)
 * 输出单行:OPEN / CLOSED / ERR:xxx
 * 用法:timeout 60 bun scripts/probe-api.ts
 */
import ZAI from "z-ai-web-dev-sdk";

async function main() {
  const zai = await ZAI.create();
  try {
    const r = await zai.images.generations.create({ prompt: "tiny test dot", size: "1152x864" });
    console.log(r?.data?.[0]?.base64 ? "OPEN" : "ERR:no-base64");
  } catch (e: any) {
    const msg = String(e?.message || e);
    console.log(msg.includes("429") || msg.toLowerCase().includes("too many") ? "CLOSED" : `ERR:${msg.slice(0, 60)}`);
  }
}

main();
