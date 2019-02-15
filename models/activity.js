const moment = require('moment');

const ACTIVITY_TYPES = {
  0: 'Easy',
  2: 'Long',
  3: 'Workout'
};

class Activity {
  constructor(props) {
    Object.assign(this, { ...props });
  }

  getStartOfWeek() {
    return moment(this.start_date_local).startOf('isoWeek');
  }

  getEndOfWeek() {
    return moment(this.start_date_local).endOf('isoWeek');
  }

  date(format) {
    return moment(this.start_date).format(format);
  }

  hasGPS() {
    return this.map.summary_polyline !== null;
  }

  workoutType() {
    return ACTIVITY_TYPES[this.workout_type] || '';
  }
}

module.exports = Activity;
