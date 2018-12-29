import { Context } from 'koa'
import { apiUrl, appName } from '../../config.json'

export default function requestQuery () {
  return async (ctx: Context, next: Function) => {
    await next()
    if (ctx.is(`X-${appName}-Type`, 'content-only') && !ctx.originalUrl.startsWith(apiUrl)) {
      ctx.originalUrl = `/api${ctx.originalUrl}`
    }
  }
}
