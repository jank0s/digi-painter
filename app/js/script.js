function init() {
	var stage = new createjs.Stage("paintCanvas");
	var image = new createjs.Bitmap("images/1.BMP");
	image.x = 0; 
	image.y = 0; 
	image.visible = true;
	stage.addChild(image);

	var shape, oldX, oldY, size, color;

	shape = new createjs.Shape();
	stage.addChild(shape);
			
	// set up our defaults:
	color = "#0FF";
	size = 10;
			
	// add handler for stage mouse events:
	stage.on("stagemousedown", function(event) {
		oldX = evt.stageX;
		oldY = evt.stageY;
	})     

	//stage.on("stagemouseup", function(event) {
	//	color = createjs.Graphics.getHSL(Math.random()*360, 100, 50);
	//	size = 2;
	//})
			 
			
	stage.on("pressmove",function(evt) {
		if (oldX) {
			shape.graphics.beginStroke(color)
			.setStrokeStyle(size, "round")
			.moveTo(oldX, oldY)
			.lineTo(evt.stageX, evt.stageY);
			stage.update();
		}
		oldX = evt.stageX;
		oldY = evt.stageY;
	})

	stage.update();
}