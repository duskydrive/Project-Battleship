const Ship = require('./ship');

const Gameboard = () => {
  const missedAttacks = [];
  const ships = [];

  const placeShip = (...values) => {
    const newShip = Ship(...values);
    ships.push(newShip);
  };

  const checkShips = () => {
    let result = true;

    for (let i = 0; i < ships.length; i++) {
      if (!ships[i].isSunk()) {
        result = false;
        break;
      }
    }

    return result;
  };

  const registerMissedAttack = (coordinate) => {
    missedAttacks.push(coordinate);
    return missedAttacks;
  };

  const receiveAttack = (coordinate) => {
    const target = ships.find((ship) => ship.coordinates.includes(coordinate));

    if (target === undefined) {
      registerMissedAttack(coordinate);
    } else {
      target.hit(coordinate);

      if (target.isSunk()) {
        checkShips();
      }
    }
  };

  return {
    placeShip, receiveAttack, checkShips, ships, missedAttacks,
  };
};

module.exports = Gameboard;
