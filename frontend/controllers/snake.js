//Declaration variables snake
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

let TopScoreSnake = 0;

// call variables to start the game

gameInitialize();
snakeInitialize();
foodInitialize();
setInterval(gameLoop, 4000 / 40);

// Function starting the game and initialize the variables for the board

function gameInitialize() {
    let game_screen = document.getElementById("game-screen");
    context = game_screen.getContext("2d");

    screenWidth = 800;
    screenHeight = 700;

    game_screen.width = screenWidth;
    game_screen.height = screenHeight;

    document.addEventListener("keydown", KeyboardListener);

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

// Functions start the snake and declare the variables of the grandaria and do the push every time an object is eaten

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

// Function to be able to put photos in the different objects and the head of the snake telling him the position in x and in y. (in progress)
function make_base(img, x, y) {
    base_image = new Image();
    base_image.src = img;
    base_image.onload = function () {
        context.drawImage(base_image, x, y);
    }
}

//Function to draw the snake and be able to assign some values ​​or others depending on whether it is the head or the body
function snakeDraw() {
    for (let index = 0; index < snake.length; index++) {
        if (index == 1 || index == 0) {
            context.fillStyle = "blue";
        } else {
            context.fillStyle = "white";
        }
        context.fillRect(snake[index].x * snakeSize, snake[index].y * snakeSize, 25, 25);
        context.strokeStyle = "black";
        context.strokeRect(snake[index].x * snakeSize, snake[index].y * snakeSize, 25, 25);
    }
}

// Functions eating pixels and draw the food pixels randomly inside the canvas

function foodInitialize() {
    food = {
        x: 0,
        y: 0
    };
    setFoodPosition();
}

function foodDraw() {
    const color = ["red", "blue"];
    context.fillStyle = color[Math.floor(Math.random() * color.length)];
    context.fillRect(food.x * snakeSize, food.y * snakeSize, 25, 25);
}

function setFoodPosition() {

    let randomX = Math.floor(Math.random() * screenWidth);
    let randomY = Math.floor(Math.random() * screenHeight);

    food.x = Math.floor(randomX / snakeSize);
    food.y = Math.floor(randomY / snakeSize);
}

// function for when the snake eats the food

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

// Snake and collision control functions (detecting the "x" and "y" position of the snake's head and making sure it doesn't touch any of the pixels that close the canvas)

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

function KeyboardListener(event) {

    // Play with the arrows
    if (event.keyCode == "39" && snakeDirection != "left") {
        snakeDirection = "right";
    }
    else if (event.keyCode == "40" && snakeDirection != "up") {
        snakeDirection = "down";
    }
    if (event.keyCode == "37" && snakeDirection != "right") {
        snakeDirection = "left";
    }
    else if (event.keyCode == "38" && snakeDirection != "down") {
        snakeDirection = "up";
    }

    // Play with the W/A/S/D
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

    if (snakeLength >= TopScoreSnake) {
        TopScoreSnake = snakeLength;
    }
    top_score.innerHTML = "Top score:   " + TopScoreSnake;
}

// change background page (dark mode)

function change_Dark_mode() {
    document.querySelectorAll(".checkbox").forEach(function (e) {
        "darkmode" === localStorage.getItem("mode") ? e.checked = !0 : e.checked = !1
    })
}
function dark_mode() {
    localStorage.setItem("mode", "darkmode" === localStorage.getItem("mode") ? "light" : "darkmode"), "darkmode" === localStorage.getItem("mode") ? document.querySelector("body").classList.add("jagoampDark") : document.querySelector("body").classList.remove("jagoampDark"), change_Dark_mode()
}
function darkModeHide() {
    document.querySelectorAll(".darkjagoamp").forEach(function (e) { e.parentNode.removeChild(e) })
}

(localStorage.getItem('mode')) === 'darkmode' ? document.querySelector('body').classList.add('jagoampDark') : document.querySelector('body').classList.remove('jagoampDark')
