import { db } from '../src/lib/db'

async function main() {
  const total = await db.taxon.count({ where: { rank: 'species' } })
  const withImage = await db.taxon.count({ where: { rank: 'species', NOT: { image: null } } })
  console.log(`物种总数: ${total}, 已配图: ${withImage}, 缺图: ${total - withImage}`)
  const missing = await db.taxon.findMany({
    where: { rank: 'species', image: null },
    select: { chineseName: true, tags: true }
  })
  console.log(`缺图物种数: ${missing.length}, 其中旗舰: ${missing.filter(m => m.tags?.includes('flagship')).length}`)
  process.exit(0)
}
main()
