const express = require('express');
const router = express.Router();

const home_controller = require('../controllers/homeController');

router.get('/', home_controller.index);
router.get('/login', home_controller.login);
router.get('/logout', home_controller.logout);

module.exports = router;
