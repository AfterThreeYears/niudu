const Router = require('koa-router');
const { getList } = require('../controllers/v2ex/list');
const { getDetail } = require('../controllers/v2ex/detail');
const setReply = require('../controllers/v2ex/reply');
const { setSignin } = require('../controllers/v2ex/signin');

const router = new Router({
  prefix: '/v2ex',
});

router.get('/list/:type', getList);

router.get('/detail/:id', getDetail);

router.post('/reply', setReply);

router.post('/signin', setSignin);

module.exports = router;
