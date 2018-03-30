const path = require('path');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const compress = require('koa-compress');
const mount = require('koa-mount');
const router = require('./routes/index');
const proxy = require('./helpers/proxy');
const { MOCK_PORT } = require('../../config.js');
const { isDev } = require('./helpers/env');


const app = new Koa();

app.use(async (ctx, next) => {
  try {
    await next();
    if (ctx.status === 404) ctx.throw(404);
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = isDev ? `中间件捕获错误:${err.stack}` : '系统错误';
  }
});

app.use(compress({
  flush: require('zlib').Z_SYNC_FLUSH,
}));

app.use(mount('/assets', serve(path.resolve(__dirname, './assets'))));

app.use(proxy('/zhihu', {
  target: 'http://news-at.zhihu.com',
  rewrite(url) {
    return url.replace(/^\/zhihu/, '');
  },
  logs: true,
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
