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
var getPressed = false;
var dropPressed = false;

var puzzleOneSolved = false;


// game settings
var fps = 60;
var gravity = 1;


// classes
function Tile() {
	//tbd
};

function CosmicCube(frameNum) {
	this.currentFrame = frameNum;
	this.x = 0;
	this.y = 0;
	this.animated = false;
	this.moveable = true;
};

CosmicCube.source = "graphics/sprite-sheet-tiles.png";
CosmicCube.width = 31;
CosmicCube.height = 31;
CosmicCube.animationFrames = 4;
CosmicCube.image = new Image();
CosmicCube.image.src = CosmicCube.source;

function GravityCube() {
	this.x = 0;
	this.y = 0;
};

GravityCube.sx = 0;
GravityCube.sy = 20;

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


// data variables
var arena = {
	border: 2,
	columns: 15,
	rows: 12,
	columnWidth: CosmicCube.width + 1,
	rowHeight: CosmicCube.height + 1,
	tiles: [ // 1 = cosmic cube, 0 = nothing
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
		[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	],
};

var puzzle1 = {
	tiles: [ // 1 = cosmic cube, 0 = nothing
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
		[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
		[1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
		[1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
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
		//case 16: runPressed = true; break;
		case 90: runPressed = true; break;
		case 88: getPressed = true; break;
		case 67: dropPressed = true; break;
	};
};

function keyUpHandler(event) {
	switch(event.keyCode) {
		case 39: rightPressed = false; break;
		case 37: leftPressed = false; break;
		case 40: downPressed = false; break;
		case 38: upPressed = false; break;
		//case 16: runPressed = false; break;
		case 90: runPressed = false; break;
		case 88: getPressed = false; break;
		case 67: dropPressed = false; break;
	};
	elapsedFramesMovement = 0;
};


// arena functions
function drawCube(cosmicCube, dx, dy) {
	if(cosmicCube.animated && timeElapsed(100)) {
		cosmicCube.currentFrame = Math.floor(Math.random() * CosmicCube.animationFrames);
	};
	var sx = CosmicCube.width * cosmicCube.currentFrame;
	var sy = 0;
	ctxt.drawImage(CosmicCube.image, sx, sy, CosmicCube.width, CosmicCube.height, dx, dy, CosmicCube.width, CosmicCube.height);
};

function drawArena() {
	if(!puzzleOneSolved) {
		arena.tiles = puzzle1.tiles;
	}
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

function updateTileMap() { // changes 1 to CosmicCube and 0 to null and etc
	maps = [arena.tiles, puzzle1.tiles];
	for(var i = 0; i < maps.length; i++) {
		map = maps[i];
		for(var r = 0; r < map.length; r++) {
			var row = map[r];
			for(var c = 0; c < row.length; c++) {
				var currentTile = map[r][c];
				if(currentTile == 1) {
					map[r][c] = new CosmicCube(0);
					map[r][c].animated = true;
				}
				else if(currentTile == 0) {
					map[r][c] = null;
				}
				else if(currentTile == 2) {
					randomFrame = Math.floor(Math.random() * CosmicCube.animationFrames);
					map[r][c] = new CosmicCube(randomFrame);
					map[r][c].x = c * arena.columnWidth;
					map[r][c].y = r * arena.rowHeight;
				}
				else if(currentTile == 5) {
					map[r][c] = new GravityCube();
				};
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
	player.x = checkLeft(player);
};

function movePlayerRight(player, speed) {
	player.animationIndex = 1;
	player.x += speed;
	player.x = checkRight(player);
};

function isOnGround(player) {
	var xIndexMin = Math.floor(player.x / arena.columnWidth);
	var xIndexMax = Math.floor((player.x + Player.width) / arena.columnWidth);
	var yIndex = Math.floor((player.y + Player.height + 1) / arena.rowHeight);
	for(var xIndex = xIndexMin; xIndex <= xIndexMax; xIndex++) {
		var currentTile = arena.tiles[yIndex][xIndex];
		if(currentTile !== null) {
			return true;
		};
	};
	return false;
};

function checkLeft(player) {
	var xIndex = Math.floor(player.x / arena.columnWidth);
	var yIndexMin = Math.floor(player.y / arena.rowHeight);
	var yIndexMax = Math.floor((player.y + Player.height) / arena.rowHeight);
	var xPos = player.x;
	for(var yIndex = yIndexMin; yIndex <= yIndexMax; yIndex++) {
		var currentTile = arena.tiles[yIndex][xIndex];
		if(currentTile !== null) {
			xPos = xIndex * arena.columnWidth + arena.columnWidth + 1;
			break;
		};
	};
	return xPos;
};

function checkRight(player) {
	var xIndex = Math.floor((player.x + Player.width) / arena.columnWidth);
	var yIndexMin = Math.floor(player.y / arena.rowHeight);
	var yIndexMax = Math.floor((player.y + Player.height) / arena.rowHeight);
	var xPos = player.x;
	for(var yIndex = yIndexMin; yIndex <= yIndexMax; yIndex++) {
		var currentTile = arena.tiles[yIndex][xIndex];
		if(currentTile !== null) {
			xPos = (xIndex * arena.columnWidth) - Player.width - 1;
			break;
		};
	};
	return xPos;
};

function checkDown(player) {
	var xIndexMin = Math.floor(player.x / arena.columnWidth);
	var xIndexMax = Math.floor((player.x + Player.width) / arena.columnWidth);
	var yIndex = Math.floor((player.y + Player.height) / arena.rowHeight);
	for(var xIndex = xIndexMin; xIndex <= xIndexMax; xIndex++) {
		var currentTile = arena.tiles[yIndex][xIndex];
		if(currentTile !== null) {
			player.y = (yIndex * arena.rowHeight) - Player.height - 1;
			player.yVelocity = 0;
			break;
		};
	};
};

function checkUp(player) {
	var xIndexMin = Math.floor(player.x / arena.columnWidth);
	var xIndexMax = Math.floor((player.x + Player.width) / arena.columnWidth);
	var yIndex = Math.floor(player.y / arena.rowHeight);
	for(var xIndex = xIndexMin; xIndex <= xIndexMax; xIndex++) {
		var currentTile = arena.tiles[yIndex][xIndex];
		if(currentTile !== null) {
			player.y = yIndex * arena.rowHeight + arena.rowHeight + 1;
			player.yVelocity = 0;
			break;
		};
	};
};

function updatePlayer(player) {
	var topBoundary = arena.border * arena.rowHeight;
	
	var animationSpeed = 100;
	var currentSpeed = Player.speed;
	if(runPressed){
		currentSpeed += Player.speed / 2;
		animationSpeed /= 2;
	};
	currentSpeed = Math.round(currentSpeed);
	
	if(isOnGround(player)) {
		player.yVelocity = 0;
		if(upPressed) {
			player.yVelocity -= player.jumpForce;
		};
		if(getPressed && player.held == null) {
			var xCenter = player.x + Math.floor(Player.width / 2);
			var yIndex = Math.floor((player.y + Player.height + 1) / arena.rowHeight);
			var xIndex = Math.floor(xCenter / arena.columnWidth);
			var currentTile = arena.tiles[yIndex][xIndex];
			if(currentTile.moveable) {
				player.held = currentTile;
				arena.tiles[yIndex][xIndex] = null;
			};
		};
		if(dropPressed && player.held != null) {
			var xCenter = player.x + Math.floor(Player.width / 2);
			var yIndex = Math.floor((player.y + Player.height + 1) / arena.rowHeight) - 1;
			var xIndex = Math.floor(xCenter / arena.columnWidth);
			arena.tiles[yIndex][xIndex] = player.held;
			player.held = null;
		};
	};
	
	player.y += player.yVelocity;
	if(player.yVelocity < 0) { // if rising
		checkUp(player);
	} else if(player.yVelocity > 0) { // if falling
		checkDown(player);
	};
	
	if(!isOnGround(player)) {
		player.yVelocity += gravity;
	};
	
	var playerMoving = leftPressed || rightPressed;
	if(playerMoving) { 
		animatePlayer(player, animationSpeed);
	};
	
	if(rightPressed) {movePlayerRight(player, currentSpeed);} 
	else if(leftPressed) {movePlayerLeft(player, currentSpeed);}
	else { player.frameIndex = 0;};
};

function debug() {
	$("#debug").show();
	if(leftPressed) $("#leftPressed").show(); else $("#leftPressed").hide();
	if(rightPressed) $("#rightPressed").show(); else $("#rightPressed").hide();
	if(upPressed) $("#jumpPressed").show(); else $("#jumpPressed").hide();
	if(runPressed) $("#runPressed").show(); else $("#runPressed").hide();
}

// primary functions
function playGame() {
	setTimeout(function() {
		requestAnimationFrame(playGame);
		ctxt.clearRect(0, 0, canvas.width, canvas.height);
		
		debug();
		
		drawArena();
		updatePlayer(playerOne);
		drawPlayer(playerOne);
		
		elapsedFrames = (elapsedFrames + 1) % fps;
	}, 1000 / fps);
};

// begin the game

updateTileMap();

playGame();