const Ship = (...values) => {
  const coordinates = [];
  const hitPositions = [];

  for (let i = 0; i < values.length; i++) {
    coordinates.push(values[i]);
  }

  const { length } = coordinates;

  const hit = (pos) => {
    hitPositions.push(pos);
  };

  const isSunk = () => {
    if (length - hitPositions.length === 0) {
      return true;
    }
    return false;
  };

  return {
    length, hit, isSunk, coordinates, hitPositions,
  };
};

module.exports = Ship;
