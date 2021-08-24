const Logger = require('egg-logger').Logger;

const CustomLogger = require('./CustomLogger');

module.exports = {
  get log() {
    return CustomLogger(this);
  }
};