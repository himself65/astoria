import { BaseController, Context, get, prefix } from 'daruk'
import { ArticleModel } from '../models'

@prefix('/api')
export default class Articles extends BaseController {
  private pageLimit = 5

  @get('')
  async getArticles (ctx: Context) {
    const { page = 0 } = ctx.request.query
    const total = await ArticleModel.countDocuments({})
    await ArticleModel.find()
      .sort('-createdDate')
      .skip(page * this.pageLimit)
      .limit(this.pageLimit)
      .lean(true)
      .select('author title content createdDate')
      .then(res => {
        ctx.response.body = {
          data: res,
          total
        }
      })
  }
}
