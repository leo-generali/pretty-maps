// const session = require('express-session');
const cookieSession = require('cookie-session');
// const FileStore = require('session-file-store')(session);

const sessionConfig = cookieSession({
  name: 'pretty-strava-maps',
  keys: ['strava', 'is', 'pretty', 'dang', 'cool']
  // secret: 'pretty-strava-maps',
  // resave: false,
  // saveUninitialized: false
});

module.exports = sessionConfig;
