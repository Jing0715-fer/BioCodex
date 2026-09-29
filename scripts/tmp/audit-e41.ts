import { PrismaClient } from '@prisma/client'

async function main() {
  const pLocal = new PrismaClient({ datasources: { db: { url: 'file:/home/z/my-project/db/custom.db' } } })
  const pRemote = new PrismaClient({ datasources: { db: { url: 'file:/tmp/remote.db' } } })
  const [l, r] = await Promise.all([
    pLocal.taxon.findMany({ where: { rank: 'species', image: { not: null } }, select: { latinName: true, image: true } }),
    pRemote.taxon.findMany({ where: { rank: 'species', image: { not: null } }, select: { latinName: true, image: true } }),
  ])
  const lSet = new Set(l.map(s => s.latinName))
  const rSet = new Set(r.map(s => r => r).length ? r.map(s => s.latinName) : [])
  console.log('l rows:', l.length, 'r rows:', r.length)
  console.log('lSet size:', lSet.size, 'rSet size:', rSet.size)
  let inter = 0
  for (const k of lSet) if (rSet.has(k)) inter++
  console.log('intersection:', inter)
  const lOnly = [...lSet].filter(k => !rSet.has(k))
  const rOnly = [...rSet].filter(k => !lSet.has(k))
  console.log(`LOCAL-ONLY(${lOnly.length}): ${lOnly.join(',')}`)
  console.log(`REMOTE-ONLY(${rOnly.length}): ${rOnly.join(',')}`)
  const lm = new Map(l.map(s => [s.latinName, s.image]))
  const rm = new Map(r.map(s => [s.latinName, s.image]))
  const diff = [...lm.keys()].filter(k => rm.has(k) && lm.get(k) !== rm.get(k))
  console.log(`path-diff: ${diff.length}`)
  await Promise.all([pLocal.$disconnect(), pRemote.$disconnect()])
}
main()
