$(function() {
    $("#gridToggle").change(function(){
		showGrid = this.checked;
	});
	$("#main").click(function(e){
		var x = Math.floor((e.pageX - this.offsetLeft) / 2);
		var y = Math.floor((e.pageY - this.offsetTop) / 2);
		var xIndex = Math.floor(x / arena.columnWidth);
		var yIndex = Math.floor(y / arena.rowHeight);
		var selectedTile = $("input[type='radio'][name='tiletype']:checked").val();
		var currentTile = arena.tiles[yIndex][xIndex];
		if(currentTile != null) {
			arena.tiles[yIndex][xIndex] = null;
		} else {
			if(selectedTile == 1) {
				arena.tiles[yIndex][xIndex] = createCosmicCube();
			}
			else if(selectedTile == 2) {
				arena.tiles[yIndex][xIndex] = createGraviCube();
			}
			else if(selectedTile == 7) {
				arena.tiles[yIndex][xIndex] = createBorder("lr");
			}
			else if(selectedTile == 8) {
				arena.tiles[yIndex][xIndex] = createBorder("tb");
			}
			else if(selectedTile == 9) {
				arena.tiles[yIndex][xIndex] = createBorder("bl");
			}
			else if(selectedTile == 10) {
				arena.tiles[yIndex][xIndex] = createBorder("br");
			}
			else if(selectedTile == 11) {
				arena.tiles[yIndex][xIndex] = createBorder("tl");
			}
			else if(selectedTile == 12) {
				arena.tiles[yIndex][xIndex] = createBorder("tr");
			}
		}
	});
	$("#getPuzzleArray").click(function(e){
		$("textarea").val(arena.tiles);
	});
});

function debug() {
	$("#debug").show();
	if(leftPressed) $("#leftPressed").show(); else $("#leftPressed").hide();
	if(rightPressed) $("#rightPressed").show(); else $("#rightPressed").hide();
	if(upPressed) $("#jumpPressed").show(); else $("#jumpPressed").hide();
	if(runPressed) $("#runPressed").show(); else $("#runPressed").hide();
	
}