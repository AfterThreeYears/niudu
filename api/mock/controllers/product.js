const product = require('../models/product');
const {
  sendSuccess,
} = require('../helpers/controller');

const getProduct = (ctx) => {
  sendSuccess(ctx, product());
};

module.exports = {
  getProduct,
};
