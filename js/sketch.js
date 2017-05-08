var canvas;
var d;
var canvasWidth;
var canvasHeight;
var scl;

var headingImg;
var infoImg;
var backImg;
var xImg;
var selectImg;
var workImg;
var img = new Array();
var sound = new Array();
var conceptImg;
var printImg;

var step = 0;
var selectedImg = -1;

var selectedColor1;
var selectedColor2;
var selectedColor3;

var img1;
var img2;
var img3;

var input;
var sig;

var released = true;

var pX = -1;
var pY = -1;
var pT = -1;
var distance = 0;
var pDY = -1;

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
		//sound[i].playMode('restart');
	}
	conceptImg = loadImage('assets/concept.png');
	printImg = loadImage('assets/print.png');
}

function setup() {
	canvas = createCanvas(800, 600);
	canvas.parent('sketch-holder');
	d = pixelDensity();
	//console.log(d);

	noLoop();
	drawStep0();
	zoomCanvas();
}

function draw() {

}

function drawStep0(){
	step = 0;
	image(headingImg, 0, 0);
	for(i = 0; i < 4; i++){
		if(sound[i].isPlaying()){
			sound[i].stop();
		}
	}
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
	textAlign(CENTER);
	rectMode(CORNER);
	fill(0);
	textSize(22);
	text("Izberi eno izmed majhnih slik in izbiro potrdi s pritiskom na osrendji kvadrat", 220, 5, 360, 150);
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
	//console.log(row + ', '+ col);
	var imgId = col * 6 + row;
	selectedImg = imgId;
	image(img[imgId], 200, 84, 400, 397)
}

function drawStep3(){
	step = 3;
	image(workImg, 0, 0);
	textAlign(CENTER);
	rectMode(CORNER);
	fill(0);
	textSize(22);
	text("Izberi barvo na spodnji polovici slike", 220, 25, 360, 150);
	image(backImg, 128, 84, 63, 63);
	image(img[selectedImg], 200, 84, 400, 397)
}

function mouseStep3(){
	if(mouseX > 200 && mouseX < 601 && mouseY > 282 && mouseY < 482){
		selectedColor1 = selectColor();
		drawStep4();
	}else if(mouseX > 128 && mouseX < 192 && mouseY > 84 && mouseY < 147){
		drawStep2();
	}
}

function selectColor(){
	var c = get(mouseX, mouseY);
	return color(red(c), green(c), blue(c), 12);
}

function drawStep4(){
	step = 4;
	image(workImg, 0, 0);
	textAlign(CENTER);
	rectMode(CORNER);
	fill(0);
	textSize(22);
	text("Z njo prekrij spodnjo polovico slike", 220, 25, 360, 150);
	image(backImg, 128, 84, 63, 63);
	image(img[selectedImg], 200, 84, 400, 397);
	image(xImg, 610, 84, 63, 63);
	fill(selectedColor1);
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
	textAlign(CENTER);
	rectMode(CORNER);
	fill(0);
	textSize(22);
	text("Izberi barvo na zgornji polovici slike", 220, 25, 360, 150);
	image(backImg, 128, 84, 63, 63);
	image(img1, 200, 84, 400, 397);
	image(img1, 610, 84, 63, 63);
}

function mouseStep5(){
	if(mouseX > 200 && mouseX < 601 && mouseY > 84 && mouseY < 284){
		selectedColor2 = selectColor();
		drawStep6();
	}else if(mouseX > 128 && mouseX < 192 && mouseY > 84 && mouseY < 147){
		drawStep4();
		image(img1, 200, 84, 400, 397);
	}
}

function drawStep6(){
	step = 6;
	image(workImg, 0, 0);
	textAlign(CENTER);
	rectMode(CORNER);
	fill(0);
	textSize(22);
	text("Prekrij zgornjo polovico z izbrano barvo", 220, 15, 360, 150);
	image(backImg, 128, 84, 63, 63);
	image(img1, 200, 84, 400, 397);
	image(img1, 610, 84, 63, 63);
	image(xImg, 610, 152, 63, 63);
	fill(selectedColor2);
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
	image(workImg, 0, 0);
	textAlign(CENTER);
	rectMode(CORNER);
	fill(0);
	textSize(22);
	text("Zmešaj barve na polovici slike", 220, 25, 360, 150);
	image(backImg, 128, 84, 63, 63);
	image(img2, 200, 84, 400, 397);
	image(img1, 610, 84, 63, 63);
	image(img2, 610, 152, 63, 63);
}

function mouseStep7(){
	if(mouseX > 200 && mouseX < 601 && mouseY > 184 && mouseY < 383){
		selectedColor3 = selectColor();
		drawStep8();
	}else if(mouseX > 128 && mouseX < 192 && mouseY > 84 && mouseY < 147){
		drawStep6();
		image(img2, 200, 84, 400, 397);
	}
}

function drawStep8(){
	step = 8;
	image(workImg, 0, 0);
	textAlign(CENTER);
	rectMode(CORNER);
	fill(0);
	textSize(22);
	text("Zmešaj barve na polovici slike", 220, 25, 360, 150);
	image(backImg, 128, 84, 63, 63);
	image(img1, 610, 84, 63, 63);
	image(img2, 610, 152, 63, 63);
	image(xImg, 610, 220, 63, 63);
	image(img2, 200, 84, 400, 397);
	fill(selectedColor3);
	noStroke();
	rectMode(CENTER);
}

function mouseStep8(){
	pX = mouseX;
	pY = mouseY;
	pT = new Date().getTime();
	distance = 0;
	selectedColor3 = selectColor();
	if(mouseX > 128 && mouseX < 192 && mouseY > 84 && mouseY < 147){
		drawStep7();
	}else if(mouseX > 610 && mouseX < 673 && mouseY > 220 && mouseY < 283){
		img3 = capture(200, 84, 400, 397);
		drawStep9();
	}
}

function dragStep8(){
	if(mouseX > 200 + 13 && mouseX < 601 - 13 && mouseY > 184 + 13 && mouseY < 383 - 13){
		mixPaint();
	}
}

function drawStep9(){
	step = 9;

	image(workImg, 0, 0);
	textAlign(CENTER);
	rectMode(CORNER);
	fill(0);
	textSize(22);
	text("Podpiši sliko", 220, 25, 360, 150);
	image(backImg, 128, 84, 63, 63);
	image(img1, 610, 84, 63, 63);
	image(img2, 610, 152, 63, 63);
	image(img3, 610, 220, 63, 63);
	image(xImg, 610, 288, 63, 63);
	image(img3, 200, 84, 400, 397);

	fill(239, 235, 221);
	stroke(255);
	rect(200, 84, 400, 470);
	input = createInput();
	placeInput();
	placeInput();
}

function placeInput(){
	var offX = canvas.canvas.offsetLeft;
	var offY = canvas.canvas.offsetTop;
	var x = offX + 255 * scl;
	var y = offY + 109 * scl;
	input.style('width', 290 * scl + 'px');
	input.style('height', 35 * scl + 'px');
	input.style('font-size', 25 * scl + 'px');
	input.position(x, y);
}


function mouseStep9(){
	if(mouseX > 128 && mouseX < 192 && mouseY > 84 && mouseY < 147){
		input.remove();
		drawStep8();
		image(img3, 200, 84, 400, 397);
	}else if(mouseX > 610 && mouseX < 673 && mouseY > 288 && mouseY < 351){
		sig = input.value();
		input.remove();
		drawStep10();
	}
}

function drawStep10(){
	step = 10;
	image(workImg, 0, 0);
	image(printImg, 128, 84, 63, 63);
	textAlign(CENTER);
	rectMode(CORNER);
	fill(0);
	noStroke();
	textSize(22);
	text("Dotakni se slike, da jo spremeniš v sivino", 220, 15, 360, 150);
	image(img3, 200, 84, 400, 397);
	image(img1, 610, 84, 63, 63);
	image(img2, 610, 152, 63, 63);
	image(img3, 610, 220, 63, 63);
}

function mouseStep10(){
	if(mouseX > 128 && mouseX < 192 && mouseY > 84 && mouseY < 147){
		printImage();
	}else if(mouseX > 200 && mouseX < 601 && mouseY > 84 && mouseY < 485){
		drawStep11();
	}
}

function drawStep11(){
	step = 11;
	image(workImg, 0, 0);
	textAlign(CENTER);
	rectMode(CORNER);
	fill(0);
	textSize(22);
	text("Hvala za sodelovanje", 220, 25, 360, 150);
	noStroke();
	fill(91);
	rectMode(CORNER);
	rect(200, 84, 400, 397);
	image(img1, 610, 84, 63, 63);
	image(img2, 610, 152, 63, 63);
	image(img3, 610, 220, 63, 63);
	rect(610, 288, 63, 63)
	image(xImg, 610, 356, 63, 63);
	image(conceptImg, 200, 481, 400, 100);
}

function mouseStep11(){
	if(mouseX > 610 && mouseX < 673 && mouseY > 356 && mouseY < 419){
		drawStep0();
	}
}

function printImage(){
	var dataUrl = img3.canvas.toDataURL();
	var windowContent = '<!DOCTYPE html>';
    windowContent += '<html>';
    windowContent += '<script type="text/javascript">function pr(){window.print(); window.close();}</script>';
    windowContent += '<body style="text-align: center;">';
    windowContent += '<img src="' + dataUrl + '" onload="pr()">';
    windowContent += '<p>' + sig + '</p>';
    windowContent += '</body>';
    windowContent += '</html>';
    printWin = window.open('','','width=400,height=600');
    printWin.document.open();
    printWin.document.write(windowContent);
    printWin.document.close();
    printWin.focus();
}

function paint(){
	var x = mouseX;
	var y = mouseY;
	//rect(mouseX, mouseY, 25, 25);
	for(i = 30; i > 5; i-=2){
		ellipse(x, y, i, i);
	}
	playSound();
}

function mixPaint(){
	if(pX > 0){
		var dX = pX - mouseX;
		var dY = pY - mouseY;
		var d = (dX * dX + dY * dY);
		var dT = new Date().getTime() - pT;
		var vel = (dX * dX + dY * dY) * 1000 / dT;
		distance = distance + d;

		//console.log(distance);
		//console.log(vel);

		if(dY != 0){
			if(dY * pDY < 0){
				//console.log(dY * pDY);
				//console.log(dY);
				var c;
				if(dY < 0){
					c = get(mouseX, mouseY + 20);
				}else{
					c = get(mouseX, mouseY - 20);
				}
				selectedColor3 = color(red(c), green(c), blue(c), 12);
				distance = 0;
			}
			//save dY
			pDY = dY;
		}
	}

	//var c = get(mouseX, mouseY);
	//fill(lerpColor(selectedColor3, color(red(c), green(c), blue(c), 100), 0.5));
	fill(selectedColor3);
	paint();

	pX = mouseX;
	pY = mouseY;
	pT = new Date().getTime();
}

function playSound(){
	if(released){
		for(i = 0; i < 4; i++){
			if(sound[i].isPlaying()){
				sound[i].stop();
			}
		}
	}
	released = false;

	if(mouseX < 266 || mouseX > 534 || mouseY < 150 || mouseY > 415){
		for(i = 0; i < 4; i++){
			if(sound[i].isPlaying()){
				sound[i].stop();
			}
		}
		//console.log(mouseX);
	}else if(mouseX < 400){
		if(mouseY < 283){
			//sound0
			if(!sound[0].isPlaying()){
				sound[0].play();
			}
			if(sound[1].isPlaying()){
				sound[1].stop();
			}
			if(sound[2].isPlaying()){
				sound[2].stop();
			}
			if(sound[3].isPlaying()){
				sound[3].stop();
			}
		}else{
			//sound2
			if(!sound[2].isPlaying()){
				sound[2].play();
			}
			if(sound[0].isPlaying()){
				sound[0].stop();
			}
			if(sound[1].isPlaying()){
				sound[1].stop();
			}
			if(sound[3].isPlaying()){
				sound[3].stop();
			}
		}
	}else{
		if(mouseY < 283){
			//sound1
			if(!sound[1].isPlaying()){
				sound[1].play();
			}
			if(sound[0].isPlaying()){
				sound[0].stop();
			}
			if(sound[2].isPlaying()){
				sound[2].stop();
			}
			if(sound[3].isPlaying()){
				sound[3].stop();
			}
		}else{
			//sound3
			if(!sound[3].isPlaying()){
				sound[3].play();
			}
			if(sound[0].isPlaying()){
				sound[0].stop();
			}
			if(sound[1].isPlaying()){
				sound[1].stop();
			}
			if(sound[2].isPlaying()){
				sound[2].stop();
			}
		}
	}
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
	    case 8:
	    	dragStep8(); break;
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
	    case 8:
	    	mouseStep8(); break;
	    case 9:
	    	mouseStep9(); break;
	    case 10:
	    	mouseStep10(); break;
	    case 11:
	    	mouseStep11(); break;
	}
}

function windowResized() {
	zoomCanvas();
	switch(step) {
	    case 9:
	    	placeInput(); break;
	}
}

function mouseReleased() {
	released = true;
	pX = -1;
	pY = -1;
	distance = 0;
}

function zoomCanvas() {
	var w = window.innerWidth;
	var h = window.innerHeight;

	canvasWidth = 0;
	canvasHeight = 0;

	if(w / 4 * 3 <= h){
		canvasWidth = w;
		canvasHeight = w / 4 * 3;
	}else{
		canvasHeight = h;
		canvasWidth = h / 3 * 4;
	}
	
	var c = document.getElementById('defaultCanvas0');
	c.style.width = canvasWidth + 'px';
	c.style.height = canvasHeight + 'px';
	//console.log(canvasWidth + ' px');

	scl = canvasWidth / 800;
}
