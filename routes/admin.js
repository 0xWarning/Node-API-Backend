const router = require('express').Router();
const user = require('../modal/user');
const verify = require('../util/verifyToken');

// If no auth-token this won't work

router.get('/', verify, (req,res) => {

    res.send(req.user);
    //User.findbyOne({_id: req.user});
});

router.post("/remove_user", verify, async (req, res) => {
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


module.exports = router;