/**
 * @jest-environment jsdom
 */

import { initSidebar } from '../src/sidebar.js';

describe('Sidebar Tests', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="container">
        <nav class="sidebar">
          <h2 id="sidebar"><a href="#"> SIDEBAR </a></h2>
          <ul>
            <li><a href="#" data-game="snake">Snake</a></li>
            <li><a href="#" data-game="TikTacToe">Tik-Tac-Toe</a></li>
            <li><a href="#" data-game="Trex">Trex game</a></li>
          </ul>
        </nav>
        
        <main class="dificulty">
          <h2 id="dificulty">Choose dificulty</h2>
          <ul>
            <li><a href="#" game-dificulty="easy">Easy</a></li>
            <li><a href="#" game-dificulty="hard">Hard</a></li>
          </ul>
        </main>
        
        <main class="main-container">
          <div id="game-snake" class="game-section hiddenSnakeGame">
            <h1>SNAKE</h1>
          </div>
          <div id="game-TikTacToe" class="game-section hiddenSnakeGame">
            <h1>Tic-Tac-Toe</h1>
          </div>
          <div id="game-Trex" class="game-section hiddenSnakeGame">
            <h1>Trex game</h1>
          </div>
        </main>
      </div>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should initialize sidebar correctly', () => {
    initSidebar();
    
    const sidebarLinks = document.querySelectorAll('.sidebar a[data-game]');
    expect(sidebarLinks.length).toBe(3);
  });

  test('should show difficulty panel for Snake game', () => {
    initSidebar();
    
    const snakeLink = document.querySelector('[data-game="snake"]');
    const difficultyPanel = document.querySelector('.dificulty');
    
    // Symuluj kliknięcie na Snake
    snakeLink.click();
    
    expect(difficultyPanel.classList.contains('active')).toBe(true);
  });

  test('should show game section for non-Snake games', () => {
    initSidebar();
    
    const trexLink = document.querySelector('[data-game="Trex"]');
    const trexSection = document.getElementById('game-Trex');
    
    // Symuluj kliknięcie na T-Rex
    trexLink.click();
    
    expect(trexSection.classList.contains('hiddenSnakeGame')).toBe(false);
    expect(trexSection.classList.contains('slide-in')).toBe(true);
  });

  test('should hide all game sections initially', () => {
    const gameSections = document.querySelectorAll('.game-section');
    
    gameSections.forEach(section => {
      expect(section.classList.contains('hiddenSnakeGame')).toBe(true);
    });
  });

  test('should handle difficulty selection', () => {
    initSidebar();
    
    const easyLink = document.querySelector('[game-dificulty="easy"]');
    const difficultyPanel = document.querySelector('.dificulty');
    const snakeSection = document.getElementById('game-snake');
    
    // Symuluj wybór trudności
    easyLink.click();
    
    expect(difficultyPanel.classList.contains('active')).toBe(false);
    expect(snakeSection.classList.contains('hiddenSnakeGame')).toBe(false);
  });
});