const seq = require('../db/seq/seq')
const { STRING, DATE, BOOLEAN } = require('../db/seq/types')

const User = seq.define('user', {
  userName: {
    type: STRING, // varchar(255)
    allowNull: false,
    unique: 'username', // 不要用unique: true
    comment: '用户名，唯一'
  },
  password: {
    type: STRING,
    allowNull: false,
    comment: '密码，唯一'
  }
})

module.exports = User
