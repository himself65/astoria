import Astoria from './src'

const path = require('path')
const debug = require('debug')('astoria')

const astoria = new Astoria('astoria', {
  rootPath: path.resolve(__dirname, './src'),
  debug: process.env.NODE_ENV === 'dev'
})

const { port, isProd } = astoria.config

astoria.listen(port, () => {
  astoria.logger.info(`服务已启动`)
})
