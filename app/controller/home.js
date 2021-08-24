'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {

  async healthy() {
    const { ctx, app } = this;
    ctx.body = { status: 'ok' };
  }

  async index() {
    const { ctx, app } = this;

    if (ctx.isAuthenticated()) {

      await ctx.render('index.html', {
        user: ctx.user,
      })

      /*
      ctx.body = `<div>
        <h2>${ctx.path}</h2>
        <hr>
        Logined user: <img src="${ctx.user.avatar_url}"> ${ctx.user.name} / ${ctx.user.id} | <a href="/logout">Logout</a>
        <pre><code>${JSON.stringify(ctx.user, null, 2)}</code></pre>
        <hr>
        <a href="/">Home</a> | <a href="/user">User</a>
      </div>`;
      */
    } else {
      ctx.session.returnTo = ctx.path;
      ctx.body = `
        <div>
          <h2>${ctx.path}</h2>
          <h3>Login with <a href="passport/github">Github</a></h3>
        </div>
      `;
    }
  }

}

module.exports = HomeController;
