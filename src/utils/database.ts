import * as mongoose from 'mongoose'
import { debug } from '../'
import { mongodb } from '../../config.js'

const { port, database } = mongodb

const dbUrl = `mongodb://localhost:${port}/${database}`

export const connectDB = async () => {
  debug('Try to connect Mongoose.')
  await mongoose.connect(dbUrl, {
    useCreateIndex: true,
    useNewUrlParser: true
  })
  const db = mongoose.connection
  db.on('connected', () => {
    debug(`Mongoose connection open to ${dbUrl}.`)
  })
  db.on('error', (err) => {
    debug('Mongoose connection error: ' + err)
    throw err
  })
  db.on('disconnected', () => {
    debug('Mongoose connection disconnected')
  })
  return db
}

export { mongoose }

export default mongoose
