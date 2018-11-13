document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false)


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