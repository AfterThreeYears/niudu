const koaRouter = require('koa-router');
const api = require('./api');

const router = koaRouter();

router.use(api.routes(), api.allowedMethods());

module.exports = router;
