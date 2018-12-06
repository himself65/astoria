import Koa from 'koa'

// local config
import config from '../config.example'

const { port } = config

const app = new Koa()  // Singleton

const astoria = {
  async run () {

    app.use(ctx => {
      ctx.body = 'This project have\'t finished.'
    })

    app.listen(port, () => {
      console.log(`Astoria LOADED on port : ${port}`)
    })
  }
}

astoria.run()
