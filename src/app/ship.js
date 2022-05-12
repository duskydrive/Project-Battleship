const Ship = (num) => {
  const hits = [];
  const length = num;

  const hit = () => {
    hits.push(1);
  };

  const isSunk = () => {
    if (length - hits.length === 0) {
      return true;
    }
    return false;
  };

  return {
    length, hit, isSunk, hits,
  };
};

module.exports = Ship;
