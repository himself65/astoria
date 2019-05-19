import * as mongoose from 'mongoose'

const Schema = mongoose.Schema

export const invitationCodeSchema = new Schema({
  code: { type: String, unique: true }
})

export const invitationCode = mongoose.model('invitationCode', invitationCodeSchema)
