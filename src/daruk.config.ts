/**
 * Daruk 配置
 */
import { Daruk } from 'daruk'
import path = require('path')

export default function (daruk: Daruk) {
  const { staticPath } = daruk.config

  const darukConfig: any = {}

  darukConfig.middlewareOrder = [
    'koa-handle-error',
    'koa2-connect-history-api-fallback',
    'koa-static',
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
  darukConfig.util = {}
  darukConfig.timer = {
    testTimer: {
      cronTime: '* * * * * *', // 一秒一次
      onTick: function onTick (this: any) {
        this.stop() // 主动停止定时器
      },
      onComplete: function () {
        // todo
      }
    }
  }

  return darukConfig
}
