const EditorActivity = require('../../models/editor-activity');

const getBounds = require('getboundingbox');
const strava = require('strava-v3');
const polyline = require('@mapbox/polyline');
const { errorLoadingData } = require('../redirects-controller');

exports.read = (req, res) => {
  const { id, token } = req.user;
  const { activityId } = req.params;

  strava.activities.get(
    { id: activityId, access_token: token },
    (err, payload) => {
      if (!err) {
        const activity = new EditorActivity(payload);
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
