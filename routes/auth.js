const router = require('express').Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const User = require("../modal/user");
const {registerValidation, loginValidation} = require("../util/validation");

// Register Get

router.get("/register/:name/:email/:password/:registedwip/:referral", async (req, res) => {
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

router.post("/register", async (req, res) => {
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

router.get("/login/:email/:password", async (req, res) => {


    const user = await User.findOne({email: req.params['email']});
    if(!user) return res.status(400).send('Email or password is wrong');

    const validPass = await bcrypt.compare(req.params['password'], user.password);
    if(!validPass) return res.status(400).send('Password is wrong');

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
    res.send(`logged in ${token}`);
    console.log(`[CON] [GET] ${user.name} has logged in`);
})

// Login Post

router.post("/login", async (req, res) => {


        const user = await User.findOne({email: req.body.email});
        if(!user) return res.status(400).send('Email or password is wrong');

        const validPass = await bcrypt.compare(req.body.password, user.password);
        if(!validPass) return res.status(400).send('Password is wrong');

        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send(token);;
        console.log(`[CON] [POST] ${user.name} has logged in`);
})

// Post Remove User

module.exports = router;