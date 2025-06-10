const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const main = async () => {
  const game = await prisma.Game.create({
    data: {
      title: 'The Mind',
      company: 'NSV - Nürnbeger-Spielkarten-Verlag GmbH',
      minPlayers: 2,
      maxPlayers: 4,
      averageDuration: 20,
      boxImageUrl: '',
    },
  });

  await prisma.Translation.createMany({
    data: [
      {
        lang: 'fr',
        rules: 'Règles in French',
        gameId: game.id,
      },
      {
        lang: 'en',
        rules: 'Rules in English',
        gameId: game.id,
      },
    ],
  });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
