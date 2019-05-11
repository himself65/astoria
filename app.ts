import Astoria from './src'
const debug = require('debug')('astoria')

const astoria = new Astoria('astoria', {
  rootPath: __dirname,
  debug: process.env.NODE_ENV === 'dev'
})

// fixme
// https://github.com/daruk-framework/daruk/issues/33
// @ts-ignore
const { port, isProd } = astoria.config

astoria.listen(port, () => {
  console.log(`Astoria LOADED on port : ${port}`)
  if (!isProd) {
    // handle for open
    debug(`server open on: http://127.0.0.1:${port}`)
  }
})
