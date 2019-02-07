const express = require('express');
const router = express.Router();

const home_controller = require('../controllers/homeController');
const activity_controller = require('../controllers/activityController');

router.get('/', home_controller.index);
router.get('/login', home_controller.login);
router.get('/logout', home_controller.logout);
router.get('/failed', home_controller.failedLogin);

router.get('/activities', ensureAuthenticated, activity_controller.index);
//prettier-ignore
router.get('/activity/:activityId', ensureAuthenticated, activity_controller.read);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;
