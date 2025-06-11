const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const main = async () => {
  const rules_themind_fr = `
## Description

Tous les joueurs forment **une équipe**. Au premier tour (niveau 1), chacun reçoit
une carte. Au deuxième tour (niveau 2), chacun reçoit 2 cartes et ainsi de suite. À
chaque niveau, l'équipe doit déposer **toutes** les cartes que les joueurs ont entre les
mains l'une après l'autre au milieu de la table, **dans l'ordre croissant** et **face vers
le haut**. Par exemple (4 joueurs, niveau 1): 18-34-41-73. Il n'y a pas d'ordre de
joueurs. Chaque personne peut déposer sa carte dès qu'elle le souhaite.

**Attention, c'est important:** les joueurs ne peuvent rien révéler sur leurs propres
cartes, aucun échange d'information ni signe secret n'est autorisé. Alors, coment ça marche ?

## Préparation

L'équipe reçoit un nombre défini de **vies et d'étoiles**, placées les unes à côté des
autres sur la table, face vers le haut. Le reste des vies et des étoiles est mis de
côté sur le bord de la table. Ces cartes pourront peut-être servir par la suite. On
place ensuite un nombre défini de cartes "niveau" en tas **dans l'ordre croissant** et
**face vers le haut** (avec le niveau 1 tout en haut) à côté des vies et des étoiles.

- **2 joueurs**: Niveaux 1 à 12 - 2 vies - 1 étoile
- **3 joueurs**: Niveaux 1 à 10 - 3 vies - 1 étoile
- **4 joueurs**: Niveaux 1 à 8  - 4 vies - 1 étoile

Les **100 cartes "chiffre"** sont mélangées. Chaque joueur reçoit **une** carte (niveau 1)
et la tient dans la main de manière à ce qu'aucun autre joueur ne puisse la voir. Le reste
des cartes "chiffre" est placé au bord de la table, face cachée.
`;

  const themind = await prisma.Game.create({
    data: {
      title: 'The Mind',
      company: 'NSV - Nürnbeger-Spielkarten-Verlag GmbH',
      minPlayers: 2,
      maxPlayers: 4,
      averageDuration: 20,
      boxImageUrl: '/uploads/nsv-themind.jpg',
    },
  });

  const chateau = await prisma.Game.create({
    data: {
      title: 'Château Combo',
      company: 'Catch Up Games',
      minPlayers: 2,
      maxPlayers: 5,
      averageDuration: 25,
      boxImageUrl: '/uploads/chateaucombo.webp',
    },
  });

  await prisma.Translation.createMany({
    data: [
      {
        lang: 'fr',
        rules: rules_themind_fr,
        gameId: themind.id,
      },
      {
        lang: 'en',
        rules: 'Rules in English',
        gameId: themind.id,
      },
      {
        lang: 'en',
        rules: 'CastleCombo in English',
        gameId: chateau.id,
      },
      {
        lang: 'fr',
        rules: 'ChateauCombo en Français',
        gameId: chateau.id,
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
