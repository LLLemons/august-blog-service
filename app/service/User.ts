/*
 * @Author: Lemon
 * @Date: 2021-04-30 15:56:40
 * @LastEditors: Lemon
 * @LastEditTime: 2021-05-06 21:25:52
 * @FilePath: /august-blog-service/app/service/User.ts
 */
import { Service } from 'egg';
const bcrypt = require('bcryptjs')

export default class User extends Service {
  public async register(payload) {
    var salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(payload.password, salt);
    console.log(hash)
    const userInfo = await this.ctx.model.User.findOne({
      where: {
        email: payload.email
      }
    })
    if (userInfo && userInfo.email === payload.email) {
      this.ctx.throw(500, '邮箱已存在')
    }
    return await this.ctx.model.User.create({
      ...payload,
      password: hash
    })
  }
  public async login(payload) {
    const userInfo = await this.ctx.model.User.findOne({
      where: {
        email: payload.email
      }
    })
    console.log(userInfo, '------')
    console.log(payload, '-------')
    if (!userInfo) {
      this.ctx.throw(500, '不存在该用户')
    }
    if (userInfo && !bcrypt.compareSync(payload.password, userInfo.password)) {
      this.ctx.throw(500, '密码错误')
    }
    const Authorization = this.ctx.helper.loginToken(userInfo)
    const result = {
      message: '登陆成功'
    };
    this.ctx.set('access-token', Authorization);
    return result
  }
  public async getUserDataFromToken() {
    let authToken = this.ctx.header.authorization as string // 获取header里的authorization
    const userInfo = this.ctx.helper.verifyToken(authToken.substring(7))
    return this.ctx.model.User.findOne({
      where: {
        id: userInfo.id
      },
      attributes: ['email', 'avatar', 'id'],
    })
  }
  public async update(id, payload) {
    const result = await this.ctx.model.User.update({
      email: payload.email,
      avatar: payload.avatar
    }, {
      where: {
        id
      }
    })
    return result
  }
}