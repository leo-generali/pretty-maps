const passport = require('passport');
const StravaStrategy = require('passport-strava-oauth2').Strategy;
const stravaConfig = require('./strava');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new StravaStrategy(
    stravaConfig,
    (accessToken, refreshToken, profile, done) => {
      process.nextTick(() => done(null, profile));
    }
  )
);

module.exports = passport;
