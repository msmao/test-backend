// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome = require('../../../app/controller/home');
import ExportUser = require('../../../app/controller/user');

declare module 'egg' {
  interface IController {
    home: ExportHome;
    user: ExportUser;
  }
}
