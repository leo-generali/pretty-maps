exports.index = (req, res) => {
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

exports.logout = (req, res) => {
  req.logout();
  req.session = null;
  res.redirect('/');
};
