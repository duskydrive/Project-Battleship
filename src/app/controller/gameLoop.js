const FindNearbyHits = require('../model/findNearbyHits');
const Player = require('../model/player');
const createHtmlGameboard = require('../view/createHtmlGameboard');
const markField = require('./markField');
const GenerateRandomCoordinate = require('../model/generateRandomCoordinate');
const toggleGameboard = require('./toggleGameboard');
const hideMainScreen = require('./hideMainScreen');
const toggleMenu = require('./toggleMenu');

const Gameloop = () => {
  let players = [];
  let compBrain;
  let generator = GenerateRandomCoordinate();
  const container = document.getElementById('wrapper');
  const startScreen = document.getElementById('startScreen');
  const overlay = document.getElementById('overlay');
  const modal = document.getElementById('modal');

  const defaultStatecompBrain = () => {
    compBrain = {
      isActive: false,
      start: null,
      curDirection: false,
      lastAttack: false,
      shipDirection: false,
      up: true,
      right: true,
      down: true,
      left: true,
    };
  };

  defaultStatecompBrain();

  const nextPlayer = (player) => {
    toggleGameboard();
    if (player.isComputer) {
      // eslint-disable-next-line no-use-before-define
      launchComputerAttack();
    }
  };

  const restartGame = () => {
    overlay.classList.remove('active');
    modal.classList.remove('active');
    document.getElementById('start-board').remove();
    startScreen.classList.remove('hide', 'remove');
    container.replaceChildren();
    players = [];
    defaultStatecompBrain();
    generator = GenerateRandomCoordinate();
    toggleMenu();
    setNewGame();
  };

  const finishGame = (winner) => {
    const heading = document.getElementById('winnerMsg');
    const restartBtn = document.getElementById('restart');
    heading.innerHTML = `${winner} won!`;
    overlay.classList.add('active');
    modal.classList.add('active');
    restartBtn.addEventListener('click', restartGame);
  };

  const launchComputerAttack = () => {
    setTimeout(() => {
      let coordinates = null;
      let finishFlag = false;

      if (compBrain.isActive) {
        let result = null;
        if (compBrain.curDirection && (!compBrain.lastAttack)) {
          result = FindNearbyHits(compBrain, generator).pickDirection(compBrain.curDirection);
        } else if (compBrain.curDirection && compBrain.lastAttack) {
          // eslint-disable-next-line max-len
          result = FindNearbyHits(compBrain, generator).pickDirection(compBrain.curDirection, compBrain.lastAttack);
        } else {
          result = FindNearbyHits(compBrain, generator).pickDirection();
        }
        [coordinates, compBrain.curDirection] = result;

        generator.removeCoordinatesFromAvailable(result[0]);
      } else {
        coordinates = generator.generateCoordinates();
      }
      const attackResult = players[1].attack(players[0], coordinates);
      const div = document.querySelector(`[data-coordinate="${attackResult[0]}"]`);

      markField(div, attackResult[1].result);

      // якщо стриляв рандомно, а потім влучив в ціль, активізувати АІ та зафіксувати координати

      if (attackResult[1].result === 'missed' && compBrain.isActive) {
        const key = compBrain.curDirection;
        compBrain[key] = false;
        compBrain.curDirection = false;
        compBrain.lastAttack = false;
      }

      if (attackResult[1].result === 'hit' && compBrain.isActive) {
        [compBrain.lastAttack] = attackResult;
        if (compBrain.start[0] === compBrain.lastAttack[0]) {
          compBrain.shipDirection = 'horizontal';
          compBrain.up = false;
          compBrain.down = false;
        } else {
          compBrain.shipDirection = 'vertical';
          compBrain.left = false;
          compBrain.right = false;
        }
      }

      if (attackResult[1].result === 'hit' && !(compBrain.isActive)) {
        compBrain.isActive = true;
        [compBrain.start] = attackResult;
      }

      if (attackResult[1].result === 'hit' && attackResult[1].isSunk) {
        defaultStatecompBrain();
        generator.removeNearbyFromAvailable(attackResult[1].shipPosition);
      }

      if (attackResult[1].result === 'hit') {
        if (players[0].getGameboard().isGameOver()) {
          finishFlag = true;
        }
      }

      if (finishFlag) {
        return finishGame('Computer');
      }
      return nextPlayer(players[0]);
    }, 500);
  };

  function launchPlayerAttack() {
    let finishFlag = false;
    const coordinates = this.getAttribute('data-coordinate').split(',').map((num) => parseInt(num, 10));

    const attackResult = players[0].attack(players[1], coordinates);

    markField(this, attackResult[1].result);

    if (players[1].getGameboard().isGameOver()) {
      finishFlag = true;
    }

    this.removeEventListener('click', launchPlayerAttack);

    if (finishFlag) {
      return finishGame('You');
    }
    return nextPlayer(players[1]);
  }

  const setUpPlayerAttacks = () => {
    const divs = document.querySelectorAll('#gameboard2 div');
    divs.forEach((div) => div.addEventListener('click', launchPlayerAttack));
  };

  const randomiseShipPositions = () => {
    const generateRandomInteger = (min, max) => Math.floor(min + Math.random() * (max - min + 1));
    const newShips = [{ length: 5, dir: 'horizontal' }, { length: 4, dir: 'horizontal' }, { length: 3, dir: 'horizontal' }, { length: 3, dir: 'horizontal' }, { length: 2, dir: 'horizontal' }];
    const shipsDirections = ['horizontal', 'vertical'];
    const positionedShips = [];
    const localGenerator = GenerateRandomCoordinate();
    for (let i = 0; i < newShips.length; i += 1) {
      const randomDir = shipsDirections[generateRandomInteger(0, 1)];
      newShips[i].dir = randomDir;
      let x;
      let y;
      const assignCoordinates = () => {
        if (newShips[i].dir === 'horizontal') {
          y = generateRandomInteger(0, (9 - newShips[i].length + 1));
          x = generateRandomInteger(0, 9);
        } else {
          x = generateRandomInteger(0, (9 - newShips[i].length + 1));
          y = generateRandomInteger(0, 9);
        }
      };
      assignCoordinates();
      let tempCoordinates = [];
      for (let n = 0; n < newShips[i].length;) {
        if (!localGenerator.isAvailable([x, y])) {
          n = 0;
          tempCoordinates = [];
          assignCoordinates();
        } else {
          tempCoordinates.push([x, y]);
          if (newShips[i].dir === 'horizontal') {
            y += 1;
          } else {
            x += 1;
          }
          n += 1;
        }
      }
      const newShipObj = {
        length: newShips[i].length,
        x: tempCoordinates[0][0],
        y: tempCoordinates[0][1],
        direction: randomDir,
      };

      for (let z = 0; z < tempCoordinates.length; z += 1) {
        localGenerator.removeCoordinatesFromAvailable(tempCoordinates[z]);
      }
      localGenerator.removeNearbyFromAvailable(tempCoordinates);
      positionedShips.push(newShipObj);
    }
    return positionedShips;
  };

  const startGame = (ships) => {
    hideMainScreen();
    const player1 = Player(false);
    player1.getGameboard().setBoard(10);
    container.appendChild(createHtmlGameboard('gameboard1').fillBoard(10));
    for (let i = 0; i < ships.length; i += 1) {
      player1.getGameboard().placeShip(ships[i].length, ships[i].x, ships[i].y, ships[i].direction);
      let { x, y } = ships[i];
      for (let n = 0; n < ships[i].length; n += 1) {
        document.querySelector(`#gameboard1 [data-coordinate="${x},${y}"]`).classList.add('ship');
        if (ships[i].direction === 'horizontal') {
          y += 1;
        } else {
          x += 1;
        }
      }
    }

    const computer = Player(true);
    computer.getGameboard().setBoard(10);

    const compShips = randomiseShipPositions();
    // console.log(compShips)
    for (let i = 0; i < compShips.length; i += 1) {
      // eslint-disable-next-line max-len
      computer.getGameboard().placeShip(compShips[i].length, compShips[i].x, compShips[i].y, compShips[i].direction);
    }

    container.appendChild(createHtmlGameboard('gameboard2').fillBoard(10));
    players.push(player1);
    players.push(computer);
    setUpPlayerAttacks();
  };

  const setNewGame = () => {
    startScreen.appendChild(createHtmlGameboard('start-board').fillBoard(10));
    const startBoard = document.getElementById('start-board');
    const newShips = [{ length: 5, dir: 'horizontal' }, { length: 4, dir: 'horizontal' }, { length: 3, dir: 'horizontal' }, { length: 3, dir: 'horizontal' }, { length: 2, dir: 'horizontal' }];
    let savedShips = [];
    let index = 0;
    const dirBtn = document.getElementById('shipDir');
    const replaceBtn = document.getElementById('replace');
    const startBtn = document.getElementById('start');

    const clearGame = () => {
      toggleMenu();
      document.getElementById('start-board').remove();
      startScreen.appendChild(createHtmlGameboard('start-board').fillBoard(10));
      // eslint-disable-next-line no-use-before-define
      setEvents();
      savedShips = [];
      index = 0;
    };

    const changeDirection = () => {
      if (newShips[index].dir === 'horizontal') {
        newShips[index].dir = 'vertical';
      } else {
        newShips[index].dir = 'horizontal';
      }
    };

    const sendShips = () => {
      startBtn.removeEventListener('click', sendShips);
      dirBtn.removeEventListener('click', changeDirection);
      replaceBtn.removeEventListener('click', clearGame);
      startGame(savedShips);
    };

    function drawShip() {
      const arr = this.getAttribute('data-coordinate').split(',').map((val) => parseInt(val, 10));
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < newShips[index].length; i++) {
        let x;
        let y;
        if (newShips[index].dir === 'horizontal') {
          // eslint-disable-next-line prefer-destructuring
          x = arr[0];
          y = arr[1] + i;
        } else {
          x = arr[0] + i;
          // eslint-disable-next-line prefer-destructuring
          y = arr[1];
        }

        if (x > 9 || y > 9) {
          startBoard.classList.add('nodrop');
        } else {
          const div = document.querySelector(`[data-coordinate="${x},${y}"]`);
          if (div.classList.contains('disable')) {
            startBoard.classList.add('nodrop');
          } else {
            div.classList.add('hover');
          }
        }
      }
    }

    const removeShip = () => {
      const hovers = document.querySelectorAll('#start-board .hover');
      hovers.forEach((cell) => cell.classList.remove('hover'));
      startBoard.classList.remove('nodrop');
    };

    const isLegit = () => {
      if (!startBoard.classList.contains('nodrop')) {
        return true;
      }
      return false;
    };

    const disableNearby = (ship) => {
      const curShip = ship;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < curShip.length; i++) {
        const val1 = document.querySelector(`[data-coordinate="${curShip.x - 1},${curShip.y}"]`);
        const val2 = document.querySelector(`[data-coordinate="${curShip.x + 1},${curShip.y}"]`);
        const val3 = document.querySelector(`[data-coordinate="${curShip.x},${curShip.y - 1}"]`);
        const val4 = document.querySelector(`[data-coordinate="${curShip.x},${curShip.y + 1}"]`);
        const val5 = document.querySelector(`[data-coordinate="${curShip.x - 1},${curShip.y - 1}"]`);
        const val6 = document.querySelector(`[data-coordinate="${curShip.x + 1},${curShip.y - 1}"]`);
        const val7 = document.querySelector(`[data-coordinate="${curShip.x - 1},${curShip.y + 1}"]`);
        const val8 = document.querySelector(`[data-coordinate="${curShip.x + 1},${curShip.y + 1}"]`);

        const arr = [val1, val2, val3, val4, val5, val6, val7, val8];

        arr.forEach((val) => {
          if (val) {
            val.classList.add('disable');
          }
        });

        if (curShip.direction === 'horizontal') {
          curShip.y += 1;
        } else {
          curShip.x += 1;
        }
      }
    };

    function saveShip() {
      const disableBoard = () => {
        toggleMenu();
        const cells = document.querySelectorAll('#start-board div');
        cells.forEach((cell) => {
          cell.removeEventListener('mouseover', drawShip);
          cell.removeEventListener('mouseout', removeShip);
          cell.removeEventListener('click', saveShip);
        });
      };

      if (isLegit()) {
        const arr = this.getAttribute('data-coordinate').split(',').map((val) => parseInt(val, 10));
        const currentShip = {
          length: newShips[index].length,
          x: arr[0],
          y: arr[1],
          direction: newShips[index].dir,
        };
        const clone = structuredClone(currentShip);

        savedShips.push(clone);
        disableNearby(currentShip);
        const hovers = document.querySelectorAll('#start-board .hover');
        hovers.forEach((cell) => {
          cell.classList.add('save', 'disable');
          cell.removeEventListener('mouseover', drawShip);
          cell.removeEventListener('click', saveShip);
        });
        index += 1;
        if (index === newShips.length) {
          disableBoard();
        }
      }
    }

    const setEvents = () => {
      const cells = document.querySelectorAll('#start-board div');
      cells.forEach((cell) => {
        cell.addEventListener('mouseover', drawShip);
        cell.addEventListener('mouseout', removeShip);
        cell.addEventListener('click', saveShip);
      });
    };

    setEvents();

    replaceBtn.addEventListener('click', clearGame);
    startBtn.addEventListener('click', sendShips);
    dirBtn.addEventListener('click', changeDirection);
  };

  return {
    startGame, setNewGame,
  };
};

module.exports = Gameloop;
