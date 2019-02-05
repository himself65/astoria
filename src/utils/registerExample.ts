import * as Router from 'koa-router'
import { regex } from './requireContents'
import { debug } from '../'
import { readdirSync } from 'fs'
import { resolve } from 'path'

const router = new Router()

const modelsPath = resolve(__dirname, '../', 'models')
debug('dir models path:', modelsPath)

const files = readdirSync(modelsPath)
files.map(file => {
  const path = resolve(modelsPath, file.toString())
  const fn = require(path).create
  return { name: regex.exec(file.toString())[0], create: fn }
}).forEach(item => {
  if (!item.create) return
  debug(`register route /dev/${item.name}`)
  router.post(`/dev/${item.name}`, async (ctx) => {
    const { create = false } = ctx.request.query
    if (create) {
      await item.create(ctx.request.query)
    }
    ctx.response.body = {
      created: create.toString()
    }
  })
})

export {
  router
}
export default router
