const strava = require('strava-v3');

class StravaInterface {
  static getActivities(token) {
    return this._activities(token);
  }

  static _activities(token) {
    return new Promise((resolve) => {
      strava.athlete.listActivities({ access_token: token }, (err, payload) => {
        resolve({ err, activities: payload });
      });
    });
  }
}

module.exports = StravaInterface;
