const Ship = require('./ship');

const Gameboard = () => {
  const missedAttacks = [];
  const ships = [];
  const board = [];

  const setBoard = (num) => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < num; i++) {
      board.push([]);
      // eslint-disable-next-line no-plusplus
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

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < length; i++) {
      board[row][column] = {
        shipId: id,
        isShot: false,
      };
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

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < ships.length; i++) {
      if (!ships[i].ship.isSunk()) {
        result = false;
        break;
      }
    }

    return result;
  };

  const registerMissedAttack = (x, y) => {
    missedAttacks.push([x, y]);
  };

  const getMissedAttacks = () => missedAttacks;

  // eslint-disable-next-line consistent-return
  const receiveAttack = (x, y) => {
    const target = board[x][y];
    target.isShot = true;

    if (target.shipId === false) {
      return registerMissedAttack(x, y);
    }
    const targetShip = ships.find((ship) => ship.id === target.shipId).ship;
    targetShip.hit();

    if (targetShip.isSunk()) {
      return isGameOver();
    }
  };

  return {
    placeShip,
    setBoard,
    getBoard,
    receiveAttack,
    getMissedAttacks,
    isGameOver,
  };
};

module.exports = Gameboard;
