/*
 * @Author: Lemon
 * @Date: 2021-04-30 13:02:38
 * @LastEditors: Lemon
 * @LastEditTime: 2021-05-06 17:52:33
 * @FilePath: /august-blog-service/app/controller/user.ts
 */
import { Controller } from 'egg';

export default class UserController extends Controller {
  public async register() {
    const { ctx } = this;
    console.log('register', ctx.request.body)
    ctx.body = await ctx.service.user.register(ctx.request.body);
  }
  public async getUserInfo() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.getUserDataFromToken()
  }
  public async login() {
    const { ctx } = this
    ctx.body = await ctx.service.user.login(ctx.request.body)
  }
  public async updateUserInfo() {
    const { ctx } = this
    await ctx.service.user.update(ctx.params.id, ctx.request.body)
    ctx.body = {
      message: '更新成功'
    }
  }
}
