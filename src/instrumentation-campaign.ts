/**
 * BioCodex 补图战役托管模块(仅 nodejs 运行时加载,E10)
 *
 * 由 src/instrumentation.ts 在 Next.js dev server(nodejs 运行时)启动时调用:
 * 拉起 scripts/campaign-daemon.sh 守护进程(detached 子进程,日志至 /tmp/campaign.log)。
 * 守护进程内部有心跳单例锁,dev server 因 HMR 重启不会产生重复实例。
 */

export async function startCampaignDaemon() {
  const { spawn } = await import("node:child_process");
  const { existsSync, openSync, appendFileSync } = await import("node:fs");
  const { join } = await import("node:path");

  const dbg = (m: string) => {
    try {
      appendFileSync("/tmp/instr-debug.log", `${new Date().toISOString()} ${m}\n`);
    } catch {}
  };
  dbg(`startCampaignDaemon(): cwd=${process.cwd()}`);

  // 仅项目根存在守护脚本时启动(防止误部署环境)
  const scriptPath = join(process.cwd(), "scripts", "campaign-daemon.sh");
  if (!existsSync(scriptPath)) {
    dbg("campaign-daemon.sh not found, skip");
    return;
  }

  try {
    const logPath = "/tmp/campaign.log";
    const logFd = openSync(logPath, "a");
    const child = spawn("bash", [scriptPath], {
      cwd: process.cwd(),
      detached: true, // 独立进程组:dev server 重启(HMR)时子进程可存活
      stdio: ["ignore", logFd, logFd],
      env: { ...process.env },
    });
    child.unref();
    appendFileSync(logPath, `[instrumentation] 守护进程已拉起 pid=${child.pid} at ${new Date().toISOString()}\n`);
  } catch (e) {
    // 守护失败不影响站点服务
    console.warn("[instrumentation] campaign daemon spawn failed:", e);
  }
}
