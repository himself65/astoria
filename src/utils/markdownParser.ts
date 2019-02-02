import { metaAllRegex, metaLeftRegex, metaRegex, metaRightRegex, parseMeta, removeMeta } from 'md-meta'

import * as marked from 'marked'

export {
  metaRegex, metaAllRegex, metaLeftRegex, metaRightRegex,
  parseMeta, removeMeta
}

interface IPost {
  name: string | null
  meta: {}
  content: string
}

export class MarkdownParser {
  public static parseToHTML (content: string): string {
    const src = removeMeta(content)
    return marked(src)
  }

  public static parseMeta = parseMeta
  public static removeMeta = removeMeta

  public static genPost (data: string, html = false): IPost {
    const meta = this.parseMeta(data)
    const content = this.removeMeta(data)
    return {
      meta: meta,
      content: html ? this.parseToHTML(content) : content,
      name: meta['title']
    }
  }
}

export default MarkdownParser
