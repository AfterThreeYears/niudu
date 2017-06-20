const cookie = require('cookie');
const {
  sendSuccess,
  sendFailure,
} = require('../../helpers/controller');
const reply = require('../../models/v2ex/reply');
const { translateCookie } = require('../../config/unit');

const main = async (ctx, body) => {
  try {
    console.log(body);
    return await reply(body);
  } catch (e) {
    console.log(e);
    return {};
  }
};

async function setReply(ctx) {
  try {
    const { content, id } = ctx.request.body;
    const cookies = translateCookie(cookie.parse(ctx.request.header.cookie));
    const result = await main(ctx, {
      id,
      content,
      cookies,
    });
    sendSuccess(ctx, result);
  } catch (e) {
    sendFailure(ctx, false, e);
  }
}

module.exports = setReply;
