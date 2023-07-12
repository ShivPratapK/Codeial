const express = require('express');
const router = express.Router();


/*----------  Requiring home_controller.js from Controller folder  ----------*/
const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);

module.exports = router;