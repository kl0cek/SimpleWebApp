/**
 * @jest-environment jsdom
 */

// Import funkcji do testowania
import { initTrexGame, stopTrexGame } from '../src/Trex.js';

describe('T-Rex Game Tests', () => {
  beforeEach(() => {
    // Setup DOM
    document.body.innerHTML = `
      <div id="game-Trex" class="game-section">
        <h1>Trex game</h1>
        <div id="game-board-Trex"></div>
        <div id="scoreboard">
          <button id="restart">Restart</button>
          <div id="score">Score: 0</div>
          <div id="high-score">High Score: 0</div>
        </div>
      </div>
    `;
    
    // Clear localStorage
    localStorage.clear();
    
    // Clear all timers
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  afterEach(() => {
    // Cleanup
    jest.clearAllTimers();
    jest.useRealTimers();
    document.body.innerHTML = '';
  });

  test('should initialize game board correctly', () => {
    const gameBoardTrex = document.getElementById('game-board-Trex');
    expect(gameBoardTrex).toBeTruthy();
    
    initTrexGame();
    
    // Fast-forward przez setTimeout w initTrexGame
    jest.advanceTimersByTime(1000);
    
    const grid = document.querySelector('.grid');
    const dino = document.querySelector('.dino');
    const alert = document.getElementById('alert');
    
    expect(grid).toBeTruthy();
    expect(dino).toBeTruthy();
    expect(alert).toBeTruthy();
  });

  test('should update score correctly', () => {
    initTrexGame();
    jest.advanceTimersByTime(1000);
    
    const scoreElement = document.querySelector('#game-Trex #score');
    expect(scoreElement.textContent).toBe('Score: 0');
  });

  test('should load high score from localStorage', () => {
    localStorage.setItem('trexHighScore', '100');
    
    initTrexGame();
    jest.advanceTimersByTime(1000);
    
    const highScoreElement = document.querySelector('#game-Trex #high-score');
    expect(highScoreElement.textContent).toBe('High Score: 100');
  });

  test('should create dino element with correct class', () => {
    initTrexGame();
    jest.advanceTimersByTime(1000);
    
    const dino = document.querySelector('.dino');
    expect(dino).toBeTruthy();
    expect(dino.classList.contains('dino')).toBe(true);
  });

  test('should handle restart button click', () => {
    initTrexGame();
    jest.advanceTimersByTime(1000);
    
    const restartBtn = document.querySelector('#game-Trex #scoreboard button#restart');
    expect(restartBtn).toBeTruthy();
    
    // Symuluj kliknięcie restart
    restartBtn.click();
    jest.advanceTimersByTime(1000);
    
    // Sprawdź czy gra została zresetowana
    const scoreElement = document.querySelector('#game-Trex #score');
    expect(scoreElement.textContent).toBe('Score: 0');
  });
});