const express = require('express');
const router = express.Router();
const emailController = require('../controllers/calenderController');

// Define the route
router.post('/notify', emailController.sendMail);

module.exports = router;
