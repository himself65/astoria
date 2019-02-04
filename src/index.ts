import 'reflect-metadata'
import * as Koa from 'koa'
import * as server from 'koa-static'
import * as koaBody from 'koa-body'
// import * as passport from 'koa-passport'
import * as koaSession from 'koa-session'
import * as cors from '@koa/cors'
import * as logger from 'koa-logger'
import { useKoaServer } from 'routing-controllers'
import historyApiFallback from 'koa2-connect-history-api-fallback'
import userAccess from './utils/userAccess'
import * as path from 'path'

// controllers
import requireControllers from './utils/requireControllers'
import router from './router'

// plugin
import { connectDB } from './utils/database'

export const debug = require('debug')('astoria')

const app = new Koa()  // Singleton

interface IAstoria {
  run (conf): Promise<void>
}

export const astoria: IAstoria = {
  async run (conf) {
    const {
      appName, isProd, staticPath,
      appPath, port, api
    } = conf
    debug(`${isProd ? '生产' : '开发'}版本加载中...`)
    debug(`静态文件根目录：${staticPath}`)
    // Load middleware
    // todo
    // app.use(jwt({
    //   secret: privateConfig.secret
    // }))

    app.use(userAccess({
      apiPrefix: '/api/login'
    }))
    useKoaServer(app, {
      routePrefix: api.base,
      controllers: requireControllers(appPath.controllers)
    })
    debug('/api views register success!')
    app.use(router.routes())
    app.use(router.allowedMethods())
    app.use(koaBody())

    // koa-session
    app.keys = ['secret']
    app.use(koaSession({}, app))

    // todo
    // // passport
    // app.use(passport.initialize())
    // app.use(passport.session())

    app.use(cors({ origin: `localhost:${port}` }))
    app.use(historyApiFallback({
      whiteList: ['/api']
    }))
    app.use(server(path.resolve(staticPath), { defer: true }))  // waiting after others loaded
    app.use(logger())
    await connectDB()
    app.listen(port, () => {
      debug(`Astoria LOADED on port : ${port}`)
      if (!isProd) {
        // handle for open
        console.log(`server open on: http://127.0.0.1:${port}`)
      }
    })
  }
}

export default astoria
