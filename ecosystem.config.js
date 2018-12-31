module.exports = {
  apps: [{
    name: 'astoria',
    script: 'src/index.js',

    args: '',
    instances: 1,
    autorestart: true,
    exec_interpreter: "babel-node",

    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
}
