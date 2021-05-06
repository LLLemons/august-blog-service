import { Controller } from 'egg';

export default class RepositoryController extends Controller {
  public async create() {
    const { ctx } = this;
    ctx.body = await ctx.service.repository.create(ctx.request.body)
  }
  public async query() {
    const { ctx } = this;
    const { pageNo, pageSize } = ctx.request.query
    console.log(pageNo, pageSize)
    ctx.body = await ctx.service.repository.query(ctx.request.query)
  }
  public async queryOne() {
    const { ctx } = this;
    ctx.body = await ctx.service.repository.queryOne(ctx.params.id)
  }
}
