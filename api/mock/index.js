const path = require('path');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const compress = require('koa-compress');
const mount = require('koa-mount');
const router = require('./routes/index');
const proxy = require('./helpers/proxy');
const { MOCK_PORT } = require('../../config.js');

const app = new Koa();

app.use(compress({
  flush: require('zlib').Z_SYNC_FLUSH,
}));

app.use(mount('/assets', serve(path.resolve(__dirname, './assets'))));

app.use(async (ctx, next) => {
  try {
    await next();
    if (ctx.status === 404) ctx.throw(404);
  } catch (err) {
    if (process.env.NODE_ENV === 'production') {
      console.error(err); // eslint-disable-line no-console
    }

    ctx.status = err.status || 500;
    ctx.body = err.stack;
  }
});

app.use(proxy('/cms', {
  // target: 'http://172.16.28.3:31876/',
  // 杭州测试服cms api地址
  // target: 'http://daily.api.cms.meipu.cn',
  // 厦门服务器: 推荐
  // target: 'http://cms.meitu-int.com',
  // pre
  target: 'http://pre-cmsapi.test.meipu.cn',
  rewrite(url) {
    return url.replace(/^\/cms/, '');
  },
  logs: true,
  headers: {
    Cookie: 'accessToken=eW0x',
  },
  changeOrigin: true,
}));

app.use(proxy('/mobile', {
  // target: 'http://172.16.28.3:31876/',
  // 杭州测试服cms api地址
  // target: 'http://daily.api.cms.meipu.cn',
  // pre 环境
  target: 'http://pre-wapapi.test.meipu.cn/',
  // beta 环境
  // target: 'http://beta-wapapi.test.meipu.cn/',
  // 厦门服务器: 推荐
  // target: 'http://wap.meitu-int.com/',
  rewrite(url) {
    return url.replace(/^\/mobile/, '');
  },
  logs: true,
  headers: {
    Cookie: 'accessToken=eW0x',
  },
  changeOrigin: true,
}));

app.use(bodyParser());

app.use(async (ctx, next) => {
  await next();
  ctx.set('Access-Control-Allow-Origin', ctx.req.headers.origin);
  ctx.set('Access-Control-Allow-Credentials', true);
  if (ctx.method === 'OPTIONS') {
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, OPTIONS, DELETE');
    ctx.set('Access-Control-Allow-Headers', ctx.get('Access-Control-Request-Headers'));
  }
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(MOCK_PORT, () => {
  console.log(`🌏  mock server started at http://localhost:${MOCK_PORT}`); // eslint-disable-line no-console
});
