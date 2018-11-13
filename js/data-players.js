function Player(imgSource) {
	this.image = new Image();
	this.image.src = imgSource;
	this.x = 250;
	this.y = 305;
	this.frameIndex = 0;
	this.animationIndex = 0;
	this.yVelocity = 0;
	this.jumpForce = 10;
	this.held = null;
};

Player.width = 25;
Player.hitboxWidth = 6;
Player.height = 54;
Player.speed = 3;


// players
var playerOne = new Player("graphics/sprite-sheet-p1.png");
// var playerTwo = new Player("");