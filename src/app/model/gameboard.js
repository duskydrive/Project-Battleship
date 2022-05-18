/* eslint-disable no-plusplus */
const Ship = require('./ship');

const Gameboard = () => {
  const missedAttacks = [];
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

  const registerMissedAttack = (x, y) => {
    missedAttacks.push([x, y]);
    return ['missed', false];
  };

  const getMissedAttacks = () => missedAttacks;

  const receiveAttack = (x, y) => {
    // console.log(typeof x, y);
    const target = getBoard()[x][y];
    target.isShot = true;

    if (target.shipId === false) {
      // alert('missed');

      return registerMissedAttack(x, y);
    }
    // alert('hit');
    const targetShip = ships.find((ship) => ship.id === target.shipId).ship;
    // console.log(targetShip)
    return [targetShip.hit(), targetShip.isSunk(), targetShip.getPositions()];

    // if (targetShip.isSunk()) {
    //   return isGameOver();
    // }
  };

  const blockGameboard = () => {
    const gameboards = document.querySelectorAll('.gameboard');
    gameboards.forEach((thisBoard) => thisBoard.classList.add('block'));
  };

  const unblockGameboard = () => {
    const gameboards = document.querySelectorAll('.gameboard');
    gameboards.forEach((thatBoard) => thatBoard.classList.remove('block'));
  };

  return {
    placeShip,
    setBoard,
    getBoard,
    receiveAttack,
    getMissedAttacks,
    isGameOver,
    blockGameboard,
    unblockGameboard,
  };
};

module.exports = Gameboard;
