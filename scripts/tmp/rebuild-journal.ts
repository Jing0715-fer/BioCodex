import { PrismaClient } from '@prisma/client'
import { writeFileSync } from 'fs'

async function main() {
  const p = new PrismaClient({ datasources: { db: { url: 'file:/home/z/my-project/db/custom.db' } } })
  const imgs = await p.taxon.findMany({ where: { rank: 'species', image: { not: null } }, select: { id: true, latinName: true } })
  const lines = imgs.map(s => JSON.stringify({ id: s.id, latin: s.latinName, result: 'accepted', attempts: 0, reason: 'journal rebuilt at E45 sync (547-image baseline)' }))
  writeFileSync('/tmp/gen-progress.jsonl', lines.join('\n') + '\n')
  console.log('journal rebuilt with', lines.length, 'accepted entries')
  await p.$disconnect()
}
main()
