import { initSnakeGame } from './snakeGame.js';
import { initSidebar } from './sidebar.js';
import { initTicTacToeGame } from './TikTacToeGame.js';

// Inicjalizacja komponentów aplikacji
document.addEventListener('DOMContentLoaded', () => {
  initSnakeGame();
  initSidebar();
  initTicTacToeGame();
});