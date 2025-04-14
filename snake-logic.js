export default function generateFood(snake, boardSize){
    let food;
    do {
        food = [
            Math.floor(Math.random() * boardSize),
            Math.floor(Math.random() * boardSize)
        ];

    } while (snake.some(([y, x]) => y === food[0] && x === food[1]));

    //console.log("food");

    return food;
    
}

export default function moveSnake(snake, direction, boardSize){
    const head = snake[0];
    const newHead = [(head[0] + direction[0] + boardSize) % boardSize , (head[1] + direction[1] + boardSize) % boardSize];

    const newSnake = [newHead, ...snake.slice(0, -1)];

    return newSnake;
}

export default function isCollision(snake){
    const [head, ...body] = snake;

    return body.some(([y, x]) => y === head[0] && x === head[1]);  
}

export default function eatFood(snake, food) {
  const head = snake[0];
  return head[0] === food[0] && head[1] === food[1];
}
