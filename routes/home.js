const Router = require('koa-router');

const router = new Router();

// 加载首页
const home = require('../controllers/home');

module.exports = router
  .get('/', (ctx) => {
    // 转到所有文章页
    ctx.redirect('/posts');
  })