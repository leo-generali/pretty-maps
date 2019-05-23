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

  get dayOfWeek() {
    return ACTIVITY_MAPPINGS[new Date(this.start_date).getDay()];
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

const ACTIVITY_MAPPINGS = [6, 0, 1, 2, 3, 4, 5];

module.exports = Activity;
