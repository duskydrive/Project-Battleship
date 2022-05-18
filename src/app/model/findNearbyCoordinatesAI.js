const GenerateRandomCoordinate = require('../model/generateRandomCoordinate');

const FindNearbyCoordinatesAI = (obj, generator) => {
  // const generator = GenerateRandomCoordinate();
  const isUpLegit = (coordinates) => {
    if (coordinates[0] - 1 >= 0 && generator.isAvailable([coordinates[0] - 1, coordinates[1]])) {
      // console.log(`here coord ${[coordinates[0] - 1, coordinates[1]]}`);
      return true;
    }
  };
  const isRightLegit = (coordinates) => {
    if (coordinates[1] + 1 < 10 && generator.isAvailable([coordinates[0], coordinates[1] + 1])) {
      return true;
    }
  };
  const isDownLegit = (coordinates) => {
    if (coordinates[0] + 1 < 10 && generator.isAvailable([coordinates[0] + 1, coordinates[1]])) {
      return true;
    }
  };
  const isLeftLegit = (coordinates) => {
    if (coordinates[1] - 1 >= 0 && generator.isAvailable([coordinates[0], coordinates[1] - 1])) {
      return true;
    }
  };

  const goUp = (coordinates) => [[(coordinates[0] - 1), (coordinates[1])], 'up'];

  const goRight = (coordinates) => [[(coordinates[0]), (coordinates[1] + 1)], 'right'];

  const goDown = (coordinates) => [[(coordinates[0] + 1), (coordinates[1])], 'down'];

  const goLeft = (coordinates) => [[(coordinates[0]), (coordinates[1] - 1)], 'left'];

  const checkLegitDirections = (coordinates) => {
    const availableDirections = [];
    if (isUpLegit(coordinates) && obj.up === true) {
      availableDirections.push('up');
    }
    if (isRightLegit(coordinates) && obj.right === true) {
      availableDirections.push('right');
    }
    if (isDownLegit(coordinates) && obj.down === true) {
      availableDirections.push('down');
    }
    if (isLeftLegit(coordinates) && obj.left === true) {
      availableDirections.push('left');
    }
    return availableDirections;
  };

  const getRandomDirection = () => {
    const directions = checkLegitDirections(obj.startCoordinates);
    // return directions
    return directions[Math.floor(Math.random() * directions.length)];
  };

  const pickDirection = (dir, coordinates) => {
    // тут все ок, num = [0,0]
    let num;
    if (coordinates) {
      num = coordinates;
    } else {
      num = obj.startCoordinates;
    }
    // тут теж все ок, повертає legitDirections = [down] як і треба
    const legitDirections = checkLegitDirections(num);

    let direction;
    if (dir && legitDirections.indexOf(dir) >= 0) {
      direction = dir;
    } else {
      // ось тут помилка
      const removeDirection = obj.currentDirection;
      // скоріш за все тут є помилка тому що false не привласнюється за межами цього модулю
      obj[removeDirection] = false;
      direction = getRandomDirection();
      num = obj.startCoordinates;
    }

    // return direction

    if (direction === 'up') {
      return goUp(num);
    }
    if (direction === 'right') {
      return goRight(num);
    }
    if (direction === 'down') {
      return goDown(num);
    }
    if (direction === 'left') {
      return goLeft(num);
    }
  };

  return { pickDirection };
  // if (obj.direction === 'horizontal') {

  // } else if (obj.direction === 'vertical') {

  // }
};

module.exports = FindNearbyCoordinatesAI;
