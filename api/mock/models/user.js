const Faker = require('faker-zh-cn');
const { id, image } = require('../utils');

function user() {
  return {
    id: id(),
    name: Faker.Name.findName(),
    address: Faker.Address.city(),
    phoneNumber: Faker.PhoneNumber.phoneNumber(),
    email: Faker.Internet.email(),
    avatar: image(),
    type: 2,
    remark: '黄伊汶（Emme ），中国香港女歌手、演员',
    headPic: 'http://meipu1.video.meipai.com/e580c7988a164accf3ea614315f504a0cf5660dde1fb8f6bee31b83ff71a585c.jpg',
  };
}

module.exports = user;
