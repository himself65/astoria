import { Context } from 'koa'
import { apiUrl, appName } from '../../config.json'

export default function requestQuery (conf = {}) {
  return async (ctx: Context, next: Function) => {
    if (ctx.headers[`x-${appName}-type`] === 'content-only' && !ctx.url.startsWith(apiUrl)) {
      ctx.url = `/api${ctx.url}`
    }
    return next()
  }
}
