const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.sendStatus(403);
  }
};

const requireAdmin = (req, res, next) => {
  if (!req.user?.isAdmin) return res.sendStatus(403);
  next();
};

module.exports = {
  requireAdmin,
  requireAuth,
};
