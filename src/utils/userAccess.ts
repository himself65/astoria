import { isObject } from 'lodash'
import { Middleware } from 'koa'
import { User } from '../models/user'
import { debug } from '../'
import { UserPermission } from './shared'

export const regex = /^\/?[^.]+$/

export const regexToken = /[\S]+(?=-)/
export const regexTimeout = /(?<=-)[1-9]+/

interface IUserAccess {
  whiteList?: (string | RegExp)[]
}

export function userAccess ({ whiteList: wl }: IUserAccess): Middleware {
  const whiteList = wl || []
  return async function (ctx, next) {
    const to = ctx.request.url
    const matched = regex.test(to)
    const white = whiteList.every(t => RegExp(t).test(to) === false)
    if (matched) debug('matched', to)
    if (white) debug('whited', to)
    if (matched && white) {
      const token = regexToken.exec(ctx.request.headers['authorization'])[0]
      const time = parseInt(regexTimeout.exec(ctx.request.headers['authorization'])[0], 10)
      debug(`matched path: ${to}`, `token: ${token || 'none'}`)
      if (Date.parse(Date.toString()) < time) {
        // timeout
        ctx.userLevel = UserPermission.default
      } else if (token) {
        await User.findOne({
          password: token
        }).lean(true)
          .then(res => {
            if (isObject(res) && res.token === token) {
              ctx.userLevel = res.level
              debug(res.username, 'have access:', UserPermission[res.level])
            } else {
              ctx.userLevel = UserPermission.default
            }
          })
      }
    }
    await next()
  }
}

export default userAccess
