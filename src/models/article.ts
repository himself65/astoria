import mongoose from '../utils/database'
import { Document } from 'mongoose'

const Schema = mongoose.Schema

export const ArticleSchema = new Schema({
  author: { type: String, ref: 'author' },
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdDate: { type: Date, default: () => Date() }
})

export interface IArticle extends Document {
  author: string
  title: string
  content: string
  createdDate: Date
}

export const Article = mongoose.model<IArticle>('Article', ArticleSchema)

export async function create () {
  await Article.create({
    author: 'himself65',
    title: 'test',
    content: 'none'
  })
}
