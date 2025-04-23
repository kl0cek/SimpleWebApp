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
const restartBtn = document.getElementById('restart');


let snake, direction, food, score, gameOver, interval;
let highScore = localStorage.getItem('highScore') || 0;


function initGame() {
    // plan byl dobry ale cos nie pyklo
    snake = [[10, 10]];
    direction = [0,1];
    food = generateFood(snake, boardSize);
    score = 0;
    gameOver = false;
    //updateGame();
    updateScore();
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
        case 'w' : if (direction[0] !== 1) direction = [-1,0]; break;
        case 's' : if (direction[0] !== -1) direction = [1,0]; break;
        case 'a' : if (direction[1] !== 1) direction = [0,-1]; break;
        case 'd' : if (direction[1] !== -1) direction = [0,1]; break;
    }
});

restartBtn.addEventListener('click', initGame);
console.log(restartBtn);
initGame();