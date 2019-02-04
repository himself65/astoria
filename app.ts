import { resolve } from 'path'
import { astoria } from './src'
import * as config from './config.js'

const {
  filePath: {
    distPath
  }
} = config

// hack
export const isProd = process.env.NODE_ENV === 'production'
export const staticPath = isProd ? distPath : resolve(__dirname, '../', 'himself65', 'dist')

astoria.run({
  ...config,
  isProd: isProd,
  staticPath: staticPath
})
