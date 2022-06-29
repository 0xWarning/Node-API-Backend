const router = require('express').Router();
const user = require('../modal/user');
const fileReq = require('../modal/file');
const verify = require('../util/verifyToken');
const fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
// If no auth-token this won't work

router.get('/', verify, (req, res) => {

    res.send(req.user);
    //User.findbyOne({_id: req.user});
});

router.post('/upload', verify, async (req, res) => {
    try {
        if (!req.files) {
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

            //console.log(`[UPL] [POST] A File was uploaded`);
            console.log(`A File was uploaded `.gray + `${file.name}`.blue);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});


router.post('/upload_db', verify, async (req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {

            //Use the name of the input field (i.e. "file") to retrieve the uploaded file
            let file = req.files.file;

            const fileExist = await fileReq.findOne({ name: file.name });
            if (fileExist) return res.status(400).send('File already exists')

            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            file.mv('./uploads/' + file.name);


            const words = file.name.split('.'); // Split the file type out of the name "."
            const fname = words[1]; // Select the last part of the split

            const myfile = new fileReq({
                name: file.name, // Uploaded File Name
                // description: req.body.description,
                description: "Arrr! Treasure", // Preset /or set descripiton (Depedning on future options)
                size: file.size, // Uploaded File Size
                type: fname, // Uploaded File Type
                upload_by: req.user._id, // Uploaded by user id
            });

            await myfile.save(); // Push to database 
            res.send(myfile); // Send DB Result

            console.log(`A File was uploaded `.gray + `${file.name}`.blue);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});


router.get("/list", verify, (req, res) => {
    MongoClient.connect(process.env.DB_CON_STRING, function (err, db) { // Connect to db
        if (err) throw err;
        var dbo = db.db("test"); // Selec DB Test
        // Find table files and required params
        dbo.collection("files").find({}, { projection: { _id: 0, name: 1, description: 1, size: 1, type: 1 } }).toArray(function (err, result) {
            if (err) throw err;
            res.send(result); // Return result
            db.close(); // close db
        });
    });
    console.log(`File list requested `.yellow);
})


module.exports = router;