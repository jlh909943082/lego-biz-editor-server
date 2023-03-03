const router = require('koa-router')()
const { ENV } = require('../utils/env')
const packageInfo = require('../../package.json')
const testMysqlConn = require('../db/mysql2')

// router.get('/', async (ctx, next) => {
//   await ctx.render('index', {
//     title: 'Hello Koa 2!'
//   })
// })
//
// router.get('/string', async (ctx, next) => {
//   ctx.body = 'koa2 string'
// })
//
// router.get('/json', async (ctx, next) => {
//   ctx.body = {
//     title: 'koa2 json'
//   }
// })

router.get('/api/db-check', async ctx => {
  const mysqlRes = await testMysqlConn()
  ctx.body = {
    errno: 0,
    data: {
      name: 'biz editor sever',
      ENV,
      version: packageInfo.version,
      mysqlConn: mysqlRes.length > 0
    }
  }
})

module.exports = router
