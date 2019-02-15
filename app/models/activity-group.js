const groupBy = require('lodash.groupby');
const Activity = require('./activity');

class ActivityGroup {
  constructor(activities) {
    this.activities = activities.map((activity) => new Activity(activity));
  }

  activities() {
    return this.activities;
  }

  activitiesByWeek() {
    const groupedResults = groupBy(this.activities, (result) =>
      result.getStartOfWeek()
    );
    const dateKeys = Object.keys(groupedResults);
    const activitiesByWeek = dateKeys.map((dateKey) => groupedResults[dateKey]);
    return activitiesByWeek;
  }
}

module.exports = ActivityGroup;
