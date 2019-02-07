import * as koaBody from 'koa-body'

export const plugin = {
  name: 'BeforePlugins',
  priority: 1,
  register: (app) => {
    app.use(koaBody())
  }
}
