/* eslint-disable no-undef */
const Player = require('./player');

test('Player 1 attacks player 2, hits', () => {
  const player1 = Player();
  const player2 = Player();
  player2.getGameboard().setBoard(10);
  player2.getGameboard().placeShip(2, 0, 0, 'horizontal');
  player1.attack(player2, 0, 0);
  expect(player2.getGameboard().getBoard()[0][0]).toEqual({
    isShot: true,
    shipId: 0,
  });
});

test('Player 1 attacks player 2, misses, records shot at missed cell', () => {
  const player1 = Player();
  const player2 = Player();
  player2.getGameboard().setBoard(10);
  player2.getGameboard().placeShip(2, 0, 0, 'horizontal');
  player1.attack(player2, 0, 3);
  expect(player2.getGameboard().getBoard()[0][3]).toEqual({
    isShot: true,
    shipId: false,
  });
});

test('Player 1 attacks player 2, misses, does not records shot at other cells', () => {
  const player1 = Player();
  const player2 = Player();
  player2.getGameboard().setBoard(10);
  player2.getGameboard().placeShip(2, 0, 0, 'horizontal');
  player1.attack(player2, 0, 4);
  expect(player2.getGameboard().getBoard()[0][3]).toEqual({
    isShot: false,
    shipId: false,
  });
});

test('gameboard length works', () => {
  const player1 = Player();
  player1.getGameboard().setBoard(10);
  expect(player1.getGameboard().getBoard().length).toEqual(10);
});

test('Computer attacks player', () => {
  const player1 = Player();
  const computer = Player();
  player1.getGameboard().setBoard(1);
  player1.getGameboard().placeShip(1, 0, 0, 'horizontal');
  computer.computerAttack(player1);
  expect(player1.getGameboard().getBoard()[0][0]).toEqual({
    isShot: true,
    shipId: 0,
  });
});
