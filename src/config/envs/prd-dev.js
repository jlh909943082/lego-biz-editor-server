/**
 * @description prd-dev 配置
 * @author ji
 */
const devConf = require('./dev')

// 修改redis连接配置
Object.assign(devConf.redisConf, {
  // 和 docker-compose 中配置的service名字一致
  // [注意]端口依然是6379，而不是6378，后者是宿主机的端口
  host: 'editor-redis'
})

// 修改mongodb连接配置
Object.assign(devConf.mongodbConf, {
  host: 'editor-mongo'
})

// 修改mysql连接配置
Object.assign(devConf.mysqlConf, {
  host: 'editor-mysql'
})

module.exports = devConf
