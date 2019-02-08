exports.index = (req, res) => {
  res.render('home/index/index', { user: req.user });
};

exports.login = (req, res) => {
  res.render('home/login/index', { user: req.user });
};

exports.failedLogin = (req, res) => {
  res.render('home/failed/index');
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};
