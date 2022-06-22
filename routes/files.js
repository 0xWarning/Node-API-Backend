const router = require('express').Router();
const user = require('../modal/user');
const fileReq = require('../modal/file');
const verify = require('../util/verifyToken');
const fs = require('fs');

// If no auth-token this won't work

router.get('/', verify, (req,res) => {

    res.send(req.user);
    //User.findbyOne({_id: req.user});
});

router.post('/upload', verify, async (req, res) => {
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


router.post('/upload_db', verify, async (req, res) => {
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

            const words = file.name.split('.');
            const fname = words[1];

            const myfile = new fileReq({
                name: file.name,
               // description: req.body.description,
               description: "Arrr! Treasure",
                size: file.size,
                type: fname,
                upload_by: req.user._id,
            });
    
            await myfile.save();
            res.send(myfile);
    
            console.log(`[ADD] [POST] ${file.name} File has just been created`);
            console.log(`[UPL] [POST] A File was uploaded`);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});


router.get("/list", verify, (req, res) => {
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


module.exports = router;