'use strict'

//Express
var express = require('express');
var app = express();

//HTTP
var http = require('http').createServer(app);

//Port - Useful for heruko or places where port gets set for us
var port = process.env.PORT || 2912;

//Run the server with the port
var server = app.listen(port);

console.log('Server is running at localhost:' + port);

var io = require('socket.io').listen(server);

var ejs = require('ejs');

var Twit = require('twit');

var TwitterAPI = new Twit({
    consumer_key: '9Td3nxDzi8VnoEADiwdNiI1VJ',
    consumer_secret: 'l5wz1aiPisOnkis846nM1t7zlRqmSnukLuLnsg2EZTDczqKw6L',
    access_token: '156587257-rMpyBUTPlMIBhH5k8aAbZKd16LPNmQ8mWWNmeNNd',
    access_token_secret: 'N4lz1uqzdwIDpLxnymTJYYwrLyG87FRnJaqJHBQMUpFz3',
    timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
});

//Setup the views folder
app.set('views', __dirname + '/views');

//Setup ejs, so we can write HTML(:
app.engine('.html', ejs.__express);
app.set('view-engine', 'html');

//Setup the public client folder
app.use(express.static(__dirname + '/public'));

//Socket messages
io.on('connection', function (client) {
    //We don't really need this one since we will be emitting messages from the server but this is the pattern for building socket communication using Socket.io
});

//Let's define a couple of constrains
var NYC = [ '-73.98', '40.85', '-73.87', '40.69' ];
var filters = 'holiday rest';

var stream = TwitterAPI.stream('statuses/filter', {track: filters}, {locations: NYC});

//Register what happens when we get a new twitt
stream.on('tweet', function(tweet){

    //Show us the text
    console.log(tweet.text); // Get rid of text to see all the stuff that Twitter gives us - GET CREATIVE WITH IT!

    //This sends everybody connected and not just a uniqe socket - GOOD FOR BOLD ANNOUNCEMENTS!
    io.sockets.emit('thefutureofstorytelling', tweet.text);

});

//Router - we only have one route
app.get('/', function (req, res) {
    res.render('index.html');
});