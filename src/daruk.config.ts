/**
 * Daruk 配置
 */
import { Daruk } from 'daruk'
import path = require('path')

export default function (daruk: Daruk) {
  // @ts-ignore
  const { staticPath } = daruk.config

  const darukConfig: any = {}

  darukConfig.middlewareOrder = [
    'koa-static',
    'koa-handle-error',
    'koa2-connect-history-api-fallback',
    'koa-body',
    'koa-bodyparser'
  ]
  darukConfig.middleware = {
    // https://github.com/axross/koa-handle-error 必须第一个位置
    'koa-handle-error': (mid: Function) => {
      return mid((err: any) => {
        console.log(err)
      })
    },
    'koa2-connect-history-api-fallback': (mid: Function) => {
      return mid({
        whiteList: ['/api', '/dev']
      })
    },
    'koa-bodyparser': (mid: Function) => {
      return mid()
    },
    'koa-static': (mid: Function) => {
      return mid(
        path.resolve(staticPath), {
          defer: true
        }
      )
    },
    'koa-body': (mid: Function) => {
      return mid()
    }
  }
  darukConfig.util = {
    // todo
  }
  darukConfig.timer = {
    // todo
  }

  return darukConfig
}
