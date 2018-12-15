import { Article } from '../models/article'
import { handleAPI } from '../utils'

const name = 'article'

// fixme: refac this handle
export default {
  name: name,
  methods: {
    get: handleAPI(async query => {
      const { id } = query
      return Article.findById(id, (err, docs) => {
        if (err) console.error(err)
        return docs
      })
    }),
    post: handleAPI(async query => {
      const { author, title, content } = query
      return Article.create({
        author: author,
        title: title,
        content: content
      }, (err, docs) => {
        if (err) console.error(err.message)
        return 'update success.'
      })
    }),
    put: handleAPI(async query => {
      const { id, author, title, content } = query
      return Article.findByIdAndUpdate(id, {
        author: author,
        title: title,
        content: content
      }, {}, (err, docs) => {
        if (err) console.error(err.message)
        return 'create success'
      })
    })
  }
}
