import { BaseController, Context, del, get, json, post, prefix } from 'daruk'
import { debug } from '../'
import { ArticleModel } from '../models'
import { UserPermission } from '../utils/shared'

@prefix('/api')
export default class Article extends BaseController {
  @post('')
  async postArticle (ctx: Context) {
    const { content, title, _id } = ctx.request.body
    const { username } = ctx.user
    debug(username, ctx.path, ctx.request.body)
    if (content && title && username) {
      if (_id) {
        await ArticleModel.findById(_id).then(async (doc) => {
          debug(doc)
          if (!doc) {
            ctx.response.status = 404
          } else {
            if (doc.author === ctx.user.username ||
              ctx.user.level !== UserPermission.default) {
              await ArticleModel.findByIdAndUpdate(_id, { content, title })
            }
            ctx.response.status = 200
          }
        })
      } else {
        await ArticleModel.create({
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
  }

  @get('')
  @json()
  async getArticle (ctx: Context) {
    const { _id } = ctx.request.query
    if (_id) {
      return ArticleModel.findById(_id).select('title author content').then(res => {
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
      return {
        error: `${_id} cannot find`
      }
    }
  }

  @del('')
  async deleteArticle (ctx) {
    const { _id } = ctx.request.query
    if (_id && ctx.user.level !== UserPermission.default) {
      await ArticleModel.findByIdAndDelete(_id).then(res => {
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
  }
}
