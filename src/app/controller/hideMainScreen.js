const hideMainScreen = () => {
  const startScreen = document.getElementById('startScreen');
  startScreen.classList.add('hide');
  setTimeout(() => {
    startScreen.classList.add('remove');
  }, 1000);
};

module.exports = hideMainScreen;
