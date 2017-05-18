const request = require('superagent');
const { v2exDetail } = require('../../config/url.js');
const { v2exCookie } = require('../../config/cookie.js');
const {
  sendSuccess,
  sendFailure,
} = require('../../helpers/controller');

const fn = (ctx, id) => new Promise((resolve, reject) => {
  request.get(`${v2exDetail}${id}`)
    .set('cookie', v2exCookie)
    .end((err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(JSON.parse(res.text));
    });
});

async function getDetail(ctx) {
  await fn(ctx, ctx.params.id).then((data) => {
    sendSuccess(ctx, data);
  }).catch((err) => {
    sendFailure(ctx, false, err);
  });
}

module.exports = {
  getDetail,
};
