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
	tile.type = 1;
	tile.animated = true;
	tile.moveable = true;
	tile.destructable = true;
	return tile;
};

function createGraviCube() {
	tile = new Tile(0);
	tile.sx = 0;
	tile.sy = 32;
	tile.type = 2;
	tile.animated = false;
	tile.moveable = false;
	tile.destructable = false;
	return tile;
};

function createBorder(borderType) {
	tile = new Tile(0);
	tile.sx = 0;
	if(borderType ==  7) {tile.sy = 192; tile.type = borderType}
	else if(borderType ==  8) {tile.sy = 224; tile.type = borderType}
	else if(borderType ==  9) {tile.sy = 256; tile.type = borderType}
	else if(borderType ==  10) {tile.sy = 288; tile.type = borderType}
	else if(borderType ==  11) {tile.sy = 320; tile.type = borderType}
	else if(borderType ==  12) {tile.sy = 352; tile.type = borderType}
	else if(borderType ==  13) {tile.sy = 384; tile.type = borderType}
	else if(borderType ==  14) {tile.sy = 416; tile.type = borderType}
	else if(borderType ==  15) {tile.sy = 448; tile.type = borderType}
	else if(borderType ==  16) {tile.sy = 480; tile.type = borderType}
	else if(borderType ==  17) {tile.sy = 512; tile.type = borderType}
	else if(borderType ==  18) {tile.sy = 544; tile.type = borderType}
	else if(borderType ==  19) {tile.sy = 576; tile.type = borderType}
	else if(borderType ==  20) {tile.sy = 608; tile.type = borderType};
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
				else if(currentTile >= 7 && currentTile <= 20) {
					map[r][c] = createBorder(currentTile);
				}
				else if(currentTile == 0) {
					map[r][c] = null;
				};
			};
		};
	};
};