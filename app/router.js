'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);

  // 挂载鉴权路由
  app.passport.mount('github');
  app.router.get('/logout', controller.user.logout);

  router.get('/api/users', controller.user.index);
  router.post('/api/users', controller.user.create);
  router.get('/api/users/relation', controller.user.relation);
  router.get('/api/users/search', controller.user.search)
  router.get('/api/users/:id', controller.user.view);
  router.put('/api/users/:id', controller.user.update);
  router.del('/api/users/:id', controller.user.delete);
  router.put('/api/users/:id/follow', controller.user.follow);

  // router.get('*', controller.home.index);
};
