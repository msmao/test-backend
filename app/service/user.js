'use strict';

const uuid = require('uuid');
const Service = require('egg').Service;

class UserService extends Service {

  async list() {
    const { ctx } = this;
    const condition = {};
    const count = await ctx.model.User.countDocuments(condition);
    const data = await ctx.model.User.find(condition);
    return { count, data };
  }

  async view(_id) {
    const { ctx } = this;
    const data = await ctx.model.User.findById(_id);
    return data;
  }

  async create(data) {
    const { ctx } = this;
    Object.assign(data, { id: uuid.v4() });
    return await ctx.model.User.create(data);
  }

  async register(user, auth) {
    const { ctx } = this;

    if (!auth) {
      auth = await ctx.model.Authorization.create({
        uid: user.id,
        provider: user.provider,
        user_id: uuid.v4()
      });
    }

    const _user = { id: auth.user_id, name: user.name, };
    if (user.provider === 'github' && user.profile && user.profile._json) {
      const { avatar_url, name, blog, location, email } = user.profile._json;
      Object.assign(_user, { avatar_url, name, blog, location, email  })
    }

    return await ctx.model.User.create(_user);
  }

  async update(_id, data) {
    const { ctx } = this;
    return await ctx.model.User.findByIdAndUpdate(_id, data);
  }

  async delete(_id) {
    const { ctx } = this;
    return await ctx.model.User.findByIdAndDelete(_id);
  }

  async relation(type) {
    const { ctx } = this;
    const user = ctx.fuck;

    let result = [], total = 0;
    switch (type) {
      case 'followers': // 关注我的
        total = await ctx.model.Relation.countDocuments({ follower: user.id });
        result = await ctx.model.Relation.find({ follower: user.id }).populate('owner').populate('follower');
        break;
      case 'following': // 我关注的
        total = await ctx.model.Relation.countDocuments({ owner: user.id });
        result = await ctx.model.Relation.find({ owner: user.id }).populate('owner').populate('follower');
        break;
      case 'friends':   // 互相关注的
        total = await ctx.model.Relation.countDocuments({ owner: user.id, isMutual: true });
        result = await ctx.model.Relation.find({ owner: user.id, isMutual: true }).populate('owner').populate('follower');
        break;
      default:
        break;
    }
    // result = result.map(r => {
    //   const { is_mutual, _id: relation_id, createdAt: follow_time, follower, owner } = r;
    //   const v = { is_mutual, relation_id, follow_time, };
    //   console.log('r:', r)
    //   if (follower && follower._id) Object.assign(v, { user: follower })
    //   if (owner && owner._id) Object.assign(v, { user: owner })
    //   Reflect.deleteProperty(v, '__v')
    //   return v;
    // })

    console.log(result);
    return { result, total };
  }

  async follow(follower) {
    const { ctx } = this;

    let owner = ctx.fuck.id;
    if (owner === follower) ctx.throw("can't follow owner!");

    // 我是否已关注他，他是否已关注我
    const isFollowHim = await ctx.model.Relation.countDocuments({ follower, owner });
    const isFollowMe = await ctx.model.Relation.countDocuments({ follower: owner, owner: follower });
    if (isFollowHim) {
      await ctx.model.Relation.remove({ follower, owner });
      await ctx.model.Relation.findOneAndUpdate({ follower: owner, owner: follower }, { is_mutual: false });
    } else {
      await ctx.model.Relation.create(Object.assign({ follower, owner }, { is_mutual: Boolean(isFollowMe) }));
    }

    return true;
  }

  async nearby(username) {

  }
}

module.exports = UserService;