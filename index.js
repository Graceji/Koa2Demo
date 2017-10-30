const Koa = require('Koa');
const logger = require('koa-logger');
const views = require('koa-views')
const serve = require('koa-static');
const bodyparser = require('koa-bodyparser')
const routers = require('./routes/index');
const config = require('./config/default');
const session = require('koa-session-minimal');
const MySqlStore = require('koa-mysql-session');

const sessionMysqlConfig = {
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  host: config.database.HOST,
};

const app = new Koa();

// 配着session中间件
app.use(session({
  key: 'USER_SID',
  store: new MySqlStore(sessionMysqlConfig)
}));

// 日志
app.use(logger());

// 设置渲染引擎
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}));

// 设置静态文件夹
app.use(serve(__dirname + '/public/'));

// A body parser for koa, base on co-body. support json, form and text type body.
// the parsed body will store in ctx.request.body 
// if nothing was parsed, body will be an empty object {} 
app.use(bodyparser());

// 设置路由
app.use(routers.routes());
app.use(routers.allowedMethods());

// 监听端口
app.listen(process.env.PORT || config.port, () => console.log(`服务器监听在${process.env.PORT || config.port}端口`));