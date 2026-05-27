require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const app = express();

const githubClientID = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
const githubCallbackURL = process.env.GITHUB_CALLBACK_URL;

if (!githubClientID || !githubClientSecret || !githubCallbackURL) {
  console.error('Missing GitHub OAuth environment variables.');
  console.error('Set GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, and GITHUB_CALLBACK_URL.');
  process.exit(1);
}

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: githubClientID,
      clientSecret: githubClientSecret,
      callbackURL: githubCallbackURL,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

app
  .use(cors({ origin: true, credentials: true }))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(
    session({
      secret: process.env.SESSION_SECRET || 'temple-api-secret',
      resave: false,
      saveUninitialized: false,
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use('/auth', require('./routes/auth'))
  .use('/', require('./routes'));

const db = require('./models');

if (!db.url) {
  console.error('MONGODB_URI is not set in .env');
  process.exit(1);
}

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
