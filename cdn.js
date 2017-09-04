const fs = require('fs');
const path = require('path');
const upyun = require('upyun');
const {serviceName, account, passwd} = require('./password');

const service = new upyun.Service(serviceName, account, passwd);
const client = new upyun.Client(service);

const dirname = 'dist';

const readFile = (name) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, dirname, name), (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
};

const readDir = (name) => {
  return new Promise((resolve, reject) => {
    fs.readdir(path.join(__dirname, name), (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
}

readDir(dirname).then((data) => {
  for(let i = 0; i < data.length; i++) {
    const filename = data[i];
    readFile(filename).then((data) => {
      return client.putFile(filename, data)
    }).then((data) => {
      console.log(`success: ${filename}`);
    }).catch(err => {
      console.log(err);
      console.log(`fail: ${filename}`);
    });
  }
}).catch(err => {
  console.log(err);
});
