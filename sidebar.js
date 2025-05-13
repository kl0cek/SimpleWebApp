// Plik z logiką sidebara i nawigacji
import { initGame, setGameDifficulty, stopGame } from './snakeGame.js';
import { stopTicTacToeGame } from './TikTacToeGame.js';

const gameSections = document.querySelectorAll('.game-section');
const difficultyPanel = document.querySelector('.dificulty');

export function initSidebar() {
  // Kliknięcia w linki w sidebarze
  document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const gameName = link.dataset.game;
      
      // Ukryj wszystkie sekcje gier
      gameSections.forEach(section => {
        section.classList.add('hiddenSnakeGame');
        section.classList.remove('slide-in', 'slide-out');
      });
      
      // Pokaż panel wyboru trudności tylko dla Snake
      if (gameName === 'snake') {
        difficultyPanel.classList.add('active');
      } else {
        difficultyPanel.classList.remove('active');
        
        // Dla innych gier pokazuj bezpośrednio sekcję gry
        const targetSection = document.getElementById(`game-${gameName}`);
        if (targetSection) {
          targetSection.classList.remove('hiddenSnakeGame');
          targetSection.classList.add('slide-in');
        }
      }
    });
  });

  // Obsługa wyboru poziomu trudności
  document.querySelectorAll('[game-dificulty]').forEach(difficultyLink => {
    difficultyLink.addEventListener('click', (e) => {
      e.preventDefault();
      
      const difficulty = difficultyLink.getAttribute('game-dificulty');
      
      difficultyPanel.classList.remove('active');
      
      const snakeGame = document.getElementById('game-snake');
      snakeGame.classList.remove('hiddenSnakeGame');
      snakeGame.classList.add('slide-in');
      
      setGameDifficulty(difficulty);
    });
  });

  // Obsługa powrotu do menu
  document.getElementById('sidebar').addEventListener('click', () => {
    difficultyPanel.classList.remove('active');

    gameSections.forEach(section => {
      if (!section.classList.contains('hiddenSnakeGame')) {
        section.classList.remove('slide-in');
        section.classList.add('slide-out');

        section.addEventListener('animationend', function handler() {
          section.classList.add('hiddenSnakeGame');
          stopGame(); // Zatrzymaj grę Snake
          stopTicTacToeGame(); // Zatrzymaj grę kółko i krzyżyk
          section.classList.remove('slide-out');
          section.removeEventListener('animationend', handler);
        });
      }
    });
  });
}