const mongoose = require("mongoose");
const userRating = new mongoose.Schema({
    codeforces : {
        type : String,
        required: true
    },
    // leetcode : {
    //     type : String
    // },
    // codechef : {
    //     type : String
    // }
}, {
    timestamps : true
});

const user = mongoose.model("userRating",userRating);
module.exports = { user };