/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');
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
  config.middleware = [ 'log' ];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',

    logger: {
      // outputJSON: true,
      // level: 'INFO',
      consoleLevel: 'DEBUG',
      disableConsoleAfterReady: false,
      log: {
        formatter: (message) => {
          return `${message.time}${message.processid}`
        }
      }
    },

    view: {
      root: path.join(appInfo.baseDir, 'app/public'),
      mapping: {
        '.html': 'nunjucks',
      },
      defaultViewEngine: "nunjucks",
    },

    security: {
      csrf: {
        enable: false,
      },
      xframe: {
        enable: false,
      },
      domainWhiteList: ['*'],
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

    passportGithub: {
      key: env.PASSPORT_GITHUB_CLIENT_ID,
      secret: env.PASSPORT_GITHUB_CLIENT_SECRETS,
      callbackURL: 'https://demo.msmao.com/wiredcraft/passport/github/callback',
      // proxy: false,
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
