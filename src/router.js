import Router from 'koa-router'
import controllers from './controllers'
import config from '../config.example'

const router = new Router()
const { apiUrl } = config

for (const key in controllers) {
  const controller = controllers[key]
  const name = controller.name
  const methods = controller.method
  for (const methodName in methods) {
    if (methods[methodName] === null || methods[methodName] === undefined) {
      console.error(`Got a nullable method on ${controller.name}.`)
      continue
    }
    const url = `${apiUrl}/${name}`
    router[methodName](url, methods[methodName])
    console.log(`register ${methodName} ${url}`)
  }
}

export default router
