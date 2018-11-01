// start our canvas
var canvas = document.getElementById("main");
var ctxt = canvas.getContext("2d");


// listeners
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false)


// tracking variables
var elapsedFrames = 0;
var elapsedFramesMovement = 0;

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var runPressed = false;


// game settings
var fps = 60;
var playerSpeed = 3;
var gravity = 1;


// classes
function CosmicCube(frameNum) {
	this.currentFrame = frameNum;
	// this.x = 0;
	// this.y = 0;
};

CosmicCube.source = "graphics/sprite-sheet-tiles.png";
CosmicCube.width = 19;
CosmicCube.height = 19;
CosmicCube.animationFrames = 4;
CosmicCube.image = new Image();
CosmicCube.image.src = CosmicCube.source;

function Player(imgSource) {
	this.image = new Image();
	this.image.src = imgSource;
	this.x = 200;
	this.y = 305;
	this.frameIndex = 1;
	this.animationIndex = 0;
	this.yVelocity = 0;
	this.jumpForce = 10;
};

Player.width = 25;
Player.height = 54;


// players
var playerOne = new Player("graphics/sprite-sheet-p1.png");
// var playerTwo = new Player("");


// data variables
var arena = {
	border: 2,
	columns: 25,
	rows: 20,
	columnWidth: CosmicCube.width + 1,
	rowHeight: CosmicCube.height + 1,
	tiles: [ // 1 = cosmic cube, 0 = nothing
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
		[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
		[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
		[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
		[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
		[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
		[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
		[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
		[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
		[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
		[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
		[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
		[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
		[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
		[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
		[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	],
};

// end of variables

// beginning of function library

// misc helper functions
function timeElapsed(ms) {
	// timeElapsed only supports even divisors of 1000
	var animationRate = 1000 / ms;
	return elapsedFrames % (fps / animationRate) == 0;
};

function timeElapsedMovement(ms) {
	// timeElapsedMovement only supports even divisors of 1000
	var animationRate = 1000 / ms;
	return elapsedFramesMovement % (fps / animationRate) == 0;
};

function keyDownHandler(event) {
	switch(event.keyCode) {
		case 39: rightPressed = true; break;
		case 37: leftPressed = true; break;
		case 40: downPressed = true; break;
		case 38: upPressed = true; break;
		case 16: runPressed = true; break;
	};
};

function keyUpHandler(event) {
	switch(event.keyCode) {
		case 39: rightPressed = false; break;
		case 37: leftPressed = false; break;
		case 40: downPressed = false; break;
		case 38: upPressed = false; break;
		case 16: runPressed = false; break;
	};
	elapsedFramesMovement = 0;
};


// arena functions
function drawCube(cosmicCube, dx, dy) {
	if(timeElapsed(100)) {
		cosmicCube.currentFrame = Math.floor(Math.random() * CosmicCube.animationFrames);
	};
	var sx = CosmicCube.width * cosmicCube.currentFrame;
	var sy = 0;
	ctxt.drawImage(CosmicCube.image, sx, sy, CosmicCube.width, CosmicCube.height, dx, dy, CosmicCube.width, CosmicCube.height);
};

function drawArena() {
	for(var r = 0; r < arena.tiles.length; r++) {
		var row = arena.tiles[r];
		for(var c = 0; c < row.length; c++) {
			var currentTile = arena.tiles[r][c];
			if(currentTile instanceof CosmicCube) {
				var cosmicCube = currentTile;
				x = c * arena.columnWidth;
				y = r * arena.rowHeight;
				drawCube(cosmicCube, x, y);
			};
		};
	};
};

function updateTileMap() { // changes 1 to CosmicCube and 0 to null in arena.tiles
	for(var r = 0; r < arena.tiles.length; r++) {
		var row = arena.tiles[r];
		for(var c = 0; c < row.length; c++) {
			var currentTile = arena.tiles[r][c];
			if(currentTile == 1) {
				arena.tiles[r][c] = new CosmicCube(0);
			}
			else {
				arena.tiles[r][c] = null;
			};
		};
	};
};


// player functions
function drawPlayer(player) {
	var sx = player.frameIndex * Player.width;
	var sy = player.animationIndex * Player.height;
	ctxt.drawImage(player.image, sx, sy, Player.width, Player.height, player.x, player.y, Player.width, Player.height);
};

function animatePlayer(player, animationSpeed) {
	if(elapsedFramesMovement++ == 0) {
		player.frameIndex = 0;
	} else if(timeElapsedMovement(animationSpeed)) {
		player.frameIndex = (player.frameIndex + 1) % (player.image.width / Player.width);
	};
};

function movePlayerLeft(player, speed) {
	player.animationIndex = 0;
	player.x -= speed;
	var leftBoundary = arena.border * arena.columnWidth;
	if(player.x < leftBoundary) {
		player.x = leftBoundary;
	};
};

function movePlayerRight(player, speed) {
	player.animationIndex = 1;
	player.x += speed;
	var rightBoundary = canvas.width - (arena.border * arena.columnWidth);
	if((player.x + Player.width) > rightBoundary) {
		player.x = rightBoundary - Player.width;
	}
};

function isOnGround(player, bottomBoundary) {
	return (player.y + Player.height) == bottomBoundary;
};

function updatePlayer(player) {
	var bottomBoundary = canvas.height - (arena.border * arena.rowHeight);
	var topBoundary = arena.border * arena.rowHeight;
	
	var animationSpeed = 100;
	var currentSpeed = playerSpeed;
	if(runPressed){
		currentSpeed += playerSpeed / 2;
		animationSpeed /= 2;
	};
	currentSpeed = Math.round(currentSpeed);
	
	if(isOnGround(player, bottomBoundary)) {
		if(upPressed) {
			player.yVelocity -= player.jumpForce;
		};
	};
	
	player.y += player.yVelocity;
	
	if((player.y + Player.height) > bottomBoundary) {
		player.y = bottomBoundary - Player.height;
		player.yVelocity = 0;
	};
	
	if(player.y < topBoundary) {
		player.y = topBoundary;
		player.yVelocity = 0;
	};
	
	if(!isOnGround(player, bottomBoundary)) {
		player.yVelocity += gravity;
	};
	
	var playerMoving = leftPressed || rightPressed;
	if(playerMoving) { 
		animatePlayer(player, animationSpeed);
	};
	
	if(rightPressed) {movePlayerRight(player, currentSpeed);} 
	else if(leftPressed) {movePlayerLeft(player, currentSpeed);}
	else { player.frameIndex = 1;};
	
	console.log("yVelocity = " + player.yVelocity + ", y = " + player.y);
};


// primary functions
function playGame() {
	setTimeout(function() {
		requestAnimationFrame(playGame);
		ctxt.clearRect(0, 0, canvas.width, canvas.height);
		
		drawArena();
		updatePlayer(playerOne);
		drawPlayer(playerOne);
		
		elapsedFrames = (elapsedFrames + 1) % fps;
	}, 1000 / fps);
};

// begin the game

updateTileMap();

playGame();