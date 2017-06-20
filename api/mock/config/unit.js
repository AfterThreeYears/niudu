// const cookies = [{
//   domain: '.v2ex.com',
//   name: 'A2',
//   value: '"2|1:0|10:1497779684|2:A2|56:YjUzMjNmMDBiZTQ1MWY
//   wMTU0ZTg4NTJhNjRhNTQ0MDNkNmZmMGI3OQ==|14db0a2973230db
//   62f60723c18198531526110bbd59dc387ae6a8bcc4f79a97c"',
//   is_secure: false,
//   path: '/',
//   expires: '2018-06-18T03:32:38.672Z',
//   is_http_only: true,
// }];
const translateCookie = (cookieObj) => {
  const cookies = [];
  for (const key in cookieObj) {
    cookies.push({
      name: key,
      value: cookieObj[key],
      domain: '.v2ex.com',
      path: '/',
      is_secure: false,
      expires: '2018-06-18T03:32:38.672Z',
      is_http_only: true,
    });
  }
  return cookies;
};

module.exports = {
  translateCookie,
};
