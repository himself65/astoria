import mongoose from 'mongoose'
import { mongodb } from '../../config.example'

const { port, database } = mongodb

const db_url = `mongodb://localhost:${port}/${database}`

export const connect_db = () => {
  console.log('Try to connect Mongoose.')
  const db = mongoose.createConnection(db_url, { useNewUrlParser: true })
  db.on('connected', () => {
    console.log(`Mongoose connection open to ${db_url}.`)
  })
  db.on('error', (err) => {
    console.log('Mongoose connection error: ' + err)
  })
  db.on('disconnected', () => {
    console.log('Mongoose connection disconnected')
  })
  return db
}

export default mongoose
