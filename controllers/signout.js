
module.exports = async (ctx) => {
  ctx.session = null;
  ctx.body = '注销成功！'
}