function playGame() {
	setTimeout(function() {
		requestAnimationFrame(playGame);
		ctxt.clearRect(0, 0, canvas.width, canvas.height);
		
		updatePlayer(playerOne);
		updateCamera(playerOne);
		drawArena();
		drawPlayer(playerOne);
		
		elapsedFrames = (elapsedFrames + 1) % fps;
	}, 1000 / fps);
};

// begin the game

updateTileMap();

playGame();