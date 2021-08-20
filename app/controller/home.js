'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  // constructor(ctx) {
  //   super(ctx);
  //   // this.serverRender = require("../public/umi.server");
  // }

  async index() {
    const ctx = this.ctx;

    if (ctx.isAuthenticated()) {
      ctx.body = `<div>
        <h2>${ctx.path}</h2>
        <hr>
        Logined user: <img src="${ctx.user.avatar_url}"> ${ctx.user.name} / ${ctx.user.id} | <a href="/logout">Logout</a>
        <pre><code>${JSON.stringify(ctx.user, null, 2)}</code></pre>
        <hr>
        <a href="/">Home</a> | <a href="/user">User</a>
      </div>`;
    } else {
      ctx.session.returnTo = ctx.path;
      ctx.body = `
        <div>
          <h2>${ctx.path}</h2>
          <hr>
          Login with
          <a href="/passport/weibo">Weibo</a> | <a href="/passport/github">Github</a> |
          <a href="/passport/bitbucket">Bitbucket</a> | <a href="/passport/twitter">Twitter</a> |
          <a href="/passport/yuque">YuQue 语雀</a>
          <hr>
          <a href="/">Home</a> | <a href="/user">User</a>
        </div>
      `;
    }
  }

  async findex() {
    const { ctx, app } = this;

    global.host = `${ctx.request.protocol}://${ctx.request.host}`;
    global.href = ctx.request.href;
    // global._cookies = ctx.helper.parseCookie(ctx);
    // global._navigatorLang = ctx.helper.parseNavLang(ctx);

    // 先走 eggjs 的view 渲染
    const htmlTemplate = await ctx.view.render('index.html');

    // const serverRender = require("../public/umi.server");

    // 将 html 模板传到服务端渲染函数中
    const { error, html } = await this.serverRender({
      path: ctx.url,
      getInitialPropsCtx: {},
      htmlTemplate,
    });

    if (error) {
      ctx.logger.error(
        "[SSR ERROR] 渲染报错，切换至客户端渲染",
        error,
        ctx.url
      );
    }
    ctx.type = "text/html";
    ctx.status = 200;
    ctx.body = html;
  }

}

module.exports = HomeController;
