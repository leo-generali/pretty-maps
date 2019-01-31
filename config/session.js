const session = require('express-session');

const sessionConfig = session({
  secret: 'pretty-strava-maps',
  resave: false,
  saveUninitialized: false,
  maxAge: 86400000
});

module.exports = sessionConfig;
