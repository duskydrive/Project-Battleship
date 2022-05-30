const toggleGameboard = () => {
  const gameboards = document.querySelectorAll('.gameboard');
  gameboards.forEach((thisBoard) => {
    if (thisBoard.classList.contains('block')) {
      thisBoard.classList.remove('block');
    } else {
      thisBoard.classList.add('block');
    }
  });
};

module.exports = toggleGameboard;
