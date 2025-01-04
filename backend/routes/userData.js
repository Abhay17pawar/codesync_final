
const express = require('express');
// Import the controller
const { scheduleContestEmail } = require('../controllers/calenderController'); 

const router = express.Router();

// Define the POST route with the correct callback
router.post('/notify', scheduleContestEmail);

module.exports = router;
