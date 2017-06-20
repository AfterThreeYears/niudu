const phantom = require('phantom');

let sitepage = null;
let phInstance = null;
const url = 'https://www.v2ex.com/signin';

const main = function(body) {
  return new Promise(function(resolve) {
    phantom
    .create(['--ignore-ssl-errors=yes', '--ssl-protocol=any'])
    .then(function(instance) {
      phInstance = instance;
      return instance.createPage();
    })
    .then(function(page) {
      sitepage = page;
    })
    .then(function() {
      console.log('打开页面', url);
      return sitepage.open(url);
    })
    .then(function() {
      console.log(`账号是${body.account},密码是${body.passwd}`);
      return sitepage.invokeMethod('evaluate', function(obj) {
        [].slice.call(document.querySelectorAll('.sl')).shift().value = obj.account;
        [].slice.call(document.querySelectorAll('.sl')).pop().value = obj.passwd;
        document.querySelector('.super').click();
      }, body).then(function() {
        return sitepage.render('v2ex.png');
      });
    })
    .then(function() {
      return phInstance.execute('phantom', 'property', ['cookies']);
    })
    .then(function(cookies) {
      phInstance.exit();
      resolve(cookies);
    });
  });
};

module.exports = main;
