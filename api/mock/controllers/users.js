const { roll } = require('../utils');
const user = require('../models/user');

const getUsers = (ctx) => {
  ctx.body = roll(user, 20);
};

module.exports = {
  getUsers,
};
