import { Daruk } from 'daruk'
import { existsSync, readdirSync } from 'fs'
import { resolve } from 'path'
import { debug } from './'

const dir = resolve(__dirname, 'plugins')

export async function loadPlugins (app: Daruk) {
  if (!existsSync(dir)) {
    throw Error(`${dir} not exist.`)
  }
  try {
    const files = readdirSync(dir)
    const plugins = files.map(file => {
      return require(resolve(dir, file)).plugin
    }).sort((a, b) => {
      return a.priority - b.priority
    })
    plugins.forEach(async plugin => {
      const pluginName = plugin.name || null
      await plugin.register(app)
      debug(`Load plugin: ${pluginName}`)
    })
  } catch (e) {
    throw e
  }
}
