import dotenv from 'dotenv';
import { PrismaClient, Prisma } from '@prisma/client';
dotenv.config();
const prisma = new PrismaClient();

const playerData = [
  {
    firstName: 'Kim',
    lastName: 'Fransman',
  },
];

const coursesData = [
  { club: 'Nynäshamns GK', name: 'Sjö-Berg', par: 72 },
  { club: 'Nynäshamns GK', name: 'Berg-Dal', par: 72 },
  { club: 'Nynäshamns GK', name: 'Dal-Sjö', par: 72 },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const p of playerData) {
    const player = await prisma.player.create({
      data: p,
    });
    console.log(`Created player with id: ${player.id}`);
  }
  for (const c of coursesData) {
    const course = await prisma.course.create({
      data: c,
    });
    console.log(`Created course with id: ${course.id}`);
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
