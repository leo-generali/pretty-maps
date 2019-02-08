const express = require('express');
const router = express.Router();

const pages_controller = require('../controllers/pagesController');
const activity_controller = require('../controllers/activityController');

router.get('/', pages_controller.index);
router.get('/login', pages_controller.login);
router.get('/logout', pages_controller.logout);
router.get('/about', pages_controller.about);
router.get('/failed', pages_controller.failedLogin);

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
