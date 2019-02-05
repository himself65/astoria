import mongoose from '../utils/database'

const Schema = mongoose.Schema

export const ArticleSchema = new Schema({
  id: { type: Number, index: true },
  author: { type: mongoose.Types.ObjectId, ref: 'author' },
  title: { type: String, required: true },
  content: { type: String, required: true }
})

export const Article = mongoose.model('Article', ArticleSchema)
