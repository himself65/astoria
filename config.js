const resolve = require('path').resolve

const app = dir => resolve(__dirname, './src', dir)

module.exports = {
  appName: 'himself65',
  port: 3000,
  appPath: {
    controllers: app('controllers')
  },
  api: {
    base: '/api'
  },
  distPath: '/root/himself65/dist',
  postsPath: '/root/himself65/dist/_posts',
  drawerPath: '/root/luogu-drawer',
  apiUrl: '/api',
  mongodb: {
    port: '27017',
    database: 'astoria'
  },
  repos: [
    '/root/luogu-drawer'
  ]
}
