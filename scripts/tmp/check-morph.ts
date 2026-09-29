import { PrismaClient } from '@prisma/client'
async function main() {
  const p = new PrismaClient({ datasources: { db: { url: 'file:/home/z/my-project/db/custom.db' } } })
  const targets = ['Cetorhinus maximus', 'Pelochelys cantorii', 'Ceratotherium simum', 'Crocuta crocuta', 'Welwitschia mirabilis', 'Eunice aphroditois']
  for (const latin of targets) {
    const t = await p.taxon.findFirst({ where: { latinName: latin }, select: { chineseName: true, morphology: true } })
    console.log(`\n=== ${latin} (${t?.chineseName}) ===`)
    console.log((t?.morphology || 'null').slice(0, 200))
  }
  await p.$disconnect()
}
main()
