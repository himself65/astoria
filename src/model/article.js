import mongoose from '../utils/database'

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

// todo
const Article = new Schema({
  author: ObjectId,
  title: String,
  body: String,
  date: Date
})

export default Article
