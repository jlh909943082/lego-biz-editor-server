const mongoose = require('mongoose')
const { mongodbConf } = require('../config/index')

const { host, port, dbName, user, password } = mongodbConf

// 拼接连接字符串
let url = `mongodb://${host}:${port}` // dev环境
if(user && password) {
  url = `mongodb://${user}:${password}@${host}:${port}`
}

mongoose.set('useFindAndModify', false)

// 开始连接（使用用户名和密码时，需要`?authSource=admin`）
mongoose.connect(`${url}/${dbName}?authSource=admin`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// 连接对象
const db = mongoose.connection

// 发生错误
db.on('error', err => {
  console.log(err);
})

// 连接成功 执行node src/db/mongoose.js 测试连接
// db.once('open', () => {
//   console.log('success')
// })

module.exports = mongoose
