// start our canvas
var canvas = document.getElementById("main");
var ctxt = canvas.getContext("2d");


// tracking variables
var elapsedFrames = 0;
var elapsedFramesMovement = 0;

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var runPressed = false;
var getPressed = false;
var dropPressed = false;

var puzzleOneSolved = false;


// game settings
var fps = 60;
var gravity = 1;