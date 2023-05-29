/**
 * @description 封装 jwt 插件
 * @author ji
 */

const jwtKoa = require('koa-jwt')
const { JWT_SECRET, JWT_IGNORE_PATH } = require('../config/constant')

module.exports = jwtKoa({
  secret: JWT_SECRET,
  cookie: 'jwt-token'
}).unless({
  // 定义那些路由忽略 jwt 验证
  path: JWT_IGNORE_PATH
})
