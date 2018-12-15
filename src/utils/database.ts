import * as mongoose from 'mongoose'
import { mongodb } from '../../config.json'

const { port, database } = mongodb

const dbUrl = `mongodb://localhost:${port}/${database}`

export const connectDB = async () => {
  console.log('Try to connect Mongoose.')
  await mongoose.connect(dbUrl, { useNewUrlParser: true })
  const db = mongoose.connection
  db.on('connected', () => {
    console.log(`Mongoose connection open to ${dbUrl}.`)

  })
  db.on('error', (err) => {
    console.error('Mongoose connection error: ' + err)
  })
  db.on('disconnected', () => {
    console.log('Mongoose connection disconnected')
  })
  return db
}

export default mongoose
