const Router = require('koa-router');
const router = new Router();

const home = require('./home');

router.use(home.routes());

module.exports = router;