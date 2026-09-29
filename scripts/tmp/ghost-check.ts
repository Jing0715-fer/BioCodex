import { PrismaClient } from '@prisma/client'
import { existsSync } from 'fs'

async function main() {
  const p = new PrismaClient({ datasources: { db: { url: 'file:/home/z/my-project/db/custom.db' } } })
  const imgs = await p.taxon.findMany({ where: { image: { not: null } }, select: { latinName: true, image: true } })
  const ghosts = imgs.filter(s => !existsSync('/home/z/my-project/public' + s.image))
  console.log(`checked ${imgs.length} image refs, ghosts: ${ghosts.length}`)
  if (ghosts.length) console.log(ghosts.map(g => `${g.latinName} -> ${g.image}`).join('\n'))
  await p.$disconnect()
}
main()
