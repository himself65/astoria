import Astoria from './'

const { port } = require('./config')

const path = require('path')
const debug = require('debug')('astoria')

const astoria = new Astoria('astoria', {
  rootPath: path.resolve(__dirname, './src'),
  debug: process.env.NODE_ENV === 'dev'
})

astoria.listen(port, () => {
  //
})
