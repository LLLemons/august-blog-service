import { Service } from 'egg';

/**
 * Test Service
 */
export default class Repository extends Service {

  /**
   * sayHi to you
   * @param name - your name
   */
  public async create(payload) {
    const userInfo = await this.ctx.service.user.getUserDataFromToken()
    return await this.app.model.Repository.create({
      ...payload,
      userId: userInfo.id
    })
  }
  public async query(payload) {
    const { pageNo, pageSize } = payload
    const limit = +pageSize
    const offset = limit * (+pageNo - 1)
    const userInfo = await this.ctx.service.user.getUserDataFromToken()
    const data = await this.app.model.Repository.findAndCountAll({
      where: {
        userId: userInfo.id,
      },
      limit,
      offset
    })
    console.log(data)
    return {
      list: data.rows,
      total: data.count
    }
  }
  public async queryOne(id) {
    const userInfo = await this.ctx.service.user.getUserDataFromToken()
    return this.app.model.Repository.findOne({
      where: {
        id,
        userId: userInfo.id,
      },
      include: {
        attributes: [ 'email', 'avatar' ],
        model: this.ctx.model.User,
      }
    })
  }
}
