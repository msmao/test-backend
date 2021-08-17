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
    const result = await this.service.user.view(data);
    ctx.body = result;
  }

  async update() {
    const { ctx } = this;
    const id = ctx.params.id;
    const data = ctx.request.body;
    const result = await this.service.user.view(id, data);
    ctx.body = result;
  }

  async delete() {
    const { ctx } = this;
    const id = ctx.params.id;
    const result = await this.service.user.view(id, data);
    ctx.body = result;
  }
}

module.exports = UserController;
