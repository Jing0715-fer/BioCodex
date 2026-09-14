#!/bin/bash
# ============================================================================
# BioCodex 补图战役守护进程(E10)
#
# 背景:z-ai 账户级限流窗口不稳定(开窗约 5 分钟,关窗可达数小时)。
# 行为:轮询 API;窗口开启时自动跑「旗舰批→全量批」;熔断后冷却再探测;
#       全部物种配图完成后自动退出。
# 用法: cd /home/z/my-project && setsid nohup bash scripts/campaign-daemon.sh \
#         > /tmp/campaign.log 2>&1 &
# 日志:/tmp/campaign.log(守护) + /tmp/gen-progress.jsonl(断点)
# ============================================================================
cd "$(dirname "$0")/.."

log() { echo "$(date '+%m-%d %H:%M:%S') $*"; }

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
  MISSING=$(count_missing)
  if [ "$MISSING" = "0" ]; then
    log "[complete] 全部物种已配图,守护进程退出"
    break
  fi

  R=$(timeout 60 bun scripts/probe-api.ts 2>/dev/null | tail -1)
  if [ "$R" = "OPEN" ]; then
    log "[window] API 开启(缺图 $MISSING)→ 旗舰批"
    BATCH=15 SCOPE=flagship CONCURRENCY=2 RETRY=2 timeout 420 bun scripts/generate-images.ts 2>&1 \
      | grep -E "^\[start|^\[入库|^\[放弃|^\[done" | while read -r l; do log "$l"; done
    sleep 100
    log "[window] 全量批"
    BATCH=30 SCOPE=all CONCURRENCY=2 RETRY=2 timeout 420 bun scripts/generate-images.ts 2>&1 \
      | grep -E "^\[start|^\[入库|^\[放弃|^\[done" | while read -r l; do log "$l"; done
    sleep 150
  else
    log "[closed] $R (缺图 $MISSING),90s 后再探测"
    sleep 90
  fi
done
