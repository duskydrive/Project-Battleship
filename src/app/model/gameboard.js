/* eslint-disable no-plusplus */
const Ship = require('./ship');

const Gameboard = () => {
  const ships = [];
  const board = [];

  const setBoard = (num) => {
    for (let i = 0; i < num; i++) {
      board.push([]);
      for (let n = 0; n < num; n++) {
        board[i].push({
          shipId: false,
          isShot: false,
        });
      }
    }
  };

  const getBoard = () => board;

  const placeShip = (length, x, y, dir) => {
    const newShip = Ship(length);
    const id = ships.length;
    let row = x;
    let column = y;

    for (let i = 0; i < length; i++) {
      board[row][column] = {
        shipId: id,
        isShot: false,
      };
      newShip.addPositions([[row], [column]]);
      if (dir === 'horizontal') {
        column += 1;
      } else {
        row += 1;
      }
    }

    ships.push({
      id,
      ship: newShip,
    });
  };

  const isGameOver = () => {
    let result = true;

    for (let i = 0; i < ships.length; i++) {
      if (!ships[i].ship.isSunk()) {
        result = false;
        break;
      }
    }
    return result;
  };

  const receiveAttack = (coordinates) => {
    const target = getBoard()[coordinates[0]][coordinates[1]];
    target.isShot = true;

    if (target.shipId === false) {
      return ['missed', false];
    }

    const targetShip = ships.find((ship) => ship.id === target.shipId).ship;

    return {
      result: targetShip.hit(),
      isSunk: targetShip.isSunk(),
      shipPosition: targetShip.getPositions(),
    };
  };

  return {
    placeShip,
    setBoard,
    getBoard,
    receiveAttack,
    isGameOver,
  };
};

module.exports = Gameboard;
