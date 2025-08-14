const cacheFor = (seconds) => (req, res, next) => {
  res.set(
    'Cache-Control',
    `public, max-age=${seconds}, stale-while-revalidate=60, stale-if-error=86400`
  );
  next();
};

module.exports = {
  cacheFor,
};
