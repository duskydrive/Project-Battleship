const Ship = (num) => {
  const hits = [];
  const positions = [];
  const length = num;

  const hit = () => {
    hits.push(1);
    return 'hit';
  };

  const addPositions = (position) => {
    positions.push(position);
  };

  const getPositions = () => positions;

  const isSunk = () => {
    if (length - hits.length === 0) {
      return true;
    }
    return false;
  };

  return {
    length, hit, isSunk, hits, addPositions, getPositions,
  };
};

module.exports = Ship;
