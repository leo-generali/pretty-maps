const Activity = require('./activity');
const groupBy = require('lodash.groupby');

class ActivityGrouper {
  static byWeek(activities) {
    const allActivities = activities.map((activity) => new Activity(activity));
    const groupedResults = groupBy(allActivities, (result) =>
      result.getStartOfWeek()
    );
    return groupedResults;
  }
}

module.exports = ActivityGrouper;
