import mongoose from 'mongoose'
import { mongodb } from '../../config.example'

const { port, database } = mongodb

const db_url = `mongodb://localhost:${port}/${database}`

export const connect_db = async () => {
  console.log('Try to connect Mongoose.')
  await mongoose.connect(db_url, { useNewUrlParser: true })
  const db = mongoose.connection
  db.on('connected', () => {
    console.log(`Mongoose connection open to ${db_url}.`)

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
