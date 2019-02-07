import { isObject } from 'lodash'
import * as Koa from 'koa'
import { debug } from '../index'
import { UserPermission } from '../utils/shared'
import { User } from '../models/user'

export const regex = /^\/?[^.]+$/

export const regexToken = /[\S]+(?=-)/
export const regexTimeout = /(?<=-)[1-9]+/

export const plugin = {
  name: 'UserAccess',
  priority: 1,
  register: (app: Koa, config) => {
    app.use(async (ctx, next) => {
      const whiteList = config.whiteList || []
      const to = ctx.request.url
      const matched = regex.test(to)
      const white = whiteList.every(t => RegExp(t).test(to) === false)
      if (matched) debug('matched', to)
      if (matched && white) debug('whited', to)
      if (matched && white) {
        const authorization = ctx.request.headers['authorization'] || ''
        let token = ''
        let time = 0
        if (regexToken.test(authorization)) {
          token = regexToken.exec(authorization)[0]
        }
        if (regexTimeout.test(authorization)) {
          time = parseInt(regexTimeout.exec(ctx.request.headers['authorization'])[0], 10)
        }
        debug(`matched path: ${to}`, `token: ${token}, timeout: ${time}`)
        if (Date.parse(Date.toString()) < time) {
          // timeout
          ctx.user = {
            level: UserPermission.default
          }
        } else if (token) {
          await User.findOne({
            password: token
          }).lean(true)
            .then(res => {
              if (isObject(res) && res.token === token) {
                ctx.user = {
                  token: token,
                  level: res.level
                }
                debug(res.username, 'have access:', UserPermission[res.level])
              } else {
                ctx.user = {
                  level: UserPermission.default
                }
              }
            })
        }
      }
      await next()
    })
  }
}
