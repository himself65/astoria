import mongoose from 'mongoose'
import { mongodb } from '../../config.example'

const { port, database } = mongodb

const db_url = `mongodb://localhost:${port}/${database}`

export async function connect_db () {
  await mongoose.connect(db_url)
  mongoose.connection.on('connected', () => {
    console.log(`Mongoose connection open to ${db_url}.`)
  })
  mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error: ' + err)
  })
  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection disconnected')
  })
}

export default mongoose
