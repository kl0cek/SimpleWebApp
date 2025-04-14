const board = document.getElementById('game-board');
const size = 20;
let snake = [[10, 10]];
let direction = [0,1];
let food = generateFood();
let gameOver = false;

function drawBoard() {
    board.innerHTML = '' ;

    for(let y = 0; y <size; y++){
        for(let x = 0; x<size; x++){

            const cell = document.createElement('div');
            cell.classList.add('cell');

            if(snake.some(([sy, sx]) => sy === y && sx === x)){
                cell.classList.add('snake');
            }


            if (food[0] === y && food[1] === x) {
                cell.classList.add('food');
              }
        
            board.appendChild(cell);
            
            console.log("board");

        }
    }
}

function generateFood(){
    let f;
    do {
        f = [
            Math.floor(Math.random() * size),
            Math.floor(Math.random() * size)
        ];

    } while (snake.some(([y, x]) => y === f[0] && x === f[1]));

    console.log("food");

    return f;
    
}

function move(){
    if(gameOver) return;

    const head = snake[0];
    const newHead = [(head[0] + direction[0] + size) % size , (head[1] + direction[1] + size) % size ];

    if (snake.some(([y,x]) => y === newHead[0] && x === newHead[1])) {
        alert("pozdro pocwicz");
        gameOver = true;
        return;
    }

    snake.unshift(newHead);

    if(newHead[0] === food[0] && newHead[1] === food[1]){
        food = generateFood();

    }else {
        snake.pop();
    }

    drawBoard();
}

setInterval(move, 200);

document.addEventListener('keydown', (e) => {
    switch (e.key){
        case 'ArrowUp' : if (direction[0] !== 1) direction = [-1,0]; break;
        case 'ArrowDown' : if (direction[0] !== -1) direction = [1,0]; break;
        case 'ArrowLeft' : if (direction[1] !== 1) direction = [0,-1]; break;
        case 'ArrowRight' : if (direction[1] !== -1) direction = [0,1]; break;
    }
});

drawBoard();