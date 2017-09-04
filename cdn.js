const fs = require('fs');
const path = require('path');
const upyun = require('upyun');
const {serviceName, account, passwd} = require('./password');

const service = new upyun.Service(serviceName, account, passwd);
const client = new upyun.Client(service);

const dirname = 'dist';

const readFile = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, dirname, filename), (err, buffer) => {
      if (err) {
        return reject(err);
      }
      return resolve({buffer, filename});
    });
  });
};

const readDir = (dist) => {
  return new Promise((resolve, reject) => {
    fs.readdir(path.join(__dirname, dist), (err, list) => {
      if (err) {
        return reject(err);
      }
      return resolve(list);
    });
  });
}

readDir(dirname).then((data) => {
  return Promise.all(data.map((item) => {
    return readFile(item);
  }));
}).then((list) => {
  list.forEach(({filename, buffer}) => {
    client.putFile(filename, buffer)
    .then((data) => {
      console.log(`success-${filename}`);
    }).catch(err => {
      console.log(err);
      console.log(`error-${filename}`);
    })
  });
}).catch(err => {
  console.log(err);
});
