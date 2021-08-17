/* eslint valid-jsdoc: "off" */

'use strict';

const argv = require('yargs').argv;
require('dotenv').config({
  path: argv.env,
});
const env = process.env;


/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1629204034131_9325';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',

    view: {
      mapping: {
        '.html': 'nunjucks',
      },
      defaultViewEngine: "nunjucks",
    },

    mongoose: {
      client: {
        url: env.MONGODB_URI,
        options: {
          useNewUrlParser: true,
          useCreateIndex: true,
          poolSize: env.MONGODB_POOL_SIZE,
          autoIndex: false,
        },
        // mongoose global plugins, expected a function or an array of function and options
        // plugins: [createdPlugin, [updatedPlugin, pluginOptions]],
      },
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
