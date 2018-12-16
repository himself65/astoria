import 'reflect-metadata'
import * as Koa from 'koa'
import * as server from 'koa-static'
import historyApiFallback from './middleware/connect-history-api-fallback'
import * as cors from 'koa-cors'
import * as logger from 'koa-logger'
import { useKoaServer } from 'routing-controllers'
import * as path from 'path'

// controller
import { ArticleController } from './controllers/article'
import { CheckinController } from './controllers/checkin'

// plugin
import { connectDB } from './utils/database'

// local config
import * as config from '../config.json'

let {
  distPath,
  port
} = config

// hack
distPath = process.env.NODE_ENV === 'development' ? '../dist' : distPath

const app = new Koa()  // Singleton

const astoria = {
  async run () {
    useKoaServer(app, {
      routePrefix: '/api',
      controllers: [ArticleController, CheckinController]
    })
    app.use(cors({ origin: 'localhost:3000' }))
    app.use(historyApiFallback({
      whiteList: ['/api']
    }))
    app.use(server(path.resolve(distPath)))
    app.use(logger())
    await connectDB()

    app.listen(port, () => {
      console.log(`Astoria LOADED on port : ${port}`)
    })
  }
}

astoria.run()
