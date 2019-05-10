// @ts-ignore
import db from 'debug'
import 'reflect-metadata'

export const debug = db('astoria')
import { Daruk } from 'daruk'

import { loadPlugins } from './loadPlugins'

const astoria = new Daruk('astoria',{
  rootPath: __dirname,
  debug: process.env.NODE_ENV === 'dev'
})

export default astoria
