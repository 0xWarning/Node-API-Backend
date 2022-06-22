//Required
const express = require("express");
const fileUpload = require('express-fileupload');
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const User = require("./modal/user");
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
const app = express();
app.use(express.static('uploads'));

app.use(fileUpload({
    createParentPath: true
}));

require("dotenv/config");

// Without this i can't read post and get data (Might be a better solution)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get("/", (req, res) => {
    res.send("You have found our api !");
})


// Connect DB

mongoose.connect(
    process.env.DB_CON_STRING,
    { useUnifiedTopology: true, useNewUrlParser: true},
    (req,res) =>{
    console.log("Connected to mongoDB");
})

// Import Routes
const adminRoute = require('./routes/admin')
const authRoute = require('./routes/auth')
const filesRoute = require('./routes/files')

// Route Middlewares
app.use('/api/admin', adminRoute);
app.use('/api/user', authRoute);
app.use('/api/files', filesRoute);

// Listen on port
app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`);
})