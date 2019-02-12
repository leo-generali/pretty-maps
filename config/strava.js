const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;
const STRAVA_CALLBACK = process.env.STRAVA_CALLBACK;

const stravaConfig = {
  clientID: STRAVA_CLIENT_ID,
  clientSecret: STRAVA_CLIENT_SECRET,
  callbackURL: STRAVA_CALLBACK
};

module.exports = stravaConfig;
