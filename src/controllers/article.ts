import { Article } from '../models/article'
import { JsonController, Get, Post, Param, Body, Put, QueryParams } from 'routing-controllers'

@JsonController()
export class ArticleController {

  @Get('/articles')
  getAll () {
    return Article.find().select('author title content').lean(true)
  }

  @Get('/articles/:id')
  getOne (@Param('id') id: number) {
    return Article.findById(id).select('author title content').lean(true)
  }

  @Post('/articles')
  Post (@Body() article: JSON) {
    return Article.create(article, (err, docs) => {
      if (err) throw err
      return {
        ...docs,
        message: 'create success.'
      }
    })
  }

  @Put('/articles/:id')
  EditOne (@Param('id') id: number, @QueryParams() article) {
    const { author, title, content } = article
    return Article.findByIdAndUpdate(id, {
      author: author,
      title: title,
      content: content
    }, {}, (err, docs) => {
      if (err) throw err
      return {
        ...docs,
        message: 'edit success.'
      }
    })
  }
}
