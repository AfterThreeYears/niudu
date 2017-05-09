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

<<<<<<< HEAD
router.get('/test', (ctx) => {
  ctx.body = {
    data: [
      {
        userId: '1561426455',
        remark: '好的解毒剂好的很好的的聚集地简单好好休息嘟嘟还是好多好多话好多好多呀还是和誓师大会好多江苏嘟嘟嘟还是精华素对我说教师节今生今世是不是宝宝大家都看看短裤江苏省医师公会数不胜数可可也好多好多话解毒剂今生今世不得不说边伯贤你就像简单简单简单简单亟待解决的考试结束后来',
        province: '云南省',
        city: '德宏傣族景颇族自治州',
      },
    ],
    success: true,
    errorCode: '',
    errorMSG: '',
    total: 1,
    totalPage: 1,
  };
});

=======
>>>>>>> b56bc8c... fix: eslint fix
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
