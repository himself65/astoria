import 'reflect-metadata'
// @ts-ignore
import db from 'debug'

export const debug = db('astoria')
import * as Koa from 'koa'

import { loadPlugins } from './loadPlugins'

const app = new Koa()  // Singleton

export const astoria = {
  async run () {
    await loadPlugins(app)
  }
}

export default astoria
