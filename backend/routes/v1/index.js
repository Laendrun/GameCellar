const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: '[GET] - /v1',
  });
});
router.use('/games', require('./games/'));

module.exports = router;
