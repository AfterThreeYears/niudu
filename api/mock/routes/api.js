const Router = require('koa-router');
const { getUsers } = require('../controllers/users');
const { getNotes } = require('../controllers/notes');
const { getItem } = require('../controllers/item');
const { getProduct } = require('../controllers/product');
const {
  getTopicAll,
  getTopicOne,
  deleteTopicOne,
  postTopic,
  putTopic,
} = require('../controllers/topic');

const { getNavigations } = require('../controllers/navigation');
const { getPage } = require('../controllers/page');

const router = new Router({
  prefix: '/api',
});

router.get('/users', getUsers);

router.get('/notes', getNotes);

router.get('/product/search', getProduct);

router.get('/item/:id', getItem);

router.get('/topic', getTopicAll);

router.get('/topic/:id', getTopicOne);

router.delete('/topic/:id', deleteTopicOne);

router.post('/topic', postTopic);

router.put('/topic/:id', putTopic);

router.get('/navigation', getNavigations);

router.get('/mall/page', getPage);

module.exports = router;
