const Router = require('koa-router');
const router = new Router();

const home = require('./home');
const user = require('./user');

// router.routes ⇒ function
// Returns router middleware which dispatches a route matching the request.
router.use('/', home.routes(), home.allowedMethods());
router.use('/user', user.routes()), user.allowedMethods();

module.exports = router;
