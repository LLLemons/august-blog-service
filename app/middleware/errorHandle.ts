import { Context } from "egg";

/*
 * @Author: Lemon
 * @Date: 2021-04-30 16:12:15
 * @LastEditors: Lemon
 * @LastEditTime: 2021-05-06 10:07:01
 * @FilePath: /august-blog-service/app/middleware/errorHandle.ts
 */
export default function(options) {
  return async function errorHandle(ctx: Context, next) {
    try {
      await next();
    } catch(err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit('error', err, ctx);

      const status = err.status || 500;
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const error = status === 500 && ctx.app.config.env === 'prod'
        ? 'Internal Server Error'
        : err.message;

      // 从 error 对象上读出各个属性，设置到响应中
      ctx.body = { error };
      ctx.status = status;
    }
  }
}