const mysql = require('mysql2/promise')
const { mysqlConf } = require('../config/index')

async function testMysqlConn() {
  const connection = await mysql.createConnection(mysqlConf)
  const [rows] = await connection.execute('select now();')
  return rows
}

// 可直接执行 node src/db/mysql2.js 进行测试
// ;(async () => {
//   const rows = await testMysqlConn()
//   console.log(rows) // [ { 'now()': 2023-03-01T09:37:42.000Z } ]
// })()

module.exports = testMysqlConn
