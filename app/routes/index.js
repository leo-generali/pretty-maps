const express = require('express');
const router = express.Router();

const pagesController = require('../controllers/pages-controller');
const activityController = require('../controllers/activity-controller');
const { ensureAuthenticated } = require('../controllers/redirects-controller');

router.get('/', pagesController.index);
router.get('/login', pagesController.login);
router.get('/logout', pagesController.logout);
router.get('/about', pagesController.about);
router.get('/failed', pagesController.failedLogin);

router.get('/activities', ensureAuthenticated, activityController.index);
//prettier-ignore
router.get('/activities/:activityId', ensureAuthenticated, activityController.read);

module.exports = router;
