const Router = require('koa-router');
const stream = require('stream');
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

const { getNavigations } = require('../controllers/navigation');
const { getPage } = require('../controllers/page');

const router = new Router({
  prefix: '/api',
});

router.get('/vv', (ctx) => {
  const arr = ['加上之前的摇粒绒起居鞋集齐一套本命年史努比', '憧憬]感慨下优衣库家居服太舒服了吧', '[，这个软软糯糯的绒绒，老阿姨穿上也想卖萌[太开心][太开心]', '真的很想穿着去上班[跪了][跪了]ysl07和08都吼吼看，07是很嫩很春天的橘粉色', '，涂完仿佛十七岁[doge]08一定要薄涂并且等它变色，就是橘红色了', '，超级提气色又显白[憧憬]这两只成膜感觉不那么明显，但是也会有玻璃唇效果(我并拍不出来[跪了])'];
  ctx.type = "html";
  ctx.body = ctx.req.pipe(new stream.Duplex({
    write(chunk, encoding, callback) {
      this.push(chunk);
      callback();
    },
    read(size) {
      setTimeout(() => {
        let text = arr.shift();
        text = text ? `<p style="color: #abcdef">${text}</p>` : null;
        this.push(text);
      }, 1000);
    }
  }));
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
