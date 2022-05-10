/* eslint-disable no-undef */
const Gameboard = require('./gameboard');

test('Gameboard place ship with right coordinates 1', () => {
  const testGameboard = Gameboard();
  testGameboard.placeShip(1, 2, 3, 4);
  expect(testGameboard.ships[0].coordinates).toEqual([1, 2, 3, 4]);
});

test('Gameboard place ship with right coordinates 2', () => {
  const testGameboard = Gameboard();
  testGameboard.placeShip(1, 3);
  expect(testGameboard.ships[0].coordinates).toEqual([1, 3]);
});

test('Gameboard place ship with right coordinates 3', () => {
  const testGameboard = Gameboard();
  testGameboard.placeShip(5, 16, 9);
  expect(testGameboard.ships[0].coordinates).toEqual([5, 16, 9]);
});

test('Gameboard place ship with right coordinates 4', () => {
  const testGameboard = Gameboard();
  testGameboard.placeShip(5, 16, 9);
  testGameboard.placeShip(1, 2);
  expect(testGameboard.ships[0].coordinates).toEqual([5, 16, 9]);
});

test('Gameboard place ship with right coordinates 5', () => {
  const testGameboard = Gameboard();
  testGameboard.placeShip(5, 16, 9);
  testGameboard.placeShip(1, 2);
  expect(testGameboard.ships[1].coordinates).toEqual([1, 2]);
});

test('Gameboard receives attack and ship gets hit 1', () => {
  const testGameboard = Gameboard();
  testGameboard.placeShip(1, 2, 3);
  testGameboard.receiveAttack(1);
  expect(testGameboard.ships[0].hitPositions).toEqual([1]);
});

test('Gameboard receives attack and ship gets hit 2', () => {
  const testGameboard = Gameboard();
  testGameboard.placeShip(1, 2, 3);
  testGameboard.receiveAttack(1);
  testGameboard.receiveAttack(3);
  expect(testGameboard.ships[0].hitPositions).toEqual([1, 3]);
});

test('Gameboard receives attack and ship gets hit 3', () => {
  const testGameboard = Gameboard();
  testGameboard.placeShip(1, 2, 3);
  testGameboard.placeShip(10, 11);
  testGameboard.receiveAttack(1);
  testGameboard.receiveAttack(10);
  expect(testGameboard.ships[0].hitPositions).toEqual([1]);
});

test('Gameboard receives attack and ship gets hit 4', () => {
  const testGameboard = Gameboard();
  testGameboard.placeShip(1, 2, 3);
  testGameboard.placeShip(10, 11);
  testGameboard.receiveAttack(1);
  testGameboard.receiveAttack(10);
  expect(testGameboard.ships[1].hitPositions).toEqual([10]);
});

test('Gameboard receives attack and missed', () => {
  const testGameboard = Gameboard();
  testGameboard.placeShip(1, 2, 3);
  testGameboard.receiveAttack(4);
  expect(testGameboard.missedAttacks).toEqual([4]);
});

test('Gameboard receives 2 attacks and missed', () => {
  const testGameboard = Gameboard();
  testGameboard.placeShip(1, 2, 3);
  testGameboard.receiveAttack(4);
  testGameboard.receiveAttack(8);
  expect(testGameboard.missedAttacks).toEqual([4, 8]);
});

test('Gameboard checks if all ships have sunked. False if they are not', () => {
  const testGameboard = Gameboard();
  testGameboard.placeShip(1, 2);
  testGameboard.placeShip(5, 6);
  testGameboard.receiveAttack(5);
  testGameboard.receiveAttack(6);
  expect(testGameboard.checkShips()).toEqual(false);
});

test('Gameboard checks if all ships have sunked. True if they did', () => {
  const testGameboard = Gameboard();
  testGameboard.placeShip(1, 2);
  testGameboard.placeShip(5, 6);
  testGameboard.receiveAttack(5);
  testGameboard.receiveAttack(6);
  testGameboard.receiveAttack(1);
  testGameboard.receiveAttack(2);
  expect(testGameboard.checkShips()).toEqual(true);
});
