const Router = require('koa-router');
const router = new Router();

// 登录
const login = require('../controllers/login');

// 注册
const register = require('../controllers/register');

// 注销
const signout = require('../controllers/signout');

// 注册：get方式得到'/register'页面， post方式实现注册
router
  .get('/login', login.renderSignin)
  .get('/register', register.renderSingnup)
  .post('/register', register.signup)
  .post('/login', login.signin)
  .get('/signout', signout)

module.exports = router;
