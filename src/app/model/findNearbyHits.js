const FindNearbyHits = (obj, generator) => {
  const isUpLegit = (coordinates) => {
    if (coordinates[0] - 1 >= 0 && generator.isAvailable([coordinates[0] - 1, coordinates[1]])) {
      return true;
    }
    return false;
  };
  const isRightLegit = (coordinates) => {
    if (coordinates[1] + 1 < 10 && generator.isAvailable([coordinates[0], coordinates[1] + 1])) {
      return true;
    }
    return false;
  };
  const isDownLegit = (coordinates) => {
    if (coordinates[0] + 1 < 10 && generator.isAvailable([coordinates[0] + 1, coordinates[1]])) {
      return true;
    }
    return false;
  };
  const isLeftLegit = (coordinates) => {
    if (coordinates[1] - 1 >= 0 && generator.isAvailable([coordinates[0], coordinates[1] - 1])) {
      return true;
    }
    return false;
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
    const directions = checkLegitDirections(obj.start);
    return directions[Math.floor(Math.random() * directions.length)];
  };

  const pickDirection = (dir, coordinates) => {
    let num;
    if (coordinates) {
      num = coordinates;
    } else {
      num = obj.start;
    }

    const legitDirections = checkLegitDirections(num);
    let direction;
    if (dir && legitDirections.indexOf(dir) >= 0) {
      direction = dir;
    } else {
      const removeDirection = obj.curDirection;
      // eslint-disable-next-line no-param-reassign
      obj[removeDirection] = false;
      direction = getRandomDirection();
      num = obj.start;
    }

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
    return false;
  };

  return { pickDirection };
};

module.exports = FindNearbyHits;
