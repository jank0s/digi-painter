var d

var headingImg;
var infoImg;
var backImg;
var xImg;
var selectImg;
var workImg;
var img = new Array();
var sound = new Array();

var step = 0;
var selectedImg = -1;

var selectedColor;

var img1;
var img2;
var img3;

function preload() {
	headingImg = loadImage('assets/naslov.png');
	infoImg = loadImage('assets/info.png');
	selectImg = loadImage('assets/izbira.png');
	workImg = loadImage('assets/delovna.png');
	backImg = loadImage('assets/back.png');
	xImg = loadImage('assets/x.png');
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
	d = pixelDensity();
	console.log(d);

	noLoop();
	drawStep0();
}

function draw() {

}

function drawStep0(){
	step = 0;
	image(headingImg, 0, 0);
}

function mouseStep0(){
	drawStep1();
}

function drawStep1(){
	step = 1;
	image(infoImg, 0, 0);
}

function mouseStep1(){
	drawStep2();
}

function drawStep2(){
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

function mouseStep2(){
	if(mouseY < 67){
		if(mouseX > 604 && mouseX < 668){
			drawStep0();
		}
	}else if(mouseY > 84 && mouseY < 482 && mouseX > 5){
		var row = ((mouseY - 84) / 67) >> 0;
		if(mouseX < 196){
			var col = ((mouseX - 6) / 65) >> 0;
			selectPhoto(row, col);
		}else if(mouseX > 200 && mouseX < 601){
			if(selectedImg > -1){
				drawStep3();
			}
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

function drawStep3(){
	step = 3;
	image(workImg, 0, 0);
	image(backImg, 128, 84, 63, 63);
	image(img[selectedImg], 200, 84, 400, 397)
}

function mouseStep3(){
	if(mouseX > 200 && mouseX < 601 && mouseY > 282 && mouseY < 482){
		selectColor();
		drawStep4();
	}else if(mouseX > 128 && mouseX < 192 && mouseY > 84 && mouseY < 147){
		drawStep2();
	}
}

function selectColor(){
	var c = get(mouseX, mouseY);
	selectedColor = color(red(c), green(c), blue(c), 100);
}

function drawStep4(){
	step = 4;
	image(workImg, 0, 0);
	image(backImg, 128, 84, 63, 63);
	image(img[selectedImg], 200, 84, 400, 397);
	image(xImg, 610, 84, 63, 63);
	fill(selectedColor);
	//fill(red(selectedColor), green(selectedColor), blue(selectedColor), 20);
	noStroke();
	rectMode(CENTER);
}

function mouseStep4(){
	if(mouseX > 128 && mouseX < 192 && mouseY > 84 && mouseY < 147){
		drawStep3();
	}else if(mouseX > 610 && mouseX < 673 && mouseY > 84 && mouseY < 147){
		img1 = capture(200, 84, 400, 397);
		drawStep5();
	}
}

function dragStep4(){
	if(mouseX > 200 + 13 && mouseX < 601 - 13 && mouseY > 282 + 13 && mouseY < 482 - 13){
		paint();
	}
}

function drawStep5(){
	step = 5;
	image(workImg, 0, 0);
	image(backImg, 128, 84, 63, 63);
	image(img1, 200, 84, 400, 397);
	image(img1, 610, 84, 63, 63);
}

function mouseStep5(){
	if(mouseX > 200 && mouseX < 601 && mouseY > 84 && mouseY < 284){
		selectColor();
		drawStep6();
	}else if(mouseX > 128 && mouseX < 192 && mouseY > 84 && mouseY < 147){
		drawStep4();
		image(img1, 200, 84, 400, 397);
	}
}

function drawStep6(){
	step = 6;
	image(xImg, 610, 152, 63, 63);
	fill(selectedColor);
	//fill(red(selectedColor), green(selectedColor), blue(selectedColor), 20);
	noStroke();
	rectMode(CENTER);
}

function mouseStep6(){
	if(mouseX > 128 && mouseX < 192 && mouseY > 84 && mouseY < 147){
		drawStep5();
	}else if(mouseX > 610 && mouseX < 673 && mouseY > 152 && mouseY < 215){
		img2 = capture(200, 84, 400, 397);
		drawStep7();
	}
}

function dragStep6(){
	if(mouseX > 200 + 13 && mouseX < 601 - 13 && mouseY > 84 + 13 && mouseY < 284 - 13){
		paint();
	}
}

function drawStep7(){
	step = 7;
	image(img2, 610, 152, 63, 63);
}

function mouseStep7(){
	if(mouseX > 128 && mouseX < 192 && mouseY > 84 && mouseY < 147){
		drawStep6();
	}else if(mouseX > 610 && mouseX < 673 && mouseY > 152 && mouseY < 215){
		img3 = capture(200, 84, 400, 397);
		drawStep8();
	}
}

function drawStep8(){
	
}

function paint(){
	rect(mouseX, mouseY, 25, 25);
}

function capture(x, y, w, h){
	var img = createImage(w , h);
	img.loadPixels();
	loadPixels();
	for (i = 0; i < w; i++) {
		for (j = 0; j < h; j++) {
			//get canvas pixel index
			var off = ( (j + y) * d * width + (i + x) ) * d * 4;
			//get img pixel index
			var offImg = ( j * w + i ) * 4;
			//copy canvas pixel to img pixel
			img.pixels[offImg] = pixels[off];
			img.pixels[offImg + 1] = pixels[off + 1];
			img.pixels[offImg + 2] = pixels[off + 2];
			img.pixels[offImg + 3] = pixels[off + 3];
			//img.set(i, j, color(pixels[off], pixels[off+1], pixels[off+2], pixels[off+3]));
	 	}
	}
	img.updatePixels();
	return img;
}

function mouseDragged() {
	switch(step) {
	    case 4:
	    	dragStep4(); break;
	    case 6:
	    	dragStep6(); break;
	}
	return false;
}

function mousePressed() {
	switch(step) {
	    case 0:
	        mouseStep0(); break;
	    case 1:
	        mouseStep1(); break;
	    case 2:
	        mouseStep2(); break;
	    case 3:
	    	mouseStep3(); break;
	    case 4:
	    	mouseStep4(); break;
	    case 5:
	    	mouseStep5(); break;
	    case 6:
	    	mouseStep6(); break;
	    case 7:
	    	mouseStep7(); break;
	}
}