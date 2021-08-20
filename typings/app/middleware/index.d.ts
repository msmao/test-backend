// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportUser = require('../../../app/middleware/user');

declare module 'egg' {
  interface IMiddleware {
    user: typeof ExportUser;
  }
}
