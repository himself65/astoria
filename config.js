const resolve = require('path').resolve

const app = dir => resolve(__dirname, './src', dir)
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  appName: 'himself65',
  root: {
    username: '123456',
    password: '123456'
  },
  isProd: isProd,
  port: 3000,
  appPath: {
    controllers: app('controllers')
  },
  filePath: {
    distPath: '/root/himself65/dist'
  },
  api: {
    base: '/api'
  },
  apiUrl: '/api',
  mongodb: {
    port: '27017',
    database: 'astoria'
  },
  repos: [
    '/root/luogu-drawer'
  ]
}
