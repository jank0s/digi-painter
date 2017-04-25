var headingImg;
var track01Sound;
var track02Sound;
var track03Sound;
var track04Sound;

var isPlaying = false;

function preload() {
  headingImg = loadImage('assets/naslov.png');
  track01Sound = loadSound('assets/track01.wav');
  track02Sound = loadSound('assets/track02.wav');
  track03Sound = loadSound('assets/track03.wav');
  track04Sound = loadSound('assets/track04.wav');
}

function setup() {
	var canvas = createCanvas(800, 600);
	canvas.parent('sketch-holder');

	track01Sound.playMode('restart');

	image(headingImg, 0, 0);
}

function draw() {

}

function mousePressed() {
	track01Sound.play();

}