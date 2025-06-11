const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  let games = null;
  try {
    games = await prisma.Game.findMany({});
  } catch (e) {
    console.error(e);
    return res.status(500).send();
  }

  console.log(games);

  res.json({
    games,
  });
});

router.get('/:id', async (req, res) => {
  let filter = {};
  if (req.query.lang && req.query.lang.length == 2) {
    filter = {
      lang: req.query.lang,
    };
  }

  let game = null;
  try {
    game = await prisma.Game.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        translations: {
          where: filter,
        },
      },
    });
  } catch (e) {
    console.error(e);
    return res.status(500).send();
  }

  console.log(game);
  res.json({
    message: '[GET] - /v1/games/:id',
    game,
  });
});

module.exports = router;
