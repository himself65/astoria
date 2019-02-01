import { readdirSync, readFileSync } from 'fs'
import { resolve } from 'path'

export const regex = /.*(?=\..+)/

function requireContents (path) {
  if (!path) {
    throw Error(`param path cannot be nullable`)
  }
  try {
    let files = readdirSync(path)
    return files.map(file => {
      const filePath = resolve(path, file)
      return {
        key: regex.exec(file.toString())[0],
        value: readFileSync(filePath).toString()
      }
    })
  } catch (e) {
    throw e
  }
}

export { requireContents }

export default requireContents
