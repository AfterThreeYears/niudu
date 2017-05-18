const Router = require('koa-router');
const { getList } = require('../controllers/v2ex/list');
const { getDetail } = require('../controllers/v2ex/detail');

const router = new Router({
  prefix: '/v2ex',
});

router.get('/list/:type', getList);

router.get('/detail/:id', getDetail);

module.exports = router;
