import './style/main.sass';
import logoImg from './img/logo.png';
import gameLoop from './app/controller/gameLoop';
// import fillGameboard from './app/view/gameboardhtml';

const logo = document.getElementById('logo');
logo.src = logoImg;

const game = gameLoop();
game.setNewGame();
