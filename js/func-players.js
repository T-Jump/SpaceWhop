

function drawPlayer(player) {
	var sx = player.frameIndex * Player.width;
	var sy = player.animationIndex * Player.height;
	var dx = player.x - camera.x;
	var dy = player.y - camera.y;
	ctxt.drawImage(player.image, sx, sy, Player.width, Player.height, dx, dy, Player.width, Player.height);
};

function animatePlayer(player, animationSpeed) {
	if(elapsedFramesMovement++ == 0) {
		player.frameIndex = 1;
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

function movePlayerUp(player) {
	player.yVelocity -= player.jumpForce;
};

function movePlayerDown(player) {
	player.yVelocity += gravity;
};

function getPlayerPos(player) {
	var playerPos = {
		xIndexMin: Math.floor(player.x / arena.columnWidth),
		xIndexMax: Math.floor((player.x + Player.width) / arena.columnWidth),
		yIndexMin: Math.floor(player.y / arena.rowHeight),
		yIndexMax: Math.floor((player.y + Player.height) / arena.rowHeight)
	};
	return playerPos;
};

function isOnGround(player) {
	var playerPos = getPlayerPos(player);
	var xIndexMin = playerPos.xIndexMin;
	var xIndexMax = playerPos.xIndexMax;
	//var yIndex = playerPos.yIndexMax;
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
	var playerPos = getPlayerPos(player);
	var xIndex = playerPos.xIndexMin;
	var yIndexMin = playerPos.yIndexMin;
	var yIndexMax = playerPos.yIndexMax;
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
	var playerPos = getPlayerPos(player);
	var xIndex = playerPos.xIndexMax;;
	var yIndexMin = playerPos.yIndexMin;
	var yIndexMax = playerPos.yIndexMax;
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
	var playerPos = getPlayerPos(player);
	var xIndexMin = playerPos.xIndexMin;
	var xIndexMax = playerPos.xIndexMax;
	var yIndex = playerPos.yIndexMax;
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
	var playerPos = getPlayerPos(player);
	var xIndexMin = playerPos.xIndexMin;
	var xIndexMax = playerPos.xIndexMax;
	var yIndex = playerPos.yIndexMin;
	for(var xIndex = xIndexMin; xIndex <= xIndexMax; xIndex++) {
		var currentTile = arena.tiles[yIndex][xIndex];
		if(currentTile !== null) {
			player.y = yIndex * arena.rowHeight + arena.rowHeight + 1;
			player.yVelocity = 0;
			break;
		};
	};
};

function getBlock(player) {
	var xCenter = player.x + Math.floor(Player.width / 2);
	var yIndex = Math.floor((player.y + Player.height + 1) / arena.rowHeight);
	var xIndex = Math.floor(xCenter / arena.columnWidth);
	var currentTile = arena.tiles[yIndex][xIndex];
	if(currentTile.moveable) {
		player.held = currentTile;
		arena.tiles[yIndex][xIndex] = null;
	};
};

function dropBlock(player) {
	var xCenter = player.x + Math.floor(Player.width / 2);
	var yIndex = Math.floor((player.y + Player.height + 1) / arena.rowHeight) - 1;
	var xIndex = Math.floor(xCenter / arena.columnWidth);
	arena.tiles[yIndex][xIndex] = player.held;
	player.held = null;
};

function throwBlock(player) {
	// tbd
};

function updatePlayer(player) {
	var topBoundary = arena.rowHeight;
	
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
			movePlayerUp(player);
		};
		if(getPressed && player.held == null) {
			getBlock(player);
		};
		if(dropPressed && player.held != null) {
			dropBlock(player);
		};
	};
	
	player.y += player.yVelocity;
	if(player.yVelocity < 0) { // if rising
		checkUp(player);
	} else if(player.yVelocity > 0) { // if falling
		checkDown(player);
	};
	
	if(!isOnGround(player)) {
		movePlayerDown(player);
	};
	
	var playerMoving = leftPressed || rightPressed;
	if(playerMoving) { 
		animatePlayer(player, animationSpeed);
	};
	
	if(rightPressed) {movePlayerRight(player, currentSpeed);} 
	else if(leftPressed) {movePlayerLeft(player, currentSpeed);}
	else { player.frameIndex = 0;};
};