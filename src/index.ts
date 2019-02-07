import 'reflect-metadata'
// @ts-ignore
import db from 'debug'

export const debug = db('astoria')
import * as Koa from 'koa'
import registerExample from './utils/registerExample'

import { loadPlugins } from './loadPlugins'

const app = new Koa()  // Singleton

interface IAstoria {
  run (conf): Promise<void>
}

export const astoria: IAstoria = {
  async run (conf) {
    loadPlugins(app)
  }
}

export default astoria
