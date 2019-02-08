const session = require('express-session');
const FileStore = require('session-file-store')(session);

const sessionConfig = session({
  // store: new FileStore(),
  secret: 'pretty-strava-maps',
  resave: false,
  saveUninitialized: false
});

module.exports = sessionConfig;
