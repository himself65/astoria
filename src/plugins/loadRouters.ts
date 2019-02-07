import * as KoaRouter from 'koa-router'
import { resolve } from 'path'
import { readdirSync } from 'fs'

export const routersDir = resolve(__dirname, '../', 'routers')

export const plugin = {
  name: 'LoadRouters',
  priority: 2,
  register: (app) => {
    readdirSync(routersDir).forEach(file => {
      const router = require(resolve(routersDir, file)).default as KoaRouter
      app.use(router.routes())
      app.use(router.allowedMethods())
    })
  }
}
