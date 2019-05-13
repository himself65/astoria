import { Daruk } from 'daruk'
import db from 'debug'
import 'reflect-metadata'

export const debug = db('astoria')

export default class Astoria extends Daruk {
  constructor (name, options) {
    super(name, options)
    this.on('middlewareLoaded', async (daruk: Daruk) => {
      // todo: support this
      // await loadPlugins(daruk)
    })
  }

  // noting to extends
}
