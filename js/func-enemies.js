function drawEnemy(enemy) {
	ctxt.drawImage(Enemy.image, sx, sy, enemy.width, enemy.height, dx, dy, enemy.width, enemy.height);
};

function moveEnemyLeft(enemy) {
	enemy.dx -= enemy.speed;
};

function moveEnemyRight(enemy) {
	enemy.dx += enemy.speed;
};

function updateEnemy(enemy) {
	// tbd
};