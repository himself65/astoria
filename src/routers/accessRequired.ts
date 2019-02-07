import * as KoaRouter from 'koa-router'
import { UserPermission } from '../utils/shared'

export const router = new KoaRouter()

router.all([/^\/backstage/, /^\/new/], async (ctx, next) => {
  if (ctx.user.level === UserPermission.default) {
    ctx.response.redirect('/error')
  }
  await next()
})

export default router
