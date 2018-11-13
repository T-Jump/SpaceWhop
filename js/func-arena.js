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