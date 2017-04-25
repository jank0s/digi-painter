var headingImg;
var infoImg;
var backImg;
var selectImg;
var img = new Array();
var sound = new Array();

var step = 0;
var selectedImg = -1;

function preload() {
	headingImg = loadImage('assets/naslov.png');
	infoImg = loadImage('assets/info.png');
	selectImg = loadImage('assets/izbira.png');
	backImg = loadImage('assets/back.png');
	for(i = 0; i < 36; i++){
		img[i] = loadImage('assets/img' + i + '.png');
	}
	for(i = 0; i < 4; i++){
		sound[i] = loadSound('assets/sound' + i + '.wav');
	}
}

function setup() {
	var canvas = createCanvas(800, 600);
	canvas.parent('sketch-holder');

	noLoop();
	step0();
}

function draw() {

}

function step0(){
	step = 0;
	image(headingImg, 0, 0);
}

function step1(){
	step = 1;
	image(infoImg, 0, 0);
}

function step2(){
	step = 2;
	selectedImg = -1;

	image(selectImg, 0, 0);
	image(backImg, 604, 4, 63, 63);

	for(i = 0; i < 36; i++){
		var col = (i / 6) >> 0;
		var row = i % 6;
		var x = 6 + col * 65 + (col > 2 ? 404 : 0);
		var y = 84 + row * 67;
		var w = 60;
		var h = 62;
		image(img[i], x, y, w, h)
	}

	image(infoImg, 200, 84, 400, 397)
}

function step3(){
	if(mouseY < 67){
		if(mouseX > 604 && mouseX < 668){
			step0();
		}
	}else if(mouseY > 84 && mouseY < 482 && mouseX > 5){
		var row = ((mouseY - 84) / 67) >> 0;
		if(mouseX < 196){
			var col = ((mouseX - 6) / 65) >> 0;
			selectPhoto(row, col);
		}else if(mouseX > 605 && mouseX < 795){
			var col = (((mouseX - 605) / 65) >> 0) + 3;
			selectPhoto(row, col);
		}
	}
}

function selectPhoto(row, col){
	console.log(row + ', '+ col);
	var imgId = col * 6 + row;
	selectedImg = imgId;
	image(img[imgId], 200, 84, 400, 397)
}

function mousePressed() {
	switch(step) {
	    case 0:
	        step1(); break;
	    case 1:
	        step2(); break;
	    case 2:
	        step3(); break;
	}
}