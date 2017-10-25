module.exports = async (ctx) => {
  ctx.state = {
    // title: 'Koa2',
  };

  await ctx.render('./homePage/index', {
    title: 'koa2'
  })
}