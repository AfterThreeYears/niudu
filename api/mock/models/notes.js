const Faker = require('faker-zh-cn');

function note() {
  return {
    title: Faker.Name.findName(),
    time: '2001年',
    content: Faker.PhoneNumber.phoneNumber() + Faker.Internet.email(),
    love: false,
  };
}

module.exports = note;
