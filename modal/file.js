const mongoose = require("mongoose");

const File = new mongoose.Schema({
    // Nothing fancy here
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: false,
    },
    type: {
        type: String,  
        required: false,
    },
    upload_by: {
        type: String,  
        required: true,
    },

});

module.exports = mongoose.model("file", File);