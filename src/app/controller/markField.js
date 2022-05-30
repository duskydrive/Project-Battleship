const markField = (field, state) => {
  if (state === 'hit') {
    field.classList.add('hit');
  } else {
    field.classList.add('missed');
  }
};

module.exports = markField;
