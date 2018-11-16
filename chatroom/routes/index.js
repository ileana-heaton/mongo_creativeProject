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
mongoose.connect('mongodb://localhost/messageDB',{ useNewUrlParser: true }); //Connects to a mongo database called "messageDB"

var messageSchema = mongoose.Schema({ //Defines the Schema for this database
    Username: String,
    Message: String,
    // Time: String,
});
var Message = mongoose.model('Message', messageSchema); //Makes an object from that schema as a model
var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
    console.log('Connected');
});

router.get('/', function(req, res) {
  res.sendFile('index.html', { root: 'public' });
});

/* POST */
router.post('/messages', function(req, res, next) {
    console.log("/message POST Route");
    // console.log("req.body: ", req.body);
    // res.sendStatus(200);
    var newmessage = new Message(req.body); 
    console.log("newMessage: ", newmessage); 
    newmessage.save(function(err, post) { 
      if (err) return console.error(err);
      console.log("posted message: ", post);
      res.sendStatus(200);
    });
});

/* GET messages from database */
router.get('/messages', function(req, res, next) {
  // console.log("In the GET route");
  Message.find(function(err,messageList) { //Calls the find() method on your database
      if (err) return console.error(err); //If there's an error, print it out
      else {
        // console.log(messageList); //Otherwise console log the messages you found
        res.json(messageList); //send messages back to the browser
      }
    });
});



// router.get('/songs', function(req, res) {
//   console.log("In /songs");
//   res.send(songs);
// });

// router.post('/songs', function(req, res) {
//     console.log("In /songs POST");
//     console.log(req.body);
    // const rapid = new RapidAPI("default-application_5bda4c95e4b0d1763ed6b220", "e129569c-d3a3-4ced-ad2b-fa832950d1dc");
    // rapid.call('LastFm', 'getTrackInfo', { 
    // 	'track': req.body.name,
    // 	'artist': req.body.artist,
    // 	'apiKey': '7380cca68e8e7f63bddc4f3fe7ecc72a'
    
    // }).on('success', (payload)=>{
    // 	 /*YOUR CODE GOES HERE*/
    // 	 console.log("payload: ", payload);
    // 	 if(payload.error != undefined){
    // 	   console.log("payload error: ", payload.error);
    // 	   return res.status(400).send({
    //       message: 'This is an error!'
    //     });
    //     // res.end('{"error" : "Track not found", "status" : 200}');
    // 	 }
    // 	 else{
    //     if(payload.track != undefined) {
    //       var trackName = payload.track.name;
    //       var trackUrl = payload.track.url;
    //       if(payload.track.artist != undefined){
    // 	      var trackArtist = payload.track.artist.name;
    //   	    var albumArt = "default-album-artwork.png";    	      
    // 	      if(payload.track.album != undefined){
    // 	        if(payload.track.album.image[2]["#text"] != ''){
    // 	          albumArt = payload.track.album.image[2]["#text"];
    // 	        }
    // 	      }
    // 	      if(payload.track.duration != 0){
    //   	      var newSong = {"name": trackName, "artist": trackArtist, "albumUrl": albumArt, "trackUrl": trackUrl, num: songs.length+1};
    //   	      songs.push(newSong);
    //           res.send(newSong);
    //           res.end('{"success" : "Updated Successfully", "status" : 200}');
    //           console.log("songs: ",songs);
    //           return;
    // 	      }
    //       }
    //     }
    //     console.log("missing track name or artist name!.. track: ", payload.track, ", artist: ", payload.track.artist);
    // 	   return res.status(400).send({
    //       message: 'This is an error!'
    //     });
    // 	 }
    // }).on('error', (payload)=>{
    // 	 /*YOUR CODE GOES HERE*/ 
    // 	 console.log("error!: ", payload);
          	 
    // });

    
    
    // // songs.push(req.body);
    // // res.send(req.body);
    // // res.end('{"success" : "Updated Successfully", "status" : 200}');
// });

// router.post('/deleteSong', function(req, res) {
//     console.log("In /deleteSong POST");
//     // console.log("request to delete: ",req.body);
//     for(var song in songs){
//       // console.log("song in list:(name)= ", songs[song]);
//       if(songs[song].name == req.body.name){  //&& song.artist == req.body.artist){
//         // index = songs.indexOf(song);
//         songs.splice(song, 1);
//         res.send(song.toString());
//         res.end('{"success" : "Updated Successfully", "status" : 200}');
//       }
//     }
//     res.end('{"success" : "Something\'s wrong..", "status" : 400}');
// });


module.exports = router;
