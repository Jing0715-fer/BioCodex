#!/bin/bash
# ============================================================================
# BioCodex 补图战役守护进程(E10)
#
# 背景:z-ai 账户级限流窗口不稳定(开窗约 5 分钟,关窗可达数小时);沙箱会回收
#       工具调用结束后的后台进程,但 dev server(基础设施管理)可长期存活。
# 托管:src/instrumentation.ts 在 Next.js dev server 启动时拉起本守护进程
#       (作为 dev server 子进程存活);亦可在工具调用内前台分块运行。
# 行为:心跳单例防重复 → 轮询 API → 窗口开启时自动跑「旗舰批→全量批」→
#       熔断后冷却再探测;全部物种配图完成后自动退出。
# 日志:/tmp/campaign.log(守护) + /tmp/gen-progress.jsonl(断点)
# ============================================================================
cd "$(dirname "$0")/.."

log() { echo "$(date '+%m-%d %H:%M:%S') $*"; }

# ---- 心跳单例:3 分钟内有心跳的旧实例存活则退出 ----
HB=/tmp/campaign-heartbeat
if [ -f "$HB" ]; then
  HB_AGE=$(( $(date +%s) - $(stat -c %Y "$HB" 2>/dev/null || echo 0) ))
  if [ "$HB_AGE" -lt 180 ] && [ "$HB_AGE" -ge 0 ]; then
    log "[singleton] 已有存活实例(心跳 ${HB_AGE}s 前),本实例退出"
    exit 0
  fi
fi
echo $$ > "$HB"
touch_heartbeat() { echo $$ > "$HB"; }

count_missing() {
  bun -e '
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
const n = await db.taxon.count({ where: { rank: "species", image: null } });
console.log(n);
await db.$disconnect();
' 2>/dev/null | tail -1
}

log "[daemon] 补图守护进程启动 pid=$$"

while true; do
  touch_heartbeat
  MISSING=$(count_missing)
  if [ "$MISSING" = "0" ]; then
    log "[complete] 全部物种已配图,守护进程退出"
    break
  fi

  R=$(timeout 60 bun scripts/probe-api.ts 2>/dev/null | tail -1)
  if [ "$R" = "OPEN" ]; then
    log "[window] API 开启(缺图 $MISSING)→ 旗舰批"
    BATCH=15 SCOPE=flagship CONCURRENCY=2 RETRY=2 timeout 420 bun scripts/generate-images.ts 2>&1 \
      | grep -E "^\[start|^\[入库|^\[放弃|^\[跳过|^\[done" | while read -r l; do log "$l"; done
    sleep 100
    touch_heartbeat
    log "[window] 全量批"
    BATCH=30 SCOPE=all CONCURRENCY=2 RETRY=2 timeout 420 bun scripts/generate-images.ts 2>&1 \
      | grep -E "^\[start|^\[入库|^\[放弃|^\[跳过|^\[done" | while read -r l; do log "$l"; done
    sleep 150
  else
    log "[closed] $R (缺图 $MISSING),90s 后再探测"
    sleep 90
  fi
done
