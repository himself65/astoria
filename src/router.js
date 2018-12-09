import Router from 'koa-router'
import controllers from './controllers'

const router = new Router()

function register () {
  for (const key in controllers) {
    const controller = controllers[key]
    router.get(`/api/${key}`, controller)
  }
  console.log('Register api router success!')
}

register()
export default router
