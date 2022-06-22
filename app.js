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
const fs = require('fs');

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

app.get("/upload/list", (req, res) => {
    fs.readdir('./uploads', (err, files) => {
        if (err) {
          return console.error(err);
        }
        console.log(files);
        res.send(files);
        // ["file1.txt", "file2.txt", "file3.txt", "index.js"]
      });
     // res.send("no");
})


// Register Get

app.get("/register/:name/:email/:password/:registedwip/:referral", async (req, res) => {
    try{
        // const userExist = await User.findOne({user: req.body.user});
        // if(userExist) return res.status(400).send('Username already taken')
 
         const emailExist = await User.findOne({email: req.params['email']});
         if(emailExist) return res.status(400).send('Email already exists');
 
         const salt = await bcrypt.genSalt(10);
         const hashPassword = await bcrypt.hash(req.params['password'], salt);
         const myuser = new User({
             name: req.params['name'],
             email: req.params['email'],
             password: hashPassword,
             registedwip: req.params['registedwip'],
             referral: req.params['referral'],
         });
 
         await myuser.save();
         res.send(myuser);
 
         console.log(`[ADD] [GET] ${req.params['name']} user has just been created`);
 
     } catch (err) {
 
         res.send({  message: err });
 
     }
})

// Register Post

app.post("/register", async (req, res) => {
    try{
       // const userExist = await User.findOne({user: req.body.user});
       // if(userExist) return res.status(400).send('Username already taken')

        const emailExist = await User.findOne({email: req.body.email});
        if(emailExist) return res.status(400).send('Email already exists');

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const myuser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
            registedwip: req.body.registedwip,
            referral: req.body.referral,
        });

        await myuser.save();
        res.send(myuser);

        console.log(`[ADD] [POST] ${req.body.name} user has just been created`);

    } catch (err) {

        res.send({  message: err });

    }
})

// Login Get

app.get("/login/:email/:password", async (req, res) => {

    const user = await User.findOne({email: req.params['email']});
    if(!user) return res.status(400).send('Email or password is wrong');

    const validPass = await bcrypt.compare(req.params['password'], user.password);
    if(!validPass) return res.status(400).send('Password is wrong');

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);

    res.send(`logged in ${token}`);
    console.log(`[CON] [GET] ${user.name} has logged in`);
})

// Login Post

app.post("/login", async (req, res) => {

        const user = await User.findOne({email: req.body.email});
        if(!user) return res.status(400).send('Email or password is wrong');

        const validPass = await bcrypt.compare(req.body.password, user.password);
        if(!validPass) return res.status(400).send('Password is wrong');

        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);

        res.send(`logged in ${token}`);
        console.log(`[CON] [POST] ${user.name} has logged in`);
})

// Post Remove User

app.post("/admin/rem", async (req, res) => {
    // If req has customer header and value allow the delete
    if (req.header(process.env.CUSTOM_HEADER) == process.env.CUSTOM_HEADER_VALUE) {
        const user = await User.findOne({email: req.body.email});
        if(!user) return res.status(400).send('User does not exists');

        User.deleteOne({
            email: req.body.email
        }, function (err, user) {
        if (err)
          return console.error(err);

        console.log(`[CON] [POST] User tied with the email ${req.body.email} was successfully removed`);
        res.status(200).send("User Deleted");
      })
    }
    else
    {
        res.status(200).send("Authorisation Error");
    }
})

app.post('/upload', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "file") to retrieve the uploaded file
            let file = req.files.file;
            
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            file.mv('./uploads/' + file.name);

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: file.name,
                    mimetype: file.mimetype,
                    size: file.size
                }
            });

            console.log(`[UPL] [POST] A File was uploaded`);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

// Connect DB

mongoose.connect(
    process.env.DB_CON_STRING,
    { useUnifiedTopology: true, useNewUrlParser: true},
    (req,res) =>{
    console.log("Connected to mongoDB");
})

// Listen on port

app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`);
})