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
const difficultyPanel = document.querySelector('.dificulty');

let snake, direction, food, score, gameOver, interval;
let highScore = localStorage.getItem('highScore') || 0;
let gameSpeed = 200; 

function initGame() {
  snake = [[10, 10]];
  direction = [0,1];
  food = generateFood(snake, boardSize);
  score = 0;
  gameOver = false;

  updateScore();
  drawBoard();
  clearInterval(interval);
  interval = setInterval(updateGame, gameSpeed);
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
      snake.push(snake[snake.length - 1]);
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

const gameSections = document.querySelectorAll('.game-section');

document.querySelectorAll('.sidebar a').forEach(link => {
link.addEventListener('click', (e) => {
  e.preventDefault();

  const gameName = link.dataset.game;
  
  gameSections.forEach(section => {
    section.classList.add('hiddenSnakeGame');
    section.classList.remove('slide-in', 'slide-out');
  });
  
  if (gameName === 'snake') {
    difficultyPanel.classList.add('active');
  } else {
    difficultyPanel.classList.remove('active');
    
    const targetSection = document.getElementById(`game-${gameName}`);
    if (targetSection) {
      targetSection.classList.remove('hiddenSnakeGame');
      targetSection.classList.add('slide-in');
    }
  }
});
});

document.querySelectorAll('[game-dificulty]').forEach(difficultyLink => {
difficultyLink.addEventListener('click', (e) => {
  e.preventDefault();
  
  const difficulty = difficultyLink.getAttribute('game-dificulty');
  
  if (difficulty === 'easy') {
    gameSpeed = 200; 
  } else if (difficulty === 'hard') {
    gameSpeed = 100; 
  }
  
  difficultyPanel.classList.remove('active');
  
  const snakeGame = document.getElementById('game-snake');
  snakeGame.classList.remove('hiddenSnakeGame');
  snakeGame.classList.add('slide-in');
  
  setTimeout(() => {
    initGame();
  }, 1500);
});
});

document.getElementById('sidebar').addEventListener('click', () => {
difficultyPanel.classList.remove('active');

gameSections.forEach(section => {
  if (!section.classList.contains('hiddenSnakeGame')) {
    section.classList.remove('slide-in');
    section.classList.add('slide-out');

    section.addEventListener('animationend', function handler() {
      section.classList.add('hiddenSnakeGame');
      gameOver = true; 
      section.classList.remove('slide-out');
      section.removeEventListener('animationend', handler);
    });
  }
});
});