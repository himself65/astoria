import mongoose from 'mongoose'
import { mongodb } from '../../config.example'

const { port, database } = mongodb

const db_url = `mongodb://localhost:${port}/${database}`

export const connect_db = () => {
  console.log('Try to connect Mongoose.')
  mongoose.connect(db_url, { useNewUrlParser: true } )
  const db = mongoose.connection
  db.on('connected', () => {
    console.log(`Mongoose connection open to ${db_url}.`)
    // todo: load Models
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
