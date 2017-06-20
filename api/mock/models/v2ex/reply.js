const phantom = require('phantom');
const path = require('path');

let sitepage = null;
let phInstance = null;

const main = (body) => {
  const url = `https://www.v2ex.com/t/${body.id}`;
  return new Promise((resolve) => {
    phantom
      .create(['--ignore-ssl-errors=yes', '--ssl-protocol=any'])
      .then((instance) => {
        phInstance = instance;
        return instance.createPage();
      })
      .then((page) => {
        sitepage = page;
      })
      .then(function() {
        if (body.cookies) {
          return Promise.all(body.cookies.map(function (cookie) {
            return sitepage.addCookie(cookie);
          }));
        }
      })
      .then(function() {
        console.log('打开页面', url);
        return sitepage.open(url);
      })
      .then(() => {
        return sitepage.invokeMethod('evaluate', function(obj) {
          document.querySelector('#reply_content').value = obj.content;
          document.querySelector('.super').click();
        }, body).then(() => {
          console.log('回帖完成');
          resolve('回帖完成');
          return sitepage.render(path.join(__dirname, 'v2.png'));
        });
      })
      .then(() => {
        phInstance.exit();
      });
  });
};

module.exports = main;
