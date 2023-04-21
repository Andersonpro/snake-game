var canvas;
var cx;
var btn;
var play = false;
var blockSize = 25;
var rows = 20;
var cols = 20;

var velX = 1;
var velY = 1;

var snakeX = 5 * blockSize;
var snakeY = 5 * blockSize;

var snakeHeadLastPositions = [];
var snakeBody = [];
var bodySize = 0;

var left = 37
var up = 38
var right = 39
var down = 40

var currentDirection = right;
var lose = false;

// var to controls press button
var move = true;
//var true if meat in canvas and false if meat is not in canvas
var meat = true;
var meatX;
var meatY;
var meatPossibilities = [];

var intervalID;

window.onload = function(){
    canvas = document.getElementById('canvas');
    btn = document.getElementById('play-pause');
    canvas.height = rows * blockSize;
    canvas.width = cols * blockSize;
    cx = canvas.getContext('2d');
    btn.onclick = playPause;
    document.onkeydown = chooseDirection;
    intervalID = setInterval(update, 300);
}


function update(){
    if(play){
        
    }
    cx.fillStyle = 'black';
    cx.fillRect(0, 0, canvas.height, canvas.width);
    createSnakeHead();
    printCompleteSnake();
    creatMeatPosition();
    console.log(snakeBody.length);
    dropMeat();
    eatMeat();
    moveSnake();
    gameOver();
}

function createSnakeHead(){
    cx.fillStyle = '#42C920';
    cx.fillRect(snakeX, snakeY, blockSize , blockSize);
}

function chooseDirection(event){
    
    if(move){
        if(event.keyCode === left && currentDirection != right){
            currentDirection = left;
        } else if(event.keyCode === right && currentDirection != left){
            currentDirection = right;
            
        } else if(event.keyCode === up && currentDirection != down){
            currentDirection = up;
            
        } else if(event.keyCode === down && currentDirection != up){
            currentDirection = down;
        }
    }
    
    move = false;
}

function moveSnake(){
    
    if(bodySize > 0 ){
        snakeBody.unshift([snakeX, snakeY]);
    }
    
    if(!lose){
        if(currentDirection === left){
            snakeX -= blockSize * velX;
        }else if(currentDirection === right){
            snakeX += blockSize * velX;
        }else if(currentDirection === up){
            snakeY -= blockSize * velY;
        }else if(currentDirection === down){
            snakeY += blockSize * velY;
        }   
    }
    
    move = true;
}

//define matriz [0, 25, 50, ..., 475]. for meats
function creatMeatPosition(){
    for(let i = 0; i < cols * blockSize; i+=blockSize){
        meatPossibilities.push(i);
    }
}

function dropMeat(){
    if(meat){
        var aleatorioX = parseInt(Math.round(Math.random() * (rows-1)));
        var aleatorioY = parseInt(Math.round(Math.random() * (cols-1)));
        meatX = meatPossibilities[aleatorioX];
        meatY = meatPossibilities[aleatorioY];
        console.log(meatX, meatY);
        meat = false;
    }   
    cx.fillStyle = 'red';
    cx.fillRect(meatX,  meatY, blockSize, blockSize);
}

function eatMeat(){
    if(snakeX === meatX && snakeY === meatY){
        meat = true;
        bodySize++;
    }
    
}

function printCompleteSnake(){
    cx.fillStyle = '#90ee90';
    for(let i = 0; i < bodySize; i++){
        cx.fillRect(snakeBody[i][0],  snakeBody[i][1], blockSize, blockSize);
    }
    snakeBody.splice(bodySize);
}

function playPause(){
    if(play){
        play = false;

    }
    else{
        play = true;
    }
    console.log(play);
}


function gameOver(){
    if(snakeX < 0){
        lose = true;
        //snakeX = 0;
        console.log("Game Over");
        clearInterval(intervalID);
    }
    
    if(snakeY < 0){
        lose = true;
        //snakeY = 0;
        console.log("Game Over");
        clearInterval(intervalID);
        
    }
    
    if(snakeX > canvas.width - blockSize){
        lose = true;
        //snakeX = canvas.width - blockSize;
        console.log("Game Over");
        clearInterval(intervalID);
        
    }
    
    if(snakeY > canvas.height - blockSize){
        lose = true;
        //snakeY = canvas.height - blockSize;
        console.log("Game Over");
        clearInterval(intervalID);
        
    }
    
    for(let i  = 0; i < bodySize; i++){
        if(snakeBody[i][0] == snakeX && snakeBody[i][1] == snakeY){
            console.log("Game Over");
            clearInterval(intervalID);
        }
    }
}

