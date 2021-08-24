'use strict';

const uuid = require('uuid');
const Service = require('egg').Service;

class UserService extends Service {

  async list() {
    const { ctx } = this;
    const userId = ctx.app.mongoose.Types.ObjectId(ctx.user._id)
    // const count = await ctx.model.User.countDocuments(condition);

    let condition = [
      {
        $lookup: {
          from: "relations",
          let: { user_id: "$_id" },
          pipeline: [
            // 联表查询当前请求用户是否已关注，是否互为关注
            { $match: { $expr: { $and: [{ "$eq": ["$follower", "$$user_id"] }, { "$eq": ["$owner", userId] }] } } },
          ],
          as: "relation"
        },
      },
      {
        $unwind: {
          path: '$relation',
          preserveNullAndEmptyArrays: true,
        }
      }
    ];

    if (ctx.query.name) {
      const user = await ctx.model.User.findOne({ name: ctx.query.name });
      if (user && user.location) {
        condition = [
          {
            $geoNear: {
              near: user.location,
              distanceField: "distance.calculated",
              maxDistance: ctx.query.maxDistance || 10000,
              includeLocs: "distance.location",
              spherical: true
            }
          },
          {
            $lookup: {
              from: "relations",
              let: { user_id: "$_id" },
              pipeline: [
                // 联表查询输入的用户名的互相关注的朋友
                { $match: { $expr: { $and: [{ "$eq": ["$follower", "$$user_id"] }, { $eq: ["$is_mutual", true] }, { "$eq": ["$owner", user._id] }] } } },
              ],
              as: "relation"
            },
          },
          {
            $unwind: {
              path: '$relation',
              preserveNullAndEmptyArrays: true,
            }
          },
          {
            $match: { 'relation.is_mutual': true }
          }
        ]
      }
      // 查找附近半径 50 * 1000m
      // const data = await ctx.model.User.find({ location: { '$near': { '$geometry': user.location, '$maxDistance': 50 * 1000 } } } );
    }

    const data = await ctx.model.User.aggregate(condition)
    return { data };
  }

  async create(data) {
    const { ctx } = this;
    Object.assign(data, { id: uuid.v4() });
    if (data.location && data.location.split(',').length === 2) {
      data.location = { type: 'Point', coordinates: data.location.split(',').map(n => Number(n)) };
    }
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
      const { avatar_url, name, email } = user.profile._json;

      // 初始化一条默认随机地理位置经纬度数据，测试需要
      const location = `120.${this.random(100000, 160000)},30.${this.random(300000, 360000)}`

      Object.assign(_user, { avatar_url, name, email, location })
    }

    if (_user.location && _user.location.split(',').length === 2) {
      _user.location = { type: 'Point', coordinates: _user.location.split(',').map(n => Number(n)) }
    }

    const newUser = await ctx.model.User.create(_user);

    // 初始化默认账号关注登录用户，测试需要
    let fans = await ctx.model.User.find({ "_id ": { "$ne": ctx.user._id } }, { _id: 1 });
    fans = fans.map(r => {
      return Object.assign({ follower: newUser._id, owner: ctx.app.mongoose.Types.ObjectId(r._id), is_mutual: false })
    })
    await ctx.model.Relation.insertMany(fans);

    return newUser;
  }

  async update(_id, data) {
    const { ctx } = this;
    if (data.location && data.location.split(',').length === 2) {
      data.location = { type: 'Point', coordinates: data.location.split(',').map(n => Number(n)) };
    }

    return await ctx.model.User.findByIdAndUpdate(_id, data);
  }

  async delete(_id) {
    const { ctx } = this;
    return await ctx.model.User.findByIdAndDelete(_id);
  }

  async relation(type) {
    const { ctx } = this;
    const userId = ctx.app.mongoose.Types.ObjectId(ctx.user._id)

    let result = [], total = 0;
    switch (type) {
      case 'followers': // 关注我的
        total = await ctx.model.Relation.countDocuments({ follower: userId });
        result = await ctx.model.Relation.find({ follower: userId }).populate('owner').populate('follower');
        break;
      case 'following': // 我关注的
        total = await ctx.model.Relation.countDocuments({ owner: userId });
        result = await ctx.model.Relation.find({ owner: userId }).populate('owner').populate('follower');
        break;
      case 'friends':   // 互相关注的
        total = await ctx.model.Relation.countDocuments({ owner: userId, is_mutual: true });
        result = await ctx.model.Relation.find({ owner: userId, is_mutual: true }).populate('owner').populate('follower');
        break;
      default:
        break;
    }
    return { result, total };
  }

  async follow(follower) {
    const { ctx } = this;
    let owner = ctx.user._id;
    if (owner === follower) ctx.throw("can't follow owner!");

    owner = ctx.app.mongoose.Types.ObjectId(owner)
    follower = ctx.app.mongoose.Types.ObjectId(follower)

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

  random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

}

module.exports = UserService;