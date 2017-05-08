const httpProxy = require('http-proxy');

// base on https://github.com/vagusX/koa-proxies
function proxy(context, options) {
  return (ctx, next) => {
    if (!ctx.req.url.startsWith(context)) return next();

    ctx.set('Access-Control-Allow-Origin', ctx.req.headers.origin);
    ctx.set('Access-Control-Allow-Credentials', true);
    if (ctx.method === 'OPTIONS') {
      ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, OPTIONS, DELETE');
      ctx.set('Access-Control-Allow-Headers', ctx.get('Access-Control-Request-Headers'));
    }

    const { logs, rewrite } = options;
    return new Promise((resolve) => {
      if (logs) {
        // eslint-disable-next-line no-console
        console.log('%s - %s %s', new Date().toISOString(), ctx.req.method, ctx.req.url);
      }

      if (typeof rewrite === 'function') {
        ctx.req.url = rewrite(ctx.req.url);
      }
      httpProxy.createProxyServer().web(ctx.req, ctx.res, options, (e) => {
        const status = {
          ECONNREFUSED: 503,
          ETIMEOUT: 504,
        }[e.code];
        if (status) ctx.status = status;
        resolve();
      });
    });
  };
}

module.exports = proxy;
