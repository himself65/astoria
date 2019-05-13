import { Context, Daruk } from 'daruk'
import is = require('is')
import { debug } from '../index'
import { IUser, UserModel } from '../models/user'
import { regex, regexTimeout, regexToken } from '../plugins/userAccess'
import { UserPermission } from '../utils/shared'

export default function (daruk: Daruk) {
  return async function (ctx: Context, next: Function) {
    // @ts-ignore
    const whiteList = daruk.config.whiteList || []
    const to = ctx.request.url
    const matched = regex.test(to)
    const white = whiteList.every(t => RegExp(t).test(to) === false)
    if (matched) debug('matched', to)
    if (matched && white) debug('whited', to)
    if (matched && white) {
      const authorization = ctx.cookies.get('token')
      let token = ''
      let time = 0
      if (regexToken.test(authorization)) {
        token = regexToken.exec(authorization)[0]
      }
      if (regexTimeout.test(authorization)) {
        time = parseInt(regexTimeout.exec(authorization)[0], 10)
      }
      debug(`matched path: ${to}`, `token: ${token}, timeout: ${time}`)
      if (Date.parse(Date.toString()) < time || !token) {
        // timeout
        ctx.cookies.set('token', '')
        ctx.user = {
          username: null,
          level: UserPermission.default
        }
      } else if (token) {
        await UserModel.findOne({
          password: token
        }).lean(true)
          .then((res: IUser) => {
            if (is.object(res) && res.password === token) {
              ctx.user = {
                username: res.username,
                level: res.level
              }
              debug(res.username, 'have access:', UserPermission[res.level])
            } else {
              ctx.user = {
                username: null,
                level: UserPermission.default
              }
            }
          })
      }
    }
    await next()
  }
}
