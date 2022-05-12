const Gameboard = require('./gameboard');
const GenerateRandomCoordinate = require('./generateRandomCoordinate');

const Player = () => {
  const gameboard = Gameboard();
  const playerAttacks = [];
  const generator = GenerateRandomCoordinate();

  const getGameboard = () => gameboard;

  const attack = (player, x, y) => {
    player.getGameboard().receiveAttack(x, y);
    playerAttacks.push([x, y]);
  };

  const computerAttack = (player) => {
    const coordinates = generator.sendCoordinates(playerAttacks, getGameboard().getBoard().length);
    attack(player, coordinates[0], coordinates[1]);
    playerAttacks.push(coordinates);
  };

  return {
    getGameboard, attack, computerAttack,
  };
};

module.exports = Player;
