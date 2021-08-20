'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {

  async index() {
    const { ctx } = this;
    const result = await this.service.user.list();
    ctx.body = result;
  }

  async view() {
    const { ctx } = this;
    const id = ctx.params.id;
    const result = await this.service.user.view(id);
    ctx.body = result;
  }

  async create() {
    const { ctx } = this;
    const data = ctx.request.body;
    const result = await this.service.user.create(data);
    ctx.body = { status: 'ok', data: result };
  }

  async update() {
    const { ctx } = this;
    const id = ctx.params.id;
    const data = ctx.request.body;
    const result = await this.service.user.update(id, data);
    ctx.body = { status: 'ok', data: result };
  }

  async delete() {
    const { ctx } = this;
    const id = ctx.params.id;
    console.log('id:', id);
    const result = await this.service.user.delete(id);
    ctx.body = { status: 'ok', data: result };
  }

  async logout() {
    const ctx = this.ctx;
    ctx.logout();
    ctx.redirect(ctx.get('referer') || '/');
  }

  // 用户之间的关系
  // 关注我的 followers、我关注的 following、互相关注的 friends
  async relation() {
    const { ctx } = this;
    const { type = 'following' }= ctx.query;
    const { result, total } = await this.service.user.relation(type);
    ctx.body = { status: 'ok', data: result, total };
  }

  // 关注/取消关注
  async follow() {
    const { ctx } = this;
    const follower_id = ctx.params.id;
    // const { cannel = false }= ctx.request.body;
    const result = await this.service.user.follow(follower_id);
    ctx.body = { status: 'ok', data: result };
  }

  // 搜索附件的人
  async search() {
    const { ctx } = this;
    const username = ctx.query.username;
    const result = await this.service.user.nearby(username);
    ctx.body = result;
  }
}

module.exports = UserController;
