import mongoose from '../utils/database'

const Schema = mongoose.Schema

export const UserSchema = new Schema({
  id: { type: mongoose.Types.ObjectId, index: true },
  username: { type: String, required: true, unique: true },
  nickname: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  githubID: { type: String, unique: true },

  email: String
})

export const User = mongoose.model('User', UserSchema)
