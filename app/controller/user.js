'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {

  async index() {
    const { ctx } = this;
    const { name } = ctx.query;
    const condition = {};
    if (name) Object.assign(condition, { name });
    const result = await this.service.user.list(condition);
    ctx.body = result;
    // ctx.body = { status: 'ok', data: result };
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

}

module.exports = UserController;
