/*
 * @Author: Lemon
 * @Date: 2021-05-06 09:48:59
 * @LastEditors: Lemon
 * @LastEditTime: 2021-05-06 16:16:46
 * @FilePath: /august-blog-service/app/extend/helper.ts
 */
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');


const cert = 'august0410'

export default {
  loginToken(data, expires = 7200) {
    const exp = Math.floor(Date.now() / 1000) + expires
    var privateKey = fs.readFileSync(path.join(__dirname, '../public/jwtRS256.key'));
    const token = jwt.sign({ data, exp }, privateKey, { algorithm: 'RS256' })
    return token
  },
  // 解密，验证
  verifyToken(token) {
    var privateKey = fs.readFileSync(path.join(__dirname, '../public/jwtRS256.key'));
    let res = {} as UserInfo.UserInfo
    try {
      const result = jwt.verify(token, privateKey, { algorithms: 'RS256' }) || {}
      const { exp } = result,
        current = Math.floor(Date.now() / 1000)
      if (current <= exp) res = result.data || {}
    } catch (e) {
      console.log(e)
    }
    return res
  }
}