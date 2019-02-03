import { JsonController, Get, Param, Res } from 'routing-controllers'
import { postsPath as ph } from '../../config.js'
import * as fsReadFilePromise from 'fs-readfile-promise'

const isProd = process.env.NODE_ENV === 'production'
const postsPath = isProd ? ph : 'dist/dist/_posts'

@JsonController()
export default class PostsController {

  @Get('/posts')
  async getAll (@Res() res) {
    res.statusCode = 404
  }

  @Get('/posts/:id')
  async getByID (@Param('id') id: string, @Res() res) {
    try {
      await fsReadFilePromise(`${postsPath}/id`).then(res => {
        console.log(res)
      })
    } catch {
      res.statusCode = 404
    }
  }
}
