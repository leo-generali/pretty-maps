const express = require('express');
const router = express.Router();

const pagesController = require('../controllers/pagesController');
const activityController = require('../controllers/activityController');

router.get('/', pagesController.index);
router.get('/login', pagesController.login);
router.get('/logout', pagesController.logout);
router.get('/about', pagesController.about);
router.get('/failed', pagesController.failedLogin);

router.get('/activities', ensureAuthenticated, activityController.index);
//prettier-ignore
router.get('/activity/:activityId', ensureAuthenticated, activityController.read);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  req.flash(
    'error',
    'You must be logged in to access this <span class="flash-message__icon">😢</span>'
  );
  res.redirect('/');
}

module.exports = router;
