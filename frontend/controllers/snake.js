//Declaration variables snake
let snake;
let snakeLength;
let snakeSize;
let snakeDirection;

let food;
let block;

let context;
let screenWidth;
let screenHeight;

let gameState;
let gameOverMenu;
let restartButton;
let playHUD;

let TopScoreSnake = 0;
let dificultMode = localStorage.getItem('dificult');

class all_block {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
let walls = [];


// call variables to start the game

gameInitialize();
snakeInitialize();
foodInitialize();
BlockInitialize();

if (dificultMode == "easy") {
    setInterval(gameLoop, 100, 4000 / 40);
} else if (dificultMode == "medium") {
    setInterval(gameLoop, 70, 4000 / 40);
} else if (dificultMode == "pro") {
    setInterval(gameLoop, 80, 4000 / 40);
} else {
    setInterval(gameLoop, 120, 4000 / 40);
}



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

    restartSetting = document.getElementById("restartSet");
    restartSetting.addEventListener("click", RestartSet);

    playHUD = document.getElementById("playHUD");
    scoreboard = document.getElementById("scoreboard");

    setState("PLAY");
}

function gameLoop() {
    gameDraw();
    drawScoreboard();
    if (gameState == "PLAY") {
        snakeUpdate();
        snakeDraw();
        foodDraw();
        BlockDraw();
        BlockMoreDraw();
    }
}

function gameDraw() {
    if (localStorage.getItem('CBoard')) {
        context.fillStyle = localStorage.getItem('CBoard');
    } else {
        context.fillStyle = 'black';
    }

    context.fillRect(0, 0, screenWidth, screenHeight);
}

function RestartSet() {
    localStorage.removeItem('dificult');
    localStorage.removeItem('Chead');
    localStorage.removeItem('CBody');
    localStorage.removeItem('CBoard');
    location.reload();

}

function gameRestart() {
    let dificult_mode = document.getElementById('dificult').value;
    localStorage.setItem('dificult', dificult_mode);
    let Chead = document.getElementById('Chead').value;
    localStorage.setItem('Chead', Chead);
    let CBody = document.getElementById('CBody').value;
    localStorage.setItem('CBody', CBody);
    let CBoard = document.getElementById('CBoard').value;
    localStorage.setItem('CBoard', CBoard);

    snakeInitialize();
    foodInitialize();
    BlockInitialize();
    hideMenu(gameOverMenu);
    setState("PLAY");

    location.reload();

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


//Function for change border color snake
function ColorCode() {
    var makingColorCode = '0123456789ABCDEF';
    var finalCode = '#';
    for (var counter = 0; counter < 6; counter++) {
        finalCode = finalCode + makingColorCode[Math.floor(Math.random() * 16)];
    }
    return finalCode;
}

//Function to draw the snake and be able to assign some values ​​or others depending on whether it is the head or the body
function snakeDraw() {
    let ColorHead = localStorage.getItem('Chead');
    let ColorBody = localStorage.getItem('CBody');

    for (let index = 0; index < snake.length; index++) {
        if (index == 1 || index == 0) {

            if (ColorHead != "#000000") {
                context.fillStyle = ColorHead;
            } else {
                context.fillStyle = "blue";
            }
        } else {
            if (ColorBody != "#000000") {
                context.fillStyle = ColorBody;
            } else {
                context.fillStyle = "white";
            }
        }
        context.fillRect(snake[index].x * snakeSize, snake[index].y * snakeSize, 25, 25);
        context.strokeStyle = ColorCode();
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

function BlockInitialize() {

    block = {
        x: 0,
        y: 0
    };
    setBlockPosition();
}

function foodDraw() {
    if (localStorage.getItem("CBody")) {
        if (localStorage.getItem("CBody") != "#000000") {
            context.fillStyle = localStorage.getItem("CBody");
        } else {
            context.fillStyle = "white";
        }
    } else {
        context.fillStyle = "white";
    }
    context.fillRect(food.x * snakeSize, food.y * snakeSize, 25, 25);
}

function setFoodPosition() {

    let randomX = Math.floor(Math.random() * screenWidth);
    let randomY = Math.floor(Math.random() * screenHeight);

    food.x = Math.floor(randomX / snakeSize);
    food.y = Math.floor(randomY / snakeSize);
}

function BlockDraw() {
    if (localStorage.getItem("dificult") == "medium") {
        context.fillStyle = "red";
        context.fillRect(block.x * snakeSize, block.y * snakeSize, 25, 25);
    }
}

function BlockMoreDraw() {
    for (let i = 0; i < walls.length; i++) {
        context.fillStyle = "red";
        context.fillRect(walls[i].x * snakeSize, walls[i].y * snakeSize, 25, 25);
    }
}


function setBlockPosition() {

    let randomX = Math.floor(Math.random() * screenWidth);
    let randomY = Math.floor(Math.random() * screenHeight);

    block.x = Math.floor(randomX / snakeSize);
    block.y = Math.floor(randomY / snakeSize);
}

function setBlockPositionMore() {
    walls.push(new all_block(Math.floor(Math.random() * screenWidth / snakeSize), Math.floor(Math.random() * screenHeight / snakeSize)));
    BlockMoreDraw();
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
        if (localStorage.getItem("dificult") == "medium") {
            setBlockPosition();
        } else if (localStorage.getItem("dificult") == "pro") {
            setBlockPositionMore();
        }
    }
}

// function for when the snake have a collision with the blocks
function checkBlockCollisions(snakeHeadX, snakeHeadY) {
    if (localStorage.getItem("dificult") == "medium") {
        if (snakeHeadX == block.x && snakeHeadY == block.y) {
            setState("Game Over");
        }
    }
}

function checkBlockMoreCollisions(snakeHeadX, snakeHeadY) {
    for (let i = 0; i < walls.length; i++) {
        if (snakeHeadX == walls[i].x && snakeHeadY == walls[i].y) {
            setState("Game Over");
        }
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
    checkBlockCollisions(snakeHeadX, snakeHeadY);
    checkBlockMoreCollisions(snakeHeadX, snakeHeadY);

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
        if (localStorage.getItem('token')) {
            Updateladerboard(snakeLength);
        }

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
    scoreboard.innerHTML = snakeLength;
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
