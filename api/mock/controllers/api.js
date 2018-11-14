const axios = require('axios');

const generatorText = ({
  deposits,
  expectDeposits,
  totalRevenue,
}) => `一共收益${totalRevenue}，可用${deposits}，待用${expectDeposits}`;

const url = 'https://m.me1ipu.cn/mobile/brokerage/queryIncome';

const handleFetchPrice = async (map) => {
  const responses = [];
  const keys = Object.keys(map);
  for (let i = 0; i < keys.length; i++) {
    const account = keys[i];
    const token = map[account];
    responses.push(await axios.create({ // eslint-disable-line
      headers: {
        'access-token': token,
        'X-account': account,
      },
    }).post(url));
  }
  return responses.map(({ config, data }) => ({
    [config.headers['X-account']]: data.success ? generatorText(data.data) : data.errorMSG,
  }));
};

module.exports = {
  handleFetchPrice,
};
