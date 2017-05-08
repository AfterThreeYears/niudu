const Faker = require('faker-zh-cn');
const { id, pick } = require('../utils');

function item(existId) {
  const randomId = id();

  return {
    id: existId || randomId,
    title: Faker.Lorem.sentence(),
    actionUserId: id(),
    actionUserName: Faker.Name.findName(),
    effectiveTime: Date.now(),
    status: pick([0, 1, 2]),
    gmtCreate: Date.now(),
    gmtModified: Date.now(),
    sequence: randomId,
    isHomeNavigation: false,
  };
}

module.exports = item;
