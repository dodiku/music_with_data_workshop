
/*****************************
Tone.js synths
*****************************/
var OSCGainStage = new Tone.Gain(0.7).toMaster();


var synthOne = new Tone.Synth({
	oscillator:{
		type : 'square8'
	},
  envelope: {
  	attack : 0.001,
    decay : 2,
    sustain : 0
  }
}).connect(OSCGainStage);


var synthTwo = new Tone.MonoSynth({
	oscillator: {
  	type : "fatsawtooth4",
  },
  filter: {
    type:"peaking",
  },
	envelope: {
  	attack : 2,
    decay : 1,
    sustain : 4,
    release : 16
  },
  filterEnvelope:{
    attack : 2,
    decay : 1,
    sustain : 1,
    release : 10,
    baseFrequency:100,
    octaves:2,
    exponent:4,
},
}).connect(OSCGainStage);

/*****************************
Array of notes of the pentatonic scale
*****************************/
var notes = ['A2', 'C2', 'D2', 'E2', 'G2'];


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
  var note = notes[Math.round(Math.random()*notes.length - 1)];
  console.log(note);

  // playing the note
  // using 'regular' synth
  if (type === 'high') {

    synthOne.triggerAttackRelease(note, 0.5);

  // using 'rare' synth
  } else {
    synthTwo.triggerAttackRelease(note, 5);
  }

  // adding the tweet to the page
  $('.container').append(tweetHtml);

  // making tweet disappear gradually
  var id = '#' + tweetCount;

    $(id).delay(500).animate({
      'opacity': 0
    }, 4000, function(){
      $(id).remove();
    });


  // incrementing tweetCount
  tweetCount++;

}

/*****************************
Socket.io client side
*****************************/
var socket = io();

socket.on('note', function(tweetText, userHandle, freindsCount){
  var tweetWtihHandle = '@' + userHandle + ': ' + tweetText;

  if (freindsCount >= 100) {
    triggerNote('high', tweetWtihHandle);
  } else {
    triggerNote('low', tweetWtihHandle);
  }
});

socket.on('highNote', function(tweet){
  triggerNote('low', tweet);
});


/*****************************
DEBUG FUNCTION
*****************************/
function test(){

  console.log('🍍  [debug] playing random note by random synth + showing test tweet');

  var tweet = '@handlename: this is a tweet by this guy that contains 140 characters about so much shit squeezed in one little tweet with #thishashtag and #thisone too!';
  if (Math.round(Math.random()) === 0) {
    triggerNote('rare', tweet);
  } else {
    triggerNote('rare', tweet);
  }

}
