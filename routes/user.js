const Router = require('koa-router');
const router = new Router();

// 登录
const login = require('../controllers/login');

// 注册
const register = require('../controllers/register');

// 注册：get方式得到'/register'页面， post方式实现注册
router
  .get('/login', login)
  .get('/register', register.renderSingnup)

router.post('/register', register.signup)


module.exports = router;
