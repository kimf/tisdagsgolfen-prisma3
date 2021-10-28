import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const playerData = [
  {
    firstName: 'Kim',
    lastName: 'Fransman',
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const p of playerData) {
    const player = await prisma.player.create({
      data: p,
    });
    console.log(`Created player with id: ${player.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
