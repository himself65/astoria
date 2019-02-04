import { Middleware } from 'koa'
import { debug } from '../'
import { UserPermission } from './shared'

export const regex = /^\/?[^.]+$/

interface IUserAccess {
  whiteList?: string[]
  apiPrefix?: string
}

export function userAccess ({ whiteList = [], apiPrefix }: IUserAccess): Middleware {
  return async function (ctx, next) {
    const to = ctx.request.url
    if (regex.test(to) &&
      (whiteList && whiteList.some(t => t.match(to) !== null))) {
      // todo: check if there have permission
      const token = ctx.request.headers['Authorization']
      debug(to, token)
    }
    await next()
  }
}

export default userAccess
