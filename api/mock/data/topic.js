const Sequelize = require('sequelize');
const sequelize = require('./db');
const Faker = require('faker-zh-cn');

const Topic = sequelize.define('topic', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  author: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  items: {
    type: Sequelize.TEXT,
  },
}, {
  freezeTableName: true,
});

function initTable() {
  Topic.sync({ force: true }).then(() => {
    Topic.create({
      name: Faker.Lorem.sentence(),
      author: Faker.Name.findName(),
      items: '[]',
    }).then(() => sequelize.close());
  });
}

function queryPagination({ offset, limit }, where) {
  return Promise.all([
    Topic.findAll({ offset, limit, where, order: [['createdAt', 'DESC']] }),
    Topic.findAll({
      where,
      attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'total']],
    }),
  ]).then(([items, total]) => ({
    offset,
    limit,
    items,
    total: total[0].get('total'),
  }));
}

function querySingle(id) {
  return Topic.findAll({
    where: {
      id,
    },
  });
}

function deleteSingle(id) {
  return Topic.destroy({
    where: {
      id,
    },
  });
}

function addSingle(topic) {
  return Topic.create(topic);
}

function updateSingle(topic) {
  return Topic.update({
    name: topic.name,
    items: topic.items,
  }, {
    where: {
      id: topic.id,
    },
  });
}

module.exports = {
  queryPagination,
  querySingle,
  deleteSingle,
  addSingle,
  updateSingle,
  initTable,
};
