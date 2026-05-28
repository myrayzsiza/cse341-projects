function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }

  return res.status(401).send({
    authenticated: false,
    message: 'Authentication required to access this resource.',
  });
}

module.exports = {
  ensureAuthenticated,
};
