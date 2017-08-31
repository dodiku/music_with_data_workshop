
/*****************************
Tone.js synths
*****************************/
var synthOne = new Tone.PluckSynth({
  attackNoise: 1,
  dampening: 1500,
  resonance: 0.99,
}).toMaster();


var synthTwo = new Tone.Synth({
	'oscillator.type' : 'square8',
  'envelope' : {
  	attack : 0.001,
    decay : 2,
    sustain : 0
  }
}).toMaster();


var synthThree = new Tone.MonoSynth({
  'detune' : 10,
	'oscillator' : {
  	type : "fatsawtooth4",
  },
  'filter' : {
    type:"peaking",
  },
	'envelope' : {
  	attack : 2,
    decay : 1,
    sustain : 1,
    release : 10
  },
  'filterEnvelope':{
    attack : 2,
    decay : 1,
    sustain : 1,
    release : 10,
    baseFrequency:100,
    octaves:2,
    exponent:4,
},
}).toMaster();


/*****************************
Array of notes of the pentatonic scale
*****************************/
var notes = ['G2', 'A2', 'B2', 'D3', 'E3', 'G3'];



/*****************************
Note triggeting function.
Receieves:
  - type (string): a string, 'regular' for regular tweet and 'rare' for rare tweet
  - tweet (string): tweet content
Plays sound and triggers animation according to the input.
*****************************/

// counting the number of tweets (will be used as an #id)
var tweetCount = 0;

function triggerNote(type, tweet){

  // getting tweet position on the page radomally
  var height = Math.floor(Math.random() * 80);
  var width = Math.floor(Math.random() * 50);

  // adding html tags to tweet
  var tweetHtml = '<div class="tweet" id="' + tweetCount + '" style="top:' + height + 'vh; left:' + width + 'vw"><p>' + tweet + '</p></div>';

  // coloring the relevant hashtags
  tweetHtml = tweetHtml.replace('#thishashtag', '<span id="hashtag">#thishashtag</span>');

  // getting note randomally
  var note = notes[Math.floor(Math.random()*notes.length)];

  // playing the note
  // using 'regular' synth
  if (type === 'regular') {

    // choosing regular synth randomally
    if (Math.round(Math.random()) === 0) {
      synthOne.triggerAttackRelease(note, 0.5);
    } else {
      synthTwo.triggerAttackRelease(note, 0.5);
    }

  // using 'rare' synth
  } else {
    synthThree.triggerAttackRelease(note, 5);
  }

  // adding the tweet to the page
  $('.container').append(tweetHtml);

  // making tweet disappear gradually
  var id = '#' + tweetCount;

  setTimeout(function(){
    $(id).css({
      transition: 'opacity 6s',
      'opacity': 0
    });
  }, 500);


  // incrementing tweetCount
  tweetCount++;

}

/*****************************
Socket.io client side
*****************************/
// var socket = io();
//
// socket.on('ragular', function(data){
//   triggerNote('regular', data);
// });
//
// socket.on('rare', function(data){
//   triggerNote('rare', data);
// });


/*****************************
DEBUG FUNCTION
*****************************/
function test(){

  console.log('🍍  [debug] playing random note by random synth + showing test tweet');

  var tweet = '@handlename: this is a tweet by this guy that contains 140 characters about so much shit squeezed in one little tweet with #thishashtag and #thisone too!';
  if (Math.round(Math.random()) === 0) {
    triggerNote('regular', tweet);
  } else {
    triggerNote('rare', tweet);
  }

}
