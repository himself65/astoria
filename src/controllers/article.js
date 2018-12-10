import Article from '../models/article'
import { handleError } from '../utils'

export default {
  name: 'article',
  method: {
    get: handleError(async ctx => {
      const { author } = ctx.request.query
      // todo
      ctx.response.body = 'todo'
    }),
    put: async ctx => {
      const { author, title, body } = ctx.request.query
      Article.create({
        author: author,
        title: title,
        body: body
      }, (err, doc) => {
        if (err) throw err
        ctx.body = 'success!'
      })
    }
  }
}
