'use strict';

const path = require("path");

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo, appConfig = {}) => {

  const config = exports = {};

  config.assets = {
    publicPath: '/public',
    crossorigin: false,
    contextKey: 'context',
    dynamicLocalIP: true,
    // devServer: false,
    devServer: {
      enable: true,
      debug: false,
      command: 'umi dev',
      autoPort: false,
      // portPath: path.join(appInfo.baseDir, 'run/assetsPort'),
      port: 8000, // port: null,

      timeout: 60 * 1000,
      waitStart: false,
      env: {
        APP_ROOT: path.join(appInfo.baseDir, (appConfig.assets && appConfig.assets.assetsDir) || 'web'),
        BROWSER: "none",
        ESLINT: "none",
        SOCKET_SERVER: "http://127.0.0.1:8000",
        PUBLIC_PATH: `http://127.0.0.1:8000`, // 静态资源的路径目录
      },
    },
  };

  return config;
};