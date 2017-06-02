const Router = require('koa-router');
const { getList } = require('../controllers/v2ex/list');
const { getDetail } = require('../controllers/v2ex/detail');
const { setReply } = require('../controllers/v2ex/reply');

const router = new Router({
  prefix: '/v2ex',
});

router.get('/list/:type', getList);

router.get('/detail/:id', getDetail);

router.post('/reply/:id', setReply);

module.exports = router;
