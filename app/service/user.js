'use strict';

const Service = require('egg').Service;

class UserService extends Service {

  async list() {
    // const { trx, user } = this.ctx;
    // const settings = await trx('setting')
    //   .where({ status: 'E' })
    //   .select('GUID', 'name', 'values');
    // const config = {};
    // settings.forEach(s => {
    //   config[s.name] = s.values;
    // });
    // return config;
  }

  async view() {

  }

  async create() {

  }

  async update() {

  }

  async delete() {

  }
}

module.exports = UserService;