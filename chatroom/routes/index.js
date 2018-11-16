var express = require('express');
var router = express.Router();

// var songs = [
//     { name: 'Everything',
//     artist: 'Michael Bublé',
//     albumUrl: 'https://lastfm-img2.akamaized.net/i/u/174s/8e3918e2eb2043b09baec9e82b85bf83.png',
//     trackUrl: 'https://www.last.fm/music/Michael+Bubl%C3%A9/_/Everything',
//     num: 1
//     } 
// ];

/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency
mongoose.connect('mongodb://localhost/messageDB', { useNewUrlParser: true }); //Connects to a mongo database called "messageDB"

var messageSchema = mongoose.Schema({ //Defines the Schema for this database
  Username: String,
  Message: String,
  time: { type: Date, default: () => { return new Date() } }
});
var Message = mongoose.model('Message', messageSchema); //Makes an object from that schema as a model
var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
  console.log('Connected');
});

router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root: 'public' });
});

/* POST */
router.post('/messages', function(req, res, next) {
  console.log("/message POST Route");
  var newmessage = new Message(req.body);
  // console.log("newMessage: ", newmessage); 
  newmessage.save(function(err, post) {
    if (err) return console.error(err);
    console.log("posted message: ", post);
    res.sendStatus(200);
  });
});

/* GET messages from database */
router.get('/messages', function(req, res, next) {
  // console.log("In the GET route");
  Message.find(function(err, messageList) { //Calls the find() method on your database
    if (err) return console.error(err); //If there's an error, print it out
    else {
      // console.log(messageList); //Otherwise console log the messages you found
      res.json(messageList); //send messages back to the browser
    }
  });
});


module.exports = router;
