// Global Variables for HTML Documents
var canvas = document.getElementById("snakeCanvas");
var context = canvas.getContext("2d");
var score = document.getElementById("score");
var startBtn = document.getElementById("startBtn");
var pauseBtn = document.getElementById("pauseBtn");
var resumeBtn = document.getElementById("resumeBtn");
var modalBtn = document.getElementById("modalBtn");
var food = document.getElementById("food");
var randomObstacle = document.getElementById("randomObstacle");
var highScores = document.getElementById("hs-title");

// Global Variables for Game Functions
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

// Array for High Scores
var userHigh = [];

// Listen for click on Start Button
startBtn.addEventListener("click", startGame);

// Reset values of variables to starting values]
function reset() {
  clearInterval(gameInterval);
  clearInterval(randObstacleInterval);
  (intervalDuration = 150), (minDuration = 75);
  tail = [];
  totalTail = 0;
  directionVar = "Right";
  direction = "Right";
  previousDir = "Right";
  xSpeed = scale * speed;
  ySpeed = 0;
  snakeHeadX = 0;
  snakeHeadY = 0;
  (playing = false), (gameStarted = false);
  boundaryCollision = false;
}

// Start the game
function startGame() {
  reset();
  gameStarted = true;
  playing = true;
  foodPosition();
  randObstaclePosition();
  main();
}

// Listens for arrow keys to be pressed for snake direction
window.addEventListener("keydown", pressedKey);

// Key press function
function pressedKey() {
  if ((previousDir = direction)) {
    directionVar = event.key.replace("Arrow", "");

    changeDirection();
  }
}

// Changes the snake movement direction based on user input from key pressed
function changeDirection() {
  switch (directionVar) {
    case "Up":
      //move "up" only when previous direction is not "down"
      if (previousDir !== "Down") {
        direction = directionVar;
        xSpeed = 0;
        ySpeed = scale * -speed;
      }
      break;

    case "Down":
      //move "down" only when previous direction is not "up"
      if (previousDir !== "Up") {
        direction = directionVar;
        xSpeed = 0;
        ySpeed = scale * speed;
      }
      break;

    case "Left":
      //move "left" only when previous direction is not "right"
      if (previousDir !== "Right") {
        direction = directionVar;
        xSpeed = scale * -speed;
        ySpeed = 0;
      }
      break;

    case "Right":
      //move "right" only when previous direction is not "left"
      if (previousDir !== "Left") {
        direction = directionVar;
        xSpeed = scale * speed;
        ySpeed = 0;
      }
      break;
  }
}

// Checks for collision with  the snake body or canvas boundary
function checkCollision() {
  let tailCollision = false,
    randObstacleCollision = false;
  boundaryCollision = false;
  //with its own tail
  for (let i = 0; i < tail.length; i++) {
    if (snakeHeadX == tail[i].tailX && snakeHeadY == tail[i].tailY) {
      tailCollision = true;
    }
  }
  //with boundaries
  if (
    snakeHeadX >= canvas.width ||
    snakeHeadX < 0 ||
    snakeHeadY >= canvas.height ||
    snakeHeadY < 0
  ) {
    boundaryCollision = true;
  }
  //with randomObstacle
  if (snakeHeadX === randomObstacleX && snakeHeadY === randomObstacleY) {
    randObstacleCollision = true;
  }
  return tailCollision || boundaryCollision || randObstacleCollision;
}

// Randomly generates a coordinate for food and obstacle
function generateCoordinates() {
  let xCoordinate = Math.floor(Math.random() * (max - min) + min) * scale;
  let yCoordinate = Math.floor(Math.random() * (max - min) + min) * scale;
  return { xCoordinate, yCoordinate };
}

// Snake //

// Function that draws the snake head on the canvas
function drawSnakeHead(color) {
  context.beginPath();
  context.arc(
    snakeHeadX + scale / 2,
    snakeHeadY + scale / 2,
    scale / 2,
    0,
    2 * Math.PI
  );
  context.fillStyle = color;
  context.fill();
  //eyes
  context.beginPath();
  if (direction === "Up") {
    context.arc(
      snakeHeadX + scale / 5,
      snakeHeadY + scale / 5,
      scale / 8,
      0,
      2 * Math.PI
    );
    context.arc(
      snakeHeadX + scale - scale / 5,
      snakeHeadY + scale / 5,
      scale / 8,
      0,
      2 * Math.PI
    );
  } else if (direction === "Down") {
    context.arc(
      snakeHeadX + scale / 5,
      snakeHeadY + scale - scale / 5,
      scale / 8,
      0,
      2 * Math.PI
    );
    context.arc(
      snakeHeadX + scale - scale / 5,
      snakeHeadY + scale - scale / 5,
      scale / 8,
      0,
      2 * Math.PI
    );
  } else if (direction === "Left") {
    context.arc(
      snakeHeadX + scale / 5,
      snakeHeadY + scale / 5,
      scale / 8,
      0,
      2 * Math.PI
    );
    context.arc(
      snakeHeadX + scale / 5,
      snakeHeadY + scale - scale / 5,
      scale / 8,
      0,
      2 * Math.PI
    );
  } else {
    context.arc(
      snakeHeadX + scale - scale / 5,
      snakeHeadY + scale / 5,
      scale / 8,
      0,
      2 * Math.PI
    );
    context.arc(
      snakeHeadX + scale - scale / 5,
      snakeHeadY + scale - scale / 5,
      scale / 8,
      0,
      2 * Math.PI
    );
  }
  context.fillStyle = "black";
  context.fill();
}

// Function draws tail onto canvas
function drawSnakeTail() {
  let tailRadius = scale / 4;
  for (i = 0; i < tail.length; i++) {
    tailRadius = tailRadius + (scale / 2 - scale / 4) / tail.length;
    context.beginPath();
    context.fillStyle = "#6c2c3a";
    context.arc(
      tail[i].tailX + scale / 2,
      tail[i].tailY + scale / 2,
      tailRadius,
      0,
      2 * Math.PI
    );
    context.fill();
  }
}

//shift snake's previous positions to next position
function moveSnakeForward() {
  tail0 = tail[0];
  for (let i = 0; i < tail.length - 1; i++) {
    tail[i] = tail[i + 1];
  }
  tail[totalTail - 1] = { tailX: snakeHeadX, tailY: snakeHeadY };
  snakeHeadX += xSpeed;
  snakeHeadY += ySpeed;
}

//only in case of boundary collision
function moveSnakeBack() {
  context.clearRect(0, 0, 500, 500);
  for (let i = tail.length - 1; i >= 1; i--) {
    tail[i] = tail[i - 1];
  }
  if (tail.length >= 1) {
    tail[0] = { tailX: tail0.tailX, tailY: tail0.tailY };
  }
  snakeHeadX -= xSpeed;
  snakeHeadY -= ySpeed;
  drawRandomObstacle();
  drawFood();
  drawSnakeTail();
}

//display snake and if a collision occurs end the game and produce a modal to inform user and show final score
function drawSnake() {
  drawSnakeHead("#7d4350");
  drawSnakeTail();
  if (checkCollision()) {
    clearInterval(gameInterval);
    clearInterval(randObstacleInterval);
    if (boundaryCollision) {
      moveSnakeBack();
    }
    drawSnakeHead("red");
    setTimeout(() => {
      scoreModal.textContent = totalTail;
      $("#alertModal").modal("show");
      //if modal is shown, remove the keydown event listener so that snake doesn't move
      $("#alertModal").on("shown.bs.modal", function () {
        window.removeEventListener("keydown", pressedKey);
      });
      //when modal hides, reset every variable and add keydown event listener again
      $("#alertModal").on("hidden.bs.modal", function () {
        context.clearRect(0, 0, 500, 500);
        score.innerText = 0;
        window.addEventListener("keydown", pressedKey);
        reset();
      });
      modalBtn.addEventListener("click", () => {
        context.clearRect(0, 0, 500, 500);
        score.innerText = 0;
      });
    }, 1000);
  }
}

// Random Obstacle //

// Function to produce another obstacle for the user and increase the difficulty
function randObstaclePosition() {
  let randomObstacle = generateCoordinates();
  randomObstacleX = randomObstacle.xCoordinate;
  randomObstacleY = randomObstacle.yCoordinate;
}

// Function draws the obstacle on the canvas
function drawRandomObstacle() {
  context.drawImage(
    randomObstacle,
    randomObstacleX,
    randomObstacleY,
    scale,
    scale
  );
}

//Food//

//generate random food position within canvas boundaries
function foodPosition() {
  let food = generateCoordinates();
  foodX = food.xCoordinate;
  foodY = food.yCoordinate;
}

//draw image of food
function drawFood() {
  context.drawImage(food, foodX, foodY, scale, scale);
}

//Main Game Functions

// Function to ensure food and obstacle generate and are drawn in different locations
function checkSamePosition() {
  if (foodX == randomObstacleX && foodY == randomObstacleY) {
    randObstaclePosition();
  }
  for (let i = 0; i < tail.length; i++) {
    if (
      randomObstacleX === tail[i].tailX &&
      randomObstacleY === tail[i].tailY
    ) {
      randObstaclePosition();
      break;
    }
  }
  for (let i = 0; i < tail.length; i++) {
    if (foodX === tail[i].tailX && foodY === tail[i].tailY) {
      foodPosition();
      break;
    }
  }
}

function main() {
  //update state at specified interval
  randObstacleInterval = window.setInterval(randObstaclePosition, 10000);
  gameInterval = window.setInterval(() => {
    context.clearRect(0, 0, 500, 500);
    checkSamePosition();
    drawRandomObstacle();
    drawFood();
    moveSnakeForward();
    drawSnake();

    //check if snake eats the food - increase size of its tail, update score and find new food position
    if (snakeHeadX === foodX && snakeHeadY === foodY) {
      totalTail++;
      //increase the speed of game after every 20 points
      if (totalTail % 20 == 0 && intervalDuration > minDuration) {
        clearInterval(gameInterval);
        window.clearInterval(randObstacleInterval);
        intervalDuration = intervalDuration - 10;
        main();
      }
      foodPosition();
    }
    score.innerText = totalTail;
  }, intervalDuration);
}

// Serer-Side Api fetch so the user see's a gif in the modal at the end of the game
let modalGif = function () {
  fetch(
    "https://api.giphy.com/v1/gifs/search?q=snake&api_key=HvaacROi9w5oQCDYHSIk42eiDSIXH3FN&limit=1"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response.data[0]);
      let gifContainer = document.getElementById("gif-container");
      gifContainer.innerHTML = "";

      let gifImage = document.createElement("img");
      gifImage.setAttribute("src", response.data[0].images.fixed_height.url);

      gifContainer.appendChild(gifImage);
    });
};

modalGif();
