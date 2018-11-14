var tileSheet = "graphics/sprite-sheet-tiles.png";

function CosmicCube(frameNum) {
	this.currentFrame = frameNum;
	this.x = 0;
	this.y = 0;
	this.animated = false;
	this.moveable = true;
};

CosmicCube.source = tileSheet;
CosmicCube.width = 31;
CosmicCube.height = 31;
CosmicCube.animationFrames = 4;
CosmicCube.image = new Image();
CosmicCube.image.src = CosmicCube.source;

function GravityCube() {
	this.x = 0;
	this.y = 0;
};

GravityCube.sx = 0;
GravityCube.sy = 32;
GravityCube.width = 31;
GravityCube.height = 31;
GravityCube.image = new Image();
GravityCube.image.src = tileSheet;