const GenerateRandomCoordinate = () => {
  const generateCoordinates = (max) => {
    const randomCoordinates = [];
    const randomNum = () => Math.floor(Math.random() * (max - 0 + 0)) + 0;
    randomCoordinates.push(randomNum());
    randomCoordinates.push(randomNum());
    return randomCoordinates;
  };

  const checkCoordinates = (array, values) => {
    const result = array.filter((arrayItem) => arrayItem.toString() === values.toString());

    if (result.length > 0) {
      return false;
    }
    return true;
  };

  // eslint-disable-next-line consistent-return
  const sendCoordinates = (exclude, max) => {
    const coordinates = generateCoordinates(max);
    if (!checkCoordinates(exclude, coordinates)) {
      sendCoordinates();
    } else {
      return coordinates;
    }
  };

  return { sendCoordinates };
};

module.exports = GenerateRandomCoordinate;
