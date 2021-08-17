'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.get('/api/users', controller.user.index);
  router.get('/api/users/:id', controller.user.view);
  router.post('/api/users', controller.user.create);
  router.put('/api/users/:id', controller.user.update);
  router.del('/api/users/:id', controller.user.delete);

  router.get('*', controller.home.index);
};
