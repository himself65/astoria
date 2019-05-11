// @ts-ignore
import { Daruk } from 'daruk'
import db from 'debug'
import 'reflect-metadata'
import { loadPlugins } from './loadPlugins'

export const debug = db('astoria')

export default class Astoria extends Daruk {
  constructor (name, options) {
    super(name, options)
    this.on('middlewareLoaded', async (daruk: Daruk) => {
      await loadPlugins(daruk)
    })
  }

  // noting to extends
}
