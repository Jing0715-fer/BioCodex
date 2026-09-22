#!/bin/bash
# E33 文字打磨战役自愈链:species → higher → 循环补漏(每轮自动跳过已达标)
cd /home/z/my-project
while true; do
  echo "=== [chain] species phase $(date -u +%H:%M:%S) ===" >> /tmp/polish-species.log
  bun run scripts/polish-text.ts species --workers=3 >> /tmp/polish-species.log 2>&1
  echo "=== [chain] higher phase $(date -u +%H:%M:%S) ===" >> /tmp/polish-species.log
  bun run scripts/polish-text.ts higher --workers=3 >> /tmp/polish-species.log 2>&1
  # 两阶段都完成后:休眠 10 分钟再巡(理论无新增弱字段,保险环)
  sleep 600
done
