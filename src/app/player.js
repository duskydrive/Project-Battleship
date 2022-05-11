const Gameboard = require('./gameboard');

const Player = () => {
  const gameboard = Gameboard();

  const getGameboard = () => gameboard;

  const generateRandomCoordinate = (exclude) => {
    let random;
    while (!random) {
      const x = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
      if (exclude.indexOf(x) === -1) random = x;
    }
    return random;
  };

  const attack = (player, coordinate) => player.getGameboard().receiveAttack(coordinate);

  const computerAttack = (player) => {
    attack(player, generateRandomCoordinate(gameboard.getAllAttacks()));
  };

  return { getGameboard, attack, computerAttack };
};

module.exports = Player;
