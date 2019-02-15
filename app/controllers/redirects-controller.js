exports.errorLoadingData = (req, res) => {
  req.flash(
    'error',
    'There was an error loading the Strava data. Please try again! <span class="flash-message__icon">😢</span>'
  );

  res.redirect('/');
};

exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  req.flash(
    'error',
    'You must be logged in to access this <span class="flash-message__icon">😢</span>'
  );

  res.redirect('/');
};
