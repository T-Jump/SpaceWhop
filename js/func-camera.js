function setCameraCenter(centerX,centerY) {
	var arenaWidth = getArenaWidth();
	var arenaHeight = getArenaHeight();
	
	var leftX = Math.floor(centerX - (camera.width / 2));
	if(leftX < 0) {
		leftX = 0;
	};
	var rightX = leftX + camera.width;
	if(rightX > arenaWidth) {
		rightX = arenaWidth;
		leftX = rightX - camera.width;
	};
	var topY = Math.floor(centerY - (camera.height / 2));
	if(topY < 0) {
		topY = 0;
	};
	var bottomY = topY + camera.height;
	if(bottomY > arenaHeight) {
		bottomY = arenaHeight;
		topY = bottomY - camera.height;
	};
	
	camera.x = leftX;
	camera.y = topY;
};

function updateCamera(player) {
	var center = getCenter(player.x, player.y, Player.width, Player.height);
	setCameraCenter(center.x,center.y);
};