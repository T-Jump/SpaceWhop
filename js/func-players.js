

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

function getCurrentTile(player) {
	// tbd
};

function getTileBelow(player) {
	// tbd
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