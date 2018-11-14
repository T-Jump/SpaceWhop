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
		var currentTile = puzzle1.tiles[yIndex][xIndex];
		if(currentTile != null) {
			puzzle1.tiles[yIndex][xIndex] = null;
		} else {
			if(selectedTile == "cosmicCube") {
				puzzle1.tiles[yIndex][xIndex] = new CosmicCube(0);
			}
			else if(selectedTile == "gravityCube") {
				puzzle1.tiles[yIndex][xIndex] = new GravityCube(0);
			};
		}
	});
	$("#getPuzzleArray").click(function(e){
		$("textarea").val(puzzle1.tiles);
	});
});

function debug() {
	$("#debug").show();
	if(leftPressed) $("#leftPressed").show(); else $("#leftPressed").hide();
	if(rightPressed) $("#rightPressed").show(); else $("#rightPressed").hide();
	if(upPressed) $("#jumpPressed").show(); else $("#jumpPressed").hide();
	if(runPressed) $("#runPressed").show(); else $("#runPressed").hide();
	
}