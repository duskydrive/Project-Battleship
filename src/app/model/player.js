const Gameboard = require('./gameboard');

const Player = (comp) => {
  const gameboard = Gameboard();
  const isComputer = comp;

  const getGameboard = () => gameboard;

  const attack = (player, coordinates) => {
    const result = player.getGameboard().receiveAttack(coordinates);
    return [coordinates, result];
  };

  return {
    getGameboard, attack, isComputer,
  };
};

module.exports = Player;
