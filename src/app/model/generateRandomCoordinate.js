/* eslint-disable max-len */
/* eslint-disable no-plusplus */
const GenerateRandomCoordinate = () => {
  const availableCoordinates = [];
  for (let i = 0; i < 10; i++) {
    for (let n = 0; n < 10; n++) {
      availableCoordinates.push([i, n]);
    }
  }

  const findCoordinates = (searchElement) => {
    for (let i = 0; i < availableCoordinates.length; i++) {
      if (availableCoordinates[i][0] === searchElement[0] && availableCoordinates[i][1] === searchElement[1]) {
        return i;
      }
    }
    return false;
  };

  const isAvailable = (searchElement) => {
    if (findCoordinates(searchElement) || findCoordinates(searchElement) === 0) {
      return true;
    }
    return false;
  };

  const removeCoordinatesFromAvailable = (searchElement) => {
    const index = findCoordinates(searchElement);
    availableCoordinates.splice(index, 1);
  };

  const removeNearbyFromAvailable = (positions) => {
    for (let i = 0; i < positions.length; i++) {
      const coordinates = positions[i];

      const a = [parseInt(coordinates[0], 10) - 1, parseInt(coordinates[1], 10)];
      const b = [parseInt(coordinates[0], 10) + 1, parseInt(coordinates[1], 10)];
      const c = [parseInt(coordinates[0], 10), parseInt(coordinates[1], 10) - 1];
      const d = [parseInt(coordinates[0], 10), parseInt(coordinates[1], 10) + 1];
      const e = [parseInt(coordinates[0], 10) - 1, parseInt(coordinates[1], 10) - 1];
      const f = [parseInt(coordinates[0], 10) + 1, parseInt(coordinates[1], 10) - 1];
      const g = [parseInt(coordinates[0], 10) - 1, parseInt(coordinates[1], 10) + 1];
      const h = [parseInt(coordinates[0], 10) + 1, parseInt(coordinates[1], 10) + 1];

      const arr = [a, b, c, d, e, f, g, h];

      arr.forEach((val) => {
        if (isAvailable(val)) {
          removeCoordinatesFromAvailable(val);
        }
      });
    }
  };

  const generateCoordinates = () => {
    const randomNum = Math.floor(Math.random() * availableCoordinates.length);
    const randomCoordinates = availableCoordinates[randomNum];
    availableCoordinates.splice(randomNum, 1);
    return randomCoordinates;
  };

  return {
    generateCoordinates,
    removeCoordinatesFromAvailable,
    isAvailable,
    removeNearbyFromAvailable,
  };
};

module.exports = GenerateRandomCoordinate;
