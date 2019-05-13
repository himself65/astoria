const resolve = require('path').resolve

const isProd = process.env.NODE_ENV === 'production'
const staticPath = resolve('../../../himself65', 'dist')

export const config = {
  appName: 'himself65',
  root: {
    username: 'himself65',
    password: '123456'
  },
  staticPath,
  isProd: isProd,
  port: 3000,
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

export default function () {
  return {
    ...config
  }
}
