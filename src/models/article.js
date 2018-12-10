import mongoose from '../utils/database'

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

// todo
const Article = new Schema({
  id: ObjectId,
  author: String,
  title: String,
  body: String,
  date: Date
})

export default Article
