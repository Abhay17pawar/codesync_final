const express = require("express");
const { getUserRatingById, createUserRating } = require("../controllers/userDataControllers");
const { getSolvedProblems } = require("../controllers/TotalQuestionsSolved");

const router = express.Router();

router.get("/user-rating/:id", getUserRatingById);
router.post("/user-rating", createUserRating);

// get totalquestionssolved by user in codeforces 
router.get('/solved-problems/:handle', getSolvedProblems);

module.exports = router;
