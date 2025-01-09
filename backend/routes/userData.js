const express = require('express');
const { scheduleContestEmail } = require('../controllers/calenderController'); 
const { verifyToken } = require('../auth/auth');

const router = express.Router();

router.post('/notify',verifyToken, scheduleContestEmail);

module.exports = router;
