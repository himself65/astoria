import 'reflect-metadata'
// @ts-ignore
import db from 'debug'

export const debug = db('astoria')
import * as Koa from 'koa'

import router from './router'
import registerExample from './utils/registerExample'

// plugin
import { connectDB } from './utils/database'
import { loadPlugins } from './loadPlugins'

const app = new Koa()  // Singleton

interface IAstoria {
  run (conf): Promise<void>
}

export const astoria: IAstoria = {
  async run (conf) {
    const {
      isProd, staticPath, port
    } = conf
    debug(`${isProd ? '生产' : '开发'}版本加载中...`)
    debug(`静态文件根目录：${staticPath}`)
    loadPlugins(app)
    debug('/api views register success!')
    app.use(router.routes())
    app.use(router.allowedMethods())
    if (!isProd) {
      const devRouter = registerExample()
      app.use(devRouter.routes())
      app.use(devRouter.allowedMethods())
      debug('dev model loaded')
    }
    app.listen(port, () => {
      console.log(`Astoria LOADED on port : ${port}`)
      if (!isProd) {
        // handle for open
        debug(`server open on: http://127.0.0.1:${port}`)
      }
    })
  }
}

export default astoria
