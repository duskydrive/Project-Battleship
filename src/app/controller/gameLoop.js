/* eslint-disable max-len */
const FindNearbyCoordinatesAI = require('../model/findNearbyCoordinatesAI');
const Player = require('../model/player');
const createHtmlGameboard = require('../view/createHtmlGameboard');
const changeField = require('./changeField');
const GenerateRandomCoordinate = require('../model/generateRandomCoordinate');

const Gameloop = () => {
  const players = [];
  let compAttackFlag;
  const defaultStateCompAttackFlag = () => {
    compAttackFlag = {
      flag: false,
      startCoordinates: null,
      currentDirection: false,
      lastAttack: false,
      shipDirection: false,
      up: true,
      right: true,
      down: true,
      left: true,
    };
  };
  defaultStateCompAttackFlag();
  const generator = GenerateRandomCoordinate();
  const container = document.getElementById('wrapper');

  const nextPlayer = (player) => {
    if (player === 'comp') {
      players[1].getGameboard().blockGameboard();
      launchComputerAttack();
    } else {
      players[1].getGameboard().unblockGameboard();
    }
  };

  const finishGame = () => {
    alert('gameover!');
  };

  const launchComputerAttack = () => {
    setTimeout(() => {
      let coordinates = null;
      // let result = null;
      if (compAttackFlag.flag) {
        let result = null;
        if (compAttackFlag.currentDirection && compAttackFlag.lastAttack === false) {
          result = FindNearbyCoordinatesAI(compAttackFlag, generator).pickDirection(compAttackFlag.currentDirection);
        } else if (compAttackFlag.currentDirection && compAttackFlag.lastAttack) {
          result = FindNearbyCoordinatesAI(compAttackFlag, generator).pickDirection(compAttackFlag.currentDirection, compAttackFlag.lastAttack);

          // console.log(compAttackFlag)
          // console.log(compAttackFlag);
        } else {
          result = FindNearbyCoordinatesAI(compAttackFlag, generator).pickDirection();
        }
        coordinates = result[0];
        compAttackFlag.currentDirection = result[1];
        // console.log(`result[0] ${result[0][0]}`);
        // console.log(result[0])
        generator.removeCoordinatesFromAvailable(result[0]);
        // console.log(compAttackFlag);
      } else {
        coordinates = generator.generateCoordinates();
      }
      // console.log(`coordinates ${coordinates}`);
      // console.log(coordinates)
      const result = players[1].computerAttack(players[0], coordinates);
      const div = document.querySelector(`[data-coordinate="${result[0]}"]`);
      // console.log(result)
      changeField(div, result[1][0]);

      // якщо стриляв рандомно а потім влучив в ціль, активізувати АІ та зафіксувати координати

      if (result[1][0] === 'missed' && compAttackFlag.flag) {
        const key = compAttackFlag.currentDirection;
        compAttackFlag[key] = false;
        compAttackFlag.currentDirection = false;
        compAttackFlag.lastAttack = false;
      }

      if (result[1][0] === 'hit' && compAttackFlag.flag) {
        compAttackFlag.lastAttack = result[0]; 
        // console.log(`last attack ${compAttackFlag.lastAttack}`)
        if (compAttackFlag.startCoordinates[0] === compAttackFlag.lastAttack[0]) {
          compAttackFlag.shipDirection = 'horizontal';
          compAttackFlag.up = false;
          compAttackFlag.down = false;
        } else {
          compAttackFlag.shipDirection = 'vertical';
          compAttackFlag.left = false;
          compAttackFlag.right = false;
        }
      }

      if (result[1][0] === 'hit' && compAttackFlag.flag === false) {
        compAttackFlag.flag = true;
        compAttackFlag.startCoordinates = result[0];
      }

      if (result[1][0] === 'hit' && result[1][1]) {
        defaultStateCompAttackFlag();
        // console.log(result[1][2]);
        generator.removeNearbyFromAvailable(result[1][2]);
      }

      if (result[1][0] === 'hit') {
        if (players[0].getGameboard().isGameOver()) {
          return finishGame();
        }
      }

      nextPlayer('human');
    }, 500);
  };

  const launchPlayerAttack = function () {
    const arr = this.getAttribute('data-coordinate').split(',');
    // console.log(arr);
    const result = players[0].attack(players[1], parseInt(arr[0], 10), parseInt(arr[1], 10));
    // console.log(result)
    changeField(this, result[0]);

    if (players[1].getGameboard().isGameOver()) {
      return finishGame();
    }

    this.removeEventListener('click', launchPlayerAttack);
    nextPlayer('comp');
  };

  const setUpPlayerAttacks = () => {
    const divs = document.querySelectorAll('#gameboard2 div');
    divs.forEach((div) => div.addEventListener('click', launchPlayerAttack));
  };

  const setNewGame = () => {
    const player1 = Player(false);
    player1.getGameboard().setBoard(10);
    player1.getGameboard().placeShip(6, 0, 0, 'horizontal');
    player1.getGameboard().placeShip(6, 2, 0, 'horizontal');
    player1.getGameboard().placeShip(6, 4, 0, 'horizontal');
    player1.getGameboard().placeShip(6, 6, 0, 'horizontal');
    player1.getGameboard().placeShip(4, 4, 7, 'vertical');
    container.appendChild(createHtmlGameboard('gameboard1').fillBoard(10));
    const computer = Player(true);
    computer.getGameboard().setBoard(10);
    computer.getGameboard().placeShip(2, 0, 0, 'horizontal');
    container.appendChild(createHtmlGameboard('gameboard2').fillBoard(10));
    players.push(player1);
    players.push(computer);
    setUpPlayerAttacks();
  };

  return {
    setNewGame, players,
  };
};

module.exports = Gameloop;
