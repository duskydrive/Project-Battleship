import './style/main.sass';
import gameLoop from './app/controller/gameLoop';
// import fillGameboard from './app/view/gameboardhtml';

const game = gameLoop();
game.setNewGame();
