module.exports = function(AppUser) {
  AppUser.afterRemote('login', async (ctx) => {
    ctx.res.cookie('access_token', ctx.result.id, { signed: true, maxAge: ctx.result.ttl * 1000, httpOnly: true });
  });
    
  AppUser.afterRemote('logout', async (ctx) => {
    ctx.res.clearCookie('access_token');
  });
};
