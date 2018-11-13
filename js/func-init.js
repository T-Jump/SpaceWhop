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