const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

// module.exports = new Sequelize('mysql://root:@localhost:3306/tps');

function getDefaultDb() {
  if (fs.existsSync(path.resolve(__dirname, '../mysql.json'))) {
    return require(path.resolve(__dirname, '../mysql.json')); // eslint-disable-line global-require,import/no-dynamic-require
  }

  return {
    host: '172.16.71.2',
    database: 'vinci',
    user: 'root',
    password: '123',
  };
}

const db = getDefaultDb();

module.exports = new Sequelize(db.database, db.user, db.password, {
  host: db.host,
  dialect: 'mysql',

  pool: {
    max: 200,
    min: 0,
    idle: 10000,
  },
});
