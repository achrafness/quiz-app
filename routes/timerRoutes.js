const express = require('express');
const router = express.Router();
const { createTimer, getTimer ,deleteTimer } = require('../controllers/timerController');
const { authenticate } = require('../middleware/authentication');

router.route('/').post(authenticate, createTimer).delete(deleteTimer).get(getTimer);
module.exports = router;