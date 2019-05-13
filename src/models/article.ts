import { Document } from 'mongoose'
import mongoose from '../utils/database'

const Schema = mongoose.Schema

export const ArticleSchema = new Schema({
  author: { type: String, ref: 'author' },
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdDate: { type: Date, default: () => new Date().toUTCString() }
})

export interface IArticle extends Document {
  author: string
  title: string
  content: string
  createdDate: Date
}

export const ArticleModel = mongoose.model<IArticle>('ArticleModel', ArticleSchema)

export async function create () {
  await ArticleModel.create({
    author: 'himself65',
    title: 'test',
    content: 'none'
  })
}
