import Koa from 'koa'
import server from 'koa-static'
import historyApiFallback from 'koa2-connect-history-api-fallback'
import logger from 'koa-logger'
import apiRouter from './router'
import 'koa-jwt'
import path from 'path'

// plugin
import { connect_db } from './utils/database'

// local config
import config from '../config.example'

const {
  distPath,
  port
} = config

const app = new Koa()  // Singleton

const astoria = {
  async run () {
    app.use(historyApiFallback({ whiteList: ['/api'] }))
    app.use(server(path.resolve(distPath)))
    app.use(logger())
    app.use(apiRouter.routes())
      .use(apiRouter.allowedMethods())
    global.app = app
    global.db = connect_db()

    app.listen(port, () => {
      console.log(`Astoria LOADED on port : ${port}`)
    })
  }
}

astoria.run()
