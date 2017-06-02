const request = require('superagent');
const { v2exDetail, postServer } = require('../../config/url');
const { v2exCookie } = require('../../config/cookie');
const { httpHeader } = require('../../config/header');
const getListData = require('../../models/v2ex/detail');
const {
  sendSuccess,
  sendFailure,
} = require('../../helpers/controller');

const fn = (ctx, { id, once, content }) => new Promise((resolve, reject) => {
  const url = `${v2exDetail}/${id}`;
  // const url = postServer;
  request.post(url)
    .set(httpHeader)
    .set('path', `/t/${id}`)
    .set('cookie', v2exCookie)
    .set('referer', url)
    .type('form')
    .send({ once, content })
    .end((err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res.text);
    });
});

async function setReply(ctx) {
  try {
    const { once, content } = ctx.request.body;
    const result = await fn(ctx, {
      id: ctx.params.id,
      once,
      content,
    });
    sendSuccess(ctx, result);
  } catch (e) {
    sendFailure(ctx, false, e);
  }
}

module.exports = {
  setReply,
};
