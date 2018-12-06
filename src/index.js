import Koa from 'koa'
import config from '../config.example'

const { port } = config

const app = new Koa()

app.use(async ctx => {
  ctx.body = 'hello, world'
})

app.listen(port, () => {
  console.log('success')
})

