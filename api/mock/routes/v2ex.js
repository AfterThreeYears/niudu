const Router = require('koa-router');
const { getTech } = require('../controllers/v2ex/tech');

const router = new Router({
  prefix: '/v2ex',
});

router.get('/tech', getTech);

module.exports = router;
