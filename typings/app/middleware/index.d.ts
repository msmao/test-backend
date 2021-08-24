// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportLog = require('../../../app/middleware/log');

declare module 'egg' {
  interface IMiddleware {
    log: typeof ExportLog;
  }
}
