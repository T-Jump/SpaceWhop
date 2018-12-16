function Enemy() {
	this.dx = 0;
	this.dy = 0;
	this.sx = 0;
	this.sy = 0;
	this.width = 0;
	this.height = 0;
	this.hitboxWidth = 3;
	this.travelRange = 3;
	this.speed = 3;
	this.jumpForce = 10;
};

Enemy.image = new Image();
Enemy.image.src = "graphics/sprite-sheet-enemies.png";
Enemy.animationFrames = 4;