import mongoose from '../utils/database'

const Schema = mongoose.Schema

export const ArticleSchema = new Schema({
  author: { type: String, ref: 'author' },
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdDate: { type: Date, default: () => Date() }
})

export async function create () {
  await Article.create({
    author: 'himself65',
    title: 'test',
    content: 'none'
  })
}

export const Article = mongoose.model('Article', ArticleSchema)
