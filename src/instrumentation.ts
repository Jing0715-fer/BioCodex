/**
 * BioCodex 服务端 instrumentation 入口(E10)
 *
 * Next.js 会在 nodejs 与 edge 两种运行时都加载本文件,node 依赖必须拆到
 * 独立模块并仅在 nodejs 运行时动态加载(官方推荐模式,避免 Edge 报错)。
 *
 * 作用:dev server 启动时拉起「补图战役守护进程」——dev server 由基础设施
 * 管理、跨会话存活;守护进程作为其子进程轮询 z-ai 配额窗口,窗口开启时
 * 自动跑「生成→VLM 审计→入库」批次;心跳单例锁防 HMR 重启后重复实例。
 *
 * 安全阀:BIOCODEX_CAMPAIGN=off 环境变量可禁用(默认 on)。
 */
export async function register() {
  const dbg = async (m: string) => {
    try {
      const { appendFileSync } = await import("node:fs");
      appendFileSync("/tmp/instr-debug.log", `${new Date().toISOString()} ${m}\n`);
    } catch {}
  };
  await dbg(`register() called: NEXT_RUNTIME=${process.env.NEXT_RUNTIME} cwd=${process.cwd()} BIOCODEX_CAMPAIGN=${process.env.BIOCODEX_CAMPAIGN}`);
  if (process.env.NEXT_RUNTIME === "nodejs" && process.env.BIOCODEX_CAMPAIGN !== "off") {
    const { startCampaignDaemon } = await import("./instrumentation-campaign");
    await startCampaignDaemon();
    await dbg("startCampaignDaemon() completed");
  }
}
