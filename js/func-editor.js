var showGrid = false;

function prepareGrid() {
	var boxWidth = arena.columnWidth;
	var boxHeight = arena.rowHeight;
	
	ctxt.moveTo(0,0);
	ctxt.lineTo(canvas.width, 0);
	ctxt.lineTo(canvas.width, canvas.height);
	ctxt.lineTo(0, canvas.height);
	ctxt.lineTo(0,0);
	
	for (var xIndex = 0; xIndex < arena.columns; xIndex++) {
		var leftX = (xIndex * boxWidth) + 0.5;
		var rightX = (leftX + boxWidth);
		for (var yIndex = 0; yIndex < arena.rows; yIndex++) {
			topY = (yIndex * boxHeight) + 0.5;
			bottomY = (topY + boxHeight);
			ctxt.moveTo(rightX, topY);
			ctxt.lineTo(rightX, bottomY);
			ctxt.lineTo(leftX, bottomY);
		};
	};
};

function drawGrid() {
	ctxt.lineWidth = 1;
	ctxt.strokeStyle = "white";
	ctxt.stroke();
};

function editGame() {
	setTimeout(function() {
		requestAnimationFrame(editGame);
		ctxt.clearRect(0, 0, canvas.width, canvas.height);
		
		debug();
		
		drawArena();
		if(showGrid) drawGrid();
		// updatePlayer(playerOne);
		// drawPlayer(playerOne);
		
		elapsedFrames = (elapsedFrames + 1) % fps;
	}, 1000 / fps);
};

// begin the game

prepareGrid();
updateTileMap();

editGame();