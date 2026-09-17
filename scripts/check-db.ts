import { db } from '@/lib/db';
async function main() {
  const total = await db.taxon.count();
  const species = await db.taxon.count({ where: { rank: 'species' } });
  const withImage = await db.taxon.count({ where: { rank: 'species', image: { not: null } } });
  const flagshipNoImg = await db.taxon.count({ where: { rank: 'species', tags: { contains: '旗舰' }, image: null } });
  const ncbi = await db.taxon.count({ where: { rank: 'species', ncbiTaxId: { not: null } } });
  console.log(JSON.stringify({ total, species, withImage, missing: species - withImage, flagshipNoImg, ncbi }));
}
main().finally(() => db.$disconnect());
