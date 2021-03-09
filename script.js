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

//display snake
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