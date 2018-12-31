const config = require('./config')

const isProd = process.env.NODE_ENV === 'production'

const apps = [{
  name: 'astoria',
  script: 'dist/index.js',

  args: '',
  instances: 1,
  autorestart: true,

  watch: false,
  max_memory_restart: '1G',
  env: {
    NODE_ENV: 'development'
  },
  env_production: {
    NODE_ENV: 'production'
  }
}]

if (isProd) {
  for (const k in config.repos) {
    const repo = config.repos[k]
    const configPath = `${repo}/ecosystem.config.js`
    const apps = require(configPath).apps
    apps.push(apps)
  }
}

module.exports = {
  apps
}
