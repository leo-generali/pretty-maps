const moment = require('moment');

const ACTIVITY_TYPES = {
  0: 'Easy',
  2: 'Long',
  3: 'Workout'
};

class Activity {
  constructor(props) {
    this._id = props.id;
    this._polyline = props.map.summary_polyline;
    this._workoutType = ACTIVITY_TYPES[props.workout_type] || '';
    this._dayOfWeek = ACTIVITY_MAPPINGS[new Date(props.start_date).getDay()];
    this._date = moment(props.start_date).format('dddd, MMMM Do YYYY');
    this._startOfWeek = moment(props.start_date_local).startOf('isoWeek');
  }

  get dayOfWeek() {
    return this._dayOfWeek;
  }

  get startOfWeek() {
    return this._startOfWeek;
  }

  get date() {
    return this._date;
  }

  get hasGPS() {
    return this._polyline !== null;
  }

  get workoutType() {
    return this._workoutType;
  }

  get id() {
    return this._id;
  }
}

const ACTIVITY_MAPPINGS = [6, 0, 1, 2, 3, 4, 5];

module.exports = Activity;
