const _ = require('lodash');

let numberId = 0;

function id() {
  numberId += 1;
  return numberId;
}

function repeat(model, length) {
  return Array.from({ length }).map(model);
}

function roll(model, start) {
  return repeat(model, start);
}

function image() {
  const host = process.env.NODE_ENV === 'production' ? 'http://daily.vinci-mock.cn/' : 'http://localhost:3001/';
  return `${host}assets/item-${_.random(1, 8)}.jpeg`;
}

function pick(list) {
  return list[_.random(0, list.length - 1)];
}

module.exports = {
  id,
  roll,
  image,
  pick,
};
