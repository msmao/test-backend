const assert = require('assert');

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  configWillLoad() {
    // 此时 config 文件已经被读取并合并，但是还并未生效
    // 这是应用层修改配置的最后时机
    // 注意：此函数只支持同步调用

    // // 例如：参数中的密码是加密的，在此处进行解密
    // this.app.config.mysql.password = decrypt(this.app.config.mysql.password);
    // // 例如：插入一个中间件到框架的 coreMiddleware 之间
    // const statusIdx = this.app.config.coreMiddleware.indexOf('status');
    // this.app.config.coreMiddleware.splice(statusIdx + 1, 0, 'limit');
  }

  async didLoad() {
    // 所有的配置已经加载完毕
    // 可以用来加载应用自定义的文件，启动自定义的服务

    // 例如：创建自定义应用的示例
    // this.app.queue = new Queue(this.app.config.queue);
    // await this.app.queue.init();

    // // 例如：加载自定义的目录
    // this.app.loader.loadToContext(path.join(__dirname, 'app/tasks'), 'tasks', {
    //   fieldClass: 'tasksClasses',
    // });
  }

  async willReady() {
    // 所有的插件都已启动完毕，但是应用整体还未 ready
    // 可以做一些数据初始化等操作，这些操作成功才会启动应用

    // 例如：从数据库加载数据到内存缓存
    // this.app.cacheData = await this.app.model.query(QUERY_CACHE_SQL);
  }

  async didReady() {
    // 应用已经启动完毕
    const app = this.app;

    app.passport.verify(async (ctx, user) => {
      // 检查用户
      assert(user.provider, 'user.provider should exists');
      assert(user.id, 'user.id should exists');

      // 从数据库中查找用户信息
      const auth = await ctx.model.Authorization.findOne({
        uid: user.id,
        provider: user.provider,
      });

      if (auth && auth.user_id) {
        const existsUser = await ctx.model.User.findOne({ id: auth.user_id });
        if (existsUser) {
          return existsUser;
        }
      }

      // 注册新用户
      return await ctx.service.user.register(user, auth);
    });

    // 将用户信息序列化后存进 session 里面，一般需要精简，只保存个别字段
    app.passport.serializeUser(async (ctx, user) => {
      // 处理 user
      // ...
      return user;
    });

    // 反序列化后把用户信息从 session 中取出来，反查数据库拿到完整信息
    app.passport.deserializeUser(async (ctx, user) => {
      // 处理 user
      // ...
      return user;
    });

    // const ctx = await this.app.createAnonymousContext();
    // await ctx.service.Biz.request();
  }

  async serverDidReady() {
    // http / https server 已启动，开始接受外部请求
    // 此时可以从 app.server 拿到 server 的实例

    // this.app.server.on('timeout', socket => {
    //   // handle socket timeout
    // });
  }
}

module.exports = AppBootHook;