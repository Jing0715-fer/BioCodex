#!/bin/bash
# 图片搜索重试守护:每15分钟跑一轮 fetch-images,全部完成则退出
cd /home/z/my-project
while true; do
  REMAINING=$(bun -e "const {db}=await import('./src/lib/db.ts'); console.log(await db.taxon.count({where:{rank:'species',image:null}})); await db.\$disconnect();" 2>/dev/null | tail -1)
  echo "$(date '+%H:%M:%S') 剩余待配图: $REMAINING"
  if [ "$REMAINING" = "0" ]; then echo "全部配图完成,退出"; break; fi
  timeout 3000 bun scripts/fetch-images.ts
  sleep 900
done
