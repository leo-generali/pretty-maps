require('dotenv').config();

const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const passport = require('passport');
const StravaStrategy = require('passport-strava-oauth2').Strategy;
const strava = require('strava-v3');
const axios = require('axios');

const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;
const STRAVA_CLIENT_TOKEN = process.env.STRAVA_ACCESS_TOKEN;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new StravaStrategy(
    {
      clientID: STRAVA_CLIENT_ID,
      clientSecret: STRAVA_CLIENT_SECRET,
      callbackURL: 'http://127.0.0.1:3000/auth/strava/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      process.nextTick(() => done(null, profile));
    }
  )
);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(
  session({
    secret: 'pretty-strava-maps',
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

app.get('/account', ensureAuthenticated, (req, res) => {
  const { id, token } = req.user;

  strava.athlete.listActivities({ access_token: token }, function(
    err,
    payload,
    limits
  ) {
    if (!err) {
      res.render('account', {
        activities: payload,
        user: req.user
      });
    } else {
      console.log(err);
      res.render('account', {
        activities: [],
        user: req.user
      });
    }
  });
});

app.get('/login', (req, res) => {
  res.render('login', { user: req.user });
});

app.get(
  '/auth/strava',
  passport.authenticate('strava', { scope: ['activity:read'] }),
  (req, res) => {}
);

app.get(
  '/auth/strava/callback',
  passport.authenticate('strava', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.listen(3000);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}
