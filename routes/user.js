const Router = require('koa-router');
const router = new Router();

// 登录
const login = require('../controllers/login');

// 注册
const register = require('../controllers/register');

router
  .get('/login', login)
  .get('/register', register);

module.exports = router;
