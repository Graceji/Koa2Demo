const userModel = require('../public/lib/mysql');
const md5 = require('md5');

// 渲染登录页面
const renderSignin = async (ctx) => {
  await ctx.render('./homePage/login', {
    
  });
}

// 登录
const signin = async (ctx, next) => {
  const user = {
    userName: ctx.request.body.userName,
    password: ctx.request.body.password,
  };
  // 这里先查找用户名存在与否，存在则判断密码正确与否，不存在就返回false
  await userModel.findDataByName(user.userName)
  .then(result => {
    console.log('result', result[0]);
    if ((user.userName === result[0].name) && (result[0].pass === md5(user.password))) {
      ctx.body = {
        type: 0
      };
    } else {
      ctx.body = {
        type: 1 // 用户名或密码错误
      };
    }
  })
}

module.exports = {
  renderSignin,
  signin
}