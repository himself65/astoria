import { readdirSync, existsSync } from 'fs'
import { join } from 'path'

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
      return require(join(dir, file))
    })
  } catch (e) {
    throw e
  }
}
