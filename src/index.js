import Koa from 'koa'
import server from 'koa-static'
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
    app.use(server(path.resolve(distPath)))
    app.use(ctx => {
      ctx.body = 'This project have\'t finished.'
    })

    app.listen(port, () => {
      console.log(`Astoria LOADED on port : ${port}`)
    })
  }
}

astoria.run()
