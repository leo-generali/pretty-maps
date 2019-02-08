const session = require('express-session');
const FileStore = require('session-file-store')(session);

const sessionConfig = session({
  secret: 'pretty-strava-maps',
  resave: false,
  saveUninitialized: false
});

module.exports = sessionConfig;
