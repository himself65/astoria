import * as koaBody from 'koa-body'
import { debug } from '../index'

export const plugin = {
  name: 'BeforePlugins',
  priority: Number.MIN_VALUE,
  register: (app, config) => {
    const { isProd } = config
    debug(`${isProd ? '生产' : '开发'}版本加载中...`)
    app.use(koaBody())
  }
}
