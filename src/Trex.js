export function initTrexGame() {
  // Poczekaj aż DOM będzie w pełni załadowany
  setTimeout(() => {
    const gameBoardTrex = document.getElementById('game-board-Trex');
    
    if (!gameBoardTrex) {
      console.error('Nie znaleziono elementu game-board-Trex');
      return;
    }
    
    gameBoardTrex.innerHTML = '';
    
    const grid = document.createElement('div');
    grid.className = 'grid';
    
    const dino = document.createElement('div');
    dino.className = 'dino';
    
    const alert = document.createElement('div');
    alert.id = 'alert';
    
    grid.appendChild(dino);
    grid.appendChild(alert);
    gameBoardTrex.appendChild(grid);
    
    const scoreElement = document.querySelector('#game-Trex #score');
    const highScoreElement = document.querySelector('#game-Trex #high-score');
    
    if (scoreElement) {
      scoreElement.textContent = 'Score: 0';
    }
    
    if (highScoreElement) {
      const highScore = localStorage.getItem('trexHighScore') || 0;
      highScoreElement.textContent = `High Score: ${highScore}`;
    }
    
    startTrexGame();
  }, 1000);
}

function startTrexGame() {
  const dino = document.querySelector('.dino');
  const grid = document.querySelector('.grid');
  const alert = document.getElementById('alert');
  const scoreElement = document.querySelector('#game-Trex #score');
  
  let gravity = 0.9;
  let isJumping = false;
  let isGameOver = false;
  let score = 0;
  let scoreInterval;
  
  function control(e) {
    if (e.code === "Space" || e.key === " ") {
      if (!isJumping) {
        jump();
      }
    }
  }
  document.addEventListener('keydown', control);
  
  function updateScore() {
    score++;
    if (scoreElement) {
      scoreElement.textContent = `Score: ${score}`;
    }
  }
  
  // Funkcja skoku
  let position = 0;
  function jump() {
    isJumping = true;
    let count = 0;
    let timerId = setInterval(function() {
      if (count === 15) {
        clearInterval(timerId);
        let downTimerId = setInterval(function() {
          if (count === 0) {
            clearInterval(downTimerId);
            isJumping = false;
          }
          position -= 5;
          count--;
          position = position * gravity;
          dino.style.bottom = position + 'px';
        }, 20);
      }
      
      
      position += 20;
      count++;
      position = position * gravity;
      dino.style.bottom = position + 'px';
    }, 20);
  }
  
  function generateObstacles() {
    if (!isGameOver) {
      let randomTime = Math.random() * 4000;
      let obstaclePosition = 1000;
      const obstacle = document.createElement('div');
      obstacle.classList.add('obstacle');
      grid.appendChild(obstacle);
      obstacle.style.left = obstaclePosition + 'px';
      
      let timerId = setInterval(function() {
        if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
          clearInterval(timerId);
          if (alert) alert.innerHTML = 'Game Over';
          isGameOver = true;
          
          const highScore = localStorage.getItem('trexHighScore') || 0;
          if (score > highScore) {
            localStorage.setItem('trexHighScore', score);
            const highScoreElement = document.querySelector('#game-Trex #high-score');
            if (highScoreElement) {
              highScoreElement.textContent = `High Score: ${score}`;
            }
          }
          
          clearInterval(scoreInterval);
          
          while (grid.firstChild) {
            grid.removeChild(grid.lastChild);
          }
          
          const restartBtn = document.createElement('button');
          restartBtn.textContent = 'Restart';
          restartBtn.addEventListener('click', function() {
            restartBtn.remove();
            document.removeEventListener('keydown', control);
            initTrexGame();
          });
          document.querySelector('#game-Trex #scoreboard').appendChild(restartBtn);
        }
        
        obstaclePosition -= 10;
        obstacle.style.left = obstaclePosition + 'px';
        
        if (obstaclePosition < -20) {
          clearInterval(timerId);
          grid.removeChild(obstacle);
        }
      }, 20);
      
      if (!isGameOver) {
        setTimeout(generateObstacles, randomTime);
      }
    }
  }
  
  generateObstacles();
  
  scoreInterval = setInterval(() => {
    if (!isGameOver) {
      updateScore();
    }
  }, 100);
}

export function stopTrexGame() {
  document.removeEventListener('keydown', (e) => {
    if (e.code === "Space") {
    }
  });

}