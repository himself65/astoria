import * as KoaRouter from 'koa-router'
import { debug } from '../'
import { Article } from '../models/article'

export const router = new KoaRouter({ prefix: '/api' })

router.post('/article', async (ctx) => {
  debug('/api/article', ctx.request.body)
  const { content = null, title = null } = ctx.request.body
  const { name: username = null } = ctx.user
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
