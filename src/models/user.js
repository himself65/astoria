import mongoose from '../utils/database'

const Schema = mongoose.Schema

export const UserSchema = new Schema({
  id: { type: Number, index: true },
  username: { type: String, required: true },
  nickname: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }
})

export const User = mongoose.model('Article', UserSchema)
