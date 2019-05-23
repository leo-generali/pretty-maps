const UserProfile = require('../models/user-profile');
const Activity = require('../models/activity');
const TrainingCalendar = require('../models/training-calendar');

const getBounds = require('getboundingbox');
const strava = require('strava-v3');
const polyline = require('@mapbox/polyline');
const { errorLoadingData } = require('./redirects-controller');

exports.index = (req, res) => {
  const { id, token } = req.user;

  strava.athlete.listActivities({ access_token: token }, (err, payload) => {
    if (!err) {
      const user = new UserProfile(req.user);
      const trainingCalendar = {
        header: TrainingCalendar.header(),
        activities: TrainingCalendar.activitiesOrganizedByWeek(payload)
      };

      res.render('activity/index/index', {
        user,
        trainingCalendar
      });
    } else {
      errorLoadingData(req, res);
    }
  });
};

exports.read = (req, res) => {
  const { id, token } = req.user;
  const { activityId } = req.params;

  strava.activities.get(
    { id: activityId, access_token: token },
    (err, payload) => {
      if (!err) {
        const activity = new Activity(payload);
        const geoJSON = polyline.toGeoJSON(payload.map.polyline);
        const bounds = getBounds(geoJSON.coordinates);

        res.render('activity/read/index', {
          user: req.user,
          activity,
          coordinates: geoJSON.coordinates,
          bounds: bounds
        });
      } else {
        errorLoadingData(req, res);
      }
    }
  );
};
