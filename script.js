// Global Variables
var canvas = document.getElementById("snakeCanvas");
var context = canvas.getContext("2d");
var score = document.getElementById("score");
var startBtn = document.getElementById("startBtn");
var pauseBtn = document.getElementById("pauseBtn");
var resumeBtn = document.getElementById("resumeBtn");
var modalBtn = document.getElementById("modalBtn");
var food = document.getElementById("food");
var randomObstacle = document.getElementById("randomObstacle");
var snakeHeadX,
    snakeHeadY,
    foodX,
    foodY,
    randomObstacleX,
    randomObstacleY,
    tail,
    totalTail,
    directionVar,
    direction,
    previousDir;
var speed = 1,
xSpeed,
ySpeed;
const scale = 20;
var rows = canvas.height / scale;
var columns = canvas.width / scale;
var min = scale / 10;
var max = rows - min; 
var gameInterval, 
  randObstacleInterval, 
  intervalDuration = 150, 
  minDuration = 75; 
var playing, gameStarted;
var boundaryCollision;
var tail0;

