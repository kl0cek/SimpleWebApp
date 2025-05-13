// Plik z podstawową logiką gry kółko i krzyżyk
export function checkWinner(board) {
  // Sprawdzenie wierszy
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] !== '' && 
      board[i][0] === board[i][1] && 
      board[i][1] === board[i][2]
    ) {
      return board[i][0];
    }
  }

  // Sprawdzenie kolumn
  for (let i = 0; i < 3; i++) {
    if (
      board[0][i] !== '' && 
      board[0][i] === board[1][i] && 
      board[1][i] === board[2][i]
    ) {
      return board[0][i];
    }
  }

  // Sprawdzenie przekątnych
  if (
    board[0][0] !== '' && 
    board[0][0] === board[1][1] && 
    board[1][1] === board[2][2]
  ) {
    return board[0][0];
  }

  if (
    board[0][2] !== '' && 
    board[0][2] === board[1][1] && 
    board[1][1] === board[2][0]
  ) {
    return board[0][2];
  }

  // Sprawdzenie remisu
  const isBoardFull = board.every(row => row.every(cell => cell !== ''));
  if (isBoardFull) {
    return 'tie';
  }

  // Gra trwa
  return null;
}

export function getRandomMove(board) {
  const availableMoves = [];
  
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '') {
        availableMoves.push({ row: i, col: j });
      }
    }
  }
  
  if (availableMoves.length === 0) {
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * availableMoves.length);
  return availableMoves[randomIndex];
}

export function getBestMove(board, player) {
  
  const opponent = player === 'X' ? 'O' : 'X';
  
  // Sprawdź czy można wygrać w następnym ruchu
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '') {
        // Spróbuj ruch
        board[i][j] = player;
        if (checkWinner(board) === player) {
          board[i][j] = ''; // Cofnij ruch
          return { row: i, col: j };
        }
        board[i][j] = ''; // Cofnij ruch
      }
    }
  }
  
  // Sprawdź czy trzeba zablokować przeciwnika
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '') {
        // Sprawdź ruch przeciwnika
        board[i][j] = opponent;
        if (checkWinner(board) === opponent) {
          board[i][j] = ''; // Cofnij ruch
          return { row: i, col: j };
        }
        board[i][j] = ''; // Cofnij ruch
      }
    }
  }
  
  // Spróbuj zająć środek
  if (board[1][1] === '') {
    return { row: 1, col: 1 };
  }
  
  // Spróbuj zająć rogi
  const corners = [
    { row: 0, col: 0 },
    { row: 0, col: 2 },
    { row: 2, col: 0 },
    { row: 2, col: 2 }
  ];
  
  const availableCorners = corners.filter(corner => 
    board[corner.row][corner.col] === ''
  );
  
  if (availableCorners.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableCorners.length);
    return availableCorners[randomIndex];
  }
  
  // Spróbuj zająć boki
  const sides = [
    { row: 0, col: 1 },
    { row: 1, col: 0 },
    { row: 1, col: 2 },
    { row: 2, col: 1 }
  ];
  
  const availableSides = sides.filter(side => 
    board[side.row][side.col] === ''
  );
  
  if (availableSides.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableSides.length);
    return availableSides[randomIndex];
  }
  
  return null;
}