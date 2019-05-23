class ActivityWeek {
  static fill(activitiesInWeek) {
    const STANDARD_WEEK = [
      { day: 'Monday', activities: [] },
      { day: 'Tuesday', activities: [] },
      { day: 'Wednesday', activities: [] },
      { day: 'Thursday', activities: [] },
      { day: 'Friday', activities: [] },
      { day: 'Saturday', activities: [] },
      { day: 'Sunday', activities: [] }
    ];

    for (let i = 0; i < activitiesInWeek.length; i++) {
      const activity = activitiesInWeek[i];
      STANDARD_WEEK[activity.dayOfWeek].activities.push(activity);
    }

    return STANDARD_WEEK;
  }
}

module.exports = ActivityWeek;
