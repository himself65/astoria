import { Daruk } from 'daruk'
import * as mongoose from 'mongoose'
import { debug } from '../'
const config = require('../config')

const { port, database } = config.mongodb

const dbUrl = `mongodb://localhost:${port}/${database}`

export default async function (daruk: Daruk) {
  debug(`mongoDB url: ${dbUrl}`)
  debug('Try to connect Mongoose.')
  const mongodb = await mongoose.connect(dbUrl, {
    useCreateIndex: true,
    useNewUrlParser: true
  })
  const db = mongodb.connection
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
