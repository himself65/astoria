import { Middleware } from 'koa'
import { User } from '../models/user'
import { debug } from '../'
import { UserPermission } from './shared'

export const regex = /^\/?[^.]+$/

interface IUserAccess {
  whiteList?: (string | RegExp)[]
  blackList?: (string | RegExp)[]
  apiPrefix?: string
}

export function userAccess ({ whiteList: wl, blackList: bl, apiPrefix = '/api' }: IUserAccess): Middleware {
  const whiteList = wl || []
  const blackList = bl || ['']
  return async function (ctx, next) {
    const to = ctx.request.url
    const matched = regex.test(to)
    const white = whiteList.every(t => RegExp(t).test(to) === false)
    const black = blackList.some(t => RegExp(t).test(to) !== false)
    if (matched) debug('matched', to)
    if (white) debug('whited', to)
    if (black) debug('blacked', to)
    if (matched && white && black) {
      // todo: check if there have permission
      const token = ctx.request.headers['Authorization']
      debug(`matched path: ${to}`, `token: ${token || 'none'}`)
      if (token) {
        await User.findOne({ token }).lean(true).then(res => {
          console.log(res)
        })
      }
    }
    await next()
  }
}

export default userAccess
