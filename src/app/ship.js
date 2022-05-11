const Ship = (num) => {
  let hits = 0;
  const length = num;

  const hit = () => {
    hits += 1;
  };

  const isSunk = () => {
    if (length - hits === 0) {
      return true;
    }
    return false;
  };

  return {
    length, hit, isSunk,
  };
};

module.exports = Ship;
