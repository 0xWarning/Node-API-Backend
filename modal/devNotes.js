const mongoose = require("mongoose");

const devN = new mongoose.Schema({
    // Nothing fancy here
    submit_by: {
        type: String,
        required: true,
    },
    issue: {
        type: String,
        required: true,
    },
    note: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model("devn", devN);