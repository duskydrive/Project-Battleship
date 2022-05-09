/* eslint-disable no-undef */
const Ship = require('./ship');

test('Ship returns object with expected length', () => {
  const testShip = Ship(1, 2, 3, 4);
  expect(testShip.length).toEqual(4);
});
test('Hit function records hit', () => {
  const testShip = Ship(4);
  expect(testShip.hit(3)).toEqual([3]);
});
test('isSunk function shows true when ship has sunked', () => {
  const testShip = Ship(1, 2);
  testShip.hit(1);
  testShip.hit(2);
  expect(testShip.isSunk()).toEqual(true);
});
test('isSunk function shows false when ship has not sunked', () => {
  const testShip = Ship(1, 2);
  testShip.hit(1);
  expect(testShip.isSunk()).toEqual(false);
});
