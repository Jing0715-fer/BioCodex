import { db } from '../src/lib/db'
import * as fs from 'node:fs'

async function main() {
  // 图片存储方式统计
  const species = await db.taxon.findMany({ where: { rank: 'species' }, select: { image: true } })
  const local = species.filter(s => s.image?.startsWith('/generated')).length
  const remote = species.filter(s => s.image?.startsWith('http')).length
  console.log(`配图存储: 本地 ${local} / 外链 ${remote} / 无 ${species.length - local - remote}`)

  // 导出全部分类单元清单(给子代理做 parent 引用)
  const taxa = await db.taxon.findMany({
    orderBy: { sortOrder: 'asc' },
    select: { rank: true, latinName: true, chineseName: true }
  })
  const lines = taxa.map(t => `${t.rank}\t${t.latinName}\t${t.chineseName}`)
  fs.writeFileSync('/tmp/taxa-inventory.tsv', lines.join('\n'))
  console.log(`已导出 ${taxa.length} 条分类单元清单 -> /tmp/taxa-inventory.tsv`)

  // 物种按界分布统计
  const byRank = await db.taxon.groupBy({ by: ['rank'], _count: true })
  console.log('阶元:', byRank.map(r => `${r.rank}:${r._count}`).join(' '))
  process.exit(0)
}
main()
