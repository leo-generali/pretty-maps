require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();

const session = require('./config/session');
const passport = require('./config/passport');

const router = require('./routes/index');

app.use(session);
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(passport.initialize());
app.use(passport.session());
app.use('/', router);

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
