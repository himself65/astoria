import Koa from 'koa'
import server from 'koa-static'
import historyApiFallback from 'koa2-connect-history-api-fallback'
import path from 'path'

// local config
import config from '../config.example'

const {
  distPath = 'dist',
  port
} = config

const app = new Koa()  // Singleton

const astoria = {
  async run () {
    app.use(historyApiFallback)
    app.use(server(path.resolve(distPath)))

    app.listen(port, () => {
      console.log(`Astoria LOADED on port : ${port}`)
    })
  }
}

astoria.run()
