const axios = require('axios');

const generatorText = ({
  deposits,
  expectDeposits,
  totalRevenue,
}) => `一共收益${totalRevenue}，可用${deposits}，待用${expectDeposits}`;

const url = 'https://m.meipu.cn/mobile/brokerage/queryIncome';

const handleFetchPrice = (arr) => {
  const promiseList = arr.map(async ({ account, token }) => axios.create({
    headers: {
      'access-token': token,
      'X-account': account,
    },
  }).post(url));
  return Promise.all(promiseList)
    .then((resList) => resList.map(({ config, data }) => ({
      account: config.headers['X-account'],
      data: generatorText(data.data),
    })))
    .catch((error) => {
      console.log('请求失败', error);
    });
};

module.exports = {
  handleFetchPrice,
};
