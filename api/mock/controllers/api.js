const axios = require('axios');

const generatorText = ({
  deposits,
  expectDeposits,
  totalRevenue,
}) => `一共收益${totalRevenue}，可用${deposits}，待用${expectDeposits}`;

const url = 'https://m.meipu.cn/mobile/brokerage/queryIncome';

const handleFetchPrice = async (arr) => {
  const responses = [];
  for (let i = 0; i < arr.length; i += 1) {
    const { token, account } = arr[i];
    responses.push(await axios.create({ // eslint-disable-line
      headers: {
        'access-token': token,
        'X-account': account,
      },
    }).post(url));
  }
  return responses.map(({ config, data }) => ({
    account: config.headers['X-account'],
    data: generatorText(data.data),
  }));
};

module.exports = {
  handleFetchPrice,
};
