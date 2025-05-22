import { checkWinner, getRandomMove, getBestMove } from './logic/TikTacToeLogic.js';

const XscoreDisplay = document.getElementById('Xscore');
const OscoreDisplay = document.getElementById('Oscore');

let gameBoardElement;
let restartBtnTicTacToe;
let statusDisplay;
let gameBoard;
let currentPlayer;
let gameActive;
let gameMode;
let aiPlayer;
let playerScore = 0;
let aiScore = 0;


export function initTicTacToeGame() {
  // Poczekaj aż DOM będzie w pełni załadowany
  setTimeout(() => {
    // Pobierz referencje do elementów DOM
    gameBoardElement = document.getElementById('game-board-TikTacToe');
    restartBtnTicTacToe = document.querySelector('#game-TikTacToe #restart');
    
    // Sprawdź czy elementy istnieją
    if (!gameBoardElement) {
      console.error('Nie znaleziono elementu game-board-TikTacToe');
      return;
    }
    
    if (!restartBtnTicTacToe) {
      console.error('Nie znaleziono przycisku restart dla gry kółko i krzyżyk');
    } else {
      restartBtnTicTacToe.addEventListener('click', restartGame);
    }
    
    // Stwórz element statusu gry
    const scoreboardElement = document.getElementById('scoreboardTikTacToe');
    if (scoreboardElement) {
      statusDisplay = document.createElement('div');
      statusDisplay.id = 'status';
      scoreboardElement.prepend(statusDisplay);
    }
    
    // Dodanie przycisków wyboru trybu gry
    createModeSelectionButtons();
  }, 100);
}

function createModeSelectionButtons() {
  const modeContainer = document.createElement('div');
  modeContainer.className = 'game-modes';
  
  const vsPlayerBtn = document.createElement('button');
  vsPlayerBtn.textContent = 'Graj z drugą osobą';
  vsPlayerBtn.className = 'mode-btn';
  vsPlayerBtn.addEventListener('click', () => startGameWithMode('player'));
  
  const vsEasyAIBtn = document.createElement('button');
  vsEasyAIBtn.textContent = 'Graj z łatwym AI';
  vsEasyAIBtn.className = 'mode-btn';
  vsEasyAIBtn.addEventListener('click', () => startGameWithMode('easy'));
  
  const vsHardAIBtn = document.createElement('button');
  vsHardAIBtn.textContent = 'Graj z trudnym AI';
  vsHardAIBtn.className = 'mode-btn';
  vsHardAIBtn.addEventListener('click', () => startGameWithMode('hard'));
  
  modeContainer.appendChild(vsPlayerBtn);
  modeContainer.appendChild(vsEasyAIBtn);
  modeContainer.appendChild(vsHardAIBtn);
  
  const tictactoeContainer = document.getElementById('game-TikTacToe');
  if (tictactoeContainer && gameBoardElement) {
    tictactoeContainer.insertBefore(modeContainer, gameBoardElement);
  } else {
    console.error('Nie można znaleźć elementów potrzebnych do wstawienia przycisków trybu gry');
  }
}

function startGameWithMode(mode) {
  gameMode = mode;
  aiPlayer = 'O'; // AI zawsze gra jako O
  initGame();
  
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  document.querySelector(`.mode-btn:nth-child(${
    mode === 'player' ? 1 : mode === 'easy' ? 2 : 3
  })`).classList.add('active');
}

function initGame() {
  gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  
  currentPlayer = 'X';
  gameActive = true;
  
  renderBoard();
  updateStatusDisplay();
}

function renderBoard() {
  if (!gameBoardElement) {
    console.error('Nie można renderować planszy - brak elementu DOM');
    return;
  }

  gameBoardElement.innerHTML = '';
  
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const cell = document.createElement('div');
      cell.className = 'tictactoe-cell';
      cell.dataset.row = i;
      cell.dataset.col = j;
      
      if (gameBoard[i][j] !== '') {
        cell.textContent = gameBoard[i][j];
        cell.classList.add(gameBoard[i][j].toLowerCase());
      }
      
      cell.addEventListener('click', handleCellClick);
      gameBoardElement.appendChild(cell);
    }
  }
}

function handleCellClick(event) {
  if (!gameActive) return;
  
  const row = parseInt(event.target.dataset.row);
  const col = parseInt(event.target.dataset.col);
  
  
  if (gameBoard[row][col] !== '') return;
  
  
  makeMove(row, col);
}

function makeMove(row, col) {
  gameBoard[row][col] = currentPlayer;
  renderBoard();
  
  
  const winner = checkWinner(gameBoard);
  if (winner) {
    handleGameEnd(winner);
    return;
  }
  
  
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatusDisplay();
  
  
  if (gameMode !== 'player' && currentPlayer === aiPlayer && gameActive) {
    setTimeout(makeAIMove, 500);
  }
}

function makeAIMove() {
  if (!gameActive) return;
  
  let move;
  
  if (gameMode === 'easy') {
    move = getRandomMove(gameBoard);
  } else {
    move = getBestMove(gameBoard, aiPlayer);
  }
  
  if (move) {
    makeMove(move.row, move.col);
  }
}

function handleGameEnd(result) {
  gameActive = false;
  
  if (result === 'tie') {
    statusDisplay.textContent = 'Remis!';
  } else {
    
    //console.log(playerScore);
    statusDisplay.textContent = `Gracz ${result} wygrywa!`;
    if(result === 'X'){
      playerScore++;
    } else if (result === 'Osp'){
      aiScore++;
    }
    XscoreDisplay.textContent = `Player Score: ${playerScore}`;
    OscoreDisplay.textContent = `Ai Score: ${aiScore}`;

  }
}

function updateStatusDisplay() {
  if (gameActive) {
    statusDisplay.textContent = `Tura gracza: ${currentPlayer}`;
  }
}

function restartGame() {
  if (gameMode) {
    startGameWithMode(gameMode);
  } else {
    startGameWithMode('player');
  }
}

export function stopTicTacToeGame() {
  if (typeof gameActive !== 'undefined') {
    gameActive = false;
  }
}