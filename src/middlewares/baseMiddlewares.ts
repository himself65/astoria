import { Context, Daruk } from 'daruk'
import * as logger from 'koa-logger'
import * as server from 'koa-static'
import historyApiFallback from 'koa2-connect-history-api-fallback'
import * as path from 'path'
import { connectDB } from '../utils/database'

export default function (daruk: Daruk) {
  return async function (ctx: Context, next: () => Promise<any>) {
    historyApiFallback({
      whiteList: ['/api', '/dev']
    })(ctx, next)
    // fixme
    // @ts-ignore
    server(path.resolve(daruk.config.staticPath), { defer: true })(ctx, next)
    logger()(ctx, next)
    await connectDB()
  }
}
