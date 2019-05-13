import { BaseController, Context, get,json } from 'daruk'
import { TalkModel } from '../models/talk'

const pageLimit = 10

export default class Talk extends BaseController {

  @get('/talks')
  @json()
  async getAll (ctx: Context) {
    const { page = 0 } = ctx.query
    return TalkModel.find()
      .skip(page * pageLimit)
      .limit(pageLimit)
      .lean(true)
      .then(res => {
        return {
          data: res
        }
      })
  }
}
