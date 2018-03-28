const Router = require('koa-router');
const path = require('path');
const { getNotes } = require('../controllers/notes');
const { getProduct } = require('../controllers/product');
const { getDetail } = require('../controllers/test/test');
const {
  getTopicAll,
  getTopicOne,
  deleteTopicOne,
  postTopic,
  putTopic,
} = require('../controllers/topic');
const { handleFetchPrice } = require('../controllers/api');
const { getNavigations } = require('../controllers/navigation');
const { getPage } = require('../controllers/page');

const router = new Router({
  prefix: '/api',
});

router.get('/726wbb', async (ctx) => {
  ctx.body = await handleFetchPrice(require(path.resolve(__dirname, '../../../passwd/shoujsData.js')));
});

router.post('/test1', (ctx) => {
  ctx.body = {
    request: ctx.request,
    body: ctx.request.body,
  };
});

router.get('/test1', getDetail);

router.get('/notes', getNotes);

router.get('/product/search', getProduct);

router.get('/topic', getTopicAll);

router.get('/topic/:id', getTopicOne);

router.delete('/topic/:id', deleteTopicOne);

router.post('/topic', postTopic);

router.put('/topic/:id', putTopic);

router.get('/navigation', getNavigations);

router.get('/mall/page', getPage);

module.exports = router;
