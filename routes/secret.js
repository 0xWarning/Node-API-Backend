const router = require('express').Router();
const verify = require('../util/verifyToken');
const file = require('../modal/file');
const devn = require('../modal/devNotes');
const devNotes = require('../modal/devNotes');
const Chat = require('../modal/chat');
var MongoClient = require('mongodb').MongoClient;

router.get('/', verify, (req, res) => {

    res.send(req.user);
    //User.findbyOne({_id: req.user});
});



// Check file exists then retun location as web address to download

router.get('/getDownload', verify, async (req, res) => {

    const user = await file.findOne({ name: req.body.name });
    if (!user) return res.status(400).send('File does not exists');

    res.send(`http://localhost:1337/api/uploads/${req.body.name}`)
    console.log(`A File link was generated `.gray + `http://localhost:1337/api/uploads/${req.body.name}`.blue);
    //User.findbyOne({_id: req.user});
});

router.get('/version', verify, async (req, res) => {

    res.send(`CURRENT VERSION > ${process.env.VERSION}`)

});

router.get('/dev_notes', verify, async (req, res) => {

    MongoClient.connect(process.env.DB_CON_STRING, function (err, db) { // Connect to db
        if (err) throw err;
        var dbo = db.db("test"); // Selec DB Test
        // Find table files and required params
        dbo.collection("devns").find({}, { projection: { _id: 0, submitBy: 1, issue: 1, note: 1 } }).toArray(function (err, result) {
            if (err) throw err;
            res.send(result); // Return result
            db.close(); // close db
        });
    });
    console.log(`Dev notes have been viewed `.yellow);

});


router.get('/chat_log', verify, async (req, res) => {

    MongoClient.connect(process.env.DB_CON_STRING, function (err, db) { // Connect to db
        if (err) throw err;
        var dbo = db.db("test"); // Selec DB Test
        // Find table files and required params
        dbo.collection("chats").find({}, { projection: { _id: 0, author: 1, timestamp: 1, message: 1 } }).toArray(function (err, result) {
            if (err) throw err;
            res.send(result); // Return result
            db.close(); // close db
        });
    });
    console.log(`chat logs have been viewed `.yellow);

});

router.post('/submit_chat_log', verify, async (req, res) => {

   // const issue = await Chat.findOne({ issue: req.body.issue });
    //if (issue) return res.status(400).send('Issue with the suppplied name has already been reported');


    const mychat = new Chat({
        author: req.body['author'],
        timestamp: req.body['timestamp'],
        message: req.body['message'],
    });

    await mychat.save();
    res.send(mychat);
    console.log(`chat message submitted`.yellow);

});

router.post('/submit_dev_note', verify, async (req, res) => {

    const issue = await devn.findOne({ issue: req.body.issue });
    if (issue) return res.status(400).send('Issue with the suppplied name has already been reported');


    const mynote = new devNotes({
        submit_by: req.body['submit_by'],
        issue: req.body['issue'],
        note: req.body['note'],
    });

    await mynote.save();
    res.send(mynote);
    console.log(`Dev note entry submitted`.yellow);

});

module.exports = router;