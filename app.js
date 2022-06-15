//Required
const express = require("express");
const mongoose = require("mongoose")
const bcrypt = require('bcrypt');
const User = require("./modal/user")

const app = express();

require("dotenv/config");

// Without this i can't read post and get data (Might be a better solution)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send("You have found our api !");
})


// Register Get

app.get("/register/:name/:email/:password/:registedwip/:referral", async (req, res) => {
    try{
        // const userExist = await User.findOne({user: req.body.user});
        // if(userExist) return res.status(400).send('Username already taken')
 
         const emailExist = await User.findOne({email: req.params['email']});
         if(emailExist) return res.status(400).send('Email already exists')
 
         const salt = await bcrypt.genSalt(10);
         const hashPassword = await bcrypt.hash(req.params['password'], salt)
 
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
        if(emailExist) return res.status(400).send('Email already exists')

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt)

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

    res.send('logged in')
    console.log(`[CON] [GET] ${user.name} has logged in`);
})

// Login Post

app.post("/login", async (req, res) => {

        const user = await User.findOne({email: req.body.email});
        if(!user) return res.status(400).send('Email or password is wrong');

        const validPass = await bcrypt.compare(req.body.password, user.password);
        if(!validPass) return res.status(400).send('Password is wrong');

        res.send('logged in')
        console.log(`[CON] [POST] ${user.name} has logged in`);
})

// Post Remove User

app.post("/admin/rem", async (req, res) => {

    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('User does not exists');

    User.deleteOne({
        email: req.body.email
    }, function (err, user) {
        if (err)
          return console.error(err);

        console.log('User successfully removed from polls collection!');
        res.status(200).send("User Deleted");
      })
})

// Connect DB

mongoose.connect(
    process.env.DB_CON_STRING,
    { useUnifiedTopology: true, useNewUrlParser: true},
    (req,res) =>{
    console.log("Connected to mongoDB");
})

// Listen on port

app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`)
})