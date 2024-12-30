const mongoose = require("mongoose");
const userRating = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    email : {
        type : String,
        required: true
    },
    password : {
        type : String,
        required: true
    },
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