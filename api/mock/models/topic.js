const Faker = require('faker-zh-cn');
const { id } = require('../utils');

function topic(existId) {
  return {
    id: existId || id(),
    name: Faker.Lorem.words(),
    author: Faker.Name.findName(),
    updateTime: Date.now(),
    items: [
      {
        type: 'image',
        params: {
          url: 'http://stage.mei1tudata.com/mei1tupu/FvX4rSaBmkcTGNJGMfpQVQNnEqh-',
        },
      },
      {
        type: 'text',
        params: {
          text: '美铺的这款商品特别棒！',
        },
      },
      {
        type: 'goods',
        params: {
          id: '123',
        },
      },
      {
        type: 'video',
        params: {
          url: 'http://stage.1data.com/mei1tupu/luFQWKz0E0TSoXTysM8JxzwSxXxV',
        },
      },
    ],
  };
}

module.exports = topic;
