const koaRouter = require('koa-router');
// const api = require('./api');
const v2ex = require('./v2ex');

const router = koaRouter();

// router.use(api.routes(), api.allowedMethods());
router.use(v2ex.routes(), v2ex.allowedMethods());

module.exports = router;
