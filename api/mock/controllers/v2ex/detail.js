const request = require('superagent');
const { v2exDetail } = require('../../config/url');
const { v2exCookie } = require('../../config/cookie');
const { mobileUa } = require('../../config/userAgent');
const getListData = require('../../models/v2ex/detail');
const {
  sendSuccess,
  sendFailure,
} = require('../../helpers/controller');

const fn = (ctx, { id, pageIndex }) => new Promise((resolve, reject) => {
  request.get(`${v2exDetail}/${id}?p=${pageIndex}`)
    .set('cookie', v2exCookie)
    .set('user-agent', mobileUa)
    .end((err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(getListData(res.text));
    });
});

async function getDetail(ctx) {
  try {
    const result = await fn(ctx, {
      id: ctx.params.id,
      pageIndex: ctx.query.pageIndex,
    });
    sendSuccess(ctx, result);
  } catch (e) {
    sendFailure(ctx, false, e);
  }
}

module.exports = {
  getDetail,
};
