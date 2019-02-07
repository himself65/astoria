import * as KoaRouter from 'koa-router'
import { debug } from '../'
import { Article } from '../models/article'

export const router = new KoaRouter({ prefix: '/api' })

router.post('/article', async (ctx) => {
  const { content, title } = ctx.request.body
  const { username } = ctx.user
  debug(username, ctx.path, ctx.request.body)
  if (content && title && username) {
    await Article.create({
      author: username,
      content,
      title
    }).then(res => {
      if (res) {
        ctx.response.status = 200
      } else {
        ctx.response.status = 400
      }
    })
  } else {
    ctx.response.status = 400
  }
})

export default router
