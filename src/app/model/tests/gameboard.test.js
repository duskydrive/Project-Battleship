// /* eslint-disable no-undef */
// const Gameboard = require('../gameboard');

// describe('Set gameboard tests', () => {
//   test('Set gameboard works as expected 1', () => {
//     const testGameboard = Gameboard();
//     testGameboard.setBoard(10);
//     expect(testGameboard.getBoard().length).toEqual(10);
//   });
//   test('Set gameboard works as expected 2', () => {
//     const testGameboard = Gameboard();
//     testGameboard.setBoard(5);
//     expect(testGameboard.getBoard().length).toEqual(5);
//   });
//   test('Set gameboard works as expected 3  inner row length', () => {
//     const testGameboard = Gameboard();
//     testGameboard.setBoard(10);
//     expect(testGameboard.getBoard()[0].length).toEqual(10);
//   });
//   test('Set gameboard works as expected 4 inner row length', () => {
//     const testGameboard = Gameboard();
//     testGameboard.setBoard(5);
//     expect(testGameboard.getBoard()[0].length).toEqual(5);
//   });
// });

// describe('Placeship function tests', () => {
//   test('placeShip places ship at right coordinates and gives it right ID 1', () => {
//     const testGameboard = Gameboard();
//     testGameboard.setBoard(10);
//     testGameboard.placeShip(2, 0, 0, 'horizontal');
//     expect(testGameboard.getBoard()[0][0]).toEqual({
//       isShot: false,
//       shipId: 0,
//     });
//   });
//   test('placeShip places ship at right coordinates and gives it right ID 2', () => {
//     const testGameboard = Gameboard();
//     testGameboard.setBoard(10);
//     testGameboard.placeShip(2, 0, 0, 'horizontal');
//     expect(testGameboard.getBoard()[0][1]).toEqual({
//       isShot: false,
//       shipId: 0,
//     });
//   });
//   test('placeShip does not put ship at wrong coordinate (no id)', () => {
//     const testGameboard = Gameboard();
//     testGameboard.setBoard(10);
//     testGameboard.placeShip(2, 0, 0, 'horizontal');
//     expect(testGameboard.getBoard()[0][2]).toEqual({
//       isShot: false,
//       shipId: false,
//     });
//   });
// });

// test('Gameboard receives attack and ship gets hit 1', () => {
//   const testGameboard = Gameboard();
//   testGameboard.setBoard(10);
//   testGameboard.placeShip(2, 0, 0, 'horizontal');
//   testGameboard.receiveAttack(0, 0);
//   expect(testGameboard.receiveAttack(0, 1)).toEqual(true);
// });

// test('Gameboard receives attack and missed', () => {
//   const testGameboard = Gameboard();
//   testGameboard.setBoard(10);
//   testGameboard.placeShip(2, 0, 0, 'horizontal');
//   testGameboard.receiveAttack(0, 0);
//   testGameboard.receiveAttack(0, 2);
//   expect(testGameboard.getMissedAttacks()).toEqual([[0, 2]]);
// });

// test('Gameboard checks if all ships have sunked. False if they are not', () => {
//   const testGameboard = Gameboard();
//   testGameboard.setBoard(10);
//   testGameboard.placeShip(2, 0, 0, 'horizontal');
//   testGameboard.placeShip(1, 1, 0, 'horizontal');
//   testGameboard.receiveAttack(1, 0);
//   expect(testGameboard.isGameOver()).toEqual(false);
// });

// test('Gameboard checks if all ships have sunked. True if they did', () => {
//   const testGameboard = Gameboard();
//   testGameboard.setBoard(10);
//   testGameboard.placeShip(2, 0, 0, 'horizontal');
//   testGameboard.placeShip(1, 1, 0, 'horizontal');
//   testGameboard.receiveAttack(1, 0);
//   testGameboard.receiveAttack(0, 0);
//   testGameboard.receiveAttack(0, 1);
//   expect(testGameboard.isGameOver()).toEqual(true);
// });
