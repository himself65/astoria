import * as KoaRouter from 'koa-router'
import { debug } from '../'
import { UserPermission } from '../utils/shared'

export const router = new KoaRouter()

// access required
router.all([/^\/backstage/, /^\/new/], async (ctx, next) => {
  if (ctx.user.level === UserPermission.default) {
    ctx.response.redirect('/error')
  }
  await next()
})

// login required
router.all(['/user'], async (ctx, next) => {
  if (ctx.user.username === null) {
    debug(ctx.user)
    ctx.response.redirect('/error')
  }
  await next()
})

export default router
