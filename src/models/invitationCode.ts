import mongoose from '../utils/database'

const Schema = mongoose.Schema

export const invitationCodeSchema = new Schema({
  code: { type: String, unique: true }
})

export const invitationCode = mongoose.model('invitationCode', invitationCodeSchema)
