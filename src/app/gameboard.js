const Ship = require('./ship');

const Gameboard = () => {
  const missedAttacks = [];
  const ships = [];

  const placeShip = (...values) => {
    const newShip = Ship(...values);
    ships.push(newShip);
    // this return here is purely for test purposes
    return newShip.coordinates;
  };

  const registerMissedAttack = (coordinate) => {
    missedAttacks.push(coordinate);
    return missedAttacks;
  };

  const receiveAttack = (coordinate) => {
    const isThereAShip = ships.find((ship) => ship.coordinates.includes(coordinate));

    if (isThereAShip) {
      return isThereAShip.hit(coordinate);
    }
    return registerMissedAttack(coordinate);
  };

  return { placeShip, receiveAttack };
};

module.exports = Gameboard;
