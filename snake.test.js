const {
    generateFood,
    moveSnake,
    isCollision,
    eatFood,
} = require('./snake-logic');

describe('Snake logic', () => {
    test('generateFood returns non-overlapping food', () => {
        const snake = [[0,0], [0,1], [0,2,]];
        const food = generateFood(snake, 5);
        expect(snake).not.toContainEqual(food);
    });

    test('isCollision detects collision with self', () => {
        const snake = [[1, 1], [1, 2], [1, 1]];
        expect(isCollision(snake)).toBe(true);
      });
    
      test('eatFood detects food correctly', () => {
        const snake = [[2, 3]];
        const food = [2, 3];
        expect(eatFood(snake, food)).toBe(true);
      });
    
      test('eatFood returns false if no match', () => {
        const snake = [[2, 3]];
        const food = [3, 3];
        expect(eatFood(snake, food)).toBe(false);
      });
});