function drawCube(tile) {
	if(tile.animated && timeElapsed(100)) {
		tile.currentFrame = Math.floor(Math.random() * Tile.animationFrames);
	};
	var sx = Tile.width * tile.currentFrame;
	var sy = tile.sy;
	ctxt.drawImage(Tile.image, sx, sy, Tile.width, Tile.height, tile.dx, tile.dy, Tile.width, Tile.height);
};

function drawArena() {
	for(var r = 0; r < arena.tiles.length; r++) {
		var row = arena.tiles[r];
		for(var c = 0; c < row.length; c++) {
			var currentTile = arena.tiles[r][c];
			if(currentTile instanceof Tile) {
				currentTile.dx = c * arena.columnWidth;
				currentTile.dy = r * arena.rowHeight;
				drawCube(currentTile);
			};
		};
	};
};

function createCosmicCube(tile) {
	tile = new Tile(0);
	tile.sx = 0;
	tile.sy = 0;
	tile.type = "Cosmic Cube";
	tile.animated = true;
	tile.moveable = true;
	tile.destructable = true;
	return tile;
};

function createGraviCube() {
	tile = new Tile(0);
	tile.sx = 0;
	tile.sy = 32;
	tile.type = "Gravi Cube";
	tile.animated = false;
	tile.moveable = false;
	tile.destructable = false;
	return tile;
};

function createBorder(borderType) {
	tile = new Tile(0);
	tile.sx = 0;
	if(borderType ==  "lr") {tile.sy = 192}
	else if(borderType ==  "tb") {tile.sy = 224}
	else if(borderType ==  "bl") {tile.sy = 256}
	else if(borderType ==  "br") {tile.sy = 288}
	else if(borderType ==  "tl") {tile.sy = 320}
	else if(borderType ==  "tr") {tile.sy = 352};
	tile.type = "Border";
	tile.animated = false;
	tile.moveable = false;
	tile.destructable = false;
	return tile;
};

function updateTileMap() {
	maps = [arena.tiles, puzzle1.tiles];
	for(var i = 0; i < maps.length; i++) {
		map = maps[i];
		for(var r = 0; r < map.length; r++) {
			var row = map[r];
			for(var c = 0; c < row.length; c++) {
				var currentTile = map[r][c];
				if(currentTile == 1) {
					map[r][c] = createCosmicCube();
				}
				else if(currentTile == 2) {
					map[r][c] = createGraviCube();
				}
				else if(currentTile == 3) {
					// tbd
				}
				else if(currentTile == 4) {
					// tbd
				}
				else if(currentTile == 5) {
					// tbd
				}
				else if(currentTile == 6) {
					// tbd
				}
				else if(currentTile == 7) {
					map[r][c] = createBorder("lr");
				}
				else if(currentTile == 8) {
					map[r][c] = createBorder("tb");
				}
				else if(currentTile == 9) {
					map[r][c] = createBorder("bl");
				}
				else if(currentTile == 10) {
					map[r][c] = createBorder("br");
				}
				else if(currentTile == 11) {
					map[r][c] = createBorder("tl");
				}
				else if(currentTile == 12) {
					map[r][c] = createBorder("tr");
				}
				else if(currentTile == 0) {
					map[r][c] = null;
				};
			};
		};
	};
};