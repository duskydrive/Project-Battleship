const Ship = (...values) => {
  const coordinates = [];
  const hitPositions = [];

  for (let i = 0; i < values.length; i++) {
    coordinates.push(values[i]);
  }

  const length = coordinates.length;

  const hit = (pos) => {
    hitPositions.push(pos);
    // this return here is purely for test purposes
    return hitPositions;
  };

  const isSunk = () => {
    if (length - hitPositions.length === 0) {
      return true;
    }
    return false;
  };

  return {
    length, hit, isSunk, coordinates,
  };
};

module.exports = Ship;
