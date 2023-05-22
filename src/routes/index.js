const router = require('koa-router')()
const { ENV } = require('../utils/env')
const packageInfo = require('../../package.json')
const testMysqlConn = require('../db/mysql2')
const { WorkModel } = require('../models/WorkModel')
const { cacheSet, cacheGet } = require('../db/redis')

// router.get('/', async (ctx, next) => {
//   await ctx.render('index', {
//     title: 'Hello Koa 2!'
//   })
// })

// router.get('/string', async (ctx, next) => {
//   ctx.body = 'koa2 string'
// })

// router.get('/json', async (ctx, next) => {
//   ctx.body = {
//     title: 'koa2 json'
//   }
// })

router.get('/api/db-check', async ctx => {
  // 测试mysql连接
  const mysqlRes = await testMysqlConn()
  
  // 测试mongodb连接
  let mongodbConn
  try {
    mongodbConn = true
    await WorkModel.findOne()
  } catch (ex) {
    mongodbConn = false
  }
  
  // 测试redis连接
  cacheSet('name', 'biz editor sever OK - by redis')
  const redisTestVal = await cacheGet('name')
  
  ctx.body = {
    errno: 0,
    data: {
      name: 'biz editor sever',
      ENV,
      version: packageInfo.version,
      mysqlConn: mysqlRes.length > 0,
      mongodbConn,
      redisConn: redisTestVal !== null,
      mysqlRes: JSON.stringify(mysqlRes)
    }
  }
})

module.exports = router
