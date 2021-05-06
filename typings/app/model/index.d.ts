// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportRepository from '../../../app/model/repository';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Repository: ReturnType<typeof ExportRepository>;
    User: ReturnType<typeof ExportUser>;
  }
}
