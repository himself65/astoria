import { Middleware } from 'koa'
import { User } from '../models/user'
import { debug } from '../'
import { UserPermission } from './shared'

export const regex = /^\/?[^.]+$/

interface IUserAccess {
  whiteList?: string[]
  blackList?: string[]
  apiPrefix?: string
}

export function userAccess ({ whiteList: wl, blackList: bl, apiPrefix = '/api' }: IUserAccess): Middleware {
  const whiteList = wl || []
  const blackList = bl || ['']
  return async function (ctx, next) {
    const to = ctx.request.url
    if (regex.test(to)
      && whiteList.every(t => RegExp(t).test(to) === null)
      && blackList.some(t => RegExp(t).test(to) !== null)) {
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
