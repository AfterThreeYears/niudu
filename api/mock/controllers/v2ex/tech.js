const request = require('superagent');
const { v2ex } = require('../../config/url.js');
const getTechData = require('../../models/v2ex/tech');
const {
  sendSuccess,
  sendFailure,
} = require('../../helpers/controller');

const getTech = ctx => new Promise((resolve) => {
  request.get(`${v2ex}/?tab=tech`)
    .end((err, res) => {
      if (err) {
        sendFailure(ctx, false, JSON.stringify(err));
        resolve();
        return;
      }
      const result = getTechData(res.text);
      sendSuccess(ctx, result);
      resolve();
    });
});

module.exports = {
  getTech,
};
