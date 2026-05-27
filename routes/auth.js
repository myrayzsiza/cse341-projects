const router = require('express').Router();
const passport = require('passport');

router.get('/github', (req, res, next) => {
  console.log('Auth request start:');
  console.log(' - GitHub client ID set:', Boolean(process.env.GITHUB_CLIENT_ID));
  console.log(' - GitHub callback URL:', process.env.GITHUB_CALLBACK_URL);
  next();
}, passport.authenticate('github', { scope: ['user:email'] }));

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth/failed' }),
  (req, res) => {
    res.redirect('/auth/success');
  }
);

router.get('/success', (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).send({ authenticated: false });
  }
  res.send({ authenticated: true, user: req.user });
});

router.get('/failed', (req, res) => {
  res.status(401).send({ authenticated: false, message: 'GitHub authentication failed.' });
});

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send({ message: 'Logout failed.' });
    }
    res.send({ message: 'Logged out.' });
  });
});

router.get('/status', (req, res) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return res.send({ authenticated: true, user: req.user });
  }
  res.send({ authenticated: false });
});

module.exports = router;
