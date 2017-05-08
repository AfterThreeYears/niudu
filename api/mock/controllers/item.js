const item = require('../models/item');
const {
  sendSuccess,
  sendNotFound,
  getId,
  isValid,
} = require('../helpers/controller');

const getItem = (ctx) => {
  const id = getId(ctx.params);
  if (!isValid(id) || id > 200) {
    return sendNotFound(ctx);
  }
  sendSuccess(ctx, item(ctx.params.id));
};

module.exports = {
  getItem,
};
