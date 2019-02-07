const resolve = require('path').resolve

const app = dir => resolve(__dirname, './src', dir)
const isProd = process.env.NODE_ENV === 'production'
const staticPath = resolve(__dirname, '../', 'himself65', 'dist')

module.exports = {
  appName: 'himself65',
  root: {
    username: 'himself65',
    password: '123456'
  },
  staticPath,
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
  plugins: {
    'UserAccess': {
      whiteList: [
        /^\/api\/login/,
        /^\/login/
      ]
    }
  },
  repos: [
    '/root/luogu-drawer'
  ]
}
