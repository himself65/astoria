import { Get, JsonController, QueryParams } from 'routing-controllers'
import { Talk } from '../models/talk'

const pageLimit = 10

@JsonController()
export default class TalkController {
  @Get('/talks')
  async getAll (@QueryParams() query) {
    const { page = 0 } = query
    return Talk.find()
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
