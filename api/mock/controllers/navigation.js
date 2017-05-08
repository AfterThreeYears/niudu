const { roll } = require('../utils');
const navgiation = require('../models/navgiation');
const { sendSuccess } = require('../helpers/controller');

const getNavigations = (ctx) => {
  const result = roll(navgiation, 20);
  result[0].isHomeNavigation = true;
  sendSuccess(ctx, result);
};

module.exports = {
  getNavigations,
};
