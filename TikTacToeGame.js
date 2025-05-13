// Plik z implementacją gry kółko i krzyżyk
import { checkWinner, getRandomMove, getBestMove } from './TikTacToeLogic.js';

const gameBoardElement = document.getElementById('game-board-TikTacToe');
const restartBtnTicTacToe = document.querySelector('#TikTacToe #restart');
const statusDisplay = document.createElement('div');
statusDisplay.id = 'status';
document.getElementById('scoreboardTikTacToe').prepend(statusDisplay);

let gameBoard;
let currentPlayer;
let gameActive;
let gameMode;
let aiPlayer;

export function initTicTacToeGame() {
  // Dodanie przycisków wyboru trybu gry
  createModeSelectionButtons();
  
  // Inicjalizacja przycisków i eventListenerów
  if (restartBtnTicTacToe) {
    restartBtnTicTacToe.addEventListener('click', restartGame);
  }
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
  
  const tictactoeContainer = document.getElementById('TikTacToe');
  tictactoeContainer.insertBefore(modeContainer, gameBoardElement);
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
  
  // Sprawdź czy pole jest puste
  if (gameBoard[row][col] !== '') return;
  
  // Wykonaj ruch
  makeMove(row, col);
}

function makeMove(row, col) {
  gameBoard[row][col] = currentPlayer;
  renderBoard();
  
  // Sprawdź czy gra się zakończyła
  const winner = checkWinner(gameBoard);
  if (winner) {
    handleGameEnd(winner);
    return;
  }
  
  // Zmień gracza
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatusDisplay();
  
  // Jeśli gra z AI i jest kolej AI
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
    statusDisplay.textContent = `Gracz ${result} wygrywa!`;
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
    // Domyślnie rozpocznij grę w trybie dla dwóch graczy
    startGameWithMode('player');
  }
}

export function stopTicTacToeGame() {
  gameActive = false;
}