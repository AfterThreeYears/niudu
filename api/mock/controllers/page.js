const { sendSuccess } = require('../helpers/controller');
const item = require('../models/item');
const user = require('../models/user');

const getPage = (ctx) => {
  sendSuccess(ctx, {
    baseInfo: {},
    frameInfo: {},
    componentMap: {},
    itemMap: {
      1: item(1),
      2: item(2),
      3: item(3),
      4: item(4),
    },
    categoryMap: {},
    userMap: {
      1: user(1),
      2: user(2),
      3: user(3),
      4: user(4),
    },
    productMap: {},
  });
};

module.exports = {
  getPage,
};
