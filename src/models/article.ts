import mongoose from '../utils/database'
import { Document } from 'mongoose'

export const ArticleSchema = new mongoose.Schema({
  author: { type: String, ref: 'author' },
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdDate: { type: Date }
})

interface IUserDocument extends Document {
  createdDate: Date
}

ArticleSchema.pre<IUserDocument>('save', function (next) {
  if (this.isNew) {
    this.createdDate = new Date()
  }
  next()
})

export async function create () {
  await Article.create({
    author: 'himself65',
    title: 'test',
    content: 'none'
  })
}

export const Article = mongoose.model('Article', ArticleSchema)
