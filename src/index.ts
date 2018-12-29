import 'reflect-metadata'
import * as Koa from 'koa'
import * as server from 'koa-static'
import * as cors from '@koa/cors'
import * as logger from 'koa-logger'
import { useKoaServer } from 'routing-controllers'
import * as path from 'path'

// controllers
import { Controllers } from './controllers'

// plugin
import { connectDB } from './utils/database'

// local config
import * as config from '../config.json'
import historyApiFallback from './middleware/connect-history-api-fallback'
import requestQuery from './middleware/requestQuery'

const {
  distPath,
  port
} = config

// hack
const isProd = process.env.NODE_ENV === 'production'
const staticPath = isProd ? distPath : 'dist/dist'

const app = new Koa()  // Singleton

const astoria = {
  async run () {
    console.log(`${isProd ? '生产' : '开发'}版本加载中...`)
    console.log(`静态文件根目录：${staticPath}`)
    // Load middleware
    app.use(requestQuery())
    useKoaServer(app, {
      routePrefix: '/api',
      controllers: Controllers
    })
    console.log('/api views register success!')
    app.use(cors({ origin: `localhost:${port}` }))
    app.use(historyApiFallback({
      whiteList: ['/api']
    }))
    app.use(server(path.resolve(staticPath), { defer: true }))  // waiting after others loaded
    app.use(logger())
    await connectDB()
    app.listen(port, () => {
      console.log(`Astoria LOADED on port : ${port}`)
    })
  }
}

astoria.run()
