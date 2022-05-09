/* eslint-disable no-undef */
const Gameboard = require('./gameboard');

test('Gameboard place ship with right coordinates 1', () => {
  const testGameboard = Gameboard();
  expect(testGameboard.placeShip(1, 2, 3, 4)).toEqual([1, 2, 3, 4]);
});

test('Gameboard place ship with right coordinates 2', () => {
  const testGameboard = Gameboard();
  expect(testGameboard.placeShip(1, 3)).toEqual([1, 3]);
});

test('Gameboard place ship with right coordinates 3', () => {
  const testGameboard = Gameboard();
  expect(testGameboard.placeShip(5, 16, 9)).toEqual([5, 16, 9]);
});

test('Gameboard receives attack and ship gets hit', () => {
  const testGameboard = Gameboard();
  testGameboard.placeShip(1, 2, 3);
  expect(testGameboard.receiveAttack(1)).toEqual([1]);
});

test('Gameboard receives attack and missed', () => {
  const testGameboard = Gameboard();
  testGameboard.placeShip(1, 2, 3);
  expect(testGameboard.receiveAttack(4)).toEqual([4]);
});
