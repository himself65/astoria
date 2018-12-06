const dev = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 3000

module.exports = {
  appName: "Himself65",
  port: dev ? port : 80,
  distPath: '/root/himself65/dist'
}
