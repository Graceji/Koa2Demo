const Koa = require('Koa');
const logger = require('koa-logger');
const views = require('koa-views')
const serve = require('koa-static');
const routers = require('./routes/index');
const config = require('./config/default');

const app = new Koa();
app.use(logger());

// 设置渲染引擎
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}));

// 设置静态文件夹
app.use(serve(__dirname + '/public/'));

// 设置路由
app.use(routers.routes());
app.use(routers.allowedMethods());

// 监听端口
app.listen(process.env.PORT || config.port, () => console.log(`服务器监听在${process.env.PORT || config.port}端口`));