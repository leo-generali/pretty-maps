exports.index = (req, res) => {
  if (req.user) { res.redirect('/activities') }
  res.render('pages/home/index', { user: req.user });
};

exports.login = (req, res) => {
  res.render('pages/login/index', { user: req.user });
};

exports.about = (req, res) => {
  res.render('pages/about/index', { user: req.user });
};

exports.failedLogin = (req, res) => {
  res.render('pages/failed/index');
};

exports.roadmap = (req, res) => {
  res.render('pages/roadmap/index', { user: req.user });
};

exports.logout = (req, res) => {
  req.logout();
  req.session = null;
  res.redirect('/');
};
