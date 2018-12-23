import axios from 'axios'
import { Context } from 'koa'
import { appName, apiUrl } from '../../config.json'

export default function requestQuery () {
  return async (ctx: Context, next: Function) => {
    await next()
    if (ctx.is(`X-${appName}-Type`, 'json-only') && !ctx.originalUrl.startsWith(apiUrl)) {
      const fixedJsonUrl = `/api${ctx.originalUrl}`
      const data = await axios.get(fixedJsonUrl, ctx.request.query)
      ctx.body = data
    }
  }
}
