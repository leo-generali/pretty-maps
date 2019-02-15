require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();
const flash = require('connect-flash');

const session = require('./config/session');
const passport = require('./config/passport');
const helpers = require('./config/helpers');

const router = require('./app/routes/index');

app.use(session);
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use((req, res, next) => {
  h = helpers;
  currentPath = req.path;
  message = req.flash();
  next();
});

app.use(passport.initialize());
app.use(passport.session());
app.use('/', router);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'app', 'views'));

app.get(
  '/auth/strava',
  passport.authenticate('strava', { scope: ['activity:read'] }),
  (req, res) => {}
);

app.get(
  '/auth/strava/callback',
  passport.authenticate('strava', { failureRedirect: '/failed' }),
  (req, res) => {
    req.flash(
      'affirmative',
      'Successfully logged in <span class="flash-message__icon">👍</span>'
    );
    res.redirect('/');
  }
);

module.exports = app;
