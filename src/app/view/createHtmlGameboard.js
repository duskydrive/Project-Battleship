const createHtmlGameboard = (id) => {
  const container = document.createElement('div');
  container.setAttribute('id', `${id}`);
  container.classList.add('gameboard');
  const fillBoard = (num) => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < num; i++) {
      // eslint-disable-next-line no-plusplus
      for (let n = 0; n < num; n++) {
        const div = document.createElement('div');
        div.setAttribute('data-coordinate', [i, n]);
        container.appendChild(div);
      }
    }
    return container;
  };

  return { fillBoard };
};

module.exports = createHtmlGameboard;
