const toggleMenu = () => {
  const menu1 = document.getElementById('menu1');
  const menu2 = document.getElementById('menu2');

  if (menu2.classList.contains('hide')) {
    menu2.classList.remove('hide');
    menu1.classList.add('hide');
  } else {
    menu1.classList.remove('hide');
    menu2.classList.add('hide');
  }
};

module.exports = toggleMenu;
