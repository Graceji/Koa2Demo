const Router = require('koa-router');
const router = new Router();
const userModel = require('../public/lib/mysql');
const moment = require('moment');

// 新建文章
const createArticle = async (ctx) => {
  await ctx.render('./homePage/createArticle', {
    session: ctx.session
  });
}

// 发表文章
const addArticle = async (ctx) => {
  const title = ctx.request.body.title;
  const content = ctx.request.body.content;
  const id = ctx.session.id;
  const name = ctx.session.user;
  const time = moment().format('YYYY-MM-DD HH:mm');
  await userModel.insertPost([name, title, content, id, time])
    .then(() => {
      ctx.body = true;
    })
    .catch((error) => {
      console.log('error', error);
      ctx.body = false;
    })
}

// 显示所有的文章
const displayPosts = async (ctx) => {
  let posts;
  await userModel.findAllPosts()
    .then((res) => {
      posts = JSON.parse(JSON.stringify(res))
      console.log(posts);

    })
    .catch(err => {
      console.log(err);
    })
  await ctx.render('./homePage/articles', {
    session: ctx.session,
    posts,
  })
}

// 注册：get方式得到'/register'页面， post方式实现注册
router
  .get('/', displayPosts)
  .get('/createArticle', createArticle)
  .post('/addArticle', addArticle)

module.exports = router;
