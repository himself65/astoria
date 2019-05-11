import { existsSync, readdirSync, readFileSync } from 'fs'
import { resolve } from 'path'

export const regex = /.*(?=\..+)/

// @deprecated
// 动态加载Markdown静态资源
export function requireContents (path) {
  if (!path) {
    throw Error(`param path cannot be nullable`)
  }
  if (!existsSync(path)) {
    console.warn(`not exist path: ${path}`)
    return {}
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

export default requireContents
