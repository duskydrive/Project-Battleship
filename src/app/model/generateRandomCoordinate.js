/* eslint-disable max-len */
/* eslint-disable no-plusplus */
const GenerateRandomCoordinate = () => {
  const availableCoordinates = [];
  for (let i = 0; i < 10; i++) {
    for (let n = 0; n < 10; n++) {
      availableCoordinates.push([i, n]);
    }
  }

  const isAvailable = (searchElement) => {
    for (let i = 0; i < availableCoordinates.length; i++ ) {
      if ( availableCoordinates[i][0] == searchElement[0] && availableCoordinates[i][1] == searchElement[1] ) {
        return true;
      }
    }
    return false;
  };

  const removeCoordinatesFromAvailable = (coordinates) => {
    // console.log(coordinates)
    let index;

    for (let i = 0; i < availableCoordinates.length; i++ ) {
      if ( availableCoordinates[i][0] == coordinates[0] && availableCoordinates[i][1] == coordinates[1] ) {
        index = i;
      }
    }

    availableCoordinates.splice(index, 1);
    console.log(availableCoordinates.length)
  };

  const removeNearbyFromAvailable = (positions) => {
    for (let i = 0; i < positions.length; i++) {
      const coordinates = positions[i];
      // console.log(coordinates);
      if (isAvailable([parseInt(coordinates[0], 10) - 1, parseInt(coordinates[1], 10)])) {
        removeCoordinatesFromAvailable([parseInt(coordinates[0], 10) - 1, parseInt(coordinates[1], 10)]);
      }
      if (isAvailable([parseInt(coordinates[0], 10) + 1, parseInt(coordinates[1], 10)])) {
        removeCoordinatesFromAvailable([parseInt(coordinates[0], 10) + 1, parseInt(coordinates[1], 10)]);
      }
      if (isAvailable([parseInt(coordinates[0], 10), parseInt(coordinates[1], 10) - 1])) {
        removeCoordinatesFromAvailable([parseInt(coordinates[0], 10), parseInt(coordinates[1], 10) - 1]);
      }
      if (isAvailable([parseInt(coordinates[0], 10), parseInt(coordinates[1], 10) + 1])) {
        removeCoordinatesFromAvailable([parseInt(coordinates[0], 10), parseInt(coordinates[1], 10) + 1]);
      }
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
