interface IPost {
  name: string | null
  meta: {}
  content: string
}

export const metaRegex = /(?<=^---\n)[\s\S]+?(?=---)/
export const metaAllRegex = /^---[\s\S]+?(?<!\\)---/
export const metaLeftRegex = /^.+?(?=(?<!\\):)/
export const metaRightRegex = /(?<=(?<!\\):).+/

export function removeMeta (markdown: string): string {
  return metaAllRegex[Symbol.replace](markdown, '')
}

export function parseMeta (data: string): {} {
  const _ = {}
  data.split('\n').forEach(line => {
    _[metaLeftRegex.exec(line)[0].trim()] = metaRightRegex.exec(line)[0].trim()
  })
  return _
}

export function markdownParser (markdown: string): IPost {
  const meta = parseMeta(metaRegex.exec(markdown)[0])
  if (!meta['title']) {
    console.log()
  }
  let post: IPost = {
    name: meta['title'] || null,
    meta: meta,
    content: removeMeta(markdown)
  }
  return post
}

export default markdownParser
