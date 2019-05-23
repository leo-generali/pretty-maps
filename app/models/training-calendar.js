const ActivityGrouper = require('./activity-grouper');
const ActivityWeek = require('./activity-week');

class TrainingCalendar {
  static header() {
    return ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
  }

  static activitiesOrganizedByWeek(activities) {
    const activitiesByWeek = ActivityGrouper.byWeek(activities);
    const startWeeks = Object.keys(activitiesByWeek).sort(
      (a, b) => new Date(b) - new Date(a)
    );
    const activitiesOrganizedByWeek = startWeeks.map((startDate) => {
      return {
        startDate: startDate,
        activities: ActivityWeek.fill(activitiesByWeek[startDate])
      };
    });
    return activitiesOrganizedByWeek;
  }
}

module.exports = TrainingCalendar;
