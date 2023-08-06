const express = require('express');
const router = express.Router();


/*----------  Requiring home_controller.js from Controller folder  ----------*/
const homeController = require('../controllers/home_controller');

router.get('/', homeController);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
module.exports = router;