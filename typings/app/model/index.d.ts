// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuthorization = require('../../../app/model/authorization');
import ExportRelation = require('../../../app/model/relation');
import ExportUser = require('../../../app/model/user');

declare module 'egg' {
  interface IModel {
    Authorization: ReturnType<typeof ExportAuthorization>;
    Relation: ReturnType<typeof ExportRelation>;
    User: ReturnType<typeof ExportUser>;
  }
}
