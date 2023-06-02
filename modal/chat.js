const mongoose = require("mongoose");

const Chat = new mongoose.Schema({
    // Nothing fancy here
    author: {
        type: String,
        required: true,
    },
    timestamp: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("chat", Chat);