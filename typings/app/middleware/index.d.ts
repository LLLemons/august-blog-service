// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportErrorHandle from '../../../app/middleware/errorHandle';
import ExportJwt from '../../../app/middleware/jwt';

declare module 'egg' {
  interface IMiddleware {
    errorHandle: typeof ExportErrorHandle;
    jwt: typeof ExportJwt;
  }
}
