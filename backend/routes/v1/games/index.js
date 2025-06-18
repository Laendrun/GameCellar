const express = require('express');
const router = express.Router();
const { upload } = require('../../../middlewares/upload');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { requireAuth } = require('../../../middlewares/auth');

router.put('/:id/translations/:lang', requireAuth, async (req, res) => {
  const { id, lang } = req.params;
  const { rules, boxContent } = req.body;

  const updated = await prisma.translation.upsert({
    where: {
      gameId_lang: {
        gameId: id,
        lang,
      },
    },
    create: {
      gameId: id,
      lang,
      rules: rules || '',
      boxContent: boxContent || '',
    },
    update: {
      rules,
      boxContent,
    },
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

router.post('/', requireAuth, upload.single('boxImage'), async (req, res) => {
  const user = req.user;
  if (!user.isAdmin) return res.status(403).json({ error: 'Forbidden' });

  const {
    title,
    company,
    minPlayers,
    maxPlayers,
    averageDuration,
    lang,
    boxContent,
  } = req.body;
  const boxImageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  if (!title || !company || !lang) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newGame = await prisma.game.create({
      data: {
        title,
        company,
        minPlayers: parseInt(minPlayers),
        maxPlayers: parseInt(maxPlayers),
        averageDuration: parseInt(averageDuration),
        boxImageUrl: boxImageUrl,
        translations: {
          create: {
            lang,
            rules: '',
            boxContent: boxContent || '',
          },
        },
      },
    });

    res.status(201).json({ id: newGame.id });
  } catch (err) {
    console.error('Error creating game:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
