module.exports = {
  apps: [{
    name: 'astoria',
    script: 'app.ts',

    args: '',
    instances: 1,
    autorestart: true,
    exec_interpreter: "ts-node",

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
