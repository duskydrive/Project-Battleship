/* eslint-disable no-undef */
const FindNearbyCoordinatesAI = require('../findNearbyCoordinatesAI');

// test('fuck', () => {
// // const testG = Gameboard();
// // testGameboard.setBoard(10);
//   expect(FindNearbyCoordinatesAI({
//     flag: true,
//     startCoordinates: [0, 2],
//     currentDirection: 'left',
//     lastAttack: [0, 0],
//     up: false,
//     right: false,
//     down: true,
//     left: true,
//   }).pickDirection('left', [0, 0])).toEqual(10);
// });

test('fuck', () => {
  // const testG = Gameboard();
  // testGameboard.setBoard(10);
  expect(FindNearbyCoordinatesAI({
    flag: true,
    startCoordinates: [4, 2],
    currentDirection: 'left',
    lastAttack: [4, 0],
    up: false,
    right: true,
    down: false,
    left: true,
  }).pickDirection('left', [4, 0])).toEqual(10);
});
