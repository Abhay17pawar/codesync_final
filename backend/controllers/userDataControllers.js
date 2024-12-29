const { user } = require("../models/userData");
const axios = require("axios");

const createUserRating = async (req, res) => {
    try {
        const { codeforces } = req.body;
        console.log("Received data:", req.body);

        if (!codeforces) {
            return res.send("Provide Codeforces handle");
        }

        const newRating = new user({
            codeforces
        });

        await newRating.save();
        res.status(201).send("New user added");

    } catch (error) {
        console.log(error);
        return res.status(404).send("Some error occurred!", error);
    }
}

const getUserRatingById = async (req, res) => {
    try {
        const usersRating = await user.findById(req.params.id);

        if (!usersRating) {
            return res.status(404).json({ error: "User rating not found" });
        }

        const handle = usersRating.codeforces;
        const url = `https://codeforces.com/api/user.rating?handle=${handle}`;
        const response = await axios.get(url);
    
        if (response.data.status === 'OK') {
            console.log(`Rating history for ${handle}:`, response.data.result);
            return res.status(200).json({ codeforcesHandle: handle, ratingHistory: response.data.result });
        } else {
            throw new Error('API error: ' + response.data.comment);
        }
    } catch (error) {
        console.log(error);
        return res.status(404).send("Some error occurred!", error);
    }
}

module.exports = { createUserRating, getUserRatingById };
