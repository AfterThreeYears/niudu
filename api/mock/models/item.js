const Faker = require('faker-zh-cn');
const { id, image } = require('../utils');

function item(existId) {
  return {
    id: existId || id(),
    productNameZH: Faker.Lorem.sentence(),
    salePriceMin: Faker.Helpers.randomNumber(10000),
    marketPriceMax: Faker.Helpers.randomNumber(20000),
    showPicPath: image(),
    brandCountryIcon: '//haitao.nos.netease.com/9ab013a727024145ae377c9a1b6286551419662432571i46mcvne10004.png?imageView&thumbnail=48x0&quality=85',
    brandName: '普拉达',
  };
}

module.exports = item;
