function Tile(frameNum) {
	this.dx = 0;
	this.dy = 0;
	this.sx = 0;
	this.sy = 0;
	this.type = "";
	this.animated = false;
	this.currentFrame = frameNum;
	this.moveable = false;
	this.destructable = false;
};

Tile.width = 32;
Tile.height = 32;
Tile.image = new Image();
Tile.image.src = "graphics/sprite-sheet-tiles.png";
Tile.animationFrames = 4;