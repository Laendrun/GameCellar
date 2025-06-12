const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return res.sendStatus(401);

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.sendStatus(401);

  const token = jwt.sign(
    { userId: user.id, username: user.username, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );

  // console.log('Successfully logged in');

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
    maxAge: 2 * 60 * 60 * 1000,
  });

  res.sendStatus(200);
});

router.post('/logout', async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
  });
  res.sendStatus(200);
});

module.exports = router;
