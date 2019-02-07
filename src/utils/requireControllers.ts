import { readdirSync, existsSync } from 'fs'
import { debug } from '../'
import { join } from 'path'
import { regex } from './requireContents'

export function requireControllers (dir: string): Function[] {
  if (!dir) {
    throw Error('param dir connot be nullable.')
  }
  if (!existsSync(dir)) {
    throw Error(`${dir} not exist.`)
  }
  try {
    const files = readdirSync(dir)
    return files.map(file => {
      const path = join(dir, file)
      const name = regex.exec(file)[0]
      debug('load controller:', name)
      return require(path).default
    })
  } catch (e) {
    throw e
  }
}

export default requireControllers
