const Router = require('koa-router');
const router = new Router();
const postsOption = require('../controllers/posts');

// 注册：get方式得到'/register'页面， post方式实现注册
router
  .get('/', postsOption.displayPosts)
  .get('/createArticle', postsOption.createArticle)
  .post('/addArticle', postsOption.addArticle)
  .get('/deletePost', postsOption.deletePost)

module.exports = router;
