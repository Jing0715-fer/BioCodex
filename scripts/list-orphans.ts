import { db } from '@/lib/db';
import fs from 'fs';
import path from 'path';
async function main() {
  const dir = path.join(process.cwd(), 'public/generated');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));
  const taxa = await db.taxon.findMany({ where: { image: { not: null } }, select: { image: true } });
  const referenced = new Set(taxa.map(t => (t.image || '').replace('/generated/', '')));
  const orphans = files.filter(f => !referenced.has(f));
  console.log('disk files:', files.length, '| db referenced:', referenced.size, '| orphans:', orphans.length);
  orphans.forEach(f => console.log('ORPHAN:', f));
}
main().finally(() => db.$disconnect());
