export function generateFood(snake, boardSize){
    let food;
    do {
        food = [
            Math.floor(Math.random() * boardSize),
            Math.floor(Math.random() * boardSize)
        ];

    } while (snake.some(([y, x]) => y === food[0] && x === food[1]));

    return food;
}

export function moveSnake(snake, direction, boardSize, canPassWalls){
    const head = snake[0];
    let newHead;
    
    if (canPassWalls) {
        newHead = [(head[0] + direction[0] + boardSize) % boardSize, 
                (head[1] + direction[1] + boardSize) % boardSize];
    } else {
        newHead = [head[0] + direction[0],
                 head[1] + direction[1]];
        
        if (newHead[0] < 0 || newHead[0] >= boardSize || 
            newHead[1] < 0 || newHead[1] >= boardSize) {

            return null, alert("bardzo sie starałes, lecz z gry wyleciałeś");
        }
    }

    const newSnake = [newHead, ...snake.slice(0, -1)];
    return newSnake;
}

export function isWallCollision(snake, boardSize) {
    const head = snake[0];
    return head[0] < 0 || head[0] >= boardSize || head[1] < 0 || head[1] >= boardSize;
}

export function isCollision(snake, checkWalls = true, boardSize){
    const [head, ...body] = snake;

    const bodyCollision = body.some(([y, x]) => y === head[0] && x === head[1]);
    
    if (checkWalls) {
        return bodyCollision || isWallCollision(snake, boardSize);
    }
    
    return bodyCollision;
}

export function eatFood(snake, food) {
  const head = snake[0];
  return head[0] === food[0] && head[1] === food[1];
}