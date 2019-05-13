import mongoose from '../utils/database'

const Schema = mongoose.Schema

export const TalkSchema = new Schema({
  author: { type: mongoose.Types.ObjectId, ref: 'user' },
  content: { type: String, required: true },
  like: { type: Number, default: 0 }
})

export const TalkModel = mongoose.model('talk', TalkSchema)
