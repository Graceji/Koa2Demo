const Router = require('koa-router');
const router = new Router();

const home = require('./home');
const user = require('./user');
const posts = require('./posts');

// router.routes ⇒ function
// Returns router middleware which dispatches a route matching the request.
router.use('/', home.routes(), home.allowedMethods());
router.use('/user', user.routes()), user.allowedMethods();
router.use('/posts', posts.routes(), posts.allowedMethods());

module.exports = router;
