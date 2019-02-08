import * as KoaRouter from 'koa-router'
import { debug } from '../'
import { Article } from '../models/article'
import { UserPermission } from '../utils/shared'

export const router = new KoaRouter({ prefix: '/api' })

router.post('/article', async (ctx) => {
  const { content, title, _id } = ctx.request.body
  const { username } = ctx.user
  debug(username, ctx.path, ctx.request.body)
  if (content && title && username) {
    if (_id) {
      await Article.findById(_id).then(async (doc) => {
        debug(doc)
        if (!doc) {
          ctx.response.status = 404
        } else {
          if (doc.author === ctx.user.username ||
            ctx.user.level !== UserPermission.default) {
            await Article.findByIdAndUpdate(_id, { content, title })
          }
          ctx.response.status = 200
        }
      })
    } else {
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
    }
  } else {
    ctx.response.status = 400
  }
})

router.get('/article', async (ctx) => {
  const { _id } = ctx.request.query
  if (_id) {
    await Article.findById(_id).select('title author content').then(res => {
      if (!res) {
        ctx.response.status = 404
      } else {
        ctx.response.body = {
          data: res
        }
      }
    })
  } else {
    ctx.response.status = 404
  }
})

router.delete('/article', async (ctx) => {
  const { _id } = ctx.request.query
  if (_id && ctx.user.level !== UserPermission.default) {
    await Article.findByIdAndDelete(_id).then(res => {
      if (!res) {
        ctx.response.status = 404
      } else {
        ctx.response.body = {
          message: 'success'
        }
      }
    })
  } else {
    ctx.response.status = 400
  }
})

export const pageLimit = 5

router.get('/articles', async (ctx) => {
  const { page = 0 } = ctx.request.query
  await Article.find()
    .sort('-createdDate')
    .skip(page * pageLimit)
    .limit(pageLimit)
    .lean(true)
    .select('author title content createdDate')
    .then(res => {
      ctx.response.body = {
        data: res
      }
    })
})

export default router
