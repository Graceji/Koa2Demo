const userModel = require('../public/lib/mysql');
const md5 = require('md5');

const renderSingnup = async (ctx, next) => {
  await ctx.render('./homePage/register', {
    session: ctx.session
  })
}

const signup = async (ctx, next) => {
  // ctx.request.body 的格式为：{ email: '', userName: '', password: '', repeatPassword: '' }
  const user = {
    // email: ctx.request.body.email,
    userName: ctx.request.body.userName,
    password: ctx.request.body.password,
    repeatPassword: ctx.request.body.repeatPassword
  };
  await userModel.findDataByName(user.userName)
    .then(result => {
      console.log('result', result);
      if (result.length) {
        ctx.body = {
          type: 0, // '用户名已经存在'
        };
      } else {
        userModel.insertData([user.userName, md5(user.password)]);
        ctx.body = {
          type: 1, // 注册成功
        };
      }
    })
}

module.exports = {
  renderSingnup,
  signup,
}