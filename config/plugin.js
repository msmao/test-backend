'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  passport: {
    enable: true,
    package: 'egg-passport',
  },
  passportGithub: {
    enable: true,
    package: 'egg-passport-github',
  },
  cors: {
    enable: true,
    package: "egg-cors"
  },
  // assets: {
  //   enable: true,
  //   package: 'egg-view-assets',
  // },
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
};
