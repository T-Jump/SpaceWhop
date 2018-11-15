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
				arena.tiles[yIndex][xIndex] = createCosmicCube(0);
			}
			else if(selectedTile == "gravityCube") {
				arena.tiles[yIndex][xIndex] = createGraviCube(0);
			};
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