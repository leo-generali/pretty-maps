const strava = require('strava-v3');
const polyline = require('@mapbox/polyline');
const Region = require('../models/region');

exports.index = (req, res) => {
  const { id, token } = req.user;

  strava.athlete.listActivities({ access_token: token }, function(
    err,
    payload,
    limits
  ) {
    if (!err) {
      res.render('activity/index', {
        activities: payload,
        user: req.user
      });
    } else {
      res.render('activity/index', {
        activities: [],
        user: req.user
      });
    }
  });
};

exports.read = (req, res) => {
  const { id, token } = req.user;
  const { activityId } = req.params;
  strava.activities.get({ id: activityId, access_token: token }, function(
    err,
    payload,
    limits
  ) {
    if (!err) {
      const geoJSON = polyline.toGeoJSON(payload.map.polyline);
      const region = new Region(geoJSON.coordinates);

      res.render('activity/read', {
        user: req.user,
        activity: payload,
        coordinates: geoJSON.coordinates,
        center: region.centroid()
      });
    } else {
      res.render('activity/read', {
        user: req.user,
        activity: null
      });
    }
  });
};
