const Sequelize = require('sequelize')
const { mysqlConf } = require('../../config/index')
const { isProd, isTest } = require('../../utils/env')

const { database, user, password, host, port } = mysqlConf
const conf = {
  host,
  port,
  dialect: 'mysql'
}

// 测试环境不打印日志
if (isTest) {
  conf.logging = () => {}
}

if (isProd) {
  // 线上环境，使用连接池
  conf.pool = {
    max: 5, // 连接池中最大的连接数量
    min: 0, // 最小
    idle: 10000 // 如果一个连接池10s之内没有被使用，则释放
  }
}

const seq = new Sequelize(database, user, password, conf)

module.exports = seq
