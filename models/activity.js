var moment = require('moment');

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
}

module.exports = Activity;
