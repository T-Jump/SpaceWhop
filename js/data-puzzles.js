function Camera() {
	this.x = 0;
	this.y = 0;
	this.width = canvas.width;
	this.height = canvas.height;
	this.speed = 3;
};

var camera = new Camera();


var arena = {
	border: 1,
	columns: 15,
	rows: 12,
	columnWidth: Tile.width,
	rowHeight: Tile.height,
	tiles: [
		[11, 08, 08, 08, 08, 08, 08, 08, 08, 08, 08, 08, 08, 08, 12],
		[07, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 07],
		[07, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 07],
		[07, 00, 00, 00, 00, 00, 01, 01, 01, 00, 00, 00, 00, 00, 07],
		[07, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 07],
		[07, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 07],
		[07, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 07],
		[07, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 07],
		[07, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 07],
		[07, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 07],
		[07, 00, 00, 02, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 07],
		[09, 08, 08, 08, 08, 08, 08, 08, 08, 08, 08, 08, 08, 08, 10],
	],
};

var puzzle1 = {
	tiles: [
		[11, 08, 08, 08, 08, 08, 08, 08, 08, 08, 08, 08, 08, 08, 12],
		[07, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 07],
		[07, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 07],
		[07, 00, 00, 00, 00, 00, 01, 01, 01, 00, 00, 00, 00, 00, 07],
		[07, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 07],
		[07, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 07],
		[07, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 07],
		[07, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 07],
		[07, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 07],
		[07, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 07],
		[07, 00, 00, 02, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 07],
		[09, 08, 08, 08, 08, 08, 08, 08, 08, 08, 08, 08, 08, 08, 10],
	],
};

function getArenaWidth() {
	return arena.columnWidth * arena.columns;
};

function getArenaHeight() {
	return arena.rowHeight * arena.rows;
};