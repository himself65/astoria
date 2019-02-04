import * as Router from 'koa-router'
import { debug } from './'
import requireContents from './utils/requireContents'
import { resolve } from 'path'
import * as config from '../config.js'

const { api } = config
const postPath = resolve(__dirname, './statics', 'posts')
const controllers = [] // fixme
const router = new Router()

export const posts = requireContents(postPath)

// sync register controller
for (const key in controllers) {
  if (controllers.hasOwnProperty(key)) {
    const controller = controllers[key]
    const name = controller.name
    const methods = controller.methods
    for (const methodName in methods) {
      if (methods.hasOwnProperty(methodName)) {
        if (methods[methodName] === null || methods[methodName] === undefined) {
          debug(`Got a nullable method on ${controller.name}.`)
          continue
        }
        const url = `${api.base}/${name}`
        router[methodName](url, methods[methodName])
        debug(`register ${methodName} ${url}`)
      }
    }
  }
}

export default router
