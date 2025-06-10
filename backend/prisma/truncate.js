const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const main = async () => {
  await prisma.Link.deleteMany();
  console.log('truncate Link completed');
  await prisma.Translation.deleteMany();
  console.log('truncate Translation completed');
  await prisma.Game.deleteMany();
  console.log('truncate Game completed');
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
