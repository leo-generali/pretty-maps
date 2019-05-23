const ActivityGroup = require('../models/activity-group');
const UserProfile = require('../models/user-profile');

const getBounds = require('getboundingbox');
const strava = require('strava-v3');
const polyline = require('@mapbox/polyline');
const { errorLoadingData } = require('./redirects-controller');

exports.index = (req, res) => {
  const { id, token } = req.user;

  strava.athlete.listActivities({ access_token: token }, (err, payload) => {
    if (!err) {
      const activityGroup = new ActivityGroup(payload);
      const activitiesByWeek = activityGroup.activitiesByWeek();
      const user = new UserProfile(req.user)

      res.render('activity/index/index', {
        activitiesByWeek,
        activities: payload,
        user: user
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
        const geoJSON = polyline.toGeoJSON(payload.map.polyline);
        const bounds = getBounds(geoJSON.coordinates);

        res.render('activity/read/index', {
          user: req.user,
          activity: payload,
          coordinates: geoJSON.coordinates,
          bounds: bounds
        });
      } else {
        errorLoadingData(req, res);
      }
    }
  );
};
