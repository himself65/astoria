import * as Koa from 'koa'
import * as server from 'koa-static'
import historyApiFallback from './middleware/connect-history-api-fallback'
import * as logger from 'koa-logger'
import apiRouter from './router'
import 'koa-jwt'
import * as path from 'path'

// plugin
import { connectDB } from './utils/database'

// local config
import * as config from '../config.json'

const {
  distPath,
  port
} = config

const app = new Koa()  // Singleton

const astoria = {
  async run () {
    app.use(historyApiFallback({
      whiteList: ['/api']
    }))
    app.use(server(path.resolve(distPath)))
    app.use(logger())
    app.use(apiRouter.routes())
      .use(apiRouter.allowedMethods())
    await connectDB()

    app.listen(port, () => {
      console.log(`Astoria LOADED on port : ${port}`)
    })
  }
}

astoria.run()
