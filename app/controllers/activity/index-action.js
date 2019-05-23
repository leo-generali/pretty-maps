const UserProfile = require('../../models/user-profile');
const TrainingCalendar = require('../../models/training-calendar');
const StravaInterface = require('../../models/strava-interface');

const { errorLoadingData } = require('../redirects-controller');

exports.index = async (req, res) => {
  const { id, token } = req.user;
  const { err, activities } = await StravaInterface.getActivities(token);

  // If there's an error send bail out and show error message!
  if (err) errorLoadingData(req, res);

  const user = new UserProfile(req.user);
  const trainingCalendar = {
    header: TrainingCalendar.header(),
    activities: TrainingCalendar.activitiesOrganizedByWeek(activities)
  };

  res.render('activity/index/index', {
    user,
    trainingCalendar
  });
};
