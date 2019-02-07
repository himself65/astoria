import { existsSync, readdirSync } from 'fs'
import { resolve } from 'path'
import { debug } from './'

import * as globalConfig from '../config'

const dir = resolve(__dirname, 'plugins')

export function loadPlugins (app) {
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
    plugins.forEach(plugin => {
      const pluginName = plugin.name || null
      let config = {
        _global: globalConfig
      }
      if (pluginName) {
        config = {
          ...config,
          ...globalConfig.plugins[pluginName]
        }
      }
      plugin.register(app, config)
      debug(`Load plugin: ${pluginName}`)
    })
  } catch (e) {
    throw e
  }
}
