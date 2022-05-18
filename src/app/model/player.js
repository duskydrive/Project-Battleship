const Gameboard = require('./gameboard');

const Player = (comp) => {
  const gameboard = Gameboard();
  const playerAttacks = [];
  const isComputer = comp;

  const getGameboard = () => gameboard;

  const attack = (player, x, y) => {
    playerAttacks.push([x, y]);
    return player.getGameboard().receiveAttack(x, y);
  };
  const computerAttack = (player, coordinates) => {
    const result = attack(player, coordinates[0], coordinates[1]);
    playerAttacks.push(coordinates);
    return [coordinates, result];
  };

  return {
    getGameboard, attack, computerAttack, isComputer,
  };
};

module.exports = Player;
