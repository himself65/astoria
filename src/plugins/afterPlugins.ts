import historyApiFallback from 'koa2-connect-history-api-fallback'
import * as logger from 'koa-logger'
import * as server from 'koa-static'
import * as path from 'path'
import { connectDB } from '../utils/database'
import { useKoaServer } from 'routing-controllers'
import requireControllers from '../utils/requireControllers'
import { debug } from '../index'

export const plugin = {
  name: 'AfterPlugin',
  priority: Number.MAX_VALUE,
  register: async (app, config) => {
    const { staticPath, appPath, api, port, isProd } = config._global
    app.use(historyApiFallback({
      whiteList: ['/api', '/dev']
    }))
    app.use(server(path.resolve(staticPath), { defer: true }))  // waiting after others loaded
    app.use(logger())
    await connectDB()
    useKoaServer(app, {
      routePrefix: api.base,
      controllers: requireControllers(appPath.controllers)
    })
    app.listen(port, () => {
      console.log(`Astoria LOADED on port : ${port}`)
      if (!isProd) {
        // handle for open
        debug(`server open on: http://127.0.0.1:${port}`)
      }
    })
  }
}
