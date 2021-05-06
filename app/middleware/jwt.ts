/*
 * @Author: Lemon
 * @Date: 2021-05-06 09:59:55
 * @LastEditors: Lemon
 * @LastEditTime: 2021-05-06 16:19:27
 * @FilePath: /august-blog-service/app/middleware/jwt.ts
 */
const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken') //引入jsonwebtoken
import { Context } from "egg";

export default () => {
  return async function userInterceptor(ctx: Context, next) {
    let authToken = ctx.header.authorization as string // 获取header里的authorization
    if (authToken) {
      authToken = authToken.substring(7)
      const res: any = ctx.helper.verifyToken(authToken) // 解密获取的Token
      console.log(res)
      if (res.id) {
        await next()
      } else {
        ctx.status = 401
        ctx.body = { message: '登录状态已过期' }
      }
    } else {
      ctx.status = 401
      ctx.body = { message: '请登陆后再进行操作' }
    }
  }
}


