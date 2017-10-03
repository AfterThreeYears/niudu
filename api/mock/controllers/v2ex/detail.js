const request = require('superagent');
const { v2exDetail, vv726Server } = require('../../config/url');
const { v2exCookie } = require('../../config/cookie');
const { mobileUa } = require('../../config/userAgent');
const getListData = require('../../models/v2ex/detail');
const {
  sendSuccess,
  sendFailure,
} = require('../../helpers/controller');

const fn = (ctx, { id, pageIndex }) => new Promise((resolve, reject) => {
  const url = `${v2exDetail}/${id}?p=${pageIndex}`;
  // const url = vv726Server;
  request.get(url)
    .set('cookie', v2exCookie)
    .set('user-agent', mobileUa)
    .end((err, res) => {
      if (err) {
        reject(err);
        return;
      }
      // console.log(resolve(JSON.parse(res.text)));
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
