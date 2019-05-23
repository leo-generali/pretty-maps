const UserProfile = require('../../models/user-profile');
const TrainingCalendar = require('../../models/training-calendar');

const strava = require('strava-v3');
const { errorLoadingData } = require('../redirects-controller');

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
