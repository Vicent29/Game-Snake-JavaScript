//Declaration variables
let snake;
let snakeLength;
let snakeSize;
let snakeDirection;

let food;

let context;
let screenWidth;
let screenHeight;

let gameState;
let gameOverMenu;
let restartButton;
let playHUD;

let TopSanke = 0;

// Calling variables

gameInitialize();
snakeInitialize();
foodInitialize();
setInterval(gameLoop, 4000 / 40);

// Function starting the game

function gameInitialize() {
    let game_screen = document.getElementById("game-screen");
    context = game_screen.getContext("2d");

    screenWidth = 800;
    screenHeight = 700;

    game_screen.width = screenWidth;
    game_screen.height = screenHeight;

    document.addEventListener("keydown", keyboardHandler);

    gameOverMenu = document.getElementById("gameOver");
    centerMenuPosition(gameOverMenu);

    restartButton = document.getElementById("restartButton");
    restartButton.addEventListener("click", gameRestart);

    playHUD = document.getElementById("playHUD");
    scoreboard = document.getElementById("scoreboard");

    setState("PLAY");
}

function gameLoop() {
    gameDraw();
    drawScoreboard();
    drawTopScore();
    if (gameState == "PLAY") {
        snakeUpdate();
        snakeDraw();
        foodDraw();
    }
}

function gameDraw() {
    context.fillStyle = "rgb(0, 0, 0)";
    context.fillRect(0, 0, screenWidth, screenHeight);
}

function gameRestart() {
    snakeInitialize();
    foodInitialize();
    hideMenu(gameOverMenu);
    setState("PLAY");
}

// Functions start the snake

function snakeInitialize() {
    snake = [];
    snakeLength = 2;
    snakeSize = 25;
    snakeDirection = "down";

    for (let index = snakeLength - 1; index >= 0; index--) {
        snake.push({
            x: index,
            y: 0
        });
    }
}

//Function to put the image of the snake's head at the beginning of the snake
function make_base(img) {
    base_image = new Image();
    base_image.src = img;
    base_image.onload = function () {
        context.drawImage(base_image, 0, 0);
    }
}

//Function to draw the snake and be able to assign some values ​​or others depending on whether it is the head or the body
function snakeDraw() {
    for (let index = 0; index < snake.length; index++) {
        if (index == 1 || index == 0) {
            context.fillStyle = "red";
            make_base('https://i.postimg.cc/MpkX6Gwx/headsnake.png');
        } else {
            context.fillStyle = "blue";
        }
        context.fillRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
        context.strokeStyle = "black";
        context.strokeRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
    }
}

function snakeUpdate() {
    let snakeHeadX = snake[0].x;
    let snakeHeadY = snake[0].y;

    if (snakeDirection == "down") {
        snakeHeadY++;
    }
    else if (snakeDirection == "right") {
        snakeHeadX++;
    }
    if (snakeDirection == "up") {
        snakeHeadY--;
    }
    else if (snakeDirection == "left") {
        snakeHeadX--;
    }

    checkFoodCollisions(snakeHeadX, snakeHeadY);
    checkWallCollisions(snakeHeadX, snakeHeadY);
    checkSnakeCollisions(snakeHeadX, snakeHeadY);

    let snakeTail = snake.pop();
    snakeTail.x = snakeHeadX;
    snakeTail.y = snakeHeadY;
    snake.unshift(snakeTail);
}

// Functions eating pixels

function foodInitialize() {
    food = {
        x: 0,
        y: 0
    };
    setFoodPosition();
}

function foodDraw() {
    context.fillStyle = "orange";
    context.fillRect(food.x * snakeSize, food.y * snakeSize, snakeSize, snakeSize);
}

function setFoodPosition() {
    let randomX = Math.floor(Math.random() * screenWidth);
    let randomY = Math.floor(Math.random() * screenHeight);

    food.x = Math.floor(randomX / snakeSize);
    food.y = Math.floor(randomY / snakeSize);
}

// Input functions and Control functions

function keyboardHandler(event) {

    if (event.keyCode == "39" && snakeDirection != "left") {
        console.log("DERECHA");
        snakeDirection = "right";
    }
    else if (event.keyCode == "40" && snakeDirection != "up") {
        console.log("ABAJO");
        snakeDirection = "down";
    }
    if (event.keyCode == "37" && snakeDirection != "right") {
        console.log("IZQUIERDA");
        snakeDirection = "left";
    }
    else if (event.keyCode == "38" && snakeDirection != "down") {
        console.log("ARRIBA");
        snakeDirection = "up";
    }


    if (event.keyCode == "68" && snakeDirection != "left") {
        snakeDirection = "right";
    }
    else if (event.keyCode == "83" && snakeDirection != "up") {
        snakeDirection = "down";
    }
    if (event.keyCode == "65" && snakeDirection != "right") {
        snakeDirection = "left";
    }
    else if (event.keyCode == "87" && snakeDirection != "down") {
        snakeDirection = "up";
    }

    if (event.keyCode == "13" && snakeDirection != "enter") {
        gameRestart();
    }
}

// Functions eat food

function checkFoodCollisions(snakeHeadX, snakeHeadY) {
    if (snakeHeadX == food.x && snakeHeadY == food.y) {
        snake.push({
            x: 0,
            y: 0
        });
        snakeLength++;
        setFoodPosition();
    }
}

function checkWallCollisions(snakeHeadX, snakeHeadY) {
    if (snakeHeadX * snakeSize >= screenWidth || snakeHeadX * snakeSize < 0) {
        setState("Game Over");
    }
    if (snakeHeadY * snakeSize >= screenHeight || snakeHeadY * snakeSize < 0) {
        setState("Game Over");
    }
}

function checkSnakeCollisions(snakeHeadX, snakeHeadY) {
    for (let index = 1; index < snake.length; index++) {
        if (snakeHeadX == snake[index].x && snakeHeadY == snake[index].y) {
            setState("Game Over");
            return;
        }
    }
}

// GAME STATE

function setState(state) {
    gameState = state;
    showMenu(state);
}


//  FUNCTIONS MENU and POSITION 

function displayMenu(menu) {
    menu.style.visibility = "visible";
}

function hideMenu(menu) {
    menu.style.visibility = "hidden";
}

function showMenu(state) {
    if (state == "Game Over") {
        displayMenu(gameOverMenu);
    }
    else if (state == "PLAY") {
        displayMenu(playHUD);
    }
}

function centerMenuPosition(menu) {
    menu.style.top = (screenHeight / 2) - (menu.offsetHeight / 2) + "px";
    menu.style.left = (screenWidth / 2) - (menu.offsetWidth / 2) + "px";
}

function drawScoreboard() {
    scoreboard.innerHTML = "Length:     " + snakeLength;
}

function drawTopScore() {

    if (snakeLength >= TopSanke) {
        TopSanke = snakeLength;
    }
    top_score.innerHTML = "Top score:   " + TopSanke;
}