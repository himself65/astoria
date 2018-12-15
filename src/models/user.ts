import mongoose from '../utils/database'

const Schema = mongoose.Schema
const ObjectID = mongoose.Types.ObjectId

export const UserSchema = new Schema({
  id: { type: ObjectID, index: true },
  username: { type: String, required: true, unique: true },
  nickname: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },

  email: String
})

export const User = mongoose.model('Article', UserSchema)
