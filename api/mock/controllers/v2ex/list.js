const request = require('superagent');
const { v2ex } = require('../../config/url.js');
const { v2exCookie } = require('../../config/cookie.js');
const getListData = require('../../models/v2ex/list');
const {
  sendSuccess,
  sendFailure,
} = require('../../helpers/controller');

const fn = (ctx, type) => new Promise((resolve, reject) => {
  request.get(`${v2ex}/?tab=${type}`)
    .set('cookie', v2exCookie)
    .end((err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(getListData(res.text));
    });
});

async function getList(ctx) {
  await fn(ctx, ctx.params.type).then((data) => {
    sendSuccess(ctx, data);
  }).catch((err) => {
    sendFailure(ctx, false, err);
  });
}

module.exports = {
  getList,
};
