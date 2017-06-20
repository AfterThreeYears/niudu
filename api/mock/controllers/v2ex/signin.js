const {
  sendSuccess,
  sendFailure,
} = require('../../helpers/controller');
const signin = require('../../models/v2ex/signin');

const main = async (ctx, body) => {
  try {
    return await signin(body);
  } catch (e) {
    console.log(e);
    return {};
  }
};

const setSignin = async (ctx) => {
  try {
    const { account, passwd } = ctx.request.body;
    const result = await main(ctx, {
      account,
      passwd,
    });
    console.log(result);
    sendSuccess(ctx, result);
  } catch (e) {
    sendFailure(ctx, false, e);
  }
};

module.exports = {
  setSignin,
};
