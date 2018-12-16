import { Article } from '../models/article'
import { JsonController, Get, Post, Param, Body, Put } from 'routing-controllers'

@JsonController()
export class ArticleController {
  private name = 'article'

  @Get('/articles')
  async getAll () {
    return Article.find((err, docs) => {
      if (err) throw err
      return docs
    })
  }

  @Get('/articles/:id')
  async getOne (@Param('id') id: number) {
    return Article.find(id, (err, docs) => {
      if (err) throw err
      return docs
    })
  }

  @Post('/articles')
  async Post (@Body() article: JSON) {
    return Article.create(article, (err, docs) => {
      if (err) throw err
      return {
        ...docs,
        message: 'create success.'
      }
    })
  }

  @Put('/articles/:id')
  async EditOne (@Param('id') id: number, @Body() article: JSON) {
    return Article.findByIdAndUpdate(id, {}, {}, (err, docs) => {
      if (err) throw err
      return {
        ...docs,
        message: 'edit success.'
      }
    })
  }
}
