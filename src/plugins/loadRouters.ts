import { readdirSync } from 'fs'
import * as KoaRouter from 'koa-router'
import { resolve } from 'path'
import { debug } from '../index'
import registerExample from '../utils/registerExample'

export const routersDir = resolve(__dirname, '../', 'routers')

export const plugin = {
  name: 'LoadRouters',
  priority: 2,
  register: (app, config) => {
    const { isProd } = config
    readdirSync(routersDir).forEach(file => {
      const router = require(resolve(routersDir, file)).default as KoaRouter
      app.use(router.routes())
      app.use(router.allowedMethods())
    })
    if (!isProd) {
      const devRouter = registerExample()
      app.use(devRouter.routes())
      app.use(devRouter.allowedMethods())
      debug('dev model loaded')
    }
  }
}
