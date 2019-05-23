class EditorActivity {
  constructor(props) {
    this._name = props.name;
    this._distance = props.distance;
    this._time = props.moving_time;
  }

  get name() {
    return this._name;
  }

  get distance() {
    return this._distance;
  }

  get time() {
    return this._time;
  }
}

module.exports = EditorActivity;
