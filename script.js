import { 
    generateFood, 
    moveSnake, 
    isCollision, 
    eatFood 
} from './snake-logic.js';

const board = document.getElementById('game-board');
const boardSize = 20;
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');
const restart = document.getElementById('restart');

//weird weird 
let snake = [[10, 10]];
let direction = [0,1];
let food = generateFood(snake, boardSize);
let score = 0;
let gameOver = false;
let interval;
let highScore = localStorage.getItem('highScore') || 0;


function initGame() {
    // plan byl dobry ale cos nie pyklo
    // let snake = [[10, 10]];
    // let direction = [0,1];
    // let food = generateFood(snake, boardSize);
    // let score = 0;
    // let gameOver = false;
    updateGame();
    drawBoard();
    clearInterval(interval);
    interval = setInterval(updateGame, 200);
}

function updateScore(){
    scoreDisplay.textContent = `Score: ${score}`;
    highScoreDisplay.textContent = `High Score: ${highScore}`;
}


function drawBoard() {
    board.innerHTML = '' ;

    for(let y = 0; y <boardSize; y++){
        for(let x = 0; x<boardSize; x++){

            const cell = document.createElement('div');
            cell.classList.add('cell');

            if(snake.some(([sy, sx]) => sy === y && sx === x)){
                cell.classList.add('snake');
            }


            if (food[0] === y && food[1] === x) {
                cell.classList.add('food');
              }
        
            board.appendChild(cell);
            
            //console.log("board");

        }
    }
}

function updateGame(){
    if(gameOver) return;

    snake = moveSnake(snake, direction, boardSize);

    if(isCollision(snake)){
        alert("Pozdr pocwicz");
        clearInterval(interval);
        gameOver = true;
        return;
    }

    if(eatFood(snake, food)){
        score++;
        if(score > highScore){
            highScore = score;
            localStorage.setItem('highScore', highScore);
        }
        snake.push(snake[snake.length - 1 ]);
        food = generateFood(snake, boardSize);
    }   
    updateScore();
    drawBoard();
}


document.addEventListener('keydown', (e) => {
    switch (e.key){
        case 'ArrowUp' : if (direction[0] !== 1) direction = [-1,0]; break;
        case 'ArrowDown' : if (direction[0] !== -1) direction = [1,0]; break;
        case 'ArrowLeft' : if (direction[1] !== 1) direction = [0,-1]; break;
        case 'ArrowRight' : if (direction[1] !== -1) direction = [0,1]; break;
    }
});

restart.addEventListener('click', initGame);

initGame();