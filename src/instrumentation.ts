/**
 * BioCodex 服务端 instrumentation 入口(E10)
 *
 * Next.js 会在 nodejs 与 edge 两种运行时都加载本文件,故本文件必须保持
 * 零 Node 依赖(无 node:* 导入、无 process.cwd()——Edge 编译器会拒绝);
 * 全部 Node 逻辑拆至 ./instrumentation-campaign 并仅在 nodejs 运行时加载。
 *
 * 作用:dev server 启动时拉起「补图战役守护进程」——dev server 由基础设施
 * 管理、跨会话存活;守护进程作为其子进程轮询 z-ai 配额窗口,窗口开启时
 * 自动跑「生成→VLM 审计→入库」批次;心跳单例锁防 HMR 重启后重复实例。
 *
 * 安全阀:BIOCODEX_CAMPAIGN=off 环境变量可禁用(默认 on)。
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs" && process.env.BIOCODEX_CAMPAIGN !== "off") {
    const { startCampaignDaemon } = await import("./instrumentation-campaign");
    await startCampaignDaemon();
  }
}
