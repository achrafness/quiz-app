// 
const express = require('express');
const router = express.Router();
const { createTimer, getTimer ,deleteTimer } = require('../controllers/timerController');

router.route('/').post(createTimer).get(getTimer).delete(deleteTimer);

module.exports = router;