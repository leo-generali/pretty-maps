class UserProfile {
  constructor(props) {
    this._displayName = props.displayName;
    this._photoSrc = props.photos[0].value;
    this._city = props._json.city;
  }

  get displayName() {
    return this._displayName;
  }

  get photoSrc() {
    return this._photoSrc
  }

  get city() {
    return this._city;
  }
}

module.exports = UserProfile;