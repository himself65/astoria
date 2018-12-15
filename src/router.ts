import * as Router from 'koa-router'
import * as controllers from './controllers'
import * as config from '../config.json'

const router = new Router()
const { apiUrl } = config

for (const key in controllers) {
  if (controllers.hasOwnProperty(key)) {
    const controller = controllers[key]
    const name = controller.name
    const methods = controller.methods
    for (const methodName in methods) {
      if (methods.hasOwnProperty(methodName)) {
        if (methods[methodName] === null || methods[methodName] === undefined) {
          console.error(`Got a nullable method on ${controller.name}.`)
          continue
        }
        const url = `${apiUrl}/${name}`
        router[methodName](url, methods[methodName])
        console.log(`register ${methodName} ${url}`)
      }
    }
  }
}

export default router
