const router = require('express').Router();
const User = require('../modal/user');
const verify = require('../util/verifyToken');
const file = require('../modal/file');
const fs = require('fs');
// If no auth-token this won't work

router.get('/', verify, (req, res) => {

  res.send(req.user);
  //User.findbyOne({_id: req.user});
});

router.post("/remove_user", verify, async (req, res) => {
  // If req has customer header and value allow the delete
  if (req.header(process.env.CUSTOM_HEADER) == process.env.CUSTOM_HEADER_VALUE) {
    // Check if email exist
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('User does not exists');


    // Delete one incase multiple with same email
    // Will have to filter or make the emails bind to one account instead of multiple
    User.deleteOne({
      email: req.body.email
    }, function (err, user) {
      if (err)
        return console.error(err);

      console.log(`User tied with email `.gray + `${req.body.email}`.cyan + ` was successfully removed`);
      res.status(200).send("User Deleted");
    })
  }
  else {
    res.status(200).send("Authorisation Error");
    // Incorrect secret key, header
  }
})

router.post("/remove_file", verify, async (req, res) => {
  if (req.header(process.env.CUSTOM_HEADER) == process.env.CUSTOM_HEADER_VALUE) {
    // If req has customer header and value allow the delete
    const fileReq2 = await file.findOne({ name: req.body.gname });
    if (!fileReq2) return res.status(400).send('File does not exists');

    // Delete one file incase multiple instances
    file.deleteOne({
      name: req.body.gname,
    }, function (err, file) {
      if (err)
        return console.error(err);


      // Remove the symbolic link
      fs.unlink('./uploads/' + req.body.gname, (err) => {
        if (err) throw err //handle your error the way you want to;
        console.log('path/file.txt was deleted');//or else the file will be deleted
      });

      console.log("Successfully".green + " removed ".red + `${req.body.gname}`.cyan);
      res.status(200).send("File Deleted");
    })



  }
  else {
    res.status(200).send("Authorisation Error");
    // Incorrect secret key, header
  }
})



module.exports = router;