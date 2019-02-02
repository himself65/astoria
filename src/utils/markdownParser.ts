import {
  metaRegex, metaAllRegex,
  metaLeftRegex, metaRightRegex,
  parseMeta, removeMeta
} from 'md-meta'

export {
  metaRegex, metaAllRegex, metaLeftRegex, metaRightRegex,
  parseMeta, removeMeta
}

interface IPost {
  name: string | null
  meta: {}
  content: string
}

export function markdownParser (markdown: string): IPost {
  const meta = parseMeta(metaRegex.exec(markdown)[0])
  if (!meta['title']) {
    console.warn('title is not defined.')
  }
  let post: IPost = {
    name: meta['title'] || null,
    meta: meta,
    content: removeMeta(markdown)
  }
  return post
}

export default markdownParser
