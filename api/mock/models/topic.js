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
          url: 'http://stage.meitudata.com/meitupu/FvX4rSaBmkcTGNJGMfpQVQNnEqh-',
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
          url: 'http://stage.meitudata.com/meitupu/luFQWKz0E0TSoXTysM8JxzwSxXxV',
        },
      },
    ],
  };
}

module.exports = topic;
