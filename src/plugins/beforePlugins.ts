import * as koaBody from 'koa-body'

export const plugin = {
  name: 'BeforePlugins',
  priority: Number.MIN_VALUE,
  register: (app) => {
    app.use(koaBody())
  }
}
