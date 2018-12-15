import mongoose from '../utils/database'

const Schema = mongoose.Schema

export const ArticleSchema = new Schema({
  author: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true }
})

export const Article = mongoose.model('Article', ArticleSchema)
