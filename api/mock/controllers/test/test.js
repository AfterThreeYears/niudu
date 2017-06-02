const request = require('superagent');
const { server } = require('../../config/url');
const { v2exCookie } = require('../../config/cookie');
const { mobileUa } = require('../../config/userAgent');
const {
  sendSuccess,
  sendFailure,
} = require('../../helpers/controller');

const fn = () => new Promise((resolve, reject) => {
  request.get(`${server}`)
    .set('cookie', v2exCookie)
    .set('user-agent', mobileUa)
    .set('x-a', 'wbb')
    .end((err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(JSON.parse(res.text));
    });
});

async function getDetail(ctx) {
  try {
    const result = await fn(ctx);
    sendSuccess(ctx, result);
  } catch (e) {
    sendFailure(ctx, false, e);
  }
}

module.exports = {
  getDetail,
};
