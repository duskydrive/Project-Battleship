/* eslint-disable no-undef */
const Gameloop = require('../../controller/gameLoop');

test('Gameboard place ship with right coordinates 1', () => {
  const game = Gameloop();
  game.startGame([{
    length: 4, x: 0, y: 0, direction: 'vertical',
  }]);
  expect(testGameboard.getShip(0).getCoordinates()).toEqual([1, 2, 3, 4]);
});
