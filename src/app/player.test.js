// /* eslint-disable no-undef */
// const Player = require('./player');

// test('Player 1 attacks player 2, hits', () => {
//   const player1 = Player();
//   const player2 = Player();
//   player2.getGameboard().placeShip(1, 2);
//   player1.attack(player2, 1);
//   expect(player2.getGameboard().getShip(0).getHitPositions()).toEqual([1]);
// });

// test('Computer attacks player 1, records attack 1', () => {
//   const player1 = Player();
//   const computer = Player();
//   player1.getGameboard().placeShip(1, 2);
//   computer.computerAttack(player1);
//   expect(player1.getGameboard().getAllAttacks().length).toEqual(1);
// });

// test('Computer attacks player 1, records attack 2', () => {
//   const player1 = Player();
//   const computer = Player();
//   player1.getGameboard().placeShip(1, 2);
//   computer.computerAttack(player1);
//   computer.computerAttack(player1);
//   expect(player1.getGameboard().getAllAttacks().length).toEqual(2);
// });
