import Koa from 'koa'
import server from 'koa-static'
import historyApiFallback from 'koa2-connect-history-api-fallback'
import 'koa-jwt'
import path from 'path'

// plugin
import { connect_db } from './utils/database'

// local config
import config from '../config.example'

const {
  distPath = 'dist',
  port
} = config

const app = new Koa()  // Singleton

const astoria = {
  async run () {
    app.use(historyApiFallback({ whiteList: ['/api'] }))
    app.use(server(path.resolve(distPath)))
    await connect_db()

    app.listen(port, () => {
      console.log(`Astoria LOADED on port : ${port}`)
    })
  }
}

astoria.run()
