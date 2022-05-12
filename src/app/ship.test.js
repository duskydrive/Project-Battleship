/* eslint-disable no-undef */
const Ship = require('./ship');

describe('Ship functions', () => {
  let testShip;
  test('Ship returns expected length', () => {
    testShip = Ship(2);
    expect(testShip.length).toEqual(2);
  });
  test('Hit function records hit', () => {
    testShip = Ship(2);
    testShip.hit();
    expect(testShip.hits.length).toEqual(1);
  });
  test('isSunk function shows true when ship has sunked', () => {
    testShip = Ship(2);
    testShip.hit();
    testShip.hit();
    expect(testShip.isSunk()).toEqual(true);
  });
  test('isSunk function shows false when ship has not sunked', () => {
    testShip = Ship(2);
    testShip.hit();
    expect(testShip.isSunk()).toEqual(false);
  });
});
