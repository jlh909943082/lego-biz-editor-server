const redis = require('redis')
const { redisConf } = require('../config/index')

// 创建客户端
const redisClient = redis.createClient(redisConf.port, redisConf.host)
redisClient.on('error', err => {
  console.error('redis error', err)
})

/**
 * redis set
 * @param {string} key 键
 * @param {string} val 值
 * @param {number} timeout 过期时间，单位s
 */
function cacheSet(key, val, timeout = 60 * 60) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val)
  redisClient.expire(key ,timeout)
}

/**
 * redis get
 * @param {string} key 键
 */
function cacheGet(key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      if (val === null) {
        resolve(null)
        return
      }
      try {
        resolve(JSON.parse(val))
      } catch (ex) {
        resolve(val)
      }
    })
  })
  return promise
}

module.exports = {
  cacheSet,
  cacheGet
}
