const Router = require('koa-router');

const router = new Router();
const home = require('../controllers/home');

module.exports = router
  .get('/home', home)