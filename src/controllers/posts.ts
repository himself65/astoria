import { JsonController, Get, Param } from 'routing-controllers'
import { postsPath as ph } from '../../config.json'

const isProd = process.env.NODE_ENV === 'production'
const postsPath = isProd ? ph : 'dist/dist/_posts'

@JsonController()
export class PostsController {

  @Get('/posts')
  async getAll () {
    // todo
  }

  @Get('/posts/:id')
  async getByID (@Param('id') id: string) {
    // todo
  }
}
