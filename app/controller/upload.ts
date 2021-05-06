import { Controller } from 'egg';
const path = require('path')
const fs = require('fs')
const pump = require('mz-modules/pump');

export default class UploadController extends Controller {
  public async index() {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    const filename = Date.now() + path.extname(stream.filename).toLowerCase();
    const target = path.join(this.config.baseDir, 'app/public/images', filename);
    const writeStream = fs.createWriteStream(target);
    await pump(stream, writeStream);
    this.ctx.body = 'http://127.0.0.1:7002/public/images/' + filename;
  }
}