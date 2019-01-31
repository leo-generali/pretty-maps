require('dotenv').config();

const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const strava = require('strava-v3');
const polyline = require('@mapbox/polyline');
const passport = require('./config/passport');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(
  session({
    secret: 'pretty-strava-maps',
    resave: false,
    saveUninitialized: false,
    maxAge: 86400000
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

app.get('/activity/:activityId', ensureAuthenticated, (req, res) => {
  const { id, token } = req.user;
  const { activityId } = req.params;
  strava.activities.get({ id: activityId, access_token: token }, function(
    err,
    payload,
    limits
  ) {
    if (!err) {
      console.log(polyline.decode(payload.map.polyline));
      res.render('activity', {
        user: req.user,
        activity: payload
      });
    } else {
      res.render('activity', {
        user: req.user,
        activity: null
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
