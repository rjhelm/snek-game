// Initialize Score Variables
let foodEaten = 0;
let snakeTraveled = 0;

// Gameboard Pixels
let gameContainer = document.getElementById("#game-container");
let createGameBoard = () => {
    // populate our game board using game-container
    for (let i = 0; i <= 1600; i++) {
        gameContainer.innerHTML = `${gameContainer.innerHTML} <div class="game-pixel" id=""pixel${i}"></div>`;
    }
};
// Variable to hold the game pixels created above
let gamePixels = document.getElementsByClassName("game-pixels"); 

// Code for food
let startFoodPosition = 0;
let createFood = () => {
    // Remove Food 
    gamePixels[startFoodPosition].classList.remove("food")
    // New food
    startFoodPosition = Math.random();
    startFoodPosition = Math.floor(startFoodPosition * 1600);
    gamePixels[startFoodPosition].classList.add("food");
};
