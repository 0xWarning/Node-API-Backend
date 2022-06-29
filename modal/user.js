const mongoose = require("mongoose");

const User = new mongoose.Schema({
    // Nothing fancy here
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    // Hashed Password
    password: {
        type: String,
        required: true,
    },
    // For now we only want users with a referral code to signup
    referral: {
        type: String,
        required: true,
    },
    // Coming Soon (Check registered IP against current login ip or reg ip)
    registedwip: {
        type: String,
        required: true,
    },

});

module.exports = mongoose.model("user", User);