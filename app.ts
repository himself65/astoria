import { astoria } from './src'
import * as config from './config.json'

const {
  distPath
} = config

// hack
export const isProd = process.env.NODE_ENV === 'production'
export const staticPath = isProd ? distPath : 'dist/dist'

console.log(staticPath)

astoria.run({
  ...config,
  isProd: isProd,
  staticPath: staticPath
})
