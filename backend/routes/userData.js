const express = require("express");
const { getUserRatingById, createUserRating } = require("../controllers/userDataControllers");

const router = express.Router();

router.get("/user-rating/:id", getUserRatingById);
router.post("/user-rating", createUserRating);

module.exports = router;
