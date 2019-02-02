const session = require('express-session');
const FileStore = require('session-file-store')(session);

const sessionConfig = session({
  genid: (req) => req.sessionID,
  store: new FileStore(),
  secret: 'pretty-strava-maps',
  resave: false,
  saveUninitialized: false,
  maxAge: 86400000
});

module.exports = sessionConfig;
