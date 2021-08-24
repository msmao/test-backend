const Logger = require('egg-logger').Logger;
const CustomTransport = require('./CustomTransport.js');
const path = require('path');

module.exports = function (ctx) {
  const logger = new Logger();
  logger.set('file', new CustomTransport({
    level: 'INFO',
    file: path.join(ctx.app.config.baseDir, 'logs', `${ctx.app.config.name}.log`),
  }, ctx));
  return logger;
};