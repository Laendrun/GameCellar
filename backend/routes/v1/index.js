const express = require('express');
const { requireAuth } = require('../../middlewares/auth');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: '[GET] - /v1',
  });
});

router.get('/me', requireAuth, (req, res) => {
  res.json({
    username: req.user.username,
    isAdmin: req.user.isAdmin,
  });
});
router.use('/games', require('./games/'));
router.use('/auth', require('./auth/'));

module.exports = router;
