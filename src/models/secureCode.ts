import mongoose from '../utils/database'

const Schema = mongoose.Schema

export interface ISecureCode {
  content: string
}

export const SecureCodeSchema = new Schema({
  content: { type: String, required: true }
})

export const SecureCode = mongoose.model('SecureCode', SecureCodeSchema)
