import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();
async function main() {
  const rows = await db.taxon.findMany({ where: { rank: 'species', description: { not: null } }, select: { latinName: true, chineseName: true, description: true, morphology: true, etymology: true, genomeInfo: true, ecologyRole: true }, orderBy: { description: 'desc' } });
  const polished = rows.filter((r: any) => r.description.length >= 200);
  console.log(`已打磨: ${polished.length} 物种`);
  const pick = polished.slice(0, 2);
  for (const r of pick) {
    console.log(`\n===== ${r.chineseName} ${r.latinName} =====`);
    console.log(`[description ${r.description.length}字] ${r.description}`);
    console.log(`[morphology ${r.morphology.length}字] ${r.morphology}`);
    console.log(`[genomeInfo ${r.genomeInfo.length}字] ${r.genomeInfo}`);
    console.log(`[ecologyRole ${r.ecologyRole.length}字] ${r.ecologyRole}`);
  }
  await db.$disconnect();
}
main();
