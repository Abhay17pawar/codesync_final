const express = require('express');
const { scheduleContestEmail } = require('../controllers/calenderController'); 

const router = express.Router();

router.post('/notify', scheduleContestEmail);

module.exports = router;
