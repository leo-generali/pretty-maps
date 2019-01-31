exports.index = (req, res) => {
  res.render('index', { user: req.user });
};

exports.login = (req, res) => {
  res.render('login', { user: req.user });
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};
