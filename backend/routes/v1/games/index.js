const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { requireAuth } = require('../../../middlewares/auth');

router.put('/:id/translations/:lang', requireAuth, async (req, res) => {
  const { id, lang } = req.params;
  const { rules } = req.body;

  const updated = await prisma.translation.updateMany({
    where: { gameId: id, lang },
    data: { rules },
  });

  if (updated.count === 0)
    return res.status(404).json({
      message: 'Translation not found',
    });
  res.sendStatus(204);
});

router.get('/', async (req, res) => {
  let games = null;
  try {
    games = await prisma.Game.findMany({});
  } catch (e) {
    console.error(e);
    return res.status(500).send();
  }

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

  res.json({
    message: '[GET] - /v1/games/:id',
    game,
  });
});

router.post('/', requireAuth, async (req, res) => {
  // console.log(req.user);
  res.json({
    message: 'Protected route',
    user: req.user,
  });
});

module.exports = router;
