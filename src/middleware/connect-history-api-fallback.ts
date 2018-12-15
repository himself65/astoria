import * as url from 'url'
import { Context } from 'koa'

interface Rewrites {
  from: string,
  to: string
}

interface Options {
  logger?: object
  index?: string | '/default.html'
  whiteList?: string[]
  rewrites?: Rewrites[]
  verbose?: boolean
  htmlAcceptHeaders?: string[]
  disableDotRule?: boolean
}

export default function logger (options?: Options) {
  const logger = getLogger(options)

  return async (ctx: Context, next: Function) => {
    if (ctx.method !== 'GET') {
      logger('Not rewriting', ctx.method, ctx.url, 'because the method is not GET.')
      return next()
    } else if (!ctx.header || typeof ctx.header.accept !== 'string') {
      logger('Not rewriting', ctx.method, ctx.url, 'because the client did not send an HTTP accept header.')
      return next()
    } else if (ctx.header.accept.indexOf('application/json') === 0) {
      logger('Not rewriting', ctx.method, ctx.url, 'because the client prefers JSON.')
      return next()
    } else if (!acceptsHtml(ctx.header.accept, options)) {
      logger('Not rewriting', ctx.method, ctx.url, 'because the client does not accept HTML.')
      return next()
    }

    // white list check
    if (options.whiteList) {
      let isFlag = false
      options.whiteList.forEach((item) => {
        if (!isFlag) isFlag = new RegExp(item).test(ctx.url)
      })
      if (isFlag) return next()
    }

    const parsedUrl = url.parse(ctx.url)
    let rewriteTarget
    options.rewrites = options.rewrites || []

    for (let i = 0; i < options.rewrites.length; i++) {
      const rewrite = options.rewrites[i]
      const match = parsedUrl.pathname.match(rewrite.from)

      if (match !== null) {
        rewriteTarget = evaluateRewriteRule(parsedUrl, match, rewrite.to)
        logger('Rewriting', ctx.method, ctx.url, 'to', rewriteTarget)
        ctx.url = rewriteTarget
        return next()
      }
    }

    if (parsedUrl.pathname.indexOf('.') !== -1 && options.disableDotRule !== true) {
      logger('Not rewriting', ctx.method, ctx.url, 'because the path includes a dot (.) character.')
      return next()
    }
    rewriteTarget = options.index || '/index.html'
    logger('Rewriting', ctx.method, ctx.url, 'to', rewriteTarget)
    ctx.url = rewriteTarget
    await next()
  }
}

function evaluateRewriteRule (parsedUrl: url.UrlWithStringQuery, match: RegExpMatchArray, rule: string | Function) {
  if (typeof rule === 'string') {
    return rule
  } else if (typeof rule !== 'function') {
    throw new Error('Rewrite rule can only be of type string of function.')
  }
  return rule({
    parsedUrl: parsedUrl,
    match: match
  })
}

function acceptsHtml (header: any, options: Options) {
  options.htmlAcceptHeaders = options.htmlAcceptHeaders || ['text/html', '*/*']
  for (let i = 0; i < options.htmlAcceptHeaders.length; i++) {
    if (header.indexOf(options.htmlAcceptHeaders[i]) !== -1) {
      return true
    }
  }
  return false
}

function getLogger (options: Options) {
  if (options && options.logger) {
    return options.logger
  } else if (options && options.verbose) {
    return console.log.bind(console)
  }
  return Function()
}
